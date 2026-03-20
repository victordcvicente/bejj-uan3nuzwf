migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    const orders = app.findCollectionByNameOrId('orders')

    if (!orders.fields.getByName('professorId')) {
      orders.fields.add(
        new RelationField({
          name: 'professorId',
          collectionId: users.id,
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
        }),
      )
    }
    app.save(orders)
  },
  (app) => {
    const orders = app.findCollectionByNameOrId('orders')
    if (orders.fields.getByName('professorId')) {
      orders.fields.removeByName('professorId')
    }
    app.save(orders)
  },
)
