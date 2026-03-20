migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.listRule = "id = @request.auth.id || @request.auth.role = 'ADMIN' || role = 'PROFESSOR'"
    users.viewRule = "id = @request.auth.id || @request.auth.role = 'ADMIN' || role = 'PROFESSOR'"
    app.save(users)

    const teams = app.findCollectionByNameOrId('teams')
    if (!teams.fields.getByName('professors')) {
      teams.fields.add(
        new RelationField({
          name: 'professors',
          collectionId: users.id,
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null, // allows multiple
        }),
      )
    }
    app.save(teams)
  },
  (app) => {
    const teams = app.findCollectionByNameOrId('teams')
    if (teams.fields.getByName('professors')) {
      teams.fields.removeByName('professors')
    }
    app.save(teams)

    const users = app.findCollectionByNameOrId('users')
    users.listRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    users.viewRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    app.save(users)
  },
)
