from typing import Union, List

from fastapi import APIRouter, Depends, HTTPException

from authentication.authentication import authenticator
from authentication.accounts import Authorize
from queries.categories import (
    CategoryRepo,
    CategoryOut,
    CategoryIn,
    ItemsListCat,
)
from queries.errors import Error

router = APIRouter()


@router.post("/api/trip/{trip_id}/category")
def create_item_category(
    form: CategoryIn,
    trip_id: int,
    categories: CategoryRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[CategoryOut, Error]:
    is_buddy = auth.is_buddy(account_data["user_id"], trip_id)
    is_admin = is_buddy.admin
    if is_admin:
        try:
            return categories.create(form, trip_id)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/api/trip/{trip_id}/category")
def get_categories(
    trip_id: int,
    categories: CategoryRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[CategoryOut], Error]:
    is_buddy = auth.is_buddy(account_data["user_id"], trip_id)
    if is_buddy.participant:
        try:
            return categories.get_categories(trip_id)
        except Exception:
            raise HTTPException(
                status_code=400, detail="Failed to get item categories"
            )
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/api/trip/{trip_id}/category/{category_id}")
def get_items_by_category(
    trip_id: int,
    category_id: int,
    categories: CategoryRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ItemsListCat, Error]:
    is_buddy = auth.is_buddy(account_data["user_id"], trip_id)
    if is_buddy.participant:
        try:
            return categories.get_items(trip_id, category_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Get items failed")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.delete("/api/trip/{trip_id}/category/{category_id}")
def delete_category(
    trip_id: int,
    category_id: int,
    categories: CategoryRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    is_buddy = auth.is_buddy(account_data["user_id"], trip_id)
    if is_buddy.admin:
        try:
            result = categories.delete(trip_id, category_id)
            return True if result else False
        except Exception:
            raise HTTPException(
                status_code=400, detail="Delete category failed"
            )
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")
