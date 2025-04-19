'use client'
import { signIn } from 'next-auth/react'

const signUp = () => {


  return (
    <div className='max-w-full max-h-full flex justify-center items-center'>

        <button
            onClick={() => signIn('google')}
        >
        Sign-up by google
        </button>
      
    </div>
  )
}

export default signUp
