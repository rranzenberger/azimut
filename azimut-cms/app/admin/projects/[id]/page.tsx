'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GalleryManager } from '../components/GalleryManager';

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
          city: project.city || '',
          stateProvince: project.stateProvince || '',
          country: project.country || '',
          year: project.year ? String(project.year) : '',
          client: project.client || '',
          type: project.type || '',
          status: project.status || 'DRAFT',
          featured: project.featured || false,
          priorityHome: project.priorityHome || 0,
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

