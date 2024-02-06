from pydantic import BaseModel

from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token

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


@router.put("/api/account")
def update_account(
    user_form: AccountChange,
    request: Request,
    repsonse: Response,
    accounts: AccountRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    account = accounts.get(account_data["username"])
    user_form.username = account_data["username"]
    if not authenticator.pwd_context.verify(
        user_form.current_password, account.hashed_password
    ):
        raise HTTPException(status_code=401, detail="Invalid password")
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
        except Exception:
            raise HTTPException(
                status_code=400, detail="Could not update account"
            )


@router.delete("/api/account")
def delete_account(
    accounts: AccountRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["user_id"]
    try:
        result = accounts.delete(user_id)
        return True if result else None
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to delete account")


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account or authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/api/trip/{trip_id}/role")
def is_buddy(
    trip_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    auth: Authorize = Depends(),
):
    user_id = account_data["user_id"]
    buddy = auth.is_buddy(user_id, trip_id)
    return buddy
