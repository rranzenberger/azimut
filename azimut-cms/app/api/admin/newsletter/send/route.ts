import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// POST - Enviar campanha de newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, content, type = 'custom' } = body
    
    if (!subject || !content) {
      return NextResponse.json(
        { success: false, error: 'Assunto e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }
    
    // Buscar todos os inscritos ativos
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { status: 'ACTIVE' }
    })
    
    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nenhum inscrito ativo para enviar' },
        { status: 400 }
      )
    }
    
    // Por enquanto, apenas simula o envio e registra
    // TODO: Integrar com Resend ou outro serviço de email
    console.log(`[Newsletter] Enviando campanha "${subject}" para ${subscribers.length} inscritos`)
    console.log(`[Newsletter] Tipo: ${type}`)
    
    let sentCount = 0
    let failedCount = 0
    
    for (const subscriber of subscribers) {
      try {
        // TODO: Implementar envio real via Resend
        // Por enquanto, simula sucesso
        console.log(`[Newsletter] Email para: ${subscriber.email}`)
        
        // Atualizar contador de emails enviados
        await prisma.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: {
            emailCount: { increment: 1 },
            lastEmailSentAt: new Date()
          }
        })
        
        sentCount++
      } catch (error) {
        console.error(`[Newsletter] Erro ao enviar para ${subscriber.email}:`, error)
        failedCount++
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Campanha enviada`,
      sent: sentCount,
      failed: failedCount,
      total: subscribers.length
    })
  } catch (error) {
    console.error('Error sending newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao enviar newsletter' },
      { status: 500 }
    )
  }
}
