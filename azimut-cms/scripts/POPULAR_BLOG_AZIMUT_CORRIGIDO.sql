-- ═══════════════════════════════════════════════════════════════
-- POPULAR BLOG AZIMUT COM CONTEÚDO REAL (VERSÃO CORRIGIDA)
-- ═══════════════════════════════════════════════════════════════
-- Este script popula o blog com posts reais sobre projetos da Azimut
-- Baseado em: Rio Museu Olímpico, Natal Rio Bonito, projetos VR/AR
-- ═══════════════════════════════════════════════════════════════

-- Habilitar extensão UUID se necessário
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════
-- 1️⃣ CRIAR CATEGORIAS DO BLOG
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "BlogCategory" (id, slug, "namePt", "nameEn", "nameEs", "nameFr", "color", icon, priority, "createdAt", "updatedAt")
SELECT
  uuid_generate_v4(),
  'projetos',
  'Projetos',
  'Projects',
  'Proyectos',
  'Projets',
  '#c92337',
  '🎬',
  10,
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "BlogCategory" WHERE slug = 'projetos');

INSERT INTO "BlogCategory" (id, slug, "namePt", "nameEn", "nameEs", "nameFr", "color", icon, priority, "createdAt", "updatedAt")
SELECT
  uuid_generate_v4(),
  'tecnologia',
  'Tecnologia',
  'Technology',
  'Tecnología',
  'Technologie',
  '#3b82f6',
  '💻',
  9,
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "BlogCategory" WHERE slug = 'tecnologia');

INSERT INTO "BlogCategory" (id, slug, "namePt", "nameEn", "nameEs", "nameFr", "color", icon, priority, "createdAt", "updatedAt")
SELECT
  uuid_generate_v4(),
  'cultura',
  'Cultura',
  'Culture',
  'Cultura',
  'Culture',
  '#10b981',
  '🏛️',
  8,
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "BlogCategory" WHERE slug = 'cultura');

INSERT INTO "BlogCategory" (id, slug, "namePt", "nameEn", "nameEs", "nameFr", "color", icon, priority, "createdAt", "updatedAt")
SELECT
  uuid_generate_v4(),
  'por-tras-das-cenas',
  'Por Trás das Cenas',
  'Behind the Scenes',
  'Detrás de Escena',
  'Dans les Coulisses',
  '#f59e0b',
  '🎭',
  7,
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "BlogCategory" WHERE slug = 'por-tras-das-cenas');

-- ═══════════════════════════════════════════════════════════════
-- 2️⃣ POSTS DO BLOG
-- ═══════════════════════════════════════════════════════════════

-- Post 1: Rio Museu Olímpico
INSERT INTO "BlogPost" (
  id, slug, "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn", "excerptEs", "excerptFr",
  "contentPt", "contentEn", "contentEs", "contentFr",
  "seoTitlePt", "seoTitleEn", "seoDescPt", "seoDescEn",
  status, featured, "publishedAt", "categoryId", "authorName", "readTimeMinutes", "viewCount",
  "createdAt", "updatedAt"
)
SELECT
  uuid_generate_v4(),
  'rio-museu-olimpico-montagem-instalacao',
  'Rio Museu Olímpico: A Montagem de Uma Experiência Imersiva',
  'Rio Olympic Museum: Assembling an Immersive Experience',
  'Museo Olímpico de Río: Montaje de una Experiencia Inmersiva',
  'Musée Olympique de Rio : Assemblage d''une Expérience Immersive',
  'Conheça os bastidores da montagem e instalação do Rio Museu Olímpico, um projeto que combina tecnologia, narrativa espacial e curadoria para criar uma experiência única de imersão cultural.',
  'Discover the behind-the-scenes of the Rio Olympic Museum assembly and installation, a project that combines technology, spatial storytelling, and curation to create a unique cultural immersion experience.',
  'Descubre los bastidores del montaje e instalación del Museo Olímpico de Río, un proyecto que combina tecnología, narrativa espacial y curaduría para crear una experiencia única de inmersión cultural.',
  'Découvrez les coulisses de l''assemblage et de l''installation du Musée Olympique de Rio, un projet qui combine technologie, narration spatiale et curation pour créer une expérience unique d''immersion culturelle.',
  '# Rio Museu Olímpico: A Montagem de Uma Experiência Imersiva

A Azimut foi responsável pela montagem e instalação das experiências audiovisuais do Rio Museu Olímpico, um dos projetos mais desafiadores e gratificantes da nossa trajetória.

## Tecnologias Utilizadas

- **Instalações interativas** com sensores de movimento
- **Projeções mapeadas** em superfícies tridimensionais
- **Sistemas de som espacializado** para imersão total
- **Integração de conteúdo histórico** com tecnologia contemporânea

