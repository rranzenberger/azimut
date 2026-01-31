# 🚀 GUIA COMPLETO: IMPLEMENTAR CAPTAÇÃO ATIVA

## **📋 QUANDO USAR ESTE DOCUMENTO:**

Quando você estiver pronto para implementar **Captação Ativa** (buscar prospects automaticamente), siga este guia passo a passo.

**Pré-requisito:** Workflow 1 (Captação Passiva) funcionando ✅

---

## **🎯 O QUE É CAPTAÇÃO ATIVA:**

Sistema automatizado que **busca, analisa e aborda prospects** sem esperar eles te encontrarem.

```
┌─────────────────────────────────────────┐
│  FLUXO COMPLETO                         │
├─────────────────────────────────────────┤
│  1. N8N busca prospects (LinkedIn, etc) │
│  2. DeepSeek analisa perfil (fit score) │
│  3. Claude cria email personalizado     │
│  4. Resend envia automaticamente        │
│  5. N8N monitora respostas              │
│  6. Follow-ups automáticos              │
└─────────────────────────────────────────┘
```

---

## **💰 INVESTIMENTO NECESSÁRIO:**

### **APIs essenciais:**

| Ferramenta | Função | Custo/mês | Link |
|------------|--------|-----------|------|
| **Phantombuster** | Buscar no LinkedIn | $59 | https://phantombuster.com/pricing |
| **Apify** | Instagram/Twitter | $49 | https://apify.com/pricing |
| **Hunter.io** | Encontrar emails | $49 | https://hunter.io/pricing |
| **Proxycurl** | Dados LinkedIn | $29 | https://nubela.co/proxycurl/pricing |
| **SerpAPI** | Google Search | $50 | https://serpapi.com/pricing |

**TOTAL: ~$236/mês** (além dos $5 do Railway)

### **APIs opcionais (futuro):**
- Clearbit: $99/mês (dados de empresa)
- Google Custom Search: $5 por 1k buscas

---

## **📅 CRONOGRAMA DE IMPLEMENTAÇÃO:**

### **SEMANA 1: Setup inicial**

#### **Dia 1-2: Criar contas APIs**

**Phantombuster:**
1. Ir em https://phantombuster.com/
2. Criar conta
3. Assinar plano Maker ($59/mês)
4. Copiar API Key (Settings → API Key)
5. Guardar: `PHANTOMBUSTER_API_KEY=sua-key-aqui`

**Apify:**
1. Ir em https://apify.com/
2. Criar conta
3. Assinar plano Personal ($49/mês)
4. Copiar API Token (Settings → Integrations)
5. Guardar: `APIFY_API_TOKEN=seu-token-aqui`

**Hunter.io:**
1. Ir em https://hunter.io/
2. Criar conta
3. Assinar plano Starter ($49/mês)
4. Copiar API Key (API → API Keys)
5. Guardar: `HUNTER_API_KEY=sua-key-aqui`

**Proxycurl:**
1. Ir em https://nubela.co/proxycurl/
2. Criar conta
3. Assinar plano Basic ($29/mês)
4. Copiar API Key (Dashboard → API Key)
5. Guardar: `PROXYCURL_API_KEY=sua-key-aqui`

**SerpAPI:**
1. Ir em https://serpapi.com/
2. Criar conta
3. Assinar plano Standard ($50/mês)
4. Copiar API Key (Manage Account → API Key)
5. Guardar: `SERPAPI_KEY=sua-key-aqui`

---

#### **Dia 3-4: Configurar credenciais no N8N**

**Acessar N8N:**
```
URL: https://n8n-production-dce3.up.railway.app
```

**Para cada API, criar credencial:**

1. Clicar em **"Credentials"** (barra lateral)
2. Clicar em **"Add Credential"**
3. Buscar tipo: **"HTTP Header Auth"**
4. Adicionar:

**Phantombuster:**
```
Name: phantombusterAuth
Header Name: X-Phantombuster-Key
Header Value: [sua PHANTOMBUSTER_API_KEY]
```

**Apify:**
```
Name: apifyAuth
Header Name: Authorization
Header Value: Bearer [seu APIFY_API_TOKEN]
```

**Hunter.io:**
```
Name: hunterAuth
Header Name: Authorization
Header Value: Bearer [sua HUNTER_API_KEY]
```

**Proxycurl:**
```
Name: proxycurlAuth
Header Name: Authorization
Header Value: Bearer [sua PROXYCURL_API_KEY]
```

**SerpAPI:**
```
Name: serpapiAuth
Header Name: Authorization
Header Value: Bearer [sua SERPAPI_KEY]
```

---

#### **Dia 5: Testar APIs**

**No N8N, criar workflow de teste:**

