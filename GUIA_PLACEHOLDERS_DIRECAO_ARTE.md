# 🎨 GUIA DE PLACEHOLDERS - DIREÇÃO DE ARTE AZIMUT 2026

**Data**: 06 Jan 2026  
**Objetivo**: Criar **harmonia visual** evitando "buracos" mas sem virar "massa de texto"

---

## 📐 **PRINCÍPIOS DE DIREÇÃO DE ARTE**

### **Problema Identificado**:
- ❌ **"Buracos"** = Cards sem ritmo visual, muito espaço vazio
- ❌ **"Massa de texto"** = Parágrafos longos sem respiro, cansativo

### **Solução Premium 2026** (Cartier/Inversa/Omega):
1. **Placeholders visuais sutis** = Adicionar elementos gráficos/ícones em opacidade baixa
2. **Hierarquia de informação** = Textos principais + secundários + badges
3. **Ritmo de respiração** = Espaçar seções, mas preencher cards
4. **Substituíveis no backoffice** = Todos os placeholders devem ser **editáveis**

---

## 🖼️ **PLACEHOLDERS IMPLEMENTADOS**

### **1. CARD "RETRATO DO ESTÚDIO" (Seção Sobre - Esquerdo)**

**Localização**: `Home.tsx` ~linha 515

```tsx
<div className="glass-panel card-adaptive rounded-2xl overflow-hidden">
  {/* PLACEHOLDER: Imagem de fundo sutil */}
  <div className="absolute inset-0 opacity-10 group-hover:opacity-15">
    <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/20 via-transparent to-transparent" />
    {/* Ícone placeholder - SUBSTITUIR por foto da equipe/estúdio */}
    <div className="absolute bottom-4 right-4 text-8xl opacity-20">
      🎬
    </div>
  </div>
  
  {/* Conteúdo sempre legível (z-10) */}
  <div className="relative z-10 p-6 md:p-8">
    {/* Texto aqui... */}
  </div>
</div>
```

**Como Substituir no Backoffice**:
1. Upload de imagem: `/public/images/team-studio.jpg` ou `/public/images/studio-workspace.jpg`
2. Editar campo: `studioImage` ou `aboutImage`
3. CSS aplicará automaticamente: `opacity-10` (fundo sutil, não intrusivo)

**Sugestões de Imagem**:
- ✅ Equipe trabalhando no estúdio (ângulo amplo, luz natural)
- ✅ Workspace com equipamentos (câmeras, computadores)
- ✅ Making-of de projeto (bastidores)
- ❌ Evitar: Fundos muito contrastados (prejudica legibilidade do texto)

---

### **2. TIMELINE CREDIBILIDADE (4 Cards)**

**Localização**: `Home.tsx` ~linha 305

#### **Card 1: "1996 Desde"**
```tsx
<div className="glass-panel card-adaptive...">
  {/* PLACEHOLDER: Ícone temporal decorativo */}
  <div className="absolute top-2 right-2 text-2xl opacity-10">⏰</div>
  <div className="text-2xl font-handel text-azimut-red">1996</div>
  <div className="text-xs uppercase">Desde</div>
</div>
```

**Como Substituir**:
- Backoffice campo: `timeline[0].icon` ou `timeline[0].image`
- Opções:
  - `⏰` (atual - emoji)
  - `/logos/azimut-vintage-1996.svg` (logo histórico)
  - `/icons/calendar-star.svg` (ícone personalizado)

---

#### **Card 2: "Autodesk 1996-2018"**
```tsx
<div className="absolute inset-0 opacity-5">
  {/* PLACEHOLDER: Logo Autodesk */}
  <div className="text-6xl font-bold">A</div>
</div>
```

**Como Substituir**:
- Backoffice: `/public/logos/autodesk-logo.svg`
- Campo: `timeline[1].logo`
- **IMPORTANTE**: Logo deve ser:
  - ✅ Monocromático (branco ou cinza)
  - ✅ SVG vetorizado
  - ✅ Opacity: `5-10%` (fundo sutil)
  - ❌ Evitar: Logos coloridos (quebra harmonia)

**Fontes para Logo Autodesk**:
1. https://autodesk.com/brand (press kit oficial)
2. Ou criar SVG simplificado (apenas "A" estilizado)

---

#### **Card 3: "Rio Museum 2025"**
```tsx
<div className="absolute top-2 right-2 opacity-10">🏛️</div>
```

**Como Substituir**:
- Backoffice: `/public/logos/rio-olympic-museum.svg`
- Campo: `timeline[2].icon`
- Alternativas:
  - Logo oficial do Museu Olímpico
  - Ícone tocha olímpica
  - Arquitetura do prédio (silhueta)

---

#### **Card 4: "BR-CA Binacional"**
```tsx
<div className="absolute top-2 right-2 opacity-15">🇧🇷🇨🇦</div>
```

**Como Substituir**:
- Backoffice: `/public/flags/br-ca-combined.svg`
- Campo: `timeline[3].flags`
- **Melhor opção**: Criar SVG com bandeiras lado a lado (estilizadas, não oficiais)

---

### **3. PILLS CREDENCIAIS (Seção Credibilidade)**

**Localização**: `Home.tsx` ~linha 355

```tsx
<span className="pill-adaptive...">
  <span className="mr-2 opacity-60">🏛️</span> Rio Museum
</span>
<span className="pill-adaptive...">
  <span className="mr-2 opacity-60">🎬</span> Gramado VR
</span>
<span className="pill-adaptive...">
  <span className="mr-2 opacity-60">⚡</span> Autodesk
</span>
<span className="pill-adaptive...">
  <span className="mr-2 opacity-60">🥽</span> XRBR
</span>
```

