# 🎬 ACADEMY VISUAL PREMIUM 2026-2030

## 🎯 VISÃO

Transformar a Academy em uma **experiência visual cinematográfica** que:
- ✅ **Prende a atenção** (vídeos, animações, interações)
- ✅ **Conta histórias** (depoimentos visuais, cases)
- ✅ **Engaja o público** (gamificação, micro-interações)
- ✅ **Captura leads** (formulários simples, chatbot)
- ✅ **Funciona para TODOS** (estudantes, corporativo, governo, ONGs)

---

## 🎬 REFERÊNCIAS VISUAIS

### 1. **Sites Educacionais Premium**
- **VanArts:** https://www.vanarts.com/
  - Hero com vídeo background
  - Galeria de trabalhos de alunos
  - Depoimentos em vídeo
  
- **VFS:** https://vfs.edu/
  - Vídeos de campus
  - Student reels
  - Industry partners showcase

- **Awwwards Education:** https://www.awwwards.com/websites/education/
  - Inspiração de design top mundial
  - Animações smooth
  - Storytelling visual

### 2. **YouTube - Buscar:**
- "VFS Vancouver Film School campus tour"
- "VanArts student showreel"
- "Brasileiros em Vancouver VFX"
- "Animation school Vancouver"
- "VFS graduation reel"

### 3. **Instagram:**
- @vanarts_institute
- @vfsedu
- @ilmvfx
- @sonyimageworks
- #vancouveranimation

---

## 🏗️ ARQUITETURA VISUAL

### PÁGINA VANCOUVER - LAYOUT PREMIUM

```
┌─────────────────────────────────────────────────┐
│  🎬 HERO FULL-SCREEN (85vh)                     │
│  ├─ Vídeo background (loop muted)               │
│  ├─ Overlay escuro (40%)                        │
│  ├─ Logo Azimut animada (fade in)               │
│  ├─ Título monumental (128px)                   │
│  └─ CTA glow (pulsando)                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  📊 COMPARATIVO VISUAL (cards interativos)      │
│  ├─ 3 cards: PUC | VanArts | VFS                │
│  ├─ Hover: flip card com detalhes               │
│  └─ Animação on scroll (GSAP)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🎓 VFS & VANARTS - TABS VISUAIS                │
│  ├─ Tabs com ícones grandes                     │
│  ├─ Vídeo de cada escola (YouTube embed)        │
│  ├─ Galeria de trabalhos (grid 3x3)             │
│  └─ Programas com cards hover                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🎬 DEPOIMENTOS EM VÍDEO                        │
│  ├─ Grid 3 vídeos (YouTube/Vimeo)               │
│  ├─ Thumbnail customizado                       │
│  ├─ Play hover effect                           │
│  └─ Nome + empresa abaixo                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🗺️ JORNADA INTERATIVA (timeline animada)      │
│  ├─ 5 passos com scroll trigger                 │
│  ├─ Cada passo: ícone + texto + imagem          │
│  ├─ Progress bar animada                        │
│  └─ CTA em cada etapa                           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🎮 QUIZ INTERATIVO "Qual escola é pra você?"   │
│  ├─ 5 perguntas com animações                   │
│  ├─ Resultado: VFS ou VanArts                   │
│  ├─ Gamificação: pontos, badges                 │
│  └─ CTA: Agendar consulta                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  📸 GALERIA INSTAGRAM FEED                      │
│  ├─ Últimos 9 posts @vanarts + @vfs             │
│  ├─ Grid 3x3 com hover overlay                  │
│  └─ Link para Instagram                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  💬 FORMULÁRIO SIMPLIFICADO                     │
│  ├─ Apenas 3 campos: Nome, Email, Interesse     │
│  ├─ Design minimalista                          │
│  ├─ Micro-interações                            │
│  └─ OU: Chatbot flutuante                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🔥 CTA FIXO NO SCROLL                          │
│  ├─ Botão flutuante "Agende Consulta"           │
│  ├─ Aparece após 50% scroll                     │
│  ├─ Pulsando + glow                             │
│  └─ Sticky no bottom-right                      │
└─────────────────────────────────────────────────┘
```

