-- ═══════════════════════════════════════════════════════════════
-- Página Work – Curadoria do momento
-- Rodar no Neon (ou banco do CMS). Se der erro de coluna, rodar antes: sql/add_curation_fields.sql
-- ═══════════════════════════════════════════════════════════════

-- 1) Inserir página "work" só se NÃO existir
INSERT INTO "Page" (
  id, name, slug, status,
  "createdAt", "updatedAt",
  "curationTitlePt", "curationDescriptionPt", "curationButtonTextPt", "curationFilterCategory"
)
SELECT
  gen_random_uuid(),
  'Projetos',
  'work',
  'PUBLISHED'::"PageStatus",
  NOW(),
  NOW(),
  'Curadoria Gramado',
  'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.',
  'Ver Projetos de Curadoria',
  'curadoria'
WHERE NOT EXISTS (SELECT 1 FROM "Page" WHERE "slug" = 'work');

-- 2) Atualizar curadoria da página "work" (se já existir)
UPDATE "Page"
SET
  "curationTitlePt" = 'Curadoria Gramado',
  "curationDescriptionPt" = 'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.',
  "curationButtonTextPt" = 'Ver Projetos de Curadoria',
  "curationFilterCategory" = 'curadoria',
  "updatedAt" = NOW()
WHERE "slug" = 'work';
