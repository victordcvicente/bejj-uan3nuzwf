import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, ChevronRight, Shield, MapPin } from 'lucide-react'
import galatasLogo from '@/assets/image-4ca2d.png'

const mockTeams = [
  {
    id: 'galatas',
    name: 'Gálatas BJJ',
    description:
      'A arte suave levada a sério. Junte-se à nossa equipe e tenha acesso a produtos exclusivos com a nossa marca.',
    academiasCount: 3,
    coverUrl: 'https://img.usecurling.com/p/800/400?q=jiu-jitsu&color=black&dpr=2',
    logoUrl: galatasLogo,
    slug: 'galatas-bjj',
  },
  {
    id: 'alliance',
    name: 'Alliance BJJ',
    description:
      'Equipe multicampeã mundial. Conheça nossa linha completa de produtos oficiais e vista nossa armadura.',
    academiasCount: 12,
    coverUrl: 'https://img.usecurling.com/p/800/400?q=martial-arts&color=gray&dpr=2',
    logoUrl: 'https://img.usecurling.com/i?q=eagle&color=solid-black&shape=fill',
    slug: 'alliance-bjj',
  },
  {
    id: 'checkmat',
    name: 'Checkmat',
    description:
      'Jiu-jitsu moderno e competitivo. Garanta seu equipamento com a qualidade e o design da nossa equipe.',
    academiasCount: 8,
    coverUrl: 'https://img.usecurling.com/p/800/400?q=grappling&color=blue&dpr=2',
    logoUrl: 'https://img.usecurling.com/i?q=chess&color=solid-black&shape=fill',
    slug: 'checkmat',
  },
]

export default function GlobalCatalog() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTeams = mockTeams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Catálogos de Equipes
          </h1>
          <p className="text-muted-foreground">
            Encontre sua equipe e acesse produtos exclusivos personalizados.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar equipe..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeams.map((team) => (
          <Link key={team.id} to={`/${team.slug}`}>
            <Card className="group overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer h-full flex flex-col">
              <div className="h-32 w-full relative overflow-hidden bg-muted">
                <img
                  src={team.coverUrl}
                  alt={`Capa ${team.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="pt-0 flex-1 flex flex-col">
                <div className="w-24 h-24 rounded-full bg-white p-1 border-4 border-background shadow-xl -mt-16 relative z-10 mb-5 group-hover:shadow-primary/20 transition-all flex items-center justify-center overflow-hidden">
                  <img
                    src={team.logoUrl}
                    alt={team.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {team.name}
                  <Shield className="h-4 w-4 text-primary" />
                </h3>

                <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-3">
                  {team.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {team.academiasCount} academias
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:text-primary group-hover:translate-x-1 transition-all"
                  >
                    Ver Catálogo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filteredTeams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Nenhuma equipe encontrada com esse nome.</p>
            <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2">
              Limpar busca
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
