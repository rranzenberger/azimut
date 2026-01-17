/**
 * Sistema de tracking comportamental silencioso
 * Envia dados para o CMS analisar com IA (DeepSeek)
 */

// Gerar ou recuperar sessionId
export function getSessionId(): string {
  try {
    let sessionId = sessionStorage.getItem('azimut_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('azimut_session_id', sessionId);
    }
    return sessionId;
  } catch (error) {
    // Fallback se sessionStorage não estiver disponível
    return `fallback_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Gerar ou recuperar visitorFingerprint (identifica visitante anônimo)
let visitorFingerprintCache: string | null = null;
async function getVisitorFingerprint(): Promise<string> {
  if (visitorFingerprintCache) return visitorFingerprintCache;
  
  // Tentar recuperar do localStorage (persiste entre sessões)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('azimut_visitor_fingerprint');
    if (stored) {
      visitorFingerprintCache = stored;
      return stored;
    }

    // Gerar novo fingerprint
    const { generateSecureFingerprint } = await import('./visitorFingerprint');
    const fingerprint = await generateSecureFingerprint();
    localStorage.setItem('azimut_visitor_fingerprint', fingerprint);
    visitorFingerprintCache = fingerprint;
    return fingerprint;
  }
  
  return '';
}

// ✅ ETAPA 5: TRACKING REATIVADO
// Sistema de analytics e tracking ativado
const TRACKING_ENABLED = true;

// Usar VITE_BACKOFFICE_URL se disponível, senão VITE_CMS_API_URL, senão fallback
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const API_URL = `${BACKOFFICE_URL}/api`;

// Track page view com fingerprinting
export function trackPageView(pageSlug: string): () => void {
  // ⚠️ TRACKING DESABILITADO
  if (!TRACKING_ENABLED) {
    return () => {}; // Retorna função vazia de cleanup
  }
  
  const sessionId = getSessionId();
  const startTime = Date.now();

  // Gerar fingerprint async (não bloquear)
  getVisitorFingerprint().then(async fingerprint => {
    // Importar helpers dinamicamente
    const { getDeviceType, getBrowser, getOS } = await import('./visitorFingerprint');
    
    // Enviar fingerprint junto com primeira page view
    fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event: 'page_view',
        data: {
          pageSlug,
          visitorFingerprint: fingerprint,
          deviceType: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
          screenResolution: typeof window !== 'undefined' ? `${screen.width}x${screen.height}` : null,
        },
      }),
    }).catch(() => {});
  });

  // Quando o usuário sair da página, enviar tempo gasto
  const sendData = async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const scrollDepth = typeof window !== 'undefined' ? Math.floor(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    ) : 0;

    const fingerprint = await getVisitorFingerprint();

    // Não bloquear renderização se fetch falhar
    fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event: 'page_view',
        data: {
          pageSlug,
          timeSpent,
          scrollDepth,
          visitorFingerprint: fingerprint,
        },
      }),
    }).catch(() => {
      // Silencioso - não logar erros de analytics
    });
  };

  // Enviar dados ao sair da página
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', sendData);
  }
  
  // Enviar dados também ao trocar de rota (SPA)
  // Retornar função de cleanup
  return () => {
    sendData();
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', sendData);
    }
  };
}

// Importar helpers de fingerprinting (ao final do arquivo para evitar circular)

// Track project interaction
export async function trackProjectInteraction(
  projectSlug: string,
  type: 'VIEW' | 'CLICK' | 'HOVER'
) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'project_interaction',
      data: {
        projectSlug,
        type,
      },
    }),
  }).catch(() => {
    // Silencioso
  });
}

// Track budget wizard
export async function trackBudgetWizard(data: {
  step?: number;
  category?: string;
  budget?: string;
  completed?: boolean;
}) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'budget_wizard',
      data,
    }),
  }).catch(() => {
    // Silencioso
  });
}

// Track CTA clicks
export async function trackCTA(ctaName: string, location?: string) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'cta_click',
      data: {
        ctaName,
        location,
      },
    }),
  }).catch(() => {
    // Silencioso
  });
}

// Track language change
export async function trackLanguageChange(from: string, to: string) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'language_change',
      data: {
        from,
        to,
      },
    }),
  }).catch(() => {
    // Silencioso
  });
}

// Track PWA events (install, prompt shown, etc)
export async function trackPWAEvent(
  type: 'installed' | 'prompt_shown' | 'prompt_dismissed',
  data?: any
) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  if (typeof window === 'undefined') return;
  
  const sessionId = getSessionId();
  const fingerprint = await getVisitorFingerprint();
  
  // Importar helpers dinamicamente
  const { getDeviceType, getBrowser } = await import('./visitorFingerprint');

  // Detectar se está em modo PWA
  const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                // @ts-ignore - iOS Safari
                (window.navigator.standalone === true);

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'pwa_event',
      data: {
        type, // 'installed' | 'prompt_shown' | 'prompt_dismissed'
        isPWA,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        visitorFingerprint: fingerprint,
        deviceType: getDeviceType(),
        browser: getBrowser(),
        ...data,
      },
    }),
  }).catch(() => {
    // Silencioso - não bloquear se tracking falhar
  });
}

// Submit lead
export async function submitLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}) {
  const sessionId = getSessionId();

  const response = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      ...data,
      source: {
        url: window.location.href,
        referrer: document.referrer,
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit lead');
  }

  return response.json();
}

// Track visitor behavior (clicks, scrolls, hovers, etc)
export async function trackBehavior(
  behaviorType: 'click' | 'scroll' | 'hover' | 'form_start' | 'form_abandon' | 'form_field_focus' | 'form_field_blur' | 'form_submit' | 'video_play' | 'video_pause' | 'video_complete' | 'video_progress' | 'download' | 'share' | 'search' | 'filter' | 'cta_click' | 'external_link' | 'scroll_depth',
  data?: {
    element?: string;
    elementType?: string;
    pageSlug?: string;
    value?: string;
    metadata?: any;
  }
) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();
  
  // Importar helpers dinamicamente para evitar circular
  const { getDeviceType, getBrowser, getOS } = await import('./visitorFingerprint');
  const fingerprint = await getVisitorFingerprint();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'behavior',
      data: {
        behaviorType,
        visitorFingerprint: fingerprint,
        pageSlug: typeof window !== 'undefined' ? window.location.pathname : data?.pageSlug,
        timestamp: new Date().toISOString(),
        ...data,
      },
    }),
  }).catch(() => {
    // Silencioso
  });
}

// ════════════════════════════════════════════════════════════
// TIME ON PAGE TRACKING - Detalhado
// ════════════════════════════════════════════════════════════
export function trackTimeOnPage(pageSlug: string): () => void {
  if (!TRACKING_ENABLED) return () => {}; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();
  const startTime = Date.now();
  let lastReportTime = startTime;
  const reportInterval = 30000; // Reportar a cada 30 segundos

  // Reportar periodicamente enquanto usuário está na página
  const intervalId = setInterval(async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const timeSinceLastReport = Math.floor((Date.now() - lastReportTime) / 1000);
    
    const fingerprint = await getVisitorFingerprint();
    
    fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event: 'time_on_page',
        data: {
          pageSlug,
          timeSpent,
          timeSinceLastReport,
          visitorFingerprint: fingerprint,
          timestamp: new Date().toISOString(),
        },
      }),
    }).catch(() => {});
    
    lastReportTime = Date.now();
  }, reportInterval);

  // Reportar ao sair da página
  const sendFinalData = async () => {
    clearInterval(intervalId);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const fingerprint = await getVisitorFingerprint();
    
    fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event: 'time_on_page_final',
        data: {
          pageSlug,
          timeSpent,
          visitorFingerprint: fingerprint,
          timestamp: new Date().toISOString(),
        },
      }),
    }).catch(() => {});
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', sendFinalData);
  }

  return () => {
    clearInterval(intervalId);
    sendFinalData();
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', sendFinalData);
    }
  };
}

// ════════════════════════════════════════════════════════════
// VIDEO TRACKING - Play, Pause, Complete, Progress
// ════════════════════════════════════════════════════════════
export async function trackVideoEvent(
  videoId: string,
  videoUrl: string,
  eventType: 'play' | 'pause' | 'complete' | 'progress',
  data?: {
    currentTime?: number;
    duration?: number;
    progress?: number; // 0-100
    platform?: 'youtube' | 'vimeo' | 'custom';
  }
) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();
  const fingerprint = await getVisitorFingerprint();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'video_event',
      data: {
        videoId,
        videoUrl,
        eventType,
        visitorFingerprint: fingerprint,
        pageSlug: typeof window !== 'undefined' ? window.location.pathname : '',
        timestamp: new Date().toISOString(),
        ...data,
      },
    }),
  }).catch(() => {});
}

// ════════════════════════════════════════════════════════════
// FORM TRACKING - Start, Field Focus, Submit, Abandon
// ════════════════════════════════════════════════════════════
export async function trackFormEvent(
  formId: string,
  formName: string,
  eventType: 'start' | 'field_focus' | 'field_blur' | 'field_change' | 'submit' | 'abandon',
  data?: {
    fieldName?: string;
    fieldType?: string;
    fieldValue?: string;
    timeSpent?: number;
    fieldsCompleted?: number;
    totalFields?: number;
  }
) {
  if (!TRACKING_ENABLED) return; // ⚠️ DESABILITADO
  
  const sessionId = getSessionId();
  const fingerprint = await getVisitorFingerprint();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'form_event',
      data: {
        formId,
        formName,
        eventType,
        visitorFingerprint: fingerprint,
        pageSlug: typeof window !== 'undefined' ? window.location.pathname : '',
        timestamp: new Date().toISOString(),
        ...data,
      },
    }),
  }).catch(() => {});
}

// ════════════════════════════════════════════════════════════
// LEAD SCORING - Calcular score de interesse
// ════════════════════════════════════════════════════════════
export interface LeadScore {
  score: number; // 0-100
  level: 'cold' | 'warm' | 'hot';
  factors: {
    pagesVisited: number;
    timeSpent: number;
    videosWatched: number;
    formsStarted: number;
    formsCompleted: number;
    scrollDepth: number;
    ctaClicks: number;
  };
}

export async function calculateLeadScore(visitorFingerprint: string): Promise<LeadScore> {
  try {
    const response = await fetch(`${API_URL}/leads/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorFingerprint }),
    });

    if (response.ok) {
      const data = await response.json();
      // Validar estrutura da resposta
      if (data.score !== undefined && data.level && data.factors) {
        return data;
      }
    }
  } catch (error) {
    // Silencioso - usar fallback
  }

  // Fallback: buscar dados de tracking e calcular score básico
  try {
    const trackingResponse = await fetch(`${API_URL}/track/visitor/${visitorFingerprint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (trackingResponse.ok) {
      const trackingData = await trackingResponse.json();
      
      // Calcular score baseado em tracking
      let score = 0;
      const factors = {
        pagesVisited: trackingData.pagesVisited || 0,
        timeSpent: trackingData.timeSpent || 0,
        videosWatched: trackingData.videosWatched || 0,
        formsStarted: trackingData.formsStarted || 0,
        formsCompleted: trackingData.formsCompleted || 0,
        scrollDepth: trackingData.scrollDepth || 0,
        ctaClicks: trackingData.ctaClicks || 0,
      };

      // Cálculo de score
      score += factors.pagesVisited * 5;
      score += Math.min(factors.timeSpent / 10, 30); // Max 30 pontos
      score += factors.videosWatched * 10;
      score += factors.formsStarted * 15;
      score += factors.formsCompleted * 30;
      score += factors.scrollDepth * 0.5;
      score += factors.ctaClicks * 5;

      score = Math.min(Math.round(score), 100);

      return {
        score,
        level: score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold',
        factors,
      };
    }
  } catch (error) {
    // Silencioso
  }

  // Fallback final: score zero
  return {
    score: 0,
    level: 'cold',
    factors: {
      pagesVisited: 0,
      timeSpent: 0,
      videosWatched: 0,
      formsStarted: 0,
      formsCompleted: 0,
      scrollDepth: 0,
      ctaClicks: 0,
    },
  };
}

// Export já feito inline acima
// export { getSessionId, getVisitorFingerprint };
