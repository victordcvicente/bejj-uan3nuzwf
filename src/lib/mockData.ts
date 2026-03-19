import { Team, Product, TeamProduct, Order } from '../types'

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    slug: 'bejj-official',
    name: 'BEJJ Official',
    logo: 'https://img.usecurling.com/i?q=letter%20b&color=black&shape=fill',
    primaryColor: 'bg-zinc-900',
    coverImage: 'https://img.usecurling.com/p/1200/400?q=jiu%20jitsu%20training&color=black',
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
    logo: 'https://img.usecurling.com/i?q=lion&color=orange&shape=outline',
    primaryColor: 'bg-amber-600',
    coverImage: 'https://img.usecurling.com/p/1200/400?q=martial%20arts&color=orange',
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Kimono BEJJ Pro Series',
    description:
      'Kimono de alta performance, trançado super resistente (450 GSM) e modelagem fit. Ideal para competições e treinos intensos.',
    images: [
      'https://img.usecurling.com/p/600/800?q=white%20kimono',
      'https://img.usecurling.com/p/600/800?q=bjj%20gi',
    ],
    category: 'Kimono',
  },
  {
    id: 'p2',
    name: 'Kimono BEJJ Light',
    description:
      'Leve e confortável, trançado de 350 GSM. Perfeito para bater o peso e treinos em dias quentes.',
    images: ['https://img.usecurling.com/p/600/800?q=blue%20kimono'],
    category: 'Kimono',
  },
  {
    id: 'p3',
    name: 'Rashguard BEJJ Elite No-Gi',
    description:
      'Rashguard com tecnologia de compressão, proteção UV e controle térmico. Estampa sublimada de alta durabilidade.',
    images: ['https://img.usecurling.com/p/600/800?q=rashguard%20shirt'],
    category: 'No-Gi',
  },
  {
    id: 'p4',
    name: 'Bermuda de Combate BEJJ',
    description: 'Bermuda leve com tecido flexível entre as pernas para máxima mobilidade.',
    images: ['https://img.usecurling.com/p/600/800?q=mma%20shorts'],
    category: 'No-Gi',
  },
  {
    id: 'p5',
    name: 'Camiseta BEJJ Lifestyle',
    description: 'Algodão premium penteado. Conforto e estilo para o dia a dia.',
    images: ['https://img.usecurling.com/p/600/800?q=black%20tshirt'],
    category: 'Casual',
  },
  {
    id: 'p6',
    name: 'Moletom BEJJ Essential',
    description: 'Moletom canguru peluciado por dentro, com capuz e bolso frontal.',
    images: ['https://img.usecurling.com/p/600/800?q=hoodie'],
    category: 'Casual',
  },
  {
    id: 'p7',
    name: 'Faixa Premium BEJJ',
    description:
      'Faixa com 6 costuras reforçadas, super grossa e com ponta preta/vermelha para graus.',
    images: ['https://img.usecurling.com/p/600/800?q=martial%20arts%20belt'],
    category: 'Acessórios',
  },
  {
    id: 'p8',
    name: 'Mochila Transversal BEJJ',
    description:
      'Mochila prática para levar o kimono e acessórios de treino. Material impermeável.',
    images: ['https://img.usecurling.com/p/600/800?q=sports%20backpack'],
    category: 'Acessórios',
  },
]

export const MOCK_TEAM_PRODUCTS: TeamProduct[] = [
  // BEJJ Official Catalog (All products, base prices)
  ...MOCK_PRODUCTS.map((p, index) => ({
    id: `tp_bejj_${index}`,
    teamId: 't1',
    productId: p.id,
    price:
      p.category === 'Kimono'
        ? 589.9
        : p.category === 'No-Gi'
          ? 149.9
          : p.category === 'Casual'
            ? 119.9
            : 89.9,
    sizes: p.category === 'Kimono' ? ['A0', 'A1', 'A2', 'A3', 'A4'] : ['P', 'M', 'G', 'GG', 'XG'],
    colors: ['Preto', 'Branco', 'Azul'],
    inStock: true,
    customizationFields:
      p.category === 'Kimono'
        ? [{ id: 'c1', name: 'Nome Bordado', type: 'text' as const, price: 45.0 }]
        : [],
  })),

  // Alpha JJ Catalog (Selected products, custom pricing/patches)
  {
    id: 'tp_alpha_1',
    teamId: 't2',
    productId: 'p1',
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
    productId: 'p3',
    price: 160.0,
    sizes: ['P', 'M', 'G'],
    colors: ['Preto'],
    inStock: true,
    customizationFields: [],
  },
  {
    id: 'tp_alpha_3',
    teamId: 't2',
    productId: 'p7',
    price: 95.0,
    sizes: ['A1', 'A2', 'A3', 'A4'],
    colors: ['Branco', 'Azul', 'Roxa', 'Marrom', 'Preta'],
    inStock: true,
    customizationFields: [],
  },

  // Bravo Team Catalog
  {
    id: 'tp_bravo_1',
    teamId: 't3',
    productId: 'p2',
    price: 499.9,
    sizes: ['A0', 'A1', 'A2', 'A3'],
    colors: ['Branco', 'Preto'],
    inStock: true,
    customizationFields: [{ id: 'c1', name: 'Nome Bordado', type: 'text', price: 35.0 }],
  },
  {
    id: 'tp_bravo_2',
    teamId: 't3',
    productId: 'p5',
    price: 89.9,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Cinza'],
    inStock: false,
    customizationFields: [],
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
        teamProductId: 'tp_bejj_0',
        productName: 'Kimono BEJJ Pro Series',
        teamName: 'BEJJ Official',
        price: 589.9,
        quantity: 1,
        size: 'A2',
        color: 'Branco',
        customizations: { 'Nome Bordado': 'João S.' },
        image: 'https://img.usecurling.com/p/400/500?q=white%20kimono',
      },
    ],
    total: 634.9,
    paymentStatus: 'PAID',
    productionStatus: 'PRODUCTION',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]
