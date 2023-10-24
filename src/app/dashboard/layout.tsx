import LayoutDefault from '@/pkg/ui/views/LayoutDefault';
import { PropsWithChildren } from 'react';

export default function Layout({children}: PropsWithChildren) {
  return (
    <LayoutDefault>
      {children}
    </LayoutDefault>
  )
}
