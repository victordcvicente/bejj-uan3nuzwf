migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    // Role field is not yet created at this point, so keep rules simple.
    // Complex RBAC rules are added in later migrations once the field exists.
    usersCol.createRule = ''

    // Set basic safe rules if they weren't set
    if (!usersCol.listRule) usersCol.listRule = "@request.auth.id != ''"
    if (!usersCol.viewRule) usersCol.viewRule = "@request.auth.id != ''"
    if (!usersCol.updateRule) usersCol.updateRule = 'id = @request.auth.id'
    if (!usersCol.deleteRule) usersCol.deleteRule = 'id = @request.auth.id'

    app.save(usersCol)
  },
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    usersCol.createRule = ''

    app.save(usersCol)
  },
)
