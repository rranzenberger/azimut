# 🏛️ PERFIS INSTITUCIONAIS PREMIUM - ADDENDUM
## Clientes de Alto Valor: Brasil & Canadá

**Complemento da:** `ESTRATEGIA_IA_INVISIVEL_PREMIUM_2026.md`

---

## 🇧🇷 BRASIL - INSTITUIÇÕES-ALVO

### 🏛️ **1. CENTROS CULTURAIS**

**Perfil:**
- CCBB (Centro Cultural Banco do Brasil)
- Itaú Cultural
- Sesc (todas unidades)
- Centro Cultural São Paulo
- MIS (Museu da Imagem e do Som)

**Budget:** R$ 500k - R$ 5M+ por projeto  
**Tipo IA:** `MUSEUM_CURATOR` + `CITY_OFFICIAL`  
**Sinais de detecção:**
- Visita projetos "instalação permanente"
- Interesse em "tecnologia + cultura"
- Tempo longo em cases de centros culturais

**Estratégia de IA:**
```typescript
if (visitorType === 'MUSEUM_CURATOR' && country === 'BR') {
  // Destacar cases Brasil
  priorityProjects = [
    'CCBB Rio - Instalação Interativa',
    'Sesc Pompeia - Exposição XR',
    'Itaú Cultural - Cinema Imersivo'
  ]
  
  heroMessage = "Transformamos centros culturais em experiências inesquecíveis"
  
  cta = "Ver nossos projetos para centros culturais →"
}
```

---

### 🏛️ **2. MUSEUS & REVITALIZAÇÕES**

**Perfil:**
- Museus estaduais/municipais
- Museus temáticos (ciência, história, arte)
- Projetos de revitalização
- Museus corporativos

**Budget:** R$ 300k - R$ 3M  
**Tipo IA:** `MUSEUM_CURATOR`  
**Sinais de detecção:**
- Busca por "revitalização"
- Interesse em "museografia interativa"
- Visita cases de transformação

**Estratégia de IA:**
```typescript
if (sessionData.pagesVisited.includes('work') && 
    sessionData.searchTerms?.includes('revitalização')) {
  
  badge = "🏛️ Especialistas em Revitalização de Museus"
  
  recommendedContent = [
    {
      title: "Como revitalizamos o Museu Nacional",
      type: "case-study",
      cta: "Baixar PDF"
    },
    {
      title: "ROI de Exposições Interativas",
      type: "whitepaper"
    }
  ]
}
```

---

### 📢 **3. CHAMADAS PÚBLICAS & EDITAIS**

**Perfil:**
- Lei Rouanet
- Lei de Incentivo à Cultura (estaduais/municipais)
- Editais BNDES
- Editais Petrobrás Cultural
- ProAC (SP)
- Aldir Blanc

**Budget:** R$ 200k - R$ 2M (por edital)  
**Tipo IA:** `CULTURAL_PRODUCER` (novo tipo!)  
**Sinais de detecção:**
- Visita Academy (procura referências)
- Lê cases com "parceria pública"
- Interesse em "viabilidade cultural"

**Estratégia de IA:**
```typescript
// NOVO TIPO DE VISITANTE
if (educationScore > 30 && cityScore > 30 && 
    timeInAcademy > 120 && country === 'BR') {
  
  visitorType = 'CULTURAL_PRODUCER'
  
  chatbotMessage = "Olá! Vi que você se interessa em projetos culturais. Temos experiência com Lei Rouanet e editais públicos. Podemos ajudar?"
  
  suggestedContent = [
    "Guia: Como elaborar projeto para Lei Rouanet",
    "Cases: Projetos aprovados em editais",
    "Consultoria: Viabilidade e captação"
  ]
}
```

---

### 🏢 **4. SISTEMA S (SESC, SENAC, SENAI, etc.)**

**Perfil:**
- **SESC:** Cultura, lazer, educação
- **SENAC:** Educação profissional, centros de inovação
- **SENAI:** Tecnologia, indústria 4.0
- **SESI:** Cultura, esporte, educação

**Budget:** R$ 500k - R$ 5M+ (orçamentos robustos)  
**Tipo IA:** `INSTITUTIONAL_CLIENT` (novo tipo!)  
**Sinais de detecção:**
- Email domain: `@sescsp.org.br`, `@sp.senac.br`, etc.
- Interesse em "educação + tecnologia"
- Múltiplas visitas (decisões em comitê)

**Estratégia de IA:**
```typescript
if (userAgent.includes('sesc') || email?.includes('@sesc')) {
  
  visitorType = 'INSTITUTIONAL_CLIENT_SESC'
  
  // Mostrar APENAS cases relevantes
  projectFilter = {
    tags: ['educação', 'cultura', 'lazer', 'social'],
    budget: 'R$ 500k+',
    duration: '6-12 meses'
  }
  
  heroMessage = "Parceiro do Sistema S em transformação digital e cultural"
  
  testimonials = [
    "Trabalhamos com Sesc SP em 3 projetos de XR",
    "Senac RJ - Centro de Inovação Imersiva"
  ]
  
  cta = "Falar com nosso time institucional →"
}
```

