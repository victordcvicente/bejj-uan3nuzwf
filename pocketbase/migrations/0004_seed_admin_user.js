migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    let updated = false

    // Garante que o campo 'role' existe
    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          values: ['ADMIN', 'PRODUCTION', 'PROFESSOR', 'STUDENT'],
          maxSelect: 1,
        }),
      )
      updated = true
    }

    // Tenta ajustar o tamanho mínimo da senha para 6 (padrão é 8) para aceitar "123456"
    const passField = users.fields.getByName('password')
    if (passField && passField.min > 6) {
      passField.min = 6
      updated = true
    }

    // Corrige regras antigas que possam conter a sintaxe defasada @request.data (PB < 0.23)
    // Substituindo por @request.body para evitar o erro "invalid left operand"
    if (users.createRule && users.createRule.includes('@request.data.')) {
      users.createRule = users.createRule.replace(/@request\.data\./g, '@request.body.')
      updated = true
    }
    if (users.updateRule && users.updateRule.includes('@request.data.')) {
      users.updateRule = users.updateRule.replace(/@request\.data\./g, '@request.body.')
      updated = true
    }

    // Libera as regras de acesso para o ADMIN gerenciar os outros usuários
    if (users.listRule !== "id = @request.auth.id || @request.auth.role = 'ADMIN'") {
      users.listRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
      users.viewRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
      users.updateRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
      users.deleteRule = "id = @request.auth.id || @request.auth.role = 'ADMIN'"
      updated = true
    }

    if (updated) {
      app.save(users)
    }

    // Verifica se o admin já existe e atualiza, caso contrário, cria
    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      if (existing) {
        existing.set('role', 'ADMIN')
        existing.setPassword('123456') // Atualiza a senha conforme solicitado
        app.save(existing)
        return
      }
    } catch (e) {}

    const record = new Record(users)
    record.setEmail('admin@bejj.com.br')
    record.setPassword('123456')
    record.setVerified(true)
    record.set('role', 'ADMIN')
    record.set('name', 'Administrador')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@bejj.com.br')
      if (record) {
        app.delete(record)
      }
    } catch (_) {}
  },
)
