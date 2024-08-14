"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import { iosWhite, androidWhite, xboxWhite, giftBox, quickReview, panel, plusWhite, windowsWhite, psWhite, ellipsisWhite, arrowDown, arrowdown, pumpkincry, pumpkinmeh, thumbsUp, bomb, nintendoWhite, platformIcons, play, tick, whiteTick, arrdown, dice, controller, medal, played, notPlayed, comment } from '../../../public/images'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faL } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { cld } from '../../../public/images'
import { useFilter } from '../contexts/sidenavContext'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { ADDTOMYGAMES, ADDTOWISHLIST, CHECKGAME, DELETEGAME, GAMECOUNT, ADDREVIEW, CHECKREVIEW, DELETEREVIEW } from '../GraphQL/queries'
import { useLoggedUser } from '../contexts/loginContext'
import { useRouter } from 'next/navigation'
import Loader from './loader'
import { useReview } from '../contexts/reviewContext';
import AddGamePanel from './addGamePanel'
import ProtectedRoutes from './protectedRoute'

export default function Card({ id, image, video, platforms, title, releaseDate, key, genres, chart, reviews }) {

    const playerRef = useRef(null);
    const [showCard, setShowCard] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const panelRef = useRef(null);
    const [showGiftBox, setShowGiftBox] = useState(false);
    // const [platArray, setPlatArray] = useState([]);
    const [addCount, setAddCount] = useState(0);
    const [loader, setLoader] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [chooseReview, setChooseReview] = useState(false);
    const { setReviewInfo } = useReview();
    const [cloudVid, setCloudVid] = useState("");
    const [added, setAdded] = useState(false);
    const [writeReview, setWriteReview] = useState("Write a review");
    const [gameComment, setGameComment] = useState({ comment: "", reviewId: 0 });
    const panRef = useRef(null);
    const [deletedGame, setDeletedGame] = useState(false);
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
    const [addReview] = useMutation(ADDREVIEW);
    const [deleteReview] = useMutation(DELETEREVIEW);
    const [addedToWishlist] = useMutation(ADDTOWISHLIST, {
        fetchPolicy: 'no-cache'
    });
    const [deleteGame] = useMutation(DELETEGAME, {
        fetchPolicy: 'no-cache'
    });
    const [fetchCount, { data }] = useLazyQuery(GAMECOUNT, {
        fetchPolicy: 'no-cache'
    });
    const [fetchCheck, { data: checkData }] = useLazyQuery(CHECKGAME, {
        fetchPolicy: 'no-cache'
    });

    const [reviewCheck, { data: reviewData }] = useLazyQuery(CHECKREVIEW, {
        fetchPolicy: 'no-cache'
    });


    useEffect(() => {
        fetchCount({ variables: { gameId: id } });
    }, [id, addedToUserWishlist, deletedGame])

    useEffect(() => {
        if (userInfo.userid) {
            fetchCheck({ variables: { gameId: id, userId: userInfo.userid } })
        }
    }, [userInfo, added, addedToUserWishlist, activeIndex, deletedGame])

    useEffect(() => {
        if (userInfo.userid) {
            reviewCheck({ variables: { gameId: id, userId: userInfo.userid } });
        }
    }, [userInfo])

    useEffect(() => {
        if(reviewData) {
            if(reviewData.checkReview.checkReview) {
                setReviewInfo(prevState => ({
                    ...prevState,
                    title: title,
                    gameComment: reviewData.checkReview.checkedReview.gameComment,
                    userid: userInfo.userid,
                    gameid: id,
                    content: reviewData.checkReview.checkedReview.content,
                    chooseRev: true
                }));
                setGameComment(prevState => ({ ...prevState, comment: reviewData.checkReview.checkedReview.gameComment, reviewId: reviewData.checkReview.checkedReview.reviewid }))
                setChooseReview(true)
                setWriteReview("Edit Review")
            }
        }
    }, [reviewData])

    useEffect(() => {
        if (data && data.addToGames !== undefined) {
            setAddCount(data.addToGames);
        }
    }, [data])

    useEffect(() => {
        if (checkData !== undefined) {
            setActiveIndex(checkData.checkGame.activeIndex)
            if (checkData.checkGame.inBoughtGames === true) {
                setAdded(true);
                setAddedToUserWishlist(false)
            } else if (checkData.checkGame.inBoughtGames === false) {
                setAdded(false);
                if (checkData.checkGame.inWishlist) {
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

    // useEffect(() => {
    //     getPlatforms(platforms)
    // }, [])

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
        setCloudVid(video)
        playerRef.current.videoRef.current.play()
        setShowCard(true)
        setShowGiftBox(true)
    }
    const onMouseOut = () => {
        setCloudVid("")
        // playerRef.current.videoRef.current.pause()
        setShowCard(false)
        if (!showPanel) {
            setShowGiftBox(false)
        }
    }


    const addGame = async () => {
        try {
            const { data, errors } = await addToGames({ variables: { gameId: id, userId: userInfo.userid } });
            if (data.addToGames.ok) {
                setLoader(true)
                setTimeout(() => {
                    setLoader(false)
                    setAdded(true)
                    if (addedToUserWishlist) {
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
            const { data, errors } = await addedToWishlist({ variables: { gameId: id, userId: userInfo.userid } });
            if (data.addedToWishlist.ok) {
                setAddedToUserWishlist(true)
                if (added) {
                    setAdded(false)
                }
            } else { console.log("This game already exists in your wishlist") }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    const handleShowSimilarGames = () => {
        setFilter(genres[0])
    }

    const handleDeleteGame = async () => {
        try {
            const { data, errors } = await deleteGame({ variables: { gameId: id, userId: userInfo.userid } });
            if (data.deleteGame.ok) {
                setDeletedGame(!deletedGame)
            } else { alert("Error deleting Game") }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    const handleAddReview = async (content, gameComment, gameRating) => {
        try {
            const { data, errors } = await addReview({ variables: { userId: userInfo.userid, gameId: id, gameComment: gameComment, gameRating: gameRating, content: content }});
            
            if(data.addReview.ok) {
                setGameComment(prevState => ({ ...prevState, comment: data.addReview.newReview.gameComment, reviewId: data.addReview.newReview.reviewid }))
                setChooseReview(true)
                setWriteReview("Edit review")
            } else if (!data.addReview.ok) {
                alert("You have already reviewed this game!")
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(message)
                });
            }
        }
    }

    const handleDeleteReview = async () => {
        try {
            const { data } = await deleteReview({variables: { revId: gameComment.reviewId, userId: userInfo.userid }})
            if (data.deleteReview.ok) {
                setReviewInfo(prevState => ({
                    ...prevState,
                    title: title,
                    gameComment: "",
                    userid: userInfo.userid,
                    gameid: id,
                    chooseRev: false
                }));
                setWriteReview("Write a review")
                setChooseReview(false)
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(message)
                });
            }
        }
    }

    const handleSetReviewInfo = async () => {
        try {
            const { data } = await reviewCheck({ variables: { gameId: id, userId: userInfo.userid } });
            if(data) {
                if(data.checkReview.checkReview) {
                    setFilter("")
                    setReviewInfo(prevState => ({
                        ...prevState,
                        title: title,
                        gameComment: data.checkReview.checkedReview.gameComment,
                        userid: userInfo.userid,
                        gameid: id,
                        chooseRev: true,
                        content: data.checkReview.checkedReview.content
                    }));
                    router.push("/review")
                } else {
                    setFilter("")
                    setReviewInfo(prevState => ({
                        ...prevState,
                        title: title,
                        userid: userInfo.userid,
                        gameid: id,
                        chooseRev: false,
                        content: "",
                        gameComment: "Exceptional"
                    }));
                    router.push("/review")
                }
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(message)
                });
            }
        }
    }

    return (
        <main className="cols-3-xxl cols-4-xl cols-6-lg col-12-sm main_card" onMouseOver={onMouseOver} onMouseOut={onMouseOut} key={key}>
            <div className="cloudinary" onMouseOver={() => { setFilter("") }}>
                <div className='play-button-div'>
                    <Image src={play} alt='play-button' className='play-button' />
                </div>
                <AdvancedImage
                    className="img"
                    cldImg={cld.image(image)}
                />

                <div className='cloudinary_video'>
                <AdvancedVideo
                    className='vid'
                    muted
                    loop
                    ref={playerRef}
                    cldVid={cld.video(cloudVid)}
                    plugins={[lazyload()]}
                />
                </div>
            </div>

            <div className="theCloud">
                <div className="cloudinary-container">
                    <div className="cloudinarydiv1">
                        {
                            platforms.map((item, index) => {
                                return (<div key={index} onClick={() => setFilter(item === "PC" ? "PC" : (item === "PS5" ? "PlayStation 5" : (item === "iOS" ? "iOS" : (item === "Xbox One" ? "Xbox One" : (item === "Nintendo Switch" ? "Nintendo Switch" : (item === "Android" ? "Android" : ""))))))}>
                                    <Image src={platformIcons[item]} width={17} height={17} alt='svg-image' className='gamePlatform-image' />
                                </div>)
                            })
                        }
                    </div>

                    <div className="cloudinarydiv2">
                        <h2 onClick={() => setFilter("")}><Link href={`/${id}`}><span>{title}</span></Link><Image src={reviews === 1 ? pumpkincry : (reviews === 2 ? pumpkinmeh : (reviews === 3 ? thumbsUp : bomb))} width={35} height={30} alt='review-svg' className='review-svg' />
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
                                                <AddGamePanel key={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={index} svg={item.image} spanText={item.spanText} mainText={item.mainText} gameid={id} userid={userInfo.userid} />
                                            ))
                                        }
                                        <div className='g3' onClick={() => {
                                            handleDeleteGame()
                                            setShowPlayingGame(false)
                                        }}><p>Delete game</p></div>
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
                                } else { router.push("/login") }
                            }}
                            style={addedToUserWishlist ? { backgroundColor: "rgb(119, 177, 32)" } : { backgroundColor: "rgb(52, 52, 52)" }}
                        >
                            <Image src={giftBox} alt='gift-box' width={25} height={15} />
                        </div>

                        <div className={showGiftBox ? "showcard" : "hidecard mobileview"} onClick={() => {
                            setShowPanel(true)
                        }} ref={panelRef}>
                            <div className={showPanel ? "showcard ellipsis-review" : "hidecard"}>
                                {
                                    !chooseReview ? (
                                        <div className='showpanel'>
                                            <span>Quick Review</span>
                                            <div
                                                className='grid-box'
                                            >
                                                {
                                                    quickReview.map((item, index) => (
                                                        <div key={index} onClick={() => {
                                                            if (userInfo.userid) {
                                                                handleAddReview(null, item.span, null)
                                                            } else { router.push("/login") }
                                                        }}><Image src={item.image} width={55} height={55} alt='review-svg' /><span>{item.span}</span></div>
                                                    ))
                                                }
                                            </div>
                                            <ProtectedRoutes><div className='review-box' onClick={() => handleSetReviewInfo()}>{writeReview}</div></ProtectedRoutes>
                                            <div className='addTo-box'
                                            onClick={() => {
                                                if(!added) {
                                                    addGame()
                                                }
                                            }}
                                            >{added ? "Added to library" : "Add to my games"}</div>
                                        </div>
                                    ) : (<div className='showpanel'>
                                        <div className='grid-box-review'>
                                        <span style={{color: "rgb(106, 106, 106)", marginBottom: ".5rem"}}>Your review</span>
                                        <div className='grid-box2'>
                                            <Image src={comment[gameComment.comment]} width={35} height={35} alt='pumpkin-cry' />
                                            <span>{gameComment.comment}</span>
                                            <span
                                            onClick={() => handleDeleteReview()}
                                            className='delete-span'>Delete</span>
                                        </div>
                                       <ProtectedRoutes> <div className='review-box2' onClick={() => handleSetReviewInfo()}>{writeReview}</div></ProtectedRoutes>
                                        </div>
                                        <div className='addTo-box2' onClick={() => {
                                            if(!added) {
                                                addGame()
                                            }
                                        }}><span>{added ? "Added to library" : "Add to my games"}</span></div>
                                    </div>)
                                }

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

                        <div className="cloudinarydiv7"
                        onClick={() => handleShowSimilarGames()}
                        >
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
