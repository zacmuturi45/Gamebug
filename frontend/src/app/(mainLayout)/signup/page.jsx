"use client"

import AuthCard from '@/app/components/authcard'
import { useRouter } from 'next/router'
import React from 'react'

export default function Signup() {
    return (
        <AuthCard>
            <div className='signup-main'>
                <div>
                    <h1>Sign up</h1>
                </div>

                <input
                    name='email'
                    type="text"
                    placeholder='Email'
                    id='emailinput'
                />

                <input
                    name='username'
                    type="text"
                    placeholder='Username'
                    id='usernameinput'
                />

                <input
                    name='password'
                    type="password"
                    placeholder='Create password'
                    id='passwordinput'
                />

                <div className='signup-button'>Sign up</div>
            </div>
        </AuthCard>

    )
}
