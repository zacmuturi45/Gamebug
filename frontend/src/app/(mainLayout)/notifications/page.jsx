import Image from 'next/image'
import React from 'react'
import { cry } from '../../../../public/images'

export default function Notifications() {
  return (
    <div className='notifications-main dsp-f ai-c fd-c'>
        <h1>NOTIFICATIONS</h1>
        <Image src={cry} width={120} height={120} alt='cry-emoji' />
        <p>No notifications yet</p>
    </div>
  )
}
