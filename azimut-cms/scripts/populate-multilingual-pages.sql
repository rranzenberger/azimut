-- ═══════════════════════════════════════════════════════════════
-- SCRIPT SQL: POPULAR PÁGINAS COM CONTEÚDO MULTILÍNGUE
-- Banco: PostgreSQL (Neon/Vercel)
-- Data: 03 de janeiro de 2025
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. CRIAR PÁGINAS SE NÃO EXISTIREM
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status)
VALUES 
  (gen_random_uuid(), 'Home', 'home', 'PUBLISHED'),
  (gen_random_uuid(), 'Solutions', 'what', 'PUBLISHED'),
  (gen_random_uuid(), 'Work', 'work', 'PUBLISHED'),
  (gen_random_uuid(), 'Studio', 'studio', 'PUBLISHED'),
  (gen_random_uuid(), 'Academy', 'academy', 'PUBLISHED')
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. ATUALIZAR HOME - HERO (4 IDIOMAS)
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  -- HERO SLOGAN (TÍTULO)
  "heroSloganPt" = 'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  "heroSloganEn" = 'EXPERIENCES THAT CONNECT WORLDS',
  "heroSloganFr" = 'EXPÉRIENCES QUI CONNECTENT LES MONDES',
  "heroSloganEs" = 'EXPERIENCIAS QUE CONECTAN MUNDOS',
  
  -- HERO SUBTITLE
  "heroSubtitlePt" = 'Criamos experiências imersivas entre Brasil e Canadá.',
  "heroSubtitleEn" = 'We create immersive experiences between Brazil and Canada.',
  "heroSubtitleFr" = 'Nous créons des expériences immersives entre le Brésil et le Canada.',
  "heroSubtitleEs" = 'Creamos experiencias inmersivas entre Brasil y Canadá.',
  
  -- PILLARS (3 BOTÕES)
  "pillar1Pt" = 'Museus & Cultura',
  "pillar1En" = 'Museums & Culture',
  "pillar1Fr" = 'Musées & Culture',
  "pillar1Es" = 'Museos & Cultura',
  
  "pillar2Pt" = 'Marcas & Eventos',
  "pillar2En" = 'Brands & Events',
  "pillar2Fr" = 'Marques & Événements',
  "pillar2Es" = 'Marcas & Eventos',
  
  "pillar3Pt" = 'Educação & Pesquisa',
  "pillar3En" = 'Education & Research',
  "pillar3Fr" = 'Éducation & Recherche',
  "pillar3Es" = 'Educación & Investigación',
  
  -- SEO
  "seoTitlePt" = 'Início',
  "seoTitleEn" = 'Home',
  "seoTitleFr" = 'Accueil',
  "seoTitleEs" = 'Inicio',
  
  "seoDescPt" = 'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos – atuando entre Brasil e Canadá.',
  "seoDescEn" = 'Immersive, interactive and cinematic experiences for culture, brands and hybrid spaces – operating between Brazil and Canada.',
  "seoDescFr" = 'Expériences immersives, interactives et cinématographiques pour la culture, les marques et les espaces hybrides – entre le Brésil et le Canada.',
  "seoDescEs" = 'Experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y espacios híbridos – operando entre Brasil y Canadá.',
  
  "updatedAt" = NOW()
WHERE slug = 'home';

