"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { facebook, x, google, fb } from '../../../public/images'
import { usePathname } from 'next/navigation'

export default function AuthCard({ children }) {
    const [currentLocation, setCurrentLocation] = useState("");
    const pathname = usePathname()

    useEffect(() => {
        setCurrentLocation(pathname)
        console.log(`Current Location is ${currentLocation}`)

    }, [])

    return (
        <main className='authcard-main row'>
            <div>
                {children}
            </div>

            <div className='authcard-container'>
                <h2>{pathname === "/login" ? "Use your social accounts to log in" : "You can use social accounts to sign up"}</h2>

                <div style={{backgroundColor: "rgb(65, 113, 185)"}}>
                    <Image src={fb} width={35} height={35} alt='thumbs-Up' />
                    <p>{pathname === "/login" ? "Log in with Facebook" : "Sign up with Facebook"}</p>
                </div>

                <div style={{backgroundColor: "white"}}>
                    <Image src={x} width={35} height={35} alt='thumbs-Up' />
                    <p style={{color: "black"}}>{pathname === "/login" ? "Log in with X" : "Sign up with X"}</p>
                </div>

                <div style={{backgroundColor: "maroon"}}>
                    <Image src={google} width={35} height={35} alt='thumbs-Up' />
                    <p>{pathname === "/login" ? "Log in with Google" : "Sign up with Google"}</p>
                </div>
            </div>

        </main>
    )
}
