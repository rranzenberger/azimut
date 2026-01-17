/**
 * API Pública do Blog - Post Individual
 * Para o frontend exibir um post específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

// GET - Buscar post por slug (público)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'pt';

    const now = new Date();

    const post = await prisma.blogPost.findFirst({
      where: {
        slug: params.slug,
        status: 'PUBLISHED',
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: now } },
        ],
      },
      include: {
        category: true,
        tags: true,
        coverImage: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    // Incrementar view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    // Buscar posts relacionados (mesma categoria, excluindo o atual)
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: post.id },
        status: 'PUBLISHED',
        categoryId: post.categoryId,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: now } },
        ],
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        titlePt: true,
        titleEn: true,
        titleEs: true,
        titleFr: true,
        excerptPt: true,
        excerptEn: true,
        coverImageUrl: true,
        coverImage: {
          select: {
            thumbnailUrl: true,
            mediumUrl: true,
          },
        },
        readingTimeMin: true,
        publishedAt: true,
      },
    });

    // Mapear para o idioma solicitado
    const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);

    const mappedPost = {
      id: post.id,
      slug: post.slug,
      title: post[`title${langKey}` as keyof typeof post] || post.titlePt || post.titleEn,
      excerpt: post[`excerpt${langKey}` as keyof typeof post] || post.excerptPt || post.excerptEn,
      content: post[`content${langKey}` as keyof typeof post] || post.contentPt || post.contentEn,
      seoTitle: post[`seoTitle${langKey}` as keyof typeof post] || post.seoTitlePt || post.seoTitleEn,
      seoDesc: post[`seoDesc${langKey}` as keyof typeof post] || post.seoDescPt || post.seoDescEn,
      coverImage: post.coverImage?.largeUrl || post.coverImage?.originalUrl || post.coverImageUrl,
      coverImageAlt: post.coverImageAlt || post.coverImage?.altPt || post.coverImage?.altEn,
      author: {
        name: post.authorName,
        image: post.authorImageUrl,
      },
      readingTime: post.readingTimeMin,
      featured: post.featured,
      publishedAt: post.publishedAt || post.createdAt,
      category: post.category ? {
        slug: post.category.slug,
        name: post.category[`name${langKey}` as keyof typeof post.category] || post.category.namePt || post.category.nameEn,
        color: post.category.color,
        icon: post.category.icon,
      } : null,
      tags: post.tags.map((tag) => ({
        slug: tag.slug,
        label: tag[`label${langKey}` as keyof typeof tag] || tag.labelPt || tag.labelEn,
      })),
      viewCount: post.viewCount + 1, // Já incrementado
      shareCount: post.shareCount,
    };

    const mappedRelated = relatedPosts.map((p) => ({
      slug: p.slug,
      title: p[`title${langKey}` as keyof typeof p] || p.titlePt || p.titleEn,
      excerpt: p[`excerpt${langKey}` as keyof typeof p] || p.excerptPt || p.excerptEn,
      coverImage: p.coverImage?.mediumUrl || p.coverImage?.thumbnailUrl || p.coverImageUrl,
      readingTime: p.readingTimeMin,
      publishedAt: p.publishedAt,
    }));

    return NextResponse.json({
      post: mappedPost,
      related: mappedRelated,
    });
  } catch (error) {
    console.error('Public blog post GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar post' }, { status: 500 });
  }
}
