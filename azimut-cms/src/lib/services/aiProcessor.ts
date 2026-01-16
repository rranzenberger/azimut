// ════════════════════════════════════════════════════════════
// SERVIÇO: Processamento com IA
// Reescreve textos, melhora SEO, gera títulos
// ════════════════════════════════════════════════════════════

interface AIProcessingOptions {
  language?: 'pt' | 'en' | 'es' | 'fr';
  improveSEO?: boolean;
  addKeywords?: string[];
  creditText?: string;
  azimutContributions?: string[];
}

interface AIProcessingResult {
  title: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * Processa texto com OpenAI GPT para reescrever e melhorar
 */
export async function processWithOpenAI(
  originalText: string,
  options: AIProcessingOptions = {}
): Promise<AIProcessingResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('OpenAI API key não configurada. Retornando texto original.');
    return {
      title: 'Título não gerado',
      excerpt: originalText.substring(0, 200),
      content: originalText,
    };
  }

  try {
    const language = options.language || 'pt';
    const creditInfo = options.creditText 
      ? `\n\nIMPORTANTE: Adicione o crédito "${options.creditText}" no texto de forma natural.`
      : '';
    
    const contributionsInfo = options.azimutContributions && options.azimutContributions.length > 0
      ? `\n\nDestaque as contribuições da Azimut: ${options.azimutContributions.join(', ')}.`
      : '';

    const keywordsInfo = options.addKeywords && options.addKeywords.length > 0
      ? `\n\nInclua naturalmente estas palavras-chave: ${options.addKeywords.join(', ')}.`
      : '';

    const seoInstruction = options.improveSEO
      ? '\n\nOtimize o texto para SEO: use títulos (H2, H3), parágrafos curtos, e palavras-chave relevantes.'
      : '';

    const prompt = `Você é um redator especializado em criar conteúdo para blog sobre projetos audiovisuais e imersivos.

TAREFA: Reescreva o seguinte texto mantendo todas as informações importantes, mas:
1. Evite plágio - use suas próprias palavras e estrutura
2. Torne o texto mais envolvente e profissional
3. Mantenha o tom informativo e técnico quando apropriado
4. Use parágrafos bem estruturados${seoInstruction}${creditInfo}${contributionsInfo}${keywordsInfo}

TEXTO ORIGINAL:
${originalText}

INSTRUÇÕES ADICIONAIS:
- Crie um título atrativo e SEO-friendly
- Crie um resumo (excerpt) de 2-3 frases
- O conteúdo deve ter pelo menos 300 palavras
- Use linguagem ${language === 'pt' ? 'português brasileiro' : language === 'en' ? 'inglês' : language === 'es' ? 'espanhol' : 'francês'}

FORMATO DE RESPOSTA (JSON):
{
  "title": "Título do post",
  "excerpt": "Resumo de 2-3 frases",
  "content": "Conteúdo completo reescrito",
  "seoTitle": "Título otimizado para SEO (máx 60 caracteres)",
  "seoDescription": "Descrição para SEO (máx 160 caracteres)"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Usar modelo mais barato para produção
        messages: [
          {
            role: 'system',
            content: 'Você é um redator profissional especializado em conteúdo para blog sobre tecnologia, audiovisual e experiências imersivas.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // Tentar parsear JSON da resposta
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          title: parsed.title || 'Título não gerado',
          excerpt: parsed.excerpt || originalText.substring(0, 200),
          content: parsed.content || originalText,
          seoTitle: parsed.seoTitle,
          seoDescription: parsed.seoDescription,
        };
      }
    } catch (parseError) {
      console.warn('Erro ao parsear JSON da resposta da IA:', parseError);
    }

    // Fallback: extrair título e conteúdo do texto
    const lines = content.split('\n').filter((l: string) => l.trim());
    const title = lines.find((l: string) => l.includes('Título') || l.length < 100) || 'Título não gerado';
    const contentStart = lines.findIndex((l: string) => l.length > 100);
    const processedContent = contentStart >= 0 
      ? lines.slice(contentStart).join('\n\n')
      : content;

    return {
      title: title.replace(/^(Título|Title):\s*/i, '').trim(),
      excerpt: processedContent.substring(0, 200),
      content: processedContent,
    };
  } catch (error) {
    console.error('Erro ao processar com OpenAI:', error);
    // Fallback: retornar texto original com melhorias básicas
    return {
      title: 'Título não gerado',
      excerpt: originalText.substring(0, 200),
      content: originalText,
    };
  }
}

/**
 * Processa texto em múltiplos idiomas
 */
export async function processMultiLanguage(
  originalText: string,
  languages: ('pt' | 'en' | 'es' | 'fr')[],
  options: AIProcessingOptions = {}
): Promise<Record<string, AIProcessingResult>> {
  const results: Record<string, AIProcessingResult> = {};

  for (const lang of languages) {
    results[lang] = await processWithOpenAI(originalText, {
      ...options,
      language: lang,
    });
  }

  return results;
}

/**
 * Gera apenas título e excerpt (mais rápido e barato)
 */
export async function generateTitleAndExcerpt(
  content: string,
  language: 'pt' | 'en' | 'es' | 'fr' = 'pt'
): Promise<{ title: string; excerpt: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      title: 'Título não gerado',
      excerpt: content.substring(0, 200),
    };
  }

  try {
    const prompt = `Crie um título atrativo e um resumo (excerpt) de 2-3 frases para este conteúdo de blog:

${content.substring(0, 1000)}

Responda em formato JSON:
{
  "title": "Título aqui",
  "excerpt": "Resumo aqui"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || 'Título não gerado',
        excerpt: parsed.excerpt || content.substring(0, 200),
      };
    }

    return {
      title: 'Título não gerado',
      excerpt: content.substring(0, 200),
    };
  } catch (error) {
    console.error('Erro ao gerar título e excerpt:', error);
    return {
      title: 'Título não gerado',
      excerpt: content.substring(0, 200),
    };
  }
}
