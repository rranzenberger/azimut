# 🎨 AUDITORIA VISUAL COMPLETA - DESIGN SYSTEM AZIMUT

## 📊 PROBLEMAS IDENTIFICADOS

### **1. TÍTULOS HERO INCONSISTENTES**

| Página | Prefixo | Título | Tamanho | Problema |
|--------|---------|--------|---------|----------|
| **Home** | "AZIMUT · SINCE 1996" | "EXPERIÊNCIAS QUE CONECTAM MUNDOS" | `clamp(3rem, 5.5vw, 5.8rem)` | ✅ BOM |
| **Studio** | Badge "🏢 STUDIO" | "ESTÚDIO & EQUIPE" | `text-5xl md:text-6xl lg:text-7xl` | ❌ GIGANTE |
| **Work** | "NOSSO TRABALHO" | "PROJETOS" | `text-4xl md:text-5xl lg:text-6xl` | ❌ MUITO GRANDE |
| **Solutions** | "O QUE CRIAMOS" | "SOLUÇÕES" | `text-4xl md:text-5xl lg:text-6xl` | ❌ MUITO GRANDE |
| **Vancouver** | Badge vermelho | Título | `text-5xl md:text-7xl` | ❌ GIGANTE |

**DIAGNÓSTICO:**
- Home usa `clamp()` responsivo (56-92px) ✅
- Outras usam Tailwind `text-7xl` (72px) = TOO BIG ❌

---

### **2. BADGES/PREFIXOS INCONSISTENTES**

| Página | Estilo | Animação |
|--------|--------|----------|
| **Home** | Texto inline: "AZIMUT · SINCE 1996" | ✅ Fade-in-up |
| **Studio** | Badge pill: "🏢 STUDIO" | ❌ Sem animação |
| **Work** | Texto uppercase: "NOSSO TRABALHO" | ✅ Fade-in-up |
| **Solutions** | Texto uppercase: "O QUE CRIAMOS" | ✅ Fade-in-up |

**DIAGNÓSTICO:**
- Falta padronização: badge vs texto inline ❌
- Animações não uniformes ❌

---

### **3. CARDS/CREDENCIAIS CORTANDO TEXTO**

**Página Credentials (Studio):**
```
PROBLEMA:
┌────────────────────────┐
│ AUTODES...            │ ← Texto cortado!
│ Only certified...      │
└────────────────────────┘
```

**CAUSA:**
- `text-4xl` ou maior em cards pequenos
- Sem `truncate` ou `line-clamp`

---

### **4. HERO HEIGHT INCONSISTENTE**

| Página | Altura Hero | Layout |
|--------|-------------|--------|
| **Home** | ~60vh | Grid 55/45 (texto/logo) |
| **Studio** | ~40vh | Badge + título + texto |
| **Work** | ~35vh | Prefixo + título + texto |
| **Solutions** | ~35vh | Prefixo + título + texto |

**DIAGNÓSTICO:**
- Home tem hero alto cinematográfico ✅
- Outras muito compactas ❌

---

## ✅ DESIGN SYSTEM PROPOSTO

### **📐 HIERARQUIA TIPOGRÁFICA UNIVERSAL**

