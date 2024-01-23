from fastapi import APIRouter, Depends

from queries.users import UserIn, UserRepo, UserOut

router = APIRouter()


@router.put("/api/user/{user_id}")
def update_user(
    user_form: UserIn, user_id: int, users: UserRepo = Depends()
) -> UserOut:
    return users.update(user_form, user_id)
