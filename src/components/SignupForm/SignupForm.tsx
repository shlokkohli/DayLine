'use client'
import { signUpSchema } from '@/schemas/signUpSchema';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, User, Eye, EyeOff, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface SignUpFormProps {
    isSignUp: boolean
}

const SignupForm: React.FC<SignUpFormProps> = ({ isSignUp }) => {

    const [showPassword, setShowPassword] = useState(false)

    const { register, formState: {errors} } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

  return (  
    <form className='space-y-6'>
        
        {isSignUp && (
            <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
                    Email Address
                </label>

                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <User className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                    type="name"
                    id='email'
                    className='block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:text-black'
                    placeholder='John Doe'
                    />
            {errors.name && (
                <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
            </div>
        )}

        <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
                Email Address
            </label>
            <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Mail className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                        type="email"
                        id='email'
                        className='block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:text-black'
                        placeholder='you@example.com'
                    />
                {errors.email && (
                    <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
                )}
            </div>
        </div>

        <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
                Password
            </label>

            <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Lock className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        className='block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:text-black'
                        placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <EyeOff className='h-5 w-5 text-gray-500 hover:text-gray-700' />
                        ) : (
                            <Eye className='h-5 w-5 text-gray-500 hover:text-gray-700' />
                        )}
                    </button>
                    {errors.password && (
                        <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
                    )}
            </div>
        </div>

        <div>
            <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
                <span className="flex items-center">
                    {isSignUp ? 'Create account' : 'Sign in'}
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
            </button>

      </div>

    </form>
  )
}

export default SignupForm