# 📥 COMO IMPORTAR WORKFLOW NO N8N - PASSO A PASSO

## **🎯 OBJETIVO:**

Importar o workflow completo "Captação Passiva - Lead Intelligence" no N8N.

---

## **📋 PRÉ-REQUISITOS:**

- ✅ N8N online: `https://n8n-production-dce3.up.railway.app`
- ✅ Login no N8N
- ✅ Credenciais configuradas (DeepSeek, Claude, Resend)

---

## **🚀 PASSO A PASSO:**

### **PASSO 1: Acessar N8N**

1. Abrir navegador
2. Ir em: `https://n8n-production-dce3.up.railway.app`
3. Fazer login

---

### **PASSO 2: Criar Workflow Novo**

1. Clicar em **"Workflows"** (barra lateral)
2. Clicar em **"Add Workflow"** (botão no topo)
3. Dar nome: **"Captação Passiva - Lead Intelligence"**

---

### **PASSO 3: Adicionar Nós (Um por Um)**

**IMPORTANTE:** Vamos criar manualmente porque o JSON de importação pode ter problemas. É melhor entender cada nó!

---

#### **NÓ 1: Webhook (Trigger)**

1. Clicar em **"+"** (adicionar nó)
2. Buscar: **"Webhook"**
3. Selecionar: **"Webhook"**
4. Configurar:
   - **Path:** `lead-intelligence`
   - **HTTP Method:** `POST`
   - **Response Mode:** `Respond When Last Node Finishes`
5. Clicar em **"Save"** (ativar webhook)
6. **Copiar URL do webhook** (vai aparecer no nó)

**URL será:** `https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence`

---

#### **NÓ 2: Identificar Formulário (Switch)**

1. Clicar em **"+"** depois do Webhook
2. Buscar: **"Switch"**
3. Selecionar: **"Switch"**
4. Configurar:
   - **Mode:** `Rules`
   - **Value:** `={{$json.formType}}`
5. Adicionar Rules:
   - **Rule 1:**
     - Condition: `{{$json.formType}}` equals `contact_form`
     - Output: `contact_form`
   - **Rule 2:**
     - Condition: `{{$json.formType}}` equals `vancouver`
     - Output: `vancouver`
6. **Fallback:** `contact_form`

---

#### **NÓ 3: Verificar Lead Anterior (PostgreSQL)**

1. Clicar em **"+"** depois do Switch
2. Buscar: **"PostgreSQL"**
3. Selecionar: **"PostgreSQL"**
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
5. **Credentials:** Selecionar credencial PostgreSQL (ou criar)

**Como criar credencial PostgreSQL:**
- Clicar em **"Create New Credential"**
- Tipo: **PostgreSQL**
- Preencher:
  - Host: `{{$env.DB_POSTGRESDB_HOST}}`
  - Database: `{{$env.DB_POSTGRESDB_DATABASE}}`
  - User: `{{$env.DB_POSTGRESDB_USER}}`
  - Password: `{{$env.DB_POSTGRESDB_PASSWORD}}`
  - Port: `{{$env.DB_POSTGRESDB_PORT}}`

---

#### **NÓ 4: Decisão Lead Existente (Code)**

1. Clicar em **"+"** depois do PostgreSQL
2. Buscar: **"Code"**
3. Selecionar: **"Code"**
4. Colar código:

```javascript
// Pegar dados do lead anterior
const previousLead = $('Verificar Lead Anterior').item.json;
const currentLead = $input.item.json;

// Se não encontrou lead anterior, é novo
if (!previousLead || !previousLead.id) {
  return {
    isNewLead: true,
    decision: 'CONTINUE',
    skipInvestigation: false
  };
}

// Se já foi classificado como SCAM antes, rejeitar
if (previousLead.classification === 'SCAMMER') {
  return {
    isNewLead: false,
    previousLeadId: previousLead.id,
    decision: 'REJECT',
    reason: 'Previously flagged as scammer',
    skipInvestigation: true
  };
}

// Se já foi LEGITIMATE, pode ser follow-up
if (previousLead.classification === 'LEGITIMATE') {
  return {
    isNewLead: false,
    previousLeadId: previousLead.id,
    decision: 'FOLLOW_UP',
    skipInvestigation: false
  };
}

// Outros casos, continuar
return {
  isNewLead: false,
  previousLeadId: previousLead.id,
  decision: 'CONTINUE',
  skipInvestigation: false
};
```

