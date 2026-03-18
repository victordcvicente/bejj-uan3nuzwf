import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import { useStore } from '../store'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function Index() {
  const { teams } = useStore()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredTeams = teams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center">
      <section className="w-full bg-primary text-primary-foreground py-20 relative overflow-hidden flex flex-col items-center text-center px-4">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://img.usecurling.com/p/1920/1080?q=jiu%20jitsu%20combat&color=black"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl animate-fade-in-up">
          <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">
            B2B2C Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 uppercase tracking-tight">
            Seu Lifestyle, <br className="hidden md:inline" />
            Sua Equipe.
          </h1>
          <p className="text-lg md:text-xl text-muted/80 mb-8 max-w-2xl mx-auto">
            Encontre sua academia e tenha acesso exclusivo ao catálogo de produtos oficiais, kimonos
            personalizados e muito mais.
          </p>
          <div className="relative max-w-lg mx-auto w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              className="w-full pl-12 h-14 text-lg rounded-full bg-background text-foreground border-none ring-4 ring-transparent focus-visible:ring-accent/50"
              placeholder="Digite o nome da sua equipe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 w-full max-w-5xl">
        <h2 className="font-heading font-bold text-2xl mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-accent block rounded-sm"></span>
          {search ? 'Resultados da Busca' : 'Equipes em Destaque'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => navigate(`/${team.slug}`)}
              className="group cursor-pointer rounded-xl border bg-card overflow-hidden hover:shadow-elevation transition-all hover:-translate-y-1"
            >
              <div className="h-32 bg-muted relative">
                <img
                  src={team.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover opacity-80"
                />
                <div
                  className={`absolute inset-0 opacity-40 mix-blend-multiply ${team.primaryColor}`}
                ></div>
              </div>
              <div className="p-6 relative">
                <div className="w-16 h-16 bg-white rounded-full p-2 shadow-md absolute -top-8 left-6 flex items-center justify-center border">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-xl mt-6 group-hover:text-accent transition-colors">
                  {team.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">Acessar Portal</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="group-hover:bg-accent/10 group-hover:text-accent rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filteredTeams.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Nenhuma equipe encontrada com esse nome.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function Badge({ children, className }: any) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  )
}
