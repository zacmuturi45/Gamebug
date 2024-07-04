import React from 'react'
import ReviewBox from './reviewBox'
import { tick, bomb, thumbsUp, pumpkincry, pumpkinmeh, isaac, grateful } from '../../../public/images'

export default function Reviews() {

    const reviewArray = [
        { svg: tick, review: "Super nice game", ratingsvg: bomb, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Lukasz Milescu" },
        { svg: tick, review: "Devoid of the x-factor but playable", ratingsvg: thumbsUp, profilePic: grateful, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Aldoff Karembeu" },
        { svg: tick, review: "A good starter for the wannabe vampire fanatic", ratingsvg: pumpkinmeh, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Meh", name: "Aileen Sanchez" },
        { svg: tick, review: "Meh is weh ei ken see", ratingsvg: thumbsUp, profilePic: grateful, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Lucy Bierschoff" },
        { svg: tick, review: "Fuck mother Russia", ratingsvg: pumpkincry, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Skip", name: "Alberto Moreira" }
    ]
    return (
        <div className='user-reviews'>
            <div className="user-reviews-reviews">
                {
                    reviewArray.map((review, index) => {
                        return <ReviewBox svg={review.svg} rating={review.rating} ratingsvg={review.ratingsvg} profilePic={review.profilePic} name={review.name} index={index} review={review.review} date={review.date} likes={review.likes} dislikes={review.dislikes} />
                    })
                }
            </div>
        </div>
    )
}
