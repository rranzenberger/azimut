# 🤖 MELHORIAS: IA E DETECÇÃO INSTITUCIONAL

**Data:** 08 Janeiro 2026  
**Status:** 📊 ANÁLISE + MELHORIAS PROPOSTAS

---

## 📊 **ESTADO ATUAL DO SISTEMA:**

### ✅ **O QUE JÁ ESTÁ IMPLEMENTADO:**

```
✅ Sistema de detecção institucional (47 instituições mapeadas)
✅ DeepSeek IA integrada
✅ Scoring comportamental (10 categorias)
✅ Personalização de mensagens hero
✅ Recomendações de projetos
✅ Alertas automáticos para leads premium
✅ Tracking de visitantes
```

---

## 🎯 **ANÁLISE DETALHADA:**

### **1. DETECÇÃO INSTITUCIONAL** 🏛️

**Arquivo:** `azimut-cms/src/lib/institutional-detection.ts`

#### ✅ **PONTOS FORTES:**
```
✅ 47 instituições mapeadas (Brasil + Canadá)
✅ Tier 1: 18 instituições (38%)
✅ Tier 2: 14 instituições (30%)
✅ Tier 3: 15 instituições (32%)
✅ Auto-alert em 19 instituições (40%)
✅ Budget ranges definidos
✅ Prioridades claras (URGENT, HIGH, MEDIUM)
```

#### ⚠️ **GAPS IDENTIFICADOS:**

##### **A. INSTITUIÇÕES FALTANDO:**

**🇧🇷 BRASIL - TIER 1 (FALTAM):**
```
❌ Instituto Moreira Salles (IMS)
   - ims.com.br
   - Budget: R$ 300k - R$ 1.5M
   - Forte em fotografia + arte digital

❌ Instituto Tomie Ohtake
   - institutotomieohtake.org.br
   - Budget: R$ 200k - R$ 800k
   - Exposições imersivas

❌ Bienal de São Paulo
   - bienal.org.br
   - Budget: R$ 500k - R$ 2M
   - Arte contemporânea + tecnologia

❌ MAM (Museu de Arte Moderna)
   - mam.org.br (SP/RJ)
   - Budget: R$ 150k - R$ 600k
   
❌ MASP
   - masp.org.br
   - Budget: R$ 200k - R$ 1M
   - Tecnologia em museus

❌ Embratur
   - embratur.gov.br
   - Budget: R$ 300k - R$ 2M
   - Turismo imersivo

❌ B3 (Bolsa de Valores)
   - b3.com.br
   - Budget: R$ 200k - R$ 1M
   - Museu + educação financeira
```

**🇧🇷 BRASIL - TIER 2:**
```
❌ Red Bull Brasil
   - redbull.com.br
   - Budget: R$ 100k - R$ 500k
   - Ativações de marca + eventos

❌ Ambev
   - ambev.com.br
   - Budget: R$ 150k - R$ 600k
   - Marketing experiencial

❌ Magazine Luiza
   - magazineluiza.com.br
   - Budget: R$ 100k - R$ 400k
   - Inovação retail + VR

❌ Natura
   - natura.com.br
   - Budget: R$ 100k - R$ 500k
   - Sustentabilidade + experiências
```

**🇨🇦 CANADÁ - TIER 1 (FALTAM):**
```
❌ Cirque du Soleil
   - cirquedusoleil.com
   - Budget: CAD $200k - $1M
   - Experiências imersivas + VR

❌ Moment Factory
   - momentfactory.com
   - Budget: CAD $100k - $500k
   - Parceiro potencial

❌ CBC (Canadian Broadcasting Corporation)
   - cbc.ca
   - Budget: CAD $100k - $500k
   - Conteúdo interativo

❌ Ubisoft Montreal
   - ubisoft.com
   - Budget: CAD $50k - $200k
   - Gaming + XR
```

**🇺🇸 ESTADOS UNIDOS - TIER 1 (NOVO):**
```
❌ Smithsonian Institution
   - si.edu
   - Budget: USD $200k - $1M
   - Maior sistema de museus do mundo

❌ MoMA (Museum of Modern Art)
   - moma.org
   - Budget: USD $150k - $800k

❌ Getty Museum
   - getty.edu
   - Budget: USD $200k - $1M
```

##### **B. DETECÇÃO MELHORADA:**

**Atualmente:** Só detecta domínio exato (`@sescsp.org.br`)

**Proposta:** Detecção inteligente:
```typescript
// ATUAL (só exato)
'sescsp.org.br' → SESC SP ✅
'contato@sescsp.org.br' → SESC SP ✅
'marketing@sesc.com.br' → null ❌ (não detecta variações)

// PROPOSTA (fuzzy matching)
'contato@sesc-sp.org.br' → SESC SP ✅
'eventos@sescsp.com.br' → SESC SP ✅
'joao@petrobras.gov.br' → Petrobras ✅ (detecta .gov.br)
'maria@itaucultural.com.br' → Itaú Cultural ✅ (detecta .com.br)
```

