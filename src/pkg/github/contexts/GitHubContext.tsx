'use client'

import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { GitHubContextProps, GitHubUser } from '../types'
import { useSession } from 'next-auth/react'
import { useThemeContext } from '@/pkg/ui/contexts/ThemeContext'
import Loading from '@/pkg/ui/components/Loading'

const GitHubContext = createContext<GitHubContextProps|undefined>(undefined)

export default function GitHubProvider({children}:PropsWithChildren<Record<string,unknown>>) {
  const { setLoading } = useThemeContext()
  const { data: session, status} = useSession()
  const profile = session?.profile as GitHubUser

  useEffect(() => {
    if(status=='loading'){
      setLoading(true)
    }else{
      setLoading(false)
    }
  }, [status, setLoading])

  return (
    <GitHubContext.Provider
      value={{
        profile,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export function useGitHubContext(): GitHubContextProps {
  const context = useContext(GitHubContext) as GitHubContextProps | undefined

  if(!context){
    throw Error(
      'useGitHubContext should be used within GitHubContextProvider'
    )
  }

  return context
}
