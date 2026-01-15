import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageSlug: string; sectionKey: string }> | { pageSlug: string; sectionKey: string } }
) {
  try {
    // Next.js 15+ usa Promise<params>, Next.js 14 usa params direto
    const resolvedParams = params instanceof Promise ? await params : params;
    const { pageSlug, sectionKey } = resolvedParams;

    const fields = await prisma.fieldMetadata.findMany({
      where: {
        pageSlug: pageSlug,
        sectionKey: sectionKey,
      },
      orderBy: {
        cardPosition: 'asc',
      },
    });

    return NextResponse.json({ fields });
  } catch (error) {
    console.error('[API] Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
