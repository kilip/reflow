import classNames from 'classnames'

export default function LoadingOverlay({
  loading
}:{
  loading: boolean
}) {
  return (
    <div
      className={classNames({
        'hidden': !loading
      })}
    >
      <div className='flex fixed top-0 left-0 z-[99] w-full h-screen bg-slate-900 opacity-50'>
      </div>
      <div
        className='
          flex fixed top-0 left-0 z-[100] items-center justify-center w-full h-screen
        '
      >
        <div className='loading loading-spinner'>
        </div>
      </div>
    </div>
  )
}
