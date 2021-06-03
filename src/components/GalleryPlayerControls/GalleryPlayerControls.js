import React, { useState, useEffect } from "react"
import "./GalleryPlayerControls.css"

import Slider from "@material-ui/core/Slider"

import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const GalleryPlayerControls = ((props) => {
    const [seeking, setSeeking] = useState(false)
    const [rangeValue, setRangeValue] = useState(0)

    const handleSeekMouseDown = ((e) => {
        setSeeking(true)
    })

    const handleChange = ((e, val) => {
        setRangeValue(val)
    })

    const handleChangeCommitted = (() => {
        setSeeking(false)

        props.onSeek(rangeValue)
    })

    const handlePlayClick = (() => {
        props.onPlay(!props.playing)
    })

    // useEffect(() => {
    //     // return (() => {
    //         console.log(props.url, "GalleryPlayerControls useEffect called");
    //         props.onSeek(0);
    //     // })
    // }, [])

    useEffect(() => {
        // return (() => {
        console.log(props.url, "GalleryPlayerControls useEffect called");
        props.onSeek(0);
        // })
    }, [])

    return (
        <div className="videoControls">


            <IconButton
                size="small"
                color="secondary"
                className="button buttonPlay"
                onClick={handlePlayClick}>
                {props.playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <div className="slider">
                <Slider
                    value={seeking ? rangeValue : props.videoProgress}
                    color="secondary"
                    step={0.000001}
                    min={0}
                    max={0.999999}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    onMouseDown={handleSeekMouseDown}
                />
            </div>

            {/* <input
                className="slider"
                type='range'
                value={seeking ? rangeValue : props.videoProgress}
                min={0}
                max={0.999999}
                onChange={handleChange}
                onMouseUp={handleSeekMouseUp}
                onMouseDown={handleSeekMouseDown}
                step='any' /> */}

            {/* <button
                className="button buttonMax"
            // onClick={onMaximizeClick}
            >
                Max
        </button> */}

        </div>
    )
})

export default GalleryPlayerControls