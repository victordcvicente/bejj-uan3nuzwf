migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    let roleField = users.fields.getByName('role')
    if (!roleField) {
      users.fields.add(
        new SelectField({
          name: 'role',
          maxSelect: 1,
          values: ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT'],
          required: true,
        }),
      )
    } else {
      roleField.values = ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT']
      roleField.required = true
      roleField.maxSelect = 1
    }

    app.save(users)

    // Set default role for existing users without a role
    try {
      const records = app.findRecordsByFilter('users', "role = ''", '-created', 10000, 0)
      for (let record of records) {
        record.set('role', 'STUDENT')
        app.saveNoValidate(record)
      }
    } catch (e) {
      console.log('Error updating legacy records', e)
    }

    // Ensure admin user exists and has the right role
    try {
      const admin = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      admin.set('role', 'ADMIN')
      app.saveNoValidate(admin)
    } catch (e) {
      const admin = new Record(users)
      admin.setEmail('admin@bejj.com.br')
      admin.setPassword('admin1234')
      admin.setVerified(true)
      admin.set('role', 'ADMIN')
      admin.set('name', 'Administrador')
      app.save(admin)
    }
  },
  (app) => {},
)
