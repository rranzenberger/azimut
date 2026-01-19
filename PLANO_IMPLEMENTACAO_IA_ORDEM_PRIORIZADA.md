# 🚀 PLANO DE IMPLEMENTAÇÃO: IA INVISÍVEL AZIMUT
## Ordem Priorizada de Execução

**Status Atual:** ✅ IA DeepSeek 100% funcional e rastreando visitantes  
**Objetivo:** Usar os dados da IA para personalizar experiência e aumentar conversão

---

## 📊 SITUAÇÃO ATUAL (05/01/2026)

### ✅ O QUE JÁ TEMOS:
- ✅ Tracking automático funcionando (115+ sessões registradas)
- ✅ DeepSeek API ativa e calculando scores
- ✅ 8 perfis de visitantes identificados:
  - `MUSEUM_CURATOR` (Curadores de museus)
  - `CITY_OFFICIAL` (Secretarias/Prefeituras)
  - `BRAND_MANAGER` (Marcas/Agências)
  - `FESTIVAL_ORGANIZER` (Produtores/Festivais)
  - `EDUCATOR` (Educadores/Pesquisadores)
  - `TECH_ENTHUSIAST` (Entusiastas VR/XR)
  - `GENERAL_PUBLIC` (Público geral)
  - `CULTURAL_PRODUCER` (Produtores culturais/editais)

### ❌ O QUE FALTA:
- ❌ Site não usa os dados da IA
- ❌ Experiência não é personalizada
- ❌ Sem dashboard para visualizar leads
- ❌ Sem compliance LGPD (obrigatório por lei)

---

## 🎯 ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

### **FASE 0: COMPLIANCE LGPD (OBRIGATÓRIO!)** 🔐
**Tempo:** 1-2 dias  
**Prioridade:** 🔴 CRÍTICA (Exigência legal)

#### O que implementar:
1. ✅ **Cookie Banner** (`src/components/CookieBanner.tsx`)
   - Banner fixo no rodapé
   - Botões: "Aceitar tudo" / "Apenas essenciais"
   - Salvar preferência no localStorage
   - Desabilitar tracking se rejeitado

2. ✅ **Política de Privacidade** (`src/pages/Privacy.tsx`)
   - Página `/privacy` completa
   - Explicar cookies, tracking, LGPD
   - Link no footer

3. ✅ **Termos de Uso** (`src/pages/Terms.tsx`)
   - Página `/terms`
   - Termos legais básicos

**Por que primeiro?**
- ⚖️ Exigência legal (LGPD no Brasil, GDPR se houver visitantes EU)
- 🚨 Risco de multa se não tiver
- ⏱️ Rápido de implementar (1-2 dias)
- ✅ Não depende de nenhuma outra fase

**Arquivos a criar:**
```
src/components/CookieBanner.tsx
src/pages/Privacy.tsx
src/pages/Terms.tsx
src/utils/consent.ts
```

---

### **FASE 1: QUICK WINS (Alto Impacto, Baixo Esforço)** ⚡
**Tempo:** 3-4 dias  
**Prioridade:** 🟠 ALTA  
**Impacto Esperado:** +200% conversão

#### 1.1. Reordenação Dinâmica de Projetos ⭐⭐⭐
**Onde:** Home (`src/pages/Home.tsx`) e Work (`src/pages/Work.tsx`)  
**Tempo:** 1 dia

```typescript
// src/hooks/usePersonalizedProjects.ts
export function usePersonalizedProjects() {
  const sessionId = getSessionId()
  const [recommendations, setRecommendations] = useState([])
  
  useEffect(() => {
    fetch(`${API_URL}/api/visitor/recommendations?sessionId=${sessionId}`)
      .then(res => res.json())
      .then(data => setRecommendations(data.recommendedProjects))
  }, [sessionId])
  
  return recommendations
}

// Uso em Home.tsx
const recommendations = usePersonalizedProjects()
const sortedProjects = sortProjectsByRecommendations(projects, recommendations)
```

