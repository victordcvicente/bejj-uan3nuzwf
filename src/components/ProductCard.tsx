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
  return (
    <Link to={`/${team.slug}/product/${product.id}`}>
      <Card className="overflow-hidden group hover:border-foreground/50 transition-colors h-full flex flex-col relative border-b-4 border-b-transparent hover:border-b-accent">
        {!teamProduct.inStock && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="destructive">Esgotado</Badge>
          </div>
        )}
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-4 flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="text-xs text-muted-foreground line-clamp-2">{product.description}</div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-end">
          <div className="font-heading font-bold text-xl">R$ {teamProduct.price.toFixed(2)}</div>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full bg-black border shadow-sm" title="Preto"></div>
            <div className="w-4 h-4 rounded-full bg-white border shadow-sm" title="Branco"></div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
