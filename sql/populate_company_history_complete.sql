-- ═══════════════════════════════════════════════════════════════
-- POPULAÇÃO COMPLETA DA TABELA CompanyHistory
-- Baseado na trajetória detalhada de Ranz Ranzenberger / Azimut
-- Data: 2026-01-20
-- ═══════════════════════════════════════════════════════════════

BEGIN;

-- Limpar dados existentes (se quiser recomeçar do zero)
-- DELETE FROM "CompanyHistory";

-- ═══════════════════════════════════════════════════════════════
-- ANOS 80-90: FORMAÇÃO E PRIMEIROS PASSOS
-- ═══════════════════════════════════════════════════════════════

-- 1980s: Início (computador DOS)
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(1980, 'milestone', 'Primeiros Passos em Computação', 'First Steps in Computing', 'Primeros Pasos en Computación', 'Premiers Pas en Informatique',
'Aquisição de um dos primeiros computadores pessoais com sistema DOS. Formação em escolas de arte em Florianópolis (Fundação Catarinense de Cultura e CIC).', 
'Acquisition of one of the first personal computers with DOS system. Art school training in Florianópolis.',
'💻', 5);

-- 1990s: Engenharia e Formação
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1990, 'milestone', 'Formação Acadêmica em Tecnologia', 'Academic Training in Technology', 'Formación Académica en Tecnología', 'Formation Académique en Technologie',
'Engenharia da Computação e Sistemas de Análise no Instituto Brasileiro de Pesquisas em Informática.',
'Computer Engineering and Systems Analysis at Brazilian Institute of Computer Research.',
'🎓', 10,
ARRAY['Engenharia da Computação', 'Sistemas de Análise (IBPI)', 'Pós-graduação em Análise de Sistemas (1994)'],
ARRAY['Computer Engineering', 'Systems Analysis (IBPI)', 'Postgraduate in Systems Analysis (1994)']
);

-- 1995: PUC-RIO + Projeto Pioneiro
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1995, 'milestone', 'PUC-RIO + Projeto Multimídia Pioneiro', 'PUC-RIO + Pioneer Multimedia Project', 'PUC-RIO + Proyecto Multimedia Pionero', 'PUC-RIO + Projet Multimédia Pionnier',
'Computação Gráfica Aplicada e Multimídia na PUC-RIO. Criação do IMAGE PROJECT - um dos primeiros sistemas multimídia do Brasil.',
'Applied Computer Graphics and Multimedia at PUC-RIO. Created IMAGE PROJECT - one of Brazil''s first multimedia systems.',
'🚀', true, 15,
ARRAY['Curso de extensão PUC-RIO', '4º lugar Prêmio Qualidade Interna', 'IMAGE PROJECT: quiosque touch screen', 'Um dos primeiros websites do Brasil (1995-1996)', 'Estágio CVM - programação de sistemas'],
ARRAY['PUC-RIO extension course', '4th place Internal Quality Award', 'IMAGE PROJECT: touch screen kiosk', 'One of Brazil''s first websites (1995-1996)', 'CVM internship - systems programming']
);

-- ═══════════════════════════════════════════════════════════════
-- 1996-2000: FUNDAÇÃO E CONSOLIDAÇÃO
-- ═══════════════════════════════════════════════════════════════

-- 1996: Fundação ArchiCAD Brasil + 3DS MAX
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1996, 'milestone', 'Fundação - ArchiCAD Brasil', 'Foundation - ArchiCAD Brasil', 'Fundación - ArchiCAD Brasil', 'Fondation - ArchiCAD Brasil',
'Início das atividades com computação gráfica e maquetes virtuais. Primeiro workshop de 3D Studio Max no Rio de Janeiro.',
'Start of activities with computer graphics and virtual models. First 3D Studio Max workshop in Rio de Janeiro.',
'🏗️', true, 20,
ARRAY['Testou versão pré-lançamento do 3DS MAX', 'Primeiro workshop 3DS MAX no Rio', 'Pioneiros em Maquete Virtual no Brasil', 'Início da parceria Autodesk'],
ARRAY['Tested pre-release version of 3DS MAX', 'First 3DS MAX workshop in Rio', 'Pioneers in Virtual Mockup in Brazil', 'Start of Autodesk partnership']
);

