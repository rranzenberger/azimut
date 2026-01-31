# ✅ IMPLEMENTAÇÃO OPÇÃO 2 - SISTEMA DE TAGS - STATUS

## ✅ **O QUE JÁ FOI FEITO:**

### **1. Schema Prisma Atualizado** ✅
- ✅ Campos adicionados no model Media:
  - `pageSlug String?` - Página onde a imagem será usada
  - `sectionSlug String?` - Seção (hero, gallery, etc)
  - `imageType String?` - Tipo da imagem
  - `servicesTags String[]` - Array de serviços relacionados
- ✅ Índices adicionados para performance

### **2. API de Upload Atualizada** ✅
- ✅ `/api/admin/media` (POST) agora aceita:
  - `pageSlug`
  - `sectionSlug`
  - `imageType`
  - `servicesTags` (vírgula separada)
- ✅ Funções `processLocalImage` e `processLocalVideo` atualizadas

### **3. Endpoint Público Criado** ✅
- ✅ `/api/public/media` (GET) criado
- ✅ Busca por tags com query params:
  - `pageSlug` - Filtrar por página
  - `sectionSlug` - Filtrar por seção
  - `servicesTags` - Filtrar por serviços (vírgula separada)
  - `limit`, `orderBy`, `order` - Paginação e ordenação

---

## ⏳ **O QUE AINDA PRECISA SER FEITO:**

### **4. Migration do Prisma** ⏳
**Ação necessária:**
```bash
cd azimut-cms
npx prisma migrate dev --name add_media_tags_fields
```

**O que a migration vai fazer:**
- Adicionar colunas `pageSlug`, `sectionSlug`, `imageType` no Media
- Adicionar coluna `servicesTags` (TEXT[] no PostgreSQL)
- Criar índices para performance

---

### **5. Interface Backoffice** ⏳
**Arquivo:** `azimut-cms/app/admin/media/page.tsx`

**Adicionar campos no formulário:**
- Dropdown "Para qual página?" (pageSlug)
- Dropdown "Onde na página?" (sectionSlug)
- Multi-select "Qual(is) serviço(s)?" (servicesTags)

**Valores possíveis:**
- **pageSlug:** `what/cinema-audiovisual`, `what/pos-producao-vfx`, etc.
- **sectionSlug:** `hero`, `gallery`
- **servicesTags:** Lista de todos os 16 serviços

---

### **6. ServiceDetail.tsx - Buscar Imagens** ⏳
**Arquivo:** `src/pages/ServiceDetail.tsx`

**Implementar busca:**
```typescript
// Buscar hero image
const heroResponse = await fetch(
  `/api/public/media?pageSlug=what/${slug}&sectionSlug=hero&limit=1`
)
const heroData = await heroResponse.json()
const heroImage = heroData.media[0]?.largeUrl || heroData.media[0]?.mediumUrl

// Buscar gallery images
const galleryResponse = await fetch(
  `/api/public/media?pageSlug=what/${slug}&sectionSlug=gallery&limit=20`
)
const galleryData = await galleryResponse.json()
const galleryImages = galleryData.media.map(img => ({
  url: img.largeUrl || img.mediumUrl,
  thumbnail: img.thumbnailUrl,
  alt: img.altPt || img.altEn
}))
```

---

## 📋 **PRÓXIMOS PASSOS:**

1. **Executar Migration:**
   ```bash
   cd azimut-cms
   npx prisma migrate dev --name add_media_tags_fields
   npx prisma generate
   ```

2. **Atualizar Interface Backoffice:**
   - Adicionar campos no formulário de upload
   - Criar dropdowns com valores possíveis

3. **Atualizar ServiceDetail.tsx:**
   - Buscar imagens do backoffice
   - Fallback para placeholders se não houver imagens

4. **Testar:**
   - Fazer upload de imagem com tags
   - Verificar se aparece nas páginas de serviços

---

## 🎯 **COMO USAR (Quando Completo):**

### **No Backoffice:**
1. Acesse `/admin/media`
2. Faça upload de imagem
3. Preencha:
   - **Para qual página?** → `what/cinema-audiovisual`
   - **Onde na página?** → `hero` ou `gallery`
   - **Qual serviço?** → `Cinema & Audiovisual` (multi-select)
4. Salve → Imagem fica "taggeada"

### **No Site:**
- ServiceDetail.tsx busca automaticamente:
  - Hero: `pageSlug=what/cinema-audiovisual&sectionSlug=hero`
  - Gallery: `pageSlug=what/cinema-audiovisual&sectionSlug=gallery`

---

**Status:** 🟡 **PARCIALMENTE IMPLEMENTADO**  
**Próximo passo:** Executar migration e atualizar interface backoffice
