"use client"

import AuthCard from '@/app/components/authcard'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '@/app/GraphQL/queries';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [signup] = useMutation(SIGNUP_USER);
    const router = useRouter();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
            username: Yup.string().required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const { data } = await signup({ variables: { email: values.email, password: values.password, username: values.username } });
                if (data.signup.ok) {
                    resetForm();
                    alert("Signup successful. Please check your email for confirmation");
                    router.push("/login")
                } else {
                    alert("Signup failed. Please try again.");
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("Signup error. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        const router = useRouter();
    }

    return (
        <AuthCard>
            <form
                onSubmit={formik.handleSubmit}
                className='signup-main'>
                <div>
                    <h1>Sign up</h1>
                </div>

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
                    name='username'
                    type="text"
                    placeholder='Username'
                    id='usernameinput'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div style={{ color: "red", textAlign: "center" }}>{formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}</div>

                <input
                    name='password'
                    type="password"
                    placeholder='Create password'
                    id='passwordinput'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div style={{ color: "red", textAlign: "center" }}>{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}</div>

                <input
                    name='confirmPassword'
                    type="password"
                    placeholder='Confirm password'
                    id='confirmpasswordinput'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div style={{ color: "red", textAlign: "center" }}>{formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                </div>

                <button className='signup-button' type='submit'>Sign up</button>
            </form>
        </AuthCard>

    )
}
