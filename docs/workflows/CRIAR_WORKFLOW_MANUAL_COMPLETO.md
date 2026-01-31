# 🛠️ CRIAR WORKFLOW MANUALMENTE - GUIA COMPLETO (19 NÓS)

## **✅ VANTAGENS:**
- ✅ Sempre funciona (não depende de versão)
- ✅ Você entende cada nó
- ✅ Pode ajustar conforme necessário
- ✅ Evita problemas de importação

**Tempo estimado:** 60-90 minutos

---

## **📋 ESTRUTURA COMPLETA (19 NÓS):**

1. **Webhook** - Recebe lead
2. **Switch** - Identificar Formulário
3. **PostgreSQL** - Verificar Lead Anterior
4. **Code** - Decisão Lead Existente
5. **IF** - Continuar Investigação?
6. **HTTP Request** - Validar IP
7. **HTTP Request** - Verificar Blacklist IP
8. **HTTP Request** - Validar Email (opcional)
9. **HTTP Request** - Buscar LinkedIn (opcional)
10. **HTTP Request** - Google Search
11. **Code** - Detectar Idioma
12. **HTTP Request** - Analisar com DeepSeek
13. **Code** - Processar DeepSeek
14. **IF** - É Legítimo?
15. **HTTP Request** - Gerar Small Talk
16. **Code** - Processar Small Talk
17. **HTTP Request** - Gerar Email
18. **Code** - Processar Email
19. **HTTP Request** - Enviar Email (Resend)
20. **IF** - Tem WhatsApp?
21. **HTTP Request** - Enviar WhatsApp (opcional)
22. **Code** - Preparar leadIntelligence
23. **PostgreSQL** - Salvar leadIntelligence
24. **Respond to Webhook**

**Total: 19-24 nós (dependendo de APIs opcionais)**

---

## **🚀 PASSO A PASSO:**

### **PASSO 1: Criar Novo Workflow**

1. No N8N, clique em **"Workflows"**
2. Clique em **"Add Workflow"**
3. Nome: **"Captação Passiva - Lead Intelligence"**

---

### **PASSO 2: Nó 1 - Webhook**

1. Clique no **"+"** no canvas
2. Busque: **"Webhook"**
3. Selecione: **"Webhook"**
4. Configurar:
   - **Path:** `lead-intelligence`
   - **HTTP Method:** `POST`
   - **Response Mode:** `Respond When Last Node Finishes`
5. Clique em **"Save"** (ativar webhook)
6. **Copie a URL** que aparece (ex: `https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence`)

**Nome do nó:** `Receber Lead`

---

### **PASSO 3: Nó 2 - Switch (Identificar Formulário)**

1. Clique no **"+"** depois do Webhook
2. Busque: **"Switch"**
3. Selecione: **"Switch"**
4. Configurar:
   - **Mode:** `Rules`
   - **Value:** `{{$json.formType}}`
5. **Rules:**
   - **Rule 1:**
     - **Condition:** `{{$json.formType}}` equals `contact_form`
     - **Output:** `1`
   - **Rule 2:**
     - **Condition:** `{{$json.formType}}` equals `vancouver`
     - **Output:** `2`
   - **Fallback Output:** `1`

**Nome do nó:** `Identificar Formulário`

---

### **PASSO 4: Nó 3 - PostgreSQL (Verificar Lead Anterior)**

1. Clique no **"+"** depois do Switch (conecte ambas as saídas)
2. Busque: **"PostgreSQL"**
3. Selecione: **"PostgreSQL"**
4. Configurar:
   - **Operation:** `Execute Query`
   - **Query:**
     ```sql
     SELECT id, name, email, phone, "createdAt", 
            "leadIntelligence"->>'classification' as classification,
            "leadIntelligence"->>'riskScore' as risk_score
     FROM "Lead"
     WHERE email = $1 OR phone = $2
     ORDER BY "createdAt" DESC
     LIMIT 1;
     ```
   - **Query Parameters:** `={{[$json.email, $json.phone]}}`
5. **Credentials:** Selecione ou crie credencial PostgreSQL (Neon)

