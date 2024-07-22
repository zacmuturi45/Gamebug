import Image from 'next/image'
import React from 'react'
import { email, grass } from '../../../../public/images'

export default function Verify() {
  return (
    <div className='verify'>
        <div className='verify-div'>
            <Image src={email} width={100} height={100} alt='email-image' />
            <h1>You are almost there!</h1>
            <p>Only one step left to become a part of the GameGo family. Please log in to your email and click the link we have sent you.</p>
        <Image src={grass} width={80} height={80} alt='grass-svg' />
        </div>
    </div>
  )
}
