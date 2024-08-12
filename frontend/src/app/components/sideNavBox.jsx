"use client"

import React from 'react'
import Image from "next/image"
import { useFilter } from '../contexts/sidenavContext'
import { useRouter } from 'next/navigation'

export default function SideNavBox({ image, text, setToggleMenu }) {
  const router = useRouter();
  const { setFilter } = useFilter();

  return (
    <div className='sidenavbox dsp-f ai-c m-b-1' onClick={() => {
      router.push("/")
      setFilter(text)
      // setToggleMenu(false)
    }} >
       <Image src={image} alt="svg-image" width={35} height={35}/>
       <p>{text}</p> 
    </div>
  )
}
