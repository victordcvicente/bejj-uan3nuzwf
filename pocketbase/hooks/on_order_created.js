onRecordAfterCreateSuccess((e) => {
  try {
    const order = e.record
    const gymId = order.get('gymId')
    // Adicionado e-mail do solicitante para todas as notificações
    const emailsToNotify = ['bejj@bejj.com.br', 'victor.dcvicente@gmail.com']

    if (gymId) {
      try {
        const gym = $app.findRecordById('gyms', gymId)
        const gymEmail = gym.get('email')
        if (gymEmail) {
          emailsToNotify.push(gymEmail)
        }
      } catch (err) {
        console.log('Aviso: Academia não encontrada para o pedido', gymId)
      }
    }

    console.log(`[NOTIFICAÇÃO DE PEDIDO] Novo pedido ${order.id} efetuado com sucesso!`)
    console.log(
      `[EMAIL DISPARADO] Enviando comprovante e detalhes para: ${emailsToNotify.join(', ')}`,
    )

    // Aqui seria integrado o envio real via $http.send para uma API de mensageria (ex: SendGrid, Resend)
    /*
    $http.send({
      url: "https://api.resend.com/emails",
      method: "POST",
      headers: { 
        "Authorization": "Bearer " + $secrets.get("RESEND_API_KEY"), 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        from: "pedidos@bejj.com.br",
        to: emailsToNotify,
        subject: "Novo Pedido Recebido - BEJJ",
        html: `<p>Um novo pedido foi recebido em nossa plataforma.</p>`
      })
    });
    */
  } catch (err) {
    console.log('Erro ao processar disparo de e-mails do pedido:', err)
  }
  e.next()
}, 'orders')
