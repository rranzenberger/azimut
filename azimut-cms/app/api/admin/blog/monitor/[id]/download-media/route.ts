// ════════════════════════════════════════════════════════════
// API: Download de Mídia de uma Sugestão
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { downloadMediaFromUrl } from '@/lib/services/mediaDownloader';

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
    const suggestion = await prisma.blogPostMonitor.findUnique({
      where: { id },
    });

    if (!suggestion) {
      return NextResponse.json(
        { error: 'Sugestão não encontrada' },
        { status: 404 }
      );
    }

    // Baixar mídia
    const mediaUrl = suggestion.sourceImageUrl || suggestion.sourceVideoUrl || suggestion.sourceUrl;
    
    if (!mediaUrl) {
      return NextResponse.json(
        { error: 'Nenhuma mídia encontrada para baixar' },
        { status: 400 }
      );
    }

    const downloaded = await downloadMediaFromUrl(mediaUrl);

    if (!downloaded) {
      return NextResponse.json(
        { error: 'Erro ao baixar mídia' },
        { status: 500 }
      );
    }

    // Criar registro na tabela Media
    const media = await prisma.media.create({
      data: {
        originalUrl: downloaded.url,
        thumbnailUrl: downloaded.type === 'image' ? downloaded.url : undefined,
        contentType: downloaded.mimeType,
        sizeBytes: downloaded.size,
        type: downloaded.type === 'image' ? 'IMAGE' : 'VIDEO',
        format: downloaded.filename?.split('.').pop() || 'unknown',
      },
    });

    // Atualizar sugestão com referência à mídia
    await prisma.blogPostMonitor.update({
      where: { id },
      data: {
        sourceImageUrl: downloaded.type === 'image' ? downloaded.url : suggestion.sourceImageUrl,
        sourceVideoUrl: downloaded.type === 'video' ? downloaded.url : suggestion.sourceVideoUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Mídia baixada e salva com sucesso!',
      media,
      downloaded,
    });
  } catch (error: unknown) {
    console.error('Erro ao baixar mídia:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao baixar mídia' },
      { status: 500 }
    );
  }
}
