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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Edit, Trash, PlusCircle } from 'lucide-react'

export function GymsTab() {
  const { gyms, teams, addGym, updateGym, deleteGym } = useStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', teamId: '', address: '' })

  const handleEdit = (g: any) => {
    setEditingId(g.id)
    setForm({ name: g.name, teamId: g.teamId, address: g.address })
    setOpen(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setForm({ name: '', teamId: '', address: '' })
    setOpen(true)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await updateGym(editingId, form)
      } else {
        await addGym(form)
      }
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza? Esta ação removerá a academia.')) {
      await deleteGym(id)
    }
  }

  return (
    <Card>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Academias (Retirada)</h2>
        <Button onClick={handleNew}>
          <PlusCircle className="w-4 h-4 mr-2" /> Nova Academia
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Academia</TableHead>
            <TableHead>Equipe Vinculada</TableHead>
            <TableHead>Endereço de Entrega</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gyms.map((g) => {
            const team = teams.find((t) => t.id === g.teamId)
            return (
              <TableRow key={g.id}>
                <TableCell className="font-medium">{g.name}</TableCell>
                <TableCell>{team?.name}</TableCell>
                <TableCell className="text-muted-foreground">{g.address}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(g)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(g.id)}
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
            <DialogTitle>{editingId ? 'Editar' : 'Nova'} Academia</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome da Academia</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
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
              <Label>Endereço de Entrega</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
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
