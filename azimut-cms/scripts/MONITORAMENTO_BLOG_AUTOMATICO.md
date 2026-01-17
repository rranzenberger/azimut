# 🤖 SISTEMA DE MONITORAMENTO AUTOMÁTICO DE CONTEÚDO PARA BLOG

## 🎯 OBJETIVO

Criar um sistema que:
1. **Monitora automaticamente** notícias, redes sociais, vídeos sobre projetos da Azimut
2. **Usa IA** para reescrever textos (sem plágio) e melhorar SEO
3. **Sugere posts** no backoffice com pré-aprovação
4. **Gerencia créditos** corretamente (cliente vs autorais vs eventos)
5. **Melhora SEO** através de conteúdo relevante e otimizado

---

## 🏗️ ARQUITETURA DO SISTEMA

### **1. Monitoramento (APIs Externas)**
```
┌─────────────────┐
│  Google News    │ → Busca notícias sobre projeto
│  RSS Feeds      │ → Blogs, sites de notícias
│  Instagram API  │ → Posts mencionando projeto
│  YouTube API    │ → Vídeos relacionados
│  Twitter API    │ → Menções, hashtags
│  Facebook Graph │ → Posts, eventos
└─────────────────┘
         ↓
┌─────────────────┐
│  Web Scraping   │ → Extrai texto, imagens, links
└─────────────────┘
         ↓
┌─────────────────┐
│  IA Processing  │ → Reescreve, melhora SEO
│  (GPT/Claude)   │
└─────────────────┘
         ↓
┌─────────────────┐
│  Backoffice     │ → Sugestões para aprovação
└─────────────────┘
```

### **2. Tipos de Projetos (Créditos)**
```
┌─────────────────────────────────────┐
│ PROJETO_CLIENTE                     │
│ - Crédito: "Animação por Azimut"    │
│ - Ex: "Fala Sério Mãe"              │
│ - Campo: créditoTexto               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PROJETO_AUTORAL                     │
│ - Crédito: "Produção Azimut"        │
│ - Ex: Festival de Cinema VR         │
│ - Campo: créditoTexto = "Produção"  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ EVENTO                              │
│ - Crédito: "Realização Azimut"      │
│ - Ex: Mostra VR                     │
│ - Campo: créditoTexto = "Realização"│
└─────────────────────────────────────┘
```

---

## 📊 ESTRUTURA DO BANCO DE DADOS

### **Tabela `BlogPostMonitor`** (Nova)
```sql
CREATE TABLE "BlogPostMonitor" (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projectId           UUID REFERENCES "Project"(id),
  projectName         TEXT, -- Nome do projeto para busca
  
  -- Tipo de crédito
  creditType          TEXT NOT NULL, -- CLIENTE, AUTORAL, EVENTO
  creditText          TEXT, -- "Animação por Azimut", "Produção Azimut", etc.
  azimutRole          TEXT, -- "Animação", "Produção", "Realização", etc.
  azimutContributions TEXT[], -- ["arte generativa", "motion design", "led 20x5m"]
  
  -- Conteúdo encontrado
  sourceType          TEXT NOT NULL, -- NEWS, INSTAGRAM, YOUTUBE, BLOG, PRESS
  sourceUrl           TEXT NOT NULL,
  sourceTitle         TEXT,
  sourceContent       TEXT,
  sourceImageUrl      TEXT,
  sourceVideoUrl      TEXT,
  sourceAuthor        TEXT,
  sourceDate          TIMESTAMP,
  
  -- Conteúdo processado por IA
  suggestedTitlePt    TEXT,
  suggestedTitleEn    TEXT,
  suggestedExcerptPt  TEXT,
  suggestedExcerptEn  TEXT,
  suggestedContentPt  TEXT,
  suggestedContentEn  TEXT,
  aiProcessedAt       TIMESTAMP,
  
  -- Metadados
  keywords            TEXT[],
  mentions            TEXT[], -- Influencers, veículos, etc.
  status              TEXT DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, PUBLISHED
  
  -- Relação com post aprovado
  blogPostId          UUID REFERENCES "BlogPost"(id),
  
  createdAt           TIMESTAMP DEFAULT NOW(),
  updatedAt           TIMESTAMP DEFAULT NOW()
);
```

