import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../services/baseQuery";

export const tripsApi = createApi({
    reducerPath: 'trips',
    baseQuery: baseQuery,
    tagTypes: ['TripsList'],
    endpoints: (build) => ({
        createTrip: build.mutation({
            query: (info) => ({
                url: "/api/trip",
                body: info,
                method: "post",
            }),
            invalidatesTags: ['TripsList']
        })
    })
})

export const { useCreateTripMutation } = tripsApi
