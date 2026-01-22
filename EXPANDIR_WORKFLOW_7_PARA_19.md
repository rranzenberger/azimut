# 🔧 EXPANDIR WORKFLOW DE 7 PARA 19 NÓS

## **📊 SITUAÇÃO ATUAL:**

Você tem um workflow com **7 nós**:
1. ✅ Webhook
2. ✅ Set
3. ✅ SerpAPI
4. ✅ Processar SerpAPI
5. ✅ Claude AI
6. ✅ Processar Claude
7. ✅ PostgreSQL

## **🎯 OBJETIVO:**

Expandir para **19 nós completos** do workflow "Captação Passiva - Lead Intelligence"

---

## **📋 NÓS QUE FALTAM ADICIONAR:**

### **FASE 1: Validação e Segurança (5 nós novos)**

1. ⚠️ **Switch** - Identificar Formulário
2. ⚠️ **PostgreSQL** - Verificar Lead Anterior (novo, diferente do atual)
3. ⚠️ **Code** - Decisão Lead Existente
4. ⚠️ **IF** - Continuar Investigação?
5. ⚠️ **HTTP Request** - Validar IP (ipapi.co)
6. ⚠️ **HTTP Request** - Verificar Blacklist IP (AbuseIPDB)
7. ⚠️ **HTTP Request** - Validar Email (Hunter.io) [opcional]

### **FASE 2: Análise Inteligente (3 nós novos)**

8. ⚠️ **Code** - Detectar Idioma
9. ⚠️ **HTTP Request** - Analisar com DeepSeek (substituir Claude atual)
10. ⚠️ **Code** - Processar DeepSeek
11. ⚠️ **IF** - É Legítimo?

### **FASE 3: Geração e Envio (4 nós novos)**

12. ⚠️ **HTTP Request** - Gerar Small Talk (Claude)
13. ⚠️ **Code** - Processar Small Talk
14. ⚠️ **HTTP Request** - Gerar Email (Claude) - modificar o atual
15. ⚠️ **Code** - Processar Email
16. ⚠️ **HTTP Request** - Enviar Email (Resend) - novo
17. ⚠️ **IF** - Tem WhatsApp?

### **FASE 4: Armazenamento (2 nós novos)**

18. ⚠️ **Code** - Preparar leadIntelligence
19. ⚠️ **PostgreSQL** - Salvar leadIntelligence (modificar o atual)
20. ⚠️ **Respond to Webhook** - novo

**Total: 12 nós novos + 7 existentes = 19 nós**

---

## **🚀 ESTRATÉGIA: 2 OPÇÕES**

### **OPÇÃO 1: Modificar Workflow Atual (Recomendado)**

Vamos modificar o workflow existente, adicionando os nós faltantes:

1. **Manter:** Webhook, Set, SerpAPI, Processar SerpAPI
2. **Adicionar:** Switch, PostgreSQL (verificar lead), Code (decisão), IF, Validar IP, etc.
3. **Substituir:** Claude AI atual → DeepSeek (análise) + Claude (gerar email)
4. **Adicionar:** Resend (enviar email), Preparar leadIntelligence, Salvar

---

### **OPÇÃO 2: Criar Novo Workflow do Zero**

Criar um workflow novo "Captação Passiva - Lead Intelligence" do zero, seguindo o guia `CRIAR_WORKFLOW_MANUAL_SIMPLES.md`.

---

## **💡 RECOMENDAÇÃO:**

**Vamos modificar o workflow atual!**

É mais rápido e você já tem alguns nós prontos. Vou te guiar passo a passo para adicionar os nós faltantes.

---

## **📝 PASSO A PASSO - ADICIONAR NÓS:**

### **PASSO 1: Adicionar Switch (Identificar Formulário)**

1. **Clique no "+" ANTES do nó "Set"** (ou depois do Webhook)
2. Busque: **"Switch"**
3. Selecione: **"Switch"**
4. Configurar:
   - **Mode:** `Rules`
   - **Value:** `={{$json.formType}}`
5. Adicionar Rules:
   - **Rule 1:** `{{$json.formType}}` equals `contact_form`
   - **Rule 2:** `{{$json.formType}}` equals `vancouver`
6. **Conectar:** Webhook → Switch → Set

**Nome:** `Identificar Formulário`

---

### **PASSO 2: Adicionar PostgreSQL (Verificar Lead Anterior)**

1. **Clique no "+" depois do "Set"**
2. Busque: **"PostgreSQL"**
3. Configurar:
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
4. **Conectar:** Set → PostgreSQL (Verificar Lead)

**Nome:** `Verificar Lead Anterior`

---

