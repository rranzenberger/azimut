# 🔧 GUIA COMPLETO - BACKOFFICE MULTILÍNGUE

**Data**: 03 de janeiro de 2025  
**Versão**: 1.0  
**Status**: 🔴 IMPLEMENTAÇÃO NECESSÁRIA NO BACKOFFICE

---

## 🎯 OBJETIVO

Fazer o backoffice retornar conteúdo no idioma correto baseado no parâmetro `lang` enviado pelo frontend.

---

## ✅ JÁ IMPLEMENTADO NO FRONTEND

### **1. Hook `useAzimutContent.ts` atualizado:**

```typescript
interface ContentOptions {
  page?: string;
  autoDetectGeo?: boolean;
  lang?: 'pt' | 'en' | 'fr' | 'es'; // Idioma do conteúdo
}

export function useAzimutContent(options: ContentOptions = {}) {
  const { page = 'home', autoDetectGeo = true, lang: propLang } = options;
  
  // Prioridade: prop > localStorage > navegador
  let lang = propLang || savedLang || browserLang;
  
  // API agora recebe o parâmetro lang
  const contentRes = await fetch(
    `${API_URL}/public/content?lang=${lang}&country=${country}&page=${page}&sessionId=${sessionId}`,
    { signal: createTimeoutSignal(5000) }
  );
}
```

### **2. Páginas atualizadas:**

**Home.tsx:**
```typescript
const { content: cmsContent } = useAzimutContent({ 
  page: 'home',
  lang // Passa idioma atual
})
```

**WhatWeDo.tsx:**
```typescript
const { content: cmsContent } = useAzimutContent({ 
  page: 'what',
  lang 
})
```

**Work.tsx:**
```typescript
const { content: cmsContent } = useAzimutContent({ 
  page: 'work',
  lang 
})
```

---

## 🚨 O QUE PRECISA SER FEITO NO BACKOFFICE

### **CHAMADA ATUAL DA API:**
```
GET /api/public/content?lang=pt&country=BR&page=home&sessionId=abc123
```

**Parâmetros:**
- `lang`: 'pt' | 'en' | 'fr' | 'es'
- `country`: Código do país (BR, CA, FR, ES, US, etc.)
- `page`: 'home' | 'what' | 'work' | 'studio' | 'academy'
- `sessionId`: ID da sessão do usuário

---

## 📊 OPÇÕES DE IMPLEMENTAÇÃO

### **OPÇÃO 1: COLUNAS POR IDIOMA** (Simples, mas limitada)

#### **Estrutura de Tabelas:**

```sql
-- Tabela: pages
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  
  -- Hero (Home)
  hero_title_pt TEXT,
  hero_title_en TEXT,
  hero_title_fr TEXT,
  hero_title_es TEXT,
  
  hero_subtitle_pt TEXT,
  hero_subtitle_en TEXT,
  hero_subtitle_fr TEXT,
  hero_subtitle_es TEXT,
  
  -- SEO
  seo_title_pt TEXT,
  seo_title_en TEXT,
  seo_title_fr TEXT,
  seo_title_es TEXT,
  
  seo_description_pt TEXT,
  seo_description_en TEXT,
  seo_description_fr TEXT,
  seo_description_es TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_pages_slug ON pages(slug);
```

#### **Query API:**

```typescript
// Endpoint: /api/public/content
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  const page = searchParams.get('page') || 'home';
  
  // Buscar conteúdo
  const content = await prisma.pages.findFirst({
    where: { slug: page },
    select: {
      [`hero_title_${lang}`]: true,
      [`hero_subtitle_${lang}`]: true,
      [`seo_title_${lang}`]: true,
      [`seo_description_${lang}`]: true,
    }
  });
  
  // Transformar resposta
  return Response.json({
    page: {
      heroSlogan: content[`hero_title_${lang}`],
      heroSubtitle: content[`hero_subtitle_${lang}`],
    },
    seo: {
      title: content[`seo_title_${lang}`],
      description: content[`seo_description_${lang}`],
    }
  });
}
```

**Vantagens:**
- ✅ Simples de implementar
- ✅ Queries rápidas (sem JOINs)
- ✅ Fácil de entender

**Desvantagens:**
- ❌ Muitas colunas (4× mais)
- ❌ Difícil adicionar novos idiomas
- ❌ Repetição de código

---

### **OPÇÃO 2: TABELA DE TRADUÇÕES** ⭐ RECOMENDADO