1. Webhook (trigger)
2. HTTP Request → Phantombuster (testar)
3. HTTP Request → Hunter.io (testar email)
4. HTTP Request → Proxycurl (testar LinkedIn)
5. HTTP Request → SerpAPI (testar Google)

**Executar workflow e verificar se todas retornam dados.**

---

### **SEMANA 2: Criar Workflow "Captação Ativa"**

#### **Estrutura do workflow:**

```
┌──────────────┐
│ 1. Scheduler │ ← Roda diariamente
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 2. Buscar    │ ← Phantombuster (LinkedIn)
│   Prospects  │ ← Apify (Instagram/Twitter)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 3. Enriquecer│ ← Hunter.io (email)
│   Dados      │ ← Proxycurl (LinkedIn completo)
│              │ ← SerpAPI (Google search)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 4. Analisar  │ ← DeepSeek (fit score, persona)
│   com IA     │ ← Classificar: SEND/SKIP
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 5. Criar     │ ← Claude 4.5 Sonnet
│   Email      │ ← Email hiper-personalizado
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 6. Salvar    │ ← PostgreSQL (CRM)
│   no CRM     │ ← Campo: prospects
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 7. Enviar    │ ← Resend API
│   Email      │ ← Tracking ativado
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 8. Agendar   │ ← Follow-up (7 dias)
│   Follow-up  │ ← Follow-up (14 dias)
└──────────────┘
```

---

#### **Nós do N8N (detalhado):**

**NÓ 1: Schedule Trigger**
```
Tipo: Schedule Trigger
Frequência: Diária (10:00 AM)
Quantidade: 20 prospects/dia
```

**NÓ 2: Buscar Prospects no LinkedIn**
```
Tipo: HTTP Request
URL: https://api.phantombuster.com/api/v2/agents/fetch
Method: POST
Auth: phantombusterAuth
Body:
{
  "id": "linkedin-search-export",
  "argument": {
    "search": "Diretor de Museu Brasil",
    "numberOfProfiles": 20
  }
}
```

**NÓ 3: Encontrar Email**
```
Tipo: HTTP Request
URL: https://api.hunter.io/v2/email-finder
Method: GET
Auth: hunterAuth
Query:
- domain: {{$node["Buscar Prospects"].json["company_domain"]}}
- first_name: {{$node["Buscar Prospects"].json["first_name"]}}
- last_name: {{$node["Buscar Prospects"].json["last_name"]}}
```

**NÓ 4: Enriquecer LinkedIn**
```
Tipo: HTTP Request
URL: https://nubela.co/proxycurl/api/v2/linkedin
Method: GET
Auth: proxycurlAuth
Query:
- url: {{$node["Buscar Prospects"].json["linkedin_url"]}}
```

**NÓ 5: Google Search**
```
Tipo: HTTP Request
URL: https://serpapi.com/search
Method: GET
Auth: serpapiAuth
Query:
- q: {{$node["Buscar Prospects"].json["name"]}} {{$node["Buscar Prospects"].json["company"]}}
- num: 5
```

**NÓ 6: Analisar com DeepSeek**
```
Tipo: HTTP Request
URL: https://api.deepseek.com/v1/chat/completions
Method: POST
Headers:
- Authorization: Bearer {{$env.DEEPSEEK_API_KEY}}
Body:
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert at analyzing sales prospects. Return ONLY valid JSON."
    },
    {
      "role": "user",
      "content": "Analyze this prospect and return fit score (0-100), persona, intent signals, approach angle, relevant Azimut projects to mention, and decision (SEND/SKIP):\n\nProspect:\n{{$json}}\n\nAzimut portfolio:\n- Museu Olímpico (VR museum)\n- VanArts (VR education)\n- Curadoria Gramado\n- NFL Experience\n\nReturn JSON: {fitScore, persona, intentSignals, approachAngle, relevantProjects, smallTalk, decision}"
    }
  ]
}
```

**NÓ 7: IF (Decision)**
```
Tipo: IF
Condition: {{$node["Analisar com DeepSeek"].json["choices"][0]["message"]["content"]["decision"]}} == "SEND"
```

**NÓ 8: Criar Email (Claude)**
```
Tipo: HTTP Request
URL: https://api.anthropic.com/v1/messages
Method: POST
Headers:
- x-api-key: {{$env.CLAUDE_API_KEY}}
- anthropic-version: 2023-06-01
Body:
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 500,
  "messages": [
    {
      "role": "user",
      "content": "Create a personalized cold outreach email in Portuguese (or English if Canadian).\n\nContext:\n- Sender: Ranz from Azimut\n- Prospect: {{$node["Enriquecer LinkedIn"].json}}\n- Fit Score: {{$node["Analisar com DeepSeek"].json.fitScore}}\n- Intent Signals: {{$node["Analisar com DeepSeek"].json.intentSignals}}\n- Relevant Projects: {{$node["Analisar com DeepSeek"].json.relevantProjects}}\n- Small Talk: {{$node["Analisar com DeepSeek"].json.smallTalk}}\n\nTone: Friendly, creative, cinematic (2-3 emojis max: 🎬 🌐 ✨)\n\nStructure:\n1. Subject (intriguing)\n2. Personal opening (mention their recent work)\n3. Brief Azimut intro (relevant project only)\n4. Soft CTA (coffee chat)\n5. Signature\n\nMax 150 words. Return JSON: {subject, body}"
    }
  ]
}
```

