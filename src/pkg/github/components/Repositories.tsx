'use client'

import Loading from '@/pkg/ui/components/Loading'
import { GitHubSearchItems } from '../types'
import { MdDelete, MdLock, MdPublic } from 'react-icons/md'
import classNames from 'classnames'

interface Props {
  repositories: GitHubSearchItems,
  loading: boolean
}

export default function Repositories({repositories, loading}: Props) {
  if(loading){
    return (<Loading/>)
  }

  return (
    <div className='flex flex-wrap gap-4 items-center justify-center'>
      {repositories.map((repo,index) =>
        <div key={index} className='flex lg:w-1/3 w-full bg-white p-2 rounded-md drop-shadow-md'>
          <div className='flex flex-col w-full space-y-2'>
            <div className='flex items-center gap-2'>
              <div className='font-bold'>
                {repo.name}
              </div>
              <div>
                <div
                  className={classNames({
                    'badge badge-sm items-center justify-center gap-1': true,
                    'badge-warning': repo.visibility == 'private',
                    'badge-info': repo.visibility == 'public',
                  })}
                >
                  { repo.visibility == 'private' ? <MdLock className='w-2 h-2'/> : <MdPublic  className='w-2 h-2'/>}
                  <span>{repo.visibility}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <button className='btn btn-xs btn-error'>
                <MdDelete/>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
