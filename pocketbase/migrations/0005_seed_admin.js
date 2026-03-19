migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    let record
    try {
      record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
    } catch {
      record = new Record(users)
      record.setEmail('admin@bejj.com.br')
    }

    record.setPassword('123456')
    record.setVerified(true)
    record.set('role', 'ADMIN')
    record.set('name', 'Administrador')

    app.saveNoValidate(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(record)
    } catch (e) {}
  },
)
