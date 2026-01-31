# 🎯 CAPTAÇÃO PASSIVA - DOCUMENTO COMPLETO

## **📋 O QUE É CAPTAÇÃO PASSIVA:**

Sistema automatizado que **investiga TODOS os leads** que preenchem formulários no site, fazendo análise completa de segurança e personalização antes de enviar email/WhatsApp.

**Objetivo:** Proteger contra golpistas E personalizar comunicação automaticamente.

---

## **🎯 INTENÇÃO ORIGINAL DO USUÁRIO:**

O usuário queria:

1. **Email automático personalizado e empático** quando alguém preenche formulário
2. **Sistema que investiga o lead** antes de enviar email
3. **Detectar golpistas, phishing, competidores** automaticamente
4. **Pesquisar sobre a pessoa** (email, nome, empresa) online
5. **Verificar IP** (se é VPN, proxy, localização real)
6. **Verificar redes sociais** (LinkedIn, Instagram, etc.)
7. **Analisar se é legítimo** ou tentativa de golpe
8. **Decidir se vale a pena** enviar email ou não
9. **Salvar todas as informações** coletadas em JSONB no banco (`leadIntelligence`)
10. **Email cinematográfico, criativo, personalizado**, não genérico

---

## **🔍 VALIDAÇÕES E SEGURANÇA IMPLEMENTADAS:**

### **1. VALIDAÇÃO DE IP (ipapi.co - GRÁTIS):**

**O que faz:**
- Verifica **geolocalização** do IP (cidade, país)
- Detecta se está usando **VPN** (Virtual Private Network)
- Detecta se está usando **Proxy** (servidor intermediário)
- Identifica **tipo de conexão** (residencial, datacenter, mobile)

**Por que é importante:**
- **Golpistas frequentemente usam VPN** para esconder localização real
- **IPs de datacenter** podem indicar bots ou fraudes
- **Localização inconsistente** (ex: diz que é do Brasil mas IP é da Nigéria) = red flag

**API:** `https://ipapi.co/{ip}/json/` (grátis, 1k/dia)

**Resposta:**
```json
{
  "ip": "177.34.123.45",
  "city": "São Paulo",
  "country": "BR",
  "country_name": "Brazil",
  "vpn": false,        ← Se true, pode ser suspeito
  "proxy": false,      ← Se true, pode ser suspeito
  "org": "ISP Name"
}
```

---

### **2. VERIFICAÇÃO DE BLACKLIST IP (AbuseIPDB - GRÁTIS):**

**O que faz:**
- Verifica se o IP está em **blacklist de IPs maliciosos**
- Retorna **score de abuso** (0-100)
- Mostra **quantos relatórios** o IP já recebeu
- Indica se IP foi usado para **spam, phishing, ataques**

**Por que é importante:**
- **IPs reportados como maliciosos** = alta probabilidade de golpe
- **Score > 75** = IP muito suspeito, provavelmente golpista
- **Múltiplos relatórios** = IP já foi usado para fraudes

**API:** `https://api.abuseipdb.com/api/v2/check` (grátis, 1k/dia)

**Resposta:**
```json
{
  "data": {
    "abuseConfidenceScore": 0,    ← 0-100, se > 75 = suspeito
    "isWhitelisted": false,
    "totalReports": 0,            ← Quantos relatórios recebeu
    "lastReportedAt": null
  }
}
```

---

### **3. VALIDAÇÃO DE EMAIL (Hunter.io - PAGO $49/mês):**

**O que faz:**
- Verifica se email **existe e é válido**
- Detecta se é **email descartável** (temporário, usado para spam)
- Retorna **score de confiança** (0-100)
- Verifica se é **webmail** (Gmail, Yahoo) ou **empresarial**
- Verifica **registros MX** (se domínio aceita emails)

