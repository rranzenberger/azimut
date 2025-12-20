# 🔌 Azimut Site - Guia de Integração Backend/CMS

## 📋 Visão Geral

Este documento orienta a integração do site Azimut com um **backoffice/CMS headless** para gerenciar conteúdo, recomendações personalizadas e analytics.

---

## 🏗️ Arquitetura Atual

### Frontend (Vite + React + TypeScript)
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Content Model**: `src/data/content.ts` (mock CMS)
- **Recommendation Stub**: `src/utils/reco.ts` (client-side)

### Stack Sugerido para Backend
- **CMS Headless**: Strapi / Payload CMS / Directus / Sanity
- **API**: REST ou GraphQL
- **Database**: PostgreSQL / MongoDB
- **Hosting**: Vercel (frontend) + Railway/Render/Fly.io (backend)

---

## 📊 Modelo de Dados (Content Model)

### 1. **Cases/Projects** (Portfólio)
```typescript
{
  slug: string
  title: { pt: string, en: string, es: string, fr: string }
  shortDescription: { pt: string, en: string, es: string, fr: string }
  fullDescription?: { pt: string, en: string, es: string, fr: string }
  category: 'museums' | 'brands' | 'films' | 'installations' | 'education'
  status: 'active' | 'in-development'
  year?: string
  location?: string
  services: string[]
  tags: string[]
  mediaPoster?: string  // URL da imagem de capa
  mediaLoop?: string    // URL do vídeo loop
  mediaGallery?: string[]  // Galeria de imagens
  links?: {
    video?: string
    press?: string
    case_study?: string
  }
  metrics?: {
    visitors?: number
    duration_avg?: string
    engagement?: number
  }
}
```

### 2. **Services** (Serviços)
```typescript
{
  slug: string
  title: { pt: string, en: string, es: string, fr: string }
  shortDescription: { pt: string, en: string, es: string, fr: string }
  icon?: string
  featured: boolean
}
```

### 3. **Lab Items** (Pesquisa/Experimentos)
```typescript
{
  slug: string
  title: { pt: string, en: string, es: string, fr: string }
  type: 'experiment' | 'workshop' | 'mentoring'
  description: { pt: string, en: string, es: string, fr: string }
  status?: 'active' | 'completed'
  year?: string
}
```

### 4. **Team Members** (Equipe)
```typescript
{
  name: string
  role: { pt: string, en: string, es: string, fr: string }
  subtitle: { pt: string, en: string, es: string, fr: string }
  bio: { pt: string, en: string, es: string, fr: string }
  photo: string
  linkedin?: string
  order: number
}
```

### 5. **Global Settings** (Configurações)
```typescript
{
  site_name: string
  languages: ['pt', 'en', 'es', 'fr']
  default_language: 'pt'
  meta: {
    og_image: string
    twitter_handle: string
  }
  contact: {
    email: string
    phone?: string
    address?: { pt: string, en: string, es: string, fr: string }
  }
  social: {
    linkedin: string
    youtube: string
    instagram: string
    behance: string
    vimeo: string
  }
}
```

---

## 🔌 APIs Necessárias

### **Endpoint: GET /api/content**
Retorna todo o conteúdo estruturado (cases, services, lab, etc.)

**Query Params:**
- `lang` (pt | en | es | fr) - idioma
- `type` (cases | services | lab | team) - tipo de conteúdo

**Response:**
```json
{
  "cases": [...],
  "services": [...],
  "lab": [...],
  "team": [...]
}
```

---

### **Endpoint: GET /api/recommendations**
Retorna recomendações personalizadas baseadas em:
- Geolocalização (cidade/país)
- Tags de interesse (cookies)
- Contexto (data, eventos sazonais)

**Query Params:**
- `lang` (pt | en | es | fr)
- `geo` (país/estado/cidade via IP ou GPS)
- `tags` (array de tags de interesse)
- `max` (número máximo de resultados, padrão: 3)

**Response:**
```json
{
  "recommendations": [
    {
      "slug": "rio-olympic-museum",
      "title": { "pt": "Rio Museu Olímpico", ... },
      "score": 2.5,
      "reason": "proximity"
    }
  ]
}
```

