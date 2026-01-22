# 🎯 N8N WORKFLOW - PASSO A PASSO COMPLETO

## **📋 COMO FUNCIONA N8N:**

### **Conceitos Básicos:**

**1. TRIGGER (Gatilho):**
- Inicia o workflow
- Exemplos: Webhook, Schedule, Manual
- **No nosso caso:** Webhook (recebe dados do backoffice)

**2. NODES (Nós):**
- Cada "caixa" no workflow é um nó
- Processa dados e passa para o próximo
- Tipos: HTTP Request, Code, IF, PostgreSQL, etc.

**3. CONNECTIONS (Conexões):**
- Setas que ligam os nós
- Dados fluem de um nó para outro

**4. DATA FLOW (Fluxo de Dados):**
```
Nó 1 → Nó 2 → Nó 3 → ...
```
Cada nó recebe dados do anterior e passa para o próximo.

---

## **🔧 TIPOS DE NÓS QUE VAMOS USAR:**

### **1. WEBHOOK (Trigger)**
**O que faz:** Recebe dados de fora (backoffice)  
**Como funciona:** Fica "escutando" uma URL, quando recebe POST, inicia workflow  
**Dados recebidos:** JSON com dados do lead

---

### **2. SWITCH (Roteador)**
**O que faz:** Divide o fluxo em múltiplas rotas  
**Como funciona:** Verifica um campo e escolhe qual rota seguir  
**Exemplo:** Se `formType == "contact_form"` → Rota A, se `== "vancouver"` → Rota B

---

### **3. CODE (JavaScript)**
**O que faz:** Executa código JavaScript customizado  
**Como funciona:** Você escreve código que processa dados  
**Exemplo:** Detectar idioma, transformar dados, fazer cálculos

---

### **4. HTTP REQUEST (Buscador)**
**O que faz:** Chama APIs externas  
**Como funciona:** Faz requisição HTTP (GET/POST) para uma API  
**Exemplo:** Buscar dados no LinkedIn, validar email, pesquisar no Google

---

### **5. IF (Validador)**
**O que faz:** Toma decisões (sim/não)  
**Como funciona:** Verifica uma condição, se TRUE vai por um caminho, se FALSE por outro  
**Exemplo:** Se `classification == "LEGITIMATE"` → Enviar email, senão → Rejeitar

---

### **6. POSTGRESQL (Banco de Dados)**
**O que faz:** Salva ou busca dados no banco  
**Como funciona:** Executa queries SQL  
**Exemplo:** Buscar lead anterior, salvar `leadIntelligence`

---

### **7. SET (Modificador)**
**O que faz:** Modifica ou adiciona campos nos dados  
**Como funciona:** Define valores para campos específicos  
**Exemplo:** Adicionar `isNewLead: true`

---

### **8. MERGE (Combinador)**
**O que faz:** Combina dados de múltiplos nós  
**Como funciona:** Junta resultados de várias APIs em um único objeto  
**Exemplo:** Combinar dados de IP + Email + LinkedIn

---

## **🤖 IA NO N8N:**

### **DeepSeek (Análise):**
**Tipo:** HTTP Request → `https://api.deepseek.com/v1/chat/completions`  
**O que faz:** Analisa dados e classifica lead  
**Retorna:** JSON com classification, riskScore, persona, interest, etc.

### **Claude (Geração de Texto):**
**Tipo:** HTTP Request → `https://api.anthropic.com/v1/messages`  
**O que faz:** Gera emails personalizados, small talk  
**Retorna:** JSON com subject e body do email

---

## **📊 WORKFLOW COMPLETO - EXPLICAÇÃO NÓ A NÓ:**

### **NÓ 1: Webhook (Trigger)**

**Tipo:** Webhook  
**Nome:** "Receber Lead"

**Configuração:**
- **Path:** `lead-intelligence`
- **Method:** POST
- **Response Mode:** Respond When Last Node Finishes

