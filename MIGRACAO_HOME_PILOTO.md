# 🏠 MIGRAÇÃO HOME - PÁGINA PILOTO
**Data:** 15/01/2026  
**Status:** 🚀 **PRONTO PARA IMPLEMENTAR**

---

## 🎯 OBJETIVO

Migrar página Home para backoffice, permitindo edição de:
- Textos (hero, pillars, stats)
- Cores (primary, background, text)
- Imagens (hero, thumbnails)
- **4 Línguas** (PT, EN, ES, FR)
- **2 Temas** (Light, Dark)

---

## 📊 ESTRUTURA DE DADOS

### **1. Criar Tabelas (Se não existirem)**

```sql
-- Tabela pages
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela page_content (Conteúdo Multilíngue + Tema)
CREATE TABLE IF NOT EXISTS page_content (
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
  
  -- Cores (JSON)
  colors JSONB DEFAULT '{}',
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(page_id, lang, theme)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_page_content_lookup 
  ON page_content(page_id, lang, theme);
CREATE INDEX IF NOT EXISTS idx_pages_slug 
  ON pages(slug);
```

---

## 📝 POPULAR CONTEÚDO - HOME PT (DARK)

### **PASSO 1: Criar Página Home**

```sql
-- Inserir página Home
INSERT INTO pages (slug, name)
VALUES ('home', 'Home')
ON CONFLICT (slug) DO NOTHING;

-- Verificar ID criado
SELECT id, slug FROM pages WHERE slug = 'home';
```

### **PASSO 2: Popular Conteúdo PT (Dark)**

```sql
-- Inserir conteúdo Home PT (Dark)
INSERT INTO page_content (
  page_id,
  lang,
  theme,
  hero_title,
  hero_subtitle,
  hero_description,
  hero_cta_text,
  hero_cta_link,
  colors,
  seo_title,
  seo_description,
  seo_keywords
)
SELECT 
  p.id,
  'pt',
  'dark',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  'Criamos experiências imersivas entre Brasil e Canadá.',
  'Transformamos ideias em realidade através de tecnologias imersivas, inteligência artificial e produção audiovisual de classe mundial.',
  'Ver Projetos',
  '/work',
  '{
    "primary": "#c92337",
    "primaryDark": "#8B2332",
    "background": "#050814",
    "backgroundLight": "#0a0f1a",
    "text": "#ffffff",
    "textSecondary": "#d3cec3",
    "accent": "#c92337",
    "border": "rgba(255, 255, 255, 0.1)"
  }'::jsonb,
  'Azimut - Experiências Imersivas Brasil e Canadá',
  'Criamos experiências imersivas, interativas e cinematográficas usando VR, AR, IA e produção audiovisual. Conectamos Brasil e Canadá através da tecnologia.',
  'VR, AR, IA, realidade virtual, realidade aumentada, inteligência artificial, produção audiovisual, Brasil, Canadá'
FROM pages p
WHERE p.slug = 'home'
ON CONFLICT (page_id, lang, theme) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  hero_description = EXCLUDED.hero_description,
  hero_cta_text = EXCLUDED.hero_cta_text,
  hero_cta_link = EXCLUDED.hero_cta_link,
  colors = EXCLUDED.colors,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  seo_keywords = EXCLUDED.seo_keywords,
  updated_at = NOW();

-- Verificar inserção
SELECT 
  lang,
  theme,
  hero_title,
  hero_subtitle,
  colors->>'primary' as primary_color
FROM page_content pc
JOIN pages p ON p.id = pc.page_id
WHERE p.slug = 'home' AND lang = 'pt' AND theme = 'dark';
```

---

## 📝 POPULAR CONTEÚDO - HOME PT (LIGHT)

