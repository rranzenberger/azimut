-- ═══════════════════════════════════════════════════════════════
-- POPULAR PROJETOS COMPLETO - Azimut (Lista Consolidada)
-- ═══════════════════════════════════════════════════════════════
-- Insere projetos históricos da Azimut que ainda não foram inseridos
-- Alguns projetos já foram criados em scripts anteriores (Games, Eventos, Audiovisual, Renders)
-- Este script adiciona os projetos que faltam
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- PROJETOS JÁ CRIADOS (NÃO INSERIR NOVAMENTE):
-- ═══════════════════════════════════════════════════════════════
-- ✅ 3D Animation Open Studio – Anima Mundi (1996-2000) - Eventos
-- ✅ Curta 3D O SACI (1997-1998) - Audiovisual
-- ✅ Mankind (1998) - Games
-- ✅ O Boi Voador (1999) - Games
-- ✅ Circuito Universitário 3D (2000) - Eventos
-- ✅ Digital Designer 2005 - Eventos
-- ✅ Taikodom (2006-2007) - Games
-- ✅ Animaserra (2006-2007) - Eventos
-- ✅ Brasilia Tropicalis (2007-2012) - Games
-- ✅ Futweb (2009-2012) - Games
-- ✅ Clipe Não importa por quê (2011) - Audiovisual
-- ✅ Autodesk University Visual FX (2012) - Eventos
-- ✅ Vídeo Digital Signage (2013) - Audiovisual
-- ✅ Vídeos X-Picanha (2013-2014) - Audiovisual
-- ✅ Autodesk University Virtual Set (2014) - Eventos
-- ✅ CYBERDEX (2015-2016) - Audiovisual
-- ✅ FMC Offshore (2012-2015) - Renders
-- ✅ Maquetes Arquitetura (2010-2015) - Renders

