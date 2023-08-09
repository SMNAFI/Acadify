import React, { useEffect, useState } from 'react'
import {
    useGetAssignmentMarksQuery,
    useUpdateAssignmentMarkMutation,
} from '../../features/assignmentMarks/assignmentMarksApi'
import Error from '../../ui/Error'
import Info from '../../ui/Info'
import Loader from '../../ui/Loader'
import AdminNav from '../../components/AdminNav'
import AssignmentMark from './AssignmentMark'

const AssignmentMarkList = () => {
    const {
        data: assignments,
        isLoading,
        isError,
        isSuccess,
    } = useGetAssignmentMarksQuery()
    const [updateAssignmentMark] = useUpdateAssignmentMarkMutation()
    const [pending, setPending] = useState(0)

    useEffect(() => {
        if (isSuccess && assignments?.length > 0) {
            let count = 0
            assignments.forEach((a) => {
                count += a.status === 'pending' ? 1 : 0
            })

            setPending(count)
        }
    }, [assignments, isSuccess])

    const handleAddMark = (assignmentMarkId, mark, totalMark) => {
        if (mark >= 0 && mark <= totalMark) {
            updateAssignmentMark({
                assignmentMarkId,
                data: {
                    mark,
                    status: 'published',
                },
            })
        } else {
            alert(`Mark should between 0-${totalMark}`)
        }
    }

    let content = null

    if (isLoading) {
        content = <Loader />
    } else if (!isLoading && isError) {
        content = <Error>Something went wrong!</Error>
    } else if (!isLoading && !isError && assignments?.length === 0) {
        content = <Info>No assignment found!</Info>
    } else if (!isLoading && !isError && assignments?.length > 0) {
        content = (
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                    <tr>
                        <th className='table-th'>Assignment</th>
                        <th className='table-th'>Date</th>
                        <th className='table-th'>Student Name</th>
                        <th className='table-th'>Repo Link</th>
                        <th className='table-th'>Mark</th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-slate-600/50'>
                    {assignments.map((a) => (
                        <AssignmentMark
                            key={a.id}
                            data={a}
                            handleAddMark={handleAddMark}
                        />
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <AdminNav />
            <section className='py-6 bg-primary'>
                <div className='mx-auto max-w-full px-5 lg:px-20'>
                    <div className='px-3 py-20 bg-opacity-10'>
                        <ul className='assignment-status'>
                            <li>
                                Total <span>{assignments?.length || 0}</span>
                            </li>
                            <li>
                                Pending <span>{pending}</span>
                            </li>
                            <li>
                                Mark Sent{' '}
                                <span>
                                    {Math.max(
                                        (assignments?.length || 0) - pending,
                                        0
                                    )}
                                </span>
                            </li>
                        </ul>
                        <div className='overflow-x-auto mt-4'>{content}</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AssignmentMarkList
