import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { ShieldCheck } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cpf: '',
    teamId: '',
    gymId: '',
    professor: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signUp, user, loading } = useAuth()
  const { teams, gyms } = useStore()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Guard to prevent logged in users from seeing the register form
  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true })
    }
  }, [user, loading, navigate])

  const filteredGyms = form.teamId ? gyms.filter((g) => g.teamId === form.teamId) : gyms

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await signUp(form)
    if (error) {
      toast({
        title: 'Erro no cadastro',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
      setIsSubmitting(false)
    } else {
      toast({ title: 'Conta criada com sucesso!' })
      // Let the useEffect handle the redirection when the user is populated
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 animate-fade-in-up">
      <Card className="w-full max-w-2xl shadow-xl border-primary/10">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-heading font-black uppercase">
            Cadastro de Aluno
          </CardTitle>
          <CardDescription>
            Crie sua conta para acessar os catálogos oficiais da sua equipe.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nome Completo *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: João da Silva"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>E-mail *</Label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>Senha *</Label>
              <Input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone / WhatsApp *</Label>
              <Input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(00) 00000-0000"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>CPF *</Label>
              <Input
                required
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                placeholder="000.000.000-00"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>Equipe / Bandeira *</Label>
              <Select
                required
                disabled={isSubmitting}
                value={form.teamId}
                onValueChange={(v) => setForm({ ...form, teamId: v, gymId: '' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua equipe" />
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
            <div className="space-y-2">
              <Label>Academia (Unidade) *</Label>
              <Select
                required
                disabled={!form.teamId || isSubmitting}
                value={form.gymId}
                onValueChange={(v) => setForm({ ...form, gymId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a academia" />
                </SelectTrigger>
                <SelectContent>
                  {filteredGyms.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                  {filteredGyms.length === 0 && (
                    <SelectItem value="none" disabled>
                      Nenhuma unidade encontrada
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome do Professor *</Label>
              <Input
                required
                value={form.professor}
                onChange={(e) => setForm({ ...form, professor: e.target.value })}
                placeholder="Ex: Mestre Carlos"
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando conta...' : 'Finalizar Cadastro'}
            </Button>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Já possui uma conta?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
