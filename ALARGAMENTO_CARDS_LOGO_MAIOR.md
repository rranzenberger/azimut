# 📐 ALARGAMENTO CARDS + LOGO MAIOR 2026

**Data:** 07 Jan 2026  
**Status:** ✅ CONCLUÍDO  
**Objetivo:** Alargar cards para caber 2 linhas + aumentar logo

---

## 🎯 PROBLEMA

Card 3 "Exposições & Museus" com **2 linhas de texto** precisa de mais espaço horizontal.

---

## ✅ AJUSTES APLICADOS

### 1. **Layout Hero: 45/55 → 40/60**

```tsx
ANTES: lg:grid-cols-[45%_55%]
DEPOIS: lg:grid-cols-[40%_60%]

Resultado: Logo ganha +5% de espaço
```

---

### 2. **Logo Animada: 1150px → 1250px**

```
ANTES: max-w-[1150px]
DEPOIS: max-w-[1250px]

Aumento: +100px (+8.7%)
```

---

### 3. **Impact Cards: max-w-5xl → max-w-6xl**

```
ANTES: max-w-5xl (64rem / 1024px)
DEPOIS: max-w-6xl (72rem / 1152px)

Aumento: +128px (+12.5%)
Gap: 3 → 4 (mais espaço entre cards)
```

---

### 4. **Credibility Cards: max-w-3xl → max-w-4xl**

```
ANTES: max-w-3xl (48rem / 768px)
DEPOIS: max-w-4xl (56rem / 896px)

Aumento: +128px (+16.7%)
Gap: 3 → 4 (mais espaço)
```

---

## 📊 EVOLUÇÃO COMPLETA

### Layout Hero:
| Versão | Texto | Logo | Logo Max |
|--------|-------|------|----------|
| 1ª | 50% | 50% | 480px |
| 2ª | 50% | 50% | 580px |
| 3ª | 50% | 50% | 720px |
| 4ª | 50% | 50% | 850px |
| 5ª | 50% | 50% | 1000px |
| 6ª | 45% | 55% | 1150px |
| **7ª** | **40%** | **60%** | **1250px** ✅ |

### Cards:
| Versão | Impact Max | Credib Max | Gap |
|--------|------------|------------|-----|
| Inicial | max-w-4xl | max-w-3xl | gap-3 |
| Alargado | max-w-5xl | max-w-3xl | gap-3 |
| **Final** | **max-w-6xl** | **max-w-4xl** | **gap-4** ✅ |

---

## 🎨 NOVO EQUILÍBRIO

```
┌──────────────────────────────────────────────────┐
│ TEXTO (40%)       │    LOGO (60%)                │
│                   │                              │
│ Badge             │                              │
│ TÍTULO [4.8rem]   │    [LOGO ANIMADA]           │
│ Subtitle          │       1250px                │
│                   │                              │
│ 5 Cards ALARGADOS │    DOMINA A TELA!           │
│ (max-w-6xl)       │                              │
│ 🎬🥽🏛️🧠🎓         │                              │
│                   │                              │
│ 3 Cards           │                              │
│ (max-w-4xl)       │                              │
└──────────────────────────────────────────────────┘
     40%                    60%
```

---

## 📏 LARGURAS REAIS (Desktop 1920px)

| Elemento | Antes | Depois | Ganho |
|----------|-------|--------|-------|
| **Coluna Texto** | 864px (45%) | 768px (40%) | -96px |
| **Coluna Logo** | 1056px (55%) | 1152px (60%) | +96px |
| **Impact Cards** | 1024px | 1152px | +128px |
| **Credib Cards** | 768px | 896px | +128px |
| **Logo Visível** | 1150px | 1250px | +100px |

---

## 🎯 BENEFÍCIOS

### Para Card 3 (Exposições & Museus):
- ✅ **Mais espaço horizontal** (+12.5%)
- ✅ **2 linhas cabem confortavelmente**
- ✅ **Sem texto cortado ou trepado**
- ✅ **Alinhado com outros cards**

### Para Logo Animada:
- ✅ **Maior destaque** (1250px)
- ✅ **Domina 60% da tela**
- ✅ **Máxima visibilidade**
- ✅ **Impacto visual premium**

### Para Equilíbrio Geral:
- ✅ **Logo domina** (60% vs 40%)
- ✅ **Texto não compete**, apoia
- ✅ **Cards alargados** respiram melhor
- ✅ **Gap maior** (4 vs 3) = mais elegante

---

## 📱 RESPONSIVIDADE

### Mobile:
- Layout: Coluna única (não afetado)
- Cards: Grid 2 colunas (ajuste automático)
- Logo: Watermark 200-250px

### Desktop:
- Layout: **40/60** (novo equilíbrio)
- Cards: **max-w-6xl** (alargados)
- Logo: **1250px** (gigante)

---

## 🔢 PROPORÇÕES FINAIS

```
Logo (1250px / 60%)     ███████████████████ 100%
Título (4.8rem)         ████████████████░░░  85%
Impact Cards (6xl)      ████████████░░░░░░░  65%
Credib Cards (4xl)      ███████░░░░░░░░░░░░  40%
```

**Hierarquia clara:** Logo > Título > Impact > Credib

---

## 💡 LÓGICA DE DESIGN

### Por que 40/60?
- Logo de 1250px precisa de **mais espaço** (60%)
- Texto em 40% é **suficiente** (não tímido)
- Proporção ~1.5:1 é **equilibrada** visualmente

### Por que alargar cards?
- Card 3 tem **2 linhas** (precisa espaço)
- Gap maior (4) = **mais respiração**
- max-w-6xl = **alinhamento perfeito** com layout 40/60

### Por que 1250px?
- **Domínio visual** (ocupar 60%)
- **Detalhes da animação** perfeitamente visíveis
- **Impacto máximo** sem exagero

---

**RESULTADO FINAL:**  
Cards alargados (6xl/4xl) + Logo gigante (1250px / 60%) = **Equilíbrio Premium Perfeito**! 📐✨