---

## 🎨 COMPONENTES VISUAIS PREMIUM

### 1. **Hero com Vídeo Background**
```tsx
<HeroVideo
  videoUrl="https://www.youtube.com/embed/VIDEO_ID"
  title="Estudar em Vancouver"
  subtitle="Sua carreira internacional começa aqui"
  cta="Calcule seu investimento"
  overlay={0.4}
  height="85vh"
/>
```

### 2. **Video Card (Depoimentos)**
```tsx
<VideoCard
  thumbnail="/depoimentos/carina-thumb.jpg"
  videoUrl="https://youtube.com/watch?v=xxx"
  name="Carina Lotecki"
  role="CFX Artist @ Disney"
  quote="Apenas 1 mês após VFS..."
/>
```

### 3. **Image Gallery (Trabalhos de Alunos)**
```tsx
<ImageGallery
  images={[
    { url: '/gallery/work1.jpg', title: 'VFX Reel' },
    { url: '/gallery/work2.jpg', title: '3D Animation' },
    // ...
  ]}
  columns={3}
  hover="zoom"
/>
```

### 4. **Quiz Interativo**
```tsx
<InteractiveQuiz
  title="Qual escola é perfeita pra você?"
  questions={[
    {
      q: "Qual seu objetivo principal?",
      options: ["Trabalhar em VFX", "Game Art", "Film Production"]
    },
    // ...
  ]}
  onComplete={(result) => {
    // Mostrar VFS ou VanArts
  }}
/>
```

### 5. **Timeline Animada**
```tsx
<AnimatedTimeline
  steps={[
    {
      number: 1,
      title: "Orientação Gratuita",
      image: "/timeline/step1.jpg",
      description: "...",
      icon: "🎯"
    },
    // ...
  ]}
  animation="fade-in-up"
/>
```

---

## 🗄️ BACKOFFICE - ESTRUTURA PARA MÍDIA

### Prisma Schema - Adicionar Models

```prisma
model VideoTestimonial {
  id          String   @id @default(uuid())
  name        String   // Nome da pessoa
  role        String   // Cargo
  company     String   // Empresa
  school      String   // VFS ou VanArts
  videoUrl    String   // YouTube/Vimeo URL
  thumbnail   String?  // Thumbnail customizado
  quote       String?  // Quote curto
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([school])
  @@index([featured])
}

model SchoolGallery {
  id          String   @id @default(uuid())
  school      String   // VFS ou VanArts
  type        String   // campus, students, work, events
  title       String
  imageUrl    String
  videoUrl    String?
  description String?
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  
  @@index([school, type])
}

model AcademySection {
  id          String   @id @default(uuid())
  section     String   // vancouver, courses, workshops, corporate
  type        String   // hero, gallery, testimonial, cta
  title       String
  subtitle    String?
  content     String?  // JSON ou Markdown
  mediaUrl    String?  // Imagem ou vídeo
  ctaText     String?
  ctaUrl      String?
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([section, type])
}
```

### Backoffice Pages

```
/admin/academy
  ├── /vancouver
  │   ├── Hero Settings
  │   ├── Upload Video Background
  │   ├── Testimonials (+ upload vídeos)
  │   ├── Gallery (+ upload imagens)
  │   └── CTAs
  │
  ├── /courses
  │   ├── Course Cards (+ imagens)
  │   ├── Instructors (+ fotos)
  │   └── Student Work Gallery
  │
  ├── /workshops
  │   └── Event Cards (+ banners)
  │
  └── /corporate
      └── Case Studies (+ imagens/vídeos)
```

---

## 🎮 ESTRATÉGIAS DE ENGAJAMENTO

### 1. **Gamificação - Quiz "Descubra Seu Curso"**

**Mecânica:**
- 5 perguntas interativas
- Pontos por resposta
- Resultado personalizado (VFS ou VanArts)
- Badge virtual ("Future VFX Artist")
- Share no Instagram