**NÓ 9: Salvar no PostgreSQL**
```
Tipo: Postgres
Operation: Insert
Table: prospects
Columns:
- name: {{$node["Buscar Prospects"].json.name}}
- email: {{$node["Encontrar Email"].json.email}}
- linkedin: {{$node["Buscar Prospects"].json.linkedin_url}}
- company: {{$node["Buscar Prospects"].json.company}}
- title: {{$node["Buscar Prospects"].json.title}}
- location: {{$node["Buscar Prospects"].json.location}}
- fit_score: {{$node["Analisar com DeepSeek"].json.fitScore}}
- persona: {{$node["Analisar com DeepSeek"].json.persona}}
- campaign: 'outbound-museums-q1-2026'
- status: 'EMAIL_SENT'
- sent_at: {{$now}}
```

**NÓ 10: Enviar Email (Resend)**
```
Tipo: HTTP Request
URL: https://api.resend.com/emails
Method: POST
Headers:
- Authorization: Bearer {{$env.RESEND_API_KEY}}
Body:
{
  "from": "Ranz <ranz@azmt.com.br>",
  "to": ["{{$node["Encontrar Email"].json.email}}"],
  "subject": "{{$node["Criar Email"].json.subject}}",
  "text": "{{$node["Criar Email"].json.body}}"
}
```

**NÓ 11: Agendar Follow-up**
```
Tipo: Schedule Trigger
Run: 7 days after
Action: Check if reply received
If no reply: Send follow-up email
```

---

### **SEMANA 3: Testes**

#### **Teste 1: Buscar 5 prospects**
```
1. Executar workflow manualmente
2. Ver se encontra 5 prospects no LinkedIn
3. Verificar dados retornados (nome, empresa, LinkedIn)
```

#### **Teste 2: Enriquecer 1 prospect**
```
1. Pegar 1 prospect do teste anterior
2. Ver se Hunter.io encontra email
3. Ver se Proxycurl retorna dados completos
4. Ver se SerpAPI retorna resultados Google
```

#### **Teste 3: Análise IA**
```
1. Enviar dados de 1 prospect para DeepSeek
2. Verificar se retorna:
   - fitScore (0-100)
   - persona (Museum Director, etc)
   - intentSignals (lista)
   - decision (SEND/SKIP)
```

#### **Teste 4: Criação de email**
```
1. Enviar dados para Claude
2. Verificar se email:
   - Está no idioma correto (PT/EN)
   - Menciona trabalho recente do prospect
   - Menciona projeto Azimut relevante
   - Tem CTA suave
   - Max 150 palavras
```

#### **Teste 5: Envio real**
```
1. Usar SEU próprio email como teste
2. Executar workflow completo
3. Verificar:
   - Email chegou?
   - Formatação OK?
   - Não foi para spam?
```

---

### **SEMANA 4: Lançamento**

#### **Dia 1: Campanha piloto (10 prospects)**
```
1. Executar workflow
2. Enviar para 10 prospects reais
3. Monitorar respostas
```

#### **Dia 2-3: Análise**
```
Métricas:
- Taxa de entrega: X/10 (meta: 100%)
- Taxa de abertura: X/10 (meta: 20-30%)
- Taxa de resposta: X/10 (meta: 5-10%)
```

#### **Dia 4-5: Ajustes**
```
Se taxa abertura < 20%:
→ Ajustar subject line (testar no Claude)

Se taxa resposta < 5%:
→ Ajustar CTA (mais suave)
→ Melhorar small talk (DeepSeek)
```

#### **Dia 6-7: Escalar**
```
Se tudo OK:
→ Aumentar para 20 prospects/dia
→ Configurar múltiplas buscas (museus, VR educators, etc)
```

---

## **🔧 CONFIGURAÇÕES ADICIONAIS:**

### **Railway Environment Variables:**

Adicionar no Railway (projeto N8N):
```
PHANTOMBUSTER_API_KEY=sua-key
APIFY_API_TOKEN=seu-token
HUNTER_API_KEY=sua-key
PROXYCURL_API_KEY=sua-key
SERPAPI_KEY=sua-key
CLAUDE_API_KEY=sua-key (já deve ter)
DEEPSEEK_API_KEY=sua-key (já deve ter)
RESEND_API_KEY=sua-key (já deve ter)
```

