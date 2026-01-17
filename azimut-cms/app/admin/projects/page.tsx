import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { ProjectCard } from './components/ProjectCard';
import { NewProjectButton } from './components/NewProjectButton';

export const revalidate = 0;

export default async function ProjectsPage() {
  const cookieStore = cookies();
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
      take: 100,
    });
  } catch (err: any) {
    console.error('Projects fetch error:', err);
    error = 'Erro ao carregar projetos. Verifique a conexão com o banco.';
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
            Projetos
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie projetos e cases do portfólio.
          </p>
        </div>
        <NewProjectButton />
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

      {projects.length === 0 && !error && (
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
          <p style={{ margin: 0, fontSize: 16 }}>Nenhum projeto ainda.</p>
          <Link
            href="/admin/projects/new"
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
            Criar primeiro projeto
          </Link>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ display: 'grid', gap: 20, width: '100%', boxSizing: 'border-box' }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

