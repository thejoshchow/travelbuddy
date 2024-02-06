from fastapi import APIRouter, Depends, HTTPException

from queries.users import UserIn, UserRepo, UserOut
from authentication.authentication import authenticator

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
