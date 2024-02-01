import React from "react"
import { useParams } from "react-router-dom"
import { useGetOneTripQuery } from "../services/tripApi"
import { useGetCategoriesQuery} from "../services/categoryApi"
import { useGetBuddyQuery } from "../services/buddiesApi"

const TripOverview = () => {
    const { trip_id } = useParams();
    const { data: trip } = useGetOneTripQuery(trip_id);
    const { data: categories } = useGetCategoriesQuery(trip_id);
    const { data: buddies } = useGetBuddyQuery(trip_id);
    if (categories === undefined || trip === undefined || buddies === undefined ) {
        return null
    }
    
    return (
        <>
            <h1>Trip Overview</h1>
            <div className="container d-flex wrap">
                <div>
                    <h5>Trip details</h5>
                    <ul>
                        <li>{trip.name}</li> 
                        <li>{trip.location}</li>
                        <li>{trip.start_date}</li>
                        <li>{trip.end_date}</li>
                        <li>{trip.picture_url}</li> 
                        

                    </ul>
                </div>
                {categories.map((category) =>(
                    <div key={category.category_id}>
                        {category.category_name}
                    </div>
                    
                ))
                }       
                <div>
                    <h5>Who's going</h5>
                    {buddies.buddies.map((buddy) => (
                        <div key={buddy.user_id}>
                            {buddy.display_name}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TripOverview