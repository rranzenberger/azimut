# 🤖 Sistema de IA para Captação Inteligente - Azimut

**Data:** 2025-01-27  
**Objetivo:** Criar o sistema mais avançado de captação e orientação inteligente do mercado

---

## 🎯 VISÃO ESTRATÉGICA

### O Que Queremos Criar

Um **sistema de IA que:**
1. **Monitora** navegação em tempo real
2. **Identifica** perfil do visitante (curioso, alto potencial, cliente, governo, etc.)
3. **Orienta** navegação de forma sutil e natural
4. **Capta** leads qualificados automaticamente
5. **Personaliza** experiência para cada tipo de visitante
6. **Competi** com grandes players (Dreams, DeepLab, produtoras, etc.)

### Por Que Isso É Inovador?

**O que já existe no mercado:**
- ❌ Chatbots básicos (respostas pré-programadas)
- ❌ Analytics simples (Google Analytics)
- ❌ A/B testing básico
- ❌ Pop-ups invasivos

**O que NÃO existe (nosso diferencial):**
- ✅ **IA que identifica perfil em tempo real**
- ✅ **Navegação orientada sutil (sem o visitante perceber)**
- ✅ **Sistema de scoring comportamental avançado**
- ✅ **Personalização dinâmica de conteúdo**
- ✅ **Captação inteligente baseada em comportamento**

---

## 🧠 ARQUITETURA DO SISTEMA

### Componentes Principais

```
┌─────────────────────────────────────────────────────────┐
│           SISTEMA DE IA - CAPTAÇÃO INTELIGENTE          │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼──────┐   ┌────────▼────────┐  ┌──────▼──────┐
│  TRACKING   │   │  IA ANALYTICS   │  │ NAVEGAÇÃO   │
│  COMPORT.   │   │   & SCORING     │  │ ORIENTADA   │
└───────┬──────┘   └────────┬────────┘  └──────┬──────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼───────┐
                    │  PERSONALIZAÇÃO│
                    │   DINÂMICA     │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │  CAPTAÇÃO     │
                    │  INTELIGENTE  │
                    └───────────────┘
```

---

## 📊 SISTEMA DE IDENTIFICAÇÃO DE PERFIS

### Perfis Identificados pela IA

#### 1. **CURIOSO** (Score: 0-30)
**Sinais:**
- Navegação rápida (< 30s por página)
- Não clica em projetos específicos
- Não rola até o final
- Não visita página de contato

**Ação:**
- Mostrar conteúdo educativo (blog, cases)
- Não forçar contato
- Oferecer newsletter opcional

---

#### 2. **INTERESSADO** (Score: 31-60)
**Sinais:**
- Visualiza 2-3 projetos
- Rola até o final de páginas
- Visita página de serviços
- Tempo médio no site (> 2min)

**Ação:**
- Destacar projetos similares
- Mostrar depoimentos
- Sugerir conteúdo relacionado
- Oferecer download de portfólio

---

#### 3. **ALTO POTENCIAL** (Score: 61-80)
**Sinais:**
- Visualiza 4+ projetos específicos
- Visita página de contato
- Volta várias vezes
- Compartilha conteúdo
- Tempo longo no site (> 5min)

**Ação:**
- Personalizar hero com projetos relevantes
- Mostrar editais relacionados
- Oferecer consultoria gratuita
- CTA destacado mas não invasivo

---

#### 4. **CLIENTE QUENTE** (Score: 81-95)
**Sinais:**
- Preenche formulário de contato
- Visualiza projetos similares ao que precisa
- Visita página de orçamento
- Volta em horário comercial
- IP de empresa/governo

**Ação:**
- Chatbot proativo (mas respeitoso)
- Mostrar cases de sucesso similares
- Oferecer reunião agendada
- Personalizar toda experiência

---

#### 5. **GOVERNO / SECRETARIA** (Score: 96-100)
**Sinais:**
- IP de órgão público
- Visita projetos de museus/cidades
- Interesse em educação/cultura
- Visualiza editais
- Email institucional (.gov.br, .gov.ca)

**Ação:**
- Conteúdo focado em editais
- Cases de projetos públicos
- Destaque para Lei Rouanet, CMF, NFB
- Contato direto com equipe especializada

---

#### 6. **ASSISTENTE DE CULTURA / CUrador**
**Sinais:**
- Busca por "museu", "exposição", "curadoria"
- Visualiza projetos culturais
- Interesse em VR/AR para cultura
- Visita Academy/Research

