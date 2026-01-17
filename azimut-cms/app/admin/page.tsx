import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { StatCard } from './components/StatCard';
import { LeadCard } from './components/LeadCard';
import { EmptyState } from './components/EmptyState';

export const revalidate = 0;

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let stats = { projects: 0, leads: 0, sessions: 0 };
  let recentLeads:
    | {
        id: string;
        name: string;
        email: string;
        projectType: string | null;
        priority: string;
        createdAt: Date;
      }[]
    | null = null;
  let dbError: string | null = null;

  try {
    const [projects, leads, sessions] = await Promise.all([
      prisma.project.count(),
      prisma.lead.count(),
      prisma.visitorSession.count(),
    ]);
    stats = { projects, leads, sessions };

    recentLeads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: {
        id: true,
        name: true,
        email: true,
        projectType: true,
        priority: true,
        createdAt: true,
      },
    });
  } catch (err: any) {
    console.error('Dashboard DB error:', err);
    dbError =
      'Não foi possível acessar o banco agora. Verifique a conexão com o Supabase/Postgres.';
  }

  return (
    <>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 32,
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
                Dashboard
              </h1>
              <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
                Visão geral de projetos, leads e sessões.
              </p>
            </div>
          </header>

          {dbError && (
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
              {dbError}
            </div>
          )}

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginBottom: 32,
            }}
          >
            <StatCard label="Projetos" value={stats.projects} />
            <StatCard label="Leads" value={stats.leads} />
            <StatCard label="Sessões" value={stats.sessions} />
          </section>

          <section
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
              Leads recentes
            </h2>
            {!recentLeads && !dbError && (
              <EmptyState
                title="Carregando..."
                description="Buscando leads recentes..."
                icon="⏳"
              />
            )}
            {recentLeads && recentLeads.length === 0 && (
              <EmptyState
                title="Nenhum lead ainda"
                description="Quando você receber leads através do formulário de contato, eles aparecerão aqui."
                icon="📬"
              />
            )}
            {recentLeads && recentLeads.length > 0 && (
              <div style={{ display: 'grid', gap: 12 }}>
                {recentLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            )}
          </section>
    </>
  );
}