## Processo de Montagem

O projeto envolveu meses de planejamento e execução cuidadosa, com equipe multidisciplinar trabalhando entre Brasil e Canadá para garantir qualidade internacional.

## Resultado

O museu hoje oferece uma experiência única, combinando história, tecnologia e narrativa cinematográfica para contar a história dos Jogos Olímpicos.',
  '# Rio Olympic Museum: Assembling an Immersive Experience

Azimut was responsible for the assembly and installation of the audiovisual experiences at the Rio Olympic Museum, one of the most challenging and rewarding projects in our history.

## Technologies Used

- **Interactive installations** with motion sensors
- **Mapped projections** on three-dimensional surfaces
- **Spatialized sound systems** for total immersion
- **Integration of historical content** with contemporary technology

## Assembly Process

The project involved months of planning and careful execution, with a multidisciplinary team working between Brazil and Canada to ensure international quality.

## Result

The museum now offers a unique experience, combining history, technology, and cinematic storytelling to tell the story of the Olympic Games.',
  NULL, NULL,
  'Rio Museu Olímpico: Montagem e Instalação | Blog Azimut',
  'Rio Olympic Museum: Assembly and Installation | Azimut Blog',
  'Conheça os bastidores da montagem do Rio Museu Olímpico. Projeto que combina tecnologia, narrativa espacial e curadoria para criar experiência imersiva única.',
  'Discover the behind-the-scenes of the Rio Olympic Museum assembly. Project combining technology, spatial storytelling, and curation to create a unique immersive experience.',
  'PUBLISHED',
  true,
  NOW() - INTERVAL '5 days',
  (SELECT id FROM "BlogCategory" WHERE slug = 'projetos' LIMIT 1),
  'Equipe Azimut',
  8,
  0,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '5 days'
WHERE NOT EXISTS (SELECT 1 FROM "BlogPost" WHERE slug = 'rio-museu-olimpico-montagem-instalacao');

-- Post 2: Natal Rio Bonito
INSERT INTO "BlogPost" (
  id, slug, "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn", "excerptEs", "excerptFr",
  "contentPt", "contentEn",
  "seoTitlePt", "seoTitleEn", "seoDescPt", "seoDescEn",
  status, featured, "publishedAt", "categoryId", "authorName", "readTimeMinutes", "viewCount",
  "createdAt", "updatedAt"
)
SELECT
  uuid_generate_v4(),
  'natal-rio-bonito-instalacao-imersiva',
  'Natal Rio Bonito: Luzes, Sons e Magia de Natal',
  'Natal Rio Bonito: Lights, Sounds and Christmas Magic',
  'Natal Rio Bonito: Luces, Sonidos y Magia Navideña',
  'Natal Rio Bonito : Lumières, Sons et Magie de Noël',
  'A instalação imersiva de Natal em Rio Bonito levou tecnologia audiovisual às ruas, criando uma experiência mágica que une tradição e inovação.',
  'The immersive Christmas installation in Rio Bonito brought audiovisual technology to the streets, creating a magical experience that unites tradition and innovation.',
  'La instalación inmersiva de Navidad en Rio Bonito llevó tecnología audiovisual a las calles, creando una experiencia mágica que une tradición e innovación.',
  'L''installation immersive de Noël à Rio Bonito a apporté la technologie audiovisuelle dans les rues, créant une expérience magique qui unit tradition et innovation.',
  '# Natal Rio Bonito: Luzes, Sons e Magia de Natal

A Azimut desenvolveu uma instalação imersiva de Natal que transformou o espaço público de Rio Bonito em uma experiência audiovisual mágica.

## Conceito

O projeto combinou projeções mapeadas, iluminação LED interativa e trilhas sonoras espacializadas para criar uma atmosfera natalina única.

## Desafios Técnicos

- **Condições climáticas** ao ar livre
- **Integração com arquitetura existente**
- **Sincronização de múltiplos sistemas audiovisuais**

## Impacto

Milhares de pessoas visitaram a instalação, vivenciando uma experiência que une tradição natalina com tecnologia de ponta.',
  '# Natal Rio Bonito: Lights, Sounds and Christmas Magic

Azimut developed an immersive Christmas installation that transformed the public space of Rio Bonito into a magical audiovisual experience.

## Concept

The project combined mapped projections, interactive LED lighting, and spatialized soundtracks to create a unique Christmas atmosphere.

## Technical Challenges

- **Outdoor weather conditions**
- **Integration with existing architecture**
- **Synchronization of multiple audiovisual systems**

## Impact

