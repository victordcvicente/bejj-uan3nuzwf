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
import { useStore } from '@/store'

export default function Index() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
  const { teams } = useStore()

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full">
          <Carousel plugins={[plugin.current]} className="w-full bg-muted/40" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="h-[280px] md:h-[350px] bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 z-0"></div>
                  <div className="relative z-10 max-w-3xl flex flex-col items-center animate-fade-in-up">
                    <div className="bg-white rounded-2xl p-2 mb-4 shadow-xl">
                      <img
                        src={logoUrl}
                        alt="BEJJ Logo"
                        className="h-12 md:h-16 w-auto object-contain"
                      />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black mb-3 uppercase tracking-tight drop-shadow-lg">
                      PORTAL BEJJ
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base max-w-xl drop-shadow-md">
                      Plataforma de produtos personalizados. Vista a armadura da sua equipe com
                      qualidade premium.
                    </p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-[280px] md:h-[350px] bg-primary text-primary-foreground flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-tight drop-shadow-lg">
                    Como Funciona?
                  </h2>
                  <p className="max-w-2xl text-primary-foreground/90 text-sm md:text-lg leading-relaxed">
                    Acesse o catálogo da sua equipe, personalize seus itens e faça o pagamento
                    seguro via PIX. Receba seu pedido diretamente no tatame!
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-background/20 hover:bg-background border-none text-white hover:text-foreground h-8 w-8" />
            <CarouselNext className="right-4 bg-background/20 hover:bg-background border-none text-white hover:text-foreground h-8 w-8" />
          </Carousel>
        </section>

        <section className="w-full py-12 md:py-16 bg-muted/20 border-t border-b">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                Acesse sua Equipe
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-[600px] mx-auto">
                Selecione o catálogo oficial da sua bandeira para visualizar os produtos.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {teams.slice(0, 6).map((team) => (
                <Link key={team.id} to={`/${team.slug}`} className="group relative">
                  <div className="flex items-center gap-3 bg-background border p-3 rounded-full shadow-sm hover:shadow-md transition-all pr-5 hover:border-primary/50">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-10 h-10 rounded-full object-contain bg-white border"
                    />
                    <span className="font-bold text-sm group-hover:text-primary transition-colors">
                      {team.name}
                    </span>
                  </div>
                </Link>
              ))}
              <Link to="/catalog">
                <div className="flex items-center gap-3 bg-primary text-primary-foreground border-primary p-3 rounded-full shadow-sm hover:shadow-md transition-all px-6 hover:bg-primary/90">
                  <span className="font-bold text-sm">Ver Todas as Equipes</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                O Processo BEJJ
              </h2>
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
                <h3 className="text-xl font-bold">3. Pagamento Seguro</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Processo rápido e obrigatório via PIX com anexo de comprovante para rápida
                  liberação na produção.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 transition-colors hover:bg-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">4. Receba no Tatame</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acompanhe a fabricação e retire seus produtos diretamente na sua academia
                  vinculada.
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
                <Link to="/tracking">Acompanhar Pedido Existente</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