**Por que é importante:**
- **Emails descartáveis** (10minutemail, tempmail) = provavelmente golpista
- **Email inválido** = não vale a pena contactar
- **Score baixo** = email suspeito ou não confiável
- **Golpistas frequentemente usam emails descartáveis** para não serem rastreados

**API:** `https://api.hunter.io/v2/email-verifier` (pago)

**Resposta:**
```json
{
  "data": {
    "result": "deliverable",     ← deliverable, undeliverable, risky
    "score": 100,                ← 0-100, quanto maior melhor
    "disposable": false,         ← Se true = email descartável = RED FLAG
    "webmail": false,           ← Se true = Gmail/Yahoo (menos confiável)
    "mx_records": true,         ← Se domínio aceita emails
    "smtp_check": true          ← Se servidor SMTP responde
  }
}
```

---

### **4. BUSCA NO LINKEDIN (Proxycurl - PAGO $29/mês):**

**O que faz:**
- Busca **perfil completo do LinkedIn** da pessoa
- Extrai: cargo, empresa, experiência, educação, resumo
- Verifica se **perfil é real** (golpistas raramente têm LinkedIn completo)
- Identifica **background profissional**

**Por que é importante:**
- **Golpistas raramente têm LinkedIn completo** ou profissional
- **Perfil real** = sinal positivo de legitimidade
- **Dados profissionais** ajudam a personalizar email
- **Empresa verificada** = mais confiança

**API:** `https://nubela.co/proxycurl/api/v2/linkedin` (pago)

**Resposta:**
```json
{
  "full_name": "João Silva",
  "headline": "Diretor de Tecnologia",
  "summary": "Experiência em...",
  "experience": [...],
  "education": [...],
  "profile_pic_url": "..."
}
```

---

### **5. BUSCA NO GOOGLE (SerpAPI - PAGO $50/mês):**

**O que faz:**
- Busca **informações públicas** sobre a pessoa/empresa
- Encontra **artigos, notícias, menções**
- Identifica **redes sociais** (Instagram, Twitter, Facebook)
- Verifica se **empresa existe** e é legítima
- Encontra **projetos, trabalhos, portfólio**

**Por que é importante:**
- **Golpistas não aparecem em buscas** ou aparecem com histórico negativo
- **Presença online real** = sinal positivo
- **Informações públicas** ajudam a personalizar email
- **Red flags:** histórico de fraudes, menções negativas

**API:** `https://serpapi.com/search` (pago)

**Resposta:**
```json
{
  "organic_results": [
    {
      "title": "João Silva - Diretor Museu Nacional",
      "link": "https://...",
      "snippet": "João Silva é diretor..."
    }
  ]
}
```

---

### **6. DETECÇÃO DE IDIOMA:**

**O que faz:**
- Analisa **texto do formulário** (descrição, mensagem)
- Detecta se é **português, inglês ou espanhol**
- Usa **palavras-chave** por idioma

**Por que é importante:**
- **Email deve ser no mesmo idioma** que o lead escreveu
- **Personalização** aumenta taxa de resposta
- **Golpistas frequentemente usam tradução automática** (texto estranho)

**Código JavaScript:**
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

---

### **7. ANÁLISE COM IA (DeepSeek - GRÁTIS):**

**O que faz:**
- **Analisa TODOS os dados coletados** (IP, email, LinkedIn, Google, etc.)
- **Classifica o lead:**
  - `LEGITIMATE` - Lead legítimo, vale a pena contactar
  - `SUSPECT` - Suspeito, mas pode ser legítimo
  - `SCAMMER` - Provavelmente golpista, não contactar
  - `COMPETITOR` - Competidor tentando coletar informações
- **Calcula risk score** (0-100)
- **Identifica persona** (estudante, empresa, governo, museu, etc.)
- **Identifica interesse** (curso, vídeo, co-produção, grants, exposição)
- **Classifica temperatura** (HOT, WARM, COLD)
- **Lista red flags** (sinais de golpe)
- **Lista positive signals** (sinais de legitimidade)

