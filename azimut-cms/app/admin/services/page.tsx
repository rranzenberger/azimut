import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { ServicesList } from './components/ServicesList';
import { NewServiceButton } from './components/NewServiceButton';

export const revalidate = 0;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  const status = searchParams.status as string | undefined;

  let services: any[] = [];
  let error: string | null = null;

  try {
    const where: any = {};
    if (status && ['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
      where.status = status;
    }

    services = await prisma.service.findMany({
      where,
      orderBy: { priority: 'desc' },
      include: {
        projects: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
          take: 3,
        },
      },
    });
  } catch (err: any) {
    console.error('Services fetch error:', err);
    error = 'Erro ao carregar serviços. Verifique a conexão com o banco.';
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
            Serviços
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie os serviços oferecidos pela Azimut.
          </p>
        </div>
        <NewServiceButton />
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

      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Link
          href="/admin/services"
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: !status ? 'rgba(201,35,55,0.15)' : 'rgba(255,255,255,0.05)',
            color: !status ? '#fca5a5' : '#fff',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: !status ? 600 : 400,
          }}
        >
          Todos
        </Link>
        <Link
          href="/admin/services?status=PUBLISHED"
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: status === 'PUBLISHED' ? 'rgba(201,35,55,0.15)' : 'rgba(255,255,255,0.05)',
            color: status === 'PUBLISHED' ? '#fca5a5' : '#fff',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: status === 'PUBLISHED' ? 600 : 400,
          }}
        >
          Publicados
        </Link>
        <Link
          href="/admin/services?status=DRAFT"
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: status === 'DRAFT' ? 'rgba(201,35,55,0.15)' : 'rgba(255,255,255,0.05)',
            color: status === 'DRAFT' ? '#fca5a5' : '#fff',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: status === 'DRAFT' ? 600 : 400,
          }}
        >
          Rascunhos
        </Link>
        <Link
          href="/admin/services?status=ARCHIVED"
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: status === 'ARCHIVED' ? 'rgba(201,35,55,0.15)' : 'rgba(255,255,255,0.05)',
            color: status === 'ARCHIVED' ? '#fca5a5' : '#fff',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: status === 'ARCHIVED' ? 600 : 400,
          }}
        >
          Arquivados
        </Link>
      </div>

      {services.length === 0 && !error && (
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
          <p style={{ margin: 0, fontSize: 16 }}>Nenhum serviço ainda.</p>
          <Link
            href="/admin/services/new"
            style={{
              display: 'inline-block',
              marginTop: 12,
              padding: '10px 16px',
              borderRadius: 10,
              background: '#c92337',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Criar primeiro serviço
          </Link>
        </div>
      )}

      {services.length > 0 && <ServicesList services={services} />}
    </div>
  );
}

