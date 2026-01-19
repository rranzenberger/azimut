# 📊 COMPARAÇÃO DETALHADA: 2 OPÇÕES PARA IMAGENS NOS SERVIÇOS

## 🎯 VISÃO GERAL

Existem duas formas de associar imagens aos serviços. Vamos analisar cada uma em detalhes.

---

## 📋 OPÇÃO 1: CAMPOS DIRETOS NO SERVICE (Como Projects)

### **Como Funciona:**

Similar ao sistema já implementado para **Projects**, adicionamos campos diretamente no model Service que referenciam Media.

### **1. Schema Prisma (Migration Necessária)**

```prisma
// Adicionar ao model Service
model Service {
  id            String        @id @default(uuid())
  slug          String        @unique
  // ... campos existentes (titlePt, titleEn, etc.)
  
  // ═══════════════════════════════════════════
  // NOVO: Campos de Imagem
  // ═══════════════════════════════════════════
  heroImageId   String?       @unique
  heroImage     Media?        @relation("ServiceHeroImage", fields: [heroImageId], references: [id])
  gallery       ServiceMedia[]
  
  projects      Project[]     @relation("ProjectToService")
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

// ═══════════════════════════════════════════
// NOVO: Tabela de Relação (igual ProjectMedia)
// ═══════════════════════════════════════════
model ServiceMedia {
  id        String   @id @default(uuid())
  serviceId String
  mediaId   String
  order     Int      @default(0)  // Para ordenar as imagens
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  service   Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  media     Media    @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  
  @@unique([serviceId, mediaId])  // Evita duplicatas
  @@index([serviceId])            // Para buscas rápidas
}

// ═══════════════════════════════════════════
// Adicionar relações no model Media
// ═══════════════════════════════════════════
model Media {
  id               String          @id @default(uuid())
  // ... campos existentes
  
  // Relações existentes
  projectHero      Project?
  projectGalleries ProjectMedia[]
  pageHeroBackgrounds Page[]       @relation("PageHeroBackground")
  pageDemoreelVideos  Page[]       @relation("PageDemoreelVideo")
  
  // NOVO: Relações com Service
  serviceHero      Service?        @relation("ServiceHeroImage")
  serviceGalleries ServiceMedia[]
  
  analysis         MediaAnalysis?
}
```

### **2. Como Funciona no Backoffice**

#### **Interface de Edição do Service:**

```
/admin/services/[id]

┌─────────────────────────────────────────────────────┐
│ 🎬 Cinema & Audiovisual                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Hero Image:                                         │
│ [Selecionar da Biblioteca ▼]                       │
│ ┌───────────────────────────────────────────────┐  │
│ │ [Preview: imagem selecionada]                 │  │
│ │ Alt Text PT: [Cinema production setup...]     │  │
│ │ Alt Text EN: [Cinema production setup...]     │  │
│ └───────────────────────────────────────────────┘  │
│                                                     │
│ Galeria de Imagens:                                │
│ [Adicionar Imagem] [Gerenciar Ordem]              │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│ │[Img1]│ │[Img2]│ │[Img3]│ │[Img4]│ [Drag]     │
│ │ Or:1 │ │ Or:2 │ │ Or:3 │ │ Or:4 │            │
│ └──────┘ └──────┘ └──────┘ └──────┘            │
│                                                     │
│ [Salvar Serviço]                                   │
└─────────────────────────────────────────────────────┘
```

**Fluxo:**
1. Admin acessa `/admin/services/cinema-audiovisual`
2. Seleciona imagem hero do dropdown (biblioteca de Media)
3. Adiciona imagens na galeria (mesma biblioteca)
4. Salva → Pronto!

### **3. API Endpoint (Backoffice)**

```typescript
// azimut-cms/app/api/admin/services/[id]/route.ts

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { heroImageId, gallery } = await request.json()
  
  // Atualizar Service
  const service = await prisma.service.update({
    where: { id: params.id },
    data: {
      heroImageId: heroImageId || null,
      // Gallery é gerenciada via ServiceMedia (tabela separada)
    },
    include: {
      heroImage: true,
      gallery: {
        include: { media: true },
        orderBy: { order: 'asc' }
      }
    }
  })
  
  // Gerenciar galeria (adicionar/remover/reordenar)
  if (gallery) {
    // Deletar todas as relações existentes
    await prisma.serviceMedia.deleteMany({
      where: { serviceId: params.id }
    })
    
    // Criar novas relações
    await prisma.serviceMedia.createMany({
      data: gallery.map((mediaId: string, index: number) => ({
        serviceId: params.id,
        mediaId,
        order: index
      }))
    })
  }
  
  return NextResponse.json({ service })
}
```

### **4. Código no Site (ServiceDetail.tsx)**