**O que recebe:**
```json
{
  "leadId": "abc123",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+5511999999999",
  "formType": "contact_form",
  "ip": "177.34.123.45",
  ...
}
```

**Como funciona:**
1. Backoffice faz POST para: `https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence`
2. N8N recebe os dados
3. Workflow inicia automaticamente
4. Dados ficam disponíveis em `{{$json}}`

**Explicação:** Este é o **TRIGGER** - quando alguém preenche formulário, backoffice chama esta URL e o workflow começa!

---

### **NÓ 2: Identificar Formulário**

**Tipo:** Switch  
**Nome:** "Identificar Formulário"

**Configuração:**
- **Mode:** Rules
- **Value:** `{{$json.formType}}`

**Rules:**
1. **Rule 1:**
   - Condition: `{{$json.formType}}` equals `contact_form`
   - Output: "Formulário Geral"
   
2. **Rule 2:**
   - Condition: `{{$json.formType}}` equals `vancouver`
   - Output: "Formulário Vancouver"

3. **Fallback:**
   - Output: "Formulário Geral"

**Como funciona:**
- Verifica qual formulário foi preenchido
- Divide em 2 rotas diferentes (mas depois se juntam)
- Permite personalizar tratamento por tipo

**Explicação:** **SWITCH** divide o fluxo - se for formulário geral, pode fazer uma coisa, se for Vancouver, outra. Depois se juntam novamente.

---

### **NÓ 3: Verificar Lead Anterior**

**Tipo:** PostgreSQL  
**Nome:** "Verificar Lead Anterior"

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

**Query Parameters:**
- `$1`: `{{$json.email}}`
- `$2`: `{{$json.phone}}`

**Como funciona:**
1. Busca no banco se já existe lead com mesmo email ou telefone
2. Se encontrar → retorna dados do lead anterior
3. Se não encontrar → retorna vazio

**Resultado:**
- Se encontrou: `{id: "...", classification: "LEGITIMATE", ...}`
- Se não encontrou: `{}` (vazio)

**Explicação:** **POSTGRESQL** busca no banco - queremos saber se essa pessoa já entrou em contato antes. Se sim, pode ser follow-up, não investigação nova.

---

### **NÓ 4A: Lead Existente (Decisão)**

**Tipo:** Code (JavaScript)  
**Nome:** "Decisão Lead Existente"

**Código:**
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
    skipInvestigation: false // Ainda investigar (pode ter mudado)
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

**Como funciona:**
1. Verifica se encontrou lead anterior
2. Se foi SCAMMER antes → Rejeita (não investiga mais)
3. Se foi LEGITIMATE antes → Pode ser follow-up (mas ainda investiga)
4. Se não encontrou → É lead novo, continua investigação

**Explicação:** **CODE** executa lógica customizada - aqui decidimos se vale a pena investigar ou se já sabemos que é scam.

---

### **NÓ 4B: Lead Novo**

**Tipo:** Set  
**Nome:** "Marcar como Novo"

**Fields to Set:**
- `isNewLead`: `true`

**Como funciona:**
- Apenas marca que é lead novo
- Dados continuam para próximo nó

---

### **NÓ 5: Validar IP**

**Tipo:** HTTP Request  
**Nome:** "Validar IP"

**Method:** GET  
**URL:** `https://ipapi.co/{{$json.ip}}/json/`

**Authentication:** None (grátis)

**Como funciona:**
1. Faz GET para ipapi.co com o IP do lead
2. Recebe dados de geolocalização
3. Retorna: cidade, país, se é VPN, proxy, etc.

**Resposta:**
```json
{
  "ip": "177.34.123.45",
  "city": "São Paulo",
  "country": "BR",
  "country_name": "Brazil",
  "vpn": false,
  "proxy": false,
  "org": "ISP Name"
}
```

**Explicação:** **HTTP REQUEST** chama API externa - ipapi.co é grátis e nos diz de onde vem o IP, se é VPN, etc.

---

### **NÓ 6: Verificar Blacklist IP**

