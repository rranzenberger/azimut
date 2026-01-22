# 📋 WORKFLOWS 3 A 7 - DETALHES DE IMPLEMENTAÇÃO

## **🎯 RESUMO:**

Este documento contém **detalhes completos** dos workflows 3 a 7 que serão implementados no futuro.

**Pré-requisito:** Workflows 1 e 2 funcionando ✅

---

## **🔗 WORKFLOW 3: LinkedIn Automation**

**Status:** 💡 Futuro (Mês 4-6)  
**Custo adicional:** +$59/mês  
**ROI:** 30-50 conexões/mês

### **O que faz:**
- Busca prospects no LinkedIn automaticamente
- Envia conexão personalizada
- Após aceitar: Envia mensagem personalizada
- Follow-ups automáticos

### **Estrutura N8N:**

```
┌─────────────────────────────────────────┐
│ 1. Schedule (diário, 10:00 AM)         │
│    Quantidade: 10 conexões/dia          │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 2. Buscar Prospects (Phantombuster)     │
│    Search: "Diretor de Museu Brasil"   │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 3. Enriquecer (Proxycurl)               │
│    Dados completos LinkedIn             │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 4. Analisar (DeepSeek)                  │
│    Fit score, decision: SEND/SKIP       │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 5. Enviar Conexão (Phantombuster)       │
│    Mensagem: "Vi seu trabalho em..."   │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 6. Aguardar 7 dias                      │
│    Verificar se aceitou                 │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 7. Se aceitou: Criar Mensagem (Claude) │
│    Mensagem personalizada               │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 8. Enviar Mensagem (Phantombuster)      │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 9. Follow-ups (3, 7, 14 dias)           │
└─────────────────────────────────────────┘
```

### **APIs necessárias:**
- Phantombuster LinkedIn Automation: $59/mês
- Proxycurl: $29/mês (já tem no Workflow 2)
- DeepSeek: $0 (já tem)
- Claude: ~$10/mês (já tem)

### **Implementação:**
1. Criar conta Phantombuster (LinkedIn automation)
2. Conectar conta LinkedIn no Phantombuster
3. Criar workflow N8N seguindo estrutura acima
4. Testar com 5 conexões
5. Escalar para 10 conexões/dia

---

## **📸 WORKFLOW 4: Instagram Outreach**

**Status:** 💡 Futuro (Mês 4-6)  
**Custo adicional:** $0 (APIs já no Workflow 2)  
**ROI:** 20-30 contatos/mês

### **O que faz:**
- Busca perfis no Instagram (hashtags culturais)
- Analisa se é prospect
- Encontra email
- Envia email personalizado
- Segue no Instagram

### **Hashtags para buscar:**
```
#museuinterativo
#arteimersiva
#vreducation
#culturadigital
#experienciaimersiva
#museologia
#artecontemporanea
#realidadevirtual
```

### **Estrutura N8N:**

```
┌─────────────────────────────────────────┐
│ 1. Schedule (diário, 9:00 AM)           │
│    Quantidade: 10 perfis/dia             │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 2. Buscar Perfis (Apify)                │
│    Hashtag: #museuinterativo            │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 3. Analisar Perfil (DeepSeek)            │
│    É prospect? Fit score?                │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 4. Encontrar Email (Hunter.io)           │
│    Via domínio do perfil                 │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 5. Criar Email (Claude)                  │
│    Menciona post recente do Instagram    │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 6. Enviar Email (Resend)                 │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 7. Seguir no Instagram (Apify)           │
│    Engajar com posts recentes            │
└─────────────────────────────────────────┘
```

### **APIs necessárias:**
- Apify: $49/mês (já tem no Workflow 2)
- Hunter.io: $49/mês (já tem)
- DeepSeek: $0 (já tem)
- Claude: ~$10/mês (já tem)
- Resend: $0 (já tem)

### **Implementação:**
1. Configurar Apify para Instagram scraping
2. Criar workflow N8N seguindo estrutura acima
3. Testar com 5 perfis
4. Escalar para 10 perfis/dia

---

## **🔍 WORKFLOW 5: Google Intent**

**Status:** 💡 Futuro (Mês 7+)  
**Custo adicional:** $0 (APIs já no Workflow 2)  
**ROI:** 10-15 leads quentes/mês

### **O que faz:**
- Monitora buscas no Google sobre VR/museus
- Identifica pessoas/empresas pesquisando
- Enriquece dados
- Aborda com email personalizado

### **Termos para monitorar:**
```
"VR museum Brazil"
"immersive exhibition"
"Gramado tourism board"
"interactive art installation"
"VR education Canada"
"museu interativo"
"experiência imersiva"
```

### **Estrutura N8N:**

```
┌─────────────────────────────────────────┐
│ 1. Google Alerts (webhook)             │
│    Recebe alerta quando termo aparece   │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 2. Extrair Dados                        │
│    Nome, empresa, contexto              │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 3. Google Search (SerpAPI)              │
│    Buscar mais sobre pessoa/empresa     │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 4. Encontrar Email (Hunter.io)           │
│    Via domínio da empresa               │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 5. Analisar (DeepSeek)                  │
│    Fit score, persona, decision          │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 6. Criar Email (Claude)                 │
│    "Vi que você pesquisou sobre..."    │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 7. Enviar Email (Resend)                │
└─────────────────────────────────────────┘
```

