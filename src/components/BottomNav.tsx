import { Link, useLocation } from 'react-router-dom'
import { Home, PackageSearch, User, Search } from 'lucide-react'
import { cn } from '../lib/utils'
import { useStore } from '../store'

export default function BottomNav() {
  const location = useLocation()
  const { teams } = useStore()

  const pathParts = location.pathname.split('/').filter(Boolean)
  const isManagement = ['admin', 'production', 'professor'].includes(pathParts[0])
  const teamSlug =
    !isManagement &&
    pathParts.length > 0 &&
    pathParts[0] !== 'checkout' &&
    pathParts[0] !== 'tracking'
      ? pathParts[0]
      : null
  const activeTeam = teamSlug ? teams.find((t) => t.slug === teamSlug) : null

  if (isManagement) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around px-4 z-50 pb-safe">
      <Link
        to="/"
        className={cn(
          'flex flex-col items-center gap-1 p-2',
          location.pathname === '/' ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        <Search className="h-5 w-5" />
        <span className="text-[10px] font-medium">Equipes</span>
      </Link>

      {activeTeam && (
        <Link
          to={`/${activeTeam.slug}`}
          className={cn(
            'flex flex-col items-center gap-1 p-2',
            location.pathname === `/${activeTeam.slug}` ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">Início</span>
        </Link>
      )}

      {activeTeam && (
        <Link
          to={`/${activeTeam.slug}/catalog`}
          className={cn(
            'flex flex-col items-center gap-1 p-2',
            location.pathname.includes('/catalog') ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <PackageSearch className="h-5 w-5" />
          <span className="text-[10px] font-medium">Catálogo</span>
        </Link>
      )}

      <Link
        to="/tracking"
        className={cn(
          'flex flex-col items-center gap-1 p-2',
          location.pathname.includes('/tracking') ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        <User className="h-5 w-5" />
        <span className="text-[10px] font-medium">Pedidos</span>
      </Link>
    </div>
  )
}
