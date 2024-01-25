from typing import Union
from decimal import Decimal

from pydantic import BaseModel

from queries.pool import pool
from queries.errors import Error
from queries.items import ItemOut


class CategoryIn(BaseModel):
    category_name: str


class CategoryOut(CategoryIn):
    category_id: int
    trip_id: int | None


class CategoryRepo:
    def create(self, form, trip_id):
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

    def get_items(
        self, trip_id: int, category_id: int
    ) -> Union[CategoryOut, Error]:
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
                    return result

                except Exception as e:
                    print(e)
