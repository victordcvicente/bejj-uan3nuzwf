migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('users')

    // Set correct access rules. @request.data is invalid in PocketBase, use @request.body if needed.
    // For create rule, we keep it empty to allow user registration.
    col.createRule = ''
    col.updateRule = '@request.auth.id = id'
    col.viewRule = "@request.auth.id != ''"
    col.listRule = "@request.auth.id != ''"

    if (!col.fields.getByName('role')) {
      col.fields.add(
        new SelectField({
          name: 'role',
          values: ['ADMIN', 'GYM_OWNER', 'ATHLETE'],
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('name')) {
      col.fields.add(
        new TextField({
          name: 'name',
        }),
      )
    }

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('users')

    col.createRule = null
    col.updateRule = null
    col.viewRule = null
    col.listRule = null

    app.save(col)
  },
)
