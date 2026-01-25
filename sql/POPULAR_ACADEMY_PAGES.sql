-- ============================================================================
-- POPULAR PÁGINAS ACADEMY NO BACKOFFICE
-- ============================================================================
-- Executar este script no banco PostgreSQL do Neon
-- Cria/atualiza: academy-courses, academy-workshops, academy-corporate
-- ============================================================================

-- ============================================================================
-- 1. ACADEMY COURSES
-- ============================================================================

-- Primeiro tenta atualizar se já existe
UPDATE "Page" SET
  "name" = 'Academy Courses',
  "seoTitlePt" = 'Cursos Azimut Academy - Formação Profissional',
  "seoTitleEn" = 'Azimut Academy Courses - Professional Training',
  "seoTitleEs" = 'Cursos Azimut Academy - Formación Profesional',
  "seoTitleFr" = 'Cours Azimut Academy - Formation Professionnelle',
  "seoDescPt" = 'Cursos de VR, 360°, IA Generativa, Motion Design e produção audiovisual. 30 anos de experiência. Turmas pequenas, 100% prático.',
  "seoDescEn" = 'VR, 360°, Generative AI, Motion Design and audiovisual production courses. 30 years of experience. Small classes, 100% hands-on.',
  "seoDescEs" = 'Cursos de VR, 360°, IA Generativa, Motion Design y producción audiovisual. 30 años de experiencia. Clases pequeñas, 100% práctico.',
  "seoDescFr" = 'Cours de VR, 360°, IA Générative, Motion Design et production audiovisuelle. 30 ans expérience. Petites classes, 100% pratique.',
  "heroSloganPt" = 'Cursos & Treinamentos',
  "heroSloganEn" = 'Courses & Training',
  "heroSloganEs" = 'Cursos y Capacitación',
  "heroSloganFr" = 'Cours et Formation',
  "heroSubtitlePt" = '30 anos de experiência em ensinar',
  "heroSubtitleEn" = '30 years of teaching experience',
  "heroSubtitleEs" = '30 años de experiencia enseñando',
  "heroSubtitleFr" = '30 ans expérience enseignement',
  "heroDescriptionMobilePt" = 'Tecnologias imersivas, IA e audiovisual. Turmas pequenas, 100% prático.',
  "heroDescriptionMobileEn" = 'Immersive tech, AI and audiovisual. Small classes, 100% hands-on.',
  "heroDescriptionMobileEs" = 'Tecnologías inmersivas, IA y audiovisual. Clases pequeñas, 100% práctico.',
  "heroDescriptionMobileFr" = 'Technologies immersives, IA et audiovisuel. Petites classes, 100% pratique.',
  "heroDescriptionDesktopPt" = 'Domine tecnologias imersivas, IA e produção audiovisual com quem está no mercado desde 1994. Turmas pequenas, 100% prático.',
  "heroDescriptionDesktopEn" = 'Master immersive technologies, AI and audiovisual production with industry experts since 1994. Small classes, 100% practical.',
  "heroDescriptionDesktopEs" = 'Domina tecnologías inmersivas, IA y producción audiovisual con quienes están en el mercado desde 1994. Clases pequeñas, 100% práctico.',
  "heroDescriptionDesktopFr" = 'Maîtrisez les technologies immersives, IA et la production audiovisuelle avec des experts du secteur depuis 1994. Petites classes, 100% pratique.',
  "heroBackgroundImageUrl" = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=90',
  "updatedAt" = NOW()
WHERE slug = 'academy-courses';