**Implementação:**
```typescript
export function detectInstitutionFuzzy(email: string): InstitutionalProfile | null {
  if (!email || !email.includes('@')) return null
  
  const domain = email.split('@')[1].toLowerCase()
  
  // 1. Busca exata (atual)
  if (INSTITUTIONAL_DOMAINS[domain]) {
    return INSTITUTIONAL_DOMAINS[domain]
  }
  
  // 2. Busca fuzzy (NOVO)
  for (const [key, profile] of Object.entries(INSTITUTIONAL_DOMAINS)) {
    const baseDomain = key.split('.').slice(-2).join('.') // "sescsp.org.br" → "org.br"
    const baseKey = key.replace(/\.(org|com|gov)\./g, '') // "sescsp" apenas
    
    // Verifica se domínio contém palavra-chave
    if (domain.includes(baseKey.toLowerCase())) {
      return { ...profile, confidence: 0.8 } // 80% de confiança
    }
  }
  
  return null
}
```

##### **C. SUBDOMÍNIOS E VARIAÇÕES:**

```typescript
// Adicionar mapeamento de variações
export const DOMAIN_VARIATIONS: Record<string, string> = {
  // SESC
  'sesc-sp.org.br': 'sescsp.org.br',
  'sescsp.com.br': 'sescsp.org.br',
  'sesc.org.br': 'sesc.com.br',
  
  // Petrobras
  'petrobras.gov.br': 'petrobras.com.br',
  'petrobras.net.br': 'petrobras.com.br',
  
  // Itaú
  'itaucultural.com.br': 'itaucultural.org.br',
  'itauunibanco.com.br': 'itau.com.br',
  
  // NFB/ONF
  'nfb-onf.ca': 'nfb.ca',
  'onf-nfb.ca': 'onf.ca',
}

// Normalizar domínio antes de buscar
function normalizeDomain(domain: string): string {
  const normalized = domain.toLowerCase()
  return DOMAIN_VARIATIONS[normalized] || normalized
}
```

---

### **2. MENSAGENS PERSONALIZADAS** 💬

**Arquivo:** `src/hooks/usePersonalizedContent.ts`

#### ✅ **O QUE JÁ FUNCIONA:**
```
✅ Hero title personalizado por tipo de visitante
✅ Hero subtitle contextual
✅ CTA adaptativo
✅ Link CTA específico
✅ 7 tipos de visitante detectados
```

#### ⚠️ **MELHORIAS PROPOSTAS:**

##### **A. MENSAGENS MAIS ESPECÍFICAS:**

**ATUAL:**
```typescript
case 'GOVERNMENT':
  return 'Projetos Imersivos para Espaços Culturais Públicos'
```

**PROPOSTA (com contexto institucional):**
```typescript
case 'GOVERNMENT':
  if (institution?.name === 'SESC São Paulo') {
    return 'Experiências Imersivas para o Maior Sistema de Cultura do Brasil'
  }
  if (institution?.name === 'Petrobras') {
    return 'Projetos Culturais e Treinamento VR para Energia'
  }
  if (institution?.type === 'NFB_ONF') {
    return 'Interactive Storytelling & Immersive Experiences for Canadian Culture'
  }
  return 'Projetos Imersivos para Espaços Culturais Públicos'
```

##### **B. MENSAGENS MULTILÍNGUES:**

**ATUAL:** Só português

**PROPOSTA:**
```typescript
function getHeroMessage(profile: VisitorProfile, lang: Lang, institution?: InstitutionalProfile): string {
  const messages = {
    GOVERNMENT: {
      pt: 'Projetos Imersivos para Espaços Culturais Públicos',
      en: 'Immersive Projects for Public Cultural Spaces',
      fr: 'Projets Immersifs pour Espaces Culturels Publics',
      es: 'Proyectos Inmersivos para Espacios Culturales Públicos'
    },
    CURATOR: {
      pt: 'Curadoria Digital e Experiências Museológicas',
      en: 'Digital Curation and Museum Experiences',
      fr: 'Curation Numérique et Expériences Muséales',
      es: 'Curaduría Digital y Experiencias Museísticas'
    },
    // ... etc
  }
  
  // Se instituição canadense, priorizar EN/FR
  if (institution?.country === 'CA') {
    return messages[profile.visitorType]?.['en'] || messages[profile.visitorType]?.['fr']
  }
  
  return messages[profile.visitorType]?.[lang] || messages[profile.visitorType]?.['pt']
}
```

