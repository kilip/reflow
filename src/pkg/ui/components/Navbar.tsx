import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header 
      className={classNames({
        'flex': true,
        'bg-slate-950': true,
      })}
    >
      <Link href='/dashboard' className='flex text-white p-2 items-center justify-center space-x-2 cursor-pointer'>
        <Image src='/logo.png' alt='logo' width={512} height={512} className='w-6 h-6'/>
        <span className='font-mono text-xl font-bold'>reflow</span>
      </Link>
    </header>
  )
}