---

### **PostgreSQL: Criar tabela CRM**

**SQL para executar no Neon:**
```sql
CREATE TABLE IF NOT EXISTS prospects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  linkedin VARCHAR(500),
  company VARCHAR(255),
  title VARCHAR(255),
  location VARCHAR(255),
  fit_score INTEGER,
  persona VARCHAR(100),
  intent_signals JSONB,
  enrichment_data JSONB,
  campaign VARCHAR(100),
  status VARCHAR(50) DEFAULT 'NEW',
  email_sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  replied_at TIMESTAMP,
  reply_content TEXT,
  follow_up_1_sent TIMESTAMP,
  follow_up_2_sent TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_prospects_campaign ON prospects(campaign);
CREATE INDEX idx_prospects_fit_score ON prospects(fit_score DESC);
CREATE INDEX idx_prospects_sent_at ON prospects(sent_at);
```

---

## **📊 MÉTRICAS PARA MONITORAR:**

### **Dashboard N8N:**

Criar views no PostgreSQL:
```sql
-- Prospects por campanha
SELECT campaign, COUNT(*), AVG(fit_score)
FROM prospects
GROUP BY campaign;

-- Taxa de resposta
SELECT 
  COUNT(*) FILTER (WHERE email_sent = true) as enviados,
  COUNT(*) FILTER (WHERE replied_at IS NOT NULL) as respostas,
  (COUNT(*) FILTER (WHERE replied_at IS NOT NULL)::float / 
   COUNT(*) FILTER (WHERE email_sent = true)::float * 100) as taxa_resposta
FROM prospects
WHERE sent_at > NOW() - INTERVAL '30 days';

-- Melhores personas
SELECT persona, COUNT(*), AVG(fit_score)
FROM prospects
WHERE replied_at IS NOT NULL
GROUP BY persona
ORDER BY COUNT(*) DESC;
```

---

## **🎯 METAS DE SUCESSO:**

### **Mês 1:**
- [ ] 80 prospects contatados
- [ ] 20% taxa abertura
- [ ] 5% taxa resposta
- [ ] 2 reuniões agendadas

### **Mês 2:**
- [ ] 160 prospects contatados
- [ ] 25% taxa abertura
- [ ] 7% taxa resposta
- [ ] 4 reuniões agendadas
- [ ] 1 cliente novo

### **Mês 3:**
- [ ] 240 prospects contatados
- [ ] 30% taxa abertura
- [ ] 10% taxa resposta
- [ ] 6 reuniões agendadas
- [ ] 2 clientes novos

---

## **🚨 TROUBLESHOOTING:**

### **Problema: Emails indo para spam**
**Solução:**
1. Verificar SPF/DKIM no domínio azmt.com.br
2. Usar "reply-to" real (não noreply)
3. Reduzir emojis
4. Aumentar intervalo entre envios

### **Problema: Taxa de resposta baixa**
**Solução:**
1. Melhorar small talk (DeepSeek)
2. Testar diferentes CTAs
3. Segmentar melhor personas
4. Aumentar fit score mínimo (de 70 para 80)

### **Problema: APIs custando muito**
**Solução:**
1. Reduzir quantidade de prospects/dia
2. Usar cache para dados já buscados
3. Filtrar melhor antes de enriquecer

---

## **💡 OTIMIZAÇÕES FUTURAS:**

### **Fase 2 (depois de 3 meses):**
- [ ] LinkedIn Automation (Phantombuster send messages)
- [ ] Instagram Outreach (Apify + DM automation)
- [ ] A/B Testing de subject lines
- [ ] Multiple campaigns (museus, VR educators, etc)

### **Fase 3 (depois de 6 meses):**
- [ ] Competitor Watch (quem visita concorrentes)
- [ ] Reengajamento (leads antigos)
- [ ] Referral program (pedir indicações)

---

## **📝 CHECKLIST FINAL:**

Antes de começar, você tem:
- [ ] Railway Hobby ativo ($5/mês)
- [ ] Workflow 1 (Passiva) funcionando
- [ ] Budget aprovado ($236/mês para APIs)
- [ ] Tempo para dedicar (1 semana setup + monitoramento diário)

**Se tudo OK → Começar SEMANA 1!**

---

## **🆘 PRECISA DE AJUDA?**

Quando for implementar, me mostre este documento e eu:
1. ✅ Leio o contexto completo
2. ✅ Crio as contas necessárias (com você)
3. ✅ Configuro o workflow N8N completo
4. ✅ Testo tudo
5. ✅ Lanço a campanha piloto
6. ✅ Monitoro e ajusto

**Basta dizer: "Quero implementar Captação Ativa agora"**

---

**Salvo em:** `IMPLEMENTAR_CAPTACAO_ATIVA_GUIA_COMPLETO.md`
