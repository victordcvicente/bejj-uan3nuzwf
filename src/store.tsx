import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Team, Product, TeamProduct, Order, CartItem, Gym } from './types'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'

interface StoreContextType {
  isLoading: boolean
  teams: Team[]
  gyms: Gym[]
  products: Product[]
  teamProducts: TeamProduct[]
  orders: Order[]
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  addOrder: (order: Partial<Order>) => Promise<any>
  updateOrderStatus: (orderId: string, status: Order['productionStatus']) => Promise<void>
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => Promise<void>

  addProduct: (product: Partial<Product>) => Promise<any>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>

  addTeam: (team: Partial<Team>) => Promise<void>
  updateTeam: (id: string, team: Partial<Team>) => Promise<void>
  deleteTeam: (id: string) => Promise<void>

  addGym: (gym: Partial<Gym>) => Promise<void>
  updateGym: (id: string, gym: Partial<Gym>) => Promise<void>
  deleteGym: (id: string) => Promise<void>

  addTeamProduct: (tp: Partial<TeamProduct>) => Promise<any>
  updateTeamProduct: (id: string, tp: Partial<TeamProduct>) => Promise<void>
  deleteTeamProduct: (id: string) => Promise<void>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])
  const [gyms, setGyms] = useState<Gym[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [teamProducts, setTeamProducts] = useState<TeamProduct[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const item = localStorage.getItem('bejj_cart')
      return item ? JSON.parse(item) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bejj_cart', JSON.stringify(cart))
  }, [cart])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [t, g, p, tp, o] = await Promise.all([
        pb.collection('teams').getFullList(),
        pb.collection('gyms').getFullList(),
        pb.collection('products').getFullList(),
        pb.collection('team_products').getFullList(),
        pb.collection('orders').getFullList({ sort: '-created' }),
      ])
      setTeams(t as any)
      setGyms(g as any)
      setProducts(p as any)
      setTeamProducts(tp as any)
      setOrders(o as any)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('teams', async () => setTeams((await pb.collection('teams').getFullList()) as any))
  useRealtime('gyms', async () => setGyms((await pb.collection('gyms').getFullList()) as any))
  useRealtime('products', async () =>
    setProducts((await pb.collection('products').getFullList()) as any),
  )
  useRealtime('team_products', async () =>
    setTeamProducts((await pb.collection('team_products').getFullList()) as any),
  )
  useRealtime('orders', async () =>
    setOrders((await pb.collection('orders').getFullList({ sort: '-created' })) as any),
  )

  const addToCart = (item: CartItem) => setCart((prev) => [...prev, item])
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setCart([])

  const addOrder = async (order: Partial<Order>) => {
    const { id, ...data } = order
    return await pb.collection('orders').create(data)
  }
  const updateOrderStatus = async (id: string, status: Order['productionStatus']) => {
    await pb.collection('orders').update(id, { productionStatus: status })
  }
  const updatePaymentStatus = async (id: string, status: Order['paymentStatus']) => {
    await pb.collection('orders').update(id, { paymentStatus: status })
  }

  const addProduct = async (p: Partial<Product>) => {
    const { id, ...data } = p
    return await pb.collection('products').create(data)
  }
  const updateProduct = async (id: string, p: Partial<Product>) => {
    await pb.collection('products').update(id, p)
  }
  const deleteProduct = async (id: string) => {
    await pb.collection('products').delete(id)
  }

  const addTeam = async (t: Partial<Team>) => {
    const { id, ...data } = t
    await pb.collection('teams').create(data)
  }
  const updateTeam = async (id: string, t: Partial<Team>) => {
    await pb.collection('teams').update(id, t)
  }
  const deleteTeam = async (id: string) => {
    await pb.collection('teams').delete(id)
  }

  const addGym = async (g: Partial<Gym>) => {
    const { id, ...data } = g
    await pb.collection('gyms').create(data)
  }
  const updateGym = async (id: string, g: Partial<Gym>) => {
    await pb.collection('gyms').update(id, g)
  }
  const deleteGym = async (id: string) => {
    await pb.collection('gyms').delete(id)
  }

  const addTeamProduct = async (tp: Partial<TeamProduct>) => {
    const { id, ...data } = tp
    return await pb.collection('team_products').create(data)
  }
  const updateTeamProduct = async (id: string, tp: Partial<TeamProduct>) => {
    await pb.collection('team_products').update(id, tp)
  }
  const deleteTeamProduct = async (id: string) => {
    await pb.collection('team_products').delete(id)
  }

  return (
    <StoreContext.Provider
      value={{
        isLoading,
        teams,
        gyms,
        products,
        teamProducts,
        orders,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        addOrder,
        updateOrderStatus,
        updatePaymentStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addTeam,
        updateTeam,
        deleteTeam,
        addGym,
        updateGym,
        deleteGym,
        addTeamProduct,
        updateTeamProduct,
        deleteTeamProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}
