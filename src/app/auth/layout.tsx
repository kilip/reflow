import LayoutFull from '@/pkg/ui/views/LayoutFull';
import { PropsWithChildren } from 'react';

export default function Layout({children}: PropsWithChildren) {
  return (
    <LayoutFull>
      {children}
    </LayoutFull>
  )
}
