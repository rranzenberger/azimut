# 📸 GUIA DO BACKOFFICE - ONDE SUBIR CADA MÍDIA

## 🎯 ESTRUTURA COMPLETA DAS PÁGINAS ACADEMY

```
/academy (Hub)
├── /academy/vancouver (Estudar Fora)
├── /academy/courses (Cursos)
├── /academy/workshops (Workshops & Eventos)
└── /academy/corporate (Corporativo)
```

---

## 📋 ACADEMY HUB - `/academy`

### 1. HERO VIDEO BACKGROUND
**Onde subir:** `/admin/academy/settings`
- **Campo:** "Hero Video URL"
- **Tipo:** URL do YouTube ou Vimeo
- **Descrição:** Vídeo institucional da Academy (ambiente de aula, alunos, etc)
- **Duração ideal:** 10-30 segundos (loop)
- **Placeholder atual:** Imagem estática

**OU (se preferir upload direto):**
- **Onde:** `/admin/academy/media` → Upload Video
- **Nome:** `academy-hero-video.mp4`
- **Qualidade:** HD ou 4K
- **Peso:** Até 50MB

---

### 2. IMAGENS DOS 4 PROGRAMAS
**Onde subir:** `/admin/academy/programs`

#### Programa 1: Vancouver
- **Campo:** "Thumbnail Image"
- **Arquivo:** `program-vancouver-thumb.jpg`
- **Tamanho:** 1280x720px (16:9)
- **Conteúdo:** Vancouver skyline, VFS/VanArts campus

#### Programa 2: Courses
- **Campo:** "Thumbnail Image"
- **Arquivo:** `program-courses-thumb.jpg`
- **Tamanho:** 1280x720px
- **Conteúdo:** Sala de aula, alunos com VR headset, computadores

#### Programa 3: Workshops
- **Campo:** "Thumbnail Image"
- **Arquivo:** `program-workshops-thumb.jpg`
- **Tamanho:** 1280x720px
- **Conteúdo:** Workshop em andamento, palestrante, audiência

#### Programa 4: Corporate
- **Campo:** "Thumbnail Image"
- **Arquivo:** `program-corporate-thumb.jpg`
- **Tamanho:** 1280x720px
- **Conteúdo:** Treinamento corporativo, logo de clientes

---

### 3. VÍDEO HISTÓRIA EDUCACIONAL
**Onde subir:** `/admin/academy/videos` → Categoria: "Institucional"

- **Campo:** "Video URL"
- **Arquivo:** URL do YouTube
- **Título:** "14 Anos Formando Profissionais"
- **Descrição:** "De 2004 a 2018, a Azimut School..."
- **Thumbnail:** Upload separado `history-video-thumb.jpg`
- **Featured:** ✅ SIM

---

### 4. FOTOS DOS PROFESSORES
**Onde subir:** `/admin/academy/instructors`

**Para cada professor:**
- **Nome:** Ex: Alberto Luchetti
- **Role:** Ex: Coordenador & PhD
- **Bio:** Texto curto (2-3 linhas)
- **Photo:** Upload `instructor-nome.jpg`
  - Tamanho: 500x500px (quadrado)
  - Fundo: Preferencialmente neutro
  - Formato: JPG ou PNG
- **Áreas:** Tags (VR, IA, VFX, etc)
- **Featured:** ✅ Para principais

---

## 📋 VANCOUVER - `/academy/vancouver`

### JÁ IMPLEMENTADO:
- ✅ Vídeo VanArts institucional
- ✅ Vídeo Depoimentos Brasileiros

### AINDA FALTA (placeholders):

#### 1. HERO VIDEO 4K
**Onde:** `/admin/academy/vancouver` → "Hero Video"
- **Arquivo:** Vancouver skyline, cidade, campus
- **Duração:** 10-20s loop
- **Qualidade:** 4K

#### 2. VÍDEO VFS INSTITUCIONAL
**Onde:** `/admin/academy/vancouver/videos` → Categoria: "Schools"
- **Video URL:** YouTube VFS
- **Título:** "Vancouver Film School - About"
- **Escola:** VFS

#### 3. SHOWREELS (3-6 vídeos)
**Onde:** `/admin/academy/vancouver/videos` → Categoria: "Showreels"
- VFS Showreel 2025
- VanArts Student Reel
- VanArts Animation Showcase
- Etc.

#### 4. CAMPUS TOUR
**Onde:** `/admin/academy/vancouver/videos` → Categoria: "Campus"
- Virtual tour VFS
- Virtual tour VanArts