---

### 🏭 **5. FIESP & ENTIDADES INDUSTRIAIS**

**Perfil:**
- FIESP (Federação das Indústrias)
- FIRJAN (RJ)
- FIEP (PR)
- CNI (Confederação Nacional)

**Budget:** R$ 1M - R$ 10M+ (projetos grandes)  
**Tipo IA:** `CORPORATE_INSTITUTIONAL`  
**Foco:** Indústria 4.0, capacitação, feiras, eventos

**Estratégia de IA:**
```typescript
if (visitorType === 'CORPORATE_INSTITUTIONAL') {
  
  priorityProjects = [
    'Feira Industrial - Pavilhão Interativo XR',
    'Centro de Inovação - Simuladores VR',
    'Capacitação 4.0 - Treinamento Imersivo'
  ]
  
  valueProposition = {
    roi: "Redução de 40% no tempo de treinamento",
    engagement: "300% mais engajamento em feiras",
    innovation: "Posicionamento como líder em inovação"
  }
  
  cta = "Agendar apresentação para diretoria →"
}
```

---

## 🇨🇦 CANADÁ - INSTITUIÇÕES-ALVO

### 🎬 **6. NATIONAL FILM BOARD (NFB/ONF)**

**Perfil:**
- Agência federal de produção audiovisual
- Pioneiros em cinema interativo
- Orçamento robusto para inovação

**Budget:** CAD 200k - CAD 2M+  
**Tipo IA:** `FILM_BOARD_OFFICIAL`  
**Sinais de detecção:**
- Idioma: Francês (Quebec) ou Inglês (Canadá)
- Interesse em "interactive cinema"
- Visita cases de "VR documentary"

**Estratégia de IA:**
```typescript
if (country === 'CA' && (lang === 'fr' || lang === 'en')) {
  
  if (projectInterests.includes('cinema') && 
      projectInterests.includes('interactive')) {
    
    visitorType = 'FILM_BOARD_OFFICIAL'
    
    heroMessage = {
      en: "We create interactive experiences for cultural institutions",
      fr: "Nous créons des expériences interactives pour les institutions culturelles"
    }
    
    featuredProjects = [
      'Interactive Documentary - Indigenous Stories',
      'VR Cinema Experience - Montreal Film Festival',
      'Spatial Storytelling - National Gallery'
    ]
    
    testimonial = "Parceria com National Film Board of Canada"
  }
}
```

---

### 🎨 **7. CREATIVE BC & PROVINCIAL AGENCIES**

**Perfil:**
- Creative BC (British Columbia)
- Ontario Creates
- Telefilm Canada
- Canada Council for the Arts

**Budget:** CAD 100k - CAD 1M  
**Tipo IA:** `PROVINCIAL_ARTS_AGENCY`  
**Foco:** Apoio à produção criativa, inovação cultural

**Estratégia de IA:**
```typescript
if (country === 'CA' && region === 'BC' && 
    projectInterests.includes('VR') || projectInterests.includes('XR')) {
  
  visitorType = 'PROVINCIAL_ARTS_AGENCY'
  
  // Mostrar expertise local
  localPresence = {
    office: "Vancouver Studio",
    partnerships: [
      "Creative BC",
      "Emily Carr University",
      "Vancouver Film School"
    ]
  }
  
  cta = {
    en: "Discuss funding opportunities →",
    fr: "Discuter des opportunités de financement →"
  }
}
```

---

### 🏛️ **8. OUTROS CANADÁ**

**Lista Expandida:**

**Federal:**
- Canadian Heritage / Patrimoine canadien
- Canada Council for the Arts / Conseil des arts du Canada
- National Gallery of Canada / Musée des beaux-arts du Canada
- Canadian Museum of History / Musée canadien de l'histoire

**Provincial (Quebec):**
- SODEC (Société de développement des entreprises culturelles)
- Conseil des arts et des lettres du Québec
- Place des Arts
- Musée national des beaux-arts du Québec

**Provincial (Ontario):**
- Ontario Arts Council
- Art Gallery of Ontario (AGO)
- Royal Ontario Museum (ROM)

**Provincial (BC):**
- BC Arts Council
- Vancouver Art Gallery
- Museum of Anthropology (UBC)

