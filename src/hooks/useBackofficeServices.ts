/**
 * Hook para buscar serviços do backoffice
 * Retorna serviços publicados para uso nas páginas
 */

import { useState, useEffect } from 'react';
import { createTimeoutSignal } from '../utils/fetchWithTimeout';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3001/api';

interface Service {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
}

interface UseBackofficeServicesReturn {
  services: Service[];
  loading: boolean;
  error: Error | null;
}

/**
 * Busca serviços publicados do backoffice
 * @param lang - Idioma para traduções
 */
export function useBackofficeServices(lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'): UseBackofficeServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchServices() {
      try {
        setLoading(true);
        setError(null);

        // Buscar conteúdo que inclui serviços
        const response = await fetch(
          `${API_URL}/public/content?lang=${lang}&page=what`,
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

        // Extrair serviços da resposta
        const servicesData: Service[] = (data.services || []).map((s: any) => ({
          slug: s.slug,
          title: s.title,
          description: s.description,
          icon: s.icon,
        }));

        setServices(servicesData);
      } catch (err) {
        if (isCancelled) return;

        console.error('[Backoffice] Erro ao buscar serviços:', err);
        setError(err as Error);
        setServices([]); // Lista vazia em caso de erro
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      isCancelled = true;
    };
  }, [lang]);

  return { services, loading, error };
}

