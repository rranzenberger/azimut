// ════════════════════════════════════════════════════════════
// API: Dashboard Analytics - Métricas Principais
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parâmetros de filtro (date range + filtros avançados)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const period = searchParams.get('period') || '30'; // 7, 30, 90
    const country = searchParams.get('country') || undefined;
    const deviceType = searchParams.get('deviceType') || undefined;
    const source = searchParams.get('source') || undefined;
    const compare = searchParams.get('compare') === 'true'; // Comparar períodos
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // ════════════════════════════════════════════════════════════
    // 1. LEADS POR PERÍODO (dia/semana/mês)
    // ════════════════════════════════════════════════════════════
    const leadWhere: any = { createdAt: { gte: startDate } };
    if (country) leadWhere.country = country;
    if (source) leadWhere.sourceUrl = { contains: source };
    
    const allLeads = await prisma.lead.findMany({
      where: leadWhere,
      select: {
        id: true,
        createdAt: true,
        leadType: true,
        sourceUrl: true,
        newsletterSource: true,
        leadScore: true,
        status: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Agrupar leads por dia
    const leadsByDay: Record<string, number> = {};
    allLeads.forEach(lead => {
      const date = lead.createdAt.toISOString().split('T')[0];
      leadsByDay[date] = (leadsByDay[date] || 0) + 1;
    });

    // Agrupar leads por semana
    const leadsByWeek: Record<string, number> = {};
    allLeads.forEach(lead => {
      const week = getWeekKey(lead.createdAt);
      leadsByWeek[week] = (leadsByWeek[week] || 0) + 1;
    });

    // Agrupar leads por mês
    const leadsByMonth: Record<string, number> = {};
    allLeads.forEach(lead => {
      const month = lead.createdAt.toISOString().substring(0, 7); // YYYY-MM
      leadsByMonth[month] = (leadsByMonth[month] || 0) + 1;
    });

    // ════════════════════════════════════════════════════════════
    // 2. TAXA DE CONVERSÃO (visitas → leads)
    // ════════════════════════════════════════════════════════════
    const sessionWhere: any = { createdAt: { gte: startDate } };
    if (country) sessionWhere.country = country;
    if (deviceType) sessionWhere.deviceType = deviceType;
    
    const totalSessions = await prisma.visitorSession.count({
      where: sessionWhere,
    });

    const totalLeads = allLeads.length;
    const conversionRate = totalSessions > 0 
      ? ((totalLeads / totalSessions) * 100) 
      : 0;

    // Comparar com período anterior para calcular mudança
    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - parseInt(period));
    
    const previousSessionWhere: any = {
      createdAt: {
        gte: previousStartDate,
        lt: startDate,
      },
    };
    if (country) previousSessionWhere.country = country;
    if (deviceType) previousSessionWhere.deviceType = deviceType;
    
    const previousSessions = await prisma.visitorSession.count({
      where: previousSessionWhere,
    });

    const previousLeadWhere: any = {
      createdAt: {
        gte: previousStartDate,
        lt: startDate,
      },
    };
    if (country) previousLeadWhere.country = country;
    if (source) previousLeadWhere.sourceUrl = { contains: source };
    
    const previousLeads = await prisma.lead.count({
      where: previousLeadWhere,
    });

    const previousConversionRate = previousSessions > 0
      ? ((previousLeads / previousSessions) * 100)
      : 0;

    const conversionRateChange = previousConversionRate > 0
      ? ((conversionRate - previousConversionRate) / previousConversionRate) * 100
      : 0;

    // ════════════════════════════════════════════════════════════
    // 3. LEADS POR ORIGEM
    // ════════════════════════════════════════════════════════════
    const leadsBySource: Record<string, number> = {};
    allLeads.forEach(lead => {
      let source = 'Outros';
      
      // Priorizar newsletterSource se existir
      if (lead.newsletterSource) {
        source = `Newsletter: ${lead.newsletterSource}`;
      } else if (lead.sourceUrl) {
        // Analisar sourceUrl para identificar origem
        const url = lead.sourceUrl.toLowerCase();
        if (url.includes('newsletter')) {
          source = 'Newsletter';
        } else if (url.includes('contact')) {
          source = 'Formulário de Contato';
        } else if (url.includes('vancouver') || url.includes('academy')) {
          source = 'Vancouver/Academy';
        } else if (url.includes('work') || url.includes('project')) {
          source = 'Projetos';
        } else {
          source = 'Formulário de Contato';
        }
      } else if (lead.leadType) {
        source = lead.leadType.replace('_', ' ');
      }
      
      leadsBySource[source] = (leadsBySource[source] || 0) + 1;
    });

    // ════════════════════════════════════════════════════════════
    // 4. PROJETOS MAIS VISUALIZADOS
    // ════════════════════════════════════════════════════════════
    const projectViews = await prisma.pageView.groupBy({
      by: ['projectId'],
      where: {
        viewedAt: { gte: startDate },
        projectId: { not: null },
      },
      _count: true,
      orderBy: { _count: { projectId: 'desc' } },
      take: 10,
    });

    const topProjects = await Promise.all(
      projectViews.map(async (pv) => {
        if (!pv.projectId) return null;
        const project = await prisma.project.findUnique({
          where: { id: pv.projectId },
          select: {
            id: true,
            title: true,
            slug: true,
            heroImage: true,
          },
        });
        return project
          ? {
              id: project.id,
              title: project.title,
              slug: project.slug,
              views: pv._count,
              heroImage: project.heroImage,
            }
          : null;
      })
    );

    const filteredTopProjects = topProjects.filter(Boolean) as Array<{
      id: string;
      title: string;
      slug: string;
      views: number;
      heroImage: any;
    }>;

    // ════════════════════════════════════════════════════════════
    // 5. PÁGINAS MAIS ACESSADAS
    // ════════════════════════════════════════════════════════════
    const topPages = await prisma.pageView.groupBy({
      by: ['pageSlug'],
      where: {
        viewedAt: { gte: startDate },
        pageSlug: { not: null },
      },
      _count: true,
      _avg: {
        timeSpent: true,
        scrollDepth: true,
      },
      orderBy: { _count: { pageSlug: 'desc' } },
      take: 10,
    });

    // ════════════════════════════════════════════════════════════
    // 6. KPIs (Key Performance Indicators)
    // ════════════════════════════════════════════════════════════
    const uniqueVisitors = await prisma.visitorSession.groupBy({
      by: ['visitorFingerprint'],
      where: {
        createdAt: { gte: startDate },
        visitorFingerprint: { not: null },
      },
      _count: true,
    });

    const hotLeads = allLeads.filter(lead => (lead.leadScore || 0) >= 70);

    // Comparar com período anterior para mudanças
    const previousHotLeads = await prisma.lead.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: startDate,
        },
        leadScore: { gte: 70 },
      },
    });

    const visitorsChange = previousSessions > 0
      ? ((totalSessions - previousSessions) / previousSessions) * 100
      : 0;

    const leadsChange = previousLeads > 0
      ? ((totalLeads - previousLeads) / previousLeads) * 100
      : 0;

    const hotLeadsChange = previousHotLeads > 0
      ? ((hotLeads.length - previousHotLeads) / previousHotLeads) * 100
      : 0;

    // ════════════════════════════════════════════════════════════
    // 7. LEADS POR STATUS
    // ════════════════════════════════════════════════════════════
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      where: { createdAt: { gte: startDate } },
      _count: true,
    });

    return NextResponse.json({
      success: true,
      period: parseInt(period),
      kpis: {
        visitors: {
          value: totalSessions,
          change: Math.round(visitorsChange * 100) / 100,
        },
        leads: {
          value: totalLeads,
          change: Math.round(leadsChange * 100) / 100,
        },
        hotLeads: {
          value: hotLeads.length,
          change: Math.round(hotLeadsChange * 100) / 100,
        },
        conversionRate: {
          value: Math.round(conversionRate * 100) / 100,
          change: Math.round(conversionRateChange * 100) / 100,
        },
      },
      charts: {
        visitorsPerDay: Object.entries(leadsByDay)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date)),
        leadsByWeek: Object.entries(leadsByWeek)
          .map(([week, count]) => ({ week, count }))
          .sort((a, b) => a.week.localeCompare(b.week)),
        leadsByMonth: Object.entries(leadsByMonth)
          .map(([month, count]) => ({ month, count }))
          .sort((a, b) => a.month.localeCompare(b.month)),
        leadsBySource: Object.entries(leadsBySource)
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count),
        leadsByStatus: leadsByStatus.map(item => ({
          status: item.status,
          count: item._count,
        })),
        topPages: topPages.map(item => ({
          page: item.pageSlug || 'Unknown',
          views: item._count,
          avgTime: Math.round((item._avg.timeSpent || 0) / 1000), // converter de ms para segundos
          avgScroll: Math.round(item._avg.scrollDepth || 0),
        })),
        topProjects: filteredTopProjects,
      },
      metrics: {
        totalSessions,
        uniqueVisitors: uniqueVisitors.length,
        totalLeads,
        conversionRate: Math.round(conversionRate * 100) / 100,
      },
      ...(compare && {
        comparison: {
          previous: {
            sessions: previousSessions,
            leads: previousLeads,
            conversionRate: previousConversionRate,
            hotLeads: previousHotLeads,
          },
          current: {
            sessions: totalSessions,
            leads: totalLeads,
            conversionRate: Math.round(conversionRate * 100) / 100,
            hotLeads: hotLeads.length,
          },
          changes: {
            sessions: Math.round(visitorsChange * 100) / 100,
            leads: Math.round(leadsChange * 100) / 100,
            conversionRate: Math.round(conversionRateChange * 100) / 100,
            hotLeads: Math.round(hotLeadsChange * 100) / 100,
          },
        },
      }),
      filters: {
        country: country || null,
        deviceType: deviceType || null,
        source: source || null,
      },
    });
  } catch (error: unknown) {
    console.error('Dashboard analytics error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Failed to fetch dashboard analytics' },
      { status: 500 }
    );
  }
}

// Helper: obter chave de semana (YYYY-WW)
function getWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}
