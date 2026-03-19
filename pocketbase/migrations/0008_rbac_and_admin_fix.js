migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    // Ensure password length is standard
    const passField = usersCol.fields.getByName('password')
    if (passField) {
      passField.min = 8
    }

    if (usersCol.passwordAuth) {
      usersCol.passwordAuth.minPasswordLength = 8
    }

    // Allow anyone to authenticate
    usersCol.authRule = ''

    // RBAC rules for users collection
    usersCol.listRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.viewRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.createRule = "@request.auth.role = 'ADMIN' || @request.auth.id = ''"
    usersCol.updateRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.deleteRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"

    // Ensure role field exists
    let roleField = usersCol.fields.getByName('role')
    if (!roleField) {
      usersCol.fields.add(
        new SelectField({
          name: 'role',
          maxSelect: 1,
          values: ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT'],
        }),
      )
    } else {
      roleField.values = ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT']
    }

    // Ensure gymId field exists for professors
    let gymIdField = usersCol.fields.getByName('gymId')
    if (!gymIdField) {
      try {
        const gymsCol = app.findCollectionByNameOrId('gyms')
        usersCol.fields.add(
          new RelationField({
            name: 'gymId',
            collectionId: gymsCol.id,
            maxSelect: 1,
          }),
        )
      } catch (e) {
        console.log('Gyms collection not found, skipping gymId relation')
      }
    }

    app.save(usersCol)

    // Remove existing admin to recreate it clean
    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(existing)
    } catch (e) {}

    // Create the new admin with compliant password
    const record = new Record(usersCol)
    record.setEmail('admin@bejj.com.br')
    record.set('username', 'adminbejj')
    record.setPassword('admin1234')
    record.setVerified(true)
    record.set('role', 'ADMIN')
    record.set('name', 'Administrador')

    // Generate tokenKey
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''
    for (let i = 0; i < 50; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    record.set('tokenKey', token)

    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(record)
    } catch (e) {}
  },
)
