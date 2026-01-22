-- ═══════════════════════════════════════════════════════════════
-- ADICIONAR EVENTOS PÓS-2018: Filmes 360° e Museu Olímpico
-- ═══════════════════════════════════════════════════════════════
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1. Verificar se Rio Museu Olímpico já existe
SELECT id, year, "yearEnd", "titlePt" 
FROM "CompanyHistory" 
WHERE "titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%' OR "titlePt" LIKE '%Rio Museu%';

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
  'Ateliers lors d''événements, Rio2C, conférences et curations en technologie et nouveaux médias.',
  '🎤', false, 170,
  ARRAY['Rio2C', 'Workshops em eventos', 'Palestras', 'Curadorias'],
  ARRAY['Rio2C', 'Workshops at events', 'Lectures', 'Curatorships'],
  ARRAY['Rio2C', 'Talleres en eventos', 'Conferencias', 'Curadurías'],
  ARRAY['Rio2C', 'Ateliers lors d''événements', 'Conférences', 'Curations']
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

-- 4. Adicionar parcerias: YDreams e UFRJ (2018-2026)
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr"
)
VALUES 
-- YDreams
(
  2018, 2026, 'partnership',
  'YDreams',
  'YDreams',
  'YDreams',
  'YDreams',
  'Parceria estratégica em projetos de experiências imersivas, motion design e conteúdo audiovisual.',
  'Strategic partnership in immersive experiences, motion design and audiovisual content projects.',
  'Asociación estratégica en proyectos de experiencias inmersivas, motion design y contenido audiovisual.',
  'Partenariat stratégique dans des projets d''expériences immersives, motion design et contenu audiovisuel.',
  '🤝', true, 165,
  ARRAY['Experiências Imersivas', 'Motion Design', 'Conteúdo Audiovisual'],
  ARRAY['Immersive Experiences', 'Motion Design', 'Audiovisual Content'],
  ARRAY['Experiencias Inmersivas', 'Motion Design', 'Contenido Audiovisual'],
  ARRAY['Expériences Immersives', 'Motion Design', 'Contenu Audiovisuel']
),
-- UFRJ
(
  2018, 2026, 'partnership',
  'Escola de Comunicação UFRJ (Pesquisadores)',
  'School of Communication UFRJ (Researchers)',
  'Escuela de Comunicación UFRJ (Investigadores)',
  'École de Communication UFRJ (Chercheurs)',
  'Parceria acadêmica com pesquisadores da Escola de Comunicação da UFRJ em projetos de pesquisa e desenvolvimento.',
  'Academic partnership with researchers from UFRJ School of Communication in research and development projects.',
  'Asociación académica con investigadores de la Escuela de Comunicación de la UFRJ en proyectos de investigación y desarrollo.',
  'Partenariat académique avec des chercheurs de l''École de Communication de l''UFRJ dans des projets de recherche et développement.',
  '🎓', true, 166,
  ARRAY['Pesquisadores', 'Projetos de Pesquisa', 'Desenvolvimento'],
  ARRAY['Researchers', 'Research Projects', 'Development'],
  ARRAY['Investigadores', 'Proyectos de Investigación', 'Desarrollo'],
  ARRAY['Chercheurs', 'Projets de Recherche', 'Développement']
)
ON CONFLICT DO NOTHING;

