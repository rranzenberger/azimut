import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // dias
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // 1. VISITORS
    const totalVisitors = await prisma.visitorSession.count({
      where: {
        createdAt: { gte: startDate }
      }
    })

    const previousStartDate = new Date(startDate)
    previousStartDate.setDate(previousStartDate.getDate() - parseInt(period))
    const previousVisitors = await prisma.visitorSession.count({
      where: {
        createdAt: { gte: previousStartDate, lt: startDate }
      }
    })

    const visitorsChange = previousVisitors > 0 
      ? ((totalVisitors - previousVisitors) / previousVisitors * 100).toFixed(1)
      : '0'

    // 2. LEADS
    const totalLeads = await prisma.lead.count({
      where: {
        createdAt: { gte: startDate }
      }
    })

    const previousLeads = await prisma.lead.count({
      where: {
        createdAt: { gte: previousStartDate, lt: startDate }
      }
    })

    const leadsChange = previousLeads > 0
      ? ((totalLeads - previousLeads) / previousLeads * 100).toFixed(1)
      : '0'

    // 3. HOT LEADS (score >= 70)
    const hotLeads = await prisma.lead.count({
      where: {
        leadScore: { gte: 70 },
        status: { in: ['NEW', 'CONTACTED', 'IN_PROGRESS'] }
      }
    })

    const previousHotLeads = await prisma.lead.count({
      where: {
        leadScore: { gte: 70 },
        createdAt: { gte: previousStartDate, lt: startDate }
      }
    })

    const hotLeadsChange = previousHotLeads > 0
      ? ((hotLeads - previousHotLeads) / previousHotLeads * 100).toFixed(1)
      : '0'

    // 4. CONVERSION RATE
    const conversionRate = totalVisitors > 0
      ? ((totalLeads / totalVisitors) * 100).toFixed(2)
      : '0.00'

    const previousConversionRate = previousVisitors > 0
      ? ((previousLeads / previousVisitors) * 100).toFixed(2)
      : '0.00'

    const conversionChange = parseFloat(previousConversionRate) > 0
      ? ((parseFloat(conversionRate) - parseFloat(previousConversionRate)) / parseFloat(previousConversionRate) * 100).toFixed(2)
      : '0'

    // 5. VISITORS PER DAY (for chart)
    const visitorsPerDay = await prisma.$queryRaw<Array<{date: Date, count: bigint}>>`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM "VisitorSession"
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // 6. LEADS BY STATUS (funnel)
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
      where: {
        createdAt: { gte: startDate }
      }
    })

    // 7. TRAFFIC SOURCES (buscar do Lead, não VisitorSession)
    const trafficSources = await prisma.lead.groupBy({
      by: ['referrer'],
      _count: true,
      where: {
        createdAt: { gte: startDate },
        referrer: { not: null }
      },
      orderBy: {
        _count: {
          referrer: 'desc'
        }
      },
      take: 10
    })

    // 8. TOP PAGES
    const topPages = await prisma.pageView.groupBy({
      by: ['pageSlug'],
      _count: true,
      _avg: {
        timeSpent: true
      },
      where: {
        viewedAt: { gte: startDate }
      },
      orderBy: {
        _count: {
          pageSlug: 'desc'
        }
      },
      take: 10
    })

    // 9. TOP PROJECTS (que geram mais leads)
    const topProjects = await prisma.pageView.groupBy({
      by: ['projectSlug'],
      _count: true,
      where: {
        projectSlug: { not: null },
        viewedAt: { gte: startDate }
      },
      orderBy: {
        _count: {
          projectSlug: 'desc'
        }
      },
      take: 10
    })

    // 10. HOT LEADS LIST (for table)
    const hotLeadsList = await prisma.lead.findMany({
      where: {
        leadScore: { gte: 70 },
        status: { in: ['NEW', 'CONTACTED', 'IN_PROGRESS'] }
      },
      orderBy: {
        leadScore: 'desc'
      },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        leadScore: true,
        budget: true,
        status: true,
        organizationType: true,
        createdAt: true,
        lastContactAt: true
      }
    })

    // 11. LEADS BY TYPE (for segmented dashboard)
    const leadsByType = await prisma.lead.groupBy({
      by: ['leadType'],
      _count: true,
      where: {
        createdAt: { gte: startDate }
      }
    })

    // Contar leads em pipeline por tipo
    const vancouverInPipeline = await prisma.lead.count({
      where: {
        leadType: 'VANCOUVER',
        status: { in: ['NEW', 'CONTACTED', 'IN_PROGRESS'] }
      }
    })

    const coursesInPipeline = await prisma.lead.count({
      where: {
        leadType: 'CONTACT_FORM', // Assumir que Contact Form são cursos por enquanto
        status: { in: ['NEW', 'CONTACTED', 'IN_PROGRESS'] }
      }
    })

    const projectsInPipeline = await prisma.lead.count({
      where: {
        leadType: 'BUDGET_INQUIRY',
        status: { in: ['NEW', 'CONTACTED', 'IN_PROGRESS'] }
      }
    })

    return NextResponse.json({
      kpis: {
        visitors: {
          value: totalVisitors,
          change: parseFloat(visitorsChange)
        },
        leads: {
          value: totalLeads,
          change: parseFloat(leadsChange)
        },
        hotLeads: {
          value: hotLeads,
          change: parseFloat(hotLeadsChange)
        },
        conversionRate: {
          value: parseFloat(conversionRate),
          change: parseFloat(conversionChange)
        }
      },
      charts: {
        visitorsPerDay: visitorsPerDay.map(v => ({
          date: v.date,
          count: Number(v.count)
        })),
        leadsByStatus: leadsByStatus.map(l => ({
          status: l.status,
          count: l._count
        })),
        trafficSources: trafficSources.map(t => ({
          source: t.referrer || 'Direct',
          count: t._count
        })),
        topPages: topPages.map(p => ({
          page: p.pageSlug,
          views: p._count,
          avgTime: Math.round(p._avg.timeSpent || 0)
        })),
        topProjects: topProjects.map(p => ({
          project: p.projectSlug,
          views: p._count
        }))
      },
      hotLeadsList,
      leadsByType: {
        vancouver: {
          total: leadsByType.find(l => l.leadType === 'VANCOUVER')?._count || 0,
          inPipeline: vancouverInPipeline
        },
        courses: {
          total: leadsByType.find(l => l.leadType === 'CONTACT_FORM')?._count || 0,
          inPipeline: coursesInPipeline
        },
        projects: {
          total: leadsByType.find(l => l.leadType === 'BUDGET_INQUIRY')?._count || 0,
          inPipeline: projectsInPipeline
        }
      }
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