**Conversão:**
- Ao final: "Quer saber mais? Agende consulta"
- Email opcional para enviar resultado

---

### 2. **Scroll Storytelling**

**Técnica:**
- GSAP ScrollTrigger
- Elementos aparecem conforme scroll
- Vídeos autoplay quando visíveis
- Progress bar no topo

**Exemplo:**
```jsx
gsap.to(".timeline-step", {
  scrollTrigger: {
    trigger: ".timeline-step",
    start: "top 80%",
    end: "top 50%",
    scrub: true
  },
  opacity: 1,
  y: 0
})
```

---

### 3. **Micro-Interações**

**Hover Effects:**
- Cards: lift + shadow
- Botões: glow pulsando
- Imagens: zoom smooth
- Vídeos: play icon animado

**Click Feedback:**
- Ripple effect
- Sound (opcional)
- Confetti (quando completar quiz)

---

### 4. **Chatbot Flutuante**

**Posição:** Bottom-right, sticky
**Avatar:** Logo Azimut animado
**Mensagens:**
- "Oi! Posso te ajudar?"
- "Qual seu interesse? [Vancouver | Cursos | Corporativo]"
- "Vou te enviar mais info no email!"

**Tech:** Tidio, Intercom ou custom

---

### 5. **Progress Tracker**

**Para Interessados em Vancouver:**
- [ ] Quiz completo
- [ ] Viu depoimentos
- [ ] Calculou investimento
- [ ] Agendou consulta
- **Gamificação:** "Você está 75% pronto para Vancouver!"

---

### 6. **Instagram Feed Ao Vivo**

**Integração:**
- Instagram Basic Display API
- Últimos 9 posts @vanarts + @vfsedu
- Grid 3x3 com hover
- Link direto para Instagram

---

### 7. **Countdown Timer**

**Para Intakes:**
- "Intake Janeiro 2026: Faltam 45 dias!"
- Contador regressivo visual
- Urgência controlada (não desesperadora)

---

## 📹 VÍDEOS - FONTES E ESTRATÉGIA

### 1. **Vídeos do YouTube (Embed)**

**VFS:**
- Campus tour
- Student showreels
- Behind the scenes
- Graduation reels

**VanArts:**
- Program overviews
- Student testimonials
- Industry connections

**Buscar:**
```
site:youtube.com "Vancouver Film School"
site:youtube.com "VanArts"
site:youtube.com "VFS student work"
site:youtube.com "brasileiros Vancouver VFX"
```

### 2. **Instagram (Embed ou API)**

**Contas:**
- @vfsedu
- @vanarts_institute
- @ilmvfx (Vancouver)
- @sonyimageworks (Vancouver)

### 3. **Vídeos Próprios (Upload no Backoffice)**

**Tipos:**
- Depoimentos de ex-alunos (gravar remotamente)
- Tour virtual Azimut
- Webinar gravado
- Cases de sucesso

**Upload:** Vimeo (privado) ou YouTube (não listado)

---

## 🎨 DESIGN SYSTEM PREMIUM

### Cores Academy
```css
--academy-red: #c92337
--academy-gold: #f59e0b
--academy-blue: #3b82f6
--academy-dark: #0a0e18
--academy-light: #f9fafb
```

### Tipografia
```css
/* Títulos monumentais */
h1.hero { font-size: clamp(48px, 8vw, 128px); }

/* Subtítulos */
h2 { font-size: clamp(32px, 5vw, 64px); }

/* Corpo */
p { font-size: clamp(16px, 2vw, 20px); line-height: 1.8; }
```

### Animações
```css
/* Fade in up */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Glow pulsing */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(201, 35, 55, 0.4); }
  50% { box-shadow: 0 0 40px rgba(201, 35, 55, 0.8); }
}
```

---

## 🚀 IMPLEMENTAÇÃO - ROADMAP

### SPRINT 1 (Semana 1-2): Vancouver Visual

