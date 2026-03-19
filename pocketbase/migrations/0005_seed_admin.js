migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('users')

    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      existing.setPassword('123456')
      existing.setVerified(true)
      existing.set('role', 'ADMIN')
      existing.set('name', 'Administrador')
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
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