**Lógica Sugerida:**
```typescript
function getRecommendations({ lang, geo, tags, max = 3 }) {
  let scored = cases.map(item => {
    let score = 0
    
    // Proximidade geográfica
    if (geo.country === 'BR' && item.location?.includes('Rio')) score += 2
    if (geo.country === 'CA' && item.slug.includes('first-nation')) score += 2
    
    // Tags de interesse
    if (tags.some(tag => item.tags.includes(tag))) score += 1
    
    // Sazonalidade (ex: Festival de Gramado em agosto)
    if (currentMonth === 'august' && item.slug === 'gramado-vr') score += 1.5
    
    // Status ativo tem prioridade
    if (item.status === 'active') score += 0.5
    
    return { item, score }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(s => ({ ...s.item, score: s.score, reason: '...' }))
}
```

---

### **Endpoint: POST /api/brief**
Recebe o formulário de "Brief Rápido" (Contact form)

**Body:**
```json
{
  "name": string,
  "email": string,
  "phone"?: string,
  "organization"?: string,
  "country_city"?: string,
  "project_type": string[],
  "objective": string,
  "location"?: string,
  "deadline"?: string,
  "budget"?: string,
  "target_audience"?: string,
  "references"?: string,
  "themes"?: string,
  "message": string,
  "lang": "pt" | "en" | "es" | "fr"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Brief recebido com sucesso!"
}
```

---

## 🌍 Geolocalização e Cookies

### **Geolocalização (IP-based)**
- Usar serviço: `ipapi.co`, `ip-api.com`, ou `cloudflare-analytics`
- Detectar: país, estado, cidade
- Usar apenas para **ordenação de conteúdo**, não para bloqueio

### **Cookies de Interesse**
- Armazenar últimas **3-5 tags** visualizadas
- Validade: 30 dias
- Nome do cookie: `azimut_interests`
- Formato: `["vr", "museum", "ai"]`

### **Consentimento (GDPR/LGPD)**
- Banner de consentimento para cookies
- Permitir desativar personalização
- Fallback: lista padrão sem personalização

---

## 🚀 Próximos Passos

### **Fase 1: Preparação**
- [ ] Escolher CMS headless (Strapi / Payload / Directus)
- [ ] Definir estrutura de database
- [ ] Migrar `src/data/content.ts` para o CMS

### **Fase 2: APIs**
- [ ] Criar endpoint `/api/content`
- [ ] Criar endpoint `/api/recommendations`
- [ ] Criar endpoint `/api/brief`

### **Fase 3: Frontend Integration**
- [ ] Substituir `import contentModel` por `fetch('/api/content')`
- [ ] Substituir `getRecommendations` (stub) por `fetch('/api/recommendations')`
- [ ] Conectar formulário Contact a `/api/brief`

### **Fase 4: Personalização**
- [ ] Implementar geolocalização via IP
- [ ] Implementar cookies de interesse
- [ ] Implementar feature flags (eventos sazonais)

### **Fase 5: Media & Assets**
- [ ] Upload de imagens/vídeos no CMS
- [ ] Otimização de imagens (WebP, AVIF)
- [ ] CDN para media (Cloudflare, Vercel)

---

## 📦 Estrutura de Arquivos Atual

```
azimut-site-vite-tailwind/
├── src/
│   ├── data/
│   │   └── content.ts          # Mock CMS (a ser substituído)
│   ├── utils/
│   │   └── reco.ts             # Recommendation stub (a ser substituído)
│   ├── pages/
│   │   ├── Home.tsx            # Hero + Recommendations
│   │   ├── Work.tsx            # Portfólio
│   │   ├── WhatWeDo.tsx        # Serviços
│   │   ├── Studio.tsx          # Equipe
│   │   ├── Research.tsx        # Lab
│   │   ├── Academy.tsx         # Workshops
│   │   └── Contact.tsx         # Brief form
│   └── components/
│       ├── Layout.tsx          # Header + Footer
│       └── SEO.tsx             # Meta tags
├── .cursorrules                # Proteção de código
├── PROTECTED_SECTIONS.md       # Documentação de seções protegidas
└── INTEGRATION_README.md       # Este arquivo
```

---

## 🔐 Seções Protegidas

**NÃO MODIFICAR sem consultar o usuário:**
- Menu de navegação (espaçamentos, tamanhos, glow)
- Seletor de idiomas (círculos, separadores, flags)
- Estrela de fundo (posição, opacidade)
- Rodapé (grid, linha vermelha, social icons)
- Cores e temas (Azimut Red #c92337)

Ver detalhes em: `.cursorrules` e `PROTECTED_SECTIONS.md`

---

## 📞 Contato

Para dúvidas sobre integração: contato@azimutimmersive.com

---

**Última atualização**: Dezembro 2025





















