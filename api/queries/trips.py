from datetime import date
from typing import Optional, List

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class BuddyIn(BaseModel):
    user: str
    buddy: Optional[bool] = True
    admin: Optional[bool] = False


class BuddyOut(BuddyIn):
    trip_id: int


class TripIn(BaseModel):
    name: str
    location: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    picture_url: Optional[str] = None


class TripOut(TripIn):
    trip_id: int


class TripListOut(BaseModel):
    trips: List[TripOut]


class TripBuddyList(BaseModel):
    buddies: list


class TripRepo:
    def create(self, trip_form: TripIn, user_id: int, picture: str):
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
                            picture,
                            user_id,
                        ],
                    )
                    print(type(picture))
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
                            picture_url = %s
                        WHERE trip_id = %s;
                        """,
                        [
                            trip_form.name,
                            trip_form.location,
                            trip_form.start_date,
                            trip_form.end_date,
                            trip_form.picture_url,
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
                        SELECT  name,
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
                        "name": trip_data[0],
                        "location": trip_data[1],
                        "start_date": trip_data[2],
                        "end_date": trip_data[3],
                        "picture_url": trip_data[4],
                    }

                    return TripOut(trip_id=trip_id, **trip_dict)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=f"error: {e}")

    def delete(self, trip_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM trips
                        WHERE trip_id = %s
                        RETURNING *;
                        """,
                        [trip_id],
                    )
                    result = cur.fetchone()
                    if result is not None:
                        return True

        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=f"error: {e}")

    def get_all(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM buddies
                        INNER JOIN trips
                            ON buddies.trip_id = trips.trip_id
                        WHERE buddies.user_id = %s
                        ORDER BY start_date;
                        """,
                        [user_id],
                    )
                    trip_list = []
                    for record in cur:
                        trip = TripOut(
                            trip_id=record[4],
                            name=record[5],
                            location=record[6],
                            start_date=record[7],
                            end_date=record[7],
                            picture_url=record[9],
                        )
                        trip_list.append(trip)
                    result = TripListOut(trips=trip_list)
                    return result

        except Exception as e:
            print(e)

    def add_buddy(self, info: BuddyIn, trip_id: int, buddy_user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO buddies (trip_id, user_id, buddy, admin)
                        VALUES (%s, %s, %s, %s);
                        """,
                        [
                            trip_id,
                            buddy_user_id,
                            info.buddy,
                            info.admin,
                        ],
                    )
                    return BuddyOut(trip_id=trip_id, **info.dict())
                except Exception as e:
                    print(e)
                    raise Exception

    def get_buddies(self, trip_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                # try:
                cur.execute(
                    """
                    SELECT b.user_id, u.display_name
                    FROM buddies b
                    JOIN users u ON b.user_id=u.user_id
                    WHERE b.trip_id=%s;
                    """,
                    [trip_id],
                )
                buddy_list = []
                result = cur.fetchall()
                for record in result:
                    buddy_list.append(
                        {"user_id": record[0], "display_name": record[1]}
                    )
                return buddy_list

    def get_id_from_username(self, user: BuddyIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                                SELECT user_id, username, email
                                FROM accounts
                                WHERE username=%s OR email=%s;
                                """,
                        [user.user, user.user],
                    )
                    user = result.fetchone()
                    if user:
                        user_id = user[0]
                        return user_id

        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=400, detail="Username or email does not exist"
            )
