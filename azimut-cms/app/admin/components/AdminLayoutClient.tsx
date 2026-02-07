'use client';

import { AdminLogo } from './Logo';
import { AdminLink } from './AdminLink';
import { MonitorLink } from './MonitorLink';
import { LogoutButton } from './LogoutButton';
import { ViewSiteButton } from './ViewSiteButton';
import { ToastWrapper } from './ToastWrapper';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { MENU_MANUAL_ITEMS } from '../config/menuManual';
import { AZIMUT } from '../theme';

const TOOLTIP_BY_HREF: Record<string, string> = Object.fromEntries(
  MENU_MANUAL_ITEMS.map((i) => [i.href, i.tooltip])
);

interface AdminLayoutClientProps {
  children: React.ReactNode;
  userData: {
    email: string;
    role: string;
  };
}

export function AdminLayoutClient({ children, userData }: AdminLayoutClientProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: AZIMUT.bgDark,
        color: AZIMUT.text,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
      }}
    >
      {/* Sidebar — visual alinhado ao site Azimut */}
      <aside
        style={{
          borderRight: `1px solid ${AZIMUT.border}`,
          background: AZIMUT.bgCard,
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
            borderBottom: `1px solid ${AZIMUT.border}`,
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
            borderBottom: `1px solid ${AZIMUT.border}`,
          }}
        >
          <div style={{ fontSize: 14, color: AZIMUT.textSecondary, marginBottom: 6, fontWeight: 500 }}>
            {userData.email}
          </div>
          <div style={{ fontSize: 13, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {userData.role}
          </div>
        </div>

        {/* Guia rápido — atalhos para quem quer só atualizar conteúdo */}
        <div
          style={{
            padding: '12px 16px',
            margin: '0 12px 12px',
            borderRadius: 10,
            background: AZIMUT.accentBg,
            border: `1px solid ${AZIMUT.accentBorder}`,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: AZIMUT.accentText, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
            Guia rápido
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AdminLink href="/admin/pages/edit/home" label="✏️ Atualizar Home" title="Textos, vídeo e capa do topo da Home" />
            <AdminLink href="/admin/projects" label="🖼️ Projetos e imagens" title="Imagens dos cards da Home e da página Projetos" />
            <AdminLink href="/admin/media" label="📤 Mídias (upload)" title="Enviar imagens e vídeos; depois use em Páginas e Projetos" />
            <AdminLink href="/admin/help" label="📖 Manual" title="Onde está cada coisa e como usar" />
          </div>
        </div>

        {/* Menu de Navegação — por áreas */}
        <nav
          style={{
            flex: 1,
            padding: '0 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            overflowY: 'auto',
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 4, marginBottom: 2, paddingLeft: 4 }}>
            Conteúdo do site
          </div>
          <AdminLink href="/admin" label="🏠 Dashboard" title={TOOLTIP_BY_HREF['/admin']} />
          <AdminLink href="/admin/site-pages" label="📄 Páginas" title={TOOLTIP_BY_HREF['/admin/site-pages']} />
          <AdminLink href="/admin/projects" label="🎥 Projetos" title={TOOLTIP_BY_HREF['/admin/projects']} />
          <AdminLink href="/admin/blog" label="📝 Blog" title={TOOLTIP_BY_HREF['/admin/blog']} />
          <MonitorLink />
          <AdminLink href="/admin/making-of" label="🎬 Making-of" title={TOOLTIP_BY_HREF['/admin/making-of']} />
          <AdminLink href="/admin/making-of/curation" label="🎨 Curadoria" title={TOOLTIP_BY_HREF['/admin/making-of/curation']} />
          <AdminLink href="/admin/services" label="⚡ Serviços" title={TOOLTIP_BY_HREF['/admin/services']} />

          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 12, marginBottom: 2, paddingLeft: 4 }}>
            Mídia
          </div>
          <AdminLink href="/admin/media" label="🖼️ Mídias" title={TOOLTIP_BY_HREF['/admin/media']} />

          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 12, marginBottom: 2, paddingLeft: 4 }}>
            Leads e IA
          </div>
          <AdminLink href="/admin/analytics" label="📊 Analytics IA" title={TOOLTIP_BY_HREF['/admin/analytics']} />
          <AdminLink href="/admin/leads" label="👥 Leads" title={TOOLTIP_BY_HREF['/admin/leads']} />
          <AdminLink href="/admin/leads/game" label="🎮 Leads do Jogo" title={TOOLTIP_BY_HREF['/admin/leads/game']} />
          <AdminLink href="/admin/leads/dashboard" label="🎯 Dashboard Leads IA" title={TOOLTIP_BY_HREF['/admin/leads/dashboard']} />

          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 12, marginBottom: 2, paddingLeft: 4 }}>
            Ferramentas e config
          </div>
          <AdminLink href="/admin/tools" label="🛠️ Ferramentas" title={TOOLTIP_BY_HREF['/admin/tools']} />
          <AdminLink href="/admin/roadmap" label="🗺️ Roadmap" title={TOOLTIP_BY_HREF['/admin/roadmap']} />
          <AdminLink href="/admin/marketing/preview" label="🎁 Marketing Preview" title={TOOLTIP_BY_HREF['/admin/marketing/preview']} />
          <AdminLink href="/admin/n8n-workflow" label="🤖 Automação n8n" title={TOOLTIP_BY_HREF['/admin/n8n-workflow']} />
          <AdminLink href="/admin/newsletter" label="📨 Inscritos" title={TOOLTIP_BY_HREF['/admin/newsletter']} />
          <AdminLink href="/admin/editais" label="📋 Editais" title={TOOLTIP_BY_HREF['/admin/editais']} />

          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 12, marginBottom: 2, paddingLeft: 4 }}>
            Web3 e recompensas
          </div>
          <AdminLink href="/admin/web3/setup-wallet" label="🔐 Configurar Carteira" title={TOOLTIP_BY_HREF['/admin/web3/setup-wallet']} />
          <AdminLink href="/admin/web3/wallet-status" label="💰 Carteira Web3" title={TOOLTIP_BY_HREF['/admin/web3/wallet-status']} />
          <AdminLink href="/admin/web3/student-rewards" label="🎓 Recompensas Estudantes" title={TOOLTIP_BY_HREF['/admin/web3/student-rewards']} />

          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 12, marginBottom: 2, paddingLeft: 4 }}>
            Studio e institucional
          </div>
          <AdminLink href="/admin/markets" label="🏢 Mercados" title={TOOLTIP_BY_HREF['/admin/markets']} />
          <AdminLink href="/admin/history" label="📅 Timeline & Histórico" title={TOOLTIP_BY_HREF['/admin/history']} />
          <AdminLink href="/admin/team" label="👥 Equipe" title={TOOLTIP_BY_HREF['/admin/team']} />
          <AdminLink href="/admin/credentials" label="🏆 Credenciais" title={TOOLTIP_BY_HREF['/admin/credentials']} />
          <AdminLink href="/admin/press" label="📰 Imprensa" title={TOOLTIP_BY_HREF['/admin/press']} />
          <AdminLink href="/admin/publications" label="📚 Publicações (Research)" title={TOOLTIP_BY_HREF['/admin/publications']} />

          <div style={{ fontSize: 10, fontWeight: 600, color: AZIMUT.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 12, marginBottom: 2, paddingLeft: 4 }}>
            Sistema
          </div>
          <AdminLink href="/admin/settings" label="⚙️ Configurações" title={TOOLTIP_BY_HREF['/admin/settings']} />
        </nav>

        {/* Link para Site Principal */}
        <div
          style={{
            padding: '20px',
            borderTop: `1px solid ${AZIMUT.border}`,
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
