import React, { useEffect } from 'react'
import { useAddQuizMarkMutation } from '../features/quizMark/quizMarkApi'
import Error from '../ui/Error'
import { useNavigate } from 'react-router-dom'

const QuizModal = ({ open, control, quizzes, video, user }) => {
    const [addQuizMark, { isSuccess, isLoading, isError }] =
        useAddQuizMarkMutation()
    const navigate = useNavigate()

    const handleClose = () => {
        control()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const selectedOptions = []
        for (let i = 0; i < quizzes.length; i++) {
            for (let j = 1; j <= 4; j++) {
                const option = document.getElementsByName(
                    `option${j}_q${i + 1}`
                )
                selectedOptions.push(option[0].checked)
            }
        }

        // mark calculation
        let totalQuiz = quizzes.length
        let totalCorrect = 0
        let totalWrong = 0
        let totalMark = quizzes.length * 5
        let mark = 0

        let currQuiz = 0
        quizzes.forEach((q) => {
            let correctCount = 0
            for (let i = 0; i < 4; i++) {
                if (
                    q.options[i].isCorrect === selectedOptions[currQuiz * 4 + i]
                ) {
                    correctCount++
                }
            }
            if (correctCount === 4) {
                totalCorrect++
            }
            currQuiz++
        })

        totalWrong = totalQuiz - totalCorrect
        mark = totalCorrect * 5

        addQuizMark({
            student_id: user.id,
            student_name: user.name,
            video_id: video.id,
            video_title: video.title,
            totalQuiz,
            totalCorrect,
            totalWrong,
            totalMark,
            mark,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            control()
            navigate('/leaderboard')
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
                <section className='rounded w-[400px] sm:w-[600px] md:w-[700px] lg:w-[1000px] space-y-8 bg-slate-900 p-10 border-gray-700 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
                    <div className='mx-auto max-w-7xl px-5 lg:px-0'>
                        <div className='mb-8'>
                            <h1 className='text-2xl font-bold'>
                                {video?.title}
                            </h1>
                            <p className='text-sm text-slate-200'>
                                Each question contains 5 Mark
                            </p>
                        </div>
                        <div className='space-y-8 '>
                            {quizzes.map((q, index) => (
                                <div className='quiz' key={q.id}>
                                    <h4 className='question'>
                                        Quiz {index + 1} - {q.question}
                                    </h4>
                                    <form className='quizOptions grid grid-cols-1 md:grid-cols-2'>
                                        {/* <!-- Option 1 --> */}
                                        <label
                                            htmlFor={`option1_q${index + 1}`}
                                        >
                                            <input
                                                type='checkbox'
                                                id={`option1_q${index + 1}`}
                                                name={`option1_q${index + 1}`}
                                            />
                                            {q.options[0].option}
                                        </label>

                                        {/* <!-- Option 2 --> */}
                                        <label
                                            htmlFor={`option2_q${index + 1}`}
                                        >
                                            <input
                                                type='checkbox'
                                                id={`option2_q${index + 1}`}
                                                name={`option2_q${index + 1}`}
                                            />
                                            {q.options[1].option}
                                        </label>

                                        {/* <!-- Option 3 --> */}
                                        <label
                                            htmlFor={`option3_q${index + 1}`}
                                        >
                                            <input
                                                type='checkbox'
                                                id={`option3_q${index + 1}`}
                                                name={`option3_q${index + 1}`}
                                            />
                                            {q.options[2].option}
                                        </label>

                                        {/* <!-- Option 4 --> */}
                                        <label
                                            htmlFor={`option4_q${index + 1}`}
                                        >
                                            <input
                                                type='checkbox'
                                                id={`option4_q${index + 1}`}
                                                name={`option4_q${index + 1}`}
                                            />
                                            {q.options[3].option}
                                        </label>
                                    </form>
                                </div>
                            ))}
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className='px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 '
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {isError && <Error>Something went wrong.</Error>}
                </section>
            </>
        )
    )
}

export default QuizModal
