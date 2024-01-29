import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setToken } from './authSlice'
import { useGetAccountQuery } from './authApi'

const CheckAuth = () => {
    const dispatch = useDispatch()
    const { data } = useGetAccountQuery()
    if (data?.access_token) {
        dispatch(setToken(data))
    }
    return <Outlet />
}

export default CheckAuth;