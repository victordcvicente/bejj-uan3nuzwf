import { useParams, Navigate, Link } from 'react-router-dom'
import { useStore } from '../store'
import { Button } from '../components/ui/button'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'

export default function TeamHome() {
  const { teamSlug } = useParams()
  const { teams, teamProducts, products } = useStore()

  const team = teams.find((t) => t.slug === teamSlug)
  if (!team) return <Navigate to="/404" />

  const featuredTeamProducts = teamProducts.filter((tp) => tp.teamId === team.id).slice(0, 4)

  return (
    <div className="animate-fade-in">
      <div className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <img
          src={team.coverImage}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${team.primaryColor} opacity-70 mix-blend-multiply`}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center text-center text-white p-6 mt-10">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-4 shadow-xl mb-6 flex items-center justify-center">
            <img src={team.logo} alt={team.name} className="max-w-full max-h-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black drop-shadow-lg">
            {team.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl drop-shadow-md text-white/90">
            Catálogo oficial e exclusivo para alunos.
          </p>
          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              className="h-12 px-8 text-lg font-bold bg-white text-black hover:bg-white/90"
              asChild
            >
              <Link to={`/${team.slug}/catalog`}>Ver Catálogo</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-heading font-bold text-3xl">Destaques</h2>
          <Button variant="ghost" className="hover:text-accent" asChild>
            <Link to={`/${team.slug}/catalog`}>
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTeamProducts.map((tp) => {
            const product = products.find((p) => p.id === tp.productId)!
            return <ProductCard key={tp.id} teamProduct={tp} product={product} team={team} />
          })}
        </div>
      </div>
    </div>
  )
}
