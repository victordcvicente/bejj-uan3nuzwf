import { Navigate, useParams } from 'react-router-dom'
import { useStore } from '@/store'

export default function TeamHome() {
  const { teamSlug } = useParams()
  const { teams, isLoading } = useStore()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground font-medium uppercase tracking-widest">
            Acessando equipe...
          </p>
        </div>
      </div>
    )
  }

  // Encontra a equipe pelo slug, senão redireciona para a home de catálogos globais
  const team = teams.find((t) => t.slug === teamSlug)

  if (!team) {
    return <Navigate to="/catalog" replace />
  }

  // Direcionamento automático para o catálogo correspondente da equipe
  return <Navigate to={`/${teamSlug}/catalog`} replace />
}
