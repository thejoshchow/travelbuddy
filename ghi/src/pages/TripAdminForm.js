import { useState, useEffect } from "react";
import {
    useGetOneTripQuery,
    useUpdateTripMutation,
    useDeleteTripMutation,
} from "../services/tripsApi";
import SuccessAlert from "../components/SucessAlert";
import Spinner from "../components/Spinner";
import AddModal from "../components/AddModal";
import { useNavigate } from "react-router-dom";

const TripAdmin = ({ trip_id }) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { data: trip } = useGetOneTripQuery(trip_id);
    const [updateTrip, { isSuccess, isLoading }] = useUpdateTripMutation();
    const [deleteTrip] = useDeleteTripMutation();
    const [formChange, setFormChange] = useState({
        name: "",
        location: "",
        start_date: "",
        end_date: "",
    });

    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const d = {
            name: formChange.name,
            location: formChange.location,
            start_date: formChange.start_date,
            end_date: formChange.end_date,
            picture_url: trip.picture_url,
        };

        const info = {
            form: d,
            trip_id: trip_id,
        };
        await updateTrip(info).unwrap();
    };

    const handleDeleteClick = () => {
        deleteTrip(trip_id);
        navigate("/dashboard");
    };

    useEffect(() => {
        if (trip) {
            setFormChange({
                name: trip.name,
                location: trip.location,
                start_date: trip.start_date,
                end_date: trip.end_date,
                picture_url: trip.picture_url,
            });
        }
    }, [trip]);

    return (
        <>
            <AddModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                modaltitle="Are you sure?"
                form={
                    <div className="d-flex justify-content-around">
                        <button
                            onClick={handleDeleteClick}
                            className="btn btn-danger"
                            type="button"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="btn blue-button"
                            type="button"
                        >
                            Go back
                        </button>
                    </div>
                }
            ></AddModal>
            <div className="container">
                <Spinner isLoading={isLoading} />
                <SuccessAlert
                    isSuccess={isSuccess}
                    message="Trip details updated successfully"
                />
                <form
                    className={!isSuccess ? null : "d-none"}
                    onSubmit={handleSubmit}
                >
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFormChange}
                            value={formChange.name}
                            id="trip-name"
                            className="form-control"
                            name="name"
                            type="text"
                        />
                        <label htmlFor="trip-name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFormChange}
                            value={formChange.location}
                            id="trip-location"
                            className="form-control"
                            name="location"
                            type="text"
                        />
                        <label htmlFor="trip-location">Location</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFormChange}
                            value={formChange.start_date}
                            id="trip-start"
                            className="form-control"
                            name="start_date"
                            type="date"
                        />
                        <label htmlFor="trip-start">Start date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFormChange}
                            value={formChange.end_date}
                            id="trip-end"
                            className="form-control"
                            name="end_date"
                            type="date"
                        />
                        <label htmlFor="trip-end">End date</label>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn blue-button" type="submit">
                            Update trip
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn btn-danger"
                            type="button"
                        >
                            Delete trip
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TripAdmin;
