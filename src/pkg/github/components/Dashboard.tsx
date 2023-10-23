
import React from 'react'
import GitHubProvider from '../contexts/GitHubContext'
import SearchProvider from '../contexts/SearchContext'
import Search from './Search'

const Dashboard = () => {
  return (
    <GitHubProvider>
      <SearchProvider>
        <Search/>
      </SearchProvider>
    </GitHubProvider>
  )
}

export default Dashboard
