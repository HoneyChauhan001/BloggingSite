import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin, logout as authlogout } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/appWriteAuth'
import { useForm } from 'react-hook-form'

function UpdatePassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    const updatePassword = async (data) => {
        setError("")
        console.log(data)
        const password = data.password;
        try {
            const session = await authService.updatePasswordRecovery({ userId, secret, password })
            navigate("/login")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='max-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Recover Password</h2>
                {/* <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&apos;
                    <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p> */}
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(updatePassword)} className='mt-8'>
                    <div className='space-y-5'>
                        {/* <Input
                            label="Email "
                            placeholder="Enter your email"
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })}
                        /> */}
                        <Input
                            label="New Password "
                            placeholder="Enter new password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        {/* <div className=''>
                            <Link to="/forgot-password" className='font-semibold text-indigo-600 hover:text-indigo-500 p-0'>
                                Forgot password?
                            </Link>
                        </div> */}
                        <Button type='submit' className='w-full'>Update Password</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword