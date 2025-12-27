'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Section {
  id: string;
  order: number;
  type: string;
  titlePt?: string;
  titleEn?: string;
  bodyPt?: string;
  bodyEn?: string;
}

interface Page {
  id: string;
  name: string;
  slug: string;
  seoTitlePt?: string;
  seoTitleEn?: string;
  seoDescPt?: string;
  seoDescEn?: string;
  heroSloganPt?: string;
  heroSloganEn?: string;
  heroSloganEs?: string;
  heroSloganFr?: string;
  status: string;
  sections?: Section[];
}

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [page, setPage] = useState<Page | null>(null);
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
    status: 'PUBLISHED',
  });

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        if (!res.ok) {
          throw new Error('Página não encontrada');
        }
        const data = await res.json();
        setPage(data);
        setFormData({
          name: data.name || '',
          seoTitlePt: data.seoTitlePt || '',
          seoTitleEn: data.seoTitleEn || '',
          seoDescPt: data.seoDescPt || '',
          seoDescEn: data.seoDescEn || '',
          heroSloganPt: data.heroSloganPt || '',
          heroSloganEn: data.heroSloganEn || '',
          heroSloganEs: data.heroSloganEs || '',
          heroSloganFr: data.heroSloganFr || '',
          status: data.status || 'PUBLISHED',
        });
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Erro ao carregar página');
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchPage();
    }
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao salvar');
      }

      router.push('/admin/site-pages');
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || 'Erro ao salvar página');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#c0bccf' }}>
        Carregando...
      </div>
    );
  }

  if (error && !page) {
    return (
      <div
        style={{
          padding: '12px 14px',
          borderRadius: 10,
          border: '1px solid rgba(201,35,55,0.35)',
          background: 'rgba(201,35,55,0.12)',
          color: '#fca5a5',
        }}
      >
        {error}
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'inherit',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: 100,
    resize: 'vertical',
  };

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
          Editar Página: {page?.name}
        </h1>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
          Slug: /{slug}
        </p>
      </header>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(201,35,55,0.35)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 24 }}>
        {/* Informações Básicas */}
        <section
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 600 }}>
            Informações Básicas
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Nome da Página *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={inputStyle}
              >
                <option value="PUBLISHED">Publicado</option>
                <option value="DRAFT">Rascunho</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
            </div>
          </div>
        </section>

        {/* Hero Slogan */}
        <section
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 600 }}>
            Hero Slogan (Texto do Head)
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Slogan (Português)
              </label>
              <textarea
                value={formData.heroSloganPt}
                onChange={(e) => setFormData({ ...formData, heroSloganPt: e.target.value })}
                style={textareaStyle}
                placeholder="Texto exibido no topo da página"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Slogan (English)
              </label>
              <textarea
                value={formData.heroSloganEn}
                onChange={(e) => setFormData({ ...formData, heroSloganEn: e.target.value })}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Slogan (Español)
              </label>
              <textarea
                value={formData.heroSloganEs}
                onChange={(e) => setFormData({ ...formData, heroSloganEs: e.target.value })}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Slogan (Français)
              </label>
              <textarea
                value={formData.heroSloganFr}
                onChange={(e) => setFormData({ ...formData, heroSloganFr: e.target.value })}
                style={textareaStyle}
              />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 600 }}>
            SEO
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Título SEO (PT)
              </label>
              <input
                type="text"
                value={formData.seoTitlePt}
                onChange={(e) => setFormData({ ...formData, seoTitlePt: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Título SEO (EN)
              </label>
              <input
                type="text"
                value={formData.seoTitleEn}
                onChange={(e) => setFormData({ ...formData, seoTitleEn: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Descrição SEO (PT)
              </label>
              <textarea
                value={formData.seoDescPt}
                onChange={(e) => setFormData({ ...formData, seoDescPt: e.target.value })}
                style={textareaStyle}
                maxLength={160}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Descrição SEO (EN)
              </label>
              <textarea
                value={formData.seoDescEn}
                onChange={(e) => setFormData({ ...formData, seoDescEn: e.target.value })}
                style={textareaStyle}
                maxLength={160}
              />
            </div>
          </div>
        </section>

        {/* Seções - Placeholder */}
        {page?.sections && page.sections.length > 0 && (
          <section
            style={{
              padding: 24,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 600 }}>
              Seções ({page.sections.length})
            </h2>
            <p style={{ color: '#9f9bb0', fontSize: 14 }}>
              Gerenciamento de seções será implementado em breve.
            </p>
          </section>
        )}

        {/* Botões */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => router.push('/admin/site-pages')}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: '#e8e6f2',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: saving ? 'rgba(201,35,55,0.5)' : '#c92337',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              border: 'none',
            }}
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
