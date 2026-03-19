import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import logoUrl from '@/assets/image-6d323.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Intelligent redirection flow based on user role
  useEffect(() => {
    if (user) {
      const role = user.role
      if (role === 'ADMIN') navigate('/admin', { replace: true })
      else if (role === 'PRODUCTION') navigate('/production', { replace: true })
      else if (role === 'PROFESSOR') navigate('/professor', { replace: true })
      else navigate('/', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast({
        title: 'Erro ao entrar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
      setIsSubmitting(false)
    } else {
      toast({ title: 'Bem-vindo de volta!' })
      // Notice: Redirection is handled automatically by the useEffect
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 animate-fade-in-up">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center pb-8">
          <img src={logoUrl} alt="Logo" className="h-16 mx-auto mb-4 object-contain" />
          <CardTitle className="text-2xl font-heading font-black uppercase">
            Acessar Portal
          </CardTitle>
          <CardDescription>Insira suas credenciais para continuar.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
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
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Ainda não tem conta?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Cadastre-se como aluno
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
