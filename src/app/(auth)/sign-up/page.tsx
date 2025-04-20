'use client'
import { signIn } from 'next-auth/react'

const SignUp = () => {

  const handleGoogleSignUp = async () => {
    try {

      await signIn('google',
        {callbackUrl: '/done'}
      )
      
    } catch (error) {

      console.log("Some error occured in the google login", error)
      
    }
  }

  return (
    <div className='max-w-full max-h-full flex justify-center items-center'>
      <button 
        onClick={handleGoogleSignUp}
        className='border-2 border-white cursor-pointer p-2 rounded'
      >
        Sign up with Google
      </button>
    </div>
  )
}

export default SignUp