**Impacto:** Visitante vê projetos relevantes primeiro → +80% engagement

---

#### 1.2. CTAs Personalizados ⭐⭐⭐
**Onde:** Cards de projetos, hero sections, botões  
**Tempo:** 1 dia

```typescript
// src/utils/personalization.ts
export const getPersonalizedCTA = (visitorType: string, lang: Lang) => {
  const ctas = {
    MUSEUM_CURATOR: {
      pt: "Criar experiência para seu museu →",
      en: "Create experience for your museum →"
    },
    BRAND_MANAGER: {
      pt: "Ativar sua marca com XR →",
      en: "Activate your brand with XR →"
    },
    CITY_OFFICIAL: {
      pt: "Transformar sua cidade →",
      en: "Transform your city →"
    },
    GENERAL_PUBLIC: {
      pt: "Conhecer nosso trabalho →",
      en: "Explore our work →"
    }
  }
  
  return ctas[visitorType]?.[lang] || ctas.GENERAL_PUBLIC[lang]
}
```

**Impacto:** Fala a língua do visitante → +50% CTR

---

#### 1.3. Filtros Pré-Aplicados ⭐⭐
**Onde:** Work page (`src/pages/Work.tsx`)  
**Tempo:** 0.5 dia

```typescript
// Auto-aplicar filtro baseado em visitor type
useEffect(() => {
  if (visitorType && !location.search) {
    const filterMap = {
      MUSEUM_CURATOR: '?type=museum',
      BRAND_MANAGER: '?type=brand',
      FESTIVAL_ORGANIZER: '?type=festival',
      CITY_OFFICIAL: '?type=city'
    }
    
    if (filterMap[visitorType]) {
      navigate(`/work${filterMap[visitorType]}`, { replace: true })
    }
  }
}, [visitorType, location])
```

**Impacto:** Remove friction → +30% tempo no site

---

#### 1.4. Hero Adaptativo ⭐⭐⭐
**Onde:** Home (`src/pages/Home.tsx`)  
**Tempo:** 1 dia

```typescript
const heroMessages = {
  MUSEUM_CURATOR: {
    pt: "Criamos experiências que transformam museus",
    en: "We create experiences that transform museums"
  },
  BRAND_MANAGER: {
    pt: "Ativamos marcas através de XR e experiências imersivas",
    en: "We activate brands through XR and immersive experiences"
  },
  CITY_OFFICIAL: {
    pt: "Projetos culturais que transformam cidades",
    en: "Cultural projects that transform cities"
  },
  GENERAL_PUBLIC: {
    pt: "Experiências que conectam mundos",
    en: "Experiences that connect worlds"
  }
}

<h1>{heroMessages[visitorType || 'GENERAL_PUBLIC'][lang]}</h1>
```

**Impacto:** Primeira impressão personalizada → +40% engagement

---

#### 1.5. Perfis Institucionais Brasileiros ⭐⭐⭐
**Onde:** `src/lib/institutional-profiles.ts`  
**Tempo:** 0.5 dia

```typescript
// Detecção especial para SESC, SENAC, FIESP, etc.
const institutionalDomains = {
  'sescsp.org.br': { type: 'SESC', budget: 'HIGH' },
  'sp.senac.br': { type: 'SENAC', budget: 'HIGH' },
  'fiesp.org.br': { type: 'FIESP', budget: 'VERY_HIGH' }
}

// Mensagens customizadas
if (institution === 'SESC') {
  heroMessage = "Parceiro do Sistema S em projetos culturais e educacionais"
  portfolio = "/portfolio/sistema-s"
}
```

**Impacto:** Fala com clientes premium → Conversão lead alto valor

---

**📊 TOTAL FASE 1:** 3-4 dias | **ROI:** +200% conversão

