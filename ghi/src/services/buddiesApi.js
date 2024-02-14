import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const buddiesApi = createApi({
    reducerPath: 'buddiesApi',
    baseQuery: baseQuery,
    tagTypes: ["buddy"],
    endpoints: (builder) => ({
        getBuddy: builder.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}/buddy`,
                method: 'GET',
            }),
            providesTags:["buddy"],
        }),

        addBuddy: builder.mutation({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/buddy`,
                method: 'POST',
                body: info.form,
            }),
            invalidatesTags: ["buddy"],
        }),
        isBuddy: builder.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}/role`,
                method: 'GET'
            })
        })
    }),
})

export const { useGetBuddyQuery, useIsBuddyQuery, useAddBuddyMutation } = buddiesApi;
