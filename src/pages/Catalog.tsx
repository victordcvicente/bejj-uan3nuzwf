import { useParams, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'
import { Label } from '../components/ui/label'

export default function Catalog() {
  const { teamSlug } = useParams()
  const { teams, teamProducts, products } = useStore()
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)

  const team = teams.find((t) => t.slug === teamSlug)
  if (!team) return <Navigate to="/404" />

  const categories = ['Kimono', 'Casual', 'Accessories']

  let filteredProducts = teamProducts.filter((tp) => tp.teamId === team.id)

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
          <p className="text-muted-foreground mt-1">{team.name} - Produtos Oficiais</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          <div className="flex items-center space-x-2 mr-4">
            <Switch id="stock-mode" checked={inStockOnly} onCheckedChange={setInStockOnly} />
            <Label htmlFor="stock-mode" className="text-sm font-medium">
              Apenas em estoque
            </Label>
          </div>

          <div className="flex gap-2 bg-muted p-1 rounded-lg">
            <Button
              variant={filterCategory === null ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterCategory(null)}
              className="rounded-md"
            >
              Todos
            </Button>
            {categories.map((cat) => (
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
          return <ProductCard key={tp.id} teamProduct={tp} product={product} team={team} />
        })}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            Nenhum produto encontrado com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  )
}
