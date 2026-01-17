// ════════════════════════════════════════════════════════════
// API: Aprovar Sugestão e Criar Post
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

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
      categoryId,
      publish = false,
      featured = false,
    } = body;

    // Buscar sugestão
    const suggestion = await prisma.blogPostMonitor.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
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

    if (!suggestion.suggestedTitlePt && !suggestion.suggestedTitleEn) {
      return NextResponse.json(
        { error: 'Sugestão precisa ser processada com IA primeiro' },
        { status: 400 }
      );
    }

    // Gerar slug
    const baseTitle = suggestion.suggestedTitlePt || suggestion.suggestedTitleEn || 'post';
    const slug = baseTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Verificar se slug já existe
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.blogPost.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Criar post
    const blogPost = await prisma.blogPost.create({
      data: {
        slug: finalSlug,
        titlePt: suggestion.suggestedTitlePt || suggestion.sourceTitle || '',
        titleEn: suggestion.suggestedTitleEn || suggestion.sourceTitle || '',
        titleEs: suggestion.suggestedTitleEs,
        titleFr: suggestion.suggestedTitleFr,
        excerptPt: suggestion.suggestedExcerptPt || '',
        excerptEn: suggestion.suggestedExcerptEn || '',
        excerptEs: suggestion.suggestedExcerptEs,
        excerptFr: suggestion.suggestedExcerptFr,
        contentPt: suggestion.suggestedContentPt || '',
        contentEn: suggestion.suggestedContentEn || '',
        contentEs: suggestion.suggestedContentEs,
        contentFr: suggestion.suggestedContentFr,
        status: publish ? 'PUBLISHED' : 'DRAFT',
        featured,
        categoryId: categoryId || null,
        authorName: 'Equipe Azimut',
        readingTimeMin: Math.ceil(
          ((suggestion.suggestedContentPt || suggestion.suggestedContentEn || '').length || 0) / 1000
        ) || 5,
        publishedAt: publish ? new Date() : null,
      },
    });

    // Atualizar sugestão
    await prisma.blogPostMonitor.update({
      where: { id: params.id },
      data: {
        status: 'PUBLISHED',
        blogPostId: blogPost.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: publish ? 'Post criado e publicado com sucesso' : 'Post criado como rascunho',
      blogPost,
    });
  } catch (error: unknown) {
    console.error('Erro ao aprovar sugestão:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao aprovar sugestão' },
      { status: 500 }
    );
  }
}
