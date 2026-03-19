import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Team, Product, TeamProduct, Order, CartItem, Gym } from './types'
import {
  MOCK_TEAMS,
  MOCK_PRODUCTS,
  MOCK_TEAM_PRODUCTS,
  MOCK_ORDERS,
  MOCK_GYMS,
} from './lib/mockData'

interface StoreContextType {
  teams: Team[]
  gyms: Gym[]
  products: Product[]
  teamProducts: TeamProduct[]
  orders: Order[]
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['productionStatus']) => void
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void

  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void

  addTeam: (team: Team) => void
  updateTeam: (id: string, team: Partial<Team>) => void
  deleteTeam: (id: string) => void

  addGym: (gym: Gym) => void
  updateGym: (id: string, gym: Partial<Gym>) => void
  deleteGym: (id: string) => void

  addTeamProduct: (tp: TeamProduct) => void
  updateTeamProduct: (id: string, tp: Partial<TeamProduct>) => void
  deleteTeamProduct: (id: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

function loadData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (e) {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>(() => loadData('bejj_teams', MOCK_TEAMS))
  const [gyms, setGyms] = useState<Gym[]>(() => loadData('bejj_gyms', MOCK_GYMS))
  const [products, setProducts] = useState<Product[]>(() =>
    loadData('bejj_products', MOCK_PRODUCTS),
  )
  const [teamProducts, setTeamProducts] = useState<TeamProduct[]>(() =>
    loadData('bejj_teamProducts', MOCK_TEAM_PRODUCTS),
  )
  const [orders, setOrders] = useState<Order[]>(() => loadData('bejj_orders', MOCK_ORDERS))
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    localStorage.setItem('bejj_teams', JSON.stringify(teams))
    localStorage.setItem('bejj_gyms', JSON.stringify(gyms))
    localStorage.setItem('bejj_products', JSON.stringify(products))
    localStorage.setItem('bejj_teamProducts', JSON.stringify(teamProducts))
    localStorage.setItem('bejj_orders', JSON.stringify(orders))
  }, [teams, gyms, products, teamProducts, orders])

  const addToCart = (item: CartItem) => setCart((prev) => [...prev, item])
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setCart([])
  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev])
  const updateOrderStatus = (id: string, status: Order['productionStatus']) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, productionStatus: status } : o)))
  const updatePaymentStatus = (id: string, status: Order['paymentStatus']) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, paymentStatus: status } : o)))

  const addProduct = (p: Product) => setProducts((prev) => [...prev, p])
  const updateProduct = (id: string, p: Partial<Product>) =>
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)))
  const deleteProduct = (id: string) => setProducts((prev) => prev.filter((x) => x.id !== id))

  const addTeam = (t: Team) => setTeams((prev) => [...prev, t])
  const updateTeam = (id: string, t: Partial<Team>) =>
    setTeams((prev) => prev.map((x) => (x.id === id ? { ...x, ...t } : x)))
  const deleteTeam = (id: string) => setTeams((prev) => prev.filter((x) => x.id !== id))

  const addGym = (g: Gym) => setGyms((prev) => [...prev, g])
  const updateGym = (id: string, g: Partial<Gym>) =>
    setGyms((prev) => prev.map((x) => (x.id === id ? { ...x, ...g } : x)))
  const deleteGym = (id: string) => setGyms((prev) => prev.filter((x) => x.id !== id))

  const addTeamProduct = (tp: TeamProduct) => setTeamProducts((prev) => [...prev, tp])
  const updateTeamProduct = (id: string, tp: Partial<TeamProduct>) =>
    setTeamProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...tp } : x)))
  const deleteTeamProduct = (id: string) =>
    setTeamProducts((prev) => prev.filter((x) => x.id !== id))

  return (
    <StoreContext.Provider
      value={{
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
