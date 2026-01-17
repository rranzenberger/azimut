import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'IMAGE'

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Validar tamanho máximo (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Arquivo muito grande! Máximo: 10MB' }, { status: 400 })
    }

    // Validar tipo de arquivo
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/mov']
    const validTypes = type === 'VIDEO' ? validVideoTypes : validImageTypes

    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Tipo de arquivo inválido! Use: ${validTypes.join(', ')}` 
      }, { status: 400 })
    }

    // Gerar nome único do arquivo
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `azimut/${type.toLowerCase()}s/${timestamp}-${safeName}`

    // Upload para Vercel Blob Storage
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    })

    console.log('Upload bem-sucedido para Vercel Blob:', blob.url)

    // Salvar na tabela Media com a URL do Blob
    const media = await prisma.media.create({
      data: {
        type: type as any,
        originalUrl: blob.url,
        contentType: file.type,
        sizeBytes: file.size,
        format: file.type.split('/')[1] || 'unknown',
        // Alt text padrão (nome do arquivo sem extensão)
        altPt: file.name.replace(/\.[^/.]+$/, ''),
        altEn: file.name.replace(/\.[^/.]+$/, ''),
        altEs: file.name.replace(/\.[^/.]+$/, ''),
        altFr: file.name.replace(/\.[^/.]+$/, ''),
      }
    })

    console.log('Mídia salva no banco:', media.id)

    return NextResponse.json({
      id: media.id,
      url: blob.url,
      originalUrl: blob.url,
      type: media.type,
      success: true,
      message: 'Upload realizado com sucesso!'
    })

  } catch (error: any) {
    console.error('Erro no upload:', error)
    
    // Mensagem de erro mais detalhada
    let errorMessage = 'Erro ao fazer upload'
    
    if (error.message?.includes('BLOB_READ_WRITE_TOKEN')) {
      errorMessage = 'Configuração de Blob Storage não encontrada. Configure BLOB_READ_WRITE_TOKEN no Vercel.'
    } else if (error.message?.includes('prisma')) {
      errorMessage = 'Erro ao salvar no banco de dados'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// Listar mídias existentes (GET)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') // 'IMAGE' ou 'VIDEO'

    const where = type ? { type: type as any } : {}

    const media = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({ media })
  } catch (error: any) {
    console.error('Erro ao listar mídias:', error)
    return NextResponse.json(
      { error: 'Erro ao listar mídias' },
      { status: 500 }
    )
  }
}