**Como Substituir**:
- Backoffice: Array `credentials: [{ icon, text }]`
- Opções de ícones:
  - Emoji atual (🏛️🎬⚡🥽) - simples, funcional
  - SVG icons (`/icons/museum.svg`, `/icons/film.svg`)
  - Logos reais (Rio Museum, XRBR, etc)

**Tamanho Ideal**: 16x16px (inline com texto)

---

## 🎨 **HIERARQUIA VISUAL FINAL**

```
┌─────────────────────────────────────────────┐
│ HERO 85VH                                   │
│ ├─ Logo 3D animada                          │
│ └─ Stats: 100+ | 40+ | 1996                 │
├─────────────────────────────────────────────┤
│ CREDIBILIDADE 🆕                            │
│ ├─ Timeline (4 cards COM placeholders)      │
│ └─ Pills (ícones + texto)                   │
├─────────────────────────────────────────────┤
│ VÍDEO FEATURED                              │
├─────────────────────────────────────────────┤
│ PROJETOS 3x3 (imagens reais)                │
├─────────────────────────────────────────────┤
│ SOBRE (2 cards)                             │
│ ├─ Esquerdo: Texto + Imagem fundo 🆕        │
│ └─ Direito: Especialidades                  │
├─────────────────────────────────────────────┤
│ SOLUÇÕES (grid 6 - ícones grandes)          │
└─────────────────────────────────────────────┘
```

**Resultado**:
- ✅ **Sem "buracos"**: Placeholders visuais preenchem espaço
- ✅ **Sem "massa"**: Elementos visuais quebram monotonia do texto
- ✅ **Respiração**: Espaçamento adequado entre seções (py-8 md:py-10)
- ✅ **Substituível**: Todos os placeholders editáveis no backoffice

---

## 📂 **ESTRUTURA DE ARQUIVOS NO BACKOFFICE**

### **Pasta `/public` (substituir placeholders):**

```
public/
├─ logos/
│  ├─ autodesk-logo.svg          # Timeline card 2
│  ├─ rio-olympic-museum.svg     # Timeline card 3
│  ├─ xrbr-logo.svg              # Pill credenciais
│  └─ gramado-vr-logo.svg        # Pill credenciais
│
├─ images/
│  ├─ team-studio.jpg            # Card "Retrato" fundo
│  └─ studio-workspace.jpg       # Alternativa
│
├─ flags/
│  └─ br-ca-combined.svg         # Timeline card 4
│
└─ icons/
   ├─ museum.svg                 # Pills (alternativa emoji)
   ├─ film.svg                   # Pills
   ├─ lightning.svg              # Pills
   └─ vr-headset.svg             # Pills
```

### **Campos no CMS (Backoffice):**

```typescript
// Exemplo de schema no Backoffice
interface HomeContent {
  studio: {
    backgroundImage?: string  // Card "Retrato"
  }
  timeline: Array<{
    year: string
    label: string
    icon?: string           // Emoji ou caminho SVG
    logo?: string           // Caminho para logo (Autodesk, etc)
  }>
  credentials: Array<{
    text: string
    icon?: string           // Emoji ou SVG
  }>
}
```

---

## 🎯 **CHECKLIST DE IMPLEMENTAÇÃO**

### **Fase 1: Placeholders Atuais (✅ FEITO)**
- [x] Card "Retrato" com gradiente + ícone
- [x] Timeline 4 cards com ícones decorativos
- [x] Pills credenciais com ícones inline

### **Fase 2: Substituir no Backoffice (⏳ PRÓXIMO)**
- [ ] Upload de logos reais (Autodesk, Rio Museum, XRBR, Gramado VR)
- [ ] Upload de imagem equipe/estúdio
- [ ] Criar SVG bandeiras BR-CA estilizado
- [ ] Testar opacity/contraste de cada placeholder

### **Fase 3: Otimização (⏳ FUTURO)**
- [ ] Lazy load de imagens de fundo
- [ ] Fallback se backoffice não tiver imagem
- [ ] Versão WebP otimizada
- [ ] Dark/Light mode adjustments

---

## 💡 **REFERÊNCIAS DE DIREÇÃO DE ARTE**

### **Sites Premium que Usam Placeholders Sutis:**

1. **Cartier (Watches & Wonders)**
   - Placeholders: Texturas de materiais (ouro, safira) em opacity 5-10%
   - Efeito: Luxo sem obstruir texto

2. **Inversa (Exo Ape)**
   - Placeholders: Mapas/gráficos em background
   - Efeito: Data-driven sem poluir

3. **Omega (My Little Secret)**
   - Placeholders: Texturas de tecido em layering
   - Efeito: Sensorial, tátil

4. **Igloo Inc (SOTY 2024)**
   - Placeholders: Glitch art + texturas tech
   - Efeito: Futurista, sofisticado

### **Regra de Ouro**:
> **"Placeholder deve ser SENTIDO, não VISTO."**  
> Opacity ideal: **5-15%** (presente mas não intrusivo)

---

## 🚀 **PRÓXIMAS MELHORIAS VISUAIS**

1. **Grid Projetos 3x3**: Já tem imagens reais ✅
2. **Grid Soluções**: Trocar emojis por **ícones ilustrados SVG**
3. **Hero**: Considerar **particles.js** ou **gradient animation** de fundo
4. **Footer**: Adicionar **mapa interativo** com pins (Rio, SP, Belém, Montreal, Vancouver)

---

**Status**: ✅ **PLACEHOLDERS IMPLEMENTADOS E DOCUMENTADOS**  
**Build**: ✅ Passou sem erros  
**Next**: Substituir placeholders com assets reais no backoffice

