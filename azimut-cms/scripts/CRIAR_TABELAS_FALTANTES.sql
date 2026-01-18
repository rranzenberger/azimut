-- ═══════════════════════════════════════════════════════════════
-- CRIAR TABELAS FALTANTES: Section e FieldMetadata
-- Execute no Neon SQL Editor: https://console.neon.tech
-- Data: 17 de Janeiro de 2026
-- ═══════════════════════════════════════════════════════════════

-- ══════════════════════════════════════
-- 1. VERIFICAR SE TABELAS JÁ EXISTEM
-- ══════════════════════════════════════
SELECT 
  table_name,
  CASE 
    WHEN table_name IN ('Section', 'field_metadata') THEN '✅ Existe'
    ELSE '❌ Não existe'
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('Section', 'field_metadata')
ORDER BY table_name;

-- ══════════════════════════════════════
-- 2. CRIAR TABELA Section (se não existir)
-- ══════════════════════════════════════
CREATE TABLE IF NOT EXISTS "Section" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "pageId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL,
  layout TEXT,
  "titlePt" TEXT,
  "titleEn" TEXT,
  "titleEs" TEXT,
  "titleFr" TEXT,
  "bodyPt" TEXT,
  "bodyEn" TEXT,
  "bodyEs" TEXT,
  "bodyFr" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Criar índices para Section
CREATE INDEX IF NOT EXISTS "Section_pageId_idx" ON "Section"("pageId");
CREATE INDEX IF NOT EXISTS "Section_order_idx" ON "Section"("order");

-- ══════════════════════════════════════
-- 3. CRIAR TABELA FieldMetadata (se não existir)
-- ══════════════════════════════════════
CREATE TABLE IF NOT EXISTS "field_metadata" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_description TEXT,
  field_type TEXT NOT NULL,
  max_length INTEGER,
  min_length INTEGER,
  required BOOLEAN NOT NULL DEFAULT false,
  allowed_formats TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_width INTEGER,
  image_height INTEGER,
  image_aspect_ratio TEXT,
  video_max_duration INTEGER,
  video_max_size_mb INTEGER,
  text_format TEXT,
  line_breaks_allowed BOOLEAN NOT NULL DEFAULT false,
  where_appears TEXT,
  visual_guide_url TEXT,
  card_position INTEGER,
  example_value TEXT,
  example_image_url TEXT,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "field_metadata_page_slug_section_key_field_key_key" UNIQUE (page_slug, section_key, field_key)
);

-- Criar índices para FieldMetadata
CREATE INDEX IF NOT EXISTS "field_metadata_page_slug_section_key_idx" ON "field_metadata"(page_slug, section_key);

-- ══════════════════════════════════════
-- 4. VERIFICAÇÃO FINAL
-- ══════════════════════════════════════
SELECT 
  'Section' as tabela,
  COUNT(*) as total_registros
FROM "Section"
UNION ALL
SELECT 
  'FieldMetadata' as tabela,
  COUNT(*) as total_registros
FROM "field_metadata";
