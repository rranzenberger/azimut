# 🚀 COMECE AGORA - BACKOFFICE LINKADO
**Data:** 15/01/2026  
**Status:** ✅ **PRONTO - Hook criado, aguardando estrutura no banco**

---

## ✅ O QUE JÁ ESTÁ PRONTO

### **1. Hook `usePageContent` criado** ✅
- ✅ Suporte a **4 línguas** (PT, EN, ES, FR)
- ✅ Suporte a **2 temas** (Light, Dark)
- ✅ Fallback seguro (site nunca quebra)
- ✅ Re-fetch automático quando tema/idioma muda

**Arquivo:** `src/hooks/usePageContent.ts`

### **2. Documentação completa** ✅
- ✅ `SISTEMA_BACKOFFICE_COMPLETO_2026.md` - Sistema completo
- ✅ `MIGRACAO_HOME_PILOTO.md` - Guia passo a passo Home
- ✅ `PLANO_GRADUAL_BACKOFFICE_2026.md` - Estratégia geral

---

## 🎯 PRÓXIMOS PASSOS (ORDEM)

### **PASSO 1: Criar Estrutura no Banco Neon** (30 min)

**1.1. Acessar Neon Dashboard:**
```
https://console.neon.tech → Projeto → SQL Editor
```

**1.2. Executar SQL para criar tabelas:**

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

**1.3. Verificar criação:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('pages', 'page_content');
```

**Esperado:** 2 tabelas retornadas

---

### **PASSO 2: Popular Home PT (Dark)** (10 min)

```sql
-- 1. Criar página Home
INSERT INTO pages (slug, name)
VALUES ('home', 'Home')
ON CONFLICT (slug) DO NOTHING;

-- 2. Popular conteúdo Home PT (Dark)
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

-- 3. Verificar
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

**Esperado:** 1 linha retornada com dados em português

---

### **PASSO 3: Criar API Endpoint no Backoffice** (1-2 horas)

**Arquivo:** `azimut-cms/app/api/public/page/[slug]/route.ts`

```typescript
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
            theme: { in: [theme, 'both'] }
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

### **PASSO 4: Testar API** (5 min)

```bash
# Testar endpoint
curl "https://backoffice.azmt.com.br/api/public/page/home?lang=pt&theme=dark"

# Resposta esperada:
{
  "hero": {
    "title": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
    "subtitle": "Criamos experiências imersivas entre Brasil e Canadá.",
    ...
  },
  "colors": {
    "primary": "#c92337",
    ...
  }
}
```

---

### **PASSO 5: Integrar no Home.tsx** (30 min)

```typescript
// src/pages/Home.tsx
import { usePageContent } from '../hooks/usePageContent';

const Home: React.FC<HomeProps> = ({ lang }) => {
  // Buscar conteúdo do backoffice (suporta tema + idioma)
  const { content: backofficeContent, loading } = usePageContent('home', lang);
  
  // Fallback local
  const heroTitle = backofficeContent?.hero?.title || t.hero.title;
  const heroSubtitle = backofficeContent?.hero?.subtitle || t.hero.subtitle;
  
  // Aplicar cores dinamicamente
  const colors = backofficeContent?.colors || {};
  
  return (
    <div style={{
      '--color-primary': colors.primary || '#c92337',
      '--color-background': colors.background || (theme === 'dark' ? '#050814' : '#f5f1e8'),
      '--color-text': colors.text || (theme === 'dark' ? '#ffffff' : '#0f172a'),
    } as React.CSSProperties}>
      <h1>{heroTitle}</h1>
      <p>{heroSubtitle}</p>
      {/* ... */}
    </div>
  );
};
```

---

### **PASSO 6: Popular Outras Combinações** (30 min)

Após Home PT (Dark) funcionar, adicionar:
- [ ] Home PT (Light)
- [ ] Home EN (Dark + Light)
- [ ] Home ES (Dark + Light)
- [ ] Home FR (Dark + Light)

**Total: 8 combinações** (4 línguas × 2 temas)

---

## 🎨 COMO EDITAR NO BACKOFFICE

### **Quando mudar cores:**
1. Acessar backoffice admin
2. Ir em: **Páginas → Home**
3. Selecionar idioma (PT, EN, ES, FR)
4. Selecionar tema (Light, Dark)
5. Editar campo `colors` (JSON)
6. Salvar
7. Site atualiza automaticamente (com fallback se falhar)

### **Quando mudar textos:**
1. Acessar backoffice admin
2. Ir em: **Páginas → Home**
3. Selecionar idioma + tema
4. Editar campos (hero_title, hero_subtitle, etc.)
5. Salvar
6. Site atualiza automaticamente

### **Quando mudar imagens:**
1. Acessar backoffice admin
2. Ir em: **Mídias → Upload**
3. Fazer upload da imagem
4. Copiar URL
5. Colar em `hero_image_url` da página
6. Salvar

---

## 📊 PROGRESSO

### **Home (Piloto):**
- [ ] Estrutura criada no banco
- [ ] API endpoint criado
- [ ] Home PT (Dark) populado
- [ ] Home PT (Light) populado
- [ ] Home EN (Dark + Light) populado
- [ ] Home ES (Dark + Light) populado
- [ ] Home FR (Dark + Light) populado
- [ ] Integrado no Home.tsx
- [ ] Testado em todas combinações

### **Próximas Páginas:**
- [ ] Vancouver
- [ ] WhatWeDo
- [ ] Work
- [ ] AcademyNew

---

## 🛡️ GARANTIAS

- ✅ **Site nunca quebra** (fallback sempre presente)
- ✅ **Timeout curto** (5s)
- ✅ **Erros silenciosos** (não mostra ao usuário)
- ✅ **Re-fetch automático** (quando tema/idioma muda)
- ✅ **Rollback rápido** (SQL de reversão)

---

## ✅ CHECKLIST RÁPIDO

**Antes de começar:**
- [ ] Neon DB acessível
- [ ] Backoffice online
- [ ] Hook `usePageContent` criado ✅

**Para cada página:**
- [ ] Criar estrutura no banco
- [ ] Popular conteúdo PT (Dark)
- [ ] Testar API
- [ ] Integrar no site
- [ ] Popular outras combinações
- [ ] Validar todas combinações

---

**Próxima ação:** Executar PASSO 1 (Criar estrutura no banco)
