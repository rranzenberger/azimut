import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { HoverCard, HoverButton } from '../components/HoverCard';

export const revalidate = 0;

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  const params = await searchParams;
  const type = params.type as string | undefined;

  let history: any[] = [];
  let error: string | null = null;

  try {
    const where: any = {};
    if (type && ['milestone', 'partnership', 'project', 'award', 'location', 'other'].includes(type)) {
      where.type = type;
    }

    history = await prisma.companyHistory.findMany({
      where,
      orderBy: [
        { year: 'desc' },
        { displayOrder: 'asc' },
      ],
    });
  } catch (err: any) {
    console.error('History fetch error:', err);
    error = 'Erro ao carregar histórico. Verifique a conexão com o banco.';
  }

  const typeLabels: Record<string, string> = {
    milestone: 'Marco',
    partnership: 'Parceria',
    project: 'Projeto',
    award: 'Prêmio',
    location: 'Localização',
    other: 'Outro',
  };

  const typeColors: Record<string, string> = {
    milestone: '#3b82f6',
    partnership: '#10b981',
    project: '#f59e0b',
    award: '#ef4444',
    location: '#8b5cf6',
    other: '#6b7280',
  };

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
            Timeline & Histórico
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie eventos históricos, parcerias, projetos e prêmios. Estes dados aparecem na timeline da página Estúdio do site.
          </p>
        </div>
        <HoverButton href="/admin/history/new">
          + Novo Evento
        </HoverButton>
      </header>

      {/* Filtros */}
      <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link
          href="/admin/history"
          style={{
            padding: '8px 16px',
            backgroundColor: !type ? '#ef4444' : '#2a2a3a',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: !type ? 600 : 400,
          }}
        >
          Todos
        </Link>
        {Object.entries(typeLabels).map(([key, label]) => (
          <Link
            key={key}
            href={`/admin/history?type=${key}`}
            style={{
              padding: '8px 16px',
              backgroundColor: type === key ? '#ef4444' : '#2a2a3a',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: type === key ? 600 : 400,
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: 6,
            marginBottom: 24,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <div
          style={{
            padding: 48,
            textAlign: 'center',
            backgroundColor: '#1a1a2e',
            borderRadius: 8,
            border: '1px solid #2a2a3a',
          }}
        >
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            {type ? `Nenhum evento do tipo "${typeLabels[type]}" encontrado.` : 'Nenhum evento encontrado.'}
          </p>
          <div style={{ marginTop: 16 }}>
            <HoverButton href="/admin/history/new">
              Criar Primeiro Evento
            </HoverButton>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {history.map((item) => {
            const period = item.yearEnd ? `${item.year}-${item.yearEnd}` : `${item.year}`;
            return (
              <HoverCard key={item.id} href={`/admin/history/${item.id}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          backgroundColor: typeColors[item.type] || '#6b7280',
                          color: 'white',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {typeLabels[item.type] || 'Outro'}
                      </span>
                      {item.isFeatured && (
                        <span
                          style={{
                            padding: '4px 12px',
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          DESTAQUE
                        </span>
                      )}
                      {!item.isPublished && (
                        <span
                          style={{
                            padding: '4px 12px',
                            backgroundColor: '#6b7280',
                            color: 'white',
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          RASCUNHO
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 600, color: 'white' }}>
                      {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
                      {item.titlePt}
                    </h3>
                    <p style={{ margin: '0 0 8px 0', color: '#c0bccf', fontSize: 14 }}>
                      {item.descriptionPt || 'Sem descrição'}
                    </p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#9ca3af' }}>
                      <span>
                        <strong>Ano:</strong> {period}
                      </span>
                      {item.displayOrder !== 0 && (
                        <span>
                          <strong>Ordem:</strong> {item.displayOrder}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </HoverCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
