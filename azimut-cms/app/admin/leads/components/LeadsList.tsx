'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { QuickEditModal } from './QuickEditModal';

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.35)', text: '#93c5fd' },
  CONTACTED: { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.35)', text: '#c4b5fd' },
  PROPOSAL_SENT: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.35)', text: '#fde047' },
  NEGOTIATION: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.35)', text: '#fdba74' },
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
  NEW: '🆕 Novo',
  CONTACTED: '📞 Contato Feito',
  PROPOSAL_SENT: '💼 Proposta Enviada',
  NEGOTIATION: '🤝 Em Negociação',
  WON: '✅ Ganho',
  LOST: '❌ Perdido',
};

const priorityLabels: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

export function LeadsList({ leads }: { leads: any[] }) {
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  // Buscar usuários uma vez
  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => {
        // Silencioso - não quebrar se falhar
      });
  }, []);

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
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Score Badge */}
                  <span
                    style={{
                      fontSize: 11,
                      padding: '6px 12px',
                      borderRadius: 999,
                      background: conversionScore >= 90 || lead.leadScore >= 90
                        ? 'rgba(201,35,55,0.2)'
                        : conversionScore >= 80 || lead.leadScore >= 80
                        ? 'rgba(249,115,22,0.2)'
                        : conversionScore >= 70 || lead.leadScore >= 70
                        ? 'rgba(251,191,36,0.2)'
                        : 'rgba(156,163,175,0.2)',
                      color: conversionScore >= 90 || lead.leadScore >= 90
                        ? '#fca5a5'
                        : conversionScore >= 80 || lead.leadScore >= 80
                        ? '#fdba74'
                        : conversionScore >= 70 || lead.leadScore >= 70
                        ? '#fde047'
                        : '#d1d5db',
                      border: `1px solid ${
                        conversionScore >= 90 || lead.leadScore >= 90
                          ? 'rgba(201,35,55,0.4)'
                          : conversionScore >= 80 || lead.leadScore >= 80
                          ? 'rgba(249,115,22,0.4)'
                          : conversionScore >= 70 || lead.leadScore >= 70
                          ? 'rgba(251,191,36,0.4)'
                          : 'rgba(156,163,175,0.4)'
                      }`,
                      height: 'fit-content',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>
                      {conversionScore >= 90 || lead.leadScore >= 90
                        ? '🔥🔥'
                        : conversionScore >= 80 || lead.leadScore >= 80
                        ? '🔥'
                        : conversionScore >= 70 || lead.leadScore >= 70
                        ? '🌡️'
                        : '❄️'}
                    </span>
                    <span>
                      {conversionScore !== null ? conversionScore : lead.leadScore || 0}
                    </span>
                  </span>
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

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 12,
                }}
              >
                <div style={{ color: '#8f8ba2', fontSize: 12 }}>
                  {new Date(lead.createdAt).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditingLead(lead.id);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(201,35,55,0.3)',
                    background: 'rgba(201,35,55,0.1)',
                    color: '#fca5a5',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201,35,55,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(201,35,55,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201,35,55,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(201,35,55,0.3)';
                  }}
                >
                  ✏️ Editar
                </button>
              </div>
            </div>
          </Link>

          {editingLead === lead.id && (
            <QuickEditModal
              lead={lead}
              users={users}
              onClose={() => setEditingLead(null)}
            />
          )}
        );
      })}
    </div>
  );
}

