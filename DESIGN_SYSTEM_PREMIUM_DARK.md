# 🎨 DESIGN SYSTEM PREMIUM DARK - AZIMUT
## Análise Comparativa + Implementação

**Data:** 02/01/2026  
**Objetivo:** Criar o site mais premium e acessível do mercado imersivo

---

## 🔍 ANÁLISE: SITES DARK PREMIUM DE REFERÊNCIA

### **1. VERCEL DARK MODE** (vercel.com)
**Nota: 10/10** ⭐⭐⭐⭐⭐

#### Características:
- Background: `#000000` puro (true black)
- Textos primários: `#EDEDED` (quase branco, suave)
- Textos secundários: `#888888` (cinza médio)
- Acentos: `#0070F3` (azul vibrante)
- Bordas: `rgba(255,255,255,0.1)` (ultra sutis)
- Hover states: elevação de opacidade (0.7 → 1.0)
- Transições: 150ms cubic-bezier(0.4, 0, 0.2, 1)

#### O que copiar:
✅ Contraste limpo entre bg puro e textos  
✅ Bordas invisíveis (só aparecem quando necessário)  
✅ Hover = opacidade, não cor  
✅ Tipografia: Inter/Geist (clean, moderna)

---

### **2. THE MILL** (themill.com)
**Nota: 10/10** ⭐⭐⭐⭐⭐

#### Características:
- Background: `#0A0A0A` (quase preto, leve warmth)
- Grain texture: Noise 5% opacity (cinematográfico!)
- Textos: `#FFFFFF` (branco puro nos títulos)
- Acentos: Vermelho vibrante nos CTAs
- Vídeos: hero autoplay, silencioso
- Animações: scroll-triggered (GSAP)