**Ação:**
- Conteúdo acadêmico
- Projetos de museus
- Workshops e cursos
- Parcerias acadêmicas

---

## 🔍 SISTEMA DE MONITORAMENTO EM TEMPO REAL

### Dados Coletados

```typescript
interface VisitorProfile {
  // Identificação
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  country: string;
  language: string;
  
  // Comportamento
  pagesVisited: string[];
  projectsViewed: string[];
  timeOnSite: number;
  scrollDepth: number[];
  clicks: ClickEvent[];
  formInteractions: FormEvent[];
  
  // Análise IA
  visitorType: 'CURIOUS' | 'INTERESTED' | 'HIGH_POTENTIAL' | 'HOT_LEAD' | 'GOVERNMENT' | 'CURATOR';
  interestScore: {
    museums: number;      // 0-100
    brands: number;
    festivals: number;
    education: number;
    research: number;
  };
  conversionScore: number;  // 0-100
  budgetEstimate: string;   // 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Personalização
  recommendedProjects: string[];
  recommendedServices: string[];
  recommendedEditais: string[];
  nextBestAction: string;
}
```

---

## 🎨 NAVEGAÇÃO ORIENTADA SUTIL

### Como Funciona (Sem o Visitante Perceber)

#### 1. **Personalização de Hero**
```typescript
// Se visitante é governo → mostrar projetos de museus
if (profile.visitorType === 'GOVERNMENT') {
  heroProjects = projects.filter(p => p.type === 'MUSEUM' || p.type === 'PUBLIC');
  heroMessage = "Projetos imersivos para espaços culturais públicos";
}

// Se visitante é marca → mostrar ativações
if (profile.visitorType === 'BRAND') {
  heroProjects = projects.filter(p => p.type === 'BRAND_ACTIVATION');
  heroMessage = "Experiências imersivas que conectam marcas e audiências";
}
```

#### 2. **Reordenação de Projetos**
```typescript
// Projetos mais relevantes aparecem primeiro
projects.sort((a, b) => {
  const relevanceA = calculateRelevance(a, profile);
  const relevanceB = calculateRelevance(b, profile);
  return relevanceB - relevanceA;
});
```

#### 3. **Sugestões Contextuais**
```typescript
// Banner sutil no topo (não invasivo)
if (profile.conversionScore > 70) {
  showBanner("💡 Projetos similares ao seu interesse");
}

// Links relacionados no final de páginas
if (profile.interestScore.museums > 60) {
  showRelatedLinks([
    "Lei Rouanet para Projetos Culturais",
    "Cases de Museus Digitais",
    "Workshop: VR para Cultura"
  ]);
}
```

#### 4. **Chatbot Proativo (Mas Respeitoso)**
```typescript
// Só aparece se score alto E não for intrusivo
if (profile.conversionScore > 75 && !hasShownChatbot) {
  showChatbot("Olá! Vi que você está interessado em [tipo]. Posso ajudar?");
  // Se não interagir em 30s, desaparece
}
```

---

## 🚀 IMPLEMENTAÇÃO TÉCNICA

### Fase 1: Tracking Avançado (1 semana)

**Arquivo:** `azimut-cms/src/lib/ai-scoring.ts` (já existe, melhorar)

```typescript
// Melhorar função de scoring
export async function analyzeVisitorProfile(sessionId: string): Promise<VisitorProfile> {
  const session = await prisma.visitorSession.findUnique({
    where: { sessionId },
    include: {
      pageViews: { include: { project: true } },
      interestScore: true,
    },
  });

  // Análise com DeepSeek
  const analysis = await ai.analyze({
    prompt: `
      Analise este visitante:
      - Páginas visitadas: ${session.pageViews.map(p => p.pageSlug)}
      - Projetos vistos: ${session.pageViews.filter(p => p.project).map(p => p.project.title)}
      - Tempo no site: ${session.duration}s
      - País: ${session.country}
      
      Identifique:
      1. Tipo de visitante (CURIOUS, INTERESTED, HIGH_POTENTIAL, HOT_LEAD, GOVERNMENT, CURATOR)
      2. Interesse principal (museus, marcas, festivais, educação)
      3. Score de conversão (0-100)
      4. Orçamento estimado
      5. Urgência
      6. Próxima melhor ação
    `,
  });

  return {
    visitorType: analysis.type,
    interestScore: analysis.interests,
    conversionScore: analysis.conversionScore,
    // ...
  };
}
```

---

### Fase 2: Personalização Dinâmica (2 semanas)

