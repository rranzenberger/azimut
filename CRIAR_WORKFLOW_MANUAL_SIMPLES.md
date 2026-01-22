# 🛠️ CRIAR WORKFLOW MANUALMENTE - GUIA SIMPLES

## **✅ VANTAGENS:**
- ✅ Sempre funciona (não depende de versão)
- ✅ Você entende cada nó
- ✅ Pode ajustar conforme necessário
- ✅ Evita problemas de importação

**Tempo estimado:** 30-40 minutos

---

## **📋 ESTRUTURA SIMPLIFICADA (10 NÓS ESSENCIAIS):**

Vamos começar com uma versão simplificada e depois expandir:

1. **Webhook** - Recebe lead
2. **PostgreSQL** - Verifica lead anterior
3. **Code** - Decisão
4. **HTTP Request** - Validar IP
5. **Code** - Detectar idioma
6. **HTTP Request** - DeepSeek (análise)
7. **Code** - Processar DeepSeek
8. **IF** - É legítimo?
9. **HTTP Request** - Claude (gerar email)
10. **HTTP Request** - Resend (enviar email)
11. **PostgreSQL** - Salvar leadIntelligence

**Total: 11 nós (versão simplificada)**

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
6. **Copie a URL** que aparece

**Nome do nó:** `Receber Lead`

---

### **PASSO 3: Nó 2 - PostgreSQL (Verificar Lead Anterior)**

1. Clique no **"+"** depois do Webhook
2. Busque: **"PostgreSQL"**
3. Selecione: **"PostgreSQL"**
4. Configurar:
   - **Operation:** `Execute Query`
   - **Query:**
     ```sql
     SELECT id, name, email, phone, "createdAt", 
            "leadIntelligence"->>'classification' as classification
     FROM "Lead"
     WHERE email = $1 OR phone = $2
     ORDER BY "createdAt" DESC
     LIMIT 1;
     ```
   - **Query Parameters:** `={{[$json.email, $json.phone]}}`
5. **Credentials:** Selecione ou crie credencial PostgreSQL

**Nome do nó:** `Verificar Lead Anterior`

---

### **PASSO 4: Nó 3 - Code (Decisão)**

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
    decision: 'REJECT',
    skipInvestigation: true
  };
}

return {
  isNewLead: false,
  decision: 'CONTINUE',
  skipInvestigation: false
};
```

**Nome do nó:** `Decisão Lead Existente`

---

### **PASSO 5: Nó 4 - IF (Continuar?)**

1. Clique no **"+"** depois do Code
2. Busque: **"IF"**
3. Selecione: **"IF"**
4. Configurar:
   - **Condition:** `{{$json.skipInvestigation}}` equals `false`
   - **TRUE** → Continuar investigação
   - **FALSE** → Parar

**Nome do nó:** `Continuar Investigação?`

---

### **PASSO 6: Nó 5 - HTTP Request (Validar IP)**

1. Clique no **"+"** depois do IF (rota TRUE)
2. Busque: **"HTTP Request"**
3. Selecione: **"HTTP Request"**
4. Configurar:
   - **Method:** `GET`
   - **URL:** `https://ipapi.co/{{$json.ip}}/json/`
   - **Authentication:** `None`

**Nome do nó:** `Validar IP`

---

### **PASSO 7: Nó 6 - Code (Detectar Idioma)**

1. Clique no **"+"** depois de "Validar IP"
2. Busque: **"Code"**
3. Cole este código:

```javascript
const text = $input.item.json.description || 
             $input.item.json.message || 
             $input.item.json.comments || '';

const ptWords = ['quero', 'gostaria', 'preciso', 'interesse', 'projeto'];
const enWords = ['want', 'would', 'need', 'interest', 'project'];
const esWords = ['quiero', 'necesito', 'interés', 'proyecto'];

const ptCount = ptWords.filter(w => text.toLowerCase().includes(w)).length;
const enCount = enWords.filter(w => text.toLowerCase().includes(w)).length;
const esCount = esWords.filter(w => text.toLowerCase().includes(w)).length;

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

### **PASSO 8: Nó 7 - HTTP Request (DeepSeek)**

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
             "content": "You are an expert at analyzing sales leads. Return ONLY valid JSON, no markdown."
           },
           {
             "role": "user",
             "content": "Analyze this lead and return JSON with: classification (LEGITIMATE|SUSPECT|SCAMMER|COMPETITOR), riskScore (0-100), persona (student|company|government|museum|other), interest (course|video|co-production|grants|exhibition|other), temperature (HOT|WARM|COLD), isStudent, isCompany, wantsCourse, wantsVideo, wantsCoProduction, wantsGrants, redFlags (array), positiveSignals (array). Lead: {{JSON.stringify($json)}}. IP: {{JSON.stringify($('Validar IP').json)}}. Return ONLY JSON."
           }
         ],
         "temperature": 0.3,
         "max_tokens": 1000
       }
       ```

