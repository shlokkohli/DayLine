'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const signIn = () => {

  const {data: session} = useSession();

  console.log("This is the session: ", session)

  return (
    <div>
        SignIn Page
    </div>
  )
}

export default signIn
