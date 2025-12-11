import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

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
    <main
      style={{
        minHeight: '100vh',
        background: '#0a0e18',
        color: '#d3cec3',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: 0,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
        <aside
          style={{
            borderRight: '1px solid rgba(255,255,255,0.08)',
            padding: '28px 18px',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Azimut CMS</div>
            <div style={{ color: '#c0bccf', fontSize: 13, marginTop: 4 }}>
              {session.email} ({session.role})
            </div>
          </div>

          <nav style={{ display: 'grid', gap: 8 }}>
            <LinkItem href="/admin" label="Dashboard" active />
            <LinkItem href="/admin/media" label="Mídias" />
            <LinkItem href="#" label="Projetos (em breve)" />
            <LinkItem href="#" label="Leads (em breve)" />
            <LinkItem href="#" label="Páginas (em breve)" />
            <LinkItem href="#" label="Serviços (em breve)" />
            <LinkItem href="#" label="Configurações (em breve)" />
          </nav>

          <form action="/api/admin/logout" method="POST" style={{ marginTop: 18 }}>
            <button
              type="submit"
              style={{
                width: '100%',
                height: 38,
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Sair
            </button>
          </form>
        </aside>

        <div style={{ padding: '28px 24px', maxWidth: 1200, width: '100%' }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: 26 }}>Dashboard</h1>
              <p style={{ margin: 4, color: '#c0bccf' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 24,
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
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h2 style={{ margin: '0 0 12px', fontSize: 18 }}>Leads recentes</h2>
            {!recentLeads && !dbError && (
              <p style={{ margin: 0, color: '#9f9bb0' }}>Carregando...</p>
            )}
            {recentLeads && recentLeads.length === 0 && (
              <p style={{ margin: 0, color: '#9f9bb0' }}>Nenhum lead ainda.</p>
            )}
            {recentLeads && recentLeads.length > 0 && (
              <div style={{ display: 'grid', gap: 10 }}>
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    style={{
                      padding: '12px 12px',
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>{lead.name}</strong>
                        <div style={{ color: '#b5b1c6', fontSize: 13 }}>{lead.email}</div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          padding: '4px 8px',
                          borderRadius: 999,
                          background: 'rgba(201,35,55,0.15)',
                          color: '#fca5a5',
                          border: '1px solid rgba(201,35,55,0.35)',
                          height: 'fit-content',
                        }}
                      >
                        {lead.priority}
                      </span>
                    </div>
                    <div style={{ marginTop: 6, color: '#d3cec3', fontSize: 13 }}>
                      {lead.projectType || '—'}
                    </div>
                    <div style={{ marginTop: 4, color: '#8f8ba2', fontSize: 12 }}>
                      {new Date(lead.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      }}
    >
      <div style={{ color: '#c0bccf', fontSize: 14, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function LinkItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        padding: '10px 12px',
        borderRadius: 10,
        background: active ? 'rgba(201,35,55,0.12)' : 'rgba(255,255,255,0.03)',
        border: active
          ? '1px solid rgba(201,35,55,0.35)'
          : '1px solid rgba(255,255,255,0.06)',
        color: '#e8e6f2',
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {label}
    </Link>
  );
}

