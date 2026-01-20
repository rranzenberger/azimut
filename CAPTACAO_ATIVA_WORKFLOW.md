# 🎯 WORKFLOW: CAPTAÇÃO ATIVA DE CLIENTES

## **O QUE É:**

Sistema automatizado que **busca, analisa e aborda** prospects ideais para Azimut.

---

## **COMO FUNCIONA:**

```
BUSCAR → ENRIQUECER → ANALISAR → PERSONALIZAR → ENVIAR → MONITORAR
```

---

## **1️⃣ BUSCAR PROSPECTS**

### **Fontes:**

**A) LinkedIn (via Phantombuster)**
```
Buscas:
- "Diretor de Museu" Brasil
- "Produtor Cultural" Brasil
- "VR Developer" Canada
- "Educador" + "tecnologia"
- "Curador" + "arte digital"
```

**B) Instagram (via Apify)**
```
Hashtags:
#museuinterativo #arteimersiva #vreducation
#culturadigital #experienciaimersiva
```

**C) Google Alerts**
```
Termos:
- "VR museum Brazil"
- "immersive exhibition"
- "Gramado tourism board"
- "interactive art installation"
```

**D) Twitter/X (via Apify)**
```
Pesquisas:
- Tweets sobre VR + museum
- Menções a concorrentes
- Interesse em Gramado/Canada
```

---

## **2️⃣ ENRIQUECER DADOS**

### **Para cada prospect:**

```javascript
// N8N Workflow - Nó "Enrich Prospect"

const prospect = {
  name: "João Silva",
  linkedin: "linkedin.com/in/joao-silva",
  company: "Museu Nacional"
};

// 1. Buscar email (Hunter.io)
const email = await hunterIO.findEmail(prospect.linkedin);

// 2. Dados completos LinkedIn (Proxycurl)
const linkedinData = await proxycurl.getProfile(prospect.linkedin);

// 3. Posts recentes Instagram/LinkedIn
const recentPosts = await getPosts(prospect);

// 4. Google Search (SerpAPI)
const googleResults = await serpAPI.search(`${prospect.name} ${prospect.company}`);

// Resultado:
{
  name: "João Silva",
  email: "joao@museunacional.br",
  title: "Diretor de Tecnologia",
  company: "Museu Nacional",
  location: "Rio de Janeiro, Brasil",
  recentPosts: [
    "Excited about new VR exhibit!",
    "Looking for interactive solutions..."
  ],
  interests: ["VR", "museology", "education"],
  recentSearch: ["VR museums Brazil", "interactive exhibits"]
}
```

---

## **3️⃣ ANALISAR COM IA (DeepSeek)**

### **Prompt para DeepSeek:**

```
Analyze this prospect and determine:

1. FIT SCORE (0-100): How well does this prospect match Azimut's ideal client?
2. PERSONA: Which category?
   - Museum Director
   - Cultural Producer
   - VR Educator
   - Tourism Board
   - Corporate Training
3. INTENT SIGNALS: Recent actions indicating interest
4. APPROACH ANGLE: Best way to start conversation
5. RELEVANT AZIMUT PROJECTS: Which portfolio pieces to mention

Prospect data:
{prospect_data}

Azimut portfolio:
- Museu Olímpico (Lausanne): VR museum experience
- VanArts (Vancouver): VR education
- Curadoria Gramado: Art curation & immersive exhibits
- NFL Experience (Times Square): Interactive installation

Response format (JSON):
{
  "fitScore": 85,
  "persona": "Museum Director",
  "intentSignals": ["Posted about VR exhibits", "Searched for interactive solutions"],
  "approachAngle": "Mention Museu Olímpico project as reference",
  "relevantProjects": ["Museu Olímpico", "Curadoria Gramado"],
  "smallTalk": "Recent post about digital transformation in museums",
  "decision": "SEND" // ou "SKIP"
}
```

---

## **4️⃣ CRIAR EMAIL PERSONALIZADO (Claude)**

### **Prompt para Claude 4.5 Sonnet:**

```
Create a highly personalized cold outreach email in Portuguese (or English if prospect is Canadian).

CONTEXT:
- Sender: Ranz from Azimut (immersive experiences studio)
- Prospect: {prospect_data}
- Fit Score: {fitScore}
- Intent Signals: {intentSignals}
- Relevant Projects: {relevantProjects}
- Small Talk: {smallTalk}

TONE:
- Friendly, not salesy
- Cinematic, creative
- Shows genuine interest in their work
- 2-3 emojis max (🎬 🌐 ✨ 🎯 💡)

STRUCTURE:
1. Subject line (intriguing, not spammy)
2. Personal opening (mention their recent work)
3. Brief Azimut intro (relevant project only)
4. Soft CTA (coffee chat, demo, portfolio review)
5. Signature

MAX: 150 words

Example output:
{
  "subject": "Experiências imersivas para museus 🎨✨",
  "body": "Olá João,\n\nVi seu post sobre transformação digital no Museu Nacional — adorei a visão! 🌟\n\nSomos da Azimut, criamos experiências imersivas para museus e instituições culturais. Trabalhamos no Museu Olímpico em Lausanne com curadoria digital e VR 360°.\n\nNosso portfólio de museus: azmt.com.br/pt/trabalhos\n\nQue tal trocar ideias sobre como VR pode ampliar o alcance de exposições? Podemos marcar um café virtual. ☕\n\nAbraço,\nRanz\nAzimut — Immersive Experiences\nazmt.com.br"
}
```

