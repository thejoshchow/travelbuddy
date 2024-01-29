from typing import Optional

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class AccountBase(BaseModel):
    username: str


class AccountChange(AccountBase):
    email: str
    current_password: str
    new_password: str
    confirm_new_password: str


class AccountIn(AccountBase):
    email: str
    password: str
    phone: Optional[str] = None
    first_name: str
    last_name: str
    display_name: str
    picture_url: Optional[str] = None


class AccountOut(AccountBase):
    user_id: int


class AccountWPW(AccountOut):
    hashed_password: str


class IsBuddyIn(BaseModel):
    user_id: int
    trip_id: int


class IsBuddyOut(BaseModel):
    participant: bool | None
    buddy: bool | None
    admin: bool | None


class BuddyOf(BaseModel):
    trips: dict


class AccountRepo:
    def create(self, user_form: AccountIn, hashed_password: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO accounts (username, email, hashed_password)
                        VALUES (%s, %s, %s)
                        RETURNING user_id;
                        """,
                        [
                            user_form.username,
                            user_form.email,
                            hashed_password,
                        ],
                    )
                    user_id = result.fetchone()[0]
                    cur.execute(
                        """
                        INSERT INTO users (
                            user_id,
                            phone,
                            first_name,
                            last_name,
                            display_name,
                            picture_url
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        """,
                        [
                            user_id,
                            user_form.phone,
                            user_form.first_name,
                            user_form.last_name,
                            user_form.display_name,
                            user_form.picture_url,
                        ],
                    )

        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")

        old_data = user_form.dict()
        return AccountWPW(
            user_id=user_id,
            hashed_password=hashed_password,
            **old_data,
        )

    def get(self, username: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                            SELECT user_id, username, email, hashed_password
                            FROM accounts
                            WHERE username = %s;
                            """,
                        [username],
                    )
                    user = result.fetchone()
                    if user:
                        user_id = user[0]
                        username = user[1]
                        email = user[2]
                        hashed_password = user[3]
                        return AccountWPW(
                            user_id=user_id,
                            username=username,
                            email=email,
                            hashed_password=hashed_password,
                        )
        except Exception:
            raise HTTPException(
                status_code=400, detail="Username and password do not match"
            )

    def update(self, user_id, password, email):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    result = cur.execute(
                        """
                        UPDATE accounts
                        SET email = %s,
                            hashed_password = %s
                        WHERE user_id = %s
                        RETURNING user_id, username, email;
                        """,
                        [email, password, user_id],
                    )
                    account = result.fetchone()
                    user_id = account[0]
                    username = account[1]
                    email = account[2]
                    return AccountOut(
                        user_id=user_id,
                        username=username,
                        email=email,
                    )
                except Exception as e:
                    return f"{e}"

    def delete(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM accounts
                        WHERE user_id = %s
                        RETURNING *;
                        """,
                        [user_id],
                    )
                    result = cur.fetchone()
                    return result

        except Exception as e:
            print(e)


class Authorize:
    def is_buddy(self, user_id: int, trip_id: int):
        trips = self.buddy_of(user_id)
        if trip_id in trips:
            return IsBuddyOut(
                participant=trip_id in trips,
                buddy=trips.get(trip_id)[0],
                admin=trips.get(trip_id)[1],
            )
        return IsBuddyOut(participant=False)

    def buddy_of(self, user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT trip_id, buddy, admin
                    FROM buddies
                    WHERE user_id = %s
                    """,
                    [user_id],
                ),
                trips = {}
                for record in cur.fetchall():
                    trips[record[0]] = record[1], record[2]
                return trips

    def is_author(self, user_id: int, item_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT author
                    FROM items
                    WHERE item_id = %s;
                    """,
                    [item_id],
                )
                author = result.fetchone()[0]
                if author == user_id:
                    return True
                return False
