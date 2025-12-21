'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 42,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  padding: '0 12px',
  outline: 'none',
  fontSize: 14,
  fontFamily: 'inherit',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: 'auto',
  padding: '12px',
  resize: 'vertical',
  minHeight: 80,
};

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    seoTitlePt: '',
    seoTitleEn: '',
    seoDescPt: '',
    seoDescEn: '',
    heroSloganPt: '',
    heroSloganEn: '',
    heroSloganEs: '',
    heroSloganFr: '',
    status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
  });

  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        if (!res.ok) {
          setError('Página não encontrada');
          setLoading(false);
          return;
        }
        const page = await res.json();
        setFormData({
          name: page.name || '',
          seoTitlePt: page.seoTitlePt || '',
          seoTitleEn: page.seoTitleEn || '',
          seoDescPt: page.seoDescPt || '',
          seoDescEn: page.seoDescEn || '',
          heroSloganPt: page.heroSloganPt || '',
          heroSloganEn: page.heroSloganEn || '',
          heroSloganEs: page.heroSloganEs || '',
          heroSloganFr: page.heroSloganFr || '',
          status: page.status || 'PUBLISHED',
        });
      } catch (err) {
        setError('Erro ao carregar página');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPage();
    }
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao atualizar página');
        setSaving(false);
        return;
      }

      // Sucesso - redirecionar ou mostrar mensagem
      router.push('/admin/pages');
    } catch (err) {
      setError('Erro de rede ao atualizar página');
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ color: '#c0bccf' }}>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Link
            href="/admin/pages"
            style={{
              color: '#c0bccf',
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            ← Voltar para Páginas
          </Link>
        </div>
        <h1 style={{ margin: 0, fontSize: 32, marginBottom: 8, fontWeight: 700 }}>
          Editar Página: {formData.name}
        </h1>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
          Atualize informações da página, SEO e slogan do hero.
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
          gap: 24,
          maxWidth: 900,
        }}
      >
        {/* Informações Básicas */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
            Informações Básicas
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Nome da Página *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
                placeholder="Home"
              />
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
                style={inputStyle}
              >
                <option value="DRAFT">Rascunho</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Slogan do Hero */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
            Slogan do Hero
          </h2>
          <p style={{ fontSize: 13, color: '#a0a0a0', marginBottom: 16 }}>
            Texto exibido no hero da página inicial. Editável para atualizações futuras (ex: 2027).
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>
                Slogan (Português) 🇧🇷
              </label>
              <input
                type="text"
                value={formData.heroSloganPt}
                onChange={(e) =>
                  setFormData({ ...formData, heroSloganPt: e.target.value })
                }
                style={inputStyle}
                placeholder="Experiências que Conectam Mundos"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>
                Slogan (English) 🇺🇸
              </label>
              <input
                type="text"
                value={formData.heroSloganEn}
                onChange={(e) =>
                  setFormData({ ...formData, heroSloganEn: e.target.value })
                }
                style={inputStyle}
                placeholder="Experiences that Connect Worlds"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>
                Slogan (Español) 🇪🇸
              </label>
              <input
                type="text"
                value={formData.heroSloganEs}
                onChange={(e) =>
                  setFormData({ ...formData, heroSloganEs: e.target.value })
                }
                style={inputStyle}
                placeholder="Experiencias que Conectan Mundos"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>
                Slogan (Français) 🇫🇷
              </label>
              <input
                type="text"
                value={formData.heroSloganFr}
                onChange={(e) =>
                  setFormData({ ...formData, heroSloganFr: e.target.value })
                }
                style={inputStyle}
                placeholder="Expériences qui Connectent les Mondes"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
            SEO
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Título SEO (PT)</label>
              <input
                type="text"
                value={formData.seoTitlePt}
                onChange={(e) =>
                  setFormData({ ...formData, seoTitlePt: e.target.value })
                }
                style={inputStyle}
                placeholder="Azimut - Experiências Imersivas"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Título SEO (EN)</label>
              <input
                type="text"
                value={formData.seoTitleEn}
                onChange={(e) =>
                  setFormData({ ...formData, seoTitleEn: e.target.value })
                }
                style={inputStyle}
                placeholder="Azimut - Immersive Experiences"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição SEO (PT)</label>
              <textarea
                value={formData.seoDescPt}
                onChange={(e) =>
                  setFormData({ ...formData, seoDescPt: e.target.value })
                }
                style={textareaStyle}
                placeholder="Descrição para buscadores em português"
                rows={3}
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição SEO (EN)</label>
              <textarea
                value={formData.seoDescEn}
                onChange={(e) =>
                  setFormData({ ...formData, seoDescEn: e.target.value })
                }
                style={textareaStyle}
                placeholder="Description for search engines in English"
                rows={3}
              />
            </div>
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: 'rgba(201,35,55,0.12)',
              border: '1px solid rgba(201,35,55,0.35)',
              color: '#fca5a5',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: 'none',
              background: '#c92337',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              opacity: saving ? 0.8 : 1,
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </>
  );
}

