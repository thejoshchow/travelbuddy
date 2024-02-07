import { useState, useEffect } from "react";
import { useGetOneTripQuery, useUpdateTripMutation } from "../services/tripsApi";
import SuccessAlert from "../components/SucessAlert";
import Spinner from "../components/Spinner";

const TripAdmin = ({trip_id}) => {
    const { data: trip } = useGetOneTripQuery(trip_id)
    const [updateTrip, {isSuccess, isLoading}] = useUpdateTripMutation()
    const [formChange, setFormChange] = useState({
        name: '',
        location: '',
        start_date: '',
        end_date: ''
    })

    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const d = {
            name: formChange.name,
            location: formChange.location,
            start_date: formChange.start_date,
            end_date: formChange.end_date
        }

        const info = {
            form: d,
            trip_id: trip_id
        }
        await updateTrip(info).unwrap()

    }

    useEffect(() => {
        if (trip) {
            setFormChange({
                name: trip.name,
                location: trip.location,
                start_date: trip.start_date,
                end_date: trip.end_date
            })
        }

    }, [trip])

    return (
        <>
        <div className='container'>
            <Spinner isLoading={isLoading} />
            <SuccessAlert isSuccess={isSuccess} message='Trip details updated successfully'/>
            <form className={!isSuccess ? null: 'd-none'} onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <input onChange={handleFormChange} value={formChange.name} className='form-control' name='name' type='text' />
                </div>
                <div className='mb-3'>
                    <input onChange={handleFormChange} value={formChange.location} className='form-control' name='location' type='text' />
                </div>
                <div className='mb-3'>
                    <input onChange={handleFormChange} value={formChange.start_date} className='form-control' name='start_date' type='date'/>
                </div>
                <div className='mb-3'>
                    <input onChange={handleFormChange} value={formChange.end_date} className='form-control' name='end_date' type='date' />
                </div>
                <button className='btn blue-button'>Update trip</button>
            </form>
        </div>
        </>
    )
}

export default TripAdmin;