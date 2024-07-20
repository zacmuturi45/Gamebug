"use client"

import Image from 'next/image'
import React from 'react'
import { cld, grateful, platformIcons, psWhite } from '../../../public/images'
import { AdvancedImage } from '@cloudinary/react'
import { useRouter } from 'next/navigation'
import { useFilter } from '../contexts/sidenavContext'

export default function SearchGame({ setQuery, title, platform, image, itemIndex, id, user }) {
    const router = useRouter();
    const { setFilter } = useFilter();

    const handleRouting = (user, id) => {
        setQuery("")
        setFilter("")
        if(user === "game") {
            router.push(`/${id}`)
        } else if (user === "user") {
            router.push('/users')
        }
    }

    let plats= []
    if (platform) {
        plats = platform.map(item => platformIcons[item]).filter(icon => icon !== undefined);
    }
    return (
        <div className='game-result' key={itemIndex}>
            <div className='game-result-image'>
                <AdvancedImage
                    width={45}
                    height={50}
                    cldImg={cld.image(image)}
                />
                {/* <Image src={image} alt='game-image' width={45} height={50} /> */}
            </div>
            <div className='game-result-title'>
                <p onClick={() => handleRouting(user, id)}>{title}</p>
                <div className='pticons'>
                    {platform &&
                        plats.map((item, index) => (
                            <div key={index} >
                                <Image src={item} alt='platIcon' width={12} height={12} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
