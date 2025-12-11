/**
 * Sistema de IA para scoring de visitantes e recomendações
 * Identifica: curadores, secretarias de cultura, organizadores de festivais, etc.
 */

import { getAIProvider } from './ai-provider';
import { prisma } from './prisma';

export interface SessionData {
  sessionId: string;
  country?: string | null;
  language?: string | null;
  pagesVisited?: {
    slug: string;
    timeSpent: number;
    scrollDepth: number;
  }[];
  projectsViewed?: {
    projectId: string;
    type: string;
    tags: string[];
    timeSpent: number;
  }[];
  interactions?: {
    type: string;
    projectId?: string | null;
  }[];
}

interface ScoringResult {
  museumScore: number;
  brandScore: number;
  festivalScore: number;
  cityScore: number;
  educationScore: number;
  researchScore: number;
  vrScore: number;
  aiScore: number;
  installationScore: number;
  conversionScore: number;
  visitorType: string | null;
  recommendedProjects: Array<{
    projectId: string;
    score: number;
    reason: string;
  }>;
  suggestedAction: string;
  suggestedPage: string;
}

/**
 * Calcula scores de interesse baseado no comportamento
 */
export async function calculateInterestScores(
  sessionData: SessionData
): Promise<ScoringResult> {
  // 1. Análise baseada em regras (rápida)
  const ruleBasedScores = calculateRuleBasedScores(sessionData);

  // 2. Análise com IA (mais profunda)
  const aiEnhancedScores = await enhanceScoresWithAI(sessionData, ruleBasedScores);

  // 3. Salvar no banco
  await saveInterestScore(sessionData.sessionId, aiEnhancedScores);

  return aiEnhancedScores;
}

/**
 * Scores baseados em regras (sem chamar IA)
 */
function calculateRuleBasedScores(sessionData: SessionData): ScoringResult {
  const scores: ScoringResult = {
    museumScore: 0,
    brandScore: 0,
    festivalScore: 0,
    cityScore: 0,
    educationScore: 0,
    researchScore: 0,
    vrScore: 0,
    aiScore: 0,
    installationScore: 0,
    conversionScore: 0,
    visitorType: null,
    recommendedProjects: [],
    suggestedAction: '',
    suggestedPage: '',
  };

  // Analisar páginas visitadas
  (sessionData.pagesVisited || []).forEach(page => {
    if (page.slug === 'portfolio' || page.slug === 'work') {
      scores.conversionScore += 15;
    }
    if (page.slug === 'academy') {
      scores.educationScore += 20;
    }
    if (page.slug === 'research') {
      scores.researchScore += 25;
    }
    if (page.slug === 'contact') {
      scores.conversionScore += 30; // Muito interessado!
    }

    // Tempo gasto = interesse
    if (page.timeSpent > 60) {
      scores.conversionScore += 10;
    }
    if (page.scrollDepth > 75) {
      scores.conversionScore += 5;
    }
  });

  // Analisar projetos visualizados
  (sessionData.projectsViewed || []).forEach(project => {
    // Por tipo
    if (project.type === 'MUSEU') scores.museumScore += 15;
    if (project.type === 'MARCA') scores.brandScore += 15;
    if (project.type === 'FESTIVAL') scores.festivalScore += 15;
    if (project.type === 'CIDADE') scores.cityScore += 15;
    if (project.type === 'EDUCACAO') scores.educationScore += 15;

    // Por tags
    project.tags.forEach(tag => {
      if (tag.toLowerCase().includes('vr') || tag.toLowerCase().includes('xr')) {
        scores.vrScore += 10;
      }
      if (tag.toLowerCase().includes('ia') || tag.toLowerCase().includes('ai')) {
        scores.aiScore += 10;
      }
      if (tag.toLowerCase().includes('instalação') || tag.toLowerCase().includes('installation')) {
        scores.installationScore += 10;
      }
    });

    // Tempo no projeto
    if (project.timeSpent > 30) {
      scores.conversionScore += 15;
    }
  });

  // Analisar interações
  (sessionData.interactions || []).forEach(interaction => {
    if (interaction.type === 'CLICK') scores.conversionScore += 10;
    if (interaction.type === 'CONTACT') scores.conversionScore += 50;
    if (interaction.type === 'DOWNLOAD') scores.conversionScore += 30;
  });

  // Normalizar scores (máx 100)
  scores.museumScore = Math.min(100, scores.museumScore);
  scores.brandScore = Math.min(100, scores.brandScore);
  scores.festivalScore = Math.min(100, scores.festivalScore);
  scores.cityScore = Math.min(100, scores.cityScore);
  scores.educationScore = Math.min(100, scores.educationScore);
  scores.researchScore = Math.min(100, scores.researchScore);
  scores.vrScore = Math.min(100, scores.vrScore);
  scores.aiScore = Math.min(100, scores.aiScore);
  scores.installationScore = Math.min(100, scores.installationScore);
  scores.conversionScore = Math.min(100, scores.conversionScore);

  // Inferir tipo de visitante
  scores.visitorType = inferVisitorType(scores);

  return scores;
}

/**
 * Infere o tipo de visitante baseado nos scores
 */
function inferVisitorType(scores: ScoringResult): string | null {
  const threshold = 40;

  if (scores.museumScore > threshold && scores.cityScore > 30) {
    return 'MUSEUM_CURATOR';
  }
  if (scores.cityScore > threshold) {
    return 'CITY_OFFICIAL';
  }
  if (scores.brandScore > threshold) {
    return 'BRAND_MANAGER';
  }
  if (scores.festivalScore > threshold) {
    return 'FESTIVAL_ORGANIZER';
  }
  if (scores.educationScore > threshold || scores.researchScore > threshold) {
    return 'EDUCATOR';
  }
  if (scores.vrScore > 50 || scores.aiScore > 50) {
    return 'TECH_ENTHUSIAST';
  }
  
  return 'GENERAL_PUBLIC';
}

