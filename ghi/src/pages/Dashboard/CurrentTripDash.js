
import { useGetAllTripsQuery } from "../../services/tripsApi";
import TripsDisplay from "./TripDisplayfun";
import AddModal from "../../components/AddModal";
import { useState } from "react";
import CreateTrip from "../CreateTrip";


const CurrentDash = () => {
    const { data: upcoming } = useGetAllTripsQuery()
    const [show, setShow] = useState(false)

    const current = upcoming?.trips.filter((trip) => new Date(trip.end_date.replace(/-/g, "/")) >= new Date())

    if (upcoming === undefined) {
        return null
    }

    return (
        <>
            <AddModal show={show} onHide={() => setShow(false)} modaltitle='Create A Trip' form={ <CreateTrip /> } />
            <div className='container'>
            <button onClick={()=> setShow(true)} >Create Trip</button>
            <div className='row m-2'>
            {current.map((trip, index) => {
                    return (
                        <TripsDisplay trip={trip} index={index} />
                    )
            })}
            </div>
        </div>
        </>
    )
}

export default CurrentDash;