---

#### **NÓ 5: IF (Continuar Investigação?)**

1. Clicar em **"+"** depois do Code
2. Buscar: **"IF"**
3. Selecionar: **"IF"**
4. Configurar:
   - **Condition:** `{{$json.skipInvestigation}}` equals `false`
   - **TRUE** → Continuar investigação
   - **FALSE** → Parar (não investiga mais)

---

#### **NÓ 6: Validar IP (HTTP Request)**

1. Clicar em **"+"** depois do IF (rota TRUE)
2. Buscar: **"HTTP Request"**
3. Selecionar: **"HTTP Request"**
4. Configurar:
   - **Method:** `GET`
   - **URL:** `https://ipapi.co/{{$json.ip}}/json/`
   - **Authentication:** `None`

**O que faz:** Busca geolocalização do IP (grátis, sem credencial)

---

#### **NÓ 7: Verificar Blacklist IP (HTTP Request)**

1. Clicar em **"+"** depois de "Validar IP"
2. Buscar: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://api.abuseipdb.com/api/v2/check`
   - **Authentication:** `Header Auth`
   - **Name:** `Key`
   - **Value:** `={{$env.ABUSEIPDB_API_KEY}}`
   - **Query Parameters:**
     - `ipAddress`: `={{$json.ip}}`
     - `maxAgeInDays`: `90`
     - `verbose`: `true`

**O que faz:** Verifica se IP está em blacklist (grátis, precisa API key)

**Como conseguir API key AbuseIPDB:**
1. Ir em https://www.abuseipdb.com/
2. Criar conta (grátis)
3. Ir em **API** → **API Key**
4. Copiar key
5. Adicionar no Railway: `ABUSEIPDB_API_KEY=sua-key`

---

#### **NÓ 8: Validar Email (HTTP Request) - OPCIONAL**

**Se tiver Hunter.io:**

1. Clicar em **"+"** depois do IF (rota TRUE, paralelo ao IP)
2. Buscar: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://api.hunter.io/v2/email-verifier`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.HUNTER_API_KEY}}`
   - **Query Parameters:**
     - `email`: `={{$json.email}}`

**Se NÃO tiver Hunter.io:**
- Pular este nó (ou usar API grátis alternativa)

---

#### **NÓ 9: Buscar LinkedIn (HTTP Request) - OPCIONAL**

**Se tiver Proxycurl:**

1. Clicar em **"+"** depois de "Validar Email"
2. Buscar: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://nubela.co/proxycurl/api/v2/linkedin`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.PROXYCURL_API_KEY}}`
   - **Query Parameters:**
     - `url`: `={{$json.linkedin_url || ''}}`
   - **Options:** `Continue On Fail` (marcar)

**Se NÃO tiver Proxycurl:**
- Pular este nó

---

#### **NÓ 10: Google Search (HTTP Request) - OPCIONAL**

**Se tiver SerpAPI:**

1. Clicar em **"+"** depois de "Buscar LinkedIn"
2. Buscar: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://serpapi.com/search`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.SERPAPI_KEY}}`
   - **Query Parameters:**
     - `q`: `={{$json.name}} {{$json.company}} {{$json.email}}`
     - `num`: `10`
     - `hl`: `pt`
   - **Options:** `Continue On Fail` (marcar)

**Se NÃO tiver SerpAPI:**
- Pular este nó

---

#### **NÓ 11: Detectar Idioma (Code)**

