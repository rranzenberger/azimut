/**
 * Dashboard Inteligente de Leads com IA
 * Mostra métricas, análises e insights em tempo real
 */

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuthToken } from '@/src/lib/auth'
import { LeadsDashboardClient } from './LeadsDashboardClient'

export default async function LeadsDashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('azimut_admin_token')?.value
  const session = token ? verifyAuthToken(token) : null

  if (!session) {
    redirect('/login')
  }

  // Buscar dados diretamente do banco (mais eficiente)
  const { prisma } = await import('@/src/lib/prisma')
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const todayLeads = await prisma.lead.findMany({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    orderBy: { leadScore: 'desc' },
    take: 20,
  })

  const hotLeads = todayLeads.filter(l => l.leadScore > 70)

  const stats = {
    total: todayLeads.length,
    hot: hotLeads.length,
    high: todayLeads.filter(l => l.leadScore >= 60 && l.leadScore <= 70).length,
    medium: todayLeads.filter(l => l.leadScore >= 40 && l.leadScore < 60).length,
    low: todayLeads.filter(l => l.leadScore < 40).length,
    totalEstimatedValue: todayLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0),
    avgScore: todayLeads.length > 0 
      ? todayLeads.reduce((sum, l) => sum + l.leadScore, 0) / todayLeads.length 
      : 0,
  }

  const reportData = {
    stats,
    hotLeads: hotLeads.slice(0, 10).map(l => ({
      id: l.id,
      name: l.name,
      email: l.email,
      company: l.company,
      score: l.leadScore,
      priority: l.priority,
      projectType: l.projectType,
      estimatedValue: l.estimatedValue,
    })),
    aiInsights: null, // Será gerado pela API se necessário
  }

  return <LeadsDashboardClient initialData={reportData} />
}