#### **Estrutura de Tabelas:**

```sql
-- Tabela principal: pages
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de traduções: page_translations
CREATE TABLE page_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  lang VARCHAR(2) NOT NULL CHECK (lang IN ('pt', 'en', 'fr', 'es')),
  
  -- Hero
  hero_title TEXT,
  hero_subtitle TEXT,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraint: um idioma por página
  UNIQUE(page_id, lang)
);

-- Índices
CREATE INDEX idx_page_translations_page_lang ON page_translations(page_id, lang);
CREATE INDEX idx_pages_slug ON pages(slug);
```

#### **Query API:**

```typescript
// Endpoint: /api/public/content
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  const page = searchParams.get('page') || 'home';
  
  // Buscar página + tradução
  const content = await prisma.pages.findFirst({
    where: { slug: page },
    include: {
      translations: {
        where: { lang },
        take: 1
      }
    }
  });
  
  if (!content || !content.translations[0]) {
    return Response.json({ error: 'Content not found' }, { status: 404 });
  }
  
  const translation = content.translations[0];
  
  return Response.json({
    page: {
      heroSlogan: translation.hero_title,
      heroSubtitle: translation.hero_subtitle,
    },
    seo: {
      title: translation.seo_title,
      description: translation.seo_description,
    }
  });
}
```

**Vantagens:**
- ✅ Escalável (fácil adicionar idiomas)
- ✅ Estrutura limpa e profissional
- ✅ Menos redundância
- ✅ Fallback para idioma padrão (se tradução não existir)

**Desvantagens:**
- ❌ Queries com JOIN (ligeiramente mais lentas)
- ❌ Mais complexo de implementar

---

## 📦 MIGRATION SQL (OPÇÃO 2 - RECOMENDADO)

### **1. Criar Tabelas:**

```sql
-- 1. Criar tabela pages (se não existir)
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Criar tabela page_translations
CREATE TABLE IF NOT EXISTS page_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  lang VARCHAR(2) NOT NULL CHECK (lang IN ('pt', 'en', 'fr', 'es')),
  
  -- Hero
  hero_title TEXT,
  hero_subtitle TEXT,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(page_id, lang)
);

-- 3. Criar índices
CREATE INDEX IF NOT EXISTS idx_page_translations_page_lang 
  ON page_translations(page_id, lang);
CREATE INDEX IF NOT EXISTS idx_pages_slug 
  ON pages(slug);
```

### **2. Popular com Dados Iniciais:**

```sql
-- Inserir páginas
INSERT INTO pages (slug) VALUES 
  ('home'),
  ('what'),
  ('work'),
  ('studio'),
  ('academy')
ON CONFLICT (slug) DO NOTHING;

-- Inserir traduções para Home (PT)
INSERT INTO page_translations (page_id, lang, hero_title, hero_subtitle)
SELECT 
  id,
  'pt',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  'Criamos experiências imersivas entre Brasil e Canadá.'
FROM pages WHERE slug = 'home'
ON CONFLICT (page_id, lang) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle;

-- Inserir traduções para Home (EN)
INSERT INTO page_translations (page_id, lang, hero_title, hero_subtitle)
SELECT 
  id,
  'en',
  'EXPERIENCES THAT CONNECT WORLDS',
  'We create immersive experiences between Brazil and Canada.'
FROM pages WHERE slug = 'home'
ON CONFLICT (page_id, lang) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle;

-- Inserir traduções para Home (FR)
INSERT INTO page_translations (page_id, lang, hero_title, hero_subtitle)
SELECT 
  id,
  'fr',
  'EXPÉRIENCES QUI CONNECTENT LES MONDES',
  'Nous créons des expériences immersives entre le Brésil et le Canada.'
FROM pages WHERE slug = 'home'
ON CONFLICT (page_id, lang) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle;

-- Inserir traduções para Home (ES)
INSERT INTO page_translations (page_id, lang, hero_title, hero_subtitle)
SELECT 
  id,
  'es',
  'EXPERIENCIAS QUE CONECTAN MUNDOS',
  'Creamos experiencias inmersivas entre Brasil y Canadá.'
FROM pages WHERE slug = 'home'
ON CONFLICT (page_id, lang) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle;
```

---

## 🔧 EXEMPLO COMPLETO: API ENDPOINT

