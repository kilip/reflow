import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import classNames from 'classnames'
import ComposeProviders from '@/pkg/ui/ComposeProviders'
import ThemeProvider from '@/pkg/ui/contexts/ThemeContext'
import AuthProvider from '@/pkg/auth/context/AuthContext'
import ToastProvider from '@/pkg/ui/contexts/ToastContext'
import ReactQueryProvider from '@/pkg/ui/contexts/ReactQueryContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'reflow',
  description: 'Cleans up your remote repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={classNames({
          'bg-gray-200 min-h-screen': true
        })}
      >
        <ComposeProviders components={[
          ThemeProvider,
          ToastProvider,
          AuthProvider,
          ReactQueryProvider
        ]}>
          {children}
        </ComposeProviders>
      </body>
    </html>
  )
}
