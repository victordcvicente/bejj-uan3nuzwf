import { Link } from 'react-router-dom'
import { TeamProduct, Product, Team } from '../types'
import { Card, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'

interface Props {
  teamProduct: TeamProduct
  product: Product
  team: Team
}

export default function ProductCard({ teamProduct, product, team }: Props) {
  // Try to map color names to basic CSS colors for the dots
  const getColorHex = (colorName: string) => {
    const map: Record<string, string> = {
      Preto: '#000000',
      Branco: '#ffffff',
      Azul: '#1e3a8a',
      Cinza: '#9ca3af',
      Vermelho: '#dc2626',
      Roxa: '#7e22ce',
      Marrom: '#78350f',
      Preta: '#000000',
    }
    return map[colorName] || '#e5e7eb'
  }

  return (
    <Link to={`/${team.slug}/product/${product.id}`}>
      <Card className="overflow-hidden group hover:border-foreground/50 transition-colors h-full flex flex-col relative border-b-4 border-b-transparent hover:border-b-accent">
        {!teamProduct.inStock && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="destructive" className="shadow-sm">
              Esgotado
            </Badge>
          </div>
        )}
        <div className="aspect-[4/5] overflow-hidden bg-muted relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        <CardContent className="p-4 flex-1">
          <p className="text-xs text-accent font-semibold mb-1 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="text-xs text-muted-foreground line-clamp-2">{product.description}</div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-end">
          <div className="font-heading font-bold text-xl">
            R$ {teamProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          {teamProduct.colors && teamProduct.colors.length > 0 && (
            <div className="flex gap-1">
              {teamProduct.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
              {teamProduct.colors.length > 4 && (
                <div className="w-4 h-4 rounded-full border border-border bg-muted flex items-center justify-center text-[8px] font-bold">
                  +
                </div>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
