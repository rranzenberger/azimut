import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// GET - Verificar duplicatas e inconsistências
export async function GET() {
  try {
    // Buscar todos os subscribers com seus leads relacionados
    const subscribers = await prisma.newsletterSubscriber.findMany({
      include: {
        lead: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })
    
    // Verificar emails duplicados na tabela de subscribers
    const emailCounts: Record<string, number> = {}
    subscribers.forEach(sub => {
      const email = sub.email.toLowerCase()
      emailCounts[email] = (emailCounts[email] || 0) + 1
    })
    
    const duplicateEmails = Object.entries(emailCounts)
      .filter(([_, count]) => count > 1)
      .map(([email, count]) => ({ email, count }))
    
    // Verificar subscribers sem lead linkado
    const orphanSubscribers = subscribers.filter(sub => !sub.leadId)
    
    // Verificar se há leads que deveriam estar linkados
    const subscriberEmails = subscribers.map(s => s.email.toLowerCase())
    const leadsWithSameEmail = await prisma.lead.findMany({
      where: {
        email: { in: subscriberEmails }
      },
      select: {
        id: true,
        email: true,
        name: true,
        newsletterSubscriber: {
          select: { id: true }
        }
      }
    })
    
    const unlinkedLeads = leadsWithSameEmail.filter(lead => !lead.newsletterSubscriber)
    
    return NextResponse.json({
      success: true,
      totalSubscribers: subscribers.length,
      duplicateEmails,
      orphanSubscribers: orphanSubscribers.length,
      unlinkedLeads: unlinkedLeads.length,
      details: {
        duplicates: duplicateEmails,
        orphans: orphanSubscribers.map(s => ({
          id: s.id,
          email: s.email,
          source: s.source
        })),
        unlinked: unlinkedLeads.map(l => ({
          id: l.id,
          email: l.email,
          name: l.name
        }))
      }
    })
  } catch (error) {
    console.error('Error checking duplicates:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao verificar duplicatas' },
      { status: 500 }
    )
  }
}