-- 5. Adicionar marcos (milestones) - Exemplos para você completar no backoffice
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr"
)
VALUES 
-- Exemplo de marco - você pode editar/adicionar mais no backoffice
(
  2020, null, 'milestone',
  'Marco Exemplo - Editar no Backoffice',
  'Example Milestone - Edit in Backoffice',
  'Hito Ejemplo - Editar en Backoffice',
  'Jalon Exemple - Modifier dans Backoffice',
  'Este é um exemplo de marco. Você pode editar este texto ou criar novos marcos no backoffice.',
  'This is an example milestone. You can edit this text or create new milestones in the backoffice.',
  'Este es un ejemplo de hito. Puedes editar este texto o crear nuevos hitos en el backoffice.',
  'Ceci est un exemple de jalon. Vous pouvez modifier ce texte ou créer de nouveaux jalons dans le backoffice.',
  '📍', false, 190,
  ARRAY['Exemplo', 'Editar no backoffice'],
  ARRAY['Example', 'Edit in backoffice'],
  ARRAY['Ejemplo', 'Editar en backoffice'],
  ARRAY['Exemple', 'Modifier dans backoffice']
)
ON CONFLICT DO NOTHING;

-- 6. Adicionar evento: Arte Generativa IA e Tecnologias Imersivas (2024-2026)
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

-- 7. Verificar/Atualizar Rio Museu Olímpico (2023-2025)
-- Se já existe, atualizar; se não, inserir
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr"
)
VALUES (
  2023, 2025, 'project',
  'Rio Museu Olímpico - Direção Geral',
  'Rio Olympic Museum - General Direction',
  'Rio Museo Olímpico - Dirección General',
  'Rio Musée Olympique - Direction Générale',
  'Direção Geral de Tecnologia, Direção Audiovisual e Design. Fase de execução e montagem com gestão de inúmeros fornecedores: games, simuladores, programadores, compatibilidade de arte, cenografia, motion, edição, pós-produção e interatividade.',
  'General Technology Direction, Audiovisual Direction and Design. Execution and assembly phase with management of numerous suppliers: games, simulators, programmers, art compatibility, scenography, motion, editing, post-production and interactivity.',
  'Dirección General de Tecnología, Dirección Audiovisual y Diseño. Fase de ejecución y montaje con gestión de numerosos proveedores: juegos, simuladores, programadores, compatibilidad de arte, escenografía, motion, edición, postproducción e interactividad.',
  'Direction Générale de Technologie, Direction Audiovisuelle et Design. Phase d''exécution et montage avec gestion de nombreux fournisseurs: jeux, simulateurs, programmeurs, compatibilité artistique, scénographie, motion, montage, post-production et interactivité.',
  '🏛️', true, 180,
  ARRAY['Direção Geral de Tecnologia (Ranz)', 'Direção Audiovisual (Alberto)', 'Liderança Equipe Arte: Design/UI/Motion/Grafismo/Sinalização (Anick)', 'Gestão múltiplos fornecedores', 'Execução e montagem'],
  ARRAY['General Technology Direction (Ranz)', 'Audiovisual Direction (Alberto)', 'Art Team Leadership: Design/UI/Motion/Graphics/Signage (Anick)', 'Multiple supplier management', 'Execution and assembly'],
  ARRAY['Dirección General de Tecnología (Ranz)', 'Dirección Audiovisual (Alberto)', 'Liderazgo Equipo Arte: Diseño/UI/Motion/Gráficos/Señalización (Anick)', 'Gestión múltiples proveedores', 'Ejecución y montaje'],
  ARRAY['Direction Générale de Technologie (Ranz)', 'Direction Audiovisuelle (Alberto)', 'Leadership Équipe Art: Design/UI/Motion/Graphisme/Signalisation (Anick)', 'Gestion multiples fournisseurs', 'Exécution et montage']
)
ON CONFLICT DO NOTHING;

