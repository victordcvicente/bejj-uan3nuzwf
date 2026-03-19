import { Navigate, useParams } from 'react-router-dom'

export default function TeamHome() {
  const { teamSlug } = useParams()

  // As requested, the Team slug root should redirect directly to the catalog of that team.
  // The Team Catalog handles rendering all the products for this team.
  return <Navigate to={`/${teamSlug}/catalog`} replace />
}
