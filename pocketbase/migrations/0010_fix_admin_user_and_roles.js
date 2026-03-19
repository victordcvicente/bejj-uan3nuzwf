migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('users')

    // Regras de acesso e segurança
    usersCol.listRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.viewRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.createRule = ''
    usersCol.updateRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"
    usersCol.deleteRule = "@request.auth.id = id || @request.auth.role = 'ADMIN'"

    // Adiciona campo role se não existir
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

    // Remove administrador existente para garantir criação limpa (previne falhas de unique constraint)
    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      app.delete(existing)
    } catch (e) {}

    // Cria conta de administrador com todos os requisitos
    const record = new Record(usersCol)
    record.setEmail('admin@bejj.com.br')

    // Tenta setar username se a versão do PocketBase suportar
    try {
      record.setUsername('adminbejj')
    } catch (err) {}

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
