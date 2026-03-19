import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import pb from '@/lib/pocketbase/client'

interface AuthContextType {
  user: any
  signUp: (data: any) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(pb.authStore.record)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      if (pb.authStore.isValid && pb.authStore.token) {
        try {
          await pb.collection('users').authRefresh()
          if (isMounted) setUser(pb.authStore.record)
        } catch (error) {
          pb.authStore.clear()
          if (isMounted) setUser(null)
        }
      } else {
        if (isMounted) setUser(null)
      }
      if (isMounted) setLoading(false)
    }

    initAuth()

    const unsubscribe = pb.authStore.onChange((_token, record) => {
      if (isMounted) {
        setUser(record)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const signUp = async (data: any) => {
    try {
      await pb.collection('users').create({
        ...data,
        passwordConfirm: data.password,
        role: 'STUDENT',
      })
      await pb.collection('users').authWithPassword(data.email, data.password)
      setUser(pb.authStore.record)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password)
      setUser(pb.authStore.record)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = () => {
    pb.authStore.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
