import classNames from 'classnames'
import { ToastType, Toast } from '../types'
import { useEffect, useRef, useState } from 'react'
import { useToastContext } from '../contexts/ToastContext'
import { MdClose } from 'react-icons/md'

function ToastElement({toast}: {toast: Toast}) {
  const { remove } = useToastContext()
  const [timerId, setTimerId] = useState<number|undefined>()

  useEffect(() => {
    if(!timerId){
      const id = setTimeout(() => {
        remove(toast)
      }, 5000, toast)
      setTimerId(id)
    }
    return () => clearTimeout(timerId)
  }, [timerId, toast, remove])

  return (
    <div
      key={toast.id}
      className={classNames({
        'relative alert': true,
        'alert-error': toast.type === ToastType.error,
        'alert-warning': toast.type === ToastType.warning,
        'alert-info': toast.type === ToastType.info,
        'alert-success': toast.type === ToastType.success,
      })}
    >
      <button
        className='
          absolute btn btn-ghost btn-square
          w-4 h-1 min-h-[1rem] top-1 right-1 p-0 m-0
          rounded-sm
        '
        onClick={() => remove(toast)}
      >
        <MdClose/>
      </button>
      <div className='flex items-center justify-center'>
        <p dangerouslySetInnerHTML={{ __html: toast.message }} />
      </div>
    </div>
  )
}

export default function ToastContainer({
  toasts
}:{
  toasts: Toast[]
}) {
  return (
    <div className='toast toast-end z-50 top-8'>
      {toasts.map((toast) => <ToastElement key={toast.id} toast={toast} /> )}
    </div>
  )
}
