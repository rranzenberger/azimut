-- ═══════════════════════════════════════════════════════════════
-- POPULAR METADADOS DE CAMPOS NO BACKOFFICE
-- ═══════════════════════════════════════════════════════════════
-- Execute este script no Neon SQL Editor
-- https://console.neon.tech → Projeto → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Criar tabela field_metadata (se não existir)
CREATE TABLE IF NOT EXISTS field_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identificação
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  
  -- Informações do Campo
  field_label TEXT NOT NULL,
  field_description TEXT,
  field_type TEXT NOT NULL,
  
  -- Validações
  max_length INTEGER,
  min_length INTEGER,
  required BOOLEAN DEFAULT false,
  allowed_formats TEXT[],
  
  -- Especificações Técnicas (para imagens)
  image_width INTEGER,
  image_height INTEGER,
  image_aspect_ratio TEXT,
  video_max_duration INTEGER,
  video_max_size_mb INTEGER,
  
  -- Formato de Texto
  text_format TEXT, -- 'single_line', 'two_lines', 'paragraph', 'rich_text'
  line_breaks_allowed BOOLEAN DEFAULT false,
  
  -- Onde Aparece (Descrição Visual)
  where_appears TEXT,
  visual_guide_url TEXT,
  card_position INTEGER,
  
  -- Exemplos
  example_value TEXT,
  example_image_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(page_slug, section_key, field_key)
);

