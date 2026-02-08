'use client';

import Link from 'next/link';

export function ProjectCard({ project }: { project: any }) {
  const statusColors: Record<string, { bg: string; border: string; text: string }> = {
    PUBLISHED: { bg: 'rgba(46,204,113,0.12)', border: 'rgba(46,204,113,0.4)', text: '#4ade80' },
    DRAFT: { bg: 'rgba(255,193,7,0.12)', border: 'rgba(255,193,7,0.4)', text: '#facc15' },
    ARCHIVED: { bg: 'rgba(158,158,158,0.12)', border: 'rgba(158,158,158,0.4)', text: '#9ca3af' },
  };

  const statusLabels: Record<string, string> = {
    PUBLISHED: 'Publicado',
    DRAFT: 'Rascunho',
    ARCHIVED: 'Arquivado',
  };

  const getImageUrl = () => {
    if (project.heroImage?.originalUrl) return project.heroImage.originalUrl;
    if (project.heroImage?.mediumUrl) return project.heroImage.mediumUrl;
    if (project.heroImage?.thumbnailUrl) return project.heroImage.thumbnailUrl;
    if (project.thumbnailUrl) return project.thumbnailUrl;
    return null;
  };

  const imageUrl = getImageUrl();
  const st = statusColors[project.status] || statusColors.DRAFT;
  const isHome = project.priorityHome > 0;
  const homeSlotLabel = project.priorityHome === 1 ? 'Principal 1' : project.priorityHome === 2 ? 'Principal 2' : project.priorityHome === 3 ? 'Principal 3' : project.priorityHome === 4 ? 'Principal 4' : null;

  return (
    <Link
      href={`/admin/projects/${project.id}`}
      style={{
        display: 'block',
        borderRadius: 16,
        border: isHome ? '1px solid rgba(201,35,55,0.35)' : '1px solid rgba(255,255,255,0.08)',
        background: isHome ? 'rgba(201,35,55,0.04)' : 'rgba(255,255,255,0.02)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.25s ease',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
        e.currentTarget.style.borderColor = isHome ? 'rgba(201,35,55,0.6)' : 'rgba(255,255,255,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = isHome ? 'rgba(201,35,55,0.35)' : 'rgba(255,255,255,0.08)';
      }}
    >
      {/* ═══ PREVIEW VISUAL: simula card do site ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 140 }}>
        {/* Thumbnail grande */}
        <div
          style={{
            position: 'relative',
            background: imageUrl ? '#0a0a0a' : 'linear-gradient(135deg, rgba(201,35,55,0.25), rgba(30,30,60,0.6))',
            overflow: 'hidden',
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.style.background =
                  'linear-gradient(135deg, rgba(201,35,55,0.25), rgba(30,30,60,0.6))';
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 42, opacity: 0.6 }}>
                {project.projectCategory?.includes('games') ? '🎮' :
                 project.projectCategory?.includes('museum') ? '🏛️' :
                 project.projectCategory?.includes('vr-360') ? '🥽' :
                 project.projectCategory?.includes('animacao') ? '🎬' :
                 project.projectCategory?.includes('education') ? '📚' :
                 project.projectCategory?.includes('festival') ? '🎪' :
                 '📽️'}
              </span>
            </div>
          )}
          {/* Badge prioridade Home */}
          {isHome && (
            <div style={{
              position: 'absolute',
              top: 8,
              left: 8,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(201,35,55,0.9)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              🏠 {homeSlotLabel || `#${project.priorityHome}`}
            </div>
          )}
          {/* Badge featured */}
          {project.featured && !isHome && (
            <div style={{
              position: 'absolute',
              top: 8,
              left: 8,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(201,35,55,0.75)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              DESTAQUE
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          {/* Linha 1: título + status */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {project.title}
            </h3>
            <span style={{
              fontSize: 11,
              padding: '4px 12px',
              borderRadius: 999,
              background: st.bg,
              color: st.text,
              border: `1px solid ${st.border}`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              {statusLabels[project.status] || project.status}
            </span>
          </div>

          {/* Linha 2: resumo */}
          <p style={{ margin: 0, fontSize: 13, color: '#9f9bb0', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {project.shortTitle || project.summaryPt || 'Sem descrição'}
          </p>

          {/* Linha 3: metadados */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: '#6b6780', marginTop: 'auto' }}>
            {project.city && project.country && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📍 {project.city}, {project.country}</span>
            )}
            {project.year && <span>📅 {project.year}</span>}
            {project.client && <span>👤 {project.client}</span>}
          </div>

          {/* Linha 4: tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {project.tags.slice(0, 4).map((tag: any) => (
                <span key={tag.id} style={{
                  fontSize: 10,
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: 'rgba(201,35,55,0.1)',
                  border: '1px solid rgba(201,35,55,0.25)',
                  color: '#e8a0a8',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}>
                  {tag.labelPt}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span style={{ fontSize: 10, color: '#6b6780', padding: '3px 0', fontWeight: 500 }}>
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══ REFERÊNCIA DO SITE: onde aparece ═══ */}
      {isHome && (
        <div style={{
          padding: '8px 20px',
          borderTop: '1px solid rgba(201,35,55,0.15)',
          background: 'rgba(201,35,55,0.03)',
          fontSize: 11,
          color: '#8f8ba2',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: '#c92337', fontWeight: 600 }}>No site →</span>
          Aparece nos cards &quot;Projetos em Destaque&quot; da Home ({homeSlotLabel || `posição #${project.priorityHome}`})
        </div>
      )}
    </Link>
  );
}
