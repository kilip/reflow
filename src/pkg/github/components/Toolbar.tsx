'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { useQueryClient } from '@tanstack/react-query'
import { MdNavigateBefore, MdFirstPage, MdNavigateNext, MdLastPage, MdSearch} from 'react-icons/md'
import { useGitHubContext } from '../contexts/GitHubContext'

interface Props {
  loading: boolean
}

export default function Toolbar({loading}: Props) {
  const { total, page, setPage, per_page, setQ } = useSearchContext()
  const { profile } = useGitHubContext()
  const [numPage, setNumPage] = useState(1)
  const [keyword, setKeyWord] = useState('')

  const client = useQueryClient()

  useEffect(() => {
    setNumPage(Math.ceil(total/per_page))
  }, [total, setNumPage, per_page])

  const moveNext = () => {
    setPage(page + 1)
  }

  const movePrevious = () => {
    setPage(page-1)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      search()
    }
  }

  const search = () => {
    const queries = []
    if(keyword.length > 0){
      queries.push(keyword)
    }
    queries.push('user:'+profile.login)
    setQ(queries.join(' '))
    setPage(1)
  }

  const handleKeyWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyWord(value)
    if(value.length === 0){
      search()
    }
  }

  return (
    <div className='flex p-2 bg-white rounded-md drop-shadow-md space-x-2'>
      <div className='form-control'>
        <div className='input-group'>
          <input
            type='search'
            className='input input-xs input-bordered'
            onChange={handleKeyWordChange}
            onKeyDown={handleKeyDown}
          />
          <button className='btn btn-square btn-xs' onClick={search}>
            <MdSearch className='w-4 h-4'/>
          </button>
        </div>
      </div>
      <div className='join grid grid-cols-2'>
        <button
          className='join-item btn btn-xs btn-outline disabled'
          onClick={()=>movePrevious()}
          disabled={page==1 || loading }
        >
          <MdNavigateBefore className='w-4 h-4'/>
        </button>
        <button
          className='join-item btn btn-xs btn-outline'
          onClick={()=>moveNext()}
          disabled={page==numPage || loading }
        >
          <MdNavigateNext className='w-4 h-4'/>
        </button>
      </div>
    </div>
  )
}