```css
/* ═══════════════════════════════════
   TÍTULOS HERO (H1)
   ═══════════════════════════════════ */

/* PADRÃO OURO: clamp() responsivo */
.hero-title {
  font-family: 'HandelGothic', sans-serif;
  font-size: clamp(3rem, 5vw, 5rem); /* 48px → 80px */
  line-height: 1.1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Tamanhos por breakpoint */
- Mobile (< 640px): 48px (3rem)
- Tablet (640-1024px): 5vw (dinâmico)
- Desktop (> 1024px): 80px (5rem)

/* ═══════════════════════════════════
   SUBTÍTULOS HERO (P)
   ═══════════════════════════════════ */

.hero-subtitle {
  font-size: clamp(0.95rem, 1.5vw, 1.1rem); /* 15px → 18px */
  line-height: 1.6;
  opacity: 0.9;
}

/* ═══════════════════════════════════
   PREFIXOS/BADGES
   ═══════════════════════════════════ */

/* Estilo 1: Texto inline (Home, Work, Solutions) */
.hero-prefix-text {
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem; /* 11px */
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.7;
}

/* Estilo 2: Badge pill (Studio, Vancouver) */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(201, 35, 55, 0.1);
  border: 1px solid rgba(201, 35, 55, 0.3);
  border-radius: 9999px;
  font-size: 0.75rem; /* 12px */
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c92337;
}

/* ═══════════════════════════════════
   SECTION TITLES (H2)
   ═══════════════════════════════════ */

.section-title {
  font-family: 'HandelGothic', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem); /* 24px → 32px */
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ═══════════════════════════════════
   CARDS TITLES (H3)
   ═══════════════════════════════════ */

.card-title {
  font-family: 'Sora', sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.4;
  /* CRÍTICO: Evitar corte */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Max 2 linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-subtitle {
  font-size: 0.75rem; /* 12px */
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 🎯 PROPOSTA DE UNIFORMIZAÇÃO

### **OPÇÃO A: "HOME COMO PADRÃO" (Recomendado) ⭐**

**Adaptar TODAS as páginas para seguir o padrão da Home:**

```tsx
// ESTRUTURA UNIVERSAL
<section className="hero-section">
  {/* 1. Badge/Prefixo */}
  <div className="hero-prefix">
    <img src="/estela6-clara.svg" className="w-4 h-4" />
    <span className="text-azimut-red">AZIMUT</span>
    <span>•</span>
    <span className="opacity-60">SINCE 1996</span>
  </div>
  
  {/* 2. Título Principal */}
  <h1 className="hero-title" style={{ 
    fontSize: 'clamp(3rem, 5vw, 5rem)' 
  }}>
    TÍTULO<br />
    EM MÚLTIPLAS<br />
    <span className="text-azimut-red">LINHAS</span>
  </h1>
  
  {/* 3. Subtítulo */}
  <p className="hero-subtitle">
    Subtítulo explicativo conciso.
  </p>
</section>
```

**VANTAGENS:**
- ✅ Tipografia consistente em todo site
- ✅ Responsive fluido com clamp()
- ✅ Legível em mobile e desktop
- ✅ Visual premium equilibrado

---

### **OPÇÃO B: "STUDIO COMO PADRÃO"**

**Manter Studio gigante e aumentar Home/Work/Solutions:**

❌ **NÃO RECOMENDADO:**
- Títulos gigantes (72px+) sacrificam legibilidade
- Mobile quebra (precisa scroll para ver título completo)
- Fora do padrão de sites premium 2025

---

## 🎬 PLANO DE AÇÃO DETALHADO

### **FASE 1: CRIAR COMPONENTE UNIVERSAL** ✅

```tsx
// src/components/HeroSection.tsx
interface HeroSectionProps {
  lang: Lang
  badge?: {
    icon?: string
    text: string
  }
  title: string | React.ReactNode
  subtitle: string
  animate?: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  badge,
  title,
  subtitle,
  animate = true
}) => {
  return (
    <div className="hero-section mx-auto max-w-7xl px-6">
      {/* Badge/Prefixo com animação condicional */}
      {badge && (
        <div className={`hero-badge mb-4 ${animate ? 'animate-fade-in-up opacity-0' : ''}`} 
             style={animate ? { animationDelay: '0.1s', animationFillMode: 'forwards' } : {}}>
          {badge.icon && <span>{badge.icon}</span>}
          <span>{badge.text}</span>
        </div>
      )}
      
      {/* Título com clamp() responsivo */}
      <h1 className={`hero-title mb-4 ${animate ? 'animate-fade-in-up opacity-0' : ''}`}
          style={{ 
            fontSize: 'clamp(3rem, 5vw, 5rem)',
            ...(animate ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {})
          }}>
        {title}
      </h1>
      
      {/* Subtítulo */}
      <p className={`hero-subtitle max-w-3xl ${animate ? 'animate-fade-in-up opacity-0' : ''}`}
         style={animate ? { animationDelay: '0.3s', animationFillMode: 'forwards' } : {}}>
        {subtitle}
      </p>
    </div>
  )
}
```

---

### **FASE 2: ATUALIZAR PÁGINAS** 🔧

#### **Studio.tsx:**
```tsx
// ANTES (❌)
<h1 className="text-5xl md:text-6xl lg:text-7xl"> {/* 72px! */}
  {text.title}
</h1>

// DEPOIS (✅)
<HeroSection
  lang={lang}
  badge={{ icon: '🏢', text: 'STUDIO' }}
  title={text.title}
  subtitle={text.subtitle}
  animate={true}
/>
```

#### **Work.tsx:**
```tsx
// ANTES (❌)
<h1 className="text-4xl md:text-5xl lg:text-6xl"> {/* 60px */}
  {t(lang, 'navWork')}
</h1>

