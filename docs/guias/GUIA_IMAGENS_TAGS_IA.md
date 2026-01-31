# 🖼️ GUIA TÉCNICO - IMAGENS, TAGS E IA PERSONALIZAÇÃO

---

## 📐 **ESPECIFICAÇÕES DE IMAGENS POR PÁGINA**

### **LEGENDA DE FORMATOS:**
- **Hero:** 1920x1080px (16:9) - Full width
- **Banner:** 1600x600px - Seção destacada
- **Card:** 600x400px (3:2) - Grid de cards
- **Portrait:** 400x600px (2:3) - Fotos de equipe
- **Logo:** 200x200px (1:1) - Logos parceiros
- **Thumbnail:** 400x300px (4:3) - Lista de projetos
- **Icon:** 128x128px (1:1) - Ícones de serviços

---

## 🏠 **HOME PAGE - IMAGENS**

### **1. HERO VIDEO/IMAGE**
**Tipo:** `VIDEO` ou `IMAGE`  
**Tamanho:** 1920x1080px (16:9) ou maior  
**Formato:** MP4 (video) ou WEBP/JPG (image)  
**Peso Max:** 50MB (video), 500KB (image)  
**Uso:** Background do hero principal

**Tags Sugeridas:**
```json
{
  "type": "hero-background",
  "page": "home",
  "category": "brand",
  "mood": "cinematic",
  "priority": "high",
  "aiRelevance": ["immersive", "technology", "museum"]
}
```

**Campo no Backoffice:**
- `Section.slug = "hero"`
- `Media.type = VIDEO` ou `IMAGE`
- Relação: `Section → Media` (1:1)

---

### **2. QUEM SOMOS - IMAGEM PRINCIPAL**
**Tipo:** `IMAGE`  
**Tamanho:** 1200x800px (3:2)  
**Formato:** WEBP, JPG fallback  
**Peso Max:** 300KB

**Opções de Imagem:**
1. Foto da equipe Azimut (Brasil + Canadá)
2. Montagem visual: Logo + thumbnails de projetos
3. Collage de tecnologias (VR headset, cameras, LED panels)

**Tags Sugeridas:**
```json
{
  "type": "section-image",
  "page": "home",
  "section": "quem-somos",
  "category": "team",
  "subjects": ["team", "office", "brazil", "canada"],
  "aiRelevance": ["about-us", "culture", "binational"]
}
```

---

### **3. NOSSOS PILARES - 3 ÍCONES**
**Tipo:** `IMAGE` (SVG preferível)  
**Tamanho:** 256x256px (1:1) cada  
**Formato:** SVG ou PNG transparente  
**Quantidade:** 3 imagens

**Ícones:**
1. 🎬 IMERSIVE - Óculos VR estilizado
2. 🎮 INTERACTIVE - Mão tocando tela/sensor
3. 🎥 CINEMATIC - Câmera de cinema

**Tags Sugeridas (cada ícone):**
```json
{
  "type": "icon",
  "page": "home",
  "section": "pilares",
  "pillar": "imersive", // ou "interactive", "cinematic"
  "format": "svg",
  "aiRelevance": ["pillars", "values", "methodology"]
}
```

---

### **4. BRASIL ↔ CANADÁ - MAPA OU FOTOS**
**Tipo:** `IMAGE`  
**Tamanho:** 1600x900px (16:9)  
**Formato:** WEBP, JPG fallback

**Opções:**
1. Mapa estilizado conectando Rio-Vancouver
2. Split-screen: Rio (esquerda) + Vancouver (direita)
3. Collage de fotos dos escritórios

**Tags Sugeridas:**
```json
{
  "type": "section-image",
  "page": "home",
  "section": "brasil-canada",
  "category": "locations",
  "subjects": ["brazil", "canada", "rio", "vancouver", "office"],
  "aiRelevance": ["binational", "global", "locations"]
}
```

---

## 💼 **WORK PAGE - IMAGENS**

### **1. HERO/INTRO - BANNER**
**Tipo:** `IMAGE`  
**Tamanho:** 1600x600px  
**Formato:** WEBP

**Sugestão:** Grid de thumbnails dos 6 projetos principais em mosaico

**Tags:**
```json
{
  "type": "banner",
  "page": "work",
  "section": "intro",
  "category": "portfolio-overview",
  "aiRelevance": ["portfolio", "projects", "showcase"]
}
```

---

### **2. PROJETOS (Dinâmico - vem de `Project`)**
**Tipo:** `IMAGE`  
**Tamanho Thumbnail:** 600x400px (3:2)  
**Tamanho Hero (detalhe):** 1920x1080px (16:9)  
**Tamanho Galeria:** 1200x900px (4:3)

