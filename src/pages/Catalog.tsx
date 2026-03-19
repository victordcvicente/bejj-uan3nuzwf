import { useParams, Navigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'
import { Label } from '../components/ui/label'

export default function Catalog() {
  const { teamSlug } = useParams()
  const { teams, teamProducts, products, isLoading } = useStore()
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)

  const team = useMemo(() => teams.find((t) => t.slug === teamSlug), [teams, teamSlug])

  const teamProductsList = useMemo(() => {
    if (!team) return []
    return teamProducts.filter((tp) => tp.teamId === team.id)
  }, [teamProducts, team])

  // Dynamically extract categories available for this specific team
  const availableCategories = useMemo(() => {
    const cats = new Set<string>()
    teamProductsList.forEach((tp) => {
      const p = products.find((prod) => prod.id === tp.productId)
      if (p) cats.add(p.category)
    })
    return Array.from(cats).sort()
  }, [teamProductsList, products])

  // Robust loading state avoids prematurely declaring 404
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground font-medium uppercase tracking-widest">
            Carregando catálogo...
          </p>
        </div>
      </div>
    )
  }

  // Graceful fallback if the team doesn't exist after loading completes
  if (!isLoading && !team) {
    return <Navigate to="/catalog" replace />
  }

  let filteredProducts = teamProductsList

  if (filterCategory) {
    filteredProducts = filteredProducts.filter((tp) => {
      const p = products.find((p) => p.id === tp.productId)
      return p?.category === filterCategory
    })
  }

  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((tp) => tp.inStock)
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8 pb-6 border-b">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase">Catálogo</h1>
          <p className="text-muted-foreground mt-1">{team!.name} - Produtos Oficiais</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          <div className="flex items-center space-x-2 mr-4">
            <Switch id="stock-mode" checked={inStockOnly} onCheckedChange={setInStockOnly} />
            <Label htmlFor="stock-mode" className="text-sm font-medium">
              Apenas em estoque
            </Label>
          </div>

          <div className="flex flex-wrap gap-2 bg-muted p-1 rounded-lg overflow-x-auto">
            <Button
              variant={filterCategory === null ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterCategory(null)}
              className="rounded-md"
            >
              Todos
            </Button>
            {availableCategories.map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterCategory(cat)}
                className="rounded-md"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((tp) => {
          const product = products.find((p) => p.id === tp.productId)!
          return <ProductCard key={tp.id} teamProduct={tp} product={product} team={team!} />
        })}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
            Nenhum produto encontrado com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  )
}
