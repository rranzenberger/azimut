import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { ProjectCard } from './components/ProjectCard';
import { NewProjectButton } from './components/NewProjectButton';

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
      take: 100,
    });
  } catch (err: any) {
    console.error('Projects fetch error:', err);
    error = 'Erro ao carregar projetos. Verifique a conexão com o banco.';
  }

  // Separar projetos da Home dos demais
  const homeProjects = projects.filter((p: any) => p.priorityHome > 0).sort((a: any, b: any) => a.priorityHome - b.priorityHome);
  const otherProjects = projects.filter((p: any) => !p.priorityHome || p.priorityHome <= 0);

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
            Gerencie projetos e cases do portfólio. Cada card aqui corresponde a um projeto no site.
          </p>
        </div>
        <NewProjectButton />
      </header>

      {/* Referência visual: como aparece no site */}
      <div style={{
        marginBottom: 24,
        padding: '16px 20px',
        borderRadius: 12,
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'rgba(56, 189, 248, 0.04)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        fontSize: 13,
        color: '#94a3b8',
      }}>
        <span style={{ fontWeight: 600, color: '#7dd3fc' }}>🗺️ Onde aparece no site:</span>
        <span>🏠 <strong>Home</strong> — projetos com prioridade &gt; 0 (cards em destaque)</span>
        <span>📁 <strong>/work</strong> — todos os projetos publicados</span>
        <span>📸 <strong>Imagem de capa</strong> — defina em cada projeto (Mídia Principal)</span>
      </div>

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

      {/* ═══ PROJETOS NA HOME ═══ */}
      {homeProjects.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
              🏠 Projetos na Home
            </h2>
            <span style={{
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 999,
              background: 'rgba(201,35,55,0.15)',
              color: '#fca5a5',
              border: '1px solid rgba(201,35,55,0.3)',
              fontWeight: 600,
            }}>
              {homeProjects.length} projeto{homeProjects.length > 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: 12, color: '#6b6780' }}>
              — Estes cards aparecem na seção &quot;Projetos em Destaque&quot; da Home
            </span>
          </div>
          <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            {homeProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* ═══ DEMAIS PROJETOS ═══ */}
      {otherProjects.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
              📁 Demais projetos
            </h2>
            <span style={{
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              color: '#9f9bb0',
              border: '1px solid rgba(255,255,255,0.12)',
              fontWeight: 600,
            }}>
              {otherProjects.length} projeto{otherProjects.length > 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: 12, color: '#6b6780' }}>
              — Aparecem em /work (portfólio)
            </span>
          </div>
          <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            {otherProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

