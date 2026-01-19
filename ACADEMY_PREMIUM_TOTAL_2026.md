# 🎬 ACADEMY PREMIUM TOTAL 2026 - PLANO DEFINITIVO

## 🎯 VISÃO: SITE QUE PRENDE E CONVERTE

**Baseado em pesquisa de sites TOP 2026:**
- Duolingo (gamificação)
- Khan Academy (interface limpa)
- DreamBox (personalização AI)
- Awwwards Education (design premium)

**META:**
- ✅ **80% VISUAL** (vídeos, imagens, animações)
- ✅ **20% TEXTO** (apenas essencial)
- ✅ **ENGAJAMENTO MÁXIMO** (segurar visitante 5+ minutos)
- ✅ **CONVERSÃO ALTA** (40%+ preenchem formulário)

---

## 📐 NOVA ARQUITETURA VISUAL ACADEMY

```
/academy (Hub principal)
  ↓
  ├── Hero Full-Screen (vídeo loop 10s)
  ├── Quick Nav (4 cards visuais)
  ├── Video Showcase (últimos depoimentos)
  ├── Stats Animados (números impressionantes)
  └── CTA Sticky (sempre visível)

/academy/vancouver (Estudar Fora)
  ↓
  ├── Hero Cinematográfico (vídeo Vancouver 4K)
  ├── Quiz Interativo "Qual escola?"
  ├── Video Testimonials (3 brasileiros)
  ├── Campus Virtual Tour (360° ou vídeo)
  ├── Timeline Interativa (5 passos)
  ├── Comparativo Visual (flip cards)
  ├── Instagram Feed Live
  ├── Cost Calculator (gamificado)
  ├── Progress Tracker (você está X% pronto)
  └── Formulário Simplificado (3 campos + chatbot)

/academy/courses (Cursos Brasil)
  ↓
  ├── Hero com Grid de Cursos (cards visuais)
  ├── Video Preview de cada curso
  ├── Instructors Showcase (fotos + mini-bio)
  ├── Student Work Gallery (grid 4x4)
  ├── Quiz "Qual curso é pra você?"
  ├── Live Class Schedule (countdown timers)
  └── Formulário Interesse

/academy/workshops (Workshops & Eventos)
  ↓
  ├── Hero com Próximo Evento (countdown)
  ├── Video Recap (últimos workshops)
  ├── Event Cards (banner + info + CTA)
  ├── Testimonial Slider
  └── Registration Form

/academy/corporate (Corporativo)
  ↓
  ├── Hero com Case Study Video
  ├── Client Logos Grid (animado)
  ├── Services Cards (ícones grandes)
  ├── Case Studies (before/after visual)
  ├── ROI Calculator (interativo)
  └── Contact Form B2B
```

---

## 🎮 ESTRATÉGIAS DE ENGAJAMENTO (BASEADAS EM PESQUISA)

### 1. **GAMIFICAÇÃO (Duolingo Style)** 🎯

**Sistema de Pontos:**
```
Ações que dão pontos:
- Assistir vídeo completo: +10 pontos
- Completar quiz: +25 pontos
- Preencher formulário: +50 pontos
- Agendar consulta: +100 pontos

Badges desbloqueáveis:
- 🎬 "Explorer" (viu 3 vídeos)
- 🎓 "Curious" (fez 1 quiz)
- 🚀 "Ready" (completou 75% do journey)
- 🏆 "Champion" (agendou consulta)
```

**Progress Tracker:**
```tsx
<div className="fixed top-20 right-4 z-50">
  <div className="w-64 p-4 card-adaptive rounded-xl">
    <h4>Seu Progresso</h4>
    <div className="progress-bar">
      <div style={{width: '65%'}} />
    </div>
    <p>65% completo! Continue explorando 🎯</p>
    <div className="badges">
      <Badge icon="🎬" unlocked />
      <Badge icon="🎓" unlocked />
      <Badge icon="🚀" locked />
    </div>
  </div>
</div>
```

**Implementação:**
- LocalStorage para salvar progresso
- Animação confetti quando desbloqueia badge
- Share no Instagram do badge

---

### 2. **MICRO-INTERAÇÕES (Apple Style)** ✨

