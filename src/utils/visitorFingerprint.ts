// ════════════════════════════════════════════════════════════
// VISITOR FINGERPRINTING - Identificar visitantes anônimos
// ════════════════════════════════════════════════════════════
// Gera hash único baseado em características do navegador/dispositivo
// Permite rastrear mesmo visitante mesmo sem login/cookie

/**
 * Gera fingerprint único do visitante
 * Combina: userAgent + timezone + language + screen resolution + platform
 */
export function generateVisitorFingerprint(): string {
  if (typeof window === 'undefined') return '';

  const components = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    `${screen.width}x${screen.height}`,
    `${screen.colorDepth}bit`,
    navigator.platform,
    navigator.hardwareConcurrency || '0',
    navigator.maxTouchPoints || '0',
  ];

  const fingerprintString = components.join('|');

  // Hash simples (para produção, usar crypto.subtle.digest)
  return simpleHash(fingerprintString);
}

/**
 * Hash simples (fallback para navegadores antigos)
 * Em produção, usar crypto.subtle.digest para hash SHA-256
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Hash seguro usando Web Crypto API (recomendado)
 */
export async function generateSecureFingerprint(): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    return generateVisitorFingerprint(); // Fallback
  }

  const components = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    `${screen.width}x${screen.height}`,
    `${screen.colorDepth}bit`,
    navigator.platform,
    (navigator.hardwareConcurrency || 0).toString(),
    (navigator.maxTouchPoints || 0).toString(),
    new Date().getTimezoneOffset().toString(),
  ];

  const fingerprintString = components.join('|');
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintString);
  
  try {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
  } catch (error) {
    console.warn('Crypto API failed, using simple hash:', error);
    return generateVisitorFingerprint();
  }
}

/**
 * Detectar device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  
  if (ua.includes('tablet') || ua.includes('ipad') || (width >= 768 && width < 1024)) {
    return 'tablet';
  }
  
  return 'desktop';
}

/**
 * Detectar browser
 */
export function getBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const ua = navigator.userAgent;
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  
  return 'Unknown';
}

/**
 * Detectar OS
 */
export function getOS(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const ua = navigator.userAgent;
  
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  
  return 'Unknown';
}
