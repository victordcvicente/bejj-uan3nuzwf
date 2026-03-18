import { useState } from 'react'
import { useStore } from '../../store'
import { Order } from '../../types'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'
import { Play, Check, Truck, AlertCircle } from 'lucide-react'

export default function ProductionDashboard() {
  const { orders, updateOrderStatus } = useStore()

  // Columns
  const pending = orders.filter((o) => o.productionStatus === 'PENDING')
  const inProduction = orders.filter((o) => o.productionStatus === 'PRODUCTION')
  const ready = orders.filter(
    (o) => o.productionStatus === 'SHIPPED' || o.productionStatus === 'DELIVERED',
  ) // Merging end states for simplify view

  const handleStatusChange = (id: string, newStatus: Order['productionStatus']) => {
    updateOrderStatus(id, newStatus)
  }

  const renderCard = (order: Order) => (
    <Card
      key={order.id}
      className="mb-3 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border-l-4 border-l-primary"
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold">{order.id}</CardTitle>
        <span className="text-xs text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm font-medium mb-2">{order.customerName}</p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="text-xs bg-muted p-2 rounded flex justify-between">
              <span className="truncate pr-2 font-semibold">
                {item.quantity}x {item.productName}
              </span>
              <span>
                {item.size} / {item.color}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2 border-t mt-2 pt-3 bg-muted/20">
        {order.productionStatus === 'PENDING' && (
          <Button
            size="sm"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => handleStatusChange(order.id, 'PRODUCTION')}
          >
            <Play className="w-4 h-4 mr-2" /> Iniciar
          </Button>
        )}
        {order.productionStatus === 'PRODUCTION' && (
          <Button
            size="sm"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleStatusChange(order.id, 'SHIPPED')}
          >
            <Check className="w-4 h-4 mr-2" /> Finalizar & Enviar
          </Button>
        )}
        {(order.productionStatus === 'SHIPPED' || order.productionStatus === 'DELIVERED') && (
          <Badge
            variant="outline"
            className="w-full justify-center bg-green-50 text-green-700 border-green-200"
          >
            <Truck className="w-4 h-4 mr-2" /> Finalizado
          </Badge>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black">Fila de Produção</h1>
        <p className="text-muted-foreground">Controle de manufatura e expedição estilo Kanban.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden pb-4">
        {/* PENDING */}
        <div className="flex flex-col bg-muted/30 rounded-xl border overflow-hidden">
          <div className="p-4 border-b bg-background flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" /> Aguardando Produção
            </h3>
            <Badge variant="secondary">{pending.length}</Badge>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            {pending.map(renderCard)}
            {pending.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-10">Fila vazia</p>
            )}
          </div>
        </div>

        {/* IN PRODUCTION */}
        <div className="flex flex-col bg-muted/30 rounded-xl border overflow-hidden">
          <div className="p-4 border-b bg-background flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <Hammer className="w-4 h-4 mr-2 text-orange-500" /> Em Produção
            </h3>
            <Badge variant="secondary">{inProduction.length}</Badge>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            {inProduction.map(renderCard)}
            {inProduction.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-10">Nenhum em andamento</p>
            )}
          </div>
        </div>

        {/* READY */}
        <div className="flex flex-col bg-muted/30 rounded-xl border overflow-hidden">
          <div className="p-4 border-b bg-background flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <Truck className="w-4 h-4 mr-2 text-blue-500" /> Expedição / Concluído
            </h3>
            <Badge variant="secondary">{ready.length}</Badge>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            {ready.map(renderCard)}
            {ready.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-10">
                Nenhum finalizado recente
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