**Tipo:** HTTP Request  
**Nome:** "Verificar Blacklist IP"

**Method:** GET  
**URL:** `https://api.abuseipdb.com/api/v2/check`

**Headers:**
- `Key`: `{{$env.ABUSEIPDB_API_KEY}}`

**Query Parameters:**
- `ipAddress`: `{{$json.ip}}`
- `maxAgeInDays`: `90`
- `verbose`: `true`

**Como funciona:**
1. Verifica se IP está em blacklist de IPs maliciosos
2. Retorna score de abuso (0-100)
3. Se score > 75 → IP suspeito

**Resposta:**
```json
{
  "data": {
    "abuseConfidenceScore": 0,
    "isWhitelisted": false,
    "totalReports": 0
  }
}
```

**Explicação:** **HTTP REQUEST** valida segurança - AbuseIPDB é grátis e nos diz se o IP já foi reportado como malicioso.

---

### **NÓ 7: Validar Email**

**Tipo:** HTTP Request  
**Nome:** "Validar Email"

**Method:** GET  
**URL:** `https://api.hunter.io/v2/email-verifier`

**Headers:**
- `Authorization`: `Bearer {{$env.HUNTER_API_KEY}}`

**Query Parameters:**
- `email`: `{{$json.email}}`

**Como funciona:**
1. Verifica se email é válido
2. Verifica se é descartável (temporário)
3. Retorna score de confiança

**Resposta:**
```json
{
  "data": {
    "result": "deliverable",
    "score": 100,
    "disposable": false,
    "webmail": false
  }
}
```

**Explicação:** **HTTP REQUEST** valida email - Hunter.io (pago) verifica se email existe, se é descartável, etc.

**Nota:** Se não tiver Hunter.io, pode pular este nó ou usar API grátis alternativa.

---

### **NÓ 8: Buscar LinkedIn**

**Tipo:** HTTP Request  
**Nome:** "Buscar LinkedIn"

**Method:** GET  
**URL:** `https://nubela.co/proxycurl/api/v2/linkedin`

**Headers:**
- `Authorization`: `Bearer {{$env.PROXYCURL_API_KEY}}`

**Query Parameters:**
- `url`: `{{$json.linkedin_url}}` (se tiver)
- OU buscar por: `name` + `company`

**Como funciona:**
1. Se tiver LinkedIn URL → busca perfil completo
2. Se não tiver → tenta encontrar por nome + empresa
3. Retorna dados profissionais completos

**Resposta:**
```json
{
  "full_name": "João Silva",
  "headline": "Diretor de Tecnologia",
  "summary": "...",
  "experience": [...],
  "education": [...]
}
```

**Explicação:** **HTTP REQUEST** enriquece dados - Proxycurl (pago) busca perfil LinkedIn completo para entender melhor o lead.

**Nota:** Se não tiver Proxycurl, pode pular este nó.

---

### **NÓ 9: Google Search**

**Tipo:** HTTP Request  
**Nome:** "Google Search"

**Method:** GET  
**URL:** `https://serpapi.com/search`

**Headers:**
- `Authorization`: `Bearer {{$env.SERPAPI_KEY}}`

**Query Parameters:**
- `q`: `{{$json.name}} {{$json.company}} {{$json.email}}`
- `num`: `10`
- `hl`: `pt`

**Como funciona:**
1. Busca no Google: nome + empresa + email
2. Retorna primeiros 10 resultados
3. Extrai informações públicas

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

**Explicação:** **HTTP REQUEST** busca informações - SerpAPI (pago) faz busca no Google para encontrar informações públicas sobre a pessoa/empresa.

**Nota:** Se não tiver SerpAPI, pode pular este nó.

---

### **NÓ 10: Buscar Redes Sociais**

**Tipo:** HTTP Request (3 em paralelo)  
**Nome:** "Buscar Instagram", "Buscar Twitter", "Buscar Facebook"

**Instagram:**
- URL: `https://serpapi.com/search`
- Query: `q={{$json.name}} site:instagram.com`

