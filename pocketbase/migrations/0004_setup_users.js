migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('users')

    if (!col.fields.getByName('role')) {
      col.fields.add(
        new SelectField({
          name: 'role',
          values: ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT'],
          maxSelect: 1,
        }),
      )
    }
    if (!col.fields.getByName('phone')) {
      col.fields.add(new TextField({ name: 'phone' }))
    }
    if (!col.fields.getByName('cpf')) {
      col.fields.add(new TextField({ name: 'cpf' }))
    }
    if (!col.fields.getByName('professor')) {
      col.fields.add(new TextField({ name: 'professor' }))
    }

    try {
      const teamsCol = app.findCollectionByNameOrId('teams')
      if (!col.fields.getByName('teamId')) {
        col.fields.add(
          new RelationField({ name: 'teamId', collectionId: teamsCol.id, maxSelect: 1 }),
        )
      }
    } catch (e) {}

    try {
      const gymsCol = app.findCollectionByNameOrId('gyms')
      if (!col.fields.getByName('gymId')) {
        col.fields.add(new RelationField({ name: 'gymId', collectionId: gymsCol.id, maxSelect: 1 }))
      }
    } catch (e) {}

    const passField = col.fields.getByName('password')
    if (passField && passField.min > 6) {
      passField.min = 6
    }
    if (col.passwordAuth && col.passwordAuth.minPasswordLength > 6) {
      col.passwordAuth.minPasswordLength = 6
    }

    col.listRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.viewRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.updateRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.deleteRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.createRule = ''

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('users')
    if (col.fields.getByName('role')) col.fields.removeByName('role')
    if (col.fields.getByName('phone')) col.fields.removeByName('phone')
    if (col.fields.getByName('cpf')) col.fields.removeByName('cpf')
    if (col.fields.getByName('teamId')) col.fields.removeByName('teamId')
    if (col.fields.getByName('gymId')) col.fields.removeByName('gymId')
    if (col.fields.getByName('professor')) col.fields.removeByName('professor')

    const passField = col.fields.getByName('password')
    if (passField) {
      passField.min = 8
    }

    app.save(col)
  },
)