-- 1996-2018: Autodesk Partnership
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1996, 2018, 'partnership', 'Autodesk - Centro de Treinamento Oficial', 'Autodesk - Official Training Center', 'Autodesk - Centro de Capacitación Oficial', 'Autodesk - Centre de Formation Officiel',
'Único centro de treinamento Autodesk autorizado na América do Sul por mais de 20 anos.',
'Only authorized Autodesk training center in South America for over 20 years.',
'🎓', true, 25,
ARRAY['Centro de Treinamento oficial', 'Demo Artist Autodesk Discreet (1996-2008)', 'Application Engineer América do Sul', 'Único Flame Trainer certificado no Brasil', 'Revendedor autorizado Autodesk e Kinetix'],
ARRAY['Official Training Center', 'Demo Artist Autodesk Discreet (1996-2008)', 'Application Engineer South America', 'Only certified Flame Trainer in Brazil', 'Authorized Autodesk and Kinetix reseller']
);

-- 1996-2000: Anima Mundi
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(1996, 2000, 'partnership', 'Anima Mundi - Workshop Oficial', 'Anima Mundi - Official Workshop', 'Anima Mundi - Workshop Oficial', 'Anima Mundi - Atelier Officiel',
'Responsável pelo Workshop de Animação 3D Open Studio no Festival Internacional de Animação Anima Mundi.',
'Responsible for 3D Animation Open Studio Workshop at Anima Mundi International Animation Festival.',
'🎬', true, 28);

-- 1997: Fundação 3DGraphics
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1997, 'milestone', '3DGraphics - Fundação da Empresa', '3DGraphics - Company Foundation', '3DGraphics - Fundación de la Empresa', '3DGraphics - Fondation de l''Entreprise',
'Fundação da 3DGraphics no Rio de Janeiro por Ranz Ranzenberger. Primeiros clientes: TV Globo, TV Manchete, Multiplan.',
'Foundation of 3DGraphics in Rio de Janeiro by Ranz Ranzenberger. First clients: TV Globo, TV Manchete, Multiplan.',
'🎬', true, 30,
ARRAY['Diretor e instrutor de animação', 'Designer gráfico', 'Clientes: TVE, TV Manchete, TV Globosat, Multiplan, TV Globo', 'Consultoria Videographics TV Globo (Hans Donner)', 'Trabalhou em cenografia, arte para jornalismo, chamadas'],
ARRAY['Director and animation instructor', 'Graphic designer', 'Clients: TVE, TV Manchete, TV Globosat, Multiplan, TV Globo', 'TV Globo Videographics consulting (Hans Donner)', 'Worked in scenography, journalism art, program calls']
);

-- 1997-1998: Curta "O Saci"
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1997, 1998, 'project', 'Curta de Animação 3D "O Saci"', '3D Animation Short "O Saci"', 'Cortometraje de Animación 3D "O Saci"', 'Court Métrage d''Animation 3D "O Saci"',
'Parceria com TAL Produções Artísticas. Um dos primeiros curtas 3D brasileiros, premiado no Festival de Curtas do MinC.',
'Partnership with TAL Artistic Productions. One of the first Brazilian 3D shorts, awarded at MinC Short Film Festival.',
'🏆', true, 35,
ARRAY['Direção: Mauro Heitor', 'Animador e supervisor de efeitos', 'Prêmio Festival MinC', 'Apresentado no lançamento 3DS MAX 2 (1998)', 'Matéria Jornal do Brasil: "O real em três dimensões"'],
ARRAY['Direction: Mauro Heitor', 'Animator and effects supervisor', 'MinC Festival Award', 'Presented at 3DS MAX 2 launch (1998)', 'Jornal do Brasil article: "The real in three dimensions"']
);

-- 1998: AZMT Computação
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(1998, 'milestone', 'AZMT Computação e Produções Cinematográficas', 'AZMT Computing and Cinematographic Productions', 'AZMT Computación y Producciones Cinematográficas', 'AZMT Informatique et Productions Cinématographiques',
'Evolução da 3DGraphics para AZMT Computação e Produções Cinematográficas.',
'Evolution from 3DGraphics to AZMT Computing and Cinematographic Productions.',
'🎬', 40);

