import pb from '@/lib/pocketbase/client'

export const getUsers = async () => {
  return await pb.collection('users').getFullList({ sort: '-created' })
}

export const createUser = async (data: any) => {
  return await pb.collection('users').create({
    ...data,
    passwordConfirm: data.password,
  })
}

export const updateUser = async (id: string, data: any) => {
  if (data.password) {
    data.passwordConfirm = data.password
  } else {
    delete data.password
    delete data.passwordConfirm
  }
  return await pb.collection('users').update(id, data)
}

export const deleteUser = async (id: string) => {
  return await pb.collection('users').delete(id)
}
