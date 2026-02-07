-- ═══════════════════════════════════════════════════════════════
-- SQL: Adicionar campos de Curadoria/Banner Destaque na página Work
-- Data: 2026-02-07
-- Propósito: Permitir editar o card de destaque (Curadoria Gramado)
--            diretamente pelo backoffice
-- ═══════════════════════════════════════════════════════════════

-- Título do banner de curadoria (4 idiomas)
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationTitlePt" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationTitleEn" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationTitleEs" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationTitleFr" TEXT;

-- Descrição do banner de curadoria (4 idiomas)
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationDescriptionPt" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationDescriptionEn" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationDescriptionEs" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationDescriptionFr" TEXT;

-- Texto do botão de curadoria (4 idiomas)
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationButtonTextPt" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationButtonTextEn" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationButtonTextEs" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationButtonTextFr" TEXT;

-- Filtro de categoria que o botão ativa (ex: 'curadoria')
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "curationFilterCategory" TEXT;

-- Popular dados padrão para a página work
UPDATE "Page" 
SET 
  "curationTitlePt" = 'Curadoria Gramado',
  "curationTitleEn" = 'Gramado Curation',
  "curationTitleEs" = 'Curaduría Gramado',
  "curationTitleFr" = 'Curation Gramado',
  "curationDescriptionPt" = 'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil com expertise em curadoria cinematográfica.',
  "curationDescriptionEn" = 'Our biggest differentiator: international-level curation for festivals. The only studio in Brazil with expertise in film curation.',
  "curationDescriptionEs" = 'Nuestro mayor diferencial: curaduría de nivel internacional para festivales. Único estudio en Brasil con expertise en curaduría cinematográfica.',
  "curationDescriptionFr" = 'Notre plus grand atout: curation de niveau international pour festivals. Le seul studio au Brésil avec expertise en curation cinématographique.',
  "curationButtonTextPt" = 'Ver Curadoria',
  "curationButtonTextEn" = 'View Curation',
  "curationButtonTextEs" = 'Ver Curaduría',
  "curationButtonTextFr" = 'Voir Curation',
  "curationFilterCategory" = 'curadoria'
WHERE "slug" = 'work';