**Por que é importante:**
- **IA analisa tudo junto** e toma decisão inteligente
- **Evita perder tempo** com golpistas
- **Identifica leads quentes** para priorizar
- **Red flags automáticos** (email descartável + VPN + sem LinkedIn = SCAMMER)

**API:** `https://api.deepseek.com/v1/chat/completions` (grátis)

**Prompt para DeepSeek:**
```
You are an expert at analyzing sales leads. Return ONLY valid JSON, no markdown.

Analyze this lead and return JSON with:
1. classification: LEGITIMATE | SUSPECT | SCAMMER | COMPETITOR
2. riskScore: 0-100
3. persona: student | company | government | editor | museum | other
4. interest: course | video | co-production | grants | exhibition | other
5. temperature: HOT | WARM | COLD
6. isStudent: true/false
7. isCompany: true/false
8. isGovernment: true/false
9. wantsCourse: true/false
10. wantsVideo: true/false
11. wantsCoProduction: true/false
12. wantsGrants: true/false
13. redFlags: [array of strings]
14. positiveSignals: [array of strings]

Lead data: {todos os dados do formulário}
IP check: {dados do ipapi.co}
Email check: {dados do Hunter.io}
Blacklist: {dados do AbuseIPDB}
LinkedIn: {dados do Proxycurl}
Google: {dados do SerpAPI}

Return ONLY JSON, no explanation.
```

**Resposta esperada:**
```json
{
  "classification": "LEGITIMATE",
  "riskScore": 15,              ← 0-100, quanto menor melhor
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
  "redFlags": [],              ← Array de sinais de golpe
  "positiveSignals": [         ← Array de sinais positivos
    "Valid email",
    "LinkedIn profile found",
    "Museum director"
  ]
}
```

---

### **8. GERAÇÃO DE SMALL TALK (Claude - PAGO):**

**O que faz:**
- Gera **conversa inicial personalizada** baseada em:
  - Localização (cidade, país)
  - Empresa/tipo de organização
  - Posts recentes no LinkedIn/Instagram
  - Projetos encontrados
- **Quebra o gelo** de forma natural
- **Menciona algo específico** sobre a pessoa

**Por que é importante:**
- **Email não parece robótico**
- **Mostra que você pesquisou** sobre a pessoa
- **Aumenta taxa de resposta**
- **Cria conexão emocional**

**API:** `https://api.anthropic.com/v1/messages` (pago)

**Prompt para Claude:**
```
Generate personalized small talk for this lead in {idioma}.

Context:
- Location: {cidade}, {país}
- Company: {empresa}
- Persona: {persona}
- Interest: {interesse}
- LinkedIn: {headline do LinkedIn}
- Recent posts: {posts recentes encontrados}

Generate 2-3 sentences of friendly small talk mentioning their location, 
company type, or recent work. Use emojis sparingly (1-2 max: 🎬 🌐 ✨).

Return JSON: {smallTalk: "text here"}
```

**Exemplo de resposta:**
```
"🌆 Legal ver interesse de São Paulo! A cidade tem uma cena cultural incrível."
"Vi que vocês anunciaram a nova exposição de arte digital — parece incrível! 🎨"
```

---

### **9. GERAÇÃO DE EMAIL PERSONALIZADO (Claude - PAGO):**

**O que faz:**
- Gera email **completamente personalizado** baseado em:
  - Nome, empresa, cargo
  - Interesse identificado (curso, vídeo, co-produção, etc.)
  - Persona (estudante, empresa, museu, etc.)
  - Small talk gerado
  - Idioma detectado
  - Projetos relevantes do portfólio Azimut
- **Tom cinematográfico, criativo, empático**
- **2-3 emojis** (🎬 🌐 ✨)
- **Máximo 150 palavras**
- **Soft CTA** (coffee chat, demo, portfolio review)

