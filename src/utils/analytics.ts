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

// Usar VITE_BACKOFFICE_URL se disponível, senão VITE_CMS_API_URL, senão fallback
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const API_URL = `${BACKOFFICE_URL}/api`;

// Track page view
export function trackPageView(pageSlug: string): () => void {
  const sessionId = getSessionId();
  const startTime = Date.now();

  // Quando o usuário sair da página, enviar tempo gasto
  const sendData = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const scrollDepth = Math.floor(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

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
        },
      }),
    }).catch(() => {
      // Silencioso - não logar erros de analytics
    });
  };

  // Enviar dados ao sair da página
  window.addEventListener('beforeunload', sendData);
  
  // Enviar dados também ao trocar de rota (SPA)
  // Retornar função de cleanup
  return () => {
    sendData();
    window.removeEventListener('beforeunload', sendData);
  };
}

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
  const sessionId = getSessionId();

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

export { getSessionId };
