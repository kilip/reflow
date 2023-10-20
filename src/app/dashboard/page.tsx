import Logout from '@/pkg/auth/components/Logout';
import { ThemeLayout } from '@/pkg/ui/types';
import { UI } from '@/pkg/ui/ui';

export default async function DashboardPage() {
  UI.layout = ThemeLayout.default
  return (
    <div>
      <h1>Homepage</h1>
      <Logout/>
    </div>
  )
}