**Arquivo:** `src/hooks/usePersonalizedContent.ts` (novo)

```typescript
export function usePersonalizedContent() {
  const { sessionId } = useSession();
  const [profile, setProfile] = useState<VisitorProfile | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Buscar perfil do visitante
      fetch(`/api/visitor/profile?sessionId=${sessionId}`)
        .then(res => res.json())
        .then(setProfile);
    }
  }, [sessionId]);

  return {
    profile,
    recommendedProjects: profile?.recommendedProjects || [],
    recommendedServices: profile?.recommendedServices || [],
    heroMessage: getPersonalizedHero(profile),
    ctaText: getPersonalizedCTA(profile),
  };
}
```

**Arquivo:** `src/pages/Home.tsx` (modificar)

```typescript
const Home = () => {
  const { profile, recommendedProjects, heroMessage } = usePersonalizedContent();
  
  // Projetos personalizados
  const projects = recommendedProjects.length > 0 
    ? recommendedProjects 
    : defaultProjects;

  return (
    <>
      <Hero message={heroMessage} />
      <Projects projects={projects} />
      {/* Conteúdo personalizado baseado no perfil */}
    </>
  );
};
```

---

### Fase 3: Navegação Orientada (2 semanas)

**Arquivo:** `src/components/SmartNavigation.tsx` (novo)

```typescript
export function SmartNavigation() {
  const { profile } = usePersonalizedContent();
  
  // Reordenar menu baseado no interesse
  const menuItems = useMemo(() => {
    if (!profile) return defaultMenu;
    
    // Se interesse em museus → destacar "Work" e "Academy"
    if (profile.interestScore.museums > 60) {
      return reorderMenu(['Work', 'Academy', 'Studio', 'Contact']);
    }
    
    // Se interesse em marcas → destacar "What" e "Work"
    if (profile.interestScore.brands > 60) {
      return reorderMenu(['What', 'Work', 'Studio', 'Contact']);
    }
    
    return defaultMenu;
  }, [profile]);

  return <Navigation items={menuItems} />;
}
```

**Arquivo:** `src/components/SmartSuggestions.tsx` (novo)

```typescript
export function SmartSuggestions() {
  const { profile } = usePersonalizedContent();
  
  if (!profile || profile.conversionScore < 60) return null;
  
  return (
    <div className="smart-suggestions">
      {profile.recommendedEditais.length > 0 && (
        <Banner>
          💡 Editais que podem financiar seu projeto: {profile.recommendedEditais.join(', ')}
        </Banner>
      )}
      
      {profile.recommendedProjects.length > 0 && (
        <Section>
          <h3>Projetos que podem interessar você</h3>
          <ProjectGrid projects={profile.recommendedProjects} />
        </Section>
      )}
    </div>
  );
}
```

---

### Fase 4: Chatbot Inteligente (2 semanas)

**Arquivo:** `src/components/SmartChatbot.tsx` (novo)

```typescript
export function SmartChatbot() {
  const { profile } = usePersonalizedContent();
  const [isOpen, setIsOpen] = useState(false);
  
  // Só aparece se score alto
  useEffect(() => {
    if (profile?.conversionScore > 75 && !hasShownChatbot) {
      // Aguardar 10s antes de aparecer
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShownChatbot(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [profile]);

  // Mensagem personalizada baseada no perfil
  const initialMessage = useMemo(() => {
    if (!profile) return "Olá! Como posso ajudar?";
    
    if (profile.visitorType === 'GOVERNMENT') {
      return "Olá! Vi que você tem interesse em projetos culturais. Posso ajudar com editais e casos de sucesso?";
    }
    
    if (profile.visitorType === 'CURATOR') {
      return "Olá! Vi que você está explorando projetos de museus. Quer conhecer nossos cases de curadoria digital?";
    }
    
    return "Olá! Vi que você está interessado em nossos projetos. Posso ajudar?";
  }, [profile]);

  return (
    <Chatbot 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      initialMessage={initialMessage}
      profile={profile}
    />
  );
}
```

---

## 📈 SISTEMA DE SCORING AVANÇADO

### Cálculo de Score (Melhorado)

