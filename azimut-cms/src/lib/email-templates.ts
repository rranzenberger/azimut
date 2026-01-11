/**
 * Email Templates por Tipo de Lead
 * Sequências automáticas (D+0, D+2, D+5, D+7)
 */

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// ════════════════════════════════════════════════════════════
// VANCOUVER - SEQUÊNCIA AUTOMÁTICA
// ════════════════════════════════════════════════════════════

export const vancouverD0 = (lead: { name: string; email: string; targetSchool?: string }): EmailTemplate => ({
  subject: `${lead.name}, recebemos seu interesse em Vancouver! 🍁`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #c92337, #8b1828); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .cta { background: #c92337; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍁 Bem-vindo à Azimut Academy</h1>
          <p>Seu caminho para Vancouver começa aqui!</p>
        </div>
        <div class="content">
          <p>Olá <strong>${lead.name}</strong>,</p>
          
          <p>Recebemos seu interesse em estudar em Vancouver${lead.targetSchool ? ` na ${lead.targetSchool}` : ''}! 🎉</p>
          
          <p><strong>Próximos passos:</strong></p>
          <ol>
            <li>📧 Vamos revisar seu perfil nas próximas 24h</li>
            <li>📞 Agendar uma consulta gratuita de 1 hora</li>
            <li>📋 Criar um plano personalizado para você</li>
          </ol>
          
          <p>Enquanto isso, <strong>baixe nosso guia gratuito</strong> com tudo sobre Vancouver:</p>
          <a href="https://azmt.com.br/guia-vancouver" class="cta">📥 Baixar Guia Vancouver (PDF)</a>
          
          <p><strong>Dúvidas?</strong> Responda este email ou entre em contato:</p>
          <ul>
            <li>📧 vancouver@azmt.com.br</li>
            <li>💬 WhatsApp: +55 (11) 99999-9999</li>
          </ul>
          
          <p>Um abraço,<br><strong>Equipe Azimut Academy</strong></p>
        </div>
        <div class="footer">
          <p>Azimut Academy - Agente Educacional Oficial VFS/VanArts</p>
          <p>Rio de Janeiro, Brasil 🇧🇷 • Vancouver, Canadá 🇨🇦</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Olá ${lead.name},

Recebemos seu interesse em estudar em Vancouver${lead.targetSchool ? ` na ${lead.targetSchool}` : ''}! 🎉

Próximos passos:
1. Vamos revisar seu perfil nas próximas 24h
2. Agendar uma consulta gratuita de 1 hora
3. Criar um plano personalizado para você

Baixe nosso guia gratuito: https://azmt.com.br/guia-vancouver

Dúvidas?
- Email: vancouver@azmt.com.br
- WhatsApp: +55 (11) 99999-9999

Um abraço,
Equipe Azimut Academy
  `
})

export const vancouverD2 = (lead: { name: string }): EmailTemplate => ({
  subject: `${lead.name}, veja como funciona o processo para Vancouver 📋`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #c92337, #8b1828); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .timeline { border-left: 3px solid #c92337; padding-left: 20px; margin: 20px 0; }
        .timeline-item { margin-bottom: 30px; }
        .cta { background: #c92337; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Processo Vancouver</h1>
          <p>De 6 a 12 meses até começar as aulas</p>
        </div>
        <div class="content">
          <p>Olá <strong>${lead.name}</strong>,</p>
          
          <p>Preparamos um resumo do <strong>processo completo</strong> para você estudar em Vancouver:</p>
          
          <div class="timeline">
            <div class="timeline-item">
              <strong>1. Orientação Gratuita (1h)</strong>
              <p>Analisamos seu perfil, objetivos e recomendamos a melhor escola (VFS ou VanArts)</p>
            </div>
            
            <div class="timeline-item">
              <strong>2. Preparação (2-4 meses)</strong>
              <p>Curso preparatório no Brasil (opcional) para construir portfolio e melhorar inglês</p>
            </div>
            
            <div class="timeline-item">
              <strong>3. Application (2-3 meses)</strong>
              <p>Revisão de portfolio, carta, application e preparação para entrevista</p>
            </div>
            
            <div class="timeline-item">
              <strong>4. Visto (3-4 meses)</strong>
              <p>Parceria com empresa de vistos. Documentação completa + suporte</p>
            </div>
            
            <div class="timeline-item">
              <strong>5. Vancouver! 🍁</strong>
              <p>Indicação de moradia, grupo de brasileiros, networking local</p>
            </div>
          </div>
          
          <p><strong>Pronto para começar?</strong> Agende sua consulta gratuita:</p>
          <a href="https://calendly.com/azimut/consulta-vancouver" class="cta">📅 Agendar Consulta</a>
          
          <p>Um abraço,<br><strong>Equipe Azimut Academy</strong></p>
        </div>
        <div class="footer">
          <p>Azimut Academy - Agente Educacional Oficial VFS/VanArts</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Olá ${lead.name},

Processo completo para Vancouver:

1. Orientação Gratuita (1h)
   Analisamos seu perfil e recomendamos a melhor escola

2. Preparação (2-4 meses)
   Curso preparatório no Brasil para portfolio e inglês

3. Application (2-3 meses)
   Revisão de portfolio, carta e preparação para entrevista

4. Visto (3-4 meses)
   Parceria com empresa de vistos + suporte completo

5. Vancouver! 🍁
   Moradia, grupo de brasileiros, networking local

Agende sua consulta: https://calendly.com/azimut/consulta-vancouver

Equipe Azimut Academy
  `
})

