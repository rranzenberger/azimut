import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { LeadsList } from './components/LeadsList';
import { LeadsFilters } from './components/LeadsFilters';
import { KanbanBoard } from './components/KanbanBoard';
import { CleanupTestDataButton } from './components/CleanupTestDataButton';

export const revalidate = 0;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  // Extrair filtros dos searchParams
  const status = searchParams.status as string | undefined;
  const priority = searchParams.priority as string | undefined;
  const leadType = searchParams.leadType as string | undefined;
  const dateFrom = searchParams.dateFrom as string | undefined;
  const dateTo = searchParams.dateTo as string | undefined;
  const search = searchParams.search as string | undefined;
  const scoreMin = searchParams.scoreMin as string | undefined;
  const view = (searchParams.view as string) || 'list'; // 'list' ou 'kanban'
  const page = parseInt((searchParams.page as string) || '1');
  const limit = 50;
  const offset = (page - 1) * limit;

  let leads: any[] = [];
  let allLeads: any[] = []; // Para Kanban (sem paginação)
  let total = 0;
  let error: string | null = null;

  try {
    // Construir where clause
    const where: any = {};
    
    if (status && ['NEW', 'CONTACTED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST'].includes(status)) {
      where.status = status;
    }
    
    if (priority && ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(priority)) {
      where.priority = priority;
    }
    
    if (leadType && ['CONTACT_FORM', 'BUDGET_INQUIRY', 'VANCOUVER'].includes(leadType)) {
      where.leadType = leadType;
    }
    
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }
    
    // Construir OR para busca
    const orConditions: any[] = [];
    
    if (search) {
      orConditions.push(
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      );
    }

    // Filtro por score mínimo
    if (scoreMin) {
      const minScore = parseInt(scoreMin);
      if (!isNaN(minScore)) {
        // Buscar por leadScore OU conversionScore das sessões
        orConditions.push(
          { leadScore: { gte: minScore } },
          {
            sessions: {
              some: {
                interestScore: {
                  conversionScore: { gte: minScore }
                }
              }
            }
          }
        );
      }
    }

    // Se tiver OR conditions, adicionar ao where
    if (orConditions.length > 0) {
      where.OR = orConditions;
    }

    // Para Kanban: buscar todos os leads (sem paginação)
    if (view === 'kanban') {
      allLeads = await prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });
    }

    // Para Lista: buscar com paginação
    const [leadsData, totalCount] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          sessions: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            include: {
              interestScore: {
                select: {
                  conversionScore: true,
                  visitorType: true,
                },
              },
            },
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    leads = leadsData;
    total = totalCount;
  } catch (err: any) {
    console.error('Leads fetch error:', err);
    error = 'Erro ao carregar leads. Verifique a conexão com o banco.';
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0, fontSize: 32, marginBottom: 8, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Leads
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie todos os leads capturados do site.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <CleanupTestDataButton />
          <div
            style={{
              display: 'flex',
              gap: 8,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: 4,
            }}
          >
          <Link
            href={`/admin/leads?${new URLSearchParams({
              ...(status && { status }),
              ...(priority && { priority }),
              ...(leadType && { leadType }),
              ...(dateFrom && { dateFrom }),
              ...(dateTo && { dateTo }),
              ...(search && { search }),
              view: 'list',
            }).toString()}`}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
              ...(view === 'list'
                ? {
                    background: '#c92337',
                    color: '#fff',
                  }
                : {
                    background: 'transparent',
                    color: '#9f9bb0',
                  }),
            }}
          >
            📋 Lista
          </Link>
          <Link
            href={`/admin/leads?${new URLSearchParams({
              ...(status && { status }),
              ...(priority && { priority }),
              ...(leadType && { leadType }),
              ...(dateFrom && { dateFrom }),
              ...(dateTo && { dateTo }),
              ...(search && { search }),
              view: 'kanban',
            }).toString()}`}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
              ...(view === 'kanban'
                ? {
                    background: '#c92337',
                    color: '#fff',
                  }
                : {
                    background: 'transparent',
                    color: '#9f9bb0',
                  }),
            }}
          >
            🔲 Kanban
          </Link>
          </div>
        </div>
      </header>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(201,35,55,0.35)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      <LeadsFilters
        currentStatus={status}
        currentPriority={priority}
        currentLeadType={leadType}
        currentDateFrom={dateFrom}
        currentDateTo={dateTo}
        currentSearch={search}
        currentScoreMin={scoreMin}
      />

      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 16, color: '#9f9bb0', fontSize: 14 }}>
          {total} lead{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
        </div>

        {leads.length === 0 && !error && (
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: '#9f9bb0',
            }}
          >
            <p style={{ margin: 0, fontSize: 16 }}>Nenhum lead encontrado.</p>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: '#8f8ba2' }}>
              Tente ajustar os filtros ou aguarde novos leads.
            </p>
          </div>
        )}

        {leads.length > 0 && view === 'list' && (
          <>
            <LeadsList leads={leads} />
            
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 24,
                  alignItems: 'center',
                }}
              >
                {page > 1 && (
                  <Link
                    href={`/admin/leads?${new URLSearchParams({
                      ...(status && { status }),
                      ...(priority && { priority }),
                      ...(leadType && { leadType }),
                      ...(dateFrom && { dateFrom }),
                      ...(dateTo && { dateTo }),
                      ...(search && { search }),
                      page: String(page - 1),
                    }).toString()}`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: 14,
                    }}
                  >
                    ← Anterior
                  </Link>
                )}
                
                <span style={{ color: '#9f9bb0', fontSize: 14 }}>
                  Página {page} de {totalPages}
                </span>
                
                {page < totalPages && (
                  <Link
                    href={`/admin/leads?${new URLSearchParams({
                      ...(status && { status }),
                      ...(priority && { priority }),
                      ...(leadType && { leadType }),
                      ...(dateFrom && { dateFrom }),
                      ...(dateTo && { dateTo }),
                      ...(search && { search }),
                      page: String(page + 1),
                    }).toString()}`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: 14,
                    }}
                  >
                    Próxima →
                  </Link>
                )}
              </div>
            )}
          </>
        )}

        {view === 'kanban' && (
          <>
            {allLeads.length === 0 && !error && (
              <div
                style={{
                  padding: 40,
                  textAlign: 'center',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#9f9bb0',
                }}
              >
                <p style={{ margin: 0, fontSize: 16 }}>Nenhum lead encontrado.</p>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: '#8f8ba2' }}>
                  Tente ajustar os filtros ou aguarde novos leads.
                </p>
              </div>
            )}
            {allLeads.length > 0 && <KanbanBoard leads={allLeads} />}
          </>
        )}
      </div>
    </div>
  );
}

