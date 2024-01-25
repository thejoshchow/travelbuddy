from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel

from authentication.authentication import authenticator

from authentication.accounts import (
    AccountIn,
    AccountOut,
    AccountRepo,
    AccountChange,
    Authorize,
)

from queries.errors import Error


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


router = APIRouter()


@router.post("/api/account", response_model=AccountToken | Error)
async def create_account(
    user_form: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(user_form.password)
    try:
        account = accounts.create(user_form, hashed_password)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create account with those credentials",
        )
    form = AccountForm(
        username=user_form.username, password=user_form.password
    )
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.put("/api/account/update")
def update_account(
    user_form: AccountChange,
    request: Request,
    repsonse: Response,
    accounts: AccountRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = accounts.get(account_data["username"])
    user_form.username = account.username
    if not authenticator.pwd_context.verify(
        user_form.current_password, account.hashed_password
    ):
        raise HTTPException(status_code=400, detail="Invalid password")
    elif user_form.new_password != user_form.confirm_new_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    else:
        try:
            hashed_password = authenticator.hash_password(
                user_form.new_password
            )
            updated_account = accounts.update(
                account.user_id,
                hashed_password,
                user_form.email,
            )
            return updated_account
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")


@router.delete("/api/account/{user_id}")
def delete_account(
    user_id,
    accounts: AccountRepo = Depends(),
):
    return accounts.delete(user_id)


@router.patch("/api/trip/{trip_id}/buddy")
def is_buddy(
    trip_id: int,
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["user_id"]
    buddy = auth.is_buddy(user_id, trip_id)
    if buddy.participant:
        return True
    return False
