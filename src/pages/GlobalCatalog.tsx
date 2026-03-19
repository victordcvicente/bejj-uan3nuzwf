import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, ChevronRight, Shield, MapPin, Edit, Upload } from 'lucide-react'
import { useStore } from '@/store'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useToast } from '@/hooks/use-toast'

const resizeImg = (f: File, initialMaxWidth = 800): Promise<string> =>
  new Promise((res) => {
    const r = new FileReader()
    r.onload = (e) => {
      const i = new Image()
      i.onload = () => {
        const c = document.createElement('canvas')
        let w = i.width,
          h = i.height
        if (w > initialMaxWidth) {
          h = Math.round((h * initialMaxWidth) / w)
          w = initialMaxWidth
        }

        let quality = 0.7
        let b64 = ''

        const compress = () => {
          c.width = w
          c.height = h
          const ctx = c.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, w, h)
            ctx.drawImage(i, 0, 0, w, h)
            b64 = c.toDataURL('image/jpeg', quality)

            if (b64.length > 4900 && w > 20) {
              w = Math.round(w * 0.7)
              h = Math.round(h * 0.7)
              quality = Math.max(0.1, quality - 0.15)
              compress()
            } else {
              res(b64)
            }
          } else {
            res(e.target?.result as string)
          }
        }
        compress()
      }
      i.src = e.target?.result as string
    }
    r.readAsDataURL(f)
  })

export default function GlobalCatalog() {
  const { teams, gyms, role, updateTeam } = useStore()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [editTeamId, setEditTeamId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ logo: '', coverImage: '' })

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (e: React.MouseEvent, t: any) => {
    e.preventDefault()
    e.stopPropagation()
    setEditTeamId(t.id)
    setForm({ logo: t.logo || '', coverImage: t.coverImage || '' })
  }

  const handleSave = async () => {
    if (editTeamId) {
      if (form.logo && form.logo.length > 5000) {
        toast({
          title: 'Erro de Validação',
          description:
            'O logo excede o limite permitido (5.000 caracteres). Tente uma imagem mais simples.',
          variant: 'destructive',
        })
        return
      }
      if (form.coverImage && form.coverImage.length > 5000) {
        toast({
          title: 'Erro de Validação',
          description:
            'A imagem de capa excede o limite permitido (5.000 caracteres). Tente uma imagem mais simples.',
          variant: 'destructive',
        })
        return
      }

      setLoading(true)
      try {
        const teamToUpdate = teams.find((t) => t.id === editTeamId)
        // Ensure required fields are sent to avoid validation errors on PATCH
        const payload = {
          name: teamToUpdate?.name,
          slug: teamToUpdate?.slug,
          logo: form.logo,
          coverImage: form.coverImage,
        }
        await updateTeam(editTeamId, payload)
        setEditTeamId(null)
        toast({ title: 'Sucesso', description: 'Visual da equipe atualizado.' })
      } catch (e: any) {
        console.error(e)
        const errorMsg = getErrorMessage(e)
        toast({
          title: 'Erro ao salvar',
          description: errorMsg,
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo' | 'coverImage',
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxWidth = field === 'logo' ? 150 : 300
      const b64 = await resizeImg(file, maxWidth)
      if (b64.length > 5000) {
        toast({
          title: 'Aviso',
          description:
            'A imagem escolhida não pôde ser comprimida o suficiente. Por favor, escolha outra.',
          variant: 'destructive',
        })
      }
      setForm((prev) => ({ ...prev, [field]: b64 }))
    }
  }

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
        {filteredTeams.map((team) => {
          const academiasCount = gyms.filter((g) => g.teamId === team.id).length
          return (
            <Link key={team.id} to={`/${team.slug}`}>
              <Card className="group overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer h-full flex flex-col relative">
                {role === 'ADMIN' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 z-20 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 hover:bg-background"
                    onClick={(e) => handleEdit(e, team)}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Editar Visual
                  </Button>
                )}
                <div className="h-32 w-full relative overflow-hidden bg-muted">
                  <img
                    src={team.coverImage}
                    alt={`Capa ${team.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <div className="w-24 h-24 rounded-full bg-white p-1 border-4 border-background shadow-xl -mt-16 relative z-10 mb-5 group-hover:shadow-primary/20 transition-all flex items-center justify-center overflow-hidden">
                    <img src={team.logo} alt={team.name} className="w-full h-full object-contain" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {team.name}
                    <Shield className="h-4 w-4 text-primary" />
                  </h3>

                  <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-3">
                    {team.description || 'Catálogo oficial e exclusivo para alunos.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {academiasCount} academias
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-primary group-hover:translate-x-1 transition-all"
                    >
                      Acessar <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}

        {filteredTeams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Nenhuma equipe encontrada com esse nome.</p>
            <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2">
              Limpar busca
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!editTeamId} onOpenChange={(open) => !open && setEditTeamId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personalizar Visual da Equipe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label>Logo da Equipe</Label>
              <div className="flex gap-4 items-center">
                {form.logo && (
                  <img
                    src={form.logo}
                    className="w-16 h-16 rounded-full border bg-muted object-contain"
                  />
                )}
                <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-5 h-5 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Fazer Upload do Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, 'logo')}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagem de Capa (Fundo)</Label>
              <div className="flex flex-col gap-4">
                {form.coverImage && (
                  <img
                    src={form.coverImage}
                    className="w-full h-32 rounded-lg border bg-muted object-cover"
                  />
                )}
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-5 h-5 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Fazer Upload de Capa</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, 'coverImage')}
                  />
                </label>
              </div>
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full mt-2">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