#### 5. GALERIA DE TRABALHOS DE ALUNOS
**Onde:** `/admin/academy/vancouver/gallery` → Categoria: "Student Work"
- **Quantidade:** 12-20 imagens
- **Tamanho:** 1920x1080px
- **Tags:** VFX, Animation, Game Art, etc
- **Student Name:** Nome do aluno (opcional)

---

## 📋 COURSES - `/academy/courses`

### IMAGENS/VÍDEOS NECESSÁRIOS:

#### 1. HERO IMAGE/VIDEO
**Onde:** `/admin/academy/courses` → "Hero Media"
- **Imagem:** Sala de aula, alunos, equipamentos
- **OU Video:** Timelapse de aula, 10-15s

#### 2. THUMBNAIL DE CADA CURSO
**Onde:** `/admin/academy/courses/list` → Cada curso tem:
- **Thumbnail:** 800x600px
- **Video Preview:** (opcional) YouTube URL curta
- **Syllabus PDF:** Upload do programa

**Estrutura por curso:**
```
Curso: VR Cinematográfico
├── Thumbnail: vr-cinema-thumb.jpg
├── Video Preview: (opcional) youtube.com/watch?v=XXX
├── Syllabus PDF: vr-cinema-syllabus.pdf
├── Instructor Photo: instructor-joao.jpg
└── Student Work: (galeria de projetos finais)
```

#### 3. FOTOS DE TRABALHOS DOS ALUNOS
**Onde:** `/admin/academy/courses/student-work`
- **Por curso:** 4-8 imagens
- **Tamanho:** 1280x720px
- **Tags:** Curso, tecnologia, tipo

#### 4. VÍDEOS DE AULAS (DEMO)
**Onde:** `/admin/academy/courses/videos` → Categoria: "Class Demo"
- **Quantidade:** 2-4 vídeos
- **Duração:** 2-5 minutos
- **Conteúdo:** Trechos de aulas, explicações, demos

---

## 📋 WORKSHOPS - `/academy/workshops`

### IMAGENS/VÍDEOS NECESSÁRIOS:

#### 1. HERO IMAGE
**Onde:** `/admin/academy/workshops` → "Hero Image"
- **Imagem:** Workshop em andamento, palestrante
- **Tamanho:** 1920x1080px

#### 2. BANNER DE CADA WORKSHOP
**Onde:** `/admin/academy/workshops/list` → Para cada workshop:
- **Banner:** 1200x600px (horizontal)
- **Formato:** JPG
- **Conteúdo:** Título do workshop, data, ícones

**Exemplo:**
```
Workshop: IA Generativa
├── Banner: ia-generativa-banner.jpg
├── Photos: (3-5 fotos do workshop anterior)
├── Video Recap: youtube.com/watch?v=XXX (recap do evento)
└── Instructor: link para /instructors
```

#### 3. FOTOS DOS WORKSHOPS ANTERIORES
**Onde:** `/admin/academy/workshops/photos`
- **Por workshop:** 5-10 fotos
- **Tamanho:** 1280x720px
- **Conteúdo:** Participantes, ambiente, atividades

#### 4. VÍDEOS RECAP
**Onde:** `/admin/academy/workshops/videos` → Categoria: "Recap"
- **Duração:** 1-3 minutos
- **Conteúdo:** Highlights do workshop, depoimentos

---

## 📋 CORPORATE - `/academy/corporate`

### IMAGENS/VÍDEOS NECESSÁRIOS:

#### 1. HERO IMAGE
**Onde:** `/admin/academy/corporate` → "Hero Image"
- **Imagem:** Treinamento corporativo, sala, equipe
- **Tamanho:** 1920x1080px

#### 2. LOGOS DE CLIENTES
**Onde:** `/admin/academy/corporate/clients`
- **Formato:** PNG transparente
- **Tamanho:** 400x200px (proporção variável)
- **Exemplos:** Globo, Petrobras, Gov, etc

**Upload em grid:**
```
/admin/academy/corporate/clients
├── Upload múltiplo de logos
├── Ordem: drag-and-drop para reordenar
└── Featured: destacar principais clientes
```

#### 3. CASES/PROJETOS
**Onde:** `/admin/academy/corporate/cases`

**Para cada case:**
```
Case: Treinamento Petrobras VR
├── Cover Image: case-petrobras-cover.jpg (1280x720px)
├── Before/After: (opcional) imagens comparativas
├── Video: (opcional) youtube.com/watch?v=XXX
├── Results: Texto com resultados (ROI, etc)
└── Testimonial: Depoimento do cliente
```

