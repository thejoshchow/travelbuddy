import { useState } from "react";
import { useCreateTripMutation } from "../../services/tripsApi";
import SuccessAlert from "../../components/SucessAlert";
import Spinner from "../../components/Spinner";



const CreateTrip = () => {
    const [createTrip, {isLoading, isSuccess, isError}] = useCreateTripMutation()

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        start_date: '',
        end_date: '',
        picture_url: '',
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({...data, [name]:value}))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createTrip(formData)
        if (!isError) {
            setFormData({
                name: '',
                location: '',
                start_date: '',
                end_date: '',
                picture_url: '',
            });
        }
    }

    return (
        <div className="container">
            <Spinner isLoading={isLoading} />
            <SuccessAlert isSuccess={isSuccess} message='Trip added'/>
            <form className={!isSuccess ? null: 'd-none'} onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" name='name' value={formData.name} onChange={handleChange} id='trip-name' className="form-control" placeholder="Trip name" />
                    <label htmlFor="trip-name">Trip name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" name='location' value={formData.location} onChange={handleChange} id='trip-location' className="form-control" placeholder="Location" />
                    <label htmlFor="trip-location">Location</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="date" name='start_date' value={formData.start_date} onChange={handleChange} id='trip-start' className="form-control" />
                    <label htmlFor="trip-start">Start date</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="date" name='end_date' value={formData.end_date} id='trip-end' onChange={handleChange} className="form-control" />
                    <label htmlFor="trip-end">End date</label>
                </div>
                <button className='btn blue-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTrip;
