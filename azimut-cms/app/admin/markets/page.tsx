import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { HoverCard, HoverButton } from '../components/HoverCard';

export default async function MarketsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let markets: any[] = [];
  let error: string | null = null;

  try {
    markets = await prisma.market.findMany({
      orderBy: [
        { priority: 'asc' },
        { labelPt: 'asc' },
      ],
    });
  } catch (err: any) {
    console.error('Markets fetch error:', err);
    error = 'Erro ao carregar mercados. Verifique a conexão com o banco.';
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
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0, fontSize: 32, marginBottom: 8, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Mercados
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie os mercados exibidos no card "Retrato do Estúdio" da Home.
          </p>
        </div>
        <HoverButton href="/admin/markets/new">
          + Novo Mercado
        </HoverButton>
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

      {markets.length === 0 ? (
        <div
          style={{
            padding: '48px 24px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            textAlign: 'center',
            color: '#9f9bb0',
          }}
        >
          <p style={{ margin: 0, fontSize: 16 }}>Nenhum mercado cadastrado ainda.</p>
          <div style={{ marginTop: 16 }}>
            <HoverButton href="/admin/markets/new">
              Criar Primeiro Mercado
            </HoverButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: 12,
          }}
        >
          {markets.map((market) => (
            <HoverCard key={market.id} href={`/admin/markets/${market.id}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                      {market.labelPt}
                    </h3>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: 'rgba(201,35,55,0.2)',
                        color: '#fca5a5',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Prioridade: {market.priority}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 8 }}>
                    <div>
                      <small style={{ color: '#9f9bb0', fontSize: 11, textTransform: 'uppercase' }}>EN</small>
                      <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#c0bccf' }}>{market.labelEn}</p>
                    </div>
                    {market.labelEs && (
                      <div>
                        <small style={{ color: '#9f9bb0', fontSize: 11, textTransform: 'uppercase' }}>ES</small>
                        <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#c0bccf' }}>{market.labelEs}</p>
                      </div>
                    )}
                    {market.labelFr && (
                      <div>
                        <small style={{ color: '#9f9bb0', fontSize: 11, textTransform: 'uppercase' }}>FR</small>
                        <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#c0bccf' }}>{market.labelFr}</p>
                      </div>
                    )}
                  </div>
                  <p style={{ margin: '8px 0 0 0', fontSize: 12, color: '#9f9bb0', fontFamily: 'monospace' }}>
                    Code: {market.code}
                  </p>
                </div>
              </div>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  );
}
