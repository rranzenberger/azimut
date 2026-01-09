# 🗄️ PRISMA MODELS PARA ACADEMY

## 📋 MODELS CRIADOS

Adicionar ao final de `azimut-cms/prisma/schema.prisma` (ANTES dos enums):

```prisma
// ════════════════════════════════════════════════════════════
// ACADEMY MODELS
// ════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// INSTRUCTORS (Professores)
// ─────────────────────────────────────────────────────────────
model AcademyInstructor {
  id            String   @id @default(uuid())
  name          String
  role          String   // Ex: "PhD", "Coordenador", "Professor"
  bioPt         String?
  bioEn         String?
  bioEs         String?
  bioFr         String?
  photoUrl      String?  // URL da foto
  email         String?
  linkedinUrl   String?
  areas         String[] // Ex: ["VR", "IA", "VFX"]
  featured      Boolean  @default(false)
  priority      Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  courses       AcademyCourse[]   @relation("CourseInstructor")
  workshops     AcademyWorkshop[] @relation("WorkshopInstructor")
  
  @@index([featured])
  @@index([priority])
}

// ─────────────────────────────────────────────────────────────
// COURSES (Cursos)
// ─────────────────────────────────────────────────────────────
model AcademyCourse {
  id              String   @id @default(uuid())
  slug            String   @unique
  titlePt         String
  titleEn         String?
  titleEs         String?
  titleFr         String?
  descriptionPt   String?
  descriptionEn   String?
  descriptionEs   String?
  descriptionFr   String?
  duration        String   // Ex: "16 horas", "2 semanas"
  level           String   // Ex: "Iniciante", "Intermediário", "Avançado"
  audiencePt      String?  // Ex: "Cineastas, produtores"
  audienceEn      String?
  thumbnailUrl    String?  // URL da thumbnail
  videoPreviewUrl String?  // YouTube URL (opcional)
  syllabusUrl     String?  // PDF do programa
  icon            String?  // Emoji
  featured        Boolean  @default(false)
  tags            String[] // Ex: ["vr", "cinema", "360"]
  status          CourseStatus @default(DRAFT)
  priority        Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  instructorId    String?
  instructor      AcademyInstructor? @relation("CourseInstructor", fields: [instructorId], references: [id])
  
  studentWork     AcademyMedia[] @relation("CourseStudentWork")
  
  @@index([status])
  @@index([featured])
  @@index([priority])
}

// ─────────────────────────────────────────────────────────────
// WORKSHOPS (Workshops & Eventos)
// ─────────────────────────────────────────────────────────────
model AcademyWorkshop {
  id              String   @id @default(uuid())
  slug            String   @unique
  titlePt         String
  titleEn         String?
  titleEs         String?
  titleFr         String?
  descriptionPt   String?
  descriptionEn   String?
  descriptionEs   String?
  descriptionFr   String?
  duration        String   // Ex: "4 horas", "2 dias"
  format          String   // Ex: "Presencial", "Online", "Híbrido"
  audiencePt      String?
  audienceEn      String?
  bannerUrl       String?  // URL do banner
  icon            String?  // Emoji
  upcoming        Boolean  @default(false)
  eventDate       DateTime?
  status          WorkshopStatus @default(DRAFT)
  priority        Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  instructorId    String?
  instructor      AcademyInstructor? @relation("WorkshopInstructor", fields: [instructorId], references: [id])
  
  photos          AcademyMedia[] @relation("WorkshopPhotos")
  videoRecapUrl   String?        // YouTube URL do recap
  
  @@index([status])
  @@index([upcoming])
  @@index([priority])
}

// ─────────────────────────────────────────────────────────────
// CORPORATE CLIENTS (Clientes Corporativos)
// ─────────────────────────────────────────────────────────────
model AcademyClient {
  id          String   @id @default(uuid())
  name        String
  logoUrl     String?  // URL do logo
  sector      String?  // Ex: "Mídia", "Indústria", "Cultura"
  featured    Boolean  @default(false)
  priority    Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  cases       AcademyCase[] @relation("CaseClient")
  
  @@index([featured])
  @@index([priority])
}

// ─────────────────────────────────────────────────────────────
// CORPORATE CASES (Cases de Sucesso)
// ─────────────────────────────────────────────────────────────
model AcademyCase {
  id              String   @id @default(uuid())
  slug            String   @unique
  titlePt         String
  titleEn         String?
  titleEs         String?
  titleFr         String?
  descriptionPt   String?
  descriptionEn   String?
  descriptionEs   String?
  descriptionFr   String?
  resultsPt       String[] // Lista de resultados
  resultsEn       String[]
  coverUrl        String?  // URL da capa
  videoUrl        String?  // YouTube URL (opcional)
  featured        Boolean  @default(false)
  priority        Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  clientId        String?
  client          AcademyClient? @relation("CaseClient", fields: [clientId], references: [id])
  
  @@index([featured])
  @@index([priority])
}

// ─────────────────────────────────────────────────────────────
// ACADEMY MEDIA (Galeria de Fotos, Vídeos, etc)
// ─────────────────────────────────────────────────────────────
model AcademyMedia {
  id          String   @id @default(uuid())
  type        AcademyMediaType @default(IMAGE)
  url         String
  thumbnailUrl String?
  title       String?
  caption     String?
  category    String?  // Ex: "Student Work", "Workshop Photos", "Campus", etc
  tags        String[] // Ex: ["vr", "animation", "2024"]
  featured    Boolean  @default(false)
  priority    Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  courseId    String?
  course      AcademyCourse? @relation("CourseStudentWork", fields: [courseId], references: [id])
  
  workshopId  String?
  workshop    AcademyWorkshop? @relation("WorkshopPhotos", fields: [workshopId], references: [id])
  
  @@index([type])
  @@index([category])
  @@index([featured])
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS (Depoimentos)
// ─────────────────────────────────────────────────────────────
model AcademyTestimonial {
  id          String   @id @default(uuid())
  name        String
  role        String   // Ex: "Designer, Globo"
  textPt      String
  textEn      String?
  textEs      String?
  textFr      String?
  photoUrl    String?  // URL da foto
  videoUrl    String?  // YouTube URL (opcional)
  category    TestimonialCategory @default(GENERAL)
  featured    Boolean  @default(false)
  priority    Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([category])
  @@index([featured])
}

// ─────────────────────────────────────────────────────────────
// VANCOUVER PROGRAMS (VFS/VanArts)
// ─────────────────────────────────────────────────────────────
model VancouverProgram {
  id              String   @id @default(uuid())
  school          String   // "VFS" ou "VanArts"
  titlePt         String
  titleEn         String?
  descriptionPt   String?
  descriptionEn   String?
  duration        String   // Ex: "1 year"
  tuition         String   // Ex: "CAD 60,000"
  startDates      String[] // Ex: ["Sep 2026", "Jan 2027"]
  thumbnailUrl    String?
  syllabusUrl     String?  // PDF
  externalUrl     String?  // URL do site da escola
  featured        Boolean  @default(false)
  priority        Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([school])
  @@index([featured])
}
```

