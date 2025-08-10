import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError("")
        setIsLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4'>
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
                    
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
                            <Logo width="60%" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                            Join Our Community
                        </h1>
                        <p className="text-gray-600 text-base">
                            Create your account to get started
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                            error={errors.name?.message}
                            {...register("name", {
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />
                        
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            required
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            required
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />

                        <div className="space-y-4">
                            <Button
                                type="submit"
                                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        <span>Create Account</span>
                                    </div>
                                )}
                            </Button>
                            
                            <div className="text-xs text-gray-500 text-center">
                                By signing up, you agree to our Terms of Service and Privacy Policy
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                            </div>
                        </div>
                        
                        <p className="mt-4 text-gray-600">
                            <Link
                                to="/login"
                                className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 relative group"
                            >
                                Sign in here
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup