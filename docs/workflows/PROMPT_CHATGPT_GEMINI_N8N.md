# 🤖 PROMPT PARA CHATGPT/GEMINI - CRIAR WORKFLOW N8N COMPLETO

## **📋 COMO USAR:**

1. Copie o texto abaixo
2. Cole no ChatGPT ou Gemini
3. Peça para o modelo criar a estrutura completa do workflow
4. O modelo vai te guiar passo a passo

---

## **🎯 PROMPT PRINCIPAL (COPIAR E COLAR):**

```
Preciso criar um workflow completo no N8N (versão 2.4.4) para "Captação Passiva - Lead Intelligence". 

O workflow deve ter 19 nós e fazer o seguinte:

1. Receber dados de lead via Webhook (POST)
2. Verificar se já existe lead anterior no PostgreSQL
3. Validar IP, email, verificar blacklist
4. Buscar informações no LinkedIn e Google (opcional)
5. Detectar idioma do texto
6. Analisar lead com DeepSeek AI (classificação, risco, persona)
7. Se legítimo: gerar small talk e email personalizado com Claude AI
8. Enviar email via Resend
9. Opcionalmente enviar WhatsApp
10. Salvar todos os dados de inteligência no PostgreSQL

Estrutura completa de 19 nós:
1. Webhook - Receber Lead
2. Switch - Identificar Formulário (contact_form ou vancouver)
3. PostgreSQL - Verificar Lead Anterior
4. Code - Decisão Lead Existente
5. IF - Continuar Investigação?
6. HTTP Request - Validar IP (ipapi.co)
7. HTTP Request - Verificar Blacklist IP (AbuseIPDB)
8. HTTP Request - Validar Email (Hunter.io - opcional)
9. HTTP Request - Buscar LinkedIn (Proxycurl - opcional)
10. HTTP Request - Google Search (SerpAPI)
11. Code - Detectar Idioma
12. HTTP Request - Analisar com DeepSeek
13. Code - Processar DeepSeek
14. IF - É Legítimo?
15. HTTP Request - Gerar Small Talk (Claude)
16. Code - Processar Small Talk
17. HTTP Request - Gerar Email (Claude)
18. Code - Processar Email
19. HTTP Request - Enviar Email (Resend)
20. IF - Tem WhatsApp?
21. HTTP Request - Enviar WhatsApp (opcional)
22. Code - Preparar leadIntelligence
23. PostgreSQL - Salvar leadIntelligence
24. Respond to Webhook

Por favor, me forneça:
1. Lista completa de todos os 19-24 nós com configurações detalhadas
2. Código JavaScript para cada nó Code
3. Configurações completas de cada HTTP Request (URL, headers, body)
4. Queries SQL para PostgreSQL
5. Ordem de conexão entre os nós
6. Variáveis de ambiente necessárias
7. Exemplo de dados de entrada (JSON do webhook)
8. Exemplo de dados de saída (leadIntelligence JSONB)

IMPORTANTE:
- N8N versão 2.4.4 (não usar optional chaining ?.)
- Todos os nós devem ter nomes descritivos
- APIs opcionais devem ter fallback
- Código JavaScript compatível com Node.js antigo
- SQL queries para PostgreSQL/Neon
```

---

## **📝 DETALHES ADICIONAIS PARA O MODELO:**

### **Dados de Entrada (Webhook):**

```json
{
  "leadId": "uuid-do-lead",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+5511999999999",
  "company": "Empresa XYZ",
  "position": "Diretor",
  "formType": "contact_form",
  "projectType": "video",
  "budget": "50000-100000",
  "timeline": "3-6 meses",
  "description": "Queremos criar um vídeo documental",
  "organizationType": "company",
  "interestInGrants": false,
  "country": "Brasil",
  "city": "São Paulo",
  "ip": "177.34.123.45",
  "userAgent": "Mozilla/5.0...",
  "sourceUrl": "https://azmt.com.br/contato",
  "lang": "pt"
}
```

### **Estrutura do leadIntelligence (JSONB):**

