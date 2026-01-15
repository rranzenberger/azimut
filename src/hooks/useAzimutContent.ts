/**
 * Hook para consumir conteúdo do CMS Azimut
 * Personaliza por geo + idioma + comportamento
 */

import { useState, useEffect } from 'react';
import { getSessionId } from '../utils/analytics';
import { detectGeoFromTimezone, detectLanguageFromBrowser, detectCountryFromIP, getLanguageFromCountry } from '../utils/geoDetection';
import { createTimeoutSignal } from '../utils/fetchWithTimeout';

// Usar VITE_BACKOFFICE_URL se disponível, senão VITE_CMS_API_URL, senão fallback
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const API_URL = `${BACKOFFICE_URL}/api`;

interface ContentOptions {
  page?: string;
  autoDetectGeo?: boolean;
  lang?: 'pt' | 'en' | 'fr' | 'es'; // Idioma do conteúdo
}

export function useAzimutContent(options: ContentOptions = {}) {
  const { page = 'home', autoDetectGeo = true, lang: propLang } = options;
  
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        
        // 1. Detectar idioma (prioridade: prop > localStorage > navegador)
        const browserLang = navigator.language.startsWith('pt') ? 'pt' :
                           navigator.language.startsWith('fr') ? 'fr' :
                           navigator.language.startsWith('es') ? 'es' : 'en';
        
        // Verificar se usuário já escolheu idioma manualmente
        const savedLang = localStorage.getItem('azimut-lang');
        let lang = propLang || savedLang || browserLang;
        
        // 2. Detectar país e idioma (100% client-side, não depende de API)
        let country = 'DEFAULT';
        
        if (autoDetectGeo) {
          // ESTRATÉGIA ATUALIZADA: Detectar PRIMEIRO via IP (funciona com VPN!)
          // Fallback: timezone (se IP falhar)
          try {
            // 1. Tentar detectar por IP (detecta VPN corretamente!)
            const ipGeo = await detectCountryFromIP();
            
            if (ipGeo && ipGeo.countryCode && ipGeo.countryCode !== 'DEFAULT') {
              country = ipGeo.countryCode;
              
              // Ajustar idioma baseado no país detectado (se não foi salvo manualmente)
              if (!savedLang) {
                lang = getLanguageFromCountry(ipGeo.countryCode);
                localStorage.setItem('azimut-lang', lang);
              }
            } else {
              // 2. Fallback: Detectar via timezone (se IP falhar)
              const geo = detectGeoFromTimezone();
              country = geo.countryCode;
              
              // Ajustar idioma baseado no país detectado (se não foi salvo manualmente)
              if (!savedLang && country !== 'DEFAULT') {
                lang = geo.language;
                localStorage.setItem('azimut-lang', geo.language);
              }
            }
          } catch (fallbackErr) {
            // Fallback: usar idioma do navegador
            if (!savedLang) {
              lang = detectLanguageFromBrowser();
              localStorage.setItem('azimut-lang', lang);
            }
          }
          
          // Tentar API do CMS apenas como confirmação (não bloqueia, executa em paralelo)
          // Se API funcionar, usa o país da API (mais preciso)
          fetch(`${API_URL}/geo`, {
            signal: createTimeoutSignal(2000), // Timeout menor (2s)
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
                
                // Ajustar idioma se API confirmar país diferente
                if (!savedLang && country !== 'DEFAULT') {
                  const geo = detectGeoFromTimezone();
                  const apiLanguage = geo.language;
                  
                  if (lang !== apiLanguage) {
                    // Apenas atualizar localStorage, App.tsx vai detectar e atualizar
                    localStorage.setItem('azimut-lang', apiLanguage);
                  }
                }
              }
            })
            .catch(() => {
              // Silencioso - API não é obrigatória
            });
        }
        
        // 3. Buscar conteúdo (com sessionId para personalização)
        // IMPORTANTE: Não bloquear renderização se CMS falhar
        try {
          const sessionId = getSessionId() || 'anonymous';
          const contentRes = await fetch(
            `${API_URL}/public/content?lang=${lang}&country=${country}&page=${page}&sessionId=${encodeURIComponent(sessionId)}`,
            {
              signal: createTimeoutSignal(5000), // Timeout de 5s (compatível)
            }
          );
          
          if (contentRes.ok) {
            const data = await contentRes.json();
            setContent(data);
          } else {
            // Se falhar, não é crítico - site funciona sem CMS
            console.warn(`[CMS] Falha ao buscar conteúdo (${contentRes.status}), usando conteúdo local`);
            setContent(null); // null = usar conteúdo local
          }
        } catch (fetchErr) {
          // Erro de fetch (CORS, timeout, etc) - não é crítico
          console.warn('[CMS] Erro ao buscar conteúdo do CMS, usando conteúdo local:', fetchErr);
          setContent(null); // null = usar conteúdo local
        }
        
      } catch (err) {
        // Erro geral - não quebrar renderização
        console.warn('[CMS] Erro geral, usando conteúdo local:', err);
        setError(err as Error);
        setContent(null); // null = usar conteúdo local
      } finally {
        setLoading(false);
      }
    }
    
    fetchContent();
  }, [page, autoDetectGeo, propLang]); // Adicionar propLang como dependência
  
  return { content, loading, error };
}




