-- 1998: Siggraph + Discreet
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1998, 'partnership', 'Siggraph + Discreet Logic (Montreal)', 'Siggraph + Discreet Logic (Montreal)', 'Siggraph + Discreet Logic (Montreal)', 'Siggraph + Discreet Logic (Montréal)',
'Primeira participação no Siggraph (Orlando, EUA). Início do relacionamento com Discreet Logic Montreal, Canadá.',
'First participation at Siggraph (Orlando, USA). Start of relationship with Discreet Logic Montreal, Canada.',
'🇨🇦', true, 45,
ARRAY['Maior evento de CG do mundo', 'Relacionamento com Discreet Logic', 'Projeção internacional'],
ARRAY['World''s largest CG event', 'Relationship with Discreet Logic', 'International projection']
);

-- 1999: Projeto "O Boi Voador"
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1999, 'project', 'Artvoodoo - Projeto "O Boi Voador"', 'Artvoodoo - "O Boi Voador" Project', 'Artvoodoo - Proyecto "O Boi Voador"', 'Artvoodoo - Projet "O Boi Voador"',
'Parceria AZMT + ArtvooDoo. Projeto de animação 3D sobre o príncipe Maurício de Nassau proposto ao Departamento de Cultura do Recife.',
'AZMT + ArtvooDoo partnership. 3D animation project about Prince Maurice of Nassau proposed to Recife Department of Culture.',
'🎨', 50,
ARRAY['Parceria AZMT + Artvoodoo', 'Animação 3D histórica', 'Proposta Departamento de Cultura Recife'],
ARRAY['AZMT + Artvoodoo partnership', 'Historical 3D animation', 'Recife Department of Culture proposal']
);

-- 1999-2001: Expansão Norte-Nordeste
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1999, 2001, 'location', 'Expansão Norte-Nordeste', 'North-Northeast Expansion', 'Expansión Norte-Nordeste', 'Expansion Nord-Nord-Est',
'Cursos, palestras e workshops de animação 3D e VFX em Recife, Fortaleza, Maranhão e Belém.',
'Courses, lectures and workshops on 3D animation and VFX in Recife, Fortaleza, Maranhão and Belém.',
'🌍', true, 55,
ARRAY['Cursos em Recife, Fortaleza, Maranhão, Belém', 'Serviços para redes de TV e produtoras', 'Instituto de Arte Contemporânea (Recife)', 'Workshop "O real em três dimensões"'],
ARRAY['Courses in Recife, Fortaleza, Maranhão, Belém', 'Services for TV networks and producers', 'Contemporary Art Institute (Recife)', 'Workshop "The real in three dimensions"']
);

-- ═══════════════════════════════════════════════════════════════
-- 2000-2005: RECONHECIMENTO NACIONAL E INTERNACIONAL
-- ═══════════════════════════════════════════════════════════════

-- 2000: Circuito Universitário
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2000, 'milestone', 'Circuito Universitário de CG 3D', 'University Circuit of 3D CG', 'Circuito Universitario de CG 3D', 'Circuit Universitaire de CG 3D',
'Organizou e apresentou evento promovendo animação 3D, pintura digital e efeitos. Demonstrações no Brasil e EUA.',
'Organized and presented event promoting 3D animation, digital painting and effects. Demonstrations in Brazil and USA.',
'🎓', 60,
ARRAY['Serviços para Kinetix (Autodesk)', 'Serviços para Discreet Logic', 'Demonstrações Brasil e EUA'],
ARRAY['Services for Kinetix (Autodesk)', 'Services for Discreet Logic', 'Demonstrations in Brazil and USA']
);

-- 2000-2001: Games Paraná
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2000, 2001, 'project', 'Desenvolvimento de Arte para Games', 'Art Development for Games', 'Desarrollo de Arte para Games', 'Développement d''Art pour Jeux',
'Arte para games, treinamento e consultoria para empresas do Paraná: Nyx Entertainment, Syllcis Games.',
'Art for games, training and consulting for Paraná companies: Nyx Entertainment, Syllcis Games.',
'🎮', 65,
ARRAY['Nyx Entertainment', 'Syllcis Games', 'Treinamento e consultoria'],
ARRAY['Nyx Entertainment', 'Syllcis Games', 'Training and consulting']
);

