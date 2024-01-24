from typing import Union

from fastapi import APIRouter, Depends, HTTPException

from queries.categories import CategoryRepo, CategoryOut, CategoryIn
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
