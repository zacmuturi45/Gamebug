import Image from 'next/image'
import React from 'react'

export default function ReviewBox({ thumbsop, thumbsdown, svg, rating, ratingsvg, profilePic, review, name, date, likes, dislikes, index }) {
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
                <div className='reviewbox-div2-div1'>
                    <Image src={profilePic} width={35} height={35} alt='svg-image' className='reviewboxsvg' />
                    <div className='bio m-l-1'>
                        <span>{name}</span><span>{date}</span>
                    </div>
                </div>

                <div className='reviewbox-div2-div2'>
                    <div className='like'>
                        <Image src={thumbsop} width={20} height={20} alt='svg-image' />
                        <span>{likes}</span>
                    </div>

                    <div className='dislike'>
                        <Image src={thumbsdown} width={17} height={17} alt='svg-image' />
                        <span>{dislikes}</span>
                    </div>
                </div>

            </div>

            <div className='reviewbox-div3'>
                <form>
                    <div className='blueball'></div>
                    <input
                        type="text"
                        name="replies"
                        id="replies"
                        placeholder='Write a reply...'
                    />
                </form>
            </div>

        </main>
    )
}
