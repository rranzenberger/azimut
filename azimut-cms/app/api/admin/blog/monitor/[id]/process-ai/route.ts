// ════════════════════════════════════════════════════════════
// API: Processar Sugestão com IA
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';
import { processWithOpenAI, processMultiLanguage } from '@/src/lib/services/aiProcessor';

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

    const body = await request.json();
    const {
      languages = ['pt', 'en'],
      improveSEO = true,
    } = body;

    // Buscar sugestão
    const suggestion = await prisma.blogPostMonitor.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            creditType: true,
            creditText: true,
            azimutContributions: true,
          },
        },
      },
    });

    if (!suggestion) {
      return NextResponse.json(
        { error: 'Sugestão não encontrada' },
        { status: 404 }
      );
    }

    // Preparar texto original
    const originalText = suggestion.sourceContent || suggestion.sourceTitle || '';

    if (!originalText || originalText.length < 50) {
      return NextResponse.json(
        { error: 'Texto original muito curto para processar' },
        { status: 400 }
      );
    }

    // Processar com IA
    const creditText = suggestion.creditText || suggestion.project?.creditText || 'Azimut';
    const contributions = suggestion.azimutContributions.length > 0
      ? suggestion.azimutContributions
      : suggestion.project?.azimutContributions || [];

    const results = await processMultiLanguage(
      originalText,
      languages as ('pt' | 'en' | 'es' | 'fr')[],
      {
        improveSEO,
        creditText,
        azimutContributions: contributions,
        addKeywords: suggestion.keywords,
      }
    );

    // Atualizar sugestão com resultados
    const updateData: any = {
      aiProcessedAt: new Date(),
    };

    if (results.pt) {
      updateData.suggestedTitlePt = results.pt.title;
      updateData.suggestedExcerptPt = results.pt.excerpt;
      updateData.suggestedContentPt = results.pt.content;
    }
    if (results.en) {
      updateData.suggestedTitleEn = results.en.title;
      updateData.suggestedExcerptEn = results.en.excerpt;
      updateData.suggestedContentEn = results.en.content;
    }
    if (results.es) {
      updateData.suggestedTitleEs = results.es.title;
      updateData.suggestedExcerptEs = results.es.excerpt;
      updateData.suggestedContentEs = results.es.content;
    }
    if (results.fr) {
      updateData.suggestedTitleFr = results.fr.title;
      updateData.suggestedExcerptFr = results.fr.excerpt;
      updateData.suggestedContentFr = results.fr.content;
    }

    const updated = await prisma.blogPostMonitor.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Processado com IA com sucesso',
      suggestion: updated,
      results,
    });
  } catch (error: unknown) {
    console.error('Erro ao processar com IA:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao processar com IA' },
      { status: 500 }
    );
  }
}
