"use client"

import React, { useEffect, useRef, useState } from 'react'
import "../../css/index.css"
import Link from 'next/link'
import Image from 'next/image';
import { newReleases, genres, platforms, arrowDown } from '../../../../public/images';
import SideNavBox from '../sideNavBox';

export default function SideNavBar() {

  const [toSlice, setToSlice] = useState(3);
  const [toSlice1, setToSlice1] = useState(3);

  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);

  const sidenavRef = useRef(null);

  useEffect(() => {
    if (sidenavRef.current) {
      const reflow = sidenavRef.current.offsetHeight;
      console.log(reflow)
    }
  }, [toSlice, toSlice1])


  const handlePlatforms = () => {
    setToSlice(platforms.length)
    setVisible(false)
  }

  const handlePlatforms1 = () => {
    setToSlice1(genres.length)
    setVisible1(false)
  }


  return (
    <div className='sidenavbar dsp-f fd-c col-12-xs' ref={sidenavRef}>
      <div className='sidenavbar-content'>
        <Link href="/" className='links linksh2'><h2>Home</h2></Link>
        <Link href="/" className='links linksh2'><h2>Reviews</h2></Link>
      </div>
      <div className='sidenavbar-children'>
        <div className='box'>
          <h2>New Releases</h2>
          {
            newReleases.map((item, index) => (
              <div key={index} className='sidenavbox-container'>
                <SideNavBox image={item.image} text={item.text} />
              </div>
            ))
          }
        </div>

        <div className='mt-3 box'>
          <h2>Browse</h2>
          <h2>Platforms</h2>
          {
            platforms.slice(0, toSlice).map((item, index) => (
              <div key={index} className='sidenavbox-container'>
                <SideNavBox image={item.image} text={item.text} />
              </div>
            ))
          }
          <div className='sidenavbox mt-1'>
            <Image src={arrowDown} alt="svg-image" width={35} height={35} onClick={() => handlePlatforms()} className={visible ? "visible" : "invisible"} />
            <p style={{ color: "lightgray" }} className={visible ? "visible" : "invisible"}>Show all</p>
          </div>

          <div className='sidenavbox mt-1'>
            <Image src={arrowDown} alt="svg-image" width={35} height={35} onClick={() => {
              setToSlice(3)
              setVisible(true)
            }} className={visible ? "invisible img" : "visible img"} />
            <p style={{ color: "lightgray" }} className={visible ? "invisible" : "visible"}>Hide</p>
          </div>
        </div>

        <div className='mt-3 box'>
          <h2>Genres</h2>
          {
            genres.slice(0, toSlice1).map((item, index) => (
              <div key={index} className='sidenavbox-container'>
                <SideNavBox image={item.image} text={item.text} />
              </div>
            ))
          }
          <div className='sidenavbox mt-1'>
            <Image src={arrowDown} alt="svg-image" width={35} height={35} onClick={() => handlePlatforms1()} className={visible1 ? "visible" : "invisible"} />
            <p style={{ color: "lightgray" }} className={visible1 ? "visible" : "invisible"}>Show all</p>
          </div>

          <div className='sidenavbox mt-1'>
            <Image src={arrowDown} alt="svg-image" width={35} height={35} onClick={() => {
              setToSlice1(3)
              setVisible1(true)
            }} className={visible1 ? "invisible img" : "visible img"} />
            <p style={{ color: "lightgray" }} className={visible1 ? "invisible" : "visible"}>Hide</p>
          </div>
        </div>
      </div>
    </div>
  )
}
