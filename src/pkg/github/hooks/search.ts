import { useSearchContext } from '../contexts/SearchContext'
import { useQuery } from '@tanstack/react-query'

export const useSearchRepos = () => {
  const { getSearchParams } = useSearchContext()
  const params = getSearchParams()
  const { data: response, isLoading } =  useQuery({
    queryKey: ['gitHubSearch', { params }],
    queryFn: async({queryKey}: any) => {
      const [_key, { params }] = queryKey
      const response = await fetch('/api/github/search', {
        method: 'POST',
        body: JSON.stringify(params)
      })
      return await response.json()
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  return {
    response,
    isLoading,
  }
}