### **PASSO 3: Adicionar Code (Decisão Lead Existente)**

1. **Clique no "+" depois de "Verificar Lead Anterior"**
2. Busque: **"Code"**
3. Cole este código:

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

4. **Conectar:** Verificar Lead Anterior → Code (Decisão)

**Nome:** `Decisão Lead Existente`

---

### **PASSO 4: Adicionar IF (Continuar Investigação?)**

1. **Clique no "+" depois de "Decisão Lead Existente"**
2. Busque: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.skipInvestigation}}` equals `false`
   - **TRUE** → Continuar
   - **FALSE** → Parar
4. **Conectar:** Decisão → IF → SerpAPI (rota TRUE)

**Nome:** `Continuar Investigação?`

---

### **PASSO 5: Adicionar HTTP Request (Validar IP)**

1. **Clique no "+" depois do IF (rota TRUE, paralelo ao SerpAPI)**
2. Busque: **"HTTP Request"**
3. Configurar:
   - **Method:** `GET`
   - **URL:** `https://ipapi.co/{{$json.ip}}/json/`
   - **Authentication:** `None`
4. **Conectar:** IF (TRUE) → Validar IP

**Nome:** `Validar IP`

---

### **PASSO 6: Adicionar HTTP Request (Verificar Blacklist IP)**

1. **Clique no "+" depois de "Validar IP"**
2. Busque: **"HTTP Request"**
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
4. **Conectar:** Validar IP → Blacklist IP

**Nome:** `Verificar Blacklist IP`

---

### **PASSO 7: Adicionar Code (Detectar Idioma)**

1. **Clique no "+" depois de "Processar SerpAPI"**
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

4. **Conectar:** Processar SerpAPI → Detectar Idioma

**Nome:** `Detectar Idioma`

---

### **PASSO 8: Substituir Claude AI por DeepSeek (Análise)**

1. **Modifique o nó "Claude AI" atual:**
   - Renomeie para: `Analisar com DeepSeek`
   - **URL:** `https://api.deepseek.com/v1/chat/completions`
   - **Authentication:** `Header Auth`
   - **Name:** `Authorization`
   - **Value:** `Bearer {{$env.DEEPSEEK_API_KEY}}`
   - **Headers:**
     - `Content-Type`: `application/json`
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
           "content": "Analyze this lead and return JSON with: classification (LEGITIMATE|SUSPECT|SCAMMER|COMPETITOR), riskScore (0-100), persona (student|company|government|museum|other), interest (course|video|co-production|grants|exhibition|other), temperature (HOT|WARM|COLD), isStudent, isCompany, wantsCourse, wantsVideo, wantsCoProduction, wantsGrants, redFlags (array), positiveSignals (array). Lead: {{JSON.stringify($json)}}. IP: {{JSON.stringify($('Validar IP').json)}}. SerpAPI: {{JSON.stringify($('Processar SerpAPI').json)}}. Return ONLY JSON."
         }
       ],
       "temperature": 0.3,
       "max_tokens": 1000
     }
     ```

---

### **PASSO 9: Modificar "Processar Claude" para "Processar DeepSeek"**

1. **Renomeie:** "Processar Claude" → `Processar DeepSeek`
2. **Substitua o código:**

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

---

### **PASSO 10: Adicionar IF (É Legítimo?)**

1. **Clique no "+" depois de "Processar DeepSeek"**
2. Busque: **"IF"**
3. Configurar:
   - **Condition:** `{{$json.classification}}` equals `LEGITIMATE`
   - **TRUE** → Continuar (enviar email)
   - **FALSE** → Parar
4. **Conectar:** Processar DeepSeek → IF

**Nome:** `É Legítimo?`

---

### **PASSO 11: Adicionar HTTP Request (Claude - Gerar Small Talk)**

1. **Clique no "+" depois do IF (rota TRUE)**
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
       "max_tokens": 200,
       "messages": [
         {
           "role": "user",
           "content": "Generate personalized small talk in {{$('Detectar Idioma').json.detectedLanguage}} for this lead. Location: {{$('Validar IP').json.city}}, {{$('Validar IP').json.country_name}}. Company: {{$json.company}}. Persona: {{$('Processar DeepSeek').json.persona}}. Interest: {{$('Processar DeepSeek').json.interest}}. 2-3 sentences, 1-2 emojis max (🎬 🌐 ✨). Return JSON: {smallTalk: \"text\"}"
         }
       ]
     }
     ```

**Nome:** `Gerar Small Talk`

---

### **PASSO 12: Adicionar Code (Processar Small Talk)**

1. **Clique no "+" depois de "Gerar Small Talk"**
2. Busque: **"Code"**
3. Cole este código:

```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const smallTalk = JSON.parse(cleanContent);
return { smallTalk: smallTalk.smallTalk };
```

**Nome:** `Processar Small Talk`

---

### **PASSO 13: Adicionar HTTP Request (Claude - Gerar Email)**

1. **Clique no "+" depois de "Processar Small Talk"**
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
           "content": "Create personalized email in {{$('Detectar Idioma').json.detectedLanguage}} for this lead. Name: {{$json.name}}. Company: {{$json.company}}. Interest: {{$('Processar DeepSeek').json.interest}}. Persona: {{$('Processar DeepSeek').json.persona}}. Small Talk: {{$('Processar Small Talk').json.smallTalk}}. Form: {{$json.formType}}. Description: {{$json.description}}. Tone: Friendly, creative, cinematic (2-3 emojis: 🎬 🌐 ✨). Max 150 words. Return JSON: {subject: \"...\", body: \"...\"}"
         }
       ]
     }
     ```

**Nome:** `Gerar Email`

---

### **PASSO 14: Adicionar Code (Processar Email)**

1. **Clique no "+" depois de "Gerar Email"**
2. Busque: **"Code"**
3. Cole este código:

```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const email = JSON.parse(cleanContent);
return { subject: email.subject, body: email.body };
```

**Nome:** `Processar Email`

---

### **PASSO 15: Adicionar HTTP Request (Resend - Enviar Email)**

1. **Clique no "+" depois de "Processar Email"**
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

**Nome:** `Enviar Email`

---

### **PASSO 16: Adicionar Code (Preparar leadIntelligence)**

1. **Clique no "+" depois de "Enviar Email"**
2. Busque: **"Code"**
3. Cole este código:

```javascript
const lead = $json;
const ipCheck = $('Validar IP').item.json || {};
const analysis = $('Processar DeepSeek').item.json;
const language = $('Detectar Idioma').item.json;
const serpapi = $('Processar SerpAPI').item.json || {};

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
  enrichment: {
    serpapi: serpapi
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

**Nome:** `Preparar leadIntelligence`

---

### **PASSO 17: Modificar PostgreSQL (Salvar leadIntelligence)**

1. **Modifique o nó PostgreSQL atual:**
   - Renomeie para: `Salvar leadIntelligence`
   - **Query:**
     ```sql
     UPDATE "Lead"
     SET "leadIntelligence" = $1::jsonb
     WHERE id = $2;
     ```
   - **Query Parameters:** `=[{{JSON.stringify($json.leadIntelligence)}}, {{$json.leadId}}]`

---

### **PASSO 18: Adicionar Respond to Webhook**

1. **Clique no "+" depois de "Salvar leadIntelligence"**
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

**Nome:** `Responder Webhook`

---

## **🔗 CONECTAR TUDO:**

**Ordem final:**
1. Webhook → Switch → Set
2. Set → Verificar Lead Anterior
3. Verificar Lead Anterior → Decisão Lead Existente
4. Decisão → IF (Continuar?)
5. IF (TRUE) → Validar IP + SerpAPI (paralelo)
6. Validar IP → Blacklist IP
7. SerpAPI → Processar SerpAPI
8. Processar SerpAPI → Detectar Idioma
9. Detectar Idioma → DeepSeek
10. DeepSeek → Processar DeepSeek
11. Processar DeepSeek → IF (É Legítimo?)
12. IF (TRUE) → Small Talk → Processar Small Talk → Gerar Email → Processar Email → Enviar Email
13. Enviar Email → Preparar leadIntelligence
14. Preparar → Salvar leadIntelligence
15. Salvar → Responder Webhook

---

## **✅ RESULTADO FINAL:**

**19 nós completos:**
1. Webhook
2. Switch
3. Set
4. PostgreSQL (Verificar Lead)
5. Code (Decisão)
6. IF (Continuar?)
7. HTTP Request (Validar IP)
8. HTTP Request (Blacklist)
9. HTTP Request (SerpAPI)
10. Code (Processar SerpAPI)
11. Code (Detectar Idioma)
12. HTTP Request (DeepSeek)
13. Code (Processar DeepSeek)
14. IF (É Legítimo?)
15. HTTP Request (Small Talk)
16. Code (Processar Small Talk)
17. HTTP Request (Gerar Email)
18. Code (Processar Email)
19. HTTP Request (Enviar Email)
20. Code (Preparar leadIntelligence)
21. PostgreSQL (Salvar)
22. Respond to Webhook

**Total: 22 nós (19 principais + 3 auxiliares)**

---

**Pronto! Agora você tem o workflow completo!** 🚀

**Me avise se tiver dúvida em algum passo!**
