import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    tagTypes: ['votes', 'items'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        deleteVote: build.mutation({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/item/${info.item_id}/vote`,
                method: "delete",
            }),
            invalidatesTags: ['votes'],
        }),
        addItem: build.mutation({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/item`,
                method: 'post',
                body: info.form
            }),
            invalidatesTags: ['items'],
        }),
        getItems: build.query({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/category/${info.category_id}`,
                method: 'get'
            }),
            providesTags: ['items'],
        }),
        addVote: build.mutation({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/item/${info.item_id}/vote`,
                method: "post",
            }),
            invalidatesTags: ['votes'],
        }),
        getVotes: build.query({
            query: (item_id) => ({
                url: `/api/item/${item_id}/vote`,
                method: "get"
            }),
            providesTags: ['vote']
        }),
    })
})

export const {useGetVotesQuery, useDeleteVoteMutation, useAddItemMutation, useGetItemsQuery, useAddVoteMutation } = itemsApi
