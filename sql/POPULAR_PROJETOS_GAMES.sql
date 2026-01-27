-- ═══════════════════════════════════════════════════════════════
-- POPULAR PROJETOS DE GAMES - Azimut
-- ═══════════════════════════════════════════════════════════════
-- Insere 5 projetos de games históricos da Azimut
-- Campos faltantes podem ser completados depois no backoffice
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. MANKIND (1998)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year,
  client, type,
  "projectCategory", industry, technologies, "azimutRole",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'mankind-1998',
  'Mankind',
  'Mankind',
  'Modelagem 3D e artes para game online desenvolvido pela ArtVoodoo Entertainment em Recife, Brasil.',
  '3D modeling and art for online game developed by ArtVoodoo Entertainment in Recife, Brazil.',
  'Projeto de modelagem 3D e artes para game online desenvolvido em parceria com ArtVoodoo Entertainment. Um dos primeiros projetos de games da Azimut, demonstrando expertise em modelagem 3D e arte digital para jogos.',
  '3D modeling and art project for online game developed in partnership with ArtVoodoo Entertainment. One of Azimut''s first game projects, demonstrating expertise in 3D modeling and digital art for games.',
  'Recife',
  'Brasil',
  1998,
  'ArtVoodoo Entertainment',
  'game',
  ARRAY['games'],
  'entertainment',
  ARRAY['3D'],
  ARRAY['animacao', 'producao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. O BOI VOADOR (1999)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year,
  client, type,
  "projectCategory", industry, technologies, "azimutRole",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'o-boi-voador-1999',
  'O Boi Voador',
  'O Boi Voador',
  'Projeto de animação 3D para game/curta temático desenvolvido em parceria entre ArtVoodoo e Azimut.',
  '3D animation project for thematic game/short film developed in partnership between ArtVoodoo and Azimut.',
  'Projeto de animação 3D para game/curta temático desenvolvido em parceria entre ArtVoodoo e Azimut. Projeto que combinou narrativa cultural brasileira com tecnologia 3D, demonstrando a capacidade da Azimut em criar conteúdo temático e inovador.',
  '3D animation project for thematic game/short film developed in partnership between ArtVoodoo and Azimut. Project that combined Brazilian cultural narrative with 3D technology, demonstrating Azimut''s ability to create thematic and innovative content.',
  'Recife',
  'Brasil',
  1999,
  'ArtVoodoo + AZMT',
  'game',
  ARRAY['games'],
  'entertainment',
  ARRAY['3D', 'Motion Graphics'],
  ARRAY['animacao', 'producao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. TAIKODOM – LIVING UNIVERSE (2006-2007)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year,
  client, type, duration,
  "projectCategory", industry, technologies, "azimutRole",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'taikodom-living-universe-2006',
  'Taikodom – Living Universe',
  'Taikodom',
  'Supervisão de artes, naves e cenários em MMO desenvolvido pela Hoplon Infotainment. Maior projeto de game desenvolvido no Brasil na época.',
  'Art, ships and environments supervision in MMO developed by Hoplon Infotainment. Largest game project developed in Brazil at the time.',
  'Supervisão de artes, naves e cenários em MMO (Massively Multiplayer Online) desenvolvido pela Hoplon Infotainment. Este foi o maior projeto de game desenvolvido no Brasil na época - um MMORPG espacial que exigiu modelagem 3D complexa, design de naves espaciais e criação de cenários imersivos. A Azimut foi responsável pela supervisão artística e criação de assets 3D.',
  'Art, ships and environments supervision in MMO (Massively Multiplayer Online) developed by Hoplon Infotainment. This was the largest game project developed in Brazil at the time - a space MMORPG that required complex 3D modeling, spaceship design and immersive environment creation. Azimut was responsible for artistic supervision and 3D asset creation.',
  'Florianópolis',
  'Brasil',
  2006,
  'Hoplon Infotainment',
  'game',
  '2006-2007',
  ARRAY['games'],
  'entertainment',
  ARRAY['3D', 'Interactive'],
  ARRAY['direcao', 'animacao', 'producao'],
  'PUBLISHED',
  true, -- Featured: foi o maior projeto de game do Brasil
  10, -- Alta prioridade na home
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. BRASILIA TROPICALIS (2007-2012)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year, duration,
  client, type,
  "projectCategory", industry, technologies, "azimutRole",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'brasilia-tropicalis-2007',
  'Brasilia Tropicalis',
  'Brasilia Tropicalis',
  'Design gráfico para game de fotografia da natureza desenvolvido em parceria com Olympya e SEBRAE.',
  'Graphic design for nature photography game developed in partnership with Olympya and SEBRAE.',
  'Design gráfico para game de fotografia da natureza desenvolvido em parceria com Olympya e SEBRAE. Projeto que combinou educação ambiental com gamificação, permitindo que jogadores explorassem a biodiversidade brasileira através de fotografia e interação. A Azimut foi responsável pelo design gráfico e interface do jogo.',
  'Graphic design for nature photography game developed in partnership with Olympya and SEBRAE. Project that combined environmental education with gamification, allowing players to explore Brazilian biodiversity through photography and interaction. Azimut was responsible for graphic design and game interface.',
  NULL, -- Brasil (sem cidade específica)
  'Brasil',
  2007,
  '2007-2012',
  'Olympya + SEBRAE',
  'game',
  ARRAY['games', 'education'],
  'education',
  ARRAY['Interactive'],
  ARRAY['producao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. FUTWEB (2009-2012)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year, duration,
  client, type,
  "projectCategory", industry, technologies, "azimutRole",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'futweb-2009',
  'Futweb',
  'Futweb',
  'Design gráfico em jogo de futebol online massivo desenvolvido em parceria com Olympya, Azimut e FINEP.',
  'Graphic design in massive online soccer game developed in partnership with Olympya, Azimut and FINEP.',
  'Design gráfico em jogo de futebol online massivo desenvolvido em parceria com Olympya, Azimut e FINEP. Projeto de grande escala que combinou paixão nacional pelo futebol com tecnologia de jogos online. A Azimut foi responsável pelo design gráfico, interface e elementos visuais do jogo, criando uma experiência imersiva para os jogadores.',
  'Graphic design in massive online soccer game developed in partnership with Olympya, Azimut and FINEP. Large-scale project that combined national passion for soccer with online gaming technology. Azimut was responsible for graphic design, interface and visual elements of the game, creating an immersive experience for players.',
  NULL, -- Brasil (sem cidade específica)
  'Brasil',
  2009,
  '2009-2012',
  'Olympya + AZMT + FINEP',
  'game',
  ARRAY['games'],
  'entertainment',
  ARRAY['Interactive'],
  ARRAY['producao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════
SELECT 
  slug,
  title,
  year,
  city,
  country,
  client,
  status,
  featured,
  "projectCategory",
  industry
FROM "Project"
WHERE slug IN (
  'mankind-1998',
  'o-boi-voador-1999',
  'taikodom-living-universe-2006',
  'brasilia-tropicalis-2007',
  'futweb-2009'
)
ORDER BY year ASC;
