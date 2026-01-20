/**
 * 🤖 GERADOR DE EMAILS PERSONALIZADOS COM IA
 * MVP: Usa dados básicos para criar emails que parecem humanos
 * FORMATO: Texto simples (não vai para spam)
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
 * Gerar small talk personalizado baseado em localização
 */
function generateSmallTalk(data: LeadData): string {
  const city = data.location?.city
  const country = data.location?.country
  const company = data.company
  
  // Base de conhecimento para small talk (expandível)
  const locationContext: Record<string, Record<string, string>> = {
    pt: {
      'São Paulo': 'Legal ver interesse de São Paulo! A cidade tem uma cena cultural incrível.',
      'Rio de Janeiro': 'Que bom receber contato do Rio! A cidade é inspiradora para projetos imersivos.',
      'Brasília': 'Interessante vir de Brasília! Trabalhamos com várias instituições governamentais.',
      'Porto Alegre': 'Ótimo saber de interesse do Sul! Região tem projetos culturais muito interessantes.',
      'Curitiba': 'Legal o contato de Curitiba! Cidade com forte presença cultural.',
      'Gramado': 'Gramado! Cidade que conhecemos bem, inclusive fazemos curadoria lá.',
      'Lisboa': 'Que bom receber contato de Portugal! Temos alguns projetos em Lisboa.',
      'Porto': 'Legal o interesse do Porto! Cidade com cena cultural incrível.',
      'default': city ? `Interessante o contato de ${city}!` : ''
    },
    en: {
      'Vancouver': 'Great to hear from Vancouver! We work with VFS and VanArts there.',
      'Toronto': 'Nice to connect with Toronto! Canada has amazing creative scene.',
      'Montreal': 'Montreal! Beautiful city with great cultural projects.',
      'New York': 'Great to hear from NY! The immersive scene there is incredible.',
      'Los Angeles': 'LA! Perfect place for immersive experiences.',
      'London': 'Nice to connect with London! Amazing creative industry there.',
      'default': city ? `Great to hear from ${city}!` : ''
    },
    es: {
      'Buenos Aires': '¡Qué bueno recibir contacto de Buenos Aires! Ciudad con escena cultural increíble.',
      'Madrid': 'Madrid! Tenemos algunos proyectos en España.',
      'Barcelona': '¡Barcelona! Ciudad inspiradora para proyectos inmersivos.',
      'default': city ? `¡Interesante el contacto de ${city}!` : ''
    },
    fr: {
      'Paris': 'Super de recevoir un contact de Paris! Ville inspirante.',
      'Lyon': 'Lyon! Belle ville avec une scène culturelle intéressante.',
      'default': city ? `Intéressant le contact de ${city}!` : ''
    }
  }

  const lang = data.lang as keyof typeof locationContext || 'pt'
  const cityTalk = city && locationContext[lang]?.[city] 
    ? locationContext[lang][city] 
    : locationContext[lang]?.['default'] || ''

  // Small talk sobre empresa (se for conhecida)
  const companyTalk = company ? 
    (company.toLowerCase().includes('museu') || company.toLowerCase().includes('museum') ? 
      'Trabalhar com museus é sempre especial.' : 
      company.toLowerCase().includes('universidade') || company.toLowerCase().includes('university') ?
      'Projetos acadêmicos são sempre desafiadores e recompensadores.' :
      '') : ''

  return [cityTalk, companyTalk].filter(Boolean).join(' ')
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

  // Gerar small talk personalizado
  const smallTalk = generateSmallTalk(data)

  const prompt = `You are Ranz Enberger, Creative & Technology Director at Azimut (VR/Cinema/Immersive Experiences company).

LEAD CONTEXT:
- Name: ${data.name}
- Location: ${data.location?.city || 'Unknown'}, ${data.location?.country || ''}
- Company: ${data.company || 'Not specified'}
- Interest: ${data.interest || data.project || 'Immersive projects'}
- Budget: ${data.budget || 'Not specified'}
- LANGUAGE: ${data.lang.toUpperCase()} ← IMPORTANT!

${smallTalk ? `SMALL TALK TO USE: "${smallTalk}" (incorporate naturally in the 2nd sentence)\n` : ''}
TASK:
Write a SIMPLE, FRIENDLY reply email.

CRITICAL RULES:
1. **WRITE IN ${data.lang.toUpperCase()}** (${data.lang === 'pt' ? 'Portuguese' : data.lang === 'en' ? 'English' : data.lang === 'fr' ? 'French' : 'Spanish'})
2. Use PLAIN TEXT (no HTML, no emojis, no bold)
3. Be BRIEF (max 120 words)
4. Sound HUMAN and WARM, not like a marketing bot
5. ${smallTalk ? 'Include the small talk naturally in 2nd sentence' : 'Skip small talk if no location'}
6. Mention 1 similar case (ex: Olympic Museum)
7. Propose SIMPLE next step (call/meeting)
8. Sign as "${config.signature}"

TONE: Friendly colleague, not salesperson. Empathetic, curious about their project.

START with: "${config.greeting} [FirstName],"
END with: "\n${config.closing},\n${config.signature}\nCreative & Technology Director\nAzimut\n\nWhatsApp: +55 21 99999-9999\nSite: azimutimmersive.com"

FORMAT: Plain text email (like you're texting a colleague).`

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
          { role: 'system', content: 'Você escreve emails simples e amigáveis, sem parecer um bot de marketing.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 250
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
 * FORMATO: Texto simples, amigável, empático
 */
function generateFallbackEmail(data: LeadData): string {
  const firstName = data.name.split(' ')[0]
  const smallTalk = generateSmallTalk(data)
  
  const templates = {
    pt: `Olá ${firstName},

Obrigado pelo contato!${smallTalk ? ` ${smallTalk}` : ''} Vi que você se interessou por ${data.interest || 'nossos projetos'}.

Trabalhamos em projetos como o Museu Olímpico do Rio (tour virtual 360° + instalações interativas) e ficamos curiosos para entender melhor sua visão.${data.budget ? `\n\nCom o orçamento que você mencionou, podemos criar algo especial.` : ''}

Que tal conversarmos? Posso te mostrar casos práticos e discutir viabilidade.

Abraço,

Ranz Enberger
Creative & Technology Director
Azimut

WhatsApp: +55 21 99999-9999
Site: azimutimmersive.com`,

    en: `Hello ${firstName},

Thank you for reaching out!${smallTalk ? ` ${smallTalk}` : ''} I saw you're interested in ${data.interest || 'our projects'}.

We work on projects like Rio Olympic Museum (360° virtual tour + interactive installations) and we're curious to better understand your vision.${data.budget ? `\n\nWith the budget you mentioned, we can create something special.` : ''}

How about we talk? I can show you practical cases and discuss feasibility.

Best regards,

Ranz Enberger
Creative & Technology Director
Azimut

WhatsApp: +55 21 99999-9999
Site: azimutimmersive.com`,

    fr: `Bonjour ${firstName},

Merci pour votre contact!${smallTalk ? ` ${smallTalk}` : ''} J'ai vu que vous vous intéressez à ${data.interest || 'nos projets'}.

Nous travaillons sur des projets comme le Musée Olympique de Rio (tour virtuel 360° + installations interactives) et nous sommes curieux de mieux comprendre votre vision.${data.budget ? `\n\nAvec le budget que vous avez mentionné, nous pouvons créer quelque chose de spécial.` : ''}

Et si nous parlions? Je peux vous montrer des cas pratiques et discuter de la faisabilité.

Cordialement,

Ranz Enberger
Creative & Technology Director
Azimut

WhatsApp: +55 21 99999-9999
Site: azimutimmersive.com`,

    es: `Hola ${firstName},

¡Gracias por contactarnos!${smallTalk ? ` ${smallTalk}` : ''} Vi que te interesas por ${data.interest || 'nuestros proyectos'}.

Trabajamos en proyectos como el Museo Olímpico de Río (tour virtual 360° + instalaciones interactivas) y tenemos curiosidad por entender mejor tu visión.${data.budget ? `\n\nCon el presupuesto que mencionaste, podemos crear algo especial.` : ''}

¿Qué tal si hablamos? Puedo mostrarte casos prácticos y discutir viabilidad.

Saludos,

Ranz Enberger
Creative & Technology Director
Azimut

WhatsApp: +55 21 99999-9999
Site: azimutimmersive.com`
  }

  return templates[data.lang as keyof typeof templates] || templates.en
}

/**
 * Gerar resumo para o TIME (email interno)
 * FORMATO: Texto simples e limpo (não vai para spam)
 */
export async function generateInternalSummary(data: LeadData): Promise<string> {
  const score = data.score || 50
  const temp = score >= 70 ? 'HOT' : score >= 40 ? 'WARM' : 'COLD'
  
  // Detectar idioma
  const langNames = {
    pt: 'Português',
    en: 'Inglês',
    fr: 'Francês',
    es: 'Espanhol'
  }
  const langDetected = langNames[data.lang as keyof typeof langNames] || data.lang.toUpperCase()
  
  // Recomendação de ação
  const action = score >= 70 
    ? 'URGENTE: Responder hoje, ligar/WhatsApp se possível'
    : score >= 40
    ? 'Responder em até 24h, potencial médio'
    : 'Responder em 48h, manter contato'
  
  return `Novo Lead - ${temp} (${score}/100)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DADOS DO CONTATO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome: ${data.name}
Email: ${data.email}${data.phone ? `
Telefone: ${data.phone}` : ''}${data.company ? `
Empresa: ${data.company}` : ''}
Idioma: ${langDetected}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERESSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.interest || data.project || 'Não especificado'}${data.budget ? `
Orçamento: ${data.budget}` : ''}${data.timeline ? `
Prazo: ${data.timeline}` : ''}

${data.message ? `Mensagem:
"${data.message}"

` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMENDAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${action}

Ver lead completo: https://backoffice.azmt.com.br/admin/leads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.formType} | ${new Date().toLocaleString('pt-BR')}
`
}
