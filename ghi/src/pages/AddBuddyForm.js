import { useState } from "react";
import { useAddBuddyMutation } from "../services/buddiesApi";
import SuccessAlert from "../components/SucessAlert";
import Spinner from "../components/Spinner";

const AddBuddyForm = ({ trip_id }) => {
    const [username, setUsername] = useState('');
    const [selectedOption, setSelectedOption] = useState('buddy');
    const [addBuddy, {isLoading, isSuccess}] = useAddBuddyMutation();


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
            user: username
            }

            const info = {
                form: data,
                trip_id: trip_id,
            };

            const response = await addBuddy(info).unwrap();
            setUsername('');

        } catch (error) {
            console.error('Error adding buddy', error);
        }

    }

return (
    <div className="form-container">
        <Spinner isLoading={isLoading} />
        <SuccessAlert isSuccess={isSuccess} message='Buddy added!' />
        <form className={!isSuccess ? null : 'd-none' } onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    onChange={handleUsernameChange}
                    type="text"
                    value={username}
                    style={{ marginLeft: '10px' }}
                />
            </label>

            <div className="add-buddy mb-3" style={{ marginTop: '10px' }}>
                <input
                    value="buddy"
                    onChange={handleFormChange}
                    type="radio"
                    className="form-input"
                    id="buddy"
                    name="buddyOrGuest"
                    checked={selectedOption === 'buddy'} />
                <label
                    className="form-label"
                    htmlFor="buddy"
                    style={{ marginLeft: '10px' }}>
                        Buddy
                </label>
            </div>

            <div className="add-buddy mb-3" style={{ marginTop:'10px' }}>
                <input
                    value="guest"
                    onChange={handleFormChange}
                    type="radio"
                    className="form-input"
                    id="guest"
                    name="buddyOrGuest"
                    checked={selectedOption === 'guest'} />
                <label
                    className="form-label"
                    htmlFor="guest"
                    style={{ marginLeft: '10px' }}>
                        Guest
                </label>
                </div>

        <button type="submit">Add Buddy</button>
        </form>
    </div>

    );
}

export default AddBuddyForm;
