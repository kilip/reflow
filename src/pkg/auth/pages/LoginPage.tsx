import { ThemeLayout } from '@/pkg/ui/types'
import { UI } from '@/pkg/ui/ui'
import Login from '../components/Login'

export default async function LoginPage() {
  UI.layout = ThemeLayout.full
  return (
    <div className='flex h-screen items-center justify-center'>
      <Login/>
    </div>
  )
}