import { useStore } from '../../store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { TrendingUp, Users, DollarSign, Package } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function ProfessorDashboard() {
  const { orders } = useStore()

  // Simulating data specific for "Team Alpha" for the professor
  const teamOrders = orders.filter((o) => o.teamId === 't1')
  const totalSales = teamOrders.reduce((acc, o) => acc + o.total, 0)
  const totalItems = teamOrders.reduce(
    (acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0),
    0,
  )

  // Mock chart data
  const chartData = [
    { month: 'Jan', sales: 1200 },
    { month: 'Fev', sales: 2100 },
    { month: 'Mar', sales: 1800 },
    { month: 'Abr', sales: 2400 },
    { month: 'Mai', sales: Math.round(totalSales) || 3200 },
  ]

  const chartConfig = {
    sales: { label: 'Vendas (R$)', color: 'hsl(var(--accent))' },
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-primary">Painel do Professor</h1>
        <p className="text-muted-foreground">
          Alpha Jiu-Jitsu - Visão geral de vendas e comissionamento.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Vendas Totais"
          value={`R$ ${totalSales.toFixed(2)}`}
          icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
          trend="+12% que mês passado"
        />
        <MetricCard
          title="Pedidos"
          value={teamOrders.length}
          icon={<Package className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Peças Vendidas"
          value={totalItems}
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Alunos Ativos"
          value="45"
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
          trend="Base de dados fictícia"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Desempenho de Vendas</CardTitle>
            <CardDescription>Receita gerada pelos seus alunos nos últimos meses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    fontSize={12}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    fontSize={12}
                    tickFormatter={(val) => `R$${val}`}
                    className="fill-muted-foreground"
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="var(--color-sales)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimos Pedidos</CardTitle>
            <CardDescription>Compras recentes da equipe.</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Aluno</TableHead>
                  <TableHead className="text-right pr-6">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-6 font-medium">{order.customerName}</TableCell>
                    <TableCell className="text-right pr-6 text-primary font-bold">
                      R$ {order.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                {teamOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-4">
                      Nenhum pedido recente
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon, trend }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  )
}
