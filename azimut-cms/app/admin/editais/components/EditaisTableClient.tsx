'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STATUS_LABEL: Record<string, string> = {
  ABERTO: 'Aberto',
  FECHADO: 'Fechado',
  ENVIADO: 'Enviado',
  GANHO: 'Ganho',
  PERDIDO: 'Perdido',
};

const COUNTRY_LABEL: Record<string, string> = {
  BR: 'Brasil',
  CA: 'Canadá',
  EU: 'Europa',
  US: 'EUA',
  INTL: 'Internacional',
};

function formatDate(d: Date | string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

type EditalRow = {
  id: string;
  name: string;
  sourceUrl: string;
  country: string;
  deadline: Date | string | null;
  status: string;
  area: string;
};

export function EditaisTableClient({ editais }: { editais: EditalRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const abertos = editais.filter((e) => e.status === 'ABERTO');
  const outros = editais.filter((e) => e.status !== 'ABERTO');

  async function handleRemove(id: string, name: string) {
    if (!confirm(`Remover o edital "${name}"? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/editais/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao remover');
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Erro ao remover edital');
    } finally {
      setDeletingId(null);
    }
  }

  const rowStyle = (isAberto: boolean) => ({
    borderBottom: '1px solid rgba(255,255,255,0.06)' as const,
    opacity: isAberto ? 1 : 0.85,
  });

  const linkStyle = { color: '#7dd3fc', textDecoration: 'none' as const, fontSize: 13 };
  const linkStyleMuted = { color: '#94a3b8', textDecoration: 'none' as const, fontSize: 13 };
  const buttonDanger = {
    padding: '4px 10px',
    borderRadius: 6,
    border: '1px solid rgba(248,113,113,0.4)',
    background: 'transparent',
    color: '#f87171',
    fontSize: 12,
    cursor: 'pointer',
    marginLeft: 8,
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', textAlign: 'left' }}>
            <th style={{ padding: '12px 12px 12px 0', color: '#94a3b8', fontWeight: 600 }}>Nome</th>
            <th style={{ padding: '12px', color: '#94a3b8', fontWeight: 600 }}>Área</th>
            <th style={{ padding: '12px', color: '#94a3b8', fontWeight: 600 }}>País</th>
            <th style={{ padding: '12px', color: '#94a3b8', fontWeight: 600 }}>Prazo</th>
            <th style={{ padding: '12px', color: '#94a3b8', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '12px 12px 12px 0', color: '#94a3b8', fontWeight: 600 }}></th>
          </tr>
        </thead>
        <tbody>
          {abertos.map((e) => (
            <tr key={e.id} style={rowStyle(true)}>
              <td style={{ padding: '12px 12px 12px 0' }}>
                <a
                  href={e.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#f87171', textDecoration: 'none' }}
                >
                  {e.name}
                </a>
              </td>
              <td style={{ padding: 12, color: '#cbd5e1' }}>{e.area || '—'}</td>
              <td style={{ padding: 12, color: '#cbd5e1' }}>{COUNTRY_LABEL[e.country] || e.country}</td>
              <td style={{ padding: 12, color: '#cbd5e1' }}>{formatDate(e.deadline)}</td>
              <td style={{ padding: 12 }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'rgba(34,197,94,0.2)',
                    color: '#86efac',
                  }}
                >
                  {STATUS_LABEL[e.status] || e.status}
                </span>
              </td>
              <td style={{ padding: '12px 0 12px 12px' }}>
                <Link href={`/admin/editais/${e.id}`} style={linkStyle}>
                  Editar
                </Link>
                <button
                  type="button"
                  style={buttonDanger}
                  disabled={deletingId === e.id}
                  onClick={() => handleRemove(e.id, e.name)}
                >
                  {deletingId === e.id ? 'Removendo...' : 'Remover'}
                </button>
              </td>
            </tr>
          ))}
          {outros.map((e) => (
            <tr key={e.id} style={rowStyle(false)}>
              <td style={{ padding: '12px 12px 12px 0', color: '#94a3b8' }}>{e.name}</td>
              <td style={{ padding: 12, color: '#94a3b8' }}>{e.area || '—'}</td>
              <td style={{ padding: 12, color: '#94a3b8' }}>{COUNTRY_LABEL[e.country] || e.country}</td>
              <td style={{ padding: 12, color: '#94a3b8' }}>{formatDate(e.deadline)}</td>
              <td style={{ padding: 12 }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'rgba(148,163,184,0.2)',
                    color: '#cbd5e1',
                  }}
                >
                  {STATUS_LABEL[e.status] || e.status}
                </span>
              </td>
              <td style={{ padding: '12px 0 12px 12px' }}>
                <Link href={`/admin/editais/${e.id}`} style={linkStyleMuted}>
                  Editar
                </Link>
                <button
                  type="button"
                  style={buttonDanger}
                  disabled={deletingId === e.id}
                  onClick={() => handleRemove(e.id, e.name)}
                >
                  {deletingId === e.id ? 'Removendo...' : 'Remover'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