```typescript
// src/pages/ServiceDetail.tsx

// Buscar dados do backoffice
const { data: serviceData } = await fetch(`/api/public/services/${slug}`)

// OU usar hook (se existir)
const { service } = useBackofficeService(slug)

// Usar no componente
<ServiceHero
  heroImage={serviceData?.heroImage?.largeUrl || serviceData?.heroImage?.mediumUrl}
  icon={service.icon}
  title={title}
  shortDescription={shortDesc}
/>

<ServiceGallery
  images={serviceData?.gallery?.map((item: any) => ({
    url: item.media.largeUrl || item.media.mediumUrl,
    thumbnail: item.media.thumbnailUrl,
    alt: item.media.altPt || item.media.altEn
  })) || []}
/>
```

### **✅ VANTAGENS da Opção 1:**

1. **Consistência:** Igual ao sistema de Projects (já funciona)
2. **Tipagem Forte:** TypeScript sabe exatamente a estrutura
3. **Relações Claras:** Foreign keys garantem integridade
4. **Performance:** Queries otimizadas com JOIN
5. **Fácil de Entender:** Estagiário vê: "Service tem heroImage e gallery"
6. **Ordenação Nativa:** Campo `order` na tabela ServiceMedia

### **❌ DESVANTAGENS da Opção 1:**

1. **Migration Necessária:** Precisa criar tabela ServiceMedia
2. **Rígido:** Se quiser usar imagem em múltiplos lugares, precisa duplicar
3. **Schema Cresce:** Mais tabelas = mais complexidade

---

## 📋 OPÇÃO 2: SISTEMA DE TAGS (pageSlug, sectionSlug)

### **Como Funciona:**

Em vez de relações diretas, usamos campos de contexto no Media para "taggear" imagens. As imagens ficam "soltas" na biblioteca, mas marcadas com tags.

### **1. Schema Prisma (Migration Necessária)**

```prisma
// Adicionar campos no model Media (NÃO criar ServiceMedia)
model Media {
  id               String          @id @default(uuid())
  originalUrl      String
  thumbnailUrl     String?
  mediumUrl        String?
  largeUrl         String?
  // ... campos existentes
  
  // ═══════════════════════════════════════════
  // NOVO: Campos de Contexto/Tags
  // ═══════════════════════════════════════════
  pageSlug         String?         // "what/cinema-audiovisual"
  sectionSlug      String?         // "hero" | "gallery"
  imageType        String?         // "hero-background" | "gallery-image"
  servicesTags     String[]        // ["cinema-audiovisual", "pos-producao-vfx"]
  
  // Relações existentes (mantém)
  projectHero      Project?
  projectGalleries ProjectMedia[]
  pageHeroBackgrounds Page[]
  pageDemoreelVideos  Page[]
  analysis         MediaAnalysis?
  
  // ═══════════════════════════════════════════
  // ÍNDICES para buscas rápidas
  // ═══════════════════════════════════════════
  @@index([pageSlug])
  @@index([sectionSlug])
  @@index([servicesTags])
}

// Service NÃO muda (sem novos campos)
model Service {
  id            String        @id @default(uuid())
  slug          String        @unique
  // ... campos existentes
  // SEM heroImageId, SEM gallery
}
```

### **2. Como Funciona no Backoffice**

#### **Interface de Upload/Edição de Media:**

```
/admin/media (ao fazer upload ou editar)

┌─────────────────────────────────────────────────────┐
│ Upload de Imagem                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Arquivo: [Escolher arquivo...]                     │
│                                                     │
│ Contexto da Imagem:                                │
│ ┌───────────────────────────────────────────────┐  │
│ │ Para qual página?                             │  │
│ │ [Dropdown: what/cinema-audiovisual ▼]        │  │
│ │   - what/cinema-audiovisual                   │  │
│ │   - what/pos-producao-vfx                     │  │
│ │   - home                                       │  │
│ │   - work                                       │  │
│ └───────────────────────────────────────────────┘  │
│                                                     │
│ Onde na página?                                    │
│ [Dropdown: hero ▼]                                 │
│   - hero                                           │
│   - gallery                                        │
│   - section-image                                  │
│                                                     │
│ Qual(is) serviço(s)? (Multi-select)               │
│ ☑ Cinema & Audiovisual                            │
│ ☑ Pós-Produção & VFX                              │
│ ☐ Animação 2D/3D                                  │
│                                                     │
│ Alt Text PT: [_________________________]           │
│ Alt Text EN: [_________________________]           │
│                                                     │
│ [Enviar]                                           │
└─────────────────────────────────────────────────────┘
```

**Fluxo:**
1. Admin faz upload da imagem
2. Seleciona contexto: `pageSlug = "what/cinema-audiovisual"`, `sectionSlug = "hero"`
3. Pode marcar múltiplos serviços: `servicesTags = ["cinema-audiovisual"]`
4. Salva → Imagem fica "taggeada" na biblioteca

### **3. Buscar Imagens no ServiceDetail**

