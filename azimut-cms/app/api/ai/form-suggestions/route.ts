import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai-provider';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

/**
 * API de Sugestões IA para Formulário
 * Fornece sugestões em tempo real enquanto usuário preenche
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Buscar projetos relevantes
    const relevantProjects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
        ...(data.projectType && {
          type: {
            contains: data.projectType.toUpperCase(),
            mode: 'insensitive',
          },
        }),
      },
      take: 5,
      include: {
        tags: true,
      },
    });

    // Tentar usar IA (com fallback seguro)
    let suggestions = null;
    try {
      const hasAI = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

      if (hasAI) {
        const ai = getAIProvider();

        const prompt = `
Você está ajudando um visitante a preencher um formulário de contato para um estúdio criativo.

DADOS PARCIAIS:
- Tipo Organização: ${data.organizationType || 'Não definido'}
- Tipo Projeto: ${data.projectType || 'Não definido'}
- Budget: ${data.budget || 'Não definido'}
- Descrição: ${data.description ? data.description.substring(0, 200) : 'Não fornecida'}

PROJETOS DISPONÍVEIS:
${relevantProjects.map((p) => `- ${p.title} (${p.type})`).join('\n')}

TAREFA:
Forneça sugestões úteis e encorajadoras em JSON:

{
  "message": "Mensagem encorajadora e útil (1-2 frases)",
  "projectSuggestions": ["Lista de 2-3 projetos que podem interessar"],
  "budgetSuggestion": "Sugestão de budget se não definido",
  "nextSteps": ["Próximos passos sugeridos"]
}

Seja amigável, útil e não invasivo. Não seja muito longo.
`;

        const response = await ai.chat(
          [
            {
              role: 'system',
              content:
                'Você é um assistente amigável que ajuda visitantes a preencher formulários. Sempre responda em JSON válido. Seja conciso e útil.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          {
            temperature: 0.5,
            maxTokens: 400,
          }
        );

        suggestions = JSON.parse(response.content);
        suggestions.aiEnabled = true;
      }
    } catch (error: any) {
      console.warn('IA falhou, usando fallback:', error.message);
      // Continua para fallback
    }

    // Fallback: sugestões básicas sem IA
    if (!suggestions) {
      const projectNames = relevantProjects.slice(0, 3).map((p) => p.title);
      
      suggestions = {
        message: data.organizationType && data.projectType
          ? `Ótimo! Vejo que você está interessado em ${data.projectType}. Estamos aqui para ajudar!`
          : 'Continue preenchendo o formulário. Responderemos em até 24 horas.',
        projectSuggestions: projectNames.length > 0
          ? projectNames
          : ['Confira nossos projetos no portfólio'],
        budgetSuggestion: !data.budget
          ? 'Se não tem budget definido, podemos ajudar a encontrar grants/editais'
          : null,
        nextSteps: [
          'Preencha todos os campos para receber uma proposta personalizada',
          'Nossa equipe entrará em contato em até 24 horas',
        ],
        aiEnabled: false,
        fallback: true,
      };
    }

    return NextResponse.json(suggestions);
  } catch (error: any) {
    console.error('Form suggestions error:', error);
    // Fallback mínimo
    return NextResponse.json({
      message: 'Estamos aqui para ajudar!',
      projectSuggestions: [],
      budgetSuggestion: null,
      nextSteps: ['Continue preenchendo o formulário'],
      fallback: true,
    });
  }
}
