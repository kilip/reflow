'use client'

import { GitHubSearchItems } from '../types'
import { MdDelete, MdLock, MdPublic, MdSettings } from 'react-icons/md'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import deleteRepo from '../hooks/delete'
import { useQueryClient } from '@tanstack/react-query'
import { useToastContext } from '@/pkg/ui/contexts/ToastContext'
import dayjs from 'dayjs'
import { useThemeContext } from '@/pkg/ui/contexts/ThemeContext'

interface Props {
  repositories: GitHubSearchItems,
  loading: boolean
}

const DeleteConfirm = ({
  repoToDelete,
  handleConfirm
}:{
  repoToDelete: string,
  handleConfirm: (confirmed: boolean) => void
}) => {
  return (
    <dialog id="delete_confirm" className="modal">
      <div className="flex flex-col modal-box">
        <div>
          <h3 className="font-bold text-lg">Delete {repoToDelete}</h3>
        </div>
        <div>
          <p className="py-4">
            Are you sure want to delete <span className='font-bold'>{repoToDelete}</span> repository?
          </p>
        </div>
        <div className="modal-action items-center justify-center">
          <form method="dialog" className='flex items-center justify-center space-x-2'>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => handleConfirm(true)}>Yes</button>
            <button className="btn" onClick={() => handleConfirm(false)}>No</button>
          </form>
      </div>
      </div>
    </dialog>
  )
}

export default function Repositories({repositories}: Props) {
  const { setLoading: themeLoading } = useThemeContext()
  const [repoToDelete, setRepoToDelete] = useState('')
  const [loading, setLoading] = useState(false)
  const qc = useQueryClient()
  const { success } = useToastContext()

  useEffect(() => {
    themeLoading(loading)
  }, [loading, themeLoading])

  const confirmDelete = (repo: string) => {
    setRepoToDelete(repo)
    const el: any = document.getElementById('delete_confirm')
    el?.showModal()
  }

  const handleDeleteConfirmed = async (confirmed: boolean) => {
    if(confirmed){
      setLoading(true)
      await deleteRepo(repoToDelete)
      qc.invalidateQueries({
        queryKey: ['gitHubSearch']
      })
      success('Repository <strong>'+repoToDelete+'</strong> deleted!')
      setLoading(false)
    }
    setRepoToDelete('')
  }

  return (
    <>
      <div className='flex flex-wrap gap-4 items-baseline justify-center'>
        {repositories.map((repo,index) =>
          <div
            key={index}
            className='flex flex-col lg:w-1/3 w-full bg-white p-2 rounded-md drop-shadow-md gap-2'
          >
            {/* header */}
            <div
              className='flex items-center gap-2'
            >
              <div className='text-xl font-bold'>
                <a
                  target='_blank'
                  href={repo.html_url}
                  className='
                    hover:text-blue-700 hover:underline
                  '
                >
                  {repo.name}
                </a>
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

            {/* description */}
            <div>
              <p>{repo.description}</p>
              <div className='flex gap-2'>
                <span className='badge badge-sm badge-outline'>
                  forks {repo.forks_count}
                </span>
                <span className='badge badge-sm badge-outline'>
                  updated {dayjs(repo.pushed_at).format('DD-MM-YYYY')}
                </span>
              </div>
            </div>

            {/* action bar */}
            <div className='flex items-center gap-2'>
              <div className='tooltip tooltip-top tooltip-warning' data-tip='GitHub Settings'>
                <a
                  href={repo.html_url + '/settings'}
                  target='_blank'
                  className='btn btn-xs btn-success'
                  data-tip='Go to settings'
                >
                  <MdSettings className='w-4 h-4'/>
                </a>
              </div>
              <div className='tooltip tooltip-top tooltip-warning text-sm' data-tip={'delete this repository'}>
                <button
                  className='btn btn-xs btn-error'
                  onClick={() => confirmDelete(repo.full_name)}
                >
                  <MdDelete className='w-4 h-4'/>
                </button>
                </div>
            </div>
          </div>
        )}
      </div>
      <DeleteConfirm repoToDelete={repoToDelete} handleConfirm={handleDeleteConfirmed}/>
    </>
  )
}
