'use client'

import { createContext, useContext, useReducer, useState } from 'react'
import { ThemeAction, ThemeActionType, ThemeContextProps, ThemeState, ToastState } from '../types'
import { PropsWithChildren } from 'react'
import ToastProvider from './ToastContext'
import Layout from '../components/Layout'
import AuthProvider from '@/pkg/auth/context/AuthContext'
import ReactQueryProvider from './ReactQueryContext'
import LoadingOverlay from '../components/LoadingOverlay'

function themeReducer(state: ThemeState, action: ThemeAction){
  const {type, payload} = action

  switch(type){
    case ThemeActionType.Loading:
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error('Unknown theme action type: '+type)
  }
}

const ThemeContext = createContext<ThemeContextProps|undefined>(undefined)
export default function ThemeProvider({children}: PropsWithChildren) {
  const [loading, setLoading] = useState(false)
  return (
    <ThemeContext.Provider value={{
      loading,
      setLoading
    }}>
      <Layout>
        {children}
      </Layout>
      <LoadingOverlay loading={loading}/>
    </ThemeContext.Provider>
  )
}

export function useThemeContext(): ThemeContextProps {
  const context = useContext(ThemeContext) as ThemeContextProps | undefined

  if(!context){
    throw Error(
      'useThemeContext should be used within ThemeProvider'
    )
  }

  return context
}

