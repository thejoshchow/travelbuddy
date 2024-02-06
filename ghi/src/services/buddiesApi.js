import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const buddiesApi = createApi({
    reducerPath: 'buddiesApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBuddy: builder.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}/buddy`,
                method: 'GET',
            }),
        }),
        isBuddy: builder.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}/role`,
                method: 'GET'
            })
        })
    }),
})

export const { useGetBuddyQuery, useIsBuddyQuery } = buddiesApi;
