/**
 * API para análise automática de imagens com IA
 * 
 * POST /api/admin/media/analyze
 * Body: { mediaId: string }
 * 
 * Analisa uma imagem e atualiza tags, descrições e metadados automaticamente
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { analyzeImageWithAI } from '../../../../lib/image-analysis';
import * as path from 'path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { mediaId } = body;

    if (!mediaId) {
      return NextResponse.json({ error: 'mediaId é obrigatório' }, { status: 400 });
    }

    // Buscar mídia
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
      include: {
        projectGalleries: {
          include: {
            project: true
          }
        }
      }
    });

    if (!media) {
      return NextResponse.json({ error: 'Mídia não encontrada' }, { status: 404 });
    }

    if (media.type !== 'IMAGE') {
      return NextResponse.json({ error: 'Apenas imagens podem ser analisadas' }, { status: 400 });
    }

    // Construir URL da imagem
    const imageUrl = media.originalUrl.startsWith('http')
      ? media.originalUrl
      : `${process.env.NEXT_PUBLIC_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'}${media.originalUrl}`;

    const filename = path.basename(media.originalUrl);
    const existingAlt = media.altPt || undefined;

    // Analisar com IA
    console.log(`[IA] Analisando imagem: ${filename}`);
    const analysis = await analyzeImageWithAI(imageUrl, filename, existingAlt);

    // Atualizar mídia
    await prisma.media.update({
      where: { id: mediaId },
      data: {
        altPt: analysis.description.pt,
        altEn: analysis.description.en,
        altEs: analysis.description.es,
        altFr: analysis.description.fr,
      }
    });

    // Criar/associar tags
    const tagIds = [];
    for (const tagName of analysis.tags.slice(0, 5)) {
      const tagSlug = tagName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        update: {},
        create: {
          slug: tagSlug,
          labelPt: tagName,
          labelEn: tagName,
          labelEs: tagName,
          labelFr: tagName,
          category: 'OTHER'
        }
      });

      tagIds.push(tag.id);
    }

    // Associar tags aos projetos relacionados
    for (const projectMedia of media.projectGalleries) {
      await prisma.project.update({
        where: { id: projectMedia.projectId },
        data: {
          tags: {
            connect: tagIds.map(id => ({ id }))
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      analysis: {
        category: analysis.category,
        tier: analysis.tier,
        tags: analysis.tags,
        targetAudience: analysis.targetAudience,
        relevance: analysis.relevance,
        shouldHighlight: analysis.shouldHighlight
      },
      updated: {
        altText: true,
        tags: tagIds.length
      }
    });

  } catch (error: any) {
    console.error('Erro ao analisar imagem:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao analisar imagem' },
      { status: 500 }
    );
  }
}

