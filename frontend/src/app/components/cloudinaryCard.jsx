"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import { iosWhite, androidWhite, xboxWhite, giftBox, plusWhite, windowsWhite, psWhite, ellipsisWhite, arrowDown, arrowdown, pumpkincry, pumpkinmeh, thumbsUp, bomb, nintendoWhite, platformIcons } from '../../../public/images'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faL } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { cld } from '../../../public/images'

export default function Card({ id, image, video, platforms, title, releaseDate, genres, chart, reviews, index }) {

    const playerRef = useRef(null);
    const [showCard, setShowCard] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const panelRef = useRef(null);
    const [showGiftBox, setShowGiftBox] = useState(false);
    const [platArray, setPlatArray] = useState([]);

    const vid = video
    const img = image
    const reviewsvgs = [thumbsUp, bomb, pumpkincry, pumpkinmeh];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const create_date_string = (dateString) => {
        const day = dateString.slice(8, 10)[1] === "1" ? dateString.slice(8, 10)[1]+"st" : (dateString.slice(8, 10)[1] === "2" ? dateString.slice(8, 10)[1]+"nd" : dateString.slice(8, 10)[1]+"th")
        const month = months[parseInt(dateString.slice(5, 7)) -1]
        const year = dateString.slice(0, 4)
        let full_date = month+" "+day+" "+year
        return full_date
    }

    // const rd = create_date_string(releaseDate.slice(0, 10))

    useEffect(() => {
        document.addEventListener('click', hideReviewPanel);

        return () => {
            document.removeEventListener('click', hideReviewPanel)
        }
    }, [])

    useEffect(() => {
        console.log(`Reviews iss ${reviews}`)
        getPlatforms(platforms)
    }, [])

    const hideReviewPanel = (e) => {
        if (!panelRef.current.contains(e.target)) {
            setShowPanel(false)
            return
        }
    }

    const onMouseOver = () => {
        playerRef.current.videoRef.current.play()
        setShowCard(true)
        setShowGiftBox(true)
    }
    const onMouseOut = () => {
        playerRef.current.videoRef.current.pause()
        setShowCard(false)
        setShowGiftBox(false)
    }
    const showReviewPanel = (e) => {
        if (panelRef.current.contains(e.target)) {
            setShowPanel(true)
            return;
        }

        setShowPanel(false);
    }

    const getPlatforms = (plat) => {
        const plats = plat.map(item => platformIcons[item]).filter(icon => icon !== undefined);
        setPlatArray(plats)
    };

    return (
        <main className="cols-3-xxl cols-4-xl cols-6-lg col-12-sm main_card" onMouseOver={onMouseOver} onMouseOut={onMouseOut} key={index}>
            <div className="cloudinary">
                <AdvancedImage
                    className="img"
                    cldImg={cld.image(image)}
                />

                <AdvancedVideo
                    className='cloudinary_video'
                    muted
                    loop
                    ref={playerRef}
                    cldVid={cld.video(vid)}
                    plugins={[lazyload()]}
                />
            </div>

            <div className="theCloud">
                <div className="cloudinary-container">
                    <div className="cloudinarydiv1">
                        {
                            platArray.map((item, index) => {
                                return (<div key={index}>
                                    <Image src={item} width={17} height={17} alt='svg-image' className='gamePlatform-image' />
                                </div>)
                            })
                        }
                    </div>

                    <div className="cloudinarydiv2">
                        <h2><Link href={`/${id}`}><span>{title}</span></Link> <Image src={reviews === 1 ? pumpkincry : (reviews === 2 ? pumpkinmeh : (reviews === 3 ? thumbsUp : bomb))} width={35} height={30} alt='review-svg' className='review-svg' />
                        </h2>
                    </div>

                    <div className="cloudinarydiv3">
                        <div className='plusWhite'>
                            <Image src={plusWhite} alt='plus-sign' width={12} height={12} />
                            <span style={{ marginLeft: 10 }}>847</span>
                        </div>

                        <div className={showGiftBox ? "showcard giftbox" : "hidecard giftbox mobileview"}>
                            <Image src={giftBox} alt='gift-box' width={25} height={15} />
                        </div>

                        <div className={showGiftBox ? "showcard ellipsis-review" : "hidecard mobileview"} onClick={(e) => showReviewPanel(e)} ref={panelRef}>
                            <div className={showPanel ? "showpanel" : "hidepanel"}>
                                <span>Quick Review</span>
                                <div className='grid-box'>
                                    <div><Image src={bomb} width={55} height={55} alt='review-svg' /><span>Exceptional</span></div>
                                    <div><Image src={thumbsUp} width={55} height={55} alt='review-svg' /><span>Recommend</span></div>
                                    <div><Image src={pumpkinmeh} width={55} height={55} alt='review-svg' /><span>Meh</span></div>
                                    <div><Image src={pumpkincry} width={55} height={55} alt='review-svg' /><span>Skip</span></div>
                                </div>
                                <div className='review-box'>Write a review</div>
                                <div className='addTo-box'>Add to my games</div>
                            </div>
                            <FontAwesomeIcon icon={faEllipsis} className='ellips' />
                        </div>
                    </div>

                    <div className={showCard ? "showcard" : "hidecard"}>

                        <div className="cloudinarydiv4">
                            <span style={{ opacity: 0.5 }}>Release date:</span>
                            <strong>{create_date_string(releaseDate.slice(0, 10))}</strong>
                        </div>

                        <div className="cloudinarydiv5">
                            <span style={{ opacity: 0.5 }}>Genres:</span>
                            <div className='genre-div'>
                            {
                                genres.map((item, index) => (
                                    <strong key={index}>{item}</strong>
                                ))
                            }
                            </div>
                        </div>

                        <div className="cloudinarydiv6">
                            <span style={{ opacity: 0.5 }}>Chart:</span>
                            <strong>{chart}</strong>
                        </div>

                        <div className="cloudinarydiv7">
                            <span>Show more like this</span>
                            <Image src={arrowdown} alt='arrow-down' width={20} height={20} style={{ transform: "rotate(-90deg)", opacity: "0.5" }} />
                        </div>
                    </div>
                    {
                        showCard ? <div className='view_more'><strong onClick={() => setShowCard(!showCard)}>View less</strong></div> :
                            <div className='view_more'><strong onClick={() => setShowCard(!showCard)}>View more</strong></div>
                    }
                </div>
            </div>

        </main>
    )
}
