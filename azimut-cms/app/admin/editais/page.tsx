import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { EditaisTableClient } from './components/EditaisTableClient';

export const revalidate = 0;

export default async function EditaisPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let editais: any[] = [];
  let error: string | null = null;

  try {
    editais = await prisma.edital.findMany({
      orderBy: [
        { status: 'asc' },
        { deadline: 'asc' },
        { createdAt: 'desc' },
      ],
      take: 200,
    });
  } catch (err: any) {
    console.error('Editais fetch error:', err);
    error = 'Erro ao carregar editais. Verifique a conexão com o banco.';
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
            Editais / Oportunidades Ativas
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Cadastre e atualize editais. Eles aparecem na seção &quot;Oportunidades Ativas&quot; na página Projetos do site (apenas status Aberto).
          </p>
        </div>
        <Link
          href="/admin/editais/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 10,
            background: '#c92337',
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          + Novo edital
        </Link>
      </header>

      <div
        style={{
          marginBottom: 24,
          padding: '14px 18px',
          borderRadius: 12,
          border: '1px solid rgba(56, 189, 248, 0.25)',
          background: 'rgba(56, 189, 248, 0.04)',
          fontSize: 13,
          color: '#94a3b8',
        }}
      >
        <span style={{ fontWeight: 600, color: '#7dd3fc' }}>Onde aparece no site:</span>
        <span style={{ marginLeft: 8 }}>Página <strong>Projetos</strong> (/work) — seção &quot;Oportunidades Ativas&quot;. Só editais com status <strong>Aberto</strong> são exibidos.</span>
      </div>

      {error && (
        <div
          style={{
            padding: 16,
            backgroundColor: 'rgba(201,35,55,0.15)',
            color: '#fca5a5',
            borderRadius: 10,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {editais.length === 0 && !error && (
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
            Nenhum edital cadastrado ainda.
          </p>
          <Link
            href="/admin/editais/new"
            style={{
              display: 'inline-block',
              marginTop: 16,
              padding: '10px 18px',
              borderRadius: 10,
              background: '#c92337',
              color: '#fff',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Criar primeiro edital
          </Link>
        </div>
      )}

      {editais.length > 0 && (
        <EditaisTableClient
          editais={editais.map((e) => ({
            id: e.id,
            name: e.name,
            sourceUrl: e.sourceUrl,
            country: e.country,
            deadline: e.deadline,
            status: e.status,
            area: e.area ?? '',
          }))}
        />
      )}
    </div>
  );
}
