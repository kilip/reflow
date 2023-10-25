import { useQuery } from '@tanstack/react-query'
import { useGitHubSearchContext } from '../context/SearchContext'
import { GitHubSearchResponse } from '../types'
import { GitHub } from '../GitHub'
import { api } from '@/pkg/utils/fetch'
import { useThemeContext } from '@/pkg/ui/contexts/ThemeContext'

export default function useSearchRepos() {
  const { queryParams: params } = useGitHubSearchContext()
  const { setLoading } = useThemeContext()

  const result = useQuery({
    queryKey: [GitHub.search.queryKey, { params }],
    queryFn: async ({ queryKey }: any): Promise<GitHubSearchResponse> => {
      const [_key, { params }] = queryKey
      const searchParams = new URLSearchParams(params)
      const response = await api<GitHubSearchResponse>(
        '/api/github/repo?' + searchParams,
        {
          method: 'GET',
        }
      )
      return response
    },
  })
  return result
}
