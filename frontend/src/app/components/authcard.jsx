"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { facebook, x, google, fb } from '../../../public/images'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCard({ children }) {
    const [currentLocation, setCurrentLocation] = useState("");
    const pathname = usePathname()

    useEffect(() => {
        setCurrentLocation(pathname)
        console.log(`Current Location is ${currentLocation}`)

    }, [])

    async function signInWithGithub() {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/api/auth/callback`
            },
        })
    }

    const handleSignIn = () => { }

    return (
        <main className='authcard-main row'>
            <div>
                {children}
            </div>

            <div className='authcard-container'>
                <h2>{pathname === "/login" ? "Use your social accounts to log in" : "You can use social accounts to sign up"}</h2>

                <div style={{ backgroundColor: "white" }}>
                    <Image src={x} width={35} height={35} alt='thumbs-Up' />
                    <p style={{ color: "black" }}>{pathname === "/login" ? "Log in with X" : "Sign up with X"}</p>
                </div>

                <div style={{ backgroundColor: "rgb(65, 113, 185)" }}>
                    <Image src={fb} width={35} height={35} alt='thumbs-Up' />
                    <p>{pathname === "/login" ? "Log in with Facebook" : "Sign up with Facebook"}</p>
                </div>

                <div style={{ backgroundColor: "lightgray" }} onClick={() => signInWithGithub()}>
                    <Image src={google} width={35} height={35} alt='thumbs-Up' />
                    <p style={{ color: "black" }}>{pathname === "/login" ? "Log in with Github" : "Sign up with Github"}</p>
                </div>
            </div>

        </main>
    )
}
