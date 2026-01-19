# 🚀 PASSO A PASSO COMPLETO - IMPLEMENTAÇÃO
**Data:** 15/01/2026  
**Status:** 📋 **GUIA PASSO A PASSO DETALHADO**

---

## ✅ PASSO 1: EXECUTAR SQL NO NEON (5 min)

### **1.1. Acessar Neon Dashboard**

1. Abrir navegador
2. Acessar: **https://console.neon.tech**
3. Fazer login (se necessário)
4. Selecionar projeto **Azimut** (ou o projeto correto)

### **1.2. Abrir SQL Editor**

1. No menu lateral, clicar em **"SQL Editor"**
2. Ou clicar em **"Query"** ou **"SQL"**
3. Aguardar editor carregar

### **1.3. Abrir Script SQL**

1. No VS Code (ou editor), abrir arquivo:
   ```
   azimut-cms/scripts/populate-field-metadata.sql
   ```
2. Selecionar **TODO** o conteúdo (Ctrl+A)
3. Copiar (Ctrl+C)

### **1.4. Colar e Executar no Neon**

1. Voltar para o Neon SQL Editor
2. Colar o conteúdo (Ctrl+V)
3. Verificar que o SQL está completo
4. Clicar em **"Run"** ou pressionar **Ctrl+Enter**
5. Aguardar execução (pode levar alguns segundos)

### **1.5. Verificar se Funcionou**

No mesmo SQL Editor, executar:

```sql
-- Verificar quantos metadados foram criados
SELECT COUNT(*) FROM field_metadata;

-- Verificar especificações de imagens
SELECT COUNT(*) FROM image_specifications;

-- Ver metadados da Home
SELECT 
  field_key,
  field_label,
  max_length,
  required
FROM field_metadata
WHERE page_slug = 'home'
LIMIT 5;
```

**Esperado:**
- `field_metadata`: Número > 0 (ex: 20+)
- `image_specifications`: Número > 0 (ex: 1+)
- Lista de campos da Home aparecendo

**✅ Se apareceram números > 0, PASSO 1 CONCLUÍDO!**

---

## ✅ PASSO 2: GERAR MIGRATION PRISMA (2 min)

### **2.1. Abrir Terminal**

1. Abrir terminal (PowerShell, CMD, ou Git Bash)
2. Navegar para o diretório do projeto:
   ```bash
   cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
   ```

### **2.2. Entrar no Diretório do Backoffice**

```bash
cd azimut-cms
```

### **2.3. Gerar Migration**

```bash
npx prisma migrate dev --name add_field_metadata_and_image_specs
```

**O que vai acontecer:**
- Prisma vai detectar os models `FieldMetadata` e `ImageSpecification`
- Vai criar arquivo de migration
- Vai aplicar a migration no banco
- Pode pedir para criar migration (digite `y` e Enter)

**Esperado:** Mensagem de sucesso como:
```
✔ Migration created and applied successfully.
```

### **2.4. Gerar Prisma Client**

```bash
npx prisma generate
```

**Esperado:** Mensagem de sucesso:
```
✔ Generated Prisma Client
```

### **2.5. Verificar**

```bash
# Verificar se migration foi criada
ls prisma/migrations

# Deve aparecer uma pasta com nome tipo: 20260115...add_field_metadata_and_image_specs
```

**✅ Se migration foi criada e Prisma Client gerado, PASSO 2 CONCLUÍDO!**

---

## ✅ PASSO 3: CRIAR API ENDPOINTS (30 min)

### **3.1. Criar Estrutura de Pastas**

1. No VS Code, navegar para:
   ```
   azimut-cms/app/api/admin/metadata/
   ```

2. Criar estrutura de pastas:
   ```
   azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/
   azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/
   azimut-cms/app/api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]/
   ```

### **3.2. Criar Endpoint 1: Metadata por Campo**

**Arquivo:** `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`

**Criar arquivo e colar este código:**

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

**Salvar arquivo** (Ctrl+S)

### **3.3. Criar Endpoint 2: Metadata por Seção**

**Arquivo:** `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/route.ts`

**Criar arquivo e colar este código:**

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

**Salvar arquivo** (Ctrl+S)

### **3.4. Criar Endpoint 3: Image Spec**

**Arquivo:** `azimut-cms/app/api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`

**Criar arquivo e colar este código:**

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

**Salvar arquivo** (Ctrl+S)

### **3.5. Verificar Caminho do Prisma**

**Verificar se o caminho `@/lib/db` está correto:**

1. Procurar arquivo que exporta `prisma`:
   ```bash
   # Procurar no backoffice
   find azimut-cms -name "*.ts" -o -name "*.js" | xargs grep "export.*prisma"
   ```

2. Se o caminho for diferente (ex: `@/lib/prisma`), ajustar nos 3 arquivos

### **3.6. Testar Endpoints (Local)**

1. Iniciar servidor do backoffice:
   ```bash
   cd azimut-cms
   npm run dev
   ```

