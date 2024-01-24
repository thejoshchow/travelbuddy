from typing import Union
from fastapi import APIRouter, Depends, HTTPException
from queries.trips import TripIn, TripRepo, TripOut
from queries.errors import Error


router = APIRouter()


@router.post("/api/trip")
def create_trip(
    trip_form: TripIn, trips: TripRepo = Depends()
) -> Union[TripOut, Error]:
    return trips.create(trip_form)


@router.put("/api/trip/{trip_id}")
def update_trip(
    trip_id: int, trip_form: TripIn, trips: TripRepo = Depends()
) -> Union[TripOut, Error]:
    try:
        return trips.update(trip_id, trip_form)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"error: {e}")


@router.get("/api/trip/{trip_id}")
def get_one_trip(
    trip_id: int,
    trips: TripRepo = Depends(),
) -> Union[TripOut, Error]:
    trip_data = trips.get_one_trip(trip_id)
    try:
        return trip_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"error: {e}")
