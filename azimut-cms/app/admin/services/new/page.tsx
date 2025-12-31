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

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    titlePt: '',
    titleEn: '',
    titleEs: '',
    titleFr: '',
    descriptionPt: '',
    descriptionEn: '',
    descriptionEs: '',
    descriptionFr: '',
    icon: '',
    status: 'PUBLISHED',
    priority: 0,
    segments: '',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Converter segments de string para array
      const segmentsArray = formData.segments
        ? formData.segments.split(',').map(s => s.trim()).filter(s => s)
        : [];

      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          segments: segmentsArray,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao criar serviço');
        setLoading(false);
        return;
      }

      router.push(`/admin/services/${data.service.id}`);
    } catch (err) {
      setError('Erro de rede ao criar serviço');
      setLoading(false);
    }
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <Link
          href="/admin/services"
          style={{
            color: '#9f9bb0',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          ← Voltar para Serviços
        </Link>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          Novo Serviço
        </h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>Crie um novo serviço oferecido pela Azimut.</p>
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
        {error && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid rgba(201,35,55,0.35)',
              background: 'rgba(201,35,55,0.12)',
              color: '#fca5a5',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            required
            style={inputStyle}
            placeholder="exemplo-servico"
          />
          <small style={{ color: '#8f8ba2', fontSize: 12 }}>
            URL amigável (sem espaços, apenas letras, números e hífens)
          </small>
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
              placeholder="Título em português"
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
              placeholder="Title in English"
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
              placeholder="Título en español"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título FR</label>
            <input
              type="text"
              value={formData.titleFr}
              onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
              style={inputStyle}
              placeholder="Titre en français"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição PT</label>
          <textarea
            value={formData.descriptionPt}
            onChange={(e) => setFormData({ ...formData, descriptionPt: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            placeholder="Descrição em português"
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição EN</label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            placeholder="Description in English"
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Ícone (Emoji)</label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            style={inputStyle}
            placeholder="🎨 ou 🚀 ou 📱"
            maxLength={2}
          />
          <small style={{ color: '#8f8ba2', fontSize: 12 }}>
            Use um emoji para representar o serviço
          </small>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={inputStyle}
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="ARCHIVED">Arquivado</option>
            </select>
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
            <small style={{ color: '#8f8ba2', fontSize: 12 }}>
              Maior número = maior prioridade na listagem
            </small>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Segmentos</label>
          <input
            type="text"
            value={formData.segments}
            onChange={(e) => setFormData({ ...formData, segments: e.target.value })}
            style={inputStyle}
            placeholder="Museus, VR, Tecnologia (separados por vírgula)"
          />
          <small style={{ color: '#8f8ba2', fontSize: 12 }}>
            Separe os segmentos por vírgula
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
            {loading ? 'Criando...' : 'Criar Serviço'}
          </button>
          <Link
            href="/admin/services"
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
        </div>
      </form>
    </>
  );
}

