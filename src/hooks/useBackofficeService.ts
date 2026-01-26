/**
 * Hook para consumir dados de Serviços do Backoffice Azimut
 * Busca informações do CMS e faz fallback para servicesData.ts se falhar
 * 
 * USO:
 * const { service, loading } = useBackofficeService('cinema-audiovisual', 'pt')
 * const title = service?.title || 'Cinema & Audiovisual'
 */

import { useState, useEffect } from 'react';
import { createTimeoutSignal } from '../utils/fetchWithTimeout';

// URL do backoffice (produção)
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

export interface ServiceContent {
  slug: string;
  title: string;
  description: string;
  icon: string;
  segments: string[];  // Categorias de filtro ['education', 'training', 'corporate']
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  priority: number;
  updatedAt: string;
}

interface UseBackofficeServiceReturn {
  service: ServiceContent | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para buscar dados de um serviço do backoffice
 * 
 * @param slug - Slug do serviço (ex: 'cinema-audiovisual', 'consultoria-estrategia')
 * @param lang - Idioma (pt, en, es, fr)
 * @returns {ServiceContent | null} - Dados do serviço ou null se falhar (usar fallback local)
 */
export function useBackofficeService(
  slug: string,
  lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'
): UseBackofficeServiceReturn {
  const [service, setService] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchServiceData() {
      try {
        setLoading(true);
        setError(null);

        // Tentar buscar do backoffice
        const response = await fetch(
          `${BACKOFFICE_URL}/api/public/service/${slug}`,
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

        // Extrair dados do idioma selecionado
        const serviceContent: ServiceContent = {
          slug: data.slug,
          title: data[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || data.titlePt,
          description: data[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || data.descriptionPt,
          icon: data.icon || '📦',
          segments: data.segments || [],
          status: data.status,
          priority: data.priority || 0,
          updatedAt: data.updatedAt,
        };

        setService(serviceContent);
      } catch (err) {
        if (isCancelled) return;

        // NÃO É ERRO CRÍTICO - site funciona com fallback local (servicesData.ts)
        console.warn(`⚠️ [Backoffice] Falha ao carregar serviço ${slug} (${lang}), usando conteúdo local:`, err);
        setError(err as Error);
        setService(null); // null = usar fallback de servicesData.ts
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchServiceData();

    // Cleanup para evitar atualizações após unmount
    return () => {
      isCancelled = true;
    };
  }, [slug, lang]);

  return { service, loading, error };
}

/**
 * Hook para buscar TODOS os serviços publicados (para listagens/filtros)
 * 
 * @param lang - Idioma (pt, en, es, fr)
 * @param filterSegments - Filtrar por categorias específicas (opcional)
 * @returns Lista de serviços
 */
export function useBackofficeServices(
  lang: 'pt' | 'en' | 'es' | 'fr' = 'pt',
  filterSegments?: string[]
): { services: ServiceContent[]; loading: boolean; error: Error | null } {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchServicesData() {
      try {
        setLoading(true);
        setError(null);

        const url = new URL(`${BACKOFFICE_URL}/api/public/services`);
        if (filterSegments && filterSegments.length > 0) {
          url.searchParams.set('segments', filterSegments.join(','));
        }

        const response = await fetch(url.toString(), {
          signal: createTimeoutSignal(5000),
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (isCancelled) return;

        // Mapear para formato unificado
        const servicesData: ServiceContent[] = data.map((item: any) => ({
          slug: item.slug,
          title: item[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || item.titlePt,
          description: item[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || item.descriptionPt,
          icon: item.icon || '📦',
          segments: item.segments || [],
          status: item.status,
          priority: item.priority || 0,
          updatedAt: item.updatedAt,
        }));

        setServices(servicesData);
      } catch (err) {
        if (isCancelled) return;

        console.warn('⚠️ [Backoffice] Falha ao carregar lista de serviços, usando fallback local:', err);
        setError(err as Error);
        setServices([]); // Vazio = usar servicesData.ts
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchServicesData();

    return () => {
      isCancelled = true;
    };
  }, [lang, filterSegments?.join(',')]);

  return { services, loading, error };
}
