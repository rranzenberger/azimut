# 📋 METADADOS BACKOFFICE COMPLETOS - GUIA DE USO
**Data:** 15/01/2026  
**Status:** 🎯 **SISTEMA DE VALIDAÇÃO E DOCUMENTAÇÃO**

---

## 🎯 OBJETIVO

Criar sistema completo de metadados no backoffice para que **qualquer pessoa** (incluindo estagiários) possa editar conteúdo sem confusão, sabendo:
- ✅ **Onde** cada campo aparece no site
- ✅ **Quantos caracteres** permitidos
- ✅ **Formato** (uma linha, duas linhas, texto corrido)
- ✅ **Qual card/seção** pertence
- ✅ **Tamanhos de imagens** (resolução, formato)
- ✅ **Onde vídeos** entram
- ✅ **Validações** automáticas

---

## 📊 ESTRUTURA DE METADADOS

### **1. Tabela: `field_metadata` (Metadados de Campos)**

```sql
CREATE TABLE field_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identificação
  page_slug TEXT NOT NULL, -- 'home', 'vancouver', 'what-we-do'
  section_key TEXT NOT NULL, -- 'hero', 'pillars', 'stats', 'testimonials'
  field_key TEXT NOT NULL, -- 'hero_title', 'hero_subtitle', 'card_description'
  
  -- Informações do Campo
  field_label TEXT NOT NULL, -- 'Título do Hero'
  field_description TEXT, -- 'Título principal que aparece no topo da página'
  field_type TEXT NOT NULL, -- 'text', 'textarea', 'rich_text', 'image', 'video'
  
  -- Validações
  max_length INTEGER, -- 100 caracteres
  min_length INTEGER, -- 10 caracteres
  required BOOLEAN DEFAULT false,
  allowed_formats TEXT[], -- ['jpg', 'png', 'webp'] para imagens
  
  -- Especificações Técnicas
  image_width INTEGER, -- 1920 para hero images
  image_height INTEGER, -- 1080 para hero images
  image_aspect_ratio TEXT, -- '16:9', '1:1', '4:3'
  video_max_duration INTEGER, -- 60 segundos
  video_max_size_mb INTEGER, -- 50 MB
  
  -- Formato de Texto
  text_format TEXT, -- 'single_line', 'two_lines', 'paragraph', 'rich_text'
  line_breaks_allowed BOOLEAN DEFAULT false,
  
  -- Onde Aparece (Descrição Visual)
  where_appears TEXT, -- 'Topo da página, acima do subtítulo'
  visual_guide_url TEXT, -- URL de screenshot ou mockup
  card_position INTEGER, -- 1, 2, 3, 4 (para cards)
  
  -- Exemplos
  example_value TEXT, -- 'EXPERIÊNCIAS QUE CONECTAM MUNDOS'
  example_image_url TEXT, -- URL de exemplo
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(page_slug, section_key, field_key)
);

CREATE INDEX idx_field_metadata_page ON field_metadata(page_slug, section_key);
```

---

## 📝 METADADOS POR PÁGINA

### **HOME - Hero Section**

```sql
-- Hero Title
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, example_value
) VALUES (
  'home', 'hero', 'hero_title',
  'Título do Hero',
  'Título principal que aparece no topo da página Home, acima do subtítulo. Texto em MAIÚSCULAS, uma linha.',
  'text',
  80, -- máximo 80 caracteres
  20, -- mínimo 20 caracteres
  true, -- obrigatório
  'single_line', -- uma linha apenas
  false, -- sem quebras de linha
  'Topo da página Home, centralizado, acima do subtítulo, em fonte grande (H1)',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS'
);

-- Hero Subtitle
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, example_value
) VALUES (
  'home', 'hero', 'hero_subtitle',
  'Subtítulo do Hero',
  'Subtítulo que aparece logo abaixo do título principal. Texto corrido, pode ter até 2 linhas.',
  'text',
  120, -- máximo 120 caracteres
  30, -- mínimo 30 caracteres
  true, -- obrigatório
  'two_lines', -- até 2 linhas
  true, -- permite quebras de linha
  'Logo abaixo do título, em fonte média, cor secundária',
  'Criamos experiências imersivas entre Brasil e Canadá.'
);

-- Hero Description
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, example_value
) VALUES (
  'home', 'hero', 'hero_description',
  'Descrição do Hero',
  'Texto descritivo que aparece abaixo do subtítulo. Parágrafo completo, texto corrido.',
  'textarea',
  500, -- máximo 500 caracteres
  100, -- mínimo 100 caracteres
  false, -- opcional
  'paragraph', -- parágrafo completo
  true, -- permite quebras de linha
  'Abaixo do subtítulo, em fonte pequena, texto justificado',
  'Transformamos ideias em realidade através de tecnologias imersivas, inteligência artificial e produção audiovisual de classe mundial.'
);

-- Hero Image
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  required,
  image_width, image_height, image_aspect_ratio,
  allowed_formats,
  where_appears, example_image_url
) VALUES (
  'home', 'hero', 'hero_image_url',
  'Imagem do Hero',
  'Imagem de fundo do hero. Deve ser de alta qualidade, cinematográfica.',
  'image',
  false, -- opcional (pode usar gradiente)
  1920, -- largura recomendada
  1080, -- altura recomendada
  '16:9', -- proporção 16:9
  ARRAY['jpg', 'jpeg', 'webp', 'avif'], -- formatos permitidos
  'Fundo do hero, atrás do texto, com overlay escuro para legibilidade',
  'https://example.com/hero-home.jpg'
);
```

