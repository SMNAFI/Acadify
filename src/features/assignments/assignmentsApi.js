import { apiSlice } from '../api/apiSlice'

export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => '/assignments',
        }),

        getAssignment: builder.query({
            query: (assignmentId) => `/assignments/${assignmentId}`,
        }),

        addAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignments',
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
                                'getAssignments',
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

        editAssignment: builder.mutation({
            query: ({ assignmentId, data }) => ({
                url: `assignments/${assignmentId}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled

                    // cache update pessimistically
                    if (res?.data?.id) {
                        // update cache for videos

                        const { title, video_id, video_title, totalMark } =
                            res.data

                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getAssignments',
                                undefined,
                                (draft) => {
                                    const draftAssignment = draft.find(
                                        // eslint-disable-next-line
                                        (t) => t.id == arg.assignmentId
                                    )

                                    draftAssignment.title = title
                                    draftAssignment.video_id = video_id
                                    draftAssignment.video_title = video_title
                                    draftAssignment.totalMark = totalMark
                                }
                            )
                        )

                        // update cache for that particular video
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getAssignment',
                                arg.assignmentId,
                                (draft) => {
                                    draft.title = title
                                    draft.video_id = video_id
                                    draft.video_title = video_title
                                    draft.totalMark = totalMark
                                }
                            )
                        )
                    }
                } catch (error) {}
            },
        }),

        deleteAssignment: builder.mutation({
            query: (assignmentId) => ({
                url: `/assignments/${assignmentId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(assignmentId, { dispatch, queryFulfilled }) {
                // optimistic cache update
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getAssignments',
                        undefined,
                        (draft) => {
                            // eslint-disable-next-line
                            return draft.filter((d) => d.id != assignmentId)
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
    useGetAssignmentQuery,
    useGetAssignmentsQuery,
    useAddAssignmentMutation,
    useEditAssignmentMutation,
    useDeleteAssignmentMutation,
} = assignmentsApi
