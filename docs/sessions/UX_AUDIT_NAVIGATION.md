# 🎨 ANÁLISE UX/UI - AZIMUT SITE
## AUDITORIA COMPLETA DE CONSISTÊNCIA VISUAL

**Data:** 02/01/2026  
**Objetivo:** Padronizar navegação e experiência em todas as páginas

---

## 🔴 PROBLEMAS IDENTIFICADOS

### 1. **Navegação Interna Inconsistente**

#### Academy (`/academy`)
- **Estilo:** Abas horizontais com texto
- **Visual:** Linha vermelha embaixo da aba ativa
- **Hover:** Fundo transparente
- **Ícones:** ❌ Não tem

#### Studio (`/studio`)
- **Estilo:** Botões com ícones
- **Visual:** Fundo com cor quando ativo
- **Hover:** Escala + cor
- **Ícones:** ✅ Sim (✨, 👥, 🏆)

#### Work (`/work`)
- **Estilo:** Abas com ícones grandes
- **Visual:** Background gradient quando ativo
- **Hover:** Glow effect
- **Ícones:** ✅ Sim (◆, 🏛️, 🎪, 🎨, 📦)
- **Extra:** Filtros dropdown separados

#### Solutions (`/what`)
- **Estilo:** Lista vertical de links
- **Visual:** Border + padding
- **Hover:** Background change
- **Ícones:** ✅ Sim (✦, 🎬, 🎨, 🥽, 🤖, 📚)

### ❌ **PROBLEMA:** Cada página usa um padrão diferente!

---

## 🌟 SITES DE REFERÊNCIA (Benchmark)

### 1. **Awwwards Winners - Padrões Observados:**

**The Mill** (themill.com)
- ✅ Navegação fixa no topo sempre igual
- ✅ Subnavegação sempre com mesmo estilo
- ✅ Transições suaves entre páginas
- ✅ Sistema de filtros consistente

**MediaMonks** (mediamonks.com)
- ✅ Tabs horizontais em TODAS as páginas
- ✅ Mesmo estilo de hover em todo site
- ✅ Ícones opcionais mas consistentes
- ✅ Grid system padronizado

**Resn** (resn.co.nz)
- ✅ Navegação minimalista
- ✅ Mesmo componente reutilizado
- ✅ Micro-interações consistentes
- ✅ Hierarquia visual clara

### 2. **Princípios UX Universais:**

**Jakob's Law** (Nielsen Norman Group):
> "Usuários passam mais tempo em OUTROS sites. Eles preferem que SEU site funcione da mesma forma."

**Hick's Law**:
> "Quanto mais escolhas, mais tempo para decidir. Simplifique!"

**Lei da Pregnância (Gestalt)**:
> "Elementos similares devem parecer similares. Elementos diferentes devem parecer diferentes."

---

## ✅ PROPOSTA DE PADRONIZAÇÃO

### 🎯 **Sistema Único de Navegação Interna**

#### **Componente: `InternalNav` (Padrão Universal)**

**Visual Proposto:**

```
┌─────────────────────────────────────────────────────────┐
│  [🏠 Overview]  [📊 Section 1]  [🎨 Section 2]  [🚀 More] │
│  ═══════════                                             │
└─────────────────────────────────────────────────────────┘
```

