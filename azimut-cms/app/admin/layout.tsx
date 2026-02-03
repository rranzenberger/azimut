import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { AdminLogo } from './components/Logo';
import { AdminLink } from './components/AdminLink';
import { MonitorLink } from './components/MonitorLink';
import { MENU_MANUAL_ITEMS } from './config/menuManual';

const TOOLTIP_BY_HREF: Record<string, string> = Object.fromEntries(
  MENU_MANUAL_ITEMS.map((i) => [i.href, i.tooltip])
);
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
          <AdminLink href="/admin" label="🏠 Dashboard" title={TOOLTIP_BY_HREF['/admin']} />
          <AdminLink href="/admin/help" label="📖 Manual" title={TOOLTIP_BY_HREF['/admin/help']} />
          <AdminLink href="/admin/analytics" label="📊 Analytics IA" title={TOOLTIP_BY_HREF['/admin/analytics']} />
          <AdminLink href="/admin/projects" label="🎥 Projetos" title={TOOLTIP_BY_HREF['/admin/projects']} />
          <AdminLink href="/admin/blog" label="📝 Blog" title={TOOLTIP_BY_HREF['/admin/blog']} />
          <MonitorLink />
          <AdminLink href="/admin/making-of" label="🎬 Making-of" title={TOOLTIP_BY_HREF['/admin/making-of']} />
          <AdminLink href="/admin/making-of/curation" label="🎨 Curadoria" title={TOOLTIP_BY_HREF['/admin/making-of/curation']} />
          <AdminLink href="/admin/site-pages" label="📄 Páginas" title={TOOLTIP_BY_HREF['/admin/site-pages']} />
          <AdminLink href="/admin/media" label="🖼️ Mídias" title={TOOLTIP_BY_HREF['/admin/media']} />
          <AdminLink href="/admin/leads" label="👥 Leads" title={TOOLTIP_BY_HREF['/admin/leads']} />
          <AdminLink href="/admin/leads/game" label="🎮 Leads do Jogo" title={TOOLTIP_BY_HREF['/admin/leads/game']} />
          <AdminLink href="/admin/leads/dashboard" label="🎯 Dashboard Leads IA" title={TOOLTIP_BY_HREF['/admin/leads/dashboard']} />
          <AdminLink href="/admin/tools" label="🛠️ Ferramentas" title={TOOLTIP_BY_HREF['/admin/tools']} />
          <AdminLink href="/admin/roadmap" label="🗺️ Roadmap" title={TOOLTIP_BY_HREF['/admin/roadmap']} />
          <AdminLink href="/admin/marketing/preview" label="🎁 Marketing Preview" title={TOOLTIP_BY_HREF['/admin/marketing/preview']} />
          <AdminLink href="/admin/web3/setup-wallet" label="🔐 Configurar Carteira" title={TOOLTIP_BY_HREF['/admin/web3/setup-wallet']} />
          <AdminLink href="/admin/web3/wallet-status" label="💰 Carteira Web3" title={TOOLTIP_BY_HREF['/admin/web3/wallet-status']} />
          <AdminLink href="/admin/web3/student-rewards" label="🎓 Recompensas Estudantes" title={TOOLTIP_BY_HREF['/admin/web3/student-rewards']} />
          <AdminLink href="/admin/newsletter" label="📨 Inscritos" title={TOOLTIP_BY_HREF['/admin/newsletter']} />
          <AdminLink href="/admin/n8n-workflow" label="🤖 Automação n8n" title={TOOLTIP_BY_HREF['/admin/n8n-workflow']} />
          <AdminLink href="/admin/services" label="⚡ Serviços" title={TOOLTIP_BY_HREF['/admin/services']} />
          <AdminLink href="/admin/markets" label="🏢 Mercados" title={TOOLTIP_BY_HREF['/admin/markets']} />
          <AdminLink href="/admin/history" label="📅 Timeline & Histórico" title={TOOLTIP_BY_HREF['/admin/history']} />
          <AdminLink href="/admin/team" label="👥 Equipe" title={TOOLTIP_BY_HREF['/admin/team']} />
          <AdminLink href="/admin/credentials" label="🏆 Credenciais" title={TOOLTIP_BY_HREF['/admin/credentials']} />
          <AdminLink href="/admin/press" label="📰 Imprensa" title={TOOLTIP_BY_HREF['/admin/press']} />
          <AdminLink href="/admin/publications" label="📚 Publicações (Research)" title={TOOLTIP_BY_HREF['/admin/publications']} />
          <AdminLink href="/admin/settings" label="⚙️ Configurações" title={TOOLTIP_BY_HREF['/admin/settings']} />
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


