# 🔧 MELHORAR ESTRUTURA BACKOFFICE EXISTENTE
**Data:** 15/01/2026  
**Status:** 📊 **ANÁLISE E MELHORIAS**

---

## 🎯 OBJETIVO

Analisar estrutura atual do backoffice e melhorar para suportar:
- ✅ Metadados completos de campos
- ✅ Validações automáticas
- ✅ Guias visuais
- ✅ Especificações técnicas
- ✅ Informações precisas para evitar confusão

---

## 📊 ESTRUTURA ATUAL (A ANALISAR)

### **Tabelas Existentes (Prováveis):**
- `Page` - Páginas
- `PageTranslation` - Traduções
- `Media` - Mídias
- `Service` - Serviços
- `Project` - Projetos
- `Lead` - Leads

---

## 🔍 ANÁLISE E MELHORIAS

### **1. Adicionar Tabela de Metadados**

```sql
-- Tabela de metadados de campos
CREATE TABLE field_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_description TEXT,
  field_type TEXT NOT NULL,
  max_length INTEGER,
  min_length INTEGER,
  required BOOLEAN DEFAULT false,
  text_format TEXT, -- 'single_line', 'two_lines', 'paragraph'
  where_appears TEXT,
  example_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_slug, section_key, field_key)
);
```

### **2. Adicionar Tabela de Especificações de Imagens**

```sql
-- Tabela de especificações de imagens
CREATE TABLE image_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  recommended_width INTEGER NOT NULL,
  recommended_height INTEGER NOT NULL,
  aspect_ratio TEXT,
  max_file_size_mb INTEGER DEFAULT 5,
  allowed_formats TEXT[],
  description TEXT,
  where_appears TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_slug, section_key, field_key)
);
```

### **3. Melhorar Tabela Page (Adicionar Campos)**

```sql
-- Adicionar campos úteis à tabela Page (se não existirem)
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "page_type" TEXT DEFAULT 'standard', -- 'standard', 'landing', 'detail'
ADD COLUMN IF NOT EXISTS "parent_page_id" UUID REFERENCES "Page"(id), -- para sub-páginas
ADD COLUMN IF NOT EXISTS "display_order" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN DEFAULT true;
```

### **4. Melhorar Tabela Media (Adicionar Metadados)**

```sql
-- Adicionar campos úteis à tabela Media (se não existirem)
ALTER TABLE "Media"
ADD COLUMN IF NOT EXISTS "width" INTEGER,
ADD COLUMN IF NOT EXISTS "height" INTEGER,
ADD COLUMN IF NOT EXISTS "file_size" INTEGER,
ADD COLUMN IF NOT EXISTS "mime_type" TEXT,
ADD COLUMN IF NOT EXISTS "alt_text_pt" TEXT,
ADD COLUMN IF NOT EXISTS "alt_text_en" TEXT,
ADD COLUMN IF NOT EXISTS "alt_text_es" TEXT,
ADD COLUMN IF NOT EXISTS "alt_text_fr" TEXT,
ADD COLUMN IF NOT EXISTS "specification_id" UUID REFERENCES image_specifications(id);
```

---

## 📝 POPULAR METADADOS - HOME (EXEMPLO COMPLETO)

```sql
-- Hero Title
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, where_appears, example_value
) VALUES (
  'home', 'hero', 'hero_title',
  'Título do Hero',
  'Título principal que aparece no topo da página Home, acima do subtítulo. Texto em MAIÚSCULAS, uma linha.',
  'text',
  80, 20, true,
  'single_line',
  'Topo da página Home, centralizado, acima do subtítulo, em fonte grande (H1)',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS'
);

-- Hero Subtitle
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, where_appears, example_value
) VALUES (
  'home', 'hero', 'hero_subtitle',
  'Subtítulo do Hero',
  'Subtítulo que aparece logo abaixo do título principal. Texto corrido, pode ter até 2 linhas.',
  'text',
  120, 30, true,
  'two_lines',
  'Logo abaixo do título, em fonte média, cor secundária',
  'Criamos experiências imersivas entre Brasil e Canadá.'
);

-- Hero Image
INSERT INTO image_specifications (
  page_slug, section_key, field_key,
  recommended_width, recommended_height,
  aspect_ratio, max_file_size_mb,
  allowed_formats, description, where_appears
) VALUES (
  'home', 'hero', 'hero_image_url',
  1920, 1080,
  '16:9', 2,
  ARRAY['jpg', 'jpeg', 'webp', 'avif'],
  'Imagem de fundo do hero. Deve ser cinematográfica, alta qualidade.',
  'Fundo do hero, atrás do texto, com overlay escuro para legibilidade'
);
```

---

## 🎨 INTERFACE DE EDIÇÃO MELHORADA

### **Componente com Validação em Tempo Real:**

