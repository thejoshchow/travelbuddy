from typing import Union

from fastapi import APIRouter, Depends

from queries.users import UserIn, UserRepo, UserOut
from queries.errors import Error

router = APIRouter()


@router.post('/api/user')
def create_user(user_form: UserIn,
                users: UserRepo = Depends()
                ) -> Union[UserOut, Error]:
    return users.create(user_form)
