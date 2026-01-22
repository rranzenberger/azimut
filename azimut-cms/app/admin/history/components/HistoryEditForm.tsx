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

export function HistoryEditForm({ history }: { history?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    year: history?.year || new Date().getFullYear(),
    yearEnd: history?.yearEnd || '',
    type: history?.type || 'milestone',
    titlePt: history?.titlePt || '',
    titleEn: history?.titleEn || '',
    titleEs: history?.titleEs || '',
    titleFr: history?.titleFr || '',
    descriptionPt: history?.descriptionPt || '',
    descriptionEn: history?.descriptionEn || '',
    descriptionEs: history?.descriptionEs || '',
    descriptionFr: history?.descriptionFr || '',
    bulletsPt: (history?.bulletsPt || []).join('\n'),
    bulletsEn: (history?.bulletsEn || []).join('\n'),
    bulletsEs: (history?.bulletsEs || []).join('\n'),
    bulletsFr: (history?.bulletsFr || []).join('\n'),
    icon: history?.icon || '',
    logoUrl: history?.logoUrl || '',
    externalLink: history?.externalLink || '',
    isPublished: history?.isPublished !== undefined ? history.isPublished : true,
    isFeatured: history?.isFeatured || false,
    displayOrder: history?.displayOrder || 0,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      // Converter bullets de string para array
      const bulletsPt = formData.bulletsPt ? formData.bulletsPt.split('\n').filter(s => s.trim()) : [];
      const bulletsEn = formData.bulletsEn ? formData.bulletsEn.split('\n').filter(s => s.trim()) : [];
      const bulletsEs = formData.bulletsEs ? formData.bulletsEs.split('\n').filter(s => s.trim()) : [];
      const bulletsFr = formData.bulletsFr ? formData.bulletsFr.split('\n').filter(s => s.trim()) : [];

      const payload = {
        ...formData,
        yearEnd: formData.yearEnd ? parseInt(formData.yearEnd.toString()) : null,
        bulletsPt,
        bulletsEn,
        bulletsEs,
        bulletsFr,
      };

      const url = history ? `/api/admin/history/${history.id}` : '/api/admin/history';
      const method = history ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar evento');
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: history ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!' });
      setTimeout(() => {
        router.push('/admin/history');
        router.refresh();
      }, 1000);
      setLoading(false);
    } catch (err) {
      setError('Erro de rede ao salvar evento');
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!history || !confirm('Tem certeza que deseja deletar este evento?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/history/${history.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao deletar evento');
      }

      router.push('/admin/history');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <Link
          href="/admin/history"
          style={{
            color: '#9f9bb0',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          ← Voltar para Timeline
        </Link>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {history ? (
            <>
              {history.icon && <span style={{ marginRight: 12 }}>{history.icon}</span>}
              {history.titlePt}
            </>
          ) : (
            'Novo Evento Histórico'
          )}
        </h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>
          {history ? 'Edite as informações do evento.' : 'Preencha as informações do novo evento.'}
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
          maxWidth: 1000,
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ano *</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
              required
              style={inputStyle}
              min={1900}
              max={2100}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ano Final (opcional)</label>
            <input
              type="number"
              value={formData.yearEnd}
              onChange={(e) => setFormData({ ...formData, yearEnd: e.target.value ? parseInt(e.target.value) : '' })}
              style={inputStyle}
              min={1900}
              max={2100}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Tipo *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
              style={inputStyle}
            >
              <option value="milestone">Marco</option>
              <option value="partnership">Parceria</option>
              <option value="project">Projeto</option>
              <option value="award">Prêmio</option>
              <option value="location">Localização</option>
              <option value="other">Outro</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título PT *</label>
            <input
              type="text"
              value={formData.titlePt}
              onChange={(e) => setFormData({ ...formData, titlePt: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título EN *</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título ES</label>
            <input
              type="text"
              value={formData.titleEs}
              onChange={(e) => setFormData({ ...formData, titleEs: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título FR</label>
            <input
              type="text"
              value={formData.titleFr}
              onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição PT</label>
          <textarea
            value={formData.descriptionPt}
            onChange={(e) => setFormData({ ...formData, descriptionPt: e.target.value })}
            style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição EN</label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Bullets PT (um por linha)</label>
          <textarea
            value={formData.bulletsPt}
            onChange={(e) => setFormData({ ...formData, bulletsPt: e.target.value })}
            style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
            placeholder="Item 1&#10;Item 2&#10;Item 3"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ícone (Emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              style={inputStyle}
              maxLength={2}
              placeholder="🏆"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ordem de Exibição</label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              style={inputStyle}
              min={0}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Status</label>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: 14 }}>Publicado</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: 14 }}>Destaque</span>
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>URL Logo (opcional)</label>
          <input
            type="url"
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            style={inputStyle}
            placeholder="https://..."
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Link Externo (opcional)</label>
          <input
            type="url"
            value={formData.externalLink}
            onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
            style={inputStyle}
            placeholder="https://..."
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
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Salvando...' : history ? 'Salvar Alterações' : 'Criar Evento'}
          </button>
          <Link
            href="/admin/history"
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
          {history && (
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
