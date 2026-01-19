# 🎬 COMPONENTES BASE - GUIA DE USO

## ✅ 5 COMPONENTES CRIADOS (FASE 1 COMPLETA)

Todos os componentes mantêm **100% consistência** com o site:
- ✅ `card-adaptive` (tema dark/light)
- ✅ Cor Azimut Red `#c92337`
- ✅ `glass-panel` (glassmorphism)
- ✅ Animações smooth
- ✅ Responsive total

---

## 1. VideoPlayerEnhanced

**Arquivo:** `src/components/VideoPlayerEnhanced.tsx`

### Features:
- 3 modos: `default`, `hero`, `lightbox`
- Suporta: YouTube, Vimeo, MP4 local
- Controles custom premium
- Overlay configurável
- Múltiplas qualidades (4K, HD, SD)

### Uso:

```tsx
import { VideoPlayerEnhanced } from '@/components/VideoPlayerEnhanced'

// Modo Hero (background full-screen)
<VideoPlayerEnhanced
  sources={[
    { url: '/videos/hero.mp4', quality: 'hd' }
  ]}
  mode="hero"
  autoplay
  loop
  muted
  overlay={0.4}
/>

// Modo Lightbox (abre modal ao clicar)
<VideoPlayerEnhanced
  sources="https://youtube.com/watch?v=xxx"
  mode="lightbox"
  thumbnail="/thumb.jpg"
  title="Depoimento Carina @ Disney"
  duration="2:45"
  category="Testimonial"
/>

// Modo Default (player normal)
<VideoPlayerEnhanced
  sources="https://youtube.com/watch?v=xxx"
  autoplay
  showControls
/>
```

---

## 2. ImageGallery

**Arquivo:** `src/components/ImageGallery.tsx`

### Features:
- Grid responsivo (1-6 colunas)
- Lightbox fullscreen com navegação
- Filtros por categoria/tag
- Hover zoom smooth
- Lazy loading
- Keyboard navigation (Esc, ←→)

### Uso:

```tsx
import { ImageGallery, type GalleryImage } from '@/components/ImageGallery'

const images: GalleryImage[] = [
  {
    url: '/gallery/work1.jpg',
    thumbnailUrl: '/gallery/work1-thumb.jpg',
    title: 'VFX Showreel',
    description: 'Compositing e Motion Graphics',
    category: 'VFX',
    tags: ['Compositing', 'After Effects'],
    studentName: 'João Silva',
    year: 2024,
    featured: true
  },
  // ... mais imagens
]

<ImageGallery
  images={images}
  columns={4}
  gap={16}
  lightbox
  filters={['VFX', 'Animation', 'Game Art']}
  showInfo
/>
```

---

## 3. VideoCard

**Arquivo:** `src/components/VideoCard.tsx`

### Features:
- Thumbnail com hover glow Azimut
- Play button animado
- Badges (categoria, duração, featured)
- Author info (foto, nome, role, company)
- Views formatadas (1.2k, 2.3M)
- Lightbox integrado

### Uso:

```tsx
import { VideoCard } from '@/components/VideoCard'

<VideoCard
  videoUrl="https://youtube.com/watch?v=xxx"
  thumbnail="/testimonials/carina-thumb.jpg"
  title="Como entrei na Disney"
  description="Minha jornada de estudante VFS até Character FX Artist na Disney"
  category="Testimonial"
  duration="2:45"
  views={1200}
  date="Jan 2026"
  authorName="Carina Lotecki"
  authorRole="Character FX Artist"
  authorCompany="Disney"
  authorPhoto="/testimonials/carina.jpg"
  featured
/>
```

---

## 4. AnimatedTimeline

**Arquivo:** `src/components/AnimatedTimeline.tsx`

### Features:
- Layout vertical/horizontal
- GSAP ScrollTrigger (animação no scroll)
- Círculos animados com glow
- Cards com imagem opcional
- Barra de progresso vertical

### Uso:

```tsx
import { AnimatedTimeline, type TimelineStep } from '@/components/AnimatedTimeline'

const steps: TimelineStep[] = [
  {
    number: 1,
    icon: '🎯',
    title: 'Orientação Gratuita',
    description: 'Consultoria completa sobre VFS e VanArts, escolha de curso, requisitos.',
    image: '/timeline/step1.jpg',
    date: 'Semana 1',
    badge: 'Grátis',
    link: {
      text: 'Agendar consulta',
      url: '/contact'
    }
  },
  {
    number: 2,
    icon: '📝',
    title: 'Application',
    description: 'Auxílio completo no processo de inscrição e portfólio.',
    date: 'Semana 2-4'
  },
  // ... mais steps
]

<AnimatedTimeline
  steps={steps}
  layout="vertical"
  activeColor="#c92337"
/>
```

---

## 5. InteractiveQuiz

**Arquivo:** `src/components/InteractiveQuiz.tsx`

### Features:
- Perguntas single/multiple choice
- Sistema de pontos por resultado
- Progress bar
- Confetti animation
- Resultado visual com badge
- Share social (native share API)
- Reiniciar quiz

### Uso:

