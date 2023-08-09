import React from 'react'
import PortalNav from '../../components/PortalNav'
import { useGetAssignmentMarksQuery } from '../../features/assignmentMarks/assignmentMarksApi'
import { useGetUsersQuery } from '../../features/user/userApi'
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const LeaderBoard = () => {
    const loggedInUser = useSelector((state) => state.auth.user)
    const { data: users, isSuccess: usersFetched } = useGetUsersQuery()
    const { data: marks, isSuccess: marksFetched } =
        useGetAssignmentMarksQuery()
    const { data: quizMarks, isSuccess: quizMarksFetched } =
        useGetQuizMarksQuery()

    const [calculatedList, setCalculatedList] = useState([])

    // Leaderboard calculation
    useEffect(() => {
        if (usersFetched && marksFetched && quizMarksFetched) {
            const markList = []
            users.forEach((u) => {
                if (u.role === 'student') {
                    const totalQuizMark = quizMarks.reduce(
                        (total, q) =>
                            u.id === q.student_id ? total + q.mark : total,
                        0
                    )
                    const totalAssignmentMark = marks.reduce(
                        (total, a) =>
                            u.id === a.student_id ? total + a.mark : total,
                        0
                    )

                    markList.push({
                        id: u.id,
                        name: u.name,
                        assignmentMark: totalAssignmentMark,
                        quizMark: totalQuizMark,
                        totalMark: totalAssignmentMark + totalQuizMark,
                        rank: 0,
                    })
                }
            })

            // sotring based on mark -> decreasing order
            markList.sort((a, b) => {
                if (a.totalMark > b.totalMark) {
                    return -1
                } else if (a.totalMark < b.totalMark) {
                    return 1
                } else {
                    return 0
                }
            })

            // rank calculation
            let currentRank = 1,
                prevMark = 0
            markList.forEach((user) => {
                if (user.totalMark < prevMark) {
                    currentRank++
                }
                user.rank = currentRank
                prevMark = user.totalMark
            })

            setCalculatedList(markList)
        }
    }, [marksFetched, usersFetched, quizMarksFetched, users, marks, quizMarks])

    // find logged in user in the calculated list
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        if (calculatedList?.length > 0) {
            setCurrentUser(calculatedList.find((u) => u.id === loggedInUser.id))
        }
    }, [loggedInUser, calculatedList])

    return (
        <>
            <PortalNav />
            <section className='py-6 bg-primary'>
                <div className='mx-auto max-w-7xl px-5 lg:px-0'>
                    <div>
                        <h3 className='text-lg font-bold'>
                            Your Position in Leaderboard
                        </h3>
                        <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
                            <thead>
                                <tr>
                                    <th className='table-th !text-center'>
                                        Rank
                                    </th>
                                    <th className='table-th !text-center'>
                                        Name
                                    </th>
                                    <th className='table-th !text-center'>
                                        Quiz Mark
                                    </th>
                                    <th className='table-th !text-center'>
                                        Assignment Mark
                                    </th>
                                    <th className='table-th !text-center'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentUser?.id && (
                                    <tr className='border-2 border-cyan'>
                                        <td className='table-td text-center font-bold'>
                                            {currentUser.rank}
                                        </td>
                                        <td className='table-td text-center font-bold'>
                                            {currentUser.name}
                                        </td>
                                        <td className='table-td text-center font-bold'>
                                            {currentUser.quizMark}
                                        </td>
                                        <td className='table-td text-center font-bold'>
                                            {currentUser.assignmentMark}
                                        </td>
                                        <td className='table-td text-center font-bold'>
                                            {currentUser.totalMark}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='my-8'>
                        <h3 className='text-lg font-bold'>Top 20 Result</h3>
                        <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
                            <thead>
                                <tr className='border-b border-slate-600/50'>
                                    <th className='table-th !text-center'>
                                        Rank
                                    </th>
                                    <th className='table-th !text-center'>
                                        Name
                                    </th>
                                    <th className='table-th !text-center'>
                                        Quiz Mark
                                    </th>
                                    <th className='table-th !text-center'>
                                        Assignment Mark
                                    </th>
                                    <th className='table-th !text-center'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {calculatedList.map(
                                    (user) =>
                                        user.rank <= 20 && (
                                            <tr
                                                key={user.id}
                                                className='border-b border-slate-600/50'
                                            >
                                                <td className='table-td text-center'>
                                                    {user.rank}
                                                </td>
                                                <td className='table-td text-center'>
                                                    {user.name}
                                                </td>
                                                <td className='table-td text-center'>
                                                    {user.quizMark}
                                                </td>
                                                <td className='table-td text-center'>
                                                    {user.assignmentMark}
                                                </td>
                                                <td className='table-td text-center'>
                                                    {user.totalMark}
                                                </td>
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeaderBoard
