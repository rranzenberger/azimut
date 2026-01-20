/**
 * 🕵️ LEAD INTELLIGENCE TYPES
 * 
 * Tipagem TypeScript para o campo leadIntelligence do modelo Lead
 */

export type LeadClassification = 
  | 'LEGIT'       // Cliente legítimo
  | 'SUSPECT'     // Suspeito, precisa atenção
  | 'SCAM'        // Golpista/scammer
  | 'COMPETITOR'  // Concorrente disfarçado
  | 'FISHING'     // Fishing de informações
  | 'TESTING'     // Testando o sistema
  | 'UNKNOWN';    // Ainda não classificado

export type LeadStatus = 
  | 'SEND'          // Enviar email personalizado
  | 'CAUTION'       // Enviar email genérico
  | 'MANUAL_REVIEW' // Revisão manual necessária
  | 'BLOCKED';      // Bloqueado, não enviar

export type IPType = 
  | 'residential' 
  | 'vpn' 
  | 'proxy' 
  | 'hosting' 
  | 'tor' 
  | 'unknown';

export type EmailType = 
  | 'corporate'   // Email corporativo
  | 'personal'    // Email pessoal (gmail, hotmail, etc)
  | 'disposable'  // Email descartável (temp-mail, etc)
  | 'role';       // Email genérico (info@, contato@, etc)

export interface RealData {
  realCity?: string;
  realCountry?: string;
  realIP: string;
  ipType: IPType;
  emailValid: boolean;
  emailType: EmailType;
  phoneValid?: boolean;
  phoneCountry?: string;
  addressValid?: boolean;
}

export interface EmailVerification {
  provider: 'Hunter.io' | 'ZeroBounce' | 'Other';
  result: 'deliverable' | 'undeliverable' | 'risky' | 'unknown';
  score: number; // 0-100
  disposable: boolean;
  free: boolean;
  role: boolean;
  verifiedAt: string; // ISO date
}

export interface IPVerification {
  provider: 'ipapi.co' | 'IPQualityScore' | 'Other';
  proxy: boolean;
  hosting: boolean;
  threatLevel: 'low' | 'medium' | 'high';
  abuseScore: number; // 0-100
  verifiedAt: string;
}

export interface PhoneVerification {
  provider: 'Twilio' | 'Numverify' | 'Other';
  valid: boolean;
  carrier?: string;
  type?: 'mobile' | 'landline' | 'voip';
  verifiedAt: string;
}

export interface BlacklistCheck {
  emailBlacklisted: boolean;
  ipBlacklisted: boolean;
  checkedAt: string;
  sources?: string[];
}

export interface Verifications {
  email?: EmailVerification;
  ip?: IPVerification;
  phone?: PhoneVerification;
  blacklist?: BlacklistCheck;
}

export interface BehaviorData {
  timeOnSite: number; // milliseconds
  pagesVisited: string[];
  formFillTime: number; // milliseconds
  copyPasteCount: number;
  mouseMovements: number;
  suspiciousActivity: boolean;
}

export interface LinkedInEnrichment {
  found: boolean;
  profileUrl?: string;
  headline?: string;
  company?: string;
  connections?: number;
  verified: boolean;
}

export interface CompanyEnrichment {
  name?: string;
  domain?: string;
  employees?: number;
  revenue?: string;
  founded?: number;
  verified: boolean;
}

export interface GoogleEnrichment {
  resultsCount: number;
  topResults?: string[];
  hasPresence: boolean;
}

export interface Enrichment {
  linkedin?: LinkedInEnrichment;
  company?: CompanyEnrichment;
  google?: GoogleEnrichment;
}

export interface MatchesData {
  cityMatch: boolean;
  phoneCountryMatch: boolean;
  emailDomainMatch: boolean;
  timezoneMatch: boolean;
}

export interface InvestigationEntry {
  timestamp: string;
  action: 'INITIAL_SCREENING' | 'ENRICHMENT' | 'MANUAL_REVIEW' | 'STATUS_CHANGE' | 'EMAIL_SENT';
  result: 'PASSED' | 'FAILED' | 'WARNING' | 'SUCCESS';
  details: string;
}

export interface Decision {
  classification: LeadClassification;
  action: LeadStatus;
  confidence: number; // 0-100
  decidedBy: 'n8n_workflow' | 'human' | 'ai_model';
  decidedAt: string;
  humanReviewed: boolean;
  reviewedBy?: string;
}

/**
 * ESTRUTURA COMPLETA DO CAMPO leadIntelligence
 */
export interface LeadIntelligence {
  // CLASSIFICAÇÃO FINAL
  classification: LeadClassification;
  riskScore: number; // 0-100
  qualityScore: number; // 0-100
  status: LeadStatus;
  
  // DADOS REAIS DESCOBERTOS
  realData: RealData;
  
  // VERIFICAÇÕES REALIZADAS
  verifications: Verifications;
  
  // COMPORTAMENTO NO SITE
  behavior: BehaviorData;
  
  // ENRIQUECIMENTO DE DADOS
  enrichment: Enrichment;
  
  // FLAGS E ALERTAS
  flags: string[]; // Ex: ["🟢 Email corporativo verificado", "🔴 IP via VPN"]
  alerts: string[]; // Ex: ["⚠️ Lead precisa revisão manual"]
  
  // CORRESPONDÊNCIAS
  matches: MatchesData;
  
  // HISTÓRICO DE INVESTIGAÇÃO
  investigationHistory: InvestigationEntry[];
  
  // DECISÃO E AÇÕES
  decision: Decision;
  
  // NOTAS INTERNAS (para humanos)
  internalNotes: string[];
}

/**
 * HELPER FUNCTIONS
 */

export function createEmptyLeadIntelligence(): LeadIntelligence {
  return {
    classification: 'UNKNOWN',
    riskScore: 50,
    qualityScore: 50,
    status: 'MANUAL_REVIEW',
    realData: {
      realIP: '',
      ipType: 'unknown',
      emailValid: false,
      emailType: 'personal'
    },
    verifications: {},
    behavior: {
      timeOnSite: 0,
      pagesVisited: [],
      formFillTime: 0,
      copyPasteCount: 0,
      mouseMovements: 0,
      suspiciousActivity: false
    },
    enrichment: {},
    flags: [],
    alerts: [],
    matches: {
      cityMatch: false,
      phoneCountryMatch: false,
      emailDomainMatch: false,
      timezoneMatch: false
    },
    investigationHistory: [],
    decision: {
      classification: 'UNKNOWN',
      action: 'MANUAL_REVIEW',
      confidence: 0,
      decidedBy: 'n8n_workflow',
      decidedAt: new Date().toISOString(),
      humanReviewed: false
    },
    internalNotes: []
  };
}

export function getLeadRiskLevel(riskScore: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (riskScore >= 80) return 'CRITICAL';
  if (riskScore >= 60) return 'HIGH';
  if (riskScore >= 40) return 'MEDIUM';
  return 'LOW';
}

export function getLeadQualityLevel(qualityScore: number): 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' {
  if (qualityScore >= 80) return 'EXCELLENT';
  if (qualityScore >= 60) return 'GOOD';
  if (qualityScore >= 40) return 'FAIR';
  return 'POOR';
}
