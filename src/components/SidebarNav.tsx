import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Package, Settings, ClipboardList, Activity } from 'lucide-react'
import { cn } from '../lib/utils'

export default function SidebarNav() {
  const location = useLocation()

  const getNavItems = () => {
    if (location.pathname.startsWith('/admin')) {
      return [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Equipes', path: '/admin/teams', icon: Users },
        { name: 'Produtos', path: '/admin/products', icon: Package },
        { name: 'Configurações', path: '/admin/settings', icon: Settings },
      ]
    }
    if (location.pathname.startsWith('/production')) {
      return [{ name: 'Fila de Produção', path: '/production', icon: ClipboardList }]
    }
    if (location.pathname.startsWith('/professor')) {
      return [
        { name: 'Visão Geral', path: '/professor', icon: Activity },
        { name: 'Meus Alunos', path: '/professor/students', icon: Users },
      ]
    }
    return []
  }

  const items = getNavItems()
  const role = location.pathname.split('/')[1].toUpperCase()

  return (
    <aside className="w-64 border-r bg-background flex-shrink-0 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b font-heading font-black">
        PORTAL {role}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              location.pathname === item.path
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground',
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          &larr; Voltar ao site
        </Link>
      </div>
    </aside>
  )
}
