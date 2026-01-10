import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Configuração
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

// Tipos aceitos
const ACCEPTED_IMAGES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ACCEPTED_VIDEOS = ['video/mp4', 'video/webm', 'video/quicktime']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validar tamanho
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Validar tipo
    const isImage = ACCEPTED_IMAGES.includes(file.type)
    const isVideo = ACCEPTED_VIDEOS.includes(file.type)

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Invalid file type. Accepted: images (JPG, PNG, WebP, GIF) and videos (MP4, WebM)' },
        { status: 400 }
      )
    }

    // Criar diretórios se não existirem
    const folderPath = path.join(UPLOAD_DIR, folder)
    if (!existsSync(folderPath)) {
      await mkdir(folderPath, { recursive: true })
    }

    // Gerar nome único
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = path.extname(file.name)
    const baseName = path.basename(file.name, extension)
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
    const uniqueName = `${baseName}-${timestamp}-${randomString}${extension}`

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (isImage) {
      // Processar imagem com Sharp
      return await processImage(buffer, folderPath, uniqueName, file, folder)
    } else {
      // Processar vídeo (salvar original + gerar thumbnail)
      return await processVideo(buffer, folderPath, uniqueName, file, folder)
    }
  } catch (error: unknown) {
    console.error('Upload error:', error)
    const err = error as { message?: string }
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    )
  }
}

async function processImage(
  buffer: Buffer,
  folderPath: string,
  uniqueName: string,
  file: File,
  folder: string
) {
  const image = sharp(buffer)
  const metadata = await image.metadata()

  // Criar subpastas
  const sizes = ['original', 'large', 'medium', 'small', 'thumbnail', 'webp']
  for (const size of sizes) {
    const sizePath = path.join(folderPath, size)
    if (!existsSync(sizePath)) {
      await mkdir(sizePath, { recursive: true })
    }
  }

  // Original
  const originalPath = path.join(folderPath, 'original', uniqueName)
  await writeFile(originalPath, buffer)

  // Dimensões para resize
  const dimensions = {
    large: 1920,
    medium: 1200,
    small: 600,
    thumbnail: 300
  }

  // Gerar versões redimensionadas
  const urls: any = {
    original: `/uploads/${folder}/original/${uniqueName}`
  }

  for (const [size, width] of Object.entries(dimensions)) {
    const resizedPath = path.join(folderPath, size, uniqueName)
    await image
      .clone()
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 85 })
      .toFile(resizedPath)
    
    urls[size] = `/uploads/${folder}/${size}/${uniqueName}`
  }

  // Versão WebP otimizada
  const webpName = uniqueName.replace(/\.[^.]+$/, '.webp')
  const webpPath = path.join(folderPath, 'webp', webpName)
  await image
    .clone()
    .resize(1920, null, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 80 })
    .toFile(webpPath)
  
  urls.webp = `/uploads/${folder}/webp/${webpName}`

  // Salvar no banco
  const media = await prisma.media.create({
    data: {
      type: 'IMAGE',
      originalUrl: urls.original,
      thumbnailUrl: urls.thumbnail,
      mediumUrl: urls.medium,
      largeUrl: urls.large,
      webpUrl: urls.webp,
      width: metadata.width || null,
      height: metadata.height || null,
      sizeBytes: file.size,
      format: metadata.format || null,
      contentType: file.type,
      altPt: file.name || null
    }
  })

  return NextResponse.json({
    success: true,
    media,
    urls
  })
}

async function processVideo(
  buffer: Buffer,
  folderPath: string,
  uniqueName: string,
  file: File,
  folder: string
) {
  // Criar subpastas
  const originalPath = path.join(folderPath, 'original', uniqueName)
  const thumbnailsPath = path.join(folderPath, 'thumbnails')
  
  if (!existsSync(path.join(folderPath, 'original'))) {
    await mkdir(path.join(folderPath, 'original'), { recursive: true })
  }
  if (!existsSync(thumbnailsPath)) {
    await mkdir(thumbnailsPath, { recursive: true })
  }

  // Salvar vídeo original
  await writeFile(originalPath, buffer)

  // TODO: Gerar thumbnail com FFmpeg (futuro)
  // Por enquanto, apenas salva o vídeo original

  const urls = {
    original: `/uploads/${folder}/original/${uniqueName}`
  }

  // Salvar no banco
  const media = await prisma.media.create({
    data: {
      type: 'VIDEO',
      originalUrl: urls.original,
      sizeBytes: file.size,
      contentType: file.type,
      altPt: file.name || null
    }
  })

  return NextResponse.json({
    success: true,
    media,
    urls
  })
}