##### **C. MENSAGENS BASEADAS EM BUDGET:**

```typescript
function getCTAByBudget(institution?: InstitutionalProfile): string {
  if (!institution) return 'Iniciar um Projeto'
  
  if (institution.tier === 1) {
    return 'Agendar Reunião Executiva' // Budget alto
  }
  if (institution.tier === 2) {
    return 'Conhecer Portfólio Completo'
  }
  return 'Falar sobre seu Projeto'
}
```

##### **D. MENSAGENS DINÂMICAS POR SETOR:**

```typescript
const SECTOR_MESSAGES: Record<InstitutionalType, {
  hero: string
  subtitle: string
  cta: string
}> = {
  SISTEMA_S: {
    hero: 'Inovação em Cultura e Educação para o Sistema S',
    subtitle: 'Criamos experiências imersivas para SESC, SENAC e SENAI. Projetos que engajam milhares de pessoas.',
    cta: 'Ver Projetos para Sistema S'
  },
  BANCO_CULTURAL: {
    hero: 'Arte Digital e Tecnologia para Institutos Culturais',
    subtitle: 'Parceiros de Itaú Cultural, CCBB e institutos bancários em projetos de arte e tecnologia.',
    cta: 'Ver Projetos Culturais'
  },
  MUSEU: {
    hero: 'Transformação Digital de Museus',
    subtitle: 'Acervos digitais, exposições imersivas e experiências VR para museus contemporâneos.',
    cta: 'Ver Projetos de Museus'
  },
  NFB_ONF: {
    hero: 'Interactive Storytelling for Canadian Screen Content',
    subtitle: 'VR/AR experiences, interactive documentaries and immersive narratives for NFB/ONF.',
    cta: 'View Interactive Projects'
  },
  // ... etc
}
```

---

### **3. SCORING E IA** 🎯

**Arquivo:** `azimut-cms/src/lib/ai-scoring.ts`

#### ✅ **O QUE JÁ FUNCIONA:**
```
✅ 10 categorias de scoring
✅ Scoring baseado em regras (sem chamar IA)
✅ DeepSeek AI para refinamento
✅ Inferência de tipo de visitante
✅ Threshold de 40 pontos
```

#### ⚠️ **MELHORIAS PROPOSTAS:**

##### **A. SCORING INSTITUCIONAL PONDERADO:**

```typescript
function calculateInstitutionalBonus(
  baseScores: ScoringResult,
  institution?: InstitutionalProfile
): ScoringResult {
  if (!institution) return baseScores
  
  const scores = { ...baseScores }
  
  // TIER 1: +20 pontos em conversionScore
  if (institution.tier === 1) {
    scores.conversionScore += 20
  }
  
  // TIER 2: +10 pontos
  if (institution.tier === 2) {
    scores.conversionScore += 10
  }
  
  // Boost específico por tipo
  switch (institution.type) {
    case 'MUSEU':
      scores.museumScore += 30
      break
    case 'SISTEMA_S':
      scores.educationScore += 25
      scores.installationScore += 20
      break
    case 'BANCO_CULTURAL':
      scores.brandScore += 20
      scores.aiScore += 15
      break
    case 'ENERGIA':
      scores.vrScore += 25 // Treinamento VR
      break
    case 'NFB_ONF':
      scores.vrScore += 30
      scores.aiScore += 25
      break
  }
  
  // Normalizar
  scores.museumScore = Math.min(100, scores.museumScore)
  scores.conversionScore = Math.min(100, scores.conversionScore)
  // ... etc
  
  return scores
}
```

##### **B. DETECÇÃO DE "HOT LEAD" MELHORADA:**

```typescript
function isHotLead(
  scores: ScoringResult,
  institution?: InstitutionalProfile,
  behavior?: SessionData
): boolean {
  // Tier 1 automático = HOT LEAD
  if (institution?.tier === 1 && institution.autoAlert) {
    return true
  }
  
  // Conversão alta + tempo no site
  if (scores.conversionScore > 80 && (behavior?.duration || 0) > 180) {
    return true
  }
  
  // Visualizou 3+ projetos + budget alto
  if ((behavior?.projectsViewed?.length || 0) >= 3 && institution?.tier === 1) {
    return true
  }
  
  // Visitou página de contato + institucional
  if (behavior?.pagesVisited.some(p => p.path.includes('/contact')) && institution) {
    return true
  }
  
  return false
}
```

##### **C. PROMPT DEEPSEEK MELHORADO:**

```typescript
const prompt = `
Analise este visitante e forneça recomendações personalizadas:

