onRecordCreateRequest((e) => {
  const isSuperuser = e.hasSuperuserAuth()
  const isAuthAdmin = e.auth && e.auth.get('role') === 'ADMIN'

  // Garante que qualquer cadastro via API pública crie um aluno
  if (!isSuperuser && !isAuthAdmin) {
    e.record.set('role', 'STUDENT')
  }
  e.next()
}, 'users')

onRecordUpdateRequest((e) => {
  const isSuperuser = e.hasSuperuserAuth()
  const isAuthAdmin = e.auth && e.auth.get('role') === 'ADMIN'

  // Impede que usuários não administradores alterem sua própria role
  if (!isSuperuser && !isAuthAdmin) {
    const originalRole = e.record.originalCopy().get('role')
    e.record.set('role', originalRole)
  }
  e.next()
}, 'users')
