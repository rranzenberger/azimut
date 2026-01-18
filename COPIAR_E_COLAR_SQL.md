# 📋 SQL COMPLETO - Copiar e Colar

## 🔗 Link do Neon:
**https://console.neon.tech**

---

## 📝 Script SQL (Copiar TUDO abaixo):

```sql
-- ============================================================
-- SCHEMA: Sistema de Enriquecimento de Leads
-- Azimut - Captação Inteligente com IA
-- Criado: 18/01/2026
-- ============================================================

-- Adicionar campos de enriquecimento na tabela de leads existente
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enriched_profile JSONB;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS conversation_context TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS recommended_approach TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enriched_at TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS decision_power VARCHAR(20);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS detected_city VARCHAR(100);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS detected_company VARCHAR(200);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(500);

-- Tabela de histórico de interações
CREATE TABLE IF NOT EXISTS lead_interactions (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL,
  direction VARCHAR(10) NOT NULL,
  subject VARCHAR(500),
  content TEXT,
  context JSONB,
  sentiment VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(100)
);

-- Tabela de fontes de enriquecimento
CREATE TABLE IF NOT EXISTS enrichment_sources (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  source_type VARCHAR(50) NOT NULL,
  source_url VARCHAR(1000),
  raw_data JSONB,
  processed_data JSONB,
  fetched_at TIMESTAMP DEFAULT NOW(),
  is_valid BOOLEAN DEFAULT true
);

-- Tabela de gatilhos de conversa
CREATE TABLE IF NOT EXISTS conversation_triggers (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  trigger_type VARCHAR(50) NOT NULL,
  trigger_text TEXT NOT NULL,
  source VARCHAR(100),
  priority INTEGER DEFAULT 5,
  used_at TIMESTAMP,
  was_effective BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de templates de email
CREATE TABLE IF NOT EXISTS email_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subject_template TEXT NOT NULL,
  body_template TEXT NOT NULL,
  tone VARCHAR(20) DEFAULT 'semiformal',
  use_case VARCHAR(50),
  lang VARCHAR(5) DEFAULT 'pt',
  is_active BOOLEAN DEFAULT true,
  success_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de emails enviados
CREATE TABLE IF NOT EXISTS sent_emails (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  template_id INTEGER REFERENCES email_templates(id),
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  personalization_data JSONB,
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  replied_at TIMESTAMP,
  bounced BOOLEAN DEFAULT false,
  resend_id VARCHAR(100),
  created_by VARCHAR(100)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_enrichment_status ON leads(enrichment_status);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score);
CREATE INDEX IF NOT EXISTS idx_lead_interactions_lead_id ON lead_interactions(lead_id);
CREATE INDEX IF NOT EXISTS idx_enrichment_sources_lead_id ON enrichment_sources(lead_id);
```

---

## ✅ Como Executar:

1. **Abrir:** https://console.neon.tech
2. **Clicar:** No seu projeto Azimut
3. **Clicar:** "SQL Editor" (menu lateral esquerdo)
4. **Colar** o script acima (TODO)
5. **Clicar:** Botão "Run" (ou F5)
6. **Aguardar:** Mensagem "Success"

✅ **Pronto!** Tabelas criadas.

---

## 🔗 Links das APIs:

### Proxycurl (LinkedIn)
**https://nubela.co/proxycurl**

### SerpAPI (Google Search)
**https://serpapi.com**

### Resend (Email)
**https://resend.com**

### Claude API
**https://console.anthropic.com**

---

**Próximo:** Depois de executar SQL e criar contas, seguir `EXECUTAR_AGORA.md` → Passo 3
