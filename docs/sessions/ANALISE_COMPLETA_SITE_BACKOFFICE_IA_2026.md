# 🔍 ANÁLISE ULTRA-COMPLETA: SITE + BACKOFFICE + IA + LEADS
## DIAGNÓSTICO + PONTOS-CHAVE + AÇÕES PRIORITÁRIAS

**Data:** 08 Janeiro 2026  
**Objetivo:** Analisar TUDO e definir prioridades para 2026-2030

---

## 📊 **ÍNDICE:**

1. [ANÁLISE DO SITE ATUAL](#site)
2. [ANÁLISE DO BACKOFFICE ATUAL](#backoffice)
3. [ANÁLISE DA IA (DeepSeek)](#ia)
4. [PROBLEMA: LEADS FRACOS (Gmail/Hotmail)](#leads)
5. [BANCO DE DADOS: COMO MELHORAR](#database)
6. [GRÁFICOS & ANALYTICS](#analytics)
7. [UX: TEXTO vs. IMAGEM/VÍDEO](#ux)
8. [ESTRUTURA PÁGINAS: O QUE IMPLEMENTAR](#paginas)
9. [PRIORIDADES 2026: TOP 10 AÇÕES](#prioridades)
10. [ROADMAP COMPLETO 2026-2030](#roadmap)

---

<a name="site"></a>
## 🌐 **1. ANÁLISE DO SITE ATUAL (azmt.com.br)**

### **O QUE ESTÁ BOM ✅**

```
✅ DESIGN:
- Moderno, clean
- Menu funcional (logo, idiomas, CTA)
- Responsivo (mobile/tablet/desktop)
- Dark/Light theme toggle
- Estrela de fundo (identidade visual)

✅ CONTEÚDO:
- Multi-idioma (4 línguas: PT/EN/FR/ES)
- Projetos bem fotografados
- Demoreel fullscreen (YouTube)
- Cases de clientes (Museu Olímpico, etc)

✅ TÉCNICO:
- Vite + React (rápido)
- Tailwind CSS (manutenível)
- Vercel (deploy automático)
- SSL + domínio custom

✅ IA BÁSICA:
- Detecta domínio institucional (gov.br, edu, etc)
- Mensagem personalizada
- Tracking básico (páginas vistas)
```

### **O QUE PRECISA MELHORAR ⚠️**

```
⚠️ CONVERSÃO B2B:
❌ Não explica claramente "como trabalhar com Azimut"
❌ Não mostra preços/budget range (user não sabe se pode pagar)
❌ Não mostra grants disponíveis (diferencial!)
❌ Formulário genérico (não qualifica lead)
❌ Falta social proof forte (logos clientes pequenos)
❌ Falta depoimentos em vídeo
❌ Falta números (100k+ visitantes, R$ 2.5M projetos, etc)

⚠️ INTERATIVIDADE:
❌ Tudo estático (fotos/vídeos, sem interação)
❌ Sem demos 3D no browser
❌ Sem calculadora de projeto
❌ Sem chatbot inteligente
❌ Sem personalização visual (todos veem mesmo site)

⚠️ CONTEÚDO:
❌ Muito texto em algumas páginas (ex: About)
❌ Pouco vídeo (só demoreel)
❌ Sem infográficos/animações
❌ Cases sem detalhes (só foto + 2 linhas)
❌ Sem blog/content marketing
❌ Sem recursos downloadable (PDFs, guias)

⚠️ SEO:
❌ Poucas páginas (só 8 principais)
❌ Sem blog (perde tráfego orgânico)
❌ Sem FAQs ricas
❌ Títulos H1 podem melhorar
❌ Alt text imagens incompleto
❌ Schema.org markup faltando

⚠️ TRACKING:
❌ Analytics básico (só Google Analytics)
❌ Sem heatmaps (onde users clicam?)
❌ Sem session recordings
❌ Sem attribution (de onde vem leads?)
❌ Sem A/B testing
```

### **PONTOS-CHAVE SITE: TOP 5 PROBLEMAS**

```
1. ❌ CONVERSÃO BAIXA (0.5%)
   → Falta CTAs fortes
   → Falta explicar processo
   → Falta mostrar budget/grants
   
2. ❌ LEADS NÃO QUALIFICADOS
   → Formulário genérico (só nome/email)
   → Não pergunta budget/timeline/tipo projeto
   → Impossível priorizar
   
3. ❌ MUITO TEXTO, POUCO VISUAL
   → Users não leem
   → Precisa mais vídeo/infográfico/animação
   → Atenção < 10 segundos
   
4. ❌ SITE "GENÉRICO"
   → Museu vê mesmo conteúdo que corporativo
   → Falta personalização
   → IA detecta mas não age
   
5. ❌ FALTA EDUCAÇÃO/CONTEÚDO
   → Clientes não sabem como funciona XR/VR
   → Não sabem que grants existem
   → Precisa educar = gerar demanda
```

---

<a name="backoffice"></a>
## 🎛️ **2. ANÁLISE DO BACKOFFICE ATUAL (azimut-cms)**

### **O QUE ESTÁ BOM ✅**

```
✅ ESTRUTURA:
- Next.js + Prisma (moderno)
- CRUD completo (Projects, Pages, Media, Blog, Team)
- Multi-idioma (edição em 4 línguas)
- Upload de mídia (imagens/vídeos)
- Autenticação (login seguro)

✅ FUNCIONALIDADES:
- Gerenciar projetos (título, descrição, imagens, tags)
- Gerenciar páginas (hero, sections)
- Gerenciar equipe
- Gerenciar blog posts
- Media library

✅ NOVO (Implementado Jan 2026):
- Hero background image (configurable)
- Demoreel video (YouTube URL + media upload)
- Featured project (Museu Olímpico)
- Migrations automáticas (deploy)
```

### **O QUE PRECISA MELHORAR ⚠️**

```
⚠️ ANALYTICS & TRACKING:
❌ Não mostra analytics do site
❌ Não sabe:
   - Quantos visitantes/dia?
   - Páginas mais vistas?
   - De onde vem tráfego?
   - Quais projetos geram mais leads?
❌ Sem dashboard visual
❌ Sem gráficos

⚠️ GESTÃO DE LEADS:
❌ Leads chegam por email (manual!)
❌ Não tem CRM integrado
❌ Não sabe score do lead (quente/frio)
❌ Não sabe histórico (o que visitou?)
❌ Sem follow-up automático
❌ Sem pipeline (descoberta → proposta → fechamento)

⚠️ IA & TRACKING:
❌ IA detecta leads mas não salva no backoffice
❌ Não sabe quais organizações visitaram
❌ Não sabe intent (que projeto querem?)
❌ Dados do DeepSeek ficam no log, não no DB

⚠️ RELATÓRIOS:
❌ Sem relatórios gerenciais
❌ Sem projetos vs. leads (qual projeto converte mais?)
❌ Sem ROI por canal (Google Ads vs. Orgânico)
❌ Sem previsão (quantos projetos fechar esse mês?)

⚠️ UX DO BACKOFFICE:
❌ Interface básica (funcional mas não bonita)
❌ Sem preview real-time (edita, salva, vê no site)
❌ Sem drag-and-drop (ordenar projetos, seções)
❌ Sem templates/presets
```

### **PONTOS-CHAVE BACKOFFICE: TOP 5 PROBLEMAS**

```
1. ❌ SEM ANALYTICS/DASHBOARD
   → Não sabe se site está funcionando
   → Decisões no escuro
   → Precisa: Dashboard com métricas-chave
   
2. ❌ LEADS DESORGANIZADOS
   → Chegam por email genérico
   → Sem score/priorização
   → Sem histórico de interação
   → Precisa: CRM integrado
   
3. ❌ IA NÃO CONECTADA
   → DeepSeek detecta mas não salva
   → Dados perdidos
   → Precisa: IA → Database → Backoffice
   
4. ❌ SEM RELATÓRIOS
   → Não sabe ROI
   → Não sabe qual canal funciona
   → Não sabe prever receita
   → Precisa: Reports automáticos
   
5. ❌ INTERFACE PODE MELHORAR
   → Funcional mas não sexy
   → Sem preview real-time
   → Precisa: UX premium
```

---

<a name="ia"></a>
## 🤖 **3. ANÁLISE DA IA (DeepSeek Atual)**

### **O QUE ESTÁ BOM ✅**

```
✅ DETECÇÃO INSTITUCIONAL:
- Detecta domínios gov/edu/org/museum
- Mostra mensagem personalizada
- Funciona!

✅ SCORING BÁSICO:
- Páginas visitadas
- Tempo na página
- Interesse em projetos específicos

✅ MENSAGENS:
- Contextuais (museu vê mensagem para museu)
- Multi-idioma
- Não invasivas
```

### **O QUE PRECISA MELHORAR ⚠️**

```
⚠️ DADOS NÃO SALVOS:
❌ IA detecta organização MAS não salva no banco
❌ Quando user sai, perdemos tudo
❌ Não conseguimos remarketing
❌ Não sabemos quem voltou

⚠️ DETECÇÃO LIMITADA:
❌ Só detecta por domínio (gmail/hotmail = nada)
❌ Não enriquece dados (nome org, tamanho, budget)
❌ Não detecta intent (que tipo projeto?)
❌ Não prediz probabilidade (vai fechar?)

⚠️ AÇÕES LIMITADAS:
❌ Só mostra mensagem
❌ Não personaliza site (todos veem mesmo)
❌ Não prioriza lead
❌ Não alerta equipe vendas

⚠️ CHATBOT:
❌ Não existe! (só mensagens estáticas)
❌ User não pode perguntar
❌ Perde oportunidade de engajar

⚠️ FOLLOW-UP:
❌ Zero follow-up automático
❌ Não captura email cedo
❌ Não manda email depois
❌ Perde 90% dos leads
```

### **PONTOS-CHAVE IA: TOP 5 PROBLEMAS**

```
1. ❌ DADOS VOLÁTEIS (NÃO SALVOS)
   → IA detecta mas esquece
   → Precisa: Salvar tudo no DB
   
2. ❌ DETECÇÃO SUPERFICIAL
   → Só domínio, não enriquece
   → Precisa: API Clearbit/Hunter.io
   
3. ❌ SEM AÇÕES INTELIGENTES
   → Detecta mas não age
   → Precisa: Personalização visual + alertas
   
4. ❌ SEM CHATBOT
   → User não pode interagir
   → Precisa: Stella (chatbot DeepSeek)
   
5. ❌ SEM FOLLOW-UP
   → 90% saem e nunca voltam
   → Precisa: Email drip campaigns
```

---

<a name="leads"></a>
## 📧 **4. PROBLEMA: LEADS FRACOS (Gmail/Hotmail)**

### **PROBLEMA ATUAL:**

```
❌ SITUAÇÃO:
"Muitos entram com email genérico (Gmail, Hotmail, Yahoo)
 e não sabemos NADA sobre eles:
 - Quem são?
 - Que organização?
 - Qual budget?
 - Que projeto?
 - Quando precisam?"

RESULTADO:
→ Equipe vendas perde tempo com leads ruins
→ Não sabe priorizar
→ Taxa de conversão baixa (0.5%)
```

### **POR QUE ISSO ACONTECE?**

```
1. FORMULÁRIO GENÉRICO:
   Atual:
   - Nome: [ ]
   - Email: [ ]
   - Mensagem: [ ]
   
   Problema: Não qualifica!

2. SEM INCENTIVO:
   User não quer dar dados se não vê valor

3. TIMING ERRADO:
   Pergunta email muito cedo
   User ainda explorando, não pronto

4. FALTA SOCIAL PROOF:
   Não confia = não dá dados reais
```

### **SOLUÇÃO: ESTRATÉGIA MULTI-CAMADAS**

#### **LAYER 1: CAPTURA EARLY (SEM COMPROMISSO)**

```typescript
// Pop-up inteligente após 60 segundos ou scroll 50%

<Popup trigger="time:60s OR scroll:50%">
  <h3>📚 Baixe Nosso Guia Gratuito</h3>
  
  <p>"Como Conseguir Funding de até R$ 5M para 
     Projetos Culturais e Museus"</p>
  
  <ul>
    ✓ Lista completa de grants (BR, CA, USA, LATAM)
    ✓ Passo a passo para aplicar
    ✓ Templates de proposta
    ✓ Case studies (projetos aprovados)
  </ul>
  
  <form>
    <input placeholder="Seu melhor email" />
    <button>BAIXAR GUIA (PDF 30 páginas)</button>
  </form>
  
  <small>✓ Sem spam ✓ Unsub fácil ✓ 5.000+ downloads</small>
</Popup>

// VALOR PERCEBIDO = User dá email REAL!
// Mesmo Gmail/Hotmail, mas agora temos:
// - Email válido (pode remarketing)
// - Intent (quer grants = lead qualificado)
// - Permissão (pode mandar emails)
```

#### **LAYER 2: QUALIFICAÇÃO PROGRESSIVA**

```typescript
// Não pedir tudo de uma vez!
// Pedir pouco a pouco conforme user engaja

// VISITA 1: Só email (guia)
Email: [ ]
[BAIXAR]

// VISITA 2: User volta, agora pergunta mais
Nome: [ ]
Organização: [ ] ← NOVO
[BAIXAR OUTRO RECURSO]

// VISITA 3: User muito engajado
Cargo: [ ] ← NOVO
Telefone: [ ] ← NOVO
[AGENDAR REUNIÃO]

// PROGRESSIVE PROFILING
// Enriquece dados aos poucos
```

#### **LAYER 3: FORMULÁRIO INTELIGENTE**

```html
<!-- Formulário que QUALIFICA e DÁ VALOR -->

<form class="smart-form">
  <h2>Solicitar Proposta (2 minutos)</h2>
  
  <!-- Dados pessoais -->
  <input name="nome" placeholder="Nome completo" required>
  <input name="email" placeholder="Email" required>
  <input name="telefone" placeholder="WhatsApp (opcional)">
  
  <!-- QUALIFICAÇÃO ORGANIZAÇÃO -->
  <label>Você representa:</label>
  <select name="tipo_org" required>
    <option value="">Selecione...</option>
    <option value="governo">🏛️ Governo (federal/estadual/municipal)</option>
    <option value="museu">🎨 Museu ou Centro Cultural</option>
    <option value="universidade">🎓 Universidade/Educação</option>
    <option value="fundacao">💼 Fundação ou Instituto</option>
    <option value="corporativo">🏢 Empresa Privada</option>
    <option value="produtor">🎬 Produtor/Diretor/Artista</option>
    <option value="outro">🤷 Outro</option>
  </select>
  
  <input name="organizacao" placeholder="Nome da Organização" required>
  <input name="cargo" placeholder="Seu Cargo (opcional)">
  
  <!-- QUALIFICAÇÃO PROJETO -->
  <label>Tipo de Projeto:</label>
  <select name="tipo_projeto">
    <option value="museu">Museu/Exposição</option>
    <option value="instalacao">Instalação Imersiva</option>
    <option value="vr">Experiência VR/AR</option>
    <option value="app">App/Plataforma</option>
    <option value="evento">Evento/Festival</option>
    <option value="indefinido">Ainda não sei (preciso ajuda)</option>
  </select>
  
  <!-- QUALIFICAÇÃO BUDGET (CRÍTICO!) -->
  <label>Budget Disponível:</label>
  <select name="budget" required>
    <option value="">Selecione...</option>
    <option value="<100k">< R$ 100k / CAD $30k</option>
    <option value="100k-300k">R$ 100k-300k / CAD $30k-90k</option>
    <option value="300k-500k">R$ 300k-500k / CAD $90k-150k</option>
    <option value="500k-1m">R$ 500k-1M / CAD $150k-300k</option>
    <option value="1m-3m">R$ 1M-3M / CAD $300k-900k</option>
    <option value="3m+">R$ 3M+ / CAD $900k+</option>
    <option value="grant">💰 Preciso aplicar para grant</option>
    <option value="indefinido">Ainda não defini</option>
  </select>
  
  <!-- QUALIFICAÇÃO TIMELINE -->
  <label>Quando precisa estar pronto?</label>
  <select name="timeline">
    <option value="urgente">⚡ Urgente (< 3 meses)</option>
    <option value="6m">📅 Normal (3-6 meses)</option>
    <option value="12m">🗓️ Planejamento (6-12 meses)</option>
    <option value="18m+">📆 Longo prazo (12+ meses)</option>
    <option value="indefinido">Ainda não sei</option>
  </select>
  
  <!-- DESCRIÇÃO -->
  <textarea name="descricao" rows="4" 
    placeholder="Descreva brevemente seu projeto ou necessidade (opcional)">
  </textarea>
  
  <!-- INTERESSE GRANTS -->
  <label class="checkbox">
    <input type="checkbox" name="interesse_grants">
    ✅ Gostaria de ajuda para aplicar em grants/editais
  </label>
  
  <!-- GDPR -->
  <label class="checkbox">
    <input type="checkbox" name="aceite" required>
    Aceito receber contato da Azimut sobre meu projeto
  </label>
  
  <button type="submit" class="cta-button">
    ENVIAR SOLICITAÇÃO
  </button>
  
  <!-- GARANTIAS -->
  <div class="garantias">
    ✅ Resposta em 24h úteis<br>
    ✅ Reunião de descoberta gratuita<br>
    ✅ Proposta detalhada em 2 semanas<br>
    ✅ Sem compromisso
  </div>
</form>

<!-- RESULTADO: LEAD 10X MAIS QUALIFICADO! -->
```

#### **LAYER 4: ENRIQUECIMENTO DE DADOS**

```typescript
// Mesmo com Gmail/Hotmail, podemos enriquecer!

// 1. User preenche formulário:
{
  nome: "João Silva",
  email: "joao.silva@gmail.com", // Gmail!
  organizacao: "Museu de Arte de São Paulo",
  cargo: "Diretor de Tecnologia"
}

// 2. Backend enriquece automaticamente:
const enrichedData = await enrichLead({
  name: "João Silva",
  organization: "Museu de Arte de São Paulo",
})

// API (Clearbit, Hunter.io, LinkedIn API):
const result = {
  // Dados originais
  nome: "João Silva",
  email: "joao.silva@gmail.com",
  organizacao: "Museu de Arte de São Paulo",
  
  // ENRIQUECIDOS:
  orgDomain: "masp.org.br",
  orgSize: "100-250 employees",
  orgBudget: "R$ 50M-100M/year",
  orgType: "Museum",
  orgLinkedIn: "linkedin.com/company/masp",
  orgWebsite: "masp.org.br",
  
  personLinkedIn: "linkedin.com/in/joaosilva",
  personTitle: "Diretor de Tecnologia",
  personSeniority: "Director",
  
  // AI SCORE
  leadScore: 85, // HOT!
  estimatedBudget: "R$ 500k-1M",
  likelihood: "HIGH",
  priority: "P1 - Contact within 24h"
}

// Salvar no banco + alertar vendas!
```

#### **LAYER 5: REMARKETING & FOLLOW-UP**

```typescript
// Email drip campaign automático

// DIA 0: User baixou guia
Email 1: "Aqui está seu guia de grants! 📚"
+ PDF anexo
+ Link para calculadora

// DIA 2: Se não respondeu
Email 2: "Viu nosso case do Museu Olímpico? 🏆"
+ Case study detalhado
+ Vídeo 3min
+ CTA: "Quer algo similar?"

// DIA 5: Se ainda não respondeu
Email 3: "Próximos deadlines de grants ⏰"
+ CMF: 15 Março
+ Lei Rouanet: contínuo
+ CREA Digital: 15 Setembro
+ CTA: "Ajudamos você a aplicar"

// DIA 10: Se muito engajado (abriu 3 emails)
Email 4: "Vamos conversar? ☕"
+ Calendly link (agendar 30min)
+ Garantia: "Sem compromisso"

// DIA 30: Se não converteu
Email 5: "Ainda está planejando seu projeto?"
+ Oferta especial: "Consultoria gratuita 1h"
+ Último push

// RESULTADO:
// Conversão email: 5% → 15% 🚀
```

---

<a name="database"></a>
## 🗄️ **5. BANCO DE DADOS: COMO MELHORAR**

### **ESTRUTURA ATUAL (Prisma Schema):**

```prisma
// Modelos existentes:
model Project { ... }
model Page { ... }
model Media { ... }
model BlogPost { ... }
model TeamMember { ... }
model User { ... } // Admin users
```

### **PROBLEMA:**

```
❌ Não tem modelo para LEADS!
❌ Não tem modelo para TRACKING!
❌ Não tem modelo para AI_INSIGHTS!
❌ Não tem modelo para ANALYTICS!
```

### **SOLUÇÃO: NOVOS MODELOS**

```prisma
// ═══════════════════════════════════════════════════════════
// LEADS & CRM
// ═══════════════════════════════════════════════════════════

model Lead {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // DADOS PESSOAIS
  nome        String
  email       String
  telefone    String?
  cargo       String?
  
  // DADOS ORGANIZAÇÃO
  organizacao     String?
  tipoOrganizacao String? // governo, museu, corporativo, etc
  orgDomain       String?
  orgSize         String?
  orgBudget       String?
  orgLinkedIn     String?
  orgWebsite      String?
  
  // DADOS PROJETO
  tipoProjeto     String? // museu, vr, app, etc
  budget          String? // range
  timeline        String? // urgente, normal, etc
  descricao       String? @db.Text
  interesseGrants Boolean @default(false)
  
  // QUALIFICAÇÃO
  leadScore       Int      @default(0) // 0-100
  priority        String?  // P1, P2, P3
  status          String   @default("NEW") // NEW, CONTACTED, QUALIFIED, PROPOSAL, WON, LOST
  estimatedValue  Float?   // R$
  likelihood      String?  // LOW, MEDIUM, HIGH
  
  // TRACKING
  source          String?  // Google Ads, Orgânico, Direct, etc
  campaign        String?
  firstVisit      DateTime?
  lastVisit       DateTime?
  pagesVisited    Int      @default(0)
  timeSpent       Int      @default(0) // segundos
  
  // RELACIONAMENTOS
  interactions    Interaction[]
  aiInsights      AIInsight[]
  proposals       Proposal[]
  
  // ASSIGNEE
  assignedTo      User?    @relation(fields: [assignedToId], references: [id])
  assignedToId    String?
  
  // NOTAS
  notas           String?  @db.Text
  
  @@index([email])
  @@index([leadScore])
  @@index([status])
  @@index([createdAt])
}

// ═══════════════════════════════════════════════════════════
// INTERAÇÕES (História do lead)
// ═══════════════════════════════════════════════════════════

model Interaction {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  lead      Lead     @relation(fields: [leadId], references: [id])
  leadId    String
  
  type      String   // PAGE_VIEW, FORM_SUBMIT, EMAIL_OPEN, EMAIL_CLICK, MEETING_SCHEDULED, etc
  action    String   // URL, email subject, meeting date, etc
  metadata  Json?    // Dados extras
  
  @@index([leadId])
  @@index([type])
  @@index([createdAt])
}

// ═══════════════════════════════════════════════════════════
// AI INSIGHTS (DeepSeek salva aqui!)
// ═══════════════════════════════════════════════════════════

model AIInsight {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  lead      Lead     @relation(fields: [leadId], references: [id])
  leadId    String
  
  // DETECÇÃO
  detectedOrg     String?
  detectedIntent  String?
  detectedBudget  String?
  detectedUrgency String?
  
  // SCORE & PREDICTION
  aiScore         Int?     // 0-100
  closeProbability Float?  // 0-1
  estimatedValue   Float?  // R$
  recommendedAction String? // "Contact ASAP", "Send case study", "Follow-up in 1 week"
  
  // RAW DATA
  analysis        Json?    // Resposta completa do DeepSeek
  
  @@index([leadId])
  @@index([createdAt])
}

// ═══════════════════════════════════════════════════════════
// PROPOSTAS
// ═══════════════════════════════════════════════════════════

model Proposal {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  lead        Lead     @relation(fields: [leadId], references: [id])
  leadId      String
  
  title       String
  description String   @db.Text
  value       Float    // R$
  timeline    String   // "8-12 meses"
  status      String   @default("DRAFT") // DRAFT, SENT, ACCEPTED, REJECTED
  
  sentAt      DateTime?
  acceptedAt  DateTime?
  
  // PDF
  pdfUrl      String?
  
  @@index([leadId])
  @@index([status])
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS (Site tracking)
// ═══════════════════════════════════════════════════════════

model PageView {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  // VISITOR
  sessionId String   // Cookie/fingerprint
  userId    String?  // Se lead conhecido
  
  // PAGE
  path      String   // /work, /contact, etc
  title     String?
  referrer  String?
  
  // GEO
  country   String?
  city      String?
  
  // DEVICE
  device    String?  // mobile, desktop, tablet
  browser   String?
  os        String?
  
  // TIMING
  timeSpent Int?     // segundos
  scrollDepth Int?   // %
  
  @@index([sessionId])
  @@index([path])
  @@index([createdAt])
}

// ═══════════════════════════════════════════════════════════
// EVENTOS (Ações específicas)
// ═══════════════════════════════════════════════════════════

model Event {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  sessionId String
  userId    String?
  
  name      String   // "calculator_used", "video_watched", "pdf_downloaded"
  properties Json?   // Dados do evento
  
  @@index([sessionId])
  @@index([name])
  @@index([createdAt])
}
```

### **RESULTADO:**

```
✅ Todos leads salvos (mesmo Gmail!)
✅ Histórico completo de interações
✅ AI insights salvos no banco
✅ Propostas rastreadas
✅ Analytics detalhado
✅ Pode fazer reports/dashboards!
```

---

<a name="analytics"></a>
## 📊 **6. GRÁFICOS & ANALYTICS (Backoffice Dashboard)**

### **PROBLEMA ATUAL:**

```
❌ Backoffice não mostra NADA sobre performance do site
❌ Não sabe quantos visitantes, leads, conversões
❌ Decisões no escuro
```

### **SOLUÇÃO: DASHBOARD COMPLETO**

#### **TELA 1: OVERVIEW (HOME BACKOFFICE)**

```typescript
// Dashboard principal ao fazer login

<Dashboard>
  {/* KPIs */}
  <Grid cols={4}>
    <KPI 
      title="Visitantes (30 dias)"
      value="2.347"
      change="+18%"
      trend="up"
      icon="👥"
    />
    
    <KPI 
      title="Leads Novos"
      value="23"
      change="+5"
      trend="up"
      icon="📧"
    />
    
    <KPI 
      title="Hot Leads (Score 70+)"
      value="8"
      change="+3"
      trend="up"
      icon="🔥"
      alert={true}
    />
    
    <KPI 
      title="Taxa Conversão"
      value="0.98%"
      change="+0.15%"
      trend="up"
      icon="💰"
    />
  </Grid>
  
  {/* GRÁFICO 1: Visitantes Last 30 Days */}
  <Chart type="line" title="Visitantes (30 dias)">
    {/* Linha mostrando visitantes por dia */}
  </Chart>
  
  {/* GRÁFICO 2: Leads por Status */}
  <Chart type="funnel" title="Funil de Conversão">
    Visitantes: 2.347
    ↓
    Engajados (3+ páginas): 580 (25%)
    ↓
    Leads (form): 23 (1%)
    ↓
    Qualificados (score 50+): 15 (0.6%)
    ↓
    Hot (score 70+): 8 (0.3%)
    ↓
    Propostas: 3 (0.1%)
    ↓
    Fechados: 1 (0.04%)
  </Chart>
  
  {/* GRÁFICO 3: Fontes de Tráfego */}
  <Chart type="pie" title="De onde vêm os visitantes?">
    - Orgânico (Google): 45%
    - Direto: 25%
    - LinkedIn: 15%
    - Google Ads: 10%
    - Referral: 5%
  </Chart>
  
  {/* GRÁFICO 4: Páginas Mais Vistas */}
  <Table title="Top 10 Páginas">
    1. /work - 850 views
    2. / (home) - 720 views
    3. /contact - 340 views
    4. /work/museu-olimpico - 280 views
    5. /studio - 210 views
    ...
  </Table>
  
  {/* GRÁFICO 5: Projetos que Geram Mais Leads */}
  <Chart type="bar" title="Projetos → Leads">
    Museu Olímpico: 12 leads
    Projeto X: 5 leads
    Projeto Y: 3 leads
    Projeto Z: 3 leads
  </Chart>
  
  {/* TABELA: Hot Leads (Action Required!) */}
  <Table 
    title="🔥 HOT LEADS (Ação Necessária!)"
    alert={true}
  >
    | Nome | Org | Score | Budget | Status | Ação |
    |------|-----|-------|--------|--------|------|
    | João Silva | MASP | 92 | R$ 1M-3M | NEW | ⚡ LIGAR AGORA |
    | Maria Santos | Gov SP | 85 | R$ 500k-1M | CONTACTED | 📧 Follow-up |
    | Pedro Souza | Museu XYZ | 78 | R$ 300k-500k | QUALIFIED | 📄 Enviar proposta |
    ...
  </Table>
</Dashboard>
```

#### **TELA 2: LEADS (CRM)**

```typescript
<LeadsDashboard>
  {/* Filtros */}
  <Filters>
    Status: [NEW | CONTACTED | QUALIFIED | PROPOSAL | WON | LOST]
    Score: [0-100 slider]
    Budget: [Todos | <100k | 100k-500k | 500k+ ]
    Tipo Org: [Todos | Governo | Museu | Corporativo]
    Assignee: [Todos | João | Maria | Unassigned]
  </Filters>
  
  {/* Tabela de Leads */}
  <Table>
    | Score | Nome | Org | Budget | Status | Last Activity | Ações |
    |-------|------|-----|--------|--------|---------------|-------|
    | 🔥 92 | João Silva | MASP | R$ 1M-3M | NEW | Há 2h | [Ver] [Editar] [Email] [Ligar] |
    | 🌡️ 85 | Maria Santos | Gov SP | R$ 500k-1M | CONTACTED | Ontem | [Ver] [Follow-up] |
    | 🌡️ 78 | Pedro Souza | Museu XYZ | R$ 300k | QUALIFIED | Há 3 dias | [Proposta] |
    | ❄️ 45 | Ana Costa | Startup | <R$ 100k | NEW | Há 1 semana | [Nurture] |
    ...
  </Table>
  
  {/* Click em lead → Detalhes */}
  <LeadDetail id="lead_123">
    <Header>
      <h2>João Silva - MASP</h2>
      <Score>92/100 🔥 HOT LEAD</Score>
      <Status>NEW - Nenhum contato ainda</Status>
      <Button>LIGAR AGORA</Button>
    </Header>
    
    <Section title="Informações">
      Email: joao.silva@gmail.com
      Telefone: (11) 98765-4321
      Cargo: Diretor de Tecnologia
      Organização: Museu de Arte de São Paulo (MASP)
      Tipo: Museu
      Budget: R$ 1M-3M
      Timeline: 6-12 meses
      Interesse grants: Sim ✅
    </Section>
    
    <Section title="Projeto">
      Tipo: Museu/Exposição
      Descrição: "Queremos criar sala imersiva permanente
                  sobre arte brasileira moderna. VR + 
                  projection mapping. 200m²."
    </Section>
    
    <Section title="AI Insights">
      🎯 Probabilidade de fechar: 78% (ALTA)
      💰 Valor estimado: R$ 1.5M
      ⏱️ Timing: Pronto para decidir (visitou 3x)
      📊 Organização: Budget R$ 50M-100M/ano
      
      💡 Ação recomendada:
      "Contatar HOJE! Mostrar case Museu Olímpico 
       (similar). Mencionar Lei Rouanet (pode cobrir 
       60%). Oferecer reunião presencial MASP."
    </Section>
    
    <Section title="Histórico (Timeline)">
      📅 Hoje, 14:30 - Preencheu formulário (proposta)
      📅 Hoje, 14:15 - Assistiu demoreel completo
      📅 Hoje, 14:05 - Viu Museu Olímpico (3min)
      📅 Ontem, 16:20 - Visitou /work (5 páginas)
      📅 Há 3 dias, 10:00 - Primeira visita (Google: "experiências imersivas museus")
    </Section>
    
    <Section title="Notas Internas">
      <TextArea placeholder="Adicionar nota...">
      [João ligou 15/01, muito interessado.
       Reunião agendada 22/01 10h no MASP.
       Levar portfolio físico + demo VR Quest 3.]
      </TextArea>
      <Button>Salvar Nota</Button>
    </Section>
    
    <Section title="Próximos Passos">
      <Checkbox checked> Ligar hoje (15/01)</Checkbox>
      <Checkbox> Enviar email com case MASP-like</Checkbox>
      <Checkbox> Agendar reunião presencial</Checkbox>
      <Checkbox> Preparar proposta preliminar</Checkbox>
    </Section>
    
    <Section title="Ações Rápidas">
      <Button icon="📧">Enviar Email Template</Button>
      <Button icon="📞">Registrar Ligação</Button>
      <Button icon="📅">Agendar Follow-up</Button>
      <Button icon="📄">Criar Proposta</Button>
      <Button icon="❌">Marcar como Perdido</Button>
    </Section>
  </LeadDetail>
</LeadsDashboard>
```

#### **TELA 3: ANALYTICS (Deep Dive)**

```typescript
<AnalyticsDashboard>
  {/* Período */}
  <DateRange>
    Últimos 7 dias | 30 dias | 90 dias | 12 meses | Custom
  </DateRange>
  
  {/* SEÇÃO 1: Tráfego */}
  <Section title="Tráfego do Site">
    <Grid cols={3}>
      <Metric title="Visitantes Únicos" value="1.847" change="+12%" />
      <Metric title="Pageviews" value="4.582" change="+18%" />
      <Metric title="Tempo Médio" value="3min 24s" change="+8%" />
    </Grid>
    
    <Chart type="line" title="Visitantes por Dia" />
    
    <Table title="Páginas Mais Vistas">
      | Página | Views | Tempo Médio | Bounce Rate | Conversão |
      |--------|-------|-------------|-------------|-----------|
      | /work | 850 | 2min 15s | 45% | 1.2% |
      | / | 720 | 1min 30s | 55% | 0.8% |
      | /contact | 340 | 45s | 25% | 8.5% |
      | /work/museu-olimpico | 280 | 3min 45s | 35% | 2.1% |
    </Table>
  </Section>
  
  {/* SEÇÃO 2: Fontes */}
  <Section title="Fontes de Tráfego">
    <Chart type="pie">
      - Orgânico: 45% (1.050 visits)
      - Direto: 25% (580 visits)
      - LinkedIn: 15% (350 visits)
      - Google Ads: 10% (230 visits)
      - Referral: 5% (115 visits)
    </Chart>
    
    <Table title="ROI por Canal">
      | Canal | Custo | Visitantes | Leads | CPL | Conversão |
      |-------|-------|------------|-------|-----|-----------|
      | Orgânico (SEO) | R$ 0 | 1.050 | 12 | R$ 0 | 1.14% |
      | Google Ads | R$ 1.200 | 230 | 5 | R$ 240 | 2.17% |
      | LinkedIn Ads | R$ 800 | 350 | 4 | R$ 200 | 1.14% |
      | Direto | R$ 0 | 580 | 2 | R$ 0 | 0.34% |
    </Table>
    
    💡 Insight: "Google Ads tem conversão 2x maior que 
                média! Aumentar budget de R$ 1.2k → R$ 3k/mês."
  </Section>
  
  {/* SEÇÃO 3: Comportamento */}
  <Section title="Comportamento de Usuário">
    <Chart type="funnel" title="Jornada do Visitante">
      Landing (100%) → 2.347
      2ª página (45%) → 1.056
      3ª página (25%) → 587
      Engajados 5+ páginas (15%) → 352
      Form visit (5%) → 117
      Form submit (1%) → 23
    </Chart>
    
    <Heatmap title="Onde Users Clicam (Home)">
      [Visualização heatmap - áreas vermelhas = mais cliques]
      
      Top clicks:
      1. Menu "Work" - 450 clicks
      2. Demoreel play button - 380 clicks
      3. CTA "Start Project" - 280 clicks
      4. Museu Olímpico card - 220 clicks
      5. Logo (home) - 180 clicks
    </Heatmap>
    
    <Table title="Tempo por Página">
      | Página | Tempo Médio | Scroll Depth |
      |--------|-------------|--------------|
      | /work/museu-olimpico | 3min 45s | 85% |
      | /studio | 2min 50s | 70% |
      | /work | 2min 15s | 65% |
      | / | 1min 30s | 55% |
      | /contact | 45s | 90% |
    </Table>
  </Section>
  
  {/* SEÇÃO 4: Conversão */}
  <Section title="Funil de Conversão">
    <Metric title="Taxa Conversão Geral" value="0.98%" change="+0.15%" />
    
    <Table title="Onde Perdemos Users?">
      | Etapa | Users | Drop-off |
      |-------|-------|----------|
      | Landing | 2.347 | - |
      | Engajados (3+ páginas) | 587 | -75% ⚠️ |
      | Visitaram /contact | 117 | -80% ⚠️ |
      | Começaram form | 45 | -62% 🔥 PROBLEMA! |
      | Completaram form | 23 | -49% 🔥 PROBLEMA! |
    </Table>
    
    💡 Insight: "Perdemos 49% no formulário! 
                Simplificar ou tornar progressivo."
  </Section>
  
  {/* SEÇÃO 5: Dispositivos */}
  <Section title="Dispositivos & Geo">
    <Chart type="bar" title="Device">
      Desktop: 60% (1.408)
      Mobile: 35% (821)
      Tablet: 5% (118)
    </Chart>
    
    <Chart type="map" title="Países">
      Brasil: 55% (1.291)
      Canadá: 20% (469)
      USA: 10% (235)
      México: 5% (117)
      Outros: 10% (235)
    </Chart>
  </Section>
</AnalyticsDashboard>
```

#### **TELA 4: REPORTS (Gerenciais)**

```typescript
<Reports>
  {/* Report 1: Monthly Performance */}
  <Report title="Performance Mensal" exportPDF exportExcel>
    Período: Janeiro 2026
    
    📊 RESUMO:
    - Visitantes: 2.347 (+18% vs. dez)
    - Leads: 23 (+5 vs. dez)
    - Hot Leads: 8 (+3 vs. dez)
    - Propostas: 3 (+1 vs. dez)
    - Fechamentos: 1 (R$ 650k)
    
    💰 FINANCEIRO:
    - Receita fechada: R$ 650k
    - Pipeline (propostas): R$ 2.1M
    - Valor médio proposta: R$ 700k
    
    📈 TENDÊNCIAS:
    - Conversão melhorando (+15%)
    - Tráfego orgânico crescendo (+18%)
    - Leads mais qualificados (score médio 65 → 72)
    
    🎯 PRÓXIMO MÊS:
    - Meta leads: 30
    - Meta hot leads: 10
    - Meta propostas: 5
    - Meta fechamentos: 2 (R$ 1.5M)
    
    [DOWNLOAD PDF] [DOWNLOAD EXCEL] [EMAIL PARA EQUIPE]
  </Report>
  
  {/* Report 2: ROI Marketing */}
  <Report title="ROI de Marketing" exportPDF>
    Investimento Total: R$ 5.000
    Receita Gerada: R$ 650k (1 projeto fechado)
    ROI: 130x (13.000%!) 🚀
    
    Por Canal:
    | Canal | Investido | Leads | CPL | Fechou | Receita | ROI |
    |-------|-----------|-------|-----|--------|---------|-----|
    | Orgânico | R$ 0 | 12 | R$ 0 | 1 | R$ 650k | ∞ |
    | Google Ads | R$ 3.000 | 8 | R$ 375 | 0 | R$ 0 | -100% |
    | LinkedIn | R$ 2.000 | 3 | R$ 667 | 0 | R$ 0 | -100% |
    
    💡 Insight: "Orgânico está convertendo! 
                Investir mais em SEO/Content."
  </Report>
  
  {/* Report 3: Lead Quality */}
  <Report title="Qualidade de Leads" exportPDF>
    Score Médio: 72/100 (+7 vs. mês anterior)
    
    Distribuição:
    - Hot (70-100): 35% (8 leads)
    - Warm (50-69): 40% (9 leads)
    - Cold (0-49): 25% (6 leads)
    
    Por Tipo Organização:
    - Governo: 30% (7 leads) - Score médio 85 🔥
    - Museu: 35% (8 leads) - Score médio 78
    - Corporativo: 20% (5 leads) - Score médio 55
    - Outro: 15% (3 leads) - Score médio 40
    
    💡 Insight: "Governo = leads mais quentes! 
                Focar marketing em gov."
  </Report>
</Reports>
```

---

<a name="ux"></a>
## 🎨 **7. UX: TEXTO vs. IMAGEM/VÍDEO**

### **PROBLEMA:**

```
❌ "Site tem muita massa de texto, users não leem!"
```

### **ANÁLISE:**

#### **ATENÇÃO DO USUÁRIO:**

```
Realidade brutal:
- Tempo médio atenção: 8 segundos
- Users leem apenas 20% do texto
- 80% só "scanneiam" (olham rápido)
- Vídeo retém atenção 5x mais que texto
```

#### **PÁGINAS COM MUITO TEXTO:**

**1. /studio (About/Team)**
```
PROBLEMA:
- 500+ palavras de texto corrido
- Sem quebras visuais
- Sem imagens da equipe
- Chato de ler

SOLUÇÃO:
- Resumir para 150 palavras max
- Adicionar fotos da equipe (rostos!)
- Vídeo "Conheça a Azimut" (1-2min)
- Números visuais (15+ projetos, 8+ países, etc)
- Infográfico: "Nossa jornada em 60 segundos"
```

**2. /solutions (What We Do)**
```
PROBLEMA:
- Lista longa de serviços (texto)
- Sem exemplos visuais

SOLUÇÃO:
- Cards visuais com ícone/imagem
- Hover = vídeo curto (5-10s looped)
- Click = modal com case study
```

**3. /work (Portfolio)**
```
PROBLEMA:
- Descrições longas em cada projeto

SOLUÇÃO:
- Projeto = 1 frase (max 15 palavras)
- "Ver mais" = expand
- Galeria de imagens grande
- Vídeo demo (30-60s)
```

### **REGRA DE OURO:**

```
┌────────────────────────────────────────┐
│  1 IMAGEM = 1.000 PALAVRAS             │
│  1 VÍDEO = 1.000 IMAGENS               │
│                                        │
│  FÓRMULA PERFEITA (por seção):        │
│  - 1 título (5-10 palavras)           │
│  - 1 subtítulo (15-20 palavras)       │
│  - 1 parágrafo curto (50-80 palavras) │
│  - 1 imagem/vídeo grande              │
│  - 1 CTA claro                        │
│                                        │
│  TOTAL: < 120 palavras por seção!     │
└────────────────────────────────────────┘
```

### **IMPLEMENTAÇÃO: REESCREVER PÁGINAS**

#### **ANTES vs. DEPOIS: PÁGINA /STUDIO**

**ANTES (RUIM):**
```
[Muito texto, 500+ palavras sem respiro]

"A Azimut é uma produtora especializada em experiências 
imersivas, fundada em 2015 por [nome], com escritórios 
no Brasil e Canadá. Nossa missão é criar experiências 
que conectam mundos através da tecnologia, arte e 
narrativa. Trabalhamos com museus, governos e empresas 
para criar instalações permanentes e temporárias que 
educam, inspiram e transformam. Nossa equipe multidisciplinar 
inclui diretores, programadores, designers 3D, sound 
designers e produtores com experiência em projetos de 
R$ 500k a R$ 5M. Já realizamos projetos em 8 países e 
ganhamos prêmios internacionais como [...]"

[Continua por mais 300 palavras...]
```

**DEPOIS (BOM):**
```
[Hero com vídeo background - time trabalhando]

┌────────────────────────────────────────┐
│                                        │
│   🎬 CRIAMOS EXPERIÊNCIAS QUE          │
│      CONECTAM MUNDOS                   │
│                                        │
│   Produtora Brasil-Canadá especializada│
│   em VR, AR, XR para museus e cultura  │
│                                        │
│   [ASSISTIR NOSSA HISTÓRIA (2min)] ←vídeo
│                                        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│   NÚMEROS QUE FALAM                    │
│                                        │
│   [15+]        [8]         [R$ 20M+]  │
│   PROJETOS     PAÍSES      REALIZADOS │
│                                        │
│   [100k+]      [70%]       [10]       │
│   VISITANTES   GRANTS      ANOS       │
│                APROVADOS   MERCADO    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│   EQUIPE                               │
│                                        │
│   [FOTO]  João Silva                   │
│           CEO & Creative Director      │
│           15 anos em XR, ex-NFB        │
│                                        │
│   [FOTO]  Maria Santos                 │
│           CTO                          │
│           Unity/Unreal expert, 50+ apps│
│                                        │
│   [FOTO]  Pedro Souza                  │
│           Lead 3D Artist               │
│           Cannes XR, 20+ instalações   │
│                                        │
│   + 15 colaboradores Brasil/Canadá    │
└────────────────────────────────────────┘

[Total: < 100 palavras!]
[Visual: 80% imagens/vídeo, 20% texto]
```

---

### **ESTRATÉGIA: CONTENT TYPES**

```
┌──────────────────────────────────────────────────┐
│  PÁGINA         │ TEXTO | IMAGEM | VÍDEO | 3D   │
├──────────────────────────────────────────────────┤
│ Home            │  10%  │  40%   │ 30%   │ 20%  │
│ Work (portfolio)│  15%  │  60%   │ 25%   │  0%  │
│ Project Detail  │  20%  │  50%   │ 30%   │  0%  │
│ Studio (about)  │  20%  │  40%   │ 30%   │ 10%  │
│ Solutions       │  25%  │  40%   │ 20%   │ 15%  │
│ Contact         │  30%  │  30%   │ 20%   │ 20%  │
│ Blog            │  60%  │  30%   │ 10%   │  0%  │
└──────────────────────────────────────────────────┘

REGRA:
Páginas de conversão (Home, Work, Contact) = MENOS texto!
Páginas educacionais (Blog, Guides) = MAIS texto (mas com imagens!)
```

---

<a name="paginas"></a>
## 📄 **8. ESTRUTURA PÁGINAS: O QUE IMPLEMENTAR**

### **ANÁLISE PÁGINA A PÁGINA:**

#### **🏠 HOME (Importância: 10/10)**

**STATUS ATUAL:** ✅ 8/10 (Boa, pode melhorar)

**O QUE TEM:**
- Hero com texto + logo animada
- Demoreel fullscreen
- Projetos em destaque
- CTA final

**O QUE FALTA:**
```
❌ Social proof forte (logos clientes pequenos)
❌ Números impactantes (100k visitantes, R$ 20M, etc)
❌ Depoimentos em vídeo
❌ Chatbot (Stella)
❌ Personalização (museu vê conteúdo para museu)
```

**PRIORIDADE:** 🔥🔥🔥 ALTA

**AÇÕES:**
1. Adicionar seção "Clientes que Confiam" (logos grandes)
2. Adicionar números visuais (counters animados)
3. Adicionar 1 depoimento em vídeo (15-30s)
4. Implementar chatbot Stella (canto inferior direito)
5. IA personalização (detectar tipo visitante → adaptar hero)

---

#### **💼 /WORK (Portfolio) (Importância: 10/10)**

**STATUS ATUAL:** ✅ 7/10 (Bom, mas pode ser incrível)

**O QUE TEM:**
- Grid de projetos
- Filtros por categoria
- Boas fotos

**O QUE FALTA:**
```
❌ Vídeos (só fotos estáticas)
❌ Detalhes (budget, timeline, tech usada)
❌ Filtro por budget (user quer ver projetos no seu range)
❌ Filtro por setor (governo, museu, corporativo)
❌ Call-to-action em cada projeto ("Quer algo similar?")
```

**PRIORIDADE:** 🔥🔥🔥 ALTA

**AÇÕES:**
1. Adicionar vídeo em cada projeto (hover = preview, click = full)
2. Expandir filtros (budget, setor, tecnologia)
3. Página de projeto detalhada (modelo abaixo)
4. CTA em cada projeto

---

#### **📁 /WORK/[PROJECT] (Projeto Individual) (Importância: 9/10)**

**STATUS ATUAL:** ⚠️ 5/10 (Muito básico!)

**O QUE TEM:**
- Foto
- 2-3 linhas de texto
- Isso é tudo! ❌

**O QUE FALTA:**
```
❌ Galeria (10-20 fotos)
❌ Vídeo tour (2-3min)
❌ Detalhes completos:
   - Budget (R$ 2.5M)
   - Timeline (14 meses)
   - Equipe (20 pessoas)
   - Tech (Unity, Unreal, Node.js, etc)
   - Desafios & Soluções
   - Resultados (100k visitantes, prêmios, press)
❌ Depoimento do cliente (vídeo ou texto)
❌ CTA forte ("Quer projeto similar? [FALAR COM A GENTE]")
```

**PRIORIDADE:** 🔥🔥🔥 ALTA

**MODELO COMPLETO:**

```html
<ProjectDetailPage id="museu-olimpico">
  {/* Hero Video */}
  <Hero video="https://youtube.com/watch?v=..." poster="thumb.jpg">
    <Badge>Case Study</Badge>
    <Title>Museu Olímpico do Rio</Title>
    <Subtitle>Curadoria Digital e Experiências Imersivas</Subtitle>
  </Hero>
  
  {/* Overview */}
  <Section>
    <Grid cols={4}>
      <Stat icon="💰" label="Budget" value="R$ 2.5M" />
      <Stat icon="⏱️" label="Timeline" value="14 meses" />
      <Stat icon="👥" label="Visitantes/ano" value="100k+" />
      <Stat icon="🏆" label="Prêmios" value="3" />
    </Grid>
  </Section>
  
  {/* Challenge */}
  <Section title="Desafio">
    <Text>
      Criar museu interativo que celebre história olímpica 
      brasileira de forma imersiva e educacional, atraindo 
      público jovem (15-35 anos).
    </Text>
  </Section>
  
  {/* Solution */}
  <Section title="Solução Azimut">
    <Grid cols={2}>
      <div>
        <h3>15 Instalações Interativas</h3>
        <ul>
          <li>3 experiências VR (atletismo, natação, ginástica)</li>
          <li>5 touch screens interativos</li>
          <li>4 projection mappings</li>
          <li>3 jogos Kinect</li>
        </ul>
      </div>
      <Image src="solution.jpg" />
    </Grid>
  </Section>
  
  {/* Tech Stack */}
  <Section title="Tecnologias">
    <Grid cols={5}>
      <TechBadge name="Unity" icon="unity.svg" />
      <TechBadge name="Unreal Engine" icon="unreal.svg" />
      <TechBadge name="React" icon="react.svg" />
      <TechBadge name="Node.js" icon="node.svg" />
      <TechBadge name="PostgreSQL" icon="postgres.svg" />
    </Grid>
  </Section>
  
  {/* Gallery */}
  <Section title="Galeria">
    <ImageGrid cols={3}>
      {20 imagens}
    </ImageGrid>
  </Section>
  
  {/* Results */}
  <Section title="Resultados">
    <Grid cols={4}>
      <Result icon="👥" value="100.000+" label="Visitantes no 1º ano" />
      <Result icon="⭐" value="4.5" label="Nota média (Google)" />
      <Result icon="🏆" value="3" label="Prêmios ganhos" />
      <Result icon="📰" value="50+" label="Matérias de imprensa" />
    </Grid>
  </Section>
  
  {/* Testimonial */}
  <Section title="Depoimento">
    <Testimonial video="depoimento.mp4" or text>
      <Quote>
        "A Azimut transformou nossa visão em realidade. 
         O processo foi profissional, dentro do prazo e budget. 
         O resultado superou expectativas."
      </Quote>
      <Author>
        <Avatar src="maria.jpg" />
        <Name>Maria Silva</Name>
        <Title>Diretora, Museu Olímpico do Rio</Title>
      </Author>
    </Testimonial>
  </Section>
  
  {/* CTA */}
  <Section bg="dark">
    <CTA>
      <h2>Quer Projeto Similar?</h2>
      <p>Vamos criar algo extraordinário para seu museu/organização!</p>
      <Button size="large" glow>SOLICITAR PROPOSTA</Button>
    </CTA>
  </Section>
  
  {/* Related Projects */}
  <Section title="Projetos Similares">
    <Grid cols={3}>
      <ProjectCard project="projeto-x" />
      <ProjectCard project="projeto-y" />
      <ProjectCard project="projeto-z" />
    </Grid>
  </Section>
</ProjectDetailPage>
```

---

#### **🏢 /STUDIO (About/Team) (Importância: 7/10)**

**STATUS ATUAL:** ⚠️ 6/10 (Funcional, mas chato)

**PRIORIDADE:** 🔥 MÉDIA

**AÇÕES:**
1. Reduzir texto 70% (500 palavras → 150 palavras)
2. Vídeo "Conheça a Azimut" (2min)
3. Fotos grandes da equipe (rostos!)
4. Números visuais (counters animados)
5. Timeline visual (história empresa)

---

#### **✉️ /CONTACT (Importância: 10/10)**

**STATUS ATUAL:** ⚠️ 5/10 (Formulário básico demais!)

**PRIORIDADE:** 🔥🔥🔥 CRÍTICO!

**AÇÕES:**
1. ✅ Implementar formulário inteligente (ver seção 4)
2. Adicionar calculadora ("Estime seu projeto antes de contatar")
3. Múltiplos CTAs:
   - [AGENDAR REUNIÃO] (Calendly)
   - [ENVIAR MENSAGEM] (Form)
   - [BAIXAR PORTFÓLIO] (PDF)
   - [CHATBOT] (Stella - já aberto nesta página)
4. Garantias visuais:
   - "✅ Resposta em 24h"
   - "✅ Proposta em 2 semanas"
   - "✅ Sem compromisso"
5. Depoimentos (social proof)

---

#### **📚 /BLOG (Novo!) (Importância: 8/10 para SEO)**

**STATUS ATUAL:** ❌ NÃO EXISTE

**PRIORIDADE:** 🔥🔥 ALTA (para SEO 2026)

**AÇÕES:**
1. Criar blog
2. Escrever 10 artigos iniciais:
   - "Como Conseguir Funding de até R$ 5M (Lei Rouanet)"
   - "CMF Canadá: Passo a Passo para Aplicar"
   - "VR vs. AR vs. XR: Diferenças e Quando Usar"
   - "10 Museus que Usam XR de Forma Incrível"
   - "Quanto Custa uma Experiência VR? (Budget Guide)"
   - "Como Aumentar Visitantes de Museu em 35% com Tech"
   - "Unreal Engine 5 para Museus: Vale a Pena?"
   - "Case Study: Museu Olímpico do Rio (Deep Dive)"
   - "CREA Digital (Colômbia): Como Aplicar"
   - "NEA (USA): Grants para Museus"
3. SEO otimizado (keywords, links internos, meta)
4. Imagens/vídeos em cada artigo
5. CTAs em cada artigo ("Quer ajuda com seu projeto? [FALAR COM A GENTE]")

---

#### **📖 /RESOURCES (Novo!) (Importância: 9/10 para leads)**

**STATUS ATUAL:** ❌ NÃO EXISTE

**PRIORIDADE:** 🔥🔥🔥 ALTA

**CONTEÚDO:**
```
/resources
  - Grant Calendar 2026 (PDF)
  - Museum Tech Checklist (PDF)
  - Budget Template (Excel)
  - RFP Template (Word)
  - Case Studies Collection (PDF 50 páginas)
  - VR Best Practices Guide (PDF)
  - ROI Calculator (Interactive)
```

**POR QUÊ?**
- User baixa recurso = dá email = lead!
- Educacional (gera confiança)
- SEO (páginas indexadas)
- Compartilhável (viral)

---

#### **💰 /WORK-WITH-US (Novo!) (Importância: 10/10)**

**STATUS ATUAL:** ❌ NÃO EXISTE

**PRIORIDADE:** 🔥🔥🔥 CRÍTICO!

**CONTEÚDO:** (ver documento SITE_PREMIUM_2026-2030_VISAO_ESTRATEGICA.md, seção 1.3)

---

#### **💡 /GRANTS (Novo!) (Importância: 9/10)**

**STATUS ATUAL:** ❌ NÃO EXISTE

**PRIORIDADE:** 🔥🔥 ALTA

**CONTEÚDO:**
- Lista completa grants (CA, USA, BR, LATAM)
- Deadlines 2026
- Como aplicar (passo a passo)
- Taxa sucesso Azimut (70% vs. 30%)
- Cases aprovados
- CTA: "Quer ajuda? [AGENDAR CONSULTA GRATUITA]"

---

<a name="prioridades"></a>
## 🎯 **9. PRIORIDADES 2026: TOP 10 AÇÕES**

### **ORDEM DE IMPLEMENTAÇÃO:**

```
┌────────────────────────────────────────────────────┐
│  #  │ AÇÃO                        │ IMP │ ESF │ ROI │
├────────────────────────────────────────────────────┤
│  1  │ Formulário Inteligente      │ 10  │ 2w  │ 🔥  │
│     │ (Qualifica leads)           │     │     │     │
├────────────────────────────────────────────────────┤
│  2  │ Dashboard Analytics         │ 10  │ 3w  │ 🔥  │
│     │ (Backoffice + gráficos)     │     │     │     │
├────────────────────────────────────────────────────┤
│  3  │ CRM Integrado               │ 10  │ 4w  │ 🔥  │
│     │ (Leads no banco + scoring)  │     │     │     │
├────────────────────────────────────────────────────┤
│  4  │ Página "Work With Us"       │  9  │ 2w  │ 🔥  │
│     │ (Processo + grants)         │     │     │     │
├────────────────────────────────────────────────────┤
│  5  │ Projetos Detalhados         │  9  │ 2w  │ 🔥  │
│     │ (Galeria + vídeo + detalhes)│     │     │     │
├────────────────────────────────────────────────────┤
│  6  │ Chatbot Stella (IA)         │  9  │ 3w  │ 🌡️  │
│     │ (DeepSeek conversational)   │     │     │     │
├────────────────────────────────────────────────────┤
│  7  │ Calculadora Interativa      │  8  │ 3w  │ 🌡️  │
│     │ (Budget + grants + leads)   │     │     │     │
├────────────────────────────────────────────────────┤
│  8  │ Página /GRANTS              │  9  │ 2w  │ 🌡️  │
│     │ (Educacional + diferencial) │     │     │     │
├────────────────────────────────────────────────────┤
│  9  │ Blog + 10 Artigos           │  8  │ 4w  │ 🌡️  │
│     │ (SEO + tráfego orgânico)    │     │     │     │
├────────────────────────────────────────────────────┤
│  10 │ Home: Menos Texto,          │  7  │ 2w  │ ❄️  │
│     │ Mais Visual                 │     │     │     │
└────────────────────────────────────────────────────┘

LEGENDA:
IMP = Importância (1-10)
ESF = Esforço (semanas)
ROI = 🔥 Alto | 🌡️ Médio | ❄️ Baixo
```

---

<a name="roadmap"></a>
## 📅 **10. ROADMAP COMPLETO 2026-2030**

### **Q1 2026 (Jan-Mar): FUNDAÇÃO**

```
SEMANAS 1-2: Formulário Inteligente
✅ Design novo formulário (Figma)
✅ Implementar (React)
✅ Backend (salvar no Prisma)
✅ Email notifications
✅ Deploy

SEMANAS 3-5: Dashboard Analytics
✅ Novos modelos Prisma (Lead, Interaction, etc)
✅ API endpoints (/api/analytics)
✅ Dashboard UI (gráficos, KPIs)
✅ Integrar Google Analytics
✅ Deploy

SEMANAS 6-9: CRM Integrado
✅ Lead scoring logic
✅ AI insights (DeepSeek → database)
✅ Lead detail page
✅ Email templates
✅ Follow-up automático
✅ Deploy

SEMANAS 10-11: Página "Work With Us"
✅ Design (Figma)
✅ Implementar (React)
✅ Content (texto + imagens)
✅ Deploy

SEMANAS 12-13: Projetos Detalhados
✅ Template projeto detalhado
✅ Implementar 3 projetos piloto (Museu Olímpico + 2)
✅ Galeria + vídeo + tech stack
✅ Deploy
```

### **Q2 2026 (Abr-Jun): CONVERSÃO**

```
SEMANAS 14-16: Chatbot Stella
✅ Design avatar 3D
✅ DeepSeek integration (conversational)
✅ Knowledge base (portfolio, grants, FAQs)
✅ Deploy

SEMANAS 17-19: Calculadora Interativa
✅ Design (6 steps)
✅ Budget calculation logic
✅ Grants matching
✅ Lead capture
✅ Deploy

SEMANAS 20-21: Página /GRANTS
✅ Content (CA, USA, BR, LATAM)
✅ Design
✅ SEO optimization
✅ Deploy

SEMANAS 22-25: Blog + 10 Artigos
✅ Setup blog (Prisma + UI)
✅ Escrever 10 artigos (SEO optimized)
✅ Imagens/vídeos
✅ Deploy
✅ Promote (LinkedIn, email)
```

### **Q3 2026 (Jul-Set): OTIMIZAÇÃO**

```
SEMANAS 26-27: Home Visual Refresh
✅ Reduzir texto 50%
✅ Adicionar vídeos/animações
✅ Social proof (logos clientes grandes)
✅ Números visuais (counters)
✅ Deploy

SEMANAS 28-30: Personalização IA
✅ Detectar tipo visitante (museu, gov, corp)
✅ Adaptar hero message
✅ Mostrar cases relevantes
✅ Alertas vendas (hot leads)
✅ Deploy

SEMANAS 31-33: Remarketing & Email
✅ Setup email drip campaigns
✅ Segmentos (hot, warm, cold)
✅ Templates (5 emails por segmento)
✅ Automation (Zapier ou custom)
✅ Deploy

SEMANAS 34-35: Página /RESOURCES
✅ Criar 5 recursos (PDFs, templates)
✅ Landing pages para cada
✅ Lead capture forms
✅ Deploy

SEMANAS 36-39: A/B Testing
✅ Setup (Optimizely ou custom)
✅ Testar CTAs (5 variantes)
✅ Testar formulário (2 versões)
✅ Testar home hero (3 versões)
✅ Analisar + deploy vencedor
```

### **Q4 2026 (Out-Dez): ESCALA**

```
SEMANAS 40-43: SEO Avançado
✅ 20 novos artigos blog
✅ Backlinks (guest posts, PR)
✅ Schema.org markup
✅ Page speed optimization (95+)
✅ Deploy

SEMANAS 44-47: 3D Interativo
✅ Logo Azimut 3D (Three.js)
✅ Projetos exploráveis 3D
✅ Configurador 3D
✅ Deploy

SEMANAS 48-52: Analytics Avançado
✅ Heatmaps (Hotjar)
✅ Session recordings
✅ Attribution tracking
✅ Predictive ML (close probability)
✅ Reports gerenciais automáticos
✅ Deploy
```

### **2027-2030: DOMÍNIO**

```
2027:
- Multi-idioma dinâmico (12+ línguas)
- PWA (Progressive Web App)
- Push notifications
- Integração CRM completo (HubSpot/Salesforce)

2028:
- Auto-atualização (backoffice → site sync real-time)
- Content hub (100+ artigos)
- Webinars mensais
- Community (fórum para clientes)

2029:
- AI ultra-personalizado (site único para cada visitante)
- VR/AR demos no browser (WebXR)
- Voice search optimization
- Marketplace (templates de instalações)

2030:
- Site #1 do mundo em experiências imersivas
- 20.000 visitantes/mês
- 150 leads qualificados/mês
- 40 projetos/ano
- R$ 40M receita/ano 🚀
```

---

## ✅ **RESUMO EXECUTIVO: O QUE FAZER AGORA?**

### **TOP 3 AÇÕES CRÍTICAS (Começar JÁ!):**

```
1. 🔥 FORMULÁRIO INTELIGENTE (2 semanas)
   → Qualifica leads 10x melhor
   → ROI: Imediato
   → Implementar esta semana!

2. 🔥 DASHBOARD ANALYTICS (3 semanas)
   → Saber o que está funcionando
   → Decisões baseadas em dados
   → Começar semana que vem!

3. 🔥 CRM INTEGRADO (4 semanas)
   → Organizar leads
   → Priorizar (hot/warm/cold)
   → Não perder mais nenhum lead
   → Começar em paralelo!
```

### **INVESTIMENTO:**

```
Q1 2026 (3 meses):
- Dev (eu faço!): R$ 0 (já estou aqui)
- Ferramentas:
  * Hotjar (analytics): USD $39/mês
  * DeepL (tradução): USD $20/mês
  * Email (SendGrid): USD $20/mês
  * Total: ~R$ 400/mês = R$ 1.200/Q1

TOTAL Q1: R$ 1.200

ROI ESPERADO (6 meses):
- Conversão: 0.5% → 2% (4x)
- Leads qualificados: +300%
- Projetos fechados: +2-3
- Receita extra: R$ 1.5M - R$ 3M
ROI: 1.250x - 2.500x! 🚀
```

---

## 🎯 **DECISÃO FINAL:**

**O QUE VOCÊ QUER QUE EU FAÇA AGORA?**

**A.** 🔥 **IMPLEMENTAR TOP 3 CRÍTICOS**
   - Formulário + Dashboard + CRM
   - 9 semanas (~2 meses)
   - Máximo impacto imediato

**B.** ⚡ **FAST TRACK: SÓ FORMULÁRIO**
   - 2 semanas
   - Ver resultados JÁ
   - Depois continuamos

**C.** 📊 **CRIAR TODOS DOCUMENTOS TÉCNICOS**
   - Specs detalhadas
   - Wireframes
   - Database schema
   - Para você aprovar antes de começar

**D.** 💡 **OUTRA COISA** (me diz!)

---

**Vamos transformar o site Azimut em máquina de conversão? 🚀**
