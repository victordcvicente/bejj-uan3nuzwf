migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('gyms')
    if (!col.fields.getByName('email')) {
      col.fields.add(new EmailField({ name: 'email' }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('gyms')
    col.fields.removeByName('email')
    app.save(col)
  },
)
