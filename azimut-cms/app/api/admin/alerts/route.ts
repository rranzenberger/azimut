// ════════════════════════════════════════════════════════════
// API: ALERTAS INTELIGENTES
// Detecta hot leads, anomalias e eventos importantes
// + ENVIA EMAIL AUTOMÁTICO PARA HOT LEADS! 📧
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyAuthToken } from '@/lib/auth'
import { hotLeadNotification, type HotLeadData } from '@/lib/email-templates'
import { sendEmail } from '@/lib/email-service'

export const runtime = 'nodejs'

// Email do admin para notificações
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'contato@azmt.com.br'

// Cache para evitar envio duplicado de emails (mesma sessão em 60 minutos)
const emailSentCache = new Map<string, number>()
const EMAIL_CACHE_DURATION = 60 * 60 * 1000 // 60 minutos

// Função para enviar email de hot lead
async function sendHotLeadEmail(session: any, topInterest: string | null): Promise<boolean> {
  const cacheKey = session.sessionId
  const lastSent = emailSentCache.get(cacheKey)
  
  // Verificar cache
  if (lastSent && Date.now() - lastSent < EMAIL_CACHE_DURATION) {
    console.log(`⏭️ Email já enviado para sessão ${cacheKey.substring(0, 8)}`)
    return false
  }
  
  // Só enviar para leads com score >= 70
  const score = session.conversionProbability ? session.conversionProbability * 100 : session.engagementScore || 0
  if (score < 70) {
    return false
  }
  
  try {
    const hotLeadData: HotLeadData = {
      fingerprint: session.visitorFingerprint || session.sessionId,
      country: session.country || undefined,
      city: session.city || undefined,
      deviceType: session.deviceType || undefined,
      browser: session.browser || undefined,
      pageViews: session.pageViews?.length || 0,
      visitCount: session.visitCount || 1,
      engagementScore: session.engagementScore || 0,
      conversionProbability: Math.round(score),
      topPages: session.pageViews?.map((pv: any) => pv.pageSlug || pv.pageUrl)?.slice(0, 5) || [],
      interests: topInterest ? [topInterest] : [],
      referrer: session.referrer || undefined,
      timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    }
    
    const template = hotLeadNotification(hotLeadData)
    const sent = await sendEmail(ADMIN_EMAIL, template)
    
    if (sent) {
      emailSentCache.set(cacheKey, Date.now())
      console.log(`📧 Email de Hot Lead enviado para ${ADMIN_EMAIL} (score: ${score}%)`)
      return true
    }
  } catch (error) {
    console.error('❌ Erro ao enviar email de hot lead:', error)
  }
  
  return false
}

