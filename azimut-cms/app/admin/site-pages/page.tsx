import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

// ═══════════════════════════════════════════════════════════════
// PÁGINA DE LISTAGEM DE PÁGINAS - REDESIGN UX/UI PREMIUM
// Estrutura hierárquica seguindo o menu do site principal
// ═══════════════════════════════════════════════════════════════

export default async function PagesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let pages: any[] = [];
  let error: string | null = null;

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
  } catch (err: any) {
    console.error('Pages fetch error:', err);
    error = 'Erro ao carregar páginas. Verifique a conexão com o banco.';
  }

  // ═══════════════════════════════════════════════════════════════
  // ORGANIZAÇÃO HIERÁRQUICA
  // ═══════════════════════════════════════════════════════════════
  const organizarPaginas = () => {
    const home = pages.filter(p => p.slug === 'home');
    const work = pages.filter(p => p.slug === 'work');
    const workSub = pages.filter(p => p.slug.startsWith('work/') || p.slug.startsWith('project/'));
    const what = pages.filter(p => p.slug === 'what');
    const whatSub = pages.filter(p => p.slug.startsWith('what/'));
    const studio = pages.filter(p => p.slug === 'studio');
    const studioSub = pages.filter(p => p.slug.startsWith('studio/'));
    const academy = pages.filter(p => p.slug === 'academy');
    const academySub = pages.filter(p => p.slug.startsWith('academy/'));
    const contact = pages.filter(p => p.slug === 'contact');
    const vancouver = pages.filter(p => p.slug === 'vancouver');
    const blog = pages.filter(p => p.slug === 'blog');
    const blogSub = pages.filter(p => p.slug.startsWith('blog/'));
    const newsletter = pages.filter(p => p.slug === 'newsletter');
    const outros = pages.filter(p => 
      !['home', 'work', 'what', 'studio', 'academy', 'contact', 'vancouver', 'blog', 'newsletter'].includes(p.slug) &&
      !p.slug.startsWith('what/') &&
      !p.slug.startsWith('work/') &&
      !p.slug.startsWith('project/') &&
      !p.slug.startsWith('studio/') &&
      !p.slug.startsWith('academy/') &&
      !p.slug.startsWith('blog/')
    );
    
    return {
      home,
      work: { principal: work, sub: workSub },
      what: { principal: what, sub: whatSub },
      studio: { principal: studio, sub: studioSub },
      academy: { principal: academy, sub: academySub },
      blog: { principal: blog, sub: blogSub },
      contact,
      vancouver,
      newsletter,
      outros
    };
  };

  const paginasOrganizadas = organizarPaginas();

  // Contar total de subpáginas para cada seção
  const totalProjetos = paginasOrganizadas.work.sub.length;
  const totalSolucoes = paginasOrganizadas.what.sub.length;
  const totalEstudio = paginasOrganizadas.studio.sub.length;
  const totalAcademy = paginasOrganizadas.academy.sub.length;
  const totalBlog = paginasOrganizadas.blog.sub.length;

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HEADER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: 36, 
          fontWeight: 700, 
          letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #fff 0%, #c0bccf 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Páginas do Site
        </h1>
        <p style={{ margin: '8px 0 0', color: '#9f9bb0', fontSize: 16 }}>
          Gerencie conteúdo, SEO e traduções de cada página
        </p>
      </header>

      {error && (
        <div style={{
          padding: '16px 20px',
          borderRadius: 12,
          border: '1px solid rgba(201,35,55,0.4)',
          background: 'rgba(201,35,55,0.1)',
          color: '#fca5a5',
          marginBottom: 24,
        }}>
          ⚠️ {error}
        </div>
      )}

      {pages.length === 0 && !error && (
        <div style={{
          padding: 60,
          textAlign: 'center',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
          color: '#9f9bb0',
        }}>
          <p style={{ margin: 0, fontSize: 18 }}>Nenhuma página encontrada</p>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6b6680' }}>
            As páginas serão criadas automaticamente ao sincronizar com o site
          </p>
        </div>
      )}

      {pages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 🏠 HOME - Card Principal em Destaque */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {paginasOrganizadas.home.length > 0 && (
            <section>
              <SectionHeader icon="🏠" title="Página Inicial" />
              <div style={{ display: 'grid', gap: 16 }}>
                {paginasOrganizadas.home.map((page) => (
                  <MainPageCard key={page.id} page={page} highlight />
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 🎬 PROJETOS - Card Principal + Subprojetos */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(paginasOrganizadas.work.principal.length > 0 || totalProjetos > 0) && (
            <section>
              <SectionHeader 
                icon="🎬" 
                title="Projetos" 
                subtitle={totalProjetos > 0 ? `${totalProjetos} projetos no portfólio` : 'Portfólio de trabalhos'} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {paginasOrganizadas.work.principal.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
                
                {totalProjetos > 0 && (
                  <SubpagesGrid 
                    title="Projetos do Portfólio" 
                    pages={paginasOrganizadas.work.sub}
                    accentColor="rgba(251, 146, 60, 0.15)"
                    borderColor="rgba(251, 146, 60, 0.3)"
                  />
                )}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 💡 SOLUÇÕES - Card com Subpáginas Colapsadas */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(paginasOrganizadas.what.principal.length > 0 || totalSolucoes > 0) && (
            <section>
              <SectionHeader 
                icon="💡" 
                title="Soluções" 
                subtitle={`${totalSolucoes} serviços disponíveis`}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Card principal de Soluções */}
                {paginasOrganizadas.what.principal.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
                
                {/* Grid de subpáginas de Soluções */}
                {totalSolucoes > 0 && (
                  <SubpagesGrid 
                    title="Serviços" 
                    pages={paginasOrganizadas.what.sub}
                    accentColor="rgba(147, 51, 234, 0.15)"
                    borderColor="rgba(147, 51, 234, 0.3)"
                  />
                )}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 🎨 ESTÚDIO - Card Principal + Subpáginas */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(paginasOrganizadas.studio.principal.length > 0 || totalEstudio > 0) && (
            <section>
              <SectionHeader 
                icon="🎨" 
                title="Estúdio" 
                subtitle={totalEstudio > 0 ? `${totalEstudio} subpáginas` : undefined}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {paginasOrganizadas.studio.principal.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
                
                {totalEstudio > 0 && (
                  <SubpagesGrid 
                    title="Subpáginas do Estúdio" 
                    pages={paginasOrganizadas.studio.sub}
                    accentColor="rgba(236, 72, 153, 0.15)"
                    borderColor="rgba(236, 72, 153, 0.3)"
                  />
                )}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 🎓 ACADEMY - Card Principal + Subpáginas */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(paginasOrganizadas.academy.principal.length > 0 || totalAcademy > 0) && (
            <section>
              <SectionHeader 
                icon="🎓" 
                title="Academy" 
                subtitle={totalAcademy > 0 ? `${totalAcademy} subpáginas` : undefined}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {paginasOrganizadas.academy.principal.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
                
                {totalAcademy > 0 && (
                  <SubpagesGrid 
                    title="Subpáginas da Academy" 
                    pages={paginasOrganizadas.academy.sub}
                    accentColor="rgba(34, 197, 94, 0.15)"
                    borderColor="rgba(34, 197, 94, 0.3)"
                  />
                )}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 🌎 VANCOUVER */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {paginasOrganizadas.vancouver.length > 0 && (
            <section>
              <SectionHeader icon="🌎" title="Vancouver" subtitle="Página especial" />
              <div style={{ display: 'grid', gap: 16 }}>
                {paginasOrganizadas.vancouver.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 📝 BLOG */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(paginasOrganizadas.blog.principal.length > 0 || totalBlog > 0) && (
            <section>
              <SectionHeader 
                icon="📝" 
                title="Blog" 
                subtitle={totalBlog > 0 ? `${totalBlog} artigos` : 'Em breve'} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {paginasOrganizadas.blog.principal.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
                
                {totalBlog > 0 && (
                  <SubpagesGrid 
                    title="Artigos do Blog" 
                    pages={paginasOrganizadas.blog.sub}
                    accentColor="rgba(56, 189, 248, 0.15)"
                    borderColor="rgba(56, 189, 248, 0.3)"
                  />
                )}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 📧 CONTATO */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {paginasOrganizadas.contact.length > 0 && (
            <section>
              <SectionHeader icon="📧" title="Contato" />
              <div style={{ display: 'grid', gap: 16 }}>
                {paginasOrganizadas.contact.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 📬 NEWSLETTER */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {paginasOrganizadas.newsletter.length > 0 && (
            <section>
              <SectionHeader icon="📬" title="Newsletter" subtitle="Captação de leads" />
              <div style={{ display: 'grid', gap: 16 }}>
                {paginasOrganizadas.newsletter.map((page) => (
                  <MainPageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* 📦 OUTRAS PÁGINAS */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {paginasOrganizadas.outros.length > 0 && (
            <section>
              <SectionHeader icon="📦" title="Outras Páginas" />
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {paginasOrganizadas.outros.map((page) => (
                  <CompactPageCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTES AUXILIARES
// ═══════════════════════════════════════════════════════════════

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <h2 style={{ 
        margin: 0, 
        fontSize: 22, 
        fontWeight: 600, 
        color: '#e8e6f2',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        {title}
      </h2>
      {subtitle && (
        <span style={{ fontSize: 14, color: '#6b6680', fontWeight: 400 }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}

function MainPageCard({ page, highlight = false }: { page: any; highlight?: boolean }) {
  return (
    <Link
      href={`/admin/pages/edit/${page.slug}`}
      style={{
        display: 'block',
        padding: 24,
        borderRadius: 16,
        background: highlight 
          ? 'linear-gradient(135deg, rgba(201, 35, 55, 0.12) 0%, rgba(201, 35, 55, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: highlight 
          ? '1px solid rgba(201, 35, 55, 0.3)'
          : '1px solid rgba(255,255,255,0.08)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
            {page.name}
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: '#6b6680', fontFamily: 'monospace' }}>
            /{page.slug}
          </p>
        </div>
        <StatusBadge status={page.status} />
      </div>

      {page.heroSloganPt && (
        <div style={{ 
          marginTop: 16, 
          paddingTop: 16, 
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ margin: 0, fontSize: 12, color: '#6b6680', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Slogan Hero (PT)
          </p>
          <p style={{ margin: 0, fontSize: 15, color: '#c0bccf', fontStyle: 'italic' }}>
            "{page.heroSloganPt}"
          </p>
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 13, color: '#6b6680' }}>
          🌍 4 idiomas
        </span>
        <span style={{ fontSize: 13, color: '#6b6680' }}>
          🌓 2 temas
        </span>
      </div>
    </Link>
  );
}

function CompactPageCard({ page }: { page: any }) {
  return (
    <Link
      href={`/admin/pages/edit/${page.slug}`}
      style={{
        display: 'block',
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: '#e8e6f2' }}>
            {page.name}
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b6680', fontFamily: 'monospace' }}>
            /{page.slug}
          </p>
        </div>
        <StatusBadge status={page.status} small />
      </div>
    </Link>
  );
}

function SubpagesGrid({ title, pages, accentColor, borderColor }: { 
  title: string; 
  pages: any[]; 
  accentColor: string;
  borderColor: string;
}) {
  return (
    <div style={{
      padding: 20,
      borderRadius: 14,
      background: accentColor,
      border: `1px solid ${borderColor}`,
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16 
      }}>
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#c0bccf', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {title}
        </h4>
        <span style={{ 
          fontSize: 12, 
          color: '#9f9bb0',
          background: 'rgba(255,255,255,0.08)',
          padding: '4px 10px',
          borderRadius: 20,
        }}>
          {pages.length} páginas
        </span>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gap: 10, 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' 
      }}>
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/edit/${page.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.05)',
              textDecoration: 'none',
              color: '#e8e6f2',
              fontSize: 13,
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ color: '#6b6680' }}>└─</span>
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status, small = false }: { status: string; small?: boolean }) {
  const isPublished = status === 'PUBLISHED';
  return (
    <span style={{
      padding: small ? '3px 8px' : '5px 12px',
      borderRadius: 8,
      fontSize: small ? 10 : 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      background: isPublished ? 'rgba(34, 197, 94, 0.15)' : 'rgba(251, 191, 36, 0.15)',
      color: isPublished ? '#4ade80' : '#fbbf24',
    }}>
      {isPublished ? '● Online' : '○ Rascunho'}
    </span>
  );
}