#### 4. VÍDEOS DE DEPOIMENTOS CORPORATIVOS
**Onde:** `/admin/academy/corporate/testimonials`
- **Quantidade:** 3-5 vídeos
- **Duração:** 30s - 2min
- **Conteúdo:** Cliente falando sobre resultado

---

## 🎨 ESPECIFICAÇÕES TÉCNICAS

### IMAGENS:
```
Formatos aceitos: JPG, PNG, WebP
Tamanho máximo: 5MB por imagem
Resolução mínima: 1280x720px
Resolução ideal: 1920x1080px (Full HD)

Thumbnails: 800x600px
Fotos perfil: 500x500px (quadrado)
Banners: 1200x600px (horizontal)
Hero images: 1920x1080px
```

### VÍDEOS:
```
Formatos aceitos: YouTube URL, Vimeo URL, MP4 upload
Duração recomendada: 
  - Hero/Background: 10-30s
  - Institucional: 2-5min
  - Showreels: 1-3min
  - Depoimentos: 30s-2min
  - Class demos: 2-5min

Qualidade: HD mínimo (1080p), 4K ideal
Peso máximo (upload direto): 100MB
```

### PDFS:
```
Formato: PDF
Tamanho máximo: 10MB
Uso: Syllabus de cursos, programas, materiais
```

---

## 📂 ESTRUTURA DE PASTAS NO BACKOFFICE

```
/admin/academy/
├── settings
│   ├── Hero Video URL
│   └── General Settings
│
├── programs
│   ├── Vancouver (thumb + info)
│   ├── Courses (thumb + info)
│   ├── Workshops (thumb + info)
│   └── Corporate (thumb + info)
│
├── instructors
│   ├── List (CRUD)
│   ├── Add New
│   └── Upload Photos
│
├── videos
│   ├── All Videos
│   ├── Categories: Institucional, Showreels, Campus, Class Demo, Recap, Testimonials
│   └── Upload/Link YouTube
│
├── gallery (Student Work)
│   ├── Categories: VFX, Animation, Game Art, Photography
│   ├── Upload Multiple
│   └── Tags + Student Name
│
├── courses
│   ├── List Courses
│   ├── Add New Course
│   ├── Upload Syllabus
│   └── Student Work per Course
│
├── workshops
│   ├── List Workshops
│   ├── Add New Workshop
│   ├── Upload Banners
│   └── Photos + Videos per Workshop
│
└── corporate
    ├── Client Logos
    ├── Cases
    ├── Testimonials
    └── Results/Stats
```

---

## ✅ CHECKLIST RÁPIDO

### PRIORITY 1 (FAZER PRIMEIRO):
- [ ] Hero video Academy (institucional)
- [ ] 4 thumbnails dos programas
- [ ] 3 fotos de professores principais
- [ ] Vídeo história educacional

### PRIORITY 2 (DEPOIS):
- [ ] Vancouver: VFS video + showreels (3-6)
- [ ] Courses: Thumbnails de cursos (4-8)
- [ ] Courses: Student work gallery (12-20 imagens)
- [ ] Workshops: Banners (4)

### PRIORITY 3 (QUANDO TIVER):
- [ ] Corporate: Logos clientes (6-10)
- [ ] Corporate: Cases com vídeos (2-3)
- [ ] Workshops: Fotos de eventos (20-40)
- [ ] Vídeos de aulas demo (2-4)

---

## 🚀 RESUMO EXECUTIVO

**TOTAL DE MÍDIAS NECESSÁRIAS:**
```
Vídeos: 15-25
Imagens: 50-80
Fotos professores: 3-6
Logos clientes: 10-15
PDFs (syllabus): 4-8
```

**COMEÇAR COM (MÍNIMO VIÁVEL):**
```
✅ 1 vídeo hero Academy
✅ 4 thumbnails programas
✅ 3 fotos professores
✅ 2 vídeos Vancouver (já temos!)
✅ 6 imagens student work

TOTAL MÍNIMO: 16 mídias
```

---

**TODAS AS PÁGINAS ESTÃO PREPARADAS PARA RECEBER AS MÍDIAS!**
**PLACEHOLDERS VISUAIS JÁ IMPLEMENTADOS!**
**VOCÊ SÓ PRECISA SUBIR NO BACKOFFICE! 📸**
