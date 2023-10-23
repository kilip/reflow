'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function ReactQueryProvider({children}: PropsWithChildren) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    }
  }))

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}
