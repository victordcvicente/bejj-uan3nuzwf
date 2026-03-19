import { Link, useLocation } from 'react-router-dom'
import { Home, ShieldAlert, Search, ShoppingBag } from 'lucide-react'
import { useStore } from '@/store'

export function BottomNav() {
  const location = useLocation()
  const { role } = useStore()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border pb-safe">
      <nav className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Início</span>
        </Link>

        <Link
          to="/catalog"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/catalog') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Equipes</span>
        </Link>

        <Link
          to="/tracking"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/tracking') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Pedidos</span>
        </Link>

        {role === 'ADMIN' && (
          <Link
            to="/admin"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              location.pathname.startsWith('/admin')
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Admin</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
