/**
 * API de Tradução Automática
 * Usa IA (DeepSeek/OpenRouter) para traduzir textos entre idiomas
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { AIProviderService } from '@/src/lib/ai-provider';

export const runtime = 'nodejs';

const LANG_MAP: Record<string, string> = {
  pt: 'português',
  en: 'inglês',
  es: 'espanhol',
  fr: 'francês',
};

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { text, from = 'pt', to } = body;

    if (!text || !to) {
      return NextResponse.json(
        { error: 'Texto e idioma de destino são obrigatórios' },
        { status: 400 }
      );
    }

    if (from === to) {
      return NextResponse.json({ translatedText: text });
    }

    // Criar prompt de tradução
    const fromLang = LANG_MAP[from] || from;
    const toLang = LANG_MAP[to] || to;

    const prompt = `Traduza o seguinte texto do ${fromLang} para ${toLang}. 
Retorne APENAS o texto traduzido, sem explicações, sem comentários, sem aspas, sem formatação extra.

Texto a traduzir:
"${text}"

Tradução:`;

    // Usar serviço de IA para traduzir
    const aiService = new AIProviderService();
    const response = await aiService.chat(
      [
        {
          role: 'user',
          content: prompt,
        },
      ],
      {
        temperature: 0.3, // Temperatura baixa para traduções mais consistentes
        maxTokens: 1000,
      }
    );

    const translatedText = response.content.trim();

    // Remover aspas se tiver
    const cleanedText = translatedText.replace(/^["']|["']$/g, '').trim();

    return NextResponse.json({
      translatedText: cleanedText,
      originalText: text,
      from,
      to,
    });
  } catch (error: any) {
    console.error('Translate API error:', error);
    return NextResponse.json(
      { error: 'Erro ao traduzir texto. Verifique a configuração da API de IA.' },
      { status: 500 }
    );
  }
}


