"use client"

import Image from 'next/image'
import React from 'react'
import { cld, controller, giftBox, isaac, plusWhite } from '../../../public/images'
import Link from 'next/link'
import { AdvancedImage } from '@cloudinary/react'
import { useRouter } from 'next/navigation'

export default function FollowData({ image, name, id, gameCount, wishlistCount, key, index }) {
    const router = useRouter();

    return (
        <main key={key} className='follow-main-game-users row'
            onClick={() => router.push(`/users/${id}`)}
        >
            <div className='follow-pic'>
                <AdvancedImage
                    className="follow-image"
                    cldImg={cld.image(image)}
                />
            </div>
            <div className='follow-div-items'>
                <h4>{name.slice(0, 10)}...</h4>
                <div className='dsp-f mt-1'>
                    <div className='m-r-1 dsp-f ai-c'>
                    <Image src={controller} height={20} width={18} alt='collections' />
                    <span className='fs-sm m-l-1 spans-gray'>{gameCount}</span>
                    </div>
                    
                    <div className='dsp-f ai-c'>
                    <Image src={giftBox} height={17} width={17} alt='collections' />
                    <span className='fs-sm m-l-1 spans-gray'>{wishlistCount}</span>
                    </div>

                </div>
            </div>
        </main>
    )
}
