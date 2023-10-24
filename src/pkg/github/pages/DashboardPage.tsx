import { GitHubSearchProvider } from '../context/SearchContext';
import Search from '../views/Search';

export default async function DashboardPage() {
  return (
    <GitHubSearchProvider>
      <Search/>
    </GitHubSearchProvider>
  )
}