**Por que é importante:**
- **Email parece escrito por humano** que conhece a pessoa
- **Taxa de resposta 3x maior** que email genérico
- **Personalização baseada em dados reais**
- **Não parece spam**

**API:** `https://api.anthropic.com/v1/messages` (pago)

**Prompt para Claude:**
```
Create a personalized email in {idioma} for this lead.

Context:
- Name: {nome}
- Company: {empresa}
- Interest: {interesse}
- Persona: {persona}
- Small Talk: {small talk gerado}
- Form Type: {tipo de formulário}
- Project: {tipo de projeto}
- Budget: {orçamento}
- Description: {descrição}

Tone: Friendly, creative, cinematic (2-3 emojis max: 🎬 🌐 ✨ 🎯 💡)

Structure:
1. Subject line (intriguing)
2. Personal greeting + small talk
3. Brief Azimut intro (relevant to their interest)
4. Address their specific need (course/video/co-production/grants)
5. Soft CTA (coffee chat, demo, portfolio review)
6. Signature

Max 150 words. Return JSON: {subject: "...", body: "..."}
```

**Exemplo de email gerado:**
```
Assunto: Experiências imersivas para museus 🎨✨

Olá João,

Vi seu post sobre transformação digital no Museu Nacional — adorei a visão! 🌟

Somos da Azimut, criamos experiências imersivas para museus e instituições culturais. 
Trabalhamos no Museu Olímpico em Lausanne com curadoria digital e VR 360°.

Nosso portfólio: azmt.com.br/pt/trabalhos

Que tal trocar ideias sobre como VR pode ampliar o alcance de exposições? 
Podemos marcar um café virtual. ☕

Abraço,
Ranz
Azimut — Immersive Experiences
```

---

### **10. SALVAR TUDO NO BANCO (leadIntelligence JSONB):**

**O que faz:**
- Salva **TODAS as informações coletadas** em um campo JSONB no PostgreSQL
- Inclui: classificação, risk score, validações, enriquecimento, decisão
- **Histórico completo** da investigação
- **Pode ser consultado depois** no backoffice

**Por que é importante:**
- **Transparência total** do que foi investigado
- **Pode revisar decisões** depois
- **Aprender com padrões** (quais leads são legítimos)
- **Melhorar sistema** com dados históricos

**Estrutura salva no PostgreSQL:**
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
  "positiveSignals": [
    "Valid email",
    "LinkedIn profile found",
    "Museum director"
  ],
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
    "linkedin": {...},
    "googleResults": [...],
    "socialMedia": {
      "instagram": "...",
      "twitter": "...",
      "facebook": "..."
    }
  },
  "behavior": {
    "detectedLanguage": "pt",
    "textLength": 150
  },
  "decision": {
    "action": "SEND_EMAIL",
    "reason": "High fit score, verified data",
    "emailSent": true,
    "whatsappSent": false,
    "sentAt": "2026-01-20T10:30:00Z"
  },
  "investigationHistory": [
    {
      "timestamp": "2026-01-20T10:30:00Z",
      "action": "Full investigation completed",
      "results": "LEGITIMATE lead, email sent"
    }
  ]
}
```

---

## **🔄 FLUXO COMPLETO DO WORKFLOW:**

```
1. Lead preenche formulário no site
   ↓
2. Backoffice salva lead no banco (PostgreSQL)
   ↓
3. Backoffice chama webhook N8N (envia todos os dados)
   ↓
4. N8N recebe dados via Webhook (nome, email, IP, etc.)
   ↓
5. N8N identifica tipo de formulário (Switch: contact_form ou vancouver)
   ↓
6. N8N verifica se lead já entrou em contato antes (PostgreSQL)
   ↓
7. SE já foi SCAMMER antes → Rejeita imediatamente
   SE não encontrou ou foi LEGITIMATE → Continua investigação
   ↓
