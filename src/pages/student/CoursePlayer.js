import React from 'react'
import VideoDescription from '../../components/VideoDescription'
import VideoPlayer from '../../components/VideoPlayer'
import VideoList from './../../components/VideoList'
import PortalNav from './../../components/PortalNav'
import { useGetVideoQuery } from '../../features/videos/videosApi'
import Loader from '../../ui/Loader'
import Error from '../../ui/Error'
import { useParams } from 'react-router-dom'
import Info from '../../ui/Info'

const CoursePlayer = ({ home = false }) => {
    const { videoId } = useParams()
    const { data: videoData, isLoading, isError } = useGetVideoQuery(videoId)

    let content = null

    if (isLoading) {
        content = <Loader />
    } else if (!isLoading && isError) {
        content = <Error>Something went wrong!</Error>
    } else if (!isLoading && !isError && !videoData) {
        content = <Info>No video found!</Info>
    } else if (!isLoading && !isError && videoData) {
        content = (
            <>
                <VideoPlayer url={videoData.url} />
                <VideoDescription videoData={videoData} />
            </>
        )
    }
    return (
        <>
            <PortalNav />
            <section className='py-6 bg-primary'>
                <div className='mx-auto max-w-7xl px-5 lg:px-0'>
                    <div className='grid grid-cols-3 gap-2 lg:gap-8'>
                        <div className='col-span-full w-full space-y-8 lg:col-span-2'>
                            {home ? (
                                <Info>Please select a video.</Info>
                            ) : (
                                content
                            )}
                        </div>

                        <VideoList />
                    </div>
                </div>
            </section>
        </>
    )
}

export default CoursePlayer
