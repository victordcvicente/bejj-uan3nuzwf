import { useState, useEffect } from 'react'
import { getUsers, createUser, updateUser, deleteUser } from '@/services/users'
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
import { useToast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { Badge } from '@/components/ui/badge'

export function UsersTab() {
  const [users, setUsers] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' })
  const { toast } = useToast()

  const loadUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleEdit = (u: any) => {
    setEditId(u.id)
    setForm({ name: u.name, email: u.email, password: '', role: u.role || 'STUDENT' })
    setOpen(true)
  }

  const handleNew = () => {
    setEditId(null)
    setForm({ name: '', email: '', password: '', role: 'STUDENT' })
    setOpen(true)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (editId) {
        const data = form.password ? form : { name: form.name, email: form.email, role: form.role }
        await updateUser(editId, data)
        toast({ title: 'Usuário atualizado com sucesso.' })
      } else {
        await createUser(form)
        toast({ title: 'Usuário criado com sucesso.' })
      }
      setOpen(false)
      loadUsers()
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja apagar este usuário?')) {
      try {
        await deleteUser(id)
        toast({ title: 'Usuário removido.' })
        loadUsers()
      } catch (error) {
        toast({ title: 'Erro', description: getErrorMessage(error), variant: 'destructive' })
      }
    }
  }

  const roleColors: Record<string, string> = {
    ADMIN: 'bg-red-100 text-red-800',
    PRODUCTION: 'bg-orange-100 text-orange-800',
    PROFESSOR: 'bg-blue-100 text-blue-800',
    STUDENT: 'bg-green-100 text-green-800',
  }

  return (
    <Card>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Gestão de Usuários e Acessos</h2>
        <Button onClick={handleNew}>
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Usuário
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Perfil (Role)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className={roleColors[u.role] || ''}>
                  {u.role || 'STUDENT'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(u)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
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
            <DialogTitle>{editId ? 'Editar' : 'Novo'} Usuário</DialogTitle>
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
              <Label>E-mail</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Senha {editId && '(Deixe em branco para manter)'}</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Nível de Acesso (Role)</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Aluno (Público)</SelectItem>
                  <SelectItem value="PROFESSOR">Professor (Painel Comissões)</SelectItem>
                  <SelectItem value="PRODUCTION">Produção (Fila Fábrica)</SelectItem>
                  <SelectItem value="ADMIN">Admin (Acesso Total)</SelectItem>
                </SelectContent>
              </Select>
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
