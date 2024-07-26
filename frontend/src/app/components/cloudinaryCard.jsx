"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import { iosWhite, androidWhite, xboxWhite, giftBox, plusWhite, windowsWhite, psWhite, ellipsisWhite, arrowDown, arrowdown, pumpkincry, pumpkinmeh, thumbsUp, bomb, nintendoWhite, platformIcons, play, tick, whiteTick, arrdown, dice, controller, medal, played, notPlayed } from '../../../public/images'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faL } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { cld } from '../../../public/images'
import { useFilter } from '../contexts/sidenavContext'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { ADDTOMYGAMES, ADDTOWISHLIST, CHECKGAME, GAMECOUNT } from '../GraphQL/queries'
import { useLoggedUser } from '../contexts/loginContext'
import { useRouter } from 'next/navigation'
import Loader from './loader'
import AddGamePanel from './addGamePanel'

export default function Card({ id, image, video, platforms, title, releaseDate, genres, chart, reviews, index }) {

    const playerRef = useRef(null);
    const [showCard, setShowCard] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const panelRef = useRef(null);
    const [showGiftBox, setShowGiftBox] = useState(false);
    const [platArray, setPlatArray] = useState([]);
    const [addCount, setAddCount] = useState(0);
    const [loader, setLoader] = useState(false);
    const [added, setAdded] = useState(false);
    const panRef = useRef(null);
    const [showPlayingGame, setShowPlayingGame] = useState(false);
    const { setFilter } = useFilter();
    const router = useRouter();
    const [addedToUserWishlist, setAddedToUserWishlist] = useState(false);
    const { userInfo } = useLoggedUser();
    const vid = video
    const img = image
    const reviewsvgs = [thumbsUp, bomb, pumpkincry, pumpkinmeh];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const [addToGames] = useMutation(ADDTOMYGAMES);
    const [addedToWishlist] = useMutation(ADDTOWISHLIST, {
        fetchPolicy: 'no-cache'
    });
    const [fetchCount, { loading, data, error }] = useLazyQuery(GAMECOUNT, {
        fetchPolicy: 'no-cache'
    });
    const [fetchCheck, { checkLoading, data: checkData, error: checkError }] = useLazyQuery(CHECKGAME, {
        fetchPolicy: 'no-cache'
    });
    const panel = [
        {image: dice, mainText: "Uncategorized", spanText: "I'll pick the category later"},
        {image: controller, mainText: "Currently playing", spanText: "I'm playing this game currently"},
        {image: medal, mainText: "Completed", spanText: "I'm done playing this game"},
        {image: played, mainText: "Played", spanText: "I gave up and won't play anymore"},
        {image: notPlayed, mainText: "Not played", spanText: "I'll play it later"}
    ]


    useEffect(() => {
        fetchCount({ variables: { gameId: id } });
    }, [id, addedToUserWishlist])

    useEffect(() => {
        if (userInfo.userid) {
            fetchCheck({ variables: { gameId: id, userId: userInfo.userid } })
        }
    }, [userInfo, added, addedToUserWishlist])

    useEffect(() => {
        if (data && data.addToGames !== undefined) {
            setAddCount(data.addToGames);
        }
    }, [data])

    useEffect(() => {
        if (checkData !== undefined) {
            if (checkData.checkGame.inBoughtGames === true) {
                setAdded(true);
                setAddedToUserWishlist(false)
            } else if (checkData.checkGame.inBoughtGames === false) {
                setAdded(false);
                if(checkData.checkGame.inWishlist) {
                    setAddedToUserWishlist(true)
                }
            } else if (checkData.checkGame.inWishlist === false) {
                setAddedToUserWishlist(false)
                if (checkData.checkGame.inBoughtGames) {
                    setAdded(true)
                }
            } else if (checkData.checkGame.inWishlist === true) {
                setAddedToUserWishlist(true)
                setAdded(false)
            }
        }
    }, [checkData]);

    const create_date_string = (dateString) => {
        const day = dateString.slice(8, 10)[1] === "1" ? dateString.slice(8, 10)[1] + "st" : (dateString.slice(8, 10)[1] === "2" ? dateString.slice(8, 10)[1] + "nd" : dateString.slice(8, 10)[1] + "th")
        const month = months[parseInt(dateString.slice(5, 7)) - 1]
        const year = dateString.slice(0, 4)
        let full_date = month + " " + day + " " + year
        return full_date
    }


    useEffect(() => {
        document.addEventListener('click', hideReviewPanel);

        return () => {
            document.removeEventListener('click', hideReviewPanel)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', handlePan);

        return () => {
            document.removeEventListener('click', handlePan)
        }
    }, [])

    useEffect(() => {
        getPlatforms(platforms)
    }, [])

    const hideReviewPanel = (e) => {
        if (!panelRef.current.contains(e.target)) {
            setShowPanel(false)
            return
        }
    }

    const handlePan = (e) => {
        if (!panRef.current.contains(e.target)) {
            setShowPlayingGame(false)
            return;
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

    const addGame = async () => {
        try {
            const { data, errors } = await addToGames({ variables: { gameId: id, userId: userInfo.userid } });
            if (data.addToGames.ok) {
                setLoader(true)
                setTimeout(() => {
                    setLoader(false)
                    setAdded(true)
                    if(addedToUserWishlist) {
                        setAddedToUserWishlist(false)
                    }
                    setAddCount(data.addToGames.count)
                }, 2000);
            } else { console.log("This Game already exists in your library") }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    const addGameToWishlist = async () => {
        try {
            const { data, errors } = await addedToWishlist({ variables: { gameId: id, userId: userInfo.userid }});
            if(data.addedToWishlist.ok) {
                setAddedToUserWishlist(true)
                if(added) {
                    setAdded(false)
                }
            } else {console.log("This game already exists in your wishlist")}
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    return (
        <main className="cols-3-xxl cols-4-xl cols-6-lg col-12-sm main_card" onMouseOver={onMouseOver} onMouseOut={onMouseOut} key={index}>
            <div className="cloudinary" onMouseOver={() => { setFilter("") }}>
                <div className='play-button-div'>
                    <Image src={play} alt='play-button' className='play-button' />
                </div>
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
                                const platIcons = {
                                    psWhite: "PS5",
                                    iosWhite: "iOS",
                                    xboxWhite: "Xbox One",
                                    nintendoWhite: "Nintendo Switch",
                                    androidWhite: "Android",
                                    windowsWhite: "PC"
                                }
                                return (<div key={index} onClick={() => setFilter(item === windowsWhite ? "PC" : (item === psWhite ? "PlayStation 5" : (item === iosWhite ? "iOS" : (item === xboxWhite ? "Xbox One" : (item === nintendoWhite ? "Nintendo Switch" : (item === androidWhite ? "Android" : ""))))))}>
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
                        <div className={added ? "plusWhite" : "plusWhite plusHover"} onClick={() => {
                            if (userInfo.username) {
                                addGame()
                            } else {
                                router.push("/login")
                            }
                        }} style={added ? { backgroundColor: "rgb(119, 177, 32)" } : { backgroundColor: "rgb(52, 52, 52)" }} ref={panRef}>
                            {!loader ? (
                                <div style={{ padding: "0 5px" }} className='dsp-f ai-c'>
                                    {added ? (<><Image src={whiteTick} alt='plus-sign' width={15} height={15} /></>) : (<><Image src={plusWhite} alt='plus-sign' width={12} height={12} /></>)}
                                    <span style={{ marginLeft: 10 }}>{addCount}</span>
                                    {added ? <div className='dsp-f ai-c addToGamesdiv'><div className={showPlayingGame ? "addGamePanel showcard" : "hidecard"} >
                                        {
                                            panel.map((item, index) => (
                                                <AddGamePanel index={index} svg={item.image} spanText={item.spanText} mainText={item.mainText} />
                                            ))
                                        }
                                        <div className='g3'><p>Delete game</p></div>
                                        </div><div style={{ height: 15, width: 1, backgroundColor: "white", margin: "0 5px" }}></div><Image src={arrdown} width={12} height={12} alt='arrowdown' style={{ marginTop: 2.5 }} onClick={() => setShowPlayingGame(true)} /></div> : <div></div>}
                                </div>
                            ) : (<div style={{ zIndex: 5000, transform: "scale(0.5)" }}>
                                <Loader />
                            </div>)}
                        </div>

                        <div 
                        className={showGiftBox ? "showcard giftbox" : "hidecard giftbox mobileview"}
                        onClick={() => {
                            if (userInfo.username) {
                                addGameToWishlist()
                            } else {router.push("/login")}
                        }}
                        style={addedToUserWishlist ? { backgroundColor: "rgb(119, 177, 32)" } : { backgroundColor: "rgb(52, 52, 52)" }}                         
                        >
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
                                        <strong key={index} onClick={() => setFilter(item)}>{item}</strong>
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
