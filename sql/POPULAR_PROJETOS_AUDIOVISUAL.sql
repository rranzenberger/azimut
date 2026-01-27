-- ═══════════════════════════════════════════════════════════════
-- POPULAR PROJETOS DE PRODUÇÃO AUDIOVISUAL - Azimut
-- ═══════════════════════════════════════════════════════════════
-- Insere 5 projetos de produção audiovisual históricos da Azimut
-- Campos faltantes podem ser completados depois no backoffice
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. CURTA 3D O SACI (1997-1998)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year, duration,
  client, type,
  "projectCategory", industry, technologies, "azimutRole", "workType",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'curta-3d-o-saci-1997',
  'Curta 3D O Saci',
  'O Saci',
  'Animação e supervisão de efeitos em curta-metragem 3D sobre o folclore brasileiro, desenvolvido em parceria com 3DGraphics e TAL Produções.',
  'Animation and effects supervision in 3D short film about Brazilian folklore, developed in partnership with 3DGraphics and TAL Produções.',
  'Animação e supervisão de efeitos em curta-metragem 3D sobre o folclore brasileiro, desenvolvido em parceria com 3DGraphics e TAL Produções. Um dos primeiros projetos de animação 3D da Azimut, combinando narrativa cultural brasileira com tecnologia de ponta. O projeto demonstrou a capacidade da empresa em criar conteúdo autoral e inovador, estabelecendo as bases para futuras produções audiovisuais.',
  'Animation and effects supervision in 3D short film about Brazilian folklore, developed in partnership with 3DGraphics and TAL Produções. One of Azimut''s first 3D animation projects, combining Brazilian cultural narrative with cutting-edge technology. The project demonstrated the company''s ability to create original and innovative content, establishing the foundation for future audiovisual productions.',
  'Rio de Janeiro',
  'Brasil',
  1997,
  '1997-1998',
  '3DGraphics + TAL Produções',
  'audiovisual',
  ARRAY['motion'],
  'entertainment',
  ARRAY['3D', 'Motion Graphics'],
  ARRAY['animacao', 'direcao', 'producao'],
  ARRAY['filme'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. CLIPE NÃO IMPORTA POR QUÊ (2011)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year,
  client, type,
  "projectCategory", industry, technologies, "azimutRole", "workType",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'clipe-nao-importa-por-que-2011',
  'Clipe Não importa por quê',
  'Não importa por quê',
  'Animação de videoclipe musical para Oswaldo Montenegro, desenvolvido em parceria com Singularidade.',
  'Animation of music video for Oswaldo Montenegro, developed in partnership with Singularidade.',
  'Animação de videoclipe musical para Oswaldo Montenegro, desenvolvido em parceria com Singularidade. Projeto que combinou música brasileira com animação 3D, criando uma experiência visual única que complementava a narrativa musical. A Azimut foi responsável pela animação completa do clipe, demonstrando versatilidade em diferentes formatos audiovisuais.',
  'Animation of music video for Oswaldo Montenegro, developed in partnership with Singularidade. Project that combined Brazilian music with 3D animation, creating a unique visual experience that complemented the musical narrative. Azimut was responsible for the complete animation of the video, demonstrating versatility in different audiovisual formats.',
  'Rio de Janeiro',
  'Brasil',
  2011,
  'Singularidade / Oswaldo Montenegro',
  'audiovisual',
  ARRAY['motion'],
  'entertainment',
  ARRAY['3D', 'Motion Graphics'],
  ARRAY['animacao', 'producao'],
  ARRAY['filme'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. VÍDEO O QUE É DIGITAL SIGNAGE? (2013)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year,
  client, type,
  "projectCategory", industry, technologies, "azimutRole", "workType",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'video-o-que-e-digital-signage-2013',
  'Vídeo O que é Digital Signage?',
  'Digital Signage',
  'Co-produção e consultoria em vídeo institucional sobre Digital Signage para Ya Mogu! Comunicação Digital.',
  'Co-production and consulting in institutional video about Digital Signage for Ya Mogu! Digital Communication.',
  'Co-produção e consultoria em vídeo institucional sobre Digital Signage para Ya Mogu! Comunicação Digital. Projeto que explicou de forma didática o conceito de Digital Signage, demonstrando aplicações práticas e benefícios da tecnologia. A Azimut foi responsável pela co-produção, consultoria técnica e criação de elementos visuais, combinando expertise técnica com comunicação clara.',
  'Co-production and consulting in institutional video about Digital Signage for Ya Mogu! Digital Communication. Project that explained the Digital Signage concept in an educational way, demonstrating practical applications and benefits of the technology. Azimut was responsible for co-production, technical consulting and creation of visual elements, combining technical expertise with clear communication.',
  'Rio de Janeiro',
  'Brasil',
  2013,
  'Ya Mogu! Comunicação Digital',
  'audiovisual',
  ARRAY['motion', 'corporate'],
  'corporate',
  ARRAY['Motion Graphics'],
  ARRAY['producao', 'consultoria'],
  ARRAY['filme'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. VÍDEOS DIGITAL SIGNAGE X-PICANHA (2013-2014)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year, duration,
  client, type,
  "projectCategory", industry, technologies, "azimutRole", "workType",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'videos-digital-signage-x-picanha-2013',
  'Vídeos Digital Signage X-Picanha',
  'X-Picanha Digital Signage',
  'Animações e vídeos para menu board digital da rede X-Picanha, desenvolvidos para Ya Mogu!',
  'Animations and videos for X-Picanha restaurant chain digital menu board, developed for Ya Mogu!',
  'Animações e vídeos para menu board digital da rede X-Picanha, desenvolvidos para Ya Mogu!. Projeto que criou conteúdo visual dinâmico para displays digitais em restaurantes, melhorando a experiência do cliente e aumentando vendas. A Azimut foi responsável pela criação de animações, vídeos promocionais e elementos visuais que se adaptavam ao menu digital, demonstrando expertise em Digital Signage e comunicação visual.',
  'Animations and videos for X-Picanha restaurant chain digital menu board, developed for Ya Mogu!. Project that created dynamic visual content for digital displays in restaurants, improving customer experience and increasing sales. Azimut was responsible for creating animations, promotional videos and visual elements that adapted to the digital menu, demonstrating expertise in Digital Signage and visual communication.',
  NULL, -- Brasil (sem cidade específica)
  'Brasil',
  2013,
  '2013-2014',
  'Ya Mogu!',
  'audiovisual',
  ARRAY['motion', 'corporate'],
  'corporate',
  ARRAY['Motion Graphics', 'Interactive'],
  ARRAY['animacao', 'producao'],
  ARRAY['filme'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. SHORT CYBERDEX (2015-2016)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Project" (
  id, slug, title, "shortTitle",
  "summaryPt", "summaryEn",
  "descriptionPt", "descriptionEn",
  city, country, year, duration,
  client, type,
  "projectCategory", industry, technologies, "azimutRole", "workType",
  status, featured, "priorityHome",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'short-cyberdex-2015',
  'Short CYBERDEX',
  'CYBERDEX',
  'Direção de arte e animação 3D em curta-metragem de animação, desenvolvido em parceria entre Singularidade e Azimut.',
  'Art direction and 3D animation in animated short film, developed in partnership between Singularidade and Azimut.',
  'Direção de arte e animação 3D em curta-metragem de animação, desenvolvido em parceria entre Singularidade e Azimut. Projeto que combinou narrativa futurista com animação 3D de alta qualidade, demonstrando a evolução técnica da Azimut ao longo dos anos. A empresa foi responsável pela direção de arte, modelagem 3D, animação e efeitos visuais, criando um universo visual único e imersivo.',
  'Art direction and 3D animation in animated short film, developed in partnership between Singularidade and Azimut. Project that combined futuristic narrative with high-quality 3D animation, demonstrating Azimut''s technical evolution over the years. The company was responsible for art direction, 3D modeling, animation and visual effects, creating a unique and immersive visual universe.',
  'Rio de Janeiro',
  'Brasil',
  2015,
  '2015-2016',
  'Singularidade + Azimut',
  'audiovisual',
  ARRAY['motion'],
  'entertainment',
  ARRAY['3D', 'Motion Graphics', 'VFX'],
  ARRAY['direcao', 'animacao', 'producao'],
  ARRAY['filme'],
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
  industry,
  "workType",
  technologies
FROM "Project"
WHERE slug IN (
  'curta-3d-o-saci-1997',
  'clipe-nao-importa-por-que-2011',
  'video-o-que-e-digital-signage-2013',
  'videos-digital-signage-x-picanha-2013',
  'short-cyberdex-2015'
)
ORDER BY year ASC;
