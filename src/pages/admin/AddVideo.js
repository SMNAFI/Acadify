import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddVideoMutation } from '../../features/videos/videosApi'
import AdminNav from '../../components/AdminNav'
import Error from '../../ui/Error'

const AddVideo = () => {
    const [addVideo, { isSuccess, error, isLoading }] = useAddVideoMutation()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [views, setViews] = useState('')
    const [duration, setDuration] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        addVideo({
            title,
            description,
            url,
            views,
            duration,
            createdAt: new Date().toISOString(),
        })
    }

    useEffect(() => {
        if (isSuccess === true) {
            navigate('/admin/videos')
        }
    }, [isSuccess, navigate])

    return (
        <>
            <AdminNav />

            <div className='container relative'>
                <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
                    <h1 className='mt-4 mb-8 text-3xl font-bold text-center'>
                        Add Video
                    </h1>

                    <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
                        <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                            <form className='space-y-6' onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor='title'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Video Title
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
                                        htmlFor='description'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Video Description
                                    </label>
                                    <textarea
                                        id='description'
                                        rows='4'
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='url'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Video Url
                                    </label>
                                    <input
                                        type='url'
                                        name='url'
                                        id='url'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        required
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='views'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Views
                                    </label>
                                    <input
                                        type='text'
                                        name='views'
                                        id='views'
                                        value={views}
                                        onChange={(e) =>
                                            setViews(e.target.value)
                                        }
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='duration'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Duration
                                    </label>
                                    <input
                                        type='text'
                                        name='duration'
                                        id='duration'
                                        value={duration}
                                        onChange={(e) =>
                                            setDuration(e.target.value)
                                        }
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        required
                                    />
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

                        {error && <Error>{error}</Error>}
                    </div>
                </main>
            </div>
        </>
    )
}

export default AddVideo
