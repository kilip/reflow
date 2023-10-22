import GitHubProvider from '@/pkg/github/contexts/GitHubContext';
import { PropsWithChildren } from 'react';

export default function Layout({children}: PropsWithChildren) {
  return (
    <GitHubProvider>
      {children}
    </GitHubProvider>
  )
}
