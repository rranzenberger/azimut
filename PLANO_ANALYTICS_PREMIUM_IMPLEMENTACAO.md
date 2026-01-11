# 🚀 PLANO DE IMPLEMENTAÇÃO - ANALYTICS PREMIUM

**Data:** 11/01/2026  
**Status:** 🔄 Em Implementação

---

## 📊 ANÁLISE DO SISTEMA ATUAL

### ✅ O que já temos:
1. **Tracking de Page Views** (`src/utils/analytics.ts`)
   - SessionId por sessão
   - Visitor Fingerprint (anônimo)
   - Device Type, Browser, OS
   - Screen Resolution
   - Time Spent, Scroll Depth

2. **Dashboard Analytics** (`azimut-cms/app/admin/analytics/`)
   - Cards com métricas principais
   - Gráficos (Score, Tipos, Países, Timeline)
   - Tabelas (Visitantes, Lead Candidates, Sessões)
   - Botão de limpeza de dados de teste

3. **Gráficos Existentes:**
   - CountryChart.tsx
   - ScoreDistributionChart.tsx
   - TimelineChart.tsx
   - VisitorTypesChart.tsx

---

## 🌟 MELHORIAS PREMIUM A IMPLEMENTAR

### FASE 1: Alto Impacto Imediato (Esta Semana)

#### 1. ⏱️ REAL-TIME DASHBOARD
**O que fazer:**
- Adicionar contador "X visitantes online agora" no topo
- Polling a cada 30 segundos para atualizar
- Lista de páginas sendo vistas ao vivo

**Arquivos a criar/editar:**
- `azimut-cms/app/api/admin/analytics/realtime/route.ts` (nova API)
- `azimut-cms/app/admin/analytics/components/RealTimeCounter.tsx` (novo)
- Atualizar `page.tsx` para incluir componente

#### 2. 🎯 FUNIL DE CONVERSÃO VISUAL
**O que fazer:**
- Gráfico de funil: Home → Projetos → About → Contato/Academy
- Mostrar drop-off em cada etapa
- Calcular taxa de conversão

**Arquivos a criar/editar:**
- `azimut-cms/app/admin/analytics/components/ConversionFunnel.tsx` (novo)
- `azimut-cms/app/api/admin/analytics/funnel/route.ts` (nova API)

#### 3. 🌍 MAPA INTERATIVO DE VISITANTES
**O que fazer:**
- Mapa mundial com círculos por país
- Tooltip com detalhes ao hover
- Animação de entrada

**Arquivos a criar/editar:**
- `azimut-cms/app/admin/analytics/components/WorldMap.tsx` (novo)
- Usar biblioteca simples (react-simple-maps ou SVG puro)

---

### FASE 2: Alertas e Inteligência (Próxima Semana)

#### 4. 🤖 ALERTAS INTELIGENTES
**O que fazer:**
- Detectar hot leads automaticamente
- Notificação quando score > 80%
- Email/webhook para leads quentes

**Arquivos a criar/editar:**
- `azimut-cms/app/api/admin/alerts/route.ts`
- Sistema de notificações no dashboard

#### 5. 🔥 HEATMAP DE CLIQUES
**O que fazer:**
- Rastrear cliques (x, y) no frontend
- Gerar overlay visual de calor
- Mostrar zonas mais clicadas

**Arquivos a criar/editar:**
- `src/utils/clickTracking.ts` (novo)
- API para receber dados de cliques
- Componente de visualização

---

### FASE 3: Avançado (Futuro)

- 📹 Session Recording
- 🔮 Previsão AI
- 📊 Cohort Analysis
- 🎭 A/B Testing
- 📧 Integração CRM

---

## 🔄 COMEÇANDO IMPLEMENTAÇÃO

**Ordem de implementação:**
1. ✅ Real-Time Counter (simples, alto impacto)
2. ✅ Funil de Conversão
3. ✅ Mapa de Visitantes

**Iniciando agora...**
