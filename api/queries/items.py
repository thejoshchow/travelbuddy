from typing import Optional
from decimal import Decimal

from pydantic import BaseModel
from fastapi import HTTPException

from queries.pool import pool


class ItemIn(BaseModel):
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
    author: Optional[int]


class ItemUpdate(ItemIn):
    pass


class Vote(BaseModel):
    item_id: int
    user_id: int


class VotesList(BaseModel):
    votes: list


class ItemRepository:
    def delete(self, trip_id: int, item_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM items
                        WHERE trip_id = %s AND item_id = %s
                        RETURNING *;
                        """,
                        [trip_id, item_id],
                    )
                    result = db.fetchone()
                    item = {
                        "item_id": result[0],
                        "trip_id": result[1],
                        "category_id": result[3],
                        "name": result[4],
                        "description": result[5],
                        "scheduled": result[6],
                        "url": result[7],
                        "picture_url": result[8],
                        "cost": result[9],
                        "cost_per_person": result[10],
                        "notes": result[11],
                    }
                    return ItemOut(**item)

        except Exception:
            raise Exception

    def update(self, trip_id: int, item_id: int, item: ItemUpdate):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE items
                        SET category_id = %s,
                            name = %s,
                            description = %s,
                            scheduled = %s,
                            url = %s,
                            picture_url = %s,
                            cost = %s,
                            cost_per_person = %s,
                            notes = %s
                        WHERE trip_id = %s AND item_id = %s
                        RETURNING *;
                        """,
                        [
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
                    result = result.fetchone()
                    item = {
                        "item_id": result[0],
                        "trip_id": result[1],
                        "category_id": result[3],
                        "name": result[4],
                        "description": result[5],
                        "scheduled": result[6],
                        "url": result[7],
                        "picture_url": result[8],
                        "cost": result[9],
                        "cost_per_person": result[10],
                        "notes": result[11],
                    }
                    return ItemOut(**item)
        except Exception:
            raise Exception

    def create(
        self, trip_id: int, item: ItemIn, user_id: int, picture: str
    ) -> ItemOut:
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
                            user_id,
                            item.category_id,
                            item.name,
                            item.description,
                            item.scheduled,
                            item.url,
                            picture,
                            item.cost,
                            item.cost_per_person,
                            item.notes,
                        ],
                    )
                    id = result.fetchone()[0]
                    # return new data
                    old_data = item.dict()
                    return ItemOut(
                        trip_id=trip_id,
                        item_id=id,
                        **old_data,
                    )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"{e}")

    def add_vote(self, item_id: int, user_id: int) -> Vote:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO item_votes (item_id, user_id)
                        VALUES (%s, %s);
                        """,
                        [
                            item_id,
                            user_id,
                        ],
                    )
                    return Vote(item_id=item_id, user_id=user_id)
                except Exception as e:
                    print("error: ", e)
                    raise Exception

    def get_vote(
        self,
        item_id: int,
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    result = cur.execute(
                        """
                        SELECT user_id
                        FROM item_votes
                        WHERE item_id=%s;
                        """,
                        [item_id],
                    )
                    votes = []
                    for record in result.fetchall():
                        votes.append(record[0])
                    return VotesList(votes=votes)

                except Exception as e:
                    print("error: ", e)
                    raise Exception

    def delete_vote(self, item_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM item_votes
                        WHERE item_id = %s AND user_id = %s
                        RETURNING *
                        """,
                        [item_id, user_id],
                    )
                    response = cur.fetchone()
                    return response
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")
