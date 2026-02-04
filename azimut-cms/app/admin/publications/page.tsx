import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'

export const revalidate = 0

export default async function PublicationsAdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('azimut_admin_token')?.value
  const session = token ? verifyAuthToken(token) : null
  if (!session) redirect('/login')

  let items: any[] = []
  let error: string | null = null
  try {
    items = await prisma.publication.findMany({
      orderBy: [{ displayOrder: 'asc' }, { year: 'desc' }]
    })
  } catch (e: any) {
    error = e?.message || 'Erro ao carregar publicações.'
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0, fontSize: 32, marginBottom: 8, fontWeight: 700 }}>Publicações (Research)</h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>Artigos e apresentações exibidos na página Research & Lab do site.</p>
        </div>
        <Link href="/admin/publications/new" style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', textDecoration: 'none', borderRadius: 6, fontWeight: 600, fontSize: 14, display: 'inline-block' }}>
          + Nova
        </Link>
      </header>

      {error && (
        <div style={{ padding: 16, backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 8, marginBottom: 24 }}>{error}</div>
      )}

      {items.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>Nenhuma publicação. Adicione a primeira.</p>
          <Link href="/admin/publications/new" style={{ display: 'inline-block', marginTop: 16, padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', textDecoration: 'none', borderRadius: 6, fontWeight: 600, fontSize: 14 }}>
            + Nova
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/publications/${item.id}`}
              style={{
                padding: 20,
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                {item.titlePt}
              </h3>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: item.isPublished ? '#10b981' : '#6b7280', fontWeight: 500 }}>{item.isPublished ? 'Publicado' : 'Rascunho'}</span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{item.year != null ? `Ano: ${item.year}` : `Ordem: ${item.displayOrder}`}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
