
import { useGetAllTripsQuery } from "../../features/trips/tripsApi";
import TripsDisplay from "./TripDisplayfun";
import { Link } from "react-router-dom";


const CurrentDash = () => {
    const { data: upcoming } = useGetAllTripsQuery()

    if (upcoming === undefined) {
        return null
    }

    return (

             <div className='container'>
             <div className='row m-2'>
            {upcoming.trips.map((trip, index) => {
                if (new Date(trip.end_date.replace(/-/g, "/")) >= new Date()) {
                    return (
                        <TripsDisplay trip={trip} index={index} />

                    )
                }
            })}
            </div>
        </div>

    )
}

export default CurrentDash;
