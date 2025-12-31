/**
 * Hook para buscar projetos do backoffice
 * Retorna projetos publicados para uso nas páginas
 */

import { useState, useEffect } from 'react';
import { createTimeoutSignal } from '../utils/fetchWithTimeout';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3001/api';

interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  summary?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  year?: number;
  client?: string;
  tags?: string[];
  heroImage?: {
    original: string;
    thumbnail?: string;
    medium?: string;
    large?: string;
    webp?: string;
    avif?: string;
    alt?: string;
  };
  cta?: {
    label: string;
    url?: string;
  };
}

interface UseBackofficeProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: Error | null;
}

/**
 * Busca projetos publicados do backoffice
 * @param lang - Idioma para traduções
 */
export function useBackofficeProjects(lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'): UseBackofficeProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        // Buscar conteúdo que inclui projetos
        const response = await fetch(
          `${API_URL}/public/content?lang=${lang}&page=work`,
          {
            signal: createTimeoutSignal(5000),
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

        // Extrair projetos da resposta
        const projectsData: Project[] = (data.highlightProjects || []).map((p: any) => ({
          slug: p.slug,
          title: p.title,
          shortTitle: p.shortTitle,
          summary: p.summary,
          city: p.city,
          stateProvince: p.stateProvince,
          country: p.country,
          year: p.year,
          client: p.client,
          tags: p.tags || [],
          heroImage: p.heroImage,
          cta: p.cta,
        }));

        setProjects(projectsData);
      } catch (err) {
        if (isCancelled) return;

        console.error('[Backoffice] Erro ao buscar projetos:', err);
        setError(err as Error);
        setProjects([]); // Lista vazia em caso de erro
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      isCancelled = true;
    };
  }, [lang]);

  return { projects, loading, error };
}

