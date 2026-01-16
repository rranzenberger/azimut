import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function PagesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let pages: any[] = [];
  let error: string | null = null;
  
  // Tipo para páginas organizadas
  type PaginasOrganizadas = {
    home: any[];
    menuPrincipal: any[];
    estudio: { principal: any[]; sub: any[] };
    academy: { principal: any[]; sub: any[] };
    outros: any[];
  };
  
  let paginasOrganizadas: PaginasOrganizadas = { 
    home: [], 
    menuPrincipal: [], 
    estudio: { principal: [], sub: [] }, 
    academy: { principal: [], sub: [] }, 
    outros: [] 
  };

  try {
    pages = await prisma.page.findMany({
      orderBy: { name: 'asc' },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      take: 100,
    });
    
    // Reorganizar páginas por hierarquia (seguindo menu do site)
    const home = pages.filter(p => p.slug === 'home');
    const menuPrincipal = pages.filter(p => ['what', 'work'].includes(p.slug));
    const estudio = pages.filter(p => p.slug === 'studio');
    const estudioSub = pages.filter(p => p.slug.startsWith('studio/'));
    const academy = pages.filter(p => p.slug === 'academy');
    const academySub = pages.filter(p => p.slug.startsWith('academy/'));
    const outros = pages.filter(p => 
      p.slug !== 'home' && 
      !['what', 'work', 'studio', 'academy'].includes(p.slug) &&
      !p.slug.startsWith('studio/') &&
      !p.slug.startsWith('academy/')
    );
    
    paginasOrganizadas = {
      home,
      menuPrincipal,
      estudio: { principal: estudio, sub: estudioSub },
      academy: { principal: academy, sub: academySub },
      outros
    };
  } catch (err: any) {
    console.error('Pages fetch error:', err);
    error = 'Erro ao carregar páginas. Verifique a conexão com o banco.';
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
            Páginas
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie páginas do site, incluindo SEO e slogans do hero.
          </p>
        </div>
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

      {pages.length === 0 && !error && (
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
          <p style={{ margin: 0, fontSize: 16 }}>Nenhuma página encontrada.</p>
        </div>
      )}

      {pages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* 🏠 PRINCIPAL */}
          {paginasOrganizadas.home.length > 0 && (
            <section>
              <h2 style={{ 
                fontSize: 20, 
                fontWeight: 600, 
                marginBottom: 16, 
                color: '#e8e6f2',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                🏠 Principal
              </h2>
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {paginasOrganizadas.home.map((page) => (
                  <PageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}

          {/* 📋 MENU PRINCIPAL */}
          {paginasOrganizadas.menuPrincipal.length > 0 && (
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#e8e6f2', display: 'flex', alignItems: 'center', gap: 8 }}>
                📋 Menu Principal
              </h2>
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {paginasOrganizadas.menuPrincipal.map((page) => (
                  <PageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}

          {/* 🎨 ESTÚDIO */}
          {(paginasOrganizadas.estudio.principal.length > 0 || paginasOrganizadas.estudio.sub.length > 0) && (
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#e8e6f2', display: 'flex', alignItems: 'center', gap: 8 }}>
                🎨 Estúdio
              </h2>
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {paginasOrganizadas.estudio.principal.map((page) => (
                  <PageCard key={page.id} page={page} isPrincipal />
                ))}
                {paginasOrganizadas.estudio.sub.map((page) => (
                  <PageCard key={page.id} page={page} isSubpage />
                ))}
              </div>
            </section>
          )}

          {/* 🎓 ACADEMY */}
          {(paginasOrganizadas.academy.principal.length > 0 || paginasOrganizadas.academy.sub.length > 0) && (
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#e8e6f2', display: 'flex', alignItems: 'center', gap: 8 }}>
                🎓 Academy
              </h2>
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {paginasOrganizadas.academy.principal.map((page) => (
                  <PageCard key={page.id} page={page} isPrincipal />
                ))}
                {paginasOrganizadas.academy.sub.map((page) => (
                  <PageCard key={page.id} page={page} isSubpage />
                ))}
              </div>
            </section>
          )}

          {/* 📧 OUTROS */}
          {paginasOrganizadas.outros.length > 0 && (
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#e8e6f2', display: 'flex', alignItems: 'center', gap: 8 }}>
                📧 Outros
              </h2>
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {paginasOrganizadas.outros.map((page) => (
                  <PageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

// Componente PageCard (extraído para reutilização)
function PageCard({ page, isPrincipal = false, isSubpage = false }: { page: any; isPrincipal?: boolean; isSubpage?: boolean }) {
  return (
    <Link
      href={`/admin/pages/edit/${page.slug}`}
      style={{
        display: 'block',
        padding: 20,
        borderRadius: 12,
        background: isSubpage ? 'rgba(255,255,255,0.015)' : isPrincipal ? 'rgba(201, 35, 55, 0.08)' : 'rgba(255,255,255,0.02)',
        border: isSubpage ? '1px solid rgba(255,255,255,0.03)' : isPrincipal ? '1px solid rgba(201, 35, 55, 0.2)' : '1px solid rgba(255,255,255,0.05)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s',
        marginLeft: isSubpage ? '24px' : '0',
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 4,
            color: '#fff',
          }}
        >
          {isSubpage && '└─ '}{page.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: '#c0bccf',
            fontFamily: 'monospace',
          }}
        >
          /{page.slug}
        </p>
      </div>

      {page.heroSloganPt && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ margin: 0, fontSize: 12, color: '#a0a0a0', marginBottom: 4 }}>
            Slogan Hero (PT):
          </p>
          <p style={{ margin: 0, fontSize: 14, color: '#fff', fontStyle: 'italic' }}>
            {page.heroSloganPt}
          </p>
        </div>
      )}

      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            background: page.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(251, 191, 36, 0.15)',
            color: page.status === 'PUBLISHED' ? '#4ade80' : '#fbbf24',
            textTransform: 'uppercase',
          }}
        >
          {page.status === 'PUBLISHED' ? 'PUBLISHED' : page.status === 'DRAFT' ? 'DRAFT' : 'ARCHIVED'}
        </span>
      </div>
    </Link>
  );
}