Thousands of people visited the installation, experiencing an event that unites Christmas tradition with cutting-edge technology.',
  'Natal Rio Bonito: Instalação Imersiva | Blog Azimut',
  'Natal Rio Bonito: Immersive Installation | Azimut Blog',
  'Instalação imersiva de Natal em Rio Bonito. Projeções mapeadas, iluminação LED e trilhas sonoras espacializadas para criar atmosfera natalina única.',
  'Immersive Christmas installation in Rio Bonito. Mapped projections, LED lighting, and spatialized soundtracks to create a unique Christmas atmosphere.',
  'PUBLISHED',
  true,
  NOW() - INTERVAL '12 days',
  (SELECT id FROM "BlogCategory" WHERE slug = 'cultura' LIMIT 1),
  'Equipe Azimut',
  6,
  0,
  NOW() - INTERVAL '14 days',
  NOW() - INTERVAL '12 days'
WHERE NOT EXISTS (SELECT 1 FROM "BlogPost" WHERE slug = 'natal-rio-bonito-instalacao-imersiva');

-- Post 3: VR e AR
INSERT INTO "BlogPost" (
  id, slug, "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn", "excerptEs", "excerptFr",
  "contentPt", "contentEn",
  "seoTitlePt", "seoTitleEn", "seoDescPt", "seoDescEn",
  status, featured, "publishedAt", "categoryId", "authorName", "readTimeMinutes", "viewCount",
  "createdAt", "updatedAt"
)
SELECT
  uuid_generate_v4(),
  'vr-ar-experiencias-imersivas-azimut',
  'VR e AR na Azimut: Criando Experiências Imersivas do Futuro',
  'VR and AR at Azimut: Creating Immersive Experiences of the Future',
  'VR y AR en Azimut: Creando Experiencias Inmersivas del Futuro',
  'VR et AR chez Azimut : Création d''Expériences Immersives de l''Avenir',
  'Como a Azimut utiliza Realidade Virtual e Aumentada para criar experiências imersivas que conectam Brasil e Canadá, unindo tecnologia e narrativa.',
  'How Azimut uses Virtual and Augmented Reality to create immersive experiences that connect Brazil and Canada, uniting technology and storytelling.',
  'Cómo Azimut utiliza Realidad Virtual y Aumentada para crear experiencias inmersivas que conectan Brasil y Canadá, uniendo tecnología y narrativa.',
  'Comment Azimut utilise la Réalité Virtuelle et Augmentée pour créer des expériences immersives qui connectent le Brésil et le Canada, unissant technologie et narration.',
  '# VR e AR na Azimut: Criando Experiências Imersivas do Futuro

A Azimut está na vanguarda da criação de experiências imersivas usando Realidade Virtual (VR) e Realidade Aumentada (AR).

## Nossa Abordagem

Combinamos narrativa cinematográfica com tecnologia de ponta para criar experiências que transportam o público para novos mundos.

## Projetos em VR/AR

- **Instalações de museu** com realidade aumentada
- **Experiências corporativas** imersivas
- **Projetos educacionais** que revolucionam o aprendizado

## Conexão Brasil-Canadá

Nossa equipe trabalha entre Brasil e Canadá, aproveitando o melhor de ambos os ecossistemas tecnológicos para criar soluções inovadoras.',
  '# VR and AR at Azimut: Creating Immersive Experiences of the Future

Azimut is at the forefront of creating immersive experiences using Virtual Reality (VR) and Augmented Reality (AR).

## Our Approach

We combine cinematic storytelling with cutting-edge technology to create experiences that transport audiences to new worlds.

## VR/AR Projects

- **Museum installations** with augmented reality
- **Immersive corporate experiences**
- **Educational projects** that revolutionize learning

## Brazil-Canada Connection

Our team works between Brazil and Canada, leveraging the best of both technological ecosystems to create innovative solutions.',
  'VR e AR na Azimut: Experiências Imersivas | Blog Azimut',
  'VR and AR at Azimut: Immersive Experiences | Azimut Blog',
  'Como a Azimut utiliza VR e AR para criar experiências imersivas. Projetos que conectam Brasil e Canadá, unindo tecnologia e narrativa cinematográfica.',
  'How Azimut uses VR and AR to create immersive experiences. Projects connecting Brazil and Canada, uniting technology and cinematic storytelling.',
  'PUBLISHED',
  false,
  NOW() - INTERVAL '20 days',
  (SELECT id FROM "BlogCategory" WHERE slug = 'tecnologia' LIMIT 1),
  'Equipe Azimut',
  7,
  0,
  NOW() - INTERVAL '22 days',
  NOW() - INTERVAL '20 days'