1. Clicar em **"+"** depois de "Google Search"
2. Buscar: **"Code"**
3. Colar código:

```javascript
const text = $input.item.json.description || 
             $input.item.json.message || 
             $input.item.json.comments || 
             '';

const ptWords = ['quero', 'gostaria', 'preciso', 'interesse', 'projeto', 'obrigado', 'contato'];
const enWords = ['want', 'would', 'need', 'interest', 'project', 'thank', 'contact'];
const esWords = ['quiero', 'necesito', 'interés', 'proyecto', 'gracias', 'contacto'];

const ptCount = ptWords.filter(w => text.toLowerCase().includes(w)).length;
const enCount = enWords.filter(w => text.toLowerCase().includes(w)).length;
const esCount = esWords.filter(w => text.toLowerCase().includes(w)).length;

let detectedLanguage = 'pt';
if (enCount > ptCount && enCount > esCount) detectedLanguage = 'en';
else if (esCount > ptCount && esCount > enCount) detectedLanguage = 'es';
else if (ptCount > 0) detectedLanguage = 'pt';

return {
  detectedLanguage: detectedLanguage,
  textLength: text.length,
  confidence: Math.max(ptCount, enCount, esCount) / Math.max(1, ptWords.length)
};
```

---

#### **NÓ 12: Analisar com DeepSeek (HTTP Request)**

1. Clicar em **"+"** depois de "Detectar Idioma"
2. Buscar: **"HTTP Request"**
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
             "content": "Analyze this lead and return JSON with: classification (LEGITIMATE|SUSPECT|SCAMMER|COMPETITOR), riskScore (0-100), persona (student|company|government|editor|museum|other), interest (course|video|co-production|grants|exhibition|other), temperature (HOT|WARM|COLD), isStudent, isCompany, isGovernment, wantsCourse, wantsVideo, wantsCoProduction, wantsGrants, redFlags (array), positiveSignals (array). Lead: {{JSON.stringify($json)}}. IP: {{JSON.stringify($('Validar IP').json)}}. Email: {{JSON.stringify($('Validar Email').json)}}. Blacklist: {{JSON.stringify($('Verificar Blacklist IP').json)}}. LinkedIn: {{JSON.stringify($('Buscar LinkedIn').json)}}. Google: {{JSON.stringify($('Google Search').json)}}. Return ONLY JSON."
           }
         ],
         "temperature": 0.3,
         "max_tokens": 1000
       }
       ```

**O que faz:** Envia TODOS os dados para DeepSeek analisar e classificar

---

#### **NÓ 13: Processar DeepSeek (Code)**

1. Clicar em **"+"** depois de "Analisar com DeepSeek"
2. Buscar: **"Code"**
3. Colar código:

```javascript
const deepseekResponse = $input.item.json;
let content = deepseekResponse.choices[0].message.content;

// Remover markdown se tiver
content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

// Parse JSON
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

---

#### **NÓ 14: IF (É Legítimo?)**