**Nome do nó:** `Verificar Lead Anterior`

---

### **PASSO 5: Nó 4 - Code (Decisão Lead Existente)**

1. Clique no **"+"** depois do PostgreSQL
2. Busque: **"Code"**
3. Selecione: **"Code"**
4. Cole este código:

```javascript
const previousLead = $('Verificar Lead Anterior').item.json;
const currentLead = $input.item.json;

if (!previousLead || !previousLead.id) {
  return {
    isNewLead: true,
    decision: 'CONTINUE',
    skipInvestigation: false
  };
}

if (previousLead.classification === 'SCAMMER') {
  return {
    isNewLead: false,
    previousLeadId: previousLead.id,
    decision: 'REJECT',
    reason: 'Previously flagged as scammer',
    skipInvestigation: true
  };
}

if (previousLead.classification === 'LEGITIMATE') {
  return {
    isNewLead: false,
    previousLeadId: previousLead.id,
    decision: 'FOLLOW_UP',
    skipInvestigation: false
  };
}

return {
  isNewLead: false,
  previousLeadId: previousLead.id,
  decision: 'CONTINUE',
  skipInvestigation: false
};
```

**Nome do nó:** `Decisão Lead Existente`

---

### **PASSO 6: Nó 5 - IF (Continuar Investigação?)**

1. Clique no **"+"** depois do Code
2. Busque: **"IF"**
3. Selecione: **"IF"**
4. Configurar:
   - **Condition:** `{{$json.skipInvestigation}}` equals `false`
   - **TRUE** → Continuar investigação
   - **FALSE** → Parar (conectar ao Respond to Webhook no final)

**Nome do nó:** `Continuar Investigação?`

---

### **PASSO 7: Nó 6 - HTTP Request (Validar IP)**

1. Clique no **"+"** depois do IF (rota TRUE)
2. Busque: **"HTTP Request"**
3. Selecione: **"HTTP Request"**
4. Configurar:
   - **Method:** `GET`
   - **URL:** `https://ipapi.co/{{$json.ip}}/json/`
   - **Authentication:** `None`

**Nome do nó:** `Validar IP`

---

### **PASSO 8: Nó 7 - HTTP Request (Verificar Blacklist IP)**

1. Clique no **"+"** depois de "Validar IP"
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://api.abuseipdb.com/api/v2/check`
   - **Authentication:** `Header Auth`
   - **Name:** `Key`
   - **Value:** `={{$env.ABUSEIPDB_API_KEY}}`
   - **Query Parameters:**
     - `ipAddress`: `{{$json.ip}}`
     - `maxAgeInDays`: `90`
     - `verbose`: `true`

**Nome do nó:** `Verificar Blacklist IP`

**Nota:** Se não tiver API key do AbuseIPDB, pode pular este nó e conectar "Validar IP" diretamente ao próximo.

---

### **PASSO 9: Nó 8 - HTTP Request (Validar Email) - OPCIONAL**

1. Clique no **"+"** depois de "Verificar Blacklist IP"
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://api.hunter.io/v2/email-verifier`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.HUNTER_API_KEY}}`
   - **Query Parameters:**
     - `email`: `{{$json.email}}`

**Nome do nó:** `Validar Email`

**Nota:** Se não tiver Hunter.io, pule este nó e conecte "Verificar Blacklist IP" diretamente ao próximo.

---

### **PASSO 10: Nó 9 - HTTP Request (Buscar LinkedIn) - OPCIONAL**

1. Clique no **"+"** depois de "Validar Email" (ou "Verificar Blacklist IP" se pulou email)
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://nubela.co/proxycurl/api/v2/linkedin`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.PROXYCURL_API_KEY}}`
   - **Query Parameters:**
     - `url`: `{{$json.linkedin_url}}` (se tiver)
     - OU `name`: `{{$json.name}}`
     - OU `company`: `{{$json.company}}`

**Nome do nó:** `Buscar LinkedIn`

**Nota:** Se não tiver Proxycurl, pule este nó e conecte o anterior diretamente ao próximo.