WHERE NOT EXISTS (SELECT 1 FROM "BlogPost" WHERE slug = 'vr-ar-experiencias-imersivas-azimut');

-- Post 4: Por Trás das Cenas
INSERT INTO "BlogPost" (
  id, slug, "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn", "excerptEs", "excerptFr",
  "contentPt", "contentEn",
  "seoTitlePt", "seoTitleEn", "seoDescPt", "seoDescEn",
  status, featured, "publishedAt", "categoryId", "authorName", "readTimeMinutes", "viewCount",
  "createdAt", "updatedAt"
)
SELECT
  uuid_generate_v4(),
  'por-tras-das-cenas-azimut-brasil-canada',
  'Por Trás das Cenas: Como Trabalhamos Entre Brasil e Canadá',
  'Behind the Scenes: How We Work Between Brazil and Canada',
  'Detrás de Escena: Cómo Trabajamos Entre Brasil y Canadá',
  'Dans les Coulisses : Comment Nous Travaillons Entre le Brésil et le Canada',
  'Descubra como a equipe da Azimut trabalha remotamente entre Brasil e Canadá, combinando expertise técnica, criatividade e tecnologia para criar projetos únicos.',
  'Discover how the Azimut team works remotely between Brazil and Canada, combining technical expertise, creativity, and technology to create unique projects.',
  'Descubre cómo el equipo de Azimut trabaja remotamente entre Brasil y Canadá, combinando experiencia técnica, creatividad y tecnología para crear proyectos únicos.',
  'Découvrez comment l''équipe Azimut travaille à distance entre le Brésil et le Canada, combinant expertise technique, créativité et technologie pour créer des projets uniques.',
  '# Por Trás das Cenas: Como Trabalhamos Entre Brasil e Canadá

A Azimut tem uma estrutura única: equipe distribuída entre Brasil e Canadá, aproveitando o melhor de ambos os mundos.

## Nossa Estrutura

- **Equipe no Brasil**: Foco em produção audiovisual e instalações locais
- **Equipe no Canadá**: Expertise em tecnologia e inovação
- **Colaboração remota**: Ferramentas modernas para trabalho distribuído

## Vantagens

- **Horários complementares**: Trabalho 24/7 quando necessário
- **Diversidade cultural**: Diferentes perspectivas enriquecem os projetos
- **Acesso a mercados**: Facilita trabalhos em ambos os países

## Desafios e Soluções

Comunicação clara, processos bem definidos e uso de tecnologia de ponta garantem que a distância não seja obstáculo para a excelência.',
  '# Behind the Scenes: How We Work Between Brazil and Canada

Azimut has a unique structure: team distributed between Brazil and Canada, leveraging the best of both worlds.

## Our Structure

- **Team in Brazil**: Focus on audiovisual production and local installations
- **Team in Canada**: Expertise in technology and innovation
- **Remote collaboration**: Modern tools for distributed work

## Advantages

- **Complementary schedules**: 24/7 work when needed
- **Cultural diversity**: Different perspectives enrich projects
- **Market access**: Facilitates work in both countries

## Challenges and Solutions

Clear communication, well-defined processes, and use of cutting-edge technology ensure that distance is not an obstacle to excellence.',
  'Por Trás das Cenas: Brasil e Canadá | Blog Azimut',
  'Behind the Scenes: Brazil and Canada | Azimut Blog',
  'Descubra como a equipe Azimut trabalha remotamente entre Brasil e Canadá. Estrutura única que combina expertise técnica, criatividade e tecnologia.',
  'Discover how the Azimut team works remotely between Brazil and Canada. Unique structure combining technical expertise, creativity, and technology.',
  'PUBLISHED',
  false,
  NOW() - INTERVAL '30 days',
  (SELECT id FROM "BlogCategory" WHERE slug = 'por-tras-das-cenas' LIMIT 1),
  'Equipe Azimut',
  5,
  0,
  NOW() - INTERVAL '32 days',
  NOW() - INTERVAL '30 days'
WHERE NOT EXISTS (SELECT 1 FROM "BlogPost" WHERE slug = 'por-tras-das-cenas-azimut-brasil-canada');

-- ═══════════════════════════════════════════════════════════════
-- ✅ SCRIPT CONCLUÍDO
-- ═══════════════════════════════════════════════════════════════
-- Este script cria:
-- - 4 categorias do blog (Projetos, Tecnologia, Cultura, Por Trás das Cenas)
-- - 4 posts publicados sobre projetos reais da Azimut
-- 
-- Para popular mais posts, use o backoffice:
-- https://backoffice.azmt.com.br/admin/blog/new
-- ═══════════════════════════════════════════════════════════════
