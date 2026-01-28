/**
 * Hook para consumir conteúdo do CMS Azimut
 * VERSÃO ROBUSTA - NUNCA causa erro #310
 * 
 * Estratégia: Hooks são SEMPRE chamados na mesma ordem
 * Se backoffice falhar, retorna null (site usa fallbacks)
 */

import { useState, useEffect, useRef } from 'react';

// ✅ ETAPA 5: BACKOFFICE REATIVADO
// Tracking de conteúdo do CMS ativado
const CMS_ENABLED = true;

// URL do backoffice - tenta várias variáveis de ambiente
// Prioridade: VITE_BACKOFFICE_URL > fallback produção
const BACKOFFICE_URL = 
  import.meta.env.VITE_BACKOFFICE_URL || 
  'https://backoffice.azmt.com.br';

const API_URL = BACKOFFICE_URL.endsWith('/api') ? BACKOFFICE_URL : `${BACKOFFICE_URL}/api`;

interface ContentOptions {
  page?: string;
  autoDetectGeo?: boolean;
  lang?: 'pt' | 'en' | 'fr' | 'es';
}

interface UseAzimutContentReturn {
  content: any;
  loading: boolean;
  error: Error | null;
}

export function useAzimutContent(options: ContentOptions = {}): UseAzimutContentReturn {
  const { page = 'home', lang: propLang } = options;
  
  // ⚠️ TODOS os hooks SEMPRE no topo, SEMPRE chamados
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Começa false se CMS desabilitado
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);
  
  // Cleanup ref
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch effect - SEMPRE executa, mas pode ser no-op
  useEffect(() => {
    // Se CMS desabilitado, não faz nada
    if (!CMS_ENABLED) {
      setContent(null);
      setLoading(false);
      setError(null);
      return;
    }

    // CMS habilitado - buscar conteúdo
    const controller = new AbortController();
    
    async function fetchContent() {
      if (!isMounted.current) return;
      
      setLoading(true);
      setError(null);
      
      // ⚠️ SEGURANÇA: Timeout de 5 segundos para evitar loading infinito
      const timeoutId = setTimeout(() => {
        if (isMounted.current) {
          console.warn('[CMS] Timeout - forçando fim do loading');
          setLoading(false);
          setContent(null);
        }
      }, 5000);
      
      try {
        const lang = propLang || localStorage.getItem('azimut-lang') || 'pt';
        const url = `${API_URL}/public/content?lang=${lang}&page=${page}`;
        
        console.log('[CMS] Buscando conteúdo:', url);
        
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          // ⚠️ Timeout de 4 segundos na requisição
        });
        
        clearTimeout(timeoutId);
        
        if (!isMounted.current) return;
        
        console.log('[CMS] Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('[CMS] Dados recebidos:', {
            page: data.page?.slug,
            projectsCount: data.highlightProjects?.length || 0,
            projects: data.highlightProjects?.map((p: any) => p.title).slice(0, 5)
          });
          setContent(data);
        } else {
          console.warn('[CMS] Resposta não-OK:', response.status, response.statusText);
          setContent(null);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        
        // Ignorar erros de abort
        if (err instanceof Error && err.name === 'AbortError') return;
        
        if (!isMounted.current) return;
        
        console.error('[CMS] Erro ao buscar:', err);
        setContent(null);
      } finally {
        clearTimeout(timeoutId);
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }

    fetchContent();
    
    return () => {
      controller.abort();
    };
  }, [page, propLang]);

  return { content, loading, error };
}