**Estratégia de IA:**
```typescript
const canadianInstitutions = {
  'federal': {
    keywords: ['heritage', 'patrimoine', 'council', 'national', 'canadian'],
    budget: 'CAD 300k - CAD 3M',
    decisionTime: '6-12 months'
  },
  'quebec': {
    lang: 'fr',
    keywords: ['sodec', 'conseil', 'québec', 'place des arts'],
    culturalFit: 'Franco-Brazilian partnership'
  },
  'ontario': {
    keywords: ['ago', 'rom', 'ontario creates'],
    techFocus: 'VR/XR innovation'
  },
  'bc': {
    keywords: ['creative bc', 'vancouver', 'ubc'],
    industryFocus: 'Film + Gaming + XR'
  }
}

// Detectar e personalizar
if (detectInstitution(userBehavior, canadianInstitutions)) {
  customizeExperience(institutionProfile)
}
```

---

## 🎯 IMPLEMENTAÇÃO: DETECÇÃO AVANÇADA

### 🔍 **Sistema de Detecção Multi-Camadas**

```typescript
// azimut-cms/src/lib/institutional-detection.ts

export function detectInstitutionalClient(sessionData: SessionData): InstitutionalProfile | null {
  
  // 1. DETECÇÃO POR EMAIL DOMAIN
  if (sessionData.email) {
    const institutionalDomains = {
      // Brasil - Sistema S
      'sescsp.org.br': { type: 'SESC', region: 'SP', budget: 'HIGH' },
      'sp.senac.br': { type: 'SENAC', region: 'SP', budget: 'HIGH' },
      'senai.br': { type: 'SENAI', budget: 'HIGH' },
      
      // Brasil - Museus/Cultura
      'ccbb.com.br': { type: 'CCBB', budget: 'VERY_HIGH' },
      'itaucultural.org.br': { type: 'ITAU_CULTURAL', budget: 'HIGH' },
      'prefeitura.sp.gov.br': { type: 'GOV_MUNICIPAL', budget: 'MEDIUM' },
      
      // Brasil - Indústria
      'fiesp.org.br': { type: 'FIESP', budget: 'VERY_HIGH' },
      'firjan.com.br': { type: 'FIRJAN', budget: 'HIGH' },
      
      // Canadá - Federal
      'nfb.ca': { type: 'NFB', budget: 'VERY_HIGH', lang: 'en/fr' },
      'onf.ca': { type: 'ONF', budget: 'VERY_HIGH', lang: 'fr' },
      'pch.gc.ca': { type: 'CANADIAN_HERITAGE', budget: 'VERY_HIGH' },
      
      // Canadá - Provincial
      'creativebc.com': { type: 'CREATIVE_BC', budget: 'HIGH' },
      'ontariocreates.ca': { type: 'ONTARIO_CREATES', budget: 'HIGH' },
      'sodec.gouv.qc.ca': { type: 'SODEC', budget: 'HIGH', lang: 'fr' },
    }
    
    const domain = sessionData.email.split('@')[1]
    if (institutionalDomains[domain]) {
      return {
        ...institutionalDomains[domain],
        confidence: 95,
        source: 'email_domain'
      }
    }
  }
  
  // 2. DETECÇÃO POR COMPORTAMENTO
  const behaviorSignals = analyzeInstitutionalBehavior(sessionData)
  
  if (behaviorSignals.score > 70) {
    return {
      type: behaviorSignals.type,
      confidence: behaviorSignals.score,
      source: 'behavior_analysis'
    }
  }
  
  return null
}

function analyzeInstitutionalBehavior(sessionData: SessionData) {
  let score = 0
  let type = 'UNKNOWN'
  
  // Sinais de instituição cultural
  if (sessionData.pagesVisited.filter(p => p.slug.includes('museum')).length > 2) {
    score += 20
    type = 'CULTURAL_INSTITUTION'
  }
  
  // Interesse em editais/chamadas públicas
  if (sessionData.searchTerms?.some(term => 
      ['edital', 'rouanet', 'chamada', 'público'].includes(term.toLowerCase()))) {
    score += 30
    type = 'CULTURAL_PRODUCER'
  }
  
  // Padrão de pesquisa institucional (múltiplas visitas, decisão em comitê)
  if (sessionData.returnVisits > 3 && sessionData.totalTimeOnSite > 1800) {
    score += 25
    type = 'INSTITUTIONAL_DECISION_MAKER'
  }
  
  // Interesse em tecnologia + cultura
  if (sessionData.projectsViewed.some(p => p.tags.includes('VR') || p.tags.includes('XR')) &&
      sessionData.projectsViewed.some(p => p.type === 'MUSEU' || p.type === 'CULTURA')) {
    score += 25
    type = 'INNOVATIVE_CULTURAL_INSTITUTION'
  }
  
  return { score, type }
}
```

---

## 💎 PERSONALIZAÇÃO POR INSTITUIÇÃO

### 🎯 **Mensagens Customizadas**

