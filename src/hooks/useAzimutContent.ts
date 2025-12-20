/**
 * Hook para consumir conteúdo do CMS Azimut
 * Personaliza por geo + idioma + comportamento
 */

import { useState, useEffect } from 'react';
import { getSessionId } from '../utils/analytics';
import { detectGeoFromTimezone, detectLanguageFromBrowser } from '../utils/geoDetection';

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
        let lang = savedLang || browserLang;
        
        // 2. Detectar país e idioma (100% client-side, não depende de API)
        let country = 'DEFAULT';
        
        if (autoDetectGeo) {
          // ESTRATÉGIA: Detectar PRIMEIRO via timezone (mais confiável)
          // Depois tentar API apenas como confirmação (não bloqueia)
          try {
            // Detectar país e idioma via timezone
            const geo = detectGeoFromTimezone();
            country = geo.countryCode;
            
            console.log(`🌍 País detectado via timezone: ${geo.country} (${geo.countryCode})`);
            if (geo.region) {
              console.log(`📍 Região: ${geo.region}`);
            }
            
            // Ajustar idioma baseado no país detectado (se não foi salvo manualmente)
            if (!savedLang && country !== 'DEFAULT') {
              lang = geo.language;
              console.log(`🌐 Idioma ajustado para ${geo.language.toUpperCase()} baseado no país: ${geo.country}`);
              // Salvar no localStorage para persistir
              localStorage.setItem('azimut-lang', geo.language);
            }
          } catch (fallbackErr) {
            console.warn('Geo detection failed, using browser language');
            // Fallback: usar idioma do navegador
            if (!savedLang) {
              lang = detectLanguageFromBrowser();
              console.log(`🌐 Idioma detectado via navegador: ${lang.toUpperCase()}`);
              localStorage.setItem('azimut-lang', lang);
            }
          }
          
          // Tentar API do CMS apenas como confirmação (não bloqueia, executa em paralelo)
          // Se API funcionar, usa o país da API (mais preciso)
          fetch(`${API_URL}/geo`, {
            signal: AbortSignal.timeout(2000), // Timeout menor (2s)
          })
            .then(geoRes => {
              if (geoRes.ok) {
                return geoRes.json();
              }
              return null;
            })
            .then(geoData => {
              if (geoData?.detected && geoData.country) {
                country = geoData.country;
                console.log('🌍 País confirmado via CMS:', country);
                
                // Ajustar idioma se API confirmar país diferente
                // REMOVIDO: window.location.reload() estava causando problemas na navegação
                // O idioma já é atualizado via App.tsx useEffect, não precisa recarregar
                if (!savedLang && country !== 'DEFAULT') {
                  const geo = detectGeoFromTimezone();
                  const apiLanguage = geo.language;
                  
                  if (lang !== apiLanguage) {
                    // Apenas atualizar localStorage, App.tsx vai detectar e atualizar
                    localStorage.setItem('azimut-lang', apiLanguage);
                    console.log(`🌐 Idioma ajustado para ${apiLanguage.toUpperCase()} (confirmado pela API)`);
                    // Não recarregar - deixar App.tsx gerenciar a atualização
                  }
                }
              }
            })
            .catch(() => {
              // Silencioso - API não é obrigatória
            });
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




