### **APIs necessárias:**
- Google Alerts: $0 (grátis)
- SerpAPI: $50/mês (já tem no Workflow 2)
- Hunter.io: $49/mês (já tem)
- DeepSeek: $0 (já tem)
- Claude: ~$10/mês (já tem)
- Resend: $0 (já tem)

### **Implementação:**
1. Configurar Google Alerts (termos acima)
2. Configurar webhook para receber alertas
3. Criar workflow N8N seguindo estrutura acima
4. Testar com 5 alertas
5. Monitorar e ajustar termos

---

## **♻️ WORKFLOW 6: Reengajamento**

**Status:** 💡 Futuro (Mês 7+)  
**Custo adicional:** $0 (APIs já no Workflow 2)  
**ROI:** 5-10 leads reativados/mês

### **O que faz:**
- Busca leads inativos (6+ meses)
- Verifica mudanças (LinkedIn, empresa)
- Cria email com novidades
- Reativa relacionamento

### **Estrutura N8N:**

```
┌─────────────────────────────────────────┐
│ 1. Schedule (mensal, 1º do mês)        │
│    Buscar leads inativos (PostgreSQL)   │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 2. Verificar Mudanças (Proxycurl)       │
│    Novo emprego? Novo projeto?          │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 3. Analisar (DeepSeek)                  │
│    O que mudou? Vale reengajar?         │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 4. Criar Email (Claude)                 │
│    "Vi que você [mudança], talvez..."  │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 5. Enviar Email (Resend)                │
└─────────────────────────────────────────┘
```

### **SQL para buscar leads inativos:**
```sql
SELECT * FROM "Lead"
WHERE "createdAt" < NOW() - INTERVAL '6 months'
  AND "emailSent" = true
  AND "repliedAt" IS NULL
ORDER BY "createdAt" DESC;
```

### **APIs necessárias:**
- Proxycurl: $29/mês (já tem no Workflow 2)
- DeepSeek: $0 (já tem)
- Claude: ~$10/mês (já tem)
- Resend: $0 (já tem)

### **Implementação:**
1. Criar query SQL para leads inativos
2. Criar workflow N8N seguindo estrutura acima
3. Testar com 10 leads antigos
4. Escalar para todos leads inativos (mensal)

---

## **👀 WORKFLOW 7: Competitor Watch**

**Status:** 💡 Futuro (Mês 7+)  
**Custo adicional:** +$79/mês  
**ROI:** 5-10 leads quentes/mês

### **O que faz:**
- Detecta quem visita sites de concorrentes
- Identifica empresa/pessoa
- Enriquece dados
- Aborda: "Vi que você explorou [concorrente]..."

### **Estrutura N8N:**

```
┌─────────────────────────────────────────┐
│ 1. Leadfeeder Webhook                   │
│    Recebe visitante de concorrente      │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 2. Identificar Empresa                  │
│    Nome, domínio, LinkedIn              │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 3. Encontrar Email (Hunter.io)           │
│    Via domínio da empresa               │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 4. Analisar (DeepSeek)                  │
│    Fit score, persona, decision          │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 5. Criar Email (Claude)                 │
│    "Vi que você visitou [concorrente]  │
│     conheça nossa abordagem..."         │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 6. Enviar Email (Resend)                │
└─────────────────────────────────────────┘
```

### **APIs necessárias:**
- Leadfeeder: $79/mês (visitor tracking)
- Hunter.io: $49/mês (já tem)
- DeepSeek: $0 (já tem)
- Claude: ~$10/mês (já tem)
- Resend: $0 (já tem)

### **Implementação:**
1. Criar conta Leadfeeder
2. Adicionar tracking nos sites dos concorrentes
3. Configurar webhook no N8N
4. Criar workflow N8N seguindo estrutura acima
5. Testar com 5 visitantes
6. Escalar para todos visitantes qualificados

---

## **📊 RESUMO DE CUSTOS:**

| Workflow | Custo Adicional | Total Acumulado |
|----------|-----------------|-----------------|
| **1. Passiva** | $55/mês | $55/mês |
| **2. Ativa** | +$236/mês | $291/mês |
| **3. LinkedIn** | +$59/mês | $350/mês |
| **4. Instagram** | $0 | $350/mês |
| **5. Google Intent** | $0 | $350/mês |
| **6. Reengajamento** | $0 | $350/mês |
| **7. Competitor Watch** | +$79/mês | $429/mês |

---

## **🎯 QUANDO IMPLEMENTAR:**

**Para implementar qualquer workflow:**
```
Você: "Quero implementar Workflow X agora"
Eu: Leio este documento + AUTOMACOES_ROADMAP_EXECUTIVO.md
Eu: Te guio passo a passo
Eu: Implemento tudo
```

---

**Salvo em:** `WORKFLOWS_3_A_7_DETALHES.md`
