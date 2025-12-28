import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminLogo } from './components/Logo';
import { AdminLink } from './components/AdminLink';
import { LogoutButton } from './components/LogoutButton';
import { ViewSiteButton } from './components/ViewSiteButton';

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
        gridTemplateColumns: '280px 1fr',
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
          <AdminLink href="/admin/projects" label="Projetos" />
          <AdminLink href="/admin/site-pages" label="Páginas" />
          <AdminLink href="/admin/media" label="Mídias" />
          <div
            style={{
              color: '#8f8ba2',
              fontSize: 12,
              padding: '12px 12px',
              marginTop: 12,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: 20,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Em breve:
          </div>
          <AdminLink href="#" label="Leads" disabled />
          <AdminLink href="#" label="Serviços" disabled />
          <AdminLink href="#" label="Configurações" disabled />
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
        <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          {children}
        </div>
      </main>
    </div>
  );
}


