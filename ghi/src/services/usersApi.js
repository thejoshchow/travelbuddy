import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        updateUser: build.mutation({
            query: (info) => ({
                url: "/api/user",
                body: info,
                method: "put",
            })
        }),
         getCurrentUser: build.query({
            query: () => "/api/user"
        })
    })
})

export const { useUpdateUserMutation, useGetCurrentUserQuery } = usersApi
