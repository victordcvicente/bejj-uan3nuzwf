import { useStore } from '../../store'
import { Order } from '../../types'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'
import { Play, Check, Truck, AlertCircle, RefreshCw, Hammer } from 'lucide-react'

export default function ProductionDashboard() {
  const { orders, updateOrderStatus } = useStore()

  // Columns
  const pending = orders.filter((o) => o.productionStatus === 'PENDING')
  const inProduction = orders.filter((o) => o.productionStatus === 'PRODUCTION')
  const ready = orders.filter(
    (o) => o.productionStatus === 'SHIPPED' || o.productionStatus === 'DELIVERED',
  )

  const handleStatusChange = (id: string, newStatus: Order['productionStatus']) => {
    updateOrderStatus(id, newStatus)
  }

  const renderCard = (order: Order) => (
    <Card
      key={order.id}
      className={`mb-3 transition-all cursor-default border-l-4 ${order.productionStatus === 'PRODUCTION' ? 'border-l-orange-500 shadow-md scale-[1.01]' : 'border-l-primary hover:shadow-sm'}`}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold text-foreground/80">{order.id}</CardTitle>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm font-bold mb-3">{order.customerName}</p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="text-xs bg-muted/50 p-2 rounded border flex flex-col gap-1"
            >
              <span className="font-semibold line-clamp-1">
                {item.quantity}x {item.productName}
              </span>
              <span className="text-muted-foreground">
                Tamanho: {item.size || '-'} | Cor: {item.color || '-'}
              </span>
              {Object.keys(item.customizations).length > 0 && (
                <div className="text-[10px] bg-background border px-1.5 py-0.5 rounded mt-1">
                  Pers: {Object.values(item.customizations).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2 border-t mt-2 pt-3 bg-muted/20">
        {order.productionStatus === 'PENDING' && (
          <Button
            size="sm"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
            onClick={() => handleStatusChange(order.id, 'PRODUCTION')}
          >
            <Play className="w-4 h-4 mr-2" /> Iniciar Produção
          </Button>
        )}
        {order.productionStatus === 'PRODUCTION' && (
          <Button
            size="sm"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm animate-pulse-once"
            onClick={() => handleStatusChange(order.id, 'SHIPPED')}
          >
            <Check className="w-4 h-4 mr-2" /> Finalizar & Enviar
          </Button>
        )}
        {(order.productionStatus === 'SHIPPED' || order.productionStatus === 'DELIVERED') && (
          <Badge
            variant="outline"
            className="w-full justify-center bg-green-50 text-green-700 border-green-200 py-1.5 text-xs"
          >
            <Truck className="w-4 h-4 mr-2" /> Expedido
          </Badge>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-black">Fila de Produção</h1>
          <p className="text-muted-foreground">Controle de manufatura e expedição em tempo real.</p>
        </div>
        <Badge variant="secondary" className="hidden sm:flex text-sm py-1 px-3">
          <RefreshCw className="w-3 h-3 mr-2 animate-spin-slow" /> Atualização em Tempo Real
        </Badge>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 overflow-hidden pb-4">
        {/* PENDING */}
        <div className="flex flex-col bg-muted/20 rounded-xl border shadow-inner overflow-hidden">
          <div className="p-4 border-b bg-background flex justify-between items-center shadow-sm z-10">
            <h3 className="font-bold flex items-center text-sm uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" /> Aguardando
            </h3>
            <Badge variant="secondary" className="font-mono">
              {pending.length}
            </Badge>
          </div>
          <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
            {pending.map(renderCard)}
            {pending.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <AlertCircle className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Fila vazia</p>
              </div>
            )}
          </div>
        </div>

        {/* IN PRODUCTION */}
        <div className="flex flex-col bg-orange-50/30 dark:bg-orange-950/10 rounded-xl border border-orange-100 dark:border-orange-900 overflow-hidden shadow-inner">
          <div className="p-4 border-b bg-background flex justify-between items-center shadow-sm z-10">
            <h3 className="font-bold flex items-center text-sm uppercase tracking-wider">
              <Hammer className="w-4 h-4 mr-2 text-orange-500" /> Em Produção
            </h3>
            <Badge variant="default" className="bg-orange-500 hover:bg-orange-500 font-mono">
              {inProduction.length}
            </Badge>
          </div>
          <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
            {inProduction.map(renderCard)}
            {inProduction.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Hammer className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Nenhum em andamento</p>
              </div>
            )}
          </div>
        </div>

        {/* READY */}
        <div className="flex flex-col bg-blue-50/30 dark:bg-blue-950/10 rounded-xl border border-blue-100 dark:border-blue-900 overflow-hidden shadow-inner">
          <div className="p-4 border-b bg-background flex justify-between items-center shadow-sm z-10">
            <h3 className="font-bold flex items-center text-sm uppercase tracking-wider">
              <Truck className="w-4 h-4 mr-2 text-blue-500" /> Expedição
            </h3>
            <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50 font-mono">
              {ready.length}
            </Badge>
          </div>
          <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
            {ready.map(renderCard)}
            {ready.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Truck className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Nenhum finalizado recente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
