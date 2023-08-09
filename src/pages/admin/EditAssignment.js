import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useEditAssignmentMutation,
    useGetAssignmentQuery,
} from '../../features/assignments/assignmentsApi'
import { useGetVideosQuery } from '../../features/videos/videosApi'
import AdminNav from './../../components/AdminNav'
import Error from '../../ui/Error'

const EditAssignment = () => {
    const { assignmentId } = useParams()
    const { data: videos } = useGetVideosQuery()
    const { data: assignment, isSuccess: fetched } =
        useGetAssignmentQuery(assignmentId)
    const [editAssignment, { isSuccess, isLoading, isError }] =
        useEditAssignmentMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [assignmentFor, setAssignmentFor] = useState('')
    const [totalMark, setTotalMark] = useState(100)

    useEffect(() => {
        if (fetched) {
            setTitle(assignment.title)
            setAssignmentFor(assignment.video_id)
            setTotalMark(assignment.totalMark)
        }
    }, [fetched, assignment])

    const handleSubmit = (e) => {
        e.preventDefault()

        // eslint-disable-next-line
        const selectedVideo = videos.find((v) => v.id == assignmentFor)

        editAssignment({
            assignmentId,
            data: {
                title,
                video_id: selectedVideo.id,
                video_title: selectedVideo.title,
                totalMark: Number(totalMark),
            },
        })
    }

    useEffect(() => {
        if (isSuccess === true) {
            navigate('/admin/assignment')
        }
    }, [isSuccess, navigate])

    return (
        <>
            <AdminNav />

            <div className='container relative'>
                <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
                    <h1 className='mt-4 mb-8 text-3xl font-bold text-center'>
                        Edit Assignment
                    </h1>

                    <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
                        <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                            <form className='space-y-6' onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor='title'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Assignment Title
                                    </label>
                                    <input
                                        type='text'
                                        name='title'
                                        id='title'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        required
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='video'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Assignment for
                                    </label>
                                    <select
                                        value={assignmentFor}
                                        onChange={(e) =>
                                            setAssignmentFor(e.target.value)
                                        }
                                        id='video'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    >
                                        <option value='' hidden>
                                            Select a video
                                        </option>

                                        {videos?.length > 0 &&
                                            videos.map((v) => (
                                                <option key={v.id} value={v.id}>
                                                    {v.title}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor='totalMark'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Total Mark
                                    </label>
                                    <input
                                        type='number'
                                        name='totalMark'
                                        id='totalMark'
                                        min={0}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        required
                                        value={totalMark}
                                        onChange={(e) =>
                                            setTotalMark(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    disabled={isLoading}
                                    type='submit'
                                    className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                >
                                    Update
                                </button>
                            </form>
                        </div>

                        {isError && <Error>Something went wrong.</Error>}
                    </div>
                </main>
            </div>
        </>
    )
}

export default EditAssignment
