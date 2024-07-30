"use client"

import React from 'react'
import { useLoggedUser } from '../contexts/loginContext'
import { useRouter } from 'next/navigation';

export default function ProtectedRoutes({ children }) {
  const { userInfo } = useLoggedUser();
  const router = useRouter();

  return (
    <div onClick={() => {
        if(!userInfo.userid) {
            router.push("/login")
        }
    }}>
        { children }
    </div>
  )
}
