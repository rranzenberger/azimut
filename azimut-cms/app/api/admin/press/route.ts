import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const items = await prisma.press.findMany({
      orderBy: [{ displayOrder: 'asc' }, { publishedAt: 'desc' }]
    })
    return NextResponse.json({ success: true, data: items })
  } catch (e: any) {
    console.error('[API /admin/press GET]', e)
    return NextResponse.json({ error: e?.message || 'Erro ao listar' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const body = await request.json()
    if (!body.titlePt) {
      return NextResponse.json({ error: 'titlePt é obrigatório' }, { status: 400 })
    }
    const item = await prisma.press.create({
      data: {
        titlePt: body.titlePt,
        titleEn: body.titleEn ?? null,
        titleEs: body.titleEs ?? null,
        titleFr: body.titleFr ?? null,
        summaryPt: body.summaryPt ?? null,
        summaryEn: body.summaryEn ?? null,
        summaryEs: body.summaryEs ?? null,
        summaryFr: body.summaryFr ?? null,
        url: body.url ?? null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        displayOrder: body.displayOrder ?? 0,
        isPublished: body.isPublished !== undefined ? body.isPublished : true
      }
    })
    return NextResponse.json({ success: true, data: item })
  } catch (e: any) {
    console.error('[API /admin/press POST]', e)
    return NextResponse.json({ error: e?.message || 'Erro ao criar' }, { status: 500 })
  }
}
