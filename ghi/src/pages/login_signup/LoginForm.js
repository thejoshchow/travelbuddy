import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { setToken } from '../../state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../styles/Loginpage.css';


function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();


  const token = useSelector((state) => state.auth.token)



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.username = username;
        data.password = password;

      try {
        const result = await login(data).unwrap();
        dispatch(setToken(result.access_token));
        setSuccess(true)

      } catch (error) {
        console.error('Login error, please check your credentials', error);
      }
    };

  useEffect(() => {
            if (token) {
                navigate('/dashboard')
            }
        }, [success, navigate, token])

  return (
    <div className="login-container">
      <div className="split right">
        <div className="centered-right">
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#ff9f1c' }}>Login</h1>
          <div className="offset-md-3 col-md-6" style={{ border: '2px solid #ff9f1c' }}>
            <div className="shadow p-4 mt-2">
              <form onSubmit={handleSubmit} id="login-form">

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

      <div className="split left">
        <div className="centered">
        <img src="TB_transparent_logo_orange.png" alt="" style={{ width: '400px', height: 'auto', filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))' }} />
        <h2 style={{ color: '#ff9f1c' }}>Welcome!</h2>
        <p>
          <Link className='not-a-buddy' to="/signup" >Not a buddy?</Link>
        </p>
      </div>

      </div>

    </div>
  );





}

export default LoginForm;
