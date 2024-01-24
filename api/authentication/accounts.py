from typing import Optional

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class AccountBase(BaseModel):
    username: str
    email: str


class AccountChange(AccountBase):
    current_password: str
    new_password: str
    confirm_new_password: str


class AccountIn(AccountBase):
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
