import React from "react"
import { useParams } from "react-router-dom"
import { useGetOneTripQuery } from "../services/tripApi"
import { useGetCategoriesQuery} from "../services/categoryApi"
import { useGetBuddyQuery } from "../services/buddiesApi"
import {Container, 
        Row, 
        Col, 
        Card, 
        Form, 
        Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

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
        
        <div className="trip-overview"> <h1>Trip Overview</h1> </div>
        <Container className="details">
          
            <Card style={{ width: '18rem' }} className="card-container-trip-details">
                <Card.Body className="trip-detail-body">
                    <Card.Title className="card-title-trip-details">Trip details</Card.Title>
                    <ul>
                        <li>{trip.name}</li> 
                        <li>{trip.location}</li>
                        <li>{trip.start_date}</li>
                        <li>{trip.end_date}</li>
                        <li>{trip.picture_url}</li> 
                    </ul>
                </Card.Body>
                </Card>
            <Card style={{ width: '18rem' }} className="card-container-buddies">
                <Card.Body className="buddy-body">
                    <Card.Title>Who's going</Card.Title>
                    {buddies.buddies.map((buddy) => (
                        <p key={buddy.user_id}>
                            {buddy.display_name}
                        </p>
                    ))}
                </Card.Body>
                </Card>
            </Container>
              <Container className="categories">
            {categories.map((category) =>(
                <Card style={{ width: '18rem' }} className="card-container-categories" key={category.category_id}>
                    <Card.Body className="category-body">
                     <div className ="category-items"> {category.category_name} </div>  
                    </Card.Body>
                </Card>
            ))}
        </Container>
    </>
    )
}
       
        
      


export default TripOverview