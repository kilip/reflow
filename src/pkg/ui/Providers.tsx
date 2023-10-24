import { PropsWithChildren } from 'react';
import AuthProvider from '../auth/context/AuthContext';
import ComposeProviders from './ComposeProviders';
import ReactQueryProvider from './contexts/ReactQueryContext';
import ThemeProvider from './contexts/ThemeContext';
import ToastProvider from './contexts/ToastContext';

export default function Providers({children}: PropsWithChildren) {
  return (
    <ComposeProviders components={[
      AuthProvider,
      ReactQueryProvider,
      ThemeProvider,
      ToastProvider,
    ]}>
      {children}
    </ComposeProviders>
  )
}
