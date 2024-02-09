from typing import Union

from fastapi import APIRouter, Depends, HTTPException

from authentication.authentication import authenticator
from authentication.accounts import Authorize
from queries.items import (
    ItemIn,
    ItemOut,
    ItemRepository,
    ItemUpdate,
    Vote,
    VotesList,
)
from queries.errors import Error
from pexels.pexels import PexelsApi


router = APIRouter()


@router.post("/api/trip/{trip_id}/item")
def create_item(
    trip_id: int,
    item: ItemIn,
    repo: ItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    auth: Authorize = Depends(),
    pexels: PexelsApi = Depends(),
) -> Union[ItemOut, Error]:
    picture = pexels.get_pic(item.name)
    user_id = account_data["user_id"]
    is_buddy = auth.is_buddy(user_id, trip_id)
    if is_buddy.participant and is_buddy.buddy:
        try:
            return repo.create(trip_id, item, user_id, picture)
        except Exception:
            raise Exception
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.put("/api/trip/{trip_id}/item/{item_id}")
def update_item(
    item_id: int,
    trip_id: int,
    item: ItemUpdate,
    repo: ItemRepository = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ItemOut:
    user_id = account_data["user_id"]
    is_admin = auth.is_buddy(user_id, trip_id).admin
    is_author = auth.is_author(user_id, item_id)
    if is_admin or is_author:
        try:
            return repo.update(trip_id, item_id, item)
        except Exception:
            raise HTTPException(status_code=400, detail="Update failed")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.delete("/api/trip/{trip_id}/item/{item_id}")
def delete_item(
    trip_id: int,
    item_id: int,
    repo: ItemRepository = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["user_id"]
    is_admin = auth.is_buddy(user_id, trip_id).admin
    is_author = auth.is_author(user_id, item_id)
    if is_admin or is_author:
        try:
            return repo.delete(trip_id, item_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Item was not deleted")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.post("/api/trip/{trip_id}/item/{item_id}/vote")
def add_vote(
    trip_id: int,
    item_id: int,
    items: ItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    auth: Authorize = Depends(),
) -> Union[Vote, Error]:
    user_id = account_data["user_id"]
    is_buddy = auth.is_buddy(user_id, trip_id)
    if is_buddy.participant and is_buddy.buddy:
        try:
            return items.add_vote(item_id, user_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Vote failed")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/api/item/{item_id}/vote")
def get_vote(
    item_id: int,
    items: ItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> VotesList:
    try:
        return items.get_vote(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="failure to get votes")


@router.delete("/api/trip/{trip_id}/item/{item_id}/vote")
def delete_vote(
    item_id: int,
    trip_id: int,
    repo: ItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    auth: Authorize = Depends(),
):
    user_id = account_data["user_id"]
    buddy = auth.is_buddy(user_id, int(trip_id))
    if buddy.participant and buddy.buddy:
        result = repo.delete_vote(item_id, user_id)
        return True if result else None
    else:
        raise HTTPException(status_code=401, detail="Vote not authorized")
