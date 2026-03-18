import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent } from '../components/ui/card'
import { CheckCircle2, QrCode, CreditCard } from 'lucide-react'

export default function Checkout() {
  const { cart, clearCart, addOrder } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

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

  const handleFinish = () => {
    const orderId = `ORD-${Math.floor(Math.random() * 10000)}`
    addOrder({
      id: orderId,
      userId: 'u1',
      customerName: name || 'Visitante',
      teamId: cart[0]?.teamName || 't1', // Simplification
      items: [...cart],
      total,
      paymentStatus: 'PAID', // Simulating successful immediate payment for demo
      productionStatus: 'PENDING',
      createdAt: new Date().toISOString(),
    })
    clearCart()
    setStep(4)
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
                  <Label>Nome Completo</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="joao@exemplo.com" />
                </div>
                <div>
                  <Label>CPF</Label>
                  <Input placeholder="000.000.000-00" />
                </div>
                <Button className="w-full mt-4" onClick={() => setStep(2)}>
                  Continuar para Entrega
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-fade-in-up">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Entrega</h2>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>CEP</Label>
                    <Input placeholder="00000-000" />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline">Buscar</Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label>Rua</Label>
                    <Input placeholder="Avenida Paulista" />
                  </div>
                  <div>
                    <Label>Número</Label>
                    <Input placeholder="1000" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Continuar para Pagamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="animate-fade-in-up">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Pagamento</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border-2 border-primary rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-primary/5">
                    <QrCode className="w-8 h-8 text-primary" />
                    <span className="font-bold">PIX</span>
                    <span className="text-xs text-green-600">-5% desconto</span>
                  </div>
                  <div className="border-2 border-muted rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Cartão</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg text-center mb-6">
                  <img
                    src="https://img.usecurling.com/i?q=qrcode&color=black&shape=fill"
                    alt="PIX"
                    className="w-32 h-32 mx-auto mb-4 opacity-50 mix-blend-multiply"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Escaneie o QR Code ou copie o código abaixo
                  </p>
                  <Input
                    readOnly
                    value="00020126360014BR.GOV.BCB.PIX0114+5511999999999..."
                    className="text-xs font-mono text-center"
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                    onClick={handleFinish}
                  >
                    Simular Pagamento Aprovado
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
              <h2 className="text-3xl font-heading font-black mb-4">Pedido Confirmado!</h2>
              <p className="text-muted-foreground mb-8">
                Recebemos seu pedido e ele já está na fila de produção da sua equipe.
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

// Ensure Link is imported for step 4
import { Link } from 'react-router-dom'
