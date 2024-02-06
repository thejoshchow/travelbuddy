from fastapi import APIRouter, Depends, HTTPException

from queries.users import UserIn, UserRepo, UserOut
from authentication.authentication import authenticator
from typing import Union
from queries.errors import Error

router = APIRouter()


@router.get("/")
def root():
    return {"message": "You hit the root path!"}


@router.put("/api/user")
def update_user(
    user_form: UserIn,
    users: UserRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    user_id = account_data["user_id"]
    try:
        return users.update(user_form, user_id)
    except Exception:
        raise HTTPException(
            status_code=400, detail="Could not update user details"
        )


@router.get("/api/user")
def get_one_user(
    user_id: int,
    user: UserRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[UserOut, Error]:
    user_id = account_data["user_id"]
    try:
        user_data = user.get_one_user(user_id)
        return user_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"error: {e}")
