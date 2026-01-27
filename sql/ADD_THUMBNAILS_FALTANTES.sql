-- =====================================================
-- SQL: Adicionar thumbnails genéricos para projetos sem imagem
-- Baseado no tipo/categoria do projeto
-- =====================================================

-- 1. Projetos de EDUCAÇÃO/CURSOS sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%curso%' 
    OR slug LIKE '%workshop%' 
    OR slug LIKE '%treinamento%' 
    OR slug LIKE '%formacao%'
    OR slug LIKE '%extensao%'
    OR industry = 'education'
  );

-- 2. Projetos de GAMES sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%game%' 
    OR slug LIKE '%jogo%'
    OR type = 'GAME'
  );

-- 3. Projetos de EVENTOS/FESTIVAIS sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%festival%' 
    OR slug LIKE '%evento%' 
    OR slug LIKE '%organizacao%'
    OR slug LIKE '%feira%'
    OR slug LIKE '%forum%'
  );

-- 4. Projetos de MUSEUS/EXPOSIÇÕES sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%museu%' 
    OR slug LIKE '%exposicao%' 
    OR slug LIKE '%expos%'
    OR industry = 'cultural'
  );

-- 5. Projetos de VR/XR sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%vr%' 
    OR slug LIKE '%360%' 
    OR slug LIKE '%virtual%'
    OR slug LIKE '%imersiv%'
  );

-- 6. Projetos de CINEMA/VIDEO sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%filme%' 
    OR slug LIKE '%video%' 
    OR slug LIKE '%cinema%'
    OR slug LIKE '%curta%'
    OR slug LIKE '%clipe%'
  );

-- 7. Projetos de CONSULTORIA sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%consultoria%' 
    OR slug LIKE '%consulting%'
  );

-- 8. Projetos de ARQUITETURA/RENDERS sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%arquitetura%' 
    OR slug LIKE '%render%' 
    OR slug LIKE '%maquete%'
    OR slug LIKE '%3d%'
  );

-- 9. Projetos de ANIMAÇÃO sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%animacao%' 
    OR slug LIKE '%anima%'
  );

-- 10. Projetos de NATAL/CULTURAL sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%natal%' 
    OR slug LIKE '%cultural%'
  );

-- 11. Projetos de BRANDED/MARCAS sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%brand%' 
    OR slug LIKE '%ativacao%'
    OR slug LIKE '%flamengo%'
    OR slug LIKE '%senna%'
  );

-- 12. Projetos de PORTAL/SITE sem thumbnail
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%portal%' 
    OR slug LIKE '%site%'
    OR slug LIKE '%desenvolvimento%'
  );

-- 13. TODOS os restantes sem thumbnail - imagem genérica criativa
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
WHERE "thumbnailUrl" IS NULL 
  AND "heroImageId" IS NULL;

-- 14. Garantir que todos têm hasDetailPage = true
UPDATE "Project"
SET "hasDetailPage" = true
WHERE "hasDetailPage" IS NULL OR "hasDetailPage" = false;

-- Verificar resultado
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN "thumbnailUrl" IS NOT NULL OR "heroImageId" IS NOT NULL THEN 1 END) as com_imagem,
  COUNT(CASE WHEN "thumbnailUrl" IS NULL AND "heroImageId" IS NULL THEN 1 END) as sem_imagem
FROM "Project"
WHERE status = 'PUBLISHED';
