import React from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { selectToken } from "../state/auth/authSlice";


const Landing = () => {
    const token = useSelector(selectToken)
    return (
        <>
            <Link to='/dashboard'>Dashboard</Link>
            <h1>Hello world</h1>
            <p>You are {token ? null : 'not'} logged in</p>
            <Link to='/login'>Login</Link>
        </>
    )
}

export default Landing;
