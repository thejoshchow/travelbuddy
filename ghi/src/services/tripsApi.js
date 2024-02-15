import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const tripsApi = createApi({
    reducerPath: "trips",
    baseQuery: baseQuery,
    tagTypes: ["TripsList", "oneTrip"],
    endpoints: (build) => ({
        getAllTrips: build.query({
            query: () => "/api/trip",
            providesTags: ["TripsList"],
        }),
        createTrip: build.mutation({
            query: (info) => ({
                url: "/api/trip",
                body: info,
                method: "post",
            }),
            invalidatesTags: ["TripsList"],
        }),
        updateTrip: build.mutation({
            query: (trip) => ({
                url: `/api/trip/${trip.trip_id}`,
                body: trip.form,
                method: "put",
            }),
            invalidatesTags: ["oneTrip"],
        }),
        getOneTrip: build.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}`,
                method: "GET",
            }),
            providesTags: ["oneTrip"],
        }),
        deleteTrip: build.mutation({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}`,
                method: "delete",
            }),
            invalidatesTags: ["TripsList"],
        }),
    }),
});

export const {
    useGetOneTripQuery,
    useCreateTripMutation,
    useGetAllTripsQuery,
    useUpdateTripMutation,
    useDeleteTripMutation,
} = tripsApi;
