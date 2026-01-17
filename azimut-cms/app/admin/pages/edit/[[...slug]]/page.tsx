'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FieldEditorWithMetadata } from '@/src/components/admin/FieldEditorWithMetadata';
import MediaUploadField from '@/components/admin/MediaUploadField';
// Force rebuild: 2026-01-17-v1

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
    status: 'PUBLISHED',
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
          status: data.status || 'PUBLISHED',
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

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 32 }}>
        {/* Informações Básicas */}
        <section
          style={{
            padding: 28,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
            📋 Informações Básicas
          </h2>
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
        </section>

        {/* Hero Slogan */}
        <section
          style={{
            padding: 28,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
            🎯 Hero Slogan (Texto do Head)
          </h2>
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
        </section>

        {/* Hero Subtitle */}
        <section
          style={{
            padding: 28,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
            📝 Hero Subtitle (Texto Secundário)
          </h2>
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
        </section>

        {/* Hero Media - SISTEMA HÍBRIDO: Media OU URL */}
        {slug === 'home' && (
          <section
            style={{
              padding: 28,
              borderRadius: 12,
              border: '1px solid rgba(201,35,55,0.2)',
              background: 'rgba(201,35,55,0.05)',
            }}
          >
            <h2 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
              🎬 Hero Media (Imagem & Demoreel)
            </h2>
            <p style={{ margin: '0 0 24px', color: '#8f8ba2', fontSize: 13, lineHeight: 1.6 }}>
              <strong>Sistema Híbrido:</strong> Use upload local (Mídias) <strong>OU</strong> URL manual (YouTube/Vimeo/Unsplash).
              <br />
              📌 <strong>Prioridade:</strong> Se selecionar Media, usa ela. Senão, usa URL manual.
            </p>

            {/* ═══════════════════════════════════════════════════════════
                IMAGEM DE FUNDO DO HERO
            ═══════════════════════════════════════════════════════════ */}
            <div style={{ marginBottom: 32, padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>
                🖼️ Imagem de Fundo do Hero
              </h3>

              {/* MediaUploadField - Upload + Biblioteca */}
              <MediaUploadField
                label="Imagem de Fundo"
                value={formData.heroBackgroundImageId}
                onChange={(mediaId) => setFormData({ ...formData, heroBackgroundImageId: mediaId })}
                mediaType="image"
                specs={{
                  width: 1920,
                  height: 1080,
                  maxSizeMB: 5,
                  description: 'Imagem de fundo do hero (recomendado: paisagem, alta resolução)'
                }}
                existingMedia={allMedia}
              />

              {/* URL Manual (fallback) */}
              <div style={{ marginTop: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500, color: '#8f8ba2' }}>
                  📍 OU usar URL externa (Unsplash, Cloudinary, etc)
                </label>
                <input
                  type="url"
                  value={formData.heroBackgroundImageUrl}
                  onChange={(e) => setFormData({ ...formData, heroBackgroundImageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={inputStyle}
                  disabled={!!formData.heroBackgroundImageId}
                />
                <div style={{ marginTop: 6, fontSize: 12, color: formData.heroBackgroundImageId ? '#8f8ba2' : '#7dd3fc' }}>
                  {formData.heroBackgroundImageId 
                    ? '🔒 Desabilitado (mídia selecionada acima tem prioridade)'
                    : '🌐 Cole a URL da imagem externa (será usado apenas se nenhuma mídia for selecionada)'
                  }
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                VÍDEO DEMOREEL
            ═══════════════════════════════════════════════════════════ */}
            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>
                🎥 Vídeo Demoreel Institucional
              </h3>

              {/* MediaUploadField - Upload + Biblioteca */}
              <MediaUploadField
                label="Vídeo Demoreel"
                value={formData.demoreelVideoId}
                onChange={(mediaId) => setFormData({ ...formData, demoreelVideoId: mediaId })}
                mediaType="video"
                specs={{
                  maxSizeMB: 50,
                  description: 'Vídeo institucional (MP4, WebM ou MOV)'
                }}
                existingMedia={allMedia}
              />

              {/* URL Manual (YouTube/Vimeo) */}
              <div style={{ marginTop: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500, color: '#8f8ba2' }}>
                  📍 OU usar URL externa (YouTube/Vimeo)
                </label>
                <input
                  type="url"
                  value={formData.demoreelVideoUrl}
                  onChange={(e) => setFormData({ ...formData, demoreelVideoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
                  style={inputStyle}
                  disabled={!!formData.demoreelVideoId}
                />
                <div style={{ marginTop: 6, fontSize: 12, color: formData.demoreelVideoId ? '#8f8ba2' : '#7dd3fc' }}>
                  {formData.demoreelVideoId 
                    ? '🔒 Desabilitado (vídeo selecionado acima tem prioridade)'
                    : '🌐 Cole a URL do YouTube ou Vimeo (será usado apenas se nenhum vídeo for selecionado)'
                  }
                </div>
              </div>
            </div>

            {/* Link rápido para Mídias */}
            <div style={{ marginTop: 24, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#c0bccf' }}>
                💡 <strong>Não vê suas mídias aqui?</strong>{' '}
                <a
                  href="/admin/media"
                  target="_blank"
                  style={{ color: '#7dd3fc', textDecoration: 'underline' }}
                >
                  Envie primeiro em "Mídias" →
                </a>
              </p>
            </div>
          </section>
        )}

        {/* Pillars - Apenas para home */}
        {slug === 'home' && (
          <section
            style={{
              padding: 28,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
              🏛️ Pillars (Pilares da Home)
            </h2>
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
          </section>
        )}

        {/* SEO */}
        <section
          style={{
            padding: 28,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
            🔍 SEO (Search Engine Optimization)
          </h2>
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
        </section>

        {/* Seções - Placeholder */}
        {page?.sections && page.sections.length > 0 && (
          <section
            style={{
              padding: 28,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: '#fff' }}>
              📑 Seções ({page.sections.length})
            </h2>
            <p style={{ margin: '0 0 16px', color: '#8f8ba2', fontSize: 13 }}>
              Gerenciamento de seções será implementado em breve.
            </p>
          </section>
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

