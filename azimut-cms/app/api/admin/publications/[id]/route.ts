import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    if (!body.titlePt) return NextResponse.json({ error: 'titlePt é obrigatório' }, { status: 400 })

    const item = await prisma.publication.update({
      where: { id },
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
    if (e?.code === 'P2025') return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json({ error: e?.message || 'Erro ao atualizar' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { id } = await params
    await prisma.publication.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    if (e?.code === 'P2025') return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json({ error: e?.message || 'Erro ao deletar' }, { status: 500 })
  }
}
