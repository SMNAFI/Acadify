import React from 'react'

const QuizViewModal = ({ open, control, quizzes, video }) => {
    const handleClose = () => {
        control()
    }
    return (
        open && (
            <>
                <div
                    onClick={handleClose}
                    className='fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer'
                ></div>
                <section className='rounded w-[400px] sm:w-[600px] md:w-[700px] lg:w-[1100px] space-y-8 bg-slate-900 p-10 border-gray-700 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
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
                                                disabled
                                                checked={
                                                    q.options[0].isCorrect ===
                                                    true
                                                }
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
                                                disabled
                                                checked={
                                                    q.options[1].isCorrect ===
                                                    true
                                                }
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
                                                disabled
                                                checked={
                                                    q.options[2].isCorrect ===
                                                    true
                                                }
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
                                                disabled
                                                checked={
                                                    q.options[3].isCorrect ===
                                                    true
                                                }
                                            />
                                            {q.options[3].option}
                                        </label>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        )
    )
}

export default QuizViewModal