```typescript
export async function calculateAdvancedScore(session: SessionData): Promise<Score> {
  let score = 0;
  
  // 1. Comportamento (0-40 pontos)
  score += session.pagesVisited.length * 2; // +2 por página
  score += session.projectsViewed.length * 5; // +5 por projeto
  score += Math.min(session.timeOnSite / 60, 10); // +1 por minuto (max 10)
  score += session.scrollDepth > 80 ? 5 : 0; // +5 se rola até o final
  
  // 2. Interações (0-30 pontos)
  score += session.clicks.length * 2; // +2 por clique
  score += session.formInteractions.length * 10; // +10 por formulário
  score += session.chatbotInteractions.length * 5; // +5 por interação chatbot
  
  // 3. Análise IA (0-30 pontos)
  const aiAnalysis = await analyzeWithDeepSeek(session);
  score += aiAnalysis.engagementLevel * 10; // 0-3 → 0-30
  
  // 4. Perfil (0-20 pontos)
  if (isGovernmentIP(session.ipAddress)) score += 15;
  if (isCorporateEmail(session.email)) score += 10;
  if (isReturningVisitor(session.sessionId)) score += 5;
  
  return {
    total: Math.min(score, 100),
    breakdown: {
      behavior: score1,
      interactions: score2,
      aiAnalysis: score3,
      profile: score4,
    },
  };
}
```

---

## 🎯 ESTRATÉGIA DE POSICIONAMENTO

### Como Competir com Grandes Players

#### 1. **SEO Avançado (Aparecer Primeiro no Google)**

**Estratégia:**
- ✅ Conteúdo otimizado para palavras-chave específicas
- ✅ Schema.org markup (dados estruturados)
- ✅ Blog com conteúdo técnico (VR, AR, IA, Cultura)
- ✅ Cases de sucesso bem documentados
- ✅ Backlinks de qualidade

**Implementação:**
```typescript
// src/components/StructuredData.tsx
export function StructuredData({ project, profile }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.summary,
        "creator": {
          "@type": "Organization",
          "name": "Azimut",
          "url": "https://azmt.com.br"
        },
        // ... mais dados estruturados
      })}
    </script>
  );
}
```

#### 2. **Conteúdo de Autoridade**

**Estratégia:**
- Blog técnico sobre VR/AR/IA
- Guias completos (ex: "Guia Completo de Editais Culturais")
- Webinars e workshops
- Cases detalhados

**Resultado:**
- Google reconhece como autoridade
- Backlinks naturais
- Tráfego orgânico

#### 3. **Diferenciação vs Competidores**

| Feature | Dreams | DeepLab | Outros | **Azimut** |
|---------|--------|---------|--------|------------|
| IA de Captação | ❌ | ❌ | ❌ | ✅ **SIM** |
| Navegação Orientada | ❌ | ❌ | ❌ | ✅ **SIM** |
| Scoring Comportamental | ❌ | ❌ | ❌ | ✅ **SIM** |
| Personalização Dinâmica | ❌ | ❌ | ❌ | ✅ **SIM** |
| Chatbot Inteligente | ❌ | ❌ | ❌ | ✅ **SIM** |
| Foco em Cultura | ⚠️ | ⚠️ | ⚠️ | ✅ **TOTAL** |

---

## 🚀 ROADMAP DE IMPLEMENTAÇÃO

### Semana 1-2: Fundação
- [ ] Melhorar sistema de tracking
- [ ] Implementar análise IA básica
- [ ] Criar sistema de scoring

### Semana 3-4: Personalização
- [ ] Hook `usePersonalizedContent`
- [ ] Personalização de hero
- [ ] Reordenação de projetos

### Semana 5-6: Navegação Inteligente
- [ ] Componente `SmartNavigation`
- [ ] Sugestões contextuais
- [ ] Banner inteligente

### Semana 7-8: Chatbot Avançado
- [ ] Componente `SmartChatbot`
- [ ] Integração com perfil
- [ ] Mensagens personalizadas

### Semana 9-10: Otimização
- [ ] A/B testing
- [ ] Análise de resultados
- [ ] Ajustes finos

---

## 💡 PRÓXIMOS PASSOS IMEDIATOS

1. **Melhorar `ai-scoring.ts`** (já existe, expandir)
2. **Criar hook `usePersonalizedContent`**
3. **Implementar personalização básica em Home.tsx**
4. **Testar e iterar**

---

## 📊 MÉTRICAS DE SUCESSO

- **Taxa de conversão:** +50% (de 2% para 3%+)
- **Tempo no site:** +30%
- **Leads qualificados:** +100%
- **Score médio de leads:** +20 pontos
- **Posição no Google:** Top 3 para palavras-chave principais

---

**Este sistema é INÉDITO no mercado e nos colocará na frente de todos os competidores! 🚀**