```tsx
import { InteractiveQuiz, type QuizQuestion, type QuizResult } from '@/components/InteractiveQuiz'

const questions: QuizQuestion[] = [
  {
    q: 'Qual seu objetivo principal?',
    description: 'Escolha a área que mais te interessa',
    image: '/quiz/q1.jpg',
    type: 'single',
    options: [
      {
        text: 'Trabalhar em VFX para cinema',
        points: { vfs: 3, vanarts: 2 }
      },
      {
        text: 'Game Art e Character Design',
        points: { vfs: 2, vanarts: 3 }
      },
      {
        text: 'Film Production',
        points: { vfs: 3, vanarts: 1 }
      }
    ]
  },
  // ... mais perguntas
]

const results: QuizResult[] = [
  {
    id: 'vfs',
    title: 'VFS é perfeita para você!',
    description: 'Baseado nas suas respostas, a Vancouver Film School é ideal...',
    image: '/quiz/result-vfs.jpg',
    badge: '🎓',
    emoji: '🎬',
    cta: {
      text: 'Saber mais sobre VFS',
      url: '/academy/vancouver?school=vfs'
    },
    shareText: 'Fiz o quiz e descobri que VFS é ideal pra mim! 🎬'
  },
  {
    id: 'vanarts',
    title: 'VanArts é perfeita para você!',
    // ...
  }
]

<InteractiveQuiz
  title="Qual escola é pra você?"
  description="5 perguntas rápidas para descobrir"
  questions={questions}
  results={results}
  showProgress
  enableConfetti
  onComplete={(result, answers) => {
    console.log('Quiz completo!', result, answers)
    // Enviar para analytics, lead capture, etc.
  }}
  onShare={(result) => {
    console.log('Compartilhou:', result.title)
  }}
/>
```

---

## 🎨 EXEMPLOS DE USO COMBINADO

### Vancouver Page - Hero + Timeline + Quiz

```tsx
import { VideoPlayerEnhanced } from '@/components/VideoPlayerEnhanced'
import { AnimatedTimeline } from '@/components/AnimatedTimeline'
import { InteractiveQuiz } from '@/components/InteractiveQuiz'

export const VancouverPage = () => {
  return (
    <div>
      {/* Hero Video Background */}
      <section className="relative h-screen">
        <VideoPlayerEnhanced
          sources={[
            { url: '/videos/vancouver-4k.mp4', quality: '4k' },
            { url: '/videos/vancouver-hd.mp4', quality: 'hd' }
          ]}
          mode="hero"
          autoplay
          loop
          muted
          overlay={0.4}
        />
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Estudar em Vancouver
            </h1>
            <p className="text-xl text-white/80">
              Forme-se em 1 ano nas melhores escolas de mídia do Canadá
            </p>
          </div>
        </div>
      </section>

      {/* Timeline - Passo a Passo */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Como Funciona
        </h2>
        <AnimatedTimeline
          steps={timelineSteps}
          layout="vertical"
          activeColor="#c92337"
        />
      </section>

      {/* Quiz Interativo */}
      <section className="container mx-auto py-20 px-4">
        <InteractiveQuiz
          title="Qual escola é pra você?"
          questions={quizQuestions}
          results={quizResults}
          showProgress
          enableConfetti
        />
      </section>
    </div>
  )
}
```

### Testimonials Grid

```tsx
import { VideoCard } from '@/components/VideoCard'

export const TestimonialsSection = () => {
  const testimonials = [
    {
      videoUrl: 'https://youtube.com/watch?v=xxx',
      thumbnail: '/testimonials/carina-thumb.jpg',
      authorName: 'Carina Lotecki',
      authorRole: 'Character FX Artist',
      authorCompany: 'Disney',
      // ...
    },
    // ... mais testimonials
  ]

  return (
    <section className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Depoimentos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <VideoCard key={i} {...t} />
        ))}
      </div>
    </section>
  )
}
```

### Student Work Gallery

```tsx
import { ImageGallery } from '@/components/ImageGallery'

export const StudentWorkSection = () => {
  return (
    <section className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Trabalhos de Alunos
      </h2>
      <ImageGallery
        images={studentWorkImages}
        columns={4}
        gap={16}
        lightbox
        filters={['VFX', 'Animation', 'Game Art', '3D Modeling']}
        showInfo
        lazyLoad
      />
    </section>
  )
}
```

---

## 🚀 PRÓXIMOS PASSOS

Agora que os componentes base estão prontos, você pode:

### FASE 2: IMPLEMENTAR NO VANCOUVER
1. Atualizar `/academy/vancouver` com estes componentes
2. Hero video 4K
3. Video testimonials
4. Campus gallery
5. Timeline interativa
6. Quiz "Qual escola?"

### FASE 3: BACKOFFICE
1. Criar Prisma models para vídeos/imagens
2. Admin CRUD para upload
3. API endpoints

---

## 📊 STATUS

```
✅ VideoPlayerEnhanced
✅ ImageGallery
✅ VideoCard
✅ AnimatedTimeline
✅ InteractiveQuiz
⏳ Testar em dark/light mode
⏳ Implementar em Vancouver page
⏳ Criar Prisma models
⏳ Criar admin pages
```

**FASE 1: 100% COMPLETA! 🎉**
