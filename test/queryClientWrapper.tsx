import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const wrapper = ({children}: PropsWithChildren) => (
  <QueryClientProvider client={qc}>
    {children}
  </QueryClientProvider>
)
