import search from '@/pkg/github/api/search'
import deleteRepo from '@/pkg/github/api/delete'
import { patch } from '@/pkg/github/api/patch'
export {
  search as GET,
  deleteRepo as DELETE,
  patch as PATCH
}