---

### **PASSO 11: Nó 10 - HTTP Request (Google Search)**

1. Clique no **"+"** depois de "Buscar LinkedIn" (ou anterior se pulou LinkedIn)
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://serpapi.com/search`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.SERPAPI_KEY}}`
   - **Query Parameters:**
     - `q`: `{{$json.name}} {{$json.company}} {{$json.email}}`
     - `num`: `10`
     - `hl`: `pt`

**Nome do nó:** `Google Search`

**Nota:** Se não tiver SerpAPI, pode usar busca simples ou pular este nó.

---

### **PASSO 12: Nó 11 - Code (Detectar Idioma)**

1. Clique no **"+"** depois de "Google Search"
2. Busque: **"Code"**
3. Cole este código:

```javascript
const text = $input.item.json.description || 
             $input.item.json.message || 
             $input.item.json.comments || '';

const ptWords = ['quero', 'gostaria', 'preciso', 'interesse', 'projeto', 'obrigado', 'contato'];
const enWords = ['want', 'would', 'need', 'interest', 'project', 'thank', 'contact'];
const esWords = ['quiero', 'necesito', 'interés', 'proyecto', 'gracias', 'contacto'];

const ptCount = ptWords.filter(function(w) { 
  return text.toLowerCase().indexOf(w) !== -1; 
}).length;
const enCount = enWords.filter(function(w) { 
  return text.toLowerCase().indexOf(w) !== -1; 
}).length;
const esCount = esWords.filter(function(w) { 
  return text.toLowerCase().indexOf(w) !== -1; 
}).length;

let detectedLanguage = 'pt';
if (enCount > ptCount && enCount > esCount) detectedLanguage = 'en';
else if (esCount > ptCount && esCount > enCount) detectedLanguage = 'es';

return {
  detectedLanguage: detectedLanguage,
  textLength: text.length
};
```

**Nome do nó:** `Detectar Idioma`

---

### **PASSO 13: Nó 12 - HTTP Request (Analisar com DeepSeek)**

1. Clique no **"+"** depois de "Detectar Idioma"
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `POST`
   - **URL:** `https://api.deepseek.com/v1/chat/completions`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.DEEPSEEK_API_KEY}}`
   - **Headers:**
     - `Content-Type`: `application/json`
   - **Body:**
     - **Body Content Type:** `JSON`
     - **Body:**
       ```json
       {
         "model": "deepseek-chat",
         "messages": [
           {
             "role": "system",
             "content": "You are an expert at analyzing sales leads. Return ONLY valid JSON, no markdown, no code blocks."
           },
           {
             "role": "user",
             "content": "Analyze this lead and return JSON with: classification (LEGITIMATE|SUSPECT|SCAMMER|COMPETITOR), riskScore (0-100), persona (student|company|government|museum|other), interest (course|video|co-production|grants|exhibition|other), temperature (HOT|WARM|COLD), isStudent (true/false), isCompany (true/false), isGovernment (true/false), wantsCourse (true/false), wantsVideo (true/false), wantsCoProduction (true/false), wantsGrants (true/false), redFlags (array of strings), positiveSignals (array of strings). Lead data: {{JSON.stringify($json)}}. IP check: {{JSON.stringify($('Validar IP').json)}}. Email check: {{JSON.stringify($('Validar Email').json)}}. Blacklist: {{JSON.stringify($('Verificar Blacklist IP').json)}}. LinkedIn: {{JSON.stringify($('Buscar LinkedIn').json)}}. Google: {{JSON.stringify($('Google Search').json)}}. Return ONLY JSON, no explanation."
           }
         ],
         "temperature": 0.3,
         "max_tokens": 1000
       }
       ```

**Nome do nó:** `Analisar com DeepSeek`

---

### **PASSO 14: Nó 13 - Code (Processar DeepSeek)**

1. Clique no **"+"** depois de "Analisar com DeepSeek"
2. Busque: **"Code"**
3. Cole este código:

```javascript
const deepseekResponse = $input.item.json;
let content = deepseekResponse.choices[0].message.content;
content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const analysis = JSON.parse(content);

