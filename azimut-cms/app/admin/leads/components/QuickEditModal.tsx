'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QuickEditModalProps {
  lead: {
    id: string;
    status: string;
    priority: string;
    assignedToId: string | null;
    notes: string | null;
  };
  users: Array<{ id: string; name: string | null; email: string }>;
  onClose: () => void;
}

export function QuickEditModal({ lead, users, onClose }: QuickEditModalProps) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [priority, setPriority] = useState(lead.priority);
  const [assignedToId, setAssignedToId] = useState(lead.assignedToId || '');
  const [notes, setNotes] = useState(lead.notes || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          priority,
          assignedToId: assignedToId || null,
          notes: notes || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao atualizar');
      }

      setMessage({ type: 'success', text: 'Salvo com sucesso!' });
      setTimeout(() => {
        router.refresh();
        onClose();
      }, 1000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao salvar' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 24,
          maxWidth: 500,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>
            ✏️ Editar Lead
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9f9bb0',
              fontSize: 24,
              cursor: 'pointer',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#9f9bb0';
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 16 }}>
            {/* Status */}
            <div>
              <label
                style={{
                  color: '#9f9bb0',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,35,55,0.5)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                }}
              >
                <option value="NEW">🆕 Novo Lead</option>
                <option value="CONTACTED">📞 Contato Feito</option>
                <option value="PROPOSAL_SENT">💼 Proposta Enviada</option>
                <option value="NEGOTIATION">🤝 Em Negociação</option>
                <option value="WON">✅ Ganho</option>
                <option value="LOST">❌ Perdido</option>
              </select>
            </div>

            {/* Prioridade */}
            <div>
              <label
                style={{
                  color: '#9f9bb0',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                Prioridade
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,35,55,0.5)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                }}
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
              </select>
            </div>

            {/* Responsável */}
            <div>
              <label
                style={{
                  color: '#9f9bb0',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                Responsável
              </label>
              <select
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,35,55,0.5)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                }}
              >
                <option value="">Nenhum (não atribuído)</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Notas */}
            <div>
              <label
                style={{
                  color: '#9f9bb0',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                Notas Internas
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Adicione notas sobre este lead..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: 14,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,35,55,0.5)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                }}
              />
            </div>

            {message && (
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 8,
                  border: `1px solid ${
                    message.type === 'success'
                      ? 'rgba(34,197,94,0.35)'
                      : 'rgba(201,35,55,0.35)'
                  }`,
                  background:
                    message.type === 'success'
                      ? 'rgba(34,197,94,0.12)'
                      : 'rgba(201,35,55,0.12)',
                  color: message.type === 'success' ? '#86efac' : '#fca5a5',
                  fontSize: 14,
                }}
              >
                {message.text}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 10,
                  border: 'none',
                  background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: loading
                    ? 'none'
                    : '0 4px 12px rgba(201,35,55,0.3)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#d63447';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(201,35,55,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#c92337';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201,35,55,0.3)';
                  }
                }}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
