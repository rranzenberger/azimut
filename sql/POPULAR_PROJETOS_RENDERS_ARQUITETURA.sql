-- ═══════════════════════════════════════════════════════════════
-- POPULAR PROJETOS DE RENDERS, MAQUETES E CENOGRAFIA VIRTUAL - Azimut
-- ═══════════════════════════════════════════════════════════════
-- Insere 2 projetos de renders, maquetes de arquitetura e cenografia virtual
-- Campos faltantes podem ser completados depois no backoffice
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. RENDERS E AMBIENTES VIRTUAIS PARA FMC OFFSHORE (2012-2015)
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
  'renders-ambientes-virtuais-fmc-offshore-2012',
  'Renders e Ambientes Virtuais para FMC Offshore',
  'FMC Offshore Virtual Environments',
  'Renders, ambientes virtuais e vídeos institucionais para FMC Technologies, empresa líder em equipamentos offshore.',
  'Renders, virtual environments and institutional videos for FMC Technologies, leading offshore equipment company.',
  'Renders, ambientes virtuais e vídeos institucionais para FMC Technologies, empresa líder em equipamentos offshore. Projeto de grande escala que envolveu criação de ambientes virtuais 3D para visualização de equipamentos offshore, renders fotorealísticos e produção de vídeos institucionais. A Azimut foi responsável pela modelagem 3D, renderização, criação de ambientes virtuais e produção audiovisual, demonstrando expertise em visualização técnica e comunicação corporativa.',
  'Renders, virtual environments and institutional videos for FMC Technologies, leading offshore equipment company. Large-scale project that involved creating 3D virtual environments for visualization of offshore equipment, photorealistic renders and production of institutional videos. Azimut was responsible for 3D modeling, rendering, virtual environment creation and audiovisual production, demonstrating expertise in technical visualization and corporate communication.',
  'Rio de Janeiro',
  'Brasil',
  2012,
  '2012-2015',
  'Azimut',
  'architectural',
  ARRAY['corporate'],
  'corporate',
  ARRAY['3D', 'VFX'],
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
-- 2. MAQUETES VIRTUAIS E PROJETOS DE ARQUITETURA (2010-2015)
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
  'maquetes-virtuais-projetos-arquitetura-2010',
  'Maquetes Virtuais e Projetos de Arquitetura',
  'Maquetes Virtuais Arquitetura',
  'Renders e maquetes virtuais de arquitetura para diversos clientes, desenvolvidos pela Azimut.',
  'Renders and virtual architectural models for various clients, developed by Azimut.',
  'Renders e maquetes virtuais de arquitetura para diversos clientes, desenvolvidos pela Azimut. Projeto que abrangeu múltiplos trabalhos de visualização arquitetônica, incluindo maquetes virtuais 3D, renders fotorealísticos, animações de projetos e visualizações interativas. A Azimut demonstrou expertise em arquitetura virtual, criando representações precisas e visualmente impactantes de projetos arquitetônicos que ajudaram clientes a visualizar e comunicar suas ideias.',
  'Renders and virtual architectural models for various clients, developed by Azimut. Project that encompassed multiple architectural visualization works, including 3D virtual models, photorealistic renders, project animations and interactive visualizations. Azimut demonstrated expertise in virtual architecture, creating accurate and visually impactful representations of architectural projects that helped clients visualize and communicate their ideas.',
  'Rio de Janeiro',
  'Brasil',
  2010,
  '2010-2015',
  'Azimut / clientes diversos',
  'architectural',
  ARRAY['corporate'],
  'corporate',
  ARRAY['3D', 'VFX'],
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
  'renders-ambientes-virtuais-fmc-offshore-2012',
  'maquetes-virtuais-projetos-arquitetura-2010'
)
ORDER BY year ASC;
