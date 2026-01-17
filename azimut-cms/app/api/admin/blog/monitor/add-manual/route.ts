// ════════════════════════════════════════════════════════════
// API: Adicionar Sugestão Manualmente (URL do Instagram)
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';
import { extractContentFromUrl } from '@/src/lib/services/contentMonitor';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      url,
      projectId,
      projectName,
      creditType = 'CLIENTE',
      creditText,
      azimutContributions = [],
    } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      );
    }

    // Verificar se é URL do Instagram
    const isInstagram = url.includes('instagram.com');
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const isNews = !isInstagram && !isYouTube;

    // Determinar tipo de fonte
    let sourceType: 'INSTAGRAM' | 'YOUTUBE' | 'NEWS' | 'BLOG' = 'BLOG';
    if (isInstagram) sourceType = 'INSTAGRAM';
    else if (isYouTube) sourceType = 'YOUTUBE';
    else if (isNews) sourceType = 'NEWS';

    // Extrair conteúdo da URL
    const extracted = await extractContentFromUrl(url);

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

    // Verificar se já existe
    const existing = await prisma.blogPostMonitor.findFirst({
      where: { sourceUrl: url },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'Esta URL já foi adicionada',
        suggestion: existing,
      });
    }

    // Criar sugestão
    const suggestion = await prisma.blogPostMonitor.create({
      data: {
        projectId: project?.id || null,
        projectName: project?.title || projectName || null,
        creditType: finalCreditType,
        creditText: finalCreditText,
        azimutContributions: finalContributions,
        sourceType,
        sourceUrl: url,
        sourceTitle: extracted.title,
        sourceContent: extracted.content,
        sourceImageUrl: extracted.imageUrl,
        status: 'PENDING',
        keywords: [],
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Sugestão criada com sucesso! Agora você pode processar com IA.',
      suggestion,
    });
  } catch (error: unknown) {
    console.error('Erro ao adicionar sugestão manual:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao adicionar sugestão' },
      { status: 500 }
    );
  }
}
