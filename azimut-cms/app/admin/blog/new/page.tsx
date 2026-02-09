'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MediaPreviewBlock from '@/components/admin/MediaPreviewBlock';
import UnifiedMediaUpload from '@/components/admin/UnifiedMediaUpload';

interface Category {
  id: string;
  slug: string;
  namePt: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'pt' | 'en' | 'es' | 'fr'>('pt');
  const [allMedia, setAllMedia] = useState<{ id: string; type: 'IMAGE' | 'VIDEO'; originalUrl: string; thumbnailUrl?: string; altPt?: string }[]>([]);

  const [formData, setFormData] = useState({
    slug: '',
    titlePt: '',
    titleEn: '',
    titleEs: '',
    titleFr: '',
    excerptPt: '',
    excerptEn: '',
    excerptEs: '',
    excerptFr: '',
    contentPt: '',
    contentEn: '',
    contentEs: '',
    contentFr: '',
    coverImageId: '',
    coverImageUrl: '',
    coverImageAlt: '',
    authorName: '',
    readingTimeMin: 5,
    status: 'DRAFT',
    featured: false,
    categoryId: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetch('/api/admin/media?limit=100')
      .then((res) => (res.ok ? res.json() : { media: [] }))
      .then((data) => {
        const list = (data.media || []).map((m: any) => ({
          id: m.id,
          type: m.type || 'IMAGE',
          originalUrl: m.originalUrl || '',
          thumbnailUrl: m.thumbnailUrl || m.mediumUrl,
          altPt: m.altPt,
        }));
        setAllMedia(list);
      })
      .catch(() => {});
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/admin/blog/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryId: formData.categoryId || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao criar post');
        setLoading(false);
        return;
      }

      router.push(`/admin/blog/${data.post.id}`);
    } catch (err) {
      setError('Erro de rede ao criar post');
      setLoading(false);
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const tabs = [
    { key: 'pt', label: '🇧🇷 PT', flag: '🇧🇷' },
    { key: 'en', label: '🇨🇦 EN', flag: '🇨🇦' },
    { key: 'es', label: '🇪🇸 ES', flag: '🇪🇸' },
    { key: 'fr', label: '🇫🇷 FR', flag: '🇫🇷' },
  ] as const;

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26 }}>✨ Novo Post</h1>
        <p style={{ margin: 4, color: '#a0a0a0' }}>Crie um novo artigo para o blog.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: 24,
          maxWidth: 900,
        }}
      >
        {/* Preview: capa como no site */}
        <MediaPreviewBlock
          title="Capa do post — como aparece no site"
          mainLabel="Imagem de capa"
          mainImageUrl={formData.coverImageUrl || null}
          mainTitle={formData.titlePt || 'Título do post'}
          mainOnly
        />

        {/* Informações Básicas */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>📋 Informações Básicas</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Título (Português) *</label>
              <input
                type="text"
                value={formData.titlePt}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({ 
                    ...formData, 
                    titlePt: title,
                    slug: formData.slug || generateSlug(title),
                  });
                }}
                required
                style={inputStyle}
                placeholder="Título do artigo em português"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                required
                style={inputStyle}
                placeholder="url-do-artigo"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={labelStyle}>Título (English) *</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              required
              style={inputStyle}
              placeholder="Article title in English"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Título (Español)</label>
              <input
                type="text"
                value={formData.titleEs}
                onChange={(e) => setFormData({ ...formData, titleEs: e.target.value })}
                style={inputStyle}
                placeholder="Título del artículo en español"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Título (Français)</label>
              <input
                type="text"
                value={formData.titleFr}
                onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                style={inputStyle}
                placeholder="Titre de l'article en français"
              />
            </div>
          </div>
        </section>

        {/* Resumo e Conteúdo por idioma */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>📝 Conteúdo</h2>
          
          {/* Tabs de idioma */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid',
                  borderColor: activeTab === tab.key ? '#c92337' : 'rgba(255,255,255,0.1)',
                  background: activeTab === tab.key ? 'rgba(201,35,55,0.15)' : 'transparent',
                  color: activeTab === tab.key ? '#c92337' : '#a0a0a0',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conteúdo do tab ativo */}
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>
                Resumo ({tabs.find(t => t.key === activeTab)?.label})
              </label>
              <textarea
                value={formData[`excerpt${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [`excerpt${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]: e.target.value 
                })}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', height: 'auto' }}
                placeholder="Breve resumo que aparece na listagem..."
              />
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>
                Conteúdo ({tabs.find(t => t.key === activeTab)?.label})
              </label>
              <textarea
                value={formData[`content${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [`content${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]: e.target.value 
                })}
                rows={15}
                style={{ ...inputStyle, resize: 'vertical', height: 'auto', fontFamily: 'monospace' }}
                placeholder="Conteúdo completo do artigo (suporta Markdown)..."
              />
              <small style={{ color: '#6b7280', fontSize: 12 }}>
                💡 Suporta Markdown: **negrito**, *itálico*, # títulos, [links](url), etc.
              </small>
            </div>
          </div>
        </section>

        {/* Imagem e Metadados */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>🖼️ Imagem e Metadados</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Imagem de capa (upload ou biblioteca)</label>
            <UnifiedMediaUpload
              pageSlug="blog"
              sectionSlug="cover"
              imageId={formData.coverImageId || undefined}
              imageUrl={formData.coverImageUrl || undefined}
              onImageChange={(mediaId, url) => setFormData({ ...formData, coverImageId: mediaId || '', coverImageUrl: url || '' })}
              allowVideo={false}
              allowExternalUrl={true}
              existingMedia={allMedia}
              imageLabel="Capa do post"
              imageSpecs={{ width: 1200, height: 675, maxSizeMB: 3, description: 'Capa do post (recomendado 1200x675)' }}
            />
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>Ou cole a URL da imagem abaixo:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>URL da Imagem de Capa</label>
              <input
                type="url"
                value={formData.coverImageUrl}
                onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Alt da Imagem</label>
              <input
                type="text"
                value={formData.coverImageAlt}
                onChange={(e) => setFormData({ ...formData, coverImageAlt: e.target.value })}
                style={inputStyle}
                placeholder="Descrição da imagem"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Autor</label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                style={inputStyle}
                placeholder="Nome do autor"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Tempo de Leitura (min)</label>
              <input
                type="number"
                value={formData.readingTimeMin}
                onChange={(e) => setFormData({ ...formData, readingTimeMin: parseInt(e.target.value) || 5 })}
                style={inputStyle}
                min={1}
                max={60}
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Categoria</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                style={inputStyle}
              >
                <option value="">Sem categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.namePt}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={inputStyle}
              >
                <option value="DRAFT">🔸 Rascunho</option>
                <option value="PUBLISHED">🟢 Publicado</option>
                <option value="SCHEDULED">🟡 Agendado</option>
                <option value="ARCHIVED">🔴 Arquivado</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 28 }}>
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label htmlFor="featured" style={{ cursor: 'pointer', color: '#fff' }}>
                ⭐ Post em destaque
              </label>
            </div>
          </div>
        </section>

        {/* Erro */}
        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(201,35,55,0.12)',
            border: '1px solid rgba(201,35,55,0.35)',
            color: '#fca5a5',
          }}>
            {error}
          </div>
        )}

        {/* Botões */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: '12px 24px',
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
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: '#c92337',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? 'Criando...' : '✨ Criar Post'}
          </button>
        </div>
      </form>
    </>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: 24,
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.03)',
  display: 'grid',
  gap: 16,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  color: '#fff',
  paddingBottom: 12,
  borderBottom: '1px solid rgba(255,255,255,0.08)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: '#d0d0d0',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 44,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  padding: '0 12px',
  outline: 'none',
  fontSize: 14,
  fontFamily: 'inherit',
};
