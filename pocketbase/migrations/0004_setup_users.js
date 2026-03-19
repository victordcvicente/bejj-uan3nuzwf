migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('users')

    if (!collection.fields.getByName('role')) {
      collection.fields.add(
        new SelectField({
          name: 'role',
          values: ['ADMIN', 'GYM_OWNER', 'USER'],
          maxSelect: 1,
        }),
      )
    }

    if (!collection.fields.getByName('name')) {
      collection.fields.add(
        new TextField({
          name: 'name',
        }),
      )
    }

    collection.listRule = "@request.auth.id != ''"
    collection.viewRule = "@request.auth.id != ''"
    // Fix for invalid rule left operand "@request.data.role"
    collection.createRule = ''
    collection.updateRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    collection.deleteRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('users')

    collection.listRule = null
    collection.viewRule = null
    collection.createRule = null
    collection.updateRule = null
    collection.deleteRule = null

    app.save(collection)
  },
)
