-- ═══════════════════════════════════════════════════════════════
-- ADICIONAR EVENTOS PÓS-2018: Filmes 360° e Museu Olímpico
-- ═══════════════════════════════════════════════════════════════
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1. Verificar se Museu Olímpico já existe
SELECT id, year, "yearEnd", "titlePt" 
FROM "CompanyHistory" 
WHERE "titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%';

-- 2. Adicionar evento: Workshops, Palestras e Curadorias (2018-2026)
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr"
)
VALUES (
  2018, 2026, 'milestone',
  'Workshops, Palestras e Curadorias',
  'Workshops, Lectures and Curatorships',
  'Talleres, Conferencias y Curadurías',
  'Ateliers, Conférences et Curations',
  'Workshops em eventos, Rio2C, palestras e curadorias em tecnologia e novas mídias.',
  'Workshops at events, Rio2C, lectures and curatorships in technology and new media.',
  'Talleres en eventos, Rio2C, conferencias y curadurías en tecnología y nuevos medios.',
  'Ateliers lors d\'événements, Rio2C, conférences et curations en technologie et nouveaux médias.',
  '🎤', false, 170,
  ARRAY['Rio2C', 'Workshops em eventos', 'Palestras', 'Curadorias'],
  ARRAY['Rio2C', 'Workshops at events', 'Lectures', 'Curatorships'],
  ARRAY['Rio2C', 'Talleres en eventos', 'Conferencias', 'Curadurías'],
  ARRAY['Rio2C', 'Ateliers lors d\'événements', 'Conférences', 'Curations']
)
ON CONFLICT DO NOTHING;

-- 3. Adicionar evento: Motion Design para Exposições Imersivas (2019-2026)
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr"
)
VALUES (
  2019, 2026, 'project',
  'Motion Design para Exposições Imersivas',
  'Motion Design for Immersive Exhibitions',
  'Motion Design para Exposiciones Inmersivas',
  'Motion Design pour Expositions Immersives',
  'Motion design e conteúdo audiovisual para exposições imersivas. Parcerias: YDreams e outras produtoras.',
  'Motion design and audiovisual content for immersive exhibitions. Partnerships: YDreams and other producers.',
  'Motion design y contenido audiovisual para exposiciones inmersivas. Asociaciones: YDreams y otras productoras.',
  'Motion design et contenu audiovisuel pour expositions immersives. Partenariats: YDreams et autres producteurs.',
  '✨', true, 175,
  ARRAY['Motion Design', 'Exposições Imersivas', 'Parcerias: YDreams e outras produtoras'],
  ARRAY['Motion Design', 'Immersive Exhibitions', 'Partnerships: YDreams and other producers'],
  ARRAY['Motion Design', 'Exposiciones Inmersivas', 'Asociaciones: YDreams y otras productoras'],
  ARRAY['Motion Design', 'Expositions Immersives', 'Partenariats: YDreams et autres producteurs']
)
ON CONFLICT DO NOTHING;

-- 4. Adicionar evento: Arte Generativa IA e Tecnologias Imersivas (2024-2026)
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr"
)
VALUES (
  2024, 2026, 'milestone',
  'Arte Generativa IA e Tecnologias Imersivas',
  'Generative AI Art and Immersive Technologies',
  'Arte Generativa IA y Tecnologías Inmersivas',
  'Art Générative IA et Technologies Immersives',
  'Arte generativa com IA, motion design, VR/AR, interatividades e color mapping para experiências imersivas.',
  'Generative AI art, motion design, VR/AR, interactivities and color mapping for immersive experiences.',
  'Arte generativa con IA, motion design, VR/AR, interactividades y color mapping para experiencias inmersivas.',
  'Art générative avec IA, motion design, VR/AR, interactivités et color mapping pour expériences immersives.',
  '🤖', true, 185,
  ARRAY['Arte Generativa IA', 'Motion Design', 'VR/AR', 'Interatividades', 'Color Mapping'],
  ARRAY['Generative AI Art', 'Motion Design', 'VR/AR', 'Interactivities', 'Color Mapping'],
  ARRAY['Arte Generativa IA', 'Motion Design', 'VR/AR', 'Interactividades', 'Color Mapping'],
  ARRAY['Art Générative IA', 'Motion Design', 'VR/AR', 'Interactivités', 'Color Mapping']
)
ON CONFLICT DO NOTHING;

-- 5. Verificar/Atualizar Museu Olímpico (2023-2025)
-- Se já existe, atualizar; se não, inserir
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder"
)
VALUES (
  2023, 2025, 'project',
  'Museu Olímpico do Rio',
  'Olympic Museum of Rio',
  'Museo Olímpico de Río',
  'Musée Olympique de Rio',
  'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro - pós Olimpíadas 2016.',
  'General Technology Director for the Olympic Museum of Rio de Janeiro - post 2016 Olympics.',
  'Dirección General de Tecnología para el Museo Olímpico de Río de Janeiro - post Olimpíadas 2016.',
  'Direction Générale de la Technologie pour le Musée Olympique de Rio de Janeiro - post Jeux 2016.',
  '🏛️', true, 180
)
ON CONFLICT DO NOTHING;

-- 6. Se Museu Olímpico já existe com ano errado, atualizar
UPDATE "CompanyHistory"
SET 
  year = 2023,
  "yearEnd" = 2025,
  "descriptionPt" = 'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro - pós Olimpíadas 2016.',
  "descriptionEn" = 'General Technology Director for the Olympic Museum of Rio de Janeiro - post 2016 Olympics.',
  "descriptionEs" = 'Dirección General de Tecnología para el Museo Olímpico de Río de Janeiro - post Olimpíadas 2016.',
  "descriptionFr" = 'Direction Générale de la Technologie pour le Musée Olympique de Rio de Janeiro - post Jeux 2016.'
WHERE ("titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%')
  AND (year != 2023 OR "yearEnd" != 2025);

-- 7. Verificar resultado final
SELECT year, "yearEnd", "titlePt", type, "isFeatured"
FROM "CompanyHistory"
WHERE year >= 2018
ORDER BY year, "displayOrder";

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! Eventos adicionados:
-- - 2018-2026: Workshops, Palestras e Curadorias (Rio2C)
-- - 2019-2026: Motion Design para Exposições Imersivas (YDreams)
-- - 2023-2025: Museu Olímpico do Rio
-- - 2024-2026: Arte Generativa IA e Tecnologias Imersivas
-- ═══════════════════════════════════════════════════════════════
