import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../services/authApi';
import { setToken } from '../state/auth/authSlice';
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
    };


  return (
    <div className="login-container">
      <div className="split right">
        <div className="centered-right">
        <div className="d-flex align-items-center">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 style={{ textAlign: 'center' }}>Login</h1>
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

              <div className="container d-flex justify-content-center align-items-center">
                <button className="btn btn-primary login-button">Login</button>
              </div>
            </form>
          </div>
        </div>
          </div>
          </div>
      </div>

      <div className="split left">
        <div class="centered">
        <img src="logo-transparent-png.png" alt="" style={{ width: '400px', height: 'auto' }} />
        <h2>Welcome!</h2>
        <p>blah blah blah</p>
      </div>

      </div>

    </div>
  );





}

export default LoginForm;
