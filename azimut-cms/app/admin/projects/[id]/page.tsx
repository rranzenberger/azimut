'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GalleryManager } from '../components/GalleryManager';
import MediaUploadField from '@/components/admin/MediaUploadField';

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 42,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  padding: '0 12px',
  color: '#fff',
  fontSize: 14,
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [allMedia, setAllMedia] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    slug: '',
    summaryPt: '',
    summaryEn: '',
    summaryEs: '',
    summaryFr: '',
    descriptionPt: '',
    descriptionEn: '',
    descriptionEs: '',
    descriptionFr: '',
    city: '',
    stateProvince: '',
    country: '',
    year: '',
    client: '',
    type: '',
    status: 'DRAFT',
    featured: false,
    priorityHome: 0,
    heroImageId: '',
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Erro ao carregar projeto');

        // Buscar mÃ­dias existentes
        const mediaRes = await fetch('/api/media/upload');
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          setAllMedia(mediaData.media || []);
        }
          setLoading(false);
          return;
        }

        const project = data.project;
        
        // Carregar galeria
        // Carregar heroImageId
        if (project.heroImageId) {
          setFormData(prev => ({ ...prev, heroImageId: project.heroImageId }));
        }

        if (project.gallery) {
          setGallery(project.gallery);
        }
        
        setFormData({
          title: project.title || '',
          shortTitle: project.shortTitle || '',
          slug: project.slug || '',
          summaryPt: project.summaryPt || '',
          summaryEn: project.summaryEn || '',
          summaryEs: project.summaryEs || '',
          summaryFr: project.summaryFr || '',
          descriptionPt: project.descriptionPt || '',
          descriptionEn: project.descriptionEn || '',
          descriptionEs: project.descriptionEs || '',
          descriptionFr: project.descriptionFr || '',
          city: project.city || '',
          stateProvince: project.stateProvince || '',
          country: project.country || '',
          year: project.year ? String(project.year) : '',
          client: project.client || '',
          type: project.type || '',
          status: project.status || 'DRAFT',
          featured: project.featured || false,
          priorityHome: project.priorityHome || 0,
        });
        setLoading(false);
      } catch (err) {
        setError('Erro de rede ao carregar projeto');
        setLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao atualizar projeto');
        setSaving(false);
        return;
      }

      router.push('/admin/projects');
    } catch (err) {
      setError('Erro de rede ao atualizar projeto');
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <p style={{ color: '#c0bccf' }}>Carregando projeto...</p>
      </div>
    );
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26 }}>Editar Projeto</h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>Edite as informações do projeto.</p>
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

      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          display: 'grid',
          gap: 16,
          maxWidth: 800,
        }}
      >
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Título *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={inputStyle}
            placeholder="Nome do projeto"
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Título Curto</label>
          <input
            type="text"
            value={formData.shortTitle}
            onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
            style={inputStyle}
            placeholder="Título curto para cards"
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
              })
            }
            required
            style={inputStyle}
            placeholder="url-amigavel-do-projeto"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Resumo (PT)</label>
            <textarea
              value={formData.summaryPt}
              onChange={(e) => setFormData({ ...formData, summaryPt: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Breve descrição em português"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Resumo (EN)</label>
            <textarea
              value={formData.summaryEn}
              onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Brief description in English"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Resumo (ES)</label>
            <textarea
              value={formData.summaryEs}
              onChange={(e) => setFormData({ ...formData, summaryEs: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Breve descripción en español"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Resumo (FR)</label>
            <textarea
              value={formData.summaryFr}
              onChange={(e) => setFormData({ ...formData, summaryFr: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Brève description en français"
            />
          </div>
        </div>

        <div style={{ marginTop: 8, marginBottom: 8, padding: '12px 16px', background: 'rgba(201,35,55,0.1)', borderRadius: 8, border: '1px solid rgba(201,35,55,0.3)' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#fca5a5' }}>
            ?? <strong>Descrição Completa:</strong> Use os campos abaixo para textos longos/rich text que aparecerão na página de detalhe do projeto.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição Completa (PT)</label>
            <textarea
              value={formData.descriptionPt}
              onChange={(e) => setFormData({ ...formData, descriptionPt: e.target.value })}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Descrição completa em português (texto longo/rich text)"
            />
            <small style={{ color: '#8f8ba2', fontSize: 12 }}>
              Texto completo que aparece na página de detalhe. Suporta quebras de linha.
            </small>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição Completa (EN)</label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Full description in English (long text/rich text)"
            />
            <small style={{ color: '#8f8ba2', fontSize: 12 }}>
              Full text that appears on the detail page. Supports line breaks.
            </small>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição Completa (ES)</label>
            <textarea
              value={formData.descriptionEs}
              onChange={(e) => setFormData({ ...formData, descriptionEs: e.target.value })}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Descripción completa en español"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição Completa (FR)</label>
            <textarea
              value={formData.descriptionFr}
              onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Description complète en français"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Cidade</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              style={inputStyle}
              placeholder="Rio de Janeiro"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>País</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              style={inputStyle}
              placeholder="Brasil"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ano</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              style={inputStyle}
              placeholder="2024"
              min="2000"
              max="2100"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Cliente</label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              style={inputStyle}
              placeholder="Nome do cliente"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Tipo</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Museu, Festival, Marca"
            />
          </div>
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
            <label style={{ fontSize: 14, fontWeight: 600 }}>Prioridade Home</label>
            <input
              type="number"
              value={formData.priorityHome}
              onChange={(e) => setFormData({ ...formData, priorityHome: parseInt(e.target.value) || 0 })}
              style={inputStyle}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            style={{ width: 18, height: 18 }}
          />
          <label htmlFor="featured" style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Projeto em destaque
          </label>
        </div>


        {/* Imagem de Capa (Hero) */}
        <div style={{ marginBottom: 24, padding: 20, background: 'rgba(201,35,55,0.05)', borderRadius: 12, border: '1px solid rgba(201,35,55,0.2)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#c92337' }}>
            Imagem de Capa do Projeto
          </h3>
          <MediaUploadField
            label="Imagem de Capa"
            value={formData.heroImageId}
            onChange={(mediaId) => setFormData({ ...formData, heroImageId: mediaId })}
            mediaType="image"
            specs={{
              width: 1920,
              height: 1080,
              maxSizeMB: 5,
              description: 'Imagem principal do projeto (recomendado: 16:9)'
            }}
            existingMedia={allMedia}
          />
        </div>

        {/* Galeria de Mídias */}
        <GalleryManager projectId={id} initialGallery={gallery} />

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: saving ? '#666' : '#c92337',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'transparent',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