-- ═══════════════════════════════════════════════════════════════
-- 3. ATUALIZAR SOLUTIONS (WHAT) - HERO
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  "heroSloganPt" = 'NOSSAS SOLUÇÕES',
  "heroSloganEn" = 'OUR SOLUTIONS',
  "heroSloganFr" = 'NOS SOLUTIONS',
  "heroSloganEs" = 'NUESTRAS SOLUCIONES',
  
  "heroSubtitlePt" = 'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais.',
  "heroSubtitleEn" = 'We combine cinema, interactive design, spatial storytelling and AI pipelines to create narrative installations, hybrid environments and time-based experiences.',
  "heroSubtitleFr" = 'Nous combinons cinéma, design interactif, narration spatiale et pipelines avec IA pour créer des installations narratives, des environnements hybrides et des expériences temporelles.',
  "heroSubtitleEs" = 'Combinamos cine, diseño interactivo, narrativa espacial y pipelines con IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales.',
  
  "seoTitlePt" = 'O que fazemos',
  "seoTitleEn" = 'What We Do',
  "seoTitleFr" = 'Ce que nous faisons',
  "seoTitleEs" = 'Qué hacemos',
  
  "seoDescPt" = 'Criamos instalações imersivas, exposições interativas e experiências cinematográficas para museus, marcas, festivais e laboratórios de pesquisa.',
  "seoDescEn" = 'We create immersive installations, interactive exhibitions, and cinematic experiences for museums, brands, festivals and research labs.',
  "seoDescFr" = 'Nous créons des installations immersives, des expositions interactives et des expériences cinématographiques pour musées, marques, festivals et laboratoires.',
  "seoDescEs" = 'Creamos instalaciones inmersivas, exposiciones interactivas y experiencias cinematográficas para museos, marcas, festivales y laboratorios.',
  
  "updatedAt" = NOW()
WHERE slug = 'what';

-- ═══════════════════════════════════════════════════════════════
-- 4. ATUALIZAR WORK - HERO
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  "heroSloganPt" = 'NOSSOS PROJETOS',
  "heroSloganEn" = 'OUR WORK',
  "heroSloganFr" = 'NOS PROJETS',
  "heroSloganEs" = 'NUESTROS PROYECTOS',
  
  "heroSubtitlePt" = 'Explore nosso portfólio de projetos imersivos, instalações interativas e experiências cinematográficas no Brasil e Canadá.',
  "heroSubtitleEn" = 'Explore our portfolio of immersive projects, interactive installations and cinematic experiences across Brazil and Canada.',
  "heroSubtitleFr" = 'Explorez notre portfolio de projets immersifs, installations interactives et expériences cinématographiques au Brésil et au Canada.',
  "heroSubtitleEs" = 'Explore nuestro portafolio de proyectos inmersivos, instalaciones interactivas y experiencias cinematográficas en Brasil y Canadá.',
  
  "seoTitlePt" = 'Projetos',
  "seoTitleEn" = 'Work',
  "seoTitleFr" = 'Projets',
  "seoTitleEs" = 'Proyectos',
  
  "seoDescPt" = 'Explore nosso portfólio de projetos imersivos, instalações interativas e experiências cinematográficas no Brasil e Canadá.',
  "seoDescEn" = 'Explore our portfolio of immersive projects, interactive installations and cinematic experiences across Brazil and Canada.',
  "seoDescFr" = 'Explorez notre portfolio de projets immersifs, installations interactives et expériences cinématographiques au Brésil et au Canada.',
  "seoDescEs" = 'Explore nuestro portafolio de proyectos inmersivos, instalaciones interactivas y experiencias cinematográficas en Brasil y Canadá.',
  
  "updatedAt" = NOW()
WHERE slug = 'work';

-- ═══════════════════════════════════════════════════════════════
-- 5. ATUALIZAR STUDIO - HERO
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  "heroSloganPt" = 'NOSSO ESTÚDIO',
  "heroSloganEn" = 'OUR STUDIO',
  "heroSloganFr" = 'NOTRE STUDIO',
  "heroSloganEs" = 'NUESTRO ESTUDIO',
  
  "heroSubtitlePt" = 'Conheça nosso estúdio criativo: uma equipe multidisciplinar que combina cinema, design interativo, storytelling espacial e pipelines com IA.',
  "heroSubtitleEn" = 'Meet our creative studio: a multidisciplinary team combining cinema, interactive design, spatial storytelling and AI-driven pipelines.',
  "heroSubtitleFr" = 'Découvrez notre studio créatif: une équipe multidisciplinaire combinant cinéma, design interactif, narration spatiale et pipelines IA.',
  "heroSubtitleEs" = 'Conozca nuestro estudio creativo: un equipo multidisciplinario que combina cine, diseño interactivo, narrativa espacial y pipelines con IA.',
  
  "seoTitlePt" = 'Estúdio',
  "seoTitleEn" = 'Studio',
  "seoTitleFr" = 'Studio',
  "seoTitleEs" = 'Estudio',
  
  "seoDescPt" = 'Conheça nosso estúdio criativo: uma equipe multidisciplinar que combina cinema, design interativo, storytelling espacial e pipelines com IA.',
  "seoDescEn" = 'Meet our creative studio: a multidisciplinary team combining cinema, interactive design, spatial storytelling and AI-driven pipelines.',
  "seoDescFr" = 'Découvrez notre studio créatif: une équipe multidisciplinaire combinant cinéma, design interactif, narration spatiale et pipelines IA.',
  "seoDescEs" = 'Conozca nuestro estudio creativo: un equipo multidisciplinario que combina cine, diseño interactivo, narrativa espacial y pipelines con IA.',
  
  "updatedAt" = NOW()
