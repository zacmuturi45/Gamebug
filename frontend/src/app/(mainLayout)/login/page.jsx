"use client"

import AuthCard from '@/app/components/authcard'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Signup() {
    return (
        <AuthCard>
            <div className='login-main'>
                <h1>Log in</h1>

                <input
                    name='email'
                    type="text"
                    placeholder='Email'
                    id='emailinput'
                />

                <input
                    name='password'
                    type="password"
                    placeholder='Password'
                    id='passwordinput'
                />

                <div className='login-button'>Log in</div>

                <div className='login-text'>
                    <Link href="/signup"><p>Dont' have an account? Sign up.</p>
                    </Link>
                    <p>Forgot your password?</p>
                </div>
            </div>
        </AuthCard>
    )
}
