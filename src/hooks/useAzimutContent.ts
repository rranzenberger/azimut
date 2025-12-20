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
        let lang = savedLang || browserLang;
        
        // 2. Detectar país (100% client-side, não depende de API)
        let country = 'DEFAULT';
        
        if (autoDetectGeo) {
          // ESTRATÉGIA: Detectar PRIMEIRO via timezone (mais confiável)
          // Depois tentar API apenas como confirmação (não bloqueia)
          try {
            // Detectar país via timezone (mais confiável que idioma)
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            // Mapear timezones comuns para países
            if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || 
                timezone.includes('America/Denver') || timezone.includes('America/Los_Angeles') ||
                timezone.includes('America/Detroit') || timezone.includes('America/Indianapolis') ||
                timezone.includes('America/Phoenix') || timezone.includes('America/Seattle')) {
              country = 'US';
              console.log('🌍 País detectado via timezone: US');
            } else if (timezone.includes('America/Sao_Paulo') || timezone.includes('America/Rio') ||
                       timezone.includes('America/Fortaleza') || timezone.includes('America/Recife') ||
                       timezone.includes('America/Manaus') || timezone.includes('America/Belem')) {
              country = 'BR';
              console.log('🌍 País detectado via timezone: BR');
            } else if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver') ||
                       timezone.includes('America/Montreal') || timezone.includes('America/Winnipeg')) {
              country = 'CA';
              console.log('🌍 País detectado via timezone: CA');
            } else if (timezone.includes('Europe')) {
              country = 'EU';
              console.log('🌍 País detectado via timezone: EU');
            } else {
              // Fallback: usar idioma do navegador
              const browserCountry = navigator.language.includes('pt') ? 'BR' :
                                    navigator.language.includes('en-US') ? 'US' :
                                    navigator.language.includes('en-CA') ? 'CA' :
                                    navigator.language.includes('en') ? 'US' :
                                    navigator.language.includes('fr') ? 'CA' :
                                    'DEFAULT';
              country = browserCountry;
              console.log('🌍 País detectado via idioma:', country);
            }
            
            // Ajustar idioma baseado no país detectado (se não foi salvo manualmente)
            if (!savedLang && country !== 'DEFAULT') {
              if (country === 'US' || country === 'CA') {
                lang = 'en';
                console.log('🌐 Idioma ajustado para EN baseado no país:', country);
                // Salvar no localStorage para persistir
                localStorage.setItem('azimut-lang', 'en');
              } else if (country === 'BR') {
                lang = 'pt';
                console.log('🌐 Idioma ajustado para PT baseado no país:', country);
                // Salvar no localStorage para persistir
                localStorage.setItem('azimut-lang', 'pt');
              }
            }
          } catch (fallbackErr) {
            console.warn('Geo detection failed, using DEFAULT');
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
                if (!savedLang && country !== 'DEFAULT') {
                  if ((country === 'US' || country === 'CA') && lang !== 'en') {
                    lang = 'en';
                    localStorage.setItem('azimut-lang', 'en');
                    console.log('🌐 Idioma ajustado para EN (confirmado pela API)');
                    // Recarregar página para aplicar novo idioma
                    window.location.reload();
                  } else if (country === 'BR' && lang !== 'pt') {
                    lang = 'pt';
                    localStorage.setItem('azimut-lang', 'pt');
                    console.log('🌐 Idioma ajustado para PT (confirmado pela API)');
                    // Recarregar página para aplicar novo idioma
                    window.location.reload();
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




















