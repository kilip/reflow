'use client'
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa'

export default function Logout() {
  return (
    <div>
      <button
        className='btn btn-sm btn-primary'
        onClick={() => signOut()}
      >
        <FaSignOutAlt className='w-4 h-4'/>
        Logout
      </button>
    </div>
  )
}