8. N8N valida IP (ipapi.co) → Detecta VPN, proxy, localização
   ↓
9. N8N verifica blacklist IP (AbuseIPDB) → Detecta IP malicioso
   ↓
10. N8N valida email (Hunter.io) → Detecta email descartável, válido
   ↓
11. N8N busca LinkedIn (Proxycurl) → Encontra perfil profissional
   ↓
12. N8N busca Google (SerpAPI) → Encontra informações públicas
   ↓
13. N8N detecta idioma → Analisa texto do formulário
   ↓
14. N8N envia TUDO para DeepSeek → IA analisa e classifica
   ↓
15. DeepSeek retorna: LEGITIMATE, SUSPECT, SCAMMER ou COMPETITOR
   ↓
16. SE LEGITIMATE:
    ↓
    17. N8N gera small talk (Claude) → Conversa inicial personalizada
    ↓
    18. N8N gera email (Claude) → Email completo personalizado
    ↓
    19. N8N envia email (Resend) → Email enviado automaticamente
    ↓
    20. N8N verifica se tem telefone (IF)
    ↓
    21. SE tem telefone:
        ↓
        22. N8N envia WhatsApp → Mensagem automática
    ↓
    23. N8N salva TUDO no banco (leadIntelligence JSONB)
    ↓
    24. N8N responde webhook → Confirma sucesso
   ↓
   SE SCAMMER/SUSPECT:
    ↓
    17. N8N salva como rejeitado (leadIntelligence JSONB)
    ↓
    18. N8N NÃO envia email
    ↓
    19. N8N responde webhook → Confirma rejeição
```

---

## **📊 ESTRUTURA DO WORKFLOW N8N (19 NÓS):**

1. **Webhook** - Recebe lead
2. **Switch** - Identificar Formulário
3. **PostgreSQL** - Verificar Lead Anterior
4. **Code** - Decisão Lead Existente
5. **IF** - Continuar Investigação?
6. **HTTP Request** - Validar IP (ipapi.co)
7. **HTTP Request** - Verificar Blacklist IP (AbuseIPDB)
8. **HTTP Request** - Validar Email (Hunter.io - opcional)
9. **HTTP Request** - Buscar LinkedIn (Proxycurl - opcional)
10. **HTTP Request** - Google Search (SerpAPI)
11. **Code** - Detectar Idioma
12. **HTTP Request** - Analisar com DeepSeek
13. **Code** - Processar DeepSeek
14. **IF** - É Legítimo?
15. **HTTP Request** - Gerar Small Talk (Claude)
16. **Code** - Processar Small Talk
17. **HTTP Request** - Gerar Email (Claude)
18. **Code** - Processar Email
19. **HTTP Request** - Enviar Email (Resend)
20. **IF** - Tem WhatsApp?
21. **HTTP Request** - Enviar WhatsApp (opcional)
22. **Code** - Preparar leadIntelligence
23. **PostgreSQL** - Salvar leadIntelligence
24. **Respond to Webhook**

---

## **🔧 CONFIGURAÇÃO NO BACKOFFICE:**

### **Modificar `/api/leads/route.ts`:**

Adicionar chamada ao N8N após criar lead:

```typescript
// Após criar lead no banco
const lead = await prisma.lead.create({...})

