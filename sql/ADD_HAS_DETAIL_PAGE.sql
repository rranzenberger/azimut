-- ═══════════════════════════════════════════════════════════════
-- MIGRATION: Adicionar campo hasDetailPage ao Project
-- ═══════════════════════════════════════════════════════════════
-- Este campo controla se o projeto tem sua própria subpágina
-- Se true: mostra link "Ver Detalhes" que leva para /work/{slug}
-- Se false: apenas exibe informações no card
-- ═══════════════════════════════════════════════════════════════

-- Adicionar campo hasDetailPage (default true para projetos featured)
ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "hasDetailPage" BOOLEAN NOT NULL DEFAULT false;

-- Adicionar campo thumbnailUrl (para thumbnail alternativo)
ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "thumbnailUrl" VARCHAR(500);

-- ═══════════════════════════════════════════════════════════════
-- Atualizar projetos existentes - Featured = true tem subpágina
-- ═══════════════════════════════════════════════════════════════
UPDATE "Project"
SET "hasDetailPage" = true
WHERE featured = true
   OR slug IN (
     'museu-olimpico-rio',
     'exposicao-itinerante-tmnt',
     'taikodom-living-universe-2006',
     'digital-designer-consagracao-arte-digital-2005'
   );

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════
SELECT 
  slug,
  title,
  featured,
  "hasDetailPage",
  "heroImageId" IS NOT NULL as has_hero_image
FROM "Project"
WHERE status = 'PUBLISHED'
ORDER BY featured DESC, "priorityHome" DESC, year DESC
LIMIT 20;
