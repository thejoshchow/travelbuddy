import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetOneTripQuery } from "../services/tripsApi"
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
import TripAdmin from './TripAdminForm'
import AddModal from "../components/AddModal"
import { useSelector, useDispatch } from "react-redux"
import { setRoles, getRoles } from "../state/auth/roleSlice"
import { useIsBuddyQuery } from "../services/buddiesApi"
import accomodationsImage from './tripOverviewPlaceholderphotos/accomodations.jpg';
import transportImage from './tripOverviewPlaceholderphotos/transport2.jpg';
import diningImage from './tripOverviewPlaceholderphotos/dining.jpg';
import miscImage from './tripOverviewPlaceholderphotos/misc.jpg';
import activitiesImage from './tripOverviewPlaceholderphotos/activities.jpg';
import placeholder from './tripOverviewPlaceholderphotos/placeholder.png'

const TripOverview = () => {
    const [showModal, setShowModal] = useState(false);
    const { trip_id } = useParams();
    const { data: trip } = useGetOneTripQuery(trip_id);
    const { data: categories } = useGetCategoriesQuery(trip_id);
    const { data: buddies } = useGetBuddyQuery(trip_id);
    const { data: buddyRoles, isSuccess } = useIsBuddyQuery(trip_id);
    const dispatch = useDispatch()
    const roles = useSelector(getRoles)

    if (isSuccess) {
        dispatch(setRoles(buddyRoles))
    }
    

    if (categories === undefined || trip === undefined || buddies === undefined ) {
        return null
    }

function skewCard() {
    const degree = Math.floor(Math.random()*20) - 10;
    return degree.toString() + 'deg';
}

    
    return (
    <>
        <AddModal show={showModal} onHide={() => setShowModal(false)} modaltitle='Update trip' form={<TripAdmin trip_id={trip_id} />} />
        <div className="trip-overview"> <h1>Trip Overview</h1> </div>
        <Container className="details">
          
            <Card style={{ width: '18rem' }} className="card-container-trip-details">
                <Card.Header className="header-trip-details"><strong>Trip Details</strong></Card.Header>
                <a onClick={() => roles.admin? setShowModal(true) : null} style={{textDecoration: 'none'}}>
                    <Card.Body className="trip-detail-body">
                        <Card.Title className="card-title-trip-details"></Card.Title>
                        <ul>
                            <li>{trip.name}</li> 
                            <li>{trip.location}</li>
                            <li>{trip.start_date}</li>
                            <li>{trip.end_date}</li>
                            <li>{trip.picture_url}</li> 
                        </ul>
                    </Card.Body>
                </a>    
            </Card>
            
            <Card style={{ width: '18rem' }} className="card-container-cost">
                <Card.Body className="trip-total-cost-body">
                    <Card.Title className="card-title-cost">Total Cost</Card.Title>
                    {<div className="total-cost"><strong>$1097.56</strong></div>}
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
           
        <Container className="categories" >
           {categories.map((category) => (
               
              
               <Card 
                    style={{ 
                        width: '18rem', 
                        transform: `rotate(${skewCard()})`
                    }} 
                    className="card-container-categories" 
                    key={category.category_id}>
                
                    <Card.Body className="category-body">
                       {
                           category.category_name === "accommodations"
                        ? <img className="images" src={accomodationsImage} alt="accommodations"/>
                        : category.category_name === "transportation"
                        ? <img className="images" src={transportImage} alt="transportation" />
                        : category.category_name === "dining"
                        ? <img className="images" src={diningImage} alt="dining" />
                        : category.category_name === "activities"
                        ? <img className="images" src={activitiesImage} alt="activities" />
                        : category.category_name === "miscellaneous"
                        ?<img className="images" src={miscImage} alt="Transport" />
                        : <img className="images" src={placeholder} alt='placeholder' />
                        }
                    </Card.Body>
                    <Card.Footer className="categories">
                        <strong>{category.category_name}</strong> 
                    </Card.Footer>
                   </Card>
            
            ))}
        </Container>
             
    </>
    )
}
                   
       
                        
                         
                        
                
        
      


export default TripOverview