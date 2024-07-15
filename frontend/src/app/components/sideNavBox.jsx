"use client"

import React from 'react'
import Image from "next/image"
import { useFilter } from '../contexts/sidenavContext'

export default function SideNavBox({ image, text }) {
  const { setFilter } = useFilter();

  return (
    <div className='sidenavbox' onClick={() => setFilter(text)}>
       <Image src={image} alt="svg-image" width={35} height={35}/>
       <p>{text}</p> 
    </div>
  )
}
