from pydantic import BaseModel

from queries.pool import pool


class CategoryIn(BaseModel):
    category_name: str


class CategoryOut(CategoryIn):
    category_id: int
    trip_id: int


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
