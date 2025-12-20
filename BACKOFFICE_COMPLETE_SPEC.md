# 🎯 BACKOFFICE SPEC - Sistema Inteligente de Conteúdo Azimut

## 📊 Estrutura Completa de Campos

---

## 1️⃣ **PROJECTS/CASES** (Portfólio)

### **Informações Básicas**
```typescript
{
  // Identificação
  id: string (auto)
  slug: string (único, ex: "rio-olympic-museum")
  
  // Conteúdo Multilíngue
  title: {
    pt: string
    en: string
    es: string
    fr: string
  }
  shortDescription: {
    pt: string (max 150 chars)
    en: string
    es: string
    fr: string
  }
  fullDescription: {
    pt: text (rich text)
    en: text
    es: text
    fr: text
  }
  
  // Classificação
  category: enum [
    'museums',           // Museus
    'brands',           // Marcas/Eventos
    'films',            // Filmes/Documentários
    'installations',    // Instalações/Arte
    'education'         // Educação/Workshops
  ]
  
  status: enum [
    'active',           // Ativo/Permanente
    'in-development',   // Em Desenvolvimento
    'completed',        // Finalizado
    'itinerant'        // Itinerante (exposições que viajam)
  ]
}
```

---

### **MÍDIA (Campos de Imagem/Vídeo)**
```typescript
{
  // Imagem Principal (Hero)
  mediaPoster: {
    url: string (CDN URL)
    alt: { pt, en, es, fr }
    width: number (ex: 1920)
    height: number (ex: 1080)
    format: enum ['webp', 'avif', 'jpg']
    size_kb: number
    credit: string (fotógrafo/videomaker)
    caption: { pt, en, es, fr }
  }
  
  // Vídeo Loop (para hero/cards)
  mediaLoop: {
    url: string (CDN URL)
    duration: number (segundos)
    format: enum ['mp4', 'webm']
    size_mb: number
    thumbnail_url: string (frame do vídeo)
  }
  
  // Galeria de Imagens
  mediaGallery: [
    {
      url: string
      alt: { pt, en, es, fr }
      order: number
      type: enum ['photo', 'screenshot', 'render', 'press']
    }
  ]
  
  // Link de Vídeo Externo (YouTube, Vimeo)
  videoExternal: {
    platform: enum ['youtube', 'vimeo', 'wistia']
    video_id: string
    thumbnail_url: string (auto-generated)
  }
  
  // Links de Mídia
  links: {
    video: string (URL completo do projeto - ex: Vimeo)
    press: string (link de matéria/press release)
    case_study: string (PDF ou página de case)
    website: string (site do projeto se houver)
  }
}
```

---

### **GEOLOCALIZAÇÃO (Sistema de Recomendação)**
```typescript
{
  // Localização Principal
  location: {
    country: string (código ISO - 'BR', 'CA', 'US')
    country_name: { pt, en, es, fr }
    state: string (código ou nome - 'RJ', 'BC')
    city: string (nome da cidade)
    address: string (endereço completo - opcional)
    
    // Coordenadas (para cálculo de proximidade)
    coordinates: {
      lat: number
      lng: number
      radius_km: number (raio de influência - ex: 50km)
    }
  }
  
  // Localizações Adicionais (para projetos itinerantes)
  locations_itinerant: [
    {
      city: string
      country: string
      venue: string (nome do local - ex: "Shopping Iguatemi Fortaleza")
      start_date: date
      end_date: date
      status: enum ['upcoming', 'active', 'past']
      coordinates: { lat, lng }
    }
  ]
  
  // Relevância Geográfica (para IA priorizar)
  geo_priority: {
    'BR': number (0-10, quanto maior mais relevante no Brasil)
    'CA': number
    'US': number
    'global': number (relevância global)
  }
}
```

---

