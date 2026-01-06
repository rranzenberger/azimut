/**
 * 🏛️ DETECÇÃO DE CLIENTES INSTITUCIONAIS
 * 
 * Sistema que identifica automaticamente clientes premium
 * baseado no domínio do email (@sescsp.org.br, @petrobras.com.br, etc.)
 */

export interface InstitutionalProfile {
  name: string
  type: InstitutionalType
  tier: 1 | 2 | 3 | 4 | 5
  budgetRange: string
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'
  country: 'BR' | 'CA' | 'US' | 'OTHER'
  segment: string
  autoAlert: boolean  // Enviar alerta automático?
}

export type InstitutionalType =
  | 'SISTEMA_S'           // SESC, SENAC, SENAI
  | 'BANCO_CULTURAL'      // Itaú Cultural, CCBB, etc.
  | 'ENERGIA'             // Petrobras, Vale
  | 'TELECOM_CULTURAL'    // Oi Futuro, Vivo
  | 'MUSEU'               // Museus independentes
  | 'GOVERNO'             // Prefeituras, secretarias
  | 'NFB_ONF'             // National Film Board
  | 'CREATIVE_AGENCY_CA'  // Creative BC, Ontario Creates
  | 'SEBRAE'              // SEBRAE
  | 'CORPORATIVO'         // Outros grandes corporativos
  | 'UNIVERSIDADE'        // Universidades
  | 'FESTIVAL'            // Festivais culturais
  | 'ASSOCIACAO'          // Associações, federações

/**
 * 🎯 MAPA DE DOMÍNIOS INSTITUCIONAIS
 * 
 * Chave: Domínio do email (sem @)
 * Valor: Perfil institucional
 */
