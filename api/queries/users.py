from pydantic import BaseModel

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
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO accounts (username, hashed_password)
                    VALUES (%s, %s)
                    RETURNING user_id;
                    """,
                    [
                        user_form.username,
                        user_form.password,
                    ]
                )
                user_id = result.fetchone()[0]

                cur.execute(
                    """
                    INSERT INTO users (
                        user_id,
                        email,
                        phone,
                        first_name,
                        last_name,
                        display_name,
                        picture_url
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    [
                        user_id,
                        user_form.email,
                        user_form.phone,
                        user_form.first_name,
                        user_form.last_name,
                        user_form.display_name,
                        user_form.picture_url,
                    ]
                )
                old_data = user_form.dict()
                return UserOut(user_id=user_id, **old_data)
                