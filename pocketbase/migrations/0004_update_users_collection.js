migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')

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
    if (!col.fields.getByName('teamId')) {
      const teamsCol = app.findCollectionByNameOrId('teams')
      col.fields.add(new RelationField({ name: 'teamId', collectionId: teamsCol.id, maxSelect: 1 }))
    }
    if (!col.fields.getByName('gymId')) {
      const gymsCol = app.findCollectionByNameOrId('gyms')
      col.fields.add(new RelationField({ name: 'gymId', collectionId: gymsCol.id, maxSelect: 1 }))
    }
    if (!col.fields.getByName('professor')) {
      col.fields.add(new TextField({ name: 'professor' }))
    }

    col.listRule = "@request.auth.role = 'ADMIN' || id = @request.auth.id"
    col.viewRule = "@request.auth.role = 'ADMIN' || id = @request.auth.id"
    col.updateRule = "@request.auth.role = 'ADMIN' || id = @request.auth.id"
    col.createRule =
      "@request.data.role = 'STUDENT' || @request.data.role = '' || @request.auth.role = 'ADMIN'"
    col.deleteRule = "@request.auth.role = 'ADMIN' || id = @request.auth.id"

    app.save(col)

    try {
      const adminRecord = app.findAuthRecordByEmail('_pb_users_auth_', 'victor.dcvicente@gmail.com')
      adminRecord.set('role', 'ADMIN')
      app.save(adminRecord)
    } catch (e) {
      const record = new Record(col)
      record.setEmail('victor.dcvicente@gmail.com')
      record.setPassword('admin123456')
      record.setVerified(true)
      record.set('name', 'Administrador')
      record.set('role', 'ADMIN')
      app.save(record)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')
    if (col.fields.getByName('role')) col.fields.removeByName('role')
    if (col.fields.getByName('phone')) col.fields.removeByName('phone')
    if (col.fields.getByName('cpf')) col.fields.removeByName('cpf')
    if (col.fields.getByName('teamId')) col.fields.removeByName('teamId')
    if (col.fields.getByName('gymId')) col.fields.removeByName('gymId')
    if (col.fields.getByName('professor')) col.fields.removeByName('professor')
    app.save(col)
  },
)
