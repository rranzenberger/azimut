'use client';

export function ViewSiteButton() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173';

  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        borderRadius: 12,
        background: 'rgba(201,35,55,0.12)',
        border: '1px solid rgba(201,35,55,0.35)',
        color: '#fca5a5',
        fontWeight: 600,
        textDecoration: 'none',
        fontSize: 14,
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(201,35,55,0.2)';
        e.currentTarget.style.borderColor = 'rgba(201,35,55,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(201,35,55,0.12)';
        e.currentTarget.style.borderColor = 'rgba(201,35,55,0.35)';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      Ver Site Principal
    </a>
  );
}


