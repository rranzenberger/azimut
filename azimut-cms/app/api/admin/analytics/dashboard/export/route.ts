// ════════════════════════════════════════════════════════════
// API: Exportar Dados do Dashboard (CSV/Excel)
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv'; // csv ou excel
    const type = searchParams.get('type') || 'leads'; // leads, sessions, pages, projects
    const days = parseInt(searchParams.get('days') || '30');
    const country = searchParams.get('country') || undefined;
    const deviceType = searchParams.get('deviceType') || undefined;
    const source = searchParams.get('source') || undefined;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let csvData = '';
    let filename = '';

    if (type === 'leads') {
      // Exportar leads
      const leads = await prisma.lead.findMany({
        where: {
          createdAt: { gte: startDate },
          ...(country && { country }),
          ...(source && { sourceUrl: { contains: source } }),
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          leadType: true,
          status: true,
          leadScore: true,
          country: true,
          city: true,
          sourceUrl: true,
          createdAt: true,
          wantsNewsletter: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      filename = `leads_${new Date().toISOString().split('T')[0]}.csv`;
      csvData = [
        'ID,Name,Email,Phone,Company,Type,Status,Score,Country,City,Source,Newsletter,Created At',
        ...leads.map(l => [
          l.id,
          `"${l.name?.replace(/"/g, '""') || ''}"`,
          l.email || '',
          l.phone || '',
          `"${l.company?.replace(/"/g, '""') || ''}"`,
          l.leadType || '',
          l.status || '',
          l.leadScore || 0,
          l.country || '',
          l.city || '',
          `"${l.sourceUrl?.replace(/"/g, '""') || ''}"`,
          l.wantsNewsletter ? 'Yes' : 'No',
          l.createdAt.toISOString(),
        ].join(',')),
      ].join('\n');
    } else if (type === 'sessions') {
      // Exportar sessões
      const sessions = await prisma.visitorSession.findMany({
        where: {
          createdAt: { gte: startDate },
          ...(country && { country }),
          ...(deviceType && { deviceType }),
        },
        select: {
          sessionId: true,
          country: true,
          city: true,
          deviceType: true,
          browser: true,
          language: true,
          engagementScore: true,
          visitCount: true,
          isReturning: true,
          createdAt: true,
          lastActivityAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 10000, // Limite para performance
      });

      filename = `sessions_${new Date().toISOString().split('T')[0]}.csv`;
      csvData = [
        'Session ID,Country,City,Device,Browser,Language,Engagement Score,Visit Count,Returning,Created At,Last Activity',
        ...sessions.map(s => [
          s.sessionId,
          s.country || '',
          s.city || '',
          s.deviceType || '',
          s.browser || '',
          s.language || '',
          s.engagementScore || 0,
          s.visitCount || 1,
          s.isReturning ? 'Yes' : 'No',
          s.createdAt.toISOString(),
          s.lastActivityAt.toISOString(),
        ].join(',')),
      ].join('\n');
    } else if (type === 'pages') {
      // Exportar páginas mais acessadas
      const pageViews = await prisma.pageView.groupBy({
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
        take: 100,
      });

      filename = `pages_${new Date().toISOString().split('T')[0]}.csv`;
      csvData = [
        'Page,Views,Avg Time (s),Avg Scroll (%)',
        ...pageViews.map(pv => [
          pv.pageSlug || 'Unknown',
          pv._count,
          Math.round((pv._avg.timeSpent || 0) / 1000),
          Math.round(pv._avg.scrollDepth || 0),
        ].join(',')),
      ].join('\n');
    } else if (type === 'projects') {
      // Exportar projetos mais visualizados
      const projectViews = await prisma.pageView.groupBy({
        by: ['projectId'],
        where: {
          viewedAt: { gte: startDate },
          projectId: { not: null },
        },
        _count: true,
      });

      const projects = await Promise.all(
        projectViews.map(async (pv) => {
          if (!pv.projectId) return null;
          const project = await prisma.project.findUnique({
            where: { id: pv.projectId },
            select: { id: true, title: true, slug: true },
          });
          return project ? { ...project, views: pv._count } : null;
        })
      );

      const filteredProjects = projects.filter(Boolean) as Array<{
        id: string;
        title: string;
        slug: string;
        views: number;
      }>;

      filename = `projects_${new Date().toISOString().split('T')[0]}.csv`;
      csvData = [
        'Project ID,Title,Slug,Views',
        ...filteredProjects.map(p => [
          p.id,
          `"${p.title.replace(/"/g, '""')}"`,
          p.slug,
          p.views,
        ].join(',')),
      ].join('\n');
    } else {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
    }

    // Retornar como CSV
    if (format === 'csv') {
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Para Excel, retornar JSON (cliente converte)
    return NextResponse.json({
      success: true,
      data: csvData,
      filename,
      format: 'excel', // Cliente converte no frontend
    });
  } catch (error: unknown) {
    console.error('Erro ao exportar dados:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao exportar dados' },
      { status: 500 }
    );
  }
}
