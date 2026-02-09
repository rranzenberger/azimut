'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MediaPreviewBlock from '@/components/admin/MediaPreviewBlock';
import UnifiedMediaUpload from '@/components/admin/UnifiedMediaUpload';

interface Category {
  id: string;
  slug: string;
  namePt: string;
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
    viewCount: 0,
    createdAt: '',
  });

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, [postId]);

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

  async function fetchPost() {
    try {
      const res = await fetch(`/api/admin/blog/posts/${postId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Post não encontrado');
        setLoading(false);
        return;
      }

      const post = data.post;
      setFormData({
        slug: post.slug || '',
        titlePt: post.titlePt || '',
        titleEn: post.titleEn || '',
        titleEs: post.titleEs || '',
        titleFr: post.titleFr || '',
        excerptPt: post.excerptPt || '',
        excerptEn: post.excerptEn || '',
        excerptEs: post.excerptEs || '',
        excerptFr: post.excerptFr || '',
        contentPt: post.contentPt || '',
        contentEn: post.contentEn || '',
        contentEs: post.contentEs || '',
        contentFr: post.contentFr || '',
        coverImageId: post.coverImageId || post.coverImage?.id || '',
        coverImageUrl: post.coverImageUrl || post.coverImage?.originalUrl || '',
        coverImageAlt: post.coverImageAlt || '',
        authorName: post.authorName || '',
        readingTimeMin: post.readingTimeMin || 5,
        status: post.status || 'DRAFT',
        featured: post.featured || false,
        categoryId: post.categoryId || '',
        viewCount: post.viewCount || 0,
        createdAt: post.createdAt || '',
      });
    } catch (err) {
      setError('Erro ao carregar post');
    } finally {
      setLoading(false);
    }
  }

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
    setSuccess(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryId: formData.categoryId || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar post');
        setSaving(false);
        return;
      }

      setSuccess('Post salvo com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erro de rede ao salvar post');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erro ao excluir post');
        setDeleting(false);
        return;
      }

      router.push('/admin/blog');
    } catch (err) {
      setError('Erro de rede ao excluir post');
      setDeleting(false);
    }
  }

  const tabs = [
    { key: 'pt', label: '🇧🇷 PT' },
    { key: 'en', label: '🇨🇦 EN' },
    { key: 'es', label: '🇪🇸 ES' },
    { key: 'fr', label: '🇫🇷 FR' },
  ] as const;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: '#a0a0a0' }}>
        Carregando post...
      </div>
    );
  }

  return (
    <>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 24 
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26 }}>✏️ Editar Post</h1>
          <p style={{ margin: 4, color: '#a0a0a0' }}>
            Slug: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>
              /blog/{formData.slug}
            </code>
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 13, color: '#6b7280' }}>
            <span>👁️ {formData.viewCount} visualizações</span>
            <span>📅 Criado em {new Date(formData.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.1)',
            color: '#ef4444',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {deleting ? 'Excluindo...' : '🗑️ Excluir'}
        </button>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: 24,
          maxWidth: 900,
        }}
      >
        {/* Preview: capa como no site (não altera o campo abaixo) */}
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
                onChange={(e) => setFormData({ ...formData, titlePt: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') 
                })}
                required
                style={inputStyle}
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
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Título (Français)</label>
              <input
                type="text"
                value={formData.titleFr}
                onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                style={inputStyle}
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
                rows={20}
                style={{ ...inputStyle, resize: 'vertical', height: 'auto', fontFamily: 'monospace' }}
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
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={labelStyle}>Alt da Imagem</label>
              <input
                type="text"
                value={formData.coverImageAlt}
                onChange={(e) => setFormData({ ...formData, coverImageAlt: e.target.value })}
                style={inputStyle}
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

        {/* Mensagens */}
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

        {success && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.35)',
            color: '#86efac',
          }}>
            ✅ {success}
          </div>
        )}

        {/* Botões */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
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
            ← Voltar
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: '#c92337',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              opacity: saving ? 0.8 : 1,
            }}
          >
            {saving ? 'Salvando...' : '💾 Salvar Alterações'}
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
