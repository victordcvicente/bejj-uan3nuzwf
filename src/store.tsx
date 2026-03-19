import React, { createContext, useContext, useState, ReactNode } from 'react'
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
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [teams] = useState<Team[]>(MOCK_TEAMS)
  const [gyms] = useState<Gym[]>(MOCK_GYMS)
  const [products] = useState<Product[]>(MOCK_PRODUCTS)
  const [teamProducts] = useState<TeamProduct[]>(MOCK_TEAM_PRODUCTS)
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => setCart([])

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev])
  }

  const updateOrderStatus = (orderId: string, status: Order['productionStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, productionStatus: status } : o)),
    )
  }

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o)))
  }

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