// 🕵️ INVESTIGAÇÃO AUTOMÁTICA N8N (Lead Intelligence)
try {
  const N8N_WEBHOOK_URL = process.env.N8N_LEAD_INTELLIGENCE_WEBHOOK ||
    'https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence';
  
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
  
  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      leadId: lead.id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      position: data.position || null,
      formType: 'contact_form',
      projectType: data.projectType || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      description: data.description || null,
      organizationType: data.organizationType || null,
      interestInGrants: data.interestInGrants || false,
      country: data.country || null,
      city: data.city || null,
      ip: ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      sourceUrl: request.headers.get('referer') || null,
      lang: data.lang || 'pt'
    })
  }).catch(err => {
    console.warn('N8N webhook failed (non-critical):', err);
  });
} catch (n8nError) {
  console.warn('Failed to call N8N webhook:', n8nError);
}
```

### **Modificar `/api/leads/vancouver/route.ts`:**

Mesma coisa, mas com `formType: 'vancouver'` e dados específicos do formulário Vancouver.

---

## **⚙️ VARIÁVEIS DE AMBIENTE NECESSÁRIAS:**

### **No Railway (N8N):**
```
DEEPSEEK_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
ABUSEIPDB_API_KEY=... (opcional, grátis)
HUNTER_API_KEY=... (opcional, $49/mês)
PROXYCURL_API_KEY=... (opcional, $29/mês)
SERPAPI_KEY=... (opcional, $50/mês)
WHATSAPP_PHONE_ID=... (opcional)
WHATSAPP_ACCESS_TOKEN=... (opcional)
```

### **No Backoffice (`.env`):**
```
N8N_LEAD_INTELLIGENCE_WEBHOOK=https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence
```

---

## **💰 CUSTOS:**

### **Mínimo (só APIs grátis):**
- Railway N8N: $5/mês
- DeepSeek: $0 (grátis)
- Claude: ~$10-20/mês
- Resend: $0 (3k emails grátis)
- ipapi.co: $0 (1k/dia grátis)
- AbuseIPDB: $0 (1k/dia grátis)

**Total mínimo: ~$15-25/mês**

### **Recomendado (com APIs pagas):**
- Railway: $5/mês
- DeepSeek: $0
- Claude: ~$10-20/mês
- Resend: $0
- Hunter.io: $49/mês (validar emails)
- Proxycurl: $29/mês (LinkedIn)
- SerpAPI: $50/mês (Google Search)

**Total recomendado: ~$143-153/mês**

---

## **📊 RESULTADOS ESPERADOS:**

- **10-20 leads/mês** preenchem formulários
- **80% classificados como LEGITIMATE** (após validações)
- **Taxa de resposta: 25-30%** (emails personalizados)
- **2-4 reuniões/mês** geradas
- **1-2 clientes novos/mês**

---

## **🎯 OBJETIVOS DO SISTEMA:**

- ✅ **Proteger contra golpistas** (detectar antes de enviar email)
- ✅ **Personalizar emails** (não genéricos, baseados em pesquisa real)
- ✅ **Aumentar taxa de resposta** (emails personalizados têm 3x mais resposta)
- ✅ **Economizar tempo** (não perder tempo com leads falsos)
- ✅ **Transparência** (saber exatamente o que foi investigado)

---

## **📝 CHECKLIST DE IMPLEMENTAÇÃO:**

- [ ] Criar workflow no N8N (19 nós)
- [ ] Configurar credenciais no N8N (DeepSeek, Claude, Resend, etc.)
- [ ] Adicionar variável de ambiente no backoffice
- [ ] Testar com lead fake
- [ ] Ajustar prompts da IA
- [ ] Teste com lead real
- [ ] Monitorar primeiros 10 leads

---

## **🔗 ARQUIVOS RELACIONADOS:**

- `WORKFLOW_CAPTACAO_PASSIVA_COMPLETO.md` - Detalhamento completo de cada nó
- `CRIAR_WORKFLOW_MANUAL_COMPLETO.md` - Guia passo a passo para criar manualmente
- `N8N_WORKFLOW_PASSO_A_PASSO.md` - Explicação detalhada de cada nó
- `IMPLEMENTACAO_CAPTACAO_PASSIVA_RESUMO.md` - Resumo executivo
- `VISAO_ORIGINAL_CAPTACAO_PASSIVA_ATIVA.md` - Visão completa do sistema

---

**Este documento contém TUDO sobre Captação Passiva!** 🚀

**Use no ChatGPT/Gemini para ter ajuda completa na implementação!**
