/**
 * Dados do rodapé (contato, WhatsApp, redes) vindos do backoffice.
 * Fallbacks para quando a API não estiver disponível.
 */

import { useState, useEffect } from 'react';

const BACKOFFICE_URL =
  import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const API_BASE = BACKOFFICE_URL.endsWith('/api') ? BACKOFFICE_URL : `${BACKOFFICE_URL}/api`;

const FALLBACK = {
  contactEmail: 'contact@azimutimmersive.com',
  whatsappNumber: '5548999701301',
  instagramUrl: 'https://www.instagram.com/azimut_vr/',
  youtubeUrl: 'https://youtube.com/@azimutart',
  linkedinUrl: 'https://linkedin.com/company/azimut-art',
  vimeoUrl: 'https://vimeo.com/azimutart',
  behanceUrl: 'https://behance.net/azimutart',
};

export interface FooterSettings {
  contactEmail: string;
  whatsappNumber: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  vimeoUrl: string;
  behanceUrl: string;
}

/** Número para wa.me: só dígitos, com DDI (ex: 5548999701301). */
export function toWhatsAppNumber(value: string | null | undefined): string {
  if (!value || !value.trim()) return FALLBACK.whatsappNumber;
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10) return FALLBACK.whatsappNumber;
  return digits.startsWith('55') ? digits : `55${digits}`;
}

export function useFooterSettings(): FooterSettings {
  const [data, setData] = useState<FooterSettings>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/public/settings`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json) return;
        setData({
          contactEmail: json.contactEmail?.trim() || FALLBACK.contactEmail,
          whatsappNumber: toWhatsAppNumber(json.whatsappNumber || json.contactPhone) || FALLBACK.whatsappNumber,
          instagramUrl: json.instagramUrl?.trim() || FALLBACK.instagramUrl,
          youtubeUrl: json.youtubeUrl?.trim() || FALLBACK.youtubeUrl,
          linkedinUrl: json.linkedinUrl?.trim() || FALLBACK.linkedinUrl,
          vimeoUrl: json.vimeoUrl?.trim() || FALLBACK.vimeoUrl,
          behanceUrl: json.behanceUrl?.trim() || FALLBACK.behanceUrl,
        });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return data;
}