-- 2001: TechnoIMAGE 2001
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2001, 'partnership', 'Discreet - TechnoIMAGE 2001 (SP)', 'Discreet - TechnoIMAGE 2001 (SP)', 'Discreet - TechnoIMAGE 2001 (SP)', 'Discreet - TechnoIMAGE 2001 (SP)',
'Convidado pela Discreet para apresentar recursos 3D no evento TechnoIMAGE 2001 em São Paulo.',
'Invited by Discreet to present 3D features at TechnoIMAGE 2001 event in São Paulo.',
'🎤', true, 70);

-- 2002: Contrato Discreet Montreal
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2002, 'partnership', 'Discreet Montreal - Training Specialist', 'Discreet Montreal - Training Specialist', 'Discreet Montreal - Especialista en Capacitación', 'Discreet Montréal - Spécialiste en Formation',
'Contratado como Training Specialist e Demo Artist. Um dos 15 especialistas certificados no mundo.',
'Hired as Training Specialist and Demo Artist. One of 15 certified specialists in the world.',
'🏆', true, 75,
ARRAY['Training Specialist', 'Demo Artist', 'Seleto grupo de 15 especialistas no mundo', 'Atividades Discreet Miami', 'Palestras: Siggraph LA, San Antonio TX', 'Annual Animation Forum Latin America'],
ARRAY['Training Specialist', 'Demo Artist', 'Select group of 15 specialists worldwide', 'Discreet Miami activities', 'Lectures: Siggraph LA, San Antonio TX', 'Annual Animation Forum Latin America']
);

-- 2003: NAB + Expansão Discreet
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2003, 'partnership', 'Discreet - Contrato Expandido NAB', 'Discreet - Expanded NAB Contract', 'Discreet - Contrato Expandido NAB', 'Discreet - Contrat Étendu NAB',
'Contrato com responsabilidades expandidas. Único contato no Brasil para área de animação Discreet/Autodesk.',
'Contract with expanded responsibilities. Only contact in Brazil for Discreet/Autodesk animation area.',
'🌟', true, 80,
ARRAY['Maior evento broadcast: NAB', 'Único contato Brasil animação Discreet', 'Contato principais empresas TV/cinema/games', 'Designer gráfico website Discreet Brasil', 'Participou início Abragames'],
ARRAY['Largest broadcast event: NAB', 'Only Brazil contact Discreet animation', 'Contact with main TV/cinema/games companies', 'Graphic designer Discreet Brasil website', 'Participated in Abragames foundation']
);

-- 2003: Games Convention + GDC
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2003, 'partnership', 'Games Convention + GDC', 'Games Convention + GDC', 'Games Convention + GDC', 'Games Convention + GDC',
'Participação em eventos internacionais de games: Leipzig (Alemanha) e GDC San Jose (EUA).',
'Participation in international game events: Leipzig (Germany) and GDC San Jose (USA).',
'🎮', 85,
ARRAY['Games Convention (Leipzig, Alemanha)', 'GDC - Game Developers Conference (San Jose, EUA)', 'Participou início Abragames'],
ARRAY['Games Convention (Leipzig, Germany)', 'GDC - Game Developers Conference (San Jose, USA)', 'Participated in Abragames foundation']
);

-- 2004-2018: Azimut Escola
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2004, 2018, 'milestone', 'Azimut Escola de Animação', 'Azimut Animation School', 'Azimut Escuela de Animación', 'Azimut École d''Animation',
'Primeira escola de animação CG Autodesk na América Latina. Formamos centenas de profissionais.',
'First CG animation school Autodesk in Latin America. We trained hundreds of professionals.',
'🎓', true, 90,
ARRAY['Cursos profissionalizantes 1-2 anos', 'CAD, 3ds Max, After Effects, Flame', 'Formamos centenas de profissionais', 'Filiais: Rio, Belém, Florianópolis', 'Sala na Estácio de Sá', 'Cursos de curta duração'],
ARRAY['Professional courses 1-2 years', 'CAD, 3ds Max, After Effects, Flame', 'Trained hundreds of professionals', 'Branches: Rio, Belém, Florianópolis', 'Room at Estácio de Sá university', 'Short-term courses']
);

