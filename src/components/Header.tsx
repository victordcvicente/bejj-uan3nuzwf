import { Link } from 'react-router-dom'
import { Menu, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import logoUrl from '@/assets/image-6d323.png'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-3 mb-6">
                  <img
                    src={logoUrl}
                    alt="BEJJ Logo"
                    className="h-8 w-auto rounded-sm object-contain"
                  />
                  <span className="font-bold text-lg tracking-tight">PORTAL BEJJ</span>
                </Link>
                <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Início
                </Link>
                <Link
                  to="/catalog"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Catálogo
                </Link>
                <Link
                  to="/tracking"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Meus Pedidos
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img src={logoUrl} alt="BEJJ Logo" className="h-9 w-auto rounded-sm object-contain" />
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
              PORTAL BEJJ
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary">
            Início
          </Link>
          <Link to="/catalog" className="transition-colors hover:text-primary">
            Catálogo
          </Link>
          <Link to="/tracking" className="transition-colors hover:text-primary">
            Meus Pedidos
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link to="/admin">
              <User className="h-5 w-5" />
              <span className="sr-only">Painel Admin</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]">
                0
              </Badge>
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
