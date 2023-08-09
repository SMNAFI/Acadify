import React from 'react'
import { useState } from 'react'
import { useAddAssignmentMarkMutation } from '../features/assignmentMarks/assignmentMarksApi'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const SubmissionModal = ({ open, control, assignment }) => {
    const [repoLink, setRepoLink] = useState('')
    const [addAssignmentMark, { isLoading, isSuccess }] =
        useAddAssignmentMarkMutation()
    const { user } = useSelector((state) => state.auth)
    const { id: student_id, name: student_name } = user
    const { id: assignment_id, totalMark, title } = assignment

    const handleSubmit = (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure?') === true) {
            addAssignmentMark({
                student_id,
                student_name,
                assignment_id,
                title,
                createdAt: new Date().toISOString(),
                totalMark,
                mark: 0,
                repo_link: repoLink,
                status: 'pending',
            })
        }
    }

    const handleClose = () => {
        setRepoLink('')
        control()
    }

    useEffect(() => {
        if (isSuccess) {
            control()
        }
        // eslint-disable-next-line
    }, [isSuccess])

    return (
        open && (
            <>
                <div
                    onClick={handleClose}
                    className='fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer'
                ></div>
                <div className='rounded w-[400px] md:w-[600px] space-y-8 bg-slate-900 p-10 border-gray-700 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
                    <h2 className='mt-6 text-center text-2xl font-extrabold text-cyan'>
                        Submit Your Assignment
                    </h2>
                    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                        <div className='rounded-md shadow-sm -space-y-px'>
                            <div className='mb-3 space-y-2'>
                                <label
                                    htmlFor='repoLink'
                                    className='text-sm font-medium'
                                >
                                    Github Repository Link
                                </label>
                                <input
                                    id='repoLink'
                                    name='repoLink'
                                    type='url'
                                    required
                                    className='border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white'
                                    value={repoLink}
                                    onChange={(e) =>
                                        setRepoLink(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                disabled={isLoading}
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    )
}

export default SubmissionModal
