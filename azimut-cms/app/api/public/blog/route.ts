/**
 * API Pública do Blog
 * Para o frontend consumir posts publicados
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

// GET - Listar posts publicados (público)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');
    const categorySlug = searchParams.get('category') || undefined;
    const tagSlug = searchParams.get('tag') || undefined;
    const featured = searchParams.get('featured');
    const lang = searchParams.get('lang') || 'pt';

    const now = new Date();

    // Construir filtros
    const where: any = {
      status: 'PUBLISHED',
      OR: [
        { publishedAt: null },
        { publishedAt: { lte: now } },
      ],
    };

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (tagSlug) {
      where.tags = { some: { slug: tagSlug } };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const posts = await prisma.blogPost.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        slug: true,
        titlePt: true,
        titleEn: true,
        titleEs: true,
        titleFr: true,
        excerptPt: true,
        excerptEn: true,
        excerptEs: true,
        excerptFr: true,
        coverImageUrl: true,
        coverImageAlt: true,
        coverImage: {
          select: {
            originalUrl: true,
            thumbnailUrl: true,
            mediumUrl: true,
            altPt: true,
            altEn: true,
          },
        },
        authorName: true,
        authorImageUrl: true,
        readingTimeMin: true,
        featured: true,
        publishedAt: true,
        createdAt: true,
        category: {
          select: {
            slug: true,
            namePt: true,
            nameEn: true,
            nameEs: true,
            nameFr: true,
            color: true,
            icon: true,
          },
        },
        tags: {
          select: {
            slug: true,
            labelPt: true,
            labelEn: true,
            labelEs: true,
            labelFr: true,
          },
        },
        viewCount: true,
      },
    });

    const total = await prisma.blogPost.count({ where });

    // Mapear para o idioma solicitado
    const mappedPosts = posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof post] || post.titlePt || post.titleEn,
      excerpt: post[`excerpt${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof post] || post.excerptPt || post.excerptEn,
      coverImage: post.coverImage?.mediumUrl || post.coverImage?.originalUrl || post.coverImageUrl,
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
        name: post.category[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof post.category] || post.category.namePt || post.category.nameEn,
        color: post.category.color,
        icon: post.category.icon,
      } : null,
      tags: post.tags.map((tag) => ({
        slug: tag.slug,
        label: tag[`label${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof tag] || tag.labelPt || tag.labelEn,
      })),
      viewCount: post.viewCount,
    }));

    return NextResponse.json({
      posts: mappedPosts,
      total,
      limit,
      offset,
      hasMore: offset + posts.length < total,
    });
  } catch (error) {
    console.error('Public blog GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar posts' }, { status: 500 });
  }
}