export const vancouverD5 = (lead: { name: string }): EmailTemplate => ({
  subject: `${lead.name}, conheça quem já foi para Vancouver 🎬`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #c92337, #8b1828); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .testimonial { background: white; border-left: 4px solid #c92337; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .cta { background: #c92337; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎬 Brasileiros em Vancouver</h1>
          <p>Histórias reais de sucesso</p>
        </div>
        <div class="content">
          <p>Olá <strong>${lead.name}</strong>,</p>
          
          <p>Nada melhor que ouvir quem <strong>já fez</strong> o que você está planejando fazer! Conheça alguns brasileiros que estudaram na VFS/VanArts:</p>
          
          <div class="testimonial">
            <p><strong>Carina Lotecki</strong> - CFX Artist @ Walt Disney Animation Studios</p>
            <p><em>"Apenas 1 mês após me formar na VFS, consegui meu primeiro emprego na Cinesite, depois Digital Domain. Hoje trabalho na Disney Vancouver no Moana 2!"</em></p>
          </div>
          
          <div class="testimonial">
            <p><strong>Samuel Rico</strong> - Crowds Supervising Animator @ Sony Pictures Imageworks</p>
            <p><em>"O ano na VanArts foi um sonho realizado. Muito trabalho, mas totalmente valeu. Hoje trabalho na Sony Pictures em Vancouver!"</em></p>
          </div>
          
          <div class="testimonial">
            <p><strong>Raja Ghosh</strong> - Sr. Environment Artist @ Remedy Entertainment</p>
            <p><em>"Escolhi VanArts pelo currículo detalhado e pipeline profissional. Hoje trabalho na Remedy na Finlândia, entreguei Control e Alan Wake 2!"</em></p>
          </div>
          
          <p><strong>Quer saber como eles conseguiram?</strong> Agende uma consulta e vamos criar seu plano personalizado:</p>
          <a href="https://calendly.com/azimut/consulta-vancouver" class="cta">📅 Quero Minha Consulta</a>
          
          <p>Um abraço,<br><strong>Equipe Azimut Academy</strong></p>
        </div>
        <div class="footer">
          <p>Azimut Academy - Agente Educacional Oficial VFS/VanArts</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Olá ${lead.name},

Conheça brasileiros que já foram para Vancouver:

Carina Lotecki - CFX Artist @ Disney
"Apenas 1 mês após VFS, consegui emprego na Cinesite, depois Digital Domain. Hoje na Disney Vancouver!"

Samuel Rico - Animator @ Sony Pictures
"O ano na VanArts foi um sonho. Muito trabalho, mas valeu. Hoje na Sony Pictures!"

Raja Ghosh - Sr. Artist @ Remedy
"Escolhi VanArts pelo pipeline profissional. Hoje na Remedy, entreguei Control e Alan Wake 2!"

Agende sua consulta: https://calendly.com/azimut/consulta-vancouver

Equipe Azimut Academy
  `
})

export const vancouverD7 = (lead: { name: string }): EmailTemplate => ({
  subject: `${lead.name}, última chance de agendar sua consulta gratuita! ⏰`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #c92337, #8b1828); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .urgency { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .cta { background: #c92337; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; border-radius: 5px; margin: 20px 0; font-weight: bold; font-size: 18px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Última Chance!</h1>
          <p>Vagas limitadas para 2026</p>
        </div>
        <div class="content">
          <p>Olá <strong>${lead.name}</strong>,</p>
          
          <p>Esta é a <strong>última mensagem</strong> da nossa sequência de emails sobre Vancouver.</p>
          
          <div class="urgency">
            <h3 style="margin-top: 0;">⚠️ Intakes 2026 estão enchendo!</h3>
            <p><strong>VFS e VanArts</strong> têm vagas limitadas por intake (Janeiro, Abril, Setembro). Quanto antes começarmos, mais chances você tem de garantir sua vaga!</p>
          </div>
          
          <p><strong>Por que agendar a consulta AGORA?</strong></p>
          <ul>
            <li>✅ <strong>100% gratuita</strong> - sem compromisso</li>
            <li>✅ <strong>1 hora</strong> dedicada ao seu perfil</li>
            <li>✅ <strong>Plano personalizado</strong> de ação</li>
            <li>✅ <strong>Respostas</strong> para todas suas dúvidas</li>
            <li>✅ <strong>Indicação</strong> da melhor escola para você</li>
          </ul>
          
          <p style="text-align: center;">
            <a href="https://calendly.com/azimut/consulta-vancouver" class="cta">📅 Agendar Consulta Gratuita</a>
          </p>
          
          <p><strong>Ainda não tem certeza?</strong> Sem problemas! Responda este email com suas dúvidas e vamos conversar. 😊</p>
          
          <p>Um abraço,<br><strong>Equipe Azimut Academy</strong></p>
          
          <p><em>PS: Se você já agendou ou não tem mais interesse, pode ignorar este email. Não vamos mais enviar mensagens automáticas.</em></p>
        </div>
        <div class="footer">
          <p>Azimut Academy - Agente Educacional Oficial VFS/VanArts</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Olá ${lead.name},

Esta é a última mensagem sobre Vancouver.

⚠️ INTAKES 2026 ESTÃO ENCHENDO!

VFS e VanArts têm vagas limitadas. Quanto antes começarmos, mais chances você tem!

Por que agendar a consulta AGORA?
✅ 100% gratuita - sem compromisso
✅ 1 hora dedicada ao seu perfil
✅ Plano personalizado de ação
✅ Respostas para todas suas dúvidas
✅ Indicação da melhor escola para você

Agende: https://calendly.com/azimut/consulta-vancouver

Dúvidas? Responda este email!

Equipe Azimut Academy

PS: Se já agendou ou não tem mais interesse, pode ignorar.
  `
})