export const INSTITUTIONAL_DOMAINS: Record<string, InstitutionalProfile> = {
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - SISTEMA S (TIER 1)
  // ═══════════════════════════════════════════════════════════
  
  'sescsp.org.br': {
    name: 'SESC São Paulo',
    type: 'SISTEMA_S',
    tier: 1,
    budgetRange: 'R$ 500k - R$ 3M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Cultura e Educação',
    autoAlert: true
  },
  
  'sesc.com.br': {
    name: 'SESC Nacional',
    type: 'SISTEMA_S',
    tier: 1,
    budgetRange: 'R$ 500k - R$ 3M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Cultura e Educação',
    autoAlert: true
  },
  
  'sp.senac.br': {
    name: 'SENAC São Paulo',
    type: 'SISTEMA_S',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 2M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Educação e Tecnologia',
    autoAlert: true
  },
  
  'senac.br': {
    name: 'SENAC Nacional',
    type: 'SISTEMA_S',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 2M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Educação e Tecnologia',
    autoAlert: true
  },
  
  'senai.br': {
    name: 'SENAI',
    type: 'SISTEMA_S',
    tier: 1,
    budgetRange: 'R$ 200k - R$ 1.5M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Educação Industrial',
    autoAlert: true
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - BANCOS E INSTITUTOS CULTURAIS (TIER 1)
  // ═══════════════════════════════════════════════════════════
  
  'itaucultural.org.br': {
    name: 'Itaú Cultural',
    type: 'BANCO_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 500k - R$ 5M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Arte e Tecnologia',
    autoAlert: true
  },
  
  'itau.com.br': {
    name: 'Itaú Unibanco',
    type: 'BANCO_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 2M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Marketing Corporativo',
    autoAlert: true
  },
  
  'bb.com.br': {
    name: 'Banco do Brasil / CCBB',
    type: 'BANCO_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 500k - R$ 3M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Cultura',
    autoAlert: true
  },
  
  'bradesco.com.br': {
    name: 'Bradesco',
    type: 'BANCO_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 200k - R$ 1M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Marketing e Cultura',
    autoAlert: false
  },
  
  'santander.com.br': {
    name: 'Santander Brasil',
    type: 'BANCO_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 200k - R$ 1M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Santander Cultural',
    autoAlert: false
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - ENERGIA E MINERAÇÃO (TIER 1)
  // ═══════════════════════════════════════════════════════════
  
  'petrobras.com.br': {
    name: 'Petrobras',
    type: 'ENERGIA',
    tier: 1,
    budgetRange: 'R$ 500k - R$ 5M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Cultura e Treinamento',
    autoAlert: true
  },
  
  'vale.com': {
    name: 'Vale',
    type: 'ENERGIA',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 2M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Memorial e Treinamento VR',
    autoAlert: true
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - TELECOM E INSTITUTOS (TIER 1)
  // ═══════════════════════════════════════════════════════════
  
  'oifuturo.org.br': {
    name: 'Oi Futuro',
    type: 'TELECOM_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 1.5M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Arte Digital e Inovação',
    autoAlert: true
  },
  
  'oi.com.br': {
    name: 'Oi',
    type: 'TELECOM_CULTURAL',
    tier: 2,
    budgetRange: 'R$ 100k - R$ 500k',
    priority: 'MEDIUM',
    country: 'BR',
    segment: 'Marketing',
    autoAlert: false
  },
  
  'telefonica.com': {
    name: 'Fundação Telefônica Vivo',
    type: 'TELECOM_CULTURAL',
    tier: 1,
    budgetRange: 'R$ 200k - R$ 1M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Educação e Cultura',
    autoAlert: false
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - MUSEUS (TIER 1-2)
  // ═══════════════════════════════════════════════════════════
  
  'museudoamanha.org.br': {
    name: 'Museu do Amanhã',
    type: 'MUSEU',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 1.5M',
    priority: 'URGENT',
    country: 'BR',
    segment: 'Ciência e Tecnologia',
    autoAlert: true
  },
  
  'mis-sp.org.br': {
    name: 'MIS - Museu da Imagem e do Som SP',
    type: 'MUSEU',
    tier: 2,
    budgetRange: 'R$ 200k - R$ 800k',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Cinema e Tecnologia',
    autoAlert: false
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - FEDERAÇÕES E SEBRAE (TIER 1-2)
  // ═══════════════════════════════════════════════════════════
  
  'fiesp.org.br': {
    name: 'FIESP',
    type: 'ASSOCIACAO',
    tier: 1,
    budgetRange: 'R$ 300k - R$ 2M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Inovação Industrial',
    autoAlert: true
  },
  
  'firjan.com.br': {
    name: 'FIRJAN',
    type: 'ASSOCIACAO',
    tier: 1,
    budgetRange: 'R$ 200k - R$ 1M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Inovação e Educação',
    autoAlert: false
  },
  
  'sebrae.com.br': {
    name: 'SEBRAE',
    type: 'SEBRAE',
    tier: 2,
    budgetRange: 'R$ 100k - R$ 500k',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Empreendedorismo e Inovação',
    autoAlert: true
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇧🇷 BRASIL - GOVERNO (TIER 2-3)
  // ═══════════════════════════════════════════════════════════
  
  'prefeitura.sp.gov.br': {
    name: 'Prefeitura de São Paulo',
    type: 'GOVERNO',
    tier: 2,
    budgetRange: 'R$ 200k - R$ 1M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Cultura e Turismo',
    autoAlert: false
  },
  
  'rio.rj.gov.br': {
    name: 'Prefeitura do Rio de Janeiro',
    type: 'GOVERNO',
    tier: 2,
    budgetRange: 'R$ 200k - R$ 1M',
    priority: 'HIGH',
    country: 'BR',
    segment: 'Cultura e Turismo',
    autoAlert: false
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🇨🇦 CANADÁ - NFB/ONF E AGÊNCIAS (TIER 1)
  // ═══════════════════════════════════════════════════════════
  
  'nfb.ca': {
    name: 'NFB - National Film Board',
    type: 'NFB_ONF',
    tier: 1,
    budgetRange: 'CAD $100k - $500k',
    priority: 'URGENT',
    country: 'CA',
    segment: 'Interactive & VR',
    autoAlert: true
  },
  
  'onf.ca': {
    name: 'ONF - Office National du Film',
    type: 'NFB_ONF',
    tier: 1,
    budgetRange: 'CAD $100k - $500k',
    priority: 'URGENT',
    country: 'CA',
    segment: 'Interactif et RV',
    autoAlert: true
  },
  
  'creativebc.com': {
    name: 'Creative BC',
    type: 'CREATIVE_AGENCY_CA',
    tier: 2,
    budgetRange: 'CAD $50k - $200k',
    priority: 'HIGH',
    country: 'CA',
    segment: 'VR/AR/XR Funding',
    autoAlert: true
  },
  
  'ontariocreates.ca': {
    name: 'Ontario Creates',
    type: 'CREATIVE_AGENCY_CA',
    tier: 2,
    budgetRange: 'CAD $50k - $200k',
    priority: 'HIGH',
    country: 'CA',
    segment: 'Interactive Digital Media',
    autoAlert: false
  },
  
  'sodec.gouv.qc.ca': {
    name: 'SODEC - Québec',
    type: 'CREATIVE_AGENCY_CA',
    tier: 2,
    budgetRange: 'CAD $50k - $300k',
    priority: 'HIGH',
    country: 'CA',
    segment: 'Cinéma et Jeux Vidéo',
    autoAlert: false
  },
  
  'canadacouncil.ca': {
    name: 'Canada Council for the Arts',
    type: 'GOVERNMENT_CA',
    tier: 1,
    budgetRange: 'CAD $100k - $500k',
    priority: 'HIGH',
    country: 'CA',
    segment: 'Arts et Culture',
    autoAlert: false
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🌍 UNIVERSIDADES (TIER 3)
  // ═══════════════════════════════════════════════════════════
  
  'usp.br': {
    name: 'USP',
    type: 'UNIVERSIDADE',
    tier: 3,
    budgetRange: 'R$ 50k - R$ 200k',
    priority: 'MEDIUM',
    country: 'BR',
    segment: 'Pesquisa',
    autoAlert: false
  },
  
  'ufrj.br': {
    name: 'UFRJ',
    type: 'UNIVERSIDADE',
    tier: 3,
    budgetRange: 'R$ 50k - R$ 200k',
    priority: 'MEDIUM',
    country: 'BR',
    segment: 'Pesquisa',
    autoAlert: false
  },
  
  'concordia.ca': {
    name: 'Concordia University',
    type: 'UNIVERSIDADE',
    tier: 3,
    budgetRange: 'CAD $30k - $100k',
    priority: 'MEDIUM',
    country: 'CA',
    segment: 'Media Arts',
    autoAlert: false
  }
}

/**
 * 🔍 DETECTAR INSTITUIÇÃO PELO EMAIL
 */
export function detectInstitution(email: string): InstitutionalProfile | null {
  if (!email || !email.includes('@')) return null
  
  const domain = email.split('@')[1].toLowerCase()
  
  return INSTITUTIONAL_DOMAINS[domain] || null
}

/**
 * 🎯 VERIFICAR SE É CLIENTE PREMIUM (Tier 1-2)
 */
export function isPremiumClient(email: string): boolean {
  const institution = detectInstitution(email)
  return institution ? (institution.tier === 1 || institution.tier === 2) : false
}

/**
 * 📧 VERIFICAR SE DEVE ENVIAR ALERTA AUTOMÁTICO
 */
export function shouldSendAlert(email: string): boolean {
  const institution = detectInstitution(email)
  return institution ? institution.autoAlert : false
}

/**
 * 📊 OBTER ESTATÍSTICAS DAS INSTITUIÇÕES MAPEADAS
 */
export function getInstitutionalStats() {
  const total = Object.keys(INSTITUTIONAL_DOMAINS).length
  const byTier = {
    tier1: 0,
    tier2: 0,
    tier3: 0,
    tier4: 0,
    tier5: 0
  }
  const byCountry = {
    BR: 0,
    CA: 0,
    US: 0,
    OTHER: 0
  }
  
  Object.values(INSTITUTIONAL_DOMAINS).forEach(inst => {
    byTier[`tier${inst.tier}`]++
    byCountry[inst.country]++
  })
  
  return {
    total,
    byTier,
    byCountry,
    autoAlertEnabled: Object.values(INSTITUTIONAL_DOMAINS).filter(i => i.autoAlert).length
  }
}

