/**
 * Detecção de Geolocalização e Idioma
 * Mapeia timezones para países e países para idiomas
 * Fallback: Inglês (língua internacional)
 */

export interface GeoDetectionResult {
  country: string;
  countryCode: string;
  language: 'pt' | 'en' | 'fr' | 'es';
  region?: string;
}

/**
 * Mapeia timezone para país
 */
export function detectCountryFromTimezone(timezone: string): { country: string; countryCode: string; region?: string } {
  // AMÉRICA DO NORTE - INGLÊS
  if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || 
      timezone.includes('America/Denver') || timezone.includes('America/Los_Angeles') ||
      timezone.includes('America/Detroit') || timezone.includes('America/Indianapolis') ||
      timezone.includes('America/Phoenix') || timezone.includes('America/Seattle') ||
      timezone.includes('America/Anchorage') || timezone.includes('America/Honolulu')) {
    return { country: 'United States', countryCode: 'US' };
  }

  // CANADÁ - INGLÊS (exceto Quebec)
  if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver') ||
      timezone.includes('America/Winnipeg') || timezone.includes('America/Edmonton') ||
      timezone.includes('America/Calgary') || timezone.includes('America/Halifax')) {
    return { country: 'Canada', countryCode: 'CA' };
  }

  // QUEBEC/MONTREAL - FRANCÊS
  if (timezone.includes('America/Montreal')) {
    return { country: 'Canada', countryCode: 'CA', region: 'Quebec' };
  }

  // BRASIL - PORTUGUÊS
  if (timezone.includes('America/Sao_Paulo') || timezone.includes('America/Rio') ||
      timezone.includes('America/Fortaleza') || timezone.includes('America/Recife') ||
      timezone.includes('America/Manaus') || timezone.includes('America/Belem') ||
      timezone.includes('America/Cuiaba') || timezone.includes('America/Campo_Grande') ||
      timezone.includes('America/Araguaina') || timezone.includes('America/Maceio') ||
      timezone.includes('America/Bahia') || timezone.includes('America/Noronha')) {
    return { country: 'Brazil', countryCode: 'BR' };
  }

  // GUIANA FRANCESA - FRANCÊS
  if (timezone.includes('America/Cayenne')) {
    return { country: 'French Guiana', countryCode: 'GF', region: 'French Guiana' };
  }

  // MÉXICO - ESPANHOL
  if (timezone.includes('America/Mexico_City') || timezone.includes('America/Cancun') ||
      timezone.includes('America/Merida') || timezone.includes('America/Monterrey') ||
      timezone.includes('America/Mazatlan') || timezone.includes('America/Chihuahua') ||
      timezone.includes('America/Tijuana') || timezone.includes('America/Hermosillo')) {
    return { country: 'Mexico', countryCode: 'MX' };
  }

  // ARGENTINA - ESPANHOL
  if (timezone.includes('America/Argentina') || timezone.includes('America/Buenos_Aires') ||
      timezone.includes('America/Cordoba') || timezone.includes('America/Mendoza')) {
    return { country: 'Argentina', countryCode: 'AR' };
  }

  // COLÔMBIA - ESPANHOL
  if (timezone.includes('America/Bogota')) {
    return { country: 'Colombia', countryCode: 'CO' };
  }

  // CHILE - ESPANHOL
  if (timezone.includes('America/Santiago')) {
    return { country: 'Chile', countryCode: 'CL' };
  }

  // PERU - ESPANHOL
  if (timezone.includes('America/Lima')) {
    return { country: 'Peru', countryCode: 'PE' };
  }

  // VENEZUELA - ESPANHOL
  if (timezone.includes('America/Caracas')) {
    return { country: 'Venezuela', countryCode: 'VE' };
  }

  // OUTROS PAÍSES LATINO-AMERICANOS - ESPANHOL
  if (timezone.includes('America/Guatemala') || timezone.includes('America/El_Salvador') ||
      timezone.includes('America/Managua') || timezone.includes('America/Costa_Rica') ||
      timezone.includes('America/Panama') || timezone.includes('America/Havana') ||
      timezone.includes('America/La_Paz') || timezone.includes('America/Asuncion') ||
      timezone.includes('America/Montevideo') || timezone.includes('America/Guayaquil')) {
    return { country: 'Latin America', countryCode: 'LATAM' };
  }

  // FRANÇA - FRANCÊS
  if (timezone.includes('Europe/Paris')) {
    return { country: 'France', countryCode: 'FR' };
  }

  // BÉLGICA - FRANCÊS/HOLANDÊS (prioriza francês)
  if (timezone.includes('Europe/Brussels')) {
    return { country: 'Belgium', countryCode: 'BE' };
  }

  // SUÍÇA - FRANCÊS/ALEMÃO/ITALIANO (prioriza francês)
  if (timezone.includes('Europe/Zurich')) {
    return { country: 'Switzerland', countryCode: 'CH' };
  }

  // PORTUGAL - PORTUGUÊS
  if (timezone.includes('Europe/Lisbon')) {
    return { country: 'Portugal', countryCode: 'PT' };
  }

  // ESPANHA - ESPANHOL
  if (timezone.includes('Europe/Madrid') || timezone.includes('Europe/Barcelona')) {
    return { country: 'Spain', countryCode: 'ES' };
  }

  // ITÁLIA - ITALIANO (fallback: inglês)
  if (timezone.includes('Europe/Rome')) {
    return { country: 'Italy', countryCode: 'IT' };
  }

  // ALEMANHA - ALEMÃO (fallback: inglês)
  if (timezone.includes('Europe/Berlin')) {
    return { country: 'Germany', countryCode: 'DE' };
  }

  // REINO UNIDO - INGLÊS
  if (timezone.includes('Europe/London')) {
    return { country: 'United Kingdom', countryCode: 'GB' };
  }

  // IRLANDA - INGLÊS
  if (timezone.includes('Europe/Dublin')) {
    return { country: 'Ireland', countryCode: 'IE' };
  }

  // ÁFRICA DO SUL - INGLÊS
  if (timezone.includes('Africa/Johannesburg')) {
    return { country: 'South Africa', countryCode: 'ZA' };
  }

  // AUSTRÁLIA - INGLÊS
  if (timezone.includes('Australia/Sydney') || timezone.includes('Australia/Melbourne') ||
      timezone.includes('Australia/Brisbane') || timezone.includes('Australia/Perth') ||
      timezone.includes('Australia/Adelaide') || timezone.includes('Australia/Darwin')) {
    return { country: 'Australia', countryCode: 'AU' };
  }

  // NOVA ZELÂNDIA - INGLÊS
  if (timezone.includes('Pacific/Auckland')) {
    return { country: 'New Zealand', countryCode: 'NZ' };
  }

  // CHINA - CHINÊS (fallback: inglês)
  if (timezone.includes('Asia/Shanghai') || timezone.includes('Asia/Beijing') ||
      timezone.includes('Asia/Chongqing') || timezone.includes('Asia/Hong_Kong')) {
    return { country: 'China', countryCode: 'CN' };
  }

  // JAPÃO - JAPONÊS (fallback: inglês)
  if (timezone.includes('Asia/Tokyo')) {
    return { country: 'Japan', countryCode: 'JP' };
  }

  // OUTROS PAÍSES EUROPEUS - FALLBACK: INGLÊS
  if (timezone.includes('Europe/')) {
    return { country: 'Europe', countryCode: 'EU' };
  }

  // OUTROS PAÍSES ASIÁTICOS - FALLBACK: INGLÊS
  if (timezone.includes('Asia/')) {
    return { country: 'Asia', countryCode: 'ASIA' };
  }

  // OUTROS PAÍSES AFRICANOS - FALLBACK: INGLÊS
  if (timezone.includes('Africa/')) {
    return { country: 'Africa', countryCode: 'AFRICA' };
  }

  // PADRÃO: Não detectado
  return { country: 'Unknown', countryCode: 'DEFAULT' };
}

