import React, { useState } from 'react';
import AddModal from "../components/AddModal";
import AddBuddyForm from './AddBuddyForm';


function AddBuddyModal() {

    const [show, setShow] = useState(false);

    return (
        <div>
            <AddModal
                show={show}
                onHide={() => setShow(false)}
                modaltitle='Add Buddy'
                form={<AddBuddyForm trip_id={6} />} />
            <div className='container'>
                <button className="blue-button blue-button:hover" onClick={() => setShow(true)}>Add Buddy</button>
            </div>

        </div>
    )

}

export default AddBuddyModal;