```typescript
// src/utils/institutional-messaging.ts

const institutionalMessages = {
  
  // BRASIL
  SESC: {
    hero: "Parceiro do Sistema S em projetos culturais e educacionais inovadores",
    cta: "Agendar apresentação para sua unidade",
    testimonial: "Sesc SP - 3 projetos de XR realizados",
    portfolio: "Nosso trabalho com o Sistema S"
  },
  
  SENAC: {
    hero: "Transformamos educação profissional com tecnologia imersiva",
    cta: "Conhecer soluções para centros de inovação",
    value: "40% redução no tempo de capacitação",
    portfolio: "Cases de educação e treinamento"
  },
  
  FIESP: {
    hero: "Indústria 4.0: Experiências que transformam capacitação e eventos",
    cta: "Agendar apresentação executiva",
    roi: "ROI de 300% em feiras e treinamentos",
    portfolio: "Projetos industriais e corporativos"
  },
  
  CCBB: {
    hero: "Criamos exposições inesquecíveis para centros culturais",
    cta: "Ver nossos projetos culturais",
    highlight: "Especialistas em grande formato e alto tráfego",
    portfolio: "Exposições e instalações permanentes"
  },
  
  // CANADÁ
  NFB: {
    en: {
      hero: "Interactive cinema and immersive storytelling for cultural institutions",
      cta: "Explore our interactive projects",
      partnership: "Experience working with National Film Board",
      portfolio: "Interactive cinema portfolio"
    },
    fr: {
      hero: "Cinéma interactif et narration immersive pour institutions culturelles",
      cta: "Explorer nos projets interactifs",
      partnership: "Expérience avec l'Office national du film",
      portfolio: "Portfolio de cinéma interactif"
    }
  },
  
  CREATIVE_BC: {
    hero: "XR experiences for the creative economy",
    cta: "Discuss funding opportunities",
    localPresence: "Vancouver studio - Local team",
    portfolio: "BC creative projects"
  },
  
  SODEC: {
    hero: "Productions immersives pour le marché québécois",
    cta: "Discuter de votre projet",
    partnership: "Partenaire des producteurs culturels du Québec",
    funding: "Expérience avec SODEC et autres programmes"
  }
}
```

---

## 📊 MÉTRICAS ESPECIAIS INSTITUCIONAIS

### 🎯 **KPIs Específicos**

```typescript
// Dashboard especial para instituições

const institutionalMetrics = {
  
  // Taxa de conversão por tipo
  conversionRates: {
    'SESC': '15%',  // Alta (decisor único)
    'SENAC': '12%', 
    'FIESP': '8%',  // Média (comitê)
    'CCBB': '10%',
    'NFB': '12%',
    'CREATIVE_BC': '15%',
    'CULTURAL_PRODUCER': '5%'  // Baixa (depende de edital)
  },
  
  // Tempo médio de decisão
  decisionTime: {
    'Sistema S': '3-6 meses',
    'Museus públicos': '6-12 meses',
    'Editais': '12-18 meses (ciclo do edital)',
    'Canadian federal': '6-12 meses',
    'Canadian provincial': '3-9 meses'
  },
  
  // Ticket médio
  averageTicket: {
    'SESC/SENAC': 'R$ 800k',
    'FIESP': 'R$ 2M',
    'CCBB': 'R$ 1.5M',
    'NFB': 'CAD 500k',
    'CREATIVE_BC': 'CAD 300k',
    'Editais': 'R$ 400k'
  }
}
```

---

## 🚀 AÇÕES IMEDIATAS

### ✅ **Adicionar ao Sistema:**

1. **Novos tipos de visitante:**
   ```typescript
   - CULTURAL_PRODUCER (editais)
   - INSTITUTIONAL_CLIENT_SESC
   - INSTITUTIONAL_CLIENT_SENAC
   - CORPORATE_INSTITUTIONAL (FIESP)
   - FILM_BOARD_OFFICIAL (NFB)
   - PROVINCIAL_ARTS_AGENCY (Creative BC, SODEC)
   ```

2. **Detecção por email domain** (se preencherem formulário)

3. **Mensagens personalizadas por instituição**

4. **Portfolio segmentado:**
   - Sistema S cases
   - Editais aprovados
   - Canadian projects
   - Federal/Provincial cases

5. **CTAs específicos:**
   - "Agendar apresentação institucional"
   - "Consultoria para editais"
   - "Discuss funding opportunities"
   - "Présentation en français"

---

## 💡 PRÓXIMO PASSO?

Quer que eu:
1. ✅ **Implemente esses novos perfis no sistema?**
2. ✅ **Crie landing pages específicas?** (ex: `/institutional`, `/editais`)
3. ✅ **Configure detecção avançada?**
4. ✅ **Crie portfolio segmentado?**
5. ✅ **Tudo junto?** 🚀

**Me diga e eu começo!** 🎯

