# 🎯 WORKFLOW CAPTAÇÃO PASSIVA - COMPLETO

## **📋 O QUE É:**

Sistema automatizado que investiga **TODOS os leads** que preenchem formulários no site, fazendo análise completa antes de enviar email/WhatsApp.

---

## **🔧 RECURSOS DO N8N DISPONÍVEIS:**

### **Nós Essenciais:**

1. **Webhook** - Recebe dados do backoffice
2. **HTTP Request** - Chamar APIs externas
3. **Code (JavaScript)** - Lógica customizada
4. **IF** - Decisões condicionais
5. **Switch** - Múltiplas rotas
6. **Set** - Modificar dados
7. **PostgreSQL** - Salvar no banco
8. **Function** - Transformações de dados
9. **Merge** - Combinar dados de múltiplos nós
10. **Wait** - Aguardar tempo
11. **Schedule** - Agendar tarefas

### **APIs que podemos usar:**

- **ipapi.co** - Geolocalização IP (grátis, 1k/dia)
- **Hunter.io** - Validar/encontrar emails ($49/mês)
- **Proxycurl** - Dados LinkedIn ($29/mês)
- **SerpAPI** - Google Search ($50/mês)
- **AbuseIPDB** - Blacklist IP (grátis, 1k/dia)
- **StopForumSpam** - Blacklist email (grátis)
- **DeepSeek API** - Análise IA (grátis)
- **Claude API** - Gerar emails (pago)
- **Resend API** - Enviar emails (grátis até 3k)
- **WhatsApp Business API** - Enviar mensagens (pago)

---

## **📊 ESTRUTURA COMPLETA DO WORKFLOW:**

```
┌─────────────────────────────────────────┐
│ 1. Webhook (Recebe Lead)                │
│    URL: /webhook/lead-intelligence      │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 2. Identificar Formulário               │
│    Switch: contact_form / vancouver     │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 3. Verificar Lead Anterior              │
│    PostgreSQL: Buscar por email/phone   │
└──────┬──────────────────────────────────┘
       │
       ├─── SIM (já existe) ──────────────┐
       │                                   │
       ▼                                   ▼
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│ 4A. Lead Existente               │  │ 4B. Lead Novo                   │
│    Atualizar dados               │  │    Continuar investigação      │
└──────┬───────────────────────────┘  └──────┬──────────────────────────┘
       │                                     │
       └──────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────┐
│ 5. Validar IP (ipapi.co)                 │
│    Geolocalização, VPN, Proxy            │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 6. Verificar Blacklist (AbuseIPDB)      │
│    IP malicioso?                         │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 7. Validar Email (Hunter.io)             │
│    Email válido? Descartável?            │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 8. Buscar LinkedIn (Proxycurl)          │
│    Se tiver nome + empresa              │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 9. Google Search (SerpAPI)              │
│    Buscar: nome + empresa + email       │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 10. Buscar Redes Sociais                 │
│     Instagram, Twitter, Facebook (SerpAPI) │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 11. Detectar Idioma                      │
│     Analisar texto do formulário        │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 12. Analisar com DeepSeek                │
│     Classificar: LEGITIMATE/SCAM/etc    │
│     Tipo: aluno/empresa/governo/etc     │
│     Interesse: curso/vinheta/etc        │
│     Quente/Frio                          │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 13. IF (Decision)                        │
│     LEGITIMATE → Continuar              │
│     SCAM → Rejeitar                     │
└──────┬──────────────────────────────────┘
       │
       ▼ (se LEGITIMATE)
┌─────────────────────────────────────────┐
│ 14. Gerar Small Talk (Claude)           │
│     Baseado em: local, empresa, posts   │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 15. Gerar Email (Claude)                 │
│     Personalizado + Small Talk           │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 16. Enviar Email (Resend)                │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 17. IF (Tem WhatsApp?)                   │
│     SIM → Enviar WhatsApp                │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 18. Salvar Tudo (PostgreSQL)            │
│     Campo: leadIntelligence (JSON)      │
└─────────────────────────────────────────┘
```

---

## **📝 DETALHAMENTO DE CADA NÓ:**

### **NÓ 1: Webhook (Trigger)**

