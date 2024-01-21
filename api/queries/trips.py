from datetime import date

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class Error(BaseModel):
    message: dict


class TripIn(BaseModel):
    name: str
    location: str
    start_date: date
    end_date: date
    picture_ul: str
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
                        ]
                    )
                    trip_id = result.fetchone()[0]

        except Exception as e:
            raise HTTPException(status_code=400, detail=f'{e}')

        return TripOut(trip_id=trip_id, **trip_form.dict())
