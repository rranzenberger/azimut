# 📚 GUIA COMPLETO DO SISTEMA - CMS Azimut

**Data de Criação:** Janeiro 2025  
**Última Atualização:** Janeiro 2025  
**Versão:** 1.0

---

## 🎯 PROPÓSITO DESTE DOCUMENTO

Este documento foi criado para evitar perder informações sobre o sistema, como aconteceu anteriormente. Aqui está **TUDO** que foi implementado, como funciona, onde está, e como usar.

**IMPORTANTE:** Sempre atualize este documento quando fizer mudanças no sistema!

---

## 📋 SUMÁRIO

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
3. [Interface do Backoffice](#interface-do-backoffice)
4. [APIs Implementadas](#apis-implementadas)
5. [Integração com o Site Principal](#integração-com-o-site-principal)
6. [Campos Editáveis e Limites](#campos-editáveis-e-limites)
7. [Como Usar (Passo a Passo)](#como-usar-passo-a-passo)
8. [Arquivos Importantes](#arquivos-importantes)
9. [Migrações Realizadas](#migrações-realizadas)
10. [O Que Está Funcionando](#o-que-está-funcionando)
11. [O Que Falta Implementar](#o-que-falta-implementar)
12. [Troubleshooting](#troubleshooting)

---

## 🏗️ VISÃO GERAL DO SISTEMA

### **Arquitetura:**

```
┌─────────────────┐
│  Site Principal │ (React/Vite - Frontend)
│  localhost:5173 │
└────────┬────────┘
         │ Busca conteúdo via API
         ▼
┌─────────────────┐
│   CMS Backend   │ (Next.js - Backoffice + API)
│  localhost:3001 │
└────────┬────────┘
         │ Lê/Escreve
         ▼
┌─────────────────┐
│ Banco de Dados  │ (PostgreSQL - Neon/Supabase)
│   PostgreSQL    │
└─────────────────┘
```

### **Fluxo de Dados:**

1. **Editor acessa:** `localhost:3001/admin` → Login
2. **Editor edita:** Campos na interface do backoffice
3. **Sistema salva:** Dados no banco PostgreSQL
4. **Site lê:** Via API `/api/public/content?page=home&lang=pt`
5. **Site exibe:** Conteúdo do banco (com fallback para código estático)

---

## 🗄️ ESTRUTURA DO BANCO DE DADOS

### **Tabela: Page**

Armazena informações das páginas do site (Home, Studio, Academy, etc.)

**Campos principais:**

```prisma
model Page {
  id             String     @id @default(uuid())
  name           String                    // Nome da página (ex: "Home")
  slug           String     @unique        // URL slug (ex: "home")
  
  // SEO
  seoTitlePt     String?                   // Título SEO PT (máx: 60)
  seoTitleEn     String?                   // Título SEO EN (máx: 60)
  seoDescPt      String?                   // Descrição SEO PT (máx: 160)
  seoDescEn      String?                   // Descrição SEO EN (máx: 160)
  
  // Hero Section
  heroSloganPt   String?                   // Slogan hero PT (máx: 200)
  heroSloganEn   String?                   // Slogan hero EN (máx: 200)
  heroSloganEs   String?                   // Slogan hero ES (máx: 200)
  heroSloganFr   String?                   // Slogan hero FR (máx: 200)
  
  heroSubtitlePt String?                   // Subtitle hero PT (máx: 500) ✅ NOVO
  heroSubtitleEn String?                   // Subtitle hero EN (máx: 500) ✅ NOVO
  heroSubtitleEs String?                   // Subtitle hero ES (máx: 500) ✅ NOVO
  heroSubtitleFr String?                   // Subtitle hero FR (máx: 500) ✅ NOVO
  
  status         PageStatus @default(PUBLISHED)  // PUBLISHED | DRAFT | ARCHIVED
  sections       Section[]                       // Seções da página (relacionamento)
  
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}
```

### **Tabela: Section**

Armazena seções individuais dentro de uma página (heritage, pillars, etc.)

```prisma
model Section {
  id             String    @id @default(uuid())
  pageId         String                    // ID da página pai
  page           Page      @relation(...)
  
  order          Int       @default(0)     // Ordem de exibição
  type           String                    // Tipo: "heritage", "pillars", etc.
  layout         String?                   // Layout: "grid-2", "grid-3", etc.
  
  // Conteúdo multilíngue
  titlePt        String?                   // Título PT (máx: 200)
  titleEn        String?                   // Título EN (máx: 200)
  titleEs        String?                   // Título ES (máx: 200)
  titleFr        String?                   // Título FR (máx: 200)
  
  bodyPt         String?                   // Corpo PT (máx: 5000)
  bodyEn         String?                   // Corpo EN (máx: 5000)
  bodyEs         String?                   // Corpo ES (máx: 5000)
  bodyFr         String?                   // Corpo FR (máx: 5000)
  
  linkedProjects Project[]                 // Projetos relacionados
  
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

### **Onde está o Schema:**

📁 `azimut-cms/prisma/schema.prisma`

---

## 🎨 INTERFACE DO BACKOFFICE

### **URL de Acesso:**

- **Desenvolvimento:** `http://localhost:3001/admin`
- **Produção:** `https://cms.azimut.com.br/admin` (ou URL configurada)

### **Estrutura do Menu Lateral:**

```
┌─────────────────────────┐
│   Logo Azimut CMS       │
├─────────────────────────┤
│   Email do Usuário      │
│   Role (ADMIN/EDITOR)   │
├─────────────────────────┤
│  📊 Dashboard           │
│  📁 Projetos            │
│  📄 Páginas             │ ← Editar conteúdo do site
│  🖼️  Mídias              │
├─────────────────────────┤
│  Em breve:              │
│  📧 Leads (desabilitado)│
│  ⚙️  Serviços (desab.)  │
│  🔧 Config (desabilitado)│
├─────────────────────────┤
│  🌐 Ver Site Principal  │ ← NOVO! Link para o site
├─────────────────────────┤
│  🚪 Sair                │
└─────────────────────────┘
```

### **Página de Edição (`/admin/pages/[slug]/edit`):**

**Estrutura da interface:**

1. **Breadcrumb:** "Páginas > Home" (topo da página)

2. **Seção: Informações Básicas**
   - Nome da Página (máx: 100 caracteres)
   - Status (Publicado/Rascunho/Arquivado)

3. **Seção: Hero Slogan**
   - 📍 Localização: "Páginas > Hero > Slogan > [Idioma]"
   - 4 campos (PT, EN, ES, FR)
   - Máximo: 200 caracteres cada
   - Botões de tradução: →EN, →ES, →FR

4. **Seção: Hero Subtitle**
   - 📍 Localização: "Páginas > Hero > Subtitle > [Idioma]"
   - 4 campos (PT, EN, ES, FR)
   - Máximo: 500 caracteres cada
   - Botões de tradução: →EN, →ES, →FR

5. **Seção: SEO**
   - Título SEO PT (máx: 60)
   - Título SEO EN (máx: 60)
   - Descrição SEO PT (máx: 160)
   - Descrição SEO EN (máx: 160)

6. **Seção: Sections (Placeholder)**
   - Ainda não implementado (futuro)

### **Recursos Visuais:**

✅ **Contador de Caracteres:**
- Fundo colorido (verde/amarelo/vermelho)
- Mostra: "📏 Máximo: X caracteres" + "Y / X"
- Cores:
  - 🟢 Verde: < 80% do limite
  - 🟡 Amarelo: 80-100% do limite
  - 🔴 Vermelho: > 100% do limite

✅ **Localização do Campo:**
- Breadcrumb acima de cada campo
- Formato: "Páginas > Hero > Slogan > Português"
- Facilita identificar onde o texto aparece no site

✅ **Avisos:**
- Alerta vermelho quando excede limite
- Mensagem: "⚠️ Texto excede o limite recomendado! Pode aparecer cortado ou estranho no site."

✅ **Tradução Automática:**
- Botões →EN, →ES, →FR
- Traduz do português para outros idiomas
- Usa API de IA (DeepSeek/OpenRouter)

### **Onde estão os Arquivos:**

- Layout: `azimut-cms/app/admin/layout.tsx`
- Página de listagem: `azimut-cms/app/admin/site-pages/page.tsx`
- Página de edição: `azimut-cms/app/admin/pages/[slug]/edit/page.tsx`
- Componentes: `azimut-cms/app/admin/components/`

---

## 🔌 APIS IMPLEMENTADAS

### **1. API de Edição (`/api/admin/pages/[slug]`)**

**Métodos:**
- `GET`: Busca página por slug
- `PUT`: Atualiza página
- `DELETE`: Deleta página (futuro)

**Onde está:**
📁 `azimut-cms/app/api/admin/pages/[slug]/route.ts`

**Exemplo de uso (PUT):**
```json
PUT /api/admin/pages/home
{
  "name": "Home",
  "heroSloganPt": "Novo slogan...",
  "heroSubtitlePt": "Novo subtitle...",
  "status": "PUBLISHED"
}
```

### **2. API Pública de Conteúdo (`/api/public/content`)**

**Endpoint:**
```
GET /api/public/content?page=home&lang=pt&country=BR
```

**Resposta:**
```json
{
  "lang": "pt",
  "heroSlogan": "Experiências que Conectam Mundos",
  "heroSubtitle": "Após 30 anos...",
  "page": {
    "name": "Home",
    "slug": "home",
    "heroSlogan": "...",
    "heroSubtitle": "...",
    "seo": {
      "title": "...",
      "description": "..."
    },
    "sections": [...]
  },
  "services": [...],
  "highlightProjects": [...]
}
```

**Onde está:**
📁 `azimut-cms/app/api/public/content/route.ts`

**Características:**
- ✅ Suporta múltiplos idiomas (pt, en, es, fr)
- ✅ Detecção de país (BR, CA, US, etc.)
- ✅ Cache de 1 hora
- ✅ Fallback automático se falhar

### **3. API de Tradução (`/api/admin/translate`)**

**Endpoint:**
```
POST /api/admin/translate
{
  "text": "Texto em português",
  "from": "pt",
  "to": "en"
}
```

**Resposta:**
```json
{
  "translatedText": "Text in English",
  "originalText": "Texto em português",
  "from": "pt",
  "to": "en"
}
```

**Onde está:**
📁 `azimut-cms/app/api/admin/translate/route.ts`

**Características:**
- ✅ Usa IA (DeepSeek/OpenRouter)
- ✅ Suporta: pt → en, es, fr
- ✅ Requer autenticação

---

## 🌐 INTEGRAÇÃO COM O SITE PRINCIPAL

### **Como o Site Lê do CMS:**

**Arquivo:** `src/hooks/useAzimutContent.ts`

**Hook usado:**
```typescript
const { content: cmsContent } = useAzimutContent({ page: 'home' })
const heroSlogan = cmsContent?.page?.heroSlogan || locale(contentModel.home.hero.title)
const heroSubtitle = cmsContent?.page?.heroSubtitle || locale(contentModel.home.hero.subtitle)
```

**Funcionamento:**
1. Site faz requisição para `/api/public/content?page=home&lang=pt`
2. Se CMS responder → usa conteúdo do banco
3. Se CMS falhar → usa fallback do código estático (`src/data/content.ts`)

### **Onde está Implementado:**

**Página Home:**
📁 `src/pages/Home.tsx` (linhas 25-28, 122, 126)

**Código relevante:**
```typescript
// Linha 25: Busca do CMS
const { content: cmsContent } = useAzimutContent({ page: 'home' })

// Linha 28: Hero Slogan do CMS
const heroSlogan = cmsContent?.page?.heroSlogan || locale(contentModel.home.hero.title)

// Linha 29: Hero Subtitle do CMS (NOVO)
const heroSubtitle = cmsContent?.page?.heroSubtitle || locale(contentModel.home.hero.subtitle)

// Linha 122: Usa no template
<h1>{heroSlogan.toUpperCase()}</h1>

// Linha 126: Usa no template
<p>{heroSubtitle}</p>
```

### **Variáveis de Ambiente Necessárias:**

**No Site Principal (`src/`):**
```env
VITE_CMS_API_URL=http://localhost:3001/api
# ou em produção:
VITE_CMS_API_URL=https://cms.azimut.com.br/api
```

**No CMS (`azimut-cms/`):**
```env
DATABASE_URL=postgresql://...        # URL do PostgreSQL
NEXT_PUBLIC_SITE_URL=http://localhost:5173  # URL do site principal
SITE_URL=http://localhost:5173              # Fallback
```

---

## 📏 CAMPOS EDITÁVEIS E LIMITES

### **Tabela Completa de Limites:**

| Campo | Localização | Máx Caracteres | Onde Aparece no Site |
|-------|-------------|----------------|---------------------|
| `name` | Páginas > Informações Básicas > Nome | **100** | Nome interno da página |
| `seoTitlePt` | Páginas > SEO > Título > PT | **60** | `<title>` da página |
| `seoTitleEn` | Páginas > SEO > Título > EN | **60** | `<title>` da página |
| `seoDescPt` | Páginas > SEO > Descrição > PT | **160** | Meta description |
| `seoDescEn` | Páginas > SEO > Descrição > EN | **160** | Meta description |
| `heroSloganPt` | Páginas > Hero > Slogan > PT | **200** | Título principal (H1) |
| `heroSloganEn` | Páginas > Hero > Slogan > EN | **200** | Título principal (H1) |
| `heroSloganEs` | Páginas > Hero > Slogan > ES | **200** | Título principal (H1) |
| `heroSloganFr` | Páginas > Hero > Slogan > FR | **200** | Título principal (H1) |
| `heroSubtitlePt` | Páginas > Hero > Subtitle > PT | **500** | Subtítulo abaixo do H1 |
| `heroSubtitleEn` | Páginas > Hero > Subtitle > EN | **500** | Subtítulo abaixo do H1 |
| `heroSubtitleEs` | Páginas > Hero > Subtitle > ES | **500** | Subtítulo abaixo do H1 |
| `heroSubtitleFr` | Páginas > Hero > Subtitle > FR | **500** | Subtítulo abaixo do H1 |

### **Por Que Esses Limites?**

- **SEO Titles (60):** Google corta títulos > 60 caracteres nos resultados
- **SEO Descriptions (160):** Google recomenda 150-160 caracteres
- **Hero Slogan (200):** Tamanho ideal para títulos principais (não quebra layout)
- **Hero Subtitle (500):** Permite texto descritivo sem exagerar

### **Documentação Completa:**

📁 `azimut-cms/CAMPOS_E_LIMITES_CARACTERES.md`

---

## 📖 COMO USAR (PASSO A PASSO)

### **Para Editar Conteúdo do Site:**

#### **1. Acessar o Backoffice:**
```
1. Abrir navegador
2. Ir para: http://localhost:3001/admin (dev) ou URL de produção
3. Fazer login:
   - Email: admin@azimut.com.br
   - Senha: Azimut2025! (ou senha configurada)
```

#### **2. Navegar até Páginas:**
```
1. Menu lateral → Clicar em "Páginas"
2. Ver lista de páginas disponíveis
3. Clicar na página desejada (ex: "Home")
```

#### **3. Editar Campos:**
```
1. Ver breadcrumb no topo: "Páginas > Home"
2. Para cada campo:
   - Ver localização: "Páginas > Hero > Slogan > Português"
   - Ver limite: "📏 Máximo: 200 caracteres"
   - Ver contador: "150 / 200" (verde = OK, amarelo = cuidado, vermelho = excedeu)
   - Digitar o texto
   - Usar botão →EN/→ES/→FR para traduzir automaticamente
```

#### **4. Salvar:**
```
1. Clicar no botão "Salvar Alterações" no topo
2. Aguardar confirmação (página volta para lista)
3. Site atualiza automaticamente (pode levar alguns segundos)
```

#### **5. Verificar no Site:**
```
1. Menu lateral → Clicar em "Ver Site Principal"
2. Site abre em nova aba
3. Verificar se mudanças apareceram
4. Se não aparecer: aguardar alguns segundos (cache pode demorar)
```

### **Para Traduzir Textos:**
```
1. Preencher campo em Português PRIMEIRO
2. Clicar no botão →EN (ou →ES, →FR) do campo que quer traduzir
3. Aguardar tradução automática (usa IA)
4. Revisar tradução (pode precisar ajustes)
5. Salvar normalmente
```

---

## 📁 ARQUIVOS IMPORTANTES

### **Estrutura de Diretórios:**

```
azimut-cms/
├── app/
│   ├── admin/                          # Interface do backoffice
│   │   ├── layout.tsx                  # Layout principal (menu lateral)
│   │   ├── site-pages/                 # Lista de páginas
│   │   │   └── page.tsx
│   │   └── pages/[slug]/edit/          # Edição de página
│   │       └── page.tsx                # ⭐ PRINCIPAL: Interface de edição
│   ├── api/
│   │   ├── admin/
│   │   │   ├── pages/[slug]/route.ts   # API de edição
│   │   │   └── translate/route.ts      # API de tradução
│   │   └── public/
│   │       └── content/route.ts        # API pública (site lê daqui)
│   └── components/                     # Componentes reutilizáveis
│
├── prisma/
│   ├── schema.prisma                   # ⭐ Schema do banco de dados
│   ├── seed.ts                         # ⭐ Dados iniciais (seed)
│   └── migrations/                     # Migrations do banco
│
├── lib/
│   ├── prisma.ts                       # Cliente Prisma
│   ├── auth.ts                         # Autenticação
│   └── ai-provider.ts                  # Integração com IA (tradução)
│
└── *.md                                # Documentação
    ├── GUIA_COMPLETO_SISTEMA.md        # ⭐ ESTE ARQUIVO
    ├── CAMPOS_E_LIMITES_CARACTERES.md  # Limites de caracteres
    ├── MIGRACAO_CONTEUDO_COMPLETA.md   # Histórico de migrações
    ├── VERIFICACAO_FUNCIONALIDADE.md   # Checklist funcional
    └── RESUMO_MIGRACAO.md              # Resumo executivo
```

### **Arquivos Mais Importantes:**

1. **Schema do Banco:**
   📁 `azimut-cms/prisma/schema.prisma`
   - Define estrutura das tabelas
   - Atualizar quando adicionar novos campos

2. **Interface de Edição:**
   📁 `azimut-cms/app/admin/pages/[slug]/edit/page.tsx`
   - Interface principal de edição
   - Adicionar novos campos aqui

3. **API de Edição:**
   📁 `azimut-cms/app/api/admin/pages/[slug]/route.ts`
   - Recebe dados do frontend
   - Salva no banco

4. **API Pública:**
   📁 `azimut-cms/app/api/public/content/route.ts`
   - Site principal lê daqui
   - Retorna dados formatados

5. **Seed (Dados Iniciais):**
   📁 `azimut-cms/prisma/seed.ts`
   - Popula banco com dados iniciais
   - Executar: `npx prisma db seed`

---

## 🔄 MIGRAÇÕES REALIZADAS

### **Migration 1: Adicionar Hero Slogan**

**Data:** Dezembro 2024  
**Arquivo:** `prisma/migrations/20251220230847_add_hero_slogan_to_page/`

**O que fez:**
- Adicionou campos `heroSloganPt`, `heroSloganEn`, `heroSloganEs`, `heroSloganFr` na tabela `Page`

### **Migration 2: Adicionar Hero Subtitle**

**Data:** Janeiro 2025  
**Arquivo:** `prisma/migrations/add_hero_subtitle_to_page/migration.sql`

**O que fez:**
- Adicionou campos `heroSubtitlePt`, `heroSubtitleEn`, `heroSubtitleEs`, `heroSubtitleFr` na tabela `Page`
- Limite: 500 caracteres por campo

**Como aplicar:**
```bash
cd azimut-cms
npx prisma migrate dev --name add_hero_subtitle_to_page
# ou executar SQL manualmente se necessário
```

### **Conteúdo Migrado do Código Estático:**

✅ **Hero Slogan:**
- Origem: `src/data/content.ts` → `homeContent.hero.title`
- Status: ✅ Migrado para banco

✅ **Hero Subtitle:**
- Origem: `src/data/content.ts` → `homeContent.hero.subtitle`
- Status: ✅ Migrado para banco

⏳ **Pillars e Why:**
- Origem: `src/data/content.ts` → `homeContent.pillars`, `homeContent.why`
- Status: ⏳ Ainda no código estático (futuro: migrar via Sections)

⏳ **Studio Content:**
- Origem: `src/data/studioContent.ts`
- Status: ⏳ Ainda no código estático (futuro: migrar via Sections)

---

## ✅ O QUE ESTÁ FUNCIONANDO

### **Backoffice:**
- ✅ Login/Autenticação
- ✅ Menu de navegação lateral
- ✅ Listagem de páginas
- ✅ Edição de páginas
- ✅ Campos Hero Slogan (4 idiomas)
- ✅ Campos Hero Subtitle (4 idiomas) ✅ NOVO
- ✅ Campos SEO (Title/Description)
- ✅ Contador de caracteres visível
- ✅ Validação de limites
- ✅ Tradução automática (→EN, →ES, →FR)
- ✅ Botão "Ver Site Principal"
- ✅ Salvar no banco de dados

### **Banco de Dados:**
- ✅ Tabela `Page` com todos os campos
- ✅ Tabela `Section` (estrutura pronta, uso futuro)
- ✅ Relacionamentos configurados
- ✅ Seed funcional

### **API:**
- ✅ API de edição (`/api/admin/pages/[slug]`)
- ✅ API pública (`/api/public/content`)
- ✅ API de tradução (`/api/admin/translate`)
- ✅ Suporte multilíngue (PT, EN, ES, FR)
- ✅ Cache configurado
- ✅ CORS configurado

### **Site Principal:**
- ✅ Lê `heroSlogan` do CMS
- ✅ Lê `heroSubtitle` do CMS ✅ NOVO
- ✅ Fallback para código estático
- ✅ Hook `useAzimutContent` funcional

---

## ⏳ O QUE FALTA IMPLEMENTAR

### **Prioridade Alta:**

1. **Gerenciar Sections**
   - Interface para criar/editar sections
   - Cada página pode ter múltiplas sections
   - Sections podem ter tipos: "heritage", "pillars", "why", etc.
   - Status: ⏳ Estrutura pronta, interface faltando

2. **Migrar Pillars e Why**
   - Criar sections do tipo "pillars" e "why" na página Home
   - Migrar conteúdo de `src/data/content.ts`
   - Status: ⏳ Planejado

### **Prioridade Média:**

3. **Migrar Conteúdo do Studio**
   - Criar página "Studio" no banco
   - Criar sections: heritage, unique, vision-mission-values, pillars, strategy, cocreation, timeline, team
   - Status: ⏳ Planejado

4. **Migrar Conteúdo do Academy**
   - Criar página "Academy" no banco
   - Criar sections: research, courses, corporate
   - Status: ⏳ Planejado

5. **SEO Completo (ES/FR)**
   - Adicionar `seoTitleEs`, `seoTitleFr`, `seoDescEs`, `seoDescFr`
   - Status: ⏳ Estrutura falta, mas é simples

### **Prioridade Baixa:**

6. **Preview em Tempo Real**
   - Ver como ficará no site antes de salvar
   - Status: ⏳ Ideia futura

7. **Validação Avançada**
   - Validar HTML/formatos
   - Sugestões SEO
   - Status: ⏳ Ideia futura

---

## 🔧 TROUBLESHOOTING

### **Problema: Site não mostra conteúdo do CMS**

**Soluções:**
1. Verificar se CMS está rodando (`localhost:3001`)
2. Verificar variável `VITE_CMS_API_URL` no site
3. Verificar CORS na API
4. Ver console do navegador para erros
5. Site deve fazer fallback para código estático automaticamente

### **Problema: Campos não salvam**

**Soluções:**
1. Verificar se está logado no backoffice
2. Verificar console do navegador para erros
3. Verificar se banco de dados está conectado
4. Verificar se migration foi aplicada

### **Problema: Tradução automática não funciona**

**Soluções:**
1. Verificar se API de IA está configurada (DeepSeek/OpenRouter)
2. Verificar variáveis de ambiente no `.env`
3. Verificar se há créditos na API
4. Tradução pode falhar silenciosamente (usar tradução manual)

### **Problema: Limites de caracteres não aparecem**

**Soluções:**
1. Limpar cache do navegador
2. Verificar se arquivo `page.tsx` está atualizado
3. Reiniciar servidor do backoffice

### **Problema: Link "Ver Site Principal" não funciona**

**Soluções:**
1. Verificar variável `NEXT_PUBLIC_SITE_URL` ou `SITE_URL` no `.env`
2. Verificar se site principal está rodando
3. Link padrão: `http://localhost:5173`

---

## 📝 NOTAS IMPORTANTES

### **⚠️ SEMPRE ATUALIZAR ESTE DOCUMENTO:**

Quando fizer mudanças, atualize:
1. Este arquivo (`GUIA_COMPLETO_SISTEMA.md`)
2. Arquivo de migrações (`MIGRACAO_CONTEUDO_COMPLETA.md`)
3. Checklist (`VERIFICACAO_FUNCIONALIDADE.md`)

### **🔒 SEÇÕES PROTEGIDAS (NÃO MODIFICAR):**

Veja arquivo: `PROTECTED_SECTIONS.md` ou regras do repositório.

**Resumo:**
- Menu de navegação do site principal
- Seletor de idiomas
- Rodapé
- Cores e temas

### **📦 COMANDOS ÚTEIS:**

```bash
# Rodar CMS (backoffice)
cd azimut-cms
npm run dev

# Rodar site principal
cd .. (raiz do projeto)
npm run dev

# Aplicar migrations
cd azimut-cms
npx prisma migrate dev

# Popular banco (seed)
cd azimut-cms
npx prisma db seed

# Ver schema do banco
cd azimut-cms
npx prisma studio
```

---

## 📞 CONTATO E SUPORTE

**Documentação Adicional:**
- `CAMPOS_E_LIMITES_CARACTERES.md` - Limites detalhados
- `MIGRACAO_CONTEUDO_COMPLETA.md` - Histórico de migrações
- `VERIFICACAO_FUNCIONALIDADE.md` - Checklist funcional
- `ESTRUTURA_ABAS_SUBABAS.md` - Estrutura do site

**Última Atualização:** Janeiro 2025  
**Mantido por:** Equipe Azimut  
**Versão do Sistema:** 1.0

---

**🎉 Este documento deve ser sempre consultado antes de fazer mudanças no sistema!**