-- 2005: Prêmio Digital Designer + Jornal O Globo
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2005, 'award', 'Prêmio "The Digital Designer 2005"', 'Award "The Digital Designer 2005"', 'Premio "The Digital Designer 2005"', 'Prix "The Digital Designer 2005"',
'Eleito pessoa do ano em computação gráfica. Evento no Museu de Arte Contemporânea de Niterói.',
'Elected person of the year in computer graphics. Event at Contemporary Art Museum of Niterói.',
'🏆', true, 95,
ARRAY['Pessoa do ano em CG', 'Evento MAC Niterói', 'Curadoria: Eduardo Azevedo (MultiRio)', 'Destaque Jornal O Globo: "Trabalho animado"', 'Artigos: Digital Designer Magazine, 3D1, Redpixel'],
ARRAY['Person of the year in CG', 'MAC Niterói event', 'Curated by: Eduardo Azevedo (MultiRio)', 'O Globo newspaper highlight: "Animated Work"', 'Articles: Digital Designer Magazine, 3D1, Redpixel']
);

-- 2005: Adrenaline Florianópolis
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2005, 'partnership', 'Adrenaline - Cursos Florianópolis', 'Adrenaline - Florianópolis Courses', 'Adrenaline - Cursos Florianópolis', 'Adrenaline - Cours Florianópolis',
'Cursos na famosa Games LAN-House Adrenaline em Florianópolis. Arte gráfica para Adrenaline e Aroma Café.',
'Courses at famous Games LAN-House Adrenaline in Florianópolis. Graphic art for Adrenaline and Aroma Café.',
'🎮', 100,
ARRAY['Cursos na Adrenaline (famosa LAN-House)', 'Arte gráfica Adrenaline', 'Arte gráfica Aroma Café', 'Consultoria maior empresa games Brasil'],
ARRAY['Courses at Adrenaline (famous LAN-House)', 'Adrenaline graphic art', 'Aroma Café graphic art', 'Consulting largest games company Brazil']
);

-- ═══════════════════════════════════════════════════════════════
-- 2005-2012: PROJETOS MASSIVOS DE GAMES
-- ═══════════════════════════════════════════════════════════════

-- 2005-2007: Taikodom (Hoplon)
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2005, 2007, 'project', 'Taikodom - Hoplon Infotainment', 'Taikodom - Hoplon Infotainment', 'Taikodom - Hoplon Infotainment', 'Taikodom - Hoplon Infotainment',
'Maior projeto de game desenvolvido no país. MMORPG espacial. Guiou produção de crafts, cenários e estações.',
'Largest game project developed in the country. Space MMORPG. Guided production of crafts, scenarios and stations.',
'🚀', true, 105,
ARRAY['Maior projeto game do Brasil', 'MMORPG espacial', 'Produção: crafts, cenários, estações', 'Viagens frequentes Florianópolis', 'Parceria Hoplon Infotainment'],
ARRAY['Largest game project in Brazil', 'Space MMORPG', 'Production: crafts, scenarios, stations', 'Frequent trips to Florianópolis', 'Hoplon Infotainment partnership']
);

-- 2006: Animaserra + Homenagem
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2006, 'award', 'Animaserra - Homenagem Teresópolis', 'Animaserra - Teresópolis Tribute', 'Animaserra - Homenaje Teresópolis', 'Animaserra - Hommage Teresópolis',
'Homenageado no Festival Nacional de Animação de Serra Carioca junto com Miguel Paiva. Honras da prefeitura de Teresópolis.',
'Honored at National Animation Festival of Serra Carioca alongside Miguel Paiva. Teresópolis city hall honors.',
'🏆', true, 110,
ARRAY['Painel de abertura', 'Homenagem junto com Miguel Paiva (cartunista)', 'Honras prefeitura Teresópolis', 'Apresentou recursos animação 3D', 'Entrevistas jornais e CGMAXTV'],
ARRAY['Opening panel', 'Tribute alongside Miguel Paiva (cartoonist)', 'Teresópolis city hall honors', 'Presented 3D animation features', 'Interviews newspapers and CGMAXTV']
);

-- 2005-2007: Homenagens Universidades
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(2005, 2007, 'award', 'Homenagens Acadêmicas', 'Academic Honors', 'Homenajes Académicos', 'Honneurs Académiques',
'Homenageado por instituições: Universidade Estácio de Sá e Unicarioca.',
'Honored by institutions: Estácio de Sá University and Unicarioca.',
'🎓', 115);

