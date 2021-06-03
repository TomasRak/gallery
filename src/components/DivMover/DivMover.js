import React, { useState } from 'react';
import "./DivMover.css"

import Slider from "@material-ui/core/Slider"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { Input } from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const DivMover = () => {
    var [rectSize, setRectSize] = useState(50)
    var [autoMoveChecked, setAutoMoveChecked] = useState(false)
    var [intervalId, setIntervalId] = useState()
    var [autoMoveInterval, setAutoMoveInterval] = useState(300)

    var [xCoord, setXCoord] = useState(0)
    var [yCoord, setYCoord] = useState(0)

    const logCoords = (() => {
        //console.log("x: ", xCoord, "y: ", yCoord)
    })

    const moverStyle = {
        position: "absolute",
        backgroundColor: "black",
        height: rectSize,
        width: rectSize,
        left: xCoord,
        top: yCoord
    }

    let possibleSizes = []

    for (let index = 10; index < 300; index++) {
        if ((300 % index) == 0)
            possibleSizes.push(index.toString())
    }

    const sizeChanged = ((event) => {
        setRectSize(parseInt(event.target.value))
        setXCoord(0)
        setYCoord(0)
        updateInterval(false)
        updateInterval(autoMoveChecked, autoMoveInterval)
    })

    const autoMoveCheckChanged = ((event) => {
        setAutoMoveChecked(event.target.checked)

        updateInterval(event.target.checked, autoMoveInterval)
    })

    const updateInterval = ((start, autoMoveIntervalParam) => {
        if (start) {
            setIntervalId(window.setInterval(() => {
                goInRandomDirection()
            }, autoMoveIntervalParam))
        }
        else {
            window.clearInterval(intervalId)
        }
    })

    const autoMoveIntervalChanged = ((event, newValue) => {
        // let newInterval = event.target.value

        // if (newInterval < 5)
        //     newInterval = 5
        // else if (newInterval > 1000)
        //     newInterval = 1000
        console.log(newValue)


        setAutoMoveInterval(newValue)
        updateInterval(false)
        updateInterval(autoMoveChecked, newValue)
    })

    const goInRandomDirection = (() => {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                upClicked()
                break;
            case 1:
                leftClicked()
                break;
            case 2:
                downClicked()
                break;
            case 3:
                rightClicked()
                break;
        }
    })

    //#region buttonEvents
    const upClicked = (() => {
        logCoords();
        if (yCoord > 0)
            setYCoord(yCoord = yCoord - rectSize);
    })

    const leftClicked = (() => {
        logCoords();
        if (xCoord > 0)
            setXCoord(xCoord = xCoord - rectSize);
    })

    const downClicked = (() => {
        logCoords();
        if (yCoord < 300 - rectSize)
            setYCoord(yCoord = yCoord + rectSize);
    })

    const rightClicked = (() => {
        logCoords();
        if (xCoord < 300 - rectSize)
            setXCoord(xCoord = xCoord + rectSize);
    })
    //#endregion

    //#region backup
    // useInterval(() => {
    //     setXCoord(xCoord + incrementValue);
    //   }, 2000);

    //  useEffect(() => {
    //     window.setInterval(() => {
    //         downClicked()
    //     }, 1000)
    //  }, [])
    //#endregion

    return (
        <div className="outerBox">
            <h1>ReactDemo</h1>
            <Select
                className="possibleSizes"
                value={rectSize}
                onChange={sizeChanged}
            >
                {possibleSizes.map(size =>
                    <MenuItem
                        value={size}
                        key={size}
                    >
                        {size}
                    </MenuItem>
                )}

            </Select>

            <div className="innerBox">
                <div style={moverStyle}></div>
            </div>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={autoMoveChecked}
                        onChange={autoMoveCheckChanged}
                    />}
                label="AutoMove:"
            />

            <Input
                type="number"
                className="autoMoveInterval"
                value={autoMoveInterval}
                onChange={autoMoveIntervalChanged}
            />
            <Slider
                step={1}
                min={5}
                max={1000}
                onChange={autoMoveIntervalChanged}
            />

            {!autoMoveChecked &&
                <div className="buttons">
                    <IconButton onClick={() => upClicked()}>
                        <ArrowUpwardRoundedIcon />
                    </IconButton>
                    <br></br>
                    <IconButton onClick={() => leftClicked()}>
                        <ArrowBackRoundedIcon />
                    </IconButton>

                    <IconButton onClick={() => downClicked()}>
                        <ArrowDownwardRoundedIcon />
                    </IconButton>

                    <IconButton onClick={() => rightClicked()}>
                        <ArrowForwardRoundedIcon />
                    </IconButton>
                </div>
            }
        </div>
    )
}

export default DivMover