from typing import Union
from fastapi import APIRouter, Depends
from queries.trips import TripIn, TripRepo, TripOut, Error


router = APIRouter()


@router.post('/api/trip')
def create_trip(
        trip_form: TripIn,
        trips: TripRepo = Depends()
        ) -> Union[TripOut, Error]:
    return trips.create(trip_form)
