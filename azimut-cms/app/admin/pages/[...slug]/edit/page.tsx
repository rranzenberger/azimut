'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
// Force rebuild: 2025-12-30

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
  seoDescPt?: string;
  seoDescEn?: string;
  heroSloganPt?: string;
  heroSloganEn?: string;
  heroSloganEs?: string;
  heroSloganFr?: string;
  heroSubtitlePt?: string;
  heroSubtitleEn?: string;
  heroSubtitleEs?: string;
  heroSubtitleFr?: string;
  status: string;
  sections?: Section[];
}

// Definições de limites de caracteres para cada campo
const FIELD_LIMITS: Record<string, { max: number; label: string; location: string }> = {
  name: { max: 100, label: 'Nome da Página', location: 'Páginas > Informações Básicas' },
  seoTitlePt: { max: 60, label: 'Título SEO (PT)', location: 'Páginas > SEO > Título' },
  seoTitleEn: { max: 60, label: 'Título SEO (EN)', location: 'Páginas > SEO > Título' },
  seoDescPt: { max: 160, label: 'Descrição SEO (PT)', location: 'Páginas > SEO > Descrição' },
  seoDescEn: { max: 160, label: 'Descrição SEO (EN)', location: 'Páginas > SEO > Descrição' },
  heroSloganPt: { max: 200, label: 'Hero Slogan (PT)', location: 'Páginas > Hero > Slogan' },
  heroSloganEn: { max: 200, label: 'Hero Slogan (EN)', location: 'Páginas > Hero > Slogan' },
  heroSloganEs: { max: 200, label: 'Hero Slogan (ES)', location: 'Páginas > Hero > Slogan' },
  heroSloganFr: { max: 200, label: 'Hero Slogan (FR)', location: 'Páginas > Hero > Slogan' },
  heroSubtitlePt: { max: 500, label: 'Hero Subtitle (PT)', location: 'Páginas > Hero > Subtitle' },
  heroSubtitleEn: { max: 500, label: 'Hero Subtitle (EN)', location: 'Páginas > Hero > Subtitle' },
  heroSubtitleEs: { max: 500, label: 'Hero Subtitle (ES)', location: 'Páginas > Hero > Subtitle' },
  heroSubtitleFr: { max: 500, label: 'Hero Subtitle (FR)', location: 'Páginas > Hero > Subtitle' },
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
  // Suporta slugs com barras: studio/about -> ['studio', 'about'] -> 'studio/about'
  const slugArray = params?.slug as string | string[];
  const slug = Array.isArray(slugArray) ? slugArray.join('/') : slugArray;

  const [page, setPage] = useState<Page | null>(null);
  const [allPages, setAllPages] = useState<Array<{slug: string; name: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translating, setTranslating] = useState<string | null>(null); // campo sendo traduzido

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
  heroSubtitlePt: '',
  heroSubtitleEn: '',
  heroSubtitleEs: '',
  heroSubtitleFr: '',
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
          seoDescPt: data.seoDescPt || '',
          seoDescEn: data.seoDescEn || '',
          heroSloganPt: data.heroSloganPt || '',
          heroSloganEn: data.heroSloganEn || '',
          heroSloganEs: data.heroSloganEs || '',
          heroSloganFr: data.heroSloganFr || '',
          heroSubtitlePt: data.heroSubtitlePt || '',
          heroSubtitleEn: data.heroSubtitleEn || '',
          heroSubtitleEs: data.heroSubtitleEs || '',
          heroSubtitleFr: data.heroSubtitleFr || '',
          status: data.status || 'PUBLISHED',
        });

        // Buscar lista de todas as páginas para o dropdown
        const pagesRes = await fetch('/api/admin/pages?limit=100');
        if (pagesRes.ok) {
          const pagesData = await pagesRes.json();
          setAllPages(pagesData.pages?.map((p: any) => ({ slug: p.slug, name: p.name })) || []);
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

        {/* Dropdown de Navegação Rápida - BUSCA DO BANCO */}
        <div style={{ position: 'relative' }}>
          <select
            value={slug}
            onChange={(e) => {
              if (e.target.value !== slug) {
                router.push(`/admin/pages/${e.target.value}/edit`);
              }
            }}
            style={{
              padding: '8px 32px 8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              color: '#e8e6f2',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%23e8e6f2' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              minWidth: 220,
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
                      <optgroup label="🏠 Principal">
                        {homePages.map(p => (
                          <option key={p.slug} value={p.slug}>{p.name}</option>
                        ))}
                      </optgroup>
                    )}
                    {mainMenuPages.length > 0 && (
                      <optgroup label="📋 Menu Principal">
                        {mainMenuPages.map(p => (
                          <option key={p.slug} value={p.slug}>{p.name}</option>
                        ))}
                      </optgroup>
                    )}
                    {sortStudio.length > 0 && (
                      <optgroup label="🎨 Estúdio">
                        {sortStudio.map(p => (
                          <option key={p.slug} value={p.slug}>
                            {p.slug === 'studio' ? p.name : `└─ ${p.name}`}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {sortAcademy.length > 0 && (
                      <optgroup label="🎓 Academy">
                        {sortAcademy.map(p => (
                          <option key={p.slug} value={p.slug}>
                            {p.slug === 'academy' ? p.name : `└─ ${p.name}`}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {otherPages.length > 0 && (
                      <optgroup label="📧 Outros">
                        {otherPages.map(p => (
                          <option key={p.slug} value={p.slug}>{p.name}</option>
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


