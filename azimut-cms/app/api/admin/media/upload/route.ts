// API route simplificada para upload de mídia
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import sharp from 'sharp';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

const MAX_IMAGE_MB = 8;
const MAX_VIDEO_MB = 25;
const UPLOAD_BASE = process.env.UPLOAD_BASE || 'uploads';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Arquivo é obrigatório' }, { status: 400 });
    }

    // Detectar tipo
    const isVideo = file.type.startsWith('video/');
    const type = isVideo ? 'VIDEO' : 'IMAGE';
    
    const maxMb = type === 'IMAGE' ? MAX_IMAGE_MB : MAX_VIDEO_MB;
    if (file.size > maxMb * 1024 * 1024) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Máximo ${maxMb}MB para ${type === 'IMAGE' ? 'imagem' : 'vídeo'}.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || 'application/octet-stream';

    let mediaRecord;

    if (type === 'IMAGE') {
      mediaRecord = await processImage(buffer, file.name, contentType);
    } else {
      mediaRecord = await processVideo(buffer, file.name, contentType);
    }

    return NextResponse.json({ success: true, media: mediaRecord });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Falha ao enviar mídia: ' + (error.message || 'erro desconhecido') },
      { status: 500 }
    );
  }
}

async function processImage(buffer: Buffer, filename: string, contentType: string) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const timestamp = Date.now();
  const baseName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
  const baseFolder = `${UPLOAD_BASE}/media/${timestamp}-${baseName}`;

  const urls: Record<string, string | undefined> = {};

  // Original
  const origExt = metadata.format || 'jpg';
  urls.original = await saveFileLocal(`${baseFolder}/original.${origExt}`, buffer, contentType);

  // Variantes otimizadas
  const variants = [
    { name: 'thumbnail', width: 200, quality: 80 },
    { name: 'medium', width: 800, quality: 85 },
    { name: 'large', width: 1600, quality: 90 },
  ];

  for (const v of variants) {
    try {
      const jpegBuffer = await image
        .clone()
        .resize(v.width, null, { withoutEnlargement: true })
        .jpeg({ quality: v.quality, progressive: true })
        .toBuffer();
      urls[v.name] = await saveFileLocal(`${baseFolder}/${v.name}.jpg`, jpegBuffer, 'image/jpeg');
    } catch (e) {
      console.error(`Erro ao criar variante ${v.name}:`, e);
    }
  }

  // WebP
  try {
    const webpBuffer = await image
      .clone()
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    urls.webp = await saveFileLocal(`${baseFolder}/large.webp`, webpBuffer, 'image/webp');
  } catch (e) {
    console.error('Erro ao criar WebP:', e);
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
      width: width || null,
      height: height || null,
      sizeBytes: size || buffer.byteLength,
      format: format || null,
      contentType,
      altPt: `Upload ${baseName}`,
    },
  });
}

async function processVideo(buffer: Buffer, filename: string, contentType: string) {
  const baseName = filename.replace(/[^a-zA-Z0-9-_.]/g, '_');
  const relPath = `${UPLOAD_BASE}/videos/${Date.now()}-${baseName}`;
  const publicUrl = await saveFileLocal(relPath, buffer, contentType);

  const ext = filename.split('.').pop() || 'mp4';

  return prisma.media.create({
    data: {
      type: 'VIDEO',
      originalUrl: publicUrl,
      format: ext,
      contentType,
      sizeBytes: buffer.byteLength,
      altPt: `Vídeo ${baseName}`,
    },
  });
}

async function saveFileLocal(relPath: string, data: Buffer, contentType: string = 'application/octet-stream') {
  // Tentar usar Vercel Blob primeiro (produção)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(relPath, data, {
        access: 'public',
        contentType,
      });
      console.log('✅ Arquivo salvo no Vercel Blob:', blob.url);
      return blob.url;
    } catch (err) {
      console.warn('⚠️ Erro ao usar Vercel Blob, usando storage local:', err);
    }
  }
  
  // Fallback: salvar localmente (desenvolvimento)
  const fs = await import('fs/promises');
  const path = await import('path');
  const fullPath = path.join(process.cwd(), 'public', relPath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, data);
  const url = `/${relPath.replace(/\\/g, '/')}`;
  console.log('✅ Arquivo salvo localmente:', url);
  return url;
}
