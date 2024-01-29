import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { useSelector } from "react-redux"
    
export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})