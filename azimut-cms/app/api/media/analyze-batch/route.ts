import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ════════════════════════════════════════════════════════════
// CACHE INTELIGENTE DE ANÁLISES
// ════════════════════════════════════════════════════════════

// Cache em memória (útil para desenvolvimento/testes)
const analysisCache = new Map<string, { data: any, timestamp: number }>()
const CACHE_TTL = 1000 * 60 * 60 // 1 hora

// ════════════════════════════════════════════════════════════
// BATCH PROCESSING - Análise múltipla
// ════════════════════════════════════════════════════════════

interface BatchAnalysisRequest {
  mediaIds: string[]
  imageUrls: string[]
  useModel?: string
  preferCostEffective?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: BatchAnalysisRequest = await request.json()
    
    // Verificar se é batch ou single
    if (Array.isArray(body.mediaIds) && body.mediaIds.length > 1) {
      return handleBatchAnalysis(body)
    }
    
    // Single analysis (já implementado em analyze/route.ts)
    // Mas vamos adicionar cache aqui também
    const { mediaId, imageUrl, useModel, preferCostEffective } = body as any
    
    if (!mediaId || !imageUrl) {
      return NextResponse.json(
        { error: 'mediaId and imageUrl are required' },
        { status: 400 }
      )
    }

    // Verificar cache em memória primeiro
    const cacheKey = `${mediaId}_${imageUrl}`
    const cached = analysisCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        cached: true,
        source: 'memory',
        analysis: cached.data
      })
    }

    // Verificar banco de dados
    const existingAnalysis = await prisma.mediaAnalysis.findUnique({
      where: { mediaId }
    })

    if (existingAnalysis) {
      // Atualizar cache
      analysisCache.set(cacheKey, {
        data: existingAnalysis.analysis,
        timestamp: Date.now()
      })
      
      return NextResponse.json({
        success: true,
        cached: true,
        source: 'database',
        analysis: existingAnalysis.analysis
      })
    }

    // Se não tem cache, redirecionar para analyze/route.ts
    // (isso evita duplicação de código)
    return NextResponse.json({
      success: false,
      message: 'Please use /api/media/analyze for single analysis',
      redirect: '/api/media/analyze'
    }, { status: 400 })
    
  } catch (error: any) {
    console.error('Batch analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Batch analysis failed' },
      { status: 500 }
    )
  }
}

// ════════════════════════════════════════════════════════════
// BATCH ANALYSIS HANDLER
// ════════════════════════════════════════════════════════════

async function handleBatchAnalysis(body: BatchAnalysisRequest) {
  const { mediaIds, imageUrls, useModel, preferCostEffective } = body

  if (mediaIds.length !== imageUrls.length) {
    return NextResponse.json(
      { error: 'mediaIds and imageUrls arrays must have the same length' },
      { status: 400 }
    )
  }

  if (mediaIds.length > 50) {
    return NextResponse.json(
      { error: 'Maximum 50 images per batch' },
      { status: 400 }
    )
  }

  interface AnalysisResult {
    mediaId: string
    success: boolean
    analysis?: any
    cached?: boolean
    error?: string
  }

  const results: AnalysisResult[] = []
  const errors: AnalysisResult[] = []

  // Processar em paralelo (mas limitado a 5 simultâneas)
  const BATCH_SIZE = 5
  for (let i = 0; i < mediaIds.length; i += BATCH_SIZE) {
    const batch = mediaIds.slice(i, i + BATCH_SIZE).map((id, idx) => ({
      mediaId: id,
      imageUrl: imageUrls[i + idx]
    }))

    const batchResults = await Promise.allSettled(
      batch.map(async ({ mediaId, imageUrl }) => {
        try {
          // Verificar cache primeiro
          const cacheKey = `${mediaId}_${imageUrl}`
          const cached = analysisCache.get(cacheKey)
          if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return {
              mediaId,
              success: true,
              cached: true,
              analysis: cached.data
            }
          }

          // Verificar banco
          const existing = await prisma.mediaAnalysis.findUnique({
            where: { mediaId }
          })

          if (existing) {
            analysisCache.set(cacheKey, {
              data: existing.analysis,
              timestamp: Date.now()
            })
            
            return {
              mediaId,
              success: true,
              cached: true,
              analysis: existing.analysis
            }
          }

          // Chamar análise (importar do analyze/route.ts ou fazer fetch interno)
          const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/media/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mediaId,
              imageUrl,
              useModel,
              preferCostEffective
            })
          })

          if (!response.ok) {
            throw new Error(`Analysis failed: ${response.statusText}`)
          }

          const data = await response.json()
          
          // Atualizar cache
          if (data.success && data.analysis) {
            analysisCache.set(cacheKey, {
              data: data.analysis,
              timestamp: Date.now()
            })
          }

          return {
            mediaId,
            success: data.success,
            analysis: data.analysis,
            cached: data.cached || false
          }

        } catch (error: any) {
          return {
            mediaId,
            success: false,
            error: error.message
          }
        }
      })
    )

    // Processar resultados
    batchResults.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        if (result.value.success) {
          results.push(result.value)
        } else {
          errors.push(result.value)
        }
      } else {
        errors.push({
          mediaId: batch[idx].mediaId,
          success: false,
          error: result.reason?.message || 'Unknown error'
        })
      }
    })

    // Rate limiting: aguardar 1s entre batches
    if (i + BATCH_SIZE < mediaIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return NextResponse.json({
    success: true,
    total: mediaIds.length,
    successful: results.length,
    failed: errors.length,
    results,
    errors: errors.length > 0 ? errors : undefined
  })
}

// ════════════════════════════════════════════════════════════
// ANALYTICS - Estatísticas de uso
// ════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const stats = searchParams.get('stats')

  if (stats === 'true') {
    // Retornar estatísticas de uso
    const totalAnalyses = await prisma.mediaAnalysis.count()
    const byCategory = await prisma.$queryRaw`
      SELECT 
        (analysis->>'category') as category,
        COUNT(*) as count
      FROM "MediaAnalysis"
      GROUP BY (analysis->>'category')
    ` as Array<{ category: string, count: number }>

    const byModel = await prisma.$queryRaw`
      SELECT 
        (analysis->>'._model') as model,
        COUNT(*) as count
      FROM "MediaAnalysis"
      WHERE analysis->>'._model' IS NOT NULL
      GROUP BY (analysis->>'._model')
    ` as Array<{ model: string, count: number }>

    const cacheSize = analysisCache.size

    return NextResponse.json({
      success: true,
      stats: {
        totalAnalyses,
        byCategory: byCategory.reduce((acc, item) => {
          acc[item.category] = Number(item.count)
          return acc
        }, {} as Record<string, number>),
        byModel: byModel.reduce((acc, item) => {
          acc[item.model] = Number(item.count)
          return acc
        }, {} as Record<string, number>),
        cacheSize,
        cacheHitRate: 'N/A' // Seria calculado com mais tracking
      }
    })
  }

  // Retornar informações de batch processing
  return NextResponse.json({
    success: true,
    batchProcessing: {
      enabled: true,
      maxBatchSize: 50,
      concurrentLimit: 5,
      rateLimit: '1s between batches',
      endpoints: {
        single: '/api/media/analyze',
        batch: '/api/media/analyze-batch'
      }
    },
    cache: {
      enabled: true,
      ttl: '1 hour',
      type: 'memory + database'
    }
  })
}
