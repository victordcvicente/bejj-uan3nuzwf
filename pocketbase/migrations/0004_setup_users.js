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

    if (!col.fields.getByName('professor')) {
      col.fields.add(new TextField({ name: 'professor' }))
    }

    const passField = col.fields.getByName('password')
    if (passField && passField.min > 6) {
      passField.min = 6
    }

    // Use @request.body instead of @request.data for PocketBase v0.23+
    col.listRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.viewRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.updateRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.deleteRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    col.createRule = ''

    app.save(col)

    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      existing.setPassword('123456')
      existing.set('role', 'ADMIN')
      app.save(existing)
    } catch (e) {
      const record = new Record(col)
      record.setEmail('admin@bejj.com.br')
      record.setPassword('123456')
      record.setVerified(true)
      record.set('role', 'ADMIN')
      record.set('name', 'Administrador')
      app.save(record)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('users')
    if (col.fields.getByName('role')) col.fields.removeByName('role')
    if (col.fields.getByName('phone')) col.fields.removeByName('phone')
    if (col.fields.getByName('cpf')) col.fields.removeByName('cpf')
    if (col.fields.getByName('teamId')) col.fields.removeByName('teamId')
    if (col.fields.getByName('gymId')) col.fields.removeByName('gymId')
    if (col.fields.getByName('professor')) col.fields.removeByName('professor')
    app.save(col)

    try {
      const record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
