
import { useGetAllTripsQuery } from "../features/trips/tripsApi";


const PrevTripDash = () => {
    const {data:past} = useGetAllTripsQuery()
    if (past === undefined) {
        return null
    }
    return (
        <>

             < ul className="list-group">
                {past.trips.map((trip, index) => {
                    if (new Date(trip.end_date.replace(/-/g, "/" )) < new Date()) {

                        return (
                            <li key={index} className="list-group-item">{trip.name}</li>
                        )
                    }
                })}
                    <li className="list-group-item"></li>
            </ul >

        </>
    )
}

export default PrevTripDash;
