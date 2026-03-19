import { Link, useLocation } from 'react-router-dom'
import { ShieldAlert, Cog, UserCog } from 'lucide-react'
import { useStore } from '@/store'
import { cn } from '@/lib/utils'
import logoUrl from '../assets/image-6d323.png'

export function SidebarNav() {
  const location = useLocation()
  const { role } = useStore()

  const links = [
    {
      to: '/admin',
      label: 'Administração',
      icon: <ShieldAlert className="w-5 h-5 mr-3" />,
      roles: ['ADMIN'],
    },
    {
      to: '/production',
      label: 'Fila de Produção',
      icon: <Cog className="w-5 h-5 mr-3" />,
      roles: ['ADMIN', 'PRODUCTION'],
    },
    {
      to: '/professor',
      label: 'Painel do Professor',
      icon: <UserCog className="w-5 h-5 mr-3" />,
      roles: ['ADMIN', 'PROFESSOR'],
    },
  ]

  const visibleLinks = links.filter((link) => link.roles.includes(role))

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-2 px-4">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                location.pathname.startsWith(link.to)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
