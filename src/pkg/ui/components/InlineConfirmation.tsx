import classNames from 'classnames'
import { PropsWithChildren, RefObject, useCallback } from 'react'

type Props<ArgsT> = {
  refId: RefObject<HTMLDivElement>
  title: string
  args: ArgsT
  style: string
  handler: (confirmation: boolean, args: ArgsT) => void
}&PropsWithChildren

export default function InlineConfirmation<ArgsT>({
  refId,
  title,
  children,
  handler,
  style,
  args
}: Props<ArgsT>) {

  const handleConfirmation = useCallback((confirmation: boolean) => {
    handler(confirmation, args)
  }, [handler, args])

  return (
    <div
      className={classNames({
        'absolute top-0 left-0 bg-white w-full h-full rounded-md': true,
        'flex flex-col gap-2 transition': true,
        'hidden': true,
      })}
      ref={refId}
    >
      <h1 className={`bg-${style} text-${style} ` + classNames({
        'p-2 rounded-t-md font-bold': true
      })}>
        {title}
      </h1>
      <div className='flex items-center justify-center'>
        {children}
      </div>
      <div className='flex flex-row items-center justify-center gap-4'>
        <button className={`btn btn-${style} btn-sm`} onClick={() => handleConfirmation(true)}>Yes</button>
        <button className='btn btn-success btn-sm' onClick={() => handleConfirmation(false)}>No</button>
      </div>
    </div>
  )
}
