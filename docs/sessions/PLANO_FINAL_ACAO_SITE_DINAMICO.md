# 🚀 PLANO FINAL DE AÇÃO - Site Dinâmico Reativo

**Data:** 20 Janeiro 2026  
**Objetivo:** Implementar site dinâmico que observa comportamento e guia usuário facilmente

---

## 📋 RESUMO EXECUTIVO

### O que vamos fazer:
1. ✅ Sistema de tracking em tempo real (comportamento do usuário)
2. ✅ IA analisa comportamento e detecta intenção
3. ✅ Site adapta dinamicamente (submenu, cards, CTAs, scroll)
4. ✅ Guia usuário facilmente para onde ele quer ir

### Tecnologias:
- **IA:** DeepSeek (já no backoffice) + Claude (já no backoffice)
- **Tracking:** Sistema existente (`useUserTracking`, `analytics.ts`)
- **Frontend:** React + TypeScript + Tailwind
- **API:** Next.js API routes (backoffice)

---

## 🎯 FASE 1: INFRAESTRUTURA DE TRACKING (2-3 dias)

### 1.1 Ativar e Expandir Tracking Existente

**Arquivo:** `src/hooks/useBehaviorTracking.ts` (NOVO)

**O que fazer:**
- ✅ Criar hook que coleta comportamento em tempo real
- ✅ Integrar com `useUserTracking` existente
- ✅ Adicionar tracking de:
  - Categorias clicadas no submenu
  - Hover time em elementos específicos
  - Buscas realizadas
  - Elementos que chamam atenção

**Código base:**
```tsx
export function useBehaviorTracking() {
  const { trackInteraction } = useUserTracking()
  const [behavior, setBehavior] = useState({
    pagesVisited: [] as string[],
    projectsViewed: [] as string[],
    categoriesClicked: [] as string[],
    scrollDepth: 0,
    timeOnPage: 0,
    hoveredElements: new Map<string, number>()
  })

  // Coletar comportamento
  useEffect(() => {
    // ... implementação
  }, [])

  return behavior
}
```

**Checklist:**
- [ ] Criar `src/hooks/useBehaviorTracking.ts`
- [ ] Integrar com `useUserTracking` existente
- [ ] Testar tracking de categorias
- [ ] Testar tracking de hover time
- [ ] Testar tracking de buscas

---

### 1.2 Criar Hook de Detecção de Intenção

**Arquivo:** `src/hooks/useIntentionDetection.ts` (NOVO)

**O que fazer:**
- ✅ Coletar comportamento a cada 5s
- ✅ Enviar para IA quando há mudança significativa
- ✅ Receber intenção detectada
- ✅ Retornar intenção + confiança + ações sugeridas

**Código base:**
```tsx
export function useIntentionDetection() {
  const behavior = useBehaviorTracking()
  const [intention, setIntention] = useState<Intention | null>(null)

  useEffect(() => {
    if (behavior.timeOnPage < 5) return

    const analyzeIntention = async () => {
      const response = await fetch('/api/ai/analyze-intention', {
        method: 'POST',
        body: JSON.stringify({ behavior })
      })
      const data = await response.json()
      setIntention(data)
    }

    const interval = setInterval(analyzeIntention, 10000)
    analyzeIntention() // Primeira análise imediata

    return () => clearInterval(interval)
  }, [behavior])

  return { intention, behavior }
}
```

**Checklist:**
- [ ] Criar `src/hooks/useIntentionDetection.ts`
- [ ] Integrar com `useBehaviorTracking`
- [ ] Testar análise de intenção
- [ ] Testar atualização em tempo real

---

### 1.3 Criar API Endpoint de Análise de Intenção

**Arquivo:** `azimut-cms/app/api/ai/analyze-intention/route.ts` (NOVO)

**O que fazer:**
- ✅ Receber comportamento do frontend
- ✅ Enviar para DeepSeek/Claude (usar `getAIProvider` existente)
- ✅ Analisar e retornar intenção em JSON
- ✅ Cachear resultados (evitar chamadas repetidas)

**Código base:**
```tsx
import { NextRequest, NextResponse } from 'next/server'
import { getAIProvider } from '@/src/lib/ai-provider'

export async function POST(request: NextRequest) {
  const { behavior } = await request.json()

  const prompt = `Analise comportamento e detecte intenção:
${JSON.stringify(behavior, null, 2)}

Responda JSON:
{
  "intention": "interested_in_museums",
  "confidence": 0.85,
  "suggestedAction": "section-cultura",
  "personalizedCTA": "Ver Projetos Culturais",
  "highlightElements": ["section-cultura"]
}`

  const ai = getAIProvider()
  const response = await ai.chat([{ role: 'user', content: prompt }])
  const intention = JSON.parse(response.content)

  return NextResponse.json(intention)
}
```

