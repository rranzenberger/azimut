/**
 * API de Posts do Blog
 * CRUD completo de posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar posts
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;
    const featured = searchParams.get('featured');

    const where: any = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;
    if (featured === 'true') where.featured = true;

    const posts = await prisma.blogPost.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        tags: true,
        coverImage: true,
      },
    });

    const total = await prisma.blogPost.count({ where });

    return NextResponse.json({
      posts,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Blog posts GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar posts' }, { status: 500 });
  }
}

// POST - Criar post
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      slug,
      titlePt,
      titleEn,
      titleEs,
      titleFr,
      excerptPt,
      excerptEn,
      excerptEs,
      excerptFr,
      contentPt,
      contentEn,
      contentEs,
      contentFr,
      seoTitlePt,
      seoTitleEn,
      seoTitleEs,
      seoTitleFr,
      seoDescPt,
      seoDescEn,
      seoDescEs,
      seoDescFr,
      coverImageId,
      coverImageUrl,
      coverImageAlt,
      authorName,
      authorImageUrl,
      readingTimeMin,
      status,
      featured,
      publishedAt,
      categoryId,
      tagIds,
    } = body;

    if (!slug || !titlePt || !titleEn) {
      return NextResponse.json(
        { error: 'Slug, título PT e título EN são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se slug já existe
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug já existe. Use outro.' }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        titlePt,
        titleEn,
        titleEs: titleEs || null,
        titleFr: titleFr || null,
        excerptPt: excerptPt || null,
        excerptEn: excerptEn || null,
        excerptEs: excerptEs || null,
        excerptFr: excerptFr || null,
        contentPt: contentPt || null,
        contentEn: contentEn || null,
        contentEs: contentEs || null,
        contentFr: contentFr || null,
        seoTitlePt: seoTitlePt || `${titlePt} | Blog | Azimut`,
        seoTitleEn: seoTitleEn || `${titleEn} | Blog | Azimut`,
        seoTitleEs: seoTitleEs || (titleEs ? `${titleEs} | Blog | Azimut` : null),
        seoTitleFr: seoTitleFr || (titleFr ? `${titleFr} | Blog | Azimut` : null),
        seoDescPt: seoDescPt || excerptPt || null,
        seoDescEn: seoDescEn || excerptEn || null,
        seoDescEs: seoDescEs || excerptEs || null,
        seoDescFr: seoDescFr || excerptFr || null,
        coverImageId: coverImageId || null,
        coverImageUrl: coverImageUrl || null,
        coverImageAlt: coverImageAlt || null,
        authorName: authorName || null,
        authorImageUrl: authorImageUrl || null,
        readingTimeMin: readingTimeMin || 5,
        status: (status as any) || 'DRAFT',
        featured: featured || false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        categoryId: categoryId || null,
        tags: tagIds?.length
          ? { connect: tagIds.map((id: string) => ({ id })) }
          : undefined,
      },
      include: {
        category: true,
        tags: true,
        coverImage: true,
      },
    });

    // ═══════════════════════════════════════════════════════════════
    // 🔄 HOOK: AUTO-CRIAR PÁGINA PARA SEO
    // ═══════════════════════════════════════════════════════════════
    try {
      const pageSlug = `blog/${slug}`;
      
      const existingPage = await prisma.page.findUnique({
        where: { slug: pageSlug },
      });

      if (!existingPage) {
        await prisma.page.create({
          data: {
            name: `Blog: ${titlePt}`,
            slug: pageSlug,
            status: 'DRAFT',
            seoTitlePt: seoTitlePt || `${titlePt} | Blog | Azimut`,
            seoTitleEn: seoTitleEn || `${titleEn} | Blog | Azimut`,
            seoTitleEs: seoTitleEs || (titleEs ? `${titleEs} | Blog | Azimut` : null),
            seoTitleFr: seoTitleFr || (titleFr ? `${titleFr} | Blog | Azimut` : null),
            seoDescPt: seoDescPt || excerptPt || null,
            seoDescEn: seoDescEn || excerptEn || null,
            seoDescEs: seoDescEs || excerptEs || null,
            seoDescFr: seoDescFr || excerptFr || null,
            heroSloganPt: titlePt,
            heroSloganEn: titleEn,
            heroSloganEs: titleEs || null,
            heroSloganFr: titleFr || null,
          },
        });
        console.log(`✅ Página "${pageSlug}" criada automaticamente para post "${titlePt}"`);
      }
    } catch (pageError) {
      console.error('⚠️ Erro ao criar página automática:', pageError);
    }
    // ═══════════════════════════════════════════════════════════════

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    console.error('Blog post creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao criar post' }, { status: 500 });
  }
}
