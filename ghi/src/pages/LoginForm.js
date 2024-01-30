import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { setToken } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.username = username;
        data.password = password;

      try {
        const result = await login(data).unwrap();
        dispatch(setToken(result.access_token))
        return <Navigate to = '/dashboard'/>

      } catch (e) {
        console.log(e)
      }

      // if (token) {
      //   return <Navigate to = '/dashboard'/>
      // }

        // const loginUrl = 'http://localhost:5432/api/token/';
        // const fetchConfig = {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // };

        // const response = await fetch(loginUrl, fetchConfig);
        // if (response.ok) {
        //     const newLogin = await response.json();
        //     console.log(newLogin)

        //     setUsername('');
        //     setPassword('');
        // }

    };


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Travel Buddy Login</h1>
            <form onSubmit={handleSubmit}
              id="login-form">

                <div className="form-floating mb-3">
                <input onChange={handleUsernameChange}
                placeholder="Username"
                required type="text"
                name="username"
                id="username"
                value={username}
                className="form-control" />
                <label htmlFor="name">Username</label>
                </div>

                <div className="form-floating mb-3">
                <input onChange={handlePasswordChange}
                placeholder="Password"
                required type="text"
                name="password"
                id="password"
                value={password}
                className="form-control" />
                <label htmlFor="name">Password</label>
              </div>

              <button className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
  );





}

export default LoginForm;
