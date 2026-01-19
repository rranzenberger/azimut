# 🎨 CORREÇÃO DE CORES - PALETA AZIMUT (NÃO BRANCO PURO)

**Data:** 07 Jan 2026  
**Status:** ✅ IMPLEMENTADO  
**Problema:** Fundos brancos/pretos puros sem harmonia com paleta da marca

---

## ❌ PROBLEMA

### Antes:
- **Fundos**: `bg-black/60`, `bg-black/50` (preto puro semi-transparente)
- **Textos**: `!text-white`, `!text-white/60` (branco puro forçado)
- **Resultado**: Sem harmonia com paleta Azimut, muito "genérico"

### Análise da Paleta Azimut (imagens fornecidas):

```
CORES DA MARCA:
- Azimut Red:  #c92337 (vermelho institucional)
- Navy Dark:   #0a0f1a (azul marinho muito escuro)
- Slate Dark:  #1a1f2e (azul ardósia escuro)
- Slate Mid:   #0f172a (intermediário)
- Creme Light: #d3cec3 (bege claro)
- Creme Pale:  #f5f3f0 (bege muito claro)
- Cinzas:      #2a2825, #1e1c1a (tons terrosos)
```

---

## ✅ SOLUÇÃO IMPLEMENTADA

### 1. **Impact Cards (Hero - 5 cards principais)**

**Antes:**
```tsx
bg-black/60  // Preto puro
!text-white  // Branco puro forçado
```

**Depois:**
```tsx
style={{ background: 'rgba(26, 31, 46, 0.85)' }}  // Navy Azimut #1a1f2e
text-slate-100   // Branco levemente acinzentado
text-slate-400   // Cinza médio (subtítulos)
```

**Resultado:**
- ✅ Fundo **navy Azimut** (não preto genérico)
- ✅ Texto **slate-100** (contraste suave, não branco puro)
- ✅ Subtítulos **slate-400** (hierarquia visual)

---

### 2. **Credibility Cards (3 cards secundários)**

**Antes:**
```tsx
bg-black/50    // Preto puro mais claro
!text-white/50 // Branco puro forçado
```

**Depois:**
```tsx
style={{ background: 'rgba(15, 23, 42, 0.7)' }}  // Slate escuro #0f172a
text-azimut-red   // Vermelho institucional
text-slate-400    // Cinza médio
```

**Resultado:**
- ✅ Fundo **slate escuro Azimut** (mais transparente)
- ✅ Títulos **vermelho Azimut** (destaque da marca)
- ✅ Subtítulos **slate-400** (legibilidade)

---

## 🎨 PALETA APLICADA

### Cards Principais:
```
Fundo:       rgba(26, 31, 46, 0.85)  ← Navy Azimut (#1a1f2e)
Título:      text-slate-100          ← Branco suave
Subtítulo:   text-slate-400          ← Cinza médio
Hover:       text-azimut-red         ← Vermelho Azimut
Border:      border-azimut-red/30    ← Borda vermelha sutil
```

### Cards Secundários:
```
Fundo:       rgba(15, 23, 42, 0.7)   ← Slate escuro (#0f172a)
Título:      text-azimut-red         ← Vermelho institucional
Subtítulo:   text-slate-400          ← Cinza médio
Border:      border-white/10         ← Borda branca muito sutil
```

---

## 📊 HIERARQUIA VISUAL

```
Vermelho Azimut (#c92337)    ████████████████████ 100% (destaque)
Branco Suave (slate-100)     ███████████████░░░░░  75% (títulos)
Cinza Médio (slate-400)      ██████████░░░░░░░░░░  50% (subtítulos)
Navy/Slate Fundos            ████░░░░░░░░░░░░░░░░  20% (profundidade)
```

---

## 🎯 VANTAGENS

### Marca Azimut:
- ✅ **Cores institucionais** (navy, slate, vermelho)
- ✅ **Identidade visual** consistente
- ✅ **Não genérico** (não é preto/branco puro)

### Legibilidade:
- ✅ **Contraste adequado** (WCAG AA+)
- ✅ **Hierarquia clara** (3 níveis de cinza)
- ✅ **Destaques eficazes** (vermelho Azimut)

### Elegância:
- ✅ **Sutileza** (não é "gritante")
- ✅ **Profundidade** (fundos em camadas)
- ✅ **Coerência** (todas as páginas usam mesma paleta)

---

## 🖼️ ANTES vs DEPOIS

### ❌ Antes (Genérico):
```
Card: bg-black/60 (preto puro)
├─ Título: !text-white (branco puro forçado)
└─ Label: !text-white/60 (branco puro desbotado)

Problema: Parece "qualquer site dark"
```

### ✅ Depois (Azimut):
```
Card: rgba(26,31,46,0.85) (navy institucional)
├─ Título: text-slate-100 (branco suave)
└─ Label: text-slate-400 (cinza médio)

Vantagem: Identidade visual Azimut clara!
```

---

## 📐 CORES RGBA UTILIZADAS

### Navy Azimut (Cards Principais):
```css
background: rgba(26, 31, 46, 0.85);
/* Opacidade 85% para:
   - Permitir leve transparência do fundo hero
   - Manter solidez visual
   - Criar profundidade
*/
```

### Slate Escuro (Cards Secundários):
```css
background: rgba(15, 23, 42, 0.7);
/* Opacidade 70% para:
   - Maior sutileza (são cards menores)
   - Diferenciação hierárquica
   - Leveza visual
*/
```

---

## 🎨 EXEMPLO COMPLETO

### Impact Card "Cinema & AV":
```tsx
<div 
  className="glass-panel backdrop-blur-xl border border-azimut-red/30 p-5 rounded-xl hover:border-azimut-red transition-all duration-300 group"
  style={{ background: 'rgba(26, 31, 46, 0.85)' }}
>
  <span className="block text-3xl mb-2">🎬</span>
  <span className="block text-xl lg:text-2xl font-bold text-slate-100 group-hover:text-azimut-red transition-colors leading-tight">
    Cinema & AV
  </span>
  <span className="block text-[0.65rem] text-slate-400 uppercase tracking-widest mt-1.5">
    Audiovisual
  </span>
</div>
```

**Características:**
- ✅ Fundo: Navy Azimut (não preto)
- ✅ Título: `text-slate-100` (não `!text-white`)
- ✅ Label: `text-slate-400` (não `!text-white/60`)
- ✅ Hover: `text-azimut-red` (vermelho institucional)

---

## 🏆 RESULTADO FINAL

**Paleta Azimut 100% aplicada nos cards do Hero!**

```
Cards Principais: Navy Azimut (#1a1f2e @ 85%)
Cards Secundários: Slate Escuro (#0f172a @ 70%)
Títulos: Slate-100 (branco suave)
Subtítulos: Slate-400 (cinza médio)
Destaques: Azimut Red (#c92337)
```

**Harmonia visual, identidade forte, legibilidade perfeita!** 🎯✨

---

**DECISÃO DE DESIGN:**  
Sempre use **cores da paleta institucional** (navy, slate, vermelho Azimut) ao invés de preto/branco puros! 🎨