---

### **HOME - Pillars (4 Cards)**

```sql
-- Pillar 1 - Title
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, card_position, example_value
) VALUES (
  'home', 'pillars', 'pillar_1_title',
  'Título do Card 1 (Pillar 1)',
  'Título do primeiro card de expertise. Texto curto, uma linha.',
  'text',
  50, -- máximo 50 caracteres
  10, -- mínimo 10 caracteres
  true, -- obrigatório
  'single_line', -- uma linha
  false, -- sem quebras
  'Card 1 (primeiro da esquerda), seção "Nossa Expertise", grid 2x2 mobile, 4x1 desktop',
  1, -- posição 1
  'VR & AR'
);

-- Pillar 1 - Description
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, card_position, example_value
) VALUES (
  'home', 'pillars', 'pillar_1_description',
  'Descrição do Card 1 (Pillar 1)',
  'Descrição do primeiro card. Texto corrido, 2-3 linhas.',
  'textarea',
  200, -- máximo 200 caracteres
  50, -- mínimo 50 caracteres
  true, -- obrigatório
  'two_lines', -- 2-3 linhas
  true, -- permite quebras
  'Abaixo do título no Card 1, texto justificado, fonte pequena',
  1, -- posição 1
  'Criamos experiências imersivas usando realidade virtual e aumentada, transportando usuários para novos mundos.'
);

-- Pillar 1 - Icon
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  required,
  where_appears, card_position, example_value
) VALUES (
  'home', 'pillars', 'pillar_1_icon',
  'Ícone do Card 1 (Pillar 1)',
  'Nome do ícone (emoji ou nome de biblioteca de ícones).',
  'text',
  false, -- opcional
  'Acima do título no Card 1, centralizado, tamanho grande',
  1, -- posição 1
  '🥽' -- ou 'vr-icon' se usar biblioteca
);

-- Repetir para Pillar 2, 3, 4 (card_position: 2, 3, 4)
```

---

### **HOME - Stats (4 Estatísticas)**

```sql
-- Stat 1 - Value
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, where_appears, card_position, example_value
) VALUES (
  'home', 'stats', 'stat_1_value',
  'Valor da Estatística 1',
  'Número ou texto da primeira estatística. Pode ser número (ex: "50+") ou texto curto.',
  'text',
  20, -- máximo 20 caracteres
  1, -- mínimo 1 caractere
  true, -- obrigatório
  'single_line', -- uma linha
  'Estatística 1 (primeira da esquerda), número grande, cor vermelha Azimut',
  1, -- posição 1
  '50+'
);

-- Stat 1 - Label
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, where_appears, card_position, example_value
) VALUES (
  'home', 'stats', 'stat_1_label',
  'Label da Estatística 1',
  'Texto descritivo da estatística. Texto curto, uma linha.',
  'text',
  50, -- máximo 50 caracteres
  5, -- mínimo 5 caracteres
  true, -- obrigatório
  'single_line', -- uma linha
  'Abaixo do valor na Estatística 1, texto pequeno, cor secundária',
  1, -- posição 1
  'Projetos Entregues'
);

-- Repetir para Stat 2, 3, 4 (card_position: 2, 3, 4)
```

---

### **VANCOUVER - Hero Section**