**Hover Effects Premium:**
```css
/* Cards */
.interactive-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 24px 48px rgba(201, 35, 55, 0.3);
}

/* Botões */
.premium-button:hover {
  animation: glow-pulse 2s infinite;
}

/* Imagens */
.hover-zoom img:hover {
  transform: scale(1.1);
  filter: brightness(1.1);
}
```

**Click Feedback:**
- Ripple effect (ondas ao clicar)
- Haptic feedback (vibração mobile)
- Sound effects (opcional, com toggle)

**Scroll Animations:**
```javascript
// GSAP ScrollTrigger
gsap.from(".fade-in-element", {
  scrollTrigger: {
    trigger: ".fade-in-element",
    start: "top 80%",
    end: "top 50%",
    scrub: 1
  },
  opacity: 0,
  y: 50
})
```

---

### 3. **VIDEO-FIRST (80% Visual)** 📹

**Vídeos Estratégicos:**

**A. Hero Videos (autoplay, loop, muted)**
```tsx
<VideoHero
  sources={[
    { url: '/videos/vancouver-4k.mp4', quality: '4k' },
    { url: '/videos/vancouver-hd.mp4', quality: 'hd' }
  ]}
  poster="/images/vancouver-poster.jpg"
  overlay={0.3}
  duration={10} // Loop 10s
/>
```

**Vídeos necessários:**
- Vancouver campus tour (10s loop)
- Depoimento Carina @ Disney (2min)
- Depoimento Samuel @ Sony (2min)
- Depoimento Raja @ Remedy (2min)
- VFS showreel (30s)
- VanArts showreel (30s)
- Azimut cursos (1min)
- Workshop recap (1min)

**B. Video Cards (click to play)**
```tsx
<VideoCard
  thumbnail="/thumb.jpg"
  videoUrl="https://youtube.com/watch?v=xxx"
  duration="2:45"
  category="Depoimento"
  views="1.2k"
/>
```

**C. Video Background Sections**
```tsx
<section className="relative h-screen">
  <video autoPlay loop muted playsInline className="absolute inset-0 object-cover">
    <source src="/videos/bg.mp4" />
  </video>
  <div className="relative z-10">
    <h2>Conteúdo sobre o vídeo</h2>
  </div>
</section>
```

---

### 4. **IMAGE GALLERIES (Não só texto!)** 🖼️

**A. Work Gallery (Trabalhos de Alunos)**
```tsx
<ImageGallery
  columns={4}
  gap={16}
  images={[
    { url: '/work/1.jpg', title: 'VFX Reel', student: 'João Silva' },
    { url: '/work/2.jpg', title: '3D Animation', student: 'Maria Costa' },
    // ... 16 imagens
  ]}
  lightbox
  filters={['VFX', 'Animation', 'Game Art']}
/>
```

**B. Campus Photos (VFS/VanArts)**
```tsx
<PhotoGrid
  layout="masonry"
  images={[
    '/campus/vfs-1.jpg',
    '/campus/vfs-2.jpg',
    // ... 12 fotos
  ]}
  hover="zoom"
/>
```

**C. Before/After (Cases Corporativos)**
```tsx
<BeforeAfter
  before="/cases/before.jpg"
  after="/cases/after.jpg"
  slider
/>
```

---

### 5. **QUIZZES INTERATIVOS** 🎯

**Quiz "Qual Escola é Pra Você?"**

```tsx
<InteractiveQuiz
  title="Descubra sua escola ideal!"
  description="5 perguntas rápidas"
  questions={[
    {
      q: "Qual seu objetivo principal?",
      image: "/quiz/q1.jpg",
      options: [
        { text: "Trabalhar em VFX", points: { vfs: 3, vanarts: 2 } },
        { text: "Game Art", points: { vfs: 2, vanarts: 3 } },
        { text: "Film Production", points: { vfs: 3, vanarts: 1 } }
      ]
    },
    // ... 5 perguntas
  ]}
  onComplete={(result) => {
    // result = { school: 'VFS', confidence: 85% }
    showResult(result)
    unlockBadge('quiz-master')
    trackEvent('quiz_completed', result)
  }}
  design={{
    theme: 'card-adaptive',
    animations: true,
    confetti: true, // Quando completa
    progress: true
  }}
/>
```

