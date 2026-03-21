// ════════════════════════════════════════════════════════════
// Serviço: Monitoramento Automático com DeepSeek/Claude
// Monitora projetos configurados e traz resultados automaticamente
// ════════════════════════════════════════════════════════════

import { prisma } from '@/src/lib/prisma';
import { SourceType } from '@prisma/client';
import { AIProviderService } from '@/src/lib/ai-provider';
import { searchMultipleSources, detectSourceType, getSourceInfo } from './enhancedContentMonitor';

/**
 * Monitora todos os projetos com monitoramento ativado
 */
export async function monitorAllProjects(): Promise<{
  success: boolean;
  projectsMonitored: number;
  resultsFound: number;
  errors: string[];
}> {
  const result = {
    success: true,
    projectsMonitored: 0,
    resultsFound: 0,
    errors: [] as string[],
  };

  try {
    // Buscar projetos com monitoramento ativado
    const projects = await prisma.project.findMany({
      where: {
        monitorEnabled: true,
        monitorKeywords: {
          isEmpty: false,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        monitorKeywords: true,
        creditType: true,
        creditText: true,
        azimutContributions: true,
      },
    });

    for (const project of projects) {
      try {
        const found = await monitorProject(project.id);
        result.projectsMonitored++;
        result.resultsFound += found;
      } catch (error) {
        result.errors.push(`Erro ao monitorar projeto ${project.title}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    result.success = result.errors.length === 0;
    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : String(error));
    return result;
  }
}

/**
 * Monitora um projeto específico
 */
export async function monitorProject(projectId: string): Promise<number> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      title: true,
      slug: true,
      monitorEnabled: true,
      monitorKeywords: true,
      creditType: true,
      creditText: true,
      azimutContributions: true,
    },
  });

  if (!project || !project.monitorEnabled || !project.monitorKeywords || project.monitorKeywords.length === 0) {
    return 0;
  }

  // Buscar conteúdo usando web scraping
  const searchResults = await searchMultipleSources(
    project.monitorKeywords,
    ['instagram', 'youtube', 'news', 'linkedin']
  );

  // Processar com IA (DeepSeek/Claude) para análise inteligente
  const aiService = new AIProviderService();
  let aiAnalysis: any[] = [];

  try {
    const prompt = `
Analise os seguintes resultados de busca e identifique quais são relevantes para o projeto "${project.title}".

PROJETO: ${project.title}
PALAVRAS-CHAVE: ${project.monitorKeywords.join(', ')}
CONTRIBUIÇÕES AZIMUT: ${project.azimutContributions.join(', ')}

RESULTADOS ENCONTRADOS:
${searchResults.map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   Tipo: ${r.sourceType}`).join('\n\n')}

TAREFA:
1. Identifique quais resultados são realmente relevantes para o projeto
2. Para cada resultado relevante, sugira:
   - Título para post no blog
   - Resumo/excerpt
   - Créditos apropriados (${project.creditText || 'Animação por Azimut'})
   - Se deve ser destacado

Retorne apenas os resultados RELEVANTES em formato JSON.
`;

    const aiResponse = await aiService.chat([
      { role: 'system', content: 'Você é um especialista em análise de conteúdo e curadoria para projetos criativos.' },
      { role: 'user', content: prompt },
    ]);

    // Parsear resposta da IA (se retornar JSON)
    try {
      aiAnalysis = JSON.parse(aiResponse.content);
    } catch {
      // Se não for JSON, usar resultados originais
      aiAnalysis = searchResults;
    }
  } catch (error) {
    console.error('Erro ao processar com IA, usando resultados diretos:', error);
    aiAnalysis = searchResults;
  }

  // Salvar resultados como sugestões
  let savedCount = 0;
  for (const item of aiAnalysis.length > 0 ? aiAnalysis : searchResults) {
    try {
      // Verificar se já existe
      const existing = await prisma.blogPostMonitor.findFirst({
        where: { sourceUrl: item.url },
      });

      if (existing) {
        continue; // Já existe, pular
      }

      // Detectar tipo de fonte
      const sourceType = detectSourceType(item.url);
      const sourceInfo = getSourceInfo(sourceType, item.url);

      // Criar sugestão
      await prisma.blogPostMonitor.create({
        data: {
          projectId: project.id,
          projectName: project.title,
          creditType: project.creditType || 'CLIENTE',
          creditText: project.creditText || 'Azimut',
          azimutContributions: project.azimutContributions || [],
          sourceType: sourceType as SourceType,
          sourceUrl: item.url,
          sourceTitle: item.title,
          sourceContent: item.content,
          sourceImageUrl: item.imageUrl,
          sourceVideoUrl: item.videoUrl,
          sourceAuthor: item.author,
          sourceDate: item.publishedAt,
          keywords: project.monitorKeywords,
          status: 'PENDING', // Aguarda curadoria
        },
      });

      savedCount++;
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
    }
  }

  return savedCount;
}

/**
 * Executa monitoramento automático (chamado por cron job)
 */
export async function runAutoMonitoring() {
  console.log('🤖 Iniciando monitoramento automático...');
  
  const result = await monitorAllProjects();
  
  console.log(`✅ Monitoramento concluído:`);
  console.log(`   - Projetos monitorados: ${result.projectsMonitored}`);
  console.log(`   - Resultados encontrados: ${result.resultsFound}`);
  if (result.errors.length > 0) {
    console.log(`   - Erros: ${result.errors.length}`);
  }

  return result;
}
