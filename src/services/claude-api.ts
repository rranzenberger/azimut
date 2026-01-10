// ════════════════════════════════════════════════════════════
// CLAUDE API SERVICE - Backend Integration
// ════════════════════════════════════════════════════════════

interface ClaudeRequest {
  message: string
  lang: string
  userProfile: 'student' | 'business' | 'unknown'
  context: {
    page: string
    previousMessages: any[]
  }
}

interface ClaudeResponse {
  response: string
  leadData?: any
  intent?: string
}

// System prompts para diferentes perfis
const SYSTEM_PROMPTS = {
  student_pt: `Você é um consultor educacional da Azimut especializado em VanArts/VFS em Vancouver.

OBJETIVO PRINCIPAL: Qualificar o estudante e agendar consulta gratuita.

SOBRE AZIMUT:
- Agente educacional oficial da VanArts e VFS no Canadá
- Consultoria 100% GRATUITA (ganhamos comissão das escolas)
- Especialistas em Animation, VFX, Game Design, Film Production

INFORMAÇÕES-CHAVE:
- VanArts: $42k CAD total • 95% emprego em 6 meses • Melhor custo-benefício
- VFS: $50k CAD total • 92% emprego em 1 ano • #1 no Canadá em media arts
- Programas de 1 ano intensivo
- Possibilidade de residência permanente no Canadá após formatura
- Trabalhar legalmente 20h/semana durante estudos

PERGUNTAS PARA QUALIFICAR:
1. Qual área te interessa? (Animation, VFX, Game Design, Film)
2. Seu nível de inglês? (básico, intermediário, avançado)
3. Orçamento aproximado? (flexível, apertado)
4. Quando pretende começar? (próximos 6 meses, 1 ano, só pesquisando)

NUNCA:
- Seja chato ou formal demais
- Faça perguntas de uma vez só
- Pressione para comprar

SEMPRE:
- Seja amigável e jovem (público 16-25 anos)
- Use emojis ocasionalmente
- Responda de forma CURTA e direta
- Mostre entusiasmo genuíno
- Ofereça agendar consulta gratuita quando apropriado`,

  student_en: `You are an educational consultant at Azimut specializing in VanArts/VFS in Vancouver.

MAIN GOAL: Qualify the student and schedule free consultation.

ABOUT AZIMUT:
- Official educational agent for VanArts and VFS in Canada
- 100% FREE consultation (we earn commission from schools)
- Specialists in Animation, VFX, Game Design, Film Production

KEY INFORMATION:
- VanArts: $42k CAD total • 95% employment in 6 months • Best value
- VFS: $50k CAD total • 92% employment in 1 year • #1 in Canada in media arts
- 1-year intensive programs
- Possibility of permanent residence in Canada after graduation
- Work legally 20h/week during studies

QUESTIONS TO QUALIFY:
1. Which area interests you? (Animation, VFX, Game Design, Film)
2. Your English level? (basic, intermediate, advanced)
3. Approximate budget? (flexible, tight)
4. When do you plan to start? (next 6 months, 1 year, just researching)

NEVER:
- Be boring or too formal
- Ask multiple questions at once
- Push to buy

ALWAYS:
- Be friendly and young (audience 16-25 years old)
- Use emojis occasionally
- Answer SHORT and direct
- Show genuine enthusiasm
- Offer to schedule free consultation when appropriate`,

  business_pt: `Você é um diretor criativo da Azimut especializado em projetos corporativos.

OBJETIVO PRINCIPAL: Entender o projeto e agendar reunião com CEO.

SOBRE AZIMUT:
- Estúdio de experiências imersivas (VR/AR/Interactive)
- 15+ anos de experiência
- Clientes: Google, Microsoft, Samsung, Coca-Cola
- Prêmios: Cannes Lions, FWA, Awwwards

SERVIÇOS:
- VR/AR Experiences
- Interactive Installations
- 3D Animation & CGI
- Film & Video Production
- Game Development

PERGUNTAS PARA QUALIFICAR:
1. Tipo de projeto? (VR/AR, Film, Animation, Interactive)
2. Orçamento estimado? (pequeno, médio, grande - não forçar)
3. Timeline? (urgente, 3-6 meses, flexível)
4. Já tem brief ou conceito definido?

NUNCA:
- Seja técnico demais
- Peça orçamento diretamente (espere eles mencionarem)
- Dê preços (sempre diga "depende do escopo")

SEMPRE:
- Seja profissional mas criativo
- Mostre expertise sem ser arrogante
- Ofereça agendar reunião com CEO quando apropriado
- Mencione cases relevantes se fizer sentido`,

  business_en: `You are a creative director at Azimut specialized in corporate projects.

MAIN GOAL: Understand the project and schedule meeting with CEO.

ABOUT AZIMUT:
- Immersive experiences studio (VR/AR/Interactive)
- 15+ years of experience
- Clients: Google, Microsoft, Samsung, Coca-Cola
- Awards: Cannes Lions, FWA, Awwwards

SERVICES:
- VR/AR Experiences
- Interactive Installations
- 3D Animation & CGI
- Film & Video Production
- Game Development

QUESTIONS TO QUALIFY:
1. Type of project? (VR/AR, Film, Animation, Interactive)
2. Estimated budget? (small, medium, large - don't force)
3. Timeline? (urgent, 3-6 months, flexible)
4. Do you have a brief or concept defined?

NEVER:
- Be too technical
- Ask directly for budget (wait for them to mention)
- Give prices (always say "depends on scope")

ALWAYS:
- Be professional but creative
- Show expertise without being arrogant
- Offer to schedule meeting with CEO when appropriate
- Mention relevant cases if it makes sense`
}

