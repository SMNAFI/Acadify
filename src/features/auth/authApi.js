import { apiSlice } from '../api/apiSlice'
import { userLoggedIn } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled

          // local storage update
          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          )
          // state update
          dispatch(
            userLoggedIn({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          )
        } catch (error) {}
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled

          // local storage update
          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          )
          // state update
          dispatch(
            userLoggedIn({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          )
        } catch (error) {}
      },
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = authApi
