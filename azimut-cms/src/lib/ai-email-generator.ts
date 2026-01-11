/**
 * 🤖 GERADOR DE EMAILS PERSONALIZADOS COM IA
 * MVP: Usa dados básicos para criar emails que parecem humanos
 */

interface LeadData {
  name: string
  email: string
  phone?: string
  company?: string
  project?: string
  interest?: string
  budget?: string
  timeline?: string
  message?: string
  formType: string
  lang: string
  // Behavioral data
  pagesVisited?: string[]
  timeOnSite?: number
  location?: {
    city?: string
    country?: string
  }
  score?: number
}

/**
 * Gerar email personalizado para o LEAD (usando IA)
 */
export async function generatePersonalizedEmail(data: LeadData): Promise<string> {
  // Determinar idioma e saudação
  const langConfig = {
    pt: { greeting: 'Olá', closing: 'Abraço', signature: 'Ranz Enberger' },
    en: { greeting: 'Hello', closing: 'Best regards', signature: 'Ranz Enberger' },
    fr: { greeting: 'Bonjour', closing: 'Cordialement', signature: 'Ranz Enberger' },
    es: { greeting: 'Hola', closing: 'Saludos', signature: 'Ranz Enberger' }
  }
  const config = langConfig[data.lang as keyof typeof langConfig] || langConfig.en

  const prompt = `You are Ranz Enberger, Creative & Technology Director at Azimut (VR/Cinema/Immersive Experiences company).

LEAD CONTEXT:
- Name: ${data.name}
- Interest: ${data.interest || data.project || 'Immersive projects'}
- Budget: ${data.budget || 'Not specified'}
- Location: ${data.location?.city || 'Unknown'}, ${data.location?.country || ''}
- Pages visited: ${data.pagesVisited?.join(', ') || 'Homepage'}
- Time on site: ${data.timeOnSite ? Math.round(data.timeOnSite / 60) : '?'} minutes
- LANGUAGE: ${data.lang.toUpperCase()} ← IMPORTANT!

TASK:
Write a PERSONALIZED reply email to this lead.

CRITICAL RULES:
1. **WRITE IN ${data.lang.toUpperCase()}** (${data.lang === 'pt' ? 'Portuguese' : data.lang === 'en' ? 'English' : data.lang === 'fr' ? 'French' : 'Spanish'})
2. Use FRIENDLY but PROFESSIONAL tone
3. Mention something SPECIFIC about their interest
4. If location known, add 1 sentence of SMALL TALK (weather, culture, local context)
5. Mention 1 SIMILAR CASE we did (ex: Olympic Museum if museum project)
6. Propose clear NEXT STEP (meeting, demo, quote)
7. Keep BRIEF (max 150 words)
8. Sign as "${config.signature}"
9. Use emojis sparingly (1-2 max)

START with: "${config.greeting} [FirstName]!"
END with: "${config.closing},\n${config.signature}\nCreative & Technology Director\nAzimut"

FORMAT:
Just the email body (no subject line).
Write NATURALLY like a real person, not a bot.
`

  try {
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
    if (!DEEPSEEK_API_KEY) {
      return generateFallbackEmail(data)
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Você é um especialista em comunicação personalizada para leads B2B criativos.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    })

    if (!response.ok) {
      console.warn('DeepSeek API failed, using fallback')
      return generateFallbackEmail(data)
    }

    const json = await response.json()
    return json.choices[0].message.content || generateFallbackEmail(data)
  } catch (error) {
    console.error('IA email generation failed:', error)
    return generateFallbackEmail(data)
  }
}

/**
 * Email fallback (se IA falhar)
 */
function generateFallbackEmail(data: LeadData): string {
  const firstName = data.name.split(' ')[0]
  
  const templates = {
    pt: {
      greeting: `Olá ${firstName}! 👋`,
      thanks: `Obrigado pelo interesse em nossos projetos de ${data.interest || 'experiências imersivas'}!`,
      body: `Vi que você navegou pelo nosso site e se interessou especialmente por ${data.interest || 'nossos serviços'}. Trabalhamos em projetos similares como o Museu Olímpico do Rio, com tour virtual 360° completo e instalações interativas.`,
      budget: data.budget === 'Alto' ? 'Com o orçamento que você mencionou, podemos criar algo realmente especial.' : 'Podemos adaptar a solução ao seu orçamento e cronograma.',
      cta: 'Que tal marcarmos uma conversa para entender melhor sua visão? Posso te mostrar alguns casos práticos e discutir viabilidade.',
      closing: 'Abraço'
    },
    en: {
      greeting: `Hello ${firstName}! 👋`,
      thanks: `Thank you for your interest in our ${data.interest || 'immersive experiences'} projects!`,
      body: `I saw you browsed our site and were especially interested in ${data.interest || 'our services'}. We work on similar projects like Rio Olympic Museum, with complete 360° virtual tours and interactive installations.`,
      budget: data.budget === 'High' ? 'With the budget you mentioned, we can create something truly special.' : 'We can adapt the solution to your budget and timeline.',
      cta: 'How about we schedule a conversation to better understand your vision? I can show you some practical cases and discuss feasibility.',
      closing: 'Best regards'
    },
    fr: {
      greeting: `Bonjour ${firstName}! 👋`,
      thanks: `Merci pour votre intérêt dans nos projets de ${data.interest || 'expériences immersives'}!`,
      body: `J'ai vu que vous avez navigué sur notre site et vous êtes particulièrement intéressé par ${data.interest || 'nos services'}. Nous travaillons sur des projets similaires comme le Musée Olympique de Rio, avec des tours virtuels 360° complets et des installations interactives.`,
      budget: data.budget === 'High' || data.budget === 'Élevé' ? 'Avec le budget que vous avez mentionné, nous pouvons créer quelque chose de vraiment spécial.' : 'Nous pouvons adapter la solution à votre budget et calendrier.',
      cta: 'Que diriez-vous de planifier une conversation pour mieux comprendre votre vision? Je peux vous montrer des cas pratiques et discuter de la faisabilité.',
      closing: 'Cordialement'
    },
    es: {
      greeting: `Hola ${firstName}! 👋`,
      thanks: `¡Gracias por tu interés en nuestros proyectos de ${data.interest || 'experiencias inmersivas'}!`,
      body: `Vi que navegaste por nuestro sitio y te interesaste especialmente en ${data.interest || 'nuestros servicios'}. Trabajamos en proyectos similares como el Museo Olímpico de Río, con tours virtuales 360° completos e instalaciones interactivas.`,
      budget: data.budget === 'Alto' || data.budget === 'High' ? 'Con el presupuesto que mencionaste, podemos crear algo realmente especial.' : 'Podemos adaptar la solución a tu presupuesto y cronograma.',
      cta: '¿Qué tal si agendamos una conversación para entender mejor tu visión? Puedo mostrarte algunos casos prácticos y discutir viabilidad.',
      closing: 'Saludos'
    }
  }

  const t = templates[data.lang as keyof typeof templates] || templates.en

  return `${t.greeting}

${t.thanks}

${t.body}

${t.budget}

${t.cta}

${t.closing},
Ranz Enberger
Creative & Technology Director
Azimut

📱 WhatsApp: +55 21 99999-9999
🌐 azimutimmersive.com`
}

