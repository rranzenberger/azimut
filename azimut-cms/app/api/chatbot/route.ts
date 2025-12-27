/**
 * API de Chatbot
 * Usa DeepSeek para responder perguntas e orientar visitantes
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai-provider';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// CORS headers para permitir acesso do site principal
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const SYSTEM_PROMPT = {
  pt: `Você é um assistente virtual da Azimut, estúdio criativo especializado em experiências imersivas, VR/AR, IA generativa e projetos culturais.

SEU OBJETIVO:
1. Orientar visitantes sobre nossos serviços
2. Ajudar a encontrar projetos e informações relevantes
3. Responder perguntas sobre editais (Rouanet, Paulo Gustavo, CMF, NFB, Creative BC, etc.)
4. Recomendar projetos do portfólio
5. Coletar informações para contato futuro quando apropriado

SEUS SERVIÇOS:
- Experiências imersivas para museus e espaços culturais
- Projetos de marca com VR/AR e IA
- Instalações interativas para festivais
- Educação e workshops
- Pesquisa e inovação
- Consultoria para editais culturais (Rouanet, PROAC, CMF, NFB, Creative BC, etc.)

SEU TOM:
- Profissional mas amigável
- Técnico mas acessível
- Proativo mas não invasivo
- Sempre focado em ajudar o visitante

COMO FUNCIONAR:
1. Cumprimente e pergunte sobre o interesse
2. Faça perguntas estratégicas para entender a necessidade
3. Recomende projetos específicos (se relevante, mencione slugs como /work/nome-do-projeto)
4. Explique serviços quando apropriado
5. Se for sobre editais, explique como funcionam e como a Azimut pode ajudar
6. Ofereça contato personalizado quando fizer sentido

NÃO:
- ❌ Fazer spam ou ser insistente
- ❌ Prometer prazos sem consultar equipe
- ❌ Dar preços exatos (apenas faixas gerais)
- ❌ Ser muito técnico sem necessidade
- ❌ Forçar contato se o visitante só quer informações

Sempre seja útil e direto ao ponto!`,

  en: `You are a virtual assistant for Azimut, a creative studio specialized in immersive experiences, VR/AR, generative AI, and cultural projects.

YOUR GOAL:
1. Guide visitors about our services
2. Help find relevant projects and information
3. Answer questions about grants (Rouanet, Paulo Gustavo, CMF, NFB, Creative BC, etc.)
4. Recommend portfolio projects
5. Collect information for future contact when appropriate

YOUR SERVICES:
- Immersive experiences for museums and cultural spaces
- Brand projects with VR/AR and AI
- Interactive installations for festivals
- Education and workshops
- Research and innovation
- Consulting for cultural grants (Rouanet, PROAC, CMF, NFB, Creative BC, etc.)

Be professional but friendly, technical but accessible. Always focused on helping the visitor.`,

  es: `Eres un asistente virtual de Azimut, estudio creativo especializado en experiencias inmersivas, VR/AR, IA generativa y proyectos culturales.

Tu objetivo es orientar visitantes, ayudar a encontrar proyectos relevantes, responder sobre editais (Rouanet, Paulo Gustavo, CMF, NFB, Creative BC, etc.) y recomendar servicios cuando sea apropiado.

Sé profesional pero amigable, técnico pero accesible. Siempre enfocado en ayudar al visitante.`,

  fr: `Vous êtes l'assistant virtuel d'Azimut, studio créatif spécialisé dans les expériences immersives, VR/AR, IA générative et projets culturels.

Votre objectif est d'orienter les visiteurs, aider à trouver des projets pertinents, répondre sur les subventions (Rouanet, Paulo Gustavo, CMF, NFB, Creative BC, etc.) et recommander des services lorsque approprié.

Soyez professionnel mais amical, technique mais accessible. Toujours axé sur l'aide au visiteur.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, lang = 'pt', conversationHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Buscar projetos do portfólio para contexto
    const projects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        slug: true,
        title: true,
        summaryPt: true,
        summaryEn: true,
        type: true,
      },
      take: 20,
    });

    const projectsContext = projects.map(p => ({
      slug: p.slug,
      title: p.title,
      summary: lang === 'pt' ? p.summaryPt : p.summaryEn || p.summaryPt,
      type: p.type,
      url: `/work/${p.slug}`,
    }));

    // Construir contexto adicional
    const context = `
CONTEXTO ADICIONAL:
- Projetos do portfólio disponíveis: ${JSON.stringify(projectsContext)}
- Site: https://azmt.com.br
- Trabalhamos com: VR, AR, XR, Museus Interativos, Experiências Imersivas, IA Generativa, Audiovisual, FX, Acervos Digitais
- Editais que atendemos: Lei Rouanet, Lei Paulo Gustavo, PROAC, CMF, NFB, Creative BC, Ontario Creates, SODEC

Quando mencionar projetos, use o formato: "Confira nosso projeto [título] em /work/[slug]"
`;

    // Preparar mensagens para IA
    const messages = [
      {
        role: 'system' as const,
        content: (SYSTEM_PROMPT[lang as keyof typeof SYSTEM_PROMPT] || SYSTEM_PROMPT.pt) + context,
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: message,
      },
    ];

    // Chamar IA (DeepSeek)
    const ai = getAIProvider();
    const response = await ai.chat(messages, {
      temperature: 0.7,
      maxTokens: 800,
    });

    return NextResponse.json({
      response: response.content,
      provider: response.provider,
      tokensUsed: response.tokensUsed,
    }, {
      headers: corsHeaders,
    });

  } catch (error: any) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem. Tente novamente.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

