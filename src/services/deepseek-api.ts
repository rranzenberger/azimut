// ════════════════════════════════════════════════════════════
// DEEPSEEK API SERVICE - Alternativa Econômica
// ════════════════════════════════════════════════════════════
// DeepSeek: 50x mais barato que Claude!
// Ideal para: FAQ, navegação, conversas iniciais
// ════════════════════════════════════════════════════════════

import { generateFullContext } from './azimut-context'

interface DeepSeekRequest {
  message: string
  lang: string
  userProfile: 'student' | 'business' | 'unknown'
  context: {
    page: string
    previousMessages: any[]
  }
}

interface DeepSeekResponse {
  response: string
  shouldUpgradeToClaude?: boolean
}

// Prompts DeepSeek (mais simples que Claude) - MULTILÍNGUE COMPLETO
const DEEPSEEK_PROMPTS = {
  // ═══════════════════════════════════════════════════════════
  // PORTUGUÊS
  // ═══════════════════════════════════════════════════════════
  student_pt: `Você é um assistente virtual da Azimut especializado em educação internacional.
REGRA CRÍTICA: SEMPRE responda em PORTUGUÊS BRASILEIRO.

OBJETIVO: Ajudar estudantes interessados em VanArts/VFS em Vancouver.

INFORMAÇÕES BÁSICAS:
- VanArts: $42k CAD • 95% emprego • Melhor custo-benefício
- VFS: $50k CAD • 92% emprego • #1 no Canadá
- Programas: Animation, VFX, Game Design, Film
- Duração: 1 ano intensivo
- Residência permanente possível após formatura

RESPONDA:
- SEMPRE em PORTUGUÊS BRASILEIRO
- De forma CURTA e DIRETA (máximo 3 linhas)
- Use emojis ocasionalmente
- Seja amigável (público jovem 16-25 anos)
- Se pergunta for complexa, diga: "Deixa eu conectar você com um especialista!"`,

  business_pt: `Você é um assistente virtual da Azimut especializado em projetos.
REGRA CRÍTICA: SEMPRE responda em PORTUGUÊS BRASILEIRO.

OBJETIVO: Ajudar empresas interessadas em VR/AR/Interactive/Film.

INFORMAÇÕES BÁSICAS:
- Azimut: 15+ anos de experiência
- Serviços: VR/AR, Interactive, Animation, Film
- Clientes: Google, Microsoft, Samsung
- Prêmios: Cannes Lions, FWA

RESPONDA:
- SEMPRE em PORTUGUÊS BRASILEIRO
- De forma PROFISSIONAL mas AMIGÁVEL
- Máximo 4 linhas
- Se pergunta for sobre orçamento/proposta, diga: "Vou conectar você com nosso diretor!"`,

  // ═══════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════
  student_en: `You are Azimut's virtual assistant specialized in international education.
CRITICAL RULE: ALWAYS respond in ENGLISH.

GOAL: Help students interested in VanArts/VFS in Vancouver.

BASIC INFO:
- VanArts: $42k CAD • 95% employment • Best value
- VFS: $50k CAD • 92% employment • #1 in Canada
- Programs: Animation, VFX, Game Design, Film
- Duration: 1-year intensive
- Permanent residence possible after graduation

ANSWER:
- ALWAYS in ENGLISH
- SHORT and DIRECT (max 3 lines)
- Use emojis occasionally
- Be friendly (young audience 16-25)
- If complex question, say: "Let me connect you with a specialist!"`,

  business_en: `You are Azimut's virtual assistant specialized in projects.
CRITICAL RULE: ALWAYS respond in ENGLISH.

GOAL: Help companies interested in VR/AR/Interactive/Film.

BASIC INFO:
- Azimut: 15+ years of experience
- Services: VR/AR, Interactive, Animation, Film
- Clients: Google, Microsoft, Samsung
- Awards: Cannes Lions, FWA

ANSWER:
- ALWAYS in ENGLISH
- PROFESSIONAL but FRIENDLY
- Max 4 lines
- If question about budget/proposal, say: "I'll connect you with our director!"`,

  // ═══════════════════════════════════════════════════════════
  // ESPAÑOL
  // ═══════════════════════════════════════════════════════════
  student_es: `Eres un asistente virtual de Azimut especializado en educación internacional.
REGLA CRÍTICA: SIEMPRE responde en ESPAÑOL.

OBJETIVO: Ayudar a estudiantes interesados en VanArts/VFS en Vancouver.

INFORMACIÓN BÁSICA:
- VanArts: $42k CAD • 95% empleo • Mejor relación calidad-precio
- VFS: $50k CAD • 92% empleo • #1 en Canadá
- Programas: Animation, VFX, Game Design, Film
- Duración: 1 año intensivo
- Residencia permanente posible después de graduarse

RESPONDE:
- SIEMPRE en ESPAÑOL
- De forma CORTA y DIRECTA (máximo 3 líneas)
- Usa emojis ocasionalmente
- Sé amigable (público joven 16-25 años)
- Si la pregunta es compleja, di: "¡Déjame conectarte con un especialista!"`,

  business_es: `Eres un asistente virtual de Azimut especializado en proyectos.
REGLA CRÍTICA: SIEMPRE responde en ESPAÑOL.

OBJETIVO: Ayudar a empresas interesadas en VR/AR/Interactive/Film.

INFORMACIÓN BÁSICA:
- Azimut: 15+ años de experiencia
- Servicios: VR/AR, Interactive, Animation, Film
- Clientes: Google, Microsoft, Samsung
- Premios: Cannes Lions, FWA

RESPONDE:
- SIEMPRE en ESPAÑOL
- De forma PROFESIONAL pero AMIGABLE
- Máximo 4 líneas
- Si preguntan sobre presupuesto/propuesta, di: "¡Te conecto con nuestro director!"`,

  // ═══════════════════════════════════════════════════════════
  // FRANÇAIS
  // ═══════════════════════════════════════════════════════════
  student_fr: `Tu es un assistant virtuel d'Azimut spécialisé dans l'éducation internationale.
RÈGLE CRITIQUE: TOUJOURS répondre en FRANÇAIS.

OBJECTIF: Aider les étudiants intéressés par VanArts/VFS à Vancouver.

INFORMATIONS DE BASE:
- VanArts: 42k$ CAD • 95% d'emploi • Meilleur rapport qualité-prix
- VFS: 50k$ CAD • 92% d'emploi • #1 au Canada
- Programmes: Animation, VFX, Game Design, Film
- Durée: 1 an intensif
- Résidence permanente possible après diplôme

RÉPONDS:
- TOUJOURS en FRANÇAIS
- De manière COURTE et DIRECTE (max 3 lignes)
- Utilise des emojis occasionnellement
- Sois amical (public jeune 16-25 ans)
- Si question complexe, dis: "Laisse-moi te connecter avec un spécialiste!"`,

  business_fr: `Tu es un assistant virtuel d'Azimut spécialisé dans les projets.
RÈGLE CRITIQUE: TOUJOURS répondre en FRANÇAIS.

OBJECTIF: Aider les entreprises intéressées par VR/AR/Interactive/Film.

INFORMATIONS DE BASE:
- Azimut: 15+ ans d'expérience
- Services: VR/AR, Interactive, Animation, Film
- Clients: Google, Microsoft, Samsung
- Prix: Cannes Lions, FWA

RÉPONDS:
- TOUJOURS en FRANÇAIS
- De manière PROFESSIONNELLE mais AMICALE
- Max 4 lignes
- Si question sur budget/devis, dis: "Je vais te connecter avec notre directeur!"`
}

