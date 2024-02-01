import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (trip_id) => ({
                url: `/api/trip/${trip_id}/category`,
                method: 'GET',
            })
        })
    })
})

export const { useGetCategoriesQuery} = categoryApi