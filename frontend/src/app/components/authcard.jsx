"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { facebook, x, google, fb } from '../../../public/images'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

export default function AuthCard({ children }) {
    const [currentLocation, setCurrentLocation] = useState("");
    const pathname = usePathname()

    useEffect(() => {
        setCurrentLocation(pathname)
        console.log(`Current Location is ${currentLocation}`)

    }, [])

    async function signInWithGithub() {
        const supabase = createClientComponentClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: "http://127.0.0.1:3000//api/auth/callback"
            },
        })
    }

    const signOut = async () => {
        const supabase = createClientComponentClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
        const { error } = await supabase.auth.signOut()

        if(error) {
            alert(error.message)
        } else {
            window.location.href='/login'
        }
    }

    return (
        <main className='authcard-main row'>
            <div className='auth-children'>
                {children}
            </div>

            <div className='authcard-container'>
                <h2>{pathname === "/login" ? "Use your social accounts to log in" : "You can use social accounts to sign up"}</h2>

                <div style={{ backgroundColor: "white" }} onClick={() => signOut()}>
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
