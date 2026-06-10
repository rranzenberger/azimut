# 🚀 PLANO COMPLETO: INTEGRAÇÃO API + MELHORIAS SITE

**Data:** 09 Janeiro 2026, 21:15  
**Objetivo:** Site + Backoffice 100% integrados + Melhorias premium

---

## 🎯 FASE 1: INTEGRAÇÃO DE APIs (AGORA)

### **1.1. Configurar Variáveis de Ambiente no Site**

**Arquivo:** `.env` (raiz do projeto - site)

```env
# Backend API (Backoffice)
VITE_API_URL=https://backoffice.azmt.com.br
VITE_API_KEY=sua-chave-secreta-aqui

# Features
VITE_ENABLE_AI_SUGGESTIONS=true
VITE_ENABLE_TRACKING=true
```

### **1.2. Criar Serviço de API Centralizado**

**Novo arquivo:** `src/services/api.ts`

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const API_KEY = import.meta.env.VITE_API_KEY

export class ApiService {
  // Submit lead
  static async submitLead(data: any) {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to submit lead')
    return response.json()
  }

  // AI Suggestions
  static async getAiSuggestions(data: any) {
    if (!import.meta.env.VITE_ENABLE_AI_SUGGESTIONS) return null
    
    try {
      const response = await fetch(`${API_URL}/api/ai/form-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) return null
      return response.json()
    } catch {
      return null // Fail silently
    }
  }

  // Track visitor
  static async trackVisitor(data: any) {
    if (!import.meta.env.VITE_ENABLE_TRACKING) return
    
    try {
      await fetch(`${API_URL}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify(data)
      })
    } catch {
      // Fail silently
    }
  }

  // Get personalized recommendations
  static async getRecommendations(sessionId: string) {
    try {
      const response = await fetch(`${API_URL}/api/public/content?sessionId=${sessionId}`, {
        headers: {
          'X-API-Key': API_KEY
        }
      })
      if (!response.ok) return null
      return response.json()
    } catch {
      return null
    }
  }
}
```

### **1.3. Atualizar SmartContactForm**

**Mudar:** De chamadas diretas para `ApiService`

```typescript
// ANTES:
const response = await fetch('/api/leads', { ... })

// DEPOIS:
const response = await ApiService.submitLead(formData)
```

### **1.4. Adicionar API Key no Backoffice**

**Middleware:** `azimut-cms/middleware.ts` (novo)

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Permitir CORS do site principal
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const apiKey = request.headers.get('X-API-Key')
    const validKey = process.env.API_KEY
    
    // APIs públicas (não precisa key)
    if (request.nextUrl.pathname.startsWith('/api/public/')) {
      return NextResponse.next()
    }
    
    // APIs protegidas (precisa key)
    if (!apiKey || apiKey !== validKey) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
```

---

## 🎨 FASE 2: MELHORIAS DO SITE (PREMIUM 2026)

### **2.1. Analytics e Tracking Avançado**

**Implementar:**
- ✅ Visitor tracking automático (já existe)
- 🔄 Heatmaps (Hotjar ou Microsoft Clarity)
- 🔄 Session replay
- 🔄 Scroll tracking
- 🔄 Click tracking em CTAs

**Arquivo:** `src/utils/advanced-tracking.ts`

### **2.2. Personalização com IA**

**Features:**
- **Homepage personalizada** baseada em comportamento
- **Projetos recomendados** (baseado em navegação)
- **CTAs dinâmicos** (baseado em interesse)
- **Conteúdo adaptativo** (baseado em perfil inferido)

**Exemplo:**
```typescript
// Se visitou muito "museus" → Mostrar projetos de museus
// Se viu orçamentos altos → Destacar projetos premium
// Se leu sobre grants → Mostrar badge "Ajudamos com grants"
```

### **2.3. Chatbot/Live Chat**

**Opções:**
- **Intercom** (premium, $$$)
- **Crisp** (grátis até 2 agentes)
- **Tawk.to** (grátis)
- **Custom IA** (Claude/GPT via API)

**Implementação:**
```typescript
// src/components/AIChatbot.tsx
// Chat flutuante com IA treinada no portfolio Azimut
```

### **2.4. Recomendações Inteligentes**

**Onde:**
- Fim de cada projeto → "Projetos similares"
- Homepage → "Baseado no seu interesse"
- Contact → "Projetos que podem inspirar você"

**API:**
```typescript
// GET /api/public/recommendations?sessionId=xxx
// Retorna projetos baseados em navegação
```

### **2.5. Exit Intent Popup**

**Quando usuário vai sair:**
- Modal com oferta (ex: "Discovery Call grátis")
- Download de case study
- Newsletter signup
- Agendamento de reunião

