import { useEffect, useState } from "react";
import { useGetAccountQuery, useUpdateAccountMutation } from "../services/authApi";
import Spinner from "../components/Spinner";
import SuccessAlert from "../components/SucessAlert";


const AccountUpdate = () => {
    const { data: accountData } = useGetAccountQuery();
    const [updateAccount, {isLoading, isSuccess}] = useUpdateAccountMutation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    }

    const handleUpdatedPasswordChange = (event) => {
        setUpdatedPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (updatedPassword !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const data = {
                username: username,
                email: email,
                current_password: currentPassword,
                new_password: updatedPassword,
                confirm_new_password: confirmPassword,
            };
            console.log(data)
            const response = await updateAccount(data)
            console.log(response)

        } catch (error) {
            console.error('An error occurred while updating account details', error);

        }
    }
        useEffect(() => {
        if (accountData) {
            setUsername(accountData.account.username)
            setEmail(accountData.account.email)
        }
    }, [accountData]);

    return (
        <div className="account-update-container mt-5">
            <div className="d-flex align-items-center">
            <div className="offset-3 col-6">
                <Spinner isLoading={isLoading} />
                <SuccessAlert isSuccess={isSuccess} message='Account details updated'/>
                <div className={!isSuccess ? "shadow p-4" : 'd-none'} style={{ border: '2px solid black', borderRadius: '8px'}}>
                <h1 style={{ textAlign: 'center' }}>Update Account Details</h1>
                <form onSubmit={handleSubmit} id="account-update-form">

                    <div className="form-floating mb-3">
                    <input
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        required type="text"
                        name="username"
                        id="username"
                        value={username}
                        className="form-control"
                        disabled readOnly />

                    <label htmlFor="username">Username</label>
                    </div>

                    <div className="form-floating mb-3">
                    <input
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required type="text"
                        name="email"
                        id="email"
                        value={email}
                        className="form-control"/>
                    <label htmlFor="name">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                    <input
                        onChange={handleCurrentPasswordChange}
                        placeholder="Current Password"
                        required type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={currentPassword}
                        className="form-control"/>
                    <label htmlFor="name">Current Password</label>
                    </div>

                    <div className="form-floating mb-3">
                    <input
                        onChange={handleUpdatedPasswordChange}
                        placeholder="Updated Password"
                        type="password"
                        name="updatedPassword"
                        id="updatedPassword"
                        value={updatedPassword}
                        className="form-control"/>
                    <label htmlFor="name">New Password</label>
                    </div>

                    <div className="form-floating mb-3">
                    <input
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        className="form-control"/>
                    <label htmlFor="name">Confirm Password</label>
                    </div>

                    <div className="container d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary login-button">Submit</button>
                    </div>

                </form>
                </div>
            </div>
            </div>
        </div>
);



}
export default AccountUpdate;
