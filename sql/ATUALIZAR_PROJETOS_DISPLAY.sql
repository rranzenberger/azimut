-- ═══════════════════════════════════════════════════════════════
-- ATUALIZAR PROJETOS - Configurações de Exibição
-- ═══════════════════════════════════════════════════════════════
-- Ativa hasDetailPage para projetos featured ou importantes
-- Define thumbnails placeholder para projetos sem imagem
-- ═══════════════════════════════════════════════════════════════

-- PRIMEIRO: Execute a migration ADD_HAS_DETAIL_PAGE.sql para criar os campos

-- ═══════════════════════════════════════════════════════════════
-- 1. ATIVAR SUBPÁGINA PARA PROJETOS IMPORTANTES
-- ═══════════════════════════════════════════════════════════════
UPDATE "Project"
SET "hasDetailPage" = true
WHERE featured = true
   OR slug IN (
     -- Museus e Exposições
     'museu-olimpico-rio',
     'exposicao-itinerante-tmnt',
     'museu-do-amanha',
     'expo-van-gogh',
     'paisagens-van-gogh-gramado-2024',
     
     -- Games importantes
     'taikodom-living-universe-2006',
     'futweb-2009',
     
     -- Eventos importantes
     'digital-designer-consagracao-arte-digital-2005',
     'festival-anima-mundi-participacao-1996',
     'siggraph-participacao-1998',
     'nab-national-association-broadcasters-2003',
     'consultoria-tv-globo-projac-2013',
     
     -- Produções audiovisuais
     'curta-3d-o-saci-1997',
     'short-cyberdex-2015',
     
     -- Escola
     'cursos-workshops-vfx-3d-azimut-escola-2005'
   );

-- ═══════════════════════════════════════════════════════════════
-- 2. DEFINIR THUMBNAILS PLACEHOLDER POR CATEGORIA
-- ═══════════════════════════════════════════════════════════════

-- Games - Placeholder gaming
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%game%'
    OR slug LIKE '%taikodom%'
    OR slug LIKE '%futweb%'
    OR slug LIKE '%mankind%'
    OR slug LIKE '%boi-voador%'
    OR slug LIKE '%brasilia-tropicalis%'
  );

-- Eventos/Palestras - Placeholder conference
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%autodesk%'
    OR slug LIKE '%workshop%'
    OR slug LIKE '%palestra%'
    OR slug LIKE '%curso%'
    OR slug LIKE '%technoimage%'
    OR slug LIKE '%siggraph%'
    OR slug LIKE '%nab%'
    OR slug LIKE '%animaeco%'
    OR slug LIKE '%broadcast%'
    OR slug LIKE '%evento%'
  );

-- Museus/Exposições - Placeholder museum
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%museu%'
    OR slug LIKE '%expo%'
    OR slug LIKE '%exhibition%'
    OR slug LIKE '%instalacao%'
  );

-- Animação/VFX - Placeholder 3D
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1634017839464-5c339afa5d7a?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%animacao%'
    OR slug LIKE '%anima-mundi%'
    OR slug LIKE '%animaserra%'
    OR slug LIKE '%curta%'
    OR slug LIKE '%cyberdex%'
    OR slug LIKE '%saci%'
    OR slug LIKE '%vfx%'
  );

-- Cinema/Audiovisual - Placeholder cinema
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%cinema%'
    OR slug LIKE '%filme%'
    OR slug LIKE '%video%'
    OR slug LIKE '%clipe%'
    OR slug LIKE '%audiovisual%'
    OR slug LIKE '%tv-%'
    OR slug LIKE '%globo%'
    OR slug LIKE '%record%'
    OR slug LIKE '%bandeirantes%'
  );

-- Arquitetura/Renders - Placeholder architecture
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%render%'
    OR slug LIKE '%maquete%'
    OR slug LIKE '%arquitetura%'
    OR slug LIKE '%fmc%'
  );

-- Educação - Placeholder education
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%escola%'
    OR slug LIKE '%puc%'
    OR slug LIKE '%tcc%'
    OR slug LIKE '%formacao%'
    OR slug LIKE '%infonordeste%'
    OR slug LIKE '%norte-nordeste%'
    OR slug LIKE '%fici%'
  );

-- Corporate/Consultoria - Placeholder corporate
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%consultoria%'
    OR slug LIKE '%corporate%'
    OR slug LIKE '%institucional%'
    OR slug LIKE '%site%'
    OR slug LIKE '%portal%'
  );

-- Digital Signage - Placeholder digital display
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND slug LIKE '%signage%';

-- Eventos culturais - Placeholder cultural
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    slug LIKE '%animaparty%'
    OR slug LIKE '%festival%'
    OR slug LIKE '%curadoria%'
  );

-- Placeholder genérico para os que sobraram
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND status = 'PUBLISHED';

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════
SELECT 
  slug,
  title,
  "hasDetailPage",
  "thumbnailUrl" IS NOT NULL as has_thumbnail,
  "heroImageId" IS NOT NULL as has_hero_image,
  featured,
  status
FROM "Project"
WHERE status = 'PUBLISHED'
ORDER BY "hasDetailPage" DESC, featured DESC, year DESC
LIMIT 30;
