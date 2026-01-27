-- =====================================================
-- SQL: Popular TODOS os projetos com imagens thumbnail
-- Execute no Neon Console: https://console.neon.tech
-- =====================================================

-- Verificar projetos SEM thumbnail
SELECT slug, title, "heroImageId", "thumbnailUrl"
FROM "Project"
WHERE "thumbnailUrl" IS NULL AND "heroImageId" IS NULL
ORDER BY title;

-- =====================================================
-- CURTAS E ANIMAÇÃO 3D
-- =====================================================

-- Curta 3D O Saci
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80',
    "hasDetailPage" = true
WHERE slug = 'curta-3d-o-saci-1997';

-- Cyberdex
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%cyberdex%';

-- Clipe Oswaldo Montenegro
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80'
WHERE slug LIKE '%clipe%oswaldo%' OR slug LIKE '%nao-importa%';

-- =====================================================
-- GAMES
-- =====================================================

-- Taikodom
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%taikodom%';

-- Mankind
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
WHERE slug LIKE '%mankind%';

-- Boi Voador
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80'
WHERE slug LIKE '%boi-voador%';

-- Brasilia Tropicalis
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80'
WHERE slug LIKE '%brasilia-tropicalis%';

-- Futweb
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80'
WHERE slug LIKE '%futweb%';

-- =====================================================
-- EVENTOS E FESTIVAIS
-- =====================================================

-- Anima Mundi
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%anima-mundi%' OR slug LIKE '%animamundi%';

-- Digital Designer - MAC
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
WHERE slug LIKE '%digital-designer%';

-- Circuito Universitário
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
WHERE slug LIKE '%circuito-universitario%';

-- Animaserra
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80'
WHERE slug LIKE '%animaserra%';

-- Autodesk University
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80'
WHERE slug LIKE '%autodesk-university%';

-- SIGGRAPH
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%siggraph%';

-- NAB
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80'
WHERE slug LIKE '%nab%';

-- TechnoImage
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80'
WHERE slug LIKE '%technoimage%';

-- FICI
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80'
WHERE slug LIKE '%fici%';

-- Animaparty
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'
WHERE slug LIKE '%animaparty%';

-- Animaeco
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80'
WHERE slug LIKE '%animaeco%';

-- =====================================================
-- PRODUÇÃO AUDIOVISUAL
-- =====================================================

-- Digital Signage X-Picanha
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80'
WHERE slug LIKE '%digital-signage%' OR slug LIKE '%x-picanha%';

-- Vídeos institucionais FMC
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
WHERE slug LIKE '%fmc%' OR slug LIKE '%offshore%';

-- =====================================================
-- CONSULTORIAS E CURSOS
-- =====================================================

-- TV Globo
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%tv-globo%' OR slug LIKE '%projac%';

-- TV Record
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80'
WHERE slug LIKE '%tv-record%';

-- TV Bandeirantes
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&q=80'
WHERE slug LIKE '%bandeirantes%';

-- Orbital Filmes
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80'
WHERE slug LIKE '%orbital%';

-- YFilmes / Conteúdo Filmes
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80'
WHERE slug LIKE '%yfilmes%' OR slug LIKE '%conteudo-filmes%';

-- Hoplon Consultoria
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
WHERE slug LIKE '%hoplon%' AND slug NOT LIKE '%taikodom%';

-- Cursos Norte/Nordeste
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'
WHERE slug LIKE '%infonordeste%' OR slug LIKE '%norte-nordeste%';

-- Cursos LAN House Adrenaline
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
WHERE slug LIKE '%adrenaline%' OR slug LIKE '%lan-house%';

-- Formação em Games
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=800&q=80'
WHERE slug LIKE '%formacao%games%';

-- =====================================================
-- ARQUITETURA E RENDERS
-- =====================================================

-- Maquetes virtuais
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
WHERE slug LIKE '%maquete%' OR slug LIKE '%arquitetura%';

-- Sites e Design Gráfico
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
WHERE slug LIKE '%producao-sites%' OR slug LIKE '%design-grafico%';

-- Cartazes e Banners
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80'
WHERE slug LIKE '%cartaz%' OR slug LIKE '%banners%' OR slug LIKE '%panfletos%';

-- Portal Azimut
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80'
WHERE slug LIKE '%portal-azimut%' OR slug LIKE '%site-azimut%';

