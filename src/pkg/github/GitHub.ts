import { GitHubEnumSortOrder } from './types';

export const GitHub = {
  search: {
    perPage: 6,
    sort: 'updated',
    order: GitHubEnumSortOrder.asc,
    cacheKey: 'github_search_params',
    queryKey: 'gitHubSearch'
  },
  fetch: {
    queryKey: 'gitHubFetch'
  }
}
