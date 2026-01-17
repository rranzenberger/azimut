# 🚀 IMPLEMENTAÇÃO COMPLETA - METADADOS NO BACKOFFICE
**Data:** 15/01/2026  
**Status:** ✅ **GUIA COMPLETO COM TODOS OS COMANDOS**

---

## 🎯 O QUE VAMOS IMPLEMENTAR

1. ✅ **Tabelas no banco** (field_metadata, image_specifications)
2. ✅ **Popular metadados** (Home como exemplo)
3. ✅ **API endpoints** (buscar metadados)
4. ✅ **Integração no frontend** (mostrar na interface de edição)

---

## 📋 CHECKLIST COMPLETO

### **FASE 1: Banco de Dados** (15 min)
- [ ] Executar script SQL no Neon
- [ ] Verificar tabelas criadas
- [ ] Verificar metadados populados

### **FASE 2: Prisma Schema** (10 min)
- [ ] Adicionar models ao schema.prisma
- [ ] Gerar migration
- [ ] Aplicar migration

### **FASE 3: API Endpoints** (30 min)
- [ ] Criar endpoint GET /api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]
- [ ] Criar endpoint GET /api/admin/metadata/[pageSlug]/[sectionKey]
- [ ] Criar endpoint GET /api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]
- [ ] Testar endpoints

### **FASE 4: Frontend Integration** (1-2 horas)
- [ ] Criar componente FieldEditorWithMetadata
- [ ] Integrar na página de edição
- [ ] Testar validação em tempo real

---

## 🔧 FASE 1: BANCO DE DADOS

### **PASSO 1.1: Executar Script SQL**

1. **Abrir Neon SQL Editor:**
   ```
   https://console.neon.tech → Projeto → SQL Editor
   ```

2. **Abrir arquivo:**
   ```
   azimut-cms/scripts/populate-field-metadata.sql
   ```

3. **Copiar TODO o conteúdo** e colar no SQL Editor

4. **Executar** (Run ou Ctrl+Enter)

5. **Verificar:**
   ```sql
   SELECT COUNT(*) FROM field_metadata;
   SELECT COUNT(*) FROM image_specifications;
   ```
   
   **Esperado:** Números > 0

---

## 🔧 FASE 2: PRISMA SCHEMA

### **PASSO 2.1: Adicionar Models ao schema.prisma**

**Arquivo:** `azimut-cms/prisma/schema.prisma`

**Adicionar ao final do arquivo:**

```prisma
model FieldMetadata {
  id                  String   @id @default(uuid())
  pageSlug            String   @map("page_slug")
  sectionKey          String   @map("section_key")
  fieldKey            String   @map("field_key")
  
  fieldLabel          String   @map("field_label")
  fieldDescription    String?  @map("field_description")
  fieldType          String   @map("field_type")
  
  maxLength           Int?     @map("max_length")
  minLength           Int?     @map("min_length")
  required            Boolean  @default(false)
  allowedFormats      String[] @map("allowed_formats")
  
  imageWidth          Int?     @map("image_width")
  imageHeight         Int?     @map("image_height")
  imageAspectRatio    String?  @map("image_aspect_ratio")
  videoMaxDuration    Int?     @map("video_max_duration")
  videoMaxSizeMb      Int?     @map("video_max_size_mb")
  
  textFormat          String?  @map("text_format")
  lineBreaksAllowed   Boolean  @default(false) @map("line_breaks_allowed")
  
  whereAppears        String?  @map("where_appears")
  visualGuideUrl      String?  @map("visual_guide_url")
  cardPosition        Int?     @map("card_position")
  
  exampleValue        String?  @map("example_value")
  exampleImageUrl     String?  @map("example_image_url")
  
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  @@unique([pageSlug, sectionKey, fieldKey])
  @@index([pageSlug, sectionKey])
  @@map("field_metadata")
}

model ImageSpecification {
  id                  String   @id @default(uuid())
  pageSlug            String   @map("page_slug")
  sectionKey          String   @map("section_key")
  fieldKey            String   @map("field_key")
  
  recommendedWidth    Int      @map("recommended_width")
  recommendedHeight   Int      @map("recommended_height")
  minWidth            Int?     @map("min_width")
  minHeight           Int?     @map("min_height")
  maxWidth            Int?     @map("max_width")
  maxHeight           Int?     @map("max_height")
  aspectRatio         String?  @map("aspect_ratio")
  maxFileSizeMb       Int      @default(5) @map("max_file_size_mb")
  allowedFormats      String[] @default(["jpg", "jpeg", "png", "webp", "avif"]) @map("allowed_formats")
  
  description         String?  @map("description")
  whereAppears        String?  @map("where_appears")
  visualGuideUrl      String?  @map("visual_guide_url")
  
  autoCompress        Boolean  @default(true) @map("auto_compress")
  autoConvertWebp     Boolean  @default(true) @map("auto_convert_webp")
  generateThumbnails  Boolean  @default(false) @map("generate_thumbnails")
  
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  @@unique([pageSlug, sectionKey, fieldKey])
  @@index([pageSlug, sectionKey])
  @@map("image_specifications")
}
```

