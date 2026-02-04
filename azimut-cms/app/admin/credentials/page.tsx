import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { HoverCard, HoverButton } from '../components/HoverCard';

export const revalidate = 0;

export default async function CredentialsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let credentials: any[] = [];
  let error: string | null = null;

  try {
    credentials = await prisma.credentials.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'asc' },
      ],
    });
  } catch (err: any) {
    console.error('Credentials fetch error:', err);
    error = 'Erro ao carregar credenciais. Verifique a conexão com o banco.';
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
            Credenciais
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie as credenciais exibidas na página Studio.
          </p>
        </div>
        <HoverButton href="/admin/credentials/new">
          + Nova Credencial
        </HoverButton>
      </header>

      {error && (
        <div
          style={{
            padding: 16,
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {credentials.length === 0 ? (
        <div
          style={{
            padding: 48,
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Nenhuma credencial cadastrada ainda.
          </p>
          <div style={{ marginTop: 16 }}>
            <HoverButton href="/admin/credentials/new">
              Criar primeira credencial
            </HoverButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
          }}
        >
          {credentials.map((cred) => (
            <HoverCard key={cred.id} href={`/admin/credentials/${cred.id}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                {cred.icon && (
                  <span style={{ fontSize: 24 }}>{cred.icon}</span>
                )}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {cred.textPt}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: cred.isPublished ? '#10b981' : '#6b7280',
                    fontWeight: 500,
                  }}
                >
                  {cred.isPublished ? 'Publicado' : 'Rascunho'}
                </span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                  Ordem: {cred.order}
                </span>
              </div>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  );
}
