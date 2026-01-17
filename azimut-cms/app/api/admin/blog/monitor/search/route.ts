// ════════════════════════════════════════════════════════════
// API: Buscar Conteúdo para Monitoramento
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';
import { searchAllSources, extractContentFromUrl } from '@/src/lib/services/contentMonitor';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      projectName,
      keywords,
      sources = ['news', 'youtube'],
      creditType = 'CLIENTE',
      creditText,
      azimutContributions = [],
    } = body;

    if (!keywords || keywords.length === 0) {
      return NextResponse.json(
        { error: 'Keywords são obrigatórias' },
        { status: 400 }
      );
    }

    // Buscar projeto se projectId fornecido
    let project = null;
    if (projectId) {
      project = await prisma.project.findUnique({
        where: { id: projectId },
        select: {
          id: true,
          title: true,
          slug: true,
          creditType: true,
          creditText: true,
          azimutContributions: true,
        },
      });
    }

    // Usar dados do projeto ou do body
    const finalCreditType = project?.creditType || creditType;
    const finalCreditText = project?.creditText || creditText || 'Azimut';
    const finalContributions = project?.azimutContributions || azimutContributions;

    // Configurar APIs
    const config = {
      newsApiKey: process.env.NEWS_API_KEY,
      youtubeApiKey: process.env.YOUTUBE_API_KEY,
      instagramToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    };

    // Buscar em todas as fontes
    const searchResults = await searchAllSources(keywords, sources, config);

    // Salvar resultados no banco
    const savedResults = [];

    for (const result of searchResults) {
      // Verificar se já existe (evitar duplicatas)
      const existing = await prisma.blogPostMonitor.findFirst({
        where: {
          sourceUrl: result.url,
        },
      });

      if (existing) {
        continue; // Pular se já existe
      }

      // Extrair conteúdo completo se necessário
      let fullContent = result.content || '';
      if (!fullContent && result.url) {
        try {
          const extracted = await extractContentFromUrl(result.url);
          fullContent = extracted.content;
        } catch (error) {
          console.error('Erro ao extrair conteúdo:', error);
        }
      }

      // Criar registro de monitoramento
      const monitor = await prisma.blogPostMonitor.create({
        data: {
          projectId: project?.id || null,
          projectName: project?.title || projectName || null,
          creditType: finalCreditType,
          creditText: finalCreditText,
          azimutContributions: finalContributions,
          sourceType: result.sourceType,
          sourceUrl: result.url,
          sourceTitle: result.title,
          sourceContent: fullContent,
          sourceImageUrl: result.imageUrl,
          sourceVideoUrl: result.videoUrl,
          sourceAuthor: result.author || undefined,
          sourceDate: result.publishedAt || undefined,
          status: 'PENDING',
        },
      });

      savedResults.push(monitor);
    }

    return NextResponse.json({
      success: true,
      message: `Encontrados ${searchResults.length} resultados, ${savedResults.length} novos salvos`,
      results: savedResults.length,
      saved: savedResults.map(r => ({
        id: r.id,
        title: r.sourceTitle,
        url: r.sourceUrl,
        sourceType: r.sourceType,
      })),
    });
  } catch (error: unknown) {
    console.error('Erro ao buscar conteúdo:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao buscar conteúdo' },
      { status: 500 }
    );
  }
}
