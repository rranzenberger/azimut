'use client';

import Link from 'next/link';

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.35)', text: '#93c5fd' },
  IN_PROGRESS: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.35)', text: '#fde047' },
  WON: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.35)', text: '#86efac' },
  LOST: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.35)', text: '#fca5a5' },
};

const priorityColors: Record<string, { bg: string; border: string; text: string }> = {
  LOW: { bg: 'rgba(156,163,175,0.15)', border: 'rgba(156,163,175,0.35)', text: '#d1d5db' },
  MEDIUM: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.35)', text: '#fde047' },
  HIGH: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.35)', text: '#fdba74' },
  URGENT: { bg: 'rgba(201,35,55,0.15)', border: 'rgba(201,35,55,0.35)', text: '#fca5a5' },
};

const statusLabels: Record<string, string> = {
  NEW: 'Novo',
  IN_PROGRESS: 'Em Progresso',
  WON: 'Ganho',
  LOST: 'Perdido',
};

const priorityLabels: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

export function LeadsList({ leads }: { leads: any[] }) {
  return (
    <div style={{ display: 'grid', gap: 12, width: '100%' }}>
      {leads.map((lead) => {
        const statusColor = statusColors[lead.status] || statusColors.NEW;
        const priorityColor = priorityColors[lead.priority] || priorityColors.MEDIUM;
        const conversionScore = lead.sessions?.[0]?.interestScore?.conversionScore || null;
        const visitorType = lead.sessions?.[0]?.interestScore?.visitorType || null;

        return (
          <Link
            key={lead.id}
            href={`/admin/leads/${lead.id}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                padding: '18px 20px',
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
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: '#fff' }}>
                    {lead.name}
                  </div>
                  <div style={{ color: '#b5b1c6', fontSize: 14, marginBottom: 4 }}>
                    {lead.email}
                  </div>
                  {lead.company && (
                    <div style={{ color: '#9f9bb0', fontSize: 13, marginTop: 4 }}>
                      {lead.company} {lead.position ? `• ${lead.position}` : ''}
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
                    {statusLabels[lead.status] || lead.status}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '6px 12px',
                      borderRadius: 999,
                      background: priorityColor.bg,
                      color: priorityColor.text,
                      border: `1px solid ${priorityColor.border}`,
                      height: 'fit-content',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {priorityLabels[lead.priority] || lead.priority}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
                {lead.projectType && (
                  <div style={{ color: '#d3cec3', fontSize: 13 }}>
                    <strong style={{ color: '#9f9bb0' }}>Projeto:</strong> {lead.projectType}
                  </div>
                )}
                {lead.budget && (
                  <div style={{ color: '#d3cec3', fontSize: 13 }}>
                    <strong style={{ color: '#9f9bb0' }}>Budget:</strong> {lead.budget}
                  </div>
                )}
                {conversionScore !== null && (
                  <div style={{ color: '#d3cec3', fontSize: 13 }}>
                    <strong style={{ color: '#9f9bb0' }}>Score:</strong> {conversionScore}/100
                  </div>
                )}
                {visitorType && (
                  <div style={{ color: '#d3cec3', fontSize: 13 }}>
                    <strong style={{ color: '#9f9bb0' }}>Tipo:</strong> {visitorType}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 12, color: '#8f8ba2', fontSize: 12 }}>
                {new Date(lead.createdAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

