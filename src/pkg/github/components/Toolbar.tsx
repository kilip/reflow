'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { MdSearch} from 'react-icons/md'
import { useGitHubContext } from '../contexts/GitHubContext'
import Pagination from '@/pkg/ui/components/Pagination'

interface Props {
  loading: boolean
}

export default function Toolbar({loading}: Props) {
  const { total, page, setPage, per_page, setKeyword } = useSearchContext()
  const { profile } = useGitHubContext()
  const [numPage, setNumPage] = useState(1)
  const [keyword, setKeyWord] = useState('')

  useEffect(() => {
    setNumPage(Math.ceil(total/per_page))
  }, [total, setNumPage, per_page, numPage, page])

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      search()
    }
  }

  const search = () => {
    setKeyword(keyword)
    setPage(1)
  }

  const handleKeyWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyWord(value)
  }

  const onPageChanged = (page: number) => {
    setPage(page)
  }

  return (
    <div className='flex flex-col p-2 bg-white rounded-md drop-shadow-md gap-2'>
      <div className='flex items-center justify-start'>
        <div className='form-control'>
          <div className='input-group'>
            <input
              type='search'
              className='input input-sm input-bordered'
              onChange={handleKeyWordChange}
              onKeyDown={handleKeyDown}
              placeholder='type to search'
            />
            <button className='btn btn-square btn-sm' onClick={search}>
              <MdSearch className='w-4 h-4'/>
            </button>
          </div>
        </div>
      </div>

      <Pagination currentPage={page} total={total} onPageChanged={onPageChanged} perPage={per_page} loading={loading}/>
    </div>
  )
}
