import { Endpoints } from '@octokit/types'

export type GitHubUser = Endpoints['GET /user']['response']['data']

export type GitHubSearchParams = Endpoints['GET /search/repositories']['parameters']
export type GitHubSearchResponse = Endpoints['GET /search/repositories']['response']
export type GitHubSearchItems = GitHubSearchResponse['data']['items']

export type GitHubContextProps = {
  profile: GitHubUser,
}

export type GitHubSearchContextProps = {
  q: string
  sort?: string
  order?: string
  per_page: number
  page: number
  total: number
  repositories: GitHubSearchItems
  setQ: (q: string) => void
  setSort: (sort: any) => void
  setOrder: (order: any) => void
  setPerPage: (perPage: number) => void
  setPage: (page: number) => void
  setTotal: (total: number) => void
  setRepositories: (items: GitHubSearchItems) => void
  getSearchParams: () => GitHubSearchParams
}

export type GitHubRepo = GitHubSearchItems['at']
