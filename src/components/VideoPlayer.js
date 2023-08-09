import React from 'react'

const VideoPlayer = ({ url }) => {
    return (
        <iframe
            width='100%'
            className='aspect-video'
            src={url}
            title='Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
        ></iframe>
    )
}

export default VideoPlayer
