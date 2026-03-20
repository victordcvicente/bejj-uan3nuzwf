migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    const teams = app.findCollectionByNameOrId('teams')

    if (!users.fields.getByName('teams')) {
      users.fields.add(
        new RelationField({
          name: 'teams',
          collectionId: teams.id,
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
        }),
      )
    }
    app.save(users)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    if (users.fields.getByName('teams')) {
      users.fields.removeByName('teams')
    }
    app.save(users)
  },
)
