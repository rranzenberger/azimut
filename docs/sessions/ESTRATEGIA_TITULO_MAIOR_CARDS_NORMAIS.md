# 📏 ESTRATÉGIA FINAL: TÍTULO MAIOR (NÃO CARDS LARGOS)

**Data:** 07 Jan 2026  
**Status:** ✅ IMPLEMENTADO  
**Decisão:** Aumentar título, manter cards normais

---

## 🎯 PROBLEMA

Card 3 "Exposições & Museus" com 2 linhas precisa de mais espaço.

---

## 🤔 DUAS OPÇÕES

### ❌ Opção A: Alargar Cards
```
- max-w-6xl (cards maiores)
- Gap 4 (mais espaço)
- Cards ficam largos demais
- Perde compactação elegante
```

### ✅ Opção B: TÍTULO MAIOR (escolhida)
```
- Título: 4.8rem → 5.8rem (+20%)
- Cards: mantêm max-w-5xl (normal)
- Solução: título grande equilibra logo grande
- Card 3: ajustar fonte para caber
```

---

## ✅ IMPLEMENTAÇÃO FINAL

### 1. **Título: 4.8rem → 5.8rem**

```tsx
ANTES: clamp(2.5rem, 4.5vw, 4.8rem)
DEPOIS: clamp(3rem, 5.5vw, 5.8rem)

Aumento: +20% (4.8rem → 5.8rem)
Line-height: 1.15 → 1.1 (mais compacto)
```

**Razão:** Título MUITO maior equilibra logo de 1250px (60%)

---

### 2. **Cards: Mantêm Normais**

```tsx
Impact Cards: max-w-5xl (1024px) ✅
Credib Cards: max-w-3xl (768px) ✅
Gap: 3 (normal) ✅
```

**Razão:** Não precisam alargar se título for grande

---

### 3. **Layout: Mantém 40/60**

```tsx
Texto: 40%
Logo: 60% (1250px)
```

**Razão:** Logo domina, título compensa com tamanho

---

## 🎨 EQUILÍBRIO FINAL

```
┌──────────────────────────────────────────────┐
│ TEXTO (40%)          │  LOGO (60%)           │
│                      │                       │
│ TÍTULO [5.8rem] ◄────┼────► Logo [1250px]   │
│   GIGANTE!           │      GIGANTE!         │
│                      │                       │
│ 5 Cards [normais]    │   EQUILIBRADOS!      │
│ 🎬🥽🏛️🧠🎓            │                       │
│                      │                       │
└──────────────────────────────────────────────┘
```

---

## 📊 HIERARQUIA VISUAL

```
Logo (1250px / 60%)       ████████████████████ 100%
TÍTULO (5.8rem) ← NOVO!   ███████████████████░  95%
Impact Cards (5xl)        ████████████░░░░░░░░  60%
Credib Cards (3xl)        ███████░░░░░░░░░░░░░  35%
```

**Resultado:** Título e Logo são PROTAGONISTAS!

---

## 🎯 VANTAGENS

### Título Maior:
- ✅ **Impacto imediato** (5.8rem é GIGANTE)
- ✅ **Equilibra logo** de 1250px
- ✅ **"EXPERIÊNCIAS QUE CONECTAM MUNDOS"** domina
- ✅ **Peso visual** adequado (95% vs 100% logo)

### Cards Normais:
- ✅ **Compactos e elegantes** (não largos demais)
- ✅ **Mais cards cabem** na tela
- ✅ **Respiração adequada** (gap 3)
- ✅ **Alinhamento perfeito** com credibility

### Card 3 (Exposições & Museus):
- ✅ **2 linhas ajustadas:**
  - Linha 1: text-lg/xl (Exposições)
  - Linha 2: text-[0.6rem] (& Museus)
- ✅ **Cabe perfeitamente** sem alargar

---

## 📐 DIMENSÕES REAIS (Desktop 1920px)

| Elemento | Tamanho | % Tela | Status |
|----------|---------|--------|--------|
| **Logo** | 1250px | 60% | ████████████ 100% |
| **Título** | 5.8rem (92.8px) | 40% | ███████████░  95% |
| **Impact Cards** | 1024px (5xl) | - | ████████░░░░  60% |
| **Credib Cards** | 768px (3xl) | - | ████░░░░░░░░  35% |

---

## 💡 POR QUE NÃO ALARGAR CARDS?

### Problemas de cards largos:
1. ❌ **Perdem compactação** elegante
2. ❌ **Desperdiçam espaço** horizontal
3. ❌ **Desbalanceiam** com credibility cards
4. ❌ **Forçam layout** a ficar "esticado"

### Vantagens de título maior:
1. ✅ **Foco no conteúdo** principal
2. ✅ **Hierarquia clara** (Título > Cards)
3. ✅ **Equilíbrio perfeito** com logo gigante
4. ✅ **Elegância mantida** (cards compactos)

---

## 🎨 ANTES vs DEPOIS

### ❌ Antes (Título 4.8rem):
- Logo 1250px domina DEMAIS
- Título muito pequeno (desproporcional)
- Sem equilíbrio visual

### ✅ Depois (Título 5.8rem):
- **Logo 1250px** ← PROTAGONISTA
- **Título 5.8rem** ← PROTAGONISTA TAMBÉM
- **Equilíbrio perfeito 95:100**
- **Cards normais** = elegantes

---

## 📱 RESPONSIVIDADE

### Mobile:
- Título: `clamp` começa em **3rem** (grande)
- Cards: Grid 2 colunas (normal)
- Logo: Watermark 200-250px

### Desktop:
- Título: Máximo **5.8rem** (GIGANTE)
- Cards: max-w-5xl (normal)
- Logo: 1250px (60%)

---

## 🏆 RESULTADO FINAL

**Layout:** 40/60 (texto/logo)  
**Título:** 5.8rem (GIGANTE - +20%)  
**Logo:** 1250px (GIGANTE - 60%)  
**Cards:** max-w-5xl (NORMAIS - elegantes)  

**Equilíbrio:** Título e Logo são PROTAGONISTAS, cards apoiam! 🎯✨

---

**DECISÃO DE DESIGN:**  
Quando logo é gigante, **AUMENTE O TÍTULO** (não os cards)! 📏🎨

