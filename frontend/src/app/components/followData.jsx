import Image from 'next/image'
import React from 'react'
import { plusWhite } from '../../../public/images'
import Link from 'next/link'

export default function FollowData({ image, name, edits, followerCount, follow, index }) {
    return (
        <main key={index} className='follow-main-game-users'>
            <Link href='/users'>
                <div className='follow-main-game-users-div1'>
                    <div className="follow-image-div">
                        <Image src={image} alt='profile-image' className='follow-profile-image' />
                    </div>
                    <div className='follow-text-div'>
                        <p>{name}</p>
                        <p>{edits} games</p>
                    </div>
                </div>
            </Link>

            <div className='follow-main-game-users-div2'>
                <Image src={plusWhite} alt='plusWhite' width={8} height={8} className='follow-span' />
                <p>{follow}</p>
                <p className='follow-followercount'>{followerCount}</p>
            </div>
        </main>
    )
}
