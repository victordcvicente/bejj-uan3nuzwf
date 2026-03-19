import { Team, Product, TeamProduct, Order } from '../types'

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    slug: 'galatas-jj',
    name: 'Gálatas Jiu-Jitsu',
    logo: 'https://img.usecurling.com/i?q=lion&color=solid-black&shape=fill',
    primaryColor: 'bg-black',
    coverImage: 'https://img.usecurling.com/p/1200/400?q=jiu%20jitsu%20training%20gym&color=black',
  },
  {
    id: 't2',
    slug: 'alpha-jj',
    name: 'Alpha Jiu-Jitsu',
    logo: 'https://img.usecurling.com/i?q=shield&color=blue&shape=fill',
    primaryColor: 'bg-blue-800',
    coverImage: 'https://img.usecurling.com/p/1200/400?q=bjj%20gym&color=blue',
  },
  {
    id: 't3',
    slug: 'bravo-team',
    name: 'Bravo Team',
    logo: 'https://img.usecurling.com/i?q=wolf&color=orange&shape=outline',
    primaryColor: 'bg-amber-600',
    coverImage: 'https://img.usecurling.com/p/1200/400?q=martial%20arts&color=orange',
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Modelo Oversized Off White',
    description:
      'Camiseta modelagem oversized com caimento perfeito, desenvolvida para garantir conforto e estilo minimalista. Tecido premium 100% algodão de alta gramatura. Ideal para treinos casuais ou lifestyle.',
    images: [
      'https://img.usecurling.com/p/600/800?q=white%20oversized%20tshirt&seed=1',
      'https://img.usecurling.com/p/600/800?q=white%20oversized%20tshirt&seed=2',
    ],
    category: 'Casual',
  },
  {
    id: 'p2',
    name: 'Camiseta Algodão Básica',
    description:
      'Camiseta 100% algodão com toque super macio e alta durabilidade. Estampa minimalista no peito. Perfeita para representar sua equipe com elegância.',
    images: [
      'https://img.usecurling.com/p/600/800?q=black%20tshirt%20model&seed=3',
      'https://img.usecurling.com/p/600/800?q=colorful%20tshirt%20model&seed=4',
    ],
    category: 'Casual',
  },
  {
    id: 'p3',
    name: 'Kimono Pro Series',
    description:
      'Kimono de alta performance, trançado super resistente (450 GSM) e modelagem fit. Ideal para competições e treinos intensos.',
    images: [
      'https://img.usecurling.com/p/600/800?q=white%20kimono',
      'https://img.usecurling.com/p/600/800?q=bjj%20gi',
    ],
    category: 'Kimono',
  },
  {
    id: 'p4',
    name: 'Rashguard Elite No-Gi',
    description:
      'Rashguard com tecnologia de compressão, proteção UV e controle térmico. Estampa sublimada de alta durabilidade.',
    images: ['https://img.usecurling.com/p/600/800?q=rashguard%20shirt'],
    category: 'No-Gi',
  },
  {
    id: 'p5',
    name: 'Moletom Essential',
    description: 'Moletom canguru peluciado por dentro, com capuz e bolso frontal.',
    images: ['https://img.usecurling.com/p/600/800?q=hoodie'],
    category: 'Casual',
  },
]

export const MOCK_TEAM_PRODUCTS: TeamProduct[] = [
  // Gálatas Jiu-Jitsu Catalog
  {
    id: 'tp_galatas_1',
    teamId: 't1',
    productId: 'p1', // Modelo Oversized
    price: 129.9,
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    colors: ['Off White'],
    inStock: true,
    customizationFields: [],
  },
  {
    id: 'tp_galatas_2',
    teamId: 't1',
    productId: 'p2', // Camiseta Algodão Básica
    price: 79.9,
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    colors: ['Preto', 'Amarelo', 'Rosa', 'Azul', 'Verde'],
    inStock: true,
    customizationFields: [],
  },
  {
    id: 'tp_galatas_3',
    teamId: 't1',
    productId: 'p3', // Kimono
    price: 589.9,
    sizes: ['A0', 'A1', 'A2', 'A3', 'A4'],
    colors: ['Preto', 'Branco', 'Azul'],
    inStock: true,
    customizationFields: [{ id: 'c1', name: 'Nome Bordado', type: 'text', price: 45.0 }],
  },
  {
    id: 'tp_galatas_4',
    teamId: 't1',
    productId: 'p5', // Moletom
    price: 189.9,
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    colors: ['Preto', 'Off White'],
    inStock: true,
    customizationFields: [],
  },

  // Alpha JJ Catalog
  {
    id: 'tp_alpha_1',
    teamId: 't2',
    productId: 'p3',
    price: 620.0,
    sizes: ['A1', 'A2', 'A3'],
    colors: ['Branco', 'Azul'],
    inStock: true,
    customizationFields: [
      { id: 'c1', name: 'Nome Bordado', type: 'text', price: 40.0 },
      {
        id: 'c2',
        name: 'Patch da Equipe',
        type: 'select',
        options: ['Peito', 'Costas', 'Ambos'],
        price: 0,
      },
    ],
  },
  {
    id: 'tp_alpha_2',
    teamId: 't2',
    productId: 'p4',
    price: 160.0,
    sizes: ['P', 'M', 'G'],
    colors: ['Preto'],
    inStock: true,
    customizationFields: [],
  },

  // Bravo Team Catalog
  {
    id: 'tp_bravo_1',
    teamId: 't3',
    productId: 'p3',
    price: 499.9,
    sizes: ['A0', 'A1', 'A2', 'A3'],
    colors: ['Branco', 'Preto'],
    inStock: true,
    customizationFields: [{ id: 'c1', name: 'Nome Bordado', type: 'text', price: 35.0 }],
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
        teamProductId: 'tp_galatas_1',
        productName: 'Modelo Oversized Off White',
        teamName: 'Gálatas Jiu-Jitsu',
        price: 129.9,
        quantity: 1,
        size: 'G',
        color: 'Off White',
        customizations: {},
        image: 'https://img.usecurling.com/p/400/500?q=white%20oversized%20tshirt',
      },
    ],
    total: 129.9,
    paymentStatus: 'PAID',
    productionStatus: 'PRODUCTION',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]
