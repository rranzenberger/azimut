/**
 * Sistema de tracking comportamental silencioso
 * Envia dados para o CMS analisar com IA (DeepSeek)
 */

// Gerar ou recuperar sessionId
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('azimut_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('azimut_session_id', sessionId);
  }
  return sessionId;
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

// Usar VITE_BACKOFFICE_URL se disponível, senão VITE_CMS_API_URL, senão fallback
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const API_URL = `${BACKOFFICE_URL}/api`;

// Track page view com fingerprinting
export function trackPageView(pageSlug: string): () => void {
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
  behaviorType: 'click' | 'scroll' | 'hover' | 'form_start' | 'form_abandon' | 'video_play' | 'download' | 'share' | 'search' | 'filter' | 'cta_click' | 'external_link',
  data?: {
    element?: string;
    elementType?: string;
    pageSlug?: string;
    value?: string;
    metadata?: any;
  }
) {
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
        ...data,
      },
    }),
  }).catch(() => {
    // Silencioso
  });
}

export { getSessionId, getVisitorFingerprint };
