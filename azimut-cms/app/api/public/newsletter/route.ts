import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// ═══════════════════════════════════════════════════════════════
// API PÚBLICA: Cadastro de Newsletter
// POST /api/public/newsletter
// ═══════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, lang = 'pt', source = 'footer' } = body;

    // Validação básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Normalizar email
    const normalizedEmail = email.toLowerCase().trim();

    // Verificar se já existe subscriber
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingSubscriber) {
      // Se já existe e está desinscrito, reativar
      if (existingSubscriber.status === 'UNSUBSCRIBED') {
        await prisma.newsletterSubscriber.update({
          where: { id: existingSubscriber.id },
          data: {
            status: 'ACTIVE',
            preferredLanguage: lang,
            source: source,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Email já está inscrito!',
        isNew: false,
      });
    }

    // Verificar se existe Lead com este email (para relacionar)
    const existingLead = await prisma.lead.findFirst({
      where: { email: normalizedEmail },
    });

    // Criar novo subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        name: name || null,
        preferredLanguage: lang,
        source: source,
        status: 'ACTIVE',
        leadId: existingLead?.id || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      isNew: true,
    });

  } catch (error: any) {
    console.error('[Newsletter API] Error:', error);
    
    // Erro de campo único (email duplicado)
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: true,
        message: 'Email já cadastrado!',
        isNew: false,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Erro ao processar inscrição' },
      { status: 500 }
    );
  }
}

// GET - Verificar se email já está inscrito
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { success: false, error: 'Email não informado' },
      { status: 400 }
    );
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { 
        email: email.toLowerCase().trim(),
      },
    });

    return NextResponse.json({
      success: true,
      isSubscribed: subscriber?.status === 'ACTIVE' || false,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao verificar' },
      { status: 500 }
    );
  }
}
