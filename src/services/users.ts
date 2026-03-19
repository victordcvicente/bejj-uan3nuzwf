import pb from '@/lib/pocketbase/client'

export const getUsers = () => pb.collection('users').getFullList({ sort: '-created' })

export const createUser = (data: any) =>
  pb.collection('users').create({ ...data, passwordConfirm: data.password })

export const updateUser = (id: string, data: any) => {
  if (data.password) {
    data.passwordConfirm = data.password
  }
  return pb.collection('users').update(id, data)
}

export const deleteUser = (id: string) => pb.collection('users').delete(id)
