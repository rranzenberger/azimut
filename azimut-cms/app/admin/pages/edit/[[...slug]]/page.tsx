'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FieldEditorWithMetadata } from '@/src/components/admin/FieldEditorWithMetadata';
import MediaUploadField from '@/components/admin/MediaUploadField';
import VideoWithThumbnailField from '@/components/admin/VideoWithThumbnailField';
import MultiLangVideoField from '@/components/admin/MultiLangVideoField';
import UnifiedMediaUpload from '@/components/admin/UnifiedMediaUpload';
import MediaPreviewBlock from '@/components/admin/MediaPreviewBlock';
import CollapsibleSection from '@/app/admin/components/CollapsibleSection';
// Force rebuild: 2026-02-01-v1

interface Section {
  id: string;
  order: number;
  type: string;
  titlePt?: string;
  titleEn?: string;
  titleEs?: string;
  titleFr?: string;
  bodyPt?: string;
  bodyEn?: string;
  bodyEs?: string;
  bodyFr?: string;
}

interface Page {
  id: string;
  name: string;
  slug: string;
  seoTitlePt?: string;
  seoTitleEn?: string;
  seoTitleEs?: string;    // NOVO: SEO ES
  seoTitleFr?: string;    // NOVO: SEO FR
  seoDescPt?: string;
  seoDescEn?: string;
  seoDescEs?: string;     // NOVO: SEO ES
  seoDescFr?: string;     // NOVO: SEO FR
  heroSloganPt?: string;
  heroSloganEn?: string;
  heroSloganEs?: string;
  heroSloganFr?: string;
  heroSubtitlePt?: string;
  heroSubtitleEn?: string;
  heroSubtitleEs?: string;
  heroSubtitleFr?: string;
  // ═══ Hero Description MOBILE/DESKTOP ═══
  heroDescriptionMobilePt?: string;
  heroDescriptionMobileEn?: string;
  heroDescriptionMobileEs?: string;
  heroDescriptionMobileFr?: string;
  heroDescriptionDesktopPt?: string;
  heroDescriptionDesktopEn?: string;
  heroDescriptionDesktopEs?: string;
  heroDescriptionDesktopFr?: string;
  // Pillars
  pillar1Pt?: string;
  pillar1En?: string;
  pillar1Es?: string;
  pillar1Fr?: string;
  pillar2Pt?: string;
  pillar2En?: string;
  pillar2Es?: string;
  pillar2Fr?: string;
  pillar3Pt?: string;
  pillar3En?: string;
  pillar3Es?: string;
  pillar3Fr?: string;
  // Hero Media (relações)
  heroBackgroundImageId?: string;
  heroBackgroundImageUrl?: string;
  demoreelVideoId?: string;
  demoreelVideoUrl?: string;
  heroBackgroundImage?: {
    id: string;
    originalUrl: string;
    thumbnailUrl?: string;
    altPt?: string;
  };
  demoreelVideo?: {
    id: string;
    originalUrl: string;
    thumbnailUrl?: string;
    altPt?: string;
  };
  status: string;
  sections?: Section[];
  // ═══ Banner Curadoria/Destaque (página work) ═══
  curationTitlePt?: string;
  curationTitleEn?: string;
  curationTitleEs?: string;
  curationTitleFr?: string;
  curationDescriptionPt?: string;
  curationDescriptionEn?: string;
  curationDescriptionEs?: string;
  curationDescriptionFr?: string;
  curationButtonTextPt?: string;
  curationButtonTextEn?: string;
  curationButtonTextEs?: string;
  curationButtonTextFr?: string;
  curationFilterCategory?: string;
}

interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  originalUrl: string;
  thumbnailUrl?: string;
  altPt?: string;
  altEn?: string;
  createdAt: string;
}

// ═══════════════════════════════════════════════════════════════
// SISTEMA DE METADADOS - NOVA ABORDAGEM (15/01/2026)
// ═══════════════════════════════════════════════════════════════
// Para usar o novo sistema de metadados com FieldEditorWithMetadata:
//
// import { FieldEditorWithMetadata } from '@/components/admin/FieldEditorWithMetadata';
//
// Exemplo de uso (substitui MultilangTextField):
// <FieldEditorWithMetadata
//   pageSlug="home"
//   sectionKey="hero"
//   fieldKey="hero_title"
//   value={formData.heroSloganPt}
//   onChange={(value) => setFormData({ ...formData, heroSloganPt: value })}
// />
//
// VANTAGENS:
// - Busca metadados do banco (field_metadata table)
// - Validação automática (min/max length, required, format)
// - Exibe especificações de imagem (image_specifications table)
// - Contador de caracteres automático
// - Mensagens de ajuda e exemplos
// - Sem hardcoded limits (tudo vem do banco)
//
// ═══════════════════════════════════════════════════════════════

// Definições de limites de caracteres para cada campo
const FIELD_LIMITS: Record<string, { max: number; label: string; location: string }> = {
  name: { max: 100, label: 'Nome da Página', location: 'Páginas > Informações Básicas' },
  seoTitlePt: { max: 60, label: 'Título SEO (PT)', location: 'Páginas > SEO > Título' },
  seoTitleEn: { max: 60, label: 'Título SEO (EN)', location: 'Páginas > SEO > Título' },
  seoTitleEs: { max: 60, label: 'Título SEO (ES)', location: 'Páginas > SEO > Título' },
  seoTitleFr: { max: 60, label: 'Título SEO (FR)', location: 'Páginas > SEO > Título' },
  seoDescPt: { max: 160, label: 'Descrição SEO (PT)', location: 'Páginas > SEO > Descrição' },
  seoDescEn: { max: 160, label: 'Descrição SEO (EN)', location: 'Páginas > SEO > Descrição' },
  seoDescEs: { max: 160, label: 'Descrição SEO (ES)', location: 'Páginas > SEO > Descrição' },
  seoDescFr: { max: 160, label: 'Descrição SEO (FR)', location: 'Páginas > SEO > Descrição' },
  heroSloganPt: { max: 200, label: 'Hero Slogan (PT)', location: 'Páginas > Hero > Slogan' },
  heroSloganEn: { max: 200, label: 'Hero Slogan (EN)', location: 'Páginas > Hero > Slogan' },
  heroSloganEs: { max: 200, label: 'Hero Slogan (ES)', location: 'Páginas > Hero > Slogan' },
  heroSloganFr: { max: 200, label: 'Hero Slogan (FR)', location: 'Páginas > Hero > Slogan' },
  heroSubtitlePt: { max: 500, label: 'Hero Subtitle (PT)', location: 'Páginas > Hero > Subtitle' },
  heroSubtitleEn: { max: 500, label: 'Hero Subtitle (EN)', location: 'Páginas > Hero > Subtitle' },
  heroSubtitleEs: { max: 500, label: 'Hero Subtitle (ES)', location: 'Páginas > Hero > Subtitle' },
  heroSubtitleFr: { max: 500, label: 'Hero Subtitle (FR)', location: 'Páginas > Hero > Subtitle' },
  // Pillars
  pillar1Pt: { max: 50, label: 'Pillar 1 (PT)', location: 'Páginas > Hero > Pillars' },
  pillar1En: { max: 50, label: 'Pillar 1 (EN)', location: 'Páginas > Hero > Pillars' },
  pillar1Es: { max: 50, label: 'Pillar 1 (ES)', location: 'Páginas > Hero > Pillars' },
  pillar1Fr: { max: 50, label: 'Pillar 1 (FR)', location: 'Páginas > Hero > Pillars' },
  pillar2Pt: { max: 50, label: 'Pillar 2 (PT)', location: 'Páginas > Hero > Pillars' },
  pillar2En: { max: 50, label: 'Pillar 2 (EN)', location: 'Páginas > Hero > Pillars' },
  pillar2Es: { max: 50, label: 'Pillar 2 (ES)', location: 'Páginas > Hero > Pillars' },
  pillar2Fr: { max: 50, label: 'Pillar 2 (FR)', location: 'Páginas > Hero > Pillars' },
  pillar3Pt: { max: 50, label: 'Pillar 3 (PT)', location: 'Páginas > Hero > Pillars' },
  pillar3En: { max: 50, label: 'Pillar 3 (EN)', location: 'Páginas > Hero > Pillars' },
  pillar3Es: { max: 50, label: 'Pillar 3 (ES)', location: 'Páginas > Hero > Pillars' },
  pillar3Fr: { max: 50, label: 'Pillar 3 (FR)', location: 'Páginas > Hero > Pillars' },
};

