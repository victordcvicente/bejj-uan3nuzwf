import { useStore } from '../../store'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { TeamsTab } from './tabs/TeamsTab'
import { GymsTab } from './tabs/GymsTab'
import { TeamCatalogsTab } from './tabs/TeamCatalogsTab'
import { UsersTab } from './tabs/UsersTab'

export default function AdminDashboard() {
  const { teams, products, teamProducts, gyms } = useStore()

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-black">Administração Global</h1>
          <p className="text-muted-foreground">
            Gerencie equipes, catálogos por equipe, academias e usuários.
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
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Itens em Catálogos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalogs" className="w-full">
        <TabsList className="mb-4 flex-wrap h-auto gap-2 justify-start">
          <TabsTrigger value="catalogs">Catálogos (Produtos)</TabsTrigger>
          <TabsTrigger value="teams">Equipes</TabsTrigger>
          <TabsTrigger value="gyms">Academias (Retirada)</TabsTrigger>
          <TabsTrigger value="users">Usuários e Acessos</TabsTrigger>
        </TabsList>

        <TabsContent value="catalogs">
          <TeamCatalogsTab />
        </TabsContent>

        <TabsContent value="teams">
          <TeamsTab />
        </TabsContent>

        <TabsContent value="gyms">
          <GymsTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
