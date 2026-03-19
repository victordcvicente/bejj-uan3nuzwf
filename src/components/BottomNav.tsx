import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, PackageSearch, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const location = useLocation()

  const navItems = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Catálogo', href: '/catalog', icon: PackageSearch },
    { name: 'Pedidos', href: '/tracking', icon: ShoppingBag },
    { name: 'Admin', href: '/admin', icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            location.pathname === item.href ||
            (item.href !== '/' && location.pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground transition-colors hover:text-foreground',
                isActive && 'text-primary hover:text-primary',
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'fill-primary/20')} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
