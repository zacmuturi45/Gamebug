"use client"

import Image from 'next/image'
import React from 'react'
import { cld, plusWhite } from '../../../public/images'
import Link from 'next/link'
import { AdvancedImage } from '@cloudinary/react'
import { useRouter } from 'next/navigation'

export default function GameUsers({ image, name, edits, index, userId, key }) {
    const router = useRouter();
    return (
        <main key={key} className='main-game-users'>
            <Link href={`/users/${userId}`}>
                <div className='main-game-users-div1'>
                    <div className="image-div">
                        <AdvancedImage
                            cldImg={cld.image(image)}
                            className="profile-image"
                        />
                    </div>
                    <div className='text-div'>
                        <p>{name}</p>
                        <p>{edits} games</p>
                    </div>
                </div>
            </Link>

            <div className='main-game-users-div2' onClick={() => router.push(`/users/${userId}`)}>
                <Image src={plusWhite} alt='plusWhite' width={8} height={8} className='span' />
                <p>View</p>
            </div>
        </main>
    )
}
