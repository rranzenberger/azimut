// ════════════════════════════════════════════════════════════
// DEEPSEEK API SERVICE - Alternativa Econômica
// ════════════════════════════════════════════════════════════
// DeepSeek: 50x mais barato que Claude!
// Ideal para: FAQ, navegação, conversas iniciais
// ════════════════════════════════════════════════════════════

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

// Prompts DeepSeek (mais simples que Claude)
const DEEPSEEK_PROMPTS = {
  student_pt: `Você é um assistente virtual da Azimut especializado em educação internacional.

OBJETIVO: Ajudar estudantes interessados em VanArts/VFS em Vancouver.

INFORMAÇÕES BÁSICAS:
- VanArts: $42k CAD • 95% emprego • Melhor custo-benefício
- VFS: $50k CAD • 92% emprego • #1 no Canadá
- Programas: Animation, VFX, Game Design, Film
- Duração: 1 ano intensivo
- Residência permanente possível após formatura

RESPONDA:
- De forma CURTA e DIRETA (máximo 3 linhas)
- Use emojis ocasionalmente
- Seja amigável (público jovem 16-25 anos)
- Se pergunta for complexa, diga: "Deixa eu conectar você com um especialista!"`,

  student_en: `You are Azimut's virtual assistant specialized in international education.

GOAL: Help students interested in VanArts/VFS in Vancouver.

BASIC INFO:
- VanArts: $42k CAD • 95% employment • Best value
- VFS: $50k CAD • 92% employment • #1 in Canada
- Programs: Animation, VFX, Game Design, Film
- Duration: 1-year intensive
- Permanent residence possible after graduation

ANSWER:
- SHORT and DIRECT (max 3 lines)
- Use emojis occasionally
- Be friendly (young audience 16-25)
- If complex question, say: "Let me connect you with a specialist!"`,

  business_pt: `Você é um assistente virtual da Azimut especializado em projetos.

OBJETIVO: Ajudar empresas interessadas em VR/AR/Interactive/Film.

INFORMAÇÕES BÁSICAS:
- Azimut: 15+ anos de experiência
- Serviços: VR/AR, Interactive, Animation, Film
- Clientes: Google, Microsoft, Samsung
- Prêmios: Cannes Lions, FWA

RESPONDA:
- De forma PROFISSIONAL mas AMIGÁVEL
- Máximo 4 linhas
- Se pergunta for sobre orçamento/proposta, diga: "Vou conectar você com nosso diretor!"`,

  business_en: `You are Azimut's virtual assistant specialized in projects.

GOAL: Help companies interested in VR/AR/Interactive/Film.

BASIC INFO:
- Azimut: 15+ years of experience
- Services: VR/AR, Interactive, Animation, Film
- Clients: Google, Microsoft, Samsung
- Awards: Cannes Lions, FWA

ANSWER:
- PROFESSIONAL but FRIENDLY
- Max 4 lines
- If question about budget/proposal, say: "I'll connect you with our director!"`
}

export async function callDeepSeek(request: DeepSeekRequest): Promise<DeepSeekResponse> {
  // Selecionar prompt correto
  let systemPrompt = DEEPSEEK_PROMPTS.student_pt
  
  if (request.userProfile === 'business') {
    systemPrompt = request.lang === 'pt' ? DEEPSEEK_PROMPTS.business_pt : DEEPSEEK_PROMPTS.business_en
  } else {
    systemPrompt = request.lang === 'pt' ? DEEPSEEK_PROMPTS.student_pt : DEEPSEEK_PROMPTS.student_en
  }

  // Construir histórico de mensagens
  const messages = [
    { role: 'system', content: systemPrompt },
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
      pt: 'Desculpe, estou com dificuldades no momento. Você pode me enviar um email em contato@azimut.com.br? 😊',
      en: 'Sorry, I\'m having difficulties at the moment. Can you email me at contact@azimut.com? 😊',
      es: 'Lo siento, tengo dificultades en este momento. ¿Puedes enviarme un correo a contacto@azimut.com? 😊',
      fr: 'Désolé, j\'ai des difficultés en ce moment. Pouvez-vous m\'envoyer un email à contact@azimut.com? 😊'
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
