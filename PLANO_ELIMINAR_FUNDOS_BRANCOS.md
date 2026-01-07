# 🎨 PLANO: ELIMINAR FUNDOS BRANCOS - PALETA AZIMUT

**Data:** 07 Jan 2026  
**Objetivo:** Substituir TODOS os fundos brancos por cores da paleta Azimut

---

## ❌ PROBLEMA

**Fundos encontrados:**
- `bg-white/5` (branco 5% - quase transparente)
- `bg-white/10` (branco 10%)
- `bg-white/20` (branco 20%)

**Problema no tema claro:**
- ❌ Fundo branco + texto branco = **ilegível**
- ❌ Não usa paleta Azimut
- ❌ Sem identidade visual

---

## 🎨 PALETA AZIMUT PARA FUNDOS

### Tema Escuro (mantém como está):
```
bg-white/5  → OK (transparência sobre fundo escuro)
bg-white/10 → OK (hover suave)
```

### Tema Claro (SUBSTITUIR):
```
ANTES: bg-white/5  (branco 5%)
DEPOIS: rgba(42, 40, 37, 0.04) → Cinza terroso Azimut (#2a2825)

ANTES: bg-white/10 (branco 10%)
DEPOIS: rgba(42, 40, 37, 0.08) → Cinza terroso Azimut

ANTES: bg-white/20 (branco 20%)
DEPOIS: rgba(42, 40, 37, 0.12) → Cinza terroso Azimut
```

**Cores base da paleta:**
- `#2a2825` (cinza terroso escuro)
- `#1e1c1a` (cinza terroso muito escuro)
- `#d3cec3` (bege claro)
- `#f5f3f0` (bege muito claro)

---

## 📋 ARQUIVOS A MODIFICAR

### 1. **src/pages/Press.tsx**
- Linha 229: `bg-white/5` → substituir

### 2. **src/pages/Contact.tsx**
- Linha 289: `bg-white/5 hover:bg-white/10` → substituir
- Linha 303: `bg-white/5 hover:bg-white/10` → substituir
- Linha 511: `bg-white/5` → substituir

### 3. **src/pages/Work.tsx**
- Linha 359: `bg-white/5` (input search) → substituir
- Linha 368: `bg-white/5` (select tag) → substituir
- Linha 383: `bg-white/5` (select type) → substituir
- Linha 398: `bg-white/5` (select year) → substituir
- Linha 576: `bg-white/5` (icon placeholder) → substituir

### 4. **src/pages/ProjectDetail.tsx**
- Linha 309: `bg-white/5` → substituir
- Linha 345: `bg-white/5` → substituir
- Linha 384: `bg-white/5` → substituir
- Linha 422: `bg-white/5` → substituir
- Linha 474: `bg-white/10 hover:bg-white/20` → substituir
- Linha 499: `bg-white/10 hover:bg-white/20` → substituir
- Linha 622: `bg-white/5` → substituir

### 5. **src/index.css**
- Linha 1412: `.select-trigger` com `bg-white/5` → substituir

---

## ✅ SOLUÇÃO: CLASSES ADAPTATIVAS

### Criar classes CSS globais:

```css
/* Fundos sutis adaptivos (src/index.css) */
.bg-subtle {
  background: rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .bg-subtle {
  background: rgba(42, 40, 37, 0.04); /* Cinza terroso Azimut */
}

.bg-subtle-hover:hover {
  background: rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .bg-subtle-hover:hover {
  background: rgba(42, 40, 37, 0.08);
}

.bg-subtle-active {
  background: rgba(255, 255, 255, 0.2);
}

[data-theme="light"] .bg-subtle-active {
  background: rgba(42, 40, 37, 0.12);
}
```

### Substituir nos componentes:
```
bg-white/5           → bg-subtle
bg-white/10          → bg-subtle-hover
bg-white/5 hover:bg-white/10 → bg-subtle bg-subtle-hover
```

---

## 🎯 RESULTADO ESPERADO

### Tema Escuro:
- ✅ Mantém `bg-white/5` (já funciona bem)

### Tema Claro:
- ✅ Usa `rgba(42, 40, 37, 0.04)` (cinza terroso suave)
- ✅ Texto escuro em fundo suave (legível)
- ✅ Paleta Azimut consistente

---

**PRÓXIMO PASSO:** Implementar classes `.bg-subtle` e substituir nos arquivos!

