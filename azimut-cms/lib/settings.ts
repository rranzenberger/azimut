/**
 * Helper para buscar configurações do Settings
 * Cacheia o resultado para evitar múltiplas queries
 * Retorna valores padrão se banco não estiver disponível
 */

import { prisma } from './prisma';

let cachedSettings: any = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Valores padrão genéricos para fallback
const DEFAULT_SETTINGS = {
  id: 'singleton',
  siteName: 'Azimut',
  siteUrl: 'https://azmt.com.br',
  contactEmail: null,
  contactPhone: null,
  defaultMetaDescription: null,
  defaultKeywords: null,
  ogImageUrl: null,
  facebookUrl: null,
  instagramUrl: null,
  linkedinUrl: null,
  twitterUrl: null,
  youtubeUrl: null,
  kabbamApiKey: null,
  kabbamApiUrl: null,
  smtpHost: null,
  smtpPort: null,
  smtpUser: null,
  smtpPassword: null,
  smtpFromEmail: null,
  deepseekApiKey: null,
  notificationEmail: process.env.NOTIFICATION_EMAIL || null,
  defaultLanguage: 'pt',
  defaultCountry: 'BR',
  timezone: 'America/Sao_Paulo',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function getSettings() {
  const now = Date.now();
  
  // Retornar cache se ainda válido
  if (cachedSettings && (now - cacheTimestamp) < CACHE_TTL) {
    return cachedSettings;
  }

  try {
    // Buscar do banco
    let settings = await prisma.settings.findUnique({
      where: { id: 'singleton' },
    });

    // Se não existir, tentar criar com valores padrão
    if (!settings) {
      try {
        settings = await prisma.settings.create({
          data: {
            id: 'singleton',
            siteName: DEFAULT_SETTINGS.siteName,
            siteUrl: DEFAULT_SETTINGS.siteUrl,
            defaultLanguage: DEFAULT_SETTINGS.defaultLanguage,
            defaultCountry: DEFAULT_SETTINGS.defaultCountry,
            timezone: DEFAULT_SETTINGS.timezone,
            notificationEmail: DEFAULT_SETTINGS.notificationEmail,
          },
        });
      } catch (createError: any) {
        // Se falhar ao criar (tabela não existe), usar valores padrão
        console.warn('⚠️ Não foi possível criar Settings no banco. Usando valores padrão.', createError.message);
        settings = DEFAULT_SETTINGS;
      }
    }

    // Atualizar cache
    cachedSettings = settings;
    cacheTimestamp = now;

    return settings;
  } catch (error: any) {
    // Se qualquer erro ocorrer (tabela não existe, conexão, etc), usar valores padrão
    console.warn('⚠️ Erro ao buscar Settings do banco. Usando valores padrão.', error.message);
    
    // Retornar valores padrão sem cachear (para tentar novamente na próxima vez)
    return DEFAULT_SETTINGS;
  }
}

/**
 * Limpar cache (útil após atualizar settings)
 */
export function clearSettingsCache() {
  cachedSettings = null;
  cacheTimestamp = 0;
}

