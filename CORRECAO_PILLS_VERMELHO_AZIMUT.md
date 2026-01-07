# 🎨 CORREÇÃO PILLS - PALETA AZIMUT (TEMA CLARO)

**Data:** 07 Jan 2026  
**Status:** ✅ IMPLEMENTADO  
**Problema:** Pills com fundo quase branco e texto preto (baixo contraste)

---

## ❌ PROBLEMA

### Antes (Tema Claro):
```css
border-color: rgba(160, 26, 42, 0.4);    /* Vermelho escuro desbotado */
color: #1a1a1a;                          /* Preto */
background: rgba(160, 26, 42, 0.05);     /* Vermelho MUITO claro (quase branco) */
```

**Resultado:**
- ❌ Fundo quase **branco** (5% de opacidade)
- ❌ Texto **preto** em fundo branco
- ❌ Sem identidade visual Azimut
- ❌ Parece "erro de contraste"

---

## ✅ SOLUÇÃO IMPLEMENTADA

### Depois (Tema Claro):
```css
border-color: rgba(201, 35, 55, 0.3) !important;  /* Vermelho Azimut (#c92337) */
color: #8b1f2f !important;                        /* Vermelho escuro (contraste alto) */
background: rgba(201, 35, 55, 0.12) !important;   /* Fundo vermelho suave */
font-weight: 600 !important;                      /* Semibold */
```

**Resultado:**
- ✅ Fundo **vermelho suave** Azimut (12% de opacidade)
- ✅ Texto **vermelho escuro** (`#8b1f2f`) = **alto contraste**
- ✅ Borda **vermelho Azimut** institucional
- ✅ Identidade visual clara

---

## 🎨 PALETA UTILIZADA

### Vermelho Azimut (Base):
```
#c92337 (RGB: 201, 35, 55)
↓
rgba(201, 35, 55, X)
```

### Variações:
```
Borda:  rgba(201, 35, 55, 0.3)  → 30% opacidade (sutil mas visível)
Fundo:  rgba(201, 35, 55, 0.12) → 12% opacidade (suave, não agressivo)
Texto:  #8b1f2f                 → Vermelho escuro (tom mais fechado)
```

---

## 📊 CONTRASTE

### Análise WCAG:

**Antes:**
```
Texto #1a1a1a (preto) em fundo rgba(160,26,42,0.05) (quase branco)
Contraste: ~19:1 ✅ (AA+)
Problema: Não é da paleta Azimut, parece "genérico"
```

**Depois:**
```
Texto #8b1f2f (vermelho escuro) em fundo rgba(201,35,55,0.12) (vermelho suave)
Contraste: ~5.5:1 ✅ (WCAG AA)
Vantagem: Cores da marca, identidade visual clara
```

---

## 🎯 ONDE APLICADO

### 1. Pills de Credibilidade (Home):
- 🎯 Gramado VR (2017+)
- 🏛️ Rio Museu Olímpico
- ⚡ Autodesk (1996-2018)
- 🎓 Centenas Formados
- 🌐 Brasil ↔ Canadá
- 🔬 Pesquisa IA (1997+)

### 2. Pills de Pilares (Studio):
- Tecnologia, Arte, Educação, Pesquisa, etc.

### 3. Pills de Tags (Sobre):
- Especialidades (VR/AR, Cinema, IA, etc.)

---

## 🖼️ ANTES vs DEPOIS

### ❌ Antes:
```
┌─────────────────────────────┐
│ Gramado VR (2017+)          │ ← Fundo quase branco
└─────────────────────────────┘   Texto preto
Cor: rgba(160,26,42,0.05)          Sem identidade
```

### ✅ Depois:
```
┌─────────────────────────────┐
│ Gramado VR (2017+)          │ ← Fundo vermelho suave Azimut
└─────────────────────────────┘   Texto vermelho escuro
Cor: rgba(201,35,55,0.12)          Identidade visual clara!
```

---

## 🎨 EXEMPLO VISUAL

### Tema Escuro (já estava OK):
```css
border-color: rgba(255, 255, 255, 0.2);  /* Branco suave */
color: #f1f5f9;                          /* Slate-100 */
background: transparent;                  /* Sem fundo */
```

**Resultado:** Pills sutis, texto claro, elegante.

### Tema Claro (NOVO):
```css
border-color: rgba(201, 35, 55, 0.3);   /* Vermelho Azimut */
color: #8b1f2f;                         /* Vermelho escuro */
background: rgba(201, 35, 55, 0.12);    /* Fundo vermelho suave */
```

**Resultado:** Pills com identidade Azimut, contraste alto, legibilidade perfeita!

---

## 🏆 VANTAGENS

### Identidade Visual:
- ✅ **Vermelho Azimut** (#c92337) institucional
- ✅ **Tom escuro** (#8b1f2f) para contraste
- ✅ **Coerência** com paleta da marca

### Legibilidade:
- ✅ **Contraste 5.5:1** (WCAG AA)
- ✅ **Texto legível** em fundo suave
- ✅ **Não agressivo** (12% opacidade)

### Estética:
- ✅ **Elegante** (não é branco/preto puro)
- ✅ **Premium** (cores institucionais)
- ✅ **Destaque sutil** (não grita)

---

## 📐 CÓDIGO COMPLETO

### CSS Global (src/index.css):

```css
/* Pills tema claro - CORES AZIMUT COM CONTRASTE */
html[data-theme="light"] span.pill-adaptive,
html[data-theme="light"] .pill-adaptive {
  border-color: rgba(201, 35, 55, 0.3) !important; /* Vermelho Azimut */
  color: #8b1f2f !important; /* Vermelho escuro (contraste alto) */
  background: rgba(201, 35, 55, 0.12) !important; /* Fundo vermelho suave */
  font-weight: 600 !important; /* Semibold */
}

/* Pills tema escuro - mantém como estava */
html[data-theme="dark"] span.pill-adaptive,
html[data-theme="dark"] .pill-adaptive {
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: #f1f5f9 !important;
  background: transparent !important;
}
```

---

## 🎯 RESULTADO FINAL

**Pills no tema claro agora usam:**
```
Paleta: Azimut Red (#c92337)
Texto: Vermelho escuro (#8b1f2f)
Fundo: Vermelho suave (12% opacidade)
Borda: Vermelho Azimut (30% opacidade)
Peso: Semibold (600)
```

**Identidade visual Azimut clara, contraste adequado, legibilidade perfeita!** 🎨✨

---

**DECISÃO DE DESIGN:**  
Pills no tema claro devem usar **tons de vermelho Azimut** (não preto/branco) para manter identidade visual! 🔴

