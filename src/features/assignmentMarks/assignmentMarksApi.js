import { apiSlice } from '../api/apiSlice'

export const assignmentsMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignmentMarks: builder.query({
            query: () => '/assignmentMark',
        }),

        getAssignmentMark: builder.query({
            query: (assignmentId) => `/assignmentMark/${assignmentId}`,
        }),

        // from student (assignment submission)
        addAssignmentMark: builder.mutation({
            query: (data) => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled

                    // add assignmentMark pessimistically
                    if (res?.data?.id) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getAssignmentMarks',
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

        // from admin (giving mark)
        updateAssignmentMark: builder.mutation({
            query: ({ assignmentMarkId, data }) => ({
                url: `/assignmentMark/${assignmentMarkId}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const updateResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getAssignmentMarks',
                        undefined,
                        (draft) => {
                            const draftMark = draft.find(
                                // eslint-disable-next-line
                                (dm) => dm.id == arg.assignmentMarkId
                            )

                            draftMark.mark = arg.data.mark
                            draftMark.status = arg.data.status
                        }
                    )
                )

                try {
                    await queryFulfilled
                } catch (error) {
                    updateResult.undo()
                }
            },
        }),
    }),
})

export const {
    useGetAssignmentMarkQuery,
    useGetAssignmentMarksQuery,
    useAddAssignmentMarkMutation,
    useUpdateAssignmentMarkMutation,
} = assignmentsMarkApi
