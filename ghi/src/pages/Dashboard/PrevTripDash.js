
import { useGetAllTripsQuery } from "../../services/tripsApi";
import TripsDisplay from "./TripDisplayfun";

const PrevTripDash = () => {
    const { data: trips } = useGetAllTripsQuery()

    const past = trips?.trips.filter((trip) => new Date(trip.end_date.replace(/-/g, "/")) <= new Date())

    if (past === undefined) {
        return null
    }
    console.log(past)
    return (
        <>
        <div className='container'>
            <div className='row m-2'>
            {past.map((trip, index) => <TripsDisplay trip={trip} index={index} />
            )}
            </div>
        </div>
        </>
    )
}

export default PrevTripDash;