```json
{
  "classification": "LEGITIMATE|SUSPECT|SCAMMER|COMPETITOR",
  "riskScore": 0-100,
  "persona": "student|company|government|museum|other",
  "interest": "course|video|co-production|grants|exhibition|other",
  "temperature": "HOT|WARM|COLD",
  "isStudent": true/false,
  "isCompany": true/false,
  "isGovernment": true/false,
  "wantsCourse": true/false,
  "wantsVideo": true/false,
  "wantsCoProduction": true/false,
  "wantsGrants": true/false,
  "redFlags": ["array", "de", "strings"],
  "positiveSignals": ["array", "de", "strings"],
  "verifications": {
    "ipCheck": {
      "city": "São Paulo",
      "country": "Brazil",
      "vpn": false,
      "proxy": false
    },
    "emailCheck": {
      "valid": true,
      "disposable": false,
      "score": 100
    },
    "blacklisted": false
  },
  "enrichment": {
    "linkedin": {},
    "googleResults": [],
    "socialMedia": {}
  },
  "behavior": {
    "detectedLanguage": "pt",
    "textLength": 150
  },
  "decision": {
    "action": "SEND_EMAIL",
    "emailSent": true,
    "whatsappSent": false,
    "sentAt": "2026-01-20T12:00:00.000Z"
  }
}
```

### **Variáveis de Ambiente Necessárias:**

```
DEEPSEEK_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
HUNTER_API_KEY=... (opcional)
PROXYCURL_API_KEY=... (opcional)
SERPAPI_KEY=... (opcional)
ABUSEIPDB_API_KEY=... (opcional)
WHATSAPP_PHONE_ID=... (opcional)
WHATSAPP_ACCESS_TOKEN=... (opcional)
```

### **APIs e Endpoints:**

1. **ipapi.co** (grátis)
   - GET `https://ipapi.co/{ip}/json/`
   - Sem autenticação

2. **AbuseIPDB** (grátis)
   - GET `https://api.abuseipdb.com/api/v2/check`
   - Header: `Key: {API_KEY}`
   - Query: `ipAddress`, `maxAgeInDays=90`

3. **Hunter.io** (pago)
   - GET `https://api.hunter.io/v2/email-verifier`
   - Header: `Authorization: Bearer {API_KEY}`
   - Query: `email`

4. **Proxycurl** (pago)
   - GET `https://nubela.co/proxycurl/api/v2/linkedin`
   - Header: `Authorization: Bearer {API_KEY}`
   - Query: `url` ou `name` + `company`

5. **SerpAPI** (pago)
   - GET `https://serpapi.com/search`
   - Query: `q`, `num=10`, `hl=pt`

6. **DeepSeek** (grátis)
   - POST `https://api.deepseek.com/v1/chat/completions`
   - Header: `Authorization: Bearer {API_KEY}`
   - Body: JSON com `model: "deepseek-chat"`, `messages`, `temperature: 0.3`

7. **Claude** (pago)
   - POST `https://api.anthropic.com/v1/messages`
   - Header: `x-api-key: {API_KEY}`, `anthropic-version: 2023-06-01`
   - Body: JSON com `model: "claude-sonnet-4-20250514"`, `messages`, `max_tokens`

8. **Resend** (pago)
   - POST `https://api.resend.com/emails`
   - Header: `Authorization: Bearer {API_KEY}`
   - Body: JSON com `from`, `to`, `subject`, `text`

9. **WhatsApp Business API** (pago)
   - POST `https://graph.facebook.com/v18.0/{PHONE_ID}/messages`
   - Header: `Authorization: Bearer {ACCESS_TOKEN}`
   - Body: JSON com `messaging_product`, `to`, `type`, `text`

---

## **🔧 CONFIGURAÇÕES ESPECÍFICAS POR NÓ:**

### **Nó 1: Webhook**
- Path: `lead-intelligence`
- Method: `POST`
- Response Mode: `Respond When Last Node Finishes`

### **Nó 2: Switch**
- Mode: Rules
- Value: `{{$json.formType}}`
- Rules:
  - `contact_form` → Output 1
  - `vancouver` → Output 2
  - Default → Output 1

### **Nó 3: PostgreSQL - Verificar Lead Anterior**
```sql
SELECT id, name, email, phone, "createdAt", 
       "leadIntelligence"->>'classification' as classification,
       "leadIntelligence"->>'riskScore' as risk_score
FROM "Lead"
WHERE email = $1 OR phone = $2
ORDER BY "createdAt" DESC
LIMIT 1;
```
- Parameters: `{{[$json.email, $json.phone]}}`

### **Nó 4: Code - Decisão Lead Existente**
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

### **Nó 5: IF - Continuar Investigação?**
- Condition: `{{$json.skipInvestigation}}` equals `false`
- TRUE → Continuar
- FALSE → Parar (conectar ao Respond to Webhook)

### **Nó 6: HTTP Request - Validar IP**
- Method: `GET`
- URL: `https://ipapi.co/{{$json.ip}}/json/`
- Authentication: None

### **Nó 7: HTTP Request - Verificar Blacklist IP**
- Method: `GET`
- URL: `https://api.abuseipdb.com/api/v2/check`
- Headers: `Key: {{$env.ABUSEIPDB_API_KEY}}`
- Query Parameters:
  - `ipAddress`: `{{$json.ip}}`
  - `maxAgeInDays`: `90`
  - `verbose`: `true`

### **Nó 8: HTTP Request - Validar Email (Opcional)**
- Method: `GET`
- URL: `https://api.hunter.io/v2/email-verifier`
- Headers: `Authorization: Bearer {{$env.HUNTER_API_KEY}}`
- Query Parameters: `email`: `{{$json.email}}`
- **Nota:** Se não tiver API key, pode pular este nó

### **Nó 9: HTTP Request - Buscar LinkedIn (Opcional)**
- Method: `GET`
- URL: `https://nubela.co/proxycurl/api/v2/linkedin`
- Headers: `Authorization: Bearer {{$env.PROXYCURL_API_KEY}}`
- Query Parameters: `url`: `{{$json.linkedin_url}}` (se tiver)
- **Nota:** Se não tiver API key, pode pular este nó

### **Nó 10: HTTP Request - Google Search**
- Method: `GET`
- URL: `https://serpapi.com/search`
- Headers: `Authorization: Bearer {{$env.SERPAPI_KEY}}`
- Query Parameters:
  - `q`: `{{$json.name}} {{$json.company}} {{$json.email}}`
  - `num`: `10`
  - `hl`: `pt`

### **Nó 11: Code - Detectar Idioma**
```javascript
const text = $input.item.json.description || 
             $input.item.json.message || 
             $input.item.json.comments || '';

const ptWords = ['quero', 'gostaria', 'preciso', 'interesse', 'projeto', 'obrigado'];
const enWords = ['want', 'would', 'need', 'interest', 'project', 'thank'];
const esWords = ['quiero', 'necesito', 'interés', 'proyecto', 'gracias'];

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

### **Nó 12: HTTP Request - Analisar com DeepSeek**
- Method: `POST`
- URL: `https://api.deepseek.com/v1/chat/completions`
- Headers:
  - `Authorization: Bearer {{$env.DEEPSEEK_API_KEY}}`
  - `Content-Type: application/json`
- Body (JSON):
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

### **Nó 13: Code - Processar DeepSeek**
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

### **Nó 14: IF - É Legítimo?**
- Condition: `{{$json.classification}}` equals `LEGITIMATE`
- TRUE → Continuar (gerar email)
- FALSE → Parar (salvar como rejeitado, mas não enviar email)

### **Nó 15: HTTP Request - Gerar Small Talk**
- Method: `POST`
- URL: `https://api.anthropic.com/v1/messages`
- Headers:
  - `x-api-key: {{$env.CLAUDE_API_KEY}}`
  - `anthropic-version: 2023-06-01`
  - `Content-Type: application/json`
- Body (JSON):
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

### **Nó 16: Code - Processar Small Talk**
```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const smallTalk = JSON.parse(cleanContent);
return { smallTalk: smallTalk.smallTalk };
```

