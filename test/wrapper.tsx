import ComposeProviders from '@/pkg/ui/ComposeProviders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JSXElementConstructor, PropsWithChildren } from 'react'

export function createReactQueryWrapper(
  components: Array<JSXElementConstructor<PropsWithChildren<any>>>,
  qc?: QueryClient
) {
  if (!qc) {
    qc = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  }

  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={qc as QueryClient}>
      <ComposeProviders components={components}>{children}</ComposeProviders>
    </QueryClientProvider>
  )

  return wrapper
}