### **Tabela `Project`** (Adicionar campos)
```sql
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "monitorEnabled" BOOLEAN DEFAULT false;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "monitorKeywords" TEXT[];
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "creditType" TEXT; -- CLIENTE, AUTORAL, EVENTO
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "creditText" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "azimutContributions" TEXT[];
```

---

## 🔧 COMPONENTES DO SISTEMA

### **1. API de Monitoramento (`/api/admin/blog/monitor`)**

#### **GET - Listar sugestões**
```typescript
GET /api/admin/blog/monitor?status=PENDING&projectId=xxx
```

#### **POST - Buscar conteúdo (manual)**
```typescript
POST /api/admin/blog/monitor/search
{
  "projectId": "uuid",
  "keywords": ["Rio Museu Olímpico"],
  "sources": ["news", "instagram", "youtube"]
}
```

#### **POST - Processar com IA**
```typescript
POST /api/admin/blog/monitor/:id/process-ai
{
  "improveSEO": true,
  "rewrite": true,
  "language": "pt"
}
```

#### **POST - Aprovar sugestão**
```typescript
POST /api/admin/blog/monitor/:id/approve
{
  "blogPostId": "uuid" // Criar novo post
}
```

### **2. Serviço de Busca (`services/contentMonitor.ts`)**

#### **Google News API**
```typescript
async function searchGoogleNews(keywords: string[]) {
  // Usar: https://newsapi.org ou Google Custom Search API
  // Buscar: "Rio Museu Olímpico Azimut"
}
```

#### **Instagram Graph API**
```typescript
async function searchInstagram(hashtags: string[]) {
  // Buscar posts com hashtags: #RioMuseuOlimpico, #Azimut
}
```

#### **YouTube API**
```typescript
async function searchYouTube(query: string) {
  // Buscar vídeos: "Rio Museu Olímpico montagem"
}
```

#### **RSS Feeds**
```typescript
async function parseRSSFeed(url: string) {
  // Parsear feeds de blogs, sites de notícias
}
```

### **3. Processamento com IA (`services/aiProcessor.ts`)**

#### **Reescrever Texto**
```typescript
async function rewriteWithAI(text: string, language: string) {
  // Usar OpenAI GPT-4 ou Claude
  // Prompts:
  // - "Reescreva este texto mantendo o sentido mas evitando plágio"
  // - "Melhore este texto para SEO sem perder o conteúdo original"
  // - "Crie um título atrativo para blog baseado neste texto"
}
```

#### **Melhorar SEO**
```typescript
async function improveSEO(text: string, keywords: string[]) {
  // Adicionar keywords naturalmente
  // Otimizar estrutura (H1, H2, etc.)
  // Sugerir meta descriptions
}
```

### **4. Interface no Backoffice**

#### **Página: `/admin/blog/monitor`**
- Lista de sugestões (PENDING, APPROVED, REJECTED)
- Filtros: projeto, fonte, status
- Botão "Buscar Agora" para projetos específicos
- Preview do conteúdo sugerido
- Editor para editar antes de aprovar
- Botão "Processar com IA" para melhorar texto
- Botão "Aprovar e Publicar"

#### **Componente: `BlogMonitorCard.tsx`**
```tsx
<BlogMonitorCard
  suggestion={suggestion}
  onProcessAI={() => {}}
  onApprove={() => {}}
  onReject={() => {}}
  onEdit={() => {}}
/>
```

---

## 🚀 IMPLEMENTAÇÃO FASEADA

### **FASE 1: Estrutura Básica** (1-2 dias)
- [ ] Criar tabela `BlogPostMonitor`
- [ ] Adicionar campos em `Project`
- [ ] API básica (GET, POST)
- [ ] Interface no backoffice (lista, filtros)

### **FASE 2: Busca Manual** (2-3 dias)
- [ ] Integração Google News API
- [ ] Integração YouTube API
- [ ] Busca manual por projeto/keywords
- [ ] Salvar resultados em `BlogPostMonitor`