### **PASSO 2.2: Gerar Migration**

```bash
cd azimut-cms
npx prisma migrate dev --name add_field_metadata_and_image_specs
```

### **PASSO 2.3: Gerar Prisma Client**

```bash
npx prisma generate
```

---

## 🔧 FASE 3: API ENDPOINTS

### **PASSO 3.1: Criar Endpoint - Metadata por Campo**

**Arquivo:** `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageSlug: string; sectionKey: string; fieldKey: string } }
) {
  try {
    const { pageSlug, sectionKey, fieldKey } = params;

    const metadata = await prisma.fieldMetadata.findFirst({
      where: {
        pageSlug: pageSlug,
        sectionKey: sectionKey,
        fieldKey: fieldKey,
      },
    });

    if (!metadata) {
      return NextResponse.json(
        { error: 'Metadata not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('[API] Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### **PASSO 3.2: Criar Endpoint - Metadata por Seção**

**Arquivo:** `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageSlug: string; sectionKey: string } }
) {
  try {
    const { pageSlug, sectionKey } = params;

    const fields = await prisma.fieldMetadata.findMany({
      where: {
        pageSlug: pageSlug,
        sectionKey: sectionKey,
      },
      orderBy: {
        cardPosition: 'asc',
      },
    });

    return NextResponse.json({ fields });
  } catch (error) {
    console.error('[API] Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### **PASSO 3.3: Criar Endpoint - Image Spec**

**Arquivo:** `azimut-cms/app/api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageSlug: string; sectionKey: string; fieldKey: string } }
) {
  try {
    const { pageSlug, sectionKey, fieldKey } = params;

    const spec = await prisma.imageSpecification.findFirst({
      where: {
        pageSlug: pageSlug,
        sectionKey: sectionKey,
        fieldKey: fieldKey,
      },
    });

    if (!spec) {
      return NextResponse.json(
        { error: 'Image specification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(spec);
  } catch (error) {
    console.error('[API] Error fetching image spec:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### **PASSO 3.4: Testar Endpoints**

```bash
# Testar metadata por campo
curl http://localhost:3000/api/admin/metadata/home/hero/hero_title

# Testar metadata por seção
curl http://localhost:3000/api/admin/metadata/home/hero

# Testar image spec
curl http://localhost:3000/api/admin/image-spec/home/hero/hero_image_url
```

---

## 🔧 FASE 4: FRONTEND INTEGRATION

### **PASSO 4.1: Criar Componente FieldEditorWithMetadata**

**Arquivo:** `azimut-cms/components/admin/FieldEditorWithMetadata.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

interface FieldMetadata {
  id: string;
  fieldLabel: string;
  fieldDescription?: string;
  fieldType: string;
  maxLength?: number;
  minLength?: number;
  required: boolean;
  textFormat?: string;
  lineBreaksAllowed: boolean;
  whereAppears?: string;
  exampleValue?: string;
}

interface ImageSpecification {
  recommendedWidth: number;
  recommendedHeight: number;
  aspectRatio?: string;
  maxFileSizeMb: number;
  allowedFormats: string[];
  description?: string;
  whereAppears?: string;
}

interface FieldEditorWithMetadataProps {
  pageSlug: string;
  sectionKey: string;
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
  onError?: (error: string) => void;
}

export function FieldEditorWithMetadata({
  pageSlug,
  sectionKey,
  fieldKey,
  value,
  onChange,
  onError,
}: FieldEditorWithMetadataProps) {
  const [metadata, setMetadata] = useState<FieldMetadata | null>(null);
  const [imageSpec, setImageSpec] = useState<ImageSpecification | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetadata() {
      try {
        setLoading(true);

        // Buscar metadados
        const metaRes = await fetch(
          `/api/admin/metadata/${pageSlug}/${sectionKey}/${fieldKey}`
        );
        
        if (metaRes.ok) {
          const meta = await metaRes.json();
          setMetadata(meta);
        }

        // Se for imagem, buscar especificações
        if (metadata?.fieldType === 'image') {
          const specRes = await fetch(
            `/api/admin/image-spec/${pageSlug}/${sectionKey}/${fieldKey}`
          );
          
          if (specRes.ok) {
            const spec = await specRes.json();
            setImageSpec(spec);
          }
        }
      } catch (error) {
        console.error('Error loading metadata:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMetadata();
  }, [pageSlug, sectionKey, fieldKey]);

  const validate = (newValue: string): boolean => {
    const newErrors: string[] = [];

    if (!metadata) return true;

    // Validar comprimento
    if (metadata.maxLength && newValue.length > metadata.maxLength) {
      newErrors.push(`Máximo ${metadata.maxLength} caracteres. Atual: ${newValue.length}`);
    }
    if (metadata.minLength && newValue.length < metadata.minLength) {
      newErrors.push(`Mínimo ${metadata.minLength} caracteres. Atual: ${newValue.length}`);
    }

    // Validar formato
    if (metadata.textFormat === 'single_line' && newValue.includes('\n')) {
      newErrors.push('Este campo não permite quebras de linha');
    }

    // Validar obrigatório
    if (metadata.required && !newValue.trim()) {
      newErrors.push('Este campo é obrigatório');
    }

    setErrors(newErrors);
    
    if (newErrors.length > 0 && onError) {
      onError(newErrors[0]);
    }

    return newErrors.length === 0;
  };

  const handleChange = (newValue: string) => {
    if (validate(newValue)) {
      onChange(newValue);
    }
  };

  if (loading) {
    return <div>Carregando informações do campo...</div>;
  }

  return (
    <div className="field-editor-with-metadata space-y-2">
      {/* Cabeçalho */}
      <div className="field-header">
        <label className="block font-semibold">
          {metadata?.fieldLabel || fieldKey}
          {metadata?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {metadata?.fieldDescription && (
          <p className="text-sm text-gray-600 mt-1">{metadata.fieldDescription}</p>
        )}
      </div>

      {/* Onde aparece */}
      {metadata?.whereAppears && (
        <div className="text-sm text-gray-500">
          📍 <strong>Onde aparece:</strong> {metadata.whereAppears}
        </div>
      )}

      {/* Especificações de imagem */}
      {imageSpec && (
        <div className="bg-blue-50 p-3 rounded text-sm">
          <strong>Especificações:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Resolução recomendada: {imageSpec.recommendedWidth}x{imageSpec.recommendedHeight}px</li>
            {imageSpec.aspectRatio && <li>Proporção: {imageSpec.aspectRatio}</li>}
            <li>Tamanho máximo: {imageSpec.maxFileSizeMb}MB</li>
            <li>Formatos: {imageSpec.allowedFormats.join(', ')}</li>
          </ul>
        </div>
      )}

      {/* Editor */}
      <div className="editor">
        {metadata?.fieldType === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={metadata.maxLength}
            rows={metadata.textFormat === 'two_lines' ? 2 : 5}
            className={`w-full p-2 border rounded ${
              errors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={metadata.maxLength}
            className={`w-full p-2 border rounded ${
              errors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      </div>

      {/* Contador de caracteres */}
      {metadata?.maxLength && (
        <div className="text-sm text-gray-500">
          {value.length} / {metadata.maxLength} caracteres
          {value.length > metadata.maxLength * 0.9 && (
            <span className="text-yellow-600 ml-2">⚠️ Próximo do limite</span>
          )}
        </div>
      )}

      {/* Exemplo */}
      {metadata?.exampleValue && (
        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
          💡 <strong>Exemplo:</strong> {metadata.exampleValue}
        </div>
      )}

      {/* Erros */}
      {errors.length > 0 && (
        <div className="text-sm text-red-600 space-y-1">
          {errors.map((err, i) => (
            <div key={i}>❌ {err}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### **PASSO 4.2: Usar na Página de Edição**

**Exemplo de uso:**

```typescript
import { FieldEditorWithMetadata } from '@/components/admin/FieldEditorWithMetadata';

function PageEditor() {
  const [heroTitle, setHeroTitle] = useState('');

  return (
    <FieldEditorWithMetadata
      pageSlug="home"
      sectionKey="hero"
      fieldKey="hero_title"
      value={heroTitle}
      onChange={setHeroTitle}
    />
  );
}
```

---

## ✅ TESTE FINAL

1. **Abrir página de edição no backoffice**
2. **Verificar que metadados aparecem** (label, descrição, onde aparece)
3. **Testar validação** (tentar passar do limite de caracteres)
4. **Testar contador** (ver contador de caracteres funcionando)
5. **Testar exemplo** (ver exemplo de valor)

---

## 🚨 TROUBLESHOOTING

### **Erro: "Table field_metadata does not exist"**
- ✅ Verificar se script SQL foi executado
- ✅ Verificar se está no banco correto

### **Erro: "FieldMetadata model not found"**
- ✅ Verificar se Prisma schema foi atualizado
- ✅ Executar `npx prisma generate`

### **Erro: "API endpoint not found"**
- ✅ Verificar se arquivos foram criados nos caminhos corretos
- ✅ Verificar se servidor está rodando

### **Metadados não aparecem na interface**
- ✅ Verificar console do navegador (F12)
- ✅ Verificar se API está retornando dados
- ✅ Verificar se componente está buscando metadados

---

## 📚 ARQUIVOS CRIADOS/MODIFICADOS

- ✅ `azimut-cms/scripts/populate-field-metadata.sql` (já existe)
- ✅ `azimut-cms/prisma/schema.prisma` (adicionar models)
- ✅ `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/route.ts` (criar)
- ✅ `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/route.ts` (criar)
- ✅ `azimut-cms/app/api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]/route.ts` (criar)
- ✅ `azimut-cms/components/admin/FieldEditorWithMetadata.tsx` (criar)

---

**Próxima ação:** Seguir os passos na ordem (Fase 1 → 2 → 3 → 4)
