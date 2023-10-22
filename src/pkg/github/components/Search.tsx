'use client'

import { useSearchContext } from '../contexts/SearchContext';
import { GitHubSearchItems } from '../types';
import Repositories from './Repositories';
import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { useSearchRepos } from '../hooks/search';

export default function Search() {
  const { setTotal, repositories, setRepositories } = useSearchContext()
  const { response, isLoading } = useSearchRepos()

  useEffect(() => {
    if(response){
      setRepositories(response.data.items)
      setTotal(response.data.total_count)
    }
  }, [setRepositories, setTotal, response])

  return (
    <div className='flex flex-col min-w-full space-y-4'>
      <Toolbar loading={isLoading}/>
      <Repositories loading={isLoading} repositories={repositories}/>
    </div>
  )
}
