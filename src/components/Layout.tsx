import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SidebarNav from './SidebarNav'
import BottomNav from './BottomNav'

export default function Layout() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const isManagement = ['admin', 'production', 'professor'].includes(pathParts[0])

  if (isManagement) {
    return (
      <div className="flex h-screen overflow-hidden bg-muted/20">
        <SidebarNav />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b bg-background flex items-center px-6 md:hidden">
            <span className="font-heading font-bold">PORTAL MGT</span>
          </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen relative pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
