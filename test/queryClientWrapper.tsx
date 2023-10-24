import { GitHubSearchProvider } from '@/pkg/github/context/SearchContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const wrapper = ({ children }: PropsWithChildren) => (
  <GitHubSearchProvider>
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  </GitHubSearchProvider>
)