// ════════════════════════════════════════════════════════════
// HOT LEAD NOTIFICATION - Para o ADMIN
// ════════════════════════════════════════════════════════════

export interface HotLeadData {
  fingerprint: string
  country?: string
  city?: string
  deviceType?: string
  browser?: string
  pageViews: number
  visitCount: number
  engagementScore: number
  conversionProbability: number
  topPages: string[]
  interests: string[]
  email?: string
  name?: string
  referrer?: string
  timestamp: string
}

export const hotLeadNotification = (data: HotLeadData): EmailTemplate => {
  const scoreEmoji = data.conversionProbability >= 80 ? '🔥🔥🔥' : data.conversionProbability >= 60 ? '🔥🔥' : '🔥'
  const urgencyLevel = data.conversionProbability >= 80 ? 'URGENTE' : data.conversionProbability >= 60 ? 'ALTO' : 'MÉDIO'
  const urgencyColor = data.conversionProbability >= 80 ? '#dc2626' : data.conversionProbability >= 60 ? '#ea580c' : '#ca8a04'
  
  return {
    subject: `${scoreEmoji} HOT LEAD DETECTADO! Score: ${data.conversionProbability}% - ${data.country || 'Desconhecido'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; background: #f3f4f6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #dc2626, #991b1b); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .urgency-badge { display: inline-block; background: ${urgencyColor}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 15px; }
          .content { padding: 30px; }
          .score-box { background: linear-gradient(135deg, #fef2f2, #fee2e2); border: 2px solid #fca5a5; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 25px; }
          .score-number { font-size: 48px; font-weight: bold; color: #dc2626; }
          .score-label { color: #991b1b; font-size: 14px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
          .info-item { background: #f9fafb; padding: 15px; border-radius: 8px; }
          .info-label { color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
          .info-value { color: #1f2937; font-weight: 600; font-size: 16px; }
          .section { margin-bottom: 25px; }
          .section-title { color: #374151; font-size: 16px; font-weight: 600; margin-bottom: 10px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
          .tag { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 15px; font-size: 13px; margin: 3px; }
          .page-item { background: #f0fdf4; color: #166534; padding: 8px 12px; border-radius: 6px; margin: 5px 0; font-size: 14px; }
          .cta { display: block; background: #c92337; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 16px; margin-top: 20px; }
          .cta:hover { background: #a91d2e; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          .timestamp { color: #9ca3af; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${scoreEmoji} HOT LEAD DETECTADO!</h1>
            <p>Um visitante com alta probabilidade de conversão está no site</p>
            <div class="urgency-badge">⚡ PRIORIDADE: ${urgencyLevel}</div>
          </div>
          
          <div class="content">
            <div class="score-box">
              <div class="score-number">${data.conversionProbability}%</div>
              <div class="score-label">Probabilidade de Conversão</div>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">📍 Localização</div>
                <div class="info-value">${data.city ? `${data.city}, ` : ''}${data.country || 'Não identificado'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">📱 Dispositivo</div>
                <div class="info-value">${data.deviceType || 'Desktop'} / ${data.browser || 'Chrome'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">👁️ Páginas Vistas</div>
                <div class="info-value">${data.pageViews} páginas</div>
              </div>
              <div class="info-item">
                <div class="info-label">🔄 Visitas</div>
                <div class="info-value">${data.visitCount}x no site</div>
              </div>
              <div class="info-item">
                <div class="info-label">⭐ Engajamento</div>
                <div class="info-value">${data.engagementScore}/100</div>
              </div>
              <div class="info-item">
                <div class="info-label">🔗 Origem</div>
                <div class="info-value">${data.referrer || 'Direto'}</div>
              </div>
            </div>
            
            ${data.interests && data.interests.length > 0 ? `
            <div class="section">
              <div class="section-title">🎯 Interesses Detectados</div>
              ${data.interests.map(i => `<span class="tag">${i}</span>`).join('')}
            </div>
            ` : ''}
            
            ${data.topPages && data.topPages.length > 0 ? `
            <div class="section">
              <div class="section-title">📄 Páginas Mais Visitadas</div>
              ${data.topPages.slice(0, 5).map(p => `<div class="page-item">→ ${p}</div>`).join('')}
            </div>
            ` : ''}
            
            ${data.email || data.name ? `
            <div class="section">
              <div class="section-title">👤 Dados do Lead</div>
              ${data.name ? `<p><strong>Nome:</strong> ${data.name}</p>` : ''}
              ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
            </div>
            ` : ''}
            
            <a href="https://azimut-cms.vercel.app/admin/analytics" class="cta">
              📊 Ver no Dashboard
            </a>
            
            <p class="timestamp" style="margin-top: 20px; text-align: center;">
              Detectado em: ${data.timestamp}
            </p>
          </div>
          
          <div class="footer">
            <p>Azimut Analytics - Sistema de Inteligência de Leads</p>
            <p>Este é um email automático. Para configurar notificações, acesse o backoffice.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🔥 HOT LEAD DETECTADO!

Score: ${data.conversionProbability}% de probabilidade de conversão
Prioridade: ${urgencyLevel}

LOCALIZAÇÃO
- País: ${data.country || 'Não identificado'}
- Cidade: ${data.city || 'Não identificada'}

COMPORTAMENTO
- Páginas vistas: ${data.pageViews}
- Visitas ao site: ${data.visitCount}x
- Score de engajamento: ${data.engagementScore}/100
- Dispositivo: ${data.deviceType || 'Desktop'}
- Browser: ${data.browser || 'Chrome'}
- Origem: ${data.referrer || 'Direto'}

${data.interests && data.interests.length > 0 ? `INTERESSES: ${data.interests.join(', ')}` : ''}

${data.topPages && data.topPages.length > 0 ? `PÁGINAS MAIS VISITADAS:\n${data.topPages.slice(0, 5).map(p => `- ${p}`).join('\n')}` : ''}

${data.name ? `Nome: ${data.name}` : ''}
${data.email ? `Email: ${data.email}` : ''}

Ver no Dashboard: https://azimut-cms.vercel.app/admin/analytics

Detectado em: ${data.timestamp}

---
Azimut Analytics - Sistema de Inteligência de Leads
    `
  }
}

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════

export const getEmailSequence = (leadType: string, day: number, lead: any): EmailTemplate | null => {
  if (leadType === 'VANCOUVER') {
    switch (day) {
      case 0: return vancouverD0(lead)
      case 2: return vancouverD2(lead)
      case 5: return vancouverD5(lead)
      case 7: return vancouverD7(lead)
      default: return null
    }
  }
  
  // TODO: Adicionar sequências para outros tipos (COURSES, WORKSHOPS, B2B)
  
  return null
}
