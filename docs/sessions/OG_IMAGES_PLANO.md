# 🎨 PLANO OG IMAGES - Open Graph para Redes Sociais

**Data:** 2026-01-20  
**Objetivo:** Criar/otimizar imagens 1200x630px para compartilhamento em redes sociais

---

## 📊 **SITUAÇÃO ATUAL**

### **Imagens Existentes:**
✅ `public/og-image.png` (124KB) - Imagem genérica atual  
✅ 8 imagens Vancouver hero (aerial, bluehour, day, flag, madrugada, night, sunset, twilight)

### **Problema:**
❌ `SEO.tsx` referencia `og-image.jpg` mas o arquivo é `og-image.png`  
❌ Não existem OG images específicas para Home, Work, Vancouver

---

## 🎯 **ESTRATÉGIA**

### **Opção 1: Criar Imagens Customizadas (IDEAL)**
Criar 3 imagens 1200x630px com:
- Logo Azimut
- Texto principal da página
- Visual característico
- Design profissional

**Tempo:** 2-3h (design + implementação)

### **Opção 2: Adaptar Imagens Existentes (RÁPIDO)**
Usar imagens existentes + overlay com logo/texto:
- **Home:** `og-image.png` atual (já existe)
- **Work:** Criar composição de projetos
- **Vancouver:** Usar `vancouver-hero-sunset.jpg` ou `vancouver-hero-aerial.jpg`

**Tempo:** 30 min - 1h (adaptação + implementação)

---

## 📝 **PLANO DE EXECUÇÃO**

### **FASE 1: Correção Imediata (5 min)**
- [x] Corrigir referência `og-image.jpg` → `og-image.png` no SEO.tsx
- [ ] Testar se imagem atual carrega

### **FASE 2: Imagens Específicas**

#### **A. HOME** 
**Opção rápida:**
- Usar `og-image.png` atual
- Adicionar ao `seoData.home` no SEO.tsx

**Opção customizada:**
- Criar imagem com:
  - Logo Azimut + estrela
  - Texto: "Experiências que Conectam Mundos"
  - Subtítulo: "Brasil ↔ Canadá"
  - Background escuro premium

#### **B. WORK (Portfolio)**
**Opção rápida:**
- Criar composição simples com logo + texto "Portfolio"

**Opção customizada:**
- Grid com thumbnails de projetos
- Logo + "30 anos transformando ideias"

#### **C. VANCOUVER**
**Opção rápida:**
- Usar `vancouver-hero-sunset.jpg` (584KB - linda!)
- Adicionar overlay com:
  - Logo Azimut
  - Texto: "Estude em Vancouver"
  - "VFS & VanArts Official Agency"

**Opção customizada:**
- Composição com city + logos VFS/VanArts
- Info sobre programas

---

## 🚀 **RECOMENDAÇÃO: OPÇÃO RÁPIDA + EFETIVA**

### **Implementação Imediata (30 min):**

1. **Home:** `og-image.png` (já existe, só corrigir path)

2. **Work:** Criar `og-work.png`
   - Logo Azimut centralizado
   - Texto: "Portfolio | 30 anos de experiências imersivas"
   - Background escuro com estrela sutil

3. **Vancouver:** Criar `og-vancouver.jpg`
   - Base: `vancouver-hero-sunset.jpg`
   - Overlay escuro (50%)
   - Logo Azimut top-left
   - Texto centralizado: "Study in Vancouver"
   - Subtexto: "VFS & VanArts | Official Agency"

---

## 🛠️ **FERRAMENTAS PARA CRIAR**

### **Opção 1: Canva (RECOMENDADO para rapidez)**
- Template: Social Media → Facebook Post (1200x630)
- Upload logo Azimut
- Adicionar textos
- Export PNG/JPG otimizado

### **Opção 2: Figma (para precisão)**
- Frame 1200x630
- Design customizado
- Export @1x PNG

