'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const statusConfig = {
  NEW: {
    label: '🆕 Novo Lead',
    color: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.35)', text: '#93c5fd' },
    order: 1,
  },
  CONTACTED: {
    label: '📞 Contato Feito',
    color: { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.35)', text: '#c4b5fd' },
    order: 2,
  },
  PROPOSAL_SENT: {
    label: '💼 Proposta Enviada',
    color: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.35)', text: '#fde047' },
    order: 3,
  },
  NEGOTIATION: {
    label: '🤝 Em Negociação',
    color: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.35)', text: '#fdba74' },
    order: 4,
  },
  WON: {
    label: '✅ Ganho',
    color: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.35)', text: '#86efac' },
    order: 5,
  },
  LOST: {
    label: '❌ Perdido',
    color: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.35)', text: '#fca5a5' },
    order: 6,
  },
};

const priorityColors: Record<string, { bg: string; border: string; text: string }> = {
  LOW: { bg: 'rgba(156,163,175,0.15)', border: 'rgba(156,163,175,0.35)', text: '#d1d5db' },
  MEDIUM: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.35)', text: '#fde047' },
  HIGH: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.35)', text: '#fdba74' },
  URGENT: { bg: 'rgba(201,35,55,0.15)', border: 'rgba(201,35,55,0.35)', text: '#fca5a5' },
};

const priorityLabels: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  status: string;
  priority: string;
  projectType?: string | null;
  budget?: string | null;
  assignedTo?: { id: string; name?: string | null; email: string } | null;
  notes?: string | null;
  createdAt: Date | string;
}

interface KanbanBoardProps {
  leads: Lead[];
}

export function KanbanBoard({ leads: initialLeads }: KanbanBoardProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  // Agrupar leads por status
  const leadsByStatus = leads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }
    acc[lead.status].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  // Ordenar colunas pela ordem definida
  const orderedStatuses = Object.keys(statusConfig).sort(
    (a, b) => statusConfig[a as keyof typeof statusConfig].order - statusConfig[b as keyof typeof statusConfig].order
  );

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(leadId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setTargetColumn(status);
  };

  const handleDragLeave = () => {
    setTargetColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    setTargetColumn(null);

    if (!draggedLead) return;

    const lead = leads.find((l) => l.id === draggedLead);
    if (!lead || lead.status === newStatus) {
      setDraggedLead(null);
      return;
    }

    // Otimistic update
    setUpdating(draggedLead);
    setLeads((prev) =>
      prev.map((l) => (l.id === draggedLead ? { ...l, status: newStatus } : l))
    );

    try {
      const response = await fetch(`/api/admin/leads/${draggedLead}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar status');
      }

      // Refresh para pegar dados atualizados
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      // Reverter otimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === draggedLead ? { ...l, status: lead.status } : l))
      );
      alert('Erro ao atualizar status do lead. Tente novamente.');
    } finally {
      setUpdating(null);
      setDraggedLead(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
    setTargetColumn(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        paddingBottom: 16,
        minHeight: '600px',
      }}
    >
      {orderedStatuses.map((status) => {
        const config = statusConfig[status as keyof typeof statusConfig];
        const columnLeads = leadsByStatus[status] || [];
        const isTarget = targetColumn === status;

        return (
          <div
            key={status}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
            style={{
              minWidth: '320px',
              width: '320px',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${isTarget ? config.color.border : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 16,
              padding: 16,
              transition: 'all 0.2s',
              ...(isTarget && {
                background: 'rgba(255,255,255,0.05)',
                borderColor: config.color.border,
                boxShadow: `0 0 20px ${config.color.border}40`,
              }),
            }}
          >
            {/* Header da Coluna */}
            <div
              style={{
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: config.color.text,
                  }}
                >
                  {config.label}
                </h3>
                <span
                  style={{
                    fontSize: 14,
                    color: '#9f9bb0',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  {columnLeads.length}
                </span>
              </div>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {columnLeads.map((lead) => {
                const priorityColor = priorityColors[lead.priority] || priorityColors.MEDIUM;
                const isDragging = draggedLead === lead.id;
                const isUpdating = updating === lead.id;

                return (
                  <div
                    key={lead.id}
                    draggable={!isUpdating}
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => router.push(`/admin/leads/${lead.id}`)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${priorityColor.border}`,
                      borderRadius: 12,
                      padding: 16,
                      cursor: isUpdating ? 'wait' : 'pointer',
                      transition: 'all 0.2s',
                      opacity: isDragging ? 0.5 : isUpdating ? 0.7 : 1,
                      transform: isDragging ? 'rotate(2deg)' : 'none',
                      ...(!isUpdating && {
                        ':hover': {
                          background: 'rgba(255,255,255,0.06)',
                          borderColor: priorityColor.border,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${priorityColor.border}30`,
                        },
                      }),
                    }}
                    onMouseEnter={(e) => {
                      if (!isUpdating) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = priorityColor.border;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 4px 12px ${priorityColor.border}30`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isUpdating) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = priorityColor.border;
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {/* Header do Card */}
                    <div style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#fff',
                          marginBottom: 6,
                        }}
                      >
                        {lead.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#b5b1c6',
                          marginBottom: 4,
                        }}
                      >
                        {lead.email}
                      </div>
                      {lead.company && (
                        <div
                          style={{
                            fontSize: 12,
                            color: '#9f9bb0',
                            marginTop: 4,
                          }}
                        >
                          {lead.company}
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    <div
                      style={{
                        display: 'flex',
                        gap: 8,
                        flexWrap: 'wrap',
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: priorityColor.bg,
                          color: priorityColor.text,
                          border: `1px solid ${priorityColor.border}`,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {priorityLabels[lead.priority] || lead.priority}
                      </span>
                      {lead.assignedTo && (
                        <span
                          style={{
                            fontSize: 11,
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: 'rgba(139,92,246,0.15)',
                            color: '#c4b5fd',
                            border: '1px solid rgba(139,92,246,0.35)',
                            fontWeight: 600,
                          }}
                        >
                          👤 {lead.assignedTo.name || lead.assignedTo.email.split('@')[0]}
                        </span>
                      )}
                    </div>

                    {/* Info do Projeto */}
                    {lead.projectType && (
                      <div
                        style={{
                          fontSize: 12,
                          color: '#d3cec3',
                          marginBottom: 8,
                          padding: '8px 10px',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: 6,
                        }}
                      >
                        <strong style={{ color: '#9f9bb0' }}>Projeto:</strong> {lead.projectType}
                      </div>
                    )}

                    {lead.budget && (
                      <div
                        style={{
                          fontSize: 12,
                          color: '#d3cec3',
                          marginBottom: 8,
                        }}
                      >
                        <strong style={{ color: '#9f9bb0' }}>Budget:</strong> {lead.budget}
                      </div>
                    )}

                    {/* Loading indicator */}
                    {isUpdating && (
                      <div
                        style={{
                          fontSize: 11,
                          color: '#9f9bb0',
                          textAlign: 'center',
                          marginTop: 8,
                          fontStyle: 'italic',
                        }}
                      >
                        Atualizando...
                      </div>
                    )}
                  </div>
                );
              })}

              {columnLeads.length === 0 && (
                <div
                  style={{
                    padding: 40,
                    textAlign: 'center',
                    color: '#8f8ba2',
                    fontSize: 14,
                    fontStyle: 'italic',
                  }}
                >
                  Nenhum lead nesta etapa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