**Twitter:**
- URL: `https://serpapi.com/search`
- Query: `q={{$json.name}} site:twitter.com`

**Facebook:**
- URL: `https://serpapi.com/search`
- Query: `q={{$json.name}} site:facebook.com`

**Como funciona:**
- 3 requisições em paralelo (mais rápido)
- Cada uma busca em uma rede social
- Retorna perfis encontrados

**Explicação:** **HTTP REQUEST** múltiplos - fazemos 3 buscas ao mesmo tempo para encontrar perfis sociais. Depois combinamos com MERGE.

---

### **NÓ 11: Detectar Idioma**

**Tipo:** Code (JavaScript)  
**Nome:** "Detectar Idioma"

**Código:**
```javascript
const text = $input.item.json.description || 
             $input.item.json.message || 
             $input.item.json.comments || 
             '';

// Palavras-chave por idioma
const ptWords = ['quero', 'gostaria', 'preciso', 'interesse', 'projeto', 'obrigado', 'contato'];
const enWords = ['want', 'would', 'need', 'interest', 'project', 'thank', 'contact'];
const esWords = ['quiero', 'necesito', 'interés', 'proyecto', 'gracias', 'contacto'];

// Contar ocorrências
const ptCount = ptWords.filter(w => text.toLowerCase().includes(w)).length;
const enCount = enWords.filter(w => text.toLowerCase().includes(w)).length;
const esCount = esWords.filter(w => text.toLowerCase().includes(w)).length;

// Detectar idioma
let detectedLanguage = 'pt'; // default
if (enCount > ptCount && enCount > esCount) detectedLanguage = 'en';
else if (esCount > ptCount && esCount > enCount) detectedLanguage = 'es';
else if (ptCount > 0) detectedLanguage = 'pt';

return {
  detectedLanguage: detectedLanguage,
  textLength: text.length,
  confidence: Math.max(ptCount, enCount, esCount) / Math.max(1, ptWords.length)
};
```

**Como funciona:**
1. Pega texto do formulário
2. Conta palavras em português, inglês, espanhol
3. Decide qual idioma tem mais palavras
4. Retorna idioma detectado

**Explicação:** **CODE** analisa texto - detectamos idioma para gerar email no idioma correto depois.

---

### **NÓ 12: Analisar com DeepSeek**

**Tipo:** HTTP Request  
**Nome:** "Analisar com DeepSeek"

**Method:** POST  
**URL:** `https://api.deepseek.com/v1/chat/completions`

**Headers:**
- `Authorization`: `Bearer {{$env.DEEPSEEK_API_KEY}}`
- `Content-Type`: `application/json`

**Body:**
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
      "content": "Analyze this lead and return JSON with:\n1. classification: LEGITIMATE | SUSPECT | SCAMMER | COMPETITOR\n2. riskScore: 0-100\n3. persona: student | company | government | editor | museum | other\n4. interest: course | video | co-production | grants | exhibition | other\n5. temperature: HOT | WARM | COLD\n6. isStudent: true/false\n7. isCompany: true/false\n8. isGovernment: true/false\n9. wantsCourse: true/false\n10. wantsVideo: true/false\n11. wantsCoProduction: true/false\n12. wantsGrants: true/false\n13. redFlags: [array of strings]\n14. positiveSignals: [array of strings]\n\nLead data:\n{{JSON.stringify($json)}}\n\nIP check: {{JSON.stringify($('Validar IP').json)}}\nEmail check: {{JSON.stringify($('Validar Email').json)}}\nBlacklist: {{JSON.stringify($('Verificar Blacklist IP').json)}}\nLinkedIn: {{JSON.stringify($('Buscar LinkedIn').json)}}\nGoogle: {{JSON.stringify($('Google Search').json)}}\n\nReturn ONLY JSON, no explanation."
    }
  ],
  "temperature": 0.3,
  "max_tokens": 1000
}
```

**Como funciona:**
1. Envia TODOS os dados coletados para DeepSeek
2. DeepSeek analisa e classifica
3. Retorna JSON com classificação completa

**Resposta:**
```json
{
  "choices": [{
    "message": {
      "content": "{\"classification\":\"LEGITIMATE\",\"riskScore\":15,\"persona\":\"museum\",\"interest\":\"exhibition\",\"temperature\":\"HOT\",\"isStudent\":false,\"isCompany\":false,\"isGovernment\":false,\"wantsCourse\":false,\"wantsVideo\":false,\"wantsCoProduction\":true,\"wantsGrants\":true,\"redFlags\":[],\"positiveSignals\":[\"Valid email\",\"LinkedIn found\"]}"
    }
  }]
}
```

**Processar resposta:**
- DeepSeek retorna JSON dentro de uma string
- Precisa fazer `JSON.parse()` para usar

**Explicação:** **HTTP REQUEST** + **IA** - DeepSeek (grátis) analisa TUDO que coletamos e decide se é lead legítimo, scam, competidor, etc. É o "cérebro" do sistema!

---

### **NÓ 13: Processar Resposta DeepSeek**

**Tipo:** Code (JavaScript)  
**Nome:** "Processar DeepSeek"

**Código:**
```javascript
const deepseekResponse = $input.item.json;

