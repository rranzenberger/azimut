/**
 * API para enviar notificação de Hot Lead por email
 * POST /api/admin/notify-hot-lead
 */

import { NextResponse } from 'next/server'
import { hotLeadNotification, type HotLeadData } from '@/lib/email-templates'
import { sendEmail } from '@/lib/email-service'
import { prisma } from '@/lib/prisma'

// Email do admin para receber notificações
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'contato@azmt.com.br'

// Cache para evitar envio duplicado (mesmo lead em 30 minutos)
const notificationCache = new Map<string, number>()
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutos

export async function POST(request: Request) {
  try {
    const data: HotLeadData = await request.json()
    
    // Validar dados mínimos
    if (!data.fingerprint || !data.conversionProbability) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }
    
    // Verificar cache para evitar spam
    const cacheKey = data.fingerprint
    const lastNotification = notificationCache.get(cacheKey)
    
    if (lastNotification && Date.now() - lastNotification < CACHE_DURATION) {
      console.log(`⏭️ Hot lead ${cacheKey} já notificado recentemente`)
      return NextResponse.json({ 
        success: true, 
        message: 'Notificação já enviada recentemente',
        cached: true 
      })
    }
    
    // Gerar template do email
    const template = hotLeadNotification({
      ...data,
      timestamp: data.timestamp || new Date().toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo' 
      })
    })
    
    // Enviar email
    const sent = await sendEmail(ADMIN_EMAIL, template)
    
    if (sent) {
      // Atualizar cache
      notificationCache.set(cacheKey, Date.now())
      
      // Registrar no banco (opcional - para histórico)
      try {
        await prisma.visitorBehavior.create({
          data: {
            sessionId: `notify_${data.fingerprint}_${Date.now()}`,
            eventType: 'hot_lead_notification_sent',
            eventData: JSON.stringify({
              fingerprint: data.fingerprint,
              score: data.conversionProbability,
              email: data.email || null,
              sentTo: ADMIN_EMAIL,
              timestamp: new Date().toISOString()
            })
          }
        })
      } catch (e) {
        // Ignorar erro de registro, email já foi enviado
        console.warn('⚠️ Não foi possível registrar notificação no banco:', e)
      }
      
      console.log(`✅ Notificação de Hot Lead enviada para ${ADMIN_EMAIL}`)
      
      return NextResponse.json({ 
        success: true, 
        message: `Email enviado para ${ADMIN_EMAIL}` 
      })
    } else {
      console.warn('⚠️ Email não enviado (RESEND_API_KEY pode não estar configurado)')
      return NextResponse.json({ 
        success: false, 
        message: 'Email não enviado - verificar configuração RESEND_API_KEY' 
      })
    }
    
  } catch (error) {
    console.error('❌ Erro ao enviar notificação de Hot Lead:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// GET para verificar status da API
export async function GET() {
  const hasResendKey = !!process.env.RESEND_API_KEY
  
  return NextResponse.json({
    status: 'online',
    adminEmail: ADMIN_EMAIL,
    resendConfigured: hasResendKey,
    cacheSize: notificationCache.size
  })
}