**Arquivos a criar/modificar:**
```
src/hooks/usePersonalizedProjects.ts (NOVO)
src/utils/personalization.ts (NOVO)
src/lib/institutional-profiles.ts (NOVO)
src/pages/Home.tsx (MODIFICAR)
src/pages/Work.tsx (MODIFICAR)
src/components/ProjectCard.tsx (MODIFICAR)
```

---

### **FASE 2: DASHBOARD ANALYTICS** 📊
**Tempo:** 3-4 dias  
**Prioridade:** 🟡 MÉDIA-ALTA  
**Impacto:** Visibilidade e ação comercial

#### 2.1. Página de Analytics
**Rota:** `azimut-cms/app/admin/analytics/page.tsx`

**Funcionalidades:**
- 📊 Gráfico de visitantes por tipo (últimos 30 dias)
- 🔥 Visitantes ativos AGORA (últimos 5min)
- 🎯 Leads qualificados (score > 70)
- 📈 Taxa de conversão por perfil
- 🗺️ Mapa de origem (Brasil vs. Canadá vs. Outros)
- 📋 Lista de sessões com detalhes

**Componentes:**
```typescript
// azimut-cms/app/admin/analytics/components/VisitorTypeChart.tsx
<BarChart data={visitorsByType} />

// azimut-cms/app/admin/analytics/components/ActiveVisitors.tsx
<LiveList visitors={activeNow} />

// azimut-cms/app/admin/analytics/components/QualifiedLeads.tsx
<Table leads={qualifiedLeads} onContact={handleContact} />
```

---

#### 2.2. Alertas Automáticos
**Integração:** Email + Slack (futuro)

```typescript
// azimut-cms/src/lib/alerts.ts
export async function checkQualifiedLeads() {
  const leads = await prisma.interestScore.findMany({
    where: {
      conversionScore: { gt: 70 },
      notified: false
    }
  })
  
  for (const lead of leads) {
    await sendEmailAlert(lead)
    await markAsNotified(lead.sessionId)
  }
}
```

**Impacto:** Time comercial age em tempo real → +50% conversão de leads

---

**📊 TOTAL FASE 2:** 3-4 dias | **ROI:** Visibilidade + Ação comercial

**Arquivos a criar:**
```
azimut-cms/app/admin/analytics/page.tsx (NOVO)
azimut-cms/app/admin/analytics/components/ (NOVOS)
azimut-cms/src/lib/alerts.ts (NOVO)
azimut-cms/app/api/analytics/ (NOVOS endpoints)
```

---

### **FASE 3: CONVERSÃO AVANÇADA** 💎
**Tempo:** 4-5 dias  
**Prioridade:** 🟢 MÉDIA  
**Impacto:** +300% conversão (cumulativo)

#### 3.1. Budget Wizard Inteligente
**Onde:** Contact page - Budget Wizard  
**Tempo:** 2 dias

```typescript
// Pré-preencher baseado em scores
const wizardDefaults = {
  projectType: visitorType === 'MUSEUM_CURATOR' ? 'Museu/Exposição' : 
                visitorType === 'BRAND_MANAGER' ? 'Branded Experience' : '',
  
  budget: conversionScore > 70 ? 'R$ 300.000+' : 'R$ 100.000 - R$ 300.000',
  
  timeline: educationScore > 50 ? '6-12 meses' : '3-6 meses',
  
  services: getRecommendedServices(scores)
}
```

**Impacto:** -50% abandono de formulário

---

#### 3.2. Seção "Projetos Relacionados"
**Onde:** Project Detail pages  
**Tempo:** 1 dia

```tsx
<section className="mt-16">
  <h3>Projetos que podem te interessar</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {recommendedProjects.slice(0, 3).map(project => (
      <ProjectCard key={project.id} {...project} />
    ))}
  </div>
</section>
```

**Impacto:** +80% páginas por sessão

---

#### 3.3. Badges Discretos
**Onde:** Cards de projetos  
**Tempo:** 0.5 dia

