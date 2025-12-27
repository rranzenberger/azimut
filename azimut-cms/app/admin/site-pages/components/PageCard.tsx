'use client';

import { useRouter } from 'next/navigation';

export function PageCard({ page }: { page: any }) {
  const router = useRouter();

  return (
    <div
      style={{
        display: 'block',
        padding: 20,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(201,35,55,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
      }}
      onClick={() => {
        router.push(`/admin/pages/${page.slug}/edit`);
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
          {page.name}
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
            fontWeight: 500,
            background:
              page.status === 'PUBLISHED'
                ? 'rgba(34,197,94,0.15)'
                : page.status === 'DRAFT'
                ? 'rgba(251,191,36,0.15)'
                : 'rgba(107,114,128,0.15)',
            color:
              page.status === 'PUBLISHED'
                ? '#86efac'
                : page.status === 'DRAFT'
                ? '#fde047'
                : '#9ca3af',
          }}
        >
          {page.status}
        </span>
      </div>
    </div>
  );
}

