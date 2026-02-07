'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  fontSize: 14,
  boxSizing: 'border-box',
};

const EDITAL_TYPES = ['FEDERAL', 'ESTADUAL', 'MUNICIPAL', 'PRIVADO', 'ONG', 'INSTITUTO', 'PROVINCIAL', 'NATIONAL'];
const STATUS_OPTIONS = ['ABERTO', 'FECHADO', 'ENVIADO', 'GANHO', 'PERDIDO'];
const COUNTRIES = [
  { value: 'BR', label: 'Brasil' },
  { value: 'CA', label: 'Canadá' },
  { value: 'EU', label: 'Europa' },
  { value: 'US', label: 'EUA' },
  { value: 'INTL', label: 'Internacional' },
];

interface EditalEditFormProps {
  edital?: any;
}

export function EditalEditForm({ edital }: EditalEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    sourceUrl: '',
    country: 'BR',
    type: 'FEDERAL',
    area: '',
    categories: '' as string,
    deadline: '',
    status: 'ABERTO',
    eligibility: '',
    description: '',
  });

  useEffect(() => {
    if (edital) {
      setFormData({
        name: edital.name || '',
        source: edital.source || '',
        sourceUrl: edital.sourceUrl || '',
        country: edital.country || 'BR',
        type: edital.type || 'FEDERAL',
        area: edital.area || '',
        categories: Array.isArray(edital.categories) ? edital.categories.join(', ') : '',
        deadline: edital.deadline ? new Date(edital.deadline).toISOString().slice(0, 10) : '',
        status: edital.status || 'ABERTO',
        eligibility: edital.eligibility || '',
        description: edital.description || '',
      });
    }
  }, [edital]);

  async function handleRemove() {
    if (!edital) return;
    if (!confirm(`Remover o edital "${edital.name}"? Esta ação não pode ser desfeita.`)) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/editais/${edital.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao remover');
      router.push('/admin/editais');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao remover');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        source: formData.source.trim() || 'Manual',
        sourceUrl: formData.sourceUrl.trim(),
        country: formData.country,
        type: formData.type,
        area: formData.area.trim(),
        categories: formData.categories.split(',').map((s) => s.trim()).filter(Boolean),
        deadline: formData.deadline || null,
        status: formData.status,
        eligibility: formData.eligibility.trim() || null,
        description: formData.description.trim() || null,
      };

      if (edital) {
        const res = await fetch(`/api/admin/editais/${edital.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao atualizar');
        router.push('/admin/editais');
        router.refresh();
      } else {
        const res = await fetch('/api/admin/editais', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao criar');
        router.push('/admin/editais');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/editais" style={{ color: '#7dd3fc', textDecoration: 'none', fontSize: 14 }}>
          ← Voltar para Editais
        </Link>
      </div>
      <h1 style={{ margin: '0 0 24px', fontSize: 28, fontWeight: 700 }}>
        {edital ? 'Editar edital' : 'Novo edital'}
      </h1>

      {error && (
        <div
          style={{
            padding: 14,
            marginBottom: 20,
            borderRadius: 10,
            border: '1px solid rgba(201,35,55,0.4)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Nome *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
            placeholder="Ex: Lei Rouanet - Projetos Culturais"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>URL (link oficial) *</label>
          <input
            type="url"
            required
            value={formData.sourceUrl}
            onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
            style={inputStyle}
            placeholder="https://..."
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Fonte (nome curto)</label>
          <input
            type="text"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            style={inputStyle}
            placeholder="Ex: Ministério da Cultura"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>País *</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              style={inputStyle}
            >
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value} style={{ background: '#0f172a', color: '#fff' }}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={inputStyle}
            >
              {EDITAL_TYPES.map((t) => (
                <option key={t} value={t} style={{ background: '#0f172a', color: '#fff' }}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Área *</label>
          <input
            type="text"
            required
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            style={inputStyle}
            placeholder="Ex: Cultura / Exposições / Museus"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Categorias (separadas por vírgula)</label>
          <input
            type="text"
            value={formData.categories}
            onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
            style={inputStyle}
            placeholder="Ex: Cultura, Incentivo fiscal, Empresa"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Prazo (data)</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={inputStyle}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} style={{ background: '#0f172a', color: '#fff' }}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Eligibilidade</label>
          <input
            type="text"
            value={formData.eligibility}
            onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
            style={inputStyle}
            placeholder="Ex: Empresa, MEI, Coprodução"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Descrição (opcional)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
            placeholder="Breve descrição do edital"
          />
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
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14,
            }}
          >
            {loading ? 'Salvando...' : edital ? 'Atualizar' : 'Criar edital'}
          </button>
          <Link
            href="/admin/editais"
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#cbd5e1',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Cancelar
          </Link>
          {edital && (
            <button
              type="button"
              disabled={loading}
              onClick={handleRemove}
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                border: '1px solid rgba(248,113,113,0.5)',
                background: 'transparent',
                color: '#f87171',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 14,
              }}
            >
              Remover edital
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
