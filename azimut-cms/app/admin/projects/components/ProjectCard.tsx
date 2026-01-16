'use client';

import Link from 'next/link';

export function ProjectCard({ project }: { project: any }) {
  const statusColors: Record<string, string> = {
    PUBLISHED: 'rgba(46,204,113,0.15)',
    DRAFT: 'rgba(255,193,7,0.15)',
    ARCHIVED: 'rgba(158,158,158,0.15)',
  };

  const statusBorders: Record<string, string> = {
    PUBLISHED: 'rgba(46,204,113,0.4)',
    DRAFT: 'rgba(255,193,7,0.4)',
    ARCHIVED: 'rgba(158,158,158,0.4)',
  };

  const statusLabels: Record<string, string> = {
    PUBLISHED: 'Publicado',
    DRAFT: 'Rascunho',
    ARCHIVED: 'Arquivado',
  };

  return (
    <Link
      href={`/admin/projects/${project.id}`}
      style={{
        display: 'block',
        padding: '20px 24px',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'start', width: '100%', boxSizing: 'border-box' }}>
        {project.heroImage?.originalUrl && (
          <img
            src={project.heroImage.originalUrl}
            alt={project.title}
            style={{
              width: 140,
              height: 100,
              objectFit: 'cover',
              borderRadius: 12,
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>{project.title}</h3>
            {project.featured && (
              <span
                style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(201,35,55,0.15)',
                  color: '#fca5a5',
                  border: '1px solid rgba(201,35,55,0.35)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                DESTAQUE
              </span>
            )}
          </div>
          <div style={{ fontSize: 15, color: '#c0bccf', marginBottom: 12, lineHeight: 1.5 }}>
            {project.shortTitle || project.summaryPt || 'Sem descrição'}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 13, color: '#8f8ba2', overflow: 'hidden', marginBottom: 12 }}>
            {project.slug && <span style={{ whiteSpace: 'nowrap' }}>Slug: {project.slug}</span>}
            {project.city && project.country && (
              <span style={{ whiteSpace: 'nowrap' }}>
                📍 {project.city}, {project.country}
              </span>
            )}
            {project.year && <span style={{ whiteSpace: 'nowrap' }}>📅 {project.year}</span>}
            {project.client && <span style={{ whiteSpace: 'nowrap' }}>👤 {project.client}</span>}
            {project.market && <span style={{ whiteSpace: 'nowrap' }}>🌍 {project.market.labelPt}</span>}
          </div>
          {project.tags && project.tags.length > 0 && (
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {project.tags.slice(0, 5).map((tag: any) => (
                <span
                  key={tag.id}
                  style={{
                    fontSize: 12,
                    padding: '6px 12px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#c0bccf',
                    fontWeight: 500,
                  }}
                >
                  {tag.labelPt}
                </span>
              ))}
              {project.tags.length > 5 && (
                <span style={{ fontSize: 12, color: '#8f8ba2', padding: '6px 0', fontWeight: 500 }}>
                  +{project.tags.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>
          <span
            style={{
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 999,
              background: statusColors[project.status] || statusColors.DRAFT,
              color: '#fff',
              border: `1px solid ${statusBorders[project.status] || statusBorders.DRAFT}`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {statusLabels[project.status] || project.status}
          </span>
          {project.monitorEnabled && (
            <Link
              href={`/admin/projects/${project.id}/monitoring`}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 12,
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(147, 51, 234, 0.15)',
                color: '#c084fc',
                border: '1px solid rgba(147, 51, 234, 0.35)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(147, 51, 234, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(147, 51, 234, 0.15)';
              }}
            >
              🤖 Monitorando
            </Link>
          )}
          {project.priorityHome > 0 && (
            <span style={{ fontSize: 13, color: '#8f8ba2', fontWeight: 500 }}>Prioridade: {project.priorityHome}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

