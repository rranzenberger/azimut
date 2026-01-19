# 🎨 SISTEMA DE MÍDIA - BACKOFFICE AZIMUT

**Data:** 10/01/2026  
**Objetivo:** Sistema completo de gerenciamento de imagens e vídeos

---

## 📊 ESTRUTURA DO SISTEMA

### 1. UPLOAD DE IMAGENS ✅
```typescript
// Múltiplos formatos suportados
- JPG/JPEG
- PNG
- WebP
- AVIF
- GIF

// Otimização automática
- Redimensionamento inteligente
- Compressão sem perda de qualidade
- Geração de thumbnails (150x150, 300x300, 600x600)
- Conversão para WebP automática
```

### 2. UPLOAD DE VÍDEOS ✅
```typescript
// Formatos aceitos
- MP4 (H.264)
- WebM
- MOV
- AVI (convertido)

// Processamento
- Thumbnail do primeiro frame
- Compressão otimizada
- Múltiplas resoluções (360p, 720p, 1080p)
- Streaming adaptativo
```

### 3. GALERIA VISUAL ✅
```typescript
// Interface
- Grid responsivo
- Preview rápido
- Lightbox para zoom
- Filtros por tipo/data/tag
- Busca por nome/descrição
- Ordenação (data, nome, tamanho)
```

---

## 🚀 FEATURES PRINCIPAIS

### Upload Drag & Drop
- Arrastar e soltar múltiplos arquivos
- Preview instantâneo
- Barra de progresso por arquivo
- Cancelamento individual

### Otimização Automática
- Resize para dimensões máximas
- Compressão inteligente (70-80% quality)
- Remoção de metadados EXIF
- Geração de múltiplas versões

### Organização
- Pastas/Collections
- Tags personalizadas
- Categorias (projeto, institucional, academy, etc)
- Datas e metadados

### Integração com Projetos
- Vincular mídia a projetos específicos
- Hero images
- Galerias
- Thumbnails

---

## 📁 ESTRUTURA DE PASTAS

```
/public/uploads/
├── images/
│   ├── projects/
│   │   ├── original/
│   │   ├── large/     (1920px)
│   │   ├── medium/    (1200px)
│   │   ├── small/     (600px)
│   │   ├── thumbnail/ (300px)
│   │   └── webp/      (otimizadas)
│   ├── academy/
│   ├── team/
│   └── blog/
├── videos/
│   ├── projects/
│   │   ├── original/
│   │   ├── 1080p/
│   │   ├── 720p/
│   │   ├── 360p/
│   │   └── thumbnails/
│   └── academy/
└── temp/ (processamento)
```

---

## 🛠️ TECNOLOGIAS

### Backend
```typescript
// Upload & Processing
- Multer (multipart/form-data)
- Sharp (image processing)
- FFmpeg (video processing)
- AWS S3 / Cloudinary (storage opcional)

// API Routes
- POST /api/media/upload
- GET /api/media/list
- GET /api/media/:id
- PUT /api/media/:id
- DELETE /api/media/:id
- POST /api/media/optimize
```

### Frontend (Backoffice)
```typescript
// Components
- MediaUploader.tsx
- MediaGallery.tsx
- MediaCard.tsx
- MediaLightbox.tsx
- MediaFilters.tsx
- MediaPicker.tsx (para usar em projetos)

// Hooks
- useMediaUpload()
- useMediaList()
- useMediaOptimize()
```

---

## 📊 SCHEMA PRISMA

```prisma
model Media {
  id          String   @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int      // bytes
  width       Int?
  height      Int?
  duration    Int?     // segundos (para vídeo)
  
  // Versões otimizadas
  urls        Json     // { original, large, medium, small, thumbnail, webp }
  
  // Organização
  folder      String?  // projects, academy, team, blog
  category    String?
  tags        String[]
  alt         String?
  caption     String?
  
  // Metadados
  uploadedBy  String?
  uploadedAt  DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relacionamentos
  projectId   String?
  project     Project? @relation(fields: [projectId], references: [id])
  
  @@index([folder, category])
  @@index([projectId])
}
```

---

## 🎯 FUNCIONALIDADES AVANÇADAS

### 1. Edição de Imagem (Futuro)
- Crop/Resize manual
- Filtros básicos
- Ajustes de cor/brilho
- Texto sobre imagem

### 2. Validação Inteligente
- Verificar dimensões mínimas
- Detecção de qualidade
- Scan de vírus
- Detecção de duplicatas (hash MD5)

### 3. Performance
- Lazy loading na galeria
- Infinite scroll
- Cache agressivo
- CDN integration

### 4. Analytics
- Views por imagem
- Downloads
- Uso em projetos
- Storage usado

---

## 📈 CUSTOS & STORAGE

### Storage Estimado
```
Projeto médio:
- 20 imagens × 5 versões × 500KB = 50MB
- 5 vídeos × 4 versões × 50MB = 1GB
Total por projeto: ~1.05GB

100 projetos: ~105GB
Custo AWS S3: ~$2.40/mês
Custo Cloudinary: $0 (free tier até 25GB)
```

### Alternativas
1. **Local Storage** (atual)
   - Pros: Grátis, controle total
   - Cons: Limite espaço Vercel

2. **AWS S3**
   - Pros: Escalável, barato
   - Cons: Configuração extra

3. **Cloudinary**
   - Pros: Otimização automática, CDN
   - Cons: Limite free tier

**Recomendação:** Cloudinary para imagens, S3 para vídeos

---

## 🚀 IMPLEMENTAÇÃO

### Fase 1: MVP (2h)
- [ ] Model Media no Prisma
- [ ] API upload básica
- [ ] Componente MediaUploader
- [ ] Lista simples de mídia

### Fase 2: Otimização (3h)
- [ ] Sharp integration (resize)
- [ ] Geração de múltiplas versões
- [ ] WebP conversion
- [ ] Thumbnails automáticos

### Fase 3: Galeria (2h)
- [ ] Grid responsivo
- [ ] Lightbox
- [ ] Filtros e busca
- [ ] Drag & drop reorder

### Fase 4: Integração (2h)
- [ ] MediaPicker para projetos
- [ ] Vincular mídia existente
- [ ] Preview ao selecionar
- [ ] Múltipla seleção

### Fase 5: Avançado (3h)
- [ ] Video processing (FFmpeg)
- [ ] Analytics básico
- [ ] Cloudinary integration
- [ ] Bulk operations

**Total estimado:** 12h de desenvolvimento

---

## 💰 ROI ESTIMADO

### Ganhos:
- Tempo upload: -70% (5min → 1.5min)
- Otimização manual: -100% (automática)
- Busca de mídia: -80% (1min → 12s)
- Performance site: +40% (imagens otimizadas)

### Valor:
- 10 uploads/semana × 3.5min saved × 52 semanas = 30h/ano
- 30h × R$ 100/h = **R$ 3.000/ano**
- Performance site = **+15% conversão**
- **ROI Total: R$ 15.000+/ano**

---

## ✅ PRIORIDADE

**ALTA:** Sistema essencial para escalar produção de conteúdo

**COMEÇAR POR:**
1. Model + API upload
2. Galeria básica
3. Otimização automática
4. Integração com projetos

---

**SISTEMA ESPECIFICADO! ✅**  
**PRONTO PARA IMPLEMENTAR! 🚀**  
**ROI: R$ 15.000/ANO! 💰**
