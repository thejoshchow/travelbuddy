import "../../styles/App.css";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetOneTripQuery } from "../../services/tripsApi";
import { useGetCategoriesQuery } from "../../services/categoryApi";
import { useGetBuddyQuery } from "../../services/buddiesApi";

import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBuddyForm from "../AddBuddyForm";
import TripAdmin from "../TripAdminForm";
import AddModal from "../../components/AddModal";
import { useSelector, useDispatch } from "react-redux";
import { setRoles, getRoles } from "../../state/auth/roleSlice";
import { useIsBuddyQuery } from "../../services/buddiesApi";
import accomodationsImage from "../../ph_photos/accomodations.jpg";
import transportImage from "../../ph_photos/transport2.jpg";
import diningImage from "../../ph_photos/dining.jpg";
import miscImage from "../../ph_photos/misc.jpg";
import activitiesImage from "../../ph_photos/activities.jpg";
import placeholder from "../../ph_photos/placeholder.png";
import Error from "../../components/Error";

const TripOverview = () => {
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showBuddyModal, setShowBuddyModal] = useState(false);
    const { trip_id } = useParams();
    const { data: trip, isError } = useGetOneTripQuery(trip_id);
    const { data: categories } = useGetCategoriesQuery(trip_id);
    const { data: buddies } = useGetBuddyQuery(trip_id);
    const { data: buddyRoles, isSuccess } = useIsBuddyQuery(trip_id);
    const dispatch = useDispatch();
    const roles = useSelector(getRoles);

    function skewCard() {
        const degree = Math.floor(Math.random() * 20) - 10;
        return degree.toString() + "deg";
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setRoles(buddyRoles));
        }
    });

    if (isError) {
        return <Error />;
    } else if (
        categories === undefined ||
        trip === undefined ||
        buddies === undefined
    ) {
        return null;
    }
    return (
        <>
            <AddModal
                show={showAdminModal}
                onHide={() => setShowAdminModal(false)}
                modaltitle="Update trip"
                form={<TripAdmin trip_id={trip_id} />}
            />
            <AddModal
                show={showBuddyModal}
                onHide={() => setShowBuddyModal(false)}
                modaltitle="Add buddy"
                form={<AddBuddyForm trip_id={trip_id} />}
            />
            <div className="trip-overview">
                <h1>{trip.name}</h1>
            </div>
            <Container className="details">
                <Link
                    onClick={() =>
                        roles.admin ? setShowAdminModal(true) : null
                    }
                    style={{ textDecoration: "none" }}
                >
                    <Card
                        style={{ width: "18rem", minHeight: "250px" }}
                        className="card-container-trip-details"
                    >
                        <Card.Header className="header-trip-details">
                            <strong>Trip Details</strong>
                        </Card.Header>
                        <Card.Body className="trip-detail-body">
                            <p>{trip.location}</p>
                            <p>{trip.start_date}</p>
                            <p>{trip.end_date}</p>
                        </Card.Body>
                    </Card>
                </Link>

                <Card
                    style={{ width: "18rem" }}
                    className="card-container-cost"
                >
                    <Card.Header className="card-title-cost">
                        Total Cost
                    </Card.Header>
                    <Card.Body className="trip-total-cost-body">
                        {
                            <div className="total-cost">
                                <strong>$1097.56</strong>
                            </div>
                        }
                    </Card.Body>
                </Card>

                <Link
                    onClick={() => setShowBuddyModal(true)}
                    style={{ textDecoration: "none" }}
                >
                    <Card
                        style={{ width: "18rem" }}
                        className="card-container-buddies"
                    >
                        <Card.Header className="card-header-whos-going">
                            Who's going
                        </Card.Header>
                        <Card.Body className="buddy-body">
                            {buddies.buddies.map((buddy) => (
                                <p key={buddy.user_id}>{buddy.display_name}</p>
                            ))}
                        </Card.Body>
                    </Card>
                </Link>
            </Container>

            <Container className="categories" style={{ maxWidth: "1200px" }}>
                {categories.map((category) => (
                    <Link
                        to={`/trip/${trip_id}/${category.category_id}`}
                        style={{ textDecoration: "none" }}
                        key={category.category_id}
                    >
                        <Card
                            style={{
                                width: "18rem",
                                transform: `rotate(${skewCard()})`,
                            }}
                            className="card-container-categories"
                        >
                            <Card.Body className="category-body">
                                {category.category_name === "accommodations" ? (
                                    <img
                                        className="images"
                                        src={accomodationsImage}
                                        alt="accommodations"
                                    />
                                ) : category.category_name ===
                                  "transportation" ? (
                                    <img
                                        className="images"
                                        src={transportImage}
                                        alt="transportation"
                                    />
                                ) : category.category_name === "dining" ? (
                                    <img
                                        className="images"
                                        src={diningImage}
                                        alt="dining"
                                    />
                                ) : category.category_name === "activities" ? (
                                    <img
                                        className="images"
                                        src={activitiesImage}
                                        alt="activities"
                                    />
                                ) : category.category_name ===
                                  "miscellaneous" ? (
                                    <img
                                        className="images"
                                        src={miscImage}
                                        alt="Transport"
                                    />
                                ) : (
                                    <img
                                        className="images"
                                        src={placeholder}
                                        alt="placeholder"
                                    />
                                )}
                            </Card.Body>
                            <Card.Footer className="categories">
                                <strong>{category.category_name}</strong>
                            </Card.Footer>
                        </Card>
                    </Link>
                ))}
            </Container>
        </>
    );
};

export default TripOverview;
