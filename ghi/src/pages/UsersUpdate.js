import { useUpdateUserMutation, useGetCurrentUserQuery } from "../services/usersApi";
import { useState, useEffect } from "react";


const UsersUpdate = () => {
    const { data: userData } = useGetCurrentUserQuery()
    const [updateUser, result, error] = useUpdateUserMutation()
    const[formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        display_name: '',
        picture_url: '',
        phone: ''
    })



    console.log(userData)

     const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({...data, [name]:value}))

     }

    const handlesubmit = (event) => {
        event.preventDefault()
        updateUser(formData)

        if (result.error) {
            console.log(error)

        } else {
            setFormData({
                first_name: '',
                last_name: '',
                display_name: '',
                picture_url: '',
                phone: ''
            })
        }
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
        <form onSubmit={handlesubmit}>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="last Name" />
            <input type="text" name="display_name" value={formData.display_name} onChange={handleChange} placeholder="display Name"/>
            <input type="text" name="picture_url" value={formData.picture_url} onChange={handleChange} placeholder="picture url"/>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="phone"/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default UsersUpdate
