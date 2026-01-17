import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminLogo } from './components/Logo';
import { AdminLink } from './components/AdminLink';
import { MonitorLink } from './components/MonitorLink';
import { LogoutButton } from './components/LogoutButton';
import { ViewSiteButton } from './components/ViewSiteButton';
import { ToastWrapper } from './components/ToastWrapper';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  // Buscar dados do usuário
  // Updated: Force rebuild to fix pages menu
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, role: true },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0e18',
        color: '#d3cec3',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'grid',
        gridTemplateColumns: '280px 1fr 320px', // Adiciona coluna para sidebar de mídia social
      }}
    >
      {/* Sidebar - Menu Lateral Sempre Visível */}
      <aside
        style={{
          borderRight: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Logo no Topo */}
        <div
          style={{
            padding: '20px 20px 16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            minHeight: 'auto',
            height: 'auto',
          }}
        >
          <AdminLogo />
        </div>

        {/* Informações do Usuário */}
        <div
          style={{
            padding: '20px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontSize: 14, color: '#c0bccf', marginBottom: 6, fontWeight: 500 }}>
            {user?.email || session.email}
          </div>
          <div style={{ fontSize: 13, color: '#8f8ba2', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {user?.role || session.role}
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav
          style={{
            flex: 1,
            padding: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <AdminLink href="/admin" label="Dashboard" />
          <AdminLink href="/admin/analytics" label="📊 Analytics IA" />
          <AdminLink href="/admin/projects" label="Projetos" />
          <AdminLink href="/admin/blog" label="📝 Blog" />
          <MonitorLink />
          <AdminLink href="/admin/making-of" label="🎬 Making-of" />
          <AdminLink href="/admin/making-of/curation" label="🎨 Curadoria" />
          <AdminLink href="/admin/site-pages" label="📄 Páginas" />
          <AdminLink href="/admin/media" label="Mídias" />
          <AdminLink href="/admin/leads" label="Leads" />
          <AdminLink href="/admin/services" label="Serviços" />
          <AdminLink href="/admin/settings" label="Configurações" />
        </nav>

        {/* Link para Site Principal */}
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <ViewSiteButton />
        </div>

        {/* Botão Sair */}
        <div
          style={{
            padding: '0 20px 20px 20px',
          }}
        >
          <LogoutButton />
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main
        style={{
          padding: '32px 40px',
          maxWidth: 1600,
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <ToastWrapper>
          <KeyboardShortcuts />
          <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            {children}
          </div>
        </ToastWrapper>
      </main>
    </div>
  );
}