return {
  classification: analysis.classification,
  riskScore: analysis.riskScore,
  persona: analysis.persona,
  interest: analysis.interest,
  temperature: analysis.temperature,
  isStudent: analysis.isStudent,
  isCompany: analysis.isCompany,
  isGovernment: analysis.isGovernment,
  wantsCourse: analysis.wantsCourse,
  wantsVideo: analysis.wantsVideo,
  wantsCoProduction: analysis.wantsCoProduction,
  wantsGrants: analysis.wantsGrants,
  redFlags: analysis.redFlags || [],
  positiveSignals: analysis.positiveSignals || []
};
```

**Nome do nó:** `Processar DeepSeek`

---

### **PASSO 15: Nó 14 - IF (É Legítimo?)**

1. Clique no **"+"** depois de "Processar DeepSeek"
2. Busque: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.classification}}` equals `LEGITIMATE`
   - **TRUE** → Continuar (enviar email)
   - **FALSE** → Parar (não enviar, mas salvar como rejeitado)

**Nome do nó:** `É Legítimo?`

---

### **PASSO 16: Nó 15 - HTTP Request (Gerar Small Talk)**

1. Clique no **"+"** depois do IF (rota TRUE)
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `POST`
   - **URL:** `https://api.anthropic.com/v1/messages`
   - **Authentication:** `Header Auth`
   - **Name:** `x-api-key`
   - **Value:** `={{$env.CLAUDE_API_KEY}}`
   - **Headers:**
     - `anthropic-version`: `2023-06-01`
     - `Content-Type`: `application/json`
   - **Body:**
     - **Body Content Type:** `JSON`
     - **Body:**
       ```json
       {
         "model": "claude-sonnet-4-20250514",
         "max_tokens": 200,
         "messages": [
           {
             "role": "user",
             "content": "Generate personalized small talk for this lead in {{$('Detectar Idioma').json.detectedLanguage}}. Context: Location: {{$('Validar IP').json.city}}, {{$('Validar IP').json.country_name}}. Company: {{$json.company}}. Persona: {{$('Processar DeepSeek').json.persona}}. Interest: {{$('Processar DeepSeek').json.interest}}. LinkedIn: {{$('Buscar LinkedIn').json.headline}}. Recent posts: {{$('Google Search').json.organic_results[0].snippet}}. Generate 2-3 sentences of friendly small talk mentioning their location, company type, or recent work. Use emojis sparingly (1-2 max: 🎬 🌐 ✨). Return JSON: {smallTalk: \"text here\"}"
           }
         ]
       }
       ```

**Nome do nó:** `Gerar Small Talk`

---

### **PASSO 17: Nó 16 - Code (Processar Small Talk)**

1. Clique no **"+"** depois de "Gerar Small Talk"
2. Busque: **"Code"**
3. Cole este código:

```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const smallTalk = JSON.parse(cleanContent);
return { smallTalk: smallTalk.smallTalk };
```

**Nome do nó:** `Processar Small Talk`

---

### **PASSO 18: Nó 17 - HTTP Request (Gerar Email)**

1. Clique no **"+"** depois de "Processar Small Talk"
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `POST`
   - **URL:** `https://api.anthropic.com/v1/messages`
   - **Authentication:** `Header Auth`
   - **Name:** `x-api-key`
   - **Value:** `={{$env.CLAUDE_API_KEY}}`
   - **Headers:**
     - `anthropic-version`: `2023-06-01`
     - `Content-Type`: `application/json`
   - **Body:**
     - **Body Content Type:** `JSON`
     - **Body:**
       ```json
       {
         "model": "claude-sonnet-4-20250514",
         "max_tokens": 500,
         "messages": [
           {
             "role": "user",
             "content": "Create a personalized email in {{$('Detectar Idioma').json.detectedLanguage}} for this lead. Context: Name: {{$json.name}}. Company: {{$json.company}}. Interest: {{$('Processar DeepSeek').json.interest}}. Persona: {{$('Processar DeepSeek').json.persona}}. Small Talk: {{$('Processar Small Talk').json.smallTalk}}. Form Type: {{$json.formType}}. Project: {{$json.projectType}}. Budget: {{$json.budget}}. Description: {{$json.description}}. Tone: Friendly, creative, cinematic (2-3 emojis max: 🎬 🌐 ✨ 🎯 💡). Structure: 1. Subject line (intriguing). 2. Personal greeting + small talk. 3. Brief Azimut intro (relevant to their interest). 4. Address their specific need (course/video/co-production/grants). 5. Soft CTA (coffee chat, demo, portfolio review). 6. Signature. Max 150 words. Return JSON: {subject: \"...\", body: \"...\"}"
           }
         ]
       }
       ```

