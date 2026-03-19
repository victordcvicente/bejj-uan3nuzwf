import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { Card, CardContent } from '../components/ui/card'
import { ArrowRight, PackageSearch } from 'lucide-react'

export default function GlobalCatalog() {
  const { teams } = useStore()

  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in-up">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase">
          Selecione sua Equipe
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Escolha a sua equipe abaixo para acessar o catálogo exclusivo de produtos oficiais e
          personalizados.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {teams.map((team) => (
          <Link key={team.id} to={`/${team.slug}/catalog`}>
            <Card className="hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden group h-full flex flex-col bg-card/50">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img
                  src={team.coverImage}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  alt={team.name}
                />
                <div
                  className={`absolute inset-0 ${team.primaryColor} opacity-80 mix-blend-multiply transition-opacity group-hover:opacity-70`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
              </div>
              <CardContent className="p-6 relative flex flex-col flex-1 items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white p-4 border-4 border-background shadow-xl -mt-16 relative z-10 mb-5 group-hover:shadow-primary/20 transition-all">
                  <img src={team.logo} className="w-full h-full object-contain" alt="Logo" />
                </div>
                <h3 className="font-heading font-black text-2xl mb-2">{team.name}</h3>
                <p className="text-sm text-muted-foreground mb-8">Acesso restrito a alunos</p>
                <div className="mt-auto flex items-center justify-center w-full bg-primary/10 text-primary py-3 rounded-md font-bold text-sm uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Acessar Catálogo <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
