"use client"

import AuthCard from '@/app/components/authcard'
import Loader from '@/app/components/loader'
import { useFilter } from '@/app/contexts/sidenavContext'
import { LOGIN_USER } from '@/app/GraphQL/queries'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as Yup from 'yup';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setFilter } = useFilter();

    const [login] = useMutation(LOGIN_USER);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const { data } = await login({ variables: { email: values.email, password: values.password } });
                if (data.login.ok) {
                    resetForm();
                    const token = data.login.token;
                    if (token) {
                        localStorage.setItem('token', token)
                    }
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setFilter("Home")
                        router.push("/");
                    }, 3000);
                } else {
                    alert("Wrong password, please try again.");
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("Signup error. Please try again.");
            } finally {
                setSubmitting(false);
            }
        }
    })

    return (
        <AuthCard>
            <form onSubmit={formik.handleSubmit} className='login-main'>
                <h1>Log in</h1>

                <input
                    name='email'
                    type="text"
                    placeholder='Email'
                    id='emailinput'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div style={{ color: "red", textAlign: "center" }}>{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}</div>

                <input
                    name='password'
                    type="password"
                    placeholder='Password'
                    id='passwordinput'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div style={{ color: "red", textAlign: "center" }}>{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}</div>

                <button className='login-button' type='submit'>
                    {loading ? <Loader /> : <span>Log in</span>}
                </button>

                <div className='login-text'>
                    <Link href="/signup"><p>Dont' have an account? Sign up.</p>
                    </Link>
                    <p>Forgot your password?</p>
                </div>
            </form>
        </AuthCard>
    )
}