### **TEMPORALIDADE (Datas e Eventos)**
```typescript
{
  // Datas do Projeto
  dates: {
    start_date: date (início do projeto)
    end_date: date (fim, se aplicável - null = permanente)
    year: string (ano principal - ex: "2016")
    duration: string (texto - ex: "3 meses", "permanente")
  }
  
  // Eventos/Exposições Relacionadas
  events: [
    {
      name: { pt, en, es, fr }
      type: enum ['exhibition', 'festival', 'workshop', 'conference']
      location: string
      start_date: date
      end_date: date
      is_featured: boolean (destaque na home?)
      registration_link: string (link para inscrições)
    }
  ]
  
  // Sazonalidade (para recomendações temporais)
  seasonal: {
    is_seasonal: boolean
    active_months: [1, 2, 12] // Janeiro, Fevereiro, Dezembro (ex: Natal)
    peak_season: string (texto - ex: "Dezembro a Janeiro")
  }
}
```

---

### **TAGS E CATEGORIZAÇÃO (Para IA e Busca)**
```typescript
{
  // Serviços Aplicados
  services: [
    'VR/XR',
    'Interactive Design',
    'Museography',
    'AI Pipeline',
    'Motion Design',
    'Film Production',
    'Educational Content',
    'Brand Activation'
  ]
  
  // Tags Semânticas (para IA identificar interesses)
  tags: [
    'vr',
    'museum',
    'interactive',
    'olympics',
    'rio-de-janeiro',
    'cultural',
    'family-friendly',
    'technology',
    'education'
  ]
  
  // Tags de Público-Alvo (quem se interessa)
  target_audience: [
    'families',
    'students',
    'tourists',
    'professionals',
    'brands',
    'educators',
    'museums',
    'cities'
  ]
  
  // Tags de Interesse/Tema
  themes: [
    'sports',
    'art',
    'culture',
    'technology',
    'education',
    'entertainment',
    'history',
    'nature',
    'architecture',
    'christmas',
    'indigenous',
    'automotive'
  ]
}
```

---

### **MÉTRICAS E IMPACTO**
```typescript
{
  metrics: {
    visitors: number (número de visitantes)
    duration_avg: string (tempo médio - ex: "45 min")
    engagement_score: number (0-10)
    reach: number (alcance em pessoas)
    press_mentions: number (menções na mídia)
  }
  
  // KPIs (para apresentação)
  kpis: [
    {
      label: { pt, en, es, fr }
      value: string (ex: "150 mil visitantes")
      icon: string (nome do ícone)
    }
  ]
}
```

---

### **RECOMENDAÇÃO E PERSONALIZAÇÃO**
```typescript
{
  // Prioridade de Recomendação
  recommendation: {
    priority: number (1-10, maior = mais priorizado)
    is_featured: boolean (aparece na home?)
    featured_until: date (até quando fica em destaque)
    
    // Regras de Exibição
    show_for_countries: ['BR', 'CA', 'US', '*'] // * = todos
    hide_for_countries: [] // países onde NÃO mostrar
    
    // Contexto de Recomendação
    recommend_if: {
      near_location: boolean (mostrar se perto da localização)
      has_tags: ['vr', 'museum'] (mostrar se usuário viu esses temas)
      is_active: boolean (mostrar apenas se ativo)
      language_match: boolean (priorizar se língua do usuário)
    }
  }
  
  // Score de Relevância (calculado automaticamente)
  relevance_score: {
    geo: number (0-10, baseado em proximidade)
    temporal: number (0-10, baseado em datas ativas)
    interest: number (0-10, baseado em tags coincidentes)
    total: number (soma ponderada)
  }
}
```

---

## 2️⃣ **USER TRACKING** (Cookies e Preferências)

