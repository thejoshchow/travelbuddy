from fastapi import APIRouter, Depends

from queries.users import UserIn, UserRepo, UserOut

router = APIRouter()

@router.post('/api/user')
def create_user(user_form: UserIn, users: UserRepo = Depends()) -> UserOut:
    return users.create(user_form)