---

## **5️⃣ ENVIAR E MONITORAR**

### **Fluxo N8N:**

```javascript
// 1. Enviar email (Resend)
await resend.send({
  from: 'ranz@azmt.com.br',
  to: prospect.email,
  subject: email.subject,
  text: email.body
});

// 2. Salvar no CRM (PostgreSQL)
await db.insert('prospects', {
  ...prospect,
  emailSent: true,
  sentAt: new Date(),
  campaign: 'outbound-museums-q1-2026'
});

// 3. Agendar follow-ups
await scheduleFollowUps([
  { days: 3, type: 'check' },
  { days: 7, type: 'second-email' },
  { days: 14, type: 'final-attempt' }
]);

// 4. Monitorar resposta (Resend webhook)
// Se responder: Notificar time no Slack
```

---

## **6️⃣ FOLLOW-UP AUTOMÁTICO**

### **Se não responder em 7 dias:**

**DeepSeek analisa novamente:**
- Prospect publicou algo novo?
- Mudou de empresa?
- Atividade recente?

**Claude cria follow-up:**
```
Assunto: Re: Experiências imersivas para museus

Oi João,

Sei que deve estar ocupado! 

Vi que vocês anunciaram a nova exposição de arte digital — parece incrível! 🎨

Se quiser ver exemplos de como usamos VR em museus similares, é só responder. Zero pressão!

Abraço,
Ranz
```

---

## **📊 MÉTRICAS PARA MONITORAR:**

```
Dashboard N8N:
- Prospects encontrados/semana
- Fit Score médio
- Emails enviados
- Taxa de abertura (via Resend)
- Taxa de resposta
- Reuniões agendadas
- Conversões (clientes)

Meta:
- 50 prospects/semana
- 20 emails enviados/semana
- 25% taxa abertura
- 5% taxa resposta
- 2 reuniões/mês
- 1 cliente novo/trimestre
```

---

## **💰 CUSTOS ESTIMADOS:**

### **Ferramentas necessárias:**

| Ferramenta | Uso | Custo/mês |
|------------|-----|-----------|
| **Phantombuster** | LinkedIn scraping | $59 |
| **Apify** | Instagram/Twitter scraping | $49 |
| **Hunter.io** | Encontrar emails | $49 |
| **Proxycurl** | LinkedIn enrichment | $29 |
| **SerpAPI** | Google search | $50 |
| **Resend** | Emails (até 3k) | $0 |
| **DeepSeek** | Análise | $0 |
| **Claude API** | Emails | ~$10 |
| **Railway N8N** | Orquestração | $5 |

**TOTAL: ~$251/mês**

---

## **🎯 ROI ESPERADO:**

### **Cenário conservador:**

```
Investimento: $251/mês
Prospects contatados: 80/mês
Taxa conversão: 2.5%
Novos clientes: 2/mês

Valor médio projeto Azimut: $15,000
Revenue novo: $30,000/mês
ROI: 11,850%

Break-even: 1 projeto a cada 6 meses
```

---

## **📋 IMPLEMENTAÇÃO:**

### **Fase 1 (Semana 1):**
- [ ] Criar conta Phantombuster
- [ ] Criar conta Apify
- [ ] Configurar N8N workflow base
- [ ] Testar busca LinkedIn (10 prospects)

### **Fase 2 (Semana 2):**
- [ ] Integrar Hunter.io (emails)
- [ ] Integrar Proxycurl (enrichment)
- [ ] Configurar prompts DeepSeek
- [ ] Testar análise (10 prospects)

### **Fase 3 (Semana 3):**
- [ ] Integrar Claude API
- [ ] Criar templates de email
- [ ] Testar envio (5 prospects reais)
- [ ] Configurar Resend tracking

### **Fase 4 (Semana 4):**
- [ ] Sistema de follow-up automático
- [ ] Dashboard de métricas
- [ ] CRM integrado (PostgreSQL)
- [ ] Lançar campanha (20 prospects/semana)

---

## **🚀 PRÓXIMOS PASSOS:**

1. **Você:** Aprova o plano?
2. **Eu:** Crio workflow N8N completo
3. **Você:** Cria contas (Phantombuster, Apify, etc)
4. **Eu:** Configuro tudo no N8N
5. **Nós:** Testamos com 10 prospects
6. **Nós:** Lançamos campanha real

---

**Quer começar?** 🚀