2. Em outro terminal, testar:
   ```bash
   # Testar endpoint 1
   curl http://localhost:3000/api/admin/metadata/home/hero/hero_title

   # Testar endpoint 2
   curl http://localhost:3000/api/admin/metadata/home/hero

   # Testar endpoint 3
   curl http://localhost:3000/api/admin/image-spec/home/hero/hero_image_url
   ```

**Esperado:** JSON com dados de metadados

**✅ Se endpoints retornam JSON válido, PASSO 3 CONCLUÍDO!**

---

## ✅ PASSO 4: CRIAR COMPONENTE REACT (1-2 horas)

### **4.1. Criar Arquivo do Componente**

**Arquivo:** `azimut-cms/components/admin/FieldEditorWithMetadata.tsx`

**Criar arquivo e colar este código completo:**

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
          
          // Se for imagem, buscar especificações
          if (meta.fieldType === 'image') {
            const specRes = await fetch(
              `/api/admin/image-spec/${pageSlug}/${sectionKey}/${fieldKey}`
            );
            
            if (specRes.ok) {
              const spec = await specRes.json();
              setImageSpec(spec);
            }
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
    return <div className="text-gray-500">Carregando informações do campo...</div>;
  }

  return (
    <div className="field-editor-with-metadata space-y-2">
      {/* Cabeçalho */}
      <div className="field-header">
        <label className="block font-semibold text-gray-900">
          {metadata?.fieldLabel || fieldKey}
          {metadata?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {metadata?.fieldDescription && (
          <p className="text-sm text-gray-600 mt-1">{metadata.fieldDescription}</p>
        )}
      </div>

      {/* Onde aparece */}
      {metadata?.whereAppears && (
        <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
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

**Salvar arquivo** (Ctrl+S)

### **4.2. Verificar se Compilou**

1. No terminal do backoffice, verificar se não há erros
2. Se houver erros de importação, verificar caminhos

**✅ Se arquivo foi criado sem erros, PASSO 4 CONCLUÍDO!**

---

## ✅ PASSO 5: INTEGRAR NA INTERFACE (30 min)

### **5.1. Encontrar Página de Edição**

1. Procurar arquivo da página de edição (ex: `azimut-cms/app/admin/pages/[slug]/page.tsx`)
2. Ou página de edição de conteúdo

### **5.2. Importar Componente**

No topo do arquivo, adicionar:

```typescript
import { FieldEditorWithMetadata } from '@/components/admin/FieldEditorWithMetadata';
```

### **5.3. Substituir Campo de Edição**

**Antes (exemplo):**
```typescript
<input
  type="text"
  value={heroTitle}
  onChange={(e) => setHeroTitle(e.target.value)}
/>
```

**Depois:**
```typescript
<FieldEditorWithMetadata
  pageSlug="home"
  sectionKey="hero"
  fieldKey="hero_title"
  value={heroTitle}
  onChange={setHeroTitle}
/>
```

### **5.4. Testar na Interface**

1. Iniciar servidor:
   ```bash
   cd azimut-cms
   npm run dev
   ```

2. Acessar: http://localhost:3000/admin
3. Fazer login
4. Ir em página de edição
5. Verificar que metadados aparecem:
   - Label e descrição do campo
   - Onde aparece
   - Contador de caracteres
   - Exemplo de valor
   - Validação em tempo real

### **5.5. Testar Validação**

1. Tentar passar do limite de caracteres
2. Verificar que erro aparece
3. Tentar adicionar quebra de linha em campo de uma linha
4. Verificar que erro aparece

**✅ Se metadados aparecem e validação funciona, PASSO 5 CONCLUÍDO!**

---

## ✅ VERIFICAÇÃO FINAL

### **Checklist Completo:**

- [ ] SQL executado no Neon (tabelas criadas, dados populados)
- [ ] Migration Prisma gerada e aplicada
- [ ] API endpoints criados e testados
- [ ] Componente React criado
- [ ] Componente integrado na interface
- [ ] Metadados aparecendo nos campos
- [ ] Validação funcionando
- [ ] Contador de caracteres funcionando
- [ ] Exemplos aparecendo

---

## 🛡️ SE DER PROBLEMA

### **Erro: "Table does not exist"**
- ✅ Verificar se SQL foi executado no Neon
- ✅ Verificar se está no banco correto

### **Erro: "Model not found"**
- ✅ Executar: `npx prisma generate`
- ✅ Verificar se schema.prisma está correto

### **Erro: "API endpoint not found"**
- ✅ Verificar se arquivos foram criados nos caminhos corretos
- ✅ Verificar se servidor está rodando

### **Erro: "Metadata not found"**
- ✅ Verificar se SQL populou dados
- ✅ Testar endpoint diretamente com curl

### **Erro de Importação no Componente**
- ✅ Verificar caminho do import
- ✅ Verificar se arquivo foi salvo

---

## 🎯 PRÓXIMO PASSO APÓS COMPLETAR

**Deploy!** Ver: `DEPLOY_DEFINITIVO_METADADOS.md`

---

**✅ SEGUIR OS PASSOS NA ORDEM!**

Cada passo depende do anterior. Não pule etapas!