**Tipo:** Webhook  
**Método:** POST  
**Path:** `lead-intelligence`  
**Autenticação:** Nenhuma (ou API Key se quiser)

**Dados recebidos:**
```json
{
  "leadId": "abc123",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+5511999999999",
  "company": "Museu Nacional",
  "position": "Diretor",
  "formType": "contact_form" | "vancouver",
  "projectType": "museu",
  "budget": "1m-3m",
  "description": "Queremos criar uma exposição imersiva...",
  "ip": "177.34.123.45",
  "userAgent": "Mozilla/5.0...",
  "sourceUrl": "https://azmt.com.br/pt/contato",
  "lang": "pt"
}
```

---

### **NÓ 2: Identificar Formulário**

**Tipo:** Switch  
**Campo:** `{{$json.formType}}`

**Rotas:**
- `contact_form` → Rota A
- `vancouver` → Rota B
- `default` → Rota A

**Ação:** Adicionar contexto específico para cada tipo

---

### **NÓ 3: Verificar Lead Anterior**

**Tipo:** PostgreSQL  
**Operação:** Execute Query

**Query:**
```sql
SELECT id, name, email, phone, "createdAt", 
       "leadIntelligence"->>'classification' as classification,
       "leadIntelligence"->>'riskScore' as risk_score
FROM "Lead"
WHERE email = $1 OR phone = $2
ORDER BY "createdAt" DESC
LIMIT 1;
```

**Parâmetros:**
- `$1`: `{{$json.email}}`
- `$2`: `{{$json.phone}}`

**Resultado:**
- Se encontrou → `exists: true`, `previousLeadId: "..."`, `previousClassification: "..."`
- Se não encontrou → `exists: false`

---

### **NÓ 4A: Lead Existente (Atualizar)**

**Tipo:** Code (JavaScript)

**Código:**
```javascript
const current = $input.item.json;
const previous = $('Verificar Lead Anterior').item.json;

// Se já foi classificado como SCAM antes, rejeitar
if (previous.classification === 'SCAMMER') {
  return {
    decision: 'REJECT',
    reason: 'Previously flagged as scammer',
    skipInvestigation: true
  };
}

// Se já foi LEGITIMATE, pode ser follow-up
if (previous.classification === 'LEGITIMATE') {
  return {
    decision: 'FOLLOW_UP',
    previousLeadId: previous.id,
    skipInvestigation: false // Ainda investigar (pode ter mudado)
  };
}

return {
  decision: 'CONTINUE',
  previousLeadId: previous.id,
  skipInvestigation: false
};
```

---

### **NÓ 4B: Lead Novo**

**Tipo:** Set  
**Ação:** Adicionar flag `isNewLead: true`

---

### **NÓ 5: Validar IP**

**Tipo:** HTTP Request  
**Método:** GET  
**URL:** `https://ipapi.co/{{$json.ip}}/json/`

**Headers:** Nenhum (grátis)

**Resposta esperada:**
```json
{
  "ip": "177.34.123.45",
  "city": "São Paulo",
  "region": "São Paulo",
  "country": "BR",
  "country_name": "Brazil",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "timezone": "America/Sao_Paulo",
  "currency": "BRL",
  "languages": "pt-BR,pt",
  "org": "ISP Name",
  "asn": 12345,
  "proxy": false,
  "vpn": false,
  "tor": false
}
```

**Ação:** Extrair dados de localização e flags de VPN/proxy

---

### **NÓ 6: Verificar Blacklist IP**

**Tipo:** HTTP Request  
**Método:** GET  
**URL:** `https://api.abuseipdb.com/api/v2/check`

**Headers:**
```
Key: X-Key
Value: {{$env.ABUSEIPDB_API_KEY}}
```

**Query:**
- `ipAddress`: `{{$json.ip}}`
- `maxAgeInDays`: `90`
- `verbose`: `true`

**Resposta:**
```json
{
  "data": {
    "isPublic": true,
    "ipVersion": 4,
    "isWhitelisted": false,
    "abuseConfidenceScore": 0,
    "usageType": "Data Center/Web Hosting/Transit",
    "isTor": false,
    "totalReports": 0,
    "numDistinctUsers": 0,
    "lastReportedAt": null
  }
}
```

