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

  // MARTINICA - FRANCÊS (território francês)
  if (timezone.includes('America/Martinique')) {
    return { country: 'Martinique', countryCode: 'MQ', region: 'Martinique' };
  }

  // GUADALUPE - FRANCÊS (território francês)
  if (timezone.includes('America/Guadeloupe')) {
    return { country: 'Guadeloupe', countryCode: 'GP', region: 'Guadeloupe' };
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

  // EQUADOR - ESPANHOL
  if (timezone.includes('America/Guayaquil') || timezone.includes('Pacific/Galapagos')) {
    return { country: 'Ecuador', countryCode: 'EC' };
  }

  // BOLÍVIA - ESPANHOL
  if (timezone.includes('America/La_Paz')) {
    return { country: 'Bolivia', countryCode: 'BO' };
  }

  // PARAGUAI - ESPANHOL
  if (timezone.includes('America/Asuncion')) {
    return { country: 'Paraguay', countryCode: 'PY' };
  }

  // URUGUAI - ESPANHOL
  if (timezone.includes('America/Montevideo')) {
    return { country: 'Uruguay', countryCode: 'UY' };
  }

  // PORTO RICO - ESPANHOL (território dos EUA, mas hispano-falante)
  if (timezone.includes('America/Puerto_Rico')) {
    return { country: 'Puerto Rico', countryCode: 'PR' };
  }

  // OUTROS PAÍSES LATINO-AMERICANOS - ESPANHOL
  // América Central + Caribe hispano-falante
  if (timezone.includes('America/Guatemala') || timezone.includes('America/El_Salvador') ||
      timezone.includes('America/Managua') || timezone.includes('America/Costa_Rica') ||
      timezone.includes('America/Panama') || timezone.includes('America/Havana') ||
      timezone.includes('America/Tegucigalpa') || timezone.includes('America/Santo_Domingo')) {
    return { country: 'Latin America', countryCode: 'LATAM' };
  }

  // BELIZE - INGLÊS (América Central, mas NÃO hispano-falante)
  if (timezone.includes('America/Belize')) {
    return { country: 'Belize', countryCode: 'BZ' };
  }

  // HAITI - FRANCÊS/CRIOULO (Caribe, mas NÃO hispano-falante)
  if (timezone.includes('America/Port-au-Prince')) {
    return { country: 'Haiti', countryCode: 'HT' };
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
  if (timezone.includes('Europe/Lisbon') || timezone.includes('Atlantic/Azores') || timezone.includes('Atlantic/Madeira')) {
    return { country: 'Portugal', countryCode: 'PT' };
  }

  // CABO VERDE - PORTUGUÊS
  if (timezone.includes('Atlantic/Cape_Verde')) {
    return { country: 'Cape Verde', countryCode: 'CV' };
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
  if (timezone.includes('Africa/Johannesburg') || timezone.includes('Africa/Cape_Town')) {
    return { country: 'South Africa', countryCode: 'ZA' };
  }

  // MAGREBE (NORTE DA ÁFRICA) - FRANCÊS
  // Países árabes com forte presença do francês

  // TUNÍSIA - ÁRABE/FRANCÊS
  if (timezone.includes('Africa/Tunis')) {
    return { country: 'Tunisia', countryCode: 'TN' };
  }

  // ARGÉLIA - ÁRABE/FRANCÊS
  if (timezone.includes('Africa/Algiers')) {
    return { country: 'Algeria', countryCode: 'DZ' };
  }

  // MARROCOS - ÁRABE/FRANCÊS
  if (timezone.includes('Africa/Casablanca')) {
    return { country: 'Morocco', countryCode: 'MA' };
  }

  // ÁFRICA OCIDENTAL FRANCÓFONA

  // SENEGAL - FRANCÊS
  if (timezone.includes('Africa/Dakar')) {
    return { country: 'Senegal', countryCode: 'SN' };
  }

  // COSTA DO MARFIM - FRANCÊS
  if (timezone.includes('Africa/Abidjan')) {
    return { country: 'Ivory Coast', countryCode: 'CI' };
  }

  // MALI - FRANCÊS
  if (timezone.includes('Africa/Bamako')) {
    return { country: 'Mali', countryCode: 'ML' };
  }

  // BURKINA FASO - FRANCÊS
  if (timezone.includes('Africa/Ouagadougou')) {
    return { country: 'Burkina Faso', countryCode: 'BF' };
  }

  // NÍGER - FRANCÊS
  if (timezone.includes('Africa/Niamey')) {
    return { country: 'Niger', countryCode: 'NE' };
  }

  // BENIN - FRANCÊS
  if (timezone.includes('Africa/Porto-Novo')) {
    return { country: 'Benin', countryCode: 'BJ' };
  }

  // TOGO - FRANCÊS
  if (timezone.includes('Africa/Lome')) {
    return { country: 'Togo', countryCode: 'TG' };
  }

  // ÁFRICA CENTRAL FRANCÓFONA

  // CAMARÕES - FRANCÊS/INGLÊS
  if (timezone.includes('Africa/Douala')) {
    return { country: 'Cameroon', countryCode: 'CM' };
  }

  // GABÃO - FRANCÊS
  if (timezone.includes('Africa/Libreville')) {
    return { country: 'Gabon', countryCode: 'GA' };
  }

  // CONGO (Brazzaville) - FRANCÊS
  if (timezone.includes('Africa/Brazzaville')) {
    return { country: 'Congo', countryCode: 'CG' };
  }

  // R.D. CONGO (Kinshasa) - FRANCÊS
  if (timezone.includes('Africa/Kinshasa') || timezone.includes('Africa/Lubumbashi')) {
    return { country: 'DR Congo', countryCode: 'CD' };
  }

  // REPÚBLICA CENTRO-AFRICANA - FRANCÊS
  if (timezone.includes('Africa/Bangui')) {
    return { country: 'Central African Republic', countryCode: 'CF' };
  }

  // CHAD - FRANCÊS/ÁRABE
  if (timezone.includes('Africa/Ndjamena')) {
    return { country: 'Chad', countryCode: 'TD' };
  }

  // ÁFRICA ORIENTAL FRANCÓFONA

  // RUANDA - FRANCÊS/INGLÊS/KINYARWANDA
  if (timezone.includes('Africa/Kigali')) {
    return { country: 'Rwanda', countryCode: 'RW' };
  }

  // BURUNDI - FRANCÊS
  if (timezone.includes('Africa/Bujumbura')) {
    return { country: 'Burundi', countryCode: 'BI' };
  }

  // DJIBOUTI - FRANCÊS/ÁRABE
  if (timezone.includes('Africa/Djibouti')) {
    return { country: 'Djibouti', countryCode: 'DJ' };
  }

  // MADAGÁSCAR - FRANCÊS/MALGAXE
  if (timezone.includes('Indian/Antananarivo')) {
    return { country: 'Madagascar', countryCode: 'MG' };
  }

  // COMORES - FRANCÊS/ÁRABE
  if (timezone.includes('Indian/Comoro')) {
    return { country: 'Comoros', countryCode: 'KM' };
  }

  // SEYCHELLES - FRANCÊS/INGLÊS/CRIOULO
  if (timezone.includes('Indian/Mahe')) {
    return { country: 'Seychelles', countryCode: 'SC' };
  }

  // MAURÍCIO - FRANCÊS/INGLÊS
  if (timezone.includes('Indian/Mauritius')) {
    return { country: 'Mauritius', countryCode: 'MU' };
  }

  // MOÇAMBIQUE - PORTUGUÊS
  if (timezone.includes('Africa/Maputo')) {
    return { country: 'Mozambique', countryCode: 'MZ' };
  }

  // ANGOLA - PORTUGUÊS
  if (timezone.includes('Africa/Luanda')) {
    return { country: 'Angola', countryCode: 'AO' };
  }

  // GUINÉ-BISSAU - PORTUGUÊS
  if (timezone.includes('Africa/Bissau')) {
    return { country: 'Guinea-Bissau', countryCode: 'GW' };
  }

  // SÃO TOMÉ E PRÍNCIPE - PORTUGUÊS
  if (timezone.includes('Africa/Sao_Tome')) {
    return { country: 'Sao Tome and Principe', countryCode: 'ST' };
  }

  // GUINÉ EQUATORIAL - ESPANHOL (maioria) / FRANCÊS / PORTUGUÊS
  if (timezone.includes('Africa/Malabo')) {
    return { country: 'Equatorial Guinea', countryCode: 'GQ' };
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

  // POLINÉSIA FRANCESA - FRANCÊS (território francês)
  if (timezone.includes('Pacific/Tahiti') || timezone.includes('Pacific/Marquesas') || timezone.includes('Pacific/Gambier')) {
    return { country: 'French Polynesia', countryCode: 'PF', region: 'French Polynesia' };
  }

  // NOVA CALEDÔNIA - FRANCÊS (território francês)
  if (timezone.includes('Pacific/Noumea')) {
    return { country: 'New Caledonia', countryCode: 'NC', region: 'New Caledonia' };
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

  // TIMOR-LESTE - PORTUGUÊS
  if (timezone.includes('Asia/Dili')) {
    return { country: 'East Timor', countryCode: 'TL' };
  }

  // ILHA REUNIÃO - FRANCÊS (território francês no Índico)
  if (timezone.includes('Indian/Reunion')) {
    return { country: 'Reunion', countryCode: 'RE', region: 'Reunion' };
  }

  // MAIOTE - FRANCÊS (território francês no Índico)
  if (timezone.includes('Indian/Mayotte')) {
    return { country: 'Mayotte', countryCode: 'YT', region: 'Mayotte' };
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
  // PORTUGUÊS (Brasil + Portugal + Países Lusófonos Africanos + Timor-Leste)
  if (countryCode === 'BR' || countryCode === 'PT' || 
      countryCode === 'MZ' || countryCode === 'AO' || countryCode === 'CV' ||
      countryCode === 'GW' || countryCode === 'ST' || countryCode === 'TL') {
    return 'pt';
  }

  // FRANCÊS (França + Canadá-Quebec + Territórios Franceses + África Francófona + Haiti)
  if (countryCode === 'FR' || countryCode === 'GF' || 
      countryCode === 'MQ' || countryCode === 'GP' || 
      countryCode === 'PF' || countryCode === 'NC' || 
      countryCode === 'RE' || countryCode === 'YT' || countryCode === 'HT' ||
      (countryCode === 'CA' && region === 'Quebec') ||
      countryCode === 'BE' || countryCode === 'CH' ||
      // Magrebe (Norte da África)
      countryCode === 'TN' || countryCode === 'DZ' || countryCode === 'MA' ||
      // África Ocidental Francófona
      countryCode === 'SN' || countryCode === 'CI' || countryCode === 'ML' ||
      countryCode === 'BF' || countryCode === 'NE' || countryCode === 'BJ' || countryCode === 'TG' ||
      // África Central Francófona
      countryCode === 'CM' || countryCode === 'GA' || countryCode === 'CG' ||
      countryCode === 'CD' || countryCode === 'CF' || countryCode === 'TD' ||
      // África Oriental Francófona + Ilhas do Índico
      countryCode === 'RW' || countryCode === 'BI' || countryCode === 'DJ' ||
      countryCode === 'MG' || countryCode === 'KM' || countryCode === 'SC' || countryCode === 'MU') {
    return 'fr';
  }

  // ESPANHOL (Espanha + América Latina + Porto Rico + Guiné Equatorial)
  if (countryCode === 'MX' || countryCode === 'AR' || countryCode === 'CO' ||
      countryCode === 'CL' || countryCode === 'PE' || countryCode === 'VE' ||
      countryCode === 'EC' || countryCode === 'BO' || countryCode === 'PY' || countryCode === 'UY' ||
      countryCode === 'PR' || countryCode === 'ES' || countryCode === 'GQ' || countryCode === 'LATAM') {
    return 'es';
  }

  // INGLÊS (EUA + Reino Unido + Canadá + Austrália + África do Sul + Belize + outros)
  if (countryCode === 'US' || countryCode === 'CA' || countryCode === 'GB' ||
      countryCode === 'IE' || countryCode === 'AU' || countryCode === 'NZ' ||
      countryCode === 'ZA' || countryCode === 'BZ') {
    return 'en';
  }

  // FALLBACK: INGLÊS (língua internacional)
  // Para países como Alemanha, China, Japão, Índia, etc.
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

/**
 * Detecta país via IP usando API externa (funciona com VPN)
 * Não depende do backoffice
 * ⚠️ NÃO BLOQUEIA: Timeout de 5s, fallback silencioso
 */
export async function detectCountryFromIP(): Promise<{ country: string; countryCode: string } | null> {
  try {
    // Usar ipapi.co (gratuito até 30k req/mês, sem CORS issues)
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000), // ✅ 5 segundos (não 3)
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.country_code) {
        console.log(`🌍 País detectado via IP: ${data.country_name} (${data.country_code})`);
        return {
          country: data.country_name || 'Unknown',
          countryCode: data.country_code,
        };
      }
    }
  } catch (error) {
    console.warn('⚠️ IP detection failed (normal se VPN/firewall):', error);
  }
  
  return null;
}