### **Nó 17: HTTP Request - Gerar Email**
- Method: `POST`
- URL: `https://api.anthropic.com/v1/messages`
- Headers:
  - `x-api-key: {{$env.CLAUDE_API_KEY}}`
  - `anthropic-version: 2023-06-01`
  - `Content-Type: application/json`
- Body (JSON):
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

### **Nó 18: Code - Processar Email**
```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const email = JSON.parse(cleanContent);
return { subject: email.subject, body: email.body };
```

### **Nó 19: HTTP Request - Enviar Email (Resend)**
- Method: `POST`
- URL: `https://api.resend.com/emails`
- Headers:
  - `Authorization: Bearer {{$env.RESEND_API_KEY}}`
  - `Content-Type: application/json`
- Body (JSON):
```json
{
  "from": "Ranz <ranz@azmt.com.br>",
  "to": ["{{$json.email}}"],
  "subject": "{{$('Processar Email').json.subject}}",
  "text": "{{$('Processar Email').json.body}}",
  "reply_to": "ranz@azmt.com.br"
}
```

### **Nó 20: IF - Tem WhatsApp?**
- Condition: `{{$json.phone}}` is not empty AND `{{$json.phone}}` is not null
- TRUE → Enviar WhatsApp
- FALSE → Pular

### **Nó 21: HTTP Request - Enviar WhatsApp (Opcional)**
- Method: `POST`
- URL: `https://graph.facebook.com/v18.0/{{$env.WHATSAPP_PHONE_ID}}/messages`
- Headers:
  - `Authorization: Bearer {{$env.WHATSAPP_ACCESS_TOKEN}}`
  - `Content-Type: application/json`
- Body (JSON):
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

### **Nó 22: Code - Preparar leadIntelligence**
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

### **Nó 23: PostgreSQL - Salvar leadIntelligence**
```sql
UPDATE "Lead"
SET "leadIntelligence" = $1::jsonb
WHERE id = $2;
```
- Parameters: `[{{JSON.stringify($json.leadIntelligence)}}, {{$json.leadId}}]`

### **Nó 24: Respond to Webhook**
- Respond With: `JSON`
- Response Body:
```json
{
  "success": true,
  "leadId": "{{$json.leadId}}",
  "classification": "{{$('Processar DeepSeek').json.classification}}",
  "emailSent": {{$('Processar DeepSeek').json.classification === 'LEGITIMATE'}},
  "whatsappSent": {{$json.phone && $('Processar DeepSeek').json.classification === 'LEGITIMATE'}}
}
}
```

---

## **🔗 ORDEM DE CONEXÃO DOS NÓS:**

1. Webhook → Switch
2. Switch (Output 1) → PostgreSQL (Verificar Lead Anterior)
3. Switch (Output 2) → PostgreSQL (Verificar Lead Anterior)
4. PostgreSQL → Code (Decisão Lead Existente)
5. Code → IF (Continuar Investigação?)
6. IF (TRUE) → HTTP Request (Validar IP)
7. Validar IP → HTTP Request (Verificar Blacklist IP)
8. Verificar Blacklist IP → HTTP Request (Validar Email) [ou pular se não tiver API]
9. Validar Email → HTTP Request (Buscar LinkedIn) [ou pular se não tiver API]
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
27. IF (É Legítimo? FALSE) → Code (Preparar leadIntelligence) [para salvar mesmo rejeitado]

---

## **✅ CHECKLIST FINAL:**

- [ ] Todos os 19-24 nós criados
- [ ] Todas as conexões configuradas
- [ ] Variáveis de ambiente configuradas no N8N
- [ ] Credenciais PostgreSQL configuradas
- [ ] Webhook ativado e URL copiada
- [ ] Workflow testado com dados de exemplo
- [ ] Código JavaScript sem optional chaining (?.)
- [ ] Todos os nós com nomes descritivos
- [ ] Tratamento de erros para APIs opcionais

---

**Agora copie o prompt principal acima e cole no ChatGPT ou Gemini!** 🚀
