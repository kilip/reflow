import { PropsWithChildren } from 'react';

export default function LayoutFull({children}: PropsWithChildren) {
  return (
    <main className='min-h-screen'>
      {children}
    </main>
  )
}