**Nome do nó:** `Gerar Email`

---

### **PASSO 19: Nó 18 - Code (Processar Email)**

1. Clique no **"+"** depois de "Gerar Email"
2. Busque: **"Code"**
3. Cole este código:

```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const email = JSON.parse(cleanContent);
return { subject: email.subject, body: email.body };
```

**Nome do nó:** `Processar Email`

---

### **PASSO 20: Nó 19 - HTTP Request (Resend - Enviar Email)**

1. Clique no **"+"** depois de "Processar Email"
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `POST`
   - **URL:** `https://api.resend.com/emails`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.RESEND_API_KEY}}`
   - **Headers:**
     - `Content-Type`: `application/json`
   - **Body:**
     - **Body Content Type:** `JSON`
     - **Body:**
       ```json
       {
         "from": "Ranz <ranz@azmt.com.br>",
         "to": ["{{$json.email}}"],
         "subject": "{{$('Processar Email').json.subject}}",
         "text": "{{$('Processar Email').json.body}}",
         "reply_to": "ranz@azmt.com.br"
       }
       ```

**Nome do nó:** `Enviar Email`

---

### **PASSO 21: Nó 20 - IF (Tem WhatsApp?)**

1. Clique no **"+"** depois de "Enviar Email"
2. Busque: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.phone}}` is not empty AND `{{$json.phone}}` is not null
   - **TRUE** → Enviar WhatsApp
   - **FALSE** → Pular (ir direto para Preparar leadIntelligence)

**Nome do nó:** `Tem WhatsApp?`

---

### **PASSO 22: Nó 21 - HTTP Request (Enviar WhatsApp) - OPCIONAL**

1. Clique no **"+"** depois do IF (rota TRUE)
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `POST`
   - **URL:** `https://graph.facebook.com/v18.0/{{$env.WHATSAPP_PHONE_ID}}/messages`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.WHATSAPP_ACCESS_TOKEN}}`
   - **Headers:**
     - `Content-Type`: `application/json`
   - **Body:**
     - **Body Content Type:** `JSON`
     - **Body:**
       ```json
       {
         "messaging_product": "whatsapp",
         "to": "{{$json.phone}}",
         "type": "text",
         "text": {
           "body": "Olá {{$json.name}}! 👋\n\nRecebemos seu interesse em {{$('Processar DeepSeek').json.interest}}.\n\n{{$('Processar Small Talk').json.smallTalk}}\n\nVamos conversar? Responda aqui ou agende: azmt.com.br\n\nAbraço,\nRanz\nAzimut"
         }
       }
       ```

**Nome do nó:** `Enviar WhatsApp`

**Nota:** Se não tiver WhatsApp Business API configurado, pule este nó e conecte "Tem WhatsApp?" (FALSE) diretamente ao próximo.

---

### **PASSO 23: Nó 22 - Code (Preparar leadIntelligence)**

1. Clique no **"+"** depois de "Enviar WhatsApp" (ou "Tem WhatsApp?" FALSE)
2. Busque: **"Code"**
3. Cole este código:

```javascript
const lead = $json;
const ipCheck = $('Validar IP').item.json || {};
const blacklist = $('Verificar Blacklist IP').item.json || {};
const emailCheck = $('Validar Email').item.json || {};
const linkedin = $('Buscar LinkedIn').item.json || {};
const google = $('Google Search').item.json || {};
const analysis = $('Processar DeepSeek').item.json;
const language = $('Detectar Idioma').item.json;

