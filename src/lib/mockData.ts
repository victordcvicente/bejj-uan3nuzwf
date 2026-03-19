import { Team, Product, TeamProduct, Order } from '../types'

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    slug: 'galatas',
    name: 'Gálatas Jiu-Jitsu',
    logo: 'https://img.usecurling.com/i?q=lion&color=solid-black&shape=fill',
    primaryColor: 'bg-neutral-900',
    coverImage: 'https://img.usecurling.com/p/1200/400?q=jiu%20jitsu%20training%20gym&color=black',
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Camiseta Regular 100% Algodão',
    description: 'Camiseta premium de modelagem regular versátil para uso casual.',
    images: [
      'https://img.usecurling.com/p/600/800?q=black%20tshirt%20model&seed=1',
      'https://img.usecurling.com/p/600/800?q=white%20tshirt%20model&seed=2',
    ],
    category: 'Vestuário',
  },
  {
    id: 'p2',
    name: 'Camiseta Oversized',
    description: 'Modelagem ampla com estética contemporânea e lifestyle.',
    images: ['https://img.usecurling.com/p/600/800?q=white%20oversized%20tshirt&seed=3'],
    category: 'Vestuário',
  },
  {
    id: 'p3',
    name: 'Moletom Canguru',
    description: 'Blusa com bolso frontal e proposta premium esportiva.',
    images: ['https://img.usecurling.com/p/600/800?q=black%20hoodie&seed=4'],
    category: 'Vestuário',
  },
  {
    id: 'p4',
    name: 'Garrafa Inox Térmica Premium',
    description: 'Garrafa inox com parede dupla, proposta premium e personalização.',
    images: ['https://img.usecurling.com/p/600/800?q=thermos%20bottle&seed=5'],
    category: 'Acessórios',
  },
]

const apparelCustomizations = [
  {
    id: 'c1',
    name: 'modelo_personalizacao',
    label: 'Modelo da personalização',
    type: 'select' as const,
    options: ['Galatas', 'Galatas King', 'Kataguruma'],
    required: true,
    price: 0,
  },
  {
    id: 'c2',
    name: 'cor_personalizacao',
    label: 'Cor da personalização',
    type: 'select' as const,
    options: ['Amarelo', 'Rosa', 'Verde', 'Azul'],
    required: true,
    price: 0,
  },
]

export const MOCK_TEAM_PRODUCTS: TeamProduct[] = [
  {
    id: 'tp1',
    teamId: 't1',
    productId: 'p1',
    price: 89.9,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Branco', 'Offwhite'],
    inStock: true,
    customizationFields: apparelCustomizations,
  },
  {
    id: 'tp2',
    teamId: 't1',
    productId: 'p2',
    price: 99.9,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Branco', 'Offwhite'],
    inStock: true,
    customizationFields: apparelCustomizations,
  },
  {
    id: 'tp3',
    teamId: 't1',
    productId: 'p3',
    price: 169.9,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Branco', 'Offwhite'],
    inStock: true,
    customizationFields: apparelCustomizations,
  },
  {
    id: 'tp4',
    teamId: 't1',
    productId: 'p4',
    price: 129.9,
    sizes: [],
    colors: ['Branco'],
    inStock: true,
    customizationFields: [
      {
        id: 'c4_1',
        name: 'nome_garrafa',
        label: 'Nome na garrafa',
        type: 'text' as const,
        required: true,
        price: 0,
      },
      {
        id: 'c4_2',
        name: 'cor_faixa',
        label: 'Cor da Faixa',
        type: 'select' as const,
        options: ['Branca', 'Azul', 'Marrom', 'Preta'],
        required: true,
        price: 0,
      },
      {
        id: 'c4_3',
        name: 'grau_faixa',
        label: 'Grau da Faixa (Apenas Preta)',
        type: 'select' as const,
        options: ['I', 'II', 'IV'],
        required: true,
        price: 0,
      },
    ],
  },
]

export const MOCK_ORDERS: Order[] = []
