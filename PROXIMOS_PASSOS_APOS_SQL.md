# 🚀 PRÓXIMOS PASSOS - APÓS SQL EXECUTADO
**Data:** 15/01/2026  
**Situação:** SQL executado via Vercel, tabelas criadas

---

## ✅ O QUE JÁ FOI FEITO

1. ✅ **SQL executado** via Vercel
2. ✅ **Tabelas criadas:** `field_metadata`, `image_specifications`
3. ✅ **Dados inseridos:** Metadados da Home (hero, pillars, stats)

---

## ⏭️ PRÓXIMOS PASSOS (3-4 horas)

### **PASSO 1: Verificar SQL (5 min)** ⏰

**Executar testes de verificação:**

Ver arquivo: `VERIFICAR_SE_SQL_FUNCIONOU.md`

**Comandos SQL para testar:**
```sql
-- Teste 1: Verificar tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('field_metadata', 'image_specifications');

-- Teste 2: Verificar dados
SELECT COUNT(*) FROM field_metadata;
SELECT COUNT(*) FROM image_specifications;
```

**Se funcionou:** ✅ Próximo passo  
**Se não funcionou:** ❌ Reexecutar SQL

---

### **PASSO 2: Adicionar Modelos Prisma (2 min)** ⏰

**Arquivo:** `azimut-cms/prisma/schema.prisma`

**Adicionar modelos (se não existirem):**

```prisma
model FieldMetadata {
  id        String   @id @default(uuid()) @db.Uuid
  pageSlug  String   @map("page_slug")
  sectionKey String  @map("section_key")
  fieldKey  String   @map("field_key")
  
  fieldLabel       String?  @map("field_label")
  fieldDescription String?  @map("field_description")
  fieldType        String   @map("field_type")
  
  maxLength  Int?    @map("max_length")
  minLength  Int?    @map("min_length")
  required   Boolean @default(false)
  allowedFormats String[] @map("allowed_formats")
  
  imageWidth  Int?   @map("image_width")
  imageHeight Int?   @map("image_height")
  imageAspectRatio String? @map("image_aspect_ratio")
  
  textFormat  String? @map("text_format")
  lineBreaksAllowed Boolean @default(false) @map("line_breaks_allowed")
  
  whereAppears String? @map("where_appears")
  visualGuideUrl String? @map("visual_guide_url")
  cardPosition Int? @map("card_position")
  
  exampleValue String? @map("example_value")
  exampleImageUrl String? @map("example_image_url")
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@unique([pageSlug, sectionKey, fieldKey])
  @@index([pageSlug, sectionKey])
  @@map("field_metadata")
}

model ImageSpecification {
  id        String   @id @default(uuid()) @db.Uuid
  pageSlug  String   @map("page_slug")
  sectionKey String  @map("section_key")
  fieldKey  String   @map("field_key")
  
  recommendedWidth  Int @map("recommended_width")
  recommendedHeight Int @map("recommended_height")
  minWidth  Int? @map("min_width")
  minHeight Int? @map("min_height")
  maxWidth  Int? @map("max_width")
  maxHeight Int? @map("max_height")
  aspectRatio String? @map("aspect_ratio")
  maxFileSizeMb Int @default(5) @map("max_file_size_mb")
  allowedFormats String[] @default(["jpg", "jpeg", "png", "webp", "avif"]) @map("allowed_formats")
  
  description String? @map("description")
  whereAppears String? @map("where_appears")
  visualGuideUrl String? @map("visual_guide_url")
  
  autoCompress Boolean @default(true) @map("auto_compress")
  autoConvertWebp Boolean @default(true) @map("auto_convert_webp")
  generateThumbnails Boolean @default(false) @map("generate_thumbnails")
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@unique([pageSlug, sectionKey, fieldKey])
  @@index([pageSlug, sectionKey])
  @@map("image_specifications")
}
```

**Depois:**
```bash
cd azimut-cms
npx prisma format
npx prisma generate
```

---

### **PASSO 3: Verificar API Endpoints (já criados)** ⏰

**Verificar se existem:**
- ✅ `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`
- ✅ `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/route.ts`
- ✅ `azimut-cms/app/api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`

**Se existirem:** ✅ Próximo passo  
**Se não existirem:** Criar (código já pronto em documentação)

---

### **PASSO 4: Verificar Componente React (já criado)** ⏰

**Verificar se existe:**
- ✅ `azimut-cms/components/admin/FieldEditorWithMetadata.tsx`

**Se existir:** ✅ Próximo passo  
**Se não existir:** Criar (código já pronto em documentação)

---

### **PASSO 5: Integrar na Interface do Backoffice (30 min)** ⏰

**Onde usar:**
- Página de edição de conteúdo
- Formulários de criação/edição
- Substituir inputs simples por `FieldEditorWithMetadata`

**Exemplo:**
```tsx
import { FieldEditorWithMetadata } from '@/components/admin/FieldEditorWithMetadata';

// Antes:
<input value={heroTitle} onChange={...} />

// Depois:
<FieldEditorWithMetadata
  pageSlug="home"
  sectionKey="hero"
  fieldKey="hero_title"
  value={heroTitle}
  onChange={setHeroTitle}
  onError={(error) => console.error(error)}
/>
```

---

### **PASSO 6: Testar Tudo (15 min)** ⏰

1. **Abrir backoffice:** https://backoffice.azmt.com.br
2. **Ir para página de edição** (Home ou outra)
3. **Verificar:**
   - Metadados aparecem (label, descrição, limites)
   - Validação funciona (max_length, required)
   - Especificações de imagem aparecem (resolução, formato)
4. **Testar edição:**
   - Editar campo de texto (ver limites)
   - Upload de imagem (ver especificações)
   - Validar campos obrigatórios

---

## 📋 CHECKLIST COMPLETO

- [ ] **PASSO 1:** Verificar SQL (tabelas e dados)
- [ ] **PASSO 2:** Adicionar modelos Prisma (se necessário)
- [ ] **PASSO 3:** Verificar API endpoints (ou criar)
- [ ] **PASSO 4:** Verificar componente React (ou criar)
- [ ] **PASSO 5:** Integrar na interface do backoffice
- [ ] **PASSO 6:** Testar tudo

---

## 🎯 RESUMO ULTRA-RÁPIDO

**AGORA:**
1. ✅ **Verificar** se SQL funcionou (testes)
2. ⏭️ **Adicionar** modelos Prisma (se necessário)
3. ⏭️ **Verificar** API endpoints (já criados)
4. ⏭️ **Verificar** componente React (já criado)
5. ⏭️ **Integrar** na interface do backoffice
6. ⏭️ **Testar** tudo

---

**✅ EXECUTE OS TESTES DE VERIFICAÇÃO AGORA!**

**Depois me diga o resultado e seguimos para o próximo passo!** 🚀
