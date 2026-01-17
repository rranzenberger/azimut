// ════════════════════════════════════════════════════════════
// API: Repostar Sugestão em Redes Sociais
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';
import { repostToAllPlatforms, type RepostConfig } from '@/src/lib/services/socialMediaReposter';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const {
      platforms,
      customText,
      hashtags,
    } = body;

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Selecione pelo menos uma plataforma' },
        { status: 400 }
      );
    }

    const suggestion = await prisma.blogPostMonitor.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });

    if (!suggestion) {
      return NextResponse.json(
        { error: 'Sugestão não encontrada' },
        { status: 404 }
      );
    }

    // Montar texto do post
    let postText = customText || suggestion.suggestedTitlePt || suggestion.sourceTitle || '';
    
    if (suggestion.azimutContributions && suggestion.azimutContributions.length > 0) {
      postText += `\n\n✨ ${suggestion.azimutContributions.join(', ')}`;
    }

    if (suggestion.project) {
      postText += `\n\n🎬 Projeto: ${suggestion.project.title}`;
    }

    if (hashtags && hashtags.length > 0) {
      postText += `\n\n${hashtags.map((h: string) => `#${h.replace(/^#/, '')}`).join(' ')}`;
    }

    // Configurar repostagem
    const repostConfig: RepostConfig = {
      text: postText,
      imageUrl: suggestion.sourceImageUrl || undefined,
      videoUrl: suggestion.sourceVideoUrl || undefined,
      linkUrl: suggestion.sourceUrl,
      hashtags: hashtags || [],
    };

    // Repostar
    const results = await repostToAllPlatforms(
      repostConfig,
      platforms
    );

    // Salvar resultados
    const successCount = results.filter(r => r.success).length;
    const failedPlatforms = results.filter(r => !r.success).map(r => r.platform);

    // Atualizar sugestão
    await prisma.blogPostMonitor.update({
      where: { id },
      data: {
        // Adicionar campo para rastrear repostagem se necessário
      },
    });

    return NextResponse.json({
      success: successCount > 0,
      message: `${successCount} de ${platforms.length} repostagens realizadas com sucesso`,
      results,
      failedPlatforms: failedPlatforms.length > 0 ? failedPlatforms : undefined,
    });
  } catch (error: unknown) {
    console.error('Erro ao repostar:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao repostar' },
      { status: 500 }
    );
  }
}