-- 8. Se Rio Museu Olímpico já existe com ano errado, atualizar
UPDATE "CompanyHistory"
SET 
  year = 2023,
  "yearEnd" = 2025,
  "titlePt" = 'Rio Museu Olímpico - Direção Geral',
  "titleEn" = 'Rio Olympic Museum - General Direction',
  "titleEs" = 'Rio Museo Olímpico - Dirección General',
  "titleFr" = 'Rio Musée Olympique - Direction Générale',
  "descriptionPt" = 'Direção Geral de Tecnologia, Direção Audiovisual e Design. Fase de execução e montagem com gestão de inúmeros fornecedores: games, simuladores, programadores, compatibilidade de arte, cenografia, motion, edição, pós-produção e interatividade.',
  "descriptionEn" = 'General Technology Direction, Audiovisual Direction and Design. Execution and assembly phase with management of numerous suppliers: games, simulators, programmers, art compatibility, scenography, motion, editing, post-production and interactivity.',
  "descriptionEs" = 'Dirección General de Tecnología, Dirección Audiovisual y Diseño. Fase de ejecución y montaje con gestión de numerosos proveedores: juegos, simuladores, programadores, compatibilidad de arte, escenografía, motion, edición, postproducción e interactividad.',
  "descriptionFr" = 'Direction Générale de Technologie, Direction Audiovisuelle et Design. Phase d''exécution et montage avec gestion de nombreux fournisseurs: jeux, simulateurs, programmeurs, compatibilité artistique, scénographie, motion, montage, post-production et interactivité.',
  "bulletsPt" = ARRAY['Direção Geral de Tecnologia (Ranz)', 'Direção Audiovisual (Alberto)', 'Liderança Equipe Arte: Design/UI/Motion/Grafismo/Sinalização (Anick)', 'Gestão múltiplos fornecedores', 'Execução e montagem'],
  "bulletsEn" = ARRAY['General Technology Direction (Ranz)', 'Audiovisual Direction (Alberto)', 'Art Team Leadership: Design/UI/Motion/Graphics/Signage (Anick)', 'Multiple supplier management', 'Execution and assembly'],
  "bulletsEs" = ARRAY['Dirección General de Tecnología (Ranz)', 'Dirección Audiovisual (Alberto)', 'Liderazgo Equipo Arte: Diseño/UI/Motion/Gráficos/Señalización (Anick)', 'Gestión múltiples proveedores', 'Ejecución y montaje'],
  "bulletsFr" = ARRAY['Direction Générale de Technologie (Ranz)', 'Direction Audiovisuelle (Alberto)', 'Leadership Équipe Art: Design/UI/Motion/Graphisme/Signalisation (Anick)', 'Gestion multiples fournisseurs', 'Exécution et montage']
WHERE ("titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%')
  AND (year != 2023 OR "yearEnd" != 2025);

-- 9. Verificar resultado final
SELECT year, "yearEnd", "titlePt", type, "isFeatured"
FROM "CompanyHistory"
WHERE year >= 2018
ORDER BY year, "displayOrder";

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! Eventos adicionados:
-- - 2018-2026: Workshops, Palestras e Curadorias (Rio2C) [Marco]
-- - 2018-2026: YDreams (Parceria)
-- - 2018-2026: Escola de Comunicação UFRJ (Pesquisadores) [Parceria]
-- - 2019-2026: Motion Design para Exposições Imersivas (YDreams) [Projeto]
-- - 2020: Marco Exemplo - Editar no Backoffice [Marco - exemplo]
-- - 2023-2025: Rio Museu Olímpico - Direção Geral (Ranz/Alberto/Anick) [Projeto]
-- - 2024-2026: Arte Generativa IA e Tecnologias Imersivas [Marco]
-- 
-- ✅ TODOS OS TIPOS SUPORTADOS NO BACKOFFICE:
-- - Marcos (milestone) - Ex: Expansões, inaugurações, conquistas
-- - Parcerias (partnership) - Ex: YDreams, UFRJ, Autodesk
-- - Projetos (project) - Ex: Museu Olímpico, Taikodom
-- - Prêmios (award) - Ex: Digital Designer, Training Specialist
-- - Localizações (location) - Ex: Vancouver, Rio
-- - Outros (other) - Qualquer outro tipo
-- 
-- 💡 DICA: Acesse /admin/history para adicionar/editar qualquer tipo de evento!
-- ═══════════════════════════════════════════════════════════════
