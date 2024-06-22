"use client"

import React, { useEffect, useRef, useState } from 'react'
import "../../css/index.css"
import Link from 'next/link'
import Image from 'next/image';
import { newReleases, genres, platforms, arrowDown } from '../../../../public/images';
import SideNavBox from '../sideNavBox';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

export default function SideNavBar({ main }) {

  gsap.registerPlugin(ScrollTrigger);
  const [toSlice, setToSlice] = useState(3);
  const [toSlice1, setToSlice1] = useState(3);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);

  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);

  const sidenavRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const top = sidenavRef.current.getBoundingClientRect().top
  //     const bottom = sidenavRef.current.getBoundingClientRect().bottom
  //     const height = sidenavRef.current.getBoundingClientRect().height
  //     setOffset(window.innerHeight - height)
  //     setTop(top)
  //     setBottom(bottom)
  //     setHeight(height)
  //     if (bottom === window.innerHeight) {
  //       gsap.set(sidenavRef.current, {
  //         top: 0,
  //         duration: 1,
  //         ease: "power3.inOut"
  //       })}
  //     // } else if(bottom > window.innerHeight) {
  //     //   gsap.set(sidenavRef.current, {
  //     //     position: "relative",
  //     //     duration: 0,
  //     //     ease: "none"
  //     //   })
  //     // }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [bottom])



  const handlePlatforms = () => {
    setToSlice(platforms.length)
    setVisible(false)
  }

  const handlePlatforms1 = () => {
    setToSlice1(genres.length)
    setVisible1(false)
  }


  return (
    <div className='sidenavbar dsp-f fd-c col-12-xs' style={{ top: offset }} ref={sidenavRef}>
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
          <div className='sidenavbox mt-1' onClick={() => handlePlatforms()}>
            <Image src={arrowDown} alt="svg-image" width={35} height={35} className={visible ? "visible" : "invisible"} />
            <p style={{ color: "lightgray" }} className={visible ? "visible" : "invisible"}>Show all</p>
          </div>

          <div
            className='sidenavbox mt-1'
            onClick={() => {
              setToSlice(3)
              setVisible(true)
            }}
          >
            <Image src={arrowDown} alt="svg-image" width={35} height={35} className={visible ? "invisible img" : "visible img"} />
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
          <div
            className='sidenavbox mt-1'
            onClick={() => handlePlatforms1()}
          >
            <Image src={arrowDown} alt="svg-image" width={35} height={35} className={visible1 ? "visible" : "invisible"} />
            <p style={{ color: "lightgray" }} className={visible1 ? "visible" : "invisible"}>Show all</p>
          </div>

          <div
            className='sidenavbox mt-1'
            onClick={() => {
              setToSlice1(3)
              setVisible1(true)
            }}
          >
            <Image src={arrowDown} alt="svg-image" width={35} height={35} className={visible1 ? "invisible img" : "visible img"} />
            <p style={{ color: "lightgray" }} className={visible1 ? "invisible" : "visible"}>Hide</p>
          </div>
        </div>
      </div>
    </div>
  )
}