```typescript
{
  // Dados do Usuário (sem identificação pessoal)
  user_session: {
    id: uuid (sessão)
    first_visit: datetime
    last_visit: datetime
    
    // Geolocalização
    geo: {
      country: string (via IP)
      state: string
      city: string
      coordinates: { lat, lng }
      detected_by: enum ['gps', 'ip', 'browser']
    }
    
    // Idioma
    language: {
      detected: string ('pt', 'en', 'es', 'fr')
      preferred: string (se usuário mudou manualmente)
      browser_lang: string
    }
    
    // Interesses (via cookies)
    interests: {
      tags: ['vr', 'museum', 'technology']
      categories: ['museums', 'films']
      themes: ['art', 'education']
      
      // Histórico de visualização
      viewed_projects: [
        {
          slug: string
          timestamp: datetime
          duration: number (segundos na página)
        }
      ]
      
      // Últimas 5 tags vistas (para cookie)
      recent_tags: ['vr', 'museum', 'interactive', 'rio', 'olympics']
    }
    
    // Consentimento (LGPD/GDPR)
    consent: {
      analytics: boolean
      personalization: boolean
      geolocation: boolean
      timestamp: datetime
    }
  }
}
```

---

## 3️⃣ **LÓGICA DE RECOMENDAÇÃO (API)**

### **Endpoint: POST /api/recommendations**

```typescript
// REQUEST
{
  user_session_id: uuid
  lang: 'pt' | 'en' | 'es' | 'fr'
  max_results: number (default: 3)
  
  // Contexto do usuário
  context: {
    geo: {
      country: 'BR'
      state: 'RJ'
      city: 'Rio de Janeiro'
      coordinates: { lat: -22.9068, lng: -43.1729 }
    }
    
    interests: {
      tags: ['vr', 'museum']
      recent_projects: ['rio-olympic-museum']
    }
    
    current_date: datetime
  }
}

// RESPONSE
{
  recommendations: [
    {
      project: { ...dados completos do projeto... }
      
      // Explicação da recomendação
      reason: {
        type: 'proximity' | 'interest' | 'seasonal' | 'new' | 'popular'
        score: 8.5
        explanation: {
          pt: "Próximo à sua localização (15km)"
          en: "Near your location (15km)"
        }
        
        factors: {
          geo_match: 3.0 (0-3)
          interest_match: 2.5 (0-3)
          temporal_match: 2.0 (0-2)
          popularity: 1.0 (0-2)
        }
      }
      
      // Call-to-Action contextual
      cta: {
        text: { pt, en, es, fr }
        action: 'view' | 'register' | 'visit' | 'watch'
        link: string
      }
    }
  ]
}
```

---

### **Algoritmo de Scoring**

```javascript
function calculateRecommendationScore(project, userContext) {
  let score = 0
  const factors = {}
  
  // 1. PROXIMIDADE GEOGRÁFICA (0-3 pontos)
  if (project.location.coordinates) {
    const distance = calculateDistance(
      userContext.geo.coordinates,
      project.location.coordinates
    )
    
    if (distance < 10) factors.geo = 3.0  // Muito perto (<10km)
    else if (distance < 50) factors.geo = 2.5  // Perto (<50km)
    else if (distance < 200) factors.geo = 2.0  // Região (<200km)
    else if (project.location.country === userContext.geo.country) {
      factors.geo = 1.0  // Mesmo país
    } else {
      factors.geo = 0.5  // Outro país
    }
  }
  
  // 2. INTERESSE/TAGS (0-3 pontos)
  const tagMatch = project.tags.filter(tag => 
    userContext.interests.tags.includes(tag)
  ).length
  
  factors.interest = Math.min(tagMatch * 0.5, 3.0)
  
  // 3. TEMPORAL (0-2 pontos)
  if (project.status === 'active') {
    factors.temporal = 2.0  // Projeto ativo
    
    // Bonus se tem evento acontecendo AGORA
    const activeEvent = project.events?.find(e => 
      e.start_date <= today && e.end_date >= today
    )
    if (activeEvent) factors.temporal += 0.5
    
  } else if (project.status === 'itinerant') {
    // Verificar se tem exposição na cidade do usuário
    const localExhibit = project.locations_itinerant?.find(loc =>
      loc.city === userContext.geo.city &&
      loc.status === 'active'
    )
    if (localExhibit) {
      factors.temporal = 2.5  // MUITO relevante!
      factors.geo += 1.0  // Boost geo
    }
  }
  
  // 4. POPULARIDADE (0-2 pontos)
  factors.popularity = Math.min(project.metrics.engagement_score / 5, 2.0)
  
  // 5. IDIOMA (bonus)
  if (project.location.country_code === getUserCountryByLang(userContext.lang)) {
    factors.geo += 0.5  // Bonus se país do projeto = país da língua
  }
  
  // SOMA TOTAL
  score = factors.geo + factors.interest + factors.temporal + factors.popularity
  
  // Aplicar prioridade manual do backoffice
  score *= (project.recommendation.priority / 5)
  
  return { score, factors }
}
```

