import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAddBuddyMutation,useDeleteBuddyMutation } from "../services/buddiesApi";
import SuccessAlert from "../components/SucessAlert";
import Spinner from "../components/Spinner";

const AddBuddyForm = ({ trip_id }) => {
    const [username, setUsername] = useState('');
    const [selectedOption, setSelectedOption] = useState(true);
    const [addBuddy, {isLoading, isSuccess}] = useAddBuddyMutation();
    const [deleteBuddy] = useDeleteBuddyMutation();
    const navigate = useNavigate();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleFormChange = (event) => {
        setSelectedOption(event.target.value);
    }

   const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const data = {
                user: username,
                buddy: selectedOption
            }

            const info = {
                form: data,
                trip_id: trip_id,
            };

            await addBuddy(info).unwrap();
            setUsername('');

        } catch (error) {
            console.error('Error adding buddy', error);
        }

    }
                
    const handleDeleteBuddy = async () => {
   
    try {
        await deleteBuddy({ trip_id }).unwrap();
        console.log('Successfully left the trip');
        navigate('/dashboard');
    } catch (error) {
        console.error('Error deleting buddy', error);
    }
}
        


return (
    <div className="container">
        <Spinner isLoading={isLoading} />
        <SuccessAlert isSuccess={isSuccess} message='Buddy added!' />
        <form className={!isSuccess ? null : 'd-none' } onSubmit={handleSubmit}>
            <div className='form-floating mb-3'>
                <input
                    className='form-control'
                    onChange={handleUsernameChange}
                    type="text"
                    value={username}
                    placeholder="Buddy's username or email"
                />
                <label htmlFor='username'>Buddy's username or email</label>
            </div>

            <div className="form-check mb-3 mx-3" style={{ marginTop: '10px' }}>
                <input
                    value={true}
                    onChange={handleFormChange}
                    type="radio"
                    className="form-check-input"
                    id="buddy"
                    name="buddyOrGuest"/>
                <label
                    className="form-check-label"
                    htmlFor="buddy">
                        Buddy
                </label>
            </div>

            <div className="form-check mb-3 mx-3" style={{ marginTop:'10px' }}>
                <input
                    value={false}
                    onChange={handleFormChange}
                    type="radio"
                    className="form-check-input"
                    id="guest"
                    name="buddyOrGuest"/>
                <label
                    className="form-check-label"
                    htmlFor="guest">
                        Guest
                </label>
                </div>
            <div className="whos-going-modal-buttons">
            <button className='btn blue-button' type="submit">Add Buddy</button>
            <button 
            onClick={handleDeleteBuddy}
            className='btn btn-danger btn-margin-remove-buddy' 
            type="button">
            I'm not going...
            </button>
            </div>
        </form>
    </div>

    );
}

export default AddBuddyForm;
