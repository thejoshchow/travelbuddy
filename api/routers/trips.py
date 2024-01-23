from typing import Union
from fastapi import APIRouter, Depends, HTTPException
from queries.trips import TripIn, TripRepo, TripOut, Error


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