// Extrair conteúdo da resposta
let content = deepseekResponse.choices[0].message.content;

// Remover markdown se tiver
content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

// Fazer parse do JSON
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

**Como funciona:**
1. Pega resposta do DeepSeek
2. Extrai o JSON da string
3. Faz parse
4. Retorna dados limpos

**Explicação:** **CODE** processa resposta - DeepSeek às vezes retorna JSON dentro de string, precisamos limpar e parsear.

---

### **NÓ 14: IF (Decisão)**

**Tipo:** IF  
**Nome:** "É Legítimo?"

**Conditions:**
- `{{$json.classification}}` equals `LEGITIMATE`

**Rotas:**
- **TRUE** → Continuar (enviar email)
- **FALSE** → Rejeitar (não enviar, só salvar como SCAMMER)

**Como funciona:**
- Se classificação = LEGITIMATE → Continua
- Se não → Para aqui (não envia email)

**Explicação:** **IF** valida decisão - só enviamos email se DeepSeek classificou como LEGITIMATE. Se for SCAMMER, paramos aqui.

---

### **NÓ 15: Gerar Small Talk**

**Tipo:** HTTP Request  
**Nome:** "Gerar Small Talk"

**Method:** POST  
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**
- `x-api-key`: `{{$env.CLAUDE_API_KEY}}`
- `anthropic-version`: `2023-06-01`
- `Content-Type`: `application/json`

**Body:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 200,
  "messages": [
    {
      "role": "user",
      "content": "Generate personalized small talk for this lead in {{$('Detectar Idioma').json.detectedLanguage}}.\n\nContext:\n- Location: {{$('Validar IP').json.city}}, {{$('Validar IP').json.country_name}}\n- Company: {{$json.company}}\n- Persona: {{$('Processar DeepSeek').json.persona}}\n- Interest: {{$('Processar DeepSeek').json.interest}}\n- LinkedIn: {{$('Buscar LinkedIn').json.headline}}\n- Recent posts: {{$('Google Search').json.organic_results[0].snippet}}\n\nGenerate 2-3 sentences of friendly small talk mentioning their location, company type, or recent work. Use emojis sparingly (1-2 max: 🎬 🌐 ✨).\n\nReturn JSON: {smallTalk: \"text here\"}"
    }
  ]
}
```

**Como funciona:**
1. Envia contexto para Claude
2. Claude gera small talk personalizado
3. Retorna texto para quebrar o gelo

**Resposta:**
```json
{
  "content": [{
    "text": "{\"smallTalk\":\"🌆 Legal ver interesse de São Paulo! A cidade tem uma cena cultural incrível.\"}"
  }]
}
```

**Explicação:** **HTTP REQUEST** + **IA** - Claude (pago) gera small talk criativo baseado em local, empresa, posts recentes. É o "quebrador de gelo" do email!

---

### **NÓ 16: Processar Small Talk**

**Tipo:** Code (JavaScript)  
**Nome:** "Processar Small Talk"

**Código:**
```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;