-- =====================================================
-- MUSEUS E EXPOSIÇÕES
-- =====================================================

-- Van Gogh
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%van-gogh%' AND "thumbnailUrl" IS NULL;

-- Museu Olímpico
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%museu-olimpico%' AND "thumbnailUrl" IS NULL;

-- Museu do Amanhã
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%museu-amanha%' AND "thumbnailUrl" IS NULL;

-- TMNT
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%tmnt%' AND "thumbnailUrl" IS NULL;

-- Círio de Nazaré
UPDATE "Project"
SET "hasDetailPage" = true
WHERE slug LIKE '%cirio%nazare%';

-- Festival Gramado
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%gramado%' AND "thumbnailUrl" IS NULL;

-- =====================================================
-- WORKSHOPS E APRESENTAÇÕES
-- =====================================================

-- Workshop 3D Studio Max
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80'
WHERE slug LIKE '%workshop%3d-studio%' OR slug LIKE '%lancamento-3ds-max%';

-- Extensão PUC-Rio
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
WHERE slug LIKE '%puc-rio%' OR slug LIKE '%extensao%';

-- TCC Faculdade Carioca
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'
WHERE slug LIKE '%tcc%' OR slug LIKE '%faculdade-carioca%';

-- =====================================================
-- CURSOS AZIMUT ESCOLA
-- =====================================================

UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    "hasDetailPage" = true
WHERE slug LIKE '%azimut-escola%' OR slug LIKE '%cursos-vfx%' OR slug LIKE '%cursos-3d%';

-- =====================================================
-- GENÉRICO PARA PROJETOS RESTANTES
-- Placeholders baseados em categoria
-- =====================================================

-- Eventos genéricos (sem thumbnail)
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'festival' = ANY("projectCategory")
    OR 'evento' = ANY("projectCategory")
    OR title ILIKE '%festival%'
    OR title ILIKE '%evento%'
  );

-- Games genéricos
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'games' = ANY("projectCategory")
    OR title ILIKE '%game%'
  );

-- Museus genéricos
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'museum' = ANY("projectCategory")
    OR title ILIKE '%museu%'
    OR title ILIKE '%exposic%'
  );

-- Animação/VFX genéricos
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'animacao' = ANY("projectCategory")
    OR 'motion' = ANY("projectCategory")
    OR title ILIKE '%anima%'
    OR title ILIKE '%vfx%'
    OR title ILIKE '%3d%'
  );

-- Cursos/Educação genéricos
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'education' = ANY("projectCategory")
    OR 'curso' = ANY("projectCategory")
    OR title ILIKE '%curso%'
    OR title ILIKE '%treinamento%'
    OR title ILIKE '%consultoria%'
    OR title ILIKE '%palestra%'
  );

-- VR/360 genéricos
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'vr-360' = ANY("projectCategory")
    OR title ILIKE '%360%'
    OR title ILIKE '%vr%'
    OR title ILIKE '%realidade virtual%'
  );

-- Corporate/Institucional genéricos
UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND (
    'corporate' = ANY("projectCategory")
    OR title ILIKE '%institucional%'
    OR title ILIKE '%corporativo%'
  );

-- =====================================================
-- FALLBACK FINAL: Todos os projetos sem thumbnail
-- =====================================================

UPDATE "Project"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
WHERE "thumbnailUrl" IS NULL
  AND "heroImageId" IS NULL
  AND status = 'PUBLISHED';

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================

SELECT 
  slug,
  title,
  CASE 
    WHEN "heroImageId" IS NOT NULL THEN 'HeroImage'
    WHEN "thumbnailUrl" IS NOT NULL THEN 'ThumbnailURL'
    ELSE 'SEM IMAGEM'
  END as "tipoImagem",
  "hasDetailPage",
  status
FROM "Project"
ORDER BY status, title;

-- Contar projetos por status de imagem
SELECT 
  CASE 
    WHEN "heroImageId" IS NOT NULL THEN 'Com HeroImage'
    WHEN "thumbnailUrl" IS NOT NULL THEN 'Com ThumbnailURL'
    ELSE 'Sem Imagem'
  END as "Status",
  COUNT(*) as "Total"
FROM "Project"
GROUP BY 1
ORDER BY 2 DESC;
