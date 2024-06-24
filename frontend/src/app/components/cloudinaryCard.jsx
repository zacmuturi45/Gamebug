"use client"

import React, { useRef, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import { iosWhite, androidWhite, xboxWhite, giftBox, plusWhite, windowsWhite, psWhite, ellipsisWhite, arrowDown, arrowdown } from '../../../public/images'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faL } from '@fortawesome/free-solid-svg-icons'

export default function Card({ image, index }) {

    const playerRef = useRef(null);
    const [showCard, setShowCard] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showGiftBox, setShowGiftBox] = useState(false);

    const cld = new Cloudinary({ cloud: { cloudName: 'dntmdehob' } })
    const vid = "my-videos/new.mp4"
    const img = "my-videos/boat_tyrkf7"

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
    const showReviewPanel = () => {
        setShowPanel(true)
    }

    const gamePlatforms = [xboxWhite, windowsWhite, psWhite]

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
                    width="100%"
                    ref={playerRef}
                    cldVid={cld.video(vid)}
                    plugins={[lazyload()]}
                />
            </div>

            <div className="theCloud">
                <div className="cloudinary-container">
                    <div className="cloudinarydiv1">
                        {
                            gamePlatforms.map((item, index) => {
                                return (<div key={index}>
                                    <Image src={item} width={20} height={20} alt='svg-image' className='gamePlatform-image' />
                                </div>)
                            })
                        }
                    </div>

                    <div className="cloudinarydiv2">
                        <h2>Vampire: The Masquerade - Bloodlines 2</h2>
                    </div>

                    <div className="cloudinarydiv3">
                        <div>
                            <Image src={plusWhite} alt='plus-sign' width={20} height={20} />
                            <strong style={{ marginLeft: 10 }}>847</strong>
                        </div>

                        <div className={showGiftBox ? "showcard" : "hidecard mobileview"}>
                            <Image src={giftBox} alt='gift-box' width={30} height={20} />
                        </div>

                        <div className={showGiftBox ? "showcard ellipsis-review" : "hidecard mobileview"} onClick={() => showReviewPanel()}>
                            <div className={showPanel ? "showCard" : "hidecard"}></div>
                            <FontAwesomeIcon icon={faEllipsis} className='ellips' />
                        </div>
                    </div>

                    <div className={showCard ? "showcard" : "hidecard"}>

                        <div className="cloudinarydiv4">
                            <span style={{ opacity: 0.5 }}>Release date:</span>
                            <strong>Nov 30, 2024</strong>
                        </div>

                        <div className="cloudinarydiv5">
                            <span style={{ opacity: 0.5 }}>Genres:</span>
                            <strong>Action, RPG</strong>
                        </div>

                        <div className="cloudinarydiv6">
                            <span style={{ opacity: 0.5 }}>Chart:</span>
                            <strong>#1 Top 2024</strong>
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