const leadIntelligence = {
  classification: analysis.classification,
  riskScore: analysis.riskScore,
  persona: analysis.persona,
  interest: analysis.interest,
  temperature: analysis.temperature,
  isStudent: analysis.isStudent,
  isCompany: analysis.isCompany,
  isGovernment: analysis.isGovernment,
  wantsCourse: analysis.wantsCourse,
  wantsVideo: analysis.wantsVideo,
  wantsCoProduction: analysis.wantsCoProduction,
  wantsGrants: analysis.wantsGrants,
  redFlags: analysis.redFlags || [],
  positiveSignals: analysis.positiveSignals || [],
  verifications: {
    ipCheck: {
      city: ipCheck.city || 'unknown',
      country: ipCheck.country_name || 'unknown',
      vpn: ipCheck.vpn || false,
      proxy: ipCheck.proxy || false
    },
    emailCheck: {
      valid: emailCheck.data && emailCheck.data.result === 'deliverable',
      disposable: emailCheck.data && emailCheck.data.disposable || false,
      score: emailCheck.data && emailCheck.data.score || 0
    },
    blacklisted: blacklist.data && blacklist.data.abuseConfidenceScore > 75 || false
  },
  enrichment: {
    linkedin: linkedin || {},
    googleResults: google.organic_results || [],
    socialMedia: {}
  },
  behavior: {
    detectedLanguage: language.detectedLanguage,
    textLength: language.textLength
  },
  decision: {
    action: analysis.classification === 'LEGITIMATE' ? 'SEND_EMAIL' : 'REJECT',
    emailSent: analysis.classification === 'LEGITIMATE',
    whatsappSent: lead.phone && analysis.classification === 'LEGITIMATE' || false,
    sentAt: new Date().toISOString()
  }
};

