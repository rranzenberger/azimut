# 🔧 API ENDPOINT - BUSCAR METADADOS
**Data:** 15/01/2026  
**Arquivo:** `azimut-cms/app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`

---

## 📋 ENDPOINT: GET `/api/admin/metadata/{pageSlug}/{sectionKey}/{fieldKey}`

Retorna metadados completos de um campo específico.

### **Request:**
```
GET /api/admin/metadata/home/hero/hero_title
```

### **Response:**
```json
{
  "id": "uuid",
  "page_slug": "home",
  "section_key": "hero",
  "field_key": "hero_title",
  "field_label": "Título do Hero",
  "field_description": "Título principal que aparece no topo da página Home...",
  "field_type": "text",
  "max_length": 80,
  "min_length": 20,
  "required": true,
  "text_format": "single_line",
  "line_breaks_allowed": false,
  "where_appears": "Topo da página Home, centralizado...",
  "example_value": "EXPERIÊNCIAS QUE CONECTAM MUNDOS"
}
```

---

## 📋 ENDPOINT: GET `/api/admin/metadata/{pageSlug}/{sectionKey}`

Retorna todos os metadados de uma seção.

### **Request:**
```
GET /api/admin/metadata/home/hero
```

### **Response:**
```json
{
  "fields": [
    {
      "field_key": "hero_title",
      "field_label": "Título do Hero",
      "max_length": 80,
      "min_length": 20,
      "required": true,
      "text_format": "single_line",
      "where_appears": "...",
      "example_value": "..."
    },
    {
      "field_key": "hero_subtitle",
      "field_label": "Subtítulo do Hero",
      ...
    }
  ]
}
```

---

## 📋 ENDPOINT: GET `/api/admin/image-spec/{pageSlug}/{sectionKey}/{fieldKey}`

Retorna especificações técnicas de uma imagem.

### **Request:**
```
GET /api/admin/image-spec/home/hero/hero_image_url
```

### **Response:**
```json
{
  "id": "uuid",
  "page_slug": "home",
  "section_key": "hero",
  "field_key": "hero_image_url",
  "recommended_width": 1920,
  "recommended_height": 1080,
  "aspect_ratio": "16:9",
  "max_file_size_mb": 2,
  "allowed_formats": ["jpg", "jpeg", "webp", "avif"],
  "description": "Imagem de fundo do hero...",
  "where_appears": "Fundo do hero, atrás do texto..."
}
```

---

## 💻 IMPLEMENTAÇÃO

### **Arquivo: `app/api/admin/metadata/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageSlug: string; sectionKey: string; fieldKey: string } }
) {
  try {
    const { pageSlug, sectionKey, fieldKey } = params;

    const metadata = await prisma.field_metadata.findFirst({
      where: {
        page_slug: pageSlug,
        section_key: sectionKey,
        field_key: fieldKey,
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

### **Arquivo: `app/api/admin/metadata/[pageSlug]/[sectionKey]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageSlug: string; sectionKey: string } }
) {
  try {
    const { pageSlug, sectionKey } = params;

    const fields = await prisma.field_metadata.findMany({
      where: {
        page_slug: pageSlug,
        section_key: sectionKey,
      },
      orderBy: {
        card_position: 'asc',
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

### **Arquivo: `app/api/admin/image-spec/[pageSlug]/[sectionKey]/[fieldKey]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageSlug: string; sectionKey: string; fieldKey: string } }
) {
  try {
    const { pageSlug, sectionKey, fieldKey } = params;

    const spec = await prisma.image_specifications.findFirst({
      where: {
        page_slug: pageSlug,
        section_key: sectionKey,
        field_key: fieldKey,
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

---

## 🎨 USO NO FRONTEND (Backoffice Admin)

```typescript
// Buscar metadados ao carregar campo
useEffect(() => {
  async function loadMetadata() {
    const response = await fetch(
      `/api/admin/metadata/${pageSlug}/${sectionKey}/${fieldKey}`
    );
    const metadata = await response.json();
    setMetadata(metadata);
  }
  loadMetadata();
}, [pageSlug, sectionKey, fieldKey]);

// Buscar especificações de imagem
useEffect(() => {
  if (fieldType === 'image') {
    async function loadImageSpec() {
      const response = await fetch(
        `/api/admin/image-spec/${pageSlug}/${sectionKey}/${fieldKey}`
      );
      const spec = await response.json();
      setImageSpec(spec);
    }
    loadImageSpec();
  }
}, [pageSlug, sectionKey, fieldKey, fieldType]);
```

---

**Próxima ação:** Criar endpoints no backoffice e integrar na interface de edição
