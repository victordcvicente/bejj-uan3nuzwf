import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, ShieldCheck, Clock, Medal } from 'lucide-react'
import logoUrl from '@/assets/image-6d323.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export default function Index() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full">
          <Carousel plugins={[plugin.current]} className="w-full bg-muted/40" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="h-[350px] bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 z-0"></div>
                  <div className="relative z-10 max-w-3xl flex flex-col items-center animate-fade-in-up">
                    <div className="bg-white rounded-2xl p-2 mb-6 shadow-xl">
                      <img
                        src={logoUrl}
                        alt="BEJJ Logo"
                        className="h-16 md:h-20 w-auto object-contain"
                      />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight drop-shadow-lg">
                      Bem-vindo ao PORTAL BEJJ
                    </h2>
                    <p className="text-gray-200 md:text-lg max-w-2xl drop-shadow-md">
                      A plataforma exclusiva para pedidos de produtos personalizados. Vista a
                      armadura da sua equipe com qualidade premium e design impecável.
                    </p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-[350px] bg-primary text-primary-foreground flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight drop-shadow-lg">
                    Como Funciona?
                  </h2>
                  <p className="max-w-2xl text-primary-foreground/90 md:text-xl leading-relaxed">
                    Encontre sua academia, acesse o catálogo da sua equipe e personalize seus itens
                    com tamanhos, nomes e graduações. Faça o pagamento seguro via PIX e receba seu
                    pedido diretamente no tatame!
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-[350px] bg-accent text-accent-foreground flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight drop-shadow-lg">
                    Pronto para vestir sua armadura?
                  </h2>
                  <Button
                    size="lg"
                    asChild
                    className="bg-background text-foreground hover:bg-background/90 text-lg h-14 px-8 font-bold shadow-xl hover:scale-105 transition-transform"
                  >
                    <Link to="/catalog">
                      Acessar Catálogos <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-background/20 hover:bg-background border-none text-white hover:text-foreground" />
            <CarouselNext className="right-4 bg-background/20 hover:bg-background border-none text-white hover:text-foreground" />
          </Carousel>
        </section>

        <section className="w-full py-16 md:py-24 bg-background border-t">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                O Processo BEJJ
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
                <h3 className="text-xl font-bold">1. Escolha sua Equipe</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acesse os catálogos oficiais e encontre os produtos exclusivos desenvolvidos para
                  a sua bandeira.
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
                  Processo rápido e seguro com anexo de comprovante para rápida liberação do pedido
                  na produção.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 transition-colors hover:bg-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">4. Receba no Tatame</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acompanhe a fabricação em tempo real e retire seus produtos diretamente na sua
                  academia.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base font-semibold"
              >
                <Link to="/tracking">Acompanhar Pedido</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