**Tags por Projeto (exemplo Rio Museu Olímpico):**
```json
{
  "projectSlug": "rio-museu-olimpico",
  "type": "project-hero",
  "category": "museum",
  "tags": ["museum", "olympic", "rio", "interactive", "technology"],
  "technologies": ["unity", "kinect", "led-panels", "touchscreens"],
  "services": ["museus-exposicoes", "xr-interatividade-web3"],
  "location": "rio-de-janeiro",
  "year": 2025,
  "aiRelevance": {
    "clientProfile": ["institution", "government", "culture"],
    "budget": "high",
    "complexity": "high",
    "keywords": ["museum", "cultural", "immersive", "educational"]
  }
}
```

**IMPORTANTE:** Cada projeto deve ter:
- 1 imagem hero (destaque)
- 5-20 imagens de galeria
- Tags detalhadas para IA

---

## 🎯 **WHAT WE DO PAGE - IMAGENS**

### **1. SERVIÇOS - ÍCONES (já existem no código)**
Grid 4x4 com ícones dos 16 serviços (emoji por enquanto, pode virar SVG depois)

---

### **2. PARA AGÊNCIAS - BANNER B2B**
**Tipo:** `IMAGE`  
**Tamanho:** 1200x600px (2:1)  
**Formato:** WEBP

**Sugestão:** Mockup de parceria (ex: apresentação de pitch, logos de agências)

**Tags:**
```json
{
  "type": "banner",
  "page": "what",
  "section": "para-agencias",
  "category": "b2b",
  "audience": "agencies",
  "aiRelevance": ["b2b", "partnership", "white-label", "agency"]
}
```

---

## 🏛️ **STUDIO PAGE - IMAGENS**

### **1. EQUIPE - FOTOS INDIVIDUAIS**
**Tipo:** `IMAGE`  
**Tamanho:** 400x600px (2:3) - Portrait  
**Formato:** WEBP, JPG fallback  
**Quantidade:** 3-15 fotos (Ranz, Aick, Alberto + outros)

**Tags por Pessoa (exemplo Ranz):**
```json
{
  "type": "team-photo",
  "page": "studio",
  "section": "equipe",
  "personName": "Ranz Enberger",
  "personRole": "diretor-geral",
  "personSlug": "ranz-enberger",
  "category": "team",
  "aiRelevance": ["founder", "director", "leadership", "xr-expert"]
}
```

**Campos Adicionais para Pessoas (novo model no Prisma?):**
```prisma
model TeamMember {
  id          String   @id @default(uuid())
  slug        String   @unique
  namePt      String
  nameEn      String
  rolePt      String
  roleEn      String
  bioPt       String?
  bioEn       String?
  photoId     String?
  linkedIn    String?
  order       Int      @default(0)
  photo       Media?   @relation(fields: [photoId], references: [id])
}
```

---

### **2. PRÊMIOS - FOTOS DE TROFÉUS/CERTIFICADOS**
**Tipo:** `IMAGE`  
**Tamanho:** 800x600px (4:3)  
**Quantidade:** 3-10 imagens

**Tags:**
```json
{
  "type": "award-photo",
  "page": "studio",
  "section": "premios",
  "awardName": "Festival Immerso XR",
  "year": 2024,
  "category": "recognition",
  "aiRelevance": ["awards", "recognition", "credibility"]
}
```

---

### **3. CLIENTES/PARCEIROS - LOGOS**
**Tipo:** `IMAGE` (SVG ou PNG transparente)  
**Tamanho:** 200x200px (1:1) ou 300x150px (2:1)  
**Quantidade:** 10-50 logos

**Tags por Logo:**
```json
{
  "type": "client-logo",
  "page": "studio",
  "section": "parceiros",
  "clientName": "Prefeitura do Rio",
  "clientSlug": "prefeitura-rio",
  "clientType": "government", // ou "brand", "agency", "institution"
  "relationship": "client", // ou "partner", "supplier"
  "aiRelevance": {
    "clientProfile": ["government", "institution"],
    "projectTypes": ["museum", "cultural"]
  }
}
```

---

## 🎓 **ACADEMY PAGE - IMAGENS**

### **1. WORKSHOPS - FOTOS DE TREINAMENTOS**
**Tipo:** `IMAGE`  
**Tamanho:** 800x600px (4:3)  
**Quantidade:** 10-20 fotos

**Sugestão:** Fotos de workshops anteriores (pessoas usando VR, aprendendo Unity, etc.)

