'use client'

import { useSearchContext } from '../contexts/SearchContext';
import Repositories from './Repositories';
import Toolbar from './Toolbar';
import { useEffect } from 'react';
import { useSearchRepos } from '../hooks/search';
import { useThemeContext } from '@/pkg/ui/contexts/ThemeContext';

export default function Search() {
  const { setLoading } = useThemeContext()
  const { setTotal, repositories, setRepositories } = useSearchContext()
  const { data: response, isLoading, isError, error, isFetching } = useSearchRepos()

  useEffect(() => {
    if(response){
      setRepositories(response.data.items)
      setTotal(response.data.total_count)
    }
  }, [setRepositories, setTotal, response])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching, setLoading])

  if(isError){
    return (
      <div>
        {error.message}
      </div>
    )
  }

  return (
    <div className='flex flex-col min-w-full space-y-4'>
      <Toolbar loading={isLoading}/>
      <Repositories loading={isLoading} repositories={repositories}/>
    </div>
  )
}