```typescript
// src/pages/ServiceDetail.tsx

// Buscar hero image
const heroImageResponse = await fetch(
  `/api/public/media?pageSlug=what/${slug}&sectionSlug=hero&limit=1`
)
const heroImages = await heroImageResponse.json()
const heroImage = heroImages[0]?.largeUrl || heroImages[0]?.mediumUrl

// Buscar gallery images
const galleryResponse = await fetch(
  `/api/public/media?pageSlug=what/${slug}&sectionSlug=gallery&orderBy=createdAt`
)
const galleryImages = await galleryResponse.json()

// Usar no componente
<ServiceHero heroImage={heroImage} />
<ServiceGallery images={galleryImages.map(img => ({
  url: img.largeUrl || img.mediumUrl,
  thumbnail: img.thumbnailUrl,
  alt: img.altPt || img.altEn
}))} />
```

### **4. API Endpoint (Busca por Tags)**

```typescript
// azimut-cms/app/api/public/media/route.ts

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pageSlug = searchParams.get('pageSlug')      // "what/cinema-audiovisual"
  const sectionSlug = searchParams.get('sectionSlug') // "hero" | "gallery"
  const servicesTags = searchParams.get('servicesTags')?.split(',') // ["cinema-audiovisual"]
  
  const where: any = {}
  
  if (pageSlug) {
    where.pageSlug = pageSlug
  }
  
  if (sectionSlug) {
    where.sectionSlug = sectionSlug
  }
  
  if (servicesTags && servicesTags.length > 0) {
    where.servicesTags = {
      hasSome: servicesTags  // PostgreSQL array contains
    }
  }
  
  const media = await prisma.media.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return NextResponse.json(media)
}
```

### **✅ VANTAGENS da Opção 2:**

1. **Flexibilidade:** Uma imagem pode estar em múltiplos lugares
2. **Biblioteca Centralizada:** Todas as imagens em um lugar
3. **Sem Tabelas Extras:** Não precisa criar ServiceMedia
4. **Busca Poderosa:** Pode buscar "todas imagens de X" facilmente
5. **Menos Migrations:** Só adiciona campos no Media
6. **Reutilização:** Imagem pode servir para múltiplos serviços

### **❌ DESVANTAGENS da Opção 2:**

1. **Sem Ordenação Nativa:** Precisa usar `createdAt` ou campo extra
2. **Menos Tipagem:** TypeScript não sabe quais imagens existem
3. **Queries Mais Complexas:** Precisa filtrar por tags
4. **Pode Ter Duplicatas:** Mesma imagem pode aparecer múltiplas vezes
5. **Menos Intuitivo:** Estagiário precisa entender sistema de tags

---

## 🔄 COMPARAÇÃO LADO A LADO

| Aspecto | Opção 1 (Campos Diretos) | Opção 2 (Sistema de Tags) |
|---------|-------------------------|---------------------------|
| **Complexidade Schema** | ⭐⭐ Média (cria ServiceMedia) | ⭐ Baixa (só adiciona campos) |
| **Flexibilidade** | ⭐⭐ Baixa (relação 1:1) | ⭐⭐⭐ Alta (múltiplos usos) |
| **Performance** | ⭐⭐⭐ Alta (JOIN direto) | ⭐⭐ Média (filtro por tags) |
| **Consistência** | ⭐⭐⭐ Alta (igual Projects) | ⭐⭐ Média (novo padrão) |
| **Facilidade de Uso** | ⭐⭐⭐ Muito fácil | ⭐⭐ Requer entender tags |
| **Reutilização** | ⭐ Baixa (duplicar se necessário) | ⭐⭐⭐ Alta (uma imagem, múltiplos usos) |
| **Ordenação** | ⭐⭐⭐ Nativa (campo order) | ⭐ Média (precisa campo extra) |
| **Busca/Query** | ⭐⭐ Específica (por service) | ⭐⭐⭐ Poderosa (múltiplos filtros) |

---

## 💡 RECOMENDAÇÃO

### **Para este projeto, recomendo OPÇÃO 1 (Campos Diretos)**

**Motivos:**
1. ✅ **Já existe no sistema** (Projects funciona assim)
2. ✅ **Consistência** com o resto do código
3. ✅ **Mais fácil para estagiários** (interface clara)
4. ✅ **Ordenação nativa** (importante para galeria)
5. ✅ **TypeScript feliz** (tipagem forte)

### **Opção 2 seria melhor se:**
- Precisássemos reutilizar imagens em múltiplos lugares
- Quiséssemos uma biblioteca centralizada com busca avançada
- Tivéssemos muitos tipos de conteúdo diferentes

---

## 🚀 PRÓXIMOS PASSOS (Se escolher Opção 1)

1. **Criar Migration:**
   ```bash
   npx prisma migrate dev --name add_service_images
   ```

2. **Atualizar Schema Prisma** (código acima)

3. **Criar API Endpoint** (`/api/admin/services/[id]` - PUT)

4. **Atualizar Interface Backoffice** (`ServiceEditForm.tsx`)

5. **Atualizar ServiceDetail.tsx** (buscar do backoffice)

6. **Testar!**

---

**Qual opção você prefere? Posso implementar qualquer uma das duas!** 🎯
