from typing import List
from decimal import Decimal

from pydantic import BaseModel

from queries.pool import pool
from queries.items import ItemOut


class CategoryIn(BaseModel):
    category_name: str


class CategoryOut(CategoryIn):
    category_id: int
    trip_id: int | None


class ItemsListCat(BaseModel):
    items: List[ItemOut]


class CategoryRepo:
    def create(self, form: CategoryIn, trip_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    result = cur.execute(
                        """
                        INSERT INTO item_categories (trip_id, category_name)
                        VALUES (%s, %s)
                        RETURNING category_id;
                        """,
                        [
                            trip_id,
                            form.category_name,
                        ],
                    )
                    id = result.fetchone()[0]
                    return CategoryOut(
                        category_id=id, trip_id=trip_id, **form.dict()
                    )
                except Exception as e:
                    return f"{e}"

    def get_categories(self, trip_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        SELECT trip_id, category_id, category_name
                        FROM item_categories
                        WHERE trip_id=%s or trip_id IS NULL;
                        """,
                        [trip_id],
                    )
                    result = []
                    for record in cur.fetchall():
                        cat = CategoryOut(
                            trip_id=record[0],
                            category_id=record[1],
                            category_name=record[2],
                        )
                        result.append(cat)
                    return result
                except Exception as e:
                    raise e

    def get_items(self, trip_id: int, category_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        SELECT
                            i.item_id,
                            i.trip_id,
                            i.name,
                            i.author,
                            i.category_id,
                            i.description,
                            i.scheduled,
                            i.url,
                            i.picture_url,
                            i.cost,
                            i.cost_per_person,
                            i.notes,
                            c.trip_id,
                            c.category_name,
                            c.category_id
                        FROM items i
                        JOIN item_categories c ON i.category_id = c.category_id
                        WHERE i.trip_id = %s and i.category_id = %s;
                        """,
                        [trip_id, category_id],
                    )
                    result = []
                    for record in cur:
                        item = ItemOut(
                            author=record[3],
                            category_id=record[4],
                            name=record[2],
                            description=record[5],
                            scheduled=record[6],
                            url=record[7],
                            picture_url=record[8],
                            cost=Decimal(record[9]),
                            cost_per_person=record[10],
                            notes=record[11],
                            trip_id=trip_id,
                            item_id=record[0],
                        )
                        result.append(item)
                    return ItemsListCat(items=result)

                except Exception as e:
                    print(e)