```sql
-- Vancouver Hero Title
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, where_appears, example_value
) VALUES (
  'vancouver', 'hero', 'hero_title',
  'Título do Hero Vancouver',
  'Título principal da página Vancouver. Texto em MAIÚSCULAS, uma linha.',
  'text',
  100, -- máximo 100 caracteres
  20, -- mínimo 20 caracteres
  true, -- obrigatório
  'single_line', -- uma linha
  'Topo da página Vancouver, centralizado, acima do badge "Agenciamento Educacional"',
  'ESTUDE EM VANCOUVER, CANADÁ'
);

-- Vancouver Hero Image (Time-based)
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  required,
  image_width, image_height, image_aspect_ratio,
  allowed_formats,
  where_appears, example_image_url
) VALUES (
  'vancouver', 'hero', 'hero_image_madrugada',
  'Imagem Hero - Madrugada (00h-06h)',
  'Imagem de fundo do hero para período madrugada (00h-06h horário Vancouver). Deve ser cinematográfica, mostrando Vancouver de madrugada.',
  'image',
  false, -- opcional
  1440, -- largura recomendada
  900, -- altura recomendada
  '16:9', -- proporção 16:9
  ARRAY['jpg', 'jpeg', 'webp'], -- formatos permitidos
  'Fundo do hero Vancouver, período 00h-06h, com overlay escuro',
  'https://example.com/vancouver-hero-madrugada.jpg'
);

-- Repetir para outros períodos:
-- hero_image_dawn (06h-09h)
-- hero_image_day (09h-17h)
-- hero_image_sunset (17h-20h)
-- hero_image_night (20h-00h)
```

---

## 🎨 INTERFACE DE EDIÇÃO COM METADADOS

### **Componente de Edição com Validação:**

```typescript
// Exemplo: Editor de Campo com Metadados
interface FieldEditorProps {
  pageSlug: string;
  sectionKey: string;
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
}

function FieldEditor({ pageSlug, sectionKey, fieldKey, value, onChange }: FieldEditorProps) {
  const [metadata, setMetadata] = useState<FieldMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Buscar metadados do campo
    fetch(`/api/admin/metadata/${pageSlug}/${sectionKey}/${fieldKey}`)
      .then(res => res.json())
      .then(data => setMetadata(data));
  }, [pageSlug, sectionKey, fieldKey]);

  const validate = (newValue: string) => {
    if (!metadata) return;

    // Validar comprimento
    if (metadata.max_length && newValue.length > metadata.max_length) {
      setError(`Máximo ${metadata.max_length} caracteres. Atual: ${newValue.length}`);
      return false;
    }
    if (metadata.min_length && newValue.length < metadata.min_length) {
      setError(`Mínimo ${metadata.min_length} caracteres. Atual: ${newValue.length}`);
      return false;
    }

    // Validar formato
    if (metadata.text_format === 'single_line' && newValue.includes('\n')) {
      setError('Este campo não permite quebras de linha');
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <div className="field-editor">
      {/* Label com descrição */}
      <label>
        <strong>{metadata?.field_label}</strong>
        {metadata?.field_description && (
          <span className="description">{metadata.field_description}</span>
        )}
      </label>

      {/* Onde aparece */}
      {metadata?.where_appears && (
        <div className="where-appears">
          📍 <strong>Onde aparece:</strong> {metadata.where_appears}
        </div>
      )}

      {/* Editor */}
      {metadata?.field_type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => {
            if (validate(e.target.value)) {
              onChange(e.target.value);
            }
          }}
          maxLength={metadata.max_length}
          rows={metadata.text_format === 'two_lines' ? 2 : 5}
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
        />
      )}

      {/* Contador de caracteres */}
      {metadata?.max_length && (
        <div className="char-count">
          {value.length} / {metadata.max_length} caracteres
        </div>
      )}

      {/* Exemplo */}
      {metadata?.example_value && (
        <div className="example">
          💡 <strong>Exemplo:</strong> {metadata.example_value}
        </div>
      )}

      {/* Erro */}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

---

## 🖼️ METADADOS DE IMAGENS

### **Tabela: `image_specifications`**

```sql
CREATE TABLE image_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identificação
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  
  -- Especificações Técnicas
  recommended_width INTEGER NOT NULL,
  recommended_height INTEGER NOT NULL,
  min_width INTEGER,
  min_height INTEGER,
  max_width INTEGER,
  max_height INTEGER,
  aspect_ratio TEXT, -- '16:9', '1:1', '4:3'
  max_file_size_mb INTEGER DEFAULT 5,
  allowed_formats TEXT[] DEFAULT ARRAY['jpg', 'jpeg', 'png', 'webp', 'avif'],
  
  -- Descrição
  description TEXT,
  where_appears TEXT,
  visual_guide_url TEXT,
  
  -- Validação Automática
  auto_compress BOOLEAN DEFAULT true,
  auto_convert_webp BOOLEAN DEFAULT true,
  generate_thumbnails BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(page_slug, section_key, field_key)
);
```

### **Exemplos de Especificações:**

```sql
-- Home Hero Image
INSERT INTO image_specifications (
  page_slug, section_key, field_key,
  recommended_width, recommended_height,
  aspect_ratio, max_file_size_mb,
  description, where_appears
) VALUES (
  'home', 'hero', 'hero_image_url',
  1920, 1080,
  '16:9', 2, -- máximo 2MB
  'Imagem de fundo do hero. Deve ser cinematográfica, alta qualidade.',
  'Fundo do hero, atrás do texto, com overlay escuro'
);

