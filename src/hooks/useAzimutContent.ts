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
            // Tentar API do CMS primeiro
            const geoRes = await fetch(`${API_URL}/geo`, {
              signal: AbortSignal.timeout(3000), // Timeout de 3s
            });
            
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData.detected && geoData.country) {
                country = geoData.country;
                console.log('🌍 País detectado via CMS:', country);
              }
            }
          } catch (err) {
            // Fallback: detectar via timezone e idioma do navegador
            console.warn('Geo detection via CMS failed, trying fallback...');
            
            try {
              // Detectar país via timezone (mais confiável que idioma)
              const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              
              // Mapear timezones comuns para países
              if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || 
                  timezone.includes('America/Denver') || timezone.includes('America/Los_Angeles')) {
                country = 'US';
                console.log('🌍 País detectado via timezone: US');
              } else if (timezone.includes('America/Sao_Paulo') || timezone.includes('America/Rio')) {
                country = 'BR';
                console.log('🌍 País detectado via timezone: BR');
              } else if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver')) {
                country = 'CA';
                console.log('🌍 País detectado via timezone: CA');
              } else if (timezone.includes('Europe')) {
                country = 'EU';
                console.log('🌍 País detectado via timezone: EU');
              } else {
                // Fallback final: usar idioma do navegador
                const browserCountry = navigator.language.includes('pt') ? 'BR' :
                                      navigator.language.includes('en-US') ? 'US' :
                                      navigator.language.includes('en-CA') ? 'CA' :
                                      navigator.language.includes('en') ? 'US' :
                                      navigator.language.includes('fr') ? 'CA' :
                                      'DEFAULT';
                country = browserCountry;
                console.log('🌍 País detectado via idioma:', country);
              }
            } catch (fallbackErr) {
              console.warn('Fallback geo detection failed, using DEFAULT');
            }
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




















