/**
 * Hook para consumir conteúdo do CMS Azimut
 * VERSÃO ROBUSTA - NUNCA causa erro #310
 * 
 * Estratégia: Hooks são SEMPRE chamados na mesma ordem
 * Se backoffice falhar, retorna null (site usa fallbacks)
 */

import { useState, useEffect, useRef } from 'react';

// ⚠️ BACKOFFICE DESABILITADO TEMPORARIAMENTE
// Quando o backoffice estiver pronto, mudar para true
const CMS_ENABLED = false;

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const API_URL = `${BACKOFFICE_URL}/api`;

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
      
      try {
        const lang = propLang || localStorage.getItem('azimut-lang') || 'pt';
        
        const response = await fetch(
          `${API_URL}/public/content?lang=${lang}&page=${page}`,
          {
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        
        if (!isMounted.current) return;
        
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          // Falha silenciosa - usar fallback
          setContent(null);
        }
      } catch (err) {
        // Ignorar erros de abort
        if (err instanceof Error && err.name === 'AbortError') return;
        
        if (!isMounted.current) return;
        
        // Falha silenciosa - usar fallback
        console.warn('[CMS] Usando conteúdo local');
        setContent(null);
      } finally {
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