// Remover markdown se tiver
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

// Parse JSON
const smallTalk = JSON.parse(cleanContent);

return {
  smallTalk: smallTalk.smallTalk
};
```

---

### **NÓ 17: Gerar Email**

**Tipo:** HTTP Request  
**Nome:** "Gerar Email"

**Method:** POST  
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**
- `x-api-key`: `{{$env.CLAUDE_API_KEY}}`
- `anthropic-version`: `2023-06-01`
- `Content-Type`: `application/json`

**Body:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 500,
  "messages": [
    {
      "role": "user",
      "content": "Create a personalized email in {{$('Detectar Idioma').json.detectedLanguage}} for this lead.\n\nContext:\n- Name: {{$json.name}}\n- Company: {{$json.company}}\n- Interest: {{$('Processar DeepSeek').json.interest}}\n- Persona: {{$('Processar DeepSeek').json.persona}}\n- Small Talk: {{$('Processar Small Talk').json.smallTalk}}\n- Form Type: {{$json.formType}}\n- Project: {{$json.projectType}}\n- Budget: {{$json.budget}}\n- Description: {{$json.description}}\n\nTone: Friendly, creative, cinematic (2-3 emojis max: 🎬 🌐 ✨ 🎯 💡)\n\nStructure:\n1. Subject line (intriguing)\n2. Personal greeting + small talk\n3. Brief Azimut intro (relevant to their interest)\n4. Address their specific need (course/video/co-production/grants)\n5. Soft CTA (coffee chat, demo, portfolio review)\n6. Signature\n\nMax 150 words. Return JSON: {subject: \"...\", body: \"...\"}"
    }
  ]
}
```

**Como funciona:**
1. Envia TODOS os dados para Claude
2. Claude gera email hiper-personalizado
3. Retorna subject + body

**Explicação:** **HTTP REQUEST** + **IA** - Claude gera email único, personalizado, no idioma correto, mencionando o interesse específico do lead!

---

### **NÓ 18: Processar Email**

**Tipo:** Code (JavaScript)  
**Nome:** "Processar Email"

**Código:**
```javascript
const claudeResponse = $input.item.json;
const content = claudeResponse.content[0].text;

// Remover markdown
let cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

// Parse JSON
const email = JSON.parse(cleanContent);

return {
  subject: email.subject,
  body: email.body
};
```

---

### **NÓ 19: Enviar Email**

**Tipo:** HTTP Request  
**Nome:** "Enviar Email"

**Method:** POST  
**URL:** `https://api.resend.com/emails`

**Headers:**
- `Authorization`: `Bearer {{$env.RESEND_API_KEY}}`
- `Content-Type`: `application/json`

**Body:**
```json
{
  "from": "Ranz <ranz@azmt.com.br>",
  "to": ["{{$json.email}}"],
  "subject": "{{$('Processar Email').json.subject}}",
  "text": "{{$('Processar Email').json.body}}",
  "reply_to": "ranz@azmt.com.br"
}
```

**Como funciona:**
1. Envia email via Resend
2. Retorna status (enviado ou erro)

**Explicação:** **HTTP REQUEST** envia email - Resend (grátis até 3k/mês) envia o email gerado pelo Claude!

---

### **NÓ 20: IF (Tem WhatsApp?)**

**Tipo:** IF  
**Nome:** "Tem WhatsApp?"

**Conditions:**
- `{{$json.phone}}` is not empty

**Rotas:**
- **TRUE** → Enviar WhatsApp
- **FALSE** → Pular

---

### **NÓ 21: Enviar WhatsApp**

**Tipo:** HTTP Request  
**Nome:** "Enviar WhatsApp"

