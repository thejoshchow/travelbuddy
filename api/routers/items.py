from typing import Union

from fastapi import APIRouter, Depends

from queries.items import ItemIn, ItemOut, ItemRepository
from queries.errors import Error


router = APIRouter()


@router.post("/api/trip/{trip_id}/item")
def create_item(
    trip_id, item: ItemIn, repo: ItemRepository = Depends(ItemRepository)
) -> Union[ItemOut, Error]:
    return repo.create(trip_id, item)
