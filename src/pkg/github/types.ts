import { Endpoints } from '@octokit/types'
import { components as OctokitComponents } from '@octokit/openapi-types'

export type GitHubUser = Endpoints['GET /user']['response']['data']

export type GitHubSearchResponse =
  Endpoints['GET /search/repositories']['response']
export type GitHubSearchItems = GitHubSearchResponse['data']['items']
export type GitHubSearchItem =
  OctokitComponents['schemas']['repo-search-result-item']

export enum GitHubEnumSortOrder {
  asc = 'asc',
  desc = 'desc',
}

export enum GitHubEnumVisibility {
  undefined = 'undefined',
  public = 'is:public',
  private = 'is:private',
}

export enum GitHubEnumArchived {
  undefined = 'undefined',
  true = 'archived:true',
  false = 'archived:false',
}

export type GitHubSortType =
  | 'stars'
  | 'forks'
  | 'help-wanted-issues'
  | 'updated'
  | undefined

export type GitHubSearchParams = {
  keyword: string
  owner: string
  sort: GitHubSortType
  order: GitHubEnumSortOrder
  page: number
  per_page: number
  visibility: GitHubEnumVisibility
  archived: GitHubEnumArchived
}

export type GitHubSearchContextProps = {
  total: number
  queryParams: GitHubSearchParams
  setKeyword: (newVal: string) => void
  setOwner: (newVal: string) => void
  setSort: (newVal: string) => void
  setOrder: (newVal: GitHubEnumSortOrder) => void
  setPerPage: (newVal: number) => void
  setPage: (newVal: number) => void
  setVisibility: (newVal: GitHubEnumVisibility) => void
  setArchived: (newVal: GitHubEnumArchived) => void
  setTotal: (newVal: number) => void
} & GitHubSearchParams

export type GitHubDeleteRepoResponse =
  Endpoints['DELETE /repos/{owner}/{repo}']['response']

export type GitHubPatchRepoParams =
  Endpoints['PATCH /repos/{owner}/{repo}']['parameters']
export type GitHubPatchResponse =
  Endpoints['PATCH /repos/{owner}/{repo}']['response']
