import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { MarketEditForm } from '../components/MarketEditForm';

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let market = null;
  let error: string | null = null;

  try {
    market = await prisma.market.findUnique({
      where: { id },
    });

    if (!market) {
      error = 'Mercado não encontrado';
    }
  } catch (err: any) {
    console.error('Market fetch error:', err);
    error = 'Erro ao carregar mercado';
  }

  if (error || !market) {
    return (
      <div>
        <p style={{ color: '#fca5a5' }}>{error || 'Mercado não encontrado'}</p>
      </div>
    );
  }

  return <MarketEditForm market={market} />;
}