**Method:** POST  
**URL:** `https://graph.facebook.com/v18.0/{{$env.WHATSAPP_PHONE_ID}}/messages`

**Headers:**
- `Authorization`: `Bearer {{$env.WHATSAPP_ACCESS_TOKEN}}`
- `Content-Type`: `application/json`

**Body:**
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

**Nota:** Requer WhatsApp Business API configurado (opcional)

---

### **NÓ 22: Salvar Tudo no Banco**

**Tipo:** PostgreSQL  
**Nome:** "Salvar leadIntelligence"

**Operação:** Execute Query

**Query:**
```sql
UPDATE "Lead"
SET "leadIntelligence" = $1::jsonb
WHERE id = $2;
```

**Query Parameters:**
- `$1`: JSON completo (ver abaixo)
- `$2`: `{{$json.leadId}}`

**JSON a salvar (Code antes do PostgreSQL):**

**NÓ 21.5: Preparar Dados para Salvar**

**Tipo:** Code (JavaScript)  
**Nome:** "Preparar leadIntelligence"

**Código:**
```javascript
const lead = $json;
const ipCheck = $('Validar IP').item.json;
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
    trustedEmail: emailCheck.data?.result === "deliverable",
    phoneValid: !!lead.phone,
    addressVerified: false
  },
  verifications: {
    ipCheck: {
      type: ipCheck.org || "unknown",
      vpn: ipCheck.vpn || false,
      proxy: ipCheck.proxy || false,
      city: ipCheck.city || "unknown",
      country: ipCheck.country_name || "unknown"
    },
    emailCheck: {
      valid: emailCheck.data?.result === "deliverable",
      disposable: emailCheck.data?.disposable || false,
      score: emailCheck.data?.score || 0
    },
    blacklisted: (blacklist.data?.abuseConfidenceScore || 0) > 75
  },
  enrichment: {
    linkedin: linkedin,
    googleResults: google.organic_results || [],
    socialMedia: {
      instagram: "found", // Simplificado
      twitter: "found",
      facebook: "found"
    }
  },
  behavior: {
    detectedLanguage: language.detectedLanguage,
    textLength: language.textLength
  },
  decision: {
    action: analysis.classification === "LEGITIMATE" ? "SEND_EMAIL" : "REJECT",
    reason: analysis.positiveSignals.join(", "),
    emailSent: analysis.classification === "LEGITIMATE",
    whatsappSent: !!lead.phone && analysis.classification === "LEGITIMATE",
    sentAt: new Date().toISOString()
  },
  investigationHistory: [
    {
      timestamp: new Date().toISOString(),
      action: "Full investigation completed",
      results: `Classification: ${analysis.classification}, Risk: ${analysis.riskScore}`
    }
  ]
};

return {
  leadIntelligence: JSON.stringify(leadIntelligence),
  leadId: lead.leadId
};
```

**Depois, no PostgreSQL:**
- `$1`: `{{$json.leadIntelligence}}`
- `$2`: `{{$json.leadId}}`

**Explicação:** **CODE** + **POSTGRESQL** - Preparamos todos os dados coletados em um JSON e salvamos no campo `leadIntelligence` do banco!

---

## **📊 RESUMO DO FLUXO:**

```
1. Webhook recebe lead
2. Identifica formulário
3. Verifica se já existe
4. Valida IP (localização, VPN)
5. Verifica blacklist
6. Valida email
7. Busca LinkedIn
8. Google Search
9. Busca redes sociais
10. Detecta idioma
11. DeepSeek analisa TUDO
12. IF: É legítimo?
    SIM → Continua
    NÃO → Para (não envia)
13. Claude gera small talk
14. Claude gera email
15. Resend envia email
16. IF: Tem WhatsApp?
    SIM → Envia WhatsApp
17. Salva tudo no banco
```

---

## **🎯 PRÓXIMO PASSO:**

Agora vou criar o arquivo JSON completo do workflow para você importar no N8N!

**Continue para ver o arquivo JSON pronto para importar!** 🚀
