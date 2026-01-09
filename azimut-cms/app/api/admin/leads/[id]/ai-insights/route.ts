import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

/**
 * API de Insights IA para Leads
 * Usa DeepSeek/OpenAI com fallback seguro
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: {
            interestScore: true,
            pageViews: {
              take: 10,
              orderBy: { viewedAt: 'desc' },
              include: {
                project: {
                  select: {
                    id: true,
                    slug: true,
                    title: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    }

    const conversionScore = lead.sessions?.[0]?.interestScore?.conversionScore || lead.leadScore;
    const visitorType = lead.sessions?.[0]?.interestScore?.visitorType;
    const hoursSinceCreation = Math.floor(
      (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60)
    );
    const daysSinceCreation = Math.floor(hoursSinceCreation / 24);

    // Buscar projetos similares
    const similarProjects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
        ...(lead.projectType && {
          type: {
            contains: lead.projectType.toUpperCase(),
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
    let aiInsights = null;
    try {
      // Verificar se IA está configurada
      const hasAI = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
      
      if (hasAI) {
        const { getAIProvider } = await import('@/lib/ai-provider');
        const ai = getAIProvider();

        const prompt = `
Você é um especialista em CRM e vendas B2B para estúdios criativos.

ANÁLISE COMPLETA DO LEAD:

DADOS BÁSICOS:
- Nome: ${lead.name}
- Email: ${lead.email}
- Empresa: ${lead.company || 'N/A'}
- Cargo: ${lead.position || 'N/A'}
- Tipo Organização: ${lead.organizationType || 'N/A'}
- País: ${lead.country || 'N/A'}
- Cidade: ${lead.city || 'N/A'}

PROJETO:
- Tipo: ${lead.projectType || 'N/A'}
- Budget: ${lead.budget || 'N/A'}
- Timeline: ${lead.timeline || 'N/A'}
- Descrição: ${lead.description ? lead.description.substring(0, 200) : 'N/A'}
- Interesse em Grants: ${lead.interestInGrants ? 'Sim' : 'Não'}

SCORING:
- Lead Score: ${lead.leadScore}/100
- Conversion Score: ${conversionScore}/100
- Prioridade: ${lead.priority}
- Status: ${lead.status}
- Tipo Visitante (IA): ${visitorType || 'N/A'}

COMPORTAMENTO:
- Criado há: ${hoursSinceCreation} horas (${daysSinceCreation} dias)
- Último contato: ${lead.lastContactAt ? new Date(lead.lastContactAt).toLocaleDateString('pt-BR') : 'Nunca'}
- Páginas visitadas: ${lead.sessions?.[0]?.pageViews?.length || 0} páginas
- Responsável: ${lead.assignedTo?.name || 'Não atribuído'}

PROJETOS SIMILARES DISPONÍVEIS:
${similarProjects.map(p => `- ${p.title} (${p.type})`).join('\n')}

TAREFA:
Analise este lead e forneça insights acionáveis em JSON:

{
  "summary": "Resumo executivo do lead (2-3 frases)",
  "conversionProbability": 0-100,
  "estimatedValue": "R$ X ou estimativa",
  "urgency": "ALTA|MÉDIA|BAIXA",
  "recommendedActions": [
    {
      "action": "Contatar hoje às 14h",
      "reason": "Hot lead há 2h, melhor horário para museus",
      "priority": "URGENTE"
    }
  ],
  "suggestedStatus": "CONTACTED|PROPOSAL_SENT|NEGOTIATION",
  "suggestedPriority": "URGENT|HIGH|MEDIUM|LOW",
  "suggestedProjects": [
    {
      "projectId": "id",
      "reason": "Projeto similar que pode interessar"
    }
  ],
  "risks": ["Lista de riscos potenciais"],
  "opportunities": ["Lista de oportunidades"],
  "nextBestAction": "Ação mais importante agora",
  "timing": "Melhor momento para contato (ex: 'Hoje 14h-16h')",
  "personalizedMessage": "Mensagem personalizada para enviar ao lead",
  "emailSubject": "Assunto sugerido para email"
}

Seja específico, acionável e baseado em dados.
`;

        const response = await ai.chat(
          [
            {
              role: 'system',
              content:
                'Você é um especialista em CRM, vendas B2B e análise de leads. Sempre responda em JSON válido, sendo específico e acionável.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          {
            temperature: 0.3, // Baixa para análises determinísticas
            maxTokens: process.env.AI_MODE === 'max' ? 2000 : 1500, // Mais tokens para Opus
          }
        );

        aiInsights = JSON.parse(response.content);
        aiInsights.aiEnabled = true;
      }
    } catch (error: any) {
      console.warn('IA falhou, usando fallback:', error.message);
      // Continua para fallback
    }

    // Fallback: análise básica sem IA (sempre funciona)
    if (!aiInsights) {
      const urgency =
        lead.leadScore >= 80
          ? 'ALTA'
          : lead.leadScore >= 60
          ? 'MÉDIA'
          : 'BAIXA';

      const nextAction =
        lead.status === 'NEW' && hoursSinceCreation < 24
          ? 'Contatar o lead hoje - criado há menos de 24h'
          : lead.leadScore >= 70
          ? 'Priorizar este lead - score alto'
          : lead.status === 'NEW' && daysSinceCreation > 3
          ? 'Follow-up necessário - lead antigo sem contato'
          : 'Aguardar mais informações';

      aiInsights = {
        summary: `Lead ${lead.name} com score ${lead.leadScore}/100. ${
          lead.status === 'NEW'
            ? 'Aguardando primeiro contato.'
            : `Status atual: ${lead.status}.`
        } ${visitorType ? `Tipo identificado: ${visitorType.replace('_', ' ')}.` : ''}`,
        conversionProbability: conversionScore,
        estimatedValue: lead.estimatedValue
          ? `R$ ${lead.estimatedValue.toLocaleString('pt-BR')}`
          : lead.budget
          ? `Estimativa baseada em budget: ${lead.budget}`
          : 'Não estimado',
        urgency,
        recommendedActions: [
          {
            action: nextAction,
            reason: `Baseado em score ${lead.leadScore} e status ${lead.status}`,
            priority: urgency === 'ALTA' ? 'URGENTE' : 'NORMAL',
          },
        ],
        suggestedStatus:
          lead.status === 'NEW' && lead.leadScore >= 70
            ? 'CONTACTED'
            : lead.status,
        suggestedPriority: lead.priority,
        risks: [
          lead.status === 'NEW' && daysSinceCreation > 7
            ? 'Lead sem contato há mais de 7 dias - pode esfriar'
            : null,
          lead.leadScore < 40 ? 'Score baixo - pode não ser qualificado' : null,
        ].filter(Boolean) as string[],
        opportunities: [
          lead.leadScore >= 80 ? 'Score muito alto - alta probabilidade de conversão' : null,
          lead.interestInGrants
            ? 'Interesse em grants - pode ser projeto grande'
            : null,
          visitorType && visitorType.includes('MUSEUM')
            ? 'Tipo de visitante identificado - pode personalizar abordagem'
            : null,
        ].filter(Boolean) as string[],
        nextBestAction: nextAction,
        timing:
          hoursSinceCreation < 24
            ? 'Hoje (lead recente)'
            : daysSinceCreation < 3
            ? 'Esta semana'
            : 'Urgente - follow-up necessário',
        personalizedMessage: `Olá ${lead.name},\n\nObrigado pelo seu interesse em trabalhar conosco. Vi que você está interessado em ${lead.projectType || 'um projeto'}. Gostaria de agendar uma conversa para entender melhor suas necessidades?`,
        emailSubject: `Sobre seu projeto ${lead.projectType || ''}`,
        aiEnabled: false,
        fallback: true,
      };
    }

    // Adicionar dados calculados
    aiInsights.leadScore = lead.leadScore;
    aiInsights.conversionScore = conversionScore;
    aiInsights.visitorType = visitorType;
    aiInsights.hoursSinceCreation = hoursSinceCreation;
    aiInsights.daysSinceCreation = daysSinceCreation;
    aiInsights.hasBeenContacted = !!lead.lastContactAt;

    return NextResponse.json(aiInsights);
  } catch (error: any) {
    console.error('AI insights error:', error);
    return NextResponse.json(
      {
        error: 'Erro ao gerar insights',
        fallback: {
          summary: `Lead com score ${lead?.leadScore || 0}`,
          conversionProbability: lead?.leadScore || 0,
          urgency: 'MÉDIA',
          nextBestAction: 'Analisar lead manualmente',
        },
      },
      { status: 500 }
    );
  }
}