/**
 * Usa IA para refinar scores e gerar recomendações
 */
async function enhanceScoresWithAI(
  sessionData: SessionData,
  baseScores: ScoringResult
): Promise<ScoringResult> {
  try {
    const ai = getAIProvider();

    // Buscar projetos do banco para contexto
    const allProjects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      include: { tags: true },
      take: 50,
    });

    const projectsContext = allProjects.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      type: p.type,
      tags: p.tags.map(t => t.labelEn).join(', '),
    }));

    const prompt = `
Você é um assistente de IA para análise de comportamento de visitantes de um site de estúdio criativo.

DADOS DO VISITANTE:
- País: ${sessionData.country || 'desconhecido'}
- Idioma: ${sessionData.language || 'desconhecido'}
- Páginas visitadas: ${(sessionData.pagesVisited || []).map(p => p.slug).join(', ') || 'nenhuma'}
- Projetos visualizados: ${(sessionData.projectsViewed || []).map(p => `${p.type} (${p.timeSpent}s)`).join(', ') || 'nenhum'}

SCORES INICIAIS:
- Museus: ${baseScores.museumScore}
- Marcas: ${baseScores.brandScore}
- Festivais: ${baseScores.festivalScore}
- Cidades: ${baseScores.cityScore}
- Educação: ${baseScores.educationScore}
- VR/XR: ${baseScores.vrScore}
- IA: ${baseScores.aiScore}

TIPO INFERIDO: ${baseScores.visitorType}

PROJETOS DISPONÍVEIS:
${JSON.stringify(projectsContext, null, 2)}

TAREFA:
1. Confirme ou ajuste o tipo de visitante
2. Recomende os 3 projetos mais relevantes (IDs)
3. Sugira a próxima ação (ex: "Ver mais projetos de museus", "Entrar em contato")
4. Sugira a próxima página (ex: "portfolio", "contact")

Responda APENAS em JSON neste formato:
{
  "visitorType": "MUSEUM_CURATOR | CITY_OFFICIAL | BRAND_MANAGER | ...",
  "confidence": 0-100,
  "recommendedProjects": [
    { "projectId": "id1", "score": 95, "reason": "motivo curto" },
    { "projectId": "id2", "score": 85, "reason": "motivo curto" },
    { "projectId": "id3", "score": 75, "reason": "motivo curto" }
  ],
  "suggestedAction": "texto da ação",
  "suggestedPage": "slug da página"
}
`;

    const response = await ai.chat([
      {
        role: 'system',
        content: 'Você é um especialista em análise de comportamento e UX. Sempre responda em JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ], {
      temperature: 0.3, // Mais determinístico
      maxTokens: 800,
    });

    // Parse da resposta
    const aiAnalysis = JSON.parse(response.content);

    return {
      ...baseScores,
      visitorType: aiAnalysis.visitorType || baseScores.visitorType,
      recommendedProjects: aiAnalysis.recommendedProjects || [],
      suggestedAction: aiAnalysis.suggestedAction || '',
      suggestedPage: aiAnalysis.suggestedPage || '',
      conversionScore: Math.min(100, baseScores.conversionScore + (aiAnalysis.confidence || 0) / 5),
    };

  } catch (error) {
    console.error('AI enhancement failed, using base scores:', error);
    return baseScores;
  }
}

/**
 * Salva score no banco de dados
 */
async function saveInterestScore(sessionId: string, scores: ScoringResult) {
  try {
    await prisma.interestScore.upsert({
      where: { sessionId },
      create: {
        sessionId,
        museumScore: scores.museumScore,
        brandScore: scores.brandScore,
        festivalScore: scores.festivalScore,
        cityScore: scores.cityScore,
        educationScore: scores.educationScore,
        researchScore: scores.researchScore,
        vrScore: scores.vrScore,
        aiScore: scores.aiScore,
        installationScore: scores.installationScore,
        conversionScore: scores.conversionScore,
        visitorType: scores.visitorType as any,
        recommendedProjects: scores.recommendedProjects as any,
        suggestedAction: scores.suggestedAction,
        suggestedPage: scores.suggestedPage,
      },
      update: {
        museumScore: scores.museumScore,
        brandScore: scores.brandScore,
        festivalScore: scores.festivalScore,
        cityScore: scores.cityScore,
        educationScore: scores.educationScore,
        researchScore: scores.researchScore,
        vrScore: scores.vrScore,
        aiScore: scores.aiScore,
        installationScore: scores.installationScore,
        conversionScore: scores.conversionScore,
        visitorType: scores.visitorType as any,
        recommendedProjects: scores.recommendedProjects as any,
        suggestedAction: scores.suggestedAction,
        suggestedPage: scores.suggestedPage,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Failed to save interest score:', error);
  }
}

/**
 * Detecta se visitante é lead qualificado
 */
export function isQualifiedLead(scores: ScoringResult): boolean {
  // Lead qualificado se:
  // 1. Conversion score > 50
  // 2. É um tipo de visitante "profissional"
  // 3. Visitou página de contato ou portfolio
  
  const professionalTypes = [
    'MUSEUM_CURATOR',
    'CITY_OFFICIAL',
    'BRAND_MANAGER',
    'FESTIVAL_ORGANIZER',
    'EDUCATOR',
  ];

  return (
    scores.conversionScore > 50 ||
    (professionalTypes.includes(scores.visitorType || '') && scores.conversionScore > 30)
  );
}












