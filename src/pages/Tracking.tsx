import { useState } from 'react'
import { useStore } from '../store'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Search, Package, CreditCard, Hammer, Truck, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Tracking() {
  const { orders } = useStore()
  const [searchId, setSearchId] = useState('')
  const [activeOrder, setActiveOrder] = useState(orders[0] || null)

  const handleSearch = () => {
    const found = orders.find((o) => o.id.toLowerCase() === searchId.toLowerCase())
    if (found) setActiveOrder(found)
  }

  const getStatusStep = (status: string) => {
    if (status === 'PENDING') return 1
    if (status === 'PRODUCTION') return 2
    if (status === 'SHIPPED') return 3
    if (status === 'DELIVERED') return 4
    return 0
  }

  const step = getStatusStep(activeOrder?.productionStatus || 'PENDING')

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-heading font-black mb-4 uppercase">
          Rastrear Pedido
        </h1>
        <div className="flex max-w-md mx-auto gap-2">
          <Input
            placeholder="Nº do Pedido (Ex: BEJJ-0001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="h-12"
          />
          <Button className="h-12 px-8" onClick={handleSearch}>
            <Search className="w-5 h-5 mr-2" /> Buscar
          </Button>
        </div>
      </div>

      {activeOrder ? (
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6 md:p-10">
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pedido</p>
                  <p className="font-heading font-bold text-2xl">{activeOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">
                    {new Date(activeOrder.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="relative flex justify-between mb-12">
                <div className="absolute top-1/2 left-4 right-4 h-1 bg-muted -z-10 -translate-y-1/2"></div>
                <div
                  className={`absolute top-1/2 left-4 h-1 -z-10 -translate-y-1/2 transition-all duration-500 bg-primary`}
                  style={{ width: `${(step - 1) * 33.3}%` }}
                ></div>

                <StatusNode
                  icon={<CreditCard />}
                  label="Pagamento"
                  active={true}
                  done={activeOrder.paymentStatus === 'PAID'}
                />
                <StatusNode
                  icon={<Hammer />}
                  label="Produção"
                  active={step >= 2}
                  done={step > 2}
                  pulse={step === 2}
                />
                <StatusNode
                  icon={<Truck />}
                  label="Envio"
                  active={step >= 3}
                  done={step > 3}
                  pulse={step === 3}
                />
                <StatusNode
                  icon={<CheckCircle2 />}
                  label="Entregue"
                  active={step === 4}
                  done={step === 4}
                />
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Itens do Pedido
                </h3>
                <div className="space-y-4">
                  {activeOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-background p-3 rounded-md border"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded bg-muted"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {[
                            item.size && `Tam: ${item.size}`,
                            item.color && `Cor: ${item.color}`,
                            item.model && `Mod: ${item.model}`,
                          ]
                            .filter(Boolean)
                            .join(' | ')}
                        </p>
                        {Object.keys(item.customizations).length > 0 && (
                          <Badge variant="secondary" className="mt-1 text-[10px]">
                            Personalizado
                          </Badge>
                        )}
                      </div>
                      <div className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
          Digite o número do seu pedido acima para acompanhar o status de fabricação e entrega.
        </div>
      )}
    </div>
  )
}

function StatusNode({ icon, label, active, done, pulse }: any) {
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 transition-colors ${done ? 'bg-primary border-primary text-primary-foreground' : active ? 'bg-background border-primary text-primary' : 'bg-background border-muted text-muted-foreground'} ${pulse ? 'animate-pulse' : ''}`}
      >
        {done ? <CheckCircle2 className="w-5 h-5" /> : icon}
      </div>
      <span
        className={`text-xs md:text-sm font-bold absolute -bottom-6 whitespace-nowrap ${active ? 'text-foreground' : 'text-muted-foreground'}`}
      >
        {label}
      </span>
    </div>
  )
}