**Características:**
- ✅ Ícone + Texto sempre
- ✅ Linha vermelha (#c92337) embaixo quando ativo
- ✅ Mesmo hover em todas as páginas
- ✅ Mesmo spacing (gap-4)
- ✅ Mesmo border-bottom
- ✅ Mesmo texto size (text-sm)
- ✅ Mesmo tracking (tracking-[0.1em])

---

## 📐 DESIGN TOKENS PROPOSTOS

### **Navegação Interna**

```css
/* Tokens - Usar em TODAS as páginas */
--nav-gap: 1rem;                    /* gap-4 */
--nav-padding: 0.75rem 1.25rem;     /* px-5 py-3 */
--nav-border-width: 2px;
--nav-border-color: #c92337;
--nav-text-size: 0.875rem;          /* text-sm */
--nav-text-weight: 600;             /* font-semibold */
--nav-tracking: 0.1em;
--nav-transition: all 0.2s ease;
--nav-hover-bg: rgba(255,255,255,0.05);
--nav-active-bg: rgba(201,35,55,0.1);
```

### **Estados**

```typescript
// Normal
color: var(--theme-text-secondary)
opacity: 0.7

// Hover
color: var(--theme-text)
opacity: 1
background: var(--nav-hover-bg)

// Active
color: #c92337
opacity: 1
background: var(--nav-active-bg)
border-bottom: 2px solid #c92337
```

---

## 🔧 IMPLEMENTAÇÃO

### **Fase 1: Criar Componente Universal**

Arquivo: `src/components/InternalNavigation.tsx`

**Props:**
```typescript
interface NavItem {
  id: string          // Para scroll/hash
  label: string       // Texto
  icon?: string       // Emoji opcional
  badge?: number      // Badge opcional (ex: "3 novos")
}

interface InternalNavigationProps {
  items: NavItem[]
  defaultActive?: string
  variant?: 'tabs' | 'pills' | 'minimal'  // 3 variantes
}
```

### **Fase 2: Aplicar em TODAS as Páginas**

- ✅ Home: Não precisa (é landing)
- ✅ Solutions (/what): Substituir navegação atual
- ✅ Work (/work): Padronizar + manter filtros
- ✅ Studio (/studio): Padronizar
- ✅ Academy (/academy): Padronizar

### **Fase 3: Filtros Secundários**

Para páginas como Work que precisam de filtros:

```
┌─────────────────────────────────────────────────┐
│  [🏠 All]  [🏛️ Museums]  [🎪 Festivals]  [🎨 VR] │  ← Navegação
│  ═════                                           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🔍 Search   |  🏷️ Tags ▼  |  📁 Type ▼  |  📅 Year ▼ │  ← Filtros
└─────────────────────────────────────────────────┘
```

**Separar navegação de filtros!**

---

## 🎨 VARIANTES PROPOSTAS

### **Variante 1: TABS (Recomendado para Azimut)**

```
[Icon + Text] [Icon + Text] [Icon + Text]
──────────
```
- Melhor para desktop + mobile
- Mais profissional
- Usado por: MediaMonks, The Mill

### **Variante 2: PILLS**

```
[Icon + Text] [Icon + Text] [Icon + Text]
  rounded      rounded      rounded
```
- Mais moderno
- Melhor para muitos itens
- Usado por: Vercel, Stripe

### **Variante 3: MINIMAL**

```
Icon Text  Icon Text  Icon Text
─────
```
- Mais clean
- Melhor para conteúdo denso
- Usado por: Apple, Resn

---

## 📊 MÉTRICAS DE SUCESSO

### **Antes (Atual):**
- ❌ 4 estilos diferentes
- ❌ Confusão visual
- ❌ Retrabalho em manutenção
- ❌ Experiência fragmentada

### **Depois (Proposta):**
- ✅ 1 componente reutilizável
- ✅ Consistência 100%
- ✅ Manutenção fácil
- ✅ Experiência profissional
- ✅ Acessibilidade melhorada

---

## 🚀 PRÓXIMOS PASSOS

1. **Criar `InternalNavigation.tsx`** — Componente universal
2. **Refatorar Academy** — Primeira página
3. **Refatorar Studio** — Segunda página
4. **Refatorar Work** — Terceira página (+ filtros)
5. **Refatorar Solutions** — Quarta página
6. **Documentar no Storybook** — Para equipe

---

## 💡 RECOMENDAÇÃO FINAL

**Usar TABS (Variante 1)** para Azimut porque:

✅ Funciona em mobile e desktop  
✅ É o padrão da indústria  
✅ Acessível para todos os públicos  
✅ Profissional e moderno  
✅ Fácil de entender para leigos  
✅ Flexível para adicionar ícones  

**Estilo visual:**
- Linha vermelha embaixo (active)
- Hover sutil (background)
- Ícones + texto sempre
- Mesmo em TODAS as páginas

---

**Posso implementar isso agora?**