-- 2. Criar tabela image_specifications (se não existir)
CREATE TABLE IF NOT EXISTS image_specifications (
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
  aspect_ratio TEXT,
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

-- 3. Criar índices
CREATE INDEX IF NOT EXISTS idx_field_metadata_page 
  ON field_metadata(page_slug, section_key);
CREATE INDEX IF NOT EXISTS idx_image_specifications_page 
  ON image_specifications(page_slug, section_key);

-- ═══════════════════════════════════════════════════════════════
-- HOME - HERO SECTION
-- ═══════════════════════════════════════════════════════════════

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
  80, 20, true,
  'single_line', false,
  'Topo da página Home, centralizado, acima do subtítulo, em fonte grande (H1)',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

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
  120, 30, true,
  'two_lines', true,
  'Logo abaixo do título, em fonte média, cor secundária',
  'Criamos experiências imersivas entre Brasil e Canadá.'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

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
  500, 100, false,
  'paragraph', true,
  'Abaixo do subtítulo, em fonte pequena, texto justificado',
  'Transformamos ideias em realidade através de tecnologias imersivas, inteligência artificial e produção audiovisual de classe mundial.'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

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
  false,
  1920, 1080, '16:9',
  ARRAY['jpg', 'jpeg', 'webp', 'avif'],
  'Fundo do hero, atrás do texto, com overlay escuro para legibilidade',
  'https://example.com/hero-home.jpg'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  image_width = EXCLUDED.image_width,
  image_height = EXCLUDED.image_height,
  image_aspect_ratio = EXCLUDED.image_aspect_ratio,
  allowed_formats = EXCLUDED.allowed_formats,
  where_appears = EXCLUDED.where_appears,
  updated_at = NOW();

-- Hero CTA Text
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, where_appears, example_value
) VALUES (
  'home', 'hero', 'hero_cta_text',
  'Texto do Botão CTA',
  'Texto do botão de chamada para ação no hero. Texto curto, uma linha.',
  'text',
  30, 5, false,
  'single_line', false,
  'Botão abaixo do subtítulo/descrição, cor vermelha Azimut',
  'Ver Projetos'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════
-- HOME - PILLARS (4 Cards)
-- ═══════════════════════════════════════════════════════════════

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
  50, 10, true,
  'single_line', false,
  'Card 1 (primeiro da esquerda), seção "Nossa Expertise", grid 2x2 mobile, 4x1 desktop',
  1,
  'VR & AR'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

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
  200, 50, true,
  'two_lines', true,
  'Abaixo do título no Card 1, texto justificado, fonte pequena',
  1,
  'Criamos experiências imersivas usando realidade virtual e aumentada, transportando usuários para novos mundos.'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

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
  false,
  'Acima do título no Card 1, centralizado, tamanho grande',
  1,
  '🥽'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  required = EXCLUDED.required,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

-- Repetir para Pillar 2, 3, 4 (mudar card_position: 2, 3, 4)
-- Pillar 2
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, card_position, example_value
) VALUES (
  'home', 'pillars', 'pillar_2_title',
  'Título do Card 2 (Pillar 2)',
  'Título do segundo card de expertise. Texto curto, uma linha.',
  'text',
  50, 10, true,
  'single_line', false,
  'Card 2 (segundo da esquerda), seção "Nossa Expertise"',
  2,
  'Inteligência Artificial'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

-- Pillar 3
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, card_position, example_value
) VALUES (
  'home', 'pillars', 'pillar_3_title',
  'Título do Card 3 (Pillar 3)',
  'Título do terceiro card de expertise. Texto curto, uma linha.',
  'text',
  50, 10, true,
  'single_line', false,
  'Card 3 (terceiro da esquerda), seção "Nossa Expertise"',
  3,
  'Produção Audiovisual'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

-- Pillar 4
INSERT INTO field_metadata (
  page_slug, section_key, field_key,
  field_label, field_description, field_type,
  max_length, min_length, required,
  text_format, line_breaks_allowed,
  where_appears, card_position, example_value
) VALUES (
  'home', 'pillars', 'pillar_4_title',
  'Título do Card 4 (Pillar 4)',
  'Título do quarto card de expertise. Texto curto, uma linha.',
  'text',
  50, 10, true,
  'single_line', false,
  'Card 4 (quarto da esquerda), seção "Nossa Expertise"',
  4,
  'Experiências Imersivas'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════
-- HOME - STATS (4 Estatísticas)
-- ═══════════════════════════════════════════════════════════════

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
  20, 1, true,
  'single_line', false,
  'Estatística 1 (primeira da esquerda), número grande, cor vermelha Azimut',
  1,
  '50+'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

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
  50, 5, true,
  'single_line', false,
  'Abaixo do valor na Estatística 1, texto pequeno, cor secundária',
  1,
  'Projetos Entregues'
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  max_length = EXCLUDED.max_length,
  min_length = EXCLUDED.min_length,
  required = EXCLUDED.required,
  text_format = EXCLUDED.text_format,
  where_appears = EXCLUDED.where_appears,
  card_position = EXCLUDED.card_position,
  example_value = EXCLUDED.example_value,
  updated_at = NOW();

-- Repetir para Stat 2, 3, 4 (mudar card_position: 2, 3, 4)
-- (Similar ao Stat 1, mudando apenas card_position e field_key)

-- ═══════════════════════════════════════════════════════════════
-- ESPECIFICAÇÕES DE IMAGENS
-- ═══════════════════════════════════════════════════════════════

-- Home Hero Image
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
) ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  recommended_width = EXCLUDED.recommended_width,
  recommended_height = EXCLUDED.recommended_height,
  aspect_ratio = EXCLUDED.aspect_ratio,
  max_file_size_mb = EXCLUDED.max_file_size_mb,
  allowed_formats = EXCLUDED.allowed_formats,
  description = EXCLUDED.description,
  where_appears = EXCLUDED.where_appears,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR INSERÇÕES
-- ═══════════════════════════════════════════════════════════════

-- Verificar quantos metadados foram criados
SELECT 
  page_slug,
  section_key,
  COUNT(*) as total_fields
FROM field_metadata
GROUP BY page_slug, section_key
ORDER BY page_slug, section_key;

-- Ver todos os metadados da Home
SELECT 
  field_key,
  field_label,
  max_length,
  min_length,
  required,
  text_format,
  where_appears
FROM field_metadata
WHERE page_slug = 'home'
ORDER BY section_key, field_key;
