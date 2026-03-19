import { useStore } from '../../store'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Button } from '../../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import { PlusCircle, Edit, ShieldAlert, Package } from 'lucide-react'

export default function AdminDashboard() {
  const { teams, products, teamProducts, gyms } = useStore()

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-black">Administração Global</h1>
          <p className="text-muted-foreground">
            Gerencie equipes, academias, catálogo base e regras comerciais.
          </p>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Cadastro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Equipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Academias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{gyms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Produtos Base
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Atribuições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="mb-4 flex-wrap h-auto gap-2 justify-start">
          <TabsTrigger value="catalog">Catálogo Base</TabsTrigger>
          <TabsTrigger value="rules">Regras Comerciais</TabsTrigger>
          <TabsTrigger value="teams">Gestão de Equipes</TabsTrigger>
          <TabsTrigger value="gyms">Academias (Retirada)</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Nome do Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-muted border">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[300px] truncate">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nome da Equipe</TableHead>
                  <TableHead>Slug (URL)</TableHead>
                  <TableHead>Cor Primária</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <img
                        src={team.logo}
                        alt=""
                        className="w-8 h-8 rounded-full border bg-white"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="text-muted-foreground">/{team.slug}</TableCell>
                    <TableCell>
                      <div
                        className={`w-6 h-6 rounded-full border ${team.primaryColor}`}
                        title={team.primaryColor}
                      ></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="gyms">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Academia</TableHead>
                  <TableHead>Equipe Vinculada</TableHead>
                  <TableHead>Endereço de Entrega</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gyms.map((gym) => {
                  const team = teams.find((t) => t.id === gym.teamId)
                  return (
                    <TableRow key={gym.id}>
                      <TableCell className="font-medium">{gym.name}</TableCell>
                      <TableCell>{team?.name}</TableCell>
                      <TableCell className="text-muted-foreground">{gym.address}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <div className="p-4 bg-amber-50 border-b flex items-start gap-3 text-amber-800">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                As regras comerciais definem o preço final e as opções de personalização de um
                produto global para uma equipe específica.
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Produto Base</TableHead>
                  <TableHead>Preço Team</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Campos Pers.</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamProducts.map((tp) => {
                  const t = teams.find((x) => x.id === tp.teamId)
                  const p = products.find((x) => x.id === tp.productId)
                  return (
                    <TableRow key={tp.id}>
                      <TableCell className="font-medium">{t?.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          {p?.name}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">R$ {tp.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {tp.inStock ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Esgotado</Badge>
                        )}
                      </TableCell>
                      <TableCell>{tp.customizationFields.length} campos</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