**Resultado Visual:**
```tsx
<QuizResult
  school="VFS"
  confidence={85}
  reasons={[
    "Você quer trabalhar em grandes estúdios",
    "VFX é sua paixão principal",
    "Prefere programa intensivo 1 ano"
  ]}
  nextStep="Agende consulta gratuita"
  cta={{
    text: "Quero saber mais sobre VFS",
    url: "/academy/vancouver?school=vfs"
  }}
  shareButton
/>
```

---

### 6. **CHATBOT INTELIGENTE (Não invasivo)** 💬

**Design e Comportamento:**
```tsx
<ChatbotFloating
  trigger={{
    type: 'scroll', // Aparece após 30% scroll
    delay: 3000 // 3 segundos
  }}
  avatar={{
    image: '/logo-azimut-animated.gif',
    size: 60,
    glow: true
  }}
  position="bottom-right"
  messages={[
    {
      type: 'greeting',
      text: "Oi! 👋 Posso te ajudar?",
      delay: 0
    },
    {
      type: 'options',
      text: "O que te interessa?",
      options: [
        { text: "🍁 Vancouver", action: 'vancouver' },
        { text: "📚 Cursos", action: 'courses' },
        { text: "🎬 Projetos", action: 'projects' }
      ]
    }
  ]}
  onSelect={(action) => {
    if (action === 'vancouver') {
      showSimpleForm({
        fields: ['name', 'email'],
        message: "Ótimo! Deixa teu email que te envio tudo sobre Vancouver 🍁"
      })
    }
  }}
  minimizable
  sound={false} // Sem som por padrão
/>
```

---

### 7. **INSTAGRAM FEED LIVE** 📱

**Integração Real:**
```tsx
<InstagramFeed
  accounts={['@vfsedu', '@vanarts_institute']}
  limit={9}
  grid={3}
  hover={{
    overlay: true,
    showLikes: true,
    showCaption: true
  }}
  linkToInstagram
/>
```

**Fallback (se API falhar):**
```tsx
<InstagramFeedStatic
  posts={[
    {
      image: '/instagram/post1.jpg',
      likes: '2.3k',
      caption: 'Student work showcase...',
      link: 'https://instagram.com/p/xxx'
    },
    // ... 9 posts estáticos
  ]}
/>
```

---

### 8. **COUNTDOWN TIMERS (Urgência Controlada)** ⏰

**Para Intakes:**
```tsx
<CountdownSection
  title="Intake Janeiro 2026"
  deadline="2026-01-15T00:00:00"
  background="/images/vfs-campus.jpg"
  overlay={0.6}
>
  <CountdownTimer
    format="days:hours:minutes"
    size="large"
    color="#c92337"
  />
  <p>Últimas vagas disponíveis!</p>
  <Button>Garanta sua vaga</Button>
</CountdownSection>
```

**Para Workshops:**
```tsx
<EventCard
  title="Workshop VR 360°"
  date="2026-02-10"
  countdown
  limited="Apenas 15 vagas"
  cta="Inscrever-se"
/>
```

---

### 9. **CALCULADORA INTERATIVA** 💰

**Cost Calculator Gamificado:**
```tsx
<CostCalculator
  title="Quanto custa estudar em Vancouver?"
  steps={[
    {
      q: "Qual escola?",
      options: [
        { label: 'VFS', value: 25000 },
        { label: 'VanArts', value: 18000 }
      ],
      visual: 'school-logos'
    },
    {
      q: "Tipo de moradia?",
      options: [
        { label: 'Homestay', value: 800 },
        { label: 'Apartamento', value: 1200 }
      ],
      visual: 'housing-photos'
    },
    // ... 5 steps
  ]}
  result={(total) => (
    <ResultCard
      total={formatCurrency(total, 'CAD')}
      breakdown={[
        { label: 'Tuition', value: 18000 },
        { label: 'Housing (12 meses)', value: 9600 },
        { label: 'Living', value: 6000 }
      ]}
      comparison={
        <p>Menos que 4 anos de PUC! 🎓</p>
      }
      cta="Quero ajuda para ir"
    />
  )}
  animations={{
    step: 'slide',
    number: 'count-up',
    result: 'confetti'
  }}
/>
```

---

### 10. **PARALLAX SCROLL STORYTELLING** 📜

