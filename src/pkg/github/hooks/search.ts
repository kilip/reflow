import { useQuery } from '@tanstack/react-query'
import { useGitHubSearchContext } from '../context/SearchContext'
import { GitHubSearchResponse } from '../types'
import { GitHub } from '../GitHub'

export const useSearchRepos = () => {
  const { queryParams: params } = useGitHubSearchContext()

  const result =  useQuery({
    queryKey: [GitHub.search.queryKey, { params }],
    queryFn: async({queryKey}: any): Promise<GitHubSearchResponse> => {
      const [_key, { params }] = queryKey
      const searchParams = new URLSearchParams(params)
      const response = await fetch('/api/github/repo?'+searchParams, {
        method: 'GET',
      })
      return await response.json()
    }
  })
  return result
}
