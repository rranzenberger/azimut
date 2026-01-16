import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ═══════════════════════════════════════════════════════════════
// API PÚBLICA: Cadastro de Newsletter
// POST /api/public/newsletter
// ═══════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, lang = 'pt', source = 'footer' } = body;

    // Validação básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Normalizar email
    const normalizedEmail = email.toLowerCase().trim();

    // Verificar se já existe
    const existing = await prisma.lead.findFirst({
      where: { email: normalizedEmail },
    });

    if (existing) {
      // Lead já existe - atualizar para newsletter
      await prisma.lead.update({
        where: { id: existing.id },
        data: {
          wantsNewsletter: true,
          preferredLanguage: lang,
          newsletterSource: source,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Inscrição atualizada!',
        isNew: false,
      });
    }

    // Criar novo lead para newsletter
    await prisma.lead.create({
      data: {
        email: normalizedEmail,
        name: 'Newsletter Subscriber',
        leadType: 'CONTACT_FORM',
        sourceUrl: `newsletter_${source}`,
        status: 'NEW',
        priority: 'LOW',
        wantsNewsletter: true,
        preferredLanguage: lang,
        newsletterSource: source,
        leadScore: 10,
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
    const lead = await prisma.lead.findFirst({
      where: { 
        email: email.toLowerCase().trim(),
        wantsNewsletter: true,
      },
    });

    return NextResponse.json({
      success: true,
      isSubscribed: !!lead,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao verificar' },
      { status: 500 }
    );
  }
}
