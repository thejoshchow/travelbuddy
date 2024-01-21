from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class UserBase(BaseModel):
    username: str
    email: str
    phone: str
    first_name: str
    last_name: str
    display_name: str
    picture_url: str


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    user_id: int


class UserRepo:
    def create(self, user_form: UserIn):
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
                            user_form.password,
                        ]
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
                        ]
                    )

        except Exception as e:
            raise HTTPException(status_code=400,
                                detail=f'{e}')

        old_data = user_form.dict()
        return UserOut(user_id=user_id, **old_data)
