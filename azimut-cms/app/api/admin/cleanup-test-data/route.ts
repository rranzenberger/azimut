// ════════════════════════════════════════════════════════════
// API: APAGAR DADOS DE TESTE
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()
const TEST_PREFIX = 'TESTE_'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Encontrar todas as sessões de teste
    const testSessions = await prisma.visitorSession.findMany({
      where: {
        OR: [
          { sessionId: { startsWith: TEST_PREFIX } },
          { visitorFingerprint: { startsWith: TEST_PREFIX } },
          { utmCampaign: { startsWith: TEST_PREFIX } },
        ],
      },
      select: { sessionId: true },
    })

    const sessionIds = testSessions.map(s => s.sessionId)
    const count = sessionIds.length

    if (count === 0) {
      return NextResponse.json({
        success: true,
        message: 'Nenhum dado de teste encontrado',
        deleted: {
          sessions: 0,
          interestScores: 0,
          pwaInstalls: 0,
          behaviors: 0,
          pageViews: 0,
          leads: 0,
        },
      })
    }

    // Apagar em ordem (respeitando foreign keys)
    const deletedInterestScores = await prisma.interestScore.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })

    const deletedPWAInstalls = await prisma.pWAInstall.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })

    const deletedBehaviors = await prisma.visitorBehavior.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })

    const deletedPageViews = await prisma.pageView.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })

    // Apagar Leads de teste (que têm emails com prefixo TESTE_)
    const deletedLeads = await prisma.lead.deleteMany({
      where: {
        email: { startsWith: TEST_PREFIX },
      },
    })

    // Apagar VisitorSession
    const deletedSessions = await prisma.visitorSession.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })

    return NextResponse.json({
      success: true,
      message: `Todos os dados de teste foram apagados (${count} sessões)`,
      deleted: {
        sessions: deletedSessions.count,
        interestScores: deletedInterestScores.count,
        pwaInstalls: deletedPWAInstalls.count,
        behaviors: deletedBehaviors.count,
        pageViews: deletedPageViews.count,
        leads: deletedLeads.count,
      },
    })

  } catch (error: any) {
    console.error('Erro ao apagar dados de teste:', error)
    return NextResponse.json(
      { error: 'Erro ao apagar dados de teste', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
