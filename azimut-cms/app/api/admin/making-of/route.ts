/**
 * API Making-of — listagem (GET) e criação (POST)
 * GET /api/admin/making-of?type=...&status=...
 * POST /api/admin/making-of — body: title, description, makingOfType, ...
 * Nota: enums definidos como literais para evitar dependência de Prisma.* no build (Vercel).
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

const MAKING_OF_TYPES = ['PERSONAL', 'PARTNERSHIP', 'HIRED', 'CLIENT', 'EVENT'] as const;
const MAKING_OF_STATUSES = ['DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED'] as const;
const MAKING_OF_SOURCES = ['INTERNAL', 'COLLABORATOR', 'CLIENT', 'PARTNER'] as const;
const MAKING_OF_MEDIA_TYPES = ['IMAGE', 'VIDEO', 'MIXED'] as const;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 500);

    const where: { makingOfType?: string; status?: string } = {};
    if (type && type !== 'all' && (MAKING_OF_TYPES as readonly string[]).includes(type)) {
      where.makingOfType = type;
    }
    if (status && status !== 'all' && (MAKING_OF_STATUSES as readonly string[]).includes(status)) {
      where.status = status;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = await prisma.makingOf.findMany({
      where: where as any,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        mediaFiles: {
          select: {
            id: true,
            originalUrl: true,
            thumbnailUrl: true,
            mediumUrl: true,
            type: true,
          },
        },
      },
    });

    const serialized = items.map((item) => ({
      ...item,
      mediaFiles: (item.mediaFiles || []).map((m) => ({
        id: m.id,
        thumbnailUrl: m.thumbnailUrl ?? null,
        originalUrl: m.originalUrl,
      })),
    }));

    return NextResponse.json({ items: serialized });
  } catch (error) {
    console.error('[API] making-of GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao listar making-of' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      makingOfType = 'PERSONAL',
      source = 'INTERNAL',
      collaboratorName,
      clientName,
      clientEmail,
      projectId,
      projectName,
      mediaType = 'IMAGE',
      location,
      eventDate,
      tags = [],
      creditText,
      canPublishNow = true,
      publishAfterDate,
      publishToBlog = false,
      publishToNewsletter = false,
      publishToSocial = false,
    } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      );
    }

    const tagArray = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []);

    const safeType = (MAKING_OF_TYPES as readonly string[]).includes(makingOfType) ? makingOfType : 'PERSONAL';
    const safeSource = (MAKING_OF_SOURCES as readonly string[]).includes(source) ? source : 'INTERNAL';
    const safeMediaType = (MAKING_OF_MEDIA_TYPES as readonly string[]).includes(mediaType) ? mediaType : 'IMAGE';

    const makingOf = await prisma.makingOf.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        makingOfType: safeType,
        source: safeSource,
        collaboratorName: collaboratorName?.trim() || null,
        clientName: clientName?.trim() || null,
        clientEmail: clientEmail?.trim() || null,
        projectId: projectId || null,
        projectName: projectName?.trim() || null,
        mediaType: safeMediaType,
        location: location?.trim() || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        tags: tagArray,
        creditText: creditText?.trim() || null,
        canPublishNow: !!canPublishNow,
        publishAfterDate: publishAfterDate ? new Date(publishAfterDate) : null,
        publishToBlog: !!publishToBlog,
        publishToNewsletter: !!publishToNewsletter,
        publishToSocial: !!publishToSocial,
        uploadedBy: session.userId,
      },
    });

    return NextResponse.json({ id: makingOf.id, makingOf });
  } catch (error) {
    console.error('[API] making-of POST error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar making-of' },
      { status: 500 }
    );
  }
}
