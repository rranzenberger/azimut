/**
 * API Pública de Categorias do Blog
 * Para o frontend consumir categorias com contagem de posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// OPTIONS handler para CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// GET - Listar categorias com contagem de posts publicados
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'pt';

    const now = new Date();

    // Buscar todas as categorias
    const categories = await prisma.blogCategory.findMany({
      orderBy: [
        { priority: 'desc' },
        { namePt: 'asc' },
      ],
      include: {
        posts: {
          where: {
            status: 'PUBLISHED',
            OR: [
              { publishedAt: null },
              { publishedAt: { lte: now } },
            ],
          },
          select: {
            id: true,
          },
        },
      },
    });

    // Mapear para o formato esperado pelo frontend
    const mappedCategories = categories.map((category) => ({
      slug: category.slug,
      name: category[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof category] || category.namePt || category.nameEn,
      description: category[`desc${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof category] || category.descPt || category.descEn || null,
      color: category.color || '#c92337',
      icon: category.icon || null,
      postCount: category.posts.length,
    }));

    // Filtrar categorias que têm pelo menos 1 post publicado
    const activeCategories = mappedCategories.filter(cat => cat.postCount > 0);

    return NextResponse.json({
      categories: activeCategories,
    }, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Public blog categories GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar categorias' }, { 
      status: 500,
      headers: corsHeaders,
    });
  }
}
