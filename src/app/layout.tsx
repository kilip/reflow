import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import classNames from 'classnames'
import ThemeProvider from '@/pkg/ui/contexts/ThemeContext'

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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
