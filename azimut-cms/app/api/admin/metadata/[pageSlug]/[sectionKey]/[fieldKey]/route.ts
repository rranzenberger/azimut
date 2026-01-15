import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageSlug: string; sectionKey: string; fieldKey: string }> | { pageSlug: string; sectionKey: string; fieldKey: string } }
) {
  try {
    // Next.js 15+ usa Promise<params>, Next.js 14 usa params direto
    const resolvedParams = params instanceof Promise ? await params : params;
    const { pageSlug, sectionKey, fieldKey } = resolvedParams;

    const metadata = await prisma.fieldMetadata.findFirst({
      where: {
        pageSlug: pageSlug,
        sectionKey: sectionKey,
        fieldKey: fieldKey,
      },
    });

    if (!metadata) {
      return NextResponse.json(
        { error: 'Metadata not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('[API] Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