// DEPOIS (✅)
<HeroSection
  lang={lang}
  badge={{ text: lang === 'pt' ? 'NOSSO TRABALHO' : 'OUR WORK' }}
  title={t(lang, 'navWork')}
  subtitle="Projetos que transformam espaços..."
  animate={true}
/>
```

#### **WhatWeDo.tsx:**
```tsx
// ANTES (❌)
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  {t(lang, 'navWhat')}
</h1>

// DEPOIS (✅)
<HeroSection
  lang={lang}
  badge={{ text: lang === 'pt' ? 'O QUE CRIAMOS' : 'WHAT WE CREATE' }}
  title={t(lang, 'navWhat')}
  subtitle="16 soluções de experiências imersivas..."
  animate={true}
/>
```

---

### **FASE 3: FIX CARDS CORTANDO TEXTO** 🩹

```tsx
// ANTES (❌)
<h3 className="text-lg font-bold">
  AUTODESK FLAME
</h3>

// DEPOIS (✅)
<h3 className="text-sm font-semibold line-clamp-2">
  AUTODESK FLAME
</h3>
```

**CSS Universal para Cards:**
```css
.card-title {
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.card-subtitle {
  font-size: 0.75rem; /* 12px */
  opacity: 0.7;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 📏 ESPECIFICAÇÕES FINAIS

### **Tamanhos de Fonte Padronizados:**

| Elemento | Mobile | Desktop | Class/Style |
|----------|--------|---------|-------------|
| **Hero Title (H1)** | 48px | 80px | `clamp(3rem, 5vw, 5rem)` |
| **Hero Subtitle** | 15px | 18px | `clamp(0.95rem, 1.5vw, 1.1rem)` |
| **Hero Badge** | 11px | 12px | `text-[0.7rem]` |
| **Section Title (H2)** | 24px | 32px | `clamp(1.5rem, 3vw, 2rem)` |
| **Card Title (H3)** | 14px | 14px | `text-sm` |
| **Card Subtitle** | 12px | 12px | `text-xs` |
| **Body Text** | 16px | 16px | `text-base` |

### **Alturas de Hero Padronizadas:**

| Página | Altura | Layout |
|--------|--------|--------|
| Home | 60vh | Grid 55/45 + logo |
| Studio | 50vh | Badge + título + sub |
| Work | 50vh | Badge + título + sub |
| Solutions | 50vh | Badge + título + sub |
| Vancouver | 65vh | Badge + título + CTA |

---

## 🚀 CRONOGRAMA DE IMPLEMENTAÇÃO

### **Dia 1: Design System Core**
- [x] Criar `HeroSection.tsx` componente universal
- [x] Criar CSS utilities em `index.css`
- [x] Documentar em `DESIGN_SYSTEM.md`

### **Dia 2: Páginas Principais**
- [ ] Atualizar `Studio.tsx`
- [ ] Atualizar `Work.tsx`
- [ ] Atualizar `WhatWeDo.tsx`
- [ ] Testar responsividade

### **Dia 3: Subpáginas Studio**
- [ ] Atualizar `/studio/diferenciais`
- [ ] Atualizar `/studio/equipe`
- [ ] Atualizar `/studio/credibilidade`
- [ ] Fix cards cortando texto

### **Dia 4: Academy (Separada)**
- [ ] Analisar estrutura atual
- [ ] Propor design específico
- [ ] Implementar ajustes

---

## 🎨 DIREÇÃO DE ARTE FINAL

**Identidade Visual Azimut 2026:**

- **Tipografia:** Handball (títulos) + Sora (UI) + Inter (corpo)
- **Titles:** Grandes mas legíveis (48-80px)
- **Hierarchy:** Clara (H1 > H2 > H3 proporcional)
- **Spacing:** Generoso (mb-4, mb-6, mb-8)
- **Animation:** Sutil fade-in-up (0.1s, 0.2s, 0.3s delays)
- **Cards:** Compactos (text-sm, line-clamp-2)
- **Colors:** Vermelho Azimut (#c92337) como accent

**Referências:**
- ✅ Apple.com (tipografia hierárquica)
- ✅ Stripe.com (cards consistentes)
- ✅ Vercel.com (hero cinematográfico mas legível)

---

**QUER QUE EU IMPLEMENTE AGORA?** 🚀

1. ✅ Criar `HeroSection.tsx` componente
2. ✅ Atualizar CSS utilities
3. ✅ Refatorar Studio/Work/Solutions
4. ✅ Fix cards cortando texto
5. ✅ Commit e deploy

**Diga "SIM" para começar a implementação!** 🎯