-- 2007-2012: Brasília Tropicalis
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2007, 2012, 'project', 'Brasília Tropicalis - Olympya', 'Brasília Tropicalis - Olympya', 'Brasília Tropicalis - Olympya', 'Brasília Tropicalis - Olympya',
'Designer gráfico para game de fotografia da natureza. Fundos SEBRAE. Parceria com Olympya Software.',
'Graphic designer for nature photography game. SEBRAE funds. Partnership with Olympya Software.',
'🌿', 120,
ARRAY['Game fotografia da natureza', 'Parceria Olympya Software', 'Financiamento SEBRAE', 'Cooperação cruzada 04/2007'],
ARRAY['Nature photography game', 'Olympya Software partnership', 'SEBRAE funding', 'Cross cooperation 04/2007']
);

-- 2007-2009: UERJ MBA
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(2007, 2009, 'partnership', 'UERJ - MBA Animação & Multimídia', 'UERJ - MBA Animation & Multimedia', 'UERJ - MBA Animación & Multimedia', 'UERJ - MBA Animation & Multimédia',
'Participação em MBA de Animação e Multimídia na Universidade do Estado do Rio de Janeiro.',
'Participation in Animation and Multimedia MBA at Rio de Janeiro State University.',
'🎓', 125);

-- 2008-2010: SENAC
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(2008, 2010, 'partnership', 'SENAC - Contrato de Cursos', 'SENAC - Course Contract', 'SENAC - Contrato de Cursos', 'SENAC - Contrat de Cours',
'Contrato para ministrar cursos de animação 3D e computação gráfica no SENAC.',
'Contract to teach 3D animation and computer graphics courses at SENAC.',
'🎓', 130);

-- 2009-2012: Futweb
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2009, 2012, 'project', 'Futweb - Game Futebol Online FINEP', 'Futweb - Online Soccer Game FINEP', 'Futweb - Game Fútbol Online FINEP', 'Futweb - Jeu Football en Ligne FINEP',
'Designer gráfico para projeto massivo de game de futebol online. Financiamento FINEP.',
'Graphic designer for massive online soccer game project. FINEP funding.',
'⚽', true, 135,
ARRAY['Game futebol online massivo', 'Parceria Olympya + AZMT', 'Financiamento FINEP (01/2009)', 'Subsídio governamental inovação'],
ARRAY['Massive online soccer game', 'Olympya + AZMT partnership', 'FINEP funding (01/2009)', 'Government innovation subsidy']
);

-- ═══════════════════════════════════════════════════════════════
-- 2010+: AZIMUT ERA MODERNA
-- ═══════════════════════════════════════════════════════════════

-- 2010: Mudança Nome + UFRJ
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2010, 'milestone', 'AZIMUT - Nome Oficial + Mestrado UFRJ', 'AZIMUT - Official Name + UFRJ Master', 'AZIMUT - Nombre Oficial + Maestría UFRJ', 'AZIMUT - Nom Officiel + Master UFRJ',
'AZMT passa oficialmente a adotar o nome Azimut. Mestrado em Mídias Criativas & Tecnologia na Educação (UFRJ).',
'AZMT officially adopts the name Azimut. Master''s in Creative Media & Technology in Education (UFRJ).',
'🎓', true, 140,
ARRAY['Nome oficial: Azimut', 'Mestrado UFRJ: Mídias Criativas', 'Trabalhou com principais empresas games Brasil', 'HOPLON, OLYMPYA, OKTAGON, Ignis, SouthLogic'],
ARRAY['Official name: Azimut', 'UFRJ Master: Creative Media', 'Worked with main Brazilian game companies', 'HOPLON, OLYMPYA, OKTAGON, Ignis, SouthLogic']
);

