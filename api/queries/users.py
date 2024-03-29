from typing import Optional
from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool


class UserIn(BaseModel):
    phone: Optional[str] = None
    first_name: str
    last_name: str
    display_name: str
    picture_url: Optional[str] = None


class UserOut(UserIn):
    user_id: int


class UserRepo:
    def update(self, user_form: UserIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE users
                        SET phone = %s,
                            first_name = %s,
                            last_name = %s,
                            display_name = %s,
                            picture_url = %s
                        WHERE user_id = %s
                        RETURNING
                            phone,
                            first_name,
                            last_name,
                            display_name,
                            picture_url;
                        """,
                        [
                            user_form.phone,
                            user_form.first_name,
                            user_form.last_name,
                            user_form.display_name,
                            user_form.picture_url,
                            user_id,
                        ],
                    )
                    user = result.fetchone()
                    return UserOut(
                        phone=user[0],
                        first_name=user[1],
                        last_name=user[2],
                        display_name=user[3],
                        picture_url=user[4],
                        user_id=user_id,
                    )
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"error: {e} ---Could not update user details",
            )

    def get_one_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT  phone,
                                first_name,
                                last_name,
                                display_name,
                                picture_url
                        FROM users
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    user_data = result.fetchone()
                    if user_data is None:
                        return None
                    user_dict = {
                        "phone": user_data[0],
                        "first_name": user_data[1],
                        "last_name": user_data[2],
                        "display_name": user_data[3],
                        "picture_url": user_data[4],
                    }
                    return UserOut(user_id=user_id, **user_dict)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")