WHERE slug = 'studio';

-- ═══════════════════════════════════════════════════════════════
-- 6. ATUALIZAR ACADEMY - HERO
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  "heroSloganPt" = 'ACADEMIA AZIMUT',
  "heroSloganEn" = 'AZIMUT ACADEMY',
  "heroSloganFr" = 'ACADÉMIE AZIMUT',
  "heroSloganEs" = 'ACADEMIA AZIMUT',
  
  "heroSubtitlePt" = 'Workshops, cursos e programas de mentoria sobre design imersivo, storytelling interativo e tecnologia criativa.',
  "heroSubtitleEn" = 'Workshops, courses and mentorship programs on immersive design, interactive storytelling and creative technology.',
  "heroSubtitleFr" = 'Ateliers, cours et programmes de mentorat sur le design immersif, la narration interactive et la technologie créative.',
  "heroSubtitleEs" = 'Talleres, cursos y programas de mentoría sobre diseño inmersivo, narrativa interactiva y tecnología creativa.',
  
  "seoTitlePt" = 'Academia',
  "seoTitleEn" = 'Academy',
  "seoTitleFr" = 'Académie',
  "seoTitleEs" = 'Academia',
  
  "seoDescPt" = 'Workshops, cursos e programas de mentoria sobre design imersivo, storytelling interativo e tecnologia criativa.',
  "seoDescEn" = 'Workshops, courses and mentorship programs on immersive design, interactive storytelling and creative technology.',
  "seoDescFr" = 'Ateliers, cours et programmes de mentorat sur le design immersif, la narration interactive et la technologie créative.',
  "seoDescEs" = 'Talleres, cursos y programas de mentoría sobre diseño inmersivo, narrativa interactiva y tecnología creativa.',
  
  "updatedAt" = NOW()
WHERE slug = 'academy';

-- ═══════════════════════════════════════════════════════════════
-- 7. VERIFICAR SE FOI POPULADO CORRETAMENTE
-- ═══════════════════════════════════════════════════════════════

SELECT 
  slug,
  "heroSloganPt",
  "heroSloganEn",
  "heroSloganFr",
  "heroSloganEs",
  "heroSubtitlePt",
  "heroSubtitleEn"
FROM "Page"
WHERE slug IN ('home', 'what', 'work', 'studio', 'academy')
ORDER BY 
  CASE slug
    WHEN 'home' THEN 1
    WHEN 'what' THEN 2
    WHEN 'work' THEN 3
    WHEN 'studio' THEN 4
    WHEN 'academy' THEN 5
  END;

-- ═══════════════════════════════════════════════════════════════
-- 8. BONUS: VERIFICAR SE API RETORNA CORRETAMENTE
-- ═══════════════════════════════════════════════════════════════

-- Após executar este script, teste a API:
-- 
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=en&page=home"
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=fr&page=home"
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=es&page=home"
--
-- Resposta esperada (PT):
-- {
--   "lang": "pt",
--   "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
--   "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá.",
--   "page": { ... }
-- }

-- ═══════════════════════════════════════════════════════════════
-- FIM DO SCRIPT
-- ═══════════════════════════════════════════════════════════════

