import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function PagesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let pages: any[] = [];
  let error: string | null = null;

  try {
    pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      take: 100,
    });
  } catch (err: any) {
    console.error('Pages fetch error:', err);
    error = 'Erro ao carregar páginas. Verifique a conexão com o banco.';
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
            Páginas
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie páginas do site, incluindo SEO e slogans do hero.
          </p>
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

      {pages.length === 0 && !error && (
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
          <p style={{ margin: 0, fontSize: 16 }}>Nenhuma página encontrada.</p>
        </div>
      )}

      {pages.length > 0 && (
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}
        >
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/admin/pages/${page.slug}/edit`}
              style={{
                display: 'block',
                padding: 20,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 4,
                    color: '#fff',
                  }}
                >
                  {page.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: '#c0bccf',
                    fontFamily: 'monospace',
                  }}
                >
                  /{page.slug}
                </p>
              </div>

              {page.heroSloganPt && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ margin: 0, fontSize: 12, color: '#a0a0a0', marginBottom: 4 }}>
                    Slogan Hero (PT):
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: '#fff', fontStyle: 'italic' }}>
                    {page.heroSloganPt}
                  </p>
                </div>
      )}

              <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 500,
                    background:
                      page.status === 'PUBLISHED'
                        ? 'rgba(34,197,94,0.15)'
                        : page.status === 'DRAFT'
                        ? 'rgba(251,191,36,0.15)'
                        : 'rgba(107,114,128,0.15)',
                    color:
                      page.status === 'PUBLISHED'
                        ? '#86efac'
                        : page.status === 'DRAFT'
                        ? '#fde047'
                        : '#9ca3af',
                  }}
                >
                  {page.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
