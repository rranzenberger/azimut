-- ═══════════════════════════════════════════════════════════════
-- PASSO 2: POPULAR TABELA CompanyHistory
-- ═══════════════════════════════════════════════════════════════
-- Execute DEPOIS do passo 1
-- ═══════════════════════════════════════════════════════════════

BEGIN;

-- 1980: Primeiros Passos
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(1980, 'milestone', 'Primeiros Passos em Computação', 'First Steps in Computing', 'Primeros Pasos en Computación', 'Premiers Pas en Informatique',
'Aquisição de um dos primeiros computadores pessoais com sistema DOS. Formação em escolas de arte em Florianópolis (Fundação Catarinense de Cultura e CIC).', 
'Acquisition of one of the first personal computers with DOS system. Art school training in Florianópolis.',
'💻', 5);

-- 1990: Formação Acadêmica
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1990, 'milestone', 'Formação Acadêmica em Tecnologia', 'Academic Training in Technology', 'Formación Académica en Tecnología', 'Formation Académique en Technologie',
'Engenharia da Computação e Sistemas de Análise no Instituto Brasileiro de Pesquisas em Informática.',
'Computer Engineering and Systems Analysis at Brazilian Institute of Computer Research.',
'🎓', 10,
ARRAY['Engenharia da Computação', 'Sistemas de Análise (IBPI)', 'Pós-graduação em Análise de Sistemas (1994)'],
ARRAY['Computer Engineering', 'Systems Analysis (IBPI)', 'Postgraduate in Systems Analysis (1994)']
);

-- 1995: PUC-RIO
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1995, 'milestone', 'PUC-RIO + Projeto Multimídia Pioneiro', 'PUC-RIO + Pioneer Multimedia Project', 'PUC-RIO + Proyecto Multimedia Pionero', 'PUC-RIO + Projet Multimédia Pionnier',
'Computação Gráfica Aplicada e Multimídia na PUC-RIO. Criação do IMAGE PROJECT - um dos primeiros sistemas multimídia do Brasil.',
'Applied Computer Graphics and Multimedia at PUC-RIO. Created IMAGE PROJECT - one of Brazil''s first multimedia systems.',
'🚀', true, 15,
ARRAY['Curso de extensão PUC-RIO', '4º lugar Prêmio Qualidade Interna', 'IMAGE PROJECT: quiosque touch screen', 'Um dos primeiros websites do Brasil (1995-1996)', 'Estágio CVM - programação de sistemas'],
ARRAY['PUC-RIO extension course', '4th place Internal Quality Award', 'IMAGE PROJECT: touch screen kiosk', 'One of Brazil''s first websites (1995-1996)', 'CVM internship - systems programming']
);

-- 1996: ArchiCAD Brasil
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1996, 'milestone', 'Fundação - ArchiCAD Brasil', 'Foundation - ArchiCAD Brasil', 'Fundación - ArchiCAD Brasil', 'Fondation - ArchiCAD Brasil',
'Início das atividades com computação gráfica e maquetes virtuais. Primeiro workshop de 3D Studio Max no Rio de Janeiro.',
'Start of activities with computer graphics and virtual models. First 3D Studio Max workshop in Rio de Janeiro.',
'🏗️', true, 20,
ARRAY['Testou versão pré-lançamento do 3DS MAX', 'Primeiro workshop 3DS MAX no Rio', 'Pioneiros em Maquete Virtual no Brasil', 'Início da parceria Autodesk'],
ARRAY['Tested pre-release version of 3DS MAX', 'First 3DS MAX workshop in Rio', 'Pioneers in Virtual Mockup in Brazil', 'Start of Autodesk partnership']
);

-- 1996-2018: Autodesk Training Center
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1996, 2018, 'partnership', 'Autodesk - Centro de Treinamento Oficial', 'Autodesk - Official Training Center', 'Autodesk - Centro de Capacitación Oficial', 'Autodesk - Centre de Formation Officiel',
'Único centro de treinamento Autodesk autorizado na América do Sul por mais de 20 anos.',
'Only authorized Autodesk training center in South America for over 20 years.',
'🎓', true, 25,
ARRAY['Centro de Treinamento oficial', 'Demo Artist Autodesk Discreet (1996-2008)', 'Application Engineer América do Sul', 'Único Flame Trainer certificado no Brasil'],
ARRAY['Official Training Center', 'Demo Artist Autodesk Discreet (1996-2008)', 'Application Engineer South America', 'Only certified Flame Trainer in Brazil']
);

-- 1996-2000: Anima Mundi
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(1996, 2000, 'partnership', 'Anima Mundi - Workshop Oficial', 'Anima Mundi - Official Workshop', 'Anima Mundi - Workshop Oficial', 'Anima Mundi - Atelier Officiel',
'Responsável pelo Workshop de Animação 3D Open Studio no Festival Internacional de Animação Anima Mundi.',
'Responsible for 3D Animation Open Studio Workshop at Anima Mundi International Animation Festival.',
'🎬', true, 28);

