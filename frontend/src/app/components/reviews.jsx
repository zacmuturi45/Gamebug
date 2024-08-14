import React from 'react'
import ReviewBox from './reviewBox'
import { comment, create_date_string } from '../../../public/images'

export default function Reviews({ reviews, profilePic, username }) {

    return (
        <div className='user-reviews'>
            <div className="user-reviews-reviews">
                {
                    reviews.map((review, index) => {
                        return <ReviewBox key={index} rating={review.node.gameComment} reviewId={review.node.reviewid} ratingsvg={comment[review.node.gameComment]} profilePic={profilePic} name={username} index={index} review={review.node.content} date={review.node.dateAdded} likes={review.node.likes} dislikes={review.node.dislikes} />
                    })
                }
            </div>
        </div>
    )
}