**Ação:** Se `abuseConfidenceScore > 75` → Flag como suspeito

---

### **NÓ 7: Validar Email**

**Tipo:** HTTP Request  
**Método:** GET  
**URL:** `https://api.hunter.io/v2/email-verifier`

**Headers:**
```
Authorization: Bearer {{$env.HUNTER_API_KEY}}
```

**Query:**
- `email`: `{{$json.email}}`

**Resposta:**
```json
{
  "data": {
    "result": "deliverable",
    "score": 100,
    "sources": [
      {
        "domain": "exemplo.com",
        "uri": "https://exemplo.com",
        "extracted_on": "2026-01-20"
      }
    ],
    "disposable": false,
    "webmail": false,
    "mx_records": true,
    "smtp_server": true,
    "smtp_check": true,
    "accept_all": false,
    "block": false,
    "regexp": true
  }
}
```

**Ação:** Verificar `disposable`, `result`, `score`

---

### **NÓ 8: Buscar LinkedIn**

**Tipo:** HTTP Request  
**Método:** GET  
**URL:** `https://nubela.co/proxycurl/api/v2/linkedin`

**Headers:**
```
Authorization: Bearer {{$env.PROXYCURL_API_KEY}}
```

**Query:**
- `url`: `{{$json.linkedin_url}}` (se tiver)
- OU buscar por: `name` + `company`

**Resposta:**
```json
{
  "full_name": "João Silva",
  "headline": "Diretor de Tecnologia",
  "summary": "...",
  "experience": [...],
  "education": [...],
  "profile_pic_url": "..."
}
```

**Ação:** Extrair dados profissionais

---

### **NÓ 9: Google Search**

**Tipo:** HTTP Request  
**Método:** GET  
**URL:** `https://serpapi.com/search`

**Headers:**
```
Authorization: Bearer {{$env.SERPAPI_KEY}}
```

**Query:**
- `q`: `{{$json.name}} {{$json.company}} {{$json.email}}`
- `num`: `10`
- `hl`: `pt` (idioma)

**Resposta:**
```json
{
  "organic_results": [
    {
      "title": "...",
      "link": "...",
      "snippet": "..."
    }
  ]
}
```

**Ação:** Extrair informações públicas sobre a pessoa/empresa

---

### **NÓ 10: Buscar Redes Sociais**

**Tipo:** HTTP Request (múltiplos em paralelo)

**Instagram:**
```
URL: https://serpapi.com/search
Query: q={{$json.name}} site:instagram.com
```

**Twitter:**
```
URL: https://serpapi.com/search
Query: q={{$json.name}} site:twitter.com
```

**Facebook:**
```
URL: https://serpapi.com/search
Query: q={{$json.name}} site:facebook.com
```

**Ação:** Extrair perfis encontrados

---

### **NÓ 11: Detectar Idioma**

**Tipo:** Code (JavaScript)

**Código:**
```javascript
const text = $input.item.json.description || $input.item.json.message || '';

// Detectar idioma
const detectLanguage = (text) => {
  const ptWords = ['quero', 'gostaria', 'preciso', 'interesse', 'projeto'];
  const enWords = ['want', 'would', 'need', 'interest', 'project'];
  const esWords = ['quiero', 'necesito', 'interés', 'proyecto'];
  
  const ptCount = ptWords.filter(w => text.toLowerCase().includes(w)).length;
  const enCount = enWords.filter(w => text.toLowerCase().includes(w)).length;
  const esCount = esWords.filter(w => text.toLowerCase().includes(w)).length;
  
  if (ptCount > enCount && ptCount > esCount) return 'pt';
  if (enCount > ptCount && enCount > esCount) return 'en';
  if (esCount > ptCount && esCount > enCount) return 'es';
  return 'pt'; // default
};

return {
  detectedLanguage: detectLanguage(text),
  textLength: text.length
};
```

---

### **NÓ 12: Analisar com DeepSeek**

**Tipo:** HTTP Request  
**Método:** POST  
**URL:** `https://api.deepseek.com/v1/chat/completions`

