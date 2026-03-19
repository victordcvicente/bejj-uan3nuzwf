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
import { Edit, Trash, PlusCircle, Upload } from 'lucide-react'

const resizeImg = (f: File, maxW = 800): Promise<string> =>
  new Promise((res) => {
    const r = new FileReader()
    r.onload = (e) => {
      const i = new Image()
      i.onload = () => {
        const c = document.createElement('canvas')
        let w = i.width,
          h = i.height
        if (w > maxW) {
          h = Math.round((h * maxW) / w)
          w = maxW
        }
        c.width = w
        c.height = h
        c.getContext('2d')?.drawImage(i, 0, 0, w, h)
        res(c.toDataURL('image/jpeg', 0.8))
      }
      i.src = e.target?.result as string
    }
    r.readAsDataURL(f)
  })

export function TeamsTab() {
  const { teams, addTeam, updateTeam, deleteTeam } = useStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    primaryColor: '',
    logo: '',
    coverImage: '',
    description: '',
  })

  const handleEdit = (t: any) => {
    setEditingId(t.id)
    setForm({
      name: t.name,
      slug: t.slug,
      primaryColor: t.primaryColor,
      logo: t.logo,
      coverImage: t.coverImage,
      description: t.description || '',
    })
    setOpen(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setForm({ name: '', slug: '', primaryColor: '', logo: '', coverImage: '', description: '' })
    setOpen(true)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await updateTeam(editingId, form)
      } else {
        await addTeam(form)
      }
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza? Esta ação apagará a equipe definitivamente.')) {
      await deleteTeam(id)
    }
  }

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const b64 = await resizeImg(f, 400)
    setForm({ ...form, logo: b64 })
  }

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const b64 = await resizeImg(f, 1200)
    setForm({ ...form, coverImage: b64 })
  }

  return (
    <Card>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Gestão de Equipes</h2>
        <Button onClick={handleNew}>
          <PlusCircle className="w-4 h-4 mr-2" /> Nova Equipe
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Nome da Equipe</TableHead>
            <TableHead>Slug (URL)</TableHead>
            <TableHead>Cor Primária</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                {t.logo ? (
                  <img
                    src={t.logo}
                    alt=""
                    className="w-8 h-8 rounded-full border bg-white object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full border bg-muted" />
                )}
              </TableCell>
              <TableCell className="font-medium">{t.name}</TableCell>
              <TableCell className="text-muted-foreground">/{t.slug}</TableCell>
              <TableCell>
                <div
                  className={`w-6 h-6 rounded-full border ${t.primaryColor}`}
                  title={t.primaryColor}
                ></div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(t)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(t.id)}
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
            <DialogTitle>{editingId ? 'Editar' : 'Nova'} Equipe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="grid gap-2">
              <Label>Nome</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Slug (ex: equipe-alpha)</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Cor Primária (Classes Tailwind)</Label>
              <Input
                value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                placeholder="bg-blue-600"
              />
            </div>
            <div className="grid gap-2">
              <Label>Logo da Equipe</Label>
              {form.logo && (
                <img
                  src={form.logo}
                  className="w-16 h-16 object-contain border bg-white rounded-md mb-2"
                  alt="Logo preview"
                />
              )}
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadLogo}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Imagem de Capa (Background)</Label>
              {form.coverImage && (
                <img
                  src={form.coverImage}
                  className="w-full h-24 object-cover border rounded-md mb-2"
                  alt="Cover preview"
                />
              )}
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadCover}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Descrição</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <Button onClick={handleSave} disabled={loading} className="mt-4">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
