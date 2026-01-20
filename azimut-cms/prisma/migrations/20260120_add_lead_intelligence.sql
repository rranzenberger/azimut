-- ═══════════════════════════════════════════════════════════════
-- 🕵️ ADICIONAR CAMPO LEAD INTELLIGENCE NO BANCO
-- ═══════════════════════════════════════════════════════════════

-- 1. Adicionar coluna JSON para armazenar toda a inteligência do lead
ALTER TABLE "Lead" 
ADD COLUMN "leadIntelligence" JSONB DEFAULT '{}'::jsonb;

-- 2. Criar índice para consultas rápidas
CREATE INDEX "idx_lead_intelligence_classification" 
ON "Lead" USING GIN ((leadIntelligence -> 'classification'));

CREATE INDEX "idx_lead_intelligence_risk_score" 
ON "Lead" ((CAST(leadIntelligence->>'riskScore' AS INTEGER)));

-- 3. Adicionar comentário explicativo
COMMENT ON COLUMN "Lead"."leadIntelligence" IS 
'Armazena toda a investigação do lead: classificação, risco, verificações, dados enriquecidos, flags, histórico de investigação';

-- ═══════════════════════════════════════════════════════════════
-- 📋 ESTRUTURA DO CAMPO leadIntelligence
-- ═══════════════════════════════════════════════════════════════
-- {
--   // CLASSIFICAÇÃO FINAL
--   "classification": "LEGIT" | "SUSPECT" | "SCAM" | "COMPETITOR" | "FISHING" | "TESTING",
--   "riskScore": 0-100,
--   "qualityScore": 0-100,
--   "status": "SEND" | "CAUTION" | "MANUAL_REVIEW" | "BLOCKED",
--   
--   // DADOS REAIS DESCOBERTOS
--   "realData": {
--     "realCity": "São Paulo",
--     "realCountry": "Brazil",
--     "realIP": "177.34.123.45",
--     "ipType": "residential" | "vpn" | "proxy" | "hosting" | "tor",
--     "emailValid": true,
--     "emailType": "corporate" | "personal" | "disposable" | "role",
--     "phoneValid": true,
--     "phoneCountry": "BR",
--     "addressValid": false
--   },
--   
--   // VERIFICAÇÕES REALIZADAS
--   "verifications": {
--     "email": {
--       "provider": "Hunter.io",
--       "result": "deliverable",
--       "score": 95,
--       "disposable": false,
--       "free": false,
--       "role": false,
--       "verifiedAt": "2026-01-20T12:00:00Z"
--     },
--     "ip": {
--       "provider": "ipapi.co",
--       "proxy": false,
--       "hosting": false,
--       "threatLevel": "low",
--       "abuseScore": 0,
--       "verifiedAt": "2026-01-20T12:00:00Z"
--     },
--     "phone": {
--       "provider": "Twilio Lookup",
--       "valid": true,
--       "carrier": "Vivo",
--       "type": "mobile",
--       "verifiedAt": "2026-01-20T12:00:00Z"
--     },
--     "blacklist": {
--       "emailBlacklisted": false,
--       "ipBlacklisted": false,
--       "checkedAt": "2026-01-20T12:00:00Z"
--     }
--   },
--   
--   // COMPORTAMENTO NO SITE
--   "behavior": {
--     "timeOnSite": 300000,
--     "pagesVisited": ["/", "/work", "/contact"],
--     "formFillTime": 120000,
--     "copyPasteCount": 0,
--     "mouseMovements": 450,
--     "suspiciousActivity": false
--   },
--   
--   // ENRIQUECIMENTO DE DADOS
--   "enrichment": {
--     "linkedin": {
--       "found": true,
--       "profileUrl": "linkedin.com/in/maria-santos",
--       "headline": "Coordenadora de Projetos",
--       "company": "Museu do Amanhã",
--       "connections": 500,
--       "verified": true
--     },
--     "company": {
--       "name": "Museu do Amanhã",
--       "domain": "museudoamanha.org.br",
--       "employees": 120,
--       "revenue": "$5M-$10M",
--       "founded": 2015,
--       "verified": true
--     },
--     "google": {
--       "resultsCount": 15,
--       "topResults": ["Prêmio XYZ", "Projeto ABC"],
--       "hasPresence": true
--     }
--   },
--   
--   // FLAGS E ALERTAS
--   "flags": [
--     "🟢 Email corporativo verificado",
--     "🟢 LinkedIn com 500+ conexões",
--     "🟢 Empresa estabelecida (2015)"
--   ],
--   "alerts": [],
--   
--   // CORRESPONDÊNCIAS
--   "matches": {
--     "cityMatch": true,
--     "phoneCountryMatch": true,
--     "emailDomainMatch": true,
--     "timezoneMatch": true
--   },
--   
--   // HISTÓRICO DE INVESTIGAÇÃO
--   "investigationHistory": [
--     {
--       "timestamp": "2026-01-20T12:00:00Z",
--       "action": "INITIAL_SCREENING",
--       "result": "PASSED",
--       "details": "Todas as verificações iniciais passaram"
--     },
--     {
--       "timestamp": "2026-01-20T12:05:00Z",
--       "action": "ENRICHMENT",
--       "result": "SUCCESS",
--       "details": "Dados enriquecidos via LinkedIn e Clearbit"
--     }
--   ],
--   
--   // DECISÃO E AÇÕES
--   "decision": {
--     "classification": "LEGIT",
--     "action": "SEND_PERSONALIZED",
--     "confidence": 95,
--     "decidedBy": "n8n_workflow",
--     "decidedAt": "2026-01-20T12:05:00Z",
--     "humanReviewed": false
--   },
--   
--   // NOTAS INTERNAS (para humanos)
--   "internalNotes": [
--     "Cliente parece legítimo, empresa verificada",
--     "LinkedIn condiz com informações fornecidas"
--   ]
-- }

-- ═══════════════════════════════════════════════════════════════
-- 🔍 QUERIES ÚTEIS
-- ═══════════════════════════════════════════════════════════════

-- Buscar leads por classificação
-- SELECT * FROM "Lead" 
-- WHERE leadIntelligence->>'classification' = 'SCAM';

-- Buscar leads com alto risco
-- SELECT * FROM "Lead" 
-- WHERE CAST(leadIntelligence->>'riskScore' AS INTEGER) >= 80;

-- Buscar leads que precisam revisão manual
-- SELECT * FROM "Lead" 
-- WHERE leadIntelligence->>'status' = 'MANUAL_REVIEW';

-- Buscar leads com flags específicos
-- SELECT * FROM "Lead" 
-- WHERE leadIntelligence->'flags' @> '["🔴 Email descartável detectado"]';

-- Buscar leads de concorrentes
-- SELECT * FROM "Lead" 
-- WHERE leadIntelligence->>'classification' = 'COMPETITOR';
