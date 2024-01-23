from typing import Optional
from decimal import Decimal

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class ItemIn(BaseModel):
    author: int
    category_id: int = 5
    name: str
    description: Optional[str] = None
    scheduled: bool = False
    url: Optional[str] = None
    picture_url: Optional[str] = None
    cost: Optional[Decimal] = None
    cost_per_person: Optional[bool] = None
    notes: Optional[str] = None


class ItemOut(ItemIn):
    trip_id: int
    item_id: int


class ItemRepository:
    def create(self, trip_id, item: ItemIn) -> ItemOut:
        try:
            # connect to db
            with pool.connection() as conn:
                # get cursur(sql)
                with conn.cursor() as db:
                    # run insert statement
                    result = db.execute(
                        """
                    INSERT INTO items (
                    trip_id,
                    author,
                    category_id,
                    name,
                    description,
                    scheduled,
                    url,
                    picture_url,
                    cost,
                    cost_per_person,
                    notes)
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING item_id;
                    """,
                        [
                            trip_id,
                            item.author,
                            item.category_id,
                            item.name,
                            item.description,
                            item.scheduled,
                            item.url,
                            item.picture_url,
                            item.cost,
                            item.cost_per_person,
                            item.notes,
                        ],
                    )
                    id = result.fetchone()[0]
                    # return new data
                    old_data = item.dict()
                    return ItemOut(trip_id=trip_id, item_id=id, **old_data)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")
