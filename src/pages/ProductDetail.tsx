import { useState, useEffect } from 'react'
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
import { ChevronLeft, Ruler } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [customValues, setCustomValues] = useState<Record<string, string>>({})

  useEffect(() => {
    if (teamProduct) {
      if (teamProduct.sizes.length > 0) setSelectedSize(teamProduct.sizes[0])
      if (teamProduct.colors.length > 0) setSelectedColor(teamProduct.colors[0])
      if (teamProduct.models && teamProduct.models.length > 0)
        setSelectedModel(teamProduct.models[0])

      const defaults: Record<string, string> = {}
      teamProduct.customizationFields.forEach((field) => {
        if (field.type === 'select' && field.options?.length === 1) {
          defaults[field.label] = field.options[0]
        }
      })
      setCustomValues(defaults)
    }
  }, [teamProduct])

  if (!team || !product || !teamProduct)
    return <div className="p-20 text-center font-heading text-xl">Produto não encontrado.</div>

  const customPrice = teamProduct.customizationFields.reduce((acc, field) => {
    if (customValues[field.label] && customValues[field.label].trim() !== '') {
      return acc + field.price
    }
    return acc
  }, 0)

  const finalPrice = teamProduct.price + customPrice

  const handleAddToCart = () => {
    const missingFields = []
    if (teamProduct.sizes.length > 0 && !selectedSize) missingFields.push('Tamanho')
    if (teamProduct.colors.length > 0 && !selectedColor) missingFields.push('Cor')
    if (teamProduct.models && teamProduct.models.length > 0 && !selectedModel)
      missingFields.push('Modelo')

    for (const field of teamProduct.customizationFields) {
      if (
        field.required &&
        (!customValues[field.label] ||
          customValues[field.label].trim() === '' ||
          customValues[field.label] === 'none')
      ) {
        missingFields.push(field.label)
      }
    }

    if (missingFields.length > 0) {
      toast({
        title: 'Campos obrigatórios',
        description: `Por favor, preencha: ${missingFields.join(', ')}`,
        variant: 'destructive',
      })
      return
    }

    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      teamProductId: teamProduct.id,
      productName: product.name,
      teamName: team.name,
      price: finalPrice,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      model: selectedModel,
      customizations: customValues,
      image: product.images[0],
    })

    toast({
      title: 'Adicionado ao carrinho!',
      description: `${product.name} foi adicionado.`,
    })
  }

  const getColorHex = (colorName: string) => {
    const map: Record<string, string> = {
      Preto: '#000000',
      Branco: '#ffffff',
      'Off White': '#f8f9fa',
      Azul: '#1e3a8a',
      Cinza: '#9ca3af',
      Vermelho: '#dc2626',
      Roxa: '#7e22ce',
      Marrom: '#78350f',
      Amarelo: '#facc15',
      Rosa: '#f472b6',
      Verde: '#22c55e',
      Dourado: '#D4AF37',
      Prata: '#C0C0C0',
    }
    return map[colorName] || '#e5e7eb'
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground font-medium"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-muted rounded-xl overflow-hidden border border-border shadow-sm">
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
                  className="w-24 h-30 bg-muted rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent transition-colors"
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-accent font-bold mb-2 uppercase tracking-widest">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-black uppercase leading-tight mb-4">
            {product.name}
          </h1>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="text-4xl md:text-5xl font-heading font-black text-foreground mb-8 flex items-end gap-2">
            <span className="text-xl text-muted-foreground font-medium pb-1">R$</span>
            {finalPrice.toFixed(2)}
          </div>

          <div className="space-y-8 flex-1">
            {teamProduct.models && teamProduct.models.length > 0 && (
              <div>
                <Label className="text-base font-bold mb-4 block">Modelo: {selectedModel}</Label>
                <div className="flex flex-wrap gap-3">
                  {teamProduct.models.map((m) => (
                    <Button
                      key={m}
                      variant={selectedModel === m ? 'default' : 'outline'}
                      className={`h-12 font-bold transition-all ${selectedModel === m ? 'bg-foreground text-background ring-2 ring-accent ring-offset-2 ring-offset-background' : 'hover:border-foreground'}`}
                      onClick={() => setSelectedModel(m)}
                    >
                      {m}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {teamProduct.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-bold">Tamanho: {selectedSize}</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-2 text-xs text-accent hover:text-accent-foreground font-bold uppercase tracking-wider flex items-center gap-1"
                      >
                        <Ruler className="w-3 h-3" /> Guia de Medidas
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-heading font-black uppercase">
                          Tabela de Medidas
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 border rounded-md overflow-hidden">
                        <table className="w-full text-sm text-center">
                          <thead className="bg-muted text-muted-foreground font-medium">
                            <tr>
                              <th className="py-3 px-2 border-b">Tamanho</th>
                              <th className="py-3 px-2 border-b">Largura (cm)</th>
                              <th className="py-3 px-2 border-b">Altura (cm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {['P', 'M', 'G', 'GG', 'EXG'].map((s, i) => (
                              <tr key={s} className="border-b last:border-0 hover:bg-muted/50">
                                <td className="py-3 px-2 font-bold">{s}</td>
                                <td className="py-3 px-2">{50 + i * 2}</td>
                                <td className="py-3 px-2">{70 + i * 2}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Valores aproximados. Pode haver variação de até 2cm.
                      </p>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-wrap gap-3">
                  {teamProduct.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      className={`w-14 h-14 font-bold text-lg transition-all ${selectedSize === size ? 'bg-foreground text-background ring-2 ring-accent ring-offset-2 ring-offset-background' : 'hover:border-foreground'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {teamProduct.colors.length > 0 && (
              <div>
                <Label className="text-base font-bold mb-4 block">Cor: {selectedColor}</Label>
                <div className="flex flex-wrap gap-4">
                  {teamProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 shadow-sm transition-all ${selectedColor === color ? 'border-accent scale-110 ring-2 ring-accent ring-offset-2 ring-offset-background' : 'border-border hover:scale-105'}`}
                      style={{ backgroundColor: getColorHex(color) }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {teamProduct.customizationFields.length > 0 && (
              <div className="pt-8 border-t border-border mt-8 space-y-6">
                <h3 className="font-heading font-bold text-xl uppercase">Personalização</h3>
                {teamProduct.customizationFields.map((field) => (
                  <div
                    key={field.id}
                    className="bg-muted/30 p-4 rounded-lg border border-border/50"
                  >
                    <Label className="flex justify-between mb-3 text-base">
                      <span className="font-medium">
                        {field.label}{' '}
                        {field.required && <span className="text-destructive">*</span>}
                      </span>
                      {field.price > 0 && (
                        <span className="text-accent font-bold">+ R$ {field.price.toFixed(2)}</span>
                      )}
                    </Label>
                    {field.type === 'text' ? (
                      <Input
                        placeholder={
                          field.name.includes('garrafa') ? 'Digite o nome desejado' : '...'
                        }
                        className="bg-background"
                        value={customValues[field.label] || ''}
                        onChange={(e) =>
                          setCustomValues((prev) => ({ ...prev, [field.label]: e.target.value }))
                        }
                      />
                    ) : (
                      <Select
                        value={customValues[field.label] || undefined}
                        onValueChange={(val) =>
                          setCustomValues((prev) => ({ ...prev, [field.label]: val }))
                        }
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {!field.required && <SelectItem value="none">Nenhum</SelectItem>}
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

          <div className="pt-10 mt-auto">
            <Button
              size="lg"
              className="w-full h-16 text-lg font-heading font-black uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-all"
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