**Nome do nó:** `Analisar com DeepSeek`

---

### **PASSO 9: Nó 8 - Code (Processar DeepSeek)**

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

### **PASSO 10: Nó 9 - IF (É Legítimo?)**

1. Clique no **"+"** depois de "Processar DeepSeek"
2. Busque: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.classification}}` equals `LEGITIMATE`
   - **TRUE** → Continuar (enviar email)
   - **FALSE** → Parar (não enviar)

**Nome do nó:** `É Legítimo?`

---

### **PASSO 11: Nó 10 - HTTP Request (Claude - Gerar Email)**

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
     ```json
     {
       "model": "claude-sonnet-4-20250514",
       "max_tokens": 500,
       "messages": [
         {
           "role": "user",
           "content": "Create personalized email in {{$('Detectar Idioma').json.detectedLanguage}} for this lead. Name: {{$json.name}}. Company: {{$json.company}}. Interest: {{$('Processar DeepSeek').json.interest}}. Persona: {{$('Processar DeepSeek').json.persona}}. Form: {{$json.formType}}. Description: {{$json.description}}. Tone: Friendly, creative, cinematic (2-3 emojis: 🎬 🌐 ✨). Max 150 words. Return JSON: {subject: \"...\", body: \"...\"}"
         }
       ]
     }
     ```

**Nome do nó:** `Gerar Email`

---

### **PASSO 12: Nó 11 - Code (Processar Email)**

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

### **PASSO 13: Nó 12 - HTTP Request (Resend - Enviar Email)**

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

### **PASSO 14: Nó 13 - Code (Preparar leadIntelligence)**

1. Clique no **"+"** depois de "Enviar Email"
2. Busque: **"Code"**
3. Cole este código:

```javascript
const lead = $json;
const ipCheck = $('Validar IP').item.json || {};
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
      vpn: ipCheck.vpn || false
    }
  },
  behavior: {
    detectedLanguage: language.detectedLanguage
  },
  decision: {
    action: analysis.classification === 'LEGITIMATE' ? 'SEND_EMAIL' : 'REJECT',
    emailSent: analysis.classification === 'LEGITIMATE',
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

### **PASSO 15: Nó 14 - PostgreSQL (Salvar)**

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

### **PASSO 16: Nó 15 - Respond to Webhook**

1. Clique no **"+"** depois de "Salvar leadIntelligence"
2. Busque: **"Respond to Webhook"**
3. Configurar:
   - **Respond With:** `JSON`
   - **Response Body:**
     ```json
     {
       "success": true,
       "leadId": "{{$json.leadId}}",
       "classification": "{{$('Processar DeepSeek').json.classification}}"
     }
     ```

**Nome do nó:** `Responder Webhook`

---

## **🔗 CONECTAR OS NÓS:**

Conecte na ordem:
1. Webhook → PostgreSQL
2. PostgreSQL → Code (Decisão)
3. Code → IF (Continuar?)
4. IF (TRUE) → Validar IP
5. Validar IP → Detectar Idioma
6. Detectar Idioma → DeepSeek
7. DeepSeek → Processar DeepSeek
8. Processar DeepSeek → IF (É Legítimo?)
9. IF (TRUE) → Gerar Email
10. Gerar Email → Processar Email
11. Processar Email → Enviar Email
12. Enviar Email → Preparar leadIntelligence
13. Preparar → Salvar PostgreSQL
14. Salvar → Responder Webhook

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
  "formType": "contact_form",
  "ip": "177.34.123.45",
  "description": "Queremos criar uma exposição"
}
```

3. Clique em **"Execute Workflow"**
4. Veja se executa sem erros

---

**Pronto! Workflow criado manualmente!** 🚀

**Se tiver dúvida em algum passo, me avise!**