**Checklist:**
- [ ] Criar `azimut-cms/app/api/ai/analyze-intention/route.ts`
- [ ] Integrar com `getAIProvider` (DeepSeek/Claude)
- [ ] Testar análise de comportamento
- [ ] Adicionar cache (opcional)
- [ ] Testar erro handling

---

## 🎨 FASE 2: COMPONENTES REATIVOS (3-4 dias)

### 2.1 Submenu Reativo

**Arquivo:** `src/pages/Work.tsx`

**O que fazer:**
- ✅ Destacar categoria baseado em intenção detectada
- ✅ Badge ⭐ aparece com animação
- ✅ Botão cresce sutilmente (scale 1.05)
- ✅ Transição suave

**Checklist:**
- [ ] Integrar `useIntentionDetection` em `Work.tsx`
- [ ] Adicionar lógica de destaque de categoria
- [ ] Adicionar badge ⭐ animado
- [ ] Adicionar animação de scale
- [ ] Testar responsividade

---

### 2.2 Banner de Sugestão Dinâmico

**Arquivo:** `src/components/DynamicSuggestionBanner.tsx` (NOVO)

**O que fazer:**
- ✅ Aparece quando IA detecta interesse claro (confidence > 0.7)
- ✅ Mostra sugestão personalizada
- ✅ Fade-in suave
- ✅ Auto-hide após 8s (ou click)
- ✅ Não invasivo (canto superior)

**Checklist:**
- [ ] Criar `src/components/DynamicSuggestionBanner.tsx`
- [ ] Adicionar fade-in animation
- [ ] Adicionar auto-hide
- [ ] Testar em diferentes temas (claro/escuro)
- [ ] Testar responsividade mobile

---

### 2.3 Cards Reativos

**Arquivo:** `src/components/ProjectCard.tsx` (atualizar existente ou criar novo)

**O que fazer:**
- ✅ Projetos relevantes aparecem primeiro (order: -1)
- ✅ Crescem sutilmente (scale 1.05)
- ✅ Badge "Recomendado para você" aparece
- ✅ Hover effect mais pronunciado
- ✅ Video preview automático ao hover

**Checklist:**
- [ ] Atualizar `ProjectCard.tsx` ou criar novo
- [ ] Adicionar prop `isRecommended`
- [ ] Adicionar badge "Recomendado"
- [ ] Adicionar hover 3D (se não existir)
- [ ] Adicionar video preview ao hover
- [ ] Testar performance

---

### 2.4 Auto-Scroll Inteligente

**Arquivo:** `src/pages/Work.tsx`

**O que fazer:**
- ✅ IA detecta interesse claro (confidence > 0.8)
- ✅ Após 15s na página, scroll automático suave para seção relevante
- ✅ Banner aparece: "Você pode se interessar por projetos culturais"

**Checklist:**
- [ ] Adicionar lógica de auto-scroll em `Work.tsx`
- [ ] Adicionar delay de 15s
- [ ] Testar scroll suave
- [ ] Testar em diferentes seções
- [ ] Adicionar opção de desabilitar (user preference)

---

### 2.5 CTAs Dinâmicos

**Arquivo:** `src/components/PageNavigationCTAs.tsx` (NOVO)

**O que fazer:**
- ✅ CTA muda baseado em intenção detectada
- ✅ Se interesse em museus → "Ver Projetos Culturais"
- ✅ Se interesse em VR → "Explorar VR & XR"
- ✅ Se hot lead → "Falar com Especialista"
- ✅ Se comportamento indica dúvida → "Precisa de Ajuda?"

**Checklist:**
- [ ] Criar `src/components/PageNavigationCTAs.tsx`
- [ ] Adicionar lógica de personalização
- [ ] Adicionar dois botões (primário + secundário)
- [ ] Testar diferentes cenários
- [ ] Integrar em `Work.tsx` e outras páginas

---

### 2.6 Filtros Inteligentes

**Arquivo:** `src/pages/Work.tsx`

**O que fazer:**
- ✅ Toggle "Mostrar apenas recomendados" aparece automaticamente
- ✅ Grid reordena: projetos relevantes primeiro
- ✅ Filtros relevantes aparecem destacados

**Checklist:**
- [ ] Adicionar toggle "Mostrar apenas recomendados"
- [ ] Adicionar lógica de reordenação
- [ ] Testar filtros combinados
- [ ] Testar performance com muitos projetos

---

## 🔗 FASE 3: INTEGRAÇÃO COMPLETA (2-3 dias)

### 3.1 Integrar Tudo em Work.tsx

**O que fazer:**
- ✅ Importar todos os hooks e componentes
- ✅ Integrar tracking + detecção + adaptação
- ✅ Testar fluxo completo
- ✅ Ajustar performance