```sql
-- Inserir conteúdo Home PT (Light) - Cores diferentes
INSERT INTO page_content (
  page_id,
  lang,
  theme,
  hero_title,
  hero_subtitle,
  hero_description,
  hero_cta_text,
  hero_cta_link,
  colors,
  seo_title,
  seo_description,
  seo_keywords
)
SELECT 
  p.id,
  'pt',
  'light',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  'Criamos experiências imersivas entre Brasil e Canadá.',
  'Transformamos ideias em realidade através de tecnologias imersivas, inteligência artificial e produção audiovisual de classe mundial.',
  'Ver Projetos',
  '/work',
  '{
    "primary": "#c92337",
    "primaryDark": "#8B2332",
    "background": "#f5f1e8",
    "backgroundLight": "#e8e5df",
    "text": "#0f172a",
    "textSecondary": "#1e3a5f",
    "accent": "#c92337",
    "border": "rgba(0, 0, 0, 0.1)"
  }'::jsonb,
  'Azimut - Experiências Imersivas Brasil e Canadá',
  'Criamos experiências imersivas, interativas e cinematográficas usando VR, AR, IA e produção audiovisual. Conectamos Brasil e Canadá através da tecnologia.',
  'VR, AR, IA, realidade virtual, realidade aumentada, inteligência artificial, produção audiovisual, Brasil, Canadá'
FROM pages p
WHERE p.slug = 'home'
ON CONFLICT (page_id, lang, theme) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  hero_description = EXCLUDED.hero_description,
  hero_cta_text = EXCLUDED.hero_cta_text,
  hero_cta_link = EXCLUDED.hero_cta_link,
  colors = EXCLUDED.colors,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  seo_keywords = EXCLUDED.seo_keywords,
  updated_at = NOW();
```

---

## 📝 POPULAR TRADUÇÕES (EN, ES, FR)

### **Inglês (EN) - Dark**

```sql
INSERT INTO page_content (
  page_id,
  lang,
  theme,
  hero_title,
  hero_subtitle,
  hero_description,
  hero_cta_text,
  hero_cta_link,
  colors,
  seo_title,
  seo_description,
  seo_keywords
)
SELECT 
  p.id,
  'en',
  'dark',
  'EXPERIENCES THAT CONNECT WORLDS',
  'We create immersive experiences between Brazil and Canada.',
  'We transform ideas into reality through immersive technologies, artificial intelligence and world-class audiovisual production.',
  'View Projects',
  '/work',
  '{
    "primary": "#c92337",
    "primaryDark": "#8B2332",
    "background": "#050814",
    "backgroundLight": "#0a0f1a",
    "text": "#ffffff",
    "textSecondary": "#d3cec3",
    "accent": "#c92337",
    "border": "rgba(255, 255, 255, 0.1)"
  }'::jsonb,
  'Azimut - Immersive Experiences Brazil and Canada',
  'We create immersive, interactive and cinematic experiences using VR, AR, AI and audiovisual production. We connect Brazil and Canada through technology.',
  'VR, AR, AI, virtual reality, augmented reality, artificial intelligence, audiovisual production, Brazil, Canada'
FROM pages p
WHERE p.slug = 'home'
ON CONFLICT (page_id, lang, theme) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  hero_description = EXCLUDED.hero_description,
  hero_cta_text = EXCLUDED.hero_cta_text,
  hero_cta_link = EXCLUDED.hero_cta_link,
  colors = EXCLUDED.colors,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  seo_keywords = EXCLUDED.seo_keywords,
  updated_at = NOW();
```

### **Inglês (EN) - Light**

```sql
-- Similar ao EN Dark, mas com cores do tema light
-- (copiar estrutura acima, mudar theme='light' e colors)
```

### **Espanhol (ES) e Francês (FR)**

```sql
-- Repetir estrutura para ES e FR (dark + light cada)
-- Total: 8 combinações (4 línguas × 2 temas)
```

---

## 🔧 API ENDPOINT

### **GET `/api/public/page/{slug}`**

