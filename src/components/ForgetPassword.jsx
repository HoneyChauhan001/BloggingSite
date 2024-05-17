import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/appWriteAuth'
import { useForm } from 'react-hook-form'

function ForgetPassword() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const recoverPassword = async (data) => {
        setError("")
        console.log(data)
        try {
            const session = await authService.passwordRecovery(data)
            navigate("/verify-notification")
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
                <h2 className='text-center text-2xl font-bold leading-tight'>Trouble logging in?</h2>
                <p className='mt-2 text-center text-base text-black/80'>
                    Enter your email and we'll send you a link to get back into your account.
                </p>
                {/* <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&apos;
                    <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p> */}
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(recoverPassword)} className='mt-6'>
                    <div className='space-y-5'>
                        <Input
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
                        />
                        {/* <Input
                            label="Password "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        /> */}
                        <Button type='submit' className='w-full'>Send login link</Button>
                    </div>
                </form>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&apos;
                    <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgetPassword