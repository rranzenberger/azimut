import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// GET - Estatísticas da newsletter
export async function GET() {
  try {
    // Total de inscritos
    const totalSubscribers = await prisma.newsletterSubscriber.count()
    
    // Ativos
    const activeSubscribers = await prisma.newsletterSubscriber.count({
      where: { status: 'ACTIVE' }
    })
    
    // Desinscritos
    const unsubscribed = await prisma.newsletterSubscriber.count({
      where: { status: 'UNSUBSCRIBED' }
    })
    
    // Bounced
    const bounced = await prisma.newsletterSubscriber.count({
      where: { status: 'BOUNCED' }
    })
    
    // Por idioma
    const byLanguageRaw = await prisma.newsletterSubscriber.groupBy({
      by: ['preferredLanguage'],
      _count: { preferredLanguage: true }
    })
    
    const byLanguage: Record<string, number> = {}
    byLanguageRaw.forEach(item => {
      byLanguage[item.preferredLanguage] = item._count.preferredLanguage
    })
    
    // Por origem
    const bySourceRaw = await prisma.newsletterSubscriber.groupBy({
      by: ['source'],
      _count: { source: true }
    })
    
    const bySource: Record<string, number> = {}
    bySourceRaw.forEach(item => {
      bySource[item.source] = item._count.source
    })
    
    // Últimos 7 dias
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentSubscribers = await prisma.newsletterSubscriber.count({
      where: {
        subscribedAt: { gte: sevenDaysAgo }
      }
    })
    
    return NextResponse.json({
      success: true,
      totalSubscribers,
      activeSubscribers,
      unsubscribed,
      bounced,
      byLanguage,
      bySource,
      recentSubscribers
    })
  } catch (error) {
    console.error('Error fetching newsletter stats:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}
