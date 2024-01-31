import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from '../services/authApi'
import { setToken, selectToken } from "../state/auth/authSlice";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [login] = useLoginMutation()
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            username: username,
            password: password,
        }
        const response = await login(form).unwrap()
        dispatch(setToken(response?.access_token))
        setSuccess(true)
        setUsername('')
        setPassword('')
        console.log(token)
    }
    
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [success])

    return (
        <>
            <Link to="/">Home</Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input required value={username} onChange={(e) => setUsername(e.target.value)} type='username' placeholder='Username' />
                </div>
                <div>
                    <input required value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Password" />
                </div>
                <button type='submit'>Log in</button>
            </form>
        </>
    )
}

export default Login;