-- 1997: 3DGraphics
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1997, 'milestone', '3DGraphics - Fundação da Empresa', '3DGraphics - Company Foundation', '3DGraphics - Fundación de la Empresa', '3DGraphics - Fondation de l''Entreprise',
'Fundação da 3DGraphics no Rio de Janeiro por Ranz Ranzenberger. Primeiros clientes: TV Globo, TV Manchete, Multiplan.',
'Foundation of 3DGraphics in Rio de Janeiro by Ranz Ranzenberger. First clients: TV Globo, TV Manchete, Multiplan.',
'🎬', true, 30,
ARRAY['Diretor e instrutor de animação', 'Designer gráfico', 'Clientes: TVE, TV Manchete, TV Globosat, Multiplan, TV Globo', 'Consultoria Videographics TV Globo (Hans Donner)'],
ARRAY['Director and animation instructor', 'Graphic designer', 'Clients: TVE, TV Manchete, TV Globosat, Multiplan, TV Globo', 'TV Globo Videographics consulting (Hans Donner)']
);

-- 1997-1998: O Saci
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1997, 1998, 'project', 'Curta de Animação 3D "O Saci"', '3D Animation Short "O Saci"', 'Cortometraje de Animación 3D "O Saci"', 'Court Métrage d''Animation 3D "O Saci"',
'Parceria com TAL Produções Artísticas. Um dos primeiros curtas 3D brasileiros, premiado no Festival de Curtas do MinC.',
'Partnership with TAL Artistic Productions. One of the first Brazilian 3D shorts, awarded at MinC Short Film Festival.',
'🏆', true, 35,
ARRAY['Direção: Mauro Heitor', 'Animador e supervisor de efeitos', 'Prêmio Festival MinC', 'Apresentado no lançamento 3DS MAX 2 (1998)'],
ARRAY['Direction: Mauro Heitor', 'Animator and effects supervisor', 'MinC Festival Award', 'Presented at 3DS MAX 2 launch (1998)']
);

-- 1998: AZMT
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

-- 1999: O Boi Voador
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(1999, 'project', 'Artvoodoo - Projeto "O Boi Voador"', 'Artvoodoo - "O Boi Voador" Project', 'Artvoodoo - Proyecto "O Boi Voador"', 'Artvoodoo - Projet "O Boi Voador"',
'Parceria AZMT + ArtvooDoo. Projeto de animação 3D sobre o príncipe Maurício de Nassau proposto ao Departamento de Cultura do Recife.',
'AZMT + ArtvooDoo partnership. 3D animation project about Prince Maurice of Nassau proposed to Recife Department of Culture.',
'🎨', 50);

-- 1999-2001: Expansão Norte-Nordeste
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1999, 2001, 'location', 'Expansão Norte-Nordeste', 'North-Northeast Expansion', 'Expansión Norte-Nordeste', 'Expansion Nord-Nord-Est',
'Cursos, palestras e workshops de animação 3D e VFX em Recife, Fortaleza, Maranhão e Belém.',
'Courses, lectures and workshops on 3D animation and VFX in Recife, Fortaleza, Maranhão and Belém.',
'🌍', true, 55,
ARRAY['Cursos em Recife, Fortaleza, Maranhão, Belém', 'Serviços para redes de TV e produtoras'],
ARRAY['Courses in Recife, Fortaleza, Maranhão, Belém', 'Services for TV networks and producers']
);

-- 2002: Discreet Montreal Training Specialist
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2002, 'partnership', 'Discreet Montreal - Training Specialist', 'Discreet Montreal - Training Specialist', 'Discreet Montreal - Especialista en Capacitación', 'Discreet Montréal - Spécialiste en Formation',
'Contratado como Training Specialist e Demo Artist. Um dos 15 especialistas certificados no mundo.',
'Hired as Training Specialist and Demo Artist. One of 15 certified specialists in the world.',
'🏆', true, 75,
ARRAY['Training Specialist', 'Demo Artist', 'Seleto grupo de 15 especialistas no mundo', 'Palestras: Siggraph LA, San Antonio TX'],
ARRAY['Training Specialist', 'Demo Artist', 'Select group of 15 specialists worldwide', 'Lectures: Siggraph LA, San Antonio TX']
);

-- 2004-2018: Azimut Escola
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2004, 2018, 'milestone', 'Azimut Escola de Animação', 'Azimut Animation School', 'Azimut Escuela de Animación', 'Azimut École d''Animation',
'Primeira escola de animação CG Autodesk na América Latina. Formamos centenas de profissionais.',
'First CG animation school Autodesk in Latin America. We trained hundreds of professionals.',
'🎓', true, 90,
ARRAY['Cursos profissionalizantes 1-2 anos', 'CAD, 3ds Max, After Effects, Flame', 'Formamos centenas de profissionais', 'Filiais: Rio, Belém, Florianópolis'],
ARRAY['Professional courses 1-2 years', 'CAD, 3ds Max, After Effects, Flame', 'Trained hundreds of professionals', 'Branches: Rio, Belém, Florianópolis']
);

