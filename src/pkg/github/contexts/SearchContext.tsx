'use client'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { GitHubSearchContextProps, GitHubSearchItems, GitHubSearchParams } from '../types';
import { useGitHubContext } from './GitHubContext';

const SearchContext = createContext<GitHubSearchContextProps|undefined>(undefined)

export default function SearchProvider({children}: PropsWithChildren) {
  const test = window.localStorage.getItem('gitHubSearchContext')
  let existing = undefined
  if(test){
    existing = JSON.parse(test)
  }

  const { profile } = useGitHubContext()

  const [sort, setSort] = useState(existing? existing.sort : 'name')
  const [order, setOrder] = useState(existing ? existing.order : 'asc')
  const [per_page, setPerPage] = useState(existing ? existing.per_page : 6)
  const [page, setPage] = useState(existing ? existing.page : 1)
  const [keyword, setKeyword] = useState(existing ? existing.keyword : '')
  const [owner, setOwner] = useState(existing ? existing.owner : 'user:'+profile.login)
  const [total, setTotal] = useState(0)
  const [repositories, setRepositories] = useState<GitHubSearchItems>([])
  const [initialized, setInitialized] = useState(false)


  const getSearchParams = (): GitHubSearchParams => {
    const keywords = []
    if(keyword != ''){
      keywords.push(keyword)
    }
    keywords.push(owner)
    const params =  {
      q: keywords.join(' '),
      per_page,
      page
    }

    if(sort) Object.assign(params, { sort })
    if(order) Object.assign(params, {order})

    return params
  }

  useEffect(() => {
    window.localStorage.setItem('gitHubSearchContext', JSON.stringify({
      keyword,
      owner,
      sort,
      order,
      per_page,
      page
    }))
  }, [keyword, owner,sort,order, per_page,page])

  return (
    <SearchContext.Provider
      value={{
        sort,
        order,
        per_page,
        page,
        setSort,
        setOrder,
        setPerPage,
        setPage,
        getSearchParams,
        total,
        setTotal,
        repositories,
        setRepositories,
        initialized,
        setInitialized,
        keyword,
        setKeyword,
        owner,
        setOwner
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext(): GitHubSearchContextProps {
  const context = useContext(SearchContext) as GitHubSearchContextProps | undefined

  if(!context){
    throw Error(
      'useSearchContext should be used within SearchProvider'
    )
  }

  return context
}
