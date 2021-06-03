import React, { useState, useEffect, createRef } from "react"
import "./GalleryPlayer.css"

import ReactPlayer from "react-player/file"
import GalleryPlayerControls from "../GalleryPlayerControls/GalleryPlayerControls"

import CircularProgress from '@material-ui/core/CircularProgress';

const GalleryPlayer = (props) => {
    const [playing, setPlaying] = useState(true)
    const [ready, setReady] = useState(false)
    const [videoProgress, setVideoProgress] = useState(0)

    const playerRef = createRef();

    const handlePlay = ((play) => {
        setPlaying(play);
    })

    const handleSeek = ((videoFraction) => {
        playerRef.current.seekTo(parseFloat(videoFraction))
        setVideoProgress(videoFraction)
    })

    const handleReady = (() => {
        console.log(props.url, " is ready!")
        setReady(true)
    })

    const handleProgress = ((e) => {
        setVideoProgress(e.played)
    })

    // useEffect(() => {
    //     console.log(props.url, "GalleryPlayer useEffect called")
    //     if (!props.isVisible && videoProgress != 0) {
    //         setVideoProgress(0)
    //         handleSeek(0)
    //     }
    // }, [])

    console.log(props.url, "GalleryPlayer rendered")
    return (
        <div>
            {!ready && <div className="loader"><CircularProgress /></div>}

            {/* <video width="960" height="540">
                <source src={props.url} type="video/mp4" />
            </video> */}

            <ReactPlayer
                ref={playerRef}
                controls={false}
                loop={true}
                wrapper="gallery"
                muted={true}
                playing={props.isVisible ? playing : false}
                url={props.url}
                onReady={handleReady}
                progressInterval={1000}
                onProgress={handleProgress}
                width="960px"
                height="540px"
            />

            {props.isVisible && <GalleryPlayerControls
                playing={playing}
                videoProgress={videoProgress}
                onSeek={handleSeek}
                onPlay={handlePlay}
            />}
        </div>
    );
};

export default GalleryPlayer