**Checklist:**
- [ ] Importar `useIntentionDetection`
- [ ] Importar `DynamicSuggestionBanner`
- [ ] Importar `PageNavigationCTAs`
- [ ] Integrar submenu reativo
- [ ] Integrar cards reativos
- [ ] Integrar auto-scroll
- [ ] Integrar CTAs dinâmicos
- [ ] Testar fluxo completo
- [ ] Otimizar performance

---

### 3.2 Testar e Ajustar

**O que fazer:**
- ✅ Testar em diferentes cenários
- ✅ Ajustar timings (quando aparece banner, quando faz scroll)
- ✅ Ajustar confiança mínima (quando destacar categoria)
- ✅ Testar em mobile
- ✅ Testar em diferentes temas

**Checklist:**
- [ ] Testar usuário interessado em museus
- [ ] Testar usuário interessado em VR
- [ ] Testar usuário perdido (muito tempo, pouco scroll)
- [ ] Testar hot lead (muitas páginas, muito tempo)
- [ ] Testar mobile
- [ ] Testar tema claro/escuro
- [ ] Ajustar timings baseado em feedback

---

## 📊 FASE 4: EXPANSÃO (Opcional - Futuro)

### 4.1 Expandir para Outras Páginas

**Páginas candidatas:**
- `Home.tsx` - Personalizar hero baseado em interesse
- `WhatWeDo.tsx` - Destacar soluções relevantes
- `Studio.tsx` - Personalizar apresentação do estúdio
- `Academy.tsx` - Sugerir cursos baseado em interesse

### 4.2 Chatbot Inteligente

**O que fazer:**
- ✅ Ativar `ClaudeAssistant` existente
- ✅ Aparece quando usuário parece perdido
- ✅ Sugere projetos baseado em interesse
- ✅ Guia para próximas páginas

### 4.3 Analytics Avançado

**O que fazer:**
- ✅ Dashboard de intenções detectadas
- ✅ Taxa de conversão por intenção
- ✅ A/B testing de CTAs
- ✅ Heatmap de comportamento

---

## 🎯 ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

### Semana 1: Infraestrutura
1. **Dia 1-2:** Criar `useBehaviorTracking.ts` e expandir tracking
2. **Dia 3:** Criar `useIntentionDetection.ts`
3. **Dia 4-5:** Criar API endpoint `/api/ai/analyze-intention`

### Semana 2: Componentes
1. **Dia 1-2:** Submenu reativo + Banner de sugestão
2. **Dia 3-4:** Cards reativos + Auto-scroll
3. **Dia 5:** CTAs dinâmicos + Filtros inteligentes

### Semana 3: Integração
1. **Dia 1-3:** Integrar tudo em `Work.tsx`
2. **Dia 4-5:** Testar, ajustar, otimizar

---

## ✅ CHECKLIST FINAL

### Infraestrutura
- [ ] `useBehaviorTracking.ts` criado e testado
- [ ] `useIntentionDetection.ts` criado e testado
- [ ] API `/api/ai/analyze-intention` criada e testada
- [ ] Integração com DeepSeek/Claude funcionando

### Componentes
- [ ] Submenu reativo funcionando
- [ ] Banner de sugestão funcionando
- [ ] Cards reativos funcionando
- [ ] Auto-scroll funcionando
- [ ] CTAs dinâmicos funcionando
- [ ] Filtros inteligentes funcionando

### Integração
- [ ] Tudo integrado em `Work.tsx`
- [ ] Fluxo completo testado
- [ ] Performance otimizada
- [ ] Mobile testado
- [ ] Temas testados

---

## 🚀 PRÓXIMOS PASSOS

1. **Começar Fase 1:** Criar `useBehaviorTracking.ts`
2. **Testar API:** Verificar se DeepSeek/Claude estão acessíveis do frontend
3. **Implementar gradualmente:** Uma funcionalidade por vez
4. **Testar em produção:** Deploy incremental

---

## 📝 NOTAS IMPORTANTES

### APIs de IA Disponíveis:
- ✅ **DeepSeek:** Já configurado no backoffice (`azimut-cms/src/lib/ai-provider.ts`)
- ✅ **Claude:** Já configurado no backoffice (`azimut-cms/src/lib/ai-provider.ts`)
- ⚠️ **Verificar:** Se APIs estão acessíveis do frontend (pode precisar criar proxy)

### Performance:
- ⚠️ **Cuidado:** Análise de intenção a cada 10s pode ser pesada
- ✅ **Solução:** Cachear resultados, analisar apenas quando comportamento muda significativamente

### Privacidade:
- ✅ **LGPD:** Tracking anônimo (sem dados pessoais)
- ✅ **Transparência:** Informar usuário sobre personalização (opcional)

---

**Status:** 🟢 Pronto para começar  
**Prioridade:** Alta  
**Estimativa:** 2-3 semanas
