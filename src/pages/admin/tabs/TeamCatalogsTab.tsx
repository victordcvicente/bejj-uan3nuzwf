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
import { Edit, Trash, PlusCircle, Upload, X } from 'lucide-react'

const resizeImg = (f: File): Promise<string> =>
  new Promise((res) => {
    const r = new FileReader()
    r.onload = (e) => {
      const i = new Image()
      i.onload = () => {
        const c = document.createElement('canvas')
        let w = i.width,
          h = i.height
        if (w > 800) {
          h = Math.round((h * 800) / w)
          w = 800
        }
        c.width = w
        c.height = h
        c.getContext('2d')?.drawImage(i, 0, 0, w, h)
        res(c.toDataURL('image/jpeg', 0.7))
      }
      i.src = e.target?.result as string
    }
    r.readAsDataURL(f)
  })

export function TeamCatalogsTab() {
  const {
    teams,
    products,
    teamProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    addTeamProduct,
    updateTeamProduct,
    deleteTeamProduct,
  } = useStore()
  const [teamId, setTeamId] = useState(teams[0]?.id || '')
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    cat: '',
    desc: '',
    imgs: [] as string[],
    price: 0,
    stock: true,
    sizes: '',
    colors: '',
  })

  const teamProds = teamProducts.filter((t) => t.teamId === teamId)

  const handleEdit = (tp: any, p: any) => {
    setEditId(tp.id)
    setForm({
      name: p.name,
      cat: p.category,
      desc: p.description,
      imgs: p.images || [],
      price: tp.price,
      stock: tp.inStock,
      sizes: tp.sizes.join(', '),
      colors: tp.colors.join(', '),
    })
    setOpen(true)
  }

  const handleSave = () => {
    const pData = { name: form.name, category: form.cat, description: form.desc, images: form.imgs }
    const tpData = {
      price: Number(form.price),
      inStock: form.stock,
      sizes: form.sizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      colors: form.colors
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }

    if (editId) {
      const tp = teamProducts.find((t) => t.id === editId)
      if (tp) {
        updateTeamProduct(tp.id, tpData)
        updateProduct(tp.productId, pData)
      }
    } else {
      const pId = `p-${Date.now()}`
      addProduct({ id: pId, ...pData })
      addTeamProduct({
        id: `tp-${Date.now()}`,
        teamId,
        productId: pId,
        customizationFields: [],
        ...tpData,
      })
    }
    setOpen(false)
  }

  const handleDel = (tpId: string, pId: string) => {
    deleteTeamProduct(tpId)
    deleteProduct(pId)
  }

  const handleUp = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + form.imgs.length > 5) return alert('Máximo 5 imagens por produto.')
    const b64s = await Promise.all(files.map(resizeImg))
    setForm((p) => ({ ...p, imgs: [...p.imgs, ...b64s].slice(0, 5) }))
  }

  return (
    <Card className="p-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 bg-muted/30 p-3 rounded-lg border">
        <div className="flex items-center gap-3">
          <Label className="whitespace-nowrap">Gerenciar Catálogo da Equipe:</Label>
          <Select value={teamId} onValueChange={setTeamId}>
            <SelectTrigger className="w-[250px] bg-background">
              <SelectValue placeholder="Selecione a equipe" />
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
        <Button
          onClick={() => {
            setEditId(null)
            setForm({
              name: '',
              cat: '',
              desc: '',
              imgs: [],
              price: 0,
              stock: true,
              sizes: '',
              colors: '',
            })
            setOpen(true)
          }}
          disabled={!teamId}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Produto na Equipe
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Img</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço Especial</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamProds.map((tp) => {
            const p = products.find((x) => x.id === tp.productId)
            if (!p) return null
            return (
              <TableRow key={tp.id}>
                <TableCell>
                  {p.images[0] ? (
                    <img
                      src={p.images[0]}
                      className="w-10 h-10 object-cover rounded border"
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded border" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.category}</Badge>
                </TableCell>
                <TableCell className="font-bold">R$ {tp.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={tp.inStock ? 'default' : 'destructive'}
                    className={tp.inStock ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                  >
                    {tp.inStock ? 'Ativo' : 'Esgotado'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(tp, p)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDel(tp.id, p.id)}
                    className="text-destructive"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
          {teamProds.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                Nenhum produto cadastrado para o catálogo desta equipe.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? 'Editar' : 'Novo'} Produto - Catálogo</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label>Nome do Produto</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label>Categoria</Label>
              <Input value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Descrição</Label>
              <Input
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </div>
            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex items-center gap-2 mt-6">
              <Switch
                checked={form.stock}
                onCheckedChange={(c) => setForm({ ...form, stock: c })}
              />
              <Label>Produto em estoque</Label>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label>Tamanhos (separados por vírgula)</Label>
              <Input
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                placeholder="Ex: P, M, G, GG"
              />
            </div>
            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label>Cores (separadas por vírgula)</Label>
              <Input
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                placeholder="Ex: Preto, Branco"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Imagens (Máximo 5 imagens)</Label>
              <div className="flex gap-2 flex-wrap mt-1">
                {form.imgs.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 border rounded overflow-hidden shadow-sm"
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <button
                      onClick={() =>
                        setForm((p) => ({ ...p, imgs: p.imgs.filter((_, x) => x !== idx) }))
                      }
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {form.imgs.length < 5 && (
                  <label className="w-20 h-20 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium text-center px-1">Fazer Upload</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleUp}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <Button onClick={handleSave} className="w-full mt-4">
            Salvar Alterações
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