-- ═══════════════════════════════════════════════════════════════
-- NOVOS PROJETOS A INSERIR:
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. TCC - SISTEMA MULTIMÍDIA EM QUIOSQUE (1994-1995)
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
  'tcc-sistema-multimidia-quiosque-1994',
  'TCC - Sistema Multimídia em Quiosque',
  'TCC Multimídia Quiosque',
  'Projeto e desenvolvimento de sistema multimídia em quiosque como Trabalho de Conclusão de Curso na Faculdade Carioca.',
  'Design and development of multimedia kiosk system as Final Course Project at Faculdade Carioca.',
  'Projeto e desenvolvimento de sistema multimídia em quiosque como Trabalho de Conclusão de Curso na Faculdade Carioca. Projeto que combinou programação, design, animação 2D/3D e interatividade, demonstrando desde o início a capacidade da Azimut em integrar múltiplas tecnologias para criar experiências inovadoras. Um dos primeiros projetos que estabeleceu as bases para futuras produções multimídia.',
  'Design and development of multimedia kiosk system as Final Course Project at Faculdade Carioca. Project that combined programming, design, 2D/3D animation and interactivity, demonstrating from the start Azimut''s ability to integrate multiple technologies to create innovative experiences. One of the first projects that established the foundation for future multimedia productions.',
  'Rio de Janeiro',
  'Brasil',
  1994,
  '1994-1995',
  'Faculdade Carioca',
  'education',
  ARRAY['education'],
  'education',
  ARRAY['3D', 'Interactive'],
  ARRAY['producao', 'animacao'],
  ARRAY['instalacao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. EXTENSÃO PUC-RIO - COMPUTAÇÃO GRÁFICA (1995-1997)
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
  'extensao-puc-rio-computacao-grafica-1995',
  'Extensão em Computação Gráfica e Multimídia - PUC-Rio',
  'PUC-Rio Computação Gráfica',
  'Projeto final multimídia para apresentação de condomínio residencial, incluindo telas, imagens, 3D e tours virtuais.',
  'Final multimedia project for residential condominium presentation, including screens, images, 3D and virtual tours.',
  'Projeto final multimídia desenvolvido durante extensão em Computação Gráfica e Multimídia na PUC-Rio. Projeto que criou apresentação interativa para condomínio residencial, incluindo telas touch, imagens, modelagem 3D e tours virtuais. Este projeto demonstrou a aplicação prática de tecnologias multimídia em arquitetura e imóveis, estabelecendo expertise em visualização arquitetônica.',
  'Final multimedia project developed during extension course in Computer Graphics and Multimedia at PUC-Rio. Project that created interactive presentation for residential condominium, including touch screens, images, 3D modeling and virtual tours. This project demonstrated practical application of multimedia technologies in architecture and real estate, establishing expertise in architectural visualization.',
  'Rio de Janeiro',
  'Brasil',
  1995,
  '1995-1997',
  'PUC-Rio',
  'education',
  ARRAY['education'],
  'education',
  ARRAY['3D', 'Interactive'],
  ARRAY['producao', 'animacao'],
  ARRAY['instalacao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. WORKSHOP 3D STUDIO MAX - PRIMEIRO NO RIO (1996)
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
  'workshop-3d-studio-max-primeiro-rio-1996',
  'Workshop de Apresentação do 3D Studio Max - Primeiro no Rio',
  'Workshop 3D Studio Max 1996',
  'Organização e apresentação do primeiro workshop de introdução ao 3D Studio Max no Rio de Janeiro, em parceria com Autodesk/Kinetix via 3DGraphics.',
  'Organization and presentation of the first 3D Studio Max introduction workshop in Rio de Janeiro, in partnership with Autodesk/Kinetix via 3DGraphics.',
  'Organização e apresentação do primeiro workshop de introdução ao 3D Studio Max no Rio de Janeiro, em parceria com Autodesk/Kinetix via 3DGraphics. Evento histórico que marcou a introdução do 3D Studio Max no mercado brasileiro, demonstrando a posição pioneira da Azimut em trazer tecnologias de ponta para o Brasil. O workshop estabeleceu a Azimut como referência em treinamento de software 3D.',
  'Organization and presentation of the first 3D Studio Max introduction workshop in Rio de Janeiro, in partnership with Autodesk/Kinetix via 3DGraphics. Historic event that marked the introduction of 3D Studio Max in the Brazilian market, demonstrating Azimut''s pioneering position in bringing cutting-edge technologies to Brazil. The workshop established Azimut as a reference in 3D software training.',
  'Rio de Janeiro',
  'Brasil',
  1996,
  'Autodesk / Kinetix (via 3DGraphics)',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['organizacao', 'treinamento', 'palestra'],
  ARRAY['workshop', 'evento'],
  'PUBLISHED',
  true, -- Featured: primeiro workshop no Rio
  7, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. LANÇAMENTO 3D STUDIO MAX 2 NO BRASIL (1997-1998)
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
  'lancamento-3d-studio-max-2-brasil-1997',
  'Lançamento 3D Studio Max 2 no Brasil',
  'Lançamento 3DS Max 2',
  'Organização e apresentação do lançamento do 3D Studio Max 2 no Brasil, incluindo exibição do curta "O SACI".',
  'Organization and presentation of 3D Studio Max 2 launch in Brazil, including screening of short film "O SACI".',
  'Organização e apresentação do lançamento do 3D Studio Max 2 no Brasil, em parceria com 3DGraphics e Autodesk. Evento que incluiu exibição do curta "O SACI", um dos primeiros curtas 3D do Brasil, demonstrando as capacidades do software. Este lançamento consolidou a posição da Azimut como parceira estratégica da Autodesk no Brasil.',
  'Organization and presentation of 3D Studio Max 2 launch in Brazil, in partnership with 3DGraphics and Autodesk. Event that included screening of short film "O SACI", one of Brazil''s first 3D shorts, demonstrating software capabilities. This launch consolidated Azimut''s position as Autodesk''s strategic partner in Brazil.',
  'Rio de Janeiro',
  'Brasil',
  1997,
  '1997-1998',
  '3DGraphics / Autodesk',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['organizacao', 'producao'],
  ARRAY['evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. FESTIVAL ANIMA MUNDI - PARTICIPAÇÃO (1996-2015)
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
  'festival-anima-mundi-participacao-1996',
  'Festival Anima Mundi - Participação (Diversas Edições)',
  'Anima Mundi Participação',
  'Participação com estúdio aberto, palestras e networking em animação no Festival Internacional de Animação Anima Mundi.',
  'Participation with open studio, lectures and networking in animation at Anima Mundi International Animation Festival.',
  'Participação com estúdio aberto, palestras e networking em animação no Festival Internacional de Animação Anima Mundi ao longo de quase 20 anos (1996-2015). A Azimut foi presença constante no festival, realizando estúdio aberto, palestras técnicas, demonstrações de animação 3D e networking com profissionais da indústria. Esta participação contínua consolidou a Azimut como referência em animação 3D no Brasil.',
  'Participation with open studio, lectures and networking in animation at Anima Mundi International Animation Festival over almost 20 years (1996-2015). Azimut was a constant presence at the festival, conducting open studio, technical lectures, 3D animation demonstrations and networking with industry professionals. This continuous participation consolidated Azimut as a reference in 3D animation in Brazil.',
  'Rio de Janeiro',
  'Brasil',
  1996,
  '1996-2015',
  'Anima Mundi',
  'event',
  ARRAY['education'],
  'cultural',
  ARRAY['3D'],
  ARRAY['organizacao', 'palestra'],
  ARRAY['evento', 'workshop'],
  'PUBLISHED',
  true, -- Featured: 20 anos de participação
  9, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 6. CURSOS E WORKSHOPS EM INFONORDESTE (1999-2000)
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
  'cursos-workshops-infonordeste-1999',
  'Cursos e Workshops em Infonordeste',
  'Infonordeste',
  'Minicursos e palestras sobre computação gráfica, animação 3D, efeitos e pintura digital no evento Infonordeste em Recife e Fortaleza.',
  'Mini-courses and lectures on computer graphics, 3D animation, effects and digital painting at Infonordeste event in Recife and Fortaleza.',
  'Minicursos e palestras sobre computação gráfica, animação 3D, efeitos e pintura digital no evento Infonordeste em Recife e Fortaleza. Projeto educacional que levou conhecimento técnico para o Nordeste do Brasil, formando profissionais e expandindo o mercado de computação gráfica na região. A Azimut foi responsável por múltiplas palestras e workshops técnicos.',
  'Mini-courses and lectures on computer graphics, 3D animation, effects and digital painting at Infonordeste event in Recife and Fortaleza. Educational project that brought technical knowledge to Northeast Brazil, training professionals and expanding the computer graphics market in the region. Azimut was responsible for multiple lectures and technical workshops.',
  NULL, -- Recife e Fortaleza
  'Brasil',
  1999,
  '1999-2000',
  'Evento Infonordeste',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['treinamento', 'palestra'],
  ARRAY['palestra', 'workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 7. CURSOS NO NORTE/NORDESTE (1999-2001)
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
  'cursos-norte-nordeste-1999',
  'Cursos, Palestras e Workshops no Norte/Nordeste',
  'Cursos Norte/Nordeste',
  'Cursos, consultorias e serviços para TVs e produtoras em Recife, Fortaleza, Maranhão e Belém, em parceria com IAC.',
  'Courses, consulting and services for TV stations and production companies in Recife, Fortaleza, Maranhão and Belém, in partnership with IAC.',
  'Cursos, consultorias e serviços para TVs e produtoras em Recife, Fortaleza, Maranhão e Belém, em parceria com IAC (Instituto de Arte Contemporânea). Projeto que expandiu a atuação da Azimut para o Norte e Nordeste do Brasil, oferecendo treinamento técnico, consultoria e serviços de produção para emissoras de TV e produtoras locais. Esta expansão consolidou a Azimut como referência nacional em computação gráfica.',
  'Courses, consulting and services for TV stations and production companies in Recife, Fortaleza, Maranhão and Belém, in partnership with IAC (Instituto de Arte Contemporânea). Project that expanded Azimut''s operations to North and Northeast Brazil, offering technical training, consulting and production services for TV stations and local production companies. This expansion consolidated Azimut as a national reference in computer graphics.',
  NULL, -- Múltiplas cidades
  'Brasil',
  1999,
  '1999-2001',
  'Várias instituições locais + IAC',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['treinamento', 'consultoria'],
  ARRAY['palestra', 'workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 8. PROJETOS DE GAME ARTS E CONSULTORIAS (2000-2001)
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
  'projetos-game-arts-consultorias-parana-2000',
  'Projetos de Game Arts e Consultorias (Paraná)',
  'Game Arts Paraná',
  'Desenvolvimento de artes para games, treinamento e consultoria para Nyx Entertainment, Sylicis Games e outras desenvolvedoras do Paraná.',
  'Development of game art, training and consulting for Nyx Entertainment, Sylicis Games and other Paraná developers.',
  'Desenvolvimento de artes para games, treinamento e consultoria para Nyx Entertainment, Sylicis Games e outras desenvolvedoras do Paraná. Projeto que expandiu a atuação da Azimut no mercado de games, oferecendo serviços de arte 3D, modelagem de personagens, criação de assets e treinamento de equipes. Esta experiência consolidou expertise em game development que seria aplicada em projetos futuros como Taikodom.',
  'Development of game art, training and consulting for Nyx Entertainment, Sylicis Games and other Paraná developers. Project that expanded Azimut''s operations in the games market, offering 3D art services, character modeling, asset creation and team training. This experience consolidated expertise in game development that would be applied in future projects like Taikodom.',
  NULL, -- Paraná (sem cidade específica)
  'Brasil',
  2000,
  '2000-2001',
  'Nyx Entertainment, Sylicis Games e outras',
  'game',
  ARRAY['games'],
  'entertainment',
  ARRAY['3D'],
  ARRAY['animacao', 'consultoria', 'treinamento'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 9. TECHNOIMAGE 2001 (2001)
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
  'technoimage-2001',
  'TechnoIMAGE 2001',
  'TechnoIMAGE 2001',
  'Demonstrações de recursos 3D como especialista convidado no TechnoIMAGE 2001 em São Paulo, evento realizado pelo SENAC-SP em parceria com Seneca College e Discreet.',
  '3D resource demonstrations as invited specialist at TechnoIMAGE 2001 in São Paulo, event held by SENAC-SP in partnership with Seneca College and Discreet.',
  'Demonstrações de recursos 3D como especialista convidado no TechnoIMAGE 2001 em São Paulo, evento realizado pelo SENAC-SP em parceria com Seneca College e Discreet. Evento técnico de alto nível onde a Azimut demonstrou recursos avançados de 3D Studio Max e técnicas de animação, consolidando sua posição como especialista certificado e referência técnica no Brasil.',
  '3D resource demonstrations as invited specialist at TechnoIMAGE 2001 in São Paulo, event held by SENAC-SP in partnership with Seneca College and Discreet. High-level technical event where Azimut demonstrated advanced 3D Studio Max features and animation techniques, consolidating its position as certified specialist and technical reference in Brazil.',
  'São Paulo',
  'Brasil',
  2001,
  'SENAC-SP + Seneca College + Discreet',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['palestra'],
  ARRAY['palestra', 'evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 10. SIGGRAPH - PARTICIPAÇÃO (1998-2015)
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
  'siggraph-participacao-1998',
  'SIGGRAPH - Participação (Várias Edições)',
  'SIGGRAPH Participação',
  'Participação e palestras em múltiplas edições do SIGGRAPH, a maior conferência mundial de computação gráfica e animação.',
  'Participation and lectures at multiple SIGGRAPH editions, the world''s largest computer graphics and animation conference.',
  'Participação e palestras em múltiplas edições do SIGGRAPH (1998-2015), a maior conferência mundial de computação gráfica e animação, realizada em Orlando, Los Angeles, San Antonio e Vancouver. A Azimut participou ativamente como palestrante, demonstrou tecnologias, fez networking internacional e trouxe conhecimento de ponta para o Brasil. Esta participação contínua consolidou a Azimut como referência internacional em computação gráfica.',
  'Participation and lectures at multiple SIGGRAPH editions (1998-2015), the world''s largest computer graphics and animation conference, held in Orlando, Los Angeles, San Antonio and Vancouver. Azimut actively participated as speaker, demonstrated technologies, made international networking and brought cutting-edge knowledge to Brazil. This continuous participation consolidated Azimut as an international reference in computer graphics.',
  NULL, -- Múltiplas cidades (EUA/Canadá)
  'EUA/Canadá',
  1998,
  '1998-2015',
  'SIGGRAPH',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D', 'VFX'],
  ARRAY['palestra'],
  ARRAY['palestra', 'evento'],
  'PUBLISHED',
  true, -- Featured: participação internacional por 17 anos
  9, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 11. NAB - NATIONAL ASSOCIATION OF BROADCASTERS (2003-2015)
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
  'nab-national-association-broadcasters-2003',
  'NAB - National Association of Broadcasters',
  'NAB Participação',
  'Demonstrações de VFX e pós-produção, promoção de ferramentas Autodesk no NAB em Las Vegas, em parceria com Autodesk e SET.',
  'VFX and post-production demonstrations, promotion of Autodesk tools at NAB in Las Vegas, in partnership with Autodesk and SET.',
  'Demonstrações de VFX e pós-produção, promoção de ferramentas Autodesk no NAB (National Association of Broadcasters) em Las Vegas, em parceria com Autodesk e SET. Participação contínua (2003-2015) no maior evento mundial de broadcast e TV, onde a Azimut demonstrou expertise em VFX, pós-produção e ferramentas Autodesk para profissionais de broadcast. Esta participação consolidou a Azimut como referência em broadcast no Brasil.',
  'VFX and post-production demonstrations, promotion of Autodesk tools at NAB (National Association of Broadcasters) in Las Vegas, in partnership with Autodesk and SET. Continuous participation (2003-2015) at the world''s largest broadcast and TV event, where Azimut demonstrated expertise in VFX, post-production and Autodesk tools for broadcast professionals. This participation consolidated Azimut as a reference in broadcast in Brazil.',
  'Las Vegas',
  'EUA',
  2003,
  '2003-2015',
  'NAB / Autodesk / SET',
  'event',
  ARRAY['education', 'corporate'],
  'corporate',
  ARRAY['VFX', '3D'],
  ARRAY['palestra', 'producao'],
  ARRAY['palestra', 'evento'],
  'PUBLISHED',
  true, -- Featured: participação internacional por 12 anos
  8, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 12. EVENTOS INTERNACIONAIS - TECHNOIMAGE, SET, GDC, GAMES CONVENTION (2001-2004)
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
  'eventos-internacionais-technoimage-set-gdc-2001',
  'Eventos Internacionais - TechnoIMAGE, SET, GDC, Games Convention',
  'Eventos Internacionais',
  'Palestras, demos e networking em eventos de games e broadcast: TechnoIMAGE, SET, Trinta, GDC, Games Convention Leipzig.',
  'Lectures, demos and networking at games and broadcast events: TechnoIMAGE, SET, Trinta, GDC, Games Convention Leipzig.',
  'Palestras, demos e networking em eventos de games e broadcast realizados em São Paulo, EUA e Alemanha (2001-2004). Participação em TechnoIMAGE, SET, Trinta, GDC (Game Developers Conference) e Games Convention Leipzig, em parceria com Discreet/Autodesk, Abragames e organizadores locais. Esta participação consolidou a Azimut como referência internacional em games e broadcast.',
  'Lectures, demos and networking at games and broadcast events held in São Paulo, USA and Germany (2001-2004). Participation in TechnoIMAGE, SET, Trinta, GDC (Game Developers Conference) and Games Convention Leipzig, in partnership with Discreet/Autodesk, Abragames and local organizers. This participation consolidated Azimut as an international reference in games and broadcast.',
  NULL, -- Múltiplas cidades
  'Brasil, EUA, Alemanha',
  2001,
  '2001-2004',
  'Discreet/Autodesk, Abragames, organizadores locais',
  'event',
  ARRAY['education'],
  'entertainment',
  ARRAY['3D', 'VFX'],
  ARRAY['palestra'],
  ARRAY['palestra', 'evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 13. CURSOS EM LAN HOUSE ADRENALINE (2005)
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
  'cursos-lan-house-adrenaline-2005',
  'Cursos em LAN House Adrenaline e Trabalhos Gráficos',
  'Adrenaline Florianópolis',
  'Cursos de 3D, criação de artes para panfletos e materiais gráficos para LAN House Adrenaline e Aroma Café em Florianópolis.',
  '3D courses, creation of art for flyers and graphic materials for Adrenaline LAN House and Aroma Café in Florianópolis.',
  'Cursos de 3D, criação de artes para panfletos e materiais gráficos para LAN House Adrenaline e Aroma Café em Florianópolis. Projeto que combinou educação (cursos de 3D) com design gráfico (criação de materiais promocionais), demonstrando a versatilidade da Azimut em diferentes áreas de atuação.',
  '3D courses, creation of art for flyers and graphic materials for Adrenaline LAN House and Aroma Café in Florianópolis. Project that combined education (3D courses) with graphic design (creation of promotional materials), demonstrating Azimut''s versatility in different areas of operation.',
  'Florianópolis',
  'Brasil',
  2005,
  'Adrenaline (LAN house), Aroma Café',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['treinamento', 'producao'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 14. CONSULTORIA PARA MAIOR EMPRESA DE GAMES DE FLORIANÓPOLIS (2005-2006)
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
  'consultoria-empresa-games-florianopolis-2005',
  'Consultoria para Maior Empresa de Games de Florianópolis',
  'Consultoria Games Florianópolis',
  'Consultoria em arte de estágios e treinamento de equipe de arte para maior desenvolvedora de games de Florianópolis (Hoplon ou outra).',
  'Consulting on stage art and art team training for largest game developer in Florianópolis (Hoplon or other).',
  'Consultoria em arte de estágios e treinamento de equipe de arte para maior desenvolvedora de games de Florianópolis (Hoplon ou outra grande desenvolvedora local). Projeto que preparou a equipe de arte para o desenvolvimento de Taikodom, consolidando expertise em game art que seria aplicada no maior projeto de game do Brasil na época.',
  'Consulting on stage art and art team training for largest game developer in Florianópolis (Hoplon or other major local developer). Project that prepared the art team for Taikodom development, consolidating expertise in game art that would be applied in Brazil''s largest game project at the time.',
  'Florianópolis',
  'Brasil',
  2005,
  '2005-2006',
  'Hoplon ou outra grande desenvolvedora',
  'game',
  ARRAY['games'],
  'entertainment',
  ARRAY['3D'],
  ARRAY['consultoria', 'treinamento'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 15. CURSO FORMAÇÃO EM PRODUÇÃO DE GAMES (2010)
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
  'curso-formacao-producao-games-2010',
  'Curso Formação em Produção de Games',
  'Formação Games 2010',
  'Criação de artes, divulgação e formação profissional em produção de games, desenvolvido em parceria entre Azimut e Olympya.',
  'Creation of art, promotion and professional training in game production, developed in partnership between Azimut and Olympya.',
  'Criação de artes, divulgação e formação profissional em produção de games, desenvolvido em parceria entre Azimut e Olympya. Curso que formou profissionais em game development, combinando teoria e prática, e preparando alunos para trabalhar em projetos como Brasilia Tropicalis e Futweb. Este curso consolidou a Azimut como escola de referência em game development no Brasil.',
  'Creation of art, promotion and professional training in game production, developed in partnership between Azimut and Olympya. Course that trained professionals in game development, combining theory and practice, and preparing students to work on projects like Brasilia Tropicalis and Futweb. This course consolidated Azimut as a reference school in game development in Brazil.',
  'Rio de Janeiro',
  'Brasil',
  2010,
  'Azimut / Olympya',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D'],
  ARRAY['treinamento', 'producao'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 16. II FÓRUM FICI - CINEMA INFANTIL (2010)
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
  'ii-forum-fici-cinema-infantil-2010',
  'II Fórum de Política, Narrativas e Linguagem do Cinema Infantil (FICI)',
  'FICI 2010',
  'Palestra sobre games/visual arts em painel temático no Festival Internacional de Cinema Infantil.',
  'Lecture on games/visual arts in thematic panel at International Children''s Film Festival.',
  'Palestra sobre games/visual arts em painel temático no II Fórum de Política, Narrativas e Linguagem do Cinema Infantil (FICI) no Rio de Janeiro. Participação que conectou games e visual arts com cinema infantil, demonstrando como tecnologias interativas podem ser aplicadas em conteúdo educativo e entretenimento para crianças.',
  'Lecture on games/visual arts in thematic panel at II Forum on Policy, Narratives and Language of Children''s Cinema (FICI) in Rio de Janeiro. Participation that connected games and visual arts with children''s cinema, demonstrating how interactive technologies can be applied in educational content and entertainment for children.',
  'Rio de Janeiro',
  'Brasil',
  2010,
  'Festival Internacional de Cinema Infantil (FICI)',
  'event',
  ARRAY['education'],
  'cultural',
  ARRAY['3D'],
  ARRAY['palestra'],
  ARRAY['palestra'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 17. BROADCAST & CABLE (SET) (2010)
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
  'broadcast-cable-set-2010',
  'Evento Broadcast & Cable (SET)',
  'Broadcast & Cable 2010',
  'Atualização e participação em congresso de broadcast e TV realizado pela SET em São Paulo.',
  'Update and participation in broadcast and TV congress held by SET in São Paulo.',
  'Atualização e participação em congresso de broadcast e TV realizado pela SET (Sociedade Brasileira de Engenharia de Televisão) em São Paulo. Evento técnico que manteve a Azimut atualizada com as últimas tendências em broadcast, VFX e pós-produção para TV, consolidando expertise que seria aplicada em projetos futuros com TV Globo e TV Record.',
  'Update and participation in broadcast and TV congress held by SET (Sociedade Brasileira de Engenharia de Televisão) in São Paulo. Technical event that kept Azimut updated with latest trends in broadcast, VFX and post-production for TV, consolidating expertise that would be applied in future projects with TV Globo and TV Record.',
  'São Paulo',
  'Brasil',
  2010,
  'SET – Sociedade Brasileira de Engenharia de Televisão',
  'event',
  ARRAY['education', 'corporate'],
  'corporate',
  ARRAY['VFX'],
  ARRAY['palestra'],
  ARRAY['evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 18. ANIMAECO (2010-2011)
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
  'animaeco-2010',
  'Evento Animaeco (Animação, Games e RV)',
  'Animaeco',
  'Palestras sobre criação de personagens 3D, participação em mesas sobre games e animação no Animaeco na UFRJ Praia Vermelha.',
  'Lectures on 3D character creation, participation in panels on games and animation at Animaeco at UFRJ Praia Vermelha.',
  'Palestras sobre criação de personagens 3D, participação em mesas sobre games e animação no Animaeco (evento sobre animação, games e realidade virtual) na UFRJ Praia Vermelha, em parceria com LATEC. Evento que conectou academia, indústria e tecnologia, demonstrando a aplicação de 3D em diferentes áreas criativas.',
  'Lectures on 3D character creation, participation in panels on games and animation at Animaeco (event on animation, games and virtual reality) at UFRJ Praia Vermelha, in partnership with LATEC. Event that connected academia, industry and technology, demonstrating the application of 3D in different creative areas.',
  'Rio de Janeiro',
  'Brasil',
  2010,
  '2010-2011',
  'UFRJ / LATEC / Animaeco',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D', 'VR'],
  ARRAY['palestra'],
  ARRAY['palestra', 'evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 19. CONSULTORIAS SMOKE/FLAME PARA ORBITAL FILMES (2012-2013)
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
  'consultorias-smoke-flame-orbital-filmes-2012',
  'Consultorias de Smoke/Flame para Orbital Filmes',
  'Orbital Filmes VFX',
  'Treinamento e consultoria em VFX e edição para produtora de cinema Orbital Filmes em Florianópolis.',
  'Training and consulting in VFX and editing for film production company Orbital Filmes in Florianópolis.',
  'Treinamento e consultoria em VFX e edição para produtora de cinema Orbital Filmes em Florianópolis. Projeto que transferiu expertise em Autodesk Smoke e Flame para profissionais de cinema, consolidando a Azimut como referência em VFX e pós-produção para produções cinematográficas.',
  'Training and consulting in VFX and editing for film production company Orbital Filmes in Florianópolis. Project that transferred expertise in Autodesk Smoke and Flame to film professionals, consolidating Azimut as a reference in VFX and post-production for film productions.',
  'Florianópolis',
  'Brasil',
  2012,
  '2012-2013',
  'Orbital Filmes',
  'audiovisual',
  ARRAY['corporate'],
  'entertainment',
  ARRAY['VFX'],
  ARRAY['consultoria', 'treinamento'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 20. CONSULTORIAS PARA TV RECORD (2013)
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
  'consultorias-tv-record-2013',
  'Consultorias para TV Record',
  'TV Record VFX',
  'Curso de edição de alta performance e pós-produção em Autodesk Flame para TV Record em São Paulo.',
  'High-performance editing and post-production course in Autodesk Flame for TV Record in São Paulo.',
  'Curso de edição de alta performance e pós-produção em Autodesk Flame para TV Record em São Paulo. Projeto que transferiu expertise em ferramentas profissionais de broadcast para uma das maiores emissoras do Brasil, consolidando a Azimut como referência em treinamento para TV.',
  'High-performance editing and post-production course in Autodesk Flame for TV Record in São Paulo. Project that transferred expertise in professional broadcast tools to one of Brazil''s largest TV stations, consolidating Azimut as a reference in TV training.',
  'São Paulo',
  'Brasil',
  2013,
  'TV Record',
  'audiovisual',
  ARRAY['corporate'],
  'corporate',
  ARRAY['VFX'],
  ARRAY['consultoria', 'treinamento'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 21. CONSULTORIAS PARA YFILMES/CONTEÚDO FILMES (2013-2015)
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
  'consultorias-yfilmes-conteudo-filmes-2013',
  'Consultorias para YFilmes/Conteúdo Filmes',
  'YFilmes VFX',
  'Editor gráfico e supervisor de VFX para peças de Telecine, Ipiranga e outros clientes, desenvolvido em parceria com YFilmes/Conteúdo Filmes.',
  'Graphic editor and VFX supervisor for Telecine, Ipiranga and other clients, developed in partnership with YFilmes/Conteúdo Filmes.',
  'Editor gráfico e supervisor de VFX para peças de Telecine, Ipiranga e outros clientes, desenvolvido em parceria com YFilmes/Conteúdo Filmes no Rio de Janeiro. Projeto que aplicou expertise em VFX e pós-produção em comerciais e conteúdo para grandes marcas, demonstrando capacidade de trabalhar com agências e produtoras de alto nível.',
  'Graphic editor and VFX supervisor for Telecine, Ipiranga and other clients, developed in partnership with YFilmes/Conteúdo Filmes in Rio de Janeiro. Project that applied expertise in VFX and post-production in commercials and content for major brands, demonstrating ability to work with high-level agencies and production companies.',
  'Rio de Janeiro',
  'Brasil',
  2013,
  '2013-2015',
  'YFilmes / Conteúdo Filmes',
  'audiovisual',
  ARRAY['corporate'],
  'corporate',
  ARRAY['VFX'],
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
-- 22. CONSULTORIA TV GLOBO PROJAC (2013-2014)
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
  'consultoria-tv-globo-projac-2013',
  'Consultoria e Treinamento em TV Globo (PROJAC)',
  'TV Globo PROJAC',
  'Consultoria em 3D, texturas, composição e ambientes virtuais para TV Globo, incluindo apoio a programas como Big Brother Brasil, The Voice e novelas.',
  'Consulting in 3D, textures, composition and virtual environments for TV Globo, including support for programs like Big Brother Brasil, The Voice and soap operas.',
  'Consultoria em 3D, texturas, composição e ambientes virtuais para TV Globo no PROJAC, incluindo apoio a programas como Big Brother Brasil, The Voice e novelas. Projeto de grande escala que aplicou expertise em VFX e ambientes virtuais na maior emissora do Brasil, demonstrando capacidade de trabalhar com produções de alto nível e prazos apertados.',
  'Consulting in 3D, textures, composition and virtual environments for TV Globo at PROJAC, including support for programs like Big Brother Brasil, The Voice and soap operas. Large-scale project that applied expertise in VFX and virtual environments at Brazil''s largest TV station, demonstrating ability to work with high-level productions and tight deadlines.',
  'Rio de Janeiro',
  'Brasil',
  2013,
  '2013-2014',
  'TV Globo',
  'audiovisual',
  ARRAY['corporate'],
  'corporate',
  ARRAY['3D', 'VFX'],
  ARRAY['consultoria', 'producao'],
  ARRAY['workshop'],
  'PUBLISHED',
  true, -- Featured: TV Globo
  9, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 23. CURSOS PARA EDITORES TV BANDEIRANTES (2013-2014)
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
  'cursos-editores-tv-bandeirantes-2013',
  'Cursos para Editores de TV Bandeirantes',
  'TV Bandeirantes',
  'Treinamentos em composição e efeitos de vídeo para editores da TV Bandeirantes em São Paulo.',
  'Training in composition and video effects for TV Bandeirantes editors in São Paulo.',
  'Treinamentos em composição e efeitos de vídeo para editores da TV Bandeirantes em São Paulo. Projeto que transferiu expertise em VFX e pós-produção para profissionais de uma das maiores emissoras do Brasil, consolidando a Azimut como referência em treinamento para broadcast.',
  'Training in composition and video effects for TV Bandeirantes editors in São Paulo. Project that transferred expertise in VFX and post-production to professionals at one of Brazil''s largest TV stations, consolidating Azimut as a reference in broadcast training.',
  'São Paulo',
  'Brasil',
  2013,
  '2013-2014',
  'TV Bandeirantes',
  'audiovisual',
  ARRAY['corporate'],
  'corporate',
  ARRAY['VFX'],
  ARRAY['treinamento'],
  ARRAY['workshop'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 24. CURSOS E WORKSHOPS EM VFX/3D - AZIMUT ESCOLA (2005-2015)
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
  'cursos-workshops-vfx-3d-azimut-escola-2005',
  'Cursos e Workshops em VFX/3D - Azimut Escola',
  'Azimut Escola',
  'Direção e instrução em cursos de personagens 3D, VFX, motion design, maquete virtual e outras áreas na Azimut Escola de Animação e Computação Gráfica.',
  'Direction and instruction in courses on 3D characters, VFX, motion design, virtual models and other areas at Azimut School of Animation and Computer Graphics.',
  'Direção e instrução em cursos de personagens 3D, VFX, motion design, maquete virtual e outras áreas na Azimut Escola de Animação e Computação Gráfica no Rio de Janeiro (2005-2015). Projeto educacional de longo prazo que formou centenas de profissionais em computação gráfica, consolidando a Azimut como escola de referência no Brasil. Os cursos cobriram desde fundamentos até técnicas avançadas, preparando alunos para o mercado de trabalho.',
  'Direction and instruction in courses on 3D characters, VFX, motion design, virtual models and other areas at Azimut School of Animation and Computer Graphics in Rio de Janeiro (2005-2015). Long-term educational project that trained hundreds of professionals in computer graphics, consolidating Azimut as a reference school in Brazil. Courses covered from fundamentals to advanced techniques, preparing students for the job market.',
  'Rio de Janeiro',
  'Brasil',
  2005,
  '2005-2015',
  'Azimut Escola de Animação e Computação Gráfica',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D', 'VFX', 'Motion Graphics'],
  ARRAY['treinamento', 'direcao'],
  ARRAY['workshop', 'curso'],
  'PUBLISHED',
  true, -- Featured: 10 anos de escola
  10, -- Alta prioridade
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 25. PRODUÇÃO DE VÍDEOS INSTITUCIONAIS (2012-2015)
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
  'producao-videos-institucionais-2012',
  'Produção de Vídeos Institucionais',
  'Vídeos Institucionais',
  'Renders, ambientes virtuais e edição de vídeos para off-shore, arquitetura e publicidade, desenvolvidos para Azimut, Marina Verone, FMC offshore e outros clientes corporativos.',
  'Renders, virtual environments and video editing for off-shore, architecture and advertising, developed for Azimut, Marina Verone, FMC offshore and other corporate clients.',
  'Renders, ambientes virtuais e edição de vídeos para off-shore, arquitetura e publicidade, desenvolvidos para Azimut, Marina Verone, FMC offshore e outros clientes corporativos no Rio de Janeiro (2012-2015). Projeto que combinou expertise em 3D, VFX e produção audiovisual para criar vídeos institucionais de alta qualidade, demonstrando versatilidade em diferentes setores (offshore, arquitetura, publicidade).',
  'Renders, virtual environments and video editing for off-shore, architecture and advertising, developed for Azimut, Marina Verone, FMC offshore and other corporate clients in Rio de Janeiro (2012-2015). Project that combined expertise in 3D, VFX and audiovisual production to create high-quality institutional videos, demonstrating versatility in different sectors (offshore, architecture, advertising).',
  'Rio de Janeiro',
  'Brasil',
  2012,
  '2012-2015',
  'Azimut / Marina Verone / FMC offshore / clientes corporativos',
  'audiovisual',
  ARRAY['corporate'],
  'corporate',
  ARRAY['3D', 'VFX'],
  ARRAY['producao'],
  ARRAY['filme'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 26. PRODUÇÃO DE SITES (2010-2015)
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
  'producao-sites-2010',
  'Produção de Sites',
  'Sites Azimut',
  'Criação de sites, layout, banners e conteúdo visual para Azimut, Ecotop e loja de móveis indonésios.',
  'Creation of websites, layout, banners and visual content for Azimut, Ecotop and Indonesian furniture store.',
  'Criação de sites, layout, banners e conteúdo visual para Azimut, Ecotop e loja de móveis indonésios no Rio de Janeiro (2010-2015). Projeto que expandiu a atuação da Azimut para web design, demonstrando capacidade de criar interfaces visuais atraentes e funcionais para diferentes tipos de negócios.',
  'Creation of websites, layout, banners and visual content for Azimut, Ecotop and Indonesian furniture store in Rio de Janeiro (2010-2015). Project that expanded Azimut''s operations to web design, demonstrating ability to create attractive and functional visual interfaces for different types of businesses.',
  'Rio de Janeiro',
  'Brasil',
  2010,
  '2010-2015',
  'Azimut / Ecotop / loja de móveis indonésios',
  'corporate',
  ARRAY['corporate'],
  'corporate',
  ARRAY['Interactive'],
  ARRAY['producao'],
  ARRAY['instalacao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 27. ANIMAPARTY - PRODUÇÃO E CUADORIA (2013)
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
  'animaparty-producao-curadoria-2013',
  'Animaparty - Produção e Curadoria',
  'Animaparty',
  'Produção e curadoria de evento com palestras, workshops e convidados (cartunistas, dubladores, youtubers) no IBEU-RJ.',
  'Production and curation of event with lectures, workshops and guests (cartoonists, voice actors, youtubers) at IBEU-RJ.',
  'Produção e curadoria de evento com palestras, workshops e convidados (cartunistas, dubladores, youtubers) no Animaparty no IBEU-RJ em parceria com Azimut. Evento que conectou diferentes áreas da indústria criativa (animação, dublagem, conteúdo digital), demonstrando a capacidade da Azimut em criar eventos que agregam valor à comunidade criativa.',
  'Production and curation of event with lectures, workshops and guests (cartoonists, voice actors, youtubers) at Animaparty at IBEU-RJ in partnership with Azimut. Event that connected different areas of the creative industry (animation, dubbing, digital content), demonstrating Azimut''s ability to create events that add value to the creative community.',
  'Rio de Janeiro',
  'Brasil',
  2013,
  'Azimut / IBEU-RJ',
  'event',
  ARRAY['education'],
  'cultural',
  ARRAY['3D'],
  ARRAY['organizacao', 'curadoria'],
  ARRAY['evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 28. ANIMA MUNDI RIO 2015 - ANIMA FORUM, BUSINESS, ABCA (2015)
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
  'anima-mundi-rio-2015-forum-business-abca',
  'Anima Mundi Rio 2015 - Anima Forum, Anima Business, ABCA',
  'Anima Mundi 2015',
  'Participação em atividades integradas para profissionais de animação no Anima Mundi Rio 2015, incluindo Anima Forum, Anima Business e ABCA.',
  'Participation in integrated activities for animation professionals at Anima Mundi Rio 2015, including Anima Forum, Anima Business and ABCA.',
  'Participação em atividades integradas para profissionais de animação no Anima Mundi Rio 2015, incluindo Anima Forum, Anima Business e ABCA (Associação Brasileira de Cinema de Animação). Evento que consolidou a participação de quase 20 anos da Azimut no festival, conectando profissionais, empresas e oportunidades de negócio na indústria de animação brasileira.',
  'Participation in integrated activities for animation professionals at Anima Mundi Rio 2015, including Anima Forum, Anima Business and ABCA (Associação Brasileira de Cinema de Animação). Event that consolidated Azimut''s participation of almost 20 years at the festival, connecting professionals, companies and business opportunities in the Brazilian animation industry.',
  'Rio de Janeiro',
  'Brasil',
  2015,
  'Anima Mundi / ABCA',
  'event',
  ARRAY['education'],
  'cultural',
  ARRAY['3D'],
  ARRAY['organizacao'],
  ARRAY['evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 29. SIGGRAPH 2015 (12ª PARTICIPAÇÃO) (2015)
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
  'siggraph-2015-12a-participacao',
  'SIGGRAPH 2015 (12ª Participação)',
  'SIGGRAPH 2015',
  'Participação em conferência, festival e sessões técnicas de VFX/3D no SIGGRAPH 2015 em Los Angeles.',
  'Participation in conference, festival and technical sessions on VFX/3D at SIGGRAPH 2015 in Los Angeles.',
  'Participação em conferência, festival e sessões técnicas de VFX/3D no SIGGRAPH 2015 em Los Angeles. Esta foi a 12ª participação da Azimut no maior evento mundial de computação gráfica, consolidando quase 20 anos de presença contínua e demonstrando compromisso com atualização técnica e networking internacional.',
  'Participation in conference, festival and technical sessions on VFX/3D at SIGGRAPH 2015 in Los Angeles. This was Azimut''s 12th participation at the world''s largest computer graphics event, consolidating almost 20 years of continuous presence and demonstrating commitment to technical updates and international networking.',
  'Los Angeles',
  'EUA',
  2015,
  'SIGGRAPH',
  'event',
  ARRAY['education'],
  'education',
  ARRAY['3D', 'VFX'],
  ARRAY['palestra'],
  ARRAY['evento'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 30. DESENVOLVIMENTO PORTAL AZIMUT (2014-2015)
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
  'desenvolvimento-portal-azimut-2014',
  'Desenvolvimento de Portal e Site Azimut (Nova Versão)',
  'Portal Azimut',
  'Projeto, layout, navegação, banners e atualização visual do novo portal da escola Azimut.',
  'Project, layout, navigation, banners and visual update of new Azimut school portal.',
  'Projeto, layout, navegação, banners e atualização visual do novo portal da escola Azimut no Rio de Janeiro (2014-2015). Projeto que modernizou a presença digital da Azimut, criando interface visual atraente e funcional que refletia a qualidade e expertise da escola em computação gráfica e animação.',
  'Project, layout, navigation, banners and visual update of new Azimut school portal in Rio de Janeiro (2014-2015). Project that modernized Azimut''s digital presence, creating attractive and functional visual interface that reflected the school''s quality and expertise in computer graphics and animation.',
  'Rio de Janeiro',
  'Brasil',
  2014,
  '2014-2015',
  'Azimut',
  'corporate',
  ARRAY['corporate'],
  'corporate',
  ARRAY['Interactive'],
  ARRAY['producao'],
  ARRAY['instalacao'],
  'PUBLISHED',
  false,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 31. CRIAÇÃO DE CARTAZES, PANFLETOS E BANNERS (2010-2015)
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
  'criacao-cartazes-panfletos-banners-2010',
  'Criação de Cartazes, Panfletos e Banners',
  'Design Gráfico Azimut',
  'Design gráfico de cartazes A2, flyers A5, outdoors, mídia em metrô, banners para web e social para Azimut e Architecad.',
  'Graphic design of A2 posters, A5 flyers, billboards, subway media, web and social banners for Azimut and Architecad.',
  'Design gráfico de cartazes A2, flyers A5, outdoors, mídia em metrô, banners para web e social para Azimut e Architecad no Rio de Janeiro (2010-2015). Projeto que demonstrou expertise em design gráfico para diferentes mídias, criando materiais visuais impactantes que comunicavam efetivamente a identidade e serviços da Azimut.',
  'Graphic design of A2 posters, A5 flyers, billboards, subway media, web and social banners for Azimut and Architecad in Rio de Janeiro (2010-2015). Project that demonstrated expertise in graphic design for different media, creating impactful visual materials that effectively communicated Azimut''s identity and services.',
  'Rio de Janeiro',
  'Brasil',
  2010,
  '2010-2015',
  'Azimut / Architecad',
  'corporate',
  ARRAY['corporate'],
  'corporate',
  ARRAY['Motion Graphics'],
  ARRAY['producao'],
  ARRAY['instalacao'],
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
  'tcc-sistema-multimidia-quiosque-1994',
  'extensao-puc-rio-computacao-grafica-1995',
  'workshop-3d-studio-max-primeiro-rio-1996',
  'lancamento-3d-studio-max-2-brasil-1997',
  'festival-anima-mundi-participacao-1996',
  'cursos-workshops-infonordeste-1999',
  'cursos-norte-nordeste-1999',
  'projetos-game-arts-consultorias-parana-2000',
  'technoimage-2001',
  'siggraph-participacao-1998',
  'nab-national-association-broadcasters-2003',
  'eventos-internacionais-technoimage-set-gdc-2001',
  'cursos-lan-house-adrenaline-2005',
  'consultoria-empresa-games-florianopolis-2005',
  'curso-formacao-producao-games-2010',
  'ii-forum-fici-cinema-infantil-2010',
  'broadcast-cable-set-2010',
  'animaeco-2010',
  'consultorias-smoke-flame-orbital-filmes-2012',
  'consultorias-tv-record-2013',
  'consultorias-yfilmes-conteudo-filmes-2013',
  'consultoria-tv-globo-projac-2013',
  'cursos-editores-tv-bandeirantes-2013',
  'cursos-workshops-vfx-3d-azimut-escola-2005',
  'producao-videos-institucionais-2012',
  'producao-sites-2010',
  'animaparty-producao-curadoria-2013',
  'anima-mundi-rio-2015-forum-business-abca',
  'siggraph-2015-12a-participacao',
  'desenvolvimento-portal-azimut-2014',
  'criacao-cartazes-panfletos-banners-2010'
)
ORDER BY year ASC;
