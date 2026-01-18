-- ═══════════════════════════════════════════════════════════════
-- POPULAR FIELD_METADATA PARA PÁGINAS PRINCIPAIS
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ FIELD METADATA PARA HOME PAGE - HERO SECTION
INSERT INTO "field_metadata" (
  id,
  page_slug,
  section_key,
  field_key,
  field_label,
  field_description,
  field_type,
  max_length,
  required,
  where_appears,
  created_at,
  updated_at
)
VALUES
  -- Hero Slogan
  (gen_random_uuid(), 'home', 'hero', 'slogan', 'Slogan Principal', 'Texto principal do hero (4 idiomas)', 'text', 100, true, 'Hero Section - Topo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  -- Hero Subtitle
  (gen_random_uuid(), 'home', 'hero', 'subtitle', 'Subtítulo', 'Subtítulo do hero (4 idiomas)', 'text', 200, false, 'Hero Section - Abaixo do slogan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  -- Pillar 1
  (gen_random_uuid(), 'home', 'hero', 'pillar1', 'Pilar 1', 'Primeiro pilar (ex: Museus & exposições)', 'text', 50, false, 'Hero Section - Badges', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  -- Pillar 2
  (gen_random_uuid(), 'home', 'hero', 'pillar2', 'Pilar 2', 'Segundo pilar (ex: Ativações de marca)', 'text', 50, false, 'Hero Section - Badges', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  -- Pillar 3
  (gen_random_uuid(), 'home', 'hero', 'pillar3', 'Pilar 3', 'Terceiro pilar (ex: Audiovisual híbrido)', 'text', 50, false, 'Hero Section - Badges', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  updated_at = CURRENT_TIMESTAMP;

-- 2️⃣ FIELD METADATA PARA HOME PAGE - SEO
INSERT INTO "field_metadata" (
  id,
  page_slug,
  section_key,
  field_key,
  field_label,
  field_description,
  field_type,
  max_length,
  required,
  where_appears,
  created_at,
  updated_at
)
VALUES
  -- SEO Title
  (gen_random_uuid(), 'home', 'seo', 'title', 'Título SEO', 'Título para busca (4 idiomas)', 'text', 60, false, 'Meta Tags - <title>', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  -- SEO Description
  (gen_random_uuid(), 'home', 'seo', 'description', 'Descrição SEO', 'Descrição para busca (4 idiomas)', 'text', 160, false, 'Meta Tags - <meta description>', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  updated_at = CURRENT_TIMESTAMP;

-- 3️⃣ FIELD METADATA PARA STUDIO PAGE - HERO
INSERT INTO "field_metadata" (
  id,
  page_slug,
  section_key,
  field_key,
  field_label,
  field_description,
  field_type,
  max_length,
  required,
  where_appears,
  created_at,
  updated_at
)
VALUES
  (gen_random_uuid(), 'studio', 'hero', 'slogan', 'Slogan Studio', 'Slogan principal da página Studio', 'text', 100, false, 'Studio Hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'studio', 'hero', 'subtitle', 'Subtítulo Studio', 'Subtítulo da página Studio', 'text', 200, false, 'Studio Hero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (page_slug, section_key, field_key) DO UPDATE SET
  field_label = EXCLUDED.field_label,
  field_description = EXCLUDED.field_description,
  updated_at = CURRENT_TIMESTAMP;

-- ✅ VERIFICAR RESULTADO
SELECT 
  page_slug,
  section_key,
  field_key,
  field_label,
  field_type
FROM "field_metadata"
ORDER BY page_slug, section_key, field_key;
