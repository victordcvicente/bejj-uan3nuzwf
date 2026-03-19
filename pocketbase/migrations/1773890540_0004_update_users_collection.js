migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    // Fix invalid @request.data.role left operand by using @request.auth or standard rules
    usersCol.listRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.viewRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.createRule = "@request.auth.role = 'ADMIN' || @request.auth.id = ''"
    usersCol.updateRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.deleteRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"

    app.save(usersCol)
  },
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    usersCol.listRule = null
    usersCol.viewRule = null
    usersCol.createRule = null
    usersCol.updateRule = null
    usersCol.deleteRule = null

    app.save(usersCol)
  },
)
