/**
 * Cron Job - Email Sequences
 * Roda diariamente para enviar sequências automáticas
 * 
 * Vercel Cron: https://vercel.com/docs/cron-jobs
 * Adicionar em vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/email-sequences",
 *     "schedule": "0 10 * * *"
 *   }]
 * }
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendFollowUpEmail } from '@/lib/email-service'

// Verificar token de segurança do cron (Vercel Cron Secret)
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(request: Request) {
  // Verificar autenticação (Vercel Cron envia um header)
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('🔄 Starting email sequences cron job...')
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // Buscar leads para enviar emails
    // D+2, D+5, D+7
    const daysToCheck = [2, 5, 7]
    const results = []

    for (const day of daysToCheck) {
      const targetDate = new Date(today)
      targetDate.setDate(targetDate.getDate() - day)
      
      const nextDate = new Date(targetDate)
      nextDate.setDate(nextDate.getDate() + 1)

      // Buscar leads criados exatamente há X dias
      // E que ainda não estão em status "WON" ou "LOST"
      const leads = await prisma.lead.findMany({
        where: {
          createdAt: {
            gte: targetDate,
            lt: nextDate
          },
          status: {
            notIn: ['WON', 'LOST']
          },
          leadType: {
            in: ['VANCOUVER'] // Por enquanto só Vancouver tem sequência
          }
        },
        select: {
          id: true,
          email: true,
          name: true,
          leadType: true,
          createdAt: true
        }
      })

      console.log(`📧 D+${day}: Found ${leads.length} leads to send follow-up`)

      for (const lead of leads) {
        try {
          const sent = await sendFollowUpEmail(lead, day)
          if (sent) {
            results.push({
              leadId: lead.id,
              day,
              status: 'sent'
            })
            
            // Atualizar lastContactAt
            await prisma.lead.update({
              where: { id: lead.id },
              data: { lastContactAt: new Date() }
            })
          } else {
            results.push({
              leadId: lead.id,
              day,
              status: 'failed'
            })
          }
        } catch (error) {
          console.error(`❌ Error sending email to lead ${lead.id}:`, error)
          results.push({
            leadId: lead.id,
            day,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }
    }

    console.log(`✅ Email sequences cron job completed: ${results.length} emails processed`)

    return NextResponse.json({
      success: true,
      processed: results.length,
      results
    })
  } catch (error) {
    console.error('❌ Email sequences cron job error:', error)
    return NextResponse.json(
      {
        error: 'Cron job failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
