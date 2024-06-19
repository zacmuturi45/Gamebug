"use client"

import React, { useEffect, useState } from 'react'

export default function UseScroll() {

    const [scrollDirection, setScrollDirection] = useState("none");
    const [prevOffset, setPrevOffset] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentOffset = window.scrollY;
            if (currentOffset > prevOffset) {
                setScrollDirection("down");
            } else if (currentOffset < prevOffset) {
                setScrollDirection("up");
            }
            setPrevOffset(currentOffset)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevOffset])
  return scrollDirection;
}
