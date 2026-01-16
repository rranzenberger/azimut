// ════════════════════════════════════════════════════════════
// API: Alertas Automáticos do Dashboard
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  value?: number;
  threshold?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - days);

    const alerts: Alert[] = [];

    // 1. Verificar hot leads (score >= 70)
    const hotLeads = await prisma.lead.count({
      where: {
        createdAt: { gte: startDate },
        leadScore: { gte: 70 },
        status: { not: 'WON' },
      },
    });

    if (hotLeads > 5) {
      alerts.push({
        id: 'hot-leads',
        type: 'warning',
        title: `🔥 ${hotLeads} Hot Leads Pendentes`,
        message: `${hotLeads} leads com score alto (70+) precisam de atenção imediata`,
        value: hotLeads,
        threshold: 5,
        priority: hotLeads > 10 ? 'urgent' : 'high',
        actionUrl: '/admin/leads?filter=hot',
      });
    }

    // 2. Verificar taxa de conversão
    const totalSessions = await prisma.visitorSession.count({
      where: { createdAt: { gte: startDate } },
    });

    const totalLeads = await prisma.lead.count({
      where: { createdAt: { gte: startDate } },
    });

    const conversionRate = totalSessions > 0 ? (totalLeads / totalSessions) * 100 : 0;

    // Comparar com período anterior
    const previousSessions = await prisma.visitorSession.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: startDate,
        },
      },
    });

    const previousLeads = await prisma.lead.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: startDate,
        },
      },
    });

    const previousConversionRate = previousSessions > 0
      ? (previousLeads / previousSessions) * 100
      : 0;

    const conversionChange = previousConversionRate > 0
      ? ((conversionRate - previousConversionRate) / previousConversionRate) * 100
      : 0;

    if (conversionRate > 5 && conversionChange > 20) {
      alerts.push({
        id: 'high-conversion',
        type: 'success',
        title: `📈 Taxa de Conversão Alta: ${conversionRate.toFixed(2)}%`,
        message: `Conversão aumentou ${conversionChange.toFixed(1)}% em relação ao período anterior`,
        value: conversionRate,
        threshold: 5,
        priority: 'medium',
      });
    } else if (conversionRate < 2 && totalSessions > 100) {
      alerts.push({
        id: 'low-conversion',
        type: 'error',
        title: `⚠️ Taxa de Conversão Baixa: ${conversionRate.toFixed(2)}%`,
        message: `Apenas ${conversionRate.toFixed(2)}% dos visitantes estão convertendo. Considere otimizar o site.`,
        value: conversionRate,
        threshold: 2,
        priority: 'high',
        actionUrl: '/admin/analytics?tab=conversion',
      });
    }

    // 3. Verificar leads não contatados
    const uncontactedLeads = await prisma.lead.count({
      where: {
        createdAt: { gte: startDate },
        status: 'NEW',
        lastContactAt: null,
      },
    });

    if (uncontactedLeads > 10) {
      alerts.push({
        id: 'uncontacted-leads',
        type: 'warning',
        title: `📧 ${uncontactedLeads} Leads Não Contatados`,
        message: `${uncontactedLeads} novos leads ainda não foram contatados`,
        value: uncontactedLeads,
        threshold: 10,
        priority: 'high',
        actionUrl: '/admin/leads?status=NEW',
      });
    }

    // 4. Verificar bounce rate alto
    const bounceSessions = await prisma.visitorSession.count({
      where: {
        createdAt: { gte: startDate },
        bounceRate: true,
      },
    });

    const bounceRate = totalSessions > 0 ? (bounceSessions / totalSessions) * 100 : 0;

    if (bounceRate > 70 && totalSessions > 50) {
      alerts.push({
        id: 'high-bounce',
        type: 'warning',
        title: `📉 Bounce Rate Alto: ${bounceRate.toFixed(1)}%`,
        message: `${bounceRate.toFixed(1)}% dos visitantes saem sem interagir. Considere melhorar a experiência.`,
        value: bounceRate,
        threshold: 70,
        priority: 'medium',
      });
    }

    // 5. Verificar picos de tráfego
    const todaySessions = await prisma.visitorSession.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    const avgDailySessions = totalSessions / days;

    if (todaySessions > avgDailySessions * 2 && todaySessions > 100) {
      alerts.push({
        id: 'traffic-spike',
        type: 'info',
        title: `🚀 Pico de Tráfego Hoje: ${todaySessions} sessões`,
        message: `Tráfego ${((todaySessions / avgDailySessions) * 100).toFixed(0)}% acima da média`,
        value: todaySessions,
        threshold: avgDailySessions,
        priority: 'low',
      });
    }

    // Ordenar por prioridade
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    alerts.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    return NextResponse.json({
      success: true,
      alerts,
      total: alerts.length,
      urgent: alerts.filter(a => a.priority === 'urgent').length,
      high: alerts.filter(a => a.priority === 'high').length,
    });
  } catch (error: unknown) {
    console.error('Erro ao buscar alertas:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao buscar alertas' },
      { status: 500 }
    );
  }
}
