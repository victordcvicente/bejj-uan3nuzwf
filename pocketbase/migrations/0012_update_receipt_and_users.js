migrate(
  (app) => {
    // Update users collection API rules to allow ADMIN full access
    const users = app.findCollectionByNameOrId('users')
    users.listRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    users.viewRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    users.updateRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    users.deleteRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    app.save(users)

    // Update orders collection: replace text field with file field for receiptUrl
    const orders = app.findCollectionByNameOrId('orders')
    if (orders.fields.getByName('receiptUrl')) {
      orders.fields.removeByName('receiptUrl')
    }
    orders.fields.add(
      new FileField({
        name: 'receiptUrl',
        maxSelect: 1,
        maxSize: 10485760, // 10MB
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      }),
    )
    app.save(orders)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.listRule = 'id = @request.auth.id'
    users.viewRule = 'id = @request.auth.id'
    users.updateRule = 'id = @request.auth.id'
    users.deleteRule = 'id = @request.auth.id'
    app.save(users)

    const orders = app.findCollectionByNameOrId('orders')
    if (orders.fields.getByName('receiptUrl')) {
      orders.fields.removeByName('receiptUrl')
    }
    orders.fields.add(
      new TextField({
        name: 'receiptUrl',
      }),
    )
    app.save(orders)
  },
)
