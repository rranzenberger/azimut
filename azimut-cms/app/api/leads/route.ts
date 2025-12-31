/**
 * API de Captura de Leads
 * Captura leads com contexto comportamental e notifica equipe
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper local para buscar settings com fallback
async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 'singleton' },
    });
    return settings;
  } catch (error: any) {
    // Se falhar, retornar null (usar env var como fallback)
    console.warn('⚠️ Erro ao buscar Settings. Usando env var.', error.message);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      name,
      email,
      phone,
      company,
      position,
      projectType,
      budget,
      timeline,
      description,
      source,
    } = body;

    // Validação básica
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar contexto da sessão (se existe)
    let interestScore = null;
    let session = null;

    if (sessionId) {
      session = await prisma.visitorSession.findUnique({
        where: { sessionId },
        include: {
          interestScore: true,
          pageViews: {
            include: {
              project: true,
            },
          },
        },
      });

      interestScore = session?.interestScore;
    }

    // Inferir tipo de lead baseado no interesse
    let leadType = 'CONTACT_FORM';
    if (budget) leadType = 'BUDGET_INQUIRY';

    // Inferir prioridade baseada no score de conversão
    let priority = 'MEDIUM';
    if (interestScore) {
      if (interestScore.conversionScore > 70) priority = 'HIGH';
      if (interestScore.conversionScore > 85) priority = 'URGENT';
    }

    // Inferir tipo de visitante se não temos score
    let inferredType: string | null = interestScore?.visitorType || null;
    if (!inferredType && projectType) {
      if (projectType.toLowerCase().includes('museu')) {
        inferredType = 'MUSEUM_CURATOR';
      } else if (projectType.toLowerCase().includes('cidade') || 
                 projectType.toLowerCase().includes('prefeitura')) {
        inferredType = 'CITY_OFFICIAL';
      } else if (projectType.toLowerCase().includes('marca')) {
        inferredType = 'BRAND_MANAGER';
      } else if (projectType.toLowerCase().includes('festival')) {
        inferredType = 'FESTIVAL_ORGANIZER';
      }
    }

    // Criar lead
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        position,
        leadType: leadType as any,
        projectType,
        budget,
        timeline,
        description,
        sourceUrl: source?.url,
        referrer: source?.referrer,
        utmSource: source?.utm_source,
        utmMedium: source?.utm_medium,
        utmCampaign: source?.utm_campaign,
        status: 'NEW',
        priority: priority as any,
      },
    });

    // Vincular lead à sessão
    if (sessionId) {
      await prisma.visitorSession.update({
        where: { sessionId },
        data: {
          leadId: lead.id,
        },
      });
    }

    // Enviar notificação por email
    const settings = await getSettings();
    await sendLeadNotification({
      lead,
      interestScore,
      session,
      inferredType,
      notificationEmail: settings.notificationEmail || process.env.NOTIFICATION_EMAIL,
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Obrigado! Entraremos em contato em breve.',
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
}

/**
 * Envia notificação de novo lead por email
 */
async function sendLeadNotification(data: {
  lead: any;
  interestScore: any;
  session: any;
  inferredType: string | null;
  notificationEmail?: string | null;
}) {
  const { lead, interestScore, session, inferredType, notificationEmail } = data;

  // Preparar contexto comportamental
  const context = {
    visitedPages: session?.pageViews?.map((pv: any) => pv.pageSlug).join(', ') || 'N/A',
    projectsViewed: session?.pageViews
      ?.filter((pv: any) => pv.project)
      ?.map((pv: any) => pv.project.title)
      .join(', ') || 'N/A',
    timeOnSite: session?.duration ? `${Math.round(session.duration / 60)} min` : 'N/A',
    conversionScore: interestScore?.conversionScore || 0,
    visitorType: inferredType || 'Não identificado',
    country: session?.country || 'N/A',
  };

  // Template do email
  const emailHtml = `
    <h2>🎯 Novo Lead Capturado - Azimut</h2>
    
    <h3>Informações do Contato:</h3>
    <ul>
      <li><strong>Nome:</strong> ${lead.name}</li>
      <li><strong>Email:</strong> ${lead.email}</li>
      <li><strong>Telefone:</strong> ${lead.phone || 'N/A'}</li>
      <li><strong>Empresa:</strong> ${lead.company || 'N/A'}</li>
      <li><strong>Cargo:</strong> ${lead.position || 'N/A'}</li>
    </ul>

    <h3>Interesse:</h3>
    <ul>
      <li><strong>Tipo de Projeto:</strong> ${lead.projectType || 'N/A'}</li>
      <li><strong>Budget:</strong> ${lead.budget || 'Não informado'}</li>
      <li><strong>Timeline:</strong> ${lead.timeline || 'Não informado'}</li>
      <li><strong>Descrição:</strong> ${lead.description || 'N/A'}</li>
    </ul>

    <h3>📊 Análise Comportamental (IA):</h3>
    <ul>
      <li><strong>Tipo de Visitante:</strong> ${context.visitorType}</li>
      <li><strong>Score de Conversão:</strong> ${context.conversionScore}/100</li>
      <li><strong>Tempo no Site:</strong> ${context.timeOnSite}</li>
      <li><strong>País:</strong> ${context.country}</li>
      <li><strong>Páginas Visitadas:</strong> ${context.visitedPages}</li>
      <li><strong>Projetos Visualizados:</strong> ${context.projectsViewed}</li>
    </ul>

    <h3>🎯 Prioridade: ${lead.priority}</h3>

    <hr>
    <p><small>Lead ID: ${lead.id}</small></p>
  `;

  // Se não tiver email configurado, apenas logar
  if (!notificationEmail) {
    console.log('📧 Notificação de lead (email não configurado):', {
      subject: `[${lead.priority}] Novo Lead: ${lead.name} - ${context.visitorType}`,
      html: emailHtml,
    });
    return;
  }

  // Aqui você implementaria o envio real de email
  // usando Nodemailer, SendGrid, etc.
  console.log('📧 Notificação de lead:', {
    to: notificationEmail,
    subject: `[${lead.priority}] Novo Lead: ${lead.name} - ${context.visitorType}`,
    html: emailHtml,
  });

  // TODO: Implementar envio real de email usando SMTP do Settings
  // await sendEmail({
  //   to: notificationEmail,
  //   subject: `[${lead.priority}] Novo Lead: ${lead.name}`,
  //   html: emailHtml,
  // });
}












