import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Label } from '../components/ui/label'
import { useToast } from '../hooks/use-toast'
import { ChevronLeft } from 'lucide-react'

export default function ProductDetail() {
  const { teamSlug, productId } = useParams()
  const navigate = useNavigate()
  const { teams, teamProducts, products, addToCart } = useStore()
  const { toast } = useToast()

  const team = teams.find((t) => t.slug === teamSlug)
  const product = products.find((p) => p.id === productId)
  const teamProduct = teamProducts.find(
    (tp) => tp.productId === productId && tp.teamId === team?.id,
  )

  const [selectedSize, setSelectedSize] = useState(teamProduct?.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(teamProduct?.colors[0] || '')
  const [customValues, setCustomValues] = useState<Record<string, string>>({})

  if (!team || !product || !teamProduct)
    return <div className="p-20 text-center">Produto não encontrado.</div>

  const customPrice = teamProduct.customizationFields.reduce((acc, field) => {
    if (customValues[field.name] && customValues[field.name].trim() !== '') {
      return acc + field.price
    }
    return acc
  }, 0)

  const finalPrice = teamProduct.price + customPrice

  const handleAddToCart = () => {
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      teamProductId: teamProduct.id,
      productName: product.name,
      teamName: team.name,
      price: finalPrice,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      customizations: customValues,
      image: product.images[0],
    })

    toast({
      title: 'Adicionado ao carrinho!',
      description: `${product.name} foi adicionado.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-muted rounded-xl overflow-hidden border">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="w-24 h-30 bg-muted rounded-md overflow-hidden cursor-pointer border hover:border-primary"
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details & Form */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-heading font-black uppercase leading-tight mb-2">
            {product.name}
          </h1>
          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="text-4xl font-heading font-bold text-accent mb-8">
            R$ {finalPrice.toFixed(2)}
          </div>

          <div className="space-y-6 flex-1">
            {/* Size */}
            {teamProduct.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base">Tamanho</Label>
                  <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
                    Guia de Medidas
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {teamProduct.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      className={`w-14 h-12 ${selectedSize === size ? 'ring-2 ring-accent ring-offset-2' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {teamProduct.colors.length > 0 && (
              <div>
                <Label className="text-base mb-3 block">Cor: {selectedColor}</Label>
                <div className="flex gap-3">
                  {teamProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${selectedColor === color ? 'border-primary scale-110' : 'border-transparent'}`}
                      style={{
                        backgroundColor:
                          color === 'Preto'
                            ? '#1a1a1a'
                            : color === 'Branco'
                              ? '#f8f8f8'
                              : color === 'Azul'
                                ? '#1d4ed8'
                                : color,
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            {teamProduct.customizationFields.length > 0 && (
              <div className="pt-6 border-t mt-6 space-y-4">
                <h3 className="font-bold text-lg">Personalização (Opcional)</h3>
                {teamProduct.customizationFields.map((field) => (
                  <div key={field.id}>
                    <Label className="flex justify-between mb-2">
                      <span>{field.name}</span>
                      {field.price > 0 && (
                        <span className="text-accent">+ R$ {field.price.toFixed(2)}</span>
                      )}
                    </Label>
                    {field.type === 'text' ? (
                      <Input
                        placeholder="Ex: SILVA"
                        value={customValues[field.name] || ''}
                        onChange={(e) =>
                          setCustomValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                        }
                      />
                    ) : (
                      <Select
                        value={customValues[field.name] || ''}
                        onValueChange={(val) =>
                          setCustomValues((prev) => ({ ...prev, [field.name]: val }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          {field.options?.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-8 mt-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-bold"
              disabled={!teamProduct.inStock}
              onClick={handleAddToCart}
            >
              {teamProduct.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
