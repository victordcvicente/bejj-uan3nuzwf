import { useState } from 'react'
import { useStore } from '@/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Edit, Trash, PlusCircle } from 'lucide-react'

export function CatalogTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', category: '', description: '', images: '' })

  const handleEdit = (p: any) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      category: p.category,
      description: p.description,
      images: p.images.join(', '),
    })
    setOpen(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setForm({ name: '', category: '', description: '', images: '' })
    setOpen(true)
  }

  const handleSave = () => {
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      images: form.images
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }
    if (editingId) updateProduct(editingId, payload)
    else addProduct({ id: `p-${Math.random().toString(36).substring(2, 9)}`, ...payload })
    setOpen(false)
  }

  return (
    <Card>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Catálogo Base</h2>
        <Button onClick={handleNew}>
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Produto
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome do Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted border">
                  {p.images[0] && (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{p.category}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[300px] truncate">
                {p.description}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProduct(p.id)}
                  className="text-destructive"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar' : 'Novo'} Produto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Descrição</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Imagens (URLs separadas por vírgula)</Label>
              <Input
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
              />
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
