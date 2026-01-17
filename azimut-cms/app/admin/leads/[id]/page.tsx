import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { LeadDetails } from '../components/LeadDetails';
import { LeadEditForm } from '../components/LeadEditForm';
import { AIInsightsPanel } from '../components/AIInsightsPanel';

export const revalidate = 0;

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let lead: any = null;
  let users: any[] = [];
  let error: string | null = null;

  try {
    // Buscar lista de usuários para o dropdown de responsável
    users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
      orderBy: { email: 'asc' },
    });

    lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        sessions: {
          orderBy: { createdAt: 'desc' },
          include: {
            pageViews: {
              take: 20,
              orderBy: { viewedAt: 'desc' },
              include: {
                project: {
                  select: {
                    id: true,
                    slug: true,
                    title: true,
                  },
                },
              },
            },
            interestScore: true,
          },
        },
        editalLeads: {
          include: {
            edital: {
              select: {
                id: true,
                name: true,
                source: true,
                sourceUrl: true,
                deadline: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!lead) {
      error = 'Lead não encontrado';
    }
  } catch (err: any) {
    console.error('Lead fetch error:', err);
    error = 'Erro ao carregar lead. Verifique a conexão com o banco.';
  }

  if (error || !lead) {
    return (
      <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 24,
          }}
        >
          <div>
            <Link
              href="/admin/leads"
              style={{
                color: '#9f9bb0',
                textDecoration: 'none',
                fontSize: 14,
                marginBottom: 8,
                display: 'inline-block',
              }}
            >
              ← Voltar para Leads
            </Link>
            <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
              Lead não encontrado
            </h1>
          </div>
        </header>
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(201,35,55,0.35)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
          }}
        >
          {error}
        </div>
      </div>
    );
  }

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
        <div style={{ flex: 1 }}>
          <Link
            href="/admin/leads"
            style={{
              color: '#9f9bb0',
              textDecoration: 'none',
              fontSize: 14,
              marginBottom: 8,
              display: 'inline-block',
            }}
          >
            ← Voltar para Leads
          </Link>
          <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
            {lead.name}
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Detalhes e histórico do lead
          </p>
        </div>
      </header>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 400px' }}>
        <div>
          <LeadDetails lead={lead} />
          <AIInsightsPanel
            leadId={lead.id}
            leadScore={lead.leadScore}
            conversionScore={lead.sessions?.[0]?.interestScore?.conversionScore || null}
          />
        </div>
        <div>
          <LeadEditForm lead={lead} users={users} />
        </div>
      </div>
    </div>
  );
}

