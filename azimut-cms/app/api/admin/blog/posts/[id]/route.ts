/**
 * API de Post Individual do Blog
 * GET, PUT, DELETE de um post específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Buscar post por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        tags: true,
        coverImage: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Blog post GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar post' }, { status: 500 });
  }
}

// PUT - Atualizar post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verificar se post existe
    const existing = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    // Verificar se slug mudou e se já existe
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json({ error: 'Slug já existe. Use outro.' }, { status: 400 });
      }
    }

    // Atualizar post
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        slug: slug !== undefined ? slug : existing.slug,
        titlePt: titlePt !== undefined ? titlePt : existing.titlePt,
        titleEn: titleEn !== undefined ? titleEn : existing.titleEn,
        titleEs: titleEs !== undefined ? titleEs : existing.titleEs,
        titleFr: titleFr !== undefined ? titleFr : existing.titleFr,
        excerptPt: excerptPt !== undefined ? excerptPt : existing.excerptPt,
        excerptEn: excerptEn !== undefined ? excerptEn : existing.excerptEn,
        excerptEs: excerptEs !== undefined ? excerptEs : existing.excerptEs,
        excerptFr: excerptFr !== undefined ? excerptFr : existing.excerptFr,
        contentPt: contentPt !== undefined ? contentPt : existing.contentPt,
        contentEn: contentEn !== undefined ? contentEn : existing.contentEn,
        contentEs: contentEs !== undefined ? contentEs : existing.contentEs,
        contentFr: contentFr !== undefined ? contentFr : existing.contentFr,
        seoTitlePt: seoTitlePt !== undefined ? seoTitlePt : existing.seoTitlePt,
        seoTitleEn: seoTitleEn !== undefined ? seoTitleEn : existing.seoTitleEn,
        seoTitleEs: seoTitleEs !== undefined ? seoTitleEs : existing.seoTitleEs,
        seoTitleFr: seoTitleFr !== undefined ? seoTitleFr : existing.seoTitleFr,
        seoDescPt: seoDescPt !== undefined ? seoDescPt : existing.seoDescPt,
        seoDescEn: seoDescEn !== undefined ? seoDescEn : existing.seoDescEn,
        seoDescEs: seoDescEs !== undefined ? seoDescEs : existing.seoDescEs,
        seoDescFr: seoDescFr !== undefined ? seoDescFr : existing.seoDescFr,
        coverImageId: coverImageId !== undefined ? coverImageId : existing.coverImageId,
        coverImageUrl: coverImageUrl !== undefined ? coverImageUrl : existing.coverImageUrl,
        coverImageAlt: coverImageAlt !== undefined ? coverImageAlt : existing.coverImageAlt,
        authorName: authorName !== undefined ? authorName : existing.authorName,
        authorImageUrl: authorImageUrl !== undefined ? authorImageUrl : existing.authorImageUrl,
        readingTimeMin: readingTimeMin !== undefined ? readingTimeMin : existing.readingTimeMin,
        status: status !== undefined ? (status as any) : existing.status,
        featured: featured !== undefined ? featured : existing.featured,
        publishedAt: publishedAt !== undefined ? (publishedAt ? new Date(publishedAt) : null) : existing.publishedAt,
        categoryId: categoryId !== undefined ? categoryId : existing.categoryId,
        tags: tagIds !== undefined
          ? { set: tagIds.map((id: string) => ({ id })) }
          : undefined,
      },
      include: {
        category: true,
        tags: true,
        coverImage: true,
      },
    });

    // ═══════════════════════════════════════════════════════════════
    // 🔄 HOOK: SINCRONIZAR PÁGINA
    // ═══════════════════════════════════════════════════════════════
    try {
      const oldPageSlug = `blog/${existing.slug}`;
      const newPageSlug = `blog/${post.slug}`;
      
      const existingPage = await prisma.page.findUnique({
        where: { slug: oldPageSlug },
      });

      if (existingPage) {
        await prisma.page.update({
          where: { slug: oldPageSlug },
          data: {
            name: `Blog: ${post.titlePt}`,
            slug: newPageSlug,
            seoTitlePt: post.seoTitlePt || `${post.titlePt} | Blog | Azimut`,
            seoTitleEn: post.seoTitleEn || `${post.titleEn} | Blog | Azimut`,
            seoTitleEs: post.seoTitleEs,
            seoTitleFr: post.seoTitleFr,
            seoDescPt: post.seoDescPt || post.excerptPt,
            seoDescEn: post.seoDescEn || post.excerptEn,
            seoDescEs: post.seoDescEs || post.excerptEs,
            seoDescFr: post.seoDescFr || post.excerptFr,
            heroSloganPt: post.titlePt,
            heroSloganEn: post.titleEn,
            heroSloganEs: post.titleEs,
            heroSloganFr: post.titleFr,
          },
        });
        console.log(`✅ Página "${newPageSlug}" sincronizada`);
      }
    } catch (pageError) {
      console.error('⚠️ Erro ao sincronizar página:', pageError);
    }
    // ═══════════════════════════════════════════════════════════════

    return NextResponse.json({ post });
  } catch (error: any) {
    console.error('Blog post update error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 500 });
  }
}

// DELETE - Deletar post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const existing = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    // ═══════════════════════════════════════════════════════════════
    // 🔄 HOOK: DELETAR PÁGINA ASSOCIADA
    // ═══════════════════════════════════════════════════════════════
    try {
      const pageSlug = `blog/${existing.slug}`;
      
      const existingPage = await prisma.page.findUnique({
        where: { slug: pageSlug },
      });

      if (existingPage) {
        await prisma.section.deleteMany({
          where: { pageId: existingPage.id },
        });
        
        await prisma.page.delete({
          where: { slug: pageSlug },
        });
        console.log(`✅ Página "${pageSlug}" deletada`);
      }
    } catch (pageError) {
      console.error('⚠️ Erro ao deletar página:', pageError);
    }
    // ═══════════════════════════════════════════════════════════════

    await prisma.blogPost.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog post delete error:', error);
    return NextResponse.json({ error: 'Erro ao deletar post' }, { status: 500 });
  }
}
