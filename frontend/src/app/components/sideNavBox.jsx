"use client"

import React from 'react'
import Image from "next/image"

export default function SideNavBox({ image, text }) {
  return (
    <div className='sidenavbox'>
       <Image src={image} alt="svg-image" width={40} height={40}/>
       <p>{text}</p> 
    </div>
  )
}
