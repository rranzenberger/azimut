// ════════════════════════════════════════════════════════════
// AI WRITING ASSISTANT API - Backoffice Helper
// ════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { fieldName, currentValue, lang, type } = await request.json()

    // Prompts específicos por tipo de conteúdo
    const prompts: Record<string, string> = {
      title: `Você é um copywriter expert. Crie 3 títulos CURTOS e IMPACTANTES em ${lang} para:
Campo: ${fieldName}
Contexto atual: "${currentValue || 'Novo projeto'}"

REGRAS:
- Máximo 60 caracteres
- SEO-friendly
- Chamar atenção
- Profissional mas criativo

Responda APENAS com as 3 opções separadas por | (pipe)`,

      description: `Você é um copywriter expert. Crie 3 descrições PERSUASIVAS em ${lang} para:
Campo: ${fieldName}
Contexto atual: "${currentValue || 'Novo conteúdo'}"

REGRAS:
- 100-150 palavras
- Destacar benefícios
- Call-to-action sutil
- SEO-friendly

Responda APENAS com as 3 opções separadas por ||| (3 pipes)`,

      summary: `Você é um editor expert. Crie 3 resumos CONCISOS em ${lang} para:
Campo: ${fieldName}
Texto original: "${currentValue}"

REGRAS:
- Máximo 50 palavras
- Manter ideia principal
- Linguagem clara
- Sem perder contexto

Responda APENAS com as 3 opções separadas por | (pipe)`,

      tags: `Você é um especialista em SEO. Sugira 5-7 tags relevantes em ${lang} para:
Campo: ${fieldName}
Contexto: "${currentValue}"

REGRAS:
- Tags específicas (não genéricas)
- SEO-friendly
- Relacionadas ao conteúdo
- Mix de termos populares e nicho

Responda APENAS com as tags separadas por vírgula`
    }

    const promptText = prompts[type] || prompts.description

    // Chamar DeepSeek (barato para backoffice!)
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: promptText }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Parse respostas baseado no tipo
    let suggestions: string[]

    if (type === 'tags') {
      suggestions = aiResponse.split(',').map((s: string) => s.trim())
    } else if (type === 'description') {
      suggestions = aiResponse.split('|||').map((s: string) => s.trim())
    } else {
      suggestions = aiResponse.split('|').map((s: string) => s.trim())
    }

    // Filtrar vazios
    suggestions = suggestions.filter((s: string) => s.length > 0)

    return NextResponse.json({
      suggestions,
      type,
      lang
    })
  } catch (error) {
    console.error('AI Writing Assistant error:', error)
    
    // Fallback: sugestões genéricas
    return NextResponse.json({
      suggestions: [
        'Erro ao gerar sugestões com IA.',
        'Verifique se a API key está configurada.',
        'Tente novamente em alguns instantes.'
      ],
      error: true
    }, { status: 500 })
  }
}
