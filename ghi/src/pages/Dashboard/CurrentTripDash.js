import { useGetAllTripsQuery } from "../../services/tripsApi";
import TripsDisplay from "./TripDisplayfun";
import AddModal from "../../components/AddModal";
import { useState } from "react";
import CreateTrip from "./CreateTrip";
import "../../styles/current_trip.css"


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
            
                <div className="btn-container">
                    <button className="create-trip-btn" onClick={() => setShow(true)}>Create Trip</button>
                </div>
            <div className='trips-container'>
            {current.map((trip) => {
                    return (
                        <div className='trip-cards-container' key={trip.id}>
                            <TripsDisplay className='trips-cards' trip={trip} />
                        </div>
                    )
            })}
            </div>
        
        </>
    )
}

export default CurrentDash;