---

## 4️⃣ **EXEMPLOS DE CENÁRIOS**

### **Cenário 1: Usuário no Rio perto de Rio Bonito**
```
📍 Localização: -22.7461, -42.6236 (Rio Bonito, RJ)
📅 Data: 15 de dezembro
🏷️ Interesses: [ainda não tem histórico]

→ IA RECOMENDA:
1. Natal Cultural Rio Bonito (score: 9.5)
   - geo: 3.0 (5km de distância!)
   - temporal: 2.5 (ativo em dezembro)
   - seasonal: +1.0 (evento de Natal)
   CTA: "🎄 Visitando Rio Bonito? Veja o Natal Cultural!"

2. Rio Olympic Museum (score: 7.0)
   - geo: 2.0 (40km de distância)
   - interest: 1.0 (projeto de museu no Rio)
   CTA: "Conheça o primeiro museu olímpico das Américas"
```

---

### **Cenário 2: Usuário em Fortaleza durante exposição Senna**
```
📍 Localização: -3.7172, -38.5433 (Fortaleza, CE)
📅 Data: 10 de março
🏷️ Interesses: ['automotive', 'sports', 'technology']

→ IA RECOMENDA:
1. Senna Tower Itinerante (score: 10.0)
   - geo: 3.0 (Shopping Iguatemi Fortaleza - ativo AGORA)
   - temporal: 2.5 (exposição de 1 a 31 de março)
   - interest: 3.0 (todas as tags coincidem!)
   CTA: "🏎️ Exposição Senna em Fortaleza até 31/03!"

2. Amazônias Possíveis (score: 5.5)
   - geo: 1.0 (Norte/Nordeste, tema regional)
   - interest: 1.5 (documentário, cultura)
   CTA: "Conheça o filme híbrido IA/VR sobre a Amazônia"
```

---

### **Cenário 3: Usuário em Vancouver**
```
📍 Localização: 49.2827, -123.1207 (Vancouver, BC, CA)
🌐 Idioma detectado: EN
🏷️ Interesses: ['indigenous', 'technology', 'vr']

→ SITE ABRE EM INGLÊS automaticamente

→ IA RECOMENDA:
1. DeepLab/IXLabs First Nation (score: 9.0)
   - geo: 3.0 (Vancouver - projeto local!)
   - interest: 3.0 (indigenous + vr + tech)
   - language: EN (match perfeito)
   CTA: "🍁 Explore Indigenous stories with XR technology"

2. Gramado VR/AI Curation (score: 6.5)
   - interest: 2.5 (vr + film festival + international)
   - geo: 0.5 (projeto Brasil-Canadá)
   CTA: "VR Film Curation at Festival de Gramado (Brazil)"
```

---

## 5️⃣ **CAMPOS DO BACKOFFICE (Interface)**

### **Tela de Edição de Projeto**

