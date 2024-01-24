from typing import Union

from fastapi import APIRouter, Depends

from queries.items import ItemIn, ItemOut, ItemRepository, ItemUpdate
from queries.errors import Error


router = APIRouter()


@router.post("/api/trip/{trip_id}/item")
def create_item(
    trip_id, item: ItemIn, repo: ItemRepository = Depends(ItemRepository)
) -> Union[ItemOut, Error]:
    return repo.create(trip_id, item)


@router.put("/api/trip/{trip_id}/{item_id}")
def update_item(
    item_id: int,
    trip_id: int,
    item: ItemUpdate,
    repo: ItemRepository = Depends(ItemRepository),
):
    return repo.update(trip_id, item_id, item)
