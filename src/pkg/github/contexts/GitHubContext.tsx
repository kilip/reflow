'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { GitHubContextProps, GitHubSearchParams, GitHubUser } from '../types'
import { useSession } from 'next-auth/react'
import Loading from '@/pkg/ui/components/Loading'

const GitHubContext = createContext<GitHubContextProps>(undefined)

export default function GitHubProvider({children}:PropsWithChildren<Record<string,unknown>>) {
  const { data: session, status} = useSession()
  const profile = session?.profile as GitHubUser

  if(status == 'loading'){
    return (<Loading/>)
  }

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