**Prioridade ALTA:**
- [ ] Hero com vídeo background
- [ ] Seção depoimentos em vídeo (3 vídeos)
- [ ] Galeria VFS/VanArts (imagens + vídeos)
- [ ] Timeline animada (GSAP)
- [ ] CTA flutuante (sticky)

**Tech:**
- React Player (YouTube embed)
- GSAP ScrollTrigger
- Framer Motion
- Lightbox para galeria

---

### SPRINT 2 (Semana 3-4): Backoffice + Mídia

**Prioridade MÉDIA:**
- [ ] Prisma models (VideoTestimonial, SchoolGallery, AcademySection)
- [ ] Admin pages para upload
- [ ] Image upload (Cloudinary ou S3)
- [ ] Video management (YouTube URLs)

---

### SPRINT 3 (Semana 5-6): Engajamento

**Prioridade MÉDIA:**
- [ ] Quiz interativo "Qual escola?"
- [ ] Chatbot flutuante
- [ ] Instagram feed integration
- [ ] Progress tracker

---

### SPRINT 4 (Semana 7-8): Cursos & Workshops

**Prioridade BAIXA:**
- [ ] Página Cursos visual
- [ ] Página Workshops visual
- [ ] Galeria de trabalhos de alunos
- [ ] Instructors showcase

---

## 📊 MÉTRICAS DE SUCESSO

**Engajamento:**
- Tempo médio na página: >3min (vs <1min atual)
- Taxa de scroll: >80% (vs <30% atual)
- Videos played: >50%
- Quiz completion: >30%

**Conversão:**
- Form submissions: +200%
- Chatbot interactions: >40%
- Consultas agendadas: +150%

---

## 🎬 EXEMPLOS VISUAIS

### Hero Video Background
```tsx
<section className="relative h-[85vh] overflow-hidden">
  {/* Vídeo */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/vancouver-hero.mp4" type="video/mp4" />
  </video>
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40" />
  
  {/* Content */}
  <div className="relative z-10 h-full flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-8xl font-handel text-white mb-6 animate-fade-in-up">
        Estudar em Vancouver
      </h1>
      <p className="text-2xl text-white/90 mb-8">
        Sua carreira internacional começa aqui 🍁
      </p>
      <button className="px-8 py-4 bg-azimut-red text-white rounded-lg font-bold text-lg hover:glow-pulse">
        Calcule seu investimento →
      </button>
    </div>
  </div>
  
  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg className="w-6 h-6 text-white/50" />
  </div>
</section>
```

### Video Testimonial Card
```tsx
<div className="group relative bg-black/20 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
  {/* Thumbnail */}
  <img 
    src="/testimonials/carina-thumb.jpg"
    alt="Carina Lotecki"
    className="w-full h-64 object-cover"
  />
  
  {/* Play overlay */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
    <button className="w-20 h-20 rounded-full bg-azimut-red flex items-center justify-center hover:scale-110 transition-transform">
      <PlayIcon className="w-10 h-10 text-white" />
    </button>
  </div>
  
  {/* Info */}
  <div className="p-6">
    <h3 className="text-xl font-bold text-white mb-1">Carina Lotecki</h3>
    <p className="text-azimut-red mb-2">CFX Artist @ Disney</p>
    <p className="text-white/70 italic text-sm">
      "Apenas 1 mês após VFS, já estava trabalhando na Cinesite..."
    </p>
  </div>
</div>
```

---

## 🎯 CONCLUSÃO

**Transformar Academy em experiência VISUAL:**
- ✅ Vídeos: hero, depoimentos, campus
- ✅ Imagens: galeria, trabalhos, eventos
- ✅ Animações: scroll, micro-interações
- ✅ Gamificação: quiz, progress tracker
- ✅ Engajamento: chatbot, CTA sticky
- ✅ Backoffice: upload de mídia

**Objetivo:** Site que PRENDE a atenção e CONVERTE! 🚀

---

**Pronto para implementar?** Vou começar pelo Hero + Depoimentos em vídeo! 🎬