**Headers:**
```
Authorization: Bearer {{$env.DEEPSEEK_API_KEY}}
Content-Type: application/json
```

**Body:**
```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert at analyzing sales leads. Return ONLY valid JSON, no markdown."
    },
    {
      "role": "user",
      "content": "Analyze this lead and return JSON with:\n1. classification: LEGITIMATE | SUSPECT | SCAMMER | COMPETITOR\n2. riskScore: 0-100\n3. persona: student | company | government | editor | museum | other\n4. interest: course | video | co-production | grants | exhibition | other\n5. temperature: HOT | WARM | COLD\n6. isStudent: true/false\n7. isCompany: true/false\n8. isGovernment: true/false\n9. wantsCourse: true/false\n10. wantsVideo: true/false\n11. wantsCoProduction: true/false\n12. wantsGrants: true/false\n13. redFlags: [array of strings]\n14. positiveSignals: [array of strings]\n\nLead data:\n{{JSON.stringify($json)}}\n\nIP check: {{$('Validar IP').json}}\nEmail check: {{$('Validar Email').json}}\nBlacklist: {{$('Verificar Blacklist IP').json}}\nLinkedIn: {{$('Buscar LinkedIn').json}}\nGoogle: {{$('Google Search').json}}\n\nReturn ONLY JSON, no explanation."
    }
  ],
  "temperature": 0.3,
  "max_tokens": 1000
}
```

**Resposta esperada:**
```json
{
  "classification": "LEGITIMATE",
  "riskScore": 15,
  "persona": "museum",
  "interest": "exhibition",
  "temperature": "HOT",
  "isStudent": false,
  "isCompany": false,
  "isGovernment": false,
  "wantsCourse": false,
  "wantsVideo": false,
  "wantsCoProduction": true,
  "wantsGrants": true,
  "redFlags": [],
  "positiveSignals": ["Valid email", "LinkedIn profile found", "Museum director"]
}
```

---

### **NÓ 13: IF (Decision)**

**Tipo:** IF  
**Condição:** `{{$json.classification}} == "LEGITIMATE"`

**Rotas:**
- **TRUE** → Continuar para gerar email
- **FALSE** → Rejeitar (salvar como SCAMMER mas não enviar email)

---

### **NÓ 14: Gerar Small Talk**

**Tipo:** HTTP Request  
**Método:** POST  
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**
```
x-api-key: {{$env.CLAUDE_API_KEY}}
anthropic-version: 2023-06-01
Content-Type: application/json
```

**Body:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 200,
  "messages": [
    {
      "role": "user",
      "content": "Generate personalized small talk for this lead in {{$('Detectar Idioma').json.detectedLanguage}}.\n\nContext:\n- Location: {{$('Validar IP').json.city}}, {{$('Validar IP').json.country_name}}\n- Company: {{$json.company}}\n- Persona: {{$('Analisar com DeepSeek').json.persona}}\n- Interest: {{$('Analisar com DeepSeek').json.interest}}\n- LinkedIn: {{$('Buscar LinkedIn').json.headline}}\n- Recent posts: {{$('Google Search').json.organic_results[0].snippet}}\n\nGenerate 2-3 sentences of friendly small talk mentioning their location, company type, or recent work. Use emojis sparingly (1-2 max: 🎬 🌐 ✨).\n\nReturn JSON: {smallTalk: \"text here\"}"
    }
  ]
}
```

---

### **NÓ 15: Gerar Email**

**Tipo:** HTTP Request  
**Método:** POST  
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**
```
x-api-key: {{$env.CLAUDE_API_KEY}}
anthropic-version: 2023-06-01
Content-Type: application/json
```

**Body:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 500,
  "messages": [
    {
      "role": "user",
      "content": "Create a personalized email in {{$('Detectar Idioma').json.detectedLanguage}} for this lead.\n\nContext:\n- Name: {{$json.name}}\n- Company: {{$json.company}}\n- Interest: {{$('Analisar com DeepSeek').json.interest}}\n- Persona: {{$('Analisar com DeepSeek').json.persona}}\n- Small Talk: {{$('Gerar Small Talk').json.smallTalk}}\n- Form Type: {{$json.formType}}\n- Project: {{$json.projectType}}\n- Budget: {{$json.budget}}\n- Description: {{$json.description}}\n\nTone: Friendly, creative, cinematic (2-3 emojis max: 🎬 🌐 ✨ 🎯 💡)\n\nStructure:\n1. Subject line (intriguing)\n2. Personal greeting + small talk\n3. Brief Azimut intro (relevant to their interest)\n4. Address their specific need (course/video/co-production/grants)\n5. Soft CTA (coffee chat, demo, portfolio review)\n6. Signature\n\nMax 150 words. Return JSON: {subject: \"...\", body: \"...\"}"
    }
  ]
}
```

