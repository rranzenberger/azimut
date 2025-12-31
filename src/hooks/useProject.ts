/**
 * Hook para buscar projeto individual por slug
 */

import { useState, useEffect } from 'react';

interface ProjectData {
  slug: string;
  title: string;
  shortTitle?: string;
  summary?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  year?: number;
  client?: string;
  type?: string;
  tags: string[];
  services: Array<{ slug: string; title: string }>;
  heroImage?: {
    original: string;
    thumbnail?: string;
    medium?: string;
    large?: string;
    webp?: string;
    avif?: string;
    alt?: string;
  } | null;
  market?: {
    code: string;
    label: string;
  } | null;
  cta?: {
    label?: string;
    url?: string;
  };
}

interface UseProjectResult {
  project: ProjectData | null;
  loading: boolean;
  error: string | null;
}

const API_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

export function useProject(slug: string, lang: string = 'pt'): UseProjectResult {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/public/project/${slug}?lang=${lang}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project';
          setError(errorMessage);
          console.warn('Failed to fetch project:', errorMessage);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

  return { project, loading, error };
}

