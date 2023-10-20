import { PropsWithChildren } from 'react';
import classNames from 'classnames'
import Navbar from './Navbar';

export default function LayoutDefault({children}: PropsWithChildren) {
  return (
    <div 
      className={classNames({
        'flex flex-col': true
      })}
    >
      {/* top navbar */}
      <Navbar/>

      {/* main content */}
      <main className='flex p-4'>
        {children}
      </main>
    </div>
  )
}