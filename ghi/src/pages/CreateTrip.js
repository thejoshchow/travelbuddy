import { useState } from "react";
import { useCreateTripMutation } from "../services/tripsApi";
import SuccessAlert from "../components/SucessAlert";
import Spinner from "../components/Spinner";


const CreateTrip = () => {
    const [createTrip, {isLoading, isSuccess}] = useCreateTripMutation()
    const [setError] = useState('');

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

        .then(result => {
            if (result.error) {
                setError(`Could not create the trip. Error: Please fill out all forms properly.`);
            }else{
                setFormData({
                    name: '',
                    location: '',
                    start_date: '',
                    end_date: '',
                    picture_url: '',
                });
            }
        })
    }

    return (
        <div className="container">
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
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTrip;