/**
 * Mapeia país para idioma
 * Fallback: Inglês (língua internacional)
 */
export function getLanguageFromCountry(countryCode: string, region?: string): 'pt' | 'en' | 'fr' | 'es' {
  // PORTUGUÊS
  if (countryCode === 'BR' || countryCode === 'PT') {
    return 'pt';
  }

  // FRANCÊS
  if (countryCode === 'FR' || countryCode === 'GF' || 
      (countryCode === 'CA' && region === 'Quebec') ||
      countryCode === 'BE' || countryCode === 'CH') {
    return 'fr';
  }

  // ESPANHOL
  if (countryCode === 'MX' || countryCode === 'AR' || countryCode === 'CO' ||
      countryCode === 'CL' || countryCode === 'PE' || countryCode === 'VE' ||
      countryCode === 'ES' || countryCode === 'LATAM') {
    return 'es';
  }

  // INGLÊS (padrão internacional)
  if (countryCode === 'US' || countryCode === 'CA' || countryCode === 'GB' ||
      countryCode === 'IE' || countryCode === 'AU' || countryCode === 'NZ' ||
      countryCode === 'ZA') {
    return 'en';
  }

  // FALLBACK: INGLÊS (língua internacional)
  // Para países como Alemanha, China, Japão, etc.
  return 'en';
}

/**
 * Detecta país e idioma via timezone
 */
export function detectGeoFromTimezone(): GeoDetectionResult {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const geo = detectCountryFromTimezone(timezone);
    const language = getLanguageFromCountry(geo.countryCode, geo.region);

    return {
      country: geo.country,
      countryCode: geo.countryCode,
      language,
      region: geo.region,
    };
  } catch (error) {
    // Fallback: Inglês
    return {
      country: 'Unknown',
      countryCode: 'DEFAULT',
      language: 'en',
    };
  }
}

/**
 * Detecta idioma via navegador (fallback)
 */
export function detectLanguageFromBrowser(): 'pt' | 'en' | 'fr' | 'es' {
  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  
  // Fallback: Inglês
  return 'en';
}

