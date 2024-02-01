import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';

export const tripApi = createApi({
    reducerPath: 'tripApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getOneTrip: builder.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}`,
                method: 'GET',
            })
        })
    })
})

export const { useGetOneTripQuery } = tripApi