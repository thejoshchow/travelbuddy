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


class ItemUpdate(ItemIn):
    pass
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


class ItemRepository:
    def delete(self, trip_id: int, item_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                    DELETE FROM items
                    WHERE trip_id = %s AND item_id = %s;
                    """,
                        [trip_id, item_id],
                    )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")

    def update(self, trip_id, item_id, item: ItemUpdate) -> ItemOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    UPDATE items
                    SET author = %s,
                        category_id = %s,
                        name = %s,
                        description = %s,
                        scheduled = %s,
                        url = %s,
                        picture_url = %s,
                        cost = %s,
                        cost_per_person = %s,
                        notes = %s
                    WHERE trip_id = %s AND item_id = %s
                    RETURNING item_id;
                    """,
                        [
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
                            trip_id,
                            item_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    updated_data = item.dict()
                    return ItemOut(trip_id=trip_id, item_id=id, **updated_data)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")

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
