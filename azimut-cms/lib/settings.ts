/**
 * Helper para buscar configurações do Settings
 * Cacheia o resultado para evitar múltiplas queries
 */

import { prisma } from './prisma';

let cachedSettings: any = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function getSettings() {
  const now = Date.now();
  
  // Retornar cache se ainda válido
  if (cachedSettings && (now - cacheTimestamp) < CACHE_TTL) {
    return cachedSettings;
  }

  // Buscar do banco
  let settings = await prisma.settings.findUnique({
    where: { id: 'singleton' },
  });

  // Se não existir, criar com valores padrão
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: 'singleton',
        siteName: 'Azimut',
        siteUrl: 'https://azmt.com.br',
        defaultLanguage: 'pt',
        defaultCountry: 'BR',
        timezone: 'America/Sao_Paulo',
      },
    });
  }

  // Atualizar cache
  cachedSettings = settings;
  cacheTimestamp = now;

  return settings;
}

/**
 * Limpar cache (útil após atualizar settings)
 */
export function clearSettingsCache() {
  cachedSettings = null;
  cacheTimestamp = 0;
}

