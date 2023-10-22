'use client'
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { GitHubSearchContextProps, GitHubSearchItems, GitHubSearchParams } from '../types';
import { useGitHubContext } from './GitHubContext';

const SearchContext = createContext<GitHubSearchContextProps|undefined>(undefined)

export default function SearchProvider({children}: PropsWithChildren) {
  const { profile } = useGitHubContext()
  const [q, setQ] = useState('user:'+profile.login)
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('asc')
  const [per_page, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [repositories, setRepositories] = useState<GitHubSearchItems>([])

  const getSearchParams = (): GitHubSearchParams => {
    const params =  {
      q,
      per_page,
      page
    }

    if(sort) Object.assign(params, { sort })
    if(order) Object.assign(params, {order})

    return params
  }
  return (
    <SearchContext.Provider
      value={{
        q,
        sort,
        order,
        per_page,
        page,
        setQ,
        setSort,
        setOrder,
        setPerPage,
        setPage,
        getSearchParams,
        total,
        setTotal,
        repositories,
        setRepositories
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