1. Clicar em **"+"** depois de "Processar DeepSeek"
2. Buscar: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.classification}}` equals `LEGITIMATE`
   - **TRUE** → Continuar (enviar email)
   - **FALSE** → Parar (não enviar, só salvar como SCAMMER)

---

#### **NÓ 15: Gerar Small Talk (HTTP Request)**

1. Clicar em **"+"** depois do IF (rota TRUE)
2. Buscar: **"HTTP Request"**
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
     ```json
     {
       "model": "claude-sonnet-4-20250514",
       "max_tokens": 200,
       "messages": [
         {
           "role": "user",
           "content": "Generate personalized small talk in {{$('Detectar Idioma').json.detectedLanguage}} for this lead. Location: {{$('Validar IP').json.city}}, {{$('Validar IP').json.country_name}}. Company: {{$json.company}}. Persona: {{$('Processar DeepSeek').json.persona}}. Interest: {{$('Processar DeepSeek').json.interest}}. 2-3 sentences, 1-2 emojis max (🎬 🌐 ✨). Return JSON: {smallTalk: \"text\"}"
         }
       ]
     }
     ```

---

#### **NÓ 16: Processar Small Talk (Code)**

1. Clicar em **"+"** depois de "Gerar Small Talk"
2. Buscar: **"Code"**
3. Colar código:

```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const smallTalk = JSON.parse(cleanContent);
return { smallTalk: smallTalk.smallTalk };
```

---

#### **NÓ 17: Gerar Email (HTTP Request)**

1. Clicar em **"+"** depois de "Processar Small Talk"
2. Buscar: **"HTTP Request"**
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
     ```json
     {
       "model": "claude-sonnet-4-20250514",
       "max_tokens": 500,
       "messages": [
         {
           "role": "user",
           "content": "Create personalized email in {{$('Detectar Idioma').json.detectedLanguage}} for this lead. Name: {{$json.name}}. Company: {{$json.company}}. Interest: {{$('Processar DeepSeek').json.interest}}. Persona: {{$('Processar DeepSeek').json.persona}}. Small Talk: {{$('Processar Small Talk').json.smallTalk}}. Form: {{$json.formType}}. Project: {{$json.projectType}}. Budget: {{$json.budget}}. Description: {{$json.description}}. Tone: Friendly, creative, cinematic (2-3 emojis: 🎬 🌐 ✨). Structure: 1) Subject, 2) Greeting + small talk, 3) Brief Azimut intro, 4) Address their need, 5) Soft CTA, 6) Signature. Max 150 words. Return JSON: {subject: \"...\", body: \"...\"}"
         }
       ]
     }
     ```

---

#### **NÓ 18: Processar Email (Code)**

1. Clicar em **"+"** depois de "Gerar Email"
2. Buscar: **"Code"**
3. Colar código:

```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const email = JSON.parse(cleanContent);
return { subject: email.subject, body: email.body };
```

---

#### **NÓ 19: Enviar Email (HTTP Request)**

1. Clicar em **"+"** depois de "Processar Email"
2. Buscar: **"HTTP Request"**
3. Configurar:
   - **Method:** `POST`
   - **URL:** `https://api.resend.com/emails`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.RESEND_API_KEY}}`
   - **Headers:**
     - `Content-Type`: `application/json`
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

---

#### **NÓ 20: IF (Tem WhatsApp?)**

1. Clicar em **"+"** depois de "Enviar Email"
2. Buscar: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.phone}}` is not empty
   - **TRUE** → Enviar WhatsApp (se tiver configurado)
   - **FALSE** → Pular

---

#### **NÓ 21: Preparar leadIntelligence (Code)**

1. Clicar em **"+"** depois do IF (qualquer rota)
2. Buscar: **"Code"**
3. Colar código:

```javascript
const lead = $json;
const ipCheck = $('Validar IP').item.json || {};
const emailCheck = $('Validar Email').item.json || {};
const blacklist = $('Verificar Blacklist IP').item.json || {};
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
  realData: {
    trustedEmail: emailCheck.data?.result === 'deliverable',
    phoneValid: !!lead.phone,
    addressVerified: false
  },
  verifications: {
    ipCheck: {
      type: ipCheck.org || 'unknown',
      vpn: ipCheck.vpn || false,
      proxy: ipCheck.proxy || false,
      city: ipCheck.city || 'unknown',
      country: ipCheck.country_name || 'unknown'
    },
    emailCheck: {
      valid: emailCheck.data?.result === 'deliverable',
      disposable: emailCheck.data?.disposable || false,
      score: emailCheck.data?.score || 0
    },
    blacklisted: (blacklist.data?.abuseConfidenceScore || 0) > 75
  },
  enrichment: {
    linkedin: linkedin,
    googleResults: google.organic_results || [],
    socialMedia: {}
  },
  behavior: {
    detectedLanguage: language.detectedLanguage,
    textLength: language.textLength
  },
  decision: {
    action: analysis.classification === 'LEGITIMATE' ? 'SEND_EMAIL' : 'REJECT',
    reason: (analysis.positiveSignals || []).join(', '),
    emailSent: analysis.classification === 'LEGITIMATE',
    whatsappSent: !!lead.phone && analysis.classification === 'LEGITIMATE',
    sentAt: new Date().toISOString()
  },
  investigationHistory: [
    {
      timestamp: new Date().toISOString(),
      action: 'Full investigation completed',
      results: `Classification: ${analysis.classification}, Risk: ${analysis.riskScore}`
    }
  ]
};

