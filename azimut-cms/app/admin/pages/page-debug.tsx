/**
 * Página de Gerenciamento de Páginas (VERSÃO SIMPLIFICADA PARA DEBUG)
 * Lista todas as páginas do site com opção de edição
 * Atualizado: 2025-12-27 - Debug version
 */

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
    // Query simples primeiro
    pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    
    console.log(`✅ Páginas carregadas: ${pages.length}`);
  } catch (err: any) {
    console.error('Pages fetch error:', err);
    error = `Erro ao carregar páginas: ${err.message}`;
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>Páginas</h1>
      <p style={{ color: '#c0bccf' }}>Debug version - simplified</p>

      {error && (
        <div style={{ padding: 12, borderRadius: 10, background: 'rgba(201,35,55,0.12)', color: '#fca5a5', marginTop: 16 }}>
          {error}
        </div>
      )}

      {pages.length === 0 && !error && (
        <p style={{ color: '#c0bccf', marginTop: 20 }}>Nenhuma página encontrada.</p>
      )}

      {pages.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#86efac' }}>✅ {pages.length} páginas encontradas!</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {pages.map((page) => (
              <div
                key={page.id}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>{page.name}</h3>
                <p style={{ margin: 0, color: '#c0bccf', fontSize: 14, marginTop: 4 }}>/{page.slug}</p>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: 12, marginTop: 8 }}>
                  Status: {page.status} | ID: {page.id.substring(0, 8)}...
                </p>
                <Link
                  href={`/admin/pages/${page.slug}/edit`}
                  style={{ color: '#c92337', fontSize: 14, marginTop: 8, display: 'inline-block' }}
                >
                  → Editar
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

