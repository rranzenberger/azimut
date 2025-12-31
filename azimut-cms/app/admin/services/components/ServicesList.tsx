'use client';

import Link from 'next/link';

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  DRAFT: { bg: 'rgba(156,163,175,0.15)', border: 'rgba(156,163,175,0.35)', text: '#d1d5db' },
  PUBLISHED: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.35)', text: '#86efac' },
  ARCHIVED: { bg: 'rgba(107,114,128,0.15)', border: 'rgba(107,114,128,0.35)', text: '#9ca3af' },
};

const statusLabels: Record<string, string> = {
  DRAFT: 'Rascunho',
  PUBLISHED: 'Publicado',
  ARCHIVED: 'Arquivado',
};

export function ServicesList({ services }: { services: any[] }) {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%' }}>
      {services.map((service) => {
        const statusColor = statusColors[service.status] || statusColors.DRAFT;

        return (
          <Link
            key={service.id}
            href={`/admin/services/${service.id}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    {service.icon && (
                      <span style={{ fontSize: 24 }}>{service.icon}</span>
                    )}
                    <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                      {service.titlePt}
                    </div>
                  </div>
                  <div style={{ color: '#b5b1c6', fontSize: 14, marginBottom: 8 }}>
                    {service.titleEn}
                  </div>
                  {service.descriptionPt && (
                    <div style={{ color: '#9f9bb0', fontSize: 13, marginTop: 8 }}>
                      {service.descriptionPt.substring(0, 150)}
                      {service.descriptionPt.length > 150 ? '...' : ''}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '6px 12px',
                      borderRadius: 999,
                      background: statusColor.bg,
                      color: statusColor.text,
                      border: `1px solid ${statusColor.border}`,
                      height: 'fit-content',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {statusLabels[service.status] || service.status}
                  </span>
                  {service.priority > 0 && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: '6px 12px',
                        borderRadius: 999,
                        background: 'rgba(201,35,55,0.15)',
                        color: '#fca5a5',
                        border: '1px solid rgba(201,35,55,0.35)',
                        height: 'fit-content',
                        fontWeight: 600,
                      }}
                    >
                      Prioridade: {service.priority}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
                {service.segments && service.segments.length > 0 && (
                  <div style={{ color: '#d3cec3', fontSize: 13 }}>
                    <strong style={{ color: '#9f9bb0' }}>Segmentos:</strong>{' '}
                    {service.segments.join(', ')}
                  </div>
                )}
                {service.projects && service.projects.length > 0 && (
                  <div style={{ color: '#d3cec3', fontSize: 13 }}>
                    <strong style={{ color: '#9f9bb0' }}>Projetos:</strong> {service.projects.length}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