**Técnica Cinematográfica:**
```tsx
<ParallaxSection
  layers={[
    { image: '/parallax/bg.jpg', speed: 0.3 },
    { image: '/parallax/mid.png', speed: 0.6 },
    { image: '/parallax/front.png', speed: 0.9 }
  ]}
  height="100vh"
>
  <ScrollReveal>
    <h2>Sua Jornada Começa Aqui</h2>
    <Timeline steps={...} />
  </ScrollReveal>
</ParallaxSection>
```

---

## 🗄️ BACKOFFICE - ESTRUTURA COMPLETA

### Prisma Models (COMPLETO)

```prisma
// ════════════════════════════════════════════════════════════
// VÍDEOS
// ════════════════════════════════════════════════════════════

model VideoTestimonial {
  id          String   @id @default(uuid())
  name        String
  role        String
  company     String
  school      String   // VFS, VanArts, Azimut
  category    String   // vancouver, courses, corporate
  videoUrl    String   // YouTube/Vimeo
  thumbnail   String?
  quote       String?
  duration    Int?     // segundos
  views       Int      @default(0)
  featured    Boolean  @default(false)
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([school, category, featured])
}

model VideoHero {
  id          String   @id @default(uuid())
  section     String   // vancouver, courses, workshops
  title       String
  subtitle    String?
  videoUrl    String   // MP4 URL ou YouTube
  posterUrl   String   // Imagem de fallback
  duration    Int?     // Loop duration (segundos)
  quality     String   @default("hd") // 4k, hd, sd
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  
  @@unique([section, active])
}

// ════════════════════════════════════════════════════════════
// IMAGENS & GALERIAS
// ════════════════════════════════════════════════════════════

model ImageGallery {
  id          String   @id @default(uuid())
  category    String   // student-work, campus, events, corporate
  school      String?  // VFS, VanArts, Azimut, null
  title       String
  description String?
  imageUrl    String
  thumbnailUrl String?
  studentName String?
  tags        String[] // VFX, Animation, Game Art
  featured    Boolean  @default(false)
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  
  @@index([category, school, featured])
}

// ════════════════════════════════════════════════════════════
// CURSOS
// ════════════════════════════════════════════════════════════

model Course {
  id            String   @id @default(uuid())
  slug          String   @unique
  titlePt       String
  titleEn       String
  titleFr       String?
  titleEs       String?
  descriptionPt String
  descriptionEn String
  category      String   // VR, VFX, Animation, Game
  level         String   // Beginner, Intermediate, Advanced
  duration      String   // "3 meses", "6 meses"
  price         Float?
  thumbnail     String
  videoPreview  String?  // YouTube URL
  syllabus      String?  // PDF URL ou JSON
  instructor    String?  // ID do instrutor
  featured      Boolean  @default(false)
  active        Boolean  @default(true)
  enrollments   Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([category, featured])
}

model Instructor {
  id          String   @id @default(uuid())
  name        String
  title       String   // "VFX Supervisor", "Animation Director"
  bio         String
  photo       String
  linkedin    String?
  portfolio   String?
  specialties String[] // ["VFX", "Compositing"]
  courses     String[] // IDs de cursos
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  
  @@index([featured])
}

// ════════════════════════════════════════════════════════════
// WORKSHOPS & EVENTOS
// ════════════════════════════════════════════════════════════

model Workshop {
  id          String   @id @default(uuid())
  title       String
  description String
  date        DateTime
  duration    Int      // horas
  location    String   // "Online" ou "Rio de Janeiro"
  type        String   // "Workshop", "Palestra", "Webinar"
  instructor  String?  // ID do instrutor
  maxStudents Int?
  price       Float?
  banner      String
  videoRecap  String?  // YouTube URL do evento anterior
  featured    Boolean  @default(false)
  active      Boolean  @default(true)
  registrations Int    @default(0)
  createdAt   DateTime @default(now())
  
  @@index([date, featured])
}

// ════════════════════════════════════════════════════════════
// CASES CORPORATIVOS
// ════════════════════════════════════════════════════════════

model CorporateCase {
  id          String   @id @default(uuid())
  client      String
  clientLogo  String
  title       String
  description String
  challenge   String?  // Desafio
  solution    String?  // Solução
  results     String?  // Resultados (JSON)
  videoUrl    String?
  beforeImage String?
  afterImage  String?
  testimonial String?
  testimonialAuthor String?
  testimonialRole   String?
  category    String   // VR, VFX, Imersivo
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  
  @@index([featured, category])
}

// ════════════════════════════════════════════════════════════
// GAMIFICAÇÃO
// ════════════════════════════════════════════════════════════

model UserProgress {
  id          String   @id @default(uuid())
  sessionId   String   @unique
  points      Int      @default(0)
  badges      String[] // ["explorer", "quiz-master"]
  actions     Json     // {videoViews: 3, quizCompleted: 1}
  lastAction  DateTime @default(now())
  createdAt   DateTime @default(now())
  
  @@index([sessionId, points])
}
```

