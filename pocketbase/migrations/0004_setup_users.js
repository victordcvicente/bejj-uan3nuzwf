migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    // Set explicit rules for robust access control (RBAC)
    users.listRule =
      "id = @request.auth.id || @request.auth.role = 'ADMIN' || @request.auth.role = 'PRODUCTION' || @request.auth.role = 'PROFESSOR'"
    users.viewRule =
      "id = @request.auth.id || @request.auth.role = 'ADMIN' || @request.auth.role = 'PRODUCTION' || @request.auth.role = 'PROFESSOR'"
    users.createRule = '' // allow public registration
    users.updateRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
    users.deleteRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"

    // Ensure role field exists and is standard
    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          values: ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT'],
          maxSelect: 1,
        }),
      )
    } else {
      const roleField = users.fields.getByName('role')
      roleField.values = ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT']
    }

    // Related Fields
    if (!users.fields.getByName('cpf')) {
      users.fields.add(new TextField({ name: 'cpf' }))
    }

    if (!users.fields.getByName('phone')) {
      users.fields.add(new TextField({ name: 'phone' }))
    }

    if (!users.fields.getByName('name')) {
      users.fields.add(new TextField({ name: 'name' }))
    }

    // gymId Relation
    if (!users.fields.getByName('gymId')) {
      try {
        const gyms = app.findCollectionByNameOrId('gyms')
        users.fields.add(
          new RelationField({
            name: 'gymId',
            collectionId: gyms.id,
            maxSelect: 1,
          }),
        )
      } catch (e) {
        console.log('Gyms collection not found yet, skipping gymId relation')
      }
    }

    app.save(users)

    // Wipe previous admin to ensure a clean slate and correct config
    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(existing)
    } catch (e) {}

    // Reinstate Admin Root Account
    const admin = new Record(users)
    admin.setEmail('admin@bejj.com.br')
    admin.set('username', 'adminbejj')
    admin.setPassword('admin1234')
    admin.setVerified(true)
    admin.set('role', 'ADMIN')
    admin.set('name', 'Administrador Global')

    app.save(admin)
  },
  (app) => {
    // no rollback required
  },
)