```
┌─────────────────────────────────────────────┐
│ PROJETO: Rio Museu Olímpico                 │
├─────────────────────────────────────────────┤
│                                             │
│ 📝 INFORMAÇÕES BÁSICAS                      │
│   Título (PT): [Rio Museu Olímpico        ]│
│   Título (EN): [Rio Olympic Museum        ]│
│   Categoria:  [Museums ▼]                  │
│   Status:     [Active ▼]                   │
│                                             │
│ 🖼️ MÍDIA                                    │
│   Imagem Principal: [Upload] rio-museum.webp│
│     ↳ Tamanho: 1920x1080 | 180KB | WebP   │
│     ↳ Alt (PT): [Fachada do museu...]      │
│     ↳ Crédito: [João Silva - Fotografia]   │
│                                             │
│   Vídeo Loop: [Upload] rio-museum-loop.mp4 │
│     ↳ Duração: 12s | 1.8MB | MP4          │
│                                             │
│   Galeria: [+ Adicionar Imagens]           │
│                                             │
│ 📍 GEOLOCALIZAÇÃO                           │
│   País:    [Brasil ▼]                      │
│   Estado:  [RJ - Rio de Janeiro ▼]         │
│   Cidade:  [Rio de Janeiro]                │
│   Endereço: [Praça Mauá, 1...]             │
│                                             │
│   Coordenadas: [Detectar Automaticamente]  │
│     Lat: [-22.895] Lng: [-43.180]          │
│     Raio: [50] km                           │
│                                             │
│   Prioridade Geográfica:                    │
│     Brasil: [10] ██████████ (máxima)       │
│     Canadá: [5]  █████                      │
│     Global: [7]  ███████                    │
│                                             │
│ 📅 DATAS E EVENTOS                          │
│   Data Início: [2016-08-01]                │
│   Data Fim:    [Permanente ☑]              │
│   Ano:         [2016]                       │
│                                             │
│ 🏷️ TAGS E CATEGORIZAÇÃO                    │
│   Serviços:  [VR/XR][Museography][Interactive]│
│   Tags:      [museum][olympics][rio][vr]   │
│   Temas:     [sports][culture][technology] │
│   Público:   [families][tourists][students]│
│                                             │
│ 🎯 RECOMENDAÇÃO                             │
│   Prioridade: [8] ████████░░ (alta)        │
│   Destaque:   [☑] Featured na Home         │
│   Até:        [2025-12-31]                 │
│                                             │
│   Mostrar para:                             │
│     ☑ Brasil  ☑ Canadá  ☐ EUA  ☑ Global  │
│                                             │
│   Regras de Recomendação:                   │
│     ☑ Recomendar se perto da localização   │
│     ☑ Recomendar se usuário viu tags similares│
│     ☑ Apenas se projeto ativo               │
│                                             │
│ [Salvar] [Pré-visualizar] [Cancelar]       │
└─────────────────────────────────────────────┘
```

---

## 6️⃣ **PRÓXIMOS PASSOS**

### **Fase 1: Setup do Backoffice**
- [ ] Escolher CMS (Strapi, Payload, Directus)
- [ ] Criar schema com todos os campos acima
- [ ] Configurar upload de mídia + CDN

### **Fase 2: Geolocalização**
- [ ] Implementar detecção de IP → cidade/país
- [ ] Implementar cálculo de distância (haversine)
- [ ] Criar endpoint `/api/geo/detect`

### **Fase 3: Sistema de Recomendação**
- [ ] Criar algoritmo de scoring
- [ ] Implementar `/api/recommendations`
- [ ] Testar cenários de uso

### **Fase 4: Frontend Integration**
- [ ] Conectar detecção de idioma automática
- [ ] Conectar cookies de interesse
- [ ] Exibir recomendações na Home

---

**Este é o sistema COMPLETO para o backoffice inteligente! 🚀**

Quer que eu crie agora um exemplo de implementação ou mockup visual do backoffice?





















