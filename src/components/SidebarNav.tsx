import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LayoutDashboard, ShoppingBag, Users, Settings, Package, Truck, LogOut } from 'lucide-react'
import logoUrl from '@/assets/image-6d323.png'

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Equipes / Academias', href: '/admin/teams', icon: Users },
  { name: 'Catálogo', href: '/admin/catalog', icon: Package },
  { name: 'Produção', href: '/production', icon: Truck },
]

export function SidebarNav() {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col border-r bg-card">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src={logoUrl} alt="BEJJ Logo" className="h-8 w-auto rounded-sm object-contain" />
          <span className="font-bold text-lg tracking-tight">PORTAL BEJJ</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium gap-1">
          {adminLinks.map((link) => {
            const Icon = link.icon
            const isActive =
              location.pathname === link.href || location.pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted',
                  isActive ? 'bg-secondary text-foreground font-medium' : '',
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-primary' : '')} />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 mt-auto">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Sair do Painel
        </Link>
      </div>
    </div>
  )
}
