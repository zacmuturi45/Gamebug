import Image from 'next/image'
import React from 'react'
import { tick } from '../../../public/images'

export default function AddGamePanel({ svg, mainText, spanText, index }) {
    return (
        <div className='addGMain' key={index}>
            <div className='gOne'>
                <Image src={svg} width={20} height={20} alt='game-image' />
                <div className='gTwo'>
                    <h4>{mainText}<><Image src={tick} width={15} height={15} alt='game-image' style={{marginLeft: 3}} />
                    </></h4>
                    <p>{spanText}</p>
                </div>
            </div>
        </div>
    )
}
