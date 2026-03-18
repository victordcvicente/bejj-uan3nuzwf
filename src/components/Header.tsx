import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, Package } from 'lucide-react'
import { useStore } from '../store'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { ScrollArea } from './ui/scroll-area'

export default function Header() {
  const { cart, teams } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

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

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-heading font-black text-xl flex items-center gap-2">
            {activeTeam ? (
              <img src={activeTeam.logo} alt={activeTeam.name} className="h-8 w-8 object-contain" />
            ) : (
              <span className="bg-primary text-primary-foreground p-1 rounded">BJJ</span>
            )}
            <span className="hidden sm:inline">
              {activeTeam ? activeTeam.name : 'LIFESTYLE CO.'}
            </span>
          </Link>
        </div>

        {!isManagement && (
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            {activeTeam && (
              <Link
                to={`/${activeTeam.slug}/catalog`}
                className="hover:text-accent transition-colors"
              >
                Catálogo
              </Link>
            )}
            <Link to="/tracking" className="hover:text-accent transition-colors">
              Rastreio
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {!isManagement && (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-none">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Seu Carrinho</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="flex-1 -mx-6 px-6 mt-4">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                        <Package className="h-10 w-10 mb-2 opacity-20" />
                        <p>Carrinho vazio</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 border-b pb-4">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="h-20 w-20 object-cover rounded-md bg-muted"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.productName}</h4>
                              <p className="text-xs text-muted-foreground">{item.teamName}</p>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.size} | {item.color}
                                {Object.entries(item.customizations).map(([k, v]) => (
                                  <span key={k} className="block mt-0.5">
                                    + {k}: {v}
                                  </span>
                                ))}
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-medium">R$ {item.price.toFixed(2)}</span>
                                <span className="text-xs">Qtd: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  <div className="pt-6 border-t mt-auto">
                    <div className="flex justify-between font-bold mb-4">
                      <span>Total</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full h-12 text-lg font-heading"
                      disabled={cart.length === 0}
                      onClick={() => navigate('/checkout')}
                    >
                      Finalizar Compra
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
