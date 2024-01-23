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
