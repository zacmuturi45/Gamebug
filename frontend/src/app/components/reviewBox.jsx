"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { thumbsop, thumbsDown, cld, create_date_string, getMiddleDigit, gradients } from '../../../public/images'
import { AdvancedImage } from '@cloudinary/react'
import { useMutation } from '@apollo/client'
import { ADDREPLY, ADDREVIEW, LIKEDISLIKE } from '../GraphQL/queries'
import ProtectedRoutes from './protectedRoute'
import { useLoggedUser } from '../contexts/loginContext'
import NameCircle from './nameCircle'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'

export default function ReviewBox({ rating, ratingsvg, profilePic, review, utilityFunction, id, name, date, likes, allRevs, dislikes, replies, index, gameId, reviewId }) {
    const [toggleReviewLike] = useMutation(LIKEDISLIKE);
    const { userInfo } = useLoggedUser();
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const dt = create_date_string(date)
    const [replyText, setReplyText] = useState("");
    const [addReply] = useMutation(ADDREPLY);
    const router = useRouter();
    const [showReply, setShowReply] = useState(false);
    const [parentId, setParentId] = useState(null);

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
        if (!userInfo.userid) {
            router.push("/login")
            return;
        }
        try {
            const { data } = await addReply({ variables: { gameId: gameId, userId: userInfo.userid, parentId: reviewId, content: content } });
            if (data.addReply.ok) {
                allRevs({ variables: { gameId: gameId } })
                setReplyText("");
            } else { alert("Error addding reply") }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }

    // const handleReplySubmit = (reviewId) => {
    //     formik.setFieldValue('parentId', reviewId);
    //     formik.handleSubmit();
    // };

    // const formik = useFormik({
    //     initialValues: {
    //         content: "",
    //         gameId: gameId,
    //         userId: userInfo.userid,
    //         parentId: 373,
    //     },
    //     onSubmit: async (values, { setSubmitting, resetForm }) => {
    //         try {
    //             const { data } = await addReply({ variables: { gameId: values.gameId, content: values.content, userId: values.userId, parentId: values.parentId } });
    //             if (data.addReply.ok) {
    //                 resetForm();
    //                 allRevs({ variables: { gameId: gameId } });
    //             } else { alert("Error adding new Reply") }
    //         } catch (error) {
    //             if (error.graphQLErrors) {
    //                 error.graphQLErrors.forEach(({ message }) => {
    //                     alert(message)
    //                 });
    //             }
    //         } finally {
    //             setSubmitting(false);
    //         }
    //     }
    // })


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
                                        {/* <ProtectedRoutes><p style={{ fontSize: 15, marginTop: 10, cursor: "pointer" }} onClick={() => setShowReply(true)}>Reply</p></ProtectedRoutes>


                                        {
                                            showReply && (
                                                <div className='reviewbox-div3'>
                                                    <form onSubmit={formik.handleSubmit}>
                                                        {userInfo.userid ? (
                                                            <div className='blueb' style={{ background: `${gradients[getMiddleDigit(userInfo.userid)]}` }}>{userInfo.username.slice(0, 1)}</div>
                                                        ) : (<div className='blueball'></div>)}
                                                        <input
                                                            type="text"
                                                            name="content"
                                                            id={`${index}${item.node.user.username}`}
                                                            placeholder='Write a reply...'
                                                            value={formik.values.content}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />


                                                        <div style={{ paddingRight: "1rem" }} className='spans-gray p-1 fs-sm dsp-f ai-c justify-flex-end'><button className='reply-button' type='button' style={{ cursor: "pointer" }}
                                                            onClick={() => handleReplySubmit(item.node.reviewId)}
                                                            disabled={formik.isSubmitting}
                                                        >Reply</button></div>

                                                    </form>

                                                </div>
                                            )
                                        } */}

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>

            <div className='reviewbox-div3'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(replyText)
                }}>
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

                    {replyText.length > 0 && (
                        <div style={{ paddingRight: "1rem" }} className='spans-gray p-1 fs-sm dsp-f ai-c justify-flex-end'><button className='reply-button' type='submit' style={{ cursor: "pointer" }}>Reply</button></div>
                    )}
                </form>

            </div>

        </main>
    )
}
