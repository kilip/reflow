'use client'
import { Button } from 'react-daisyui'
import { MdArchive, MdDeleteForever } from 'react-icons/md'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import InlineConfirmation from '@/pkg/ui/components/InlineConfirmation'
import { invalidateQueries, patch, remove } from '../../utils/service'
import { useQueryClient } from '@tanstack/react-query'
import { GitHub } from '../../GitHub'
import { useToastContext } from '@/pkg/ui/contexts/ToastContext'
import { GitHubSearchItem } from '../../types'
import { useGitHubSearchContext } from '../../context/SearchContext'

type Props = {
  repo: GitHubSearchItem
}

enum ConfirmTypeEnum {
  archive = 'archive',
  delete = 'delete'
}

type ConfirmArgs = {
  type: ConfirmTypeEnum
}

export default function RepoCard({
  repo,
}: Props) {

  const deleteRef = useRef<HTMLDivElement>(null)
  const archiveRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const { success, error } = useToastContext()
  const { queryParams } = useGitHubSearchContext()
  const qc = useQueryClient()

  const showConfirm = (type: ConfirmTypeEnum) => {
    const ref = ConfirmTypeEnum.delete == type ? deleteRef:archiveRef
    ref.current?.classList.remove('hidden')
    const timeout =  setTimeout(() => {
      ref.current?.classList.add('hidden')
    }, 10000)

    setTimeoutId(timeout)
  }

  const handleConfirmation = async(confirmed: boolean, args: ConfirmArgs ) => {
    const {type} = args
    const ref = ConfirmTypeEnum.delete == args.type ? deleteRef:archiveRef
    clearTimeout(timeoutId)

    if(ConfirmTypeEnum.delete === type && confirmed){
      setLoading(true)
      try{
        await remove(repo.full_name)
        success(`Repository ${repo.full_name} deleted successfully!`)
        await qc.invalidateQueries({
          queryKey: [GitHub.search.queryKey]
        })
      }catch(e: any){
        console.log(e.message)
        error(e.message)
      }
      setLoading(false)
    }
    else if(ConfirmTypeEnum.archive === type && confirmed){
      setLoading(true)
      try{
        await patch({
          owner: repo.owner?.login as string,
          repo: repo.name,
          archived: !repo.archived
        })
        await qc.invalidateQueries({
          queryKey: [GitHub.search.queryKey, { params: queryParams}]
        })
        success(`Repository <strong>${repo.full_name}</strong> ${!repo.archived ? 'archived':'unarchived'} successfully!`)
      }catch(e: any){
        error(e.message)
      }

      setLoading(false)
    }
    ref.current?.classList.add('hidden')
  }

  return (
    <div
      className='
        relative flex flex-col bg-white drop-shadow-lg
        rounded-md w-full lg:w-5/12 transition duration-300
        min-h-[10rem]
      '
    >

      {/* header */}
      <div className='flex p-2 items-center gap-2'>
        <a
          href={repo.html_url}
          target='_blank'
          className='
            hover:text-green-700
          '
        >
          <span className='text-xl font-bold'>{repo.full_name}</span>
        </a>

        <div
          className={classNames({
            'badge badge-warning badge-md': true,
            'hidden': !repo.archived
          })}
        >
          archived
        </div>
      </div>
      <hr/>

      {/* description */}
      <div className='flex flex-grow items-center p-2'>
        <p className='font-sans'>{repo.description}</p>
      </div>

      {/* action */}
      <div className='flex space-x-2 p-2'>
        <Button
          onClick={() => showConfirm(ConfirmTypeEnum.archive)}
          className='btn-warning hover:rotate-45 hover:text-blue-600'
          shape='circle'
          size='sm'
          color='warning'
        >
          <MdArchive className='w-5 h-5'/>
        </Button>
        <Button
          onClick={() => showConfirm(ConfirmTypeEnum.delete)}
          className='btn-error hover:rotate-45 hover:text-red-800'
          shape='circle'
          size='sm'
          color='error'
        >
          <MdDeleteForever className='w-5 h-5'/>
        </Button>
      </div>

      {/* archive confirmation */}
      <InlineConfirmation<ConfirmArgs>
        refId={archiveRef}
        title={`${repo.archived ? 'Unarchiving' : 'Archiving'} confirmation`}
        handler={handleConfirmation}
        args={{ type: ConfirmTypeEnum.archive }}
        style='warning'
      >
        <p className='text-center'>
          Are you sure want to <strong>{repo.archived ? 'unarchiving':'archiving'}</strong> this repository ?<br/>
          <strong className='text-red-600'>{repo.full_name}</strong>
        </p>
      </InlineConfirmation>
      <InlineConfirmation<ConfirmArgs>
        refId={deleteRef}
        title='Delete confirmation'
        handler={handleConfirmation}
        args={{ type: ConfirmTypeEnum.delete }}
        style='error'
      >
        <p className='text-center'>
          Are you sure want to <strong>delete</strong> this repository ?<br/>
          <strong className='text-red-600'>{repo.full_name}</strong>
        </p>
      </InlineConfirmation>
      <div
        className={classNames({
          'flex absolute top-0 bottom-0 w-full h-full rounded-md bg-slate-950 opacity-50': true,
          'hidden': !loading
        })}>
      </div>
      <div
        className={classNames({
          'flex absolute items-center justify-center w-full h-full': true,
          'hidden': !loading
        })}
      >
        <span className='loading loading-bars loading-lg'></span>
      </div>
    </div>
  )
}
