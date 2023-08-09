import { apiSlice } from '../api/apiSlice'

export const quizzeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => '/quizzes',
        }),

        getQuizze: builder.query({
            query: (quizzeId) => `/quizzes/${quizzeId}`,
        }),

        addQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled

                    if (res?.data?.id) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getQuizzes',
                                undefined,
                                (draft) => {
                                    draft.push(res.data)
                                }
                            )
                        )
                    }
                } catch (error) {
                    // error caught in the ui
                }
            },
        }),

        editQuiz: builder.mutation({
            query: ({ quizId, data }) => ({
                url: `quizzes/${quizId}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled

                    // cache update pessimistically
                    if (res?.data?.id) {
                        // update cache for videos

                        const { question, video_id, video_title, options } =
                            res.data

                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getQuizzes',
                                undefined,
                                (draft) => {
                                    const draftQuiz = draft.find(
                                        // eslint-disable-next-line
                                        (t) => t.id == arg.quizId
                                    )

                                    draftQuiz.question = question
                                    draftQuiz.video_id = video_id
                                    draftQuiz.video_title = video_title
                                    draftQuiz.options = options
                                }
                            )
                        )

                        // update cache for that particular video
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getQuizze',
                                arg.quizId,
                                (draft) => {
                                    draft.question = question
                                    draft.video_id = video_id
                                    draft.video_title = video_title
                                    draft.options = options
                                }
                            )
                        )
                    }
                } catch (error) {}
            },
        }),

        deleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `/quizzes/${quizId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(quizId, { dispatch, queryFulfilled }) {
                // optimistic cache update
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getQuizzes',
                        undefined,
                        (draft) => {
                            // eslint-disable-next-line
                            return draft.filter((q) => q.id !== quizId)
                        }
                    )
                )

                try {
                    await queryFulfilled
                } catch (error) {
                    deleteResult.undo()
                }
            },
        }),
    }),
})

export const {
    useGetQuizzesQuery,
    useGetQuizzeQuery,
    useAddQuizMutation,
    useEditQuizMutation,
    useDeleteQuizMutation,
} = quizzeApi
