import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from './authSlice';

export const RequireAuth = () => {
    const token = useSelector(selectToken)
    const location = useLocation()
    return token ?
        <Outlet />
        : <Navigate to='/login' state={{ from: location }} />
}

export default RequireAuth;