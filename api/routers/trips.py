from typing import Union

from fastapi import APIRouter, Depends, HTTPException

from authentication.authentication import authenticator
from queries.trips import TripIn, TripRepo, TripOut, BuddyIn, BuddyOut
from queries.errors import Error


router = APIRouter()


@router.post("/api/trip")
def create_trip(
    trip_form: TripIn,
    trips: TripRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[TripOut, Error]:
    try:
        trip_form.owner = account_data["user_id"]
        trip = trips.create(trip_form)
        trips.add_buddy(
            BuddyIn(user_id=account_data["user_id"], buddy=True), trip.trip_id
        )
        return trip
    except Exception:
        raise HTTPException(status_code=400, detail="Create trip failed")


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


@router.delete("/api/trip/{trip_id}")
def delete_trip(trip_id: int, trips: TripRepo = Depends()) -> bool:
    return trips.delete(trip_id)


@router.get("/api/trip")
def get_all_trips_for_user(user_id: int, trips: TripRepo = Depends()):
    return trips.get_all(user_id)


@router.post("/trip/trip_id/buddy")
def add_buddy(
    info: BuddyIn, trip_id: int, trips: TripRepo = Depends()
) -> Union[BuddyOut, Error]:
    try:
        return trips.add_buddy(info, trip_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Add buddy failed")