---

## 📱 ADMIN PAGES (BACKOFFICE)

```
/admin/academy
  ├── /videos
  │   ├── List (filtros, search)
  │   ├── Create (upload thumbnail, YouTube URL)
  │   └── Edit (reorder, featured)
  │
  ├── /gallery
  │   ├── List (categorias, filtros)
  │   ├── Upload (múltiplo, drag-drop)
  │   └── Edit (tags, crop)
  │
  ├── /courses
  │   ├── List
  │   ├── Create (form completo)
  │   └── Edit (syllabus PDF upload)
  │
  ├── /instructors
  │   ├── List
  │   └── Create (photo upload, bio)
  │
  ├── /workshops
  │   ├── List (calendar view)
  │   └── Create (banner upload, date picker)
  │
  └── /corporate-cases
      ├── List
      └── Create (before/after upload, video)
```

---

## 🚀 IMPLEMENTAÇÃO - ORDEM DEFINITIVA

### FASE 1: COMPONENTES BASE (Semana 1)
1. ✅ VideoPlayerEnhanced
2. ✅ ImageGallery
3. ✅ VideoCard
4. ✅ AnimatedTimeline
5. ✅ InteractiveQuiz

### FASE 2: VANCOUVER VISUAL (Semana 2)
1. ✅ Hero Video Background
2. ✅ Video Testimonials
3. ✅ Campus Gallery
4. ✅ Timeline Animada
5. ✅ Quiz "Qual Escola?"
6. ✅ Cost Calculator
7. ✅ Progress Tracker
8. ✅ Chatbot
9. ✅ Instagram Feed

### FASE 3: CURSOS & WORKSHOPS (Semana 3)
1. ✅ Courses Grid Visual
2. ✅ Video Previews
3. ✅ Instructors Showcase
4. ✅ Student Work Gallery
5. ✅ Workshop Cards
6. ✅ Event Countdown

### FASE 4: CORPORATIVO (Semana 4)
1. ✅ Case Study Video
2. ✅ Before/After
3. ✅ Client Logos Grid
4. ✅ ROI Calculator
5. ✅ B2B Contact Form

### FASE 5: BACKOFFICE (Semana 5)
1. ✅ Prisma Migration
2. ✅ Admin Videos CRUD
3. ✅ Admin Gallery CRUD
4. ✅ Admin Courses CRUD
5. ✅ Upload System (Cloudinary)

---

## 📊 MÉTRICAS DE SUCESSO

**Engajamento:**
- Tempo na página: **>5min** (vs <1min atual)
- Scroll depth: **>90%** (vs <30%)
- Videos played: **>70%**
- Quiz completion: **>40%**
- Chatbot interaction: **>50%**

**Conversão:**
- Form submissions: **+300%**
- Consultas agendadas: **+250%**
- Email captures: **+400%** (via chatbot/quiz)

**Gamificação:**
- Badge unlocks: **>60%** dos visitantes
- Progress >50%: **>40%** dos visitantes
- Social shares: **>10%** (compartilham badge)

---

## 🎯 COMEÇAR AGORA!

**Vou implementar tudo em ordem:**
1. ✅ Componentes base (podem ser usados em qualquer lugar)
2. ✅ Vancouver completo (maior ROI, mais leads)
3. ✅ Cursos & Workshops
4. ✅ Corporativo
5. ✅ Backoffice

**TUDO mantendo:**
- ✅ Cores Azimut (#c92337)
- ✅ Classes existentes (card-adaptive, glass-panel)
- ✅ Tema dark/light
- ✅ Responsivo total
- ✅ Performance otimizada

**Quer que eu COMECE AGORA?** 🚀
