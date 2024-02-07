import { useState } from "react";
import { useAddBuddyMutation } from "../services/buddiesApi";

const AddBuddyForm = ({trip_id}) => {
    const [username, setUsername] = useState('');
    const [selectedOption, setSelectedOption] = useState('buddy');
    const [error, setError] = useState(null);
    const [addBuddy] = useAddBuddyMutation();


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError(null);
    }

    const handleFormChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!username) {
            setError('Username is required');
            return;
        }

        try {
            const data = {
            user: username
            }

            const info = {
                form: data,
                trip_id: trip_id,
            };

            await addBuddy(info);
            setUsername('');
            console.log('Buddy added successfully');

        } catch (error) {
            console.error('Error adding buddy', error);
            setError('An error occurred while adding a buddy');
        }

    }

return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
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