return {
  leadIntelligence: leadIntelligence,
  leadId: lead.leadId
};
```

---

#### **NÓ 22: Salvar leadIntelligence (PostgreSQL)**

1. Clicar em **"+"** depois de "Preparar leadIntelligence"
2. Buscar: **"PostgreSQL"**
3. Configurar:
   - **Operation:** `Execute Query`
   - **Query:**
     ```sql
     UPDATE "Lead"
     SET "leadIntelligence" = $1::jsonb
     WHERE id = $2;
     ```
   - **Query Parameters:** `=[{{JSON.stringify($json.leadIntelligence)}}, {{$json.leadId}}]`

---

#### **NÓ 23: Responder Webhook**

1. Clicar em **"+"** depois de "Salvar leadIntelligence"
2. Buscar: **"Respond to Webhook"**
3. Selecionar: **"Respond to Webhook"**
4. Configurar:
   - **Respond With:** `JSON`
   - **Response Body:**
     ```json
     {
       "success": true,
       "leadId": "{{$json.leadId}}",
       "classification": "{{$('Processar DeepSeek').json.classification}}"
     }
     ```

---

## **🔗 CONECTAR OS NÓS:**

**Importante:** Conectar na ordem correta!

1. **Webhook** → **Switch**
2. **Switch** → **PostgreSQL**
3. **PostgreSQL** → **Code (Decisão)**
4. **Code** → **IF (Continuar?)**
5. **IF (TRUE)** → **Validar IP** + **Validar Email** (paralelo)
6. **Validar IP** → **Blacklist**
7. **Validar Email** → **LinkedIn**
8. **Blacklist** → **Google Search**
9. **LinkedIn** → **Google Search**
10. **Google Search** → **Detectar Idioma**
11. **Detectar Idioma** → **DeepSeek**
12. **DeepSeek** → **Processar DeepSeek**
13. **Processar DeepSeek** → **IF (É Legítimo?)**
14. **IF (TRUE)** → **Small Talk** → **Processar Small Talk** → **Gerar Email** → **Processar Email** → **Enviar Email**
15. **Enviar Email** → **IF (WhatsApp?)**
16. **IF** → **Preparar leadIntelligence**
17. **Preparar** → **Salvar PostgreSQL**
18. **Salvar** → **Responder Webhook**

---

## **✅ ATIVAR WORKFLOW:**

1. Clicar em **"Active"** (toggle no topo)
2. Workflow fica ativo e escutando webhooks

---

## **🧪 TESTAR:**

1. Clicar em **"Execute Workflow"** (botão play)
2. Inserir dados de teste:
   ```json
   {
     "leadId": "test-123",
     "name": "João Silva",
     "email": "joao@exemplo.com",
     "phone": "+5511999999999",
     "formType": "contact_form",
     "ip": "177.34.123.45"
   }
   ```
3. Ver se executa sem erros
4. Verificar se email foi enviado
5. Verificar se dados foram salvos no banco

---

## **📝 PRÓXIMOS PASSOS:**

1. ✅ Workflow criado
2. ✅ Testado com dados fake
3. ✅ Ajustar prompts da IA (se necessário)
4. ✅ Testar com lead real
5. ✅ Monitorar primeiros 10 leads

---

**Pronto! Agora você tem o workflow completo!** 🚀
