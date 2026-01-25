import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function CredentialsPage() {
  const cookieStore = cookies();
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
        <Link
          href="/admin/credentials/new"
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 14,
            display: 'inline-block',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
          }}
        >
          + Nova Credencial
        </Link>
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
          <Link
            href="/admin/credentials/new"
            style={{
              display: 'inline-block',
              marginTop: 16,
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Criar primeira credencial
          </Link>
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
            <Link
              key={cred.id}
              href={`/admin/credentials/${cred.id}`}
              style={{
                padding: 20,
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
