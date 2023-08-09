import React from 'react'
import { useGetVideosQuery } from '../features/videos/videosApi'
import Video from './Video'
import Loader from '../ui/Loader'
import Error from './../ui/Error'
import Info from './../ui/Info'

const VideoList = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery()

  let content = null

  if (isLoading) {
    content = <Loader />
  } else if (!isLoading && isError) {
    content = <Error>Something went wrong!</Error>
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <Info>No video found!</Info>
  } else if (!isLoading && !isError && videos.length > 0) {
    content = (
      <>
        {videos.map((v) => (
          <Video key={v.id} video={v} />
        ))}
      </>
    )
  }

  return (
    <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30'>
      {content}
    </div>
  )
}

export default VideoList
