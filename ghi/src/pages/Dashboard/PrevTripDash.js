
import { useGetAllTripsQuery } from "../../features/trips/tripsApi";
import TripsDisplay from "./TripDisplayfun";
import { Link } from "react-router-dom";


const PrevTripDash = () => {
    const {data:past} = useGetAllTripsQuery()
    if (past === undefined) {
        return null
    }
    console.log(past)
    return (
        <div className='container'>
             <div className='row m-2'>
            {past.trips.map((trip, index) => {
                if (new Date(trip.end_date.replace(/-/g, "/")) < new Date()) {
                    return (

                            <TripsDisplay trip={trip} index={index} />


                    )
                }
            })}
            </div>
        </div>
    )
}

export default PrevTripDash;
