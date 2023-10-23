import classNames from 'classnames';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { MdLogout } from 'react-icons/md'

export default function Navbar() {
  return (
    <header
      className={classNames({
        'flex sticky z-20 top-0 left-0': true,
        'bg-slate-950 text-white': true,
      })}
    >
      <Link href='/dashboard' className='flex text-white p-2 items-center justify-center space-x-2 cursor-pointer'>
        <Image src='/logo.png' alt='logo' width={256} height={256} className='w-6 h-6' priority={false}/>
        <span className='font-mono text-xl font-bold'>reflow</span>
      </Link>

      {/* menu */}
      <div className='flex grow justify-end mr-4'>
            <a
              onClick={() => signOut()}
              className='
                flex items-center justify-center gap-1 cursor-pointer
                hover:text-green-400
              '
            >
              <MdLogout className='w-6 h-6'/>
              <span className='font-semibold'>Logout</span>
            </a>
      </div>

    </header>
  )
}