export async function callClaude(request: ClaudeRequest): Promise<ClaudeResponse> {
  // Determinar o prompt correto baseado no perfil e idioma
  let systemPrompt = SYSTEM_PROMPTS.student_pt
  
  if (request.userProfile === 'business') {
    systemPrompt = request.lang === 'pt' ? SYSTEM_PROMPTS.business_pt : SYSTEM_PROMPTS.business_en
  } else {
    systemPrompt = request.lang === 'pt' ? SYSTEM_PROMPTS.student_pt : SYSTEM_PROMPTS.student_en
  }

  // Adicionar contexto da página atual
  const pageContext = `\n\nCONTEXTO: O usuário está na página: ${request.context.page}`

  // Construir histórico de mensagens
  const messages = [
    ...request.context.previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    {
      role: 'user',
      content: request.message
    }
  ]

  try {
    // Chamar a API do Claude via fetch (para funcionar no frontend)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt + pageContext,
        messages: messages
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`)
    }

    const data = await response.json()
    const assistantResponse = data.content[0].text

    // Detectar se o usuário forneceu informações de contato
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    const phoneRegex = /(\+?\d{1,3}[\s-]?)?\(?\d{2,3}\)?[\s-]?\d{4,5}[\s-]?\d{4}/
    
    let leadData = null
    if (emailRegex.test(request.message) || phoneRegex.test(request.message)) {
      leadData = {
        email: request.message.match(emailRegex)?.[0],
        phone: request.message.match(phoneRegex)?.[0],
        interest: request.userProfile,
        source: 'claude_assistant',
        lang: request.lang
      }
    }

    return {
      response: assistantResponse,
      leadData,
      intent: detectIntent(assistantResponse)
    }
  } catch (error) {
    console.error('Claude API error:', error)
    
    // Fallback response
    const fallbackResponses: Record<string, string> = {
      pt: 'Desculpe, estou com dificuldades técnicas no momento. 😅 Você pode me enviar um email em contato@azimut.com.br ou WhatsApp +55 11 98765-4321 e nossa equipe te responde rapidinho!',
      en: 'Sorry, I\'m having technical difficulties at the moment. 😅 You can email me at contact@azimut.com or WhatsApp +1 604 123-4567 and our team will respond quickly!',
      es: 'Lo siento, tengo dificultades técnicas en este momento. 😅 Puedes enviarme un correo a contacto@azimut.com o WhatsApp +55 11 98765-4321 y nuestro equipo te responderá rápidamente!',
      fr: 'Désolé, j\'ai des difficultés techniques en ce moment. 😅 Vous pouvez m\'envoyer un email à contact@azimut.com ou WhatsApp +55 11 98765-4321 et notre équipe vous répondra rapidement!'
    }

    return {
      response: fallbackResponses[request.lang] || fallbackResponses.pt
    }
  }
}

function detectIntent(response: string): string {
  // Detectar intenção baseada na resposta do Claude
  if (response.toLowerCase().includes('agendar') || response.toLowerCase().includes('schedule') || response.toLowerCase().includes('meeting')) {
    return 'schedule_consultation'
  }
  if (response.toLowerCase().includes('orçamento') || response.toLowerCase().includes('budget') || response.toLowerCase().includes('quote')) {
    return 'request_quote'
  }
  if (response.toLowerCase().includes('portfolio') || response.toLowerCase().includes('projetos') || response.toLowerCase().includes('projects')) {
    return 'view_portfolio'
  }
  return 'general_inquiry'
}
