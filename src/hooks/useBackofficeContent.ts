/**
 * Hook para consumir conteúdo do Backoffice Azimut
 * Busca textos do CMS e faz fallback para conteúdo local se falhar
 * 
 * USO:
 * const { page, loading } = useBackofficeContent('home', 'pt')
 * const heroSlogan = page?.hero.slogan || 'Fallback local'
 */

import { useState, useEffect } from 'react';

// URL do backoffice (produção)
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

interface PageContent {
  slug: string;
  name: string;
  seo: {
    title?: string | null;
    description?: string | null;
  };
  hero: {
    slogan?: string | null;
    subtitle?: string | null;
  };
  updatedAt: string;
}

interface UseBackofficeContentReturn {
  page: PageContent | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para buscar conteúdo de uma página do backoffice
 * 
 * @param slug - Slug da página (ex: 'home', 'studio/about', 'academy/courses')
 * @param lang - Idioma (pt, en, es, fr)
 * @returns {PageContent | null} - Conteúdo da página ou null se falhar (usar fallback local)
 */
export function useBackofficeContent(
  slug: string,
  lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'
): UseBackofficeContentReturn {
  const [page, setPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPageContent() {
      try {
        setLoading(true);
        setError(null);

        // Tentar buscar do backoffice
        const response = await fetch(
          `${BACKOFFICE_URL}/api/public/page/${slug}`,
          {
            signal: AbortSignal.timeout(5000), // Timeout de 5s
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (isCancelled) return;

        // Extrair dados do idioma selecionado
        const pageContent: PageContent = {
          slug: data.slug,
          name: data.name,
          seo: {
            title: data.seo[lang]?.title,
            description: data.seo[lang]?.description,
          },
          hero: {
            slogan: data.hero[lang]?.slogan,
            subtitle: data.hero[lang]?.subtitle,
          },
          updatedAt: data.updatedAt,
        };

        setPage(pageContent);
        console.log(`✅ [Backoffice] Conteúdo carregado: ${slug} (${lang})`);
      } catch (err) {
        if (isCancelled) return;

        // NÃO É ERRO CRÍTICO - site funciona com fallback local
        console.warn(`⚠️ [Backoffice] Falha ao carregar ${slug} (${lang}), usando conteúdo local:`, err);
        setError(err as Error);
        setPage(null); // null = usar fallback local
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchPageContent();

    // Cleanup para evitar atualizações após unmount
    return () => {
      isCancelled = true;
    };
  }, [slug, lang]);

  return { page, loading, error };
}

/**
 * Hook helper para usar com fallback integrado
 * 
 * USO:
 * const heroSlogan = useBackofficeText('home', 'pt', 'heroSlogan', 'Texto padrão')
 */
export function useBackofficeText(
  slug: string,
  lang: 'pt' | 'en' | 'es' | 'fr',
  field: 'heroSlogan' | 'heroSubtitle' | 'seoTitle' | 'seoDescription',
  fallback: string
): string {
  const { page } = useBackofficeContent(slug, lang);

  if (!page) return fallback;

  switch (field) {
    case 'heroSlogan':
      return page.hero.slogan || fallback;
    case 'heroSubtitle':
      return page.hero.subtitle || fallback;
    case 'seoTitle':
      return page.seo.title || fallback;
    case 'seoDescription':
      return page.seo.description || fallback;
    default:
      return fallback;
  }
}