interface Alert {
  id: string
  type: 'hot_lead' | 'traffic_spike' | 'new_country' | 'pwa_install' | 'returning_visitor' | 'high_engagement'
  severity: 'high' | 'medium' | 'low'
  title: string
  message: string
  timestamp: string
  data?: Record<string, any>
  read: boolean
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const alerts: Alert[] = []
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    // ════════════════════════════════════════════════════════════
    // 1. DETECTAR HOT LEADS (score > 70 ou muitas páginas visitadas)
    // ════════════════════════════════════════════════════════════
    const hotLeadSessions = await prisma.visitorSession.findMany({
      where: {
        createdAt: { gte: oneDayAgo },
        OR: [
          { engagementScore: { gte: 70 } },
          { conversionProbability: { gte: 0.7 } },
        ],
      },
      include: {
        pageViews: true,
        interestScores: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Processar hot leads e enviar emails
    let emailsSent = 0
    for (const session of hotLeadSessions) {
      const topInterest = session.interestScores?.[0]
      const interestCategory = topInterest?.category || null
      
      // Tentar enviar email (só envia se score >= 70 e não foi enviado recentemente)
      const emailSent = await sendHotLeadEmail(session, interestCategory)
      if (emailSent) emailsSent++
      
      alerts.push({
        id: `hot_lead_${session.sessionId}`,
        type: 'hot_lead',
        severity: 'high',
        title: '🔥 Hot Lead Detectado!',
        message: `Visitante de ${session.country || 'país desconhecido'} com score ${session.engagementScore || 0}%. ${session.pageViews.length} páginas visitadas.${interestCategory ? ` Interesse principal: ${interestCategory}` : ''}`,
        timestamp: session.createdAt.toISOString(),
        data: {
          sessionId: session.sessionId.substring(0, 8),
          country: session.country,
          device: session.deviceType,
          pages: session.pageViews.length,
          score: session.engagementScore,
          fingerprint: session.visitorFingerprint?.substring(0, 8),
          emailSent: emailSent,
        },
        read: false,
      })
    }
    
    if (emailsSent > 0) {
      console.log(`📧 Total de emails de Hot Lead enviados: ${emailsSent}`)
    }

    // ════════════════════════════════════════════════════════════
    // 2. DETECTAR PICO DE TRÁFEGO (mais que média)
    // ════════════════════════════════════════════════════════════
    const recentSessionsCount = await prisma.visitorSession.count({
      where: { createdAt: { gte: oneHourAgo } },
    })

    const avgHourlySessions = await prisma.visitorSession.count({
      where: { createdAt: { gte: oneDayAgo } },
    }) / 24

    if (recentSessionsCount > avgHourlySessions * 2 && recentSessionsCount > 5) {
      alerts.push({
        id: `traffic_spike_${now.getTime()}`,
        type: 'traffic_spike',
        severity: 'medium',
        title: '📈 Pico de Tráfego!',
        message: `${recentSessionsCount} visitantes na última hora (média: ${Math.round(avgHourlySessions)}/hora)`,
        timestamp: now.toISOString(),
        data: {
          current: recentSessionsCount,
          average: Math.round(avgHourlySessions),
          increase: Math.round((recentSessionsCount / avgHourlySessions - 1) * 100),
        },
        read: false,
      })
    }

    // ════════════════════════════════════════════════════════════
    // 3. DETECTAR NOVOS PAÍSES
    // ════════════════════════════════════════════════════════════
    const recentCountries = await prisma.visitorSession.findMany({
      where: { createdAt: { gte: oneDayAgo } },
      select: { country: true },
      distinct: ['country'],
    })

    const historicalCountries = await prisma.visitorSession.findMany({
      where: { createdAt: { lt: oneDayAgo } },
      select: { country: true },
      distinct: ['country'],
    })

    const historicalSet = new Set(historicalCountries.map(c => c.country))
    const newCountries = recentCountries.filter(c => c.country && !historicalSet.has(c.country))

    newCountries.forEach(country => {
      if (country.country) {
        alerts.push({
          id: `new_country_${country.country}`,
          type: 'new_country',
          severity: 'low',
          title: '🌍 Novo País!',
          message: `Primeiro visitante de ${country.country}`,
          timestamp: now.toISOString(),
          data: { country: country.country },
          read: false,
        })
      }
    })

    // ════════════════════════════════════════════════════════════
    // 4. DETECTAR PWA INSTALLS
    // ════════════════════════════════════════════════════════════
    const recentPWAInstalls = await prisma.pWAInstall.findMany({
      where: { installedAt: { gte: oneDayAgo } },
      orderBy: { installedAt: 'desc' },
      take: 5,
    })

    recentPWAInstalls.forEach(install => {
      alerts.push({
        id: `pwa_install_${install.id}`,
        type: 'pwa_install',
        severity: 'medium',
        title: '📱 PWA Instalado!',
        message: `Novo app instalado (${install.platform || 'plataforma desconhecida'})`,
        timestamp: install.installedAt.toISOString(),
        data: {
          platform: install.platform,
          browser: install.browser,
        },
        read: false,
      })
    })

    // ════════════════════════════════════════════════════════════
    // 5. DETECTAR VISITANTES RETORNANTES FREQUENTES
    // ════════════════════════════════════════════════════════════
    const frequentVisitors = await prisma.visitorSession.findMany({
      where: {
        createdAt: { gte: oneDayAgo },
        visitCount: { gte: 3 },
        isReturning: true,
      },
      orderBy: { visitCount: 'desc' },
      take: 5,
    })

    frequentVisitors.forEach(visitor => {
      alerts.push({
        id: `returning_${visitor.sessionId}`,
        type: 'returning_visitor',
        severity: 'medium',
        title: '🔄 Visitante Frequente!',
        message: `Visitante de ${visitor.country || 'país desconhecido'} retornou ${visitor.visitCount} vezes`,
        timestamp: visitor.createdAt.toISOString(),
        data: {
          visits: visitor.visitCount,
          country: visitor.country,
          fingerprint: visitor.visitorFingerprint?.substring(0, 8),
        },
        read: false,
      })
    })

    // Ordenar por severidade e timestamp
    const severityOrder = { high: 0, medium: 1, low: 2 }
    alerts.sort((a, b) => {
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity]
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

    return NextResponse.json({
      alerts: alerts.slice(0, 20), // Limitar a 20 alertas
      total: alerts.length,
      summary: {
        high: alerts.filter(a => a.severity === 'high').length,
        medium: alerts.filter(a => a.severity === 'medium').length,
        low: alerts.filter(a => a.severity === 'low').length,
      },
      lastUpdated: now.toISOString(),
    })

  } catch (error: any) {
    console.error('Erro ao buscar alertas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar alertas', details: error.message },
      { status: 500 }
    )
  }
}
