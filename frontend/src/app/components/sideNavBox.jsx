"use client"

import React from 'react'
import Image from "next/image"

export default function SideNavBox({ image, text }) {
  return (
    <div className='sidenavbox'>
       <Image src={image} alt="svg-image" width={35} height={35}/>
       <p>{text}</p> 
    </div>
  )
}
