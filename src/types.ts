export type Team = {
  id: string
  slug: string
  name: string
  logo: string
  primaryColor: string
  coverImage: string
}

export type Product = {
  id: string
  name: string
  description: string
  images: string[]
  category: 'Kimono' | 'Casual' | 'Accessories'
}

export type CustomizationField = {
  id: string
  name: string
  type: 'text' | 'select'
  options?: string[]
  price: number
}

export type TeamProduct = {
  id: string
  teamId: string
  productId: string
  price: number
  sizes: string[]
  colors: string[]
  inStock: boolean
  customizationFields: CustomizationField[]
}

export type CartItem = {
  id: string
  teamProductId: string
  productName: string
  teamName: string
  price: number
  quantity: number
  size: string
  color: string
  customizations: Record<string, string>
  image: string
}

export type OrderStatus = 'PENDING' | 'PRODUCTION' | 'SHIPPED' | 'DELIVERED'
export type PaymentStatus = 'PENDING' | 'PAID'

export type Order = {
  id: string
  userId: string
  customerName: string
  teamId: string
  items: CartItem[]
  total: number
  paymentStatus: PaymentStatus
  productionStatus: OrderStatus
  createdAt: string
}
