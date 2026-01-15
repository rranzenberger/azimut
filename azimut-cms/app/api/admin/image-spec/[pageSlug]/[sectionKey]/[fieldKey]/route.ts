import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageSlug: string; sectionKey: string; fieldKey: string }> | { pageSlug: string; sectionKey: string; fieldKey: string } }
) {
  try {
    // Next.js 15+ usa Promise<params>, Next.js 14 usa params direto
    const resolvedParams = params instanceof Promise ? await params : params;
    const { pageSlug, sectionKey, fieldKey } = resolvedParams;

    const spec = await prisma.imageSpecification.findFirst({
      where: {
        pageSlug: pageSlug,
        sectionKey: sectionKey,
        fieldKey: fieldKey,
      },
    });

    if (!spec) {
      return NextResponse.json(
        { error: 'Image specification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(spec);
  } catch (error) {
    console.error('[API] Error fetching image spec:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
