"use client"

import React, { useRef, useEffect, useState } from "react";
import "../css/index.css"
import SideNavBar from "../components/sideNavBar/sidenavbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SideNavLayout({ children }) {

    const [height, setHeight] = useState(0);
    const sideRef = useRef(null);
    const mainRef = useRef(null);
    const sidenav = sideRef.current
    const main = mainRef.current

    // useEffect(() => {
    //     if (sidenav) {
    //         const h = sidenav.getBoundingClientRect().height
    //         setHeight(h)
    //     }

    // }, [])

    return (
        <div className="sidenavlayout dsp-f" ref={mainRef}>
            <div ref={sideRef} className="sidenavbar-media">
                <SideNavBar main={main}/>
            </div>
            <main className="sidenavlayout-children">
                {children}
            </main>
        </div>
    )
}