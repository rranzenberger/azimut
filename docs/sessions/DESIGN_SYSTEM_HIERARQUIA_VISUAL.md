# 🎨 DESIGN SYSTEM - HIERARQUIA VISUAL PREMIUM

**Data:** 2026-01-13  
**Status:** ✅ DISPONÍVEL GLOBALMENTE  
**Classes CSS:** Reutilizáveis em TODO o site

---

## 📐 CLASSES DISPONÍVEIS:

### **1. `.section-eyebrow` - Label Pequeno (Categoria)**

```tsx
<span className="section-eyebrow">
  ABOUT AZIMUT
</span>
```

**Resultado:**
```
━━━━━━ ABOUT AZIMUT (10.4px vermelho, linha decorativa)
```

**Características:**
- Tamanho: 10.4px
- Cor: Vermelho Azimut (#c92337)
- Estilo: BOLD UPPERCASE tracking wide
- Linha decorativa: 24px × 2px automática

---

### **2. `.section-title` - Título Grande (Impacto)**

```tsx
<h2 className="section-title">
  QUEM SOMOS
</h2>
```

**Resultado:**
```
QUEM SOMOS (30-48px branco, handel, impactante)
```

**Características:**
- Tamanho: 30px (mobile) → 48px (desktop)
- Font: HandelGothic
- Cor: Branco (#ffffff)
- Tracking: 0.08em

**Variações:**
- `.section-title-md` → 24px - 40px (subseções)
- `.section-title-sm` → 20px - 32px (cards)

---

### **3. `.body-large` - Texto de Introdução**

```tsx
<p className="body-large">
  Azimut is a creative-technology studio dedicated to immersive...
</p>
```

**Resultado:**
```
Lorem ipsum dolor sit amet... (20-24px cinza claro, light, legível)
```

**Características:**
- Tamanho: 20px → 24px
- Peso: Light (300)
- Cor: Cinza claro (#cbd5e1)
- Leading: Relaxed (1.625)
- Max-width: 56rem (perfeito para leitura)

---

### **4. `.section-container` - Container de Seção**

```tsx
<section className="section-container">
  {/* Conteúdo da seção */}
</section>
```

**Resultado:**
- Margin-bottom: 96px (6rem)
- Espaçamento generoso entre seções

**Variação:**
- `.section-container-sm` → 64px (4rem) - menos espaçamento

---

### **5. `.section-header` - Cabeçalho (Eyebrow + Title + Button)**

```tsx
<div className="section-header">
  <div>
    <span className="section-eyebrow">DIFERENCIAIS</span>
    <h2 className="section-title">O Que Nos Torna Únicos</h2>
  </div>
  <button>Ver Detalhes →</button>
</div>
```

**Resultado:**
```
Mobile (stack vertical):
━━━━━━ DIFERENCIAIS
O QUE NOS TORNA ÚNICOS
[Ver Detalhes →]

Desktop (lado a lado):
━━━━━━ DIFERENCIAIS     [Ver Detalhes →]
O QUE NOS TORNA ÚNICOS
```

**Características:**
- Mobile: Stack vertical (flex-col)
- Desktop: Lado a lado (flex-row)
- Botão alinhado ao baseline do título
- Gap: 24px entre elementos

---

## 🚀 COMO USAR EM OUTRAS PÁGINAS:

### **Exemplo 1: Academy Page**

```tsx
<section id="programs" className="section-container">
  <span className="section-eyebrow">PROGRAMAS</span>
  <h2 className="section-title">Nossos Programas</h2>
  <p className="body-large">
    Explore nossas opções de educação imersiva...
  </p>
  
  {/* Cards ou conteúdo */}
</section>
```

---

### **Exemplo 2: Work Page (Projetos)**

```tsx
<section id="featured" className="section-container">
  <div className="section-header">
    <div>
      <span className="section-eyebrow">DESTAQUES</span>
      <h2 className="section-title">Projetos em Destaque</h2>
    </div>
    <LangLink to="/work">Ver Todos →</LangLink>
  </div>
  
  {/* Grid de projetos */}
</section>
```

---

### **Exemplo 3: Solutions Page**

```tsx
<section id="services" className="section-container scroll-mt-[200px]">
  <span className="section-eyebrow">SERVIÇOS</span>
  <h2 className="section-title-md">Nossas Soluções</h2>
  <p className="body-large mb-12">
    Oferecemos soluções completas em VR/AR...
  </p>
  
  {/* Grid de serviços */}
</section>
```

---

### **Exemplo 4: Subpáginas (Studio Diferenciais)**

```tsx
<main className="relative pt-6 md:pt-8 pb-24">
  <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
    <span className="section-eyebrow">DIFERENCIAIS</span>
    <h1 className="section-title">O Que Nos Torna Únicos</h1>
    <p className="body-large mb-16">
      Descubra o que faz da Azimut um estúdio único...
    </p>
    
    {/* Conteúdo da subpágina */}
  </div>
</main>
```

---

## 📊 HIERARQUIA VISUAL COMPLETA:

```
┌─────────────────────────────────────────────┐
│ ━━━━━━ section-eyebrow (10.4px vermelho)   │
│                                             │
│ section-title (48px branco handel)         │
│                                             │
│ body-large (24px cinza claro light)        │
│ Lorem ipsum dolor sit amet...              │
│                                             │
│ [Botões ou conteúdo]                       │
└─────────────────────────────────────────────┘
```

---

## 🎯 PÁGINAS QUE DEVEM USAR:

### **✅ JÁ IMPLEMENTADO:**
- `src/pages/Studio.tsx` ✅

### **📋 PRÓXIMAS PÁGINAS:**

1. **`src/pages/AcademyNew.tsx`**
   ```tsx
   <section className="section-container">
     <span className="section-eyebrow">ACADEMY</span>
     <h2 className="section-title">Programas Educacionais</h2>
   </section>
   ```

2. **`src/pages/Work.tsx`**
   ```tsx
   <section className="section-container">
     <span className="section-eyebrow">PORTFOLIO</span>
     <h2 className="section-title">Nossos Projetos</h2>
   </section>
   ```

3. **`src/pages/WhatWeDo.tsx`**
   ```tsx
   <section className="section-container">
     <span className="section-eyebrow">SERVIÇOS</span>
     <h2 className="section-title">O Que Fazemos</h2>
   </section>
   ```

4. **Subpáginas Studio:**
   - `src/pages/StudioDiferenciais.tsx`
   - `src/pages/StudioTeam.tsx`
   - `src/pages/StudioCredentials.tsx`

5. **Subpáginas Academy:**
   - `src/pages/AcademyVancouver.tsx`
   - `src/pages/AcademyQuick.tsx`
   - `src/pages/AcademyResearch.tsx`

---

## 🎨 COMPARAÇÃO: ANTES vs AGORA

### **ANTES (Inline Styles):**
```tsx
<h2 className="font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red">
  ABOUT AZIMUT
</h2>
```

**Problemas:**
- ❌ Muitas classes repetidas
- ❌ Difícil de manter consistência
- ❌ Erros de digitação
- ❌ Não é reutilizável

---

### **AGORA (Classes CSS):**
```tsx
<span className="section-eyebrow">
  ABOUT AZIMUT
</span>
```

**Vantagens:**
- ✅ **1 classe só** (simples)
- ✅ **Consistência garantida** (mesmo estilo sempre)
- ✅ **Fácil manutenção** (mudar CSS muda tudo)
- ✅ **Reutilizável** em todo o site
- ✅ **Documentado** e padronizado

---

## 🔧 CUSTOMIZAÇÕES (Se Necessário):

Se precisar ajustar em uma página específica, use classes utilitárias do Tailwind:

```tsx
{/* Eyebrow com cor diferente (exemplo) */}
<span className="section-eyebrow text-blue-500">
  CATEGORIA
</span>

{/* Título menor que o padrão */}
<h2 className="section-title-md">
  Subtítulo
</h2>

{/* Container com menos espaçamento */}
<section className="section-container-sm">
  Conteúdo
</section>
```

---

## 📁 ARQUIVOS:

1. **`src/index.css`** - Classes CSS globais (linhas 85-180)
2. **`src/pages/Studio.tsx`** - Exemplo de uso

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO:

- [x] Criar classes CSS globais
- [x] Implementar em `Studio.tsx`
- [ ] Implementar em `AcademyNew.tsx`
- [ ] Implementar em `Work.tsx`
- [ ] Implementar em `WhatWeDo.tsx`
- [ ] Implementar em subpáginas Studio
- [ ] Implementar em subpáginas Academy
- [ ] Documentar uso completo

---

**Resultado:** Design System reutilizável para TODO o site! 🎨✨
