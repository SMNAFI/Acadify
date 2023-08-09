import { apiSlice } from '../api/apiSlice'

export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizMarks: builder.query({
            query: () => '/quizMark',
        }),

        addQuizMark: builder.mutation({
            query: (data) => ({
                url: '/quizMark',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // pessimistic cache update
                try {
                    const res = await queryFulfilled

                    if (res?.data?.id) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getQuizMarks',
                                undefined,
                                (draft) => {
                                    draft.push(res.data)
                                }
                            )
                        )
                    }
                } catch (error) {
                    // error will be caught in the ui
                }
            },
        }),
    }),
})

export const { useGetQuizMarksQuery, useAddQuizMarkMutation } = quizMarkApi
