import React, { useState, useEffect, createRef, useRef } from "react"

import ImageGallery from "react-image-gallery"
import GalleryPlayer from "../GalleryPlayer/GalleryPlayer"

import "react-image-gallery/styles/css/image-gallery.css";
import "./Gallery.css"

const renderVideo = ((isVisible, isLoaded, file) => {
    // console.log("renderVideo called")
    // console.log("file: ", file)
    // console.log("=========================isVisible: ", isVisible)
    // console.log("===============================================isLoaded: ", isLoaded)

    if (!isLoaded)
        return (null)

    return (
        <GalleryPlayer url={file.embedUrl} isVisible={isVisible} />
    )
})

const slides = [];

const videos = [
    "videoCastle.mp4",
    "videoCountdown.mp4",
    "videoRoad.mp4"
]

const videoThumbnails = [
    "videoCastleT.png",
    "videoCountdownT.png",
    "videoRoadT.png"
]

const images = [
    "imageWaterfall.jpg",
    "imageShip.jpg",
    "imageRiver.jpg",
    "imageBuildings.jpg",
    "imageBaywatch.jpg",
]

// slides.push({
//     isVideo: false,
//     original: "https://picsum.photos/1920/1080/?random&rnd"
// })

for (let index = 0; index < 10; index++) {
    var random = Math.random()
    switch (Math.floor(Math.random() * 2)) {
        case 0:
            slides.push({
                indeks: index,
                isVideo: true,
                embedUrl: 'videos/' + videos[Math.floor(random * videos.length)],
                thumbnail: 'videos/' + videoThumbnails[Math.floor(random * videos.length)],
                // embedUrl: 'videos/videoRoad.mp4',
                renderItem: renderVideo.bind(this, false, false)
            })
            break;
        case 1:
            slides.push({
                isVideo: false,
                original: 'images/' + images[Math.floor(random * images.length)],
                thumbnail: 'images/' + images[Math.floor(random * images.length)]
                // original: "https://picsum.photos/1920/1080/?random&rnd" + index
            })
            break;
        default:
            break;
    }
}

console.log("slides count:", slides.length)

const Gallery = () => {
    var [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    const galleryRef = createRef()

    useEffect(() => {
        if (slides[0].isVideo) {
            slides[0].renderItem = renderVideo.bind(this, true, true)
        }
        if (slides[1].isVideo) {
            slides[1].renderItem = renderVideo.bind(this, false, true)
        }
    }, [])

    const thumbnailClickHandler = ((index) => {
        if (index !== currentSlideIndex)
            galleryRef.current.slideToIndex(index)
    })

    const onSlideHandler = ((currentIndex, index) => {
        console.log("=====================================")
        console.log("currentIndex: ", currentIndex)
        console.log("index: ", index)
        console.log("currentSlideIndex: ", currentSlideIndex)

        // var isFirst = currentIndex == 0
        // var isLast = currentIndex == slides.length - 1

        var currentSlide = slides[currentIndex]
        if (currentSlide.isVideo) {
            currentSlide.renderItem = renderVideo.bind(this, true, true)
        }

        //const renderVideo = ((isVisible, isLoaded, file) => {

        var slidesToLoad = [slides[currentIndex - 1], slides[currentIndex + 1]]
        console.log(slidesToLoad)
        //var slidesToUnload = new Array()//= [slides[currentIndex - 2], slides[currentIndex + 2]]

        // slidesToLoad.push(slides[currentIndex - 1])
        // slidesToLoad.push(slides[currentIndex + 1])
        // slidesToUnload.push(slides[currentIndex - 2],)
        // slidesToUnload.push(slides[currentIndex + 2],)

        slidesToLoad.forEach((slideToLoad) => {
            if (slideToLoad !== undefined)
                if (slideToLoad.isVideo)
                    slideToLoad.renderItem = renderVideo.bind(this, false, true)
        })

        for (let index = 0; index < slides.length; index++) {
            if (slides[index].isVideo && index !== currentIndex && index !== currentIndex - 1 && index !== currentIndex + 1) {
                // slides[index].renderItem = renderVideo.bind(this, false, false)
                slides[index].renderItem = renderVideo.bind(this, false, false)
            }
        }

        // var slidesToUnload = slides;
        // slidesToUnload.splice(currentIndex - 1, 3);
        // console.log(slidesToUnload)

        // slidesToUnload.forEach((slideToUnload) => {
        //     if (slideToUnload !== undefined)
        //         if (slideToUnload.isVideo)
        //             slideToUnload.renderItem = renderVideo.bind(this, false, false)
        // })


        // if (isFirst || isLast || currentIndex == 1 || currentIndex == slides.length - 2)
        //     setCurrentSlideIndex(currentIndex);

        setCurrentSlideIndex(currentIndex);
    })

    console.log("Gallery rendered")
    return (
        <div>
            <div className="galleryWrapper">
                <ImageGallery
                    ref={galleryRef}
                    id="gallery"
                    items={slides}
                    thumbnailPosition="right"
                    showThumbnails={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    useBrowserFullscreen={true}
                    slideDuration={500}
                    slideInterval={1000}
                    showBullets={false}
                    onSlide={onSlideHandler}
                    // onThumbnailClick={onSlideHandler} TODO probably should implement lazyload with this
                    infinite={false}
                    lazyload={true}
                    renderCustomControls={(() => {
                        return (<div></div>)
                    })}
                    renderLeftNav={(onClick, disabled) => {
                        return (
                            !currentSlideIndex == 0 &&
                            <button
                                className="image-gallery-icon image-gallery-left-nav"
                                disabled={false}
                                onClick={onClick}
                                aria-label="Next Slide"
                            >
                                <svg
                                    className="image-gallery-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="6 0 12 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={null}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )
                    }}
                    renderRightNav={(onClick, disabled) => {
                        return (
                            !(currentSlideIndex == slides.length - 1) &&
                            <button
                                className="image-gallery-icon image-gallery-right-nav"
                                disabled={false}
                                onClick={onClick}
                                aria-label="Next Slide"
                            >
                                <svg
                                    className="image-gallery-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="6 0 12 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={null}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        )
                    }}
                />
            </div>

            <div
                className="thumbnails"
            >
                {slides.map((slide, index) => {
                    return (
                        <div
                            className="thumbnail"
                            onClick={() => thumbnailClickHandler(index)}
                        >
                            {slide.isVideo && <svg
                                className="playButton"
                                width="50"
                                height="50"
                                stroke="black"
                                stroke-width={2}
                                fill="white"
                            >
                                <polyline
                                    points="0,0 50,25 0,50 0,0"
                                />
                            </svg>}
                            <img
                                className={index == currentSlideIndex ? "thumbnailImage thumbnailImageSelected" : "thumbnailImage"}
                                src={slide.thumbnail}
                            />
                        </div>
                    )
                })}

            </div>
        </div>
    )
};

export default Gallery