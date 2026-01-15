/**
 * Hook para consumir conteúdo do Backoffice com suporte a:
 * - 4 Línguas (PT, EN, ES, FR)
 * - 2 Temas (Light, Dark)
 * - Fallback seguro para conteúdo local
 * 
 * USO:
 * const { content, loading } = usePageContent('home', 'pt')
 * const heroTitle = content?.hero?.title || 'Fallback local'
 */

import { useState, useEffect } from 'react';
import { useTheme } from './useTheme';
import { createTimeoutSignal } from '../utils/fetchWithTimeout';

// URL do backoffice (produção)
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

interface HeroContent {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
}

interface ColorsContent {
  primary?: string;
  primaryDark?: string;
  background?: string;
  backgroundLight?: string;
  text?: string;
  textSecondary?: string;
  accent?: string;
  border?: string;
}

interface SEOContent {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
}

interface PageContent {
  hero: HeroContent;
  colors: ColorsContent;
  seo: SEOContent;
  sections?: Array<{
    key: string;
    content: any;
  }>;
}

interface UsePageContentReturn {
  content: PageContent | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para buscar conteúdo de uma página do backoffice
 * Suporta tema claro/escuro e 4 línguas
 * 
 * @param pageSlug - Slug da página (ex: 'home', 'vancouver', 'what-we-do')
 * @param lang - Idioma (pt, en, es, fr)
 * @returns {PageContent | null} - Conteúdo da página ou null se falhar (usar fallback local)
 */
export function usePageContent(
  pageSlug: string,
  lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'
): UsePageContentReturn {
  const { theme } = useTheme(); // 'light' | 'dark'
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPageContent() {
      try {
        setLoading(true);
        setError(null);

        // Buscar conteúdo específico para idioma + tema
        const response = await fetch(
          `${BACKOFFICE_URL}/api/public/page/${pageSlug}?lang=${lang}&theme=${theme}`,
          {
            signal: createTimeoutSignal(5000), // Timeout de 5s
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

        // Estruturar conteúdo
        const pageContent: PageContent = {
          hero: {
            title: data.hero?.title,
            subtitle: data.hero?.subtitle,
            description: data.hero?.description,
            imageUrl: data.hero?.imageUrl,
            ctaText: data.hero?.ctaText,
            ctaLink: data.hero?.ctaLink,
          },
          colors: data.colors || {},
          seo: {
            title: data.seo?.title,
            description: data.seo?.description,
            keywords: data.seo?.keywords,
          },
          sections: data.sections || [],
        };

        setContent(pageContent);
      } catch (err) {
        if (isCancelled) return;

        // NÃO É ERRO CRÍTICO - site funciona com fallback local
        console.warn(`⚠️ [Backoffice] Falha ao carregar ${pageSlug} (${lang}/${theme}), usando conteúdo local:`, err);
        setError(err as Error);
        setContent(null); // null = usar fallback local
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
  }, [pageSlug, lang, theme]); // Re-fetch se tema ou idioma mudar

  return { content, loading, error };
}

/**
 * Hook helper para usar com fallback integrado
 * 
 * USO:
 * const heroTitle = usePageText('home', 'pt', 'heroTitle', 'Texto padrão')
 */
export function usePageText(
  pageSlug: string,
  lang: 'pt' | 'en' | 'es' | 'fr',
  field: 'heroTitle' | 'heroSubtitle' | 'heroDescription' | 'seoTitle' | 'seoDescription',
  fallback: string
): string {
  const { content } = usePageContent(pageSlug, lang);

  if (!content) return fallback;

  switch (field) {
    case 'heroTitle':
      return content.hero.title || fallback;
    case 'heroSubtitle':
      return content.hero.subtitle || fallback;
    case 'heroDescription':
      return content.hero.description || fallback;
    case 'seoTitle':
      return content.seo.title || fallback;
    case 'seoDescription':
      return content.seo.description || fallback;
    default:
      return fallback;
  }
}
