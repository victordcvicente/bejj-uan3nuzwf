migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('users')

    // Garantir que a regra de autenticação permita o login livremente.
    if (col.type === 'auth') {
      col.authRule = ''

      try {
        if (col.passwordAuth) {
          col.passwordAuth.minPasswordLength = 6
        }
      } catch (e) {}
    }

    // Forçar min=6 na definição do campo
    const passField = col.fields.getByName('password')
    if (passField) {
      passField.min = 6
    }

    app.save(col)

    let record
    try {
      record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
    } catch (e) {
      record = new Record(col)
      record.setEmail('admin@bejj.com.br')
    }

    // Definir os dados corretos e certificar a validação com saveNoValidate
    record.setPassword('123456')
    record.setVerified(true)
    record.set('role', 'ADMIN')
    record.set('name', 'Administrador')

    app.saveNoValidate(record)
  },
  (app) => {
    // no-op
  },
)
