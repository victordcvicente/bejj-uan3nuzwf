import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store'
import { useAuth } from '../hooks/use-auth'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent } from '../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { CheckCircle2, QrCode } from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export default function Checkout() {
  const { cart, clearCart, addOrder, teams, gyms } = useStore()
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Step 1 states - auto filled if user is logged in
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setCpf(user.cpf || '')
    }
  }, [user])

  // Step 2 states
  const [selectedGym, setSelectedGym] = useState(user?.gymId || '')

  // Step 3 states
  const [receipt, setReceipt] = useState<File | null>(null)

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const cartTeamName = cart[0]?.teamName
  const teamId = teams.find((t) => t.name === cartTeamName)?.id
  const availableGyms = gyms.filter((g) => g.teamId === teamId)

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="p-20 text-center text-muted-foreground">
        Seu carrinho está vazio.{' '}
        <Button variant="link" onClick={() => navigate('/')}>
          Voltar ao Início
        </Button>
      </div>
    )
  }

  const isStep1Valid = name.trim().length >= 3 && email.includes('@') && cpf.length >= 11
  const isStep2Valid = selectedGym !== '' && selectedGym !== 'none'
  const isStep3Valid = receipt !== null

  const handleFinish = async () => {
    setLoading(true)
    try {
      let b64Receipt = ''
      if (receipt) {
        b64Receipt = await new Promise<string>((res, rej) => {
          const r = new FileReader()
          r.onload = () => res(r.result as string)
          r.onerror = rej
          r.readAsDataURL(receipt)
        })
      }

      await addOrder({
        userId: user?.id || 'guest',
        customerName: name,
        customerEmail: email,
        customerCpf: cpf,
        teamId: teamId || '',
        gymId: selectedGym === 'none' ? '' : selectedGym,
        items: [...cart],
        total,
        paymentStatus: 'PENDING',
        productionStatus: 'PENDING',
        receiptUrl: b64Receipt,
      })

      clearCart()
      setStep(4)

      toast({
        title: 'Pedido Recebido!',
        description:
          'Um e-mail foi disparado para a academia e organizadores com os detalhes e o seu comprovante.',
        variant: 'default',
      })
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro no Checkout',
        description:
          getErrorMessage(e) ||
          'Não foi possível finalizar seu pedido. Verifique os dados informados.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-heading font-black mb-8 text-center uppercase">Checkout</h1>

      <div className="flex justify-between items-center mb-12 relative px-4 md:px-12">
        <div className="absolute left-10 right-10 top-1/2 h-1 bg-muted -z-10 -translate-y-1/2"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 bg-background transition-colors ${step >= i ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}
          >
            {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <Card className="animate-fade-in-up">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Identificação</h2>
                <div>
                  <Label>
                    Nome Completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div>
                  <Label>
                    E-mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@exemplo.com"
                  />
                </div>
                <div>
                  <Label>
                    CPF <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
                <Button className="w-full mt-4" disabled={!isStep1Valid} onClick={() => setStep(2)}>
                  Continuar para Entrega
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-fade-in-up">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Retirada na Academia</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecione a unidade onde deseja retirar seu pedido. Os produtos serão entregues no
                  endereço da academia selecionada.
                </p>
                <div>
                  <Label>
                    Selecione a Academia <span className="text-destructive">*</span>
                  </Label>
                  <Select value={selectedGym} onValueChange={setSelectedGym}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Escolha uma unidade..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableGyms.map((g) => (
                        <SelectItem key={g.id} value={g.id}>
                          {g.name}
                        </SelectItem>
                      ))}
                      {availableGyms.length === 0 && (
                        <SelectItem value="none">
                          Nenhuma academia encontrada para esta equipe
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {selectedGym && selectedGym !== 'none' && (
                  <div className="p-4 bg-muted/50 rounded-lg text-sm border border-border mt-4">
                    <span className="font-bold block mb-1">Endereço de Entrega:</span>
                    <span className="text-muted-foreground">
                      {gyms.find((g) => g.id === selectedGym)?.address}
                    </span>
                  </div>
                )}
                <div className="flex gap-4 pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button className="flex-1" disabled={!isStep2Valid} onClick={() => setStep(3)}>
                    Continuar para Pagamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="animate-fade-in-up">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Pagamento via PIX</h2>

                <div className="bg-muted/30 p-6 rounded-lg text-center mb-6 border border-border">
                  <QrCode className="w-40 h-40 mx-auto mb-4 text-primary" />
                  <p className="text-sm text-muted-foreground mb-4 font-medium">
                    Escaneie o QR Code ou copie a chave PIX abaixo
                  </p>
                  <Label className="block text-left mb-1 text-xs">Chave PIX (CNPJ)</Label>
                  <Input
                    readOnly
                    value="12.345.678/0001-90"
                    className="font-mono text-center font-bold bg-background"
                  />
                </div>

                <div className="space-y-3 mb-8 p-4 border border-primary/20 bg-primary/5 rounded-lg">
                  <Label className="text-base font-bold text-primary">
                    Comprovante de Pagamento <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Para confirmar seu pedido, realize o pagamento via PIX e anexe o comprovante
                    abaixo.
                  </p>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                    className="bg-background cursor-pointer file:cursor-pointer"
                  />
                  {!receipt && (
                    <p className="text-xs text-destructive font-medium mt-1">
                      O comprovante é obrigatório para finalizar o pedido.
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep(2)} disabled={loading}>
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                    disabled={!isStep3Valid || loading}
                    onClick={handleFinish}
                  >
                    {loading ? 'Finalizando...' : 'Finalizar Pedido'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-heading font-black mb-4">Pedido Enviado!</h2>
              <p className="text-muted-foreground mb-8">
                Recebemos seu pedido e o comprovante de pagamento. Ele já está na fila de
                conferência e um e-mail de confirmação foi enviado.
              </p>
              <Button asChild>
                <Link to="/tracking">Acompanhar Pedido</Link>
              </Button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="md:col-span-1">
            <Card className="sticky top-24 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 pb-4 border-b">Resumo do Pedido</h3>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground line-clamp-1 flex-1 pr-2">
                        {item.quantity}x {item.productName}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-heading font-bold text-2xl text-accent">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