function MultilangTextField({
  label,
  location,
  fieldKey,
  value,
  onChange,
  maxLength,
  multiline = false,
  onTranslate,
  translating = false,
}: {
  label: string;
  location: string;
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  multiline?: boolean;
  onTranslate?: (targetLang: string) => void;
  translating?: boolean;
}) {
  const currentLength = value?.length || 0;
  const isNearLimit = currentLength > maxLength * 0.8;
  const isOverLimit = currentLength > maxLength;

  const InputComponent = multiline ? 'textarea' : 'input';
  const inputProps = multiline
    ? { rows: 4, style: { ...inputStyle, minHeight: 100, resize: 'vertical' as const } }
    : { type: 'text', style: inputStyle };

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Breadcrumb/Localização */}
      <div
        style={{
          fontSize: 11,
          color: '#8f8ba2',
          marginBottom: 6,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        📍 {location}
      </div>

      {/* Label e ações */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={{ fontSize: 14, fontWeight: 600, color: '#e8e6f2' }}>
          {label}
        </label>
        {onTranslate && (
          <div style={{ display: 'flex', gap: 6 }}>
            {['en', 'es', 'fr'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onTranslate(lang)}
                disabled={translating}
                style={{
                  padding: '4px 8px',
                  fontSize: 11,
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#c0bccf',
                  cursor: translating ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  opacity: translating ? 0.5 : 1,
                }}
              >
                {translating ? '...' : `→${lang}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <InputComponent
        {...inputProps}
        value={value || ''}
        onChange={(e: any) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={`Digite o texto em ${label.split('(')[1]?.replace(')', '') || 'português'}...`}
      />

      {/* Contador de caracteres - MAIS VISÍVEL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8,
          padding: '8px 12px',
          borderRadius: 8,
          background: isOverLimit 
            ? 'rgba(201,35,55,0.15)' 
            : isNearLimit 
            ? 'rgba(253,224,71,0.15)' 
            : 'rgba(134,239,172,0.1)',
          border: isOverLimit
            ? '1px solid rgba(201,35,55,0.4)'
            : isNearLimit
            ? '1px solid rgba(253,224,71,0.4)'
            : '1px solid rgba(134,239,172,0.3)',
        }}
      >
        <span style={{ 
          color: isOverLimit ? '#fca5a5' : isNearLimit ? '#fde047' : '#86efac', 
          fontSize: 12,
          fontWeight: 600,
        }}>
          📏 Máximo: {maxLength} caracteres
        </span>
        <span
          style={{
            color: isOverLimit ? '#fca5a5' : isNearLimit ? '#fde047' : '#86efac',
            fontWeight: 700,
            fontSize: 14,
            fontFamily: 'monospace',
          }}
        >
          {currentLength} / {maxLength}
        </span>
      </div>

      {/* Aviso se excedeu limite */}
      {isOverLimit && (
        <div
          style={{
            marginTop: 6,
            padding: '8px 10px',
            borderRadius: 6,
            background: 'rgba(201,35,55,0.15)',
            border: '1px solid rgba(201,35,55,0.3)',
            color: '#fca5a5',
            fontSize: 12,
          }}
        >
          ⚠️ Texto excede o limite recomendado! Pode aparecer cortado ou estranho no site.
        </div>
      )}
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

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  // [[...slug]] retorna array ou undefined
  // Converte para string: ['studio', 'about'] -> 'studio/about'
  const slugArray = params?.slug as string[] | undefined;
  const slug = slugArray ? slugArray.join('/') : 'home'; // Default para home se vazio

  const [page, setPage] = useState<Page | null>(null);
  const [allPages, setAllPages] = useState<Array<{slug: string; name: string}>>([]);
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translating, setTranslating] = useState<string | null>(null); // campo sendo traduzido
  // Projetos que aparecem nos cards da Home (preview visual + edição inline)
  const [homeFeaturedProjects, setHomeFeaturedProjects] = useState<Array<{
    id: string; title: string; summary: string; priorityHome: number;
    slug: string; heroImage: string | null; tags: string[];
    city: string; country: string; year: number | null;
  }>>([]);
  // Edição inline de projetos na Home
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProjectData, setEditProjectData] = useState<{ title: string; summaryPt: string; priorityHome: number }>({ title: '', summaryPt: '', priorityHome: 0 });
  const [savingProject, setSavingProject] = useState(false);
  const [projectSaveMsg, setProjectSaveMsg] = useState<{ id: string; type: 'success' | 'error'; text: string } | null>(null);

  // Iniciar edição de um projeto
  const startEditProject = useCallback((p: any) => {
    setEditingProjectId(p.id);
    setEditProjectData({ title: p.title, summaryPt: p.summary, priorityHome: p.priorityHome });
    setProjectSaveMsg(null);
  }, []);

  // Cancelar edição
  const cancelEditProject = useCallback(() => {
    setEditingProjectId(null);
    setProjectSaveMsg(null);
  }, []);

  // Salvar projeto editado via API PUT (slots 0 = Não, 1–10 = Principal 1–10)
  const saveEditProject = useCallback(async (projectId: string) => {
    setSavingProject(true);
    setProjectSaveMsg(null);
    const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
    const priority = slots.includes(editProjectData.priorityHome as any) ? editProjectData.priorityHome : Math.min(10, Math.max(0, parseInt(String(editProjectData.priorityHome), 10) || 0));
    const featured = priority > 0;
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editProjectData.title,
          summaryPt: editProjectData.summaryPt,
          priorityHome: priority,
          featured,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erro ao salvar');
      }
      // Ordenação do site: priorityHome asc (1, 2, 3, 4), year desc, title asc
      const sortFeatured = (a: any, b: any) => {
        const pa = a.priorityHome ?? 0, pb = b.priorityHome ?? 0;
        if (pa !== pb) return pa - pb;
        const ya = a.year ?? 0, yb = b.year ?? 0;
        if (yb !== ya) return yb - ya;
        return (a.title || '').localeCompare(b.title || '', 'pt');
      };
      setHomeFeaturedProjects(prev => prev.map(p =>
        p.id === projectId
          ? { ...p, title: editProjectData.title, summary: editProjectData.summaryPt, priorityHome: priority }
          : p
      ).sort(sortFeatured));
      setEditingProjectId(null);
      setProjectSaveMsg({ id: projectId, type: 'success', text: 'Salvo com sucesso!' });
      setTimeout(() => setProjectSaveMsg(null), 3000);
    } catch (err: any) {
      setProjectSaveMsg({ id: projectId, type: 'error', text: err.message || 'Erro ao salvar projeto' });
    } finally {
      setSavingProject(false);
    }
  }, [editProjectData]);

  // Substituir projeto por outro (modal): slot 0=principal, 1–9=secundários (2–10)
  const SLOT_PRIORITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const; // ordem: 1º principal, 2º–10º secundários
  const [replaceSlotIndex, setReplaceSlotIndex] = useState<number | null>(null);
  const [replaceProjectList, setReplaceProjectList] = useState<Array<{ id: string; title: string; slug: string; status: string; year?: number | null; month?: number | null; yearEnd?: number | null; monthEnd?: number | null }>>([]);
  const [replacingProjectId, setReplacingProjectId] = useState<string | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  const openReplaceModal = useCallback(async (slotIndex: number) => {
    setReplaceSlotIndex(slotIndex);
    setReplaceError(null);
    try {
      const res = await fetch('/api/admin/projects?limit=5000');
      if (!res.ok) throw new Error('Falha ao carregar projetos');
      const data = await res.json();
      const priorityForSlot = SLOT_PRIORITIES[slotIndex];
      const currentInSlot = homeFeaturedProjects.find((p: any) => (p.priorityHome ?? 0) === priorityForSlot);
      const others = (data.projects || []).filter((p: any) =>
        p.status === 'PUBLISHED' && p.id !== currentInSlot?.id
      );
      // Ordenar pela data de término (yearEnd ou year): mais recente no topo, mais antigo em baixo; depois por título
      const sorted = [...others].sort((a: any, b: any) => {
        const ya = a.yearEnd ?? a.year ?? 0, yb = b.yearEnd ?? b.year ?? 0;
        if (yb !== ya) return yb - ya;
        const ma = a.monthEnd ?? a.month ?? 0, mb = b.monthEnd ?? b.month ?? 0;
        if (mb !== ma) return mb - ma;
        return (a.title || a.slug || '').localeCompare(b.title || b.slug || '', 'pt');
      });
      setReplaceProjectList(sorted.map((p: any) => ({ id: p.id, title: p.title || p.slug, slug: p.slug, status: p.status, year: p.year ?? null, month: p.month ?? null, yearEnd: p.yearEnd ?? null, monthEnd: p.monthEnd ?? null })));
    } catch (e: any) {
      setReplaceError(e.message || 'Erro ao carregar lista');
      setReplaceProjectList([]);
    }
  }, [homeFeaturedProjects]);

  const confirmReplaceProject = useCallback(async (newProjectId: string) => {
    if (replaceSlotIndex === null) return;
    setReplacingProjectId(newProjectId);
    setReplaceError(null);
    const priorityForSlot = SLOT_PRIORITIES[replaceSlotIndex];
    try {
      // Só atribuir o novo projeto ao slot; a API já desocupa quem estava nesse slot (updateMany)
      const rNew = await fetch(`/api/admin/projects/${newProjectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: true, priorityHome: priorityForSlot }),
      });
      if (!rNew.ok) {
        const errBody = await rNew.json().catch(() => ({}));
        const msg = errBody?.error || rNew.statusText || 'Erro ao colocar projeto na vaga';
        throw new Error(`${msg} (HTTP ${rNew.status})`);
      }
      setReplaceSlotIndex(null);
      const res = await fetch('/api/admin/projects?featured=true');
      if (res.ok) {
        const data = await res.json();
        const featuredList = (data.projects || []).slice(0, 10).map((p: any) => ({
          id: p.id,
          title: p.title || p.shortTitle || p.slug || 'Sem título',
          summary: p.summaryPt || p.summaryEn || '',
          priorityHome: p.priorityHome ?? 0,
          slug: p.slug,
          heroImage: p.heroImage?.mediumUrl || p.heroImage?.largeUrl || p.heroImage?.originalUrl || p.thumbnailUrl || null,
          tags: (p.tags || []).map((t: any) => t.labelPt || t.labelEn || t.slug || 'tag').slice(0, 3),
          city: p.city,
          country: p.country,
          year: p.year,
        }));

        if (featuredList.length < 10) {
          const allRes = await fetch('/api/admin/projects?limit=5000');
          if (allRes.ok) {
            const allData = await allRes.json();
            const usedIds = new Set(featuredList.map((p: any) => p.id));
            const fillers = (allData.projects || [])
              .filter((p: any) => p.status === 'PUBLISHED' && !usedIds.has(p.id))
              .slice(0, 10 - featuredList.length)
              .map((p: any, idx: number) => ({
                id: p.id,
                title: p.title || p.shortTitle || p.slug || 'Sem título',
                summary: p.summaryPt || p.summaryEn || '',
                priorityHome: p.priorityHome || (featuredList.length + idx + 1),
                slug: p.slug,
                heroImage: p.heroImage?.mediumUrl || p.heroImage?.largeUrl || p.heroImage?.originalUrl || p.thumbnailUrl || null,
                tags: (p.tags || []).map((t: any) => t.labelPt || t.labelEn || t.slug || 'tag').slice(0, 3),
                city: p.city,
                country: p.country,
                year: p.year,
              }));
            setHomeFeaturedProjects([...featuredList, ...fillers]);
          } else {
            setHomeFeaturedProjects(featuredList);
          }
        } else {
          setHomeFeaturedProjects(featuredList);
        }
      }
    } catch (e: any) {
      setReplaceError(e.message || 'Erro ao substituir');
    } finally {
      setReplacingProjectId(null);
    }
  }, [replaceSlotIndex, homeFeaturedProjects]);

  // Upload de imagem/vídeo de capa para projetos em destaque
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const handleHeroImageUpload = useCallback(async (projectId: string, file: File) => {
    setUploadingImageId(projectId);
    setUploadProgress('Enviando...');
    setProjectSaveMsg(null);
    try {
      // 1. Upload do arquivo
      const formData = new FormData();
      formData.append('file', file);
      setUploadProgress('Enviando arquivo...');
      const uploadRes = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({}));
        throw new Error(err.error || 'Falha no upload');
      }
      const { media } = await uploadRes.json();

      // 2. Associar ao projeto como heroImage
      setUploadProgress('Atualizando projeto...');
      const updateRes = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImageId: media.id }),
      });
      if (!updateRes.ok) throw new Error('Erro ao atualizar imagem do projeto');

      // 3. Atualizar preview local
      const newUrl = media.mediumUrl || media.largeUrl || media.originalUrl || media.thumbnailUrl;
      setHomeFeaturedProjects(prev => prev.map(p =>
        p.id === projectId ? { ...p, heroImage: newUrl } : p
      ));
      setProjectSaveMsg({ id: projectId, type: 'success', text: 'Imagem atualizada!' });
      setTimeout(() => setProjectSaveMsg(null), 3000);
    } catch (err: any) {
      setProjectSaveMsg({ id: projectId, type: 'error', text: err.message || 'Erro no upload' });
    } finally {
      setUploadingImageId(null);
      setUploadProgress('');
    }
  }, []);

  // Accordion: seção aberta (só uma por vez — evita "tripa" gigante)
  const [openSection, setOpenSection] = useState<string | null>(slug === 'home' ? 'heroMedia' : 'basico');
  const handleSectionToggle = useCallback((id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    seoTitlePt: '',
    seoTitleEn: '',
    seoTitleEs: '',    // NOVO: SEO ES
    seoTitleFr: '',    // NOVO: SEO FR
    seoDescPt: '',
    seoDescEn: '',
    seoDescEs: '',     // NOVO: SEO ES
    seoDescFr: '',     // NOVO: SEO FR
    heroSloganPt: '',
    heroSloganEn: '',
    heroSloganEs: '',
    heroSloganFr: '',
    heroSubtitlePt: '',
    heroSubtitleEn: '',
    heroSubtitleEs: '',
    heroSubtitleFr: '',
    // ═══ Hero Description MOBILE/DESKTOP ═══
    heroDescriptionMobilePt: '',
    heroDescriptionMobileEn: '',
    heroDescriptionMobileEs: '',
    heroDescriptionMobileFr: '',
    heroDescriptionDesktopPt: '',
    heroDescriptionDesktopEn: '',
    heroDescriptionDesktopEs: '',
    heroDescriptionDesktopFr: '',
    // Pillars
    pillar1Pt: '',
    pillar1En: '',
    pillar1Es: '',
    pillar1Fr: '',
    pillar2Pt: '',
    pillar2En: '',
    pillar2Es: '',
    pillar2Fr: '',
    pillar3Pt: '',
    pillar3En: '',
    pillar3Es: '',
    pillar3Fr: '',
    // Hero Media (IDs + URLs manuais)
    heroBackgroundImageId: '',
    heroBackgroundImageUrl: '',
    demoreelVideoId: '',
    demoreelVideoUrl: '',
    // Vídeos Multilíngues (valores padrão para Chris Milk)
    videoPt: '/ChrisMilk.mp4',
    videoEn: '',
    videoEs: '',
    videoFr: '',
    thumbPt: '/chris-milk-thumbnail.jpg',
    thumbEn: '/chris-milk-thumbnail.jpg',
    thumbEs: '/chris-milk-thumbnail.jpg',
    thumbFr: '/chris-milk-thumbnail.jpg',
    status: 'PUBLISHED',
    // ═══ Curadoria do momento (página Work) ═══
    curationTitlePt: '',
    curationTitleEn: '',
    curationTitleEs: '',
    curationTitleFr: '',
    curationDescriptionPt: '',
    curationDescriptionEn: '',
    curationDescriptionEs: '',
    curationDescriptionFr: '',
    curationButtonTextPt: '',
    curationButtonTextEn: '',
    curationButtonTextEs: '',
    curationButtonTextFr: '',
    curationFilterCategory: '',
  });

  useEffect(() => {
    async function fetchPage() {
      try {
        console.log('[EditPage] Buscando página com slug:', slug);
        console.log('[EditPage] URL da API:', `/api/admin/pages/${slug}`);
        // Buscar página atual
        const res = await fetch(`/api/admin/pages/${slug}`);
        console.log('[EditPage] Resposta da API:', res.status, res.statusText);
        if (!res.ok) {
          const errorText = await res.text();
          console.error('[EditPage] Erro da API:', errorText);
          throw new Error(`Página não encontrada: ${res.status} - ${errorText}`);
        }
        const data = await res.json();
        setPage(data);
        setFormData({
          name: data.name || '',
          seoTitlePt: data.seoTitlePt || '',
          seoTitleEn: data.seoTitleEn || '',
          seoTitleEs: data.seoTitleEs || '',    // NOVO: SEO ES
          seoTitleFr: data.seoTitleFr || '',    // NOVO: SEO FR
          seoDescPt: data.seoDescPt || '',
          seoDescEn: data.seoDescEn || '',
          seoDescEs: data.seoDescEs || '',      // NOVO: SEO ES
          seoDescFr: data.seoDescFr || '',      // NOVO: SEO FR
          heroSloganPt: data.heroSloganPt || '',
          heroSloganEn: data.heroSloganEn || '',
          heroSloganEs: data.heroSloganEs || '',
          heroSloganFr: data.heroSloganFr || '',
          heroSubtitlePt: data.heroSubtitlePt || '',
          heroSubtitleEn: data.heroSubtitleEn || '',
          heroSubtitleEs: data.heroSubtitleEs || '',
          heroSubtitleFr: data.heroSubtitleFr || '',
          // ═══ Hero Description MOBILE/DESKTOP ═══
          heroDescriptionMobilePt: data.heroDescriptionMobilePt || '',
          heroDescriptionMobileEn: data.heroDescriptionMobileEn || '',
          heroDescriptionMobileEs: data.heroDescriptionMobileEs || '',
          heroDescriptionMobileFr: data.heroDescriptionMobileFr || '',
          heroDescriptionDesktopPt: data.heroDescriptionDesktopPt || '',
          heroDescriptionDesktopEn: data.heroDescriptionDesktopEn || '',
          heroDescriptionDesktopEs: data.heroDescriptionDesktopEs || '',
          heroDescriptionDesktopFr: data.heroDescriptionDesktopFr || '',
          // Pillars
          pillar1Pt: data.pillar1Pt || '',
          pillar1En: data.pillar1En || '',
          pillar1Es: data.pillar1Es || '',
          pillar1Fr: data.pillar1Fr || '',
          pillar2Pt: data.pillar2Pt || '',
          pillar2En: data.pillar2En || '',
          pillar2Es: data.pillar2Es || '',
          pillar2Fr: data.pillar2Fr || '',
          pillar3Pt: data.pillar3Pt || '',
          pillar3En: data.pillar3En || '',
          pillar3Es: data.pillar3Es || '',
          pillar3Fr: data.pillar3Fr || '',
          // Hero Media (IDs + URLs)
          heroBackgroundImageId: data.heroBackgroundImageId || '',
          heroBackgroundImageUrl: data.heroBackgroundImageUrl || '',
          demoreelVideoId: data.demoreelVideoId || '',
          demoreelVideoUrl: data.demoreelVideoUrl || '',
          // Vídeos Multilíngues
          videoPt: data.videoPt || '/ChrisMilk.mp4',
          videoEn: data.videoEn || '',
          videoEs: data.videoEs || '',
          videoFr: data.videoFr || '',
          thumbPt: data.thumbPt || '/chris-milk-thumbnail.jpg',
          thumbEn: data.thumbEn || '/chris-milk-thumbnail.jpg',
          thumbEs: data.thumbEs || '/chris-milk-thumbnail.jpg',
          thumbFr: data.thumbFr || '/chris-milk-thumbnail.jpg',
          status: data.status || 'PUBLISHED',
          // ═══ Curadoria do momento (página Work) ═══
          curationTitlePt: data.curationTitlePt || '',
          curationTitleEn: data.curationTitleEn || '',
          curationTitleEs: data.curationTitleEs || '',
          curationTitleFr: data.curationTitleFr || '',
          curationDescriptionPt: data.curationDescriptionPt || '',
          curationDescriptionEn: data.curationDescriptionEn || '',
          curationDescriptionEs: data.curationDescriptionEs || '',
          curationDescriptionFr: data.curationDescriptionFr || '',
          curationButtonTextPt: data.curationButtonTextPt || '',
          curationButtonTextEn: data.curationButtonTextEn || '',
          curationButtonTextEs: data.curationButtonTextEs || '',
          curationButtonTextFr: data.curationButtonTextFr || '',
          curationFilterCategory: data.curationFilterCategory || '',
        });

        // Buscar lista de todas as páginas para o dropdown
        const pagesRes = await fetch('/api/admin/pages?limit=100');
        if (pagesRes.ok) {
          const pagesData = await pagesRes.json();
          setAllPages(pagesData.pages?.map((p: any) => ({ slug: p.slug, name: p.name })) || []);
        }

        // Buscar lista de media para os dropdowns
        const mediaRes = await fetch('/api/admin/media?limit=100');
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          setAllMedia(mediaData.media || []);
        }
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

  // Buscar projetos em destaque na Home — MESMA query da API pública (site)
  // Usa ?featured=true que executa a MESMA query Prisma no servidor:
  // featured=true, priorityHome > 0, PUBLISHED, orderBy priorityHome desc, year desc, title asc
  // Isso garante que o backoffice mostra EXATAMENTE os mesmos projetos que o site público
  useEffect(() => {
    if (slug !== 'home') return;
    let cancelled = false;
    (async () => {
      try {
        // featured=true: API retorna MESMA query que a API pública usa
        const res = await fetch('/api/admin/projects?featured=true');
        if (!res.ok || cancelled) return;
        const data = await res.json();
        // Já vem filtrado e ordenado do servidor (mesma query da API pública)
        // Não precisa filtrar nem ordenar client-side!
        const featuredList = (data.projects || [])
          .slice(0, 10)
          .map((p: any) => ({
            id: p.id,
            title: p.title || p.shortTitle || p.slug || 'Sem título',
            summary: p.summaryPt || p.summaryEn || '',
            priorityHome: p.priorityHome ?? 0,
            slug: p.slug,
            heroImage: p.heroImage?.mediumUrl || p.heroImage?.largeUrl || p.heroImage?.originalUrl || p.thumbnailUrl || null,
            tags: (p.tags || []).map((t: any) => t.labelPt || t.labelEn || t.slug || 'tag').slice(0, 3),
            city: p.city,
            country: p.country,
            year: p.year,
          }));

        if (featuredList.length < 10) {
          const allRes = await fetch('/api/admin/projects?limit=5000');
          if (allRes.ok && !cancelled) {
            const allData = await allRes.json();
            const usedIds = new Set(featuredList.map((p: any) => p.id));
            const fillers = (allData.projects || [])
              .filter((p: any) => p.status === 'PUBLISHED' && !usedIds.has(p.id))
              .slice(0, 10 - featuredList.length)
              .map((p: any, idx: number) => ({
                id: p.id,
                title: p.title || p.shortTitle || p.slug || 'Sem título',
                summary: p.summaryPt || p.summaryEn || '',
                priorityHome: p.priorityHome || (featuredList.length + idx + 1),
                slug: p.slug,
                heroImage: p.heroImage?.mediumUrl || p.heroImage?.largeUrl || p.heroImage?.originalUrl || p.thumbnailUrl || null,
                tags: (p.tags || []).map((t: any) => t.labelPt || t.labelEn || t.slug || 'tag').slice(0, 3),
                city: p.city,
                country: p.country,
                year: p.year,
              }));
            setHomeFeaturedProjects([...featuredList, ...fillers]);
          } else if (!cancelled) {
            setHomeFeaturedProjects(featuredList);
          }
        } else if (!cancelled) {
          setHomeFeaturedProjects(featuredList);
        }
      } catch {
        if (!cancelled) setHomeFeaturedProjects([]);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  // Função de tradução automática
  async function handleTranslate(fieldKey: string, targetLang: 'en' | 'es' | 'fr') {
    // Campo fonte sempre é o PT
    const sourceField = `${fieldKey}Pt` as keyof typeof formData;
    // Campo destino: En, Es, Fr (com primeira letra maiúscula)
    const targetLangCapitalized = targetLang.charAt(0).toUpperCase() + targetLang.slice(1);
    const targetField = `${fieldKey}${targetLangCapitalized}` as keyof typeof formData;
    const sourceText = formData[sourceField] as string;

    if (!sourceText || !sourceText.trim()) {
      setError('Preencha primeiro o campo em português para traduzir.');
      return;
    }

    setTranslating(`${fieldKey}-${targetLang}`);
    setError(null);

    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          from: 'pt',
          to: targetLang,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao traduzir');
      }

      const data = await res.json();
      setFormData({
        ...formData,
        [targetField]: data.translatedText,
      });
    } catch (err: any) {
      console.error('Translate error:', err);
      setError(err.message || 'Erro ao traduzir. Verifique se a API de IA está configurada.');
    } finally {
      setTranslating(null);
    }
  }

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
          margin: 40,
        }}
      >
        {error}
      </div>
    );
  }

  if (!page) {
    return null;
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Animações CSS para spinners e pulso */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
      {/* Breadcrumb Principal com Dropdown - REDUNDÂNCIA VISUAL */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
          padding: '16px 20px',
          borderRadius: 12,
          background: 'rgba(201,35,55,0.08)',
          border: '1px solid rgba(201,35,55,0.2)',
          flexWrap: 'wrap',
        }}
      >
        {/* Breadcrumb Texto */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: '#8f8ba2',
            flex: 1,
          }}
        >
          <button
            type="button"
            onClick={() => router.push('/admin/site-pages')}
            style={{
              background: 'none',
              border: 'none',
              color: '#c0bccf',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: 14,
              padding: 0,
              fontWeight: 500,
            }}
          >
            📄 Páginas
          </button>
          <span style={{ color: '#8f8ba2' }}>›</span>
          <span style={{ color: '#e8e6f2', fontWeight: 600, fontSize: 15 }}>
            {page?.name || slug}
          </span>
          <span style={{ color: '#8f8ba2', fontSize: 13, marginLeft: 8 }}>
            ({slug === 'home' ? 'Página Principal' : slug.includes('studio') ? 'Menu: Estúdio' : slug.includes('academy') ? 'Menu: Academy' : slug.includes('work') ? 'Menu: Projetos' : slug.includes('what') ? 'Menu: Soluções' : 'Página'})
          </span>
        </div>

        {/* Dropdown de Navegação Rápida - ESTILO AZIMUT */}
        <div style={{ position: 'relative' }}>
          <select
            value={slug}
            onChange={(e) => {
              if (e.target.value !== slug) {
                router.push(`/admin/pages/edit/${e.target.value}`);
              }
            }}
            style={{
              // Estilo Azimut Dropdown (do site principal)
              padding: '12px 40px 12px 16px',
              borderRadius: 8,
              border: '1px solid rgba(201, 35, 55, 0.4)',
              background: 'rgba(10, 15, 30, 0.95)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              appearance: 'none',
              // Seta customizada vermelha
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c92337'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '1.2em',
              minWidth: 280,
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.6)';
              e.currentTarget.style.background = 'rgba(10, 15, 30, 0.98)';
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(201, 35, 55, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.4)';
              e.currentTarget.style.background = 'rgba(10, 15, 30, 0.95)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {allPages.length > 0 ? (
              (() => {
                // Organizar páginas por categoria
                const homePages = allPages.filter(p => p.slug === 'home');
                const mainMenuPages = allPages.filter(p => ['what', 'work'].includes(p.slug));
                const studioPages = allPages.filter(p => p.slug.startsWith('studio/') || p.slug === 'studio');
                const academyPages = allPages.filter(p => p.slug.startsWith('academy/') || p.slug === 'academy');
                const otherPages = allPages.filter(p => 
                  p.slug !== 'home' && 
                  !['what', 'work'].includes(p.slug) && 
                  !p.slug.startsWith('studio') && 
                  !p.slug.startsWith('academy')
                );

                // Ordenar: principal primeiro, depois subpáginas
                const sortStudio = studioPages.sort((a, b) => {
                  if (a.slug === 'studio') return -1;
                  if (b.slug === 'studio') return 1;
                  return a.name.localeCompare(b.name);
                });
                
                const sortAcademy = academyPages.sort((a, b) => {
                  if (a.slug === 'academy') return -1;
                  if (b.slug === 'academy') return 1;
                  return a.name.localeCompare(b.name);
                });

                return (
                  <>
                    {homePages.length > 0 && (
                      <optgroup label="━━━ 🏠 PRINCIPAL ━━━" style={{ background: 'rgba(201, 35, 55, 0.1)', color: '#ffffff', fontWeight: 'bold' }}>
                        {homePages.map(p => (
                          <option key={p.slug} value={p.slug} style={{ background: 'rgba(10, 15, 30, 0.98)', color: '#ffffff', padding: '8px' }}>
                            🏠 {p.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {mainMenuPages.length > 0 && (
                      <optgroup label="━━━ 📋 MENU PRINCIPAL ━━━" style={{ background: 'rgba(201, 35, 55, 0.1)', color: '#ffffff', fontWeight: 'bold' }}>
                        {mainMenuPages.map(p => (
                          <option key={p.slug} value={p.slug} style={{ background: 'rgba(10, 15, 30, 0.98)', color: '#ffffff', padding: '8px' }}>
                            {p.slug === 'work' ? '💼' : '🎯'} {p.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {sortStudio.length > 0 && (
                      <optgroup label="━━━ 🎨 ESTÚDIO ━━━" style={{ background: 'rgba(201, 35, 55, 0.1)', color: '#ffffff', fontWeight: 'bold' }}>
                        {sortStudio.map(p => (
                          <option key={p.slug} value={p.slug} style={{ background: 'rgba(10, 15, 30, 0.98)', color: '#ffffff', padding: '8px' }}>
                            {p.slug === 'studio' ? '🎨 ' + p.name : '  └─ ' + p.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {sortAcademy.length > 0 && (
                      <optgroup label="━━━ 🎓 ACADEMY ━━━" style={{ background: 'rgba(201, 35, 55, 0.1)', color: '#ffffff', fontWeight: 'bold' }}>
                        {sortAcademy.map(p => (
                          <option key={p.slug} value={p.slug} style={{ background: 'rgba(10, 15, 30, 0.98)', color: '#ffffff', padding: '8px' }}>
                            {p.slug === 'academy' ? '🎓 ' + p.name : '  └─ ' + p.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {otherPages.length > 0 && (
                      <optgroup label="━━━ 📧 OUTROS ━━━" style={{ background: 'rgba(201, 35, 55, 0.1)', color: '#ffffff', fontWeight: 'bold' }}>
                        {otherPages.map(p => (
                          <option key={p.slug} value={p.slug} style={{ background: 'rgba(10, 15, 30, 0.98)', color: '#ffffff', padding: '8px' }}>
                            📄 {p.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </>
                );
              })()
            ) : (
              <option value={slug}>{page?.name || slug}</option>
            )}
          </select>
        </div>
      </div>

      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
          Editar Página: {page?.name}
        </h1>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
          Slug: /{slug} • Status: {page?.status}
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

      {/* ═══ GUIA RÁPIDO: Onde atualizar o quê ═══ */}
      <div style={{ marginBottom: 24, padding: 20, borderRadius: 12, border: '1px solid rgba(56, 189, 248, 0.35)', background: 'rgba(56, 189, 248, 0.06)' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600, color: '#fff' }}>
          🧭 Guia rápido — O que você quer atualizar?
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#94a3b8' }}>
          Clique no bloco para ir direto à área. Assim você não precisa rolar a página inteira.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { id: 'basico', label: '📋 Nome e status' },
            { id: 'heroTexto', label: '🎯 Textos do topo' },
            { id: 'heroSubtitle', label: '📝 Subtítulo' },
            { id: 'heroDescription', label: '📱💻 Mobile/Desktop' },
          ].map((btn) => (
            <button key={btn.id} type="button" onClick={() => handleSectionToggle(btn.id)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.4)', background: openSection === btn.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.1)', color: '#7dd3fc', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              {btn.label}
            </button>
          ))}
          {slug !== 'studio' && slug !== 'studio/diferenciais' && (
            <button type="button" onClick={() => handleSectionToggle('midia')} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.4)', background: openSection === 'midia' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.1)', color: '#7dd3fc', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              📸 Vídeo e capa
            </button>
          )}
          {slug === 'home' && (
            <button type="button" onClick={() => handleSectionToggle('heroMedia')} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(201,35,55,0.5)', background: openSection === 'heroMedia' ? 'rgba(201,35,55,0.2)' : 'rgba(201,35,55,0.1)', color: '#fca5a5', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              🎥 Demoreel (Watch Our Work)
            </button>
          )}
          {slug === 'home' && (
            <button type="button" onClick={() => handleSectionToggle('pillars')} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.4)', background: openSection === 'pillars' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.1)', color: '#7dd3fc', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              💡 Pilares
            </button>
          )}
          {slug === 'home' && (
            <a href="#destaques-preview" style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(201,35,55,0.5)', background: 'rgba(201,35,55,0.1)', color: '#fca5a5', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              🏆 Projetos em Destaque ↓
            </a>
          )}
          <button type="button" onClick={() => handleSectionToggle('seo')} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.4)', background: openSection === 'seo' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.1)', color: '#7dd3fc', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            🔍 SEO (Google)
          </button>
          {slug === 'work' && (
            <button type="button" onClick={() => handleSectionToggle('curadoria')} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(201,35,55,0.5)', background: openSection === 'curadoria' ? 'rgba(201,35,55,0.2)' : 'rgba(201,35,55,0.1)', color: '#fca5a5', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              🎪 Curadoria do momento
            </button>
          )}
        </div>

        {/* Preview: Hero da Home (como no site) — mesmo padrão visual dos Projetos */}
        {slug === 'home' && (
          <MediaPreviewBlock
            title="Hero da Home — como aparece no site"
            mainLabel="Imagem de fundo ou vídeo demoreel"
            mainImageUrl={formData.heroBackgroundImageUrl || null}
            mainVideoUrl={
              formData.demoreelVideoUrl ||
              (formData.demoreelVideoId
                ? (allMedia.find((m) => m.id === formData.demoreelVideoId && m.type === 'VIDEO')?.originalUrl || null)
                : null)
            }
            mainTitle={formData.heroSloganPt || 'Home'}
            mainOnly
            galleryEmptyMessage="Use a seção « Hero Media » abaixo para trocar imagem ou vídeo."
          />
        )}

        {/* Preview hero para páginas Academy (cursos, workshops, corporate, vancouver, etc.) — se tiver hero */}
        {slug !== 'home' && slug?.includes('academy') && (
          <MediaPreviewBlock
            title="Hero da página Academy — como aparece no site"
            mainLabel="Imagem de fundo / hero"
            mainImageUrl={formData.heroBackgroundImageUrl || null}
            mainTitle={formData.name || 'Academy'}
            mainOnly
            galleryEmptyMessage="Use a seção « Vídeo e capa » abaixo para definir a imagem de hero."
          />
        )}

        {/* Preview hero para página Newsletter (se existir e tiver hero) */}
        {slug === 'newsletter' && (
          <MediaPreviewBlock
            title="Hero da página Newsletter — como aparece no site"
            mainLabel="Imagem de fundo / hero"
            mainImageUrl={formData.heroBackgroundImageUrl || null}
            mainTitle={formData.name || 'Newsletter'}
            mainOnly
            galleryEmptyMessage="Use a seção « Vídeo e capa » abaixo para definir a imagem de hero."
          />
        )}

        {/* ═══ SEÇÃO: Projetos em Destaque (visual) - SEMPRE VISÍVEL na Home ═══ */}
        {slug === 'home' && (
          <div id="destaques-preview" style={{ marginTop: 20, padding: 24, borderRadius: 14, background: 'linear-gradient(135deg, rgba(201,35,55,0.08), rgba(15,23,42,0.95))', border: '2px solid rgba(201,35,55,0.3)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fca5a5' }}>
                🏆 Projetos em Destaque na Home
              </h3>
              <a href="/admin/projects" style={{ fontSize: 12, color: '#7dd3fc', textDecoration: 'underline' }}>
                Gerenciar projetos →
              </a>
            </div>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
              Edite título, resumo e prioridade diretamente aqui. As alterações são salvas no projeto e refletem no site (Home + Work). A ordem abaixo é a mesma do site: maior prioridade = card principal; empate = ano (mais recente) e depois título.
            </p>

            {/* Mensagem: Home no site ajusta ao comportamento do usuário */}
            <div style={{ marginBottom: 16, padding: '12px 14px', borderRadius: 10, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>👤</span>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                <strong style={{ color: '#7dd3fc' }}>Comportamento do visitante:</strong> A ordem que você define aqui é a <strong>base</strong> do site. Na Home pública: o <strong>destaque principal</strong> (POS 1) é sempre o que você escolheu; os <strong>3 cards abaixo</strong> podem ser reordenados automaticamente conforme o visitante interage (categorias clicadas, projetos vistos). Visitante novo vê exatamente esta ordem; quem já navegou no site pode ver os 3 cards na ordem do interesse dele.
              </div>
            </div>

            {/* Ordem e prioridades: slots 1–10 (0 = não exibir) */}
            <div style={{ marginBottom: 16, padding: '14px 18px', borderRadius: 10, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>📌</span>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
                <strong style={{ color: '#86efac' }}>Ordem na Home (prioridade explícita):</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20, listStyle: 'disc' }}>
                  <li><strong style={{ color: '#fbbf24' }}>1º — Principal (slot 1)</strong> — card grande no topo</li>
                  <li><strong style={{ color: '#86efac' }}>2º–4º — Secundários (slots 2, 3, 4)</strong> — primeira linha de 3 cards</li>
                  <li><strong style={{ color: '#86efac' }}>5º–7º — Secundários (slots 5, 6, 7)</strong> — segunda linha de 3 cards</li>
                  <li><strong style={{ color: '#86efac' }}>8º–10º — Secundários (slots 8, 9, 10)</strong> — terceira linha de 3 cards</li>
                </ul>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: '#64748b' }}>
                  Use <strong style={{ color: '#f59e0b' }}>Substituir</strong> para trocar o projeto da vaga por outro existente; <strong style={{ color: '#3b82f6' }}>Novo aqui</strong> para criar um projeto que já entra nessa posição.
                </p>
              </div>
            </div>

            {/* Imagens: tamanho, formato, sem corte, otimização automática (PT/EN/ES/FR) */}
            <div style={{ marginBottom: 16, padding: '14px 18px', borderRadius: 10, background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🖼️</span>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.65 }}>
                <strong style={{ color: '#e9d5ff' }}>Imagens dos cards (aplica a todos os idiomas do site: PT, EN, ES, FR)</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20, listStyle: 'disc' }}>
                  <li><strong>Sem cortes nem distorção:</strong> a imagem sempre se encaixa no card por completo (<em>object-contain</em>). Se a proporção for diferente do card, aparecem faixas laterais ou verticais (fundo escuro).</li>
                  <li><strong>Destaque principal (card grande):</strong> melhor em <strong>1920×1080 px</strong> (proporção 16:9). Formato: JPG ou PNG, ideal até 2 MB.</li>
                  <li><strong>Cards secundários (3 menores):</strong> melhor em <strong>800×600 px</strong> (proporção 4:3). JPG ou PNG, ideal até 1 MB.</li>
                  <li><strong>Vídeo de capa:</strong> MP4 ou WebM, máx. 25 MB.</li>
                </ul>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: '#86efac' }}>
                  <strong>Otimização:</strong> ao subir a imagem pelo backoffice (Trocar imagem / Upload), o sistema <strong>já otimiza automaticamente</strong> para o site: gera thumbnail, tamanho médio, grande e WebP. Não é necessário otimizar manualmente nem uma por uma.
                </p>
              </div>
            </div>

            {/* Label: Preview do Site */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: '4px 12px', borderRadius: 20, background: 'rgba(201,35,55,0.15)', border: '1px solid rgba(201,35,55,0.3)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }}></span>
              <span style={{ fontSize: 11, color: '#fca5a5', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Preview ao vivo — exatamente como aparece no site</span>
            </div>

            {homeFeaturedProjects.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '2px dashed rgba(201,35,55,0.3)' }}>
                <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>🖼️</span>
                <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 8px' }}>Nenhum projeto em destaque configurado</p>
                <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Vá em <a href="/admin/projects" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Projetos</a>, ative <strong style={{ color: '#fca5a5' }}>featured = true</strong> e defina <strong style={{ color: '#fca5a5' }}>prioridade &gt; 0</strong></p>
              </div>
            ) : (
              <div style={{ background: '#0a0e1a', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                {/* ═══ TÍTULO como no site ═══ */}
                <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontFamily: '"Playfair Display", serif' }}>
                    PROJETOS EM DESTAQUE
                  </h2>
                  <p style={{ margin: '8px 0 0', fontSize: 12, color: '#64748b' }}>
                    Uma seleção dos nossos trabalhos mais emblemáticos
                  </p>
                  <p style={{ margin: '14px 16px 0', padding: '10px 16px', borderRadius: 8, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)', fontSize: 13, color: '#86efac', fontWeight: 600 }}>
                    ✏️ Para editar: clique no botão verde <strong>EDITAR ESTE PROJETO</strong> em cada card (em cima da imagem ou logo abaixo do texto).
                  </p>
                </div>

                {/* ═══ CARD PRINCIPAL (destaque grande) — edição inline ═══ */}
                {homeFeaturedProjects[0] && (() => {
                  const p0 = homeFeaturedProjects[0];
                  const isEditing = editingProjectId === p0.id;
                  return (
                  <div style={{ margin: '20px 20px 0', borderRadius: 14, overflow: 'hidden', position: 'relative', border: isEditing ? '2px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.08)' }}>
                    {/* Imagem grande + Upload */}
                    <div style={{ position: 'relative', paddingTop: '50%', background: '#111827' }}>
                      {p0.heroImage ? (
                        <img src={p0.heroImage} alt={p0.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', backgroundColor: '#0f172a' }} />
                      ) : (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, gap: 8, background: 'linear-gradient(135deg, rgba(201,35,55,0.2), rgba(10,14,26,0.9))' }}>
                          <span style={{ fontSize: 48, opacity: 0.3 }}>🖼️</span>
                          <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>Sem imagem de capa</p>
                        </div>
                      )}
                      {/* Overlay de upload em progresso */}
                      {uploadingImageId === p0.id && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 10 }}>
                          <div style={{ width: 40, height: 40, border: '3px solid rgba(34,197,94,0.3)', borderTopColor: '#22c55e', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                          <span style={{ color: '#86efac', fontSize: 13, fontWeight: 600 }}>{uploadProgress}</span>
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(10,14,26,0.95), transparent)', pointerEvents: 'none' }}></div>
                      {/* Badge de posição */}
                      <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                        <span style={{ background: 'rgba(201,35,55,0.9)', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, backdropFilter: 'blur(8px)' }}>DESTAQUE PRINCIPAL</span>
                        <span style={{ background: 'rgba(0,0,0,0.6)', color: '#86efac', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, backdropFilter: 'blur(8px)' }}>P{p0.priorityHome}</span>
                      </div>
                      {/* Botões: upload, editar, completo */}
                      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                        {/* Botão Upload Imagem */}
                        <label style={{ background: 'rgba(168,85,247,0.85)', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: uploadingImageId === p0.id ? 'wait' : 'pointer', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          📷 {p0.heroImage ? 'Trocar imagem' : 'Upload imagem'}
                          <input type="file" accept="image/*,video/mp4,video/webm" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleHeroImageUpload(p0.id, f); e.target.value = ''; }} disabled={uploadingImageId === p0.id} />
                        </label>
                        {!isEditing && (
                          <button type="button" onClick={() => startEditProject(p0)} style={{ background: '#22c55e', color: '#fff', padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700, border: '2px solid #fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            ✏️ EDITAR ESTE PROJETO
                          </button>
                        )}
                        <button type="button" onClick={() => openReplaceModal(0)} style={{ background: 'rgba(245,158,11,0.85)', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          🔄 Substituir
                        </button>
                        <a href={`/admin/projects/new?fromHomeSlot=0`} style={{ background: 'rgba(59,130,246,0.85)', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          ➕ Novo aqui
                        </a>
                        <a href={`/admin/projects/${p0.id}`} style={{ background: 'rgba(0,0,0,0.6)', color: '#7dd3fc', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          Completo →
                        </a>
                      </div>
                      {/* Info de tamanho recomendado */}
                      <div style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(0,0,0,0.6)', padding: '3px 10px', borderRadius: 6, backdropFilter: 'blur(8px)' }}>
                        <span style={{ fontSize: 10, color: '#94a3b8' }}>Principal: 1920×1080 (16:9) · Secundários: 800×600 (4:3) · JPG/PNG · Upload otimiza automaticamente</span>
                      </div>
                    </div>
                    {/* Info abaixo da imagem — MODO EDIÇÃO ou MODO LEITURA */}
                    <div style={{ padding: '16px 20px 20px', background: 'rgba(10,14,26,0.95)' }}>
                      {/* Tags */}
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                        {p0.tags?.map((tag: string, i: number) => (
                          <span key={i} style={{ padding: '3px 10px', borderRadius: 20, background: 'rgba(201,35,55,0.2)', border: '1px solid rgba(201,35,55,0.4)', color: '#fca5a5', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.03em' }}>{tag}</span>
                        ))}
                        {(p0.city || p0.country) && (
                          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>
                            📍 {[p0.city, p0.country].filter(Boolean).join(', ')}
                          </span>
                        )}
                      </div>

                      {isEditing ? (
                        /* ═══ MODO EDIÇÃO INLINE ═══ */
                        <div style={{ display: 'grid', gap: 12 }}>
                          <p style={{ margin: '0 0 4px', fontSize: 12, color: '#86efac', fontWeight: 600 }}>
                            Edição rápida: altere título, resumo e prioridade abaixo. Para descrição completa, galeria e imagens, use o link ao final.
                          </p>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, color: '#86efac', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Título do projeto</label>
                            <input
                              type="text"
                              value={editProjectData.title}
                              onChange={e => setEditProjectData(prev => ({ ...prev, title: e.target.value }))}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 18, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em', outline: 'none' }}
                              placeholder="Título do projeto"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, color: '#86efac', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Resumo (PT)</label>
                            <textarea
                              value={editProjectData.summaryPt}
                              onChange={e => setEditProjectData(prev => ({ ...prev, summaryPt: e.target.value }))}
                              rows={3}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#94a3b8', fontSize: 14, lineHeight: 1.6, resize: 'vertical', outline: 'none' }}
                              placeholder="Resumo do projeto em português"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, color: '#86efac', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Posição na Home</label>
                            <select
                              value={editProjectData.priorityHome}
                              onChange={e => setEditProjectData(prev => ({ ...prev, priorityHome: parseInt(e.target.value, 10) || 0 }))}
                              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#86efac', fontSize: 14, fontWeight: 600, outline: 'none', minWidth: 160 }}
                            >
                              <option value={0}>Não exibir na Home</option>
                              <option value={1}>Principal 1 (card grande)</option>
                              <option value={2}>Principal 2</option>
                              <option value={3}>Principal 3</option>
                              <option value={4}>Principal 4</option>
                              <option value={5}>Principal 5</option>
                              <option value={6}>Principal 6</option>
                              <option value={7}>Principal 7</option>
                              <option value={8}>Principal 8</option>
                              <option value={9}>Principal 9</option>
                              <option value={10}>Principal 10</option>
                            </select>
                          </div>
                          {/* Botões salvar/cancelar */}
                          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                            <button type="button" onClick={() => saveEditProject(p0.id)} disabled={savingProject} style={{ padding: '8px 24px', borderRadius: 8, background: savingProject ? '#374151' : 'rgba(34,197,94,0.8)', color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: savingProject ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                              {savingProject ? '⏳ Salvando...' : '💾 Salvar alterações'}
                            </button>
                            <button type="button" onClick={cancelEditProject} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', color: '#94a3b8', fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
                              Cancelar
                            </button>
                          </div>
                          {projectSaveMsg && projectSaveMsg.id === p0.id && (
                            <div style={{ padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: projectSaveMsg.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: projectSaveMsg.type === 'success' ? '#86efac' : '#fca5a5', border: `1px solid ${projectSaveMsg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                              {projectSaveMsg.text}
                            </div>
                          )}
                          <a href={`/admin/projects/${p0.id}`} style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#7dd3fc', textDecoration: 'underline', fontWeight: 600 }}>
                            → Edição completa (descrição, galeria, imagens, todos os campos)
                          </a>
                        </div>
                      ) : (
                        /* ═══ MODO LEITURA (preview) ═══ */
                        <>
                          <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.04em', cursor: 'pointer' }} onClick={() => startEditProject(p0)} title="Clique para editar">
                            {p0.title}
                          </h3>
                          <p style={{ margin: 0, fontSize: 14, color: '#94a3b8', lineHeight: 1.6, cursor: 'pointer' }} onClick={() => startEditProject(p0)} title="Clique para editar">
                            {p0.summary || <em style={{ color: '#475569' }}>Sem descrição — clique para adicionar</em>}
                          </p>
                          {projectSaveMsg && projectSaveMsg.id === p0.id && projectSaveMsg.type === 'success' && (
                            <div style={{ marginTop: 8, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(34,197,94,0.15)', color: '#86efac', display: 'inline-block' }}>
                              {projectSaveMsg.text}
                            </div>
                          )}
                          <div style={{ marginTop: 16, padding: '14px 18px', background: 'rgba(34,197,94,0.12)', borderRadius: 10, border: '2px solid rgba(34,197,94,0.4)' }}>
                            <p style={{ margin: '0 0 10px', fontSize: 11, color: '#86efac', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Edição rápida (título, resumo, prioridade)</p>
                            <button type="button" onClick={() => startEditProject(p0)} style={{ width: '100%', background: '#22c55e', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 2px 10px rgba(34,197,94,0.3)' }}>
                              ✏️ EDITAR ESTE PROJETO
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ padding: '8px 18px', borderRadius: 6, background: 'rgba(201,35,55,0.8)', color: '#fff', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>VER PROJETO</span>
                            <span style={{ padding: '8px 18px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>PROJETO SIMILAR</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  );
                })()}

                {/* ═══ 3 CARDS MENORES (como no site) — edição inline (slots 2,3,4) ═══ */}
                {(homeFeaturedProjects.length > 1 || true) && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, padding: '16px 20px 24px' }}>
                    {[0, 1, 2].map((idx: number) => {
                      const p: any = homeFeaturedProjects[idx + 1] || null;
                      if (!p) {
                        return (
                          <div key={`empty-slot-${idx + 2}`} style={{ borderRadius: 12, overflow: 'hidden', border: '1px dashed rgba(148,163,184,0.35)', background: 'rgba(20,24,39,0.45)', minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ padding: 14 }}>
                              <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700, marginBottom: 8 }}>#{idx + 2} · P{idx + 2}</div>
                              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Slot vazio. Clique em substituir ou criar novo para preencher este destaque.</p>
                            </div>
                            <div style={{ padding: 12, display: 'flex', gap: 8 }}>
                              <button type="button" onClick={() => openReplaceModal(idx + 1)} style={{ flex: 1, background: 'rgba(245,158,11,0.9)', color: '#fff', padding: '8px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' }}>🔄 Substituir</button>
                              <a href={`/admin/projects/new?fromHomeSlot=${idx + 1}`} style={{ flex: 1, textAlign: 'center', background: 'rgba(59,130,246,0.9)', color: '#fff', padding: '8px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>➕ Novo</a>
                            </div>
                          </div>
                        );
                      }
                      const isEditing = editingProjectId === p.id;
                      return (
                      <div key={p.id} style={{ borderRadius: 12, overflow: 'hidden', border: isEditing ? '2px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.06)', background: 'rgba(20,24,39,0.8)' }}>
                        {/* Imagem do card + Upload */}
                        <div style={{ position: 'relative', paddingTop: '65%', background: '#111827' }}>
                          {p.heroImage ? (
                            <img src={p.heroImage} alt={p.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', backgroundColor: '#0f172a' }} />
                          ) : (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, background: 'linear-gradient(135deg, rgba(201,35,55,0.1), rgba(10,14,26,0.8))' }}>
                              <span style={{ fontSize: 32, opacity: 0.3 }}>🖼️</span>
                              <span style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>Sem imagem</span>
                            </div>
                          )}
                          {/* Overlay upload em progresso */}
                          {uploadingImageId === p.id && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 10 }}>
                              <div style={{ width: 28, height: 28, border: '3px solid rgba(34,197,94,0.3)', borderTopColor: '#22c55e', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                              <span style={{ color: '#86efac', fontSize: 10, fontWeight: 600 }}>{uploadProgress}</span>
                            </div>
                          )}
                          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.75)', color: '#86efac', padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, backdropFilter: 'blur(8px)' }}>
                            #{idx + 2} · P{p.priorityHome}
                          </div>
                          {/* Botões: upload, substituir, novo */}
                          <label style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(168,85,247,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: uploadingImageId === p.id ? 'wait' : 'pointer', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 3, zIndex: 5 }}>
                            📷 {p.heroImage ? 'Trocar' : 'Upload'}
                            <input type="file" accept="image/*,video/mp4,video/webm" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleHeroImageUpload(p.id, f); e.target.value = ''; }} disabled={uploadingImageId === p.id} />
                          </label>
                          <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 4, zIndex: 5 }}>
                            <button type="button" onClick={() => openReplaceModal(idx + 1)} style={{ background: 'rgba(245,158,11,0.9)', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, border: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)' }} title="Substituir por outro projeto">
                              🔄
                            </button>
                            <a href={`/admin/projects/new?fromHomeSlot=${idx + 1}`} style={{ background: 'rgba(59,130,246,0.9)', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(8px)' }} title="Novo projeto neste destaque">
                              ➕
                            </a>
                          </div>
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(20,24,39,0.9), transparent)', pointerEvents: 'none' }}></div>
                        </div>
                        {/* Info do card */}
                        <div style={{ padding: '12px 14px 14px' }}>
                          {isEditing ? (
                            /* ═══ MODO EDIÇÃO INLINE (card menor) ═══ */
                            <div style={{ display: 'grid', gap: 8 }}>
                              <p style={{ margin: 0, fontSize: 10, color: '#86efac', fontWeight: 600 }}>
                                Título, resumo e prioridade (0–100). Salve ou abra edição completa abaixo.
                              </p>
                              <div>
                                <label style={{ display: 'block', fontSize: 10, color: '#86efac', fontWeight: 600, marginBottom: 3 }}>Título</label>
                                <input
                                  type="text"
                                  value={editProjectData.title}
                                  onChange={e => setEditProjectData(prev => ({ ...prev, title: e.target.value }))}
                                  style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 13, fontWeight: 600, outline: 'none' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 10, color: '#86efac', fontWeight: 600, marginBottom: 3 }}>Resumo (PT)</label>
                                <textarea
                                  value={editProjectData.summaryPt}
                                  onChange={e => setEditProjectData(prev => ({ ...prev, summaryPt: e.target.value }))}
                                  rows={2}
                                  style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#94a3b8', fontSize: 12, lineHeight: 1.5, resize: 'vertical', outline: 'none' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 10, color: '#86efac', fontWeight: 600, marginBottom: 3 }}>Posição na Home</label>
                                <select
                                  value={editProjectData.priorityHome}
                                  onChange={e => setEditProjectData(prev => ({ ...prev, priorityHome: parseInt(e.target.value, 10) || 0 }))}
                                  style={{ width: '100%', padding: '5px 8px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#86efac', fontSize: 12, fontWeight: 600, outline: 'none' }}
                                >
                                  <option value={0}>Não na Home</option>
                                  <option value={1}>Principal 1</option>
                                  <option value={2}>Principal 2</option>
                                  <option value={3}>Principal 3</option>
                                  <option value={4}>Principal 4</option>
                                  <option value={5}>Principal 5</option>
                                  <option value={6}>Principal 6</option>
                                  <option value={7}>Principal 7</option>
                                  <option value={8}>Principal 8</option>
                                  <option value={9}>Principal 9</option>
                                  <option value={10}>Principal 10</option>
                                </select>
                              </div>
                              <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                                <button type="button" onClick={() => saveEditProject(p.id)} disabled={savingProject} style={{ flex: 1, padding: '6px 0', borderRadius: 6, background: savingProject ? '#374151' : 'rgba(34,197,94,0.8)', color: '#fff', fontSize: 11, fontWeight: 700, border: 'none', cursor: savingProject ? 'wait' : 'pointer' }}>
                                  {savingProject ? '⏳' : '💾 Salvar'}
                                </button>
                                <button type="button" onClick={cancelEditProject} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', color: '#94a3b8', fontSize: 11, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
                                  ✕
                                </button>
                              </div>
                              {projectSaveMsg && projectSaveMsg.id === p.id && (
                                <div style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: projectSaveMsg.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: projectSaveMsg.type === 'success' ? '#86efac' : '#fca5a5' }}>
                                  {projectSaveMsg.text}
                                </div>
                              )}
                              <a href={`/admin/projects/${p.id}`} style={{ fontSize: 10, color: '#7dd3fc', textDecoration: 'underline' }}>
                                Edição completa →
                              </a>
                            </div>
                          ) : (
                            /* ═══ MODO LEITURA (card menor) ═══ */
                            <>
                              <h5 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3, textTransform: 'uppercase' as const, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, cursor: 'pointer' }} onClick={() => startEditProject(p)} title="Clique para editar">
                                {p.title}
                              </h5>
                              {p.city && (
                                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#64748b' }}>
                                  📍 {p.city}{p.country ? `, ${p.country}` : ''}
                                </p>
                              )}
                              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                                {p.tags?.map((tag: string, i: number) => (
                                  <span key={i} style={{ padding: '2px 7px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 10, fontWeight: 500 }}>{tag}</span>
                                ))}
                                {p.year && <span style={{ fontSize: 10, color: '#475569', marginLeft: 'auto' }}>{p.year}</span>}
                              </div>
                              {projectSaveMsg && projectSaveMsg.id === p.id && projectSaveMsg.type === 'success' && (
                                <div style={{ marginTop: 4, padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: 'rgba(34,197,94,0.15)', color: '#86efac', display: 'inline-block' }}>
                                  {projectSaveMsg.text}
                                </div>
                              )}
                              <div style={{ marginTop: 10 }}>
                                <button type="button" onClick={() => startEditProject(p)} style={{ width: '100%', background: '#22c55e', color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 2px 8px rgba(34,197,94,0.3)' }}>
                                  ✏️ EDITAR ESTE PROJETO
                                </button>
                                <a href={`/admin/projects/${p.id}`} style={{ display: 'block', marginTop: 6, fontSize: 11, color: '#7dd3fc', textDecoration: 'none', textAlign: 'center' }}>
                                  Edição completa →
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                )}

                {/* ═══ Segunda e terceira linhas: 6 cards (slots 5 até 10) ═══ */}
                {true && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, padding: '0 20px 24px' }}>
                    {[0, 1, 2, 3, 4, 5].map((idx: number) => {
                      const p: any = homeFeaturedProjects[idx + 4] || null;
                      const slotIdx = 4 + idx;
                      if (!p) {
                        return (
                          <div key={`empty-slot-${slotIdx + 1}`} style={{ borderRadius: 12, overflow: 'hidden', border: '1px dashed rgba(148,163,184,0.35)', background: 'rgba(20,24,39,0.45)', minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ padding: 14 }}>
                              <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700, marginBottom: 8 }}>#{slotIdx + 1} · P{slotIdx + 1}</div>
                              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Slot vazio. Clique em substituir ou criar novo para preencher este destaque.</p>
                            </div>
                            <div style={{ padding: 12, display: 'flex', gap: 8 }}>
                              <button type="button" onClick={() => openReplaceModal(slotIdx)} style={{ flex: 1, background: 'rgba(245,158,11,0.9)', color: '#fff', padding: '8px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' }}>🔄 Substituir</button>
                              <a href={`/admin/projects/new?fromHomeSlot=${slotIdx}`} style={{ flex: 1, textAlign: 'center', background: 'rgba(59,130,246,0.9)', color: '#fff', padding: '8px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>➕ Novo</a>
                            </div>
                          </div>
                        );
                      }
                      const isEditing = editingProjectId === p.id;
                      return (
                      <div key={p.id} style={{ borderRadius: 12, overflow: 'hidden', border: isEditing ? '2px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.06)', background: 'rgba(20,24,39,0.8)' }}>
                        <div style={{ position: 'relative', paddingTop: '65%', background: '#111827' }}>
                          {p.heroImage ? (
                            <img src={p.heroImage} alt={p.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', backgroundColor: '#0f172a' }} />
                          ) : (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, background: 'linear-gradient(135deg, rgba(201,35,55,0.1), rgba(10,14,26,0.8))' }}>
                              <span style={{ fontSize: 32, opacity: 0.3 }}>🖼️</span>
                              <span style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>Sem imagem</span>
                            </div>
                          )}
                          {uploadingImageId === p.id && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 10 }}>
                              <div style={{ width: 28, height: 28, border: '3px solid rgba(34,197,94,0.3)', borderTopColor: '#22c55e', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                              <span style={{ color: '#86efac', fontSize: 10, fontWeight: 600 }}>{uploadProgress}</span>
                            </div>
                          )}
                          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.75)', color: '#86efac', padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, backdropFilter: 'blur(8px)' }}>
                            #{slotIdx + 1} · P{p.priorityHome}
                          </div>
                          <label style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(168,85,247,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: uploadingImageId === p.id ? 'wait' : 'pointer', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 3, zIndex: 5 }}>
                            📷 {p.heroImage ? 'Trocar' : 'Upload'}
                            <input type="file" accept="image/*,video/mp4,video/webm" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleHeroImageUpload(p.id, f); e.target.value = ''; }} disabled={uploadingImageId === p.id} />
                          </label>
                          <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 4, zIndex: 5 }}>
                            <button type="button" onClick={() => openReplaceModal(slotIdx)} style={{ background: 'rgba(245,158,11,0.9)', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, border: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)' }} title="Substituir por outro projeto">🔄</button>
                            <a href={`/admin/projects/new?fromHomeSlot=${slotIdx}`} style={{ background: 'rgba(59,130,246,0.9)', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(8px)' }} title="Novo projeto neste destaque">➕</a>
                          </div>
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(20,24,39,0.9), transparent)', pointerEvents: 'none' }}></div>
                        </div>
                        <div style={{ padding: '12px 14px 14px' }}>
                          {isEditing ? (
                            <div style={{ display: 'grid', gap: 8 }}>
                              <div><label style={{ display: 'block', fontSize: 10, color: '#86efac', fontWeight: 600, marginBottom: 3 }}>Título</label>
                                <input type="text" value={editProjectData.title} onChange={e => setEditProjectData(prev => ({ ...prev, title: e.target.value }))} style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 13, fontWeight: 600, outline: 'none' }} />
                              </div>
                              <div><label style={{ display: 'block', fontSize: 10, color: '#86efac', fontWeight: 600, marginBottom: 3 }}>Resumo (PT)</label>
                                <textarea value={editProjectData.summaryPt} onChange={e => setEditProjectData(prev => ({ ...prev, summaryPt: e.target.value }))} rows={2} style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#94a3b8', fontSize: 12, lineHeight: 1.5, resize: 'vertical', outline: 'none' }} />
                              </div>
                              <div><label style={{ display: 'block', fontSize: 10, color: '#86efac', fontWeight: 600, marginBottom: 3 }}>Posição na Home</label>
                                <select value={editProjectData.priorityHome} onChange={e => setEditProjectData(prev => ({ ...prev, priorityHome: parseInt(e.target.value, 10) || 0 }))} style={{ width: '100%', padding: '5px 8px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(0,0,0,0.4)', color: '#86efac', fontSize: 12, fontWeight: 600, outline: 'none' }}>
                                  <option value={0}>Não na Home</option>
                                  <option value={1}>Principal 1</option>
                                  <option value={2}>Principal 2</option>
                                  <option value={3}>Principal 3</option>
                                  <option value={4}>Principal 4</option>
                                  <option value={5}>Principal 5</option>
                                  <option value={6}>Principal 6</option>
                                  <option value={7}>Principal 7</option>
                                  <option value={8}>Principal 8</option>
                                  <option value={9}>Principal 9</option>
                                  <option value={10}>Principal 10</option>
                                </select>
                              </div>
                              <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                                <button type="button" onClick={() => saveEditProject(p.id)} disabled={savingProject} style={{ flex: 1, padding: '6px 0', borderRadius: 6, background: savingProject ? '#374151' : 'rgba(34,197,94,0.8)', color: '#fff', fontSize: 11, fontWeight: 700, border: 'none', cursor: savingProject ? 'wait' : 'pointer' }}>{savingProject ? '⏳' : '💾 Salvar'}</button>
                                <button type="button" onClick={cancelEditProject} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', color: '#94a3b8', fontSize: 11, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>✕</button>
                              </div>
                              {projectSaveMsg && projectSaveMsg.id === p.id && (
                                <div style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: projectSaveMsg.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: projectSaveMsg.type === 'success' ? '#86efac' : '#fca5a5' }}>{projectSaveMsg.text}</div>
                              )}
                              <a href={`/admin/projects/${p.id}`} style={{ fontSize: 10, color: '#7dd3fc', textDecoration: 'underline' }}>Edição completa →</a>
                            </div>
                          ) : (
                            <>
                              <h5 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3, textTransform: 'uppercase' as const, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, cursor: 'pointer' }} onClick={() => startEditProject(p)} title="Clique para editar">{p.title}</h5>
                              {p.city && <p style={{ margin: '0 0 6px', fontSize: 11, color: '#64748b' }}>📍 {p.city}{p.country ? `, ${p.country}` : ''}</p>}
                              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                                {p.tags?.map((tag: string, i: number) => (
                                  <span key={i} style={{ padding: '2px 7px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 10, fontWeight: 500 }}>{tag}</span>
                                ))}
                                {p.year && <span style={{ fontSize: 10, color: '#475569', marginLeft: 'auto' }}>{p.year}</span>}
                              </div>
                              {projectSaveMsg && projectSaveMsg.id === p.id && projectSaveMsg.type === 'success' && (
                                <div style={{ marginTop: 4, padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: 'rgba(34,197,94,0.15)', color: '#86efac', display: 'inline-block' }}>{projectSaveMsg.text}</div>
                              )}
                              <div style={{ marginTop: 10 }}>
                                <button type="button" onClick={() => startEditProject(p)} style={{ width: '100%', background: '#22c55e', color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 2px 8px rgba(34,197,94,0.3)' }}>✏️ EDITAR ESTE PROJETO</button>
                                <a href={`/admin/projects/${p.id}`} style={{ display: 'block', marginTop: 6, fontSize: 11, color: '#7dd3fc', textDecoration: 'none', textAlign: 'center' }}>Edição completa →</a>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                )}

                {/* ═══ BOTÃO VER TODOS (como no site) ═══ */}
                <div style={{ textAlign: 'center', paddingBottom: 24 }}>
                  <a href="/admin/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 28px', borderRadius: 8, background: 'rgba(201,35,55,0.8)', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                    VER TODOS OS {homeFeaturedProjects.length} PROJETOS →
                  </a>
                </div>

                {/* ═══ Modal: Substituir projeto por outro ═══ */}
                {replaceSlotIndex !== null && (
                  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setReplaceSlotIndex(null)}>
                    <div style={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', maxWidth: 480, width: '90%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const }} onClick={e => e.stopPropagation()}>
                      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
                          {replaceSlotIndex === 0 ? 'Substituir destaque principal' : `Substituir projeto #${replaceSlotIndex + 1} (secundário)`}
                        </h3>
                        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#94a3b8' }}>Clique no projeto para trocar. O que está aqui hoje sai automaticamente — uma única ação, sem erro.</p>
                      </div>
                      {replaceError && (
                        <div style={{ margin: '12px 20px 0', padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 13 }}>{replaceError}</div>
                      )}
                      <div style={{ padding: 16, overflowY: 'auto', flex: 1 }}>
                        {replaceProjectList.length === 0 && !replaceError && <p style={{ color: '#64748b', fontSize: 13 }}>Carregando projetos...</p>}
                        {replaceProjectList.map((proj) => {
                          const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                          const y = proj.yearEnd ?? proj.year, m = proj.monthEnd ?? proj.month;
                          const dateLabel = y ? (m ? `${monthNames[m - 1]}/${y}` : String(y)) : '—';
                          return (
                            <button
                              key={proj.id}
                              type="button"
                              onClick={() => confirmReplaceProject(proj.id)}
                              disabled={replacingProjectId !== null}
                              style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 12, textAlign: 'left', padding: '12px 14px', marginBottom: 6, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#e2e8f0', fontSize: 14, cursor: replacingProjectId ? 'wait' : 'pointer' }}
                            >
                              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {replacingProjectId === proj.id ? '⏳ Colocando...' : proj.title}
                              </span>
                              <span style={{ flexShrink: 0, fontSize: 12, color: '#94a3b8' }}>{dateLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div style={{ padding: '12px 24px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <button type="button" onClick={() => setReplaceSlotIndex(null)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#94a3b8', fontSize: 14, cursor: 'pointer' }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══ Projetos adicionais (11+) — se no futuro houver mais de 10 slots ═══ */}
                {homeFeaturedProjects.length > 10 && (
                  <div style={{ margin: '0 20px 20px', padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Outros projetos em destaque (além dos 10 slots):</p>
                    {homeFeaturedProjects.slice(10).map((p: any) => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                        <span style={{ fontSize: 11, color: '#86efac', fontWeight: 700 }}>P{p.priorityHome}</span>
                        <a href={`/admin/projects/${p.id}`} style={{ fontSize: 12, color: '#7dd3fc', textDecoration: 'underline' }}>{p.title}</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {/* Dica contextual */}
        {slug === 'home' && (
          <div style={{ margin: '16px 0 0', padding: '12px 16px', borderRadius: 10, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
              <strong style={{ color: '#86efac' }}>Edição rápida:</strong> Clique em <strong>"Editar aqui"</strong> ou no título/resumo para editar diretamente. As alterações são salvas no projeto automaticamente. Para alterar <strong style={{ color: '#fca5a5' }}>imagem de capa</strong> ou campos avançados, clique em "Editar completo". Envie novas imagens em <a href="/admin/media" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Mídias</a>.
            </div>
          </div>
        )}
        {slug !== 'home' && (
          <p style={{ margin: '12px 0 0', fontSize: 12, color: '#64748b' }}>
            💡 Dica: envie imagens e vídeos em <strong>Mídias</strong> (menu lateral) e depois escolha aqui ou em Projetos.{' '}
            <a href="/admin/help" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Guia completo →</a>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        {/* Home: Demoreel primeiro na ordem (logo no topo da edição) */}
        {slug === 'home' && (
          <CollapsibleSection id="heroMedia" title="Demoreel Watch Our Work (vídeo abaixo do Hero) + Hero Media" icon="🎬" borderColor="rgba(201,35,55,0.2)" bgColor="rgba(201,35,55,0.05)" isOpen={openSection === 'heroMedia'} onToggle={handleSectionToggle}>
            <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
              <strong>Este é o vídeo da seção "Watch Our Work" (abaixo do Hero).</strong>
              <br />
              <strong>Sistema Híbrido:</strong> Use upload local (Mídias) <strong>OU</strong> URL manual (YouTube/Vimeo/Unsplash).
              <br />
              📌 <strong>Prioridade:</strong> Se selecionar Media, usa ela. Senão, usa URL manual.
              <br />
              ⚠️ <strong>Recomendado:</strong> usar MP4 uploadado no CMS (URL do tipo YouTube "watch?v=" pode dar vídeo não suportado).
              <br />
              🖼️ <strong>Capa (thumbnail) do demoreel:</strong> use a <strong>Imagem de Fundo do Hero</strong> abaixo. Essa imagem vira a capa do vídeo no site.
            </p>
            <UnifiedMediaUpload
              pageSlug={slug || 'page'}
              sectionSlug="hero"
              imageId={formData.heroBackgroundImageId}
              imageUrl={formData.heroBackgroundImageUrl}
              videoId={formData.demoreelVideoId}
              videoUrl={formData.demoreelVideoUrl}
              onImageChange={(mediaId, url) => setFormData({
                ...formData,
                heroBackgroundImageId: mediaId || '',
                heroBackgroundImageUrl: url || ''
              })}
              onVideoChange={(mediaId, url) => setFormData({
                ...formData,
                demoreelVideoId: mediaId || '',
                demoreelVideoUrl: url || ''
              })}
              allowVideo={true}
              allowExternalUrl={true}
              imageSpecs={{
                width: 1920,
                height: 1080,
                maxSizeMB: 5,
                description: 'Imagem de fundo do hero (recomendado: paisagem, alta resolução)'
              }}
              videoSpecs={{
                maxSizeMB: 50,
                description: 'Vídeo institucional (MP4, WebM ou MOV)'
              }}
              existingMedia={allMedia}
              imageLabel="Imagem de Fundo do Hero (também capa do demoreel)"
              videoLabel="Vídeo Demoreel do Watch Our Work (Home)"
            />
            <div style={{ marginTop: 10, padding: 12, borderRadius: 8, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)' }}>
              <p style={{ margin: 0, fontSize: 12, color: '#bae6fd' }}>
                <strong>Atalho rápido:</strong> se o upload travar, use o arquivo já publicado no site principal.
              </p>
              <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, demoreelVideoId: '', demoreelVideoUrl: '/demo-azimut.mp4' })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(56,189,248,0.45)',
                    background: 'rgba(56,189,248,0.14)',
                    color: '#7dd3fc',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Usar /demo-azimut.mp4
                </button>
                <span style={{ alignSelf: 'center', fontSize: 11, color: '#93c5fd' }}>
                  Depois clique em <strong>Salvar Página</strong>.
                </span>
              </div>
            </div>
            {(() => {
              const mediaVideoUrl = formData.demoreelVideoId
                ? (allMedia.find((m) => m.id === formData.demoreelVideoId && m.type === 'VIDEO')?.originalUrl || null)
                : null;
              const activeVideoUrl = formData.demoreelVideoUrl || mediaVideoUrl || null;
              const sourceLabel = formData.demoreelVideoUrl
                ? 'URL manual'
                : mediaVideoUrl
                  ? 'Biblioteca de Mídias'
                  : 'Nenhum vídeo definido';
              return (
                <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.28)' }}>
                  <p style={{ margin: 0, fontSize: 13, color: '#d1fae5' }}>
                    <strong>Vídeo ativo no site (Watch Our Work):</strong> {sourceLabel}
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#a7f3d0', wordBreak: 'break-all' }}>
                    {activeVideoUrl || 'Sem URL ativa no momento. Faça upload ou informe uma URL.'}
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: 12, color: '#a7f3d0', wordBreak: 'break-all' }}>
                    <strong>Capa ativa no site:</strong> {formData.heroBackgroundImageUrl || 'Sem capa definida. Selecione a imagem acima.'}
                  </p>
                  <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)' }}>
                    {activeVideoUrl ? (
                      <video key={activeVideoUrl} src={activeVideoUrl} controls muted style={{ width: '100%', maxHeight: 340, objectFit: 'contain', background: '#000' }} />
                    ) : (
                      <div style={{ padding: '28px 14px', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>
                        Sem vídeo ativo ainda. Faça upload ou selecione da biblioteca para pré-visualizar aqui.
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
            <div style={{ marginTop: 24, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#c0bccf' }}>
                💡 <strong>Não vê suas mídias aqui?</strong>{' '}
                <a href="/admin/media" target="_blank" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>
                  Envie primeiro em "Mídias" →
                </a>
              </p>
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection id="basico" title="Informações Básicas" icon="📋" isOpen={openSection === 'basico'} onToggle={handleSectionToggle}>
          <MultilangTextField
            label="Nome da Página"
            location="Páginas > Informações Básicas > Nome"
            fieldKey="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            maxLength={FIELD_LIMITS.name.max}
          />
          <div style={{ marginTop: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#e8e6f2' }}>
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
        </CollapsibleSection>

        <CollapsibleSection id="heroTexto" title="Textos do topo (slogan)" icon="🎯" isOpen={openSection === 'heroTexto'} onToggle={handleSectionToggle}>
          <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
            Texto principal exibido no topo da página, acima do conteúdo. Aparece no hero/banner da página.
          </p>

          {/* ✨ NOVO: Usando FieldEditorWithMetadata com metadados do banco */}
          <FieldEditorWithMetadata
            pageSlug="home"
            sectionKey="hero"
            fieldKey="hero_title"
            value={formData.heroSloganPt || ''}
            onChange={(value) => setFormData({ ...formData, heroSloganPt: value })}
          />
          
          {/* ANTIGO: MultilangTextField (hardcoded)
          <MultilangTextField
            label="Hero Slogan (Português)"
            location="Páginas > Hero > Slogan > Português"
            fieldKey="heroSloganPt"
            value={formData.heroSloganPt}
            onChange={(value) => setFormData({ ...formData, heroSloganPt: value })}
            maxLength={FIELD_LIMITS.heroSloganPt.max}
            multiline
            onTranslate={undefined}
          />
          */}

          <MultilangTextField
            label="Hero Slogan (English)"
            location="Páginas > Hero > Slogan > English"
            fieldKey="heroSloganEn"
            value={formData.heroSloganEn}
            onChange={(value) => setFormData({ ...formData, heroSloganEn: value })}
            maxLength={FIELD_LIMITS.heroSloganEn.max}
            multiline
            onTranslate={(lang) => handleTranslate('heroSlogan', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('heroSlogan-') || false}
          />

          <MultilangTextField
            label="Hero Slogan (Español)"
            location="Páginas > Hero > Slogan > Español"
            fieldKey="heroSloganEs"
            value={formData.heroSloganEs}
            onChange={(value) => setFormData({ ...formData, heroSloganEs: value })}
            maxLength={FIELD_LIMITS.heroSloganEs.max}
            multiline
            onTranslate={(lang) => handleTranslate('heroSlogan', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('heroSlogan-') || false}
          />

          <MultilangTextField
            label="Hero Slogan (Français)"
            location="Páginas > Hero > Slogan > Français"
            fieldKey="heroSloganFr"
            value={formData.heroSloganFr}
            onChange={(value) => setFormData({ ...formData, heroSloganFr: value })}
            maxLength={FIELD_LIMITS.heroSloganFr.max}
            multiline
            onTranslate={(lang) => handleTranslate('heroSlogan', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('heroSlogan-') || false}
          />
        </CollapsibleSection>

        <CollapsibleSection id="heroSubtitle" title="Subtítulo (Texto Secundário)" icon="📝" isOpen={openSection === 'heroSubtitle'} onToggle={handleSectionToggle}>
          <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
            Texto secundário exibido abaixo do slogan principal. Descrição mais detalhada sobre a empresa/produto.
          </p>

          <MultilangTextField
            label="Hero Subtitle (Português)"
            location="Páginas > Hero > Subtitle > Português"
            fieldKey="heroSubtitlePt"
            value={formData.heroSubtitlePt}
            onChange={(value) => setFormData({ ...formData, heroSubtitlePt: value })}
            maxLength={FIELD_LIMITS.heroSubtitlePt.max}
            multiline
            onTranslate={undefined}
          />

          <MultilangTextField
            label="Hero Subtitle (English)"
            location="Páginas > Hero > Subtitle > English"
            fieldKey="heroSubtitleEn"
            value={formData.heroSubtitleEn}
            onChange={(value) => setFormData({ ...formData, heroSubtitleEn: value })}
            maxLength={FIELD_LIMITS.heroSubtitleEn.max}
            multiline
            onTranslate={(lang) => handleTranslate('heroSubtitle', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('heroSubtitle-') || false}
          />

          <MultilangTextField
            label="Hero Subtitle (Español)"
            location="Páginas > Hero > Subtitle > Español"
            fieldKey="heroSubtitleEs"
            value={formData.heroSubtitleEs}
            onChange={(value) => setFormData({ ...formData, heroSubtitleEs: value })}
            maxLength={FIELD_LIMITS.heroSubtitleEs.max}
            multiline
            onTranslate={(lang) => handleTranslate('heroSubtitle', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('heroSubtitle-') || false}
          />

          <MultilangTextField
            label="Hero Subtitle (Français)"
            location="Páginas > Hero > Subtitle > Français"
            fieldKey="heroSubtitleFr"
            value={formData.heroSubtitleFr}
            onChange={(value) => setFormData({ ...formData, heroSubtitleFr: value })}
            maxLength={FIELD_LIMITS.heroSubtitleFr.max}
            multiline
            onTranslate={(lang) => handleTranslate('heroSubtitle', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('heroSubtitle-') || false}
          />
        </CollapsibleSection>

        <CollapsibleSection id="heroDescription" title="Hero Description (Mobile vs Desktop)" icon="📱💻" borderColor="rgba(201,35,55,0.2)" bgColor="rgba(201,35,55,0.05)" isOpen={openSection === 'heroDescription'} onToggle={handleSectionToggle}>
          <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
            <strong>Versões diferentes para cada plataforma:</strong>
            <br />
            📱 <strong>Mobile:</strong> Texto curto e direto (otimizado para telas pequenas)
            <br />
            💻 <strong>Desktop/Web:</strong> Texto completo e detalhado (mais espaço disponível)
          </p>

          {/* MOBILE */}
          <div style={{ marginBottom: 32, padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: '#7dd3fc' }}>
              📱 Mobile (Texto Curto)
            </h3>
            <p style={{ margin: '0 0 20px', color: '#8f8ba2', fontSize: 12 }}>
              Texto otimizado para telas pequenas. Máximo 150 caracteres recomendado.
            </p>

            <MultilangTextField
              label="Hero Description Mobile (Português)"
              location="Páginas > Hero > Description Mobile > Português"
              fieldKey="heroDescriptionMobilePt"
              value={formData.heroDescriptionMobilePt}
              onChange={(value) => setFormData({ ...formData, heroDescriptionMobilePt: value })}
              maxLength={150}
              multiline
              onTranslate={undefined}
            />

            <MultilangTextField
              label="Hero Description Mobile (English)"
              location="Páginas > Hero > Description Mobile > English"
              fieldKey="heroDescriptionMobileEn"
              value={formData.heroDescriptionMobileEn}
              onChange={(value) => setFormData({ ...formData, heroDescriptionMobileEn: value })}
              maxLength={150}
              multiline
              onTranslate={(lang) => handleTranslate('heroDescriptionMobile', lang as 'en' | 'es' | 'fr')}
              translating={translating?.startsWith('heroDescriptionMobile-') || false}
            />

            <MultilangTextField
              label="Hero Description Mobile (Español)"
              location="Páginas > Hero > Description Mobile > Español"
              fieldKey="heroDescriptionMobileEs"
              value={formData.heroDescriptionMobileEs}
              onChange={(value) => setFormData({ ...formData, heroDescriptionMobileEs: value })}
              maxLength={150}
              multiline
              onTranslate={(lang) => handleTranslate('heroDescriptionMobile', lang as 'en' | 'es' | 'fr')}
              translating={translating?.startsWith('heroDescriptionMobile-') || false}
            />

            <MultilangTextField
              label="Hero Description Mobile (Français)"
              location="Páginas > Hero > Description Mobile > Français"
              fieldKey="heroDescriptionMobileFr"
              value={formData.heroDescriptionMobileFr}
              onChange={(value) => setFormData({ ...formData, heroDescriptionMobileFr: value })}
              maxLength={150}
              multiline
              onTranslate={(lang) => handleTranslate('heroDescriptionMobile', lang as 'en' | 'es' | 'fr')}
              translating={translating?.startsWith('heroDescriptionMobile-') || false}
            />
          </div>

          {/* DESKTOP */}
          <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: '#86efac' }}>
              💻 Desktop/Web (Texto Completo)
            </h3>
            <p style={{ margin: '0 0 20px', color: '#8f8ba2', fontSize: 12 }}>
              Texto completo e detalhado para telas grandes (desktop/web). Máximo 500 caracteres recomendado.
            </p>

            <MultilangTextField
              label="Hero Description Desktop (Português)"
              location="Páginas > Hero > Description Desktop > Português"
              fieldKey="heroDescriptionDesktopPt"
              value={formData.heroDescriptionDesktopPt}
              onChange={(value) => setFormData({ ...formData, heroDescriptionDesktopPt: value })}
              maxLength={500}
              multiline
              onTranslate={undefined}
            />

            <MultilangTextField
              label="Hero Description Desktop (English)"
              location="Páginas > Hero > Description Desktop > English"
              fieldKey="heroDescriptionDesktopEn"
              value={formData.heroDescriptionDesktopEn}
              onChange={(value) => setFormData({ ...formData, heroDescriptionDesktopEn: value })}
              maxLength={500}
              multiline
              onTranslate={(lang) => handleTranslate('heroDescriptionDesktop', lang as 'en' | 'es' | 'fr')}
              translating={translating?.startsWith('heroDescriptionDesktop-') || false}
            />

            <MultilangTextField
              label="Hero Description Desktop (Español)"
              location="Páginas > Hero > Description Desktop > Español"
              fieldKey="heroDescriptionDesktopEs"
              value={formData.heroDescriptionDesktopEs}
              onChange={(value) => setFormData({ ...formData, heroDescriptionDesktopEs: value })}
              maxLength={500}
              multiline
              onTranslate={(lang) => handleTranslate('heroDescriptionDesktop', lang as 'en' | 'es' | 'fr')}
              translating={translating?.startsWith('heroDescriptionDesktop-') || false}
            />

            <MultilangTextField
              label="Hero Description Desktop (Français)"
              location="Páginas > Hero > Description Desktop > Français"
              fieldKey="heroDescriptionDesktopFr"
              value={formData.heroDescriptionDesktopFr}
              onChange={(value) => setFormData({ ...formData, heroDescriptionDesktopFr: value })}
              maxLength={500}
              multiline
              onTranslate={(lang) => handleTranslate('heroDescriptionDesktop', lang as 'en' | 'es' | 'fr')}
              translating={translating?.startsWith('heroDescriptionDesktop-') || false}
            />
          </div>
        </CollapsibleSection>

        {/* ═══════════════════════════════════════════════════════════
            MÍDIA DE FILOSOFIA - Páginas Studio e Diferenciais
        ═══════════════════════════════════════════════════════════ */}
        {(slug === 'studio' || slug === 'studio/diferenciais') && (
          <CollapsibleSection id="studioMedia" title="Mídia de Filosofia - Vídeos Multilíngues" icon="💡" borderColor="rgba(147, 51, 234, 0.3)" bgColor="rgba(147, 51, 234, 0.08)" isOpen={openSection === 'studioMedia'} onToggle={handleSectionToggle}>
            <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
              Configure vídeos diferentes para cada idioma. Se não tiver vídeo em um idioma, usa o Português automaticamente.
            </p>
            <MultiLangVideoField
              label="Vídeo Filosofia (Chris Milk)"
              videoPt={formData.videoPt}
              videoEn={formData.videoEn}
              videoEs={formData.videoEs}
              videoFr={formData.videoFr}
              thumbPt={formData.thumbPt}
              thumbEn={formData.thumbEn}
              thumbEs={formData.thumbEs}
              thumbFr={formData.thumbFr}
              onVideoPtChange={(url) => setFormData({ ...formData, videoPt: url })}
              onVideoEnChange={(url) => setFormData({ ...formData, videoEn: url })}
              onVideoEsChange={(url) => setFormData({ ...formData, videoEs: url })}
              onVideoFrChange={(url) => setFormData({ ...formData, videoFr: url })}
              onThumbPtChange={(url) => setFormData({ ...formData, thumbPt: url })}
              onThumbEnChange={(url) => setFormData({ ...formData, thumbEn: url })}
              onThumbEsChange={(url) => setFormData({ ...formData, thumbEs: url })}
              onThumbFrChange={(url) => setFormData({ ...formData, thumbFr: url })}
              specs={{
                videoMaxSizeMB: 25,
                thumbWidth: 1920,
                thumbHeight: 1080,
                description: 'TED Talk Chris Milk - A Máquina de Empatia'
              }}
            />
            <div style={{ padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#c0bccf' }}>
                💡 <strong>Não vê suas mídias aqui?</strong>{' '}
                <a href="/admin/media" target="_blank" style={{ color: '#a78bfa', textDecoration: 'underline' }}>
                  Envie primeiro em "Mídias" →
                </a>
              </p>
            </div>
          </CollapsibleSection>
        )}

        {/* Pillars - Apenas para home */}
        {slug === 'home' && (
          <CollapsibleSection id="pillars" title="Pilares (categorias da Home)" icon="💡" isOpen={openSection === 'pillars'} onToggle={handleSectionToggle}>
            <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
              Três textos curtos exibidos como badges/pills na página inicial. Ex: "Museus & Cultura", "Marcas & Eventos", "Educação & Pesquisa".
            </p>

            <div style={{ display: 'grid', gap: 24 }}>
              {/* Pillar 1 */}
              <div style={{ padding: 20, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>Pillar 1</h3>
                <MultilangTextField
                  label="Pillar 1 (Português)"
                  location="Páginas > Hero > Pillars > Pillar 1 > Português"
                  fieldKey="pillar1Pt"
                  value={formData.pillar1Pt}
                  onChange={(value) => setFormData({ ...formData, pillar1Pt: value })}
                  maxLength={FIELD_LIMITS.pillar1Pt.max}
                />
                <MultilangTextField
                  label="Pillar 1 (English)"
                  location="Páginas > Hero > Pillars > Pillar 1 > English"
                  fieldKey="pillar1En"
                  value={formData.pillar1En}
                  onChange={(value) => setFormData({ ...formData, pillar1En: value })}
                  maxLength={FIELD_LIMITS.pillar1En.max}
                  onTranslate={(lang) => handleTranslate('pillar1', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar1-') || false}
                />
                <MultilangTextField
                  label="Pillar 1 (Español)"
                  location="Páginas > Hero > Pillars > Pillar 1 > Español"
                  fieldKey="pillar1Es"
                  value={formData.pillar1Es}
                  onChange={(value) => setFormData({ ...formData, pillar1Es: value })}
                  maxLength={FIELD_LIMITS.pillar1Es.max}
                  onTranslate={(lang) => handleTranslate('pillar1', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar1-') || false}
                />
                <MultilangTextField
                  label="Pillar 1 (Français)"
                  location="Páginas > Hero > Pillars > Pillar 1 > Français"
                  fieldKey="pillar1Fr"
                  value={formData.pillar1Fr}
                  onChange={(value) => setFormData({ ...formData, pillar1Fr: value })}
                  maxLength={FIELD_LIMITS.pillar1Fr.max}
                  onTranslate={(lang) => handleTranslate('pillar1', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar1-') || false}
                />
              </div>

              {/* Pillar 2 */}
              <div style={{ padding: 20, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>Pillar 2</h3>
                <MultilangTextField
                  label="Pillar 2 (Português)"
                  location="Páginas > Hero > Pillars > Pillar 2 > Português"
                  fieldKey="pillar2Pt"
                  value={formData.pillar2Pt}
                  onChange={(value) => setFormData({ ...formData, pillar2Pt: value })}
                  maxLength={FIELD_LIMITS.pillar2Pt.max}
                />
                <MultilangTextField
                  label="Pillar 2 (English)"
                  location="Páginas > Hero > Pillars > Pillar 2 > English"
                  fieldKey="pillar2En"
                  value={formData.pillar2En}
                  onChange={(value) => setFormData({ ...formData, pillar2En: value })}
                  maxLength={FIELD_LIMITS.pillar2En.max}
                  onTranslate={(lang) => handleTranslate('pillar2', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar2-') || false}
                />
                <MultilangTextField
                  label="Pillar 2 (Español)"
                  location="Páginas > Hero > Pillars > Pillar 2 > Español"
                  fieldKey="pillar2Es"
                  value={formData.pillar2Es}
                  onChange={(value) => setFormData({ ...formData, pillar2Es: value })}
                  maxLength={FIELD_LIMITS.pillar2Es.max}
                  onTranslate={(lang) => handleTranslate('pillar2', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar2-') || false}
                />
                <MultilangTextField
                  label="Pillar 2 (Français)"
                  location="Páginas > Hero > Pillars > Pillar 2 > Français"
                  fieldKey="pillar2Fr"
                  value={formData.pillar2Fr}
                  onChange={(value) => setFormData({ ...formData, pillar2Fr: value })}
                  maxLength={FIELD_LIMITS.pillar2Fr.max}
                  onTranslate={(lang) => handleTranslate('pillar2', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar2-') || false}
                />
              </div>

              {/* Pillar 3 */}
              <div style={{ padding: 20, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>Pillar 3</h3>
                <MultilangTextField
                  label="Pillar 3 (Português)"
                  location="Páginas > Hero > Pillars > Pillar 3 > Português"
                  fieldKey="pillar3Pt"
                  value={formData.pillar3Pt}
                  onChange={(value) => setFormData({ ...formData, pillar3Pt: value })}
                  maxLength={FIELD_LIMITS.pillar3Pt.max}
                />
                <MultilangTextField
                  label="Pillar 3 (English)"
                  location="Páginas > Hero > Pillars > Pillar 3 > English"
                  fieldKey="pillar3En"
                  value={formData.pillar3En}
                  onChange={(value) => setFormData({ ...formData, pillar3En: value })}
                  maxLength={FIELD_LIMITS.pillar3En.max}
                  onTranslate={(lang) => handleTranslate('pillar3', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar3-') || false}
                />
                <MultilangTextField
                  label="Pillar 3 (Español)"
                  location="Páginas > Hero > Pillars > Pillar 3 > Español"
                  fieldKey="pillar3Es"
                  value={formData.pillar3Es}
                  onChange={(value) => setFormData({ ...formData, pillar3Es: value })}
                  maxLength={FIELD_LIMITS.pillar3Es.max}
                  onTranslate={(lang) => handleTranslate('pillar3', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar3-') || false}
                />
                <MultilangTextField
                  label="Pillar 3 (Français)"
                  location="Páginas > Hero > Pillars > Pillar 3 > Français"
                  fieldKey="pillar3Fr"
                  value={formData.pillar3Fr}
                  onChange={(value) => setFormData({ ...formData, pillar3Fr: value })}
                  maxLength={FIELD_LIMITS.pillar3Fr.max}
                  onTranslate={(lang) => handleTranslate('pillar3', lang as 'en' | 'es' | 'fr')}
                  translating={translating?.startsWith('pillar3-') || false}
                />
              </div>
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection id="seo" title="SEO (Google)" icon="🔍" isOpen={openSection === 'seo'} onToggle={handleSectionToggle}>
          <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
            Títulos e descrições que aparecem nos resultados de busca do Google e outras plataformas.
          </p>

          <MultilangTextField
            label="Título SEO (Português)"
            location="Páginas > SEO > Título > Português"
            fieldKey="seoTitlePt"
            value={formData.seoTitlePt}
            onChange={(value) => setFormData({ ...formData, seoTitlePt: value })}
            maxLength={FIELD_LIMITS.seoTitlePt.max}
            onTranslate={undefined}
          />

          <MultilangTextField
            label="Título SEO (English)"
            location="Páginas > SEO > Título > English"
            fieldKey="seoTitleEn"
            value={formData.seoTitleEn}
            onChange={(value) => setFormData({ ...formData, seoTitleEn: value })}
            maxLength={FIELD_LIMITS.seoTitleEn.max}
            onTranslate={(lang) => handleTranslate('seoTitle', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('seoTitle-') || false}
          />

          <MultilangTextField
            label="Título SEO (Español)"
            location="Páginas > SEO > Título > Español"
            fieldKey="seoTitleEs"
            value={formData.seoTitleEs}
            onChange={(value) => setFormData({ ...formData, seoTitleEs: value })}
            maxLength={FIELD_LIMITS.seoTitleEs.max}
            onTranslate={(lang) => handleTranslate('seoTitle', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('seoTitle-') || false}
          />

          <MultilangTextField
            label="Título SEO (Français)"
            location="Páginas > SEO > Título > Français"
            fieldKey="seoTitleFr"
            value={formData.seoTitleFr}
            onChange={(value) => setFormData({ ...formData, seoTitleFr: value })}
            maxLength={FIELD_LIMITS.seoTitleFr.max}
            onTranslate={(lang) => handleTranslate('seoTitle', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('seoTitle-') || false}
          />

          <MultilangTextField
            label="Descrição SEO (Português)"
            location="Páginas > SEO > Descrição > Português"
            fieldKey="seoDescPt"
            value={formData.seoDescPt}
            onChange={(value) => setFormData({ ...formData, seoDescPt: value })}
            maxLength={FIELD_LIMITS.seoDescPt.max}
            multiline
            onTranslate={undefined}
          />

          <MultilangTextField
            label="Descrição SEO (English)"
            location="Páginas > SEO > Descrição > English"
            fieldKey="seoDescEn"
            value={formData.seoDescEn}
            onChange={(value) => setFormData({ ...formData, seoDescEn: value })}
            maxLength={FIELD_LIMITS.seoDescEn.max}
            multiline
            onTranslate={(lang) => handleTranslate('seoDesc', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('seoDesc-') || false}
          />

          <MultilangTextField
            label="Descrição SEO (Español)"
            location="Páginas > SEO > Descrição > Español"
            fieldKey="seoDescEs"
            value={formData.seoDescEs}
            onChange={(value) => setFormData({ ...formData, seoDescEs: value })}
            maxLength={FIELD_LIMITS.seoDescEs.max}
            multiline
            onTranslate={(lang) => handleTranslate('seoDesc', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('seoDesc-') || false}
          />

          <MultilangTextField
            label="Descrição SEO (Français)"
            location="Páginas > SEO > Descrição > Français"
            fieldKey="seoDescFr"
            value={formData.seoDescFr}
            onChange={(value) => setFormData({ ...formData, seoDescFr: value })}
            maxLength={FIELD_LIMITS.seoDescFr.max}
            multiline
            onTranslate={(lang) => handleTranslate('seoDesc', lang as 'en' | 'es' | 'fr')}
            translating={translating?.startsWith('seoDesc-') || false}
          />
        </CollapsibleSection>

        {/* ═══ Curadoria do momento (só página Work) ═══ */}
        {slug === 'work' && (
          <CollapsibleSection id="curadoria" title="Curadoria do momento (card na página Projetos)" icon="🎪" borderColor="rgba(201,35,55,0.3)" bgColor="rgba(201,35,55,0.08)" isOpen={openSection === 'curadoria'} onToggle={handleSectionToggle}>
            <p style={{ margin: '0 0 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
              Card em destaque na página <strong>/work</strong> (Projetos). Edite o título, a descrição e o texto do botão. O botão aplica o filtro indicado em &quot;Filtro ao clicar&quot; na lista de projetos.
            </p>
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#e8e6f2' }}>Título do card (PT)</label>
                <input type="text" value={formData.curationTitlePt} onChange={(e) => setFormData({ ...formData, curationTitlePt: e.target.value })} placeholder="Ex: Curadoria Gramado" style={{ ...inputStyle, width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#e8e6f2' }}>Título (EN / ES / FR)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <input type="text" value={formData.curationTitleEn} onChange={(e) => setFormData({ ...formData, curationTitleEn: e.target.value })} placeholder="EN" style={inputStyle} />
                  <input type="text" value={formData.curationTitleEs} onChange={(e) => setFormData({ ...formData, curationTitleEs: e.target.value })} placeholder="ES" style={inputStyle} />
                  <input type="text" value={formData.curationTitleFr} onChange={(e) => setFormData({ ...formData, curationTitleFr: e.target.value })} placeholder="FR" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#e8e6f2' }}>Descrição do card (PT)</label>
                <textarea value={formData.curationDescriptionPt} onChange={(e) => setFormData({ ...formData, curationDescriptionPt: e.target.value })} placeholder="Texto exibido no card..." rows={3} style={{ ...inputStyle, width: '100%', resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#e8e6f2' }}>Descrição (EN / ES / FR)</label>
                <div style={{ display: 'grid', gap: 10 }}>
                  <textarea value={formData.curationDescriptionEn} onChange={(e) => setFormData({ ...formData, curationDescriptionEn: e.target.value })} placeholder="EN" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                  <textarea value={formData.curationDescriptionEs} onChange={(e) => setFormData({ ...formData, curationDescriptionEs: e.target.value })} placeholder="ES" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                  <textarea value={formData.curationDescriptionFr} onChange={(e) => setFormData({ ...formData, curationDescriptionFr: e.target.value })} placeholder="FR" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#e8e6f2' }}>Texto do botão (PT / EN / ES / FR)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
                  <input type="text" value={formData.curationButtonTextPt} onChange={(e) => setFormData({ ...formData, curationButtonTextPt: e.target.value })} placeholder="PT" style={inputStyle} />
                  <input type="text" value={formData.curationButtonTextEn} onChange={(e) => setFormData({ ...formData, curationButtonTextEn: e.target.value })} placeholder="EN" style={inputStyle} />
                  <input type="text" value={formData.curationButtonTextEs} onChange={(e) => setFormData({ ...formData, curationButtonTextEs: e.target.value })} placeholder="ES" style={inputStyle} />
                  <input type="text" value={formData.curationButtonTextFr} onChange={(e) => setFormData({ ...formData, curationButtonTextFr: e.target.value })} placeholder="FR" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#e8e6f2' }}>Filtro ao clicar (categoria aplicada na lista)</label>
                <input type="text" value={formData.curationFilterCategory} onChange={(e) => setFormData({ ...formData, curationFilterCategory: e.target.value })} placeholder="Ex: curadoria" style={{ ...inputStyle, width: '100%', maxWidth: 280 }} />
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* ═══════════════════════════════════════════════════════════
            MÍDIA DA PÁGINA (Universal) - Exceto Studio que tem seção própria
        ═══════════════════════════════════════════════════════════ */}
        {slug !== 'studio' && slug !== 'studio/diferenciais' && (
          <CollapsibleSection id="midia" title="Mídia da Página" icon="📸" borderColor="rgba(56, 189, 248, 0.3)" bgColor="rgba(56, 189, 248, 0.08)" isOpen={openSection === 'midia'} onToggle={handleSectionToggle}>
            {slug === 'academy' && (
              <div style={{ marginBottom: 24, padding: 16, borderRadius: 10, background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#bae6fd', fontSize: 13, lineHeight: 1.6 }}>
                <strong style={{ color: '#fff' }}>Mídia da página Academy — onde editar</strong>
                <p style={{ margin: '8px 0 0' }}>O hero e vídeo desta página são configurados aqui abaixo. As mídias dos Cursos, Past Events e Vancouver (todas as imagens e cards como no site) são editadas no hub Academy, por item.</p>
                <p style={{ margin: '12px 0 0' }}>
                  <a href="/admin/academy" style={{ color: '#7dd3fc', fontWeight: 700, textDecoration: 'underline' }}>→ Abrir Academy (edição visual)</a> — Cursos, Past Events, Vancouver e páginas, com Trocar imagem e EDITAR em cada card.
                </p>
              </div>
            )}
            {slug === 'home' && (
              <div style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 10,
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: '#bbf7d0',
                fontSize: 13,
                lineHeight: 1.6,
              }}>
                <strong style={{ color: '#fff' }}>Onde atualizar o material da Home</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                  <li><strong>Vídeo e capa do topo (hero):</strong> configurados aqui abaixo — “Vídeo da Página” e “Thumbnail (Capa)”.</li>
                  <li><strong>Imagens dos cards “Projetos em Destaque”:</strong> não são aqui. Cada card usa a <strong>imagem de capa do projeto</strong>. Clique no nome do projeto abaixo para definir a imagem.
                  </li>
                </ul>
                {homeFeaturedProjects.length > 0 && (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(34, 197, 94, 0.35)' }}>
                    <strong style={{ color: '#fff' }}>Projetos que aparecem nos cards (defina a imagem em cada um):</strong>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20, listStyle: 'none' }}>
                      {homeFeaturedProjects.map((p) => (
                        <li key={p.id} style={{ marginBottom: 6 }}>
                          <a href={`/admin/projects/${p.id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#7dd3fc', textDecoration: 'underline', fontWeight: 600 }}>
                            {p.title}
                          </a>
                          {' '}
                          <span style={{ color: '#86efac' }}>→ Editar imagem de capa</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
              {slug === 'home'
                ? 'Aqui você define apenas o vídeo e a imagem de capa do topo da página (hero).'
                : 'Adicione vídeo com thumbnail ou imagem de destaque para esta página.'}
            </p>

            {/* Vídeo com Thumbnail (Opcional) */}
            <VideoWithThumbnailField
              label="Vídeo da Página (Opcional)"
              videoValue={formData.demoreelVideoId}
              videoUrl={formData.demoreelVideoUrl}
              onVideoChange={(mediaId) => setFormData({ ...formData, demoreelVideoId: mediaId })}
              onVideoUrlChange={(url) => setFormData({ ...formData, demoreelVideoUrl: url })}
              thumbnailValue={formData.heroBackgroundImageId}
              thumbnailUrl={formData.heroBackgroundImageUrl}
              onThumbnailChange={(mediaId) => setFormData({ ...formData, heroBackgroundImageId: mediaId })}
              onThumbnailUrlChange={(url) => setFormData({ ...formData, heroBackgroundImageUrl: url })}
              specs={{
                videoMaxSizeMB: 25,
                thumbWidth: 1920,
                thumbHeight: 1080,
                thumbMaxSizeMB: 2,
                description: 'Vídeo de destaque da página'
              }}
              existingMedia={allMedia}
            />

            {/* Imagem de Destaque (se não tiver vídeo) */}
            {!formData.demoreelVideoId && !formData.demoreelVideoUrl && (
              <div style={{ 
                padding: 20, 
                borderRadius: 12, 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.08)',
                marginTop: 20 
              }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>
                  🖼️ OU Imagem de Destaque (Hero)
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: 12, color: '#8f8ba2' }}>
                  Se não tiver vídeo, pode adicionar uma imagem de fundo para o hero.
                </p>
                <MediaUploadField
                  label="Imagem de Destaque"
                  value={formData.heroBackgroundImageId}
                  onChange={(mediaId) => setFormData({ ...formData, heroBackgroundImageId: mediaId })}
                  mediaType="image"
                  specs={{
                    width: 1920,
                    height: 1080,
                    maxSizeMB: 5,
                    description: 'Imagem de fundo do hero (1920x1080)'
                  }}
                  existingMedia={allMedia}
                />
              </div>
            )}

            {/* Link rápido para Mídias */}
            <div style={{ marginTop: 20, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#c0bccf' }}>
                💡 <strong>Não vê suas mídias aqui?</strong>{' '}
                <a href="/admin/media" target="_blank" rel="noopener noreferrer" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>
                  Envie primeiro em "Mídias" →
                </a>
              </p>
              {slug === 'home' && (
                <p style={{ margin: '8px 0 0', fontSize: 13, color: '#8f8ba2' }}>
                  Para as imagens dos cards <strong>Projetos em Destaque</strong>, use{' '}
                  <a href="/admin/projects" target="_blank" rel="noopener noreferrer" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Projetos</a>
                  {' '}→ editar cada projeto → Mídia principal (upload da imagem de capa).
                </p>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Seções - Placeholder */}
        {page?.sections && page.sections.length > 0 && (
          <CollapsibleSection id="secoes" title={`Seções (${page.sections.length})`} icon="📑" isOpen={openSection === 'secoes'} onToggle={handleSectionToggle}>
            <p style={{ margin: '0 0 16px', color: '#8f8ba2', fontSize: 13 }}>
              Gerenciamento de seções será implementado em breve.
            </p>
          </CollapsibleSection>
        )}

        {/* Botões de ação */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
          <button
            type="button"
            onClick={() => router.push('/admin/site-pages')}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
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
              border: 'none',
              background: saving ? 'rgba(201,35,55,0.5)' : '#c92337',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

