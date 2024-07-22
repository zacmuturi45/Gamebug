"use client"

import React, { useState } from 'react'
import gsap from 'gsap'

export default function MenuBar({ setToggleMenu, toggleMenu }) {
    const [isAnimated, setIsAnimated] = useState(false);

    const handleClick = () => {
        if (isAnimated) {
            gsap.to(".div1", {
                opacity: 1,
                duration: .2,
                ease: "sine.inOut"
            });
            gsap.to(".div2", {
                rotate: "0deg",
                duration: .3,
                ease: "sine.inOut"
            });
            gsap.to(".div3", {
                marginTop: "7px", // Assuming you want to reset to its initial value
                rotate: "0deg",
                duration: .3,
                ease: "sine.inOut"
            });
        } else {
            gsap.to(".div1", {
                opacity: 0,
                duration: .2,
                ease: "sine.inOut"
            })
            gsap.to(".div2", {
                rotate: "-45deg",
                duration: .3,
                ease: "sine.inOut"
            })
            gsap.to(".div3", {
                marginTop: 0,
                rotate: "45deg",
                duration: .3,
                ease: "sine.inOut"
            })
        }
        setIsAnimated(!isAnimated);
        setToggleMenu(!toggleMenu)
    }

    return (
        <div className='menuBar' onClick={() => handleClick()}>
            <div className='div1'></div>
            <div className='div2'></div>
            <div className='div3'></div>
        </div>
    )
}
