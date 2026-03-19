migrate(
  (app) => {
    const teamsCol = app.findCollectionByNameOrId('teams')
    const t1 = new Record(teamsCol)
    t1.set('name', 'Gálatas BJJ')
    t1.set('slug', 'galatas')
    t1.set('logo', 'https://img.usecurling.com/i?q=galatas')
    t1.set('primaryColor', 'bg-neutral-900')
    t1.set(
      'coverImage',
      'https://img.usecurling.com/p/1200/400?q=jiu%20jitsu%20training%20gym&color=black',
    )
    t1.set(
      'description',
      'A arte suave levada a sério. Junte-se à nossa equipe e tenha acesso a produtos exclusivos com a nossa marca.',
    )
    app.save(t1)

    const gymsCol = app.findCollectionByNameOrId('gyms')
    const g1 = new Record(gymsCol)
    g1.set('name', 'Gálatas - Matriz')
    g1.set('teamId', t1.id)
    g1.set('address', 'Av. das Lutas, 100 - Centro')
    app.save(g1)

    const g2 = new Record(gymsCol)
    g2.set('name', 'Gálatas - Filial Sul')
    g2.set('teamId', t1.id)
    g2.set('address', 'Rua do Tatame, 450 - Zona Sul')
    app.save(g2)

    const g3 = new Record(gymsCol)
    g3.set('name', 'Gálatas - Filial Norte')
    g3.set('teamId', t1.id)
    g3.set('address', 'Av. dos Campeões, 900 - Zona Norte')
    app.save(g3)

    const prodCol = app.findCollectionByNameOrId('products')

    const p1 = new Record(prodCol)
    p1.set('name', 'Camiseta Regular 100% Algodão')
    p1.set('description', 'Camiseta premium de modelagem regular versátil para uso casual.')
    p1.set('images', [
      'https://img.usecurling.com/p/600/800?q=black%20tshirt%20model&seed=1',
      'https://img.usecurling.com/p/600/800?q=white%20tshirt%20model&seed=2',
    ])
    p1.set('category', 'Vestuário')
    app.save(p1)

    const p2 = new Record(prodCol)
    p2.set('name', 'Camiseta Oversized')
    p2.set('description', 'Modelagem ampla com estética contemporânea e lifestyle.')
    p2.set('images', ['https://img.usecurling.com/p/600/800?q=white%20oversized%20tshirt&seed=3'])
    p2.set('category', 'Vestuário')
    app.save(p2)

    const p3 = new Record(prodCol)
    p3.set('name', 'Moletom Canguru')
    p3.set('description', 'Blusa com bolso frontal e proposta premium esportiva.')
    p3.set('images', ['https://img.usecurling.com/p/600/800?q=black%20hoodie&seed=4'])
    p3.set('category', 'Vestuário')
    app.save(p3)

    const p4 = new Record(prodCol)
    p4.set('name', 'Garrafa Inox Térmica Premium')
    p4.set('description', 'Garrafa inox com parede dupla, proposta premium e personalização.')
    p4.set('images', ['https://img.usecurling.com/p/600/800?q=thermos%20bottle&seed=5'])
    p4.set('category', 'Acessórios')
    app.save(p4)

    const tpCol = app.findCollectionByNameOrId('team_products')

    const apparelCustomizations = [
      {
        id: 'c1',
        name: 'modelo_personalizacao',
        label: 'Modelo da personalização',
        type: 'select',
        options: ['Galatas', 'Galatas King', 'Kataguruma'],
        required: true,
        price: 0,
      },
      {
        id: 'c2',
        name: 'cor_personalizacao',
        label: 'Cor da personalização',
        type: 'select',
        options: ['Amarelo', 'Rosa', 'Verde', 'Azul'],
        required: true,
        price: 0,
      },
    ]

    const tp1 = new Record(tpCol)
    tp1.set('teamId', t1.id)
    tp1.set('productId', p1.id)
    tp1.set('price', 89.9)
    tp1.set('sizes', ['P', 'M', 'G', 'GG'])
    tp1.set('colors', ['Preto', 'Branco', 'Offwhite'])
    tp1.set('inStock', true)
    tp1.set('customizationFields', apparelCustomizations)
    app.save(tp1)

    const tp2 = new Record(tpCol)
    tp2.set('teamId', t1.id)
    tp2.set('productId', p2.id)
    tp2.set('price', 99.9)
    tp2.set('sizes', ['P', 'M', 'G', 'GG'])
    tp2.set('colors', ['Preto', 'Branco', 'Offwhite'])
    tp2.set('inStock', true)
    tp2.set('customizationFields', apparelCustomizations)
    app.save(tp2)

    const tp3 = new Record(tpCol)
    tp3.set('teamId', t1.id)
    tp3.set('productId', p3.id)
    tp3.set('price', 169.9)
    tp3.set('sizes', ['P', 'M', 'G', 'GG'])
    tp3.set('colors', ['Preto', 'Branco', 'Offwhite'])
    tp3.set('inStock', true)
    tp3.set('customizationFields', apparelCustomizations)
    app.save(tp3)

    const tp4 = new Record(tpCol)
    tp4.set('teamId', t1.id)
    tp4.set('productId', p4.id)
    tp4.set('price', 129.9)
    tp4.set('sizes', [])
    tp4.set('colors', ['Branco', 'Preto'])
    tp4.set('inStock', true)
    tp4.set('customizationFields', [
      {
        id: 'c4_1',
        name: 'nome_garrafa',
        label: 'Nome na garrafa',
        type: 'text',
        required: true,
        price: 0,
      },
      {
        id: 'c4_2',
        name: 'cor_faixa',
        label: 'Cor da Faixa',
        type: 'select',
        options: ['Branca', 'Azul', 'Marrom', 'Preta'],
        required: true,
        price: 0,
      },
      {
        id: 'c4_3',
        name: 'grau_faixa',
        label: 'Grau da Faixa (Apenas Preta)',
        type: 'select',
        options: ['I', 'II', 'III', 'IV'],
        required: true,
        price: 0,
      },
    ])
    app.save(tp4)
  },
  (app) => {
    const collections = ['team_products', 'products', 'gyms', 'teams']
    for (const c of collections) {
      try {
        const records = app.findRecordsByFilter(c, '1=1', '', 100, 0)
        for (const r of records) app.delete(r)
      } catch (e) {}
    }
  },
)
