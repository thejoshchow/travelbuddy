import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        deleteVote: build.mutation({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/item/${info.item_id}/vote`,
                method: "delete",
            })
        }),
        addItem: build.mutation({
            query: (info, trip_id=7) => ({
                url: `/api/trip/${trip_id}/item`,
                method: 'post',
                body: info
            })
        }),
        getItems: build.query({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/category/${info.category_id}`,
                method: 'get'
            })
        })
    })

})

export const { useDeleteVoteMutation, useAddItemMutation, useGetItemsQuery } = itemsApi