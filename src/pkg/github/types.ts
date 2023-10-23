import { Endpoints } from '@octokit/types'

export type GitHubUser = Endpoints['GET /user']['response']['data']

export type GitHubSearchParams = Endpoints['GET /search/repositories']['parameters']
export type GitHubSearchResponse = Endpoints['GET /search/repositories']['response']
export type GitHubSearchItems = GitHubSearchResponse['data']['items']

export type GitHubContextProps = {
  profile: GitHubUser,
}

export type GitHubSearchContextProps = {
  sort?: string
  order?: string
  per_page: number
  page: number
  total: number
  repositories: GitHubSearchItems
  initialized: boolean
  keyword: string
  owner: string
  setSort: (sort: any) => void
  setOrder: (order: any) => void
  setPerPage: (perPage: number) => void
  setPage: (page: number) => void
  setTotal: (total: number) => void
  setRepositories: (items: GitHubSearchItems) => void
  getSearchParams: () => GitHubSearchParams
  setInitialized: (initialized: boolean) => void
  setKeyword: (keyword: string) => void
  setOwner: (owner:string) => void
}

export type GitHubGetRepoParams = Endpoints['GET /repos/{owner}/{repo}']['parameters']
export type GitHubGetRepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']
export type GitHubRepo = GitHubGetRepoResponse['data']

export type GitHubDeleteRepoResponse = Endpoints['DELETE /repos/{owner}/{repo}']['response']

export type GitHubPatchRepoEndpoints = Endpoints['PATCH /repos/{owner}/{repo}']
export type GitHubPatchRepoParams = GitHubPatchRepoEndpoints['parameters']
export type GitHubPatchRepoResponse = GitHubPatchRepoEndpoints['response']

