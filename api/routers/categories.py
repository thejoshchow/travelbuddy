from typing import Union, List

from fastapi import APIRouter, Depends, HTTPException

from queries.categories import CategoryRepo, CategoryOut, CategoryIn
from queries.items import ItemOut
from queries.errors import Error

router = APIRouter()


@router.post("/api/trip/{trip_id}/category")
def create_item_category(
    form: CategoryIn, trip_id: int, categories: CategoryRepo = Depends()
) -> Union[CategoryOut, Error]:
    try:
        return categories.create(form, trip_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"{e}")


@router.get("/api/trip/{trip_id}/category/{category_id}")
def get_item_by_category(
    trip_id: int,
    category_id: int,
    categories: CategoryRepo = Depends(),
) -> Union[List[ItemOut], Error]:
    try:
        return categories.get_items(trip_id, category_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Get items failed")
