from typing import Union

from fastapi import APIRouter, Depends, HTTPException

from authentication.authentication import authenticator
from authentication.accounts import Authorize
from queries.trips import (
    TripIn,
    TripRepo,
    TripOut,
    BuddyIn,
    BuddyOut,
    TripListOut,
    TripBuddyList,
)
from queries.errors import Error
from pexels.pexels import PexelsApi


router = APIRouter()


@router.post("/api/trip")
def create_trip(
    trip_form: TripIn,
    trips: TripRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    pexels: PexelsApi = Depends(),
) -> Union[TripOut, Error]:
    user_id = account_data["user_id"]
    user = account_data["username"]
    pic = pexels.get_pic(trip_form.location)
    try:
        trip = trips.create(trip_form, user_id, picture=pic)
        trips.add_buddy(
            BuddyIn(user=user, buddy=True, admin=True),
            trip.trip_id,
            user_id,
        )
        return trip
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Create trip failed")


@router.put("/api/trip/{trip_id}")
def update_trip(
    trip_id: int,
    trip_form: TripIn,
    trips: TripRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[TripOut, Error]:
    user_id = account_data["user_id"]
    is_admin = auth.is_buddy(user_id, trip_id).admin
    if is_admin:
        try:
            return trips.update(trip_id, trip_form)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/api/trip/{trip_id}")
def get_one_trip(
    trip_id: int,
    trips: TripRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[TripOut, Error]:
    isBuddy = auth.is_buddy(account_data["user_id"], trip_id)
    if isBuddy.participant:
        try:
            trip_data = trips.get_one_trip(trip_id)
            return trip_data
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"error: {e}")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.delete("/api/trip/{trip_id}")
def delete_trip(
    trip_id: int,
    trips: TripRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["user_id"]
    is_admin = auth.is_buddy(user_id, trip_id).admin
    if is_admin:
        try:
            return {"deleted": trips.delete(trip_id)}
        except Exception:
            raise HTTPException(status_code=400, detail="Delete trip failed")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/api/trip")
def get_all_trips_for_user(
    trips: TripRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> TripListOut:
    try:
        user_id = account_data["user_id"]
        return trips.get_all(user_id)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400,
            detail=f"Could not get trips for {account_data['username']}",
        )


@router.post("/api/trip/{trip_id}/buddy")
def add_buddy(
    info: BuddyIn,
    trip_id: int,
    trips: TripRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[BuddyOut, Error]:
    print(info, trip_id, account_data)
    user_id = account_data["user_id"]
    is_buddy = auth.is_buddy(user_id, trip_id)
    if is_buddy.buddy:
        try:
            buddy_user_id = trips.get_id_from_username(info)
            return trips.add_buddy(info, trip_id, buddy_user_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Add buddy failed")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/api/trip/{trip_id}/buddy")
def get_trip_buddies(
    trip_id: int,
    trips: TripRepo = Depends(),
    auth: Authorize = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> TripBuddyList:
    user_id = account_data["user_id"]
    is_buddy = auth.is_buddy(user_id, trip_id)
    if is_buddy.buddy:
        try:
            buddies = trips.get_buddies(trip_id)
            return TripBuddyList(buddies=buddies)
        except Exception:
            raise HTTPException(
                status_code=400, detail="Could not get trip buddies"
            )
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")
