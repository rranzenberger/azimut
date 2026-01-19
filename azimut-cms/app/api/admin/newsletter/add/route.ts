import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// ═══════════════════════════════════════════════════════════════
// API ADMIN: Adicionar inscrito manualmente
// POST /api/admin/newsletter/add
// ═══════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, lang = 'pt', notes } = body

    // Validação básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Normalizar email
    const normalizedEmail = email.toLowerCase().trim()

    // Verificar se já existe subscriber
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingSubscriber) {
      // Se já existe e está desinscrito, reativar
      if (existingSubscriber.status === 'UNSUBSCRIBED') {
        await prisma.newsletterSubscriber.update({
          where: { id: existingSubscriber.id },
          data: {
            status: 'ACTIVE',
            preferredLanguage: lang,
            source: 'manual',
            name: name || existingSubscriber.name,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          },
        })

        return NextResponse.json({
          success: true,
          message: `Email reativado com sucesso! (estava cancelado)`,
          isReactivated: true,
        })
      }

      return NextResponse.json({
        success: true,
        message: 'Email já está inscrito e ativo!',
        isNew: false,
      })
    }

    // Criar novo subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        name: name || null,
        preferredLanguage: lang,
        source: 'manual',
        status: 'ACTIVE',
        // Notas podem ser usadas para criar um Lead relacionado se necessário
      },
    })

    // Se tiver notas, criar um Lead relacionado para contexto
    if (notes && notes.trim()) {
      try {
        const lead = await prisma.lead.create({
          data: {
            email: normalizedEmail,
            name: name || 'Contato Manual',
            message: `[Newsletter Manual] ${notes}`,
            leadType: 'CONTACT_FORM', // Usando tipo genérico (NEWSLETTER não existe no enum)
            status: 'NEW',
            sourceUrl: 'backoffice-manual',
          },
        })

        // Relacionar o subscriber com o lead
        await prisma.newsletterSubscriber.update({
          where: { email: normalizedEmail },
          data: { leadId: lead.id },
        })
      } catch (leadError) {
        // Se falhar criar lead, não é crítico
        console.warn('Could not create related lead:', leadError)
      }
    }

    return NextResponse.json({
      success: true,
      message: `${name || normalizedEmail} adicionado com sucesso!`,
      isNew: true,
    })

  } catch (error) {
    console.error('[Newsletter Add] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao adicionar inscrito' },
      { status: 500 }
    )
  }
}
