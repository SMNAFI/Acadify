import { apiSlice } from '../api/apiSlice'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
        }),
    }),
})

export const { useGetUsersQuery } = userApi
