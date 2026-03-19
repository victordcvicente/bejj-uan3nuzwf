migrate(
  (app) => {
    const teams = new Collection({
      name: 'teams',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'logo', type: 'text' },
        { name: 'primaryColor', type: 'text' },
        { name: 'coverImage', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(teams)

    const gyms = new Collection({
      name: 'gyms',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'teamId', type: 'relation', collectionId: teams.id, maxSelect: 1 },
        { name: 'address', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(gyms)

    const products = new Collection({
      name: 'products',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'images', type: 'json' },
        { name: 'category', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(products)

    const teamProducts = new Collection({
      name: 'team_products',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'teamId', type: 'relation', collectionId: teams.id, maxSelect: 1 },
        { name: 'productId', type: 'relation', collectionId: products.id, maxSelect: 1 },
        { name: 'price', type: 'number' },
        { name: 'sizes', type: 'json' },
        { name: 'colors', type: 'json' },
        { name: 'models', type: 'json' },
        { name: 'inStock', type: 'bool' },
        { name: 'customizationFields', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(teamProducts)

    const orders = new Collection({
      name: 'orders',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'userId', type: 'text' },
        { name: 'customerName', type: 'text' },
        { name: 'customerEmail', type: 'text' },
        { name: 'customerCpf', type: 'text' },
        { name: 'teamId', type: 'relation', collectionId: teams.id, maxSelect: 1 },
        { name: 'gymId', type: 'relation', collectionId: gyms.id, maxSelect: 1 },
        { name: 'items', type: 'json' },
        { name: 'total', type: 'number' },
        { name: 'paymentStatus', type: 'text' },
        { name: 'productionStatus', type: 'text' },
        { name: 'receiptUrl', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(orders)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('orders'))
      app.delete(app.findCollectionByNameOrId('team_products'))
      app.delete(app.findCollectionByNameOrId('products'))
      app.delete(app.findCollectionByNameOrId('gyms'))
      app.delete(app.findCollectionByNameOrId('teams'))
    } catch (e) {
      // ignore
    }
  },
)