return {
  leadIntelligence: leadIntelligence,
  leadId: lead.leadId
};
```

**Nome do nó:** `Preparar leadIntelligence`

---

### **PASSO 24: Nó 23 - PostgreSQL (Salvar leadIntelligence)**

1. Clique no **"+"** depois de "Preparar leadIntelligence"
2. Busque: **"PostgreSQL"**
3. Configurar:
   - **Operation:** `Execute Query`
   - **Query:**
     ```sql
     UPDATE "Lead"
     SET "leadIntelligence" = $1::jsonb
     WHERE id = $2;
     ```
   - **Query Parameters:** `=[{{JSON.stringify($json.leadIntelligence)}}, {{$json.leadId}}]`

**Nome do nó:** `Salvar leadIntelligence`

---

### **PASSO 25: Nó 24 - Respond to Webhook**

1. Clique no **"+"** depois de "Salvar leadIntelligence"
2. Busque: **"Respond to Webhook"**
3. Configurar:
   - **Respond With:** `JSON`
   - **Response Body:**
     ```json
     {
       "success": true,
       "leadId": "{{$json.leadId}}",
       "classification": "{{$('Processar DeepSeek').json.classification}}",
       "emailSent": {{$('Processar DeepSeek').json.classification === 'LEGITIMATE'}},
       "whatsappSent": {{$json.phone && $('Processar DeepSeek').json.classification === 'LEGITIMATE'}}
     }
     ```

**Nome do nó:** `Responder Webhook`

**IMPORTANTE:** Também conecte:
- **IF (Continuar Investigação? FALSE)** → `Responder Webhook`
- **IF (É Legítimo? FALSE)** → `Preparar leadIntelligence` → `Salvar leadIntelligence` → `Responder Webhook`

---

## **🔗 CONECTAR OS NÓS (ORDEM COMPLETA):**

1. Webhook → Switch
2. Switch (Output 1) → PostgreSQL (Verificar Lead Anterior)
3. Switch (Output 2) → PostgreSQL (Verificar Lead Anterior)
4. PostgreSQL → Code (Decisão Lead Existente)
5. Code → IF (Continuar Investigação?)
6. IF (TRUE) → HTTP Request (Validar IP)
7. Validar IP → HTTP Request (Verificar Blacklist IP)
8. Verificar Blacklist IP → HTTP Request (Validar Email) [ou pular se não tiver]
9. Validar Email → HTTP Request (Buscar LinkedIn) [ou pular se não tiver]
10. Buscar LinkedIn → HTTP Request (Google Search) [ou Validar Email → Google Search se não tiver LinkedIn]
11. Google Search → Code (Detectar Idioma)
12. Detectar Idioma → HTTP Request (Analisar com DeepSeek)
13. Analisar com DeepSeek → Code (Processar DeepSeek)
14. Processar DeepSeek → IF (É Legítimo?)
15. IF (TRUE) → HTTP Request (Gerar Small Talk)
16. Gerar Small Talk → Code (Processar Small Talk)
17. Processar Small Talk → HTTP Request (Gerar Email)
18. Gerar Email → Code (Processar Email)
19. Processar Email → HTTP Request (Enviar Email)
20. Enviar Email → IF (Tem WhatsApp?)
21. IF (TRUE) → HTTP Request (Enviar WhatsApp)
22. IF (FALSE) → Code (Preparar leadIntelligence)
23. Enviar WhatsApp → Code (Preparar leadIntelligence)
24. Preparar leadIntelligence → PostgreSQL (Salvar leadIntelligence)
25. Salvar leadIntelligence → Respond to Webhook
26. IF (Continuar Investigação? FALSE) → Respond to Webhook
27. IF (É Legítimo? FALSE) → Code (Preparar leadIntelligence) → PostgreSQL → Respond to Webhook

---

## **⚙️ CONFIGURAR VARIÁVEIS DE AMBIENTE:**

No N8N, vá em **Settings** → **Environment Variables** e adicione:

```
DEEPSEEK_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
ABUSEIPDB_API_KEY=... (opcional)
HUNTER_API_KEY=... (opcional)
PROXYCURL_API_KEY=... (opcional)
SERPAPI_KEY=... (opcional)
WHATSAPP_PHONE_ID=... (opcional)
WHATSAPP_ACCESS_TOKEN=... (opcional)
```

---

## **✅ ATIVAR:**

1. Clique no toggle **"Active"** no topo
2. Workflow está ativo!

---

## **🧪 TESTAR:**

1. Clique em **"Execute Workflow"**
2. Cole este JSON:

```json
{
  "leadId": "test-123",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+5511999999999",
  "company": "Museu Nacional",
  "position": "Diretor",
  "formType": "contact_form",
  "projectType": "exhibition",
  "budget": "50000-100000",
  "timeline": "3-6 meses",
  "description": "Queremos criar uma exposição imersiva sobre história do Brasil",
  "organizationType": "museum",
  "interestInGrants": true,
  "country": "Brasil",
  "city": "São Paulo",
  "ip": "177.34.123.45",
  "userAgent": "Mozilla/5.0...",
  "sourceUrl": "https://azmt.com.br/contato",
  "lang": "pt"
}
```

3. Clique em **"Execute Workflow"**
4. Veja se executa sem erros
5. Verifique cada nó para ver os dados processados

---

## **📝 NOTAS IMPORTANTES:**

1. **APIs Opcionais:** Se não tiver API keys para Hunter.io, Proxycurl, SerpAPI ou WhatsApp, pode pular esses nós. O workflow funcionará sem eles.

2. **Tratamento de Erros:** N8N pode ter nós que falham. Configure **"Continue On Fail"** nos nós opcionais se quiser que o workflow continue mesmo se uma API falhar.

3. **Código JavaScript:** Use sintaxe compatível com Node.js antigo (sem optional chaining `?.`). Use `&&` e verificações explícitas.

4. **Referências entre Nós:** Use `$('Nome do Nó').item.json` para acessar dados de nós anteriores.

5. **Teste Incremental:** Crie alguns nós, teste, depois adicione mais. Não precisa criar tudo de uma vez.

---

**Pronto! Workflow completo criado manualmente!** 🚀

**Se tiver dúvida em algum passo, me avise!**