## 📋 ENUMS A ADICIONAR

Adicionar ao final de `azimut-cms/prisma/schema.prisma`:

```prisma
// ─────────────────────────────────────────────────────────────
// ACADEMY ENUMS
// ─────────────────────────────────────────────────────────────

enum CourseStatus {
  DRAFT
  PUBLISHED
  UPCOMING
  ARCHIVED
}

enum WorkshopStatus {
  DRAFT
  PUBLISHED
  UPCOMING
  PAST
  ARCHIVED
}

enum AcademyMediaType {
  IMAGE
  VIDEO
  PDF
}

enum TestimonialCategory {
  GENERAL
  COURSE
  WORKSHOP
  CORPORATE
  VANCOUVER
}
```

---

## 🚀 COMO APLICAR

### 1. EDITAR O SCHEMA
```bash
# Abrir o arquivo
code azimut-cms/prisma/schema.prisma

# Adicionar os models ANTES dos enums existentes (linha ~432)
# Adicionar os novos enums NO FINAL (após linha ~529)
```

### 2. RODAR A MIGRATION
```bash
cd azimut-cms
npx prisma migrate dev --name add_academy_models
```

### 3. GERAR PRISMA CLIENT
```bash
npx prisma generate
```

### 4. VERIFICAR NO BANCO
```bash
npx prisma studio
```

