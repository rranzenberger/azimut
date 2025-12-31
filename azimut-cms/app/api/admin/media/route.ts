// API route for media uploads (images and videos)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { optimizeAndUploadImage } from '@/lib/image-optimizer';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import sharp from 'sharp';

export const runtime = 'nodejs'; // Necessário para usar fs/path

const MAX_IMAGE_MB = 8;
const MAX_VIDEO_MB = 25;
const MAX_ALT = 160;
const UPLOAD_BASE = process.env.UPLOAD_BASE || 'uploads';

// GET - Listar mídias disponíveis
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const type = searchParams.get('type'); // 'IMAGE' ou 'VIDEO'

    const where: any = {};
    if (type && (type === 'IMAGE' || type === 'VIDEO')) {
      where.type = type;
    }

    const media = await prisma.media.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.media.count({ where });

    return NextResponse.json({
      media,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Media GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar mídias' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get('file') as File | null;
    const type = (form.get('type') as string) || 'IMAGE';
    const altPt = (form.get('altPt') as string) || '';
    const altEn = (form.get('altEn') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'Arquivo é obrigatório' }, { status: 400 });
    }
    const maxMb = type === 'IMAGE' ? MAX_IMAGE_MB : MAX_VIDEO_MB;
    if (file.size > maxMb * 1024 * 1024) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Máximo ${maxMb}MB para ${type === 'IMAGE' ? 'imagem' : 'vídeo'}.` },
        { status: 400 }
      );
    }
    if (altPt.length > MAX_ALT || altEn.length > MAX_ALT) {
      return NextResponse.json(
        { error: `Alt text máximo ${MAX_ALT} caracteres.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || 'application/octet-stream';

    let mediaRecord;

    if (type === 'IMAGE') {
      mediaRecord = await processLocalImage({
        buffer,
        filename: file.name,
        contentType,
        altPt,
        altEn,
      });
    } else {
      // Vídeo
      mediaRecord = await processLocalVideo({
        buffer,
        filename: file.name,
        contentType,
        altPt,
        altEn,
      });
    }

    return NextResponse.json({ success: true, media: mediaRecord });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Falha ao enviar mídia' },
      { status: 500 }
    );
  }
}

async function processLocalImage(params: {
  buffer: Buffer;
  filename: string;
  contentType: string;
  altPt: string;
  altEn: string;
}) {
  const { buffer, filename, contentType, altPt, altEn } = params;
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const timestamp = Date.now();
  const baseName = filename.replace(/\.[^/.]+$/, '');
  const baseFolder = `${UPLOAD_BASE}/projects/${timestamp}-${baseName}`;

  const urls: Record<string, string | undefined> = {};

  // original
  const origExt = metadata.format || 'jpg';
  urls.original = await saveFileLocal(
    `${baseFolder}/original.${origExt}`,
    buffer
  );

  const variants = [
    { name: 'thumbnail', width: 200, quality: 80 },
    { name: 'small', width: 640, quality: 85 },
    { name: 'medium', width: 1024, quality: 85 },
    { name: 'large', width: 1920, quality: 90 },
  ];

  for (const v of variants) {
    const jpegBuffer = await image
      .clone()
      .resize(v.width, null, { withoutEnlargement: true })
      .jpeg({ quality: v.quality, progressive: true })
      .toBuffer();
    urls[v.name] = await saveFileLocal(
      `${baseFolder}/${v.name}.jpg`,
      jpegBuffer
    );
  }

  // webp / avif a partir da versão large
  const webpBuffer = await image
    .clone()
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  urls.webp = await saveFileLocal(`${baseFolder}/large.webp`, webpBuffer);

  try {
    const avifBuffer = await image
      .clone()
      .resize(1920, null, { withoutEnlargement: true })
      .avif({ quality: 70 })
      .toBuffer();
    urls.avif = await saveFileLocal(`${baseFolder}/large.avif`, avifBuffer);
  } catch {
    // avif opcional
  }

  const { width, height, format, size } = metadata;

  return prisma.media.create({
    data: {
      type: 'IMAGE',
      originalUrl: urls.original!,
      thumbnailUrl: urls.thumbnail,
      mediumUrl: urls.medium,
      largeUrl: urls.large,
      webpUrl: urls.webp,
      avifUrl: urls.avif,
      width: width || null,
      height: height || null,
      sizeBytes: size || buffer.byteLength,
      format: format || null,
      contentType,
      altPt: altPt || null,
      altEn: altEn || null,
    },
  });
}

async function processLocalVideo(params: {
  buffer: Buffer;
  filename: string;
  contentType: string;
  altPt: string;
  altEn: string;
}) {
  const { buffer, filename, contentType, altPt, altEn } = params;
  const fileExt = filename.split('.').pop() || 'mp4';
  const relPath = `${UPLOAD_BASE}/videos/${Date.now()}-${filename}`;
  const publicUrl = await saveFileLocal(relPath, buffer);

  return prisma.media.create({
    data: {
      type: 'VIDEO',
      originalUrl: publicUrl,
      format: fileExt,
      contentType,
      sizeBytes: buffer.byteLength,
      altPt: altPt || null,
      altEn: altEn || null,
    },
  });
}

async function saveFileLocal(relPath: string, data: Buffer) {
  // Dynamic import para evitar problemas no build
  const fs = await import('fs/promises');
  const path = await import('path');
  const fullPath = path.join(process.cwd(), 'public', relPath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, data);
  return `/${relPath.replace(/\\/g, '/')}`;
}