#### O que copiar:
✅ **GRAIN TEXTURE** (match perfeito com Azimut!)  
✅ Vídeos como hero background  
✅ Animações cinematográficas (fade in ao scrollar)  
✅ Vermelho como cor de ação (igual Azimut Red #c92337!)

---

### **3. RESN** (resn.co.nz)
**Nota: 9/10** ⭐⭐⭐⭐⭐

#### Características:
- Background: `#111111`
- Cursor custom (ponto grande)
- Micro-interações em todos os elementos
- Tipografia: Favorit/Suisse (elegante)
- Layout: grid assimétrico (experimental)

#### O que copiar:
✅ Micro-interações nos links (scale 1.0 → 1.02)  
✅ Cursor custom (pode ser estrela Azimut!)  
✅ Grid experimental (não só 12 colunas)

---

### **4. ACTIVE THEORY** (activetheory.net)
**Nota: 9/10** ⭐⭐⭐⭐⭐

#### Características:
- Background: Gradiente sutil (#000 → #0A0A0A)
- WebGL background (partículas)
- Transições de página = cortina
- Tipografia: Neue Haas Grotesk (clean)

#### O que copiar:
✅ Gradientes sutis (adicionar depth)  
✅ Partículas WebGL (animação estelar Azimut)  
✅ Transições fluidas entre páginas

---

### **5. AWWWARDS** (awwwards.com - modo escuro)
**Nota: 8/10** ⭐⭐⭐⭐

#### Características:
- Background: `#1A1A1A`
- Cartões: `#242424` (elevação sutil)
- Bordas: amarelo/verde fluorescente
- Animações: hover = glow

#### O que copiar:
✅ Cartões com elevação sutil  
✅ Glow em elementos ativos

---

## 🎨 DESIGN SYSTEM AZIMUT (Baseado nos Top 5)

### **CORES (Dark Theme)**

```css
/* BACKGROUNDS */
--bg-primary: #0A0E18;        /* Base escuro (com leve azul) */
--bg-secondary: #060A12;      /* Mais escuro (footer, cards) */
--bg-elevated: #12161F;       /* Cards em elevação */
--bg-hover: rgba(201, 35, 55, 0.06); /* Hover sutil vermelho */

/* TEXTOS */
--text-primary: #D3CEC3;      /* Bege claro (atual) */
--text-secondary: #9A9589;    /* Cinza médio (atual) */
--text-tertiary: #6B6860;     /* Cinza escuro (menos usado) */
--text-inverse: #0A0E18;      /* Para fundos claros */

/* ACENTOS */
--accent-red: #C92337;        /* Azimut Red (principal) */
--accent-red-hover: #E02847;  /* Hover state */
--accent-red-muted: rgba(201, 35, 55, 0.15); /* Background sutil */

/* BORDAS */
--border-subtle: rgba(211, 206, 195, 0.1);  /* Quase invisível */
--border-visible: rgba(211, 206, 195, 0.2); /* Quando precisa aparecer */
--border-active: #C92337;                   /* Elemento ativo */

/* SOMBRAS */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);
--glow-red: 0 0 12px rgba(201, 35, 55, 0.4);
```

---

### **CORES (Light Theme) - LEGÍVEL E PREMIUM**

```css
/* BACKGROUNDS */
--bg-primary: #F5F5F0;        /* Off-white suave */
--bg-secondary: #FFFFFF;      /* Branco puro */
--bg-elevated: #FAFAF8;       /* Leve elevação */
--bg-hover: rgba(201, 35, 55, 0.04); /* Hover sutil */

/* TEXTOS */
--text-primary: #1A1A1A;      /* Quase preto (alta legibilidade) */
--text-secondary: #4A4A4A;    /* Cinza escuro (legível) */
--text-tertiary: #7A7A7A;     /* Cinza médio */
--text-inverse: #FFFFFF;      /* Para fundos escuros */

/* ACENTOS */
--accent-red: #B01F2F;        /* Vermelho mais escuro (mais contraste) */
--accent-red-hover: #C92337;  /* Hover = vermelho original */
--accent-red-muted: rgba(176, 31, 47, 0.08); /* Background sutil */

/* BORDAS */
--border-subtle: rgba(26, 26, 26, 0.08);  /* Sutil */
--border-visible: rgba(26, 26, 26, 0.15); /* Visível */
--border-active: #B01F2F;                 /* Ativo */

/* SOMBRAS */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
--glow-red: 0 0 12px rgba(176, 31, 47, 0.2);
```

---

### **TIPOGRAFIA (Inspirado em The Mill + Vercel)**

```css
/* FONT FAMILIES */
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;

/* FONT SIZES (Fluido + Responsivo) */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);     /* 12-14px */
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);       /* 14-16px */
--text-base: clamp(1rem, 0.95rem + 0.5vw, 1.125rem);      /* 16-18px */
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);      /* 18-20px */
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);       /* 20-24px */
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);            /* 24-32px */
--text-3xl: clamp(2rem, 1.7rem + 1.5vw, 3rem);            /* 32-48px */
--text-4xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);            /* 40-64px */

/* FONT WEIGHTS */
--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* LINE HEIGHTS */
--leading-tight: 1.2;
--leading-snug: 1.4;
--leading-normal: 1.6;
--leading-relaxed: 1.8;
```

---

### **ESPAÇAMENTO (Sistema 4px base)**

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
--spacing-32: 8rem;    /* 128px */
```

---

### **TRANSIÇÕES (Suaves e Naturais)**

```css
/* DURAÇÃO */
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 400ms;
--transition-slowest: 600ms;

/* EASING (Natural Motion) */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

### **BORDER RADIUS (Consistente)**

```css
--radius-sm: 4px;     /* Inputs pequenos */
--radius-md: 8px;     /* Botões, cards padrão */
--radius-lg: 12px;    /* Cards grandes */
--radius-xl: 16px;    /* Modais */
--radius-full: 9999px; /* Pills, avatars */
```

---

## 🎭 COMPONENTES PREMIUM

### **1. INTERNAL NAVIGATION (Universal)**

#### Especificações:
```css
.internal-nav {
  /* Container */
  display: flex;
  gap: 0.5rem; /* 8px */
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);

  /* Item */
  .nav-item {
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-base) var(--ease-out);
    color: var(--text-secondary);
    font-weight: var(--weight-medium);
    position: relative;
    
    /* Hover */
    &:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }
    
    /* Active */
    &.active {
      color: var(--accent-red);
      background: var(--accent-red-muted);
      
      /* Linha inferior */
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 1px;
        background: var(--accent-red);
        opacity: 0.6;
      }
    }
  }
}
```

---

### **2. BUTTONS (Hierarquia Clara)**

#### Primary Button:
```css
.btn-primary {
  padding: 0.75rem 1.5rem;
  background: var(--accent-red);
  color: white;
  border-radius: var(--radius-md);
  font-weight: var(--weight-semibold);
  transition: all var(--transition-base) var(--ease-out);
  box-shadow: 0 2px 8px rgba(201, 35, 55, 0.2);
  
  &:hover {
    background: var(--accent-red-hover);
    box-shadow: var(--glow-red);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

#### Secondary Button:
```css
.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-visible);
  border-radius: var(--radius-md);
  font-weight: var(--weight-medium);
  transition: all var(--transition-base) var(--ease-out);
  
  &:hover {
    border-color: var(--accent-red);
    color: var(--accent-red);
    background: var(--accent-red-muted);
  }
}
```

#### Ghost Button:
```css
.btn-ghost {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--text-secondary);
  border: none;
  font-weight: var(--weight-medium);
  transition: all var(--transition-base) var(--ease-out);
  
  &:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }
}
```

---

### **3. CARDS (Elevação Sutil)**

```css
.card {
  background: var(--bg-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-6);
  transition: all var(--transition-base) var(--ease-out);
  
  &:hover {
    border-color: var(--border-visible);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}
```

---

### **4. GRAIN TEXTURE (Cinematográfico)**

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  background-image: url('/grain.png'); /* 512x512 noise texture */
  background-repeat: repeat;
  opacity: 0.03; /* SUTIL (3%) */
  mix-blend-mode: overlay;
}
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **Fase 1: CSS Variables (Prioridade Máxima)**
- [ ] Criar `/src/styles/variables.css` com todas as cores
- [ ] Importar no `index.css`
- [ ] Migrar todos os hardcoded colors para `var(--*)`

### **Fase 2: Components (Semana 1)**
- [x] `InternalNavigation.tsx` (FEITO!)
- [ ] `Button.tsx` (primary, secondary, ghost)
- [ ] `Card.tsx` (com hover states)
- [ ] `Input.tsx` (formulários)

### **Fase 3: Grain Texture (Semana 1)**
- [ ] Criar `public/grain.png` (512x512 noise)
- [ ] Adicionar no `body::before`
- [ ] Testar opacity (3-5%)

### **Fase 4: Animações (Semana 2)**
- [ ] Scroll-triggered animations (GSAP ou Framer Motion)
- [ ] Fade in ao entrar no viewport
- [ ] Parallax sutil na estrela de fundo

### **Fase 5: Micro-interações (Semana 2)**
- [ ] Links com underline animado
- [ ] Botões com scale no hover
- [ ] Cursor custom (estrela Azimut)

---

## 🎯 RESULTADO ESPERADO

Com este Design System, o site Azimut terá:

✅ **Consistência visual total** (zero variações aleatórias)  
✅ **Acessibilidade WCAG AAA** (contraste perfeito dark/light)  
✅ **Look premium** (competindo com The Mill, Resn, Unit9)  
✅ **Identidade forte** (grain + vermelho + estrela)  
✅ **Pronto para Awwwards** (design 10/10)

---

## 📚 REFERÊNCIAS

- [Vercel Design System](https://vercel.com/design)
- [The Mill](https://themill.com)
- [Resn](https://resn.co.nz)
- [Active Theory](https://activetheory.net)
- [Awwwards Best Dark Sites](https://www.awwwards.com/websites/dark/)

---

**Próximo passo:** Implementar CSS Variables e migrar componentes existentes. 🚀