---

### **NÓ 16: Enviar Email**

**Tipo:** HTTP Request  
**Método:** POST  
**URL:** `https://api.resend.com/emails`

**Headers:**
```
Authorization: Bearer {{$env.RESEND_API_KEY}}
Content-Type: application/json
```

**Body:**
```json
{
  "from": "Ranz <ranz@azmt.com.br>",
  "to": ["{{$json.email}}"],
  "subject": "{{$('Gerar Email').json.subject}}",
  "text": "{{$('Gerar Email').json.body}}",
  "reply_to": "ranz@azmt.com.br"
}
```

---

### **NÓ 17: IF (Tem WhatsApp?)**

**Tipo:** IF  
**Condição:** `{{$json.phone}} != null && {{$json.phone}} != ""`

**Rotas:**
- **TRUE** → Enviar WhatsApp
- **FALSE** → Pular

---

### **NÓ 18: Enviar WhatsApp**

**Tipo:** HTTP Request  
**Método:** POST  
**URL:** `https://graph.facebook.com/v18.0/{{$env.WHATSAPP_PHONE_ID}}/messages`

**Headers:**
```
Authorization: Bearer {{$env.WHATSAPP_ACCESS_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "messaging_product": "whatsapp",
  "to": "{{$json.phone}}",
  "type": "text",
  "text": {
    "body": "Olá {{$json.name}}! 👋\n\nRecebemos seu interesse em {{$('Analisar com DeepSeek').json.interest}}.\n\n{{$('Gerar Small Talk').json.smallTalk}}\n\nVamos conversar? Responda aqui ou agende: azmt.com.br\n\nAbraço,\nRanz\nAzimut"
  }
}
```

**Nota:** Requer WhatsApp Business API configurado

---

### **NÓ 19: Salvar Tudo no Banco**

**Tipo:** PostgreSQL  
**Operação:** Execute Query

**Query:**
```sql
UPDATE "Lead"
SET "leadIntelligence" = $1::jsonb
WHERE id = $2;
```

**Parâmetros:**
- `$1`: JSON completo com todos os dados
- `$2`: `{{$json.leadId}}`

