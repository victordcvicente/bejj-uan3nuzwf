import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { SidebarNav } from './SidebarNav'
import { BottomNav } from './BottomNav'
import { useAuth } from '@/hooks/use-auth'

export function Layout() {
  const location = useLocation()
  const { user } = useAuth()

  const role = user?.role || 'GUEST'

  const isAdminPath = location.pathname.startsWith('/admin')
  const isProductionPath = location.pathname.startsWith('/production')
  const isProfessorPath = location.pathname.startsWith('/professor')

  const isAdminArea = isAdminPath || isProductionPath || isProfessorPath

  if (isAdminPath && role !== 'ADMIN') return <Navigate to="/login" replace />
  if (isProductionPath && role !== 'ADMIN' && role !== 'PRODUCTION')
    return <Navigate to="/login" replace />
  if (isProfessorPath && role !== 'ADMIN' && role !== 'PROFESSOR')
    return <Navigate to="/login" replace />

  if (isAdminArea) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <aside className="hidden w-64 md:flex flex-col flex-shrink-0 border-r">
          <SidebarNav />
        </aside>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
