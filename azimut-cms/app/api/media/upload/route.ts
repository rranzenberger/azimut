import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'IMAGE'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Criar pasta uploads se não existir
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Nome único do arquivo
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filepath = join(uploadsDir, filename)

    // Salvar arquivo
    await writeFile(filepath, buffer)

    // URL pública
    const publicUrl = `/uploads/${filename}`

    // Salvar na tabela Media
    const media = await prisma.media.create({
      data: {
        type: type as any,
        originalUrl: publicUrl,
        contentType: file.type,
        sizeBytes: file.size,
        format: file.type.split('/')[1],
        // Metadata básico
        altPt: file.name,
        altEn: file.name,
        altEs: file.name,
        altFr: file.name
      }
    })

    return NextResponse.json({
      id: media.id,
      url: publicUrl,
      success: true
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
