import { PropsWithChildren } from 'react'
import { UI } from '../ui'
import { ThemeLayout } from '../types'
import LayoutDefault from './LayoutDefault'
import LayoutFull from './LayoutFull'
export default function Layout({children}: PropsWithChildren) {

  if(UI.layout == ThemeLayout.full){
    return (
      <LayoutFull>
        {children}
      </LayoutFull>
    )
  }

  return (
    <LayoutDefault>
      {children}
    </LayoutDefault>
  )
}