import { Team, Product, TeamProduct, Order } from '../types'

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    slug: 'alpha-jj',
    name: 'Alpha Jiu-Jitsu',
    logo: 'https://img.usecurling.com/i?q=shield&color=black&shape=fill',
    primaryColor: 'bg-blue-800',
    coverImage: 'https://img.usecurling.com/p/800/400?q=jiu%20jitsu%20gym',
  },
  {
    id: 't2',
    slug: 'bravo-team',
    name: 'Bravo Team',
    logo: 'https://img.usecurling.com/i?q=lion&color=orange&shape=outline',
    primaryColor: 'bg-amber-600',
    coverImage: 'https://img.usecurling.com/p/800/400?q=martial%20arts%20training',
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Kimono Competidor Pro',
    description: 'Kimono de alta performance, trançado super resistente e modelagem fit.',
    images: [
      'https://img.usecurling.com/p/400/500?q=white%20kimono',
      'https://img.usecurling.com/p/400/500?q=bjj%20kimono',
    ],
    category: 'Kimono',
  },
  {
    id: 'p2',
    name: 'Rashguard No-Gi Elite',
    description: 'Rashguard com tecnologia de compressão e controle térmico.',
    images: ['https://img.usecurling.com/p/400/500?q=rashguard%20shirt'],
    category: 'Casual',
  },
  {
    id: 'p3',
    name: 'Faixa Premium',
    description: 'Faixa com 6 costuras, super grossa e durável.',
    images: ['https://img.usecurling.com/p/400/500?q=martial%20arts%20belt'],
    category: 'Accessories',
  },
]

export const MOCK_TEAM_PRODUCTS: TeamProduct[] = [
  {
    id: 'tp1',
    teamId: 't1',
    productId: 'p1',
    price: 450.0,
    sizes: ['A0', 'A1', 'A2', 'A3', 'A4'],
    colors: ['Branco', 'Azul', 'Preto'],
    inStock: true,
    customizationFields: [
      { id: 'c1', name: 'Nome Bordado', type: 'text', price: 30.0 },
      {
        id: 'c2',
        name: 'Posição Patch',
        type: 'select',
        options: ['Peito', 'Costas', 'Perna'],
        price: 0,
      },
    ],
  },
  {
    id: 'tp2',
    teamId: 't1',
    productId: 'p2',
    price: 120.0,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto'],
    inStock: true,
    customizationFields: [],
  },
  {
    id: 'tp3',
    teamId: 't2',
    productId: 'p1',
    price: 480.0, // Different price for Bravo Team
    sizes: ['A1', 'A2', 'A3'],
    colors: ['Branco', 'Preto'],
    inStock: true,
    customizationFields: [{ id: 'c1', name: 'Nome Bordado', type: 'text', price: 40.0 }],
  },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'u1',
    customerName: 'João Silva',
    teamId: 't1',
    items: [
      {
        id: 'i1',
        teamProductId: 'tp1',
        productName: 'Kimono Competidor Pro',
        teamName: 'Alpha Jiu-Jitsu',
        price: 480.0,
        quantity: 1,
        size: 'A2',
        color: 'Branco',
        customizations: { 'Nome Bordado': 'João S.' },
        image: 'https://img.usecurling.com/p/400/500?q=white%20kimono',
      },
    ],
    total: 480.0,
    paymentStatus: 'PAID',
    productionStatus: 'PRODUCTION',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]
