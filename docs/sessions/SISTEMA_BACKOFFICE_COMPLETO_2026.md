# 🎨 SISTEMA BACKOFFICE COMPLETO 2026
**Data:** 15/01/2026  
**Status:** 🚀 **IMPLEMENTAÇÃO GRADUAL - Página por Página**

---

## 🎯 OBJETIVO

Criar sistema completo de backoffice que permita editar:
- ✅ **Textos** (títulos, descrições, labels)
- ✅ **Cores** (botões, backgrounds, acentos)
- ✅ **Itens** (cards, listas, seções)
- ✅ **Imagens** (hero, galerias, thumbnails)
- ✅ **4 Línguas** (PT, EN, ES, FR)
- ✅ **2 Temas** (Claro, Escuro)

**Tudo editável sem precisar pedir mudanças básicas!**

---

## 📊 ESTRUTURA DE DADOS

### **1. Tabela: `pages` (Páginas)**
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- 'home', 'vancouver', 'what-we-do'
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **2. Tabela: `page_content` (Conteúdo Multilíngue + Tema)**
```sql
CREATE TABLE page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  
  -- Idioma e Tema
  lang VARCHAR(2) NOT NULL CHECK (lang IN ('pt', 'en', 'es', 'fr')),
  theme VARCHAR(10) NOT NULL CHECK (theme IN ('light', 'dark', 'both')),
  
  -- Hero Section
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_description TEXT,
  hero_image_url TEXT,
  hero_cta_text TEXT,
  hero_cta_link TEXT,
  
  -- Cores (JSON para flexibilidade)
  colors JSONB DEFAULT '{}', -- { primary: "#c92337", background: "#050814", ... }
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraint: um conteúdo por página+idioma+tema
  UNIQUE(page_id, lang, theme)
);

CREATE INDEX idx_page_content_lookup ON page_content(page_id, lang, theme);
```

### **3. Tabela: `page_sections` (Seções Dinâmicas)**
```sql
CREATE TABLE page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  page_content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
  
  -- Identificação
  section_key TEXT NOT NULL, -- 'hero', 'pillars', 'stats', 'testimonials'
  section_order INTEGER DEFAULT 0,
  
  -- Conteúdo (JSON para flexibilidade)
  content JSONB DEFAULT '{}', -- { title: "...", items: [...], colors: {...} }
  
  -- Ativo/Inativo
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_page_sections_page ON page_sections(page_id, section_order);
```

### **4. Tabela: `media` (Mídias - Imagens/Vídeos)**
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Arquivo
  type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  
  -- Metadados
  alt_text JSONB DEFAULT '{}', -- { pt: "...", en: "...", es: "...", fr: "..." }
  tags TEXT[],
  
  -- Relacionamento
  page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  section_key TEXT, -- 'hero', 'gallery', 'testimonials'
  
  -- Dimensões
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_page ON media(page_id, section_key);
CREATE INDEX idx_media_tags ON media USING GIN(tags);
```

---

## 🔗 COMO LINKAR SITE COM BACKOFFICE

### **1. Hook Atualizado: `usePageContent`**

```typescript
// src/hooks/usePageContent.ts
import { useState, useEffect } from 'react';
import { useTheme } from './useTheme';

interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
  };
  colors: {
    primary: string;
    background: string;
    text: string;
    // ... outras cores
  };
  sections: Array<{
    key: string;
    content: any;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export function usePageContent(
  pageSlug: string,
  lang: 'pt' | 'en' | 'es' | 'fr'
): { content: PageContent | null; loading: boolean; error: Error | null } {
  const { theme } = useTheme(); // 'light' | 'dark'
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        
        const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
        
        // Buscar conteúdo específico para idioma + tema
        const response = await fetch(
          `${BACKOFFICE_URL}/api/public/page/${pageSlug}?lang=${lang}&theme=${theme}`,
          {
            signal: AbortSignal.timeout(5000), // 5s timeout
            headers: { 'Accept': 'application/json' }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setContent(data);
      } catch (err) {
        // Fallback silencioso - site funciona sem backoffice
        console.warn(`[Backoffice] Falha ao carregar ${pageSlug} (${lang}/${theme}), usando conteúdo local:`, err);
        setContent(null); // null = usar fallback local
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [pageSlug, lang, theme]); // Re-fetch se tema ou idioma mudar

  return { content, loading, error };
}
```

### **2. Uso no Componente (Exemplo: Home.tsx)**

```typescript
// src/pages/Home.tsx
import { usePageContent } from '../hooks/usePageContent';
import { useTheme } from '../hooks/useTheme';

const Home: React.FC<HomeProps> = ({ lang }) => {
  const { theme } = useTheme();
  
  // Buscar conteúdo do backoffice
  const { content: backofficeContent, loading } = usePageContent('home', lang);
  
  // Fallback local (sempre funciona)
  const localContent = {
    hero: {
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      // ...
    }
  };
  
  // Usar backoffice se disponível, senão usar local
  const heroTitle = backofficeContent?.hero?.title || localContent.hero.title;
  const heroSubtitle = backofficeContent?.hero?.subtitle || localContent.hero.subtitle;
  
  // Aplicar cores do backoffice (se disponível)
  const primaryColor = backofficeContent?.colors?.primary || '#c92337';
  const backgroundColor = backofficeContent?.colors?.background || 
    (theme === 'dark' ? '#050814' : '#f5f1e8');
  
  return (
    <div style={{ 
      '--color-primary': primaryColor,
      '--color-background': backgroundColor 
    } as React.CSSProperties}>
      <h1>{heroTitle}</h1>
      <p>{heroSubtitle}</p>
      {/* ... */}
    </div>
  );
};
```

---

## 🎨 SISTEMA DE CORES NO BACKOFFICE

### **Estrutura JSON de Cores:**

```json
{
  "primary": "#c92337",
  "primaryDark": "#8B2332",
  "background": "#050814",
  "backgroundLight": "#0a0f1a",
  "text": "#ffffff",
  "textSecondary": "#d3cec3",
  "accent": "#c92337",
  "border": "rgba(255, 255, 255, 0.1)"
}
```

### **Aplicação no Site:**

```typescript
// Aplicar cores dinamicamente via CSS Variables
const colors = backofficeContent?.colors || defaultColors;

<div style={{
  '--color-primary': colors.primary,
  '--color-background': colors.background,
  '--color-text': colors.text,
  // ...
} as React.CSSProperties}>
  {/* Conteúdo */}
</div>
```

---

## 📝 PLANO GRADUAL - PÁGINA POR PÁGINA

### **FASE 1: Home (Piloto)** ⭐
**Tempo:** 2-3 dias

**Campos a migrar:**
- [ ] Hero (title, subtitle, description, image, CTA)
- [ ] Pillars (4 cards: title, description, icon)
- [ ] Stats (4 estatísticas)
- [ ] Cores (primary, background, text)
- [ ] SEO (title, description, keywords)

**4 Línguas × 2 Temas = 8 combinações**

**Passos:**
1. Criar estrutura no banco
2. Popular Home PT (tema dark)
3. Popular Home PT (tema light)
4. Testar no site
5. Adicionar EN, ES, FR (dark + light)
6. Validar todas combinações

---

### **FASE 2: Vancouver** 
**Tempo:** 3-4 dias

**Campos a migrar:**
- [ ] Hero completo
- [ ] Stats (4 estatísticas)
- [ ] Why Vancouver (4 cards)
- [ ] Schools (VFS/VanArts)
- [ ] Testimonials
- [ ] FAQ
- [ ] Cores específicas
- [ ] Imagens hero (8 imagens por horário)

**Passos:**
1. Estrutura de seções
2. Popular PT (dark)
3. Popular PT (light)
4. Adicionar traduções
5. Testar imagens dinâmicas

---

### **FASE 3: WhatWeDo (Serviços)**
**Tempo:** 2-3 dias

**Campos:**
- [ ] 6 serviços (title, description, icon, image)
- [ ] Cores por serviço
- [ ] SEO

---

### **FASE 4: Work (Projetos)**
**Tempo:** 2-3 dias

**Campos:**
- [ ] Grid de projetos
- [ ] Filtros
- [ ] Detalhes de projeto

---

## 🔧 API ENDPOINTS NECESSÁRIOS

### **1. GET `/api/public/page/{slug}`**
```typescript
// Query params: ?lang=pt&theme=dark
// Retorna: conteúdo completo da página
```

### **2. GET `/api/public/page/{slug}/sections`**
```typescript
// Retorna: todas as seções da página
```

### **3. GET `/api/public/page/{slug}/media`**
```typescript
// Retorna: todas as mídias da página
```

### **4. POST `/api/admin/page/{slug}/content`** (Admin)
```typescript
// Salva conteúdo editado
// Body: { lang, theme, hero: {...}, colors: {...}, ... }
```

---

## 🎨 INTERFACE DE EDIÇÃO (Backoffice Admin)

### **Editor de Página:**
- ✅ Abas por idioma (PT, EN, ES, FR)
- ✅ Toggle tema (Light/Dark/Both)
- ✅ Preview em tempo real
- ✅ Editor WYSIWYG para textos longos
- ✅ Color picker para cores
- ✅ Upload de imagens drag-and-drop
- ✅ Validação de campos obrigatórios

### **Editor de Cores:**
- ✅ Paleta visual
- ✅ Preview de mudanças
- ✅ Aplicar em massa (todos temas/idiomas)
- ✅ Reset para padrão

---

## 📋 CHECKLIST POR PÁGINA

### **Antes de Migrar:**
- [ ] Backup do banco
- [ ] Estrutura criada
- [ ] API endpoints funcionando
- [ ] Testes de fallback

### **Durante Migração:**
- [ ] Popular conteúdo PT (dark)
- [ ] Testar no site
- [ ] Popular PT (light)
- [ ] Testar no site
- [ ] Adicionar EN, ES, FR
- [ ] Validar todas combinações

### **Após Migração:**
- [ ] Documentar campos editáveis
- [ ] Criar guia de uso
- [ ] Treinar equipe
- [ ] Monitorar erros

---

## 🛡️ GARANTIAS DE SEGURANÇA

### **Nunca Quebrar:**
1. ✅ **Fallback sempre presente**
2. ✅ **Timeout curto** (5s)
3. ✅ **Erros silenciosos**
4. ✅ **Cache local** (última versão válida)
5. ✅ **Validação de dados**

### **Rollback Rápido:**
```sql
-- Reverter página para conteúdo local
UPDATE page_content 
SET hero_title = NULL 
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home');
```

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **Criar estrutura no banco** (30 min)
   - Executar migrations
   - Criar índices
   - Validar estrutura

2. **Criar API endpoints** (1-2 horas)
   - GET `/api/public/page/{slug}`
   - POST `/api/admin/page/{slug}/content`
   - Testes básicos

3. **Atualizar hook `usePageContent`** (30 min)
   - Suporte a tema
   - Suporte a 4 línguas
   - Fallback robusto

4. **Migrar Home (Piloto)** (2-3 horas)
   - Popular PT (dark)
   - Testar
   - Adicionar outras combinações

---

## 📚 DOCUMENTAÇÃO

- [ ] Guia de como editar conteúdo
- [ ] Guia de como mudar cores
- [ ] Guia de como adicionar imagens
- [ ] Guia de traduções
- [ ] Troubleshooting

---

**Próxima ação:** Criar estrutura no banco e começar com Home (Piloto)
