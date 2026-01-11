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
  const prompt = `Você é Ranz Enberger, Creative & Technology Director da Azimut (empresa de VR/Cinema/Instalações Imersivas).

CONTEXTO DO LEAD:
- Nome: ${data.name}
- Interesse: ${data.interest || data.project || 'Projetos imersivos'}
- Orçamento: ${data.budget || 'Não informado'}
- Localização: ${data.location?.city || 'Desconhecida'}, ${data.location?.country || ''}
- Páginas visitadas: ${data.pagesVisited?.join(', ') || 'Homepage'}
- Tempo no site: ${data.timeOnSite ? Math.round(data.timeOnSite / 60) : '?'} minutos

TAREFA:
Escreva um email de resposta PERSONALIZADO para este lead.

REGRAS:
1. Use TOM AMIGÁVEL mas PROFISSIONAL
2. Mencione algo ESPECÍFICO do interesse dele (VR, Cinema, etc.)
3. Se tiver cidade, faça SMALL TALK sobre clima/cultura local (1 frase)
4. Mencione 1 CASE SIMILAR que fizemos (ex: Museu Olímpico se for museu)
5. Proponha PRÓXIMO PASSO claro (reunião, demo, orçamento)
6. Seja BREVE (máximo 150 palavras)
7. Assine como "Ranz" ou "Equipe Azimut" (depende do tom)

FORMATO:
Apenas o corpo do email, sem subject.
Use emojis com moderação (1-2 no máximo).
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
  
  return `Olá ${firstName}! 👋

Obrigado pelo interesse em nossos projetos de ${data.interest || 'experiências imersivas'}!

Vi que você navegou pelo nosso site e se interessou especialmente por ${data.interest || 'nossos serviços'}. Trabalhamos em projetos similares como o Museu Olímpico do Rio, com tour virtual 360° completo e instalações interativas.

${data.budget === 'Alto' || data.budget === 'High' ? 'Com o orçamento que você mencionou, podemos criar algo realmente especial.' : 'Podemos adaptar a solução ao seu orçamento e cronograma.'}

Que tal marcarmos uma conversa para entender melhor sua visão? Posso te mostrar alguns casos práticos e discutir viabilidade.

Abraço,
Ranz Enberger
Creative & Technology Director
Azimut

📱 WhatsApp: [número]
🌐 azimutimmersive.com`
}

/**
 * Gerar resumo IA para o TIME (email interno)
 */
export async function generateInternalSummary(data: LeadData): Promise<string> {
  const score = data.score || 50
  const temp = score >= 70 ? 'HOT 🔥' : score >= 40 ? 'WARM 🟡' : 'COLD ❄️'
  
  return `
<div style="font-family: monospace; background: #f5f5f5; padding: 20px; border-radius: 8px;">
  <h2 style="color: #c92337;">🤖 ANÁLISE AUTOMÁTICA DO LEAD</h2>
  
  <h3>📊 SCORE: ${score}/100 (${temp})</h3>
  
  <h4>👤 PERFIL:</h4>
  <ul>
    <li>Nome: ${data.name}</li>
    <li>Email: ${data.email}</li>
    <li>Empresa: ${data.company || 'N/A'}</li>
    <li>Localização: ${data.location?.city || '?'}, ${data.location?.country || '?'}</li>
  </ul>
  
  <h4>🧠 COMPORTAMENTO:</h4>
  <ul>
    <li>Tempo no site: ${data.timeOnSite ? Math.round(data.timeOnSite / 60) : '?'} minutos</li>
    <li>Páginas: ${data.pagesVisited?.length || '?'}</li>
    <li>Interesse: ${data.interest || data.project || 'Geral'}</li>
  </ul>
  
  <h4>💡 RECOMENDAÇÃO:</h4>
  <p>
    ${score >= 70 
      ? '⚡ RESPONDER URGENTE (alta probabilidade de conversão)'
      : score >= 40
      ? '📞 Responder em 24h (potencial médio)'
      : '📧 Responder em 48h (baixa urgência)'}
  </p>
  
  <p><strong>Formulário:</strong> ${data.formType}</p>
  <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
</div>
`
}
