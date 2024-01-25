from typing import Union

from fastapi import APIRouter, Depends, HTTPException

from authentication.authentication import authenticator
from queries.items import ItemIn, ItemOut, ItemRepository, ItemUpdate, Vote
from queries.errors import Error


router = APIRouter()


@router.post("/api/trip/{trip_id}/item")
def create_item(
    trip_id, item: ItemIn, repo: ItemRepository = Depends()
) -> Union[ItemOut, Error]:
    return repo.create(trip_id, item)


@router.put("/api/trip/{trip_id}/item/{item_id}")
def update_item(
    item_id: int,
    trip_id: int,
    item: ItemUpdate,
    repo: ItemRepository = Depends(),
):
    return repo.update(trip_id, item_id, item)


@router.delete("/api/trip/{trip_id}/item/{item_id}")
def delete_item(
    trip_id: int,
    item_id: int,
    repo: ItemRepository = Depends(),
):
    return repo.delete(trip_id, item_id)


@router.post("/api/trip/{trip_id}/item/{item_id}/vote")
def add_vote(
    item_id: int,
    items: ItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Vote, Error]:
    user_id = account_data["user_id"]
    try:
        return items.add_vote(item_id, user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Vote failed")