-- 2005: Prêmio Digital Designer
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2005, 'award', 'Prêmio "The Digital Designer 2005"', 'Award "The Digital Designer 2005"',
'Eleito pessoa do ano em computação gráfica. Evento no Museu de Arte Contemporânea de Niterói.',
'Elected person of the year in computer graphics. Event at Contemporary Art Museum of Niterói.',
'🏆', true, 95,
ARRAY['Pessoa do ano em CG', 'Evento MAC Niterói', 'Destaque Jornal O Globo'],
ARRAY['Person of the year in CG', 'MAC Niterói event', 'O Globo newspaper highlight']
);

-- 2005-2007: Taikodom
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2005, 2007, 'project', 'Taikodom - Hoplon Infotainment', 'Taikodom - Hoplon Infotainment',
'Maior projeto de game desenvolvido no país. MMORPG espacial. Guiou produção de crafts, cenários e estações.',
'Largest game project developed in the country. Space MMORPG. Guided production of crafts, scenarios and stations.',
'🚀', true, 105,
ARRAY['Maior projeto game do Brasil', 'MMORPG espacial', 'Parceria Hoplon Infotainment'],
ARRAY['Largest game project in Brazil', 'Space MMORPG', 'Hoplon Infotainment partnership']
);

-- 2009-2012: Futweb
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2009, 2012, 'project', 'Futweb - Game Futebol Online FINEP', 'Futweb - Online Soccer Game FINEP',
'Designer gráfico para projeto massivo de game de futebol online. Financiamento FINEP.',
'Graphic designer for massive online soccer game project. FINEP funding.',
'⚽', true, 135,
ARRAY['Game futebol online massivo', 'Parceria Olympya + AZMT', 'Financiamento FINEP'],
ARRAY['Massive online soccer game', 'Olympya + AZMT partnership', 'FINEP funding']
);

-- 2010: AZIMUT Nome Oficial
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2010, 'milestone', 'AZIMUT - Nome Oficial + Mestrado UFRJ', 'AZIMUT - Official Name + UFRJ Master',
'AZMT passa oficialmente a adotar o nome Azimut. Mestrado em Mídias Criativas & Tecnologia na Educação (UFRJ).',
'AZMT officially adopts the name Azimut. Master in Creative Media & Technology in Education (UFRJ).',
'🎓', true, 140,
ARRAY['Nome oficial: Azimut', 'Mestrado UFRJ: Mídias Criativas'],
ARRAY['Official name: Azimut', 'UFRJ Master: Creative Media']
);

-- 2015-2017: Museu Olímpico
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2015, 2017, 'project', 'Museu Olímpico do Rio', 'Olympic Museum of Rio',
'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro.',
'General Technology Director for the Olympic Museum of Rio de Janeiro.',
'🏛️', true, 150);

-- 2017: Vancouver
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2017, 'location', 'Vancouver, Canadá', 'Vancouver, Canada',
'Expansão internacional com operações em Vancouver, British Columbia.',
'International expansion with operations in Vancouver, British Columbia.',
'🍁', true, 155);

-- 2017: Gramado Festival
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2017, 'partnership', 'Festival de Gramado - Curadoria VR', 'Gramado Festival - VR Curatorship',
'Curadoria oficial de Realidade Virtual do Festival de Cinema de Gramado (desde 2017 - 8 anos consecutivos).',
'Official Virtual Reality curatorship of Gramado Film Festival (since 2017 - 8 consecutive years).',
'🎬', true, 160);

-- 2018: XRBR
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2018, 'partnership', 'XRBR - Membro Fundador', 'XRBR - Founding Member',
'Membro fundador da Associação Brasileira de Realidade Estendida.',
'Founding member of Brazilian Extended Reality Association.',
'🏆', true, 165);

-- 2018-2026: Era Atual
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2018, 'milestone', 'Azimut Projetos Audiovisuais + IA', 'Azimut Audiovisual Projects + AI',
'Transição para projetos audiovisuais com foco em cultura, museus, festivais e marcas. Pioneiros em IA para animação.',
'Transition to audiovisual projects focused on culture, museums, festivals and brands. Pioneers in AI for animation.',
'🤖', true, 170,
ARRAY['Instalações imersivas + IA', 'Operação binacional Brasil-Canadá', 'Foco: cultura, museus, festivais'],
ARRAY['Immersive installations + AI', 'Binational operation Brazil-Canada', 'Focus: culture, museums, festivals']
);

COMMIT;
