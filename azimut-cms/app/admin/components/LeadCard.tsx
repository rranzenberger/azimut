'use client';

export function LeadCard({
  lead,
}: {
  lead: {
    id: string;
    name: string;
    email: string;
    projectType: string | null;
    priority: string;
    createdAt: Date;
  };
}) {
  return (
    <div
      style={{
        padding: '16px 18px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{lead.name}</div>
          <div style={{ color: '#b5b1c6', fontSize: 14 }}>{lead.email}</div>
        </div>
        <span
          style={{
            fontSize: 12,
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(201,35,55,0.15)',
            color: '#fca5a5',
            border: '1px solid rgba(201,35,55,0.35)',
            height: 'fit-content',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {lead.priority}
        </span>
      </div>
      <div style={{ marginTop: 8, color: '#d3cec3', fontSize: 14, fontWeight: 500 }}>
        {lead.projectType || '—'}
      </div>
      <div style={{ marginTop: 6, color: '#8f8ba2', fontSize: 13 }}>
        {new Date(lead.createdAt).toLocaleString()}
      </div>
    </div>
  );
}



















