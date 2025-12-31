import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ServiceEditForm } from '../components/ServiceEditForm';

export const revalidate = 0;

export default async function ServiceDetailPage({
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

  let service: any = null;
  let error: string | null = null;

  try {
    service = await prisma.service.findUnique({
      where: { id: params.id },
      include: {
        projects: {
          select: {
            id: true,
            slug: true,
            title: true,
            status: true,
          },
        },
      },
    });

    if (!service) {
      error = 'Serviço não encontrado';
    }
  } catch (err: any) {
    console.error('Service fetch error:', err);
    error = 'Erro ao carregar serviço. Verifique a conexão com o banco.';
  }

  if (error || !service) {
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
            <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
              Serviço não encontrado
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
      <ServiceEditForm service={service} />
    </div>
  );
}

