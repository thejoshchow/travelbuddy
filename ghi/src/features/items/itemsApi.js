import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        deleteVote: build.mutation({
            query: (info) => ({
                url: `/api/trip/${info.trip_id}/item/${info.item_id}/vote`,
                method: "delete",
            })
        })
    })
})

export const { useDeleteVoteMutation } = itemsApi