---

## 📊 ESTRUTURA DE DADOS

### RESUMO DOS MODELS:

```
Academy Models:
├── AcademyInstructor (Professores)
├── AcademyCourse (Cursos)
├── AcademyWorkshop (Workshops)
├── AcademyClient (Clientes Corporativos)
├── AcademyCase (Cases de Sucesso)
├── AcademyMedia (Galeria Geral)
├── AcademyTestimonial (Depoimentos)
└── VancouverProgram (Programas VFS/VanArts)
```

### RELACIONAMENTOS:

```
AcademyInstructor
├── 1:N → AcademyCourse
└── 1:N → AcademyWorkshop

AcademyCourse
├── N:1 → AcademyInstructor
└── 1:N → AcademyMedia (Student Work)

AcademyWorkshop
├── N:1 → AcademyInstructor
└── 1:N → AcademyMedia (Photos)

AcademyClient
└── 1:N → AcademyCase

AcademyCase
└── N:1 → AcademyClient

AcademyMedia
├── N:1 → AcademyCourse
└── N:1 → AcademyWorkshop
```

---

## 📝 EXEMPLO DE USO NO BACKOFFICE

### Criar um Curso:
```typescript
const course = await prisma.academyCourse.create({
  data: {
    slug: 'vr-cinematografico',
    titlePt: 'VR Cinematográfico: Do Conceito à Tela',
    titleEn: 'Cinematic VR: From Concept to Screen',
    descriptionPt: 'Aprenda a criar filmes imersivos em 360°...',
    duration: '16 horas',
    level: 'Intermediário',
    audiencePt: 'Cineastas, produtores, criadores',
    thumbnailUrl: '/uploads/courses/vr-cinema-thumb.jpg',
    syllabusUrl: '/uploads/courses/vr-cinema-syllabus.pdf',
    icon: '🎥',
    featured: true,
    tags: ['vr', '360', 'cinema'],
    status: 'PUBLISHED',
    instructorId: 'uuid-do-instrutor'
  }
})
```

### Upload de Student Work:
```typescript
const studentWork = await prisma.academyMedia.create({
  data: {
    type: 'IMAGE',
    url: '/uploads/student-work/projeto-joao.jpg',
    thumbnailUrl: '/uploads/student-work/projeto-joao-thumb.jpg',
    title: 'Filme VR 360° - João Silva',
    caption: 'Projeto final do curso VR Cinematográfico',
    category: 'Student Work',
    tags: ['vr', '360', 'cinema', '2024'],
    featured: true,
    courseId: 'uuid-do-curso'
  }
})
```

---

## ✅ CHECKLIST

- [ ] Copiar models para `prisma/schema.prisma`
- [ ] Copiar enums para `prisma/schema.prisma`
- [ ] Rodar `npx prisma migrate dev`
- [ ] Verificar no Prisma Studio
- [ ] Criar páginas admin no backoffice:
  - [ ] `/admin/academy/instructors`
  - [ ] `/admin/academy/courses`
  - [ ] `/admin/academy/workshops`
  - [ ] `/admin/academy/clients`
  - [ ] `/admin/academy/cases`
  - [ ] `/admin/academy/media`
  - [ ] `/admin/academy/testimonials`
  - [ ] `/admin/academy/vancouver`

---

**MODELOS PRONTOS PARA IMPLEMENTAÇÃO! 🎯**
**PRÓXIMO PASSO: Copiar para schema.prisma e rodar migration!**
