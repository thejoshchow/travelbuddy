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
        <div className="create-trip-modal">
            <Spinner isLoading={isLoading} />
            <SuccessAlert isSuccess={isSuccess} message='Trip added'/>
            <form className={!isSuccess ? null: 'd-none'} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name='name' value={formData.name} onChange={handleChange} className="form-control" placeholder="Trip name"/>
                </div>
                <div className="mb-3">
                    <input type="text" name='location' value={formData.location} onChange={handleChange} className="form-control" placeholder="Location" />
                </div>
                <div className="mb-3">
                    <input type="date" name='start_date' value={formData.start_date}  onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <input type="date" name='end_date' value={formData.end_date} onChange={handleChange} className="form-control"/>
                </div>
                <div className="create-trip-submit-container">
                    <button className='create-trip-submit' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTrip;