-- Vancouver Hero Image (Time-based)
INSERT INTO image_specifications (
  page_slug, section_key, field_key,
  recommended_width, recommended_height,
  aspect_ratio, max_file_size_mb,
  description, where_appears
) VALUES (
  'vancouver', 'hero', 'hero_image_madrugada',
  1440, 900,
  '16:9', 1, -- máximo 1MB (otimizado)
  'Imagem de Vancouver de madrugada (00h-06h). Deve mostrar a cidade de madrugada, cinematográfica.',
  'Fundo do hero Vancouver, período 00h-06h horário local'
);

-- Card Image (Pillars)
INSERT INTO image_specifications (
  page_slug, section_key, field_key,
  recommended_width, recommended_height,
  aspect_ratio, max_file_size_mb,
  description, where_appears
) VALUES (
  'home', 'pillars', 'pillar_1_image',
  400, 300,
  '4:3', 0.5, -- máximo 500KB
  'Imagem do card de expertise. Pode ser ícone ilustrativo ou foto.',
  'Card 1 (Pillar 1), lado esquerdo, acima do título'
);
```

---

## 📋 GUIA VISUAL POR PÁGINA

### **HOME - Mapa Visual:**

```
┌─────────────────────────────────────────┐
│  [HERO SECTION]                         │
│  ┌───────────────────────────────────┐ │
│  │  [Hero Image - Fundo]             │ │
│  │                                   │ │
│  │  TÍTULO DO HERO (H1)              │ │
│  │  (80 chars max, uma linha)        │ │
│  │                                   │ │
│  │  Subtítulo do Hero                │ │
│  │  (120 chars max, 2 linhas)         │ │
│  │                                   │ │
│  │  Descrição do Hero                │ │
│  │  (500 chars max, parágrafo)       │ │
│  │                                   │ │
│  │  [Botão CTA]                      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [PILLARS SECTION]                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │Card 1│ │Card 2│ │Card 3│ │Card 4│  │
│  │Icon  │ │Icon  │ │Icon  │ │Icon  │  │
│  │Title │ │Title │ │Title │ │Title │  │
│  │(50c) │ │(50c) │ │(50c) │ │(50c) │  │
│  │Desc  │ │Desc  │ │Desc  │ │Desc  │  │
│  │(200c)│ │(200c)│ │(200c)│ │(200c)│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
│  [STATS SECTION]                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │Stat 1│ │Stat 2│ │Stat 3│ │Stat 4│  │
│  │Value │ │Value │ │Value │ │Value │  │
│  │(20c) │ │(20c) │ │(20c) │ │(20c) │  │
│  │Label │ │Label │ │Label │ │Label │  │
│  │(50c) │ │(50c) │ │(50c) │ │(50c) │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────┘
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

### **Antes de Salvar:**

- [ ] Comprimento dentro do limite (min/max)
- [ ] Formato correto (uma linha, duas linhas, parágrafo)
- [ ] Sem quebras de linha (se não permitido)
- [ ] Imagem com resolução correta
- [ ] Imagem com formato permitido
- [ ] Imagem com tamanho dentro do limite
- [ ] Campos obrigatórios preenchidos

---

## 🚀 PRÓXIMOS PASSOS

1. **Criar tabelas de metadados** no banco
2. **Popular metadados** para Home (piloto)
3. **Criar interface de edição** com validação
4. **Adicionar guias visuais** (screenshots/mockups)
5. **Expandir para outras páginas** gradualmente

---

**Próxima ação:** Criar estrutura de metadados no banco e popular para Home
