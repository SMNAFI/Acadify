import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetAssignmentsQuery } from '../features/assignments/assignmentsApi'
import { useGetQuizzesQuery } from '../features/quizze/quizzeApi'
import { useGetAssignmentMarksQuery } from '../features/assignmentMarks/assignmentMarksApi'
import moment from 'moment/moment'
import SubmissionModal from './SubmissionModal'
import SubmitedModal from './SubmitedModal'
import { useGetQuizMarksQuery } from '../features/quizMark/quizMarkApi'
import QuizModal from './QuizModal'
import QuizViewModal from './QuizViewModal'

const VideoDescription = ({ videoData }) => {
    const { data: assignments, isSuccess: assignmentsFetched } =
        useGetAssignmentsQuery()
    const { data: allQuizzes, isSuccess: allQuizzesFetched } =
        useGetQuizzesQuery()
    const { data: marks, isSuccess: marksFetched } =
        useGetAssignmentMarksQuery()
    const { data: quizMarks, isSuccess: quizMarksFetched } =
        useGetQuizMarksQuery()

    const { user } = useSelector((state) => state.auth)
    const [isOpened, setIsOpened] = useState(false)
    const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false)
    const [submitedAssignment, setSubmitedAssignment] = useState({})
    const [assignment, setAssignment] = useState({})
    const [quizs, setQuizs] = useState([])
    const { title, description, createdAt, id: videoId } = videoData
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
    const [quizModalOpen, setQuizModalOpen] = useState(false)
    const [quizViewModalOpen, setQuizViewModalOpen] = useState(false)

    const controlQuizModal = () => {
        setQuizModalOpen((prevState) => !prevState)
    }
    const controlQuizViewModal = () => {
        setQuizViewModalOpen((prevState) => !prevState)
    }
    const controlModal = () => {
        setIsOpened((prevState) => !prevState)
    }
    const confirmSubmit = (link) => {
        setSubmitedAssignment({ link })
    }
    const controlSumittedModal = () => {
        setIsSubmittedModalOpen((prevState) => !prevState)
    }

    // find out if the video has assignment or not
    useEffect(() => {
        setAssignment({})
        if (assignmentsFetched) {
            const assignment = assignments.find((a) => a.video_id === videoId)
            if (assignment?.id) {
                setAssignment(assignment)
            }
        }
    }, [assignmentsFetched, assignments, videoId])

    // find out if the user already submited the assignment or not
    useEffect(() => {
        setSubmitedAssignment({})
        if (marksFetched && assignment?.id) {
            const submited = marks.find(
                (m) =>
                    m.assignment_id === assignment.id &&
                    m.student_id === user?.id
            )
            if (submited?.id) {
                setSubmitedAssignment({ link: submited.repo_link })
            }
        }
    }, [assignment, marks, marksFetched, user])

    // find out if the video has quiz or not
    useEffect(() => {
        setQuizs([])
        if (allQuizzesFetched) {
            // eslint-disable-next-line
            setQuizs(allQuizzes.filter((q) => q.video_id == videoId))
        }
    }, [allQuizzesFetched, allQuizzes, videoId])

    // find out if the user already submited the quiz or not
    useEffect(() => {
        setIsQuizSubmitted(false)
        if (quizMarksFetched && quizs.length > 0) {
            const submited = quizMarks.find(
                (m) =>
                    // eslint-disable-next-line
                    m.video_id == videoId && m.student_id === user?.id
            )
            if (submited?.id) {
                setIsQuizSubmitted(true)
            }
        }
    }, [videoId, quizMarksFetched, quizs, quizMarks, user])

    return (
        <div>
            <h1 className='text-lg font-semibold tracking-tight text-slate-100'>
                {title}
            </h1>
            <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
                Uploaded on {moment(createdAt).format('D MMMM YYYY')}
            </h2>

            <div className='flex gap-4'>
                {assignment?.id && !submitedAssignment?.link && (
                    <button
                        onClick={controlModal}
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                    >
                        এসাইনমেন্ট
                    </button>
                )}
                {assignment?.id && submitedAssignment?.link && (
                    <button
                        onClick={controlSumittedModal}
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                    >
                        আপনি যা জমা দিয়েছেন
                    </button>
                )}
                {quizs.length > 0 && !isQuizSubmitted && (
                    <button
                        onClick={controlQuizModal}
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                    >
                        কুইজে অংশগ্রহণ করুন
                    </button>
                )}
                {quizs.length > 0 && isQuizSubmitted && (
                    <button
                        onClick={controlQuizViewModal}
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                    >
                        কুইজ দেখুন
                    </button>
                )}
                {quizs.length === 0 && (
                    <button
                        disabled
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm'
                    >
                        কুইজ নেই
                    </button>
                )}
            </div>
            <p className='mt-4 text-sm text-slate-400 leading-6'>
                {description}
            </p>

            <SubmissionModal
                open={isOpened}
                control={controlModal}
                assignment={assignment}
                confirmSubmit={confirmSubmit}
            />
            <SubmitedModal
                open={isSubmittedModalOpen}
                control={controlSumittedModal}
                link={submitedAssignment.link}
            />
            <QuizModal
                open={quizModalOpen}
                control={controlQuizModal}
                quizzes={quizs}
                video={videoData}
                user={user}
            />
            <QuizViewModal
                open={quizViewModalOpen}
                control={controlQuizViewModal}
                quizzes={quizs}
                video={videoData}
            />
        </div>
    )
}

export default VideoDescription