**Tags:**
```json
{
  "type": "workshop-photo",
  "page": "academy",
  "section": "workshops",
  "workshopTopic": "vr-unity", // ou "ia-generativa", "web3"
  "category": "education",
  "aiRelevance": {
    "interests": ["learning", "training", "vr", "development"],
    "audienceProfile": ["developer", "designer", "student"]
  }
}
```

---

### **2. EQUIPAMENTOS - FOTOS DE TECH**
**Tipo:** `IMAGE`  
**Tamanho:** 600x600px (1:1)  
**Quantidade:** 5-10 fotos

**Sugestão:** Oculus Quest, câmeras 360°, drones, Arduino, etc.

**Tags:**
```json
{
  "type": "equipment-photo",
  "page": "academy",
  "section": "equipamentos",
  "equipmentName": "Meta Quest 3",
  "equipmentType": "vr-headset",
  "category": "technology",
  "aiRelevance": ["vr", "hands-on", "practical-training"]
}
```

---

## 📰 **PRESS PAGE - IMAGENS**

### **1. PRESS KIT - MOCKUP**
**Tipo:** `IMAGE`  
**Tamanho:** 1200x800px (3:2)

**Sugestão:** Mockup de pasta de press kit com logos, fotos, etc.

---

### **2. NA MÍDIA - SCREENSHOTS**
**Tipo:** `IMAGE`  
**Tamanho:** 800x600px (4:3)  
**Quantidade:** Dinâmico (cada menção na imprensa)

**Tags:**
```json
{
  "type": "press-mention",
  "page": "press",
  "section": "na-midia",
  "outlet": "O Globo", // ou "GloboNews", "TechCrunch"
  "date": "2025-01-15",
  "category": "press",
  "aiRelevance": ["media", "credibility", "exposure"]
}
```

---

## 📞 **CONTACT PAGE - IMAGENS**

### **1. ESCRITÓRIOS - FOTOS**
**Tipo:** `IMAGE`  
**Tamanho:** 800x600px (4:3)  
**Quantidade:** 2 fotos (Rio + Vancouver)

**Tags:**
```json
{
  "type": "office-photo",
  "page": "contact",
  "section": "escritorios",
  "location": "rio-de-janeiro", // ou "vancouver"
  "category": "locations",
  "aiRelevance": ["contact", "office", "locations"]
}
```

---

## 🏷️ **SISTEMA DE TAGS NO BACKOFFICE**

### **MODELO NO PRISMA (expandido):**

```prisma
model Media {
  id               String         @id @default(uuid())
  type             MediaType      @default(IMAGE)
  originalUrl      String
  thumbnailUrl     String?
  mediumUrl        String?
  largeUrl         String?
  webpUrl          String?
  avifUrl          String?
  
  // Metadados básicos
  width            Int?
  height           Int?
  sizeBytes        Int?
  format           String?
  contentType      String?
  
  // Multilíngue
  altPt            String?
  altEn            String?
  altEs            String?
  altFr            String?
  
  // ========== NOVO: SISTEMA DE TAGS PARA IA ==========
  
  // Contexto da imagem
  pageSlug         String?        // "home", "work", "studio", etc.
  sectionSlug      String?        // "hero", "quem-somos", "equipe", etc.
  imageType        String?        // "hero-background", "section-image", "project-hero", "team-photo", "client-logo"
  
  // Tags categóricas
  category         String?        // "brand", "team", "technology", "portfolio", etc.
  subjects         String[]       // ["vr", "museum", "interactive", "rio"]
  
  // Tags de negócio (para IA de recomendação)
  targetAudience   String[]       // ["institution", "agency", "brand", "developer"]
  servicesTags     String[]       // ["museus-exposicoes", "xr-interatividade-web3"]
  technologiesTags String[]       // ["unity", "vr", "blockchain", "kinect"]
  
  // Prioridade e relevância
  priority         Int            @default(0)  // 0-10 (quanto maior, mais importante)
  aiRelevanceScore Float?         // 0.0-1.0 (calculado pela IA)
  
  // JSON flexível para dados extras
  aiMetadata       Json?          // Qualquer dado adicional para IA
  
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
  
  // Relações existentes
  projectHero      Project?
  projectGalleries ProjectMedia[]
  sections         Section[]      @relation("SectionMedia") // NOVA RELAÇÃO
}

// NOVA RELAÇÃO: Section pode ter múltiplas imagens
model Section {
  id             String    @id @default(uuid())
  pageId         String
  slug           String
  order          Int       @default(0)
  titlePt        String?
  titleEn        String?
  bodyPt         String?
  bodyEn         String?
  page           Page      @relation(fields: [pageId], references: [id])
  linkedProjects Project[] @relation("SectionProjects")
  media          Media[]   @relation("SectionMedia") // NOVA RELAÇÃO N:N
}
```

