# 🎬 IMPLEMENTAÇÃO VISUAL - ROADMAP INCREMENTAL

## 🎯 ESTRATÉGIA: SEGURO E CONSISTENTE

Implementar **1 componente por vez**, testar, depois próximo.
**MANTER 100% consistência** com o design atual do site.

---

## ✅ FASE 1 - COMPONENTES REUTILIZÁVEIS (Semana 1)

### SPRINT 1.1 - VideoPlayer Enhanced (1 dia)
**Arquivo:** `src/components/VideoPlayerEnhanced.tsx`

**O que faz:**
- Usa `VideoPlayer` existente como base
- Adiciona controles custom
- Thumbnail com play hover
- Lightbox modal
- Mantém `card-adaptive` do site

**Não quebra:** Nada, é componente novo

---

### SPRINT 1.2 - ImageGallery (1 dia)
**Arquivo:** `src/components/ImageGallery.tsx`

**O que faz:**
- Grid de imagens responsivo
- Hover zoom smooth
- Lightbox para ampliar
- Usa `card-adaptive` + `glass-panel`

**Não quebra:** Nada, é componente novo

---

### SPRINT 1.3 - AnimatedTimeline (2 dias)
**Arquivo:** `src/components/AnimatedTimeline.tsx`

**O que faz:**
- Timeline vertical com scroll animation
- Usa GSAP (já tem no site)
- Steps com ícones + texto + imagem
- Mantém cores Azimut (#c92337)

**Não quebra:** Nada, é componente novo

---

## ✅ FASE 2 - PÁGINA VANCOUVER VISUAL (Semana 2)

### SPRINT 2.1 - Hero com Video Background (2 dias)
**Arquivo:** `src/pages/Vancouver.tsx` (atualizar)

**Mudanças:**
```tsx
// ANTES:
<section className="relative min-h-[85vh]">
  <div className="absolute inset-0 z-0" style={{backgroundImage: '...'}}>
  
// DEPOIS:
<section className="relative min-h-[85vh] overflow-hidden">
  <VideoPlayerEnhanced
    videoUrl="https://youtube.com/embed/xxx"
    autoplay
    loop
    muted
    overlay={0.4}
  />
```

**Testa:** Hero visual sem quebrar resto da página

---

### SPRINT 2.2 - Depoimentos em Vídeo (1 dia)
**Arquivo:** `src/pages/Vancouver.tsx` (atualizar seção)

**Mudanças:**
```tsx
// ANTES:
<div className="testimonial">
  <p>{quote}</p>
</div>

// DEPOIS:
<VideoCard
  thumbnail="/testimonials/carina-thumb.jpg"
  videoUrl="https://youtube.com/watch?v=xxx"
  name="Carina Lotecki"
  role="CFX Artist @ Disney"
  quote="..."
/>
```

**Testa:** Depoimentos visuais sem quebrar

---

### SPRINT 2.3 - Galeria VFS/VanArts (1 dia)
**Arquivo:** `src/pages/Vancouver.tsx` (atualizar seção)

**Mudanças:**
- Adicionar `<ImageGallery />` nas seções de escolas
- Grid 3x3 com trabalhos de alunos
- Lightbox para ampliar

**Testa:** Galeria sem quebrar tabs

---

### SPRINT 2.4 - Timeline Animada (1 dia)
**Arquivo:** `src/pages/Vancouver.tsx` (atualizar seção)

**Mudanças:**
```tsx
// ANTES:
<ol>
  <li>Orientação Gratuita</li>
  ...
</ol>

// DEPOIS:
<AnimatedTimeline
  steps={[
    {number: 1, title: "Orientação", icon: "🎯", ...},
    ...
  ]}
/>
```

**Testa:** Timeline animada sem quebrar

---

## ✅ FASE 3 - ENGAJAMENTO (Semana 3)

### SPRINT 3.1 - Quiz Interativo (3 dias)
**Arquivo:** `src/components/InteractiveQuiz.tsx` + usar em Vancouver

**O que faz:**
- 5 perguntas com animações
- Resultado: VFS ou VanArts
- Design `card-adaptive`
- Micro-interações

**Testa:** Quiz funcional sem quebrar página

---

### SPRINT 3.2 - CTA Sticky Flutuante (1 dia)
**Arquivo:** `src/components/FloatingCTA.tsx`

**O que faz:**
- Botão fixo bottom-right
- Aparece após 50% scroll
- Pulsando + glow Azimut red
- Fecha com X

**Testa:** CTA não interfere com resto do site

---

### SPRINT 3.3 - Chatbot Flutuante (1 dia)
**Arquivo:** `src/components/ChatbotFloating.tsx`

**O que faz:**
- Avatar animado bottom-right
- 3-5 perguntas simples
- Coleta email ao final
- Design `card-adaptive`

**Testa:** Chatbot não interfere com scroll/navegação

---

## ✅ FASE 4 - BACKOFFICE MÍDIA (Semana 4)

### SPRINT 4.1 - Prisma Models (1 dia)
**Arquivo:** `azimut-cms/prisma/schema.prisma`

**Adicionar:**
```prisma
model VideoTestimonial {
  // ...
}

model SchoolGallery {
  // ...
}
```

**Rodar migration:** `npx prisma migrate dev`

**Testa:** Migration sem erro

---

### SPRINT 4.2 - Admin Upload Vídeos (2 dias)
**Arquivo:** `azimut-cms/app/admin/academy/vancouver/videos/page.tsx`

**O que faz:**
- CRUD de vídeos testimonials
- Upload thumbnail (Cloudinary ou S3)
- Input YouTube URL
- Preview

**Testa:** Upload funcional

---

### SPRINT 4.3 - Admin Galeria (1 dia)
**Arquivo:** `azimut-cms/app/admin/academy/vancouver/gallery/page.tsx`

**O que faz:**
- CRUD de imagens
- Upload múltiplo
- Reorder drag-and-drop

**Testa:** Galeria admin funcional

---

## ✅ CHECKLIST DE CADA SPRINT

**ANTES de implementar:**
- [ ] Ler arquivo existente
- [ ] Identificar onde inserir novo código
- [ ] Verificar não vai quebrar nada

**DURANTE implementação:**
- [ ] Usar classes existentes (card-adaptive, glass-panel)
- [ ] Manter cores Azimut (#c92337)
- [ ] Seguir padrão de animações
- [ ] Responsive (mobile-first)

**DEPOIS de implementar:**
- [ ] Testar em localhost
- [ ] Verificar dark/light theme
- [ ] Testar mobile + desktop
- [ ] Commit + push
- [ ] Mostrar pro usuário

---

## 🎨 GUIA DE CONSISTÊNCIA

### ✅ SEMPRE USAR:
```tsx
// Cards
<div className="card-adaptive rounded-xl border border-white/10">

// Glass panels
<div className="glass-panel backdrop-blur-xl bg-black/60">

// Inputs
<input className="input-adaptive" />

// Botões primários
<button className="bg-azimut-red hover:bg-azimut-red/90">

// Animações
<div className="animate-fade-in-up">
```

### ❌ NUNCA FAZER:
```tsx
// ❌ Cores diferentes do Azimut red
<button className="bg-blue-600">

// ❌ Classes custom que não existem
<div className="my-custom-class">

// ❌ Quebrar componentes travados
// Logo, menu, idiomas, CTA

// ❌ Estilos inline sem usar Tailwind
<div style={{color: '#fff'}}>
```

---

## 📊 PROGRESSO

```
FASE 1: [ ] VideoPlayerEnhanced
        [ ] ImageGallery
        [ ] AnimatedTimeline

FASE 2: [ ] Hero Video
        [ ] Depoimentos Vídeo
        [ ] Galeria VFS/VanArts
        [ ] Timeline Animada

FASE 3: [ ] Quiz Interativo
        [ ] CTA Sticky
        [ ] Chatbot

FASE 4: [ ] Prisma Models
        [ ] Admin Upload
        [ ] Admin Galeria
```

---

## 🚀 COMEÇAR AGORA?

**Opção A:** Começar pela Fase 1 (componentes base)
**Opção B:** Começar pela Fase 2 (Vancouver visual)
**Opção C:** Escolher 1 sprint específico

**Recomendação:** Começar pela **FASE 1 - SPRINT 1.1** (VideoPlayerEnhanced)
- Componente simples
- Não quebra nada
- Base para Fase 2

**Quer que eu implemente agora?** 🎬
