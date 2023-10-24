'use client'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { GitHubEnumArchived, GitHubEnumSortOrder, GitHubEnumVisibility, GitHubSearchContextProps, GitHubSearchParams, GitHubSortType } from '../types';
import { GitHub } from '../GitHub';

const GitHubSearchContext = createContext<GitHubSearchContextProps|undefined>(undefined)

function getDefaults(): GitHubSearchParams{
  const defaults = {
    keyword: '',
    owner: '',
    sort: (GitHub.search.sort as GitHubSortType ),
    order: GitHub.search.order,
    per_page: GitHub.search.perPage,
    page: 1,
    visibility: GitHubEnumVisibility.undefined,
    archived: GitHubEnumArchived.undefined
  }

  if(typeof window !== 'undefined'){
    const json = localStorage.getItem(GitHub.search.cacheKey)
    if(json){
      Object.assign(defaults, {
        ...JSON.parse(json)
      })
    }
  }

  return defaults
}

export function GitHubSearchProvider({children}: PropsWithChildren) {
  const defaults = getDefaults()
  const [keyword, setKeyword] = useState<string>(defaults.keyword)
  const [owner, setOwner] = useState<string>(defaults.owner)
  const [sort, setSort] = useState<any>(defaults.sort)
  const [order, setOrder] = useState<GitHubEnumSortOrder>(defaults.order)
  const [page, setPage] = useState(defaults.page)
  const [per_page, setPerPage] = useState(defaults.per_page)
  const [visibility, setVisibility] = useState<GitHubEnumVisibility>(defaults.visibility)
  const [archived, setArchived] = useState<GitHubEnumArchived>(defaults.archived)
  const [total, setTotal] = useState<number>(0)
  const [params, setParams] = useState<GitHubSearchParams>(defaults)

  useEffect(() => {
    const vals = {
      keyword,
      owner,
      sort,
      order,
      per_page,
      page,
      visibility,
      archived
    }
    setParams(vals)
    if(typeof window !== 'undefined'){
      localStorage.setItem(GitHub.search.cacheKey, JSON.stringify(vals))
    }
  }, [keyword, owner, sort, order, per_page, page, visibility, archived])

  return (
    <GitHubSearchContext.Provider value={{
      keyword,
      owner,
      sort,
      order,
      page,
      per_page,
      visibility,
      archived,
      total,
      queryParams: params,
      setKeyword,
      setOwner,
      setSort,
      setOrder,
      setPage,
      setPerPage,
      setVisibility,
      setArchived,
      setTotal,
    }}
    >
      {children}
    </GitHubSearchContext.Provider>
  )
}

export function useGitHubSearchContext(): GitHubSearchContextProps {
  const context = useContext(GitHubSearchContext) as GitHubSearchContextProps | undefined

  if(!context){
    throw new Error(
      'useGitHubSearchContext must be used within GitHubSearchProvider'
    )
  }

  return context
}