/**
 * Gerar resumo IA para o TIME (email interno)
 */
export async function generateInternalSummary(data: LeadData): Promise<string> {
  const score = data.score || 50
  const temp = score >= 70 ? 'HOT 🔥' : score >= 40 ? 'WARM 🟡' : 'COLD ❄️'
  
  // Detectar idioma
  const langNames = {
    pt: '🇧🇷 Português',
    en: '🇺🇸 Inglês',
    fr: '🇫🇷 Francês',
    es: '🇪🇸 Espanhol'
  }
  const langDetected = langNames[data.lang as keyof typeof langNames] || data.lang.toUpperCase()
  
  return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; padding: 20px; border-radius: 8px; max-width: 800px;">
  <div style="background: linear-gradient(135deg, #c92337 0%, #8B2332 100%); color: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
    <h2 style="margin: 0;">🤖 ANÁLISE AUTOMÁTICA DO LEAD</h2>
  </div>
  
  <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #c92337;">
    <h3 style="color: #c92337; margin-top: 0;">📊 SCORE: ${score}/100 (${temp})</h3>
  </div>
  
  <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px;">
    <h4 style="color: #333; border-bottom: 2px solid #c92337; padding-bottom: 8px;">👤 DADOS DO LEAD</h4>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nome:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #c92337;">${data.email}</a></td>
      </tr>
      ${data.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>` : ''}
      ${data.company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Empresa:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.company}</td></tr>` : ''}
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Idioma:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${langDetected}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Localização:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.location?.city || '?'}, ${data.location?.country || '?'}</td>
      </tr>
    </table>
  </div>
  
  <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px;">
    <h4 style="color: #333; border-bottom: 2px solid #c92337; padding-bottom: 8px;">📝 MENSAGEM ORIGINAL</h4>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic; border-left: 3px solid #c92337;">
      "${data.message || data.interest || data.project || 'Sem mensagem'}"
    </div>
    ${data.lang !== 'pt' ? `<p style="font-size: 12px; color: #666; margin-top: 10px;">💬 Escrito em: ${langDetected}</p>` : ''}
  </div>
  
  <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px;">
    <h4 style="color: #333; border-bottom: 2px solid #c92337; padding-bottom: 8px;">🧠 COMPORTAMENTO NO SITE</h4>
    <ul style="list-style: none; padding: 0;">
      <li style="padding: 5px 0;">⏱️ <strong>Tempo no site:</strong> ${data.timeOnSite ? Math.round(data.timeOnSite / 60) : '?'} minutos</li>
      <li style="padding: 5px 0;">📄 <strong>Páginas visitadas:</strong> ${data.pagesVisited?.length || '?'}</li>
      <li style="padding: 5px 0;">🎯 <strong>Interesse principal:</strong> ${data.interest || data.project || 'Geral'}</li>
      ${data.budget ? `<li style="padding: 5px 0;">💰 <strong>Orçamento:</strong> ${data.budget}</li>` : ''}
      ${data.timeline ? `<li style="padding: 5px 0;">📅 <strong>Prazo:</strong> ${data.timeline}</li>` : ''}
    </ul>
  </div>
  
  <div style="background: #fff3cd; padding: 20px; border-radius: 6px; border-left: 4px solid #ffc107;">
    <h4 style="color: #856404; margin-top: 0;">💡 RECOMENDAÇÃO</h4>
    <p style="color: #856404; font-weight: bold; font-size: 16px;">
      ${score >= 70 
        ? '⚡ RESPONDER URGENTE! Alta probabilidade de conversão. Ligar/WhatsApp se possível.'
        : score >= 40
        ? '📞 Responder em até 24 horas. Potencial médio, vale seguir.'
        : '📧 Responder em 48h. Baixa urgência, mas manter contato.'}
    </p>
  </div>
  
  <div style="text-align: center; margin-top: 25px;">
    <a href="https://backoffice.azmt.com.br/admin/leads" style="background: #c92337; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
      Ver Lead Completo no Backoffice →
    </a>
  </div>
  
  <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
    <strong>Formulário:</strong> ${data.formType} | <strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}
  </p>
</div>
`
}
