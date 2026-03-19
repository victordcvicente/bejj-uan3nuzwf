import { useStore } from '../../store'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { CatalogTab } from './tabs/CatalogTab'
import { TeamsTab } from './tabs/TeamsTab'
import { GymsTab } from './tabs/GymsTab'
import { RulesTab } from './tabs/RulesTab'

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
          <TabsTrigger value="teams">Gestão de Equipes</TabsTrigger>
          <TabsTrigger value="gyms">Academias (Retirada)</TabsTrigger>
          <TabsTrigger value="rules">Regras Comerciais</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <CatalogTab />
        </TabsContent>

        <TabsContent value="teams">
          <TeamsTab />
        </TabsContent>

        <TabsContent value="gyms">
          <GymsTab />
        </TabsContent>

        <TabsContent value="rules">
          <RulesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
