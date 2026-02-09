'use client';

import Link from 'next/link';
import { AZIMUT } from '../theme';

interface AcademyHubClientProps {
  pages: any[];
  error: string | null;
}

const slugToLabel: Record<string, string> = {
  academy: 'Academy',
  'academy/courses': 'Cursos',
  'academy/workshops': 'Workshops & Eventos',
  'academy/corporate': 'Corporate',
  'academy/research': 'Research & Lab',
  'academy/vancouver': 'CA Vancouver',
};

function getHeroUrl(page: any): string | null {
  const hero = page.heroBackgroundImage;
  if (hero?.originalUrl) return hero.originalUrl;
  if (hero?.mediumUrl) return hero.mediumUrl;
  if (hero?.thumbnailUrl) return hero.thumbnailUrl;
  if (page.heroBackgroundImageUrl) return page.heroBackgroundImageUrl;
  return null;
}

function getEditPath(slug: string): string {
  const path = slug === 'academy' ? 'academy' : slug;
  return `/admin/pages/edit/${path}`;
}

export function AcademyHubClient({ pages, error }: AcademyHubClientProps) {
  if (error) {
    return (
      <div style={{
        padding: 24,
        borderRadius: 12,
        background: 'rgba(201,35,55,0.12)',
        border: '1px solid rgba(201,35,55,0.35)',
        color: '#fca5a5',
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 8 }}>
          Academy — edição visual
        </h1>
        <p style={{ margin: 0, color: AZIMUT.textSecondary, fontSize: 16 }}>
          Cards como no site. Troque a imagem e edite textos em cada bloco.
        </p>
      </header>

      <div style={{
        padding: '16px 20px',
        marginBottom: 24,
        borderRadius: 12,
        background: 'rgba(34,197,94,0.08)',
        border: '1px solid rgba(34,197,94,0.3)',
        fontSize: 14,
        color: '#86efac',
      }}>
        <strong>Como na Home:</strong> cada card representa uma parte da Academy no site. Use <strong>Trocar imagem</strong> para o hero e <strong>EDITAR ESTE CONTEÚDO</strong> para textos, hero e SEO.
      </div>

      {pages.length === 0 ? (
        <div style={{
          padding: 48,
          textAlign: 'center',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          border: '2px dashed rgba(255,255,255,0.1)',
        }}>
          <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🎓</span>
          <p style={{ color: AZIMUT.textSecondary, fontSize: 16, margin: '0 0 8px' }}>Nenhuma página da Academy encontrada</p>
          <p style={{ color: AZIMUT.textMuted, fontSize: 14, margin: 0 }}>
            Crie páginas com slug <code style={{ background: 'rgba(201,35,55,0.2)', padding: '2px 8px', borderRadius: 4 }}>academy</code> ou <code style={{ background: 'rgba(201,35,55,0.2)', padding: '2px 8px', borderRadius: 4 }}>academy/courses</code> em <Link href="/admin/site-pages" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Páginas</Link>.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {pages.map((page) => {
            const heroUrl = getHeroUrl(page);
            const editPath = getEditPath(page.slug);
            const label = slugToLabel[page.slug] || page.name || page.slug;

            return (
              <div
                key={page.id}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', paddingTop: '56%', background: '#0f172a' }}>
                  {heroUrl ? (
                    <img
                      src={heroUrl}
                      alt={page.name}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, rgba(201,35,55,0.2), rgba(10,14,26,0.9))';
                      }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(201,35,55,0.15), rgba(10,14,26,0.9))', gap: 8 }}>
                      <span style={{ fontSize: 40, opacity: 0.5 }}>🎓</span>
                      <span style={{ fontSize: 12, color: AZIMUT.textMuted }}>Sem imagem hero</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(10,14,26,0.95), transparent)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Link
                      href={editPath}
                      style={{
                        background: 'rgba(168,85,247,0.9)',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 600,
                        textDecoration: 'none',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      📷 Trocar imagem
                    </Link>
                    <Link
                      href={editPath}
                      style={{
                        background: '#22c55e',
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 10px rgba(34,197,94,0.3)',
                      }}
                    >
                      ✏️ EDITAR
                    </Link>
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>
                    {label}
                  </h3>
                  <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>
                    /{page.slug}
                  </p>
                  <Link
                    href={editPath}
                    style={{
                      display: 'inline-block',
                      marginTop: 12,
                      padding: '10px 18px',
                      borderRadius: 8,
                      background: 'rgba(34,197,94,0.15)',
                      border: '1px solid rgba(34,197,94,0.4)',
                      color: '#86efac',
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Edição completa →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 32, padding: '20px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: AZIMUT.text }}>Outros</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: AZIMUT.textSecondary, fontSize: 14, lineHeight: 1.8 }}>
          <li><Link href="/admin/academy/events/gallery" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Galeria Past Events</Link> — imagens da seção &quot;Past Events&quot; (Workshops)</li>
          <li><Link href="/admin/site-pages" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Páginas</Link> — listagem completa (Academy, Vancouver, etc.)</li>
        </ul>
      </div>
    </div>
  );
}
