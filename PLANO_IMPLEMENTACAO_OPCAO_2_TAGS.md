# 🎯 PLANO DE IMPLEMENTAÇÃO: OPÇÃO 2 - SISTEMA DE TAGS

## ✅ PASSO A PASSO

### **1. Schema Prisma - Adicionar Campos**

Adicionar ao model Media:
- `pageSlug String?` - Página onde a imagem será usada
- `sectionSlug String?` - Seção dentro da página (hero, gallery, etc)
- `imageType String?` - Tipo da imagem (hero-background, gallery-image)
- `servicesTags String[]` - Array de slugs de serviços relacionados

**Índices para performance:**
- `@@index([pageSlug])`
- `@@index([sectionSlug])`
- `@@index([servicesTags])` (PostgreSQL GIN index para arrays)

---

### **2. Migration**

Criar migration para adicionar os campos.

---

### **3. API - Atualizar Upload de Media**

Adicionar campos opcionais no POST `/api/admin/media`:
- `pageSlug`
- `sectionSlug`
- `imageType`
- `servicesTags` (array)

---

### **4. API - Criar Endpoint de Busca**

Criar `GET /api/public/media` com query params:
- `pageSlug` - Filtrar por página
- `sectionSlug` - Filtrar por seção
- `servicesTags` - Filtrar por serviços (array)
- `orderBy` - Ordenação (createdAt, etc)

---

### **5. Backoffice - Atualizar Interface de Upload**

Adicionar campos no formulário de upload:
- Dropdown: "Para qual página?"
- Dropdown: "Onde na página?" (hero, gallery, etc)
- Multi-select: "Qual(is) serviço(s)?"

---

### **6. ServiceDetail.tsx - Buscar Imagens**

Atualizar para buscar imagens usando tags:
- Hero: `pageSlug=what/${slug}&sectionSlug=hero`
- Gallery: `pageSlug=what/${slug}&sectionSlug=gallery`

---

## 📋 VALORES POSSÍVEIS

### **pageSlug:**
- `what/cinema-audiovisual`
- `what/pos-producao-vfx`
- `what/animacao-2d-3d`
- etc. (todos os 16 serviços)

### **sectionSlug:**
- `hero` - Imagem do hero
- `gallery` - Imagens da galeria
- `section-image` - Imagens de seções

### **servicesTags:**
- Array de slugs: `["cinema-audiovisual", "pos-producao-vfx"]`

---

**Vamos começar a implementação!** 🚀
