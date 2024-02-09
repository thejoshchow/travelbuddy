import { useUpdateUserMutation, useGetCurrentUserQuery } from "../services/usersApi";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import SuccessAlert from "../components/SucessAlert";


const UsersUpdate = () => {
    const { data: userData } = useGetCurrentUserQuery()
    const [updateUser, {isLoading, isSuccess}] = useUpdateUserMutation()
    const[formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        display_name: '',
        picture_url: '',
        phone: ''
    })


     const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({...data, [name]:value}))

     }

    const handlesubmit = (event) => {
        event.preventDefault()
        updateUser(formData)
    }

    useEffect(() => {
        if (userData) {
            setFormData({
                first_name: userData.first_name,
                last_name: userData.last_name,
                display_name: userData.display_name,
                picture_url: userData.picture_url,
                phone: userData.phone
            })
        }
    }, [userData])
    return (
        <>
        <div className='container mt-5'>
            <Spinner isLoading={isLoading} />
            <SuccessAlert isSuccess={isSuccess} message='Profile updated' />
            <div className={!isSuccess ? "shadow p-4" : 'd-none'} style={{ border: '2px solid black', borderRadius: '8px'}}>
                <h1 className='text-center mb-3'>Update user profile</h1>
                <form onSubmit={handlesubmit}>
                    <div className='form-floating mb-3'>       
                        <input className="form-control" id='firstname' type="text" name="first_name"  value={formData.first_name} onChange={handleChange} placeholder="First Name" />
                        <label htmlFor="firstname">First name</label>
                    </div>
                    <div className='form-floating mb-3'> 
                        <input className="form-control" id='lastname' type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="last Name" />
                        <label htmlFor="lastname">Last name</label>
                    </div>
                    <div className='form-floating mb-3'> 
                        <input className="form-control" id='displayname'  type="text" name="display_name" value={formData.display_name} onChange={handleChange} placeholder="display Name"/>
                        <label htmlFor="displayname">Display name</label>
                    </div>
                    <div className='form-floating mb-3'> 
                        <input className="form-control" id='phone' type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="phone"/>
                        <label htmlFor="phone">Phone</label>
                    </div>
                    <div className='d-flex justify-content-center align-content-center'>
                        <button className='btn btn-primary' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default UsersUpdate
