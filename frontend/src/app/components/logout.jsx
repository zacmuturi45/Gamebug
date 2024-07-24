"use client"

import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

export const logoutLogic = () => {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token')
        // destroyCookie(null, 'token');
        router.push("/login");
    };

    return logout;
};