```typescript
// Editor de Campo com Metadados e Validação
function FieldEditorWithMetadata({ 
  pageSlug, 
  sectionKey, 
  fieldKey, 
  value, 
  onChange 
}) {
  const [metadata, setMetadata] = useState(null);
  const [imageSpec, setImageSpec] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Buscar metadados
    Promise.all([
      fetch(`/api/admin/metadata/${pageSlug}/${sectionKey}/${fieldKey}`),
      fetch(`/api/admin/image-spec/${pageSlug}/${sectionKey}/${fieldKey}`)
    ])
      .then(([metaRes, specRes]) => 
        Promise.all([metaRes.json(), specRes.json()])
      )
      .then(([meta, spec]) => {
        setMetadata(meta);
        setImageSpec(spec);
      });
  }, [pageSlug, sectionKey, fieldKey]);

  const validate = (newValue) => {
    const newErrors = [];

    // Validações de texto
    if (metadata) {
      if (metadata.max_length && newValue.length > metadata.max_length) {
        newErrors.push(`Máximo ${metadata.max_length} caracteres`);
      }
      if (metadata.min_length && newValue.length < metadata.min_length) {
        newErrors.push(`Mínimo ${metadata.min_length} caracteres`);
      }
      if (metadata.text_format === 'single_line' && newValue.includes('\n')) {
        newErrors.push('Este campo não permite quebras de linha');
      }
    }

    // Validações de imagem
    if (imageSpec && value.startsWith('http')) {
      // Validar dimensões, formato, tamanho
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return (
    <div className="field-editor-with-metadata">
      {/* Cabeçalho com informações */}
      <div className="field-header">
        <label>
          <strong>{metadata?.field_label}</strong>
          {metadata?.required && <span className="required">*</span>}
        </label>
        {metadata?.field_description && (
          <p className="description">{metadata.field_description}</p>
        )}
      </div>

      {/* Onde aparece */}
      {metadata?.where_appears && (
        <div className="where-appears">
          📍 <strong>Onde aparece:</strong> {metadata.where_appears}
        </div>
      )}

      {/* Especificações de imagem */}
      {imageSpec && (
        <div className="image-specs">
          <strong>Especificações:</strong>
          <ul>
            <li>Resolução recomendada: {imageSpec.recommended_width}x{imageSpec.recommended_height}px</li>
            <li>Proporção: {imageSpec.aspect_ratio}</li>
            <li>Tamanho máximo: {imageSpec.max_file_size_mb}MB</li>
            <li>Formatos: {imageSpec.allowed_formats.join(', ')}</li>
          </ul>
        </div>
      )}

      {/* Editor */}
      <div className="editor">
        {metadata?.field_type === 'image' ? (
          <ImageUploader
            value={value}
            onChange={onChange}
            spec={imageSpec}
            onError={(err) => setErrors([...errors, err])}
          />
        ) : metadata?.field_type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => {
              if (validate(e.target.value)) {
                onChange(e.target.value);
              }
            }}
            maxLength={metadata.max_length}
            rows={metadata.text_format === 'two_lines' ? 2 : 5}
            className={errors.length > 0 ? 'error' : ''}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => {
              if (validate(e.target.value)) {
                onChange(e.target.value);
              }
            }}
            maxLength={metadata.max_length}
            className={errors.length > 0 ? 'error' : ''}
          />
        )}
      </div>

      {/* Contador de caracteres */}
      {metadata?.max_length && (
        <div className="char-count">
          {value.length} / {metadata.max_length} caracteres
          {value.length > metadata.max_length * 0.9 && (
            <span className="warning">⚠️ Próximo do limite</span>
          )}
        </div>
      )}

      {/* Exemplo */}
      {metadata?.example_value && (
        <div className="example">
          💡 <strong>Exemplo:</strong> {metadata.example_value}
        </div>
      )}

      {/* Erros */}
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((err, i) => (
            <div key={i} className="error">❌ {err}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 📋 CHECKLIST DE MELHORIAS

### **Estrutura de Dados:**
- [ ] Criar tabela `field_metadata`
- [ ] Criar tabela `image_specifications`
- [ ] Adicionar campos úteis à `Page`
- [ ] Adicionar campos úteis à `Media`
- [ ] Criar índices para performance

### **Metadados:**
- [ ] Popular metadados para Home
- [ ] Popular metadados para Vancouver
- [ ] Popular metadados para WhatWeDo
- [ ] Popular metadados para Work
- [ ] Popular especificações de imagens

### **Interface:**
- [ ] Criar componente `FieldEditorWithMetadata`
- [ ] Adicionar validação em tempo real
- [ ] Adicionar contador de caracteres
- [ ] Adicionar guias visuais
- [ ] Adicionar exemplos

### **Validações:**
- [ ] Validar comprimento de texto
- [ ] Validar formato de texto
- [ ] Validar dimensões de imagem
- [ ] Validar tamanho de arquivo
- [ ] Validar formato de arquivo

---

## 🚀 PRÓXIMOS PASSOS

1. **Analisar estrutura atual** do backoffice
2. **Criar tabelas de metadados**
3. **Popular metadados** para Home (piloto)
4. **Criar interface de edição** melhorada
5. **Testar com estagiário** (validação de usabilidade)

---

**Próxima ação:** Analisar estrutura atual e criar melhorias
