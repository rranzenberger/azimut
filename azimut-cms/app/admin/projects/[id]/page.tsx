'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GalleryManager } from '../components/GalleryManager';
import UnifiedMediaUpload from '@/components/admin/UnifiedMediaUpload';
import CollapsibleSection from '@/app/admin/components/CollapsibleSection';
import { AZIMUT } from '../../theme';

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
  const [openSection, setOpenSection] = useState<string | null>('basico');
  const handleSectionToggle = useCallback((sid: string) => {
    setOpenSection((prev) => (prev === sid ? null : sid));
  }, []);
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
    month: '',
    client: '',
    partnership: '',
    coproduction: '',
    type: '',
    status: 'DRAFT',
    featured: false,
    priorityHome: 0,
    hasDetailPage: false,
    thumbnailUrl: '',
    heroImageId: '',
    heroImageUrl: '',
    // ═══════════════════════════════════════════════════════════════
    // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
    // ═══════════════════════════════════════════════════════════════
    projectCategory: [] as string[],
    workType: [] as string[],
    technologies: [] as string[],
    industry: '',
    azimutRole: [] as string[],
    duration: '',
    awards: '',
    metrics: '',
    videoUrl: '',
    videoShowreel: '',
    externalLinks: '',
    partnerLogos: '',
    beforeAfterImages: '',
    // 🔍 SEO - Campos otimizados pela IA
    seoTitlePt: '',
    seoTitleEn: '',
    seoTitleEs: '',
    seoTitleFr: '',
    seoDescPt: '',
    seoDescEn: '',
    seoDescEs: '',
    seoDescFr: '',
    seoKeywords: [] as string[],
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Erro ao carregar projeto');
          setLoading(false);
          return;
        }

        const project = data.project;
        
        // Carregar galeria
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
          // 🔍 SEO
          seoTitlePt: project.seoTitlePt || '',
          seoTitleEn: project.seoTitleEn || '',
          seoTitleEs: project.seoTitleEs || '',
          seoTitleFr: project.seoTitleFr || '',
          seoDescPt: project.seoDescPt || '',
          seoDescEn: project.seoDescEn || '',
          seoDescEs: project.seoDescEs || '',
          seoDescFr: project.seoDescFr || '',
          seoKeywords: project.seoKeywords || [],
          city: project.city || '',
          stateProvince: project.stateProvince || '',
          country: project.country || '',
          year: project.year ? String(project.year) : '',
          month: project.month ? String(project.month) : '',
          client: project.client || '',
          partnership: project.partnership || '',
          coproduction: project.coproduction || '',
          type: project.type || '',
          status: project.status || 'DRAFT',
          featured: project.featured || false,
          priorityHome: project.priorityHome || 0,
          hasDetailPage: project.hasDetailPage || false,
          thumbnailUrl: project.thumbnailUrl || '',
          heroImageId: project.heroImageId || '',
          heroImageUrl: project.heroImage?.originalUrl || '',
          // ═══════════════════════════════════════════════════════════════
          // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
          // ═══════════════════════════════════════════════════════════════
          projectCategory: Array.isArray(project.projectCategory) ? project.projectCategory : [],
          workType: Array.isArray(project.workType) ? project.workType : [],
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
          industry: project.industry || '',
          azimutRole: Array.isArray(project.azimutRole) ? project.azimutRole : [],
          duration: project.duration || '',
          awards: project.awards ? JSON.stringify(project.awards, null, 2) : '',
          metrics: project.metrics ? JSON.stringify(project.metrics, null, 2) : '',
          videoUrl: project.videoUrl || '',
          videoShowreel: project.videoShowreel || '',
          externalLinks: project.externalLinks ? JSON.stringify(project.externalLinks, null, 2) : '',
          partnerLogos: Array.isArray(project.partnerLogos) ? project.partnerLogos.join(', ') : '',
          beforeAfterImages: project.beforeAfterImages ? JSON.stringify(project.beforeAfterImages, null, 2) : '',
        });
        
        // Carregar lista de mídias para o upload
        try {
          const mediaRes = await fetch('/api/admin/media?limit=100');
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json();
            setAllMedia(mediaData.media || []);
          }
        } catch (err) {
          console.warn('Erro ao carregar mídias:', err);
        }
        
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
      // Processar campos JSON e arrays antes de enviar
      const payload = {
        ...formData,
        awards: formData.awards ? JSON.parse(formData.awards) : null,
        metrics: formData.metrics ? JSON.parse(formData.metrics) : null,
        externalLinks: formData.externalLinks ? JSON.parse(formData.externalLinks) : null,
        beforeAfterImages: formData.beforeAfterImages ? JSON.parse(formData.beforeAfterImages) : null,
        partnerLogos: formData.partnerLogos
          ? formData.partnerLogos.split(',').map((url) => url.trim()).filter(Boolean)
          : [],
        // 🔍 SEO - Garantir que keywords seja array
        seoKeywords: Array.isArray(formData.seoKeywords) ? formData.seoKeywords : [],
      };

      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  const isOnHome = formData.priorityHome > 0;

  return (
    <>
      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
            {formData.title || 'Editar Projeto'}
          </h1>
          {isOnHome && (
            <span style={{ fontSize: 11, padding: '4px 12px', borderRadius: 999, background: 'rgba(201,35,55,0.15)', color: '#fca5a5', border: '1px solid rgba(201,35,55,0.3)', fontWeight: 700, textTransform: 'uppercase' }}>
              HOME #{formData.priorityHome}
            </span>
          )}
        </div>
        <p style={{ margin: 0, color: '#6b6780', fontSize: 14 }}>
          Slug: /{formData.slug} • {formData.status === 'PUBLISHED' ? '🟢 Publicado' : formData.status === 'DRAFT' ? '🟡 Rascunho' : '⚪ Arquivado'}
        </p>
      </header>

      {/* ═══ REFERÊNCIA: onde aparece no site ═══ */}
      <div style={{ marginBottom: 20, padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(56, 189, 248, 0.25)', background: 'rgba(56, 189, 248, 0.04)', fontSize: 13, color: '#94a3b8' }}>
        <span style={{ fontWeight: 600, color: '#7dd3fc' }}>🗺️ Onde este projeto aparece no site:</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
          {isOnHome && <span>🏠 <strong>Home</strong> — card em destaque (posição #{formData.priorityHome})</span>}
          <span>📁 <strong>/work</strong> — listagem de projetos</span>
          {formData.hasDetailPage && <span>📄 <strong>/work/{formData.slug}</strong> — página detalhada</span>}
        </div>
      </div>

      {/* ═══ GUIA RÁPIDO ═══ */}
      <div style={{ marginBottom: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {[
          { id: 'basico', label: '📋 Dados básicos' },
          { id: 'resumo', label: '📝 Resumo e descrição' },
          { id: 'midia', label: '📸 Imagem de capa' },
          { id: 'localizacao', label: '📍 Localização' },
          { id: 'seo', label: '🔍 SEO' },
          { id: 'filtros', label: '🎯 Filtros avançados' },
          { id: 'galeria', label: '🖼️ Galeria' },
          { id: 'config', label: '⚙️ Configurações' },
        ].map((btn) => (
          <button key={btn.id} type="button" onClick={() => handleSectionToggle(btn.id)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.3)', background: openSection === btn.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(56, 189, 248, 0.06)', color: '#7dd3fc', fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
            {btn.label}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(201,35,55,0.35)', background: 'rgba(201,35,55,0.12)', color: '#fca5a5', marginBottom: 16 }}>
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: 12,
          maxWidth: 900,
        }}
      >
        {/* ═══ DADOS BÁSICOS ═══ */}
        <CollapsibleSection id="basico" title="Dados básicos" icon="📋" defaultOpen isOpen={openSection === 'basico'} onToggle={handleSectionToggle}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Título *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={inputStyle} placeholder="Nome do projeto" />
              <small style={{ color: '#6b6780', fontSize: 11 }}>Aparece no card do site e na página de detalhe</small>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Título Curto</label>
              <input type="text" value={formData.shortTitle} onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })} style={inputStyle} placeholder="Título curto para cards" />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Slug *</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} required style={inputStyle} placeholder="url-amigavel-do-projeto" />
              <small style={{ color: '#6b6780', fontSize: 11 }}>URL: /work/{formData.slug}</small>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                <option value="DRAFT">Rascunho</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
              <small style={{ color: '#6b6780', fontSize: 11 }}>Publicado = visível no site. Rascunho = oculto.</small>
            </div>
          </div>
        </CollapsibleSection>

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
            💡 <strong>Descrição Completa:</strong> Use os campos abaixo para textos longos/rich text que aparecerão na página de detalhe do projeto.
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

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 🔍 SEO - Campos Otimizados pela IA */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            marginTop: 24,
            padding: '20px',
            borderRadius: 10,
            border: '1px solid rgba(34, 197, 94, 0.3)',
            background: 'rgba(34, 197, 94, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, color: '#86efac', fontWeight: 600 }}>
              🔍 SEO - Otimização para Buscadores
            </h3>
            <button
              type="button"
              onClick={async () => {
                if (!confirm('Deseja otimizar o SEO deste projeto com IA? Isso pode levar alguns segundos.')) return
                try {
                  const res = await fetch(`/api/admin/projects/${id}/optimize-seo`, { method: 'POST' })
                  const data = await res.json()
                  if (res.ok) {
                    alert('SEO otimizado com sucesso! Recarregue a página para ver os resultados.')
                    window.location.reload()
                  } else {
                    alert(`Erro: ${data.error || 'Falha ao otimizar'}`)
                  }
                } catch (err) {
                  alert('Erro ao otimizar SEO')
                }
              }}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                border: '1px solid rgba(34, 197, 94, 0.5)',
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#86efac',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🤖 Otimizar com IA
            </button>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {/* SEO Português */}
            <div style={{ display: 'grid', gap: 12 }}>
              <h4 style={{ margin: 0, fontSize: 14, color: '#86efac', fontWeight: 600 }}>🇧🇷 Português</h4>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Meta Title (50-60 caracteres)</label>
                <input
                  type="text"
                  value={formData.seoTitlePt}
                  onChange={(e) => setFormData({ ...formData, seoTitlePt: e.target.value })}
                  style={inputStyle}
                  placeholder="Título otimizado para SEO"
                  maxLength={60}
                />
                <small style={{ color: '#8f8ba2', fontSize: 11 }}>
                  {formData.seoTitlePt.length}/60 caracteres
                </small>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Meta Description (150-160 caracteres)</label>
                <textarea
                  value={formData.seoDescPt}
                  onChange={(e) => setFormData({ ...formData, seoDescPt: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Descrição otimizada para SEO"
                  maxLength={160}
                />
                <small style={{ color: '#8f8ba2', fontSize: 11 }}>
                  {formData.seoDescPt.length}/160 caracteres
                </small>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Keywords (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.seoKeywords.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seoKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                  })}
                  style={inputStyle}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <small style={{ color: '#8f8ba2', fontSize: 11 }}>
                  {formData.seoKeywords.length} keywords
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ LOCALIZAÇÃO E META (subpágina do projeto: só campos preenchidos aparecem) ═══ */}
        <CollapsibleSection id="localizacao" title="Localização e meta do projeto" icon="📍" isOpen={openSection === 'localizacao'} onToggle={handleSectionToggle}>
          <p style={{ margin: '0 0 16px 0', fontSize: 12, color: '#8f8ba2' }}>
            Campos opcionais. Na subpágina do projeto só aparecem os que estiverem preenchidos (vazios não entram).
          </p>
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
              <label style={{ fontSize: 14, fontWeight: 600 }}>Estado / Província</label>
              <input
                type="text"
                value={formData.stateProvince}
                onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                style={inputStyle}
                placeholder="RJ"
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
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Ano</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                style={inputStyle}
                placeholder="2024"
                min="1990"
                max="2100"
              />
              {(!formData.year || formData.year === '0') && (
                <small style={{ color: '#fbbf24', fontSize: 11 }}>⚠️ Sem ano definido</small>
              )}
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Mês</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                style={inputStyle}
              >
                <option value="">— Opcional</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Cliente / Corporação</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                style={inputStyle}
                placeholder="Para quem foi o projeto (cliente, corporação, instituição)"
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Parceria</label>
              <input
                type="text"
                value={formData.partnership}
                onChange={(e) => setFormData({ ...formData, partnership: e.target.value })}
                style={inputStyle}
                placeholder="Nomes ou descrição da parceria (opcional)"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Coprodução</label>
              <input
                type="text"
                value={formData.coproduction}
                onChange={(e) => setFormData({ ...formData, coproduction: e.target.value })}
                style={inputStyle}
                placeholder="Nomes ou descrição da coprodução (opcional)"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 🎛️ CONFIGURAÇÕES DE EXIBIÇÃO — Home & Destaque */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            marginTop: 16,
            padding: '20px 24px',
            borderRadius: 12,
            border: `1px solid ${formData.featured ? 'rgba(34,197,94,0.4)' : 'rgba(100,116,139,0.3)'}`,
            background: formData.featured ? 'rgba(34,197,94,0.06)' : 'rgba(100,116,139,0.06)',
            transition: 'all 0.3s ease',
          }}
        >
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: formData.featured ? '#86efac' : '#94a3b8' }}>
            🎛️ Configurações de Exibição — Home & Destaque
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: 12, color: '#64748b' }}>
            Defina se este projeto aparece na Home e na seção de destaque do site.
          </p>
          
          <div style={{ display: 'grid', gap: 16 }}>
            {/* Featured — checkbox grande com explicação */}
            <div style={{
              padding: '12px 16px',
              borderRadius: 8,
              background: formData.featured ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${formData.featured ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 0.3s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFormData({ ...formData, featured: isChecked, priorityHome: isChecked ? (formData.priorityHome || 10) : 0 });
                  }}
                  style={{ width: 20, height: 20, cursor: 'pointer', accentColor: '#22c55e' }}
                />
                <label htmlFor="featured" style={{ fontSize: 15, fontWeight: 700, cursor: 'pointer', color: formData.featured ? '#86efac' : '#94a3b8' }}>
                  {formData.featured ? '⭐ PROJETO EM DESTAQUE' : '○ Projeto NÃO está em destaque'}
                </label>
              </div>
              <p style={{ margin: '8px 0 0 30px', fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                {formData.featured
                  ? '✅ Este projeto APARECE na Home e nos destaques do site. Para remover, desmarque esta opção.'
                  : '❌ Este projeto NÃO aparece na Home. Ele só aparece na página Work / Portfólio completo. Para colocá-lo em destaque, marque esta opção.'}
              </p>
            </div>

            {/* PriorityHome — só aparece se featured está ativo */}
            {formData.featured && (
              <div style={{
                padding: '12px 16px',
                borderRadius: 8,
                background: 'rgba(56,189,248,0.06)',
                border: '1px solid rgba(56,189,248,0.2)',
              }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#7dd3fc', display: 'block', marginBottom: 8 }}>
                  📊 Prioridade na Home (ordem de exibição)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input
                    type="number"
                    value={formData.priorityHome}
                    onChange={(e) => setFormData({ ...formData, priorityHome: parseInt(e.target.value) || 0 })}
                    style={{ ...inputStyle, width: 100, textAlign: 'center', fontSize: 18, fontWeight: 700 }}
                    placeholder="10"
                    min="0"
                    max="100"
                  />
                  <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                    <p style={{ margin: 0 }}><strong style={{ color: '#fbbf24' }}>Maior número = mais destaque</strong></p>
                    <p style={{ margin: '2px 0 0' }}>Ex: 100 = principal, 50 = segundo, 10 = terceiro</p>
                    <p style={{ margin: '2px 0 0' }}>Se colocar <strong>0</strong>, o projeto sai da Home mesmo com destaque ativo</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Has Detail Page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="checkbox"
                id="hasDetailPage"
                checked={formData.hasDetailPage}
                onChange={(e) => setFormData({ ...formData, hasDetailPage: e.target.checked })}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label htmlFor="hasDetailPage" style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#cbd5e1' }}>
                📄 Tem subpágina própria (Ver Detalhes)
              </label>
            </div>
            <p style={{ margin: '-8px 0 0 28px', fontSize: 12, color: '#64748b' }}>
              Se ativado, mostra botão "Ver Detalhes" que leva para página completa do projeto.
            </p>
            
            {/* Thumbnail URL alternativa */}
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>🖼️ URL do Thumbnail (alternativo)</label>
              <input
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                style={inputStyle}
                placeholder="https://exemplo.com/thumbnail.jpg (opcional - usa heroImage se vazio)"
              />
              <small style={{ color: '#64748b', fontSize: 11 }}>
                URL direta para thumbnail. Se vazio, usa a imagem principal (heroImage).
              </small>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            marginTop: 32,
            padding: '20px 24px',
            borderRadius: 12,
            border: '1px solid rgba(201,35,55,0.3)',
            background: 'rgba(201,35,55,0.08)',
          }}
        >
          <h2 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#fff' }}>
            🎯 Filtros Avançados - Portfolio Premium
          </h2>
          <p style={{ margin: '0 0 24px 0', fontSize: 13, color: '#c0bccf' }}>
            Categorize o projeto para filtros visuais na página de portfólio.
          </p>

          {/* Categoria Principal */}
          <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Categoria Principal (multi-select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['curadoria', 'vr-360', 'museum', 'education', 'motion', 'games', 'corporate', 'festival', 'animacao', 'personagens-3d', 'projetos-3d', 'ambientes-virtuais', 'maquete-virtual', 'renders-3d'].map(
                (cat) => (
                  <label
                    key={cat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: formData.projectCategory.includes(cat)
                        ? 'rgba(201,35,55,0.2)'
                        : 'rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.projectCategory.includes(cat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            projectCategory: [...formData.projectCategory, cat],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            projectCategory: formData.projectCategory.filter((c) => c !== cat),
                          });
                        }
                      }}
                      style={{ width: 16, height: 16, cursor: 'pointer' }}
                    />
                    {cat}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Tipo de Trabalho */}
          <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Tipo de Trabalho (multi-select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['filme', 'exposicao', 'curso', 'palestra', 'workshop', 'instalacao', 'making-of', 'evento'].map(
                (type) => (
                  <label
                    key={type}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: formData.workType.includes(type)
                        ? 'rgba(201,35,55,0.2)'
                        : 'rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.workType.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, workType: [...formData.workType, type] });
                        } else {
                          setFormData({ ...formData, workType: formData.workType.filter((t) => t !== type) });
                        }
                      }}
                      style={{ width: 16, height: 16, cursor: 'pointer' }}
                    />
                    {type}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Tecnologias */}
          <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Tecnologias Utilizadas (multi-select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['VR', '360', 'IA', '3D', 'Motion Graphics', 'Interactive', 'AR', 'XR', 'Animation', '3D Characters', '3D Renders', 'Virtual Environments', 'Virtual Mockup', 'Renders 3D'].map((tech) => (
                <label
                  key={tech}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: formData.technologies.includes(tech)
                      ? 'rgba(201,35,55,0.2)'
                      : 'rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.technologies.includes(tech)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, technologies: [...formData.technologies, tech] });
                      } else {
                        setFormData({
                          ...formData,
                          technologies: formData.technologies.filter((t) => t !== tech),
                        });
                      }
                    }}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>

          {/* Setor/Indústria */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Setor/Indústria</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              style={inputStyle}
            >
              <option value="">Selecione...</option>
              <option value="cultural">Cultural</option>
              <option value="entertainment">Entretenimento</option>
              <option value="education">Educação</option>
              <option value="corporate">Corporativo</option>
              <option value="government">Governo</option>
              <option value="research">Pesquisa</option>
            </select>
          </div>

          {/* Papel da Azimut */}
          <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Papel da Azimut (multi-select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['direcao', 'curadoria', 'producao', 'animacao', 'consultoria', 'treinamento'].map((role) => (
                <label
                  key={role}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: formData.azimutRole.includes(role)
                      ? 'rgba(201,35,55,0.2)'
                      : 'rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.azimutRole.includes(role)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, azimutRole: [...formData.azimutRole, role] });
                      } else {
                        setFormData({ ...formData, azimutRole: formData.azimutRole.filter((r) => r !== role) });
                      }
                    }}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          {/* Duração */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Duração do Projeto</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              style={inputStyle}
              placeholder="Ex: 3 meses, 2015-2017, 8 anos consecutivos"
            />
          </div>

          {/* Vídeos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>URL do Vídeo Principal</label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                style={inputStyle}
                placeholder="https://youtube.com/..."
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>URL do Showreel</label>
              <input
                type="url"
                value={formData.videoShowreel}
                onChange={(e) => setFormData({ ...formData, videoShowreel: e.target.value })}
                style={inputStyle}
                placeholder="https://vimeo.com/..."
              />
            </div>
          </div>

          {/* Prêmios (JSON) */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Prêmios (JSON)</label>
            <textarea
              value={formData.awards}
              onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }}
              placeholder='[{"title": "Best VR", "organization": "Festival X", "year": 2024, "category": "Imersivo"}]'
            />
            <small style={{ color: '#8f8ba2', fontSize: 11 }}>
              Formato JSON: array de objetos com title, organization, year, category
            </small>
          </div>

          {/* Métricas (JSON) */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Métricas de Impacto (JSON)</label>
            <textarea
              value={formData.metrics}
              onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }}
              placeholder='{"visitors": 50000, "revenue": "R$ 2M", "duration": "2 anos", "impact": "Formou 300 alunos"}'
            />
            <small style={{ color: '#8f8ba2', fontSize: 11 }}>
              Formato JSON: objeto com visitors, revenue, duration, impact, stats
            </small>
          </div>

          {/* Links Externos (JSON) */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Links Externos (JSON)</label>
            <textarea
              value={formData.externalLinks}
              onChange={(e) => setFormData({ ...formData, externalLinks: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }}
              placeholder='[{"label": "Site Oficial", "url": "https://..."}]'
            />
            <small style={{ color: '#8f8ba2', fontSize: 11 }}>Formato JSON: array de objetos com label e url</small>
          </div>

          {/* Logos de Parceiros */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Logos de Parceiros (URLs separadas por vírgula)</label>
            <textarea
              value={formData.partnerLogos}
              onChange={(e) => setFormData({ ...formData, partnerLogos: e.target.value })}
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="https://exemplo.com/logo1.png, https://exemplo.com/logo2.png"
            />
          </div>

          {/* Before/After Images (JSON) */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Before/After Images (JSON)</label>
            <textarea
              value={formData.beforeAfterImages}
              onChange={(e) => setFormData({ ...formData, beforeAfterImages: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }}
              placeholder='{"before": "https://...", "after": "https://...", "label": "Evolução do conceito"}'
            />
            <small style={{ color: '#8f8ba2', fontSize: 11 }}>
              Formato JSON: objeto com before, after, label
            </small>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 🖼️ MÍDIA PRINCIPAL DO PROJETO */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            marginTop: 32,
            padding: '20px 24px',
            borderRadius: 12,
            border: `1px solid ${AZIMUT.accentBorder}`,
            background: AZIMUT.accentBg,
          }}
        >
          <h2 style={{ margin: '0 0 8px 0', fontSize: 18, color: AZIMUT.text }}>
            🖼️ Imagem de capa (cards da Home e página Projetos)
          </h2>
          <p style={{ margin: '0 0 12px 0', fontSize: 13, color: AZIMUT.textSecondary }}>
            Esta é a <strong>imagem de capa</strong> do projeto. Envie em <strong>Mídias</strong> antes ou faça upload abaixo.
          </p>
          <div style={{ marginBottom: 20, padding: '10px 14px', borderRadius: 8, background: AZIMUT.previewBg, border: `1px solid ${AZIMUT.previewBorder}`, fontSize: 12, color: AZIMUT.textSecondary }}>
            <strong style={{ color: AZIMUT.red }}>No site:</strong> esta imagem aparece no <strong>card da Home</strong> (Projetos em Destaque) e na <strong>listagem /work</strong> (Projetos).
          </div>
          <UnifiedMediaUpload
            pageSlug={`project-${formData.slug || id}`}
            sectionSlug="hero"
            imageId={formData.heroImageId}
            imageUrl={formData.thumbnailUrl || formData.heroImageUrl}
            videoId=""
            videoUrl={formData.videoUrl}
            onImageChange={(mediaId, url) => {
              setFormData({ 
                ...formData, 
                heroImageId: mediaId || '',
                heroImageUrl: url || '',
                thumbnailUrl: url || formData.thumbnailUrl
              });
            }}
            onVideoChange={(mediaId, url) => {
              setFormData({ 
                ...formData, 
                videoUrl: url || ''
              });
            }}
            allowVideo={true}
            allowExternalUrl={true}
            imageSpecs={{
              width: 1920,
              height: 1080,
              maxSizeMB: 5,
              description: 'Imagem principal do projeto (hero/thumbnail)'
            }}
            videoSpecs={{
              maxSizeMB: 50,
              description: 'Vídeo principal do projeto'
            }}
            existingMedia={allMedia}
            imageLabel="Imagem de capa (aparece nos cards da Home e na página Projetos)"
            videoLabel="Vídeo do Projeto (Opcional)"
          />
        </div>

        {/* Galeria de Mídias (Adicional) – subpágina do projeto */}
        <CollapsibleSection id="galeria" title="Galeria de Mídias (subpágina do projeto)" icon="📸" isOpen={openSection === 'galeria'} onToggle={handleSectionToggle}>
          <p style={{ margin: '0 0 16px 0', fontSize: 12, color: '#8f8ba2' }}>
            Imagens e vídeos que aparecem na subpágina do projeto (sequência com ordem e legenda em PT/EN/ES/FR). Adicione por upload, URL ou biblioteca; reordene e edite as legendas em cada item.
          </p>
          <GalleryManager projectId={id} initialGallery={gallery} />
        </CollapsibleSection>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: saving ? '#666' : AZIMUT.red,
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

