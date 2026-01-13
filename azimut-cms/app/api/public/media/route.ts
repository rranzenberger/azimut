// API pública para buscar mídias por tags (Sistema de Tags - Opção 2)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

/**
 * GET /api/public/media
 * Busca mídias usando sistema de tags
 * 
 * Query params:
 * - pageSlug: "what/cinema-audiovisual", "home", "work", etc.
 * - sectionSlug: "hero", "gallery", "section-image"
 * - servicesTags: "cinema-audiovisual,pos-producao-vfx" (vírgula separada)
 * - limit: número máximo de resultados (padrão: 50)
 * - orderBy: "createdAt" | "updatedAt" (padrão: "createdAt")
 * - order: "asc" | "desc" (padrão: "desc")
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const pageSlug = searchParams.get('pageSlug');
    const sectionSlug = searchParams.get('sectionSlug');
    const servicesTagsParam = searchParams.get('servicesTags');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const orderBy = (searchParams.get('orderBy') || 'createdAt') as 'createdAt' | 'updatedAt';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';
    
    // Parse servicesTags (array separado por vírgula)
    const servicesTags = servicesTagsParam 
      ? servicesTagsParam.split(',').map(s => s.trim()).filter(s => s)
      : null;
    
    // Construir filtro where
    const where: any = {};
    
    if (pageSlug) {
      where.pageSlug = pageSlug;
    }
    
    if (sectionSlug) {
      where.sectionSlug = sectionSlug;
    }
    
    if (servicesTags && servicesTags.length > 0) {
      // PostgreSQL array contains (hasSome)
      where.servicesTags = {
        hasSome: servicesTags
      };
    }
    
    // Buscar mídias
    const media = await prisma.media.findMany({
      where,
      orderBy: {
        [orderBy]: order
      },
      take: limit,
      select: {
        id: true,
        type: true,
        originalUrl: true,
        thumbnailUrl: true,
        mediumUrl: true,
        largeUrl: true,
        webpUrl: true,
        avifUrl: true,
        width: true,
        height: true,
        altPt: true,
        altEn: true,
        altEs: true,
        altFr: true,
        pageSlug: true,
        sectionSlug: true,
        imageType: true,
        servicesTags: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    
    return NextResponse.json({
      success: true,
      media,
      count: media.length
    });
    
  } catch (error: any) {
    console.error('Media search error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar mídias', details: error.message },
      { status: 500 }
    );
  }
}
