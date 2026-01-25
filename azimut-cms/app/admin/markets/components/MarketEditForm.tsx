'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const inputStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
};

export function MarketEditForm({ market }: { market: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    code: market?.code || '',
    labelPt: market?.labelPt || '',
    labelEn: market?.labelEn || '',
    labelEs: market?.labelEs || '',
    labelFr: market?.labelFr || '',
    priority: market?.priority || 0,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const url = market?.id 
        ? `/api/admin/markets/${market.id}`
        : '/api/admin/markets';
      
      const method = market?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar mercado');
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: market?.id ? 'Mercado atualizado com sucesso!' : 'Mercado criado com sucesso!' });
      setTimeout(() => {
        router.push('/admin/markets');
        router.refresh();
      }, 1000);
    } catch (err) {
      setError('Erro de rede ao salvar mercado');
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja deletar este mercado?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/markets/${market.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao deletar mercado');
      }

      router.push('/admin/markets');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <Link
          href="/admin/markets"
          style={{
            color: '#9f9bb0',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          ← Voltar para Mercados
        </Link>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {market?.id ? `Editar: ${market.labelPt}` : 'Novo Mercado'}
        </h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>
          {market?.id ? 'Edite as informações do mercado.' : 'Crie um novo mercado para o card "Retrato do Estúdio".'}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          display: 'grid',
          gap: 20,
          maxWidth: 800,
        }}
      >
        {(error || message) && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              border: `1px solid ${
                message?.type === 'success'
                  ? 'rgba(34,197,94,0.35)'
                  : 'rgba(201,35,55,0.35)'
              }`,
              background:
                message?.type === 'success'
                  ? 'rgba(34,197,94,0.12)'
                  : 'rgba(201,35,55,0.12)',
              color: message?.type === 'success' ? '#86efac' : '#fca5a5',
            }}
          >
            {message?.text || error}
          </div>
        )}

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Code (Slug) *</label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            required
            disabled={!!market?.id}
            style={{ ...inputStyle, opacity: market?.id ? 0.6 : 1 }}
            placeholder="museus-exposicoes"
          />
          <small style={{ color: '#9f9bb0', fontSize: 12 }}>
            {market?.id ? 'Code não pode ser alterado após criação.' : 'Identificador único (slug). Ex: museus-exposicoes'}
          </small>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Label PT *</label>
            <input
              type="text"
              value={formData.labelPt}
              onChange={(e) => setFormData({ ...formData, labelPt: e.target.value })}
              required
              style={inputStyle}
              placeholder="Museus & Exposições"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Label EN *</label>
            <input
              type="text"
              value={formData.labelEn}
              onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
              required
              style={inputStyle}
              placeholder="Museums & Exhibitions"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Label ES</label>
            <input
              type="text"
              value={formData.labelEs}
              onChange={(e) => setFormData({ ...formData, labelEs: e.target.value })}
              style={inputStyle}
              placeholder="Museos & Exposiciones"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Label FR</label>
            <input
              type="text"
              value={formData.labelFr}
              onChange={(e) => setFormData({ ...formData, labelFr: e.target.value })}
              style={inputStyle}
              placeholder="Musées & Expositions"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Prioridade</label>
          <input
            type="number"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
            style={inputStyle}
            min={0}
          />
          <small style={{ color: '#9f9bb0', fontSize: 12 }}>
            Ordem de exibição (menor número aparece primeiro)
          </small>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Salvando...' : market?.id ? 'Salvar Alterações' : 'Criar Mercado'}
          </button>
          <Link
            href="/admin/markets"
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            Cancelar
          </Link>
          {market?.id && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.1)',
                color: '#fca5a5',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginLeft: 'auto',
              }}
            >
              Deletar
            </button>
          )}
        </div>
      </form>
    </>
  );
}
