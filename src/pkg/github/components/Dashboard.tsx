
import React from 'react'
import GitHubProvider from '../contexts/GitHubContext'
import SearchProvider from '../contexts/SearchContext'
import Search from './Search'
import Layout from '@/pkg/ui/components/Layout'

const Dashboard = () => {
  return (
    <Layout>
      <SearchProvider>
        <Search/>
      </SearchProvider>
    </Layout>
  )
}

export default Dashboard
