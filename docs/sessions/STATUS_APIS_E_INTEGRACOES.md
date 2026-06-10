# 📊 Status de APIs e Integrações - Azimut

**Data:** 2025-01-27  
**Última atualização:** 2025-01-27

---

## ✅ APIs Implementadas e Funcionando

### 1. **API de Leads** (`/api/leads`)
**Arquivo:** `azimut-cms/app/api/leads/route.ts`

**Status:** ✅ **Implementada** (parcialmente)

**Funcionalidades:**
- ✅ Captura de leads do formulário de contato
- ✅ Vinculação com sessão do visitante
- ✅ Cálculo de score de conversão
- ✅ Identificação de tipo de visitante (MUSEUM_CURATOR, CITY_OFFICIAL, etc.)
- ✅ Priorização automática (HIGH, MEDIUM, LOW, URGENT)
- ✅ Análise comportamental (páginas visitadas, projetos visualizados)
- ✅ Salva no banco de dados (Prisma)

**Pendências:**
- ⚠️ **TODO:** Envio real de email (linha 205)
  - Atualmente apenas loga no console
  - Precisa integrar com SendGrid, Nodemailer, ou similar
- ⚠️ **TODO:** Integração com Kabbam/CRM (mencionado em `src/api/leads.ts` linha 35)
  - Frontend tem função `formatLeadForKabbam()` pronta
  - Falta implementar envio real para Kabbam

**Uso no Frontend:**
- `src/api/leads.ts` - Função `submitLead()` (usa localStorage por enquanto)
- `src/pages/Contact.tsx` - Formulário de contato
- `src/components/BudgetWizard.tsx` - Wizard de orçamento

---

### 2. **API de Tracking** (`/api/track`)
**Arquivo:** `azimut-cms/app/api/track/route.ts`

**Status:** ✅ **Implementada**

**Funcionalidades:**
- ✅ Tracking de sessões de visitantes
- ✅ Tracking de visualizações de páginas
- ✅ Tracking de interações (cliques, scrolls)
- ✅ Cálculo de score de interesse por IA
- ✅ Identificação de tipo de visitante
- ✅ Geo-localização (país)
- ✅ Análise de comportamento

**Uso no Frontend:**
- `src/hooks/useUserTracking.ts` - Hook de tracking
- `src/utils/analytics.ts` - Funções de analytics

---

### 3. **API de Chatbot** (`/api/chatbot`)
**Arquivo:** `azimut-cms/app/api/chatbot/route.ts`

**Status:** ✅ **Implementada**

**Funcionalidades:**
- ✅ Integração com DeepSeek AI
- ✅ Chatbot inteligente para orientação
- ✅ Captura de informações do visitante
- ✅ Análise de perfil por IA

**Uso no Frontend:**
- ⚠️ **Pendente:** Componente React de chatbot ainda não criado
- Documentação: `PLANO_IA_CHATBOT_LEADS.md`

---

### 4. **API de Editais** (`/api/admin/editais`)
**Arquivo:** `azimut-cms/app/api/admin/editais/route.ts`

**Status:** ✅ **Implementada**

**Funcionalidades:**
- ✅ CRUD completo de editais
- ✅ Busca por país (BR, CA)
- ✅ Matching de editais com perfil de lead
- ✅ Sugestão de editais relevantes

**Uso no Frontend:**
- `src/components/CredibilidadeEditais.tsx` - Exibe editais
- `src/utils/editaisMatching.ts` - Matching de editais

---

### 5. **API Pública de Conteúdo** (`/api/public/content`)
**Arquivo:** `azimut-cms/app/api/public/content/route.ts`

**Status:** ✅ **Implementada e em uso**

**Funcionalidades:**
- ✅ Retorna páginas, projetos, serviços, markets
- ✅ Suporte a 4 idiomas (PT, EN, ES, FR)
- ✅ Geo-localização automática
- ✅ CORS habilitado

**Uso no Frontend:**
- `src/hooks/useAzimutContent.ts` - Hook principal
- Usado em: Home, Work, WhatWeDo

---

### 6. **API Pública de Páginas** (`/api/public/page/[slug]`)
**Arquivo:** `azimut-cms/app/api/public/page/[slug]/route.ts`

**Status:** ✅ **Implementada**

**Funcionalidades:**
- ✅ Retorna conteúdo de página específica
- ✅ Suporte a 4 idiomas
- ✅ SEO completo

**Uso no Frontend:**
- `src/hooks/useBackofficeContent.ts` - Hook para páginas

---

## ⚠️ Integrações Pendentes

### 1. **Integração com Kabbam/CRM**
**Status:** ⚠️ **Pendente**

**O que falta:**
- [ ] Implementar envio real de leads para Kabbam
- [ ] Configurar credenciais da API do Kabbam
- [ ] Mapear campos do lead para formato Kabbam
- [ ] Testar integração

**Arquivos relacionados:**
- `src/api/leads.ts` - Função `formatLeadForKabbam()` já existe
- `src/components/Layout.tsx` - TODO na linha 1247

**Próximos passos:**
1. Obter credenciais da API do Kabbam
2. Criar variável de ambiente `KABBAM_API_KEY`
3. Implementar função de envio em `azimut-cms/app/api/leads/route.ts`
4. Testar envio de lead

---

