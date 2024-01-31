import { useState } from "react";
import { tripsApi, useCreateTripMutation } from "../features/trips/tripsApi";


const CreateTrip = () => {
    const [createTrip, result] = useCreateTripMutation()
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        start_date: '',
        end_date: '',
        picture_url: '',
    })

    const handleChange = (e) => {
        const type = e.target.type;
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

    }})



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' value={formData.name} onChange={handleChange} />
                <input type="text" name='location' value={formData.location} onChange={handleChange} />
                <input type="date" name='start_date' value={formData.start_date}  onChange={handleChange} />
                <input type="date" name='end_date' value={formData.end_date} onChange={handleChange} />
                <input type="text" name='picture_url' value={formData.picture_url} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTrip;