### **2.6. Social Proof**

**Adicionar:**
- Contador de projetos entregues (dinâmico)
- Testimunhos rotacionando
- Logos de clientes (animados)
- "123 projetos realizados em 28 anos"

### **2.7. Performance & PWA**

**Otimizações:**
- ✅ Lazy loading imagens
- 🔄 Service Worker (PWA)
- 🔄 Offline mode
- 🔄 Install prompt
- 🔄 Push notifications (opt-in)

### **2.8. SEO Avançado**

**Implementar:**
- ✅ Meta tags dinâmicas (já tem)
- 🔄 Schema.org (JSON-LD)
- 🔄 Open Graph otimizado
- 🔄 Sitemap dinâmico
- 🔄 Canonical URLs
- 🔄 Alt texts automáticos com IA

### **2.9. A/B Testing**

**Testar:**
- Versões de CTAs
- Cores de botões
- Textos de headlines
- Posicionamento de formulário

**Tool:** Google Optimize ou custom

### **2.10. Gamificação**

**Features:**
- Badge "Early Bird" (primeiros contatos)
- Progress bar (formulário multi-step)
- "Você está 80% pronto para começar seu projeto"
- Countdown para eventos/deadlines de grants

---

## 🔧 FASE 3: BACKEND/INFRA MELHORIAS

### **3.1. API Gateway**

**Centralizar:**
- Rate limiting
- Caching
- Analytics
- Error tracking

### **3.2. Redis/Cache**

**Cache:**
- Projetos (atualiza 1x/dia)
- Recomendações (atualiza 1x/hora)
- Analytics (agregados em tempo real)

### **3.3. Queue System**

**Processar assincronamente:**
- Email notifications
- IA scoring
- Lead enrichment
- Webhooks

**Tool:** BullMQ + Redis ou Vercel Queue Functions

### **3.4. Monitoring**

**Implementar:**
- Sentry (errors)
- LogRocket (session replay)
- Vercel Analytics (performance)
- Uptime Robot (disponibilidade)

---

## 📊 FASE 4: CRM MELHORIAS

### **4.1. Email Automations**

**Sequences:**
- Welcome email (imediato)
- Follow-up +24h (se não respondeu)
- Case study +3 dias
- Call scheduling +7 dias
- Re-engagement +30 dias

### **4.2. Lead Scoring v2**

**Adicionar:**
- Engagement score (emails abertos, links clicados)
- Social media presence
- Company size (via Clearbit)
- Budget verification

### **4.3. Pipeline Visual**

**Kanban melhorado:**
- Drag & drop entre stages
- Automações por stage
- SLA timers (tempo no stage)
- Alerts (lead parado há X dias)

### **4.4. Integrações**

**Conectar:**
- Google Calendar (agendamentos)
- Slack (notificações)
- WhatsApp Business (follow-up)
- Zapier/Make (workflows)

---

## 🎯 PRIORIZAÇÃO (O QUE FAZER PRIMEIRO):

### **🔥 PRIORIDADE ALTA (Esta semana):**
1. ✅ Integrar API do site com backoffice
2. ✅ Configurar CORS + API Key
3. ✅ Testar fluxo completo
4. ✅ Deploy integrado

### **⚡ PRIORIDADE MÉDIA (Próximas 2 semanas):**
5. Personalização com IA
6. Email automations
7. Analytics avançado
8. Exit intent popup

### **💫 PRIORIDADE BAIXA (Próximo mês):**
9. Chatbot
10. PWA offline
11. A/B Testing
12. Gamificação

---

## 💰 INVESTIMENTO ESTIMADO:

### **Grátis:**
- Vercel (até 100GB bandwidth)
- Neon (até 500MB database)
- Resend (3000 emails/mês)
- Tawk.to (chat)

### **Básico ($50-100/mês):**
- Anthropic API (Claude)
- Better uptime
- Sentry (errors)

### **Premium ($200-500/mês):**
- Clearbit (enrichment)
- Intercom (chat premium)
- Make/Zapier (automations)
- Redis Cloud (cache)

---

## 🎯 MINHA RECOMENDAÇÃO:

**AGORA (próximas 2 horas):**
1. Integrar APIs (30 min)
2. Testar localmente (15 min)
3. Deploy integrado (15 min)
4. Validar no ar (10 min)

**DEPOIS (próximas sessões):**
5. Email automations (alta conversão)
6. Personalização IA (diferencial)
7. Analytics avançado (insights)

**RESULTADO:**
Site world-class, 100% integrado, pronto para capturar e converter leads no mais alto nível.

---

**Bora começar pela integração de APIs agora?** 🚀
