"use client"

import AuthCard from '@/app/components/authcard'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CHANGEPASSWORD, SIGNUP_USER } from '@/app/GraphQL/queries';
import Loader from '@/app/components/loader';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [changePassword] = useMutation(CHANGEPASSWORD);
    const router = useRouter();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const { data } = await changePassword({ variables: { email: values.email, password: values.password } });
                if (data.changePassword.ok) {
                    setLoading(true)
                    setTimeout(() => {
                        resetForm();
                        router.push("/login")
                    }, 3000);
                } else {
                    alert("Password change failed. Please try again.");
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("Password change error. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });
    
    return (
        <AuthCard>
            <form
                onSubmit={formik.handleSubmit}
                className='signup-main'>
                <div>
                    <h1>Change password</h1>
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
                    name='password'
                    type="password"
                    placeholder='New password'
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

                <button className='signup-button' type='submit'>
                    {loading ? <Loader /> : <span>Submit</span>}
                </button>
            </form>
        </AuthCard>

    )
}
