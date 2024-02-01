
import { useGetAllTripsQuery } from "../features/trips/tripsApi";

const CurrentDash = () => {
    const { data: upcoming } = useGetAllTripsQuery()

    if (upcoming === undefined) {
        return null
    }

    return (
        <>

             < ul className="list-group">
                {upcoming.trips.map((trip, index) => {
                    if (new Date(trip.end_date.replace(/-/g, "/" )) >= new Date()) {
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

export default CurrentDash;
