/**
 * Hook para consumir conteúdo do CMS Azimut
 * Personaliza por geo + idioma + comportamento
 */

import { useState, useEffect } from 'react';
import { getSessionId } from '../utils/analytics';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3001/api';

interface ContentOptions {
  page?: string;
  autoDetectGeo?: boolean;
}

export function useAzimutContent(options: ContentOptions = {}) {
  const { page = 'home', autoDetectGeo = true } = options;
  
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        
        // 1. Detectar idioma do navegador
        const browserLang = navigator.language.startsWith('pt') ? 'pt' :
                           navigator.language.startsWith('fr') ? 'fr' :
                           navigator.language.startsWith('es') ? 'es' : 'en';
        
        // Verificar se usuário já escolheu idioma manualmente
        const savedLang = localStorage.getItem('azimut-lang');
        const lang = savedLang || browserLang;
        
        // 2. Detectar país (se habilitado)
        let country = 'DEFAULT';
        
        if (autoDetectGeo) {
          try {
            const geoRes = await fetch(`${API_URL}/geo`);
            const geoData = await geoRes.json();
            if (geoData.detected) {
              country = geoData.country;
              console.log('🌍 País detectado:', country);
            }
          } catch (err) {
            console.warn('Geo detection failed, using default');
          }
        }
        
        // 3. Buscar conteúdo (com sessionId para personalização)
        const sessionId = getSessionId();
        const contentRes = await fetch(
          `${API_URL}/public/content?lang=${lang}&country=${country}&page=${page}&sessionId=${sessionId}`
        );
        
        if (!contentRes.ok) {
          throw new Error('Failed to fetch content');
        }
        
        const data = await contentRes.json();
        setContent(data);
        
      } catch (err) {
        setError(err as Error);
        console.error('Content fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContent();
  }, [page, autoDetectGeo]);
  
  return { content, loading, error };
}












