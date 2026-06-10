# 📋 ALINHAMENTO: BACKOFFICE + IMAGENS DE SERVIÇOS

## ✅ SITUAÇÃO ATUAL

### **Backoffice - Sistema de Mídia:**
O backoffice já tem um sistema de Media com campos para organizar imagens:
- **Páginas (Pages)** podem ter `heroBackgroundImage` e `demoreelVideo`
- **Projetos (Projects)** podem ter `heroImage` e `gallery` (via ProjectMedia)
- **Media** tem campos multilíngue: `altPt`, `altEn`, `altEs`, `altFr`

### **Serviços (Services) - Situação Atual:**
❌ **NÃO tem campos para imagens ainda** no schema:
```prisma
model Service {
  id            String        @id @default(uuid())
  slug          String        @unique
  titlePt       String
  // ... outros campos
  // ❌ SEM heroImage
  // ❌ SEM gallery
}
```

---

## 🎯 PROPOSTA: SISTEMA DE ORGANIZAÇÃO DE IMAGENS

### **Sistema Proposto (GUIA_IMAGENS_TAGS_IA.md):**

O sistema proposto usa campos de contexto no Media para facilitar navegação:

```prisma
model Media {
  // ... campos existentes
  
  // Contexto da imagem
  pageSlug      String?  // "home", "work", "studio", "what/cinema-audiovisual"
  sectionSlug   String?  // "hero", "gallery", "deliverables", "process"
  imageType     String?  // "hero-background", "gallery-image", "service-icon"
  
  // Tags categóricas
  servicesTags  String[] // ["cinema-audiovisual", "pos-producao-vfx"]
}
```

**Vantagens:**
- ✅ Estagiário pode procurar: "Onde vai essa imagem?"
- ✅ Filtro no backoffice: "Mostrar todas imagens de `/what/cinema-audiovisual`"
- ✅ Organização clara: hero, gallery, etc.
- ✅ Relacionamento com serviços via tags

---

## 🔧 IMPLEMENTAÇÃO NECESSÁRIA

### **OPÇÃO 1: Campos no Service (Relação Direta) - RECOMENDADO**

Adicionar campos diretamente no Service:

```prisma
model Service {
  id            String        @id @default(uuid())
  slug          String        @unique
  // ... campos existentes
  
  // NOVO: Hero Image
  heroImageId   String?       @unique
  heroImage     Media?        @relation("ServiceHeroImage", fields: [heroImageId], references: [id])
  
  // NOVO: Gallery (múltiplas imagens)
  gallery       ServiceMedia[]
}

// NOVA RELAÇÃO: ServiceMedia (similar a ProjectMedia)
model ServiceMedia {
  id        String   @id @default(uuid())
  serviceId String
  service   Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  mediaId   String
  media     Media    @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  
  @@unique([serviceId, mediaId])
  @@index([serviceId])
}
```

**Interface no Backoffice:**
```
/admin/services/[id]
  ├─ 🎬 Cinema & Audiovisual
  │   ├─ Hero Image: [Selecionar da Biblioteca]
  │   └─ Galeria: [Adicionar imagens] [Gerenciar ordem]
```

---

### **OPÇÃO 2: Sistema de Tags (Mais Flexível)**

Usar apenas os campos de contexto no Media:

```prisma
model Media {
  // ... campos existentes
  
  pageSlug      String?  // "what/cinema-audiovisual"
  sectionSlug   String?  // "hero" | "gallery"
  servicesTags  String[] // ["cinema-audiovisual"]
}
```

**Interface no Backoffice:**
```
/admin/media
  ├─ Upload de Imagem
  │   ├─ Para qual página? [Dropdown: what/cinema-audiovisual]
  │   ├─ Onde na página? [Dropdown: hero | gallery]
  │   └─ Qual serviço? [Multi-select: Cinema, VFX, etc.]
```

**No Service Detail Page:**
- Buscar imagens onde `pageSlug = "what/{slug}"` e `sectionSlug = "hero"`
- Buscar imagens onde `servicesTags` contém o slug do serviço

---

## 🎨 INTERFACE BACKOFFICE - EXEMPLO

### **Página de Editar Serviço:**
```
┌─────────────────────────────────────────────────┐
│ 🎬 Cinema & Audiovisual                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ Hero Image:                                     │
│ [Selecionar da Biblioteca ▼]                   │
│ ┌───────────────────────────────────────────┐  │
│ │ [Preview da imagem]                       │  │
│ │ Alt Text PT: [_________________________]  │  │
│ │ Alt Text EN: [_________________________]  │  │
│ └───────────────────────────────────────────┘  │
│                                                 │
│ Galeria de Imagens:                            │
│ [Adicionar Imagem] [Gerenciar Galeria]        │
│ ┌──────┐ ┌──────┐ ┌──────┐                   │
│ │[Img1]│ │[Img2]│ │[Img3]│ [Arrastar p/ ordem]│
│ └──────┘ └──────┘ └──────┘                   │
│                                                 │
│ [Salvar] [Cancelar]                            │
└─────────────────────────────────────────────────┘
```

---

## 📐 IMPLEMENTAÇÃO NO CÓDIGO

### **1. Atualizar Schema (Prisma)**

```prisma
// adicionar ao Service
heroImageId   String?       @unique
heroImage     Media?        @relation("ServiceHeroImage", fields: [heroImageId], references: [id])
gallery       ServiceMedia[]

// criar ServiceMedia
model ServiceMedia {
  id        String   @id @default(uuid())
  serviceId String
  service   Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  mediaId   String
  media     Media    @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  
  @@unique([serviceId, mediaId])
  @@index([serviceId])
}

// adicionar relação no Media
serviceHero   Service?       @relation("ServiceHeroImage")
serviceGalleries ServiceMedia[]
```

### **2. Atualizar ServiceDetail.tsx**

```typescript
// Buscar imagens do backoffice
const serviceData = await fetch(`/api/public/services/${slug}`)
const { heroImage, gallery } = serviceData

// Usar no componente
<ServiceHero heroImage={heroImage?.largeUrl || heroImage?.mediumUrl} />
<ServiceGallery images={gallery.map(img => ({ url: img.largeUrl, alt: img.alt }))} />
```

---

## ✅ CHECKLIST DE ALINHAMENTO

- [ ] **Schema atualizado** (Prisma migration)
- [ ] **API endpoints** criados (`/api/admin/services/[id]` - PUT/PATCH)
- [ ] **Interface backoffice** (formulário de edição)
- [ ] **ServiceDetail.tsx** integrado (buscar do backoffice)
- [ ] **Fallback** para servicesData.ts (se backoffice vazio)
- [ ] **Documentação** para estagiários (como adicionar imagens)

---

## 🎯 RESULTADO FINAL

### **Para Estagiário:**
1. Acessa `/admin/services`
2. Clica no serviço "Cinema & Audiovisual"
3. Vê campos claros: "Hero Image" e "Galeria"
4. Seleciona imagens da biblioteca
5. Salva - aparece automaticamente no site!

### **Para Desenvolvedor:**
- Sistema consistente (igual Projects)
- Fácil de manter
- Escalável (futuro: vídeos, etc.)

---

**Status:** ⏳ **AGUARDANDO IMPLEMENTAÇÃO**
**Prioridade:** 🔴 **ALTA** (para completar curadoria visual)
