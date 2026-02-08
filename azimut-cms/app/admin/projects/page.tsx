import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { ProjectsListClient } from './components/ProjectsListClient';

export const revalidate = 0;

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let projects: any[] = [];
  let error: string | null = null;

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        heroImage: true,
        market: true,
        tags: true,
        services: true,
      },
      take: 500,
    });
  } catch (err: any) {
    console.error('Projects fetch error:', err);
    error = 'Erro ao carregar projetos. Verifique a conexão com o banco.';
  }

  // Serializar para o client component (Dates → string)
  const serialized = JSON.parse(JSON.stringify(projects));

  return <ProjectsListClient projects={serialized} error={error} />;
}

