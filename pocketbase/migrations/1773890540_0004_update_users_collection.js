migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    // Fix invalid left operand error by using @request.body.role instead of @request.data.role
    usersCol.createRule =
      "@request.auth.id = '' || @request.auth.role = 'ADMIN' || @request.body.role = 'STUDENT'"

    // Set basic safe rules if they weren't set
    if (!usersCol.listRule) usersCol.listRule = "@request.auth.id != ''"
    if (!usersCol.viewRule) usersCol.viewRule = "@request.auth.id != ''"
    if (!usersCol.updateRule)
      usersCol.updateRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    if (!usersCol.deleteRule)
      usersCol.deleteRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"

    app.save(usersCol)
  },
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    usersCol.createRule = ''

    app.save(usersCol)
  },
)
