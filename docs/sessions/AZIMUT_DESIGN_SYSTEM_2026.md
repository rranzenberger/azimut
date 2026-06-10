# 🎬 AZIMUT DESIGN SYSTEM - IDENTIDADE ÚNICA 2026

## 📖 **HISTÓRIA & DNA (baseado em studioContent.ts)**

### **🎯 QUEM SOMOS:**
- **Desde 1996** (30 anos de experiência)
- **Pioneiros** em Maquete Virtual no Brasil
- **Único Centro de Treinamento Autodesk** na América do Sul (1996-2018)
- **Direção Técnica** do Rio Museu Olímpico (atual)
- **Curadoria VR** Festival de Gramado (desde 2017)
- **Binacional** Brasil ↔ Canadá

### **🔴 DIFERENCIAIS ÚNICOS:**
1. **Pesquisa + Produção** (academia + mercado)
2. **Educação + Curadoria** (formamos centenas + curamos festivais)
3. **Arquitetura/BIM + Cinema/VFX + VR/XR/IA** (expertise ampla)
4. **30 anos** de bagagem internacional
5. **Ecossistema completo** (não só estúdio)

### **🎬 PILARES:**
1. **Arte e Estética Imersiva** 🎨
2. **Tecnologia Criativa** 🧠
3. **Narrativa Cinematográfica** 🎥 ← **CORE IDENTITY**
4. **Impacto Cultural/Social** 🌍
5. **Atuação Binacional BR-CA** 🌐
6. **Modelo de Cocriação** 🤝

---

## 🎨 **IDENTIDADE VISUAL AZIMUT**

### **🔴 PALETA DE CORES (definitiva):**

```css
/* PRIMARY */
--azimut-red: #c92337;          /* Identidade principal */
--azimut-red-dark: #991B1B;     /* Hover/Active */
--azimut-red-light: #EF4444;    /* Accents */

/* CINEMATOGRÁFICO */
--cinema-black: #0a0e18;        /* Fundo escuro */
--cinema-grey: #1a1f2e;         /* Cards dark */
--film-grain: rgba(0,0,0,0.03); /* Texture */

/* NEUTROS */
--text-primary: #ffffff;
--text-secondary: #d3cec3;
--text-muted: #78716c;
```

### **🎬 TIPOGRAFIA:**

```css
/* HEADLINES - Handel Gothic (uppercase, tracking largo) */
H1: clamp(2.5rem, 8vw, 8rem)    /* Monumental */
H2: clamp(2rem, 5vw, 4rem)      /* Forte */
H3: clamp(1.5rem, 3vw, 3rem)    /* Médio */

/* LABELS - Sora (tracking ultra-largo 0.24em) */
.label: 0.75rem, uppercase, tracking-widest

/* BODY - Inter (legibilidade) */
p: 1rem, line-height: 1.6
```

### **🎥 GRÃO CINEMATOGRÁFICO:**

```css
.film-grain::before {
  background-image: repeating-linear-gradient(...);
  opacity: 0.3;
  animation: grain 8s steps(10) infinite;
}
```

**Aplicar em:** Hero, Featured sections, Cards premium

---

## 🏗️ **COMPONENTES DO DESIGN SYSTEM**

### **1. HERO SECTIONS (todas as páginas):**

```tsx
<section className="relative h-[85vh] min-h-[600px] overflow-hidden film-grain">
  {/* Background vídeo/imagem */}
  <div className="absolute inset-0">
    <img src={heroImage} className="w-full h-full object-cover" />
  </div>
  
  {/* Glass Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
  
  {/* Content - SEMPRE alinhado esquerda */}
  <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-8">
    <div className="max-w-4xl space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 font-sora text-[0.7rem] uppercase tracking-[0.3em]">
        <img src="/estela6-clara.svg" className="w-3 h-3" />
        <span className="text-azimut-red font-semibold">AZIMUT</span>
        <span className="text-white/40">•</span>
        <span className="text-white/60 text-[0.65rem]">SINCE 1996</span>
      </div>
      
      {/* Title - Handel, uppercase, tracking largo */}
      <h1 className="font-handel uppercase text-white" style={{
        fontSize: 'clamp(2.5rem, 8vw, 8rem)',
        lineHeight: '1.1',
        letterSpacing: '0.12em'
      }}>
        {title}
      </h1>
      
      {/* Subtitle */}
      <p className="text-white/90 text-[1.1rem] leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    </div>
  </div>
</section>
```

**Consistência:** Todas as páginas (Home, Studio, What, Work, Contact) usam esse padrão.

---

### **2. STATS CARDS (dados reais):**

```tsx
<div className="grid grid-cols-3 gap-4">
  {/* Card 1 */}
  <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 
                  p-6 rounded-xl hover:border-azimut-red transition-all">
    <span className="block text-5xl font-bold text-azimut-red">100+</span>
    <span className="block text-xs text-white/60 uppercase tracking-widest">Projetos</span>
  </div>
  
  {/* Card 2 */}
  <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 
                  p-6 rounded-xl hover:border-azimut-red transition-all">
    <span className="block text-5xl font-bold text-azimut-red">15+</span>
    <span className="block text-xs text-white/60 uppercase tracking-widest">Países</span>
  </div>
  
  {/* Card 3 - REAL (não "20+ years") */}
  <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 
                  p-6 rounded-xl hover:border-azimut-red transition-all">
    <span className="block text-5xl font-bold text-azimut-red">1996</span>
    <span className="block text-xs text-white/60 uppercase tracking-widest">Desde</span>
  </div>
</div>
```

