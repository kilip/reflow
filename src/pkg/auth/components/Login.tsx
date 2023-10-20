'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'

export default function Login() {
  const handleSignIn = () => {
    signIn('github', {
      redirect: true,
      callbackUrl: '/dashboard'
    })
  }
  return (
    <div className='flex flex-col w-96 justify-items-center bg-white rounded-lg drop-shadow-lg p-4 space-y-4'>
      <div>
        <h1 className='text-xl font-extrabold'>Login to reflow</h1>
      </div>
      <div>
        <p>
          Please login with remote repositories you want to manage.
        </p>
      </div>
      <div>
        <button onClick={handleSignIn} className='btn btn-sm btn-neutral'>
          <FaGithub className='w-4 h-4'/>
          GitHub
        </button>
      </div>
    </div>
  )
}