-- 2010: FICI + Animaeco
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2010, 'partnership', 'FICI + Animaeco - Painelista', 'FICI + Animaeco - Panelist', 'FICI + Animaeco - Panelista', 'FICI + Animaeco - Panéliste',
'Painelista no Festival Internacional de Cinema Infantil e Animaeco. Mesas redondas sobre VR em games e animação na América Latina.',
'Panelist at International Children''s Film Festival and Animaeco. Round tables on VR in games and animation in Latin America.',
'🎤', 145,
ARRAY['II Fórum FICI (agosto 23-26)', 'Evento SET (Sociedade Engenharia TV)', 'Animaeco: processo criação personagens 3D', 'Painelista VR em games', 'Com Barbara Ortiz e Marcos Magalhães'],
ARRAY['II FICI Forum (August 23-26)', 'SET event (TV Engineering Society)', 'Animaeco: 3D character creation process', 'VR in games panelist', 'With Barbara Ortiz and Marcos Magalhães']
);

-- 2015-2017: Museu Olímpico
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2015, 2017, 'project', 'Museu Olímpico do Rio', 'Olympic Museum of Rio', 'Museo Olímpico de Río', 'Musée Olympique de Rio',
'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro.',
'General Technology Director for the Olympic Museum of Rio de Janeiro.',
'🏛️', true, 150);

-- 2017: Vancouver
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2017, 'location', 'Vancouver, Canadá', 'Vancouver, Canada', 'Vancouver, Canadá', 'Vancouver, Canada',
'Expansão internacional com operações em Vancouver, British Columbia.',
'International expansion with operations in Vancouver, British Columbia.',
'🍁', true, 155);

-- 2017-atual: Gramado Festival
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2017, 'partnership', 'Festival de Gramado - Curadoria VR', 'Gramado Festival - VR Curatorship', 'Festival de Gramado - Curaduría VR', 'Festival de Gramado - Curation VR',
'Curadoria oficial de Realidade Virtual do Festival de Cinema de Gramado (desde 2017 - 8 anos consecutivos).',
'Official Virtual Reality curatorship of Gramado Film Festival (since 2017 - 8 consecutive years).',
'🎬', true, 160);

-- 2018: XRBR
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2018, 'partnership', 'XRBR - Membro Fundador', 'XRBR - Founding Member', 'XRBR - Miembro Fundador', 'XRBR - Membre Fondateur',
'Membro fundador da Associação Brasileira de Realidade Estendida.',
'Founding member of Brazilian Extended Reality Association.',
'🏆', true, 165);

-- 2018-2026: Era Atual
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2018, 'milestone', 'Azimut Projetos Audiovisuais + IA', 'Azimut Audiovisual Projects + AI', 'Azimut Proyectos Audiovisuales + IA', 'Azimut Projets Audiovisuels + IA',
'Transição para projetos audiovisuais com foco em cultura, museus, festivais e marcas. Pioneiros em IA para animação.',
'Transition to audiovisual projects focused on culture, museums, festivals and brands. Pioneers in AI for animation.',
'🤖', true, 170,
ARRAY['Instalações imersivas + IA', 'Projetos com YDreams e instituições', 'Operação binacional Brasil-Canadá', 'Foco: cultura, museus, festivais, marcas', 'Pesquisa IA para animação (desde 1997)'],
ARRAY['Immersive installations + AI', 'Projects with YDreams and institutions', 'Binational operation Brazil-Canada', 'Focus: culture, museums, festivals, brands', 'AI research for animation (since 1997)']
);

COMMIT;

-- ═══════════════════════════════════════════════════════════════
-- RESUMO: 30+ ENTRADAS HISTÓRICAS
-- ═══════════════════════════════════════════════════════════════
-- 
-- ✅ 1980s-1990s: Formação
-- ✅ 1995-1996: PUC-RIO + Fundação
-- ✅ 1997-1998: 3DGraphics + O Saci
-- ✅ 1998-2000: AZMT + Discreet
-- ✅ 2000-2005: Reconhecimento Nacional
-- ✅ 2002-2008: Discreet Montreal (Training Specialist)
-- ✅ 2004-2018: Azimut Escola
-- ✅ 2005-2012: Projetos Games (Taikodom, Brasília Tropicalis, Futweb)
-- ✅ 2010: Nome Azimut + Mestrado UFRJ
-- ✅ 2015-2017: Museu Olímpico
-- ✅ 2017: Vancouver + Gramado
-- ✅ 2018+: Era Moderna (XRBR, IA, Projetos Audiovisuais)
-- 
-- ═══════════════════════════════════════════════════════════════