---

## 🤖 **SISTEMA DE IA PERSONALIZAÇÃO COM DEEPSEEK**

### **OBJETIVO:**
Entender o comportamento do visitante e recomendar projetos/serviços relevantes usando IA.

---

### **FLUXO DE IA:**

```
1. VISITANTE ACESSA O SITE
   ↓
2. TRACKING: Captura comportamento
   - Páginas visitadas
   - Projetos clicados
   - Tempo em cada seção
   - Hover em cards de serviços
   ↓
3. ANÁLISE IA (DeepSeek API)
   - "Este visitante está interessado em museus ou branded experiences?"
   - "Ele é de instituição, agência ou marca?"
   - "Qual serviço recomendar?"
   ↓
4. PERSONALIZAÇÃO
   - Home hero adapta mensagem
   - Projetos recomendados mudam
   - Serviços destacados dinamicamente
```

---

### **IMPLEMENTAÇÃO - API DEEPSEEK:**

#### **1. ENDPOINT DE ANÁLISE:**

```typescript
// azimut-cms/app/api/ai/analyze-visitor/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { sessionId, pageViews, projectInteractions } = await request.json()
  
  // Montar prompt para DeepSeek
  const prompt = `
Analise o comportamento deste visitante e determine:
1. Perfil (instituição cultural, agência, marca, produtor, estudante)
2. Interesses principais (museus, VR, Web3, audiovisual, etc.)
3. Orçamento estimado (baixo, médio, alto)
4. Urgência (pesquisando, pronto para contratar)

Dados do visitante:
- Páginas visitadas: ${pageViews.map((p: any) => p.pageSlug).join(', ')}
- Projetos clicados: ${projectInteractions.map((i: any) => i.projectSlug).join(', ')}
- Tempo médio por página: ${calculateAvgTime(pageViews)}s

Responda em JSON:
{
  "profile": "institution" | "agency" | "brand" | "producer" | "student" | "unknown",
  "interests": ["museum", "vr", "web3", ...],
  "budget": "low" | "medium" | "high",
  "urgency": "research" | "considering" | "ready",
  "confidence": 0.0-1.0,
  "recommendedProjects": ["slug1", "slug2", "slug3"],
  "recommendedServices": ["slug1", "slug2"],
  "reasoning": "Explicação breve da análise"
}
`

  // Chamar DeepSeek API
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'Você é um analista de comportamento de visitantes para um site de experiências imersivas.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3, // Mais determinístico
      response_format: { type: 'json_object' }
    })
  })
  
  const aiResult = await response.json()
  const analysis = JSON.parse(aiResult.choices[0].message.content)
  
  // Salvar no banco (InterestScore)
  await prisma.interestScore.upsert({
    where: { sessionId },
    update: {
      profileType: analysis.profile,
      interests: analysis.interests,
      budgetLevel: analysis.budget,
      urgency: analysis.urgency,
      confidenceScore: analysis.confidence,
      aiRecommendations: analysis,
      updatedAt: new Date()
    },
    create: {
      sessionId,
      profileType: analysis.profile,
      interests: analysis.interests,
      budgetLevel: analysis.budget,
      urgency: analysis.urgency,
      confidenceScore: analysis.confidence,
      aiRecommendations: analysis
    }
  })
  
  return NextResponse.json(analysis)
}
```

---

#### **2. HOOK NO FRONTEND:**

```typescript
// src/hooks/useAIPersonalization.ts

import { useEffect, useState } from 'react'

export function useAIPersonalization(sessionId: string) {
  const [aiProfile, setAiProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Aguarda o visitante navegar um pouco (5 páginas ou 60s)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/ai/analyze-visitor', {
          method: 'POST',
          body: JSON.stringify({ sessionId })
        })
        const analysis = await res.json()
        setAiProfile(analysis)
      } catch (err) {
        console.error('AI analysis failed:', err)
      } finally {
        setLoading(false)
      }
    }, 60000) // 60 segundos
    
    return () => clearTimeout(timer)
  }, [sessionId])
  
  return { aiProfile, loading }
}
```

---

#### **3. USO NA HOME PAGE:**

