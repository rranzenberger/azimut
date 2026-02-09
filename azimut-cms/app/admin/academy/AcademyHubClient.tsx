'use client';

import { useEffect, useState } from 'react';
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

const cardHover = {
  on: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
  },
  off: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
  },
};

export function AcademyHubClient({ pages, error }: AcademyHubClientProps) {
  const [courses, setCourses] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/academy/courses')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.courses && setCourses(d.courses))
      .catch(() => {});
    fetch('/api/admin/academy/past-events')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.slots && setPastEvents(d.slots))
      .catch(() => {});
  }, []);

  if (error) {
    return (
      <div style={{ padding: 24, borderRadius: 12, background: 'rgba(201,35,55,0.12)', border: '1px solid rgba(201,35,55,0.35)', color: '#fca5a5' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Header — direção de arte premium, como Home/Projetos */}
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, color: AZIMUT.text }}>
          Academy — edição visual
        </h1>
        <p style={{ margin: 0, color: AZIMUT.textSecondary, fontSize: 16, lineHeight: 1.5 }}>
          Por item, como no site. Todas as mídias visíveis e editáveis em cada área — Trocar imagem e EDITAR em cada card (padrão Home / Projetos).
        </p>
      </header>

      <div style={{ padding: '18px 22px', marginBottom: 28, borderRadius: 12, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.35)', fontSize: 14, color: '#86efac', lineHeight: 1.5 }}>
        <strong>Mídia da página Academy — como aparece no site.</strong> Aqui em cima: os 4 cards da página Academy (Vancouver, Cursos, Events, B2B). Abaixo: Cursos e Past Events com todos os cards/slots. Cada item tem Trocar e EDITAR.
      </div>

      {/* ═══ SEÇÃO 0: 4 CARDS DA PÁGINA ACADEMY (como no site — INTERNATIONAL, PROFESSIONAL, EVENTS, B2B) ═══ */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: AZIMUT.text }}>4 cards da página Academy — edite as mídias aqui</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: AZIMUT.textMuted }}>Estas são as imagens e textos que aparecem nos 4 blocos da página /academy (Vancouver, Cursos, Workshops, Corporate). Trocar imagem = imagem do card; EDITAR = textos e hero da página.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {['academy/vancouver', 'academy/courses', 'academy/workshops', 'academy/corporate'].map((slug) => {
            const page = pages.find((p: any) => p.slug === slug);
            const heroUrl = page ? getHeroUrl(page) : null;
            const label = slugToLabel[slug] || slug;
            const editPath = getEditPath(slug);
            const badges: Record<string, string> = { 'academy/vancouver': 'INTERNATIONAL', 'academy/courses': 'PROFESSIONAL', 'academy/workshops': 'EVENTS', 'academy/corporate': 'B2B' };
            const badge = badges[slug] || '';
            return (
              <div key={slug} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.25s ease' }} onMouseEnter={cardHover.on} onMouseLeave={cardHover.off}>
                <div style={{ position: 'relative', paddingTop: '56%', background: heroUrl ? '#0a0a0a' : 'linear-gradient(135deg, rgba(201,35,55,0.15), rgba(10,14,26,0.9))' }}>
                  {heroUrl ? <img src={heroUrl} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, opacity: 0.5 }}>{slug === 'academy/vancouver' ? '🇨🇦' : slug === 'academy/courses' ? '📚' : slug === 'academy/workshops' ? '🎬' : '🏢'}</span>}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(10,14,26,0.95), transparent)', pointerEvents: 'none' }} />
                  {badge && <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(201,35,55,0.9)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>{badge}</span>}
                  <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                    <Link href={editPath} style={{ background: 'rgba(168,85,247,0.9)', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>📷 Trocar imagem</Link>
                    <Link href={editPath} style={{ background: '#22c55e', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 12px rgba(34,197,94,0.35)' }}>✏️ EDITAR</Link>
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>{label}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>/{slug}</p>
                  <Link href={editPath} style={{ display: 'inline-block', marginTop: 10, fontSize: 13, color: '#86efac', fontWeight: 600, textDecoration: 'none' }}>Edição completa (textos e hero) →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ SEÇÃO 1: CURSOS — como no site (grid igual Projetos) ═══ */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: AZIMUT.text, letterSpacing: '-0.02em' }}>
            Cursos — como no site
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: AZIMUT.textMuted }}>{courses.length} curso(s)</span>
            <Link href="/admin/academy/courses" style={{ padding: '10px 20px', borderRadius: 10, background: AZIMUT.red, color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 12px rgba(201,35,55,0.35)' }}>
              VER TODOS OS {courses.length} CURSOS →
            </Link>
            <Link href="/admin/academy/courses" style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.5)', color: '#86efac', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
              + Adicionar curso
            </Link>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {courses.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '2px dashed rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: 40, opacity: 0.5 }}>📚</span>
              <p style={{ margin: '12px 0 0', color: AZIMUT.textMuted }}>Nenhum curso. Clique em &quot;+ Adicionar curso&quot; ou em Cursos para criar os cards.</p>
            </div>
          ) : (
            courses.map((c) => {
              const img = c.image?.originalUrl || c.image?.thumbnailUrl;
              return (
                <div
                  key={c.id}
                  style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.25s ease' }}
                  onMouseEnter={cardHover.on}
                  onMouseLeave={cardHover.off}
                >
                  <div style={{ position: 'relative', paddingTop: '56%', background: img ? '#0a0a0a' : 'linear-gradient(135deg, rgba(201,35,55,0.2), rgba(10,14,26,0.9))' }}>
                    {img ? <img src={img} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: 0.5 }}>📚</span>}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(10,14,26,0.95), transparent)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <Link href={`/admin/academy/courses/${c.id}`} style={{ background: 'rgba(168,85,247,0.9)', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(8px)' }}>📷 Trocar</Link>
                      <Link href={`/admin/academy/courses/${c.id}`} style={{ background: '#22c55e', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 12px rgba(34,197,94,0.35)' }}>✏️ EDITAR ESTE CURSO</Link>
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>{c.titlePt || c.titleEn || `Curso #${c.order + 1}`}</h3>
                    <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>{c.category || '—'} {c.featured ? '· Destaque' : ''}</p>
                    <Link href={`/admin/academy/courses/${c.id}`} style={{ display: 'inline-block', marginTop: 12, fontSize: 12, color: '#7dd3fc', textDecoration: 'underline', fontWeight: 600 }}>Edição completa →</Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ═══ SEÇÃO 2: PAST EVENTS — como no site ═══ */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: AZIMUT.text }}>Past Events (Workshops) — como no site</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: AZIMUT.textMuted }}>{pastEvents.length} slot(s)</span>
            <Link href="/admin/academy/events/gallery" style={{ padding: '10px 20px', borderRadius: 10, background: AZIMUT.red, color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>VER GALERIA →</Link>
            <Link href="/admin/academy/events/gallery" style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.5)', color: '#86efac', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>+ Adicionar slot</Link>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          {pastEvents.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: 32, textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '2px dashed rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: 32, opacity: 0.5 }}>📸</span>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: AZIMUT.textMuted }}>Nenhum slot. Abra a galeria para criar e trocar imagens.</p>
            </div>
          ) : (
            pastEvents.map((s) => {
              const img = s.media?.thumbnailUrl || s.media?.originalUrl;
              return (
                <Link key={s.id} href="/admin/academy/events/gallery" style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '1', background: img ? '#0a0a0a' : 'rgba(15,23,42,0.8)', transition: 'all 0.25s ease' }} onMouseEnter={cardHover.on} onMouseLeave={cardHover.off}>
                    {img ? <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: 36, opacity: 0.4 }}>📸</span>}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', fontSize: 11, color: '#94a3b8' }}>Trocar na galeria</div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      {/* ═══ SEÇÃO 3: Vancouver ═══ */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: AZIMUT.text }}>CA Vancouver — vídeos e mídias</h2>
        <Link
          href="/admin/academy/vancouver"
          style={{
            display: 'block',
            padding: '24px 28px',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,35,55,0.4)'; e.currentTarget.style.background = 'rgba(201,35,55,0.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>Vancouver (VFS / VanArts)</h3>
              <p style={{ margin: 0, fontSize: 14, color: AZIMUT.textMuted }}>Hero da página, vídeos institucionais e galeria — editar aqui</p>
            </div>
            <span style={{ padding: '10px 20px', borderRadius: 10, background: AZIMUT.red, color: '#fff', fontSize: 13, fontWeight: 700 }}>Vancouver mídias →</span>
          </div>
        </Link>
      </section>

      {/* ═══ SEÇÃO 4: Páginas (hero + textos) — cada sub como no site ═══ */}
      <section>
        <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: AZIMUT.text }}>Páginas Academy — hero e textos de cada área</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: AZIMUT.textMuted }}>Cada card = uma página do site. Trocar imagem (hero) e EDITAR para textos e SEO.</p>
        {pages.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: AZIMUT.textMuted }}>Nenhuma página Academy. Crie em <Link href="/admin/site-pages" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Páginas</Link>.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {pages.map((page) => {
              const heroUrl = getHeroUrl(page);
              const editPath = getEditPath(page.slug);
              const label = slugToLabel[page.slug] || page.name || page.slug;
              return (
                <div key={page.id} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.25s ease' }} onMouseEnter={cardHover.on} onMouseLeave={cardHover.off}>
                  <div style={{ position: 'relative', paddingTop: '56%', background: '#0f172a' }}>
                    {heroUrl ? <img src={heroUrl} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(201,35,55,0.12), rgba(10,14,26,0.9))', gap: 8 }}><span style={{ fontSize: 40, opacity: 0.5 }}>🎓</span><span style={{ fontSize: 12, color: AZIMUT.textMuted }}>Sem imagem hero</span></div>}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(10,14,26,0.95), transparent)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                      <Link href={editPath} style={{ background: 'rgba(168,85,247,0.9)', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>📷 Trocar imagem</Link>
                      <Link href={editPath} style={{ background: '#22c55e', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 12px rgba(34,197,94,0.3)' }}>✏️ EDITAR</Link>
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>{label}</h3>
                    <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>/{page.slug}</p>
                    <Link href={editPath} style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: '#86efac', fontWeight: 600, textDecoration: 'none' }}>Edição completa →</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
