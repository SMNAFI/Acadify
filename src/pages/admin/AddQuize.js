import React, { useState, useEffect } from 'react'
import { useGetVideosQuery } from '../../features/videos/videosApi'
import { useNavigate } from 'react-router-dom'
import { useAddQuizMutation } from '../../features/quizze/quizzeApi'
import AdminNav from '../../components/AdminNav'
import Error from '../../ui/Error'

const AddQuize = () => {
    const { data: videos } = useGetVideosQuery()
    const [addQuiz, { isSuccess, isLoading, isError }] = useAddQuizMutation()
    const navigate = useNavigate()

    const [question, setQuestion] = useState('')
    const [quizFor, setQuizFor] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [isCorrect1, setIsCorrect1] = useState('')
    const [isCorrect2, setIsCorrect2] = useState('')
    const [isCorrect3, setIsCorrect3] = useState('')
    const [isCorrect4, setIsCorrect4] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // eslint-disable-next-line
        const selectedVideo = videos.find((v) => v.id == quizFor)

        addQuiz({
            question,
            video_id: selectedVideo.id,
            video_title: selectedVideo.title,
            options: [
                {
                    id: 1,
                    option: option1,
                    isCorrect: isCorrect1 === 'true' ? true : false,
                },
                {
                    id: 2,
                    option: option2,
                    isCorrect: isCorrect2 === 'true' ? true : false,
                },
                {
                    id: 3,
                    option: option3,
                    isCorrect: isCorrect3 === 'true' ? true : false,
                },
                {
                    id: 4,
                    option: option4,
                    isCorrect: isCorrect4 === 'true' ? true : false,
                },
            ],
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/quizzes')
        }
    }, [isSuccess, navigate])

    return (
        <>
            <AdminNav />

            <div className='container relative'>
                <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
                    <h1 className='mt-4 mb-8 text-3xl font-bold text-center'>
                        Add Quiz
                    </h1>

                    <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
                        <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                            <form className='space-y-6' onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor='question'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Question Title
                                    </label>
                                    <input
                                        type='text'
                                        name='question'
                                        id='question'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        required
                                        value={question}
                                        onChange={(e) =>
                                            setQuestion(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='quizFor'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Quiz for
                                    </label>
                                    <select
                                        value={quizFor}
                                        onChange={(e) =>
                                            setQuizFor(e.target.value)
                                        }
                                        required
                                        id='quizFor'
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

                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label
                                            htmlFor='option1'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            Option 1
                                        </label>
                                        <input
                                            type='text'
                                            name='option1'
                                            id='option1'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                            required
                                            value={option1}
                                            onChange={(e) =>
                                                setOption1(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='isCorrect1'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            True or False
                                        </label>
                                        <select
                                            id='isCorrect1'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            value={isCorrect1}
                                            onChange={(e) =>
                                                setIsCorrect1(e.target.value)
                                            }
                                            required
                                        >
                                            <option value='' hidden></option>
                                            <option value='false'>False</option>
                                            <option value='true'>True</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label
                                            htmlFor='option2'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            Option 2
                                        </label>
                                        <input
                                            type='text'
                                            name='option2'
                                            id='option2'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                            required
                                            value={option2}
                                            onChange={(e) =>
                                                setOption2(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='isCorrect2'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            True or False
                                        </label>
                                        <select
                                            id='isCorrect2'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            value={isCorrect2}
                                            onChange={(e) =>
                                                setIsCorrect2(e.target.value)
                                            }
                                            required
                                        >
                                            <option value='' hidden></option>
                                            <option value='false'>False</option>
                                            <option value='true'>True</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label
                                            htmlFor='option3'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            Option 3
                                        </label>
                                        <input
                                            type='text'
                                            name='option3'
                                            id='option3'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                            required
                                            value={option3}
                                            onChange={(e) =>
                                                setOption3(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='isCorrect3'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            True or False
                                        </label>
                                        <select
                                            id='isCorrect3'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            value={isCorrect3}
                                            onChange={(e) =>
                                                setIsCorrect3(e.target.value)
                                            }
                                            required
                                        >
                                            <option value='' hidden></option>
                                            <option value='false'>False</option>
                                            <option value='true'>True</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label
                                            htmlFor='option4'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            Option 4
                                        </label>
                                        <input
                                            type='text'
                                            name='option4'
                                            id='option4'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                            required
                                            value={option4}
                                            onChange={(e) =>
                                                setOption4(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='isCorrect4'
                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                        >
                                            True or False
                                        </label>
                                        <select
                                            id='isCorrect4'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            value={isCorrect4}
                                            onChange={(e) =>
                                                setIsCorrect4(e.target.value)
                                            }
                                            required
                                        >
                                            <option value='' hidden></option>
                                            <option value='false'>False</option>
                                            <option value='true'>True</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    disabled={isLoading}
                                    type='submit'
                                    className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    {isError && <Error>Something went worng.</Error>}
                </main>
            </div>
        </>
    )
}

export default AddQuize
