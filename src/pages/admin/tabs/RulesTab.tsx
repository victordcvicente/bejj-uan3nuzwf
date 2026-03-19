import { useState } from 'react'
import { useStore } from '@/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Edit, Trash, PlusCircle, ShieldAlert, Package } from 'lucide-react'

export function RulesTab() {
  const { teamProducts, teams, products, addTeamProduct, updateTeamProduct, deleteTeamProduct } =
    useStore()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    teamId: '',
    productId: '',
    price: 0,
    inStock: true,
    sizes: '',
    colors: '',
  })

  const handleEdit = (tp: any) => {
    setEditingId(tp.id)
    setForm({
      teamId: tp.teamId,
      productId: tp.productId,
      price: tp.price,
      inStock: tp.inStock,
      sizes: tp.sizes.join(', '),
      colors: tp.colors.join(', '),
    })
    setOpen(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setForm({ teamId: '', productId: '', price: 0, inStock: true, sizes: '', colors: '' })
    setOpen(true)
  }

  const handleSave = () => {
    const payload = {
      teamId: form.teamId,
      productId: form.productId,
      price: Number(form.price),
      inStock: form.inStock,
      sizes: form.sizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      colors: form.colors
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }

    if (editingId) {
      const existing = teamProducts.find((t) => t.id === editingId)
      updateTeamProduct(editingId, {
        ...payload,
        customizationFields: existing?.customizationFields || [],
      })
    } else {
      addTeamProduct({
        id: `tp-${Math.random().toString(36).substring(2, 9)}`,
        ...payload,
        customizationFields: [],
      })
    }
    setOpen(false)
  }

  return (
    <Card>
      <div className="p-4 bg-amber-50 border-b flex items-start justify-between gap-3 text-amber-800">
        <div className="flex gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            As regras comerciais definem o preço final e as opções de personalização de um produto
            global para uma equipe específica.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleNew} className="bg-white">
          <PlusCircle className="w-4 h-4 mr-2" /> Nova Regra
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipe</TableHead>
            <TableHead>Produto Base</TableHead>
            <TableHead>Preço Team</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamProducts.map((tp) => {
            const t = teams.find((x) => x.id === tp.teamId)
            const p = products.find((x) => x.id === tp.productId)
            return (
              <TableRow key={tp.id}>
                <TableCell className="font-medium">{t?.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    {p?.name}
                  </div>
                </TableCell>
                <TableCell className="font-bold">R$ {tp.price.toFixed(2)}</TableCell>
                <TableCell>
                  {tp.inStock ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
                  ) : (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(tp)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTeamProduct(tp.id)}
                    className="text-destructive"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar' : 'Nova'} Regra</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-2">
            <div className="grid gap-2">
              <Label>Equipe</Label>
              <Select value={form.teamId} onValueChange={(v) => setForm({ ...form, teamId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Produto Base</Label>
              <Select
                value={form.productId}
                onValueChange={(v) => setForm({ ...form, productId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Preço Especial (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Tamanhos Oferecidos (vírgula)</Label>
              <Input
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                placeholder="P, M, G"
              />
            </div>
            <div className="grid gap-2">
              <Label>Cores Oferecidas (vírgula)</Label>
              <Input
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                placeholder="Preto, Branco"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch
                checked={form.inStock}
                onCheckedChange={(c) => setForm({ ...form, inStock: c })}
              />
              <Label>Produto em estoque</Label>
            </div>
            <Button onClick={handleSave} className="mt-4">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
