from datetime import date
from typing import Optional

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class Error(BaseModel):
    message: dict


class TripIn(BaseModel):
    name: str
    location: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    picture_ul: Optional[str] = None
    owner: int


class TripOut(TripIn):
    trip_id: int


class TripRepo:
    def create(self, trip_form: TripIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO trips(
                            name,
                            location,
                            start_date,
                            end_date,
                            picture_url,
                            owner
                            )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING trip_id;
                        """,
                        [
                            trip_form.name,
                            trip_form.location,
                            trip_form.start_date,
                            trip_form.end_date,
                            trip_form.picture_ul,
                            trip_form.owner,
                        ],
                    )
                    trip_id = result.fetchone()[0]
                    return TripOut(trip_id=trip_id, **trip_form.dict())
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")

    def update(self, trip_id: int, trip_form: TripIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE trips
                        SET name = %s,
                            location = %s,
                            start_date = %s,
                            end_date = %s,
                            picture_url = %s,
                            owner = %s
                        WHERE trip_id = %s;
                        """,
                        [
                            trip_form.name,
                            trip_form.location,
                            trip_form.start_date,
                            trip_form.end_date,
                            trip_form.picture_ul,
                            trip_form.owner,
                            trip_id,
                        ],
                    )
                    updated_data = trip_form.dict()
                    return TripOut(trip_id=trip_id, **updated_data)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")

    def get_one_trip(self, trip_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT  owner,
                                name,
                                location,
                                start_date,
                                end_date,
                                picture_url
                        FROM trips
                        WHERE trip_id = %s
                        """,
                        [trip_id],
                    )
                    trip_data = result.fetchone()
                    if trip_data is None:
                        return None

                    trip_dict = {
                        "owner": trip_data[0],
                        "name": trip_data[1],
                        "location": trip_data[2],
                        "start_date": trip_data[3],
                        "end_date": trip_data[4],
                        "picture_url": trip_data[5],
                    }

                    return TripOut(trip_id=trip_id, **trip_dict)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")