-- Se não existir, insere novo
INSERT INTO "Page" (
  id, name, slug, status,
  "seoTitlePt", "seoTitleEn", "seoTitleEs", "seoTitleFr",
  "seoDescPt", "seoDescEn", "seoDescEs", "seoDescFr",
  "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr",
  "heroSubtitlePt", "heroSubtitleEn", "heroSubtitleEs", "heroSubtitleFr",
  "heroDescriptionMobilePt", "heroDescriptionMobileEn", "heroDescriptionMobileEs", "heroDescriptionMobileFr",
  "heroDescriptionDesktopPt", "heroDescriptionDesktopEn", "heroDescriptionDesktopEs", "heroDescriptionDesktopFr",
  "heroBackgroundImageUrl",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(), 'Academy Courses', 'academy-courses', 'PUBLISHED',
  'Cursos Azimut Academy - Formação Profissional',
  'Azimut Academy Courses - Professional Training',
  'Cursos Azimut Academy - Formación Profesional',
  'Cours Azimut Academy - Formation Professionnelle',
  'Cursos de VR, 360°, IA Generativa, Motion Design e produção audiovisual. 30 anos de experiência. Turmas pequenas, 100% prático.',
  'VR, 360°, Generative AI, Motion Design and audiovisual production courses. 30 years of experience. Small classes, 100% hands-on.',
  'Cursos de VR, 360°, IA Generativa, Motion Design y producción audiovisual. 30 años de experiencia. Clases pequeñas, 100% práctico.',
  'Cours de VR, 360°, IA Générative, Motion Design et production audiovisuelle. 30 ans expérience. Petites classes, 100% pratique.',
  'Cursos & Treinamentos',
  'Courses & Training',
  'Cursos y Capacitación',
  'Cours et Formation',
  '30 anos de experiência em ensinar',
  '30 years of teaching experience',
  '30 años de experiencia enseñando',
  '30 ans expérience enseignement',
  'Tecnologias imersivas, IA e audiovisual. Turmas pequenas, 100% prático.',
  'Immersive tech, AI and audiovisual. Small classes, 100% hands-on.',
  'Tecnologías inmersivas, IA y audiovisual. Clases pequeñas, 100% práctico.',
  'Technologies immersives, IA et audiovisuel. Petites classes, 100% pratique.',
  'Domine tecnologias imersivas, IA e produção audiovisual com quem está no mercado desde 1994. Turmas pequenas, 100% prático.',
  'Master immersive technologies, AI and audiovisual production with industry experts since 1994. Small classes, 100% practical.',
  'Domina tecnologías inmersivas, IA y producción audiovisual con quienes están en el mercado desde 1994. Clases pequeñas, 100% práctico.',
  'Maîtrisez les technologies immersives, IA et la production audiovisuelle avec des experts du secteur depuis 1994. Petites classes, 100% pratique.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=90',
  NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Page" WHERE slug = 'academy-courses');


-- ============================================================================
-- 2. ACADEMY WORKSHOPS
-- ============================================================================

UPDATE "Page" SET
  "name" = 'Academy Workshops',
  "seoTitlePt" = 'Workshops Azimut Academy - Eventos e Palestras',
  "seoTitleEn" = 'Azimut Academy Workshops - Events & Lectures',
  "seoTitleEs" = 'Workshops Azimut Academy - Eventos y Conferencias',
  "seoTitleFr" = 'Workshops Azimut Academy - Événements et Conférences',
  "seoDescPt" = 'Workshops presenciais e online, palestras em festivais (Rio2C), mini cursos para produtores e agências. Educação rápida e prática.',
  "seoDescEn" = 'In-person and online workshops, festival talks (Rio2C), mini courses for producers and agencies. Fast and practical education.',
  "seoDescEs" = 'Workshops presenciales y online, charlas en festivales (Rio2C), mini cursos para productores y agencias. Educación rápida y práctica.',
  "seoDescFr" = 'Workshops en personne et en ligne, conférences dans des festivals (Rio2C), mini cours pour producteurs et agences. Éducation rapide et pratique.',
  "heroSloganPt" = 'Workshops & Palestras',
  "heroSloganEn" = 'Workshops & Lectures',
  "heroSloganEs" = 'Workshops y Conferencias',
  "heroSloganFr" = 'Workshops & Conférences',
  "heroSubtitlePt" = 'Aprenda rápido com especialistas',
  "heroSubtitleEn" = 'Learn fast with experts',
  "heroSubtitleEs" = 'Aprende rápido con expertos',
  "heroSubtitleFr" = 'Apprenez vite avec des experts',
  "heroDescriptionMobilePt" = 'Mini cursos, palestras em festivais, workshops intensivos. De 4h a 3 dias.',
  "heroDescriptionMobileEn" = 'Mini courses, festival talks, intensive workshops. From 4h to 3 days.',
  "heroDescriptionMobileEs" = 'Mini cursos, charlas en festivales, workshops intensivos. De 4h a 3 días.',
  "heroDescriptionMobileFr" = 'Mini cours, conférences en festivals, workshops intensifs. De 4h à 3 jours.',
  "heroDescriptionDesktopPt" = 'Mini cursos, palestras em festivais de cinema, workshops intensivos para produtores, agências e equipes. De 4h a 3 dias.',
  "heroDescriptionDesktopEn" = 'Mini courses, film festival talks, intensive workshops for producers, agencies and teams. From 4h to 3 days.',
  "heroDescriptionDesktopEs" = 'Mini cursos, charlas en festivales de cine, workshops intensivos para productores, agencias y equipos. De 4h a 3 días.',
  "heroDescriptionDesktopFr" = 'Mini cours, conférences de festivals de cinéma, workshops intensifs pour producteurs, agences et équipes. De 4h à 3 jours.',
  "heroBackgroundImageUrl" = 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=90',
  "updatedAt" = NOW()
WHERE slug = 'academy-workshops';

INSERT INTO "Page" (
  id, name, slug, status,
  "seoTitlePt", "seoTitleEn", "seoTitleEs", "seoTitleFr",
  "seoDescPt", "seoDescEn", "seoDescEs", "seoDescFr",
  "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr",
  "heroSubtitlePt", "heroSubtitleEn", "heroSubtitleEs", "heroSubtitleFr",
  "heroDescriptionMobilePt", "heroDescriptionMobileEn", "heroDescriptionMobileEs", "heroDescriptionMobileFr",
  "heroDescriptionDesktopPt", "heroDescriptionDesktopEn", "heroDescriptionDesktopEs", "heroDescriptionDesktopFr",
  "heroBackgroundImageUrl",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(), 'Academy Workshops', 'academy-workshops', 'PUBLISHED',
  'Workshops Azimut Academy - Eventos e Palestras',
  'Azimut Academy Workshops - Events & Lectures',
  'Workshops Azimut Academy - Eventos y Conferencias',
  'Workshops Azimut Academy - Événements et Conférences',
  'Workshops presenciais e online, palestras em festivais (Rio2C), mini cursos para produtores e agências. Educação rápida e prática.',
  'In-person and online workshops, festival talks (Rio2C), mini courses for producers and agencies. Fast and practical education.',
  'Workshops presenciales y online, charlas en festivales (Rio2C), mini cursos para productores y agencias. Educación rápida y práctica.',
  'Workshops en personne et en ligne, conférences dans des festivals (Rio2C), mini cours pour producteurs et agences. Éducation rapide et pratique.',
  'Workshops & Palestras',
  'Workshops & Lectures',
  'Workshops y Conferencias',
  'Workshops & Conférences',
  'Aprenda rápido com especialistas',
  'Learn fast with experts',
  'Aprende rápido con expertos',
  'Apprenez vite avec des experts',
  'Mini cursos, palestras em festivais, workshops intensivos. De 4h a 3 dias.',
  'Mini courses, festival talks, intensive workshops. From 4h to 3 days.',
  'Mini cursos, charlas en festivales, workshops intensivos. De 4h a 3 días.',
  'Mini cours, conférences en festivals, workshops intensifs. De 4h à 3 jours.',
  'Mini cursos, palestras em festivais de cinema, workshops intensivos para produtores, agências e equipes. De 4h a 3 dias.',
  'Mini courses, film festival talks, intensive workshops for producers, agencies and teams. From 4h to 3 days.',
  'Mini cursos, charlas en festivales de cine, workshops intensivos para productores, agencias y equipos. De 4h a 3 días.',
  'Mini cours, conférences de festivals de cinéma, workshops intensifs pour producteurs, agences et équipes. De 4h à 3 jours.',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=90',
  NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Page" WHERE slug = 'academy-workshops');


-- ============================================================================
-- 3. ACADEMY CORPORATE
-- ============================================================================

UPDATE "Page" SET
  "name" = 'Academy Corporate',
  "seoTitlePt" = 'Azimut Academy Corporate - Treinamento Empresarial',
  "seoTitleEn" = 'Azimut Academy Corporate - Corporate Training',
  "seoTitleEs" = 'Azimut Academy Corporate - Capacitación Empresarial',
  "seoTitleFr" = 'Azimut Academy Corporate - Formation d''Entreprise',
  "seoDescPt" = 'Treinamentos corporativos customizados em VR, IA e produção audiovisual. Para empresas, governo, ONGs, SESC, SENAC e universidades.',
  "seoDescEn" = 'Customized corporate training in VR, AI and audiovisual production. For companies, government, NGOs, SESC, SENAC and universities.',
  "seoDescEs" = 'Capacitación corporativa personalizada en VR, IA y producción audiovisual. Para empresas, gobierno, ONGs, SESC, SENAC y universidades.',
  "seoDescFr" = 'Formation corporative personnalisée en VR, IA et production audiovisuelle. Pour entreprises, gouvernement, ONG, SESC, SENAC et universités.',
  "heroSloganPt" = 'Soluções B2B',
  "heroSloganEn" = 'B2B Solutions',
  "heroSloganEs" = 'Soluciones B2B',
  "heroSloganFr" = 'Solutions B2B',
  "heroSubtitlePt" = 'Treinamento customizado para sua equipe',
  "heroSubtitleEn" = 'Customized training for your team',
  "heroSubtitleEs" = 'Capacitación personalizada para tu equipo',
  "heroSubtitleFr" = 'Formation personnalisée pour votre équipe',
  "heroDescriptionMobilePt" = 'Treinamentos sob medida para empresas, governos e instituições de ensino.',
  "heroDescriptionMobileEn" = 'Tailor-made training for companies, governments and educational institutions.',
  "heroDescriptionMobileEs" = 'Capacitación a medida para empresas, gobiernos e instituciones educativas.',
  "heroDescriptionMobileFr" = 'Formation sur mesure pour entreprises, gouvernements et institutions éducatives.',
  "heroDescriptionDesktopPt" = 'Capacitamos empresas, governos, ONGs e instituições de ensino com treinamentos sob medida em tecnologias imersivas e produção audiovisual.',
  "heroDescriptionDesktopEn" = 'We train companies, governments, NGOs and educational institutions with tailor-made training in immersive technologies and audiovisual production.',
  "heroDescriptionDesktopEs" = 'Capacitamos empresas, gobiernos, ONGs e instituciones educativas con entrenamiento a medida en tecnologías inmersivas y producción audiovisual.',
  "heroDescriptionDesktopFr" = 'Nous formons entreprises, gouvernements, ONG et institutions éducatives avec une formation sur mesure en technologies immersives et production audiovisuelle.',
  "heroBackgroundImageUrl" = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90',
  "updatedAt" = NOW()
WHERE slug = 'academy-corporate';

INSERT INTO "Page" (
  id, name, slug, status,
  "seoTitlePt", "seoTitleEn", "seoTitleEs", "seoTitleFr",
  "seoDescPt", "seoDescEn", "seoDescEs", "seoDescFr",
  "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr",
  "heroSubtitlePt", "heroSubtitleEn", "heroSubtitleEs", "heroSubtitleFr",
  "heroDescriptionMobilePt", "heroDescriptionMobileEn", "heroDescriptionMobileEs", "heroDescriptionMobileFr",
  "heroDescriptionDesktopPt", "heroDescriptionDesktopEn", "heroDescriptionDesktopEs", "heroDescriptionDesktopFr",
  "heroBackgroundImageUrl",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(), 'Academy Corporate', 'academy-corporate', 'PUBLISHED',
  'Azimut Academy Corporate - Treinamento Empresarial',
  'Azimut Academy Corporate - Corporate Training',
  'Azimut Academy Corporate - Capacitación Empresarial',
  'Azimut Academy Corporate - Formation d''Entreprise',
  'Treinamentos corporativos customizados em VR, IA e produção audiovisual. Para empresas, governo, ONGs, SESC, SENAC e universidades.',
  'Customized corporate training in VR, AI and audiovisual production. For companies, government, NGOs, SESC, SENAC and universities.',
  'Capacitación corporativa personalizada en VR, IA y producción audiovisual. Para empresas, gobierno, ONGs, SESC, SENAC y universidades.',
  'Formation corporative personnalisée en VR, IA et production audiovisuelle. Pour entreprises, gouvernement, ONG, SESC, SENAC et universités.',
  'Soluções B2B',
  'B2B Solutions',
  'Soluciones B2B',
  'Solutions B2B',
  'Treinamento customizado para sua equipe',
  'Customized training for your team',
  'Capacitación personalizada para tu equipo',
  'Formation personnalisée pour votre équipe',
  'Treinamentos sob medida para empresas, governos e instituições de ensino.',
  'Tailor-made training for companies, governments and educational institutions.',
  'Capacitación a medida para empresas, gobiernos e instituciones educativas.',
  'Formation sur mesure pour entreprises, gouvernements et institutions éducatives.',
  'Capacitamos empresas, governos, ONGs e instituições de ensino com treinamentos sob medida em tecnologias imersivas e produção audiovisual.',
  'We train companies, governments, NGOs and educational institutions with tailor-made training in immersive technologies and audiovisual production.',
  'Capacitamos empresas, gobiernos, ONGs e instituciones educativas con entrenamiento a medida en tecnologías inmersivas y producción audiovisual.',
  'Nous formons entreprises, gouvernements, ONG et institutions éducatives avec une formation sur mesure en technologies immersives et production audiovisuelle.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90',
  NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Page" WHERE slug = 'academy-corporate');


-- ============================================================================
-- VERIFICAÇÃO FINAL
-- ============================================================================

SELECT 
  slug,
  name,
  status,
  "heroSloganPt" AS "Título PT",
  "heroSubtitlePt" AS "Subtítulo PT",
  LEFT("heroDescriptionDesktopPt", 50) || '...' AS "Descrição PT",
  "heroBackgroundImageUrl" IS NOT NULL AS "Tem Imagem",
  "updatedAt"
FROM "Page"
WHERE slug IN ('academy-courses', 'academy-workshops', 'academy-corporate', 'vancouver')
ORDER BY slug;
