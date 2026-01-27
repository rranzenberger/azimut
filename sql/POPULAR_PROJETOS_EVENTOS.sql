-- ═══════════════════════════════════════════════════════════════
-- POPULAR PROJETOS DE EVENTOS - Azimut
-- ═══════════════════════════════════════════════════════════════
-- Insere 6 projetos de eventos históricos da Azimut
-- Campos faltantes podem ser completados depois no backoffice
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. 3D ANIMATION OPEN STUDIO – ANIMA MUNDI (1996-2000)
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
  '3d-animation-open-studio-anima-mundi-1996',
  '3D Animation Open Studio – Anima Mundi',
  'Anima Mundi Open Studio',
  'Atividades em estúdio aberto de animação 3D durante o Festival Anima Mundi no Rio de Janeiro.',
  'Activities in open 3D animation studio during Anima Mundi Festival in Rio de Janeiro.',
  'Atividades em estúdio aberto de animação 3D durante o Festival Anima Mundi no Rio de Janeiro. Evento que permitiu ao público conhecer de perto o processo de criação de animações 3D, demonstrando técnicas e ferramentas utilizadas pela Azimut. Um dos primeiros eventos educacionais da empresa, consolidando sua posição como referência em animação 3D no Brasil.',
  'Activities in open 3D animation studio during Anima Mundi Festival in Rio de Janeiro. Event that allowed the public to see up close the 3D animation creation process, demonstrating techniques and tools used by Azimut. One of the company''s first educational events, consolidating its position as a reference in 3D animation in Brazil.',
  'Rio de Janeiro',
  'Brasil',
  1996,
  '1996-2000',
  'Anima Mundi',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['treinamento', 'organizacao'],
  ARRAY['workshop', 'evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. DIGITAL DESIGNER – A CONSAGRAÇÃO DA ARTE DIGITAL (2005)
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
  'digital-designer-consagracao-arte-digital-2005',
  'Digital Designer – A Consagração da Arte Digital',
  'Digital Designer 2005',
  'Premiação e participação em evento de arte digital no MAC Niterói. Reconhecimento como Pessoa do Ano em Computação Gráfica no Brasil.',
  'Award and participation in digital art event at MAC Niterói. Recognition as Person of the Year in Computer Graphics in Brazil.',
  'Premiação e participação em evento de arte digital no MAC Niterói. Evento histórico onde a Azimut foi reconhecida como "Pessoa do Ano em Computação Gráfica no Brasil" pela Revista Digital Designer. Este prêmio consolidou a posição da Azimut como líder em tecnologia 3D e arte digital no país, reconhecendo 9 anos de inovação e pioneirismo.',
  'Award and participation in digital art event at MAC Niterói. Historic event where Azimut was recognized as "Person of the Year in Computer Graphics in Brazil" by Digital Designer Magazine. This award consolidated Azimut''s position as a leader in 3D technology and digital art in the country, recognizing 9 years of innovation and pioneering.',
  'Niterói',
  'Brasil',
  2005,
  'Revista Digital Designer / MAC',
  'event',
  ARRAY['education'],
  'cultural',
  ARRAY['3D'],
  ARRAY['producao'],
  ARRAY['evento'],
  'PUBLISHED',
  true, -- Featured: prêmio importante
  8, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. CIRCUITO UNIVERSITÁRIO DE COMPUTAÇÃO GRÁFICA 3D (2000)
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
  'circuito-universitario-computacao-grafica-3d-2000',
  'Circuito Universitário de Computação Gráfica 3D',
  'Circuito Universitário 3D',
  'Organização e apresentação de circuito universitário de computação gráfica 3D em diversas universidades do Brasil.',
  'Organization and presentation of university circuit of 3D computer graphics at various universities in Brazil.',
  'Organização e apresentação de circuito universitário de computação gráfica 3D em diversas universidades do Brasil. Projeto educacional que levou conhecimento sobre animação 3D e computação gráfica para estudantes universitários em todo o país. A Azimut foi responsável pela organização, palestras e demonstrações práticas, formando uma geração de profissionais em 3D.',
  'Organization and presentation of university circuit of 3D computer graphics at various universities in Brazil. Educational project that brought knowledge about 3D animation and computer graphics to university students across the country. Azimut was responsible for organization, lectures and practical demonstrations, training a generation of 3D professionals.',
  NULL, -- Brasil (circuito nacional)
  'Brasil',
  2000,
  'AZMT / 3DGraphics',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['organizacao', 'treinamento', 'palestra'],
  ARRAY['palestra', 'workshop', 'evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. ANIMASERRA – FESTIVAL DE ANIMAÇÃO (2006-2007)
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
  'animaserra-festival-animacao-2006',
  'Animaserra – Festival de Animação',
  'Animaserra',
  'Painel de abertura, palestras e homenagens no Festival de Animação Animaserra em Teresópolis.',
  'Opening panel, lectures and tributes at Animaserra Animation Festival in Teresópolis.',
  'Painel de abertura, palestras e homenagens no Festival de Animação Animaserra em Teresópolis, realizado em parceria com SESC. A Azimut participou ativamente do festival, realizando painel de abertura, palestras sobre animação 3D e recebendo homenagens por sua contribuição à indústria de animação brasileira.',
  'Opening panel, lectures and tributes at Animaserra Animation Festival in Teresópolis, held in partnership with SESC. Azimut actively participated in the festival, conducting opening panel, lectures on 3D animation and receiving tributes for its contribution to the Brazilian animation industry.',
  'Teresópolis',
  'Brasil',
  2006,
  '2006-2007',
  'Animaserra / SESC',
  'event',
  ARRAY['education'],
  'cultural',
  ARRAY['3D'],
  ARRAY['palestra', 'organizacao'],
  ARRAY['palestra', 'evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. AUTODESK UNIVERSITY BRAZIL – VISUAL FX (2012)
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
  'autodesk-university-brazil-visual-fx-2012',
  'Autodesk University Brazil – Visual FX',
  'Autodesk University Visual FX',
  'Palestra sobre Visual FX com Smoke e 3ds Max no Autodesk University Brazil em São Paulo.',
  'Lecture on Visual FX with Smoke and 3ds Max at Autodesk University Brazil in São Paulo.',
  'Palestra sobre Visual FX com Smoke e 3ds Max no Autodesk University Brazil em São Paulo. Evento técnico de alto nível onde a Azimut compartilhou expertise em efeitos visuais, demonstrando workflows avançados com ferramentas Autodesk. A palestra abordou técnicas de composição, color grading e integração de VFX em produções audiovisuais.',
  'Lecture on Visual FX with Smoke and 3ds Max at Autodesk University Brazil in São Paulo. High-level technical event where Azimut shared expertise in visual effects, demonstrating advanced workflows with Autodesk tools. The lecture covered composition techniques, color grading and VFX integration in audiovisual productions.',
  'São Paulo',
  'Brasil',
  2012,
  'Autodesk University Brazil',
  'event',
  ARRAY['education', 'corporate'],
  'corporate',
  ARRAY['3D', 'VFX'],
  ARRAY['treinamento', 'palestra'],
  ARRAY['palestra'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 6. AUTODESK UNIVERSITY BRAZIL – VIRTUAL SET DESIGN (2014)
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
  'autodesk-university-brazil-virtual-set-design-2014',
  'Autodesk University Brazil – Virtual Set Design',
  'Autodesk University Virtual Set',
  'Palestra sobre produção de cenários virtuais no Autodesk University Brazil em São Paulo.',
  'Lecture on virtual set production at Autodesk University Brazil in São Paulo.',
  'Palestra sobre produção de cenários virtuais no Autodesk University Brazil em São Paulo. Apresentação técnica sobre criação de sets virtuais para produções audiovisuais, demonstrando como tecnologia 3D pode substituir ou complementar sets físicos, reduzindo custos e aumentando flexibilidade criativa. A Azimut compartilhou cases reais e melhores práticas.',
  'Lecture on virtual set production at Autodesk University Brazil in São Paulo. Technical presentation on creating virtual sets for audiovisual productions, demonstrating how 3D technology can replace or complement physical sets, reducing costs and increasing creative flexibility. Azimut shared real cases and best practices.',
  'São Paulo',
  'Brasil',
  2014,
  'Autodesk University Brazil',
  'event',
  ARRAY['education', 'corporate'],
  'corporate',
  ARRAY['3D', 'VFX'],
  ARRAY['treinamento', 'palestra'],
  ARRAY['palestra'],
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
  "workType"
FROM "Project"
WHERE slug IN (
  '3d-animation-open-studio-anima-mundi-1996',
  'digital-designer-consagracao-arte-digital-2005',
  'circuito-universitario-computacao-grafica-3d-2000',
  'animaserra-festival-animacao-2006',
  'autodesk-university-brazil-visual-fx-2012',
  'autodesk-university-brazil-virtual-set-design-2014'
)
ORDER BY year ASC;