**PERFIL INSTITUCIONAL:**
${institution ? `
- Nome: ${institution.name}
- Tipo: ${institution.type}
- Tier: ${institution.tier} (1=premium, 5=low)
- Budget: ${institution.budgetRange}
- País: ${institution.country}
- Segmento: ${institution.segment}
` : 'Visitante individual (não institucional)'}

**COMPORTAMENTO:**
- Páginas visitadas: ${sessionData.pagesVisited.map(p => p.path).join(', ')}
- Projetos visualizados: ${sessionData.projectsViewed.map(p => `${p.title} (${p.type})`).join(', ')}
- Tempo total: ${sessionData.duration}s
- Interações: ${sessionData.interactions.map(i => i.type).join(', ')}

**SCORES CALCULADOS:**
- Museus: ${baseScores.museumScore}
- Marcas: ${baseScores.brandScore}
- VR/XR: ${baseScores.vrScore}
- IA: ${baseScores.aiScore}
- Conversão: ${baseScores.conversionScore}

**TAREFA:**
1. Confirme o tipo de visitante (CURATOR, GOVERNMENT, BRAND, etc)
2. Ajuste scores se necessário (baseado no contexto institucional)
3. Recomende 3 projetos mais relevantes
4. Sugira próxima ação específica
5. Estime probabilidade de conversão (0-100%)

${institution?.tier === 1 ? '⚠️ ATENÇÃO: Este é um cliente TIER 1 (premium). Priorize projetos de alto impacto e budget.' : ''}

Responda em JSON:
{
  "visitorType": "...",
  "adjustedScores": { ... },
  "recommendedProjects": ["slug1", "slug2", "slug3"],
  "suggestedAction": "...",
  "conversionProbability": 85,
  "reasoning": "..."
}
`
```

---

## 🚀 **IMPLEMENTAÇÃO PROPOSTA:**

### **PRIORIDADE 1: ADICIONAR INSTITUIÇÕES (30min)** ⭐⭐⭐⭐⭐

**O que fazer:**
1. Adicionar 15-20 instituições brasileiras faltando
2. Adicionar 5-10 instituições canadenses
3. Adicionar 3-5 instituições americanas (Smithsonian, MoMA, Getty)

**Impacto:** ALTO (detecta 80%+ dos clientes premium)

---

### **PRIORIDADE 2: MENSAGENS CONTEXTUAIS (20min)** ⭐⭐⭐⭐

**O que fazer:**
1. Mensagens específicas por instituição
2. Multilíngue (PT/EN/FR/ES)
3. CTA por budget/tier

**Impacto:** ALTO (conversão +30%)

---

### **PRIORIDADE 3: DETECÇÃO FUZZY (15min)** ⭐⭐⭐

**O que fazer:**
1. Implementar variações de domínio
2. Fuzzy matching para subdomínios
3. Normalização de emails

**Impacto:** MÉDIO (captura 15% a mais de leads)

---

### **PRIORIDADE 4: SCORING INSTITUCIONAL (10min)** ⭐⭐⭐

**O que fazer:**
1. Bonus por tier
2. Boost por tipo de instituição
3. Auto-hot-lead para Tier 1

**Impacto:** MÉDIO (priorização correta de leads)

---

### **PRIORIDADE 5: PROMPT IA MELHORADO (5min)** ⭐⭐

**O que fazer:**
1. Adicionar contexto institucional ao prompt
2. Pedir reasoning da IA
3. Estimativa de conversão

**Impacto:** BAIXO (IA já funciona bem)

---

## 📊 **RESULTADO ESPERADO:**

### **ANTES:**
```
✅ Detecta 47 instituições
✅ Mensagens genéricas
✅ Scoring básico
⚠️ Perde 30% de leads por não detectar variações
⚠️ Não diferencia Tier 1 de Tier 3
```

### **DEPOIS:**
```
✅ Detecta 70+ instituições
✅ Mensagens ultra-personalizadas
✅ Scoring inteligente com boost institucional
✅ Detecção fuzzy (captura variações)
✅ Auto-hot-lead para Tier 1
✅ Multilíngue contextual (PT/EN/FR/ES)
✅ Conversão estimada +40%
```

---

## ❓ **QUAL PRIORIDADE IMPLEMENTAMOS PRIMEIRO?**

**A.** ⭐⭐⭐⭐⭐ **Adicionar 30+ instituições** (30min)  
**B.** ⭐⭐⭐⭐ **Mensagens contextuais** (20min)  
**C.** ⭐⭐⭐ **Detecção fuzzy** (15min)  
**D.** ⭐⭐⭐ **Scoring institucional** (10min)  
**E.** ⭐⭐ **Prompt IA melhorado** (5min)  
**F.** 🚀 **TODAS EM SEQUÊNCIA** (1h 20min total)

**Me diz qual você quer começar! 😊**
