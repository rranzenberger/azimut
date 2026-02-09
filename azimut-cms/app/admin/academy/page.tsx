import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { AcademyHubClient } from './AcademyHubClient';

export const revalidate = 0;

/**
 * Hub visual da Academy — cards como na Home backoffice.
 * Lista páginas academy + academy/* com preview, Trocar imagem e EDITAR.
 */
export default async function AcademyHubPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let pages: any[] = [];
  let error: string | null = null;

  try {
    pages = await prisma.page.findMany({
      where: {
        OR: [
          { slug: 'academy' },
          { slug: { startsWith: 'academy/' } },
        ],
      },
      orderBy: { slug: 'asc' },
      include: {
        heroBackgroundImage: true,
      },
      take: 50,
    });
  } catch (err: any) {
    console.error('Academy pages fetch error:', err);
    error = 'Erro ao carregar páginas da Academy. Verifique a conexão com o banco.';
  }

  const serialized = JSON.parse(JSON.stringify(pages));

  return <AcademyHubClient pages={serialized} error={error} />;
}