**Dados reais de studioContent.ts:**
- Desde **1996** (não "20+ years")
- Autodesk **1996-2018**
- Rio Museum **Atual**
- Gramado **Desde 2017**
- Binacional **BR-CA**

---

### **3. PROJECT CARDS (cinematográfico):**

```tsx
<div className="group relative rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.4)] 
                transition-all duration-500 hover:scale-[1.02]">
  {/* Image com film grain */}
  <div className="relative aspect-[4/3] film-grain">
    <img src={project.image} className="w-full h-full object-cover" />
    
    {/* Gradiente dark (cinema) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
    
    {/* Tags vermelhas */}
    <div className="absolute top-3 left-3 flex gap-2">
      <span className="px-2 py-1 rounded-full bg-azimut-red/20 border border-azimut-red/50 
                       font-sora text-[0.6rem] uppercase tracking-wider text-white">
        {tag}
      </span>
    </div>
    
    {/* Title sobre imagem */}
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 className="font-handel text-xl uppercase tracking-[0.08em] text-white 
                     group-hover:text-azimut-red transition-colors">
        {project.title}
      </h3>
      <p className="text-xs text-white/80">📍 {project.location}</p>
    </div>
  </div>
</div>
```

---

### **4. GLASS PANELS (narrativa conectada):**

```tsx
<div className="glass-panel backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 
                rounded-2xl p-8 border border-white/20 dark:border-slate-700/50
                hover:shadow-[0_32px_80px_rgba(201,35,55,0.3)] hover:scale-[1.02] 
                transition-all duration-500">
  {/* Content */}
</div>
```

**Uso:** Sobre, Valores, Pilares, Serviços

---

### **5. PILLS (identidade Azimut):**

```tsx
<span className="pill-adaptive rounded-full border border-white/20 
                 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] 
                 text-white hover:border-azimut-red hover:bg-azimut-red/10 
                 hover:scale-105 transition-all duration-300">
  {label}
</span>
```

**Cores:** Sempre vermelho no hover (não amber/outras cores)

---

### **6. TIMELINE (história 1996-2025):**

```tsx
<div className="space-y-8">
  {/* 1996-2004: Architecad + Fundações */}
  <div className="relative pl-8 border-l-2 border-azimut-red">
    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-azimut-red"></span>
    <h3 className="font-handel text-2xl uppercase text-azimut-red mb-2">1996-2004</h3>
    <h4 className="font-bold text-lg mb-3">Architecad + Fundações</h4>
    <ul className="space-y-2 text-sm">
      <li>Pioneiros em Maquete Virtual no Brasil</li>
      <li>Centro de Treinamento Autodesk</li>
      <li>Único Application Engineer na América do Sul</li>
    </ul>
  </div>
  
  {/* 2004-2018: Azimut Escola */}
  {/* 2018-2025: Azimut Projetos Audiovisuais */}
</div>
```

---

## 📐 **ESPAÇAMENTO & RITMO**

### **Secções:**
```css
py-12  /* Mobile */
py-16  /* Tablet */
py-20  /* Desktop */
```

### **Entre elementos:**
```css
gap-4   /* Cards pequenos */
gap-6   /* Cards médios */
gap-8   /* Seções grandes */
gap-12  /* Entre secções */
```

### **Margem vertical (ritmo cinematográfico):**
```css
mb-4   /* Pequeno */
mb-6   /* Médio */
mb-8   /* Grande */
mb-12  /* XL */
```

---

## 🎯 **APLICAÇÃO EM TODAS AS PÁGINAS**

### **HOME:**
✅ Hero 85vh + stats cards  
✅ Interactive project grid 5+7  
✅ Glass panels (sobre, serviços)  
✅ Logo 3D animada  
✅ Film grain  

### **STUDIO:**
🔄 Hero 85vh (história desde 1996)  
🔄 Timeline vertical (3 períodos)  
🔄 Team cards (Ranz, Anick, Alberto)  
🔄 Pilares (6 cards com ícones)  
🔄 Glass panels  

### **WHAT WE DO:**
🔄 Hero 85vh  
🔄 Serviços cards (cinematográfico)  
🔄 Process timeline  
🔄 CTA sections  

### **WORK:**
🔄 Hero 85vh  
🔄 Project grid (3x3)  
🔄 Filtros vermelhos  
🔄 Hover states premium  

### **CONTACT:**
🔄 Hero 85vh  
🔄 Form glass panel  
🔄 Stats cards  

---

## ✅ **CONSISTÊNCIA TOTAL**

### **Elementos fixos em TODAS as páginas:**
1. ✅ Hero 85vh com film grain
2. ✅ Badge "AZIMUT • SINCE 1996"
3. ✅ Tipografia Handel (headlines)
4. ✅ Glass panels backdrop-blur
5. ✅ Vermelho dominante (#c92337)
6. ✅ Alinhamento esquerda (não centro)
7. ✅ Stats dados reais (não genéricos)
8. ✅ Hover states vermelhos
9. ✅ Smooth scroll
10. ✅ Atmosfera cinematográfica

---

## 🚀 **PRÓXIMA FASE:**

Vou aplicar esse Design System em **TODAS as páginas**:

1. ✅ Home (já feito)
2. 🔄 Studio (ajustar para DS)
3. 🔄 What We Do (ajustar para DS)
4. 🔄 Work (ajustar para DS)
5. 🔄 Contact (ajustar para DS)

**Resultado:** Site coeso, identidade única, nível mundial, mas **100% Azimut**.

---

**Data:** 06/01/2026  
**Status:** Design System definido  
**Próximo:** Aplicar em todas as páginas

