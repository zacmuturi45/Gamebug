"use client"

import React, { useRef, useEffect, useState } from "react";
import "../css/index.css"
import SideNavBar from "../components/sideNavBar/sidenavbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function SideNavLayout({ children }) {

    const [height, setHeight] = useState(0);
    const sideRef = useRef(null);
    const mainRef = useRef(null);
    const sidenav = sideRef.current
    const main = mainRef.current
    const pathname = usePathname()

    return (
        <div className="sidenavlayout dsp-f" ref={mainRef}>
            <div ref={sideRef} className={pathname === "/login" || pathname === "/signup" || pathname === "/review" ? "hide sidenavbar-media" : "sidenavbar-media"}>
                <SideNavBar main={main}/>
            </div>
            <main className="sidenavlayout-children">
                {children}
            </main>
        </div>
    )
}