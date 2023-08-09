import { apiSlice } from '../api/apiSlice'

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
        }),

        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),

        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled

                    // add video pessimistically
                    if (res?.data?.id) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getVideos',
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

        editVideo: builder.mutation({
            query: ({ videoId, data }) => ({
                url: `videos/${videoId}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled

                    // cache update pessimistically
                    if (res?.data?.id) {
                        // update cache for videos

                        const { title, description, url, views, duration } =
                            res.data

                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getVideos',
                                undefined,
                                (draft) => {
                                    const draftTask = draft.find(
                                        // eslint-disable-next-line
                                        (t) => t.id == arg.videoId
                                    )

                                    draftTask.title = title
                                    draftTask.description = description
                                    draftTask.url = url
                                    draftTask.views = views
                                    draftTask.duration = duration
                                }
                            )
                        )

                        // update cache for that particular video
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getVideo',
                                arg.videoId,
                                (draft) => {
                                    draft.title = title
                                    draft.description = description
                                    draft.url = url
                                    draft.views = views
                                    draft.duration = duration
                                }
                            )
                        )
                    }
                } catch (error) {}
            },
        }),

        deleteVideo: builder.mutation({
            query: (videoId) => ({
                url: `/videos/${videoId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(videoId, { dispatch, queryFulfilled }) {
                // optimistic cache update
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getVideos',
                        undefined,
                        (draft) => {
                            // eslint-disable-next-line
                            return draft.filter((d) => d.id !== videoId)
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
    useGetVideosQuery,
    useGetVideoQuery,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation,
} = videosApi
