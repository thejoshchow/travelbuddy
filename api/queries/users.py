from pydantic import BaseModel


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
    pass