### **Arquivo: `app/api/public/content/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parâmetros
    const lang = (searchParams.get('lang') || 'en') as 'pt' | 'en' | 'fr' | 'es';
    const page = searchParams.get('page') || 'home';
    const country = searchParams.get('country') || 'DEFAULT';
    const sessionId = searchParams.get('sessionId') || 'anonymous';
    
    // Validar idioma
    if (!['pt', 'en', 'fr', 'es'].includes(lang)) {
      return NextResponse.json(
        { error: 'Invalid language' },
        { status: 400 }
      );
    }
    
    // Buscar página + tradução
    const content = await prisma.pages.findFirst({
      where: { slug: page },
      include: {
        translations: {
          where: { lang },
          take: 1
        }
      }
    });
    
    // Se não encontrar, tentar fallback para inglês
    if (!content || !content.translations[0]) {
      const fallbackContent = await prisma.pages.findFirst({
        where: { slug: page },
        include: {
          translations: {
            where: { lang: 'en' },
            take: 1
          }
        }
      });
      
      if (!fallbackContent || !fallbackContent.translations[0]) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      
      const translation = fallbackContent.translations[0];
      
      return NextResponse.json({
        page: {
          heroSlogan: translation.hero_title,
          heroSubtitle: translation.hero_subtitle,
        },
        seo: {
          title: translation.seo_title,
          description: translation.seo_description,
        },
        meta: {
          lang: 'en', // Fallback
          page,
          country,
          sessionId,
        }
      });
    }
    
    const translation = content.translations[0];
    
    // Retornar conteúdo
    return NextResponse.json({
      page: {
        heroSlogan: translation.hero_title,
        heroSubtitle: translation.hero_subtitle,
      },
      seo: {
        title: translation.seo_title,
        description: translation.seo_description,
      },
      meta: {
        lang,
        page,
        country,
        sessionId,
      }
    });
    
  } catch (error) {
    console.error('[API] Error fetching content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 🧪 TESTES

### **1. Testar API diretamente:**

```bash
# PT
curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"

# EN
curl "https://backoffice.azmt.com.br/api/public/content?lang=en&page=home"

# FR
curl "https://backoffice.azmt.com.br/api/public/content?lang=fr&page=home"

# ES
curl "https://backoffice.azmt.com.br/api/public/content?lang=es&page=home"
```

**Resposta esperada (PT):**
```json
{
  "page": {
    "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
    "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá."
  },
  "seo": {
    "title": "Início",
    "description": "Experiências imersivas, interativas e cinematográficas..."
  },
  "meta": {
    "lang": "pt",
    "page": "home",
    "country": "BR",
    "sessionId": "anonymous"
  }
}
```

---

## 📝 PRISMA SCHEMA

### **Adicionar ao `schema.prisma`:**

```prisma
model Page {
  id           String            @id @default(uuid())
  slug         String            @unique
  translations PageTranslation[]
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt

  @@map("pages")
}

model PageTranslation {
  id          String   @id @default(uuid())
  pageId      String   @map("page_id")
  page        Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  lang        String   // 'pt' | 'en' | 'fr' | 'es'
  
  // Hero
  heroTitle    String?  @map("hero_title")
  heroSubtitle String?  @map("hero_subtitle")
  
  // SEO
  seoTitle       String? @map("seo_title")
  seoDescription String? @map("seo_description")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([pageId, lang])
  @@index([pageId, lang])
  @@map("page_translations")
}
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **BACKEND (Backoffice):**
- [ ] Criar tabelas `pages` e `page_translations`
- [ ] Criar índices
- [ ] Popular com dados iniciais (4 idiomas)
- [ ] Criar endpoint `/api/public/content`
- [ ] Implementar query com JOIN
- [ ] Implementar fallback para inglês
- [ ] Testar API com curl
- [ ] Testar integração com frontend

### **FRONTEND (Já implementado):**
- [x] Hook `useAzimutContent` passa `lang`
- [x] Páginas passam `lang` ao hook
- [x] Fallback para `i18n.ts` se API falhar
- [x] Build sem erros

---

## 🚀 DEPLOY

**Ordem recomendada:**
1. **Backend**: Criar tabelas + endpoint
2. **Testar**: API isoladamente
3. **Frontend**: Deploy (já está pronto)
4. **Validar**: Site ao vivo em 4 idiomas

---

**Documentação criada por**: Cursor AI + Ranz  
**Última atualização**: 03 de janeiro de 2025  
**Status**: ⏳ Aguardando implementação no backoffice

