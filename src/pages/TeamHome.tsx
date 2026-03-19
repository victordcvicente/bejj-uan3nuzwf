import { Navigate, useParams } from 'react-router-dom'
import { useStore } from '@/store'

export default function TeamHome() {
  const { teamSlug } = useParams()
  const { teams } = useStore()

  // Encontra a equipe pelo slug, senão redireciona para a home de catálogos globais
  const team = teams.find((t) => t.slug === teamSlug)

  if (!team) {
    return <Navigate to="/catalog" replace />
  }

  // Direcionamento automático para o catálogo correspondente da equipe
  return <Navigate to={`/${teamSlug}/catalog`} replace />
}
