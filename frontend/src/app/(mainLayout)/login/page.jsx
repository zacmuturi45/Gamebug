"use client"

import AuthCard from '@/app/components/authcard'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <AuthCard>
            <form className='login-main'>
                <h1>Log in</h1>

                <input
                    name='email'
                    type="text"
                    placeholder='Email'
                    id='emailinput'
                    value={email}
                />

                <input
                    name='password'
                    type="password"
                    placeholder='Password'
                    id='passwordinput'
                    value={password}
                />

                <div className='login-button'>Log in</div>

                <div className='login-text'>
                    <Link href="/signup"><p>Dont' have an account? Sign up.</p>
                    </Link>
                    <p>Forgot your password?</p>
                </div>
            </form>
        </AuthCard>
    )
}