### **Opção 3: PhotoShop/GIMP (profissional)**
- Canvas 1200x630px
- 72 DPI (web)
- Export otimizado < 300KB

### **Opção 4: Código (automatizado)**
- Usar `@vercel/og` ou `satori`
- Gerar dinamicamente
- Mais complexo mas escalável

---

## 📏 **SPECS TÉCNICAS**

### **Dimensões:**
- **Tamanho:** 1200 x 630 pixels (formato landscape)
- **Ratio:** 1.91:1
- **Peso:** Ideal < 200KB, máximo 1MB
- **Formato:** JPG (fotos), PNG (com transparência/logo)

### **Safe Area:**
- Evitar texto nos **primeiros 100px** (topo/bottom)
- Evitar texto nos **primeiros 100px** (left/right)
- Centro é sempre visível

### **Texto:**
- **Fonte:** Grande e legível (min 48px)
- **Contraste:** Alto (branco em escuro, ou vice-versa)
- **Máximo:** 2-3 linhas de texto

---

## ✅ **CHECKLIST IMPLEMENTAÇÃO**

### **Arquivos a criar:**
```
public/
  ├── og-image.png (já existe - Home genérico)
  ├── og-home.png (Home específico - opcional)
  ├── og-work.png (Portfolio)
  └── og-vancouver.jpg (Vancouver)
```

### **Código a atualizar:**
```typescript
// src/components/SEO.tsx
export const seoData = {
  home: {
    pt: {
      // ...
      image: '/og-home.png', // ou '/og-image.png'
    },
  },
  work: {
    pt: {
      // ...
      image: '/og-work.png',
    },
  },
  vancouver: {
    pt: {
      // ...
      image: '/og-vancouver.jpg',
    },
  },
}
```

### **Teste:**
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] WhatsApp: Enviar link e verificar preview

---

## 🎨 **CONTEÚDO SUGERIDO PARA CADA IMAGEM**

### **HOME (`og-home.png`)**
```
Logo: Azimut (top-left)
Título: EXPERIÊNCIAS QUE CONECTAM MUNDOS
Subtítulo: Brasil ↔ Canadá | Cinema, XR, IA
Background: Escuro com estrela vermelha sutil
```

### **WORK (`og-work.png`)**
```
Logo: Azimut (centralizado ou top)
Título: PORTFOLIO
Subtítulo: 30 anos transformando ideias em experiências imersivas
Background: Grid sutil com pattern ou escuro premium
```

### **VANCOUVER (`og-vancouver.jpg`)**
```
Imagem base: vancouver-hero-sunset.jpg
Overlay: Escuro 40%
Logo: Azimut (top-left, branco)
Título: STUDY IN VANCOUVER
Subtítulo: VFS & VanArts | Official Agency
Icons: Bandeiras BR + CA
```

---

## 📝 **PRÓXIMOS PASSOS**

1. **Decidir:** Opção rápida ou customizada?
2. **Ferramen ta:** Canva, Figma, ou código?
3. **Criar:** As 3 imagens (ou adaptar existentes)
4. **Implementar:** Atualizar SEO.tsx
5. **Testar:** Facebook/LinkedIn debugger
6. **Deploy:** Commit + push

---

## 🚦 **DECISÃO NECESSÁRIA**

**Você quer:**

**A) RÁPIDO (30-45 min):**
- Usar `og-image.png` para Home
- Criar versão simples para Work (logo + texto)
- Adaptar `vancouver-sunset` para Vancouver
- Implementar e testar

**B) PROFISSIONAL (2-3h):**
- Criar 3 imagens customizadas no Canva/Figma
- Design premium matching com site
- Implementar e testar

**C) AUTOMÁTICO (1-2h código):**
- Usar `@vercel/og` para gerar dinamicamente
- Mais escalável para futuro
- Requer setup de API route

---

**Me diga qual opção prefere e vamos executar! 🚀**
