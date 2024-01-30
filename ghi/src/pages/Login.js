import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

import { useGetAccountQuery, useLoginMutation } from '../features/auth/authApi';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [login] = useLoginMutation()
    const { data: token, refetch, isSeuccss } = useGetAccountQuery()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const info = {
                username: username,
                password: password
            }
            const result = await login(info).unwrap()
            if (result.access_token) {
                setSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        refetch()
    }, [success])

    if (token) {
        navigate('/dashboard')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;