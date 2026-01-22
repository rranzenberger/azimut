# 🎯 VISÃO ORIGINAL: CAPTAÇÃO PASSIVA E ATIVA - DOCUMENTO COMPLETO

## **📋 INTENÇÃO ORIGINAL DO USUÁRIO:**

### **O QUE O USUÁRIO PEDIU:**

O usuário queria criar um sistema automatizado que:

1. **Para leads que preenchem formulários (CAPTAÇÃO PASSIVA):**
   - Receber email automático **personalizado e empático**
   - Sistema que **investiga o lead** antes de enviar email
   - **Detectar golpistas, phishing, competidores** automaticamente
   - **Pesquisar sobre a pessoa** (email, nome, empresa) online
   - **Verificar IP** (se é VPN, proxy, localização real)
   - **Verificar redes sociais** (LinkedIn, Instagram, etc.)
   - **Analisar se é legítimo** ou tentativa de golpe
   - **Decidir se vale a pena** enviar email ou não
   - **Salvar todas as informações** coletadas em um campo JSONB no banco (`leadIntelligence`)
   - Email deve ser **cinematográfico, criativo, personalizado**, não genérico

2. **Para buscar prospects ativamente (CAPTAÇÃO ATIVA):**
   - **Procurar prospects** no LinkedIn, Instagram, Google
   - **Avaliar se são bons prospects** para Azimut
   - **Gerar email personalizado** baseado em pesquisa
   - **Enviar automaticamente** (se aprovado)
   - **Monitorar respostas** e fazer follow-ups

---

## **🔍 O QUE EU SUGERI (VALIDAÇÕES E SEGURANÇA):**

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

**Como funciona:**
```
Lead preenche formulário → Capturamos IP → Consultamos ipapi.co → Recebemos:
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

**Como funciona:**
```
IP do lead → Consultamos AbuseIPDB → Recebemos:
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

**Como funciona:**
```
Email do lead → Consultamos Hunter.io → Recebemos:
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

**Como funciona:**
```
Nome + Empresa → Consultamos Proxycurl → Recebemos:
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

**Como funciona:**
```
Nome + Empresa + Email → Buscamos no Google → Recebemos:
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

**Como funciona:**
```
Texto do formulário → Analisamos palavras → Detectamos:
{
  "detectedLanguage": "pt",  ← pt, en, es
  "textLength": 150
}
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

**Como funciona:**
```
Todos os dados → Enviamos para DeepSeek → Recebemos:
{
  "classification": "LEGITIMATE",
  "riskScore": 15,              ← 0-100, quanto menor melhor
  "persona": "museum",
  "interest": "exhibition",
  "temperature": "HOT",
  "isStudent": false,
  "isCompany": false,
  "wantsCoProduction": true,
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

**Exemplo:**
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

**Exemplo:**
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

**Estrutura salva:**
```json
{
  "classification": "LEGITIMATE",
  "riskScore": 15,
  "persona": "museum",
  "interest": "exhibition",
  "temperature": "HOT",
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
    "socialMedia": {...}
  },
  "decision": {
    "action": "SEND_EMAIL",
    "emailSent": true,
    "sentAt": "2026-01-20T10:30:00Z"
  }
}
```

---

## **🔄 FLUXO COMPLETO - CAPTAÇÃO PASSIVA:**

```
1. Lead preenche formulário no site
   ↓
2. Backoffice salva lead no banco
   ↓
3. Backoffice chama webhook N8N (envia todos os dados)
   ↓
4. N8N recebe dados (nome, email, IP, etc.)
   ↓
5. N8N verifica se lead já entrou em contato antes
   ↓
6. N8N valida IP (ipapi.co) → Detecta VPN, proxy, localização
   ↓
7. N8N verifica blacklist IP (AbuseIPDB) → Detecta IP malicioso
   ↓
8. N8N valida email (Hunter.io) → Detecta email descartável, válido
   ↓
9. N8N busca LinkedIn (Proxycurl) → Encontra perfil profissional
   ↓
10. N8N busca Google (SerpAPI) → Encontra informações públicas
   ↓
11. N8N detecta idioma → Analisa texto do formulário
   ↓
12. N8N envia TUDO para DeepSeek → IA analisa e classifica
   ↓
13. DeepSeek retorna: LEGITIMATE, SUSPECT, SCAMMER ou COMPETITOR
   ↓
14. SE LEGITIMATE:
    ↓
    15. N8N gera small talk (Claude) → Conversa inicial personalizada
    ↓
    16. N8N gera email (Claude) → Email completo personalizado
    ↓
    17. N8N envia email (Resend) → Email enviado automaticamente
    ↓
    18. N8N envia WhatsApp (se tiver telefone) → Mensagem automática
    ↓
    19. N8N salva TUDO no banco (leadIntelligence JSONB)
    ↓
    20. N8N responde webhook → Confirma sucesso
   ↓
   SE SCAMMER/SUSPECT:
    ↓
    15. N8N salva como rejeitado (leadIntelligence JSONB)
    ↓
    16. N8N NÃO envia email
    ↓
    17. N8N responde webhook → Confirma rejeição
```

---

## **🔄 FLUXO COMPLETO - CAPTAÇÃO ATIVA:**

```
1. N8N busca prospects (LinkedIn, Instagram, Google)
   ↓
2. N8N enriquece dados (Hunter.io, Proxycurl, SerpAPI)
   ↓
3. N8N analisa com DeepSeek → Calcula fit score (0-100)
   ↓
4. DeepSeek classifica: FRIO, MORNO ou QUENTE
   ↓