```typescript
// src/pages/Home.tsx

const Home: React.FC<HomeProps> = ({ lang }) => {
  const sessionId = useSessionId() // hook existente
  const { aiProfile } = useAIPersonalization(sessionId)
  
  // Mensagem hero personalizada
  const personalizedHero = aiProfile 
    ? getPersonalizedHeroMessage(aiProfile, lang)
    : t(lang, 'heroTitle')
  
  // Projetos recomendados pela IA
  const recommendedProjects = aiProfile?.recommendedProjects || []
  
  return (
    <div>
      <Hero title={personalizedHero} />
      
      {recommendedProjects.length > 0 && (
        <section>
          <h2>Projetos Recomendados Para Você</h2>
          <ProjectGrid projects={recommendedProjects} />
        </section>
      )}
      
      {/* Resto da página */}
    </div>
  )
}
```

---

#### **4. MENSAGENS PERSONALIZADAS:**

```typescript
function getPersonalizedHeroMessage(profile: AIProfile, lang: Lang): string {
  const messages = {
    institution: {
      pt: 'Transformamos espaços culturais em experiências imersivas memoráveis',
      en: 'We transform cultural spaces into memorable immersive experiences'
    },
    agency: {
      pt: 'Parceiros técnicos de agências para projetos com VR, IA e Web3',
      en: 'Technical partners for agencies in VR, AI and Web3 projects'
    },
    brand: {
      pt: 'Criamos branded experiences que geram engajamento e vendas',
      en: 'We create branded experiences that drive engagement and sales'
    },
    producer: {
      pt: 'Produção audiovisual imersiva com tecnologia de ponta',
      en: 'Immersive audiovisual production with cutting-edge technology'
    },
    student: {
      pt: 'Aprenda tecnologias imersivas com quem faz há 30 anos',
      en: 'Learn immersive technologies from 30-year industry veterans'
    }
  }
  
  return messages[profile.profile]?.[lang] || messages.institution[lang]
}
```

---

## 📊 **TAGS PARA NAVEGAÇÃO IA:**

### **CATEGORIAS PRINCIPAIS:**

```typescript
const AI_CATEGORIES = {
  // Tipo de cliente
  clientProfile: [
    'institution',      // Museus, governo, ONGs
    'agency',          // Agências de publicidade/marketing
    'brand',           // Marcas corporativas
    'producer',        // Produtoras audiovisuais
    'developer',       // Desenvolvedores/tech
    'student'          // Estudantes/acadêmicos
  ],
  
  // Interesses técnicos
  technologies: [
    'vr', 'ar', 'xr', 'metaverse', 'web3', 'blockchain', 'nft',
    'unity', 'unreal', 'touchdesigner', 'ai-generative',
    '360-video', 'drones', 'kinect', 'led-panels', 'nfc'
  ],
  
  // Tipos de projeto
  projectTypes: [
    'museum', 'exhibition', 'branded-experience', 'theater',
    'festival', 'education', 'corporate-training', 'game',
    'audiovisual', 'installation', 'metaverse-experience'
  ],
  
  // Orçamento estimado
  budget: ['low', 'medium', 'high'],
  
  // Urgência
  urgency: ['research', 'considering', 'ready']
}
```

---

## 🚀 **CHECKLIST DE IMPLEMENTAÇÃO:**

### **FASE 1: IMAGENS**
- [ ] Criar/editar imagens para cada seção (seguir especificações)
- [ ] Fazer upload no backoffice via Media model
- [ ] Adicionar tags detalhadas em cada imagem
- [ ] Otimizar (WEBP, tamanhos corretos)

### **FASE 2: BACKOFFICE**
- [ ] Adicionar campos de tags no modelo Media (migration)
- [ ] Criar relação Section ↔ Media (N:N)
- [ ] UI para adicionar tags facilmente
- [ ] Preview de como ficará no site

### **FASE 3: IA**
- [ ] Implementar endpoint `/api/ai/analyze-visitor`
- [ ] Integrar DeepSeek API
- [ ] Criar hook `useAIPersonalization`
- [ ] Personalizar mensagens hero
- [ ] Recomendação de projetos

### **FASE 4: FRONTEND**
- [ ] Renderizar Section com imagens do backoffice
- [ ] Layout responsivo para cada tipo de seção
- [ ] Lazy loading de imagens
- [ ] Tracking de interações para IA

---

## 📝 **PRÓXIMOS PASSOS - VOCÊ DECIDE:**

1. **Quer que eu crie a migration do Prisma com os novos campos?**
2. **Quer que eu implemente o endpoint de IA com DeepSeek?**
3. **Quer que eu crie os componentes de renderização de Sections?**
4. **Tudo acima?**

**Me diga e vamos implementar!** 🚀🤖

