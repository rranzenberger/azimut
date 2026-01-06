// azimut-cms/src/lib/notifications.ts
// Sistema de notificações para leads quentes

export interface LeadNotification {
  leadId: string
  leadName: string
  leadEmail: string
  company?: string
  conversionScore?: number
  visitorType?: string
  urgency: 'HOT' | 'WARM' | 'QUALIFIED'
  message: string
  timestamp: Date
}

/**
 * Envia notificação via Slack Webhook
 */
export async function sendSlackNotification(notification: LeadNotification): Promise<boolean> {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!slackWebhookUrl) {
    console.warn('⚠️ SLACK_WEBHOOK_URL não configurado. Notificação ignorada.')
    return false
  }

  try {
    const emoji = notification.urgency === 'HOT' ? '🔥' : notification.urgency === 'WARM' ? '🌡️' : '✨'
    const color = notification.urgency === 'HOT' ? '#c92337' : notification.urgency === 'WARM' ? '#e67e22' : '#3498db'

    const payload = {
      text: `${emoji} *NOVO LEAD ${notification.urgency}!*`,
      attachments: [
        {
          color,
          fields: [
            {
              title: 'Nome',
              value: notification.leadName,
              short: true,
            },
            {
              title: 'Email',
              value: notification.leadEmail,
              short: true,
            },
            {
              title: 'Empresa',
              value: notification.company || 'Não informado',
              short: true,
            },
            {
              title: 'Score de Conversão',
              value: notification.conversionScore ? `${notification.conversionScore}%` : 'N/A',
              short: true,
            },
            {
              title: 'Tipo de Visitante',
              value: notification.visitorType || 'Desconhecido',
              short: false,
            },
            {
              title: 'Mensagem',
              value: notification.message,
              short: false,
            },
          ],
          footer: 'Azimut CMS - Lead Notification',
          ts: Math.floor(notification.timestamp.getTime() / 1000),
        },
      ],
    }

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`)
    }

    console.log('✅ Notificação Slack enviada com sucesso!')
    return true
  } catch (error) {
    console.error('❌ Erro ao enviar notificação Slack:', error)
    return false
  }
}

/**
 * Envia notificação via Email
 */
export async function sendEmailNotification(notification: LeadNotification): Promise<boolean> {
  const emailApiKey = process.env.SENDGRID_API_KEY || process.env.RESEND_API_KEY
  const emailProvider = process.env.EMAIL_PROVIDER || 'sendgrid' // 'sendgrid' ou 'resend'
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'contact@azimut.com'

  if (!emailApiKey) {
    console.warn('⚠️ Email API Key não configurado. Notificação ignorada.')
    return false
  }

  try {
    const emoji = notification.urgency === 'HOT' ? '🔥' : notification.urgency === 'WARM' ? '🌡️' : '✨'
    const subject = `${emoji} NOVO LEAD ${notification.urgency}: ${notification.leadName}`

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
          .container { background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
          .header { background-color: ${notification.urgency === 'HOT' ? '#c92337' : notification.urgency === 'WARM' ? '#e67e22' : '#3498db'}; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #333; }
          .field-value { color: #666; margin-top: 5px; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${emoji} NOVO LEAD ${notification.urgency}!</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Nome:</div>
              <div class="field-value">${notification.leadName}</div>
            </div>
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value"><a href="mailto:${notification.leadEmail}">${notification.leadEmail}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Empresa:</div>
              <div class="field-value">${notification.company || 'Não informado'}</div>
            </div>
            <div class="field">
              <div class="field-label">Score de Conversão:</div>
              <div class="field-value">${notification.conversionScore ? `${notification.conversionScore}%` : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Tipo de Visitante:</div>
              <div class="field-value">${notification.visitorType || 'Desconhecido'}</div>
            </div>
            <div class="field">
              <div class="field-label">Mensagem:</div>
              <div class="field-value">${notification.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Azimut CMS - Lead Notification System</p>
            <p>${new Date(notification.timestamp).toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </body>
      </html>
    `

    if (emailProvider === 'sendgrid') {
      // SendGrid API
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: notificationEmail }],
              subject,
            },
          ],
          from: { email: 'noreply@azimut.com', name: 'Azimut CMS' },
          content: [
            {
              type: 'text/html',
              value: htmlBody,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`SendGrid API error: ${response.statusText}`)
      }
    } else {
      // Resend API
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Azimut CMS <noreply@azimut.com>',
          to: [notificationEmail],
          subject,
          html: htmlBody,
        }),
      })

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.statusText}`)
      }
    }

    console.log('✅ Notificação por email enviada com sucesso!')
    return true
  } catch (error) {
    console.error('❌ Erro ao enviar notificação por email:', error)
    return false
  }
}

/**
 * Função principal: envia notificação quando um lead quente é detectado
 */
export async function notifyHotLead(notification: LeadNotification): Promise<void> {
  console.log(`📢 Notificando lead ${notification.urgency}: ${notification.leadName}`)

  const [slackResult, emailResult] = await Promise.allSettled([
    sendSlackNotification(notification),
    sendEmailNotification(notification),
  ])

  if (slackResult.status === 'fulfilled' && slackResult.value) {
    console.log('✅ Slack: OK')
  } else {
    console.warn('⚠️ Slack: FALHOU')
  }

  if (emailResult.status === 'fulfilled' && emailResult.value) {
    console.log('✅ Email: OK')
  } else {
    console.warn('⚠️ Email: FALHOU')
  }
}

/**
 * Envia email de confirmação para o CLIENTE que enviou o formulário
 */
export async function sendConfirmationEmail(data: {
  name: string
  email: string
  lang?: string
}): Promise<boolean> {
  const emailApiKey = process.env.SENDGRID_API_KEY || process.env.RESEND_API_KEY
  const emailProvider = process.env.EMAIL_PROVIDER || 'sendgrid'

  if (!emailApiKey) {
    console.warn('⚠️ Email API Key não configurado. Email de confirmação ignorado.')
    return false
  }

  try {
    const lang = data.lang || 'pt'
    
    // Traduções
    const translations: Record<string, any> = {
      pt: {
        subject: '✅ Mensagem recebida - Azimut',
        title: 'Obrigado pelo Contato!',
        greeting: `Olá, ${data.name}!`,
        message: 'Recebemos sua mensagem e nossa equipe entrará em contato em até 24 horas úteis.',
        whatHappens: 'O que acontece agora?',
        step1: 'Nossa equipe analisará sua solicitação',
        step2: 'Entraremos em contato para agendar uma conversa',
        step3: 'Apresentaremos uma proposta personalizada',
        footer: 'Enquanto isso, explore nosso portfólio',
        portfolioLink: 'Ver Projetos',
        signature: 'Equipe Azimut',
      },
      en: {
        subject: '✅ Message received - Azimut',
        title: 'Thank You for Contacting Us!',
        greeting: `Hello, ${data.name}!`,
        message: 'We have received your message and our team will get back to you within 24 business hours.',
        whatHappens: 'What happens now?',
        step1: 'Our team will review your request',
        step2: 'We will contact you to schedule a conversation',
        step3: 'We will present a customized proposal',
        footer: 'In the meantime, explore our portfolio',
        portfolioLink: 'View Projects',
        signature: 'Azimut Team',
      },
      es: {
        subject: '✅ Mensaje recibido - Azimut',
        title: '¡Gracias por contactarnos!',
        greeting: `Hola, ${data.name}!`,
        message: 'Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo en un plazo de 24 horas hábiles.',
        whatHappens: '¿Qué pasa ahora?',
        step1: 'Nuestro equipo revisará tu solicitud',
        step2: 'Nos pondremos en contacto contigo para agendar una conversación',
        step3: 'Presentaremos una propuesta personalizada',
        footer: 'Mientras tanto, explora nuestro portafolio',
        portfolioLink: 'Ver Proyectos',
        signature: 'Equipo Azimut',
      },
      fr: {
        subject: '✅ Message reçu - Azimut',
        title: 'Merci de nous avoir contactés!',
        greeting: `Bonjour, ${data.name}!`,
        message: 'Nous avons reçu votre message et notre équipe vous contactera dans les 24 heures ouvrables.',
        whatHappens: 'Que se passe-t-il maintenant?',
        step1: 'Notre équipe examinera votre demande',
        step2: 'Nous vous contacterons pour planifier une conversation',
        step3: 'Nous présenterons une proposition personnalisée',
        footer: 'En attendant, explorez notre portfolio',
        portfolioLink: 'Voir les Projets',
        signature: 'Équipe Azimut',
      },
    }

    const t = translations[lang] || translations.pt

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
          .container { background-color: #ffffff; padding: 0; border-radius: 8px; max-width: 600px; margin: 0 auto; overflow: hidden; }
          .header { background: linear-gradient(135deg, #c92337 0%, #a01c2c 100%); color: #ffffff; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .greeting { font-size: 18px; color: #333; margin-bottom: 15px; }
          .message { color: #666; line-height: 1.6; margin-bottom: 30px; }
          .section-title { font-size: 20px; font-weight: bold; color: #333; margin: 25px 0 15px; }
          .steps { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
          .step-number { background-color: #c92337; color: #ffffff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
          .step-text { color: #666; line-height: 1.5; }
          .cta-button { display: inline-block; background-color: #c92337; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #999; font-size: 13px; padding: 20px; border-top: 1px solid #eee; }
          .signature { margin-top: 30px; color: #666; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ ${t.title}</h1>
          </div>
          <div class="content">
            <p class="greeting">${t.greeting}</p>
            <p class="message">${t.message}</p>
            
            <h2 class="section-title">${t.whatHappens}</h2>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-text">${t.step1}</div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-text">${t.step2}</div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-text">${t.step3}</div>
              </div>
            </div>
            
            <p style="text-align: center; color: #666;">${t.footer}</p>
            <p style="text-align: center;">
              <a href="https://azimut.com/${lang}/work" class="cta-button">${t.portfolioLink}</a>
            </p>
            
            <p class="signature">${t.signature}</p>
          </div>
          <div class="footer">
            <p>Azimut Projetos Audiovisuais Ltda.</p>
            <p>Brasil ↔ Canada</p>
          </div>
        </div>
      </body>
      </html>
    `

    const subject = t.subject

    if (emailProvider === 'sendgrid') {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: data.email, name: data.name }],
              subject,
            },
          ],
          from: { email: 'noreply@azimut.com', name: 'Azimut' },
          content: [
            {
              type: 'text/html',
              value: htmlBody,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`SendGrid API error: ${response.statusText}`)
      }
    } else {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Azimut <noreply@azimut.com>',
          to: [data.email],
          subject,
          html: htmlBody,
        }),
      })

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.statusText}`)
      }
    }

    console.log(`✅ Email de confirmação enviado para ${data.email}`)
    return true
  } catch (error) {
    console.error('❌ Erro ao enviar email de confirmação:', error)
    return false
  }
}