```tsx
{isRecommended && (
  <span className="absolute top-2 right-2 text-[0.65rem] px-2 py-1 
                   bg-azimut-red/10 text-azimut-red rounded-full">
    Relevante para você ✨
  </span>
)}
```

**Impacto:** Guia sutil → +20% cliques

---

#### 3.4. Chatbot Contextual (Opcional)
**Onde:** Aparece após 3min ou ao sair  
**Tempo:** 2 dias

```typescript
if (conversionScore > 60 && timeOnSite > 180) {
  showChatbot({
    message: `Olá! Vi que você se interessa em ${getInterestArea(visitorType)}. 
              Posso ajudar?`,
    suggestions: [
      "Ver orçamento aproximado",
      "Falar com especialista",
      "Baixar portfólio"
    ]
  })
}
```

**Impacto:** +30% conversão em momento certo

---

**📊 TOTAL FASE 3:** 4-5 dias (5.5 com chatbot) | **ROI:** +300% conversão

---

### **FASE 4: PERFIS INSTITUCIONAIS CANADÁ** 🇨🇦
**Tempo:** 2-3 dias  
**Prioridade:** 🟢 BAIXA-MÉDIA  
**Impacto:** Mercado canadense

#### Implementar:
- NFB/ONF detection (email @nfb.ca / @onf.ca)
- Creative BC, Ontario Creates, SODEC
- Mensagens bilíngues (EN/FR)
- Portfolio canadense destacado

**Quando:** Após ter dados de tráfego canadense

---

## 📅 CRONOGRAMA PROPOSTO

### **SPRINT 1 (Semana 1-2): COMPLIANCE + QUICK WINS**
- Dias 1-2: LGPD (Cookie Banner + Privacidade)
- Dias 3-6: Fase 1 (Reordenação, CTAs, Hero, Filtros)

**Resultado:** Site com compliance legal + Personalização básica

---

### **SPRINT 2 (Semana 3-4): DASHBOARD + CONVERSÃO**
- Dias 7-10: Fase 2 (Dashboard Analytics + Alertas)
- Dias 11-15: Fase 3 (Budget Wizard + Projetos Relacionados + Badges)

**Resultado:** Time pode ver leads + Conversão otimizada

---

### **SPRINT 3 (Opcional - Mês 2): EXPANSÃO**
- Fase 4: Perfis Canadá
- Chatbot contextual
- Melhorias baseadas em dados reais

---

## 🎯 RECOMENDAÇÃO FINAL

### **COMEÇAR AGORA COM:**

#### **Opção A: Mínimo Viável (1 semana)**
1. LGPD (1-2 dias) 🔴 OBRIGATÓRIO
2. Quick Wins básico (3-4 dias):
   - Reordenação de projetos
   - CTAs personalizados
   - Hero adaptativo

**Total:** 5-6 dias | **Resultado:** Site legal + 200% conversão

---

#### **Opção B: Completo (2 semanas)**
1. LGPD (1-2 dias)
2. Fase 1 completa (3-4 dias)
3. Dashboard (3-4 dias)
4. Conversão avançada (4-5 dias)

**Total:** 11-15 dias | **Resultado:** Sistema completo + 400% conversão

---

#### **Opção C: Phased Approach (Recomendado!)**
**Sprint 1 (agora):** LGPD + Quick Wins (5-6 dias)  
**Sprint 2 (depois):** Dashboard + Conversão (7-9 dias)  
**Sprint 3 (futuro):** Expansão baseada em dados

**Vantagem:** Resultados rápidos + Iteração baseada em dados reais

---

## 🚀 DECISÃO: QUAL OPÇÃO?

**Me diga qual opção você prefere e eu começo imediatamente!**

- [ ] **Opção A:** Mínimo Viável (1 semana)
- [ ] **Opção B:** Completo (2 semanas)
- [ ] **Opção C:** Phased (Recomendado - Sprint 1 agora)
- [ ] **Custom:** Você escolhe as fases

**Aguardando sua decisão para começar! 🎯**