5. SE QUENTE (score >= 70):
   ↓
    6. N8N gera email personalizado (Claude)
    ↓
    7. N8N envia email (Resend)
    ↓
    8. N8N salva no banco (external_leads)
    ↓
    9. N8N agenda follow-ups automáticos
   ↓
   SE FRIO/MORNO:
    ↓
    6. N8N salva no banco para revisão manual
    ↓
    7. N8N NÃO envia email automaticamente
```

---

## **🎯 OBJETIVOS DO SISTEMA:**

### **CAPTAÇÃO PASSIVA:**
- ✅ **Proteger contra golpistas** (detectar antes de enviar email)
- ✅ **Personalizar emails** (não genéricos, baseados em pesquisa real)
- ✅ **Aumentar taxa de resposta** (emails personalizados têm 3x mais resposta)
- ✅ **Economizar tempo** (não perder tempo com leads falsos)
- ✅ **Transparência** (saber exatamente o que foi investigado)

### **CAPTAÇÃO ATIVA:**
- ✅ **Encontrar prospects ideais** (buscar ativamente quem pode ser cliente)
- ✅ **Avaliar fit** (só contactar quem realmente faz sentido)
- ✅ **Personalizar abordagem** (email baseado em pesquisa profunda)
- ✅ **Escalar vendas** (automatizar prospecção)
- ✅ **ROI alto** (investimento baixo, retorno alto)

---

## **💰 CUSTOS:**

### **CAPTAÇÃO PASSIVA (Mínimo):**
- Railway N8N: $5/mês
- DeepSeek: $0 (grátis)
- Claude: ~$10-20/mês
- Resend: $0 (3k emails grátis)
- ipapi.co: $0 (1k/dia grátis)
- AbuseIPDB: $0 (1k/dia grátis)

**Total mínimo: ~$15-25/mês**

### **CAPTAÇÃO PASSIVA (Recomendado):**
- Railway: $5/mês
- DeepSeek: $0
- Claude: ~$10-20/mês
- Resend: $0
- Hunter.io: $49/mês (validar emails)
- Proxycurl: $29/mês (LinkedIn)
- SerpAPI: $50/mês (Google Search)

**Total recomendado: ~$143-153/mês**

### **CAPTAÇÃO ATIVA:**
- Phantombuster: $59/mês (LinkedIn scraping)
- Apify: $49/mês (Instagram/Twitter)
- Hunter.io: $49/mês (encontrar emails)
- Proxycurl: $29/mês (enrichment)
- SerpAPI: $50/mês (Google Search)
- DeepSeek: $0
- Claude: ~$10-20/mês
- Resend: $0

**Total: ~$255/mês**

---

## **📊 RESULTADOS ESPERADOS:**

### **CAPTAÇÃO PASSIVA:**
- **10-20 leads/mês** preenchem formulários
- **80% classificados como LEGITIMATE** (após validações)
- **Taxa de resposta: 25-30%** (emails personalizados)
- **2-4 reuniões/mês** geradas
- **1-2 clientes novos/mês**

### **CAPTAÇÃO ATIVA:**
- **50-80 prospects/mês** encontrados
- **20-30 emails enviados/mês** (apenas quentes)
- **Taxa de resposta: 5-10%** (cold outreach)
- **2-4 reuniões/mês** geradas
- **1-2 clientes novos/mês**

---

## **🔧 TECNOLOGIAS USADAS:**

### **APIs de Validação/Segurança:**
- **ipapi.co** - Geolocalização IP, detecção VPN/proxy (GRÁTIS)
- **AbuseIPDB** - Blacklist IP, detecção IPs maliciosos (GRÁTIS)
- **Hunter.io** - Validação de email, detecção emails descartáveis (PAGO)

### **APIs de Enriquecimento:**
- **Proxycurl** - Dados completos do LinkedIn (PAGO)
- **SerpAPI** - Busca no Google, informações públicas (PAGO)

### **APIs de IA:**
- **DeepSeek** - Análise e classificação de leads (GRÁTIS)
- **Claude 4.5 Sonnet** - Geração de emails personalizados (PAGO)

### **APIs de Comunicação:**
- **Resend** - Envio de emails (GRÁTIS até 3k/mês)
- **WhatsApp Business API** - Envio de mensagens (PAGO)

### **Infraestrutura:**
- **N8N** - Orquestração de workflows (Railway $5/mês)
- **PostgreSQL (Neon)** - Banco de dados (já configurado)

---

## **🎯 RESUMO PARA CHATGPT/GEMINI:**

**Use este documento para explicar ao ChatGPT/Gemini:**

1. **O usuário quer** um sistema que investiga leads automaticamente antes de enviar email
2. **O sistema deve** validar IP (VPN, proxy), email (descartável, válido), buscar LinkedIn, Google
3. **O sistema deve** usar IA (DeepSeek) para classificar se é legítimo ou golpista
4. **O sistema deve** gerar email personalizado (Claude) baseado em pesquisa real
5. **O sistema deve** salvar tudo em JSONB no banco para transparência
6. **O objetivo** é proteger contra golpes E personalizar comunicação
7. **Tudo isso** roda no N8N (workflow automation)

**O ChatGPT/Gemini deve ajudar a:**
- Criar workflow no N8N
- Configurar cada validação
- Integrar cada API
- Ajustar prompts da IA
- Testar e debugar

---

**Este documento contém TUDO que você pediu e eu sugeri!** 🚀

**Use no ChatGPT/Gemini para ter ajuda completa na implementação!**