```typescript
// app/api/public/page/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get('lang') || 'pt') as 'pt' | 'en' | 'es' | 'fr';
    const theme = (searchParams.get('theme') || 'dark') as 'light' | 'dark';
    
    // Buscar página
    const page = await prisma.pages.findFirst({
      where: { slug: params.slug },
      include: {
        content: {
          where: {
            lang,
            theme: { in: [theme, 'both'] } // 'both' funciona para ambos temas
          },
          take: 1
        }
      }
    });
    
    if (!page || !page.content[0]) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    const content = page.content[0];
    
    return NextResponse.json({
      hero: {
        title: content.hero_title,
        subtitle: content.hero_subtitle,
        description: content.hero_description,
        imageUrl: content.hero_image_url,
        ctaText: content.hero_cta_text,
        ctaLink: content.hero_cta_link
      },
      colors: content.colors,
      seo: {
        title: content.seo_title,
        description: content.seo_description,
        keywords: content.seo_keywords
      }
    });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 🔗 INTEGRAR NO SITE

### **1. Criar Hook `usePageContent`**

```typescript
// src/hooks/usePageContent.ts
import { useState, useEffect } from 'react';
import { useTheme } from './useTheme';

export function usePageContent(
  pageSlug: string,
  lang: 'pt' | 'en' | 'es' | 'fr'
) {
  const { theme } = useTheme();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
        
        const response = await fetch(
          `${BACKOFFICE_URL}/api/public/page/${pageSlug}?lang=${lang}&theme=${theme}`,
          { signal: AbortSignal.timeout(5000) }
        );

        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (err) {
        console.warn('[Backoffice] Fallback para conteúdo local');
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [pageSlug, lang, theme]);

  return { content, loading };
}
```

### **2. Usar no Home.tsx**

```typescript
// src/pages/Home.tsx
import { usePageContent } from '../hooks/usePageContent';

const Home: React.FC<HomeProps> = ({ lang }) => {
  const { content: backofficeContent } = usePageContent('home', lang);
  
  // Fallback local
  const heroTitle = backofficeContent?.hero?.title || t.hero.title;
  const heroSubtitle = backofficeContent?.hero?.subtitle || t.hero.subtitle;
  
  // Aplicar cores dinamicamente
  const colors = backofficeContent?.colors || {};
  
  return (
    <div style={{
      '--color-primary': colors.primary || '#c92337',
      '--color-background': colors.background || (theme === 'dark' ? '#050814' : '#f5f1e8'),
    } as React.CSSProperties}>
      <h1>{heroTitle}</h1>
      <p>{heroSubtitle}</p>
    </div>
  );
};
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **Backend:**
- [ ] Criar tabelas no banco
- [ ] Popular Home PT (dark)
- [ ] Popular Home PT (light)
- [ ] Popular Home EN, ES, FR (dark + light)
- [ ] Criar API endpoint
- [ ] Testar API com curl

### **Frontend:**
- [ ] Criar hook `usePageContent`
- [ ] Integrar no Home.tsx
- [ ] Aplicar cores dinamicamente
- [ ] Testar fallback
- [ ] Validar todas combinações (4 línguas × 2 temas)

---

## 🧪 TESTES

### **1. Testar API:**
```bash
# PT Dark
curl "https://backoffice.azmt.com.br/api/public/page/home?lang=pt&theme=dark"

# PT Light
curl "https://backoffice.azmt.com.br/api/public/page/home?lang=pt&theme=light"

# EN Dark
curl "https://backoffice.azmt.com.br/api/public/page/home?lang=en&theme=dark"

# ... testar todas 8 combinações
```

### **2. Testar no Site:**
- Abrir `/pt` (tema dark) → Verificar conteúdo PT
- Mudar para tema light → Verificar cores mudam
- Mudar para `/en` → Verificar conteúdo EN
- Testar todas combinações

---

## 🛡️ ROLLBACK

```sql
-- Reverter Home para conteúdo local
DELETE FROM page_content 
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home');
```

---

**Próxima ação:** Executar SQL para criar estrutura e popular Home PT (dark)
