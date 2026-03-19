import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, ShieldCheck, Clock, Medal } from 'lucide-react'
import logoUrl from '@/assets/image-6d323.png'

export default function Index() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-muted/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-background rounded-3xl shadow-sm border mb-2">
                <img src={logoUrl} alt="BEJJ Logo" className="h-24 w-auto object-contain" />
              </div>
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Bem-vindo ao <span className="text-primary">PORTAL BEJJ</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                  A plataforma exclusiva para pedidos de produtos personalizados. Vista a armadura
                  da sua equipe com qualidade premium e design impecável.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link to="/catalog">
                    Acessar Catálogo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base bg-background"
                  asChild
                >
                  <Link to="/tracking">Acompanhar Pedido</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Como funciona o PORTAL BEJJ
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Desenvolvemos um processo simples e direto para que você possa focar no que
                realmente importa: seus treinos no tatame.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 transition-colors hover:bg-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Medal className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Escolha sua Academia</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Selecione sua unidade e acesse os produtos exclusivos desenvolvidos para sua
                  equipe.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 transition-colors hover:bg-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. Personalize</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Escolha tamanhos, cores e adicione seu nome ou graduação nos produtos permitidos.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 transition-colors hover:bg-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Pagamento via PIX</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Processo rápido e seguro com anexo de comprovante para rápida liberação do pedido.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 transition-colors hover:bg-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">4. Receba no Tatame</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acompanhe a produção em tempo real e receba seus produtos diretamente na sua
                  academia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