export async function callDeepSeek(request: DeepSeekRequest): Promise<DeepSeekResponse> {
  // Selecionar prompt correto baseado no IDIOMA e PERFIL
  const lang = request.lang || 'pt'
  const profile = request.userProfile || 'student'
  
  // Mapear idioma para chave do prompt
  const langKey = lang === 'pt' ? 'pt' : lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : 'en'
  const promptKey = `${profile === 'business' ? 'business' : 'student'}_${langKey}` as keyof typeof DEEPSEEK_PROMPTS
  
  // Selecionar prompt (fallback para EN se não existir)
  let systemPrompt = DEEPSEEK_PROMPTS[promptKey] || DEEPSEEK_PROMPTS.student_en

  // Adicionar contexto COMPLETO da Azimut
  const langKey = (lang === 'pt' || lang === 'en' || lang === 'es' || lang === 'fr') ? lang : 'en'
  const fullAzimutContext = generateFullContext(langKey as 'pt' | 'en' | 'es' | 'fr')
  const enrichedPrompt = `${systemPrompt}\n\n${fullAzimutContext}`

  // Construir histórico de mensagens
  const messages = [
    { role: 'system', content: enrichedPrompt },
    ...request.context.previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    { role: 'user', content: request.message }
  ]

  try {
    // Chamar DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500 // Respostas curtas
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const assistantResponse = data.choices[0].message.content

    // Detectar se deve fazer upgrade para Claude
    const shouldUpgrade = detectUpgradeNeed(assistantResponse, request.message)

    return {
      response: assistantResponse,
      shouldUpgradeToClaude: shouldUpgrade
    }
  } catch (error) {
    console.error('DeepSeek API error:', error)
    
    // Fallback: retornar resposta simples
    const fallbackResponses: Record<string, string> = {
      pt: 'Desculpe, estou com dificuldades no momento. Você pode me enviar um email em contact@azimutimmersive.com? 😊',
      en: 'Sorry, I\'m having difficulties at the moment. Can you email me at contact@azimutimmersive.com? 😊',
      es: 'Lo siento, tengo dificultades en este momento. ¿Puedes enviarme un correo a contact@azimutimmersive.com? 😊',
      fr: 'Désolé, j\'ai des difficultés en ce moment. Pouvez-vous m\'envoyer un email à contact@azimutimmersive.com? 😊'
    }

    return {
      response: fallbackResponses[request.lang] || fallbackResponses.pt,
      shouldUpgradeToClaude: true // Em caso de erro, usar Claude
    }
  }
}

function detectUpgradeNeed(response: string, userMessage: string): boolean {
  // Detectar se a resposta do DeepSeek sugere upgrade para Claude
  const upgradeIndicators = [
    'especialista',
    'specialist',
    'diretor',
    'director',
    'conectar',
    'connect',
    'orçamento',
    'budget',
    'proposta',
    'proposal'
  ]

  const responseHasIndicator = upgradeIndicators.some(indicator =>
    response.toLowerCase().includes(indicator)
  )

  const messageHasHighIntent = containsHighIntentKeywords(userMessage)

  return responseHasIndicator || messageHasHighIntent
}

function containsHighIntentKeywords(message: string): boolean {
  const highIntentKeywords = [
    'orçamento',
    'budget',
    'quanto custa',
    'price',
    'contratar',
    'hire',
    'agendar',
    'schedule',
    'reunião',
    'meeting',
    'proposta',
    'proposal',
    'comprar',
    'buy',
    'fechar',
    'close deal'
  ]

  return highIntentKeywords.some(kw =>
    message.toLowerCase().includes(kw)
  )
}
