import pb from '@/lib/pocketbase/client'

export const getTeams = async () => {
  return await pb.collection('teams').getFullList({ sort: 'name' })
}
