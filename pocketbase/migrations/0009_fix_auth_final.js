migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    // Permite que qualquer um tente se autenticar
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

    app.save(usersCol)

    // Remove existing admin to recreate it clean
    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(existing)
    } catch (e) {}

    // Create the new admin with compliant password
    const record = new Record(usersCol)
    record.setEmail('admin@bejj.com.br')
    record.setPassword('admin1234')
    record.setVerified(true)
    record.set('role', 'ADMIN')
    record.set('name', 'Administrador')

    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(record)
    } catch (e) {}
  },
)