### **FASE 3: Processamento com IA** (2-3 dias)
- [ ] Integração OpenAI/Claude API
- [ ] Função de reescrever texto
- [ ] Função de melhorar SEO
- [ ] Interface para processar sugestões

### **FASE 4: Automação** (3-4 dias)
- [ ] Cron job para buscar periodicamente
- [ ] Notificações de novas sugestões
- [ ] Aprovação em massa
- [ ] Publicação automática (opcional)

### **FASE 5: Refinamento** (1-2 dias)
- [ ] Filtros avançados
- [ ] Dashboard de métricas
- [ ] Exportação de relatórios

---

## 💡 EXEMPLO DE USO

### **Cenário 1: Projeto Cliente ("Fala Sério Mãe")**

1. **Configurar Projeto no Backoffice:**
   ```
   Projeto: "Fala Sério Mãe"
   Tipo: CLIENTE
   Crédito: "Animação por Azimut"
   Contribuições: ["arte generativa", "motion design", "led 20x5m", "IA"]
   Monitor: ATIVO
   Keywords: ["Fala Sério Mãe", "Netflix", "animação"]
   ```

2. **Sistema Busca Automaticamente:**
   - Notícias sobre "Fala Sério Mãe"
   - Posts do Instagram mencionando o projeto
   - Vídeos no YouTube sobre o projeto

3. **IA Processa:**
   - Encontra: "A nova série da Netflix Fala Sério Mãe..."
   - IA reescreve: "A Azimut foi responsável pela criação das animações..."
   - Adiciona crédito: "Animação por Azimut"
   - Melhora SEO: adiciona keywords relevantes

4. **Sugestão Aparece no Backoffice:**
   - Status: PENDING
   - Preview do texto sugerido
   - Botão "Editar" para ajustar
   - Botão "Aprovar e Publicar"

### **Cenário 2: Evento Autoral (Festival VR)**

1. **Configurar Projeto:**
   ```
   Projeto: "Festival de Cinema VR"
   Tipo: EVENTO
   Crédito: "Realização Azimut"
   Monitor: ATIVO
   ```

2. **Sistema Busca:**
   - Notícias sobre o festival
   - Posts de participantes
   - Vídeos do evento

3. **IA Processa:**
   - Crédito completo: "Realização Azimut"
   - Texto focado no evento
   - SEO otimizado para "festival VR", "cinema imersivo"

---

## 🔐 CONFIGURAÇÃO NECESSÁRIA

### **Variáveis de Ambiente:**
```env
# OpenAI (para reescrever textos)
OPENAI_API_KEY=sk-...

# Google News API
NEWS_API_KEY=...

# YouTube API
YOUTUBE_API_KEY=...

# Instagram Graph API
INSTAGRAM_ACCESS_TOKEN=...

# Facebook Graph API
FACEBOOK_ACCESS_TOKEN=...
```

---

## ❓ PERGUNTAS E RESPOSTAS

### **Q: Como evitar plágio?**
**R:** IA reescreve o texto mantendo informações mas mudando estrutura/vocabulário. Sempre adiciona crédito correto.

### **Q: Como gerenciar direitos autorais?**
**R:** Sistema sempre adiciona crédito (campo `creditText`) e link para fonte original (`sourceUrl`).

### **Q: Pode ser automático 100%?**
**R:** Recomendamos semi-automático: sistema sugere, você aprova/edita antes de publicar.

### **Q: E se o conteúdo for negativo?**
**R:** Filtros podem rejeitar automaticamente palavras-chave negativas. Revisão manual sempre recomendada.

### **Q: Quanto custa?**
**R:** 
- APIs de busca: Gratuitas (com limites) ou pagas
- OpenAI: ~$0.01-0.02 por post processado
- Manutenção: Baixa (sistema automatizado)

---

## ✅ PRÓXIMOS PASSOS

1. **Confirmar arquitetura** (você aprova?)
2. **Criar schema Prisma** (tabelas novas)
3. **Implementar FASE 1** (estrutura básica)
4. **Testar com 1 projeto** (ex: Rio Museu Olímpico)
5. **Iterar e melhorar**

---

**Deseja que eu comece a implementar? Qual fase você quer começar?**
