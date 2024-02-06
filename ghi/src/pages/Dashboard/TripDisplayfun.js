import { useGetAllTripsQuery } from "../../services/tripsApi"
import { Link } from "react-router-dom"
const TripsDisplay = ({ trip, index }) => {
    const {data} = useGetAllTripsQuery()

    const tripDate = (date) => {
        let curDate = new Date(date.replace(/-/g, "/"))
        curDate.setHours(0, 0, 0, 0)
        return (
            curDate.toDateString().replace(/' '/g, '/')

        )
    }

    return (
        <div className='col align-self-start m-2' key={index}>
            <Link to={`/trip/${trip.trip_id}`} style={{ visited: "none", textDecoration: "none"}}>
                <div className="card" key={index} style={{ width: 250 }}>
                    <img src={trip.picture_url}
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-text  text-center text-uppercase">{trip.name}</h5>
                        <p className="card-text text-center text-wrap m-1">
                            From: <strong>{tripDate(trip.start_date)}</strong>
                        </p>

                        <p className="card-text text-center text-wrap m-1">
                            To: <strong>{tripDate(trip.end_date)}</strong>
                        </p>
                    </div>
                </div >
            </Link>
        </div>
    )
}

export default TripsDisplay
