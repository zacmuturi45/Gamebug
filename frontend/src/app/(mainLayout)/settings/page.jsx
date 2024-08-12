"use client"

import React, { useState } from 'react'
import { cld, getMiddleDigit, gradients } from '../../../../public/images'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { DELETEUSER, SETTINGS } from '@/app/GraphQL/queries'
import { useLoggedUser } from '@/app/contexts/loginContext'
import { useFilter } from '@/app/contexts/sidenavContext'
import Loader from '@/app/components/loader'
import NameCircle from '@/app/components/nameCircle'

export default function Settings({ image }) {
    const [settings] = useMutation(SETTINGS);
    const [deleteUser] = useMutation(DELETEUSER);
    const { userInfo, setUserInfo } = useLoggedUser();
    const { setFilter } = useFilter();
    const router = useRouter();
    const [successDisplay, setSuccessDisplay] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false)

    // const handleDeleteUser = async () => {
    //     try {
    //         const { data } = await deleteUser({ variables: { userId: userInfo.userid } });
    //         if (data.deleteUser.ok) {
    //             setSuccessDisplay(prevState => ({
    //                 ...prevState,
    //                 status: true,
    //                 message: "Account deleted successfully!"
    //             }));
    //             setTimeout(() => {
    //                 setFilter("Home")
    //                 router.push("/")
    //             }, 2500);
    //         }
    //     } catch (error) {
    //         if (error.graphQLErrors) {
    //             error.graphQLErrors.forEach(({ message }) => {
    //                 alert(message)
    //             });
    //         }
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            newUsername: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().min(6, "Must be at least 6 characters"),
            newPassword: Yup.string().min(6, "Must be at least 6 characters"),
            newUsername: Yup.string().min(6, "Must be 6 characters or more").required("Required")
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const { data } = await settings({ variables: { userId: userInfo.userid, password: values.newPassword, username: values.newUsername } });
                if (data.settings.ok) {
                    setLoading(true)
                    setTimeout(() => {
                        setUserInfo(prevState => ({
                            ...prevState,
                            username: data.settings.newName
                        }))
                        setSuccessDisplay(prevState => ({
                            ...prevState,
                            status: true,
                            message: "Redirecting...."
                        }))
                    }, 2000);
                    setTimeout(() => {
                        resetForm();
                        setFilter("Home")
                        router.push("/")
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
        <div className='settings-main'>
            {
                successDisplay.status ? (<div>
                    {successDisplay.message}
                </div>) : (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="settings-container">
                            <h1>Settings</h1>
                            <div className="profilepic">
                                <NameCircle name={"Zac".slice(0, 1)} gradient={gradients[getMiddleDigit(23)]} />

                                <h2>Username</h2>
                            </div>

                            <div className="password">
                                <p>Change password</p>


                                <input
                                    name='oldPassword'
                                    type="password"
                                    placeholder='Old password'
                                    id='oldPassword'
                                    value={formik.values.oldPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />


                                <input
                                    name='newPassword'
                                    type="password"
                                    placeholder='New password'
                                    id='newpassword'
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>

                            <div className="username">
                                <p>Change username</p>
                                <input
                                    name='newUsername'
                                    type="text"
                                    placeholder='New username'
                                    id='newusername'
                                    value={formik.values.newUsername}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>

                            <div className="save">
                                <button className='changes-button' type='submit'>{loading ? <Loader /> : "Save Changes"}</button>
                                {/* <span onClick={() => handleDeleteUser()} className='delete-button'>Delete your account</span> */}
                            </div>
                        </div>
                    </form>
                )
            }
        </div>
    )
}
