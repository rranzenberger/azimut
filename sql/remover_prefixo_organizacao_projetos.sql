-- ═══════════════════════════════════════════════════════════════════════════
-- Remove o prefixo "Organização - " (e equivalentes em EN/ES/FR) dos projetos.
-- Rodar no banco do backoffice (ex.: psql ou DBeaver).
-- Os prefixos removidos: Organização - | Organization - | Organización - | Organisation -
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- 1) Título principal (campo title)
UPDATE "Project"
SET title = TRIM(REGEXP_REPLACE(
  title,
  '^(Organização|Organization|Organización|Organisation) - \s*',
  '',
  'i'
))
WHERE title ~* '^(Organização|Organization|Organización|Organisation) - ';

-- 2) Título curto (shortTitle)
UPDATE "Project"
SET "shortTitle" = TRIM(REGEXP_REPLACE(
  "shortTitle",
  '^(Organização|Organization|Organización|Organisation) - \s*',
  '',
  'i'
))
WHERE "shortTitle" IS NOT NULL
  AND "shortTitle" ~* '^(Organização|Organization|Organización|Organisation) - ';

-- 3) SEO Título PT
UPDATE "Project"
SET "seoTitlePt" = TRIM(REGEXP_REPLACE(
  "seoTitlePt",
  '^(Organização|Organization|Organización|Organisation) - \s*',
  '',
  'i'
))
WHERE "seoTitlePt" IS NOT NULL
  AND "seoTitlePt" ~* '^(Organização|Organization|Organización|Organisation) - ';

-- 4) SEO Título EN
UPDATE "Project"
SET "seoTitleEn" = TRIM(REGEXP_REPLACE(
  "seoTitleEn",
  '^(Organização|Organization|Organización|Organisation) - \s*',
  '',
  'i'
))
WHERE "seoTitleEn" IS NOT NULL
  AND "seoTitleEn" ~* '^(Organização|Organization|Organización|Organisation) - ';

-- 5) SEO Título ES
UPDATE "Project"
SET "seoTitleEs" = TRIM(REGEXP_REPLACE(
  "seoTitleEs",
  '^(Organização|Organization|Organización|Organisation) - \s*',
  '',
  'i'
))
WHERE "seoTitleEs" IS NOT NULL
  AND "seoTitleEs" ~* '^(Organização|Organization|Organización|Organisation) - ';

-- 6) SEO Título FR
UPDATE "Project"
SET "seoTitleFr" = TRIM(REGEXP_REPLACE(
  "seoTitleFr",
  '^(Organização|Organization|Organización|Organisation) - \s*',
  '',
  'i'
))
WHERE "seoTitleFr" IS NOT NULL
  AND "seoTitleFr" ~* '^(Organização|Organization|Organización|Organisation) - ';

COMMIT;

-- Para conferir quantos projetos tinham o prefixo (antes de rodar o UPDATE):
-- SELECT id, title, "shortTitle", "seoTitlePt", "seoTitleEn" FROM "Project" WHERE title ~* '^(Organização|Organization|Organización|Organisation) - ';