### 2. **Envio de Email (Notificações)**
**Status:** ⚠️ **Pendente**

**O que falta:**
- [ ] Escolher serviço de email (SendGrid, Nodemailer, Resend, etc.)
- [ ] Configurar credenciais
- [ ] Implementar função `sendEmail()` em `azimut-cms/app/api/leads/route.ts`
- [ ] Configurar template de email
- [ ] Testar envio

**Arquivos relacionados:**
- `azimut-cms/app/api/leads/route.ts` - Linha 205 (TODO)

**Próximos passos:**
1. Escolher serviço (Recomendado: Resend ou SendGrid)
2. Criar variável de ambiente `EMAIL_API_KEY`
3. Criar variável `NOTIFICATION_EMAIL`
4. Implementar função de envio
5. Testar

---

### 3. **Componente de Chatbot no Frontend**
**Status:** ⚠️ **Pendente**

**O que falta:**
- [ ] Criar componente React de chatbot
- [ ] Integrar com `/api/chatbot`
- [ ] Adicionar ao layout do site
- [ ] Implementar UI/UX do chatbot
- [ ] Testar fluxo completo

**Arquivos relacionados:**
- `azimut-cms/app/api/chatbot/route.ts` - API já existe
- `PLANO_IA_CHATBOT_LEADS.md` - Documentação completa

**Próximos passos:**
1. Criar `src/components/Chatbot.tsx`
2. Integrar com API
3. Adicionar ao `Layout.tsx`
4. Testar

---

### 4. **Integração com Redes Sociais (Opcional)**
**Status:** ⚠️ **Futuro (Opcional)**

**O que falta:**
- [ ] LinkedIn API - Buscar perfil do lead
- [ ] Instagram API - Verificar perfil público
- [ ] Facebook API - Buscar página/perfil
- [ ] Email enrichment (Hunter.io / Clearbit)

**Documentação:**
- `PLANO_IA_CHATBOT_LEADS.md` - Seção "INTEGRAÇÕES DE REDES SOCIAIS"

**Prioridade:** Baixa (pode ser feito depois)

---

## 📋 Checklist de Implementação

### Prioridade Alta (Imediato)

- [ ] **Envio de Email:**
  - [ ] Escolher serviço (Resend/SendGrid)
  - [ ] Configurar variáveis de ambiente
  - [ ] Implementar função `sendEmail()`
  - [ ] Testar envio

- [ ] **Integração Kabbam:**
  - [ ] Obter credenciais
  - [ ] Implementar envio de leads
  - [ ] Testar integração

### Prioridade Média (Próximos Dias)

- [ ] **Chatbot Frontend:**
  - [ ] Criar componente React
  - [ ] Integrar com API
  - [ ] Adicionar ao site
  - [ ] Testar

- [ ] **Melhorias no Tracking:**
  - [ ] Dashboard de analytics
  - [ ] Visualização de leads
  - [ ] Relatórios

### Prioridade Baixa (Futuro)

- [ ] **Redes Sociais:**
  - [ ] LinkedIn API
  - [ ] Instagram API
  - [ ] Facebook API
  - [ ] Email enrichment

- [ ] **Automações:**
  - [ ] Mensagens personalizadas por IA
  - [ ] Follow-up automático
  - [ ] Agendamento de contato

---

## 🔧 Variáveis de Ambiente Necessárias

### Já Configuradas:
- ✅ `DATABASE_URL` - Banco de dados
- ✅ `JWT_SECRET` - Autenticação
- ✅ `DEEPSEEK_API_KEY` - Chatbot AI

### Pendentes:
- ⚠️ `KABBAM_API_KEY` - Integração CRM
- ⚠️ `EMAIL_API_KEY` - Envio de emails (Resend/SendGrid)
- ⚠️ `NOTIFICATION_EMAIL` - Email para notificações
- ⚠️ `LINKEDIN_API_KEY` - (Opcional) LinkedIn
- ⚠️ `INSTAGRAM_API_KEY` - (Opcional) Instagram
- ⚠️ `FACEBOOK_API_KEY` - (Opcional) Facebook

---

## 📊 Resumo Executivo

### ✅ O Que Está Funcionando:
1. ✅ API de Leads (captura e salvamento)
2. ✅ API de Tracking (sessões e comportamento)
3. ✅ API de Chatbot (backend pronto)
4. ✅ API de Editais (CRUD completo)
5. ✅ APIs Públicas (conteúdo do site)

### ⚠️ O Que Falta:
1. ⚠️ Envio real de email (notificações)
2. ⚠️ Integração com Kabbam/CRM
3. ⚠️ Componente de Chatbot no frontend
4. ⚠️ Integrações com redes sociais (opcional)

### 🎯 Próximos Passos Recomendados:
1. **Implementar envio de email** (1-2 dias)
2. **Integrar com Kabbam** (2-3 dias)
3. **Criar componente de chatbot** (3-5 dias)
4. **Testar tudo junto** (1 dia)

---

## 📚 Documentação Relacionada

- `PLANO_IA_CHATBOT_LEADS.md` - Plano completo de chatbot e leads
- `azimut-cms/app/api/leads/route.ts` - Código da API de leads
- `azimut-cms/app/api/chatbot/route.ts` - Código da API de chatbot
- `src/api/leads.ts` - Frontend de leads

---

**Última atualização:** 2025-01-27















