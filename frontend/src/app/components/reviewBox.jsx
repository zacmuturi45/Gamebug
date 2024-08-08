"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { thumbsop, thumbsDown, cld, create_date_string, getMiddleDigit, gradients } from '../../../public/images'
import { AdvancedImage } from '@cloudinary/react'
import { useMutation } from '@apollo/client'
import { ADDREVIEW, LIKEDISLIKE } from '../GraphQL/queries'
import ProtectedRoutes from './protectedRoute'
import { useLoggedUser } from '../contexts/loginContext'
import NameCircle from './nameCircle'
import { useRouter } from 'next/navigation'

export default function ReviewBox({ rating, ratingsvg, profilePic, review, utilityFunction, id, name, date, likes, dislikes, replies, index, gameId, reviewId }) {
    const [toggleReviewLike] = useMutation(LIKEDISLIKE);
    const { userInfo } = useLoggedUser();
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const dt = create_date_string(date)
    const [replyText, setReplyText] = useState("");
    const [addReview] = useMutation(ADDREVIEW);
    const router = useRouter();

    useEffect(() => {
        if (likes && dislikes) {
            setLike(likes)
            setDislike(dislikes)
        }
    }, [])

    const handleReviewLike = async (userId, revId, tolike) => {
        try {
            const { data } = await toggleReviewLike({ variables: { reviewId: revId, userId: userId, toLike: tolike } });
            if (data.toggleReviewLike.ok) {
                setLike(data.toggleReviewLike.review.likes)
                setDislike(data.toggleReviewLike.review.dislikes)
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    const handleSubmit = async (content) => {
        try {
            const { data } = await addReview({ variables: {gameId: gameId, userId: userInfo.userid, parentId: reviewId, content: content, gameRating: null, gameComment: null }});
            if(data.addReview.ok) {
                alert("Reply successfully added")
                setReplyText("");
            } else {alert("Error addding reply")}
        } catch (error) {
            if(error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    const handleKeydown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault()
            handleSubmit(replyText)
        }
    }


    return (
        <main key={index} className='reviewbox-main'>

            <div className='reviewbox-div1'>
                <h2>{rating}</h2>
                <span><Image src={ratingsvg} width={25} height={25} alt='svg-image' /></span>
            </div>

            <div className='reviewbox-review'>
                <p>{review}</p>
            </div>

            <div className='reviewbox-div2'>
                <div className='reviewbox-div2-div1'
                    onClick={() => utilityFunction(id)}
                >
                    <AdvancedImage
                        className="reviewboxsvg"
                        cldImg={cld.image(profilePic)}
                        width={35}
                        height={35}
                    />
                    <div className='bio m-l-1'>
                        <span>{name}</span><span>{dt}</span>
                    </div>
                </div>

                <div className='reviewbox-div2-div2'>
                    <ProtectedRoutes>
                        <div className='like'
                            onClick={() => handleReviewLike(userInfo.userid, reviewId, true)}
                            style={{ cursor: "pointer" }}
                        >
                            <Image src={thumbsop} width={20} height={20} alt='svg-image' />
                            <span>{like}</span>
                        </div>
                    </ProtectedRoutes>

                    <ProtectedRoutes>

                        <div className='dislike'
                            onClick={() => handleReviewLike(userInfo.userid, reviewId, false)}
                            style={{ cursor: "pointer" }}
                        >
                            <Image src={thumbsDown} width={17} height={17} alt='svg-image' />
                            <span>{dislike}</span>
                        </div>
                    </ProtectedRoutes>
                </div>

            </div>

            <div className="replydiv">
                {replies && (
                    <div className='replydiv-child'>
                        {
                            replies.map((item, index) => (
                                <div key={index} className='reply-container'>
                                    <AdvancedImage cldImg={cld.image(item.node.user.profilePic)} className="cont-1" />
                                    <div className='cont-2'>
                                        <span>{item.node.user.username}</span>
                                        <p>{item.node.content}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>

            <div className='reviewbox-div3'>
                <form>
                    {userInfo.userid ? (
                        <div className='blueb' style={{ background: `${gradients[getMiddleDigit(userInfo.userid)]}` }}>{userInfo.username.slice(0, 1)}</div>
                    ) : (<div className='blueball'></div>)}
                    <input
                        type="text"
                        name="replies"
                        id="replies"
                        placeholder='Write a reply...'
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                </form>
                {replyText.length > 0 && (
                    <div style={{ paddingRight: "1rem" }} className='spans-gray p-1 fs-sm dsp-f ai-c justify-flex-end'><button className='reply-button' type='submit' onClick={() => {
                        if(!userInfo.userid) {
                            router.push("/login")
                        } else {
                            handleSubmit(replyText)
                        }
                    }}>Reply</button></div>
                )}
            </div>

        </main>
    )
}
