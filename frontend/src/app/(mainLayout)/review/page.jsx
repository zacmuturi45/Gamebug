"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { bomb, thumbsUp, pumpkincry, pumpkinmeh, xboxWhite, commentObject } from '../../../../public/images';
import { useRouter } from 'next/navigation';
import { useFilter } from '@/app/contexts/sidenavContext';
import { useReview } from '@/app/contexts/reviewContext';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADDREVIEW, CHECKREVIEW, EDITREVIEW } from '@/app/GraphQL/queries';
import { DELETEREVIEW } from '@/app/GraphQL/queries';
import { useLoggedUser } from '@/app/contexts/loginContext';

export default function ReviewPage() {
    const [popup, setPopup] = useState({
        status: false,
        message: ""
    });
    const [reviewContent, setReviewContent] = useState("");
    const router = useRouter();
    const [revId, setrevId] = useState(0);
    const { setFilter } = useFilter();
    const [editReview] = useMutation(EDITREVIEW);
    const [addReview] = useMutation(ADDREVIEW);
    const { setReviewInfo, reviewInfo } = useReview();
    const [deleteReview] = useMutation(DELETEREVIEW);
    const { userInfo } = useLoggedUser();
    const [reviewCheck, { data }] = useLazyQuery(CHECKREVIEW, {
        fetchPolicy: 'no-cache'
    });

    useEffect(() => {
        reviewCheck({ variables: { gameId: reviewInfo.gameid, userId: userInfo.userid } });
    }, [])

    useEffect(() => {
        if (data && data.checkReview.checkedReview) {
            setrevId(data.checkReview.checkedReview.reviewid)
        }
    }, [data])
    const handleDeleteReview = async (e) => {
        e.preventDefault()
        try {
            const { data } = await deleteReview({ variables: { revId: revId, userId: reviewInfo.userid } });
            if (data.deleteReview.ok) {
                setReviewInfo(prevState => ({
                    ...prevState,
                    title: "",
                    gameComment: "",
                    userid: 0,
                    gameid: 0,
                    chooseRev: false
                }))
                setPopup(prevState => ({
                    ...prevState,
                    status: true,
                    message: "Review successfully deleted!"
                }));
                setTimeout(() => {
                    setFilter("Home")
                    router.push("/")
                }, 1000);
            } else {alert("Error Deleting review")}
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(message)
                });
            }
        }
    }

    const handleSubmit = async (event, content, gameComment, gameRating) => {
        event.preventDefault()
        try {
            const { data } = await editReview({ variables: { userId: reviewInfo.userid, gameId: reviewInfo.gameid, gameComment: gameComment, gameRating: gameRating, content: content || "" } });

            if (data.editReview.ok) {
                setReviewInfo(prevState => ({
                    ...prevState,
                    title: "",
                    gameComment: "",
                    userid: 0,
                    gameid: 0,
                    chooseRev: false
                }))
                setPopup(prevState => ({
                    ...prevState,
                    status: true,
                    message: "Review successfully edited!"
                }));  
                setTimeout(() => {
                    setFilter("Home")
                    router.push("/")   
                }, 1000);           
            } else if (!data.editReview.ok) {
                alert("Error editing review!")
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(`REVIEW MSG ${message}`)
                });
            }
        }
    }

    const handleAddReview = async (event, content, gameComment, gameRating) => {
        event.preventDefault()
        try {
            const { data } = await addReview({ variables: { userId: reviewInfo.userid, gameId: reviewInfo.gameid, gameComment: gameComment, gameRating: gameRating, content: content || "" } });

            if (data.addReview.ok) {
                setReviewInfo(prevState => ({
                    ...prevState,
                    title: "",
                    gameComment: "",
                    userid: 0,
                    gameid: 0,
                    chooseRev: false
                }))
                setPopup(prevState => ({
                    ...prevState,
                    status: true,
                    message: "Review successfully added!"
                }));  
                setTimeout(() => {
                    setFilter("Home")
                    router.push("/")   
                }, 1000);           
            } else if (!data.editReview.ok) {
                alert("Error adding review!")
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(`REVIEW MSG ${message}`)
                });
            }
        }
    }


    return (
        <main className='popup-box'>
            <div>
                {
                    popup.status ? (
                        <div>
                            <h1>{popup.message}</h1>
                        </div>
                    ) : (
                        <div className='reviewdiv'>
                            <div className='xdiv' style={{ cursor: "pointer" }} onClick={() => {
                                setFilter("Home")
                                router.push("/")
                            }}><Image src={xboxWhite} width={25} height={25} alt='xbox' /></div>
                            <h4>{reviewInfo.content === "Write a review" ? "Review the game" : "Edit your review"}</h4>
                            <h1>{reviewInfo.title}</h1>
                            <div className='ratings'>
                                {
                                    commentObject.map((item, index) => (
                                        <div id='review-oval' key={index} style={item.comment === reviewInfo.gameComment ? { backgroundColor: "white", color: "black" } : { backgroundColor: "transparent" }} onClick={() => {
                                            setReviewInfo(prevState => ({
                                                ...prevState,
                                                gameComment: item.comment
                                            }));
                                        }}><Image src={item.image} width={25} height={25} alt='bomb' /><span>{item.comment}</span></div>
                                    ))
                                }
                            </div>
                            <div>
                                <p>Review text</p>
                                <form>
                                    <textarea
                                        name='review'
                                        type='text'
                                        placeholder={reviewInfo.content === "Write a review" ? reviewInfo.content : (reviewInfo.content === null ? "Write a review" : `Your review: ${reviewInfo.content}`)}
                                        value={reviewContent}
                                        onChange={(e) => setReviewContent(e.target.value)}
                                    />
                                    <div className='buttons'>
                                        <button onClick={(e) => handleDeleteReview(e)}>Delete review</button>
                                        <button type='submit' onClick={(event) => {
                                            if(reviewInfo.chooseRev) {
                                                handleSubmit(event, reviewContent, reviewInfo.gameComment, null)
                                            } else {
                                                handleAddReview(event, reviewContent, reviewInfo.gameComment, null)
                                            }
                                        }}>Publish</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </main>
    )
}
