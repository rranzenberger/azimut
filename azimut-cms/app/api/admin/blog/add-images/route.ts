// ════════════════════════════════════════════════════════════
// API: Adicionar Imagens aos Posts do Blog (Endpoint Seguro)
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

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

    const updates = [
      {
        slug: 'rio-museu-olimpico-montagem-instalacao',
        coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&q=80',
        coverImageAlt: 'Rio Olympic Museum: Immersive installation and interactive experience',
        name: 'Rio Museu Olímpico',
      },
      {
        slug: 'natal-rio-bonito-instalacao-imersiva',
        coverImageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&h=675&fit=crop&q=80',
        coverImageAlt: 'Natal Rio Bonito: Christmas lights and immersive street installation',
        name: 'Natal Rio Bonito',
      },
      {
        slug: 'vr-ar-experiencias-imersivas-azimut',
        coverImageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&h=675&fit=crop&q=80',
        coverImageAlt: 'VR and AR: Immersive technology creating future experiences',
        name: 'VR e AR',
      },
      {
        slug: 'por-tras-das-cenas-azimut-brasil-canada',
        coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop&q=80',
        coverImageAlt: 'Behind the Scenes: Team collaboration between Brazil and Canada',
        name: 'Por Trás das Cenas',
      },
    ];

    const results = {
      success: [] as string[],
      skipped: [] as string[],
      errors: [] as string[],
    };

    for (const update of updates) {
      try {
        // Verificar se post existe e se já tem imagem
        const existing = await prisma.blogPost.findUnique({
          where: { slug: update.slug },
          select: { id: true, slug: true, coverImageUrl: true, titlePt: true },
        });

        if (!existing) {
          results.skipped.push(`${update.name} (post não encontrado)`);
          continue;
        }

        if (existing.coverImageUrl) {
          results.skipped.push(`${existing.titlePt || update.name} (já tem imagem)`);
          continue;
        }

        // Atualizar post
        await prisma.blogPost.update({
          where: { slug: update.slug },
          data: {
            coverImageUrl: update.coverImageUrl,
            coverImageAlt: update.coverImageAlt,
          },
        });

        results.success.push(existing.titlePt || update.name);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.errors.push(`${update.name}: ${errorMessage}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processado: ${results.success.length} sucesso, ${results.skipped.length} pulados, ${results.errors.length} erros`,
      results,
    });
  } catch (error: unknown) {
    console.error('Erro ao adicionar imagens:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao adicionar imagens' },
      { status: 500 }
    );
  }
}
