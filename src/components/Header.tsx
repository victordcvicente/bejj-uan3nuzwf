import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, LayoutDashboard, ShieldAlert, Cog, UserCog, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useStore } from '../store'
import logoUrl from '../assets/image-6d323.png'

export function Header() {
  const { cart, role } = useStore()
  const location = useLocation()
  const isAdminArea =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/production') ||
    location.pathname.startsWith('/professor')

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  if (isAdminArea) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="md:hidden">
              <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
            </Link>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-bold tracking-tight text-primary uppercase">
                Área Administrativa
              </span>
              <span className="text-xs text-muted-foreground uppercase font-medium tracking-widest">
                Gestão BEJJ
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <LogOut className="w-4 h-4 mr-2" /> Voltar ao Portal
              </Link>
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="BEJJ Logo" className="h-10 w-auto object-contain" />
          <span className="hidden sm:inline-block font-heading font-black text-xl tracking-tight mt-1">
            PORTAL BEJJ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/catalog"
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Catálogos
          </Link>
          <Link
            to="/tracking"
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Rastrear Pedido
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {role !== 'STUDENT' && (
            <div className="hidden sm:flex gap-2">
              {role === 'ADMIN' && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link to="/admin">
                    <ShieldAlert className="w-4 h-4 mr-2 text-primary" /> Admin
                  </Link>
                </Button>
              )}
              {(role === 'ADMIN' || role === 'PRODUCTION') && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link to="/production">
                    <Cog className="w-4 h-4 mr-2 text-primary" /> Produção
                  </Link>
                </Button>
              )}
              {(role === 'ADMIN' || role === 'PROFESSOR') && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link to="/professor">
                    <UserCog className="w-4 h-4 mr-2 text-primary" /> Professor
                  </Link>
                </Button>
              )}
            </div>
          )}

          <Button variant="ghost" size="icon" asChild className="relative ml-2">
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-background border-2 shadow-sm">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
