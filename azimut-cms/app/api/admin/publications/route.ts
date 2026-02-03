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
    const items = await prisma.publication.findMany({
      orderBy: [{ displayOrder: 'asc' }, { year: 'desc' }]
    })
    return NextResponse.json({ success: true, data: items })
  } catch (e: any) {
    console.error('[API /admin/publications GET]', e)
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
    const item = await prisma.publication.create({
      data: {
        titlePt: body.titlePt,
        titleEn: body.titleEn ?? null,
        titleEs: body.titleEs ?? null,
        titleFr: body.titleFr ?? null,
        authors: body.authors ?? null,
        url: body.url ?? null,
        year: body.year ?? null,
        displayOrder: body.displayOrder ?? 0,
        isPublished: body.isPublished !== undefined ? body.isPublished : true
      }
    })
    return NextResponse.json({ success: true, data: item })
  } catch (e: any) {
    console.error('[API /admin/publications POST]', e)
    return NextResponse.json({ error: e?.message || 'Erro ao criar' }, { status: 500 })
  }
}
