/**
 * API Pública - Categorias do Blog
 * Lista categorias com contagem de posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

// GET - Listar categorias (público)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'pt';

    const now = new Date();

    const categories = await prisma.blogCategory.findMany({
      orderBy: { priority: 'desc' },
      include: {
        _count: {
          select: {
            posts: {
              where: {
                status: 'PUBLISHED',
                OR: [
                  { publishedAt: null },
                  { publishedAt: { lte: now } },
                ],
              },
            },
          },
        },
      },
    });

    // Mapear para o idioma
    const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);

    const mappedCategories = categories
      .filter((cat) => cat._count.posts > 0) // Só categorias com posts
      .map((cat) => ({
        slug: cat.slug,
        name: cat[`name${langKey}` as keyof typeof cat] || cat.namePt || cat.nameEn,
        description: cat[`desc${langKey}` as keyof typeof cat] || cat.descPt || cat.descEn,
        color: cat.color,
        icon: cat.icon,
        postCount: cat._count.posts,
      }));

    return NextResponse.json({ categories: mappedCategories });
  } catch (error) {
    console.error('Public blog categories GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar categorias' }, { status: 500 });
  }
}
