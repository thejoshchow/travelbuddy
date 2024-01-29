import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['token'],
  baseQuery: baseQuery /* use the same baseQuery for all api slices */,
  endpoints: (build) => ({
    login: build.mutation({
      query: (info) => {
        let formData = new FormData()
        formData.append("username", info.username)
        formData.append("password", info.password)
        return ({
          url: '/token',
          method: "POST",
          credentials: "include",
          body: formData
        })
      },
      providesTags: ['token']
    }),
    logout: build.mutation({
      query: () => ({
        url: '/token',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['token']
    }),
    getAccount: build.query({
      query: () => ({
        url: '/token',
        credentials: 'include'
      }),
      providesTags: ['token']
    }),
  })
});

export const { useLoginMutation, useLogoutMutation, useGetAccountQuery } = authApi