**JSON a salvar:**
```json
{
  "classification": "{{$('Analisar com DeepSeek').json.classification}}",
  "riskScore": {{$('Analisar com DeepSeek').json.riskScore}},
  "persona": "{{$('Analisar com DeepSeek').json.persona}}",
  "interest": "{{$('Analisar com DeepSeek').json.interest}}",
  "temperature": "{{$('Analisar com DeepSeek').json.temperature}}",
  "isStudent": {{$('Analisar com DeepSeek').json.isStudent}},
  "isCompany": {{$('Analisar com DeepSeek').json.isCompany}},
  "isGovernment": {{$('Analisar com DeepSeek').json.isGovernment}},
  "wantsCourse": {{$('Analisar com DeepSeek').json.wantsCourse}},
  "wantsVideo": {{$('Analisar com DeepSeek').json.wantsVideo}},
  "wantsCoProduction": {{$('Analisar com DeepSeek').json.wantsCoProduction}},
  "wantsGrants": {{$('Analisar com DeepSeek').json.wantsGrants}},
  "redFlags": {{JSON.stringify($('Analisar com DeepSeek').json.redFlags)}},
  "positiveSignals": {{JSON.stringify($('Analisar com DeepSeek').json.positiveSignals)}},
  "realData": {
    "trustedEmail": {{$('Validar Email').json.data.result === "deliverable"}},
    "phoneValid": {{$json.phone != null}},
    "addressVerified": false
  },
  "verifications": {
    "ipCheck": {
      "type": "{{$('Validar IP').json.org}}",
      "vpn": {{$('Validar IP').json.vpn}},
      "proxy": {{$('Validar IP').json.proxy}},
      "city": "{{$('Validar IP').json.city}}",
      "country": "{{$('Validar IP').json.country_name}}"
    },
    "emailCheck": {
      "valid": {{$('Validar Email').json.data.result === "deliverable"}},
      "disposable": {{$('Validar Email').json.data.disposable}},
      "score": {{$('Validar Email').json.data.score}}
    },
    "blacklisted": {{$('Verificar Blacklist IP').json.data.abuseConfidenceScore > 75}}
  },
  "enrichment": {
    "linkedin": {{JSON.stringify($('Buscar LinkedIn').json}},
    "googleResults": {{JSON.stringify($('Google Search').json.organic_results)}},
    "socialMedia": {
      "instagram": "{{$('Buscar Redes Sociais').json.instagram}}",
      "twitter": "{{$('Buscar Redes Sociais').json.twitter}}",
      "facebook": "{{$('Buscar Redes Sociais').json.facebook}}"
    }
  },
  "behavior": {
    "detectedLanguage": "{{$('Detectar Idioma').json.detectedLanguage}}",
    "textLength": {{$('Detectar Idioma').json.textLength}}
  },
  "decision": {
    "action": "SEND_EMAIL",
    "reason": "High fit score, verified data",
    "emailSent": true,
    "whatsappSent": {{$json.phone != null}},
    "sentAt": "{{$now}}"
  },
  "investigationHistory": [
    {
      "timestamp": "{{$now}}",
      "action": "Full investigation completed",
      "results": "LEGITIMATE lead, email and WhatsApp sent"
    }
  ]
}
```

---

## **🔧 CONFIGURAÇÃO NO BACKOFFICE:**

### **Modificar `/api/leads/route.ts`:**

Adicionar chamada ao N8N após criar lead:

```typescript
// Após criar lead no banco (linha 124)
const lead = await prisma.lead.create({...})

// Chamar N8N para investigação completa
const N8N_WEBHOOK_URL = process.env.N8N_LEAD_INTELLIGENCE_WEBHOOK || 
  'https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence';

fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    leadId: lead.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    position: data.position,
    formType: 'contact_form',
    projectType: data.projectType,
    budget: data.budget,
    timeline: data.timeline,
    description: data.description,
    organizationType: data.organizationType,
    interestInGrants: data.interestInGrants,
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    sourceUrl: request.headers.get('referer') || null,
    lang: data.lang || 'pt'
  })
}).catch(err => {
  console.warn('N8N webhook failed (non-critical):', err);
});
```

### **Modificar `/api/leads/vancouver/route.ts`:**

Mesma coisa, mas com `formType: 'vancouver'`

---

## **📋 VARIÁVEIS DE AMBIENTE NECESSÁRIAS:**

No Railway (N8N):
```
DEEPSEEK_API_KEY=sua-key
CLAUDE_API_KEY=sua-key
RESEND_API_KEY=sua-key
HUNTER_API_KEY=sua-key (opcional, mas recomendado)
PROXYCURL_API_KEY=sua-key (opcional)
SERPAPI_KEY=sua-key (opcional)
ABUSEIPDB_API_KEY=sua-key (opcional, grátis)
WHATSAPP_PHONE_ID=seu-phone-id (opcional)
WHATSAPP_ACCESS_TOKEN=seu-token (opcional)
```

No Backoffice (`.env`):
```
N8N_LEAD_INTELLIGENCE_WEBHOOK=https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence
```

---

## **🎯 PRÓXIMOS PASSOS:**

1. **Criar workflow no N8N** seguindo estrutura acima
2. **Configurar credenciais** de todas as APIs
3. **Modificar backoffice** para chamar webhook
4. **Testar** com lead fake
5. **Ajustar prompts** da IA
6. **Monitorar** primeiros leads reais

---

**Salvo em:** `WORKFLOW_CAPTACAO_PASSIVA_COMPLETO.md`
