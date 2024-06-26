import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../appwrite/appWriteAuth'
import { login as authLogin } from '../store/authSlice'
import { Logo, Input, Button } from './index'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()


    const createAccount = async (data) => {
        setError("")
        setIsSubmitting(true)
        try {
            const session = await authService.createAccount(data)
            console.log("Signup :: creatAccount");
            navigate("/verify-notification")
        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(createAccount)} className='mt-8'>
                        <div className='space-y-5'>
                            <Input
                                label="Full Name "
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true
                                })}
                            />
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
                            <Input
                                label="Password "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true
                                })}
                            />
                            <Button
                                type="submit"
                                className='w-full'
                                disabled={isSubmitting}
                            >{isSubmitting ? 'Submitting...' : 'Create Account'}</Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Signup