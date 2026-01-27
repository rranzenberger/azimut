-- ═══════════════════════════════════════════════════════════════
-- ATUALIZAÇÃO: Credenciais e Equipe - Janeiro 2026
-- ═══════════════════════════════════════════════════════════════
-- Este SQL atualiza as credenciais e informações da equipe
-- para sincronizar com as mudanças feitas no site
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. ATUALIZAR BIO DO RANZ (adicionar cidadão canadense)
-- ═══════════════════════════════════════════════════════════════
-- Se houver tabela de equipe no CMS, atualizar:
/*
UPDATE "TeamMembers" 
SET 
  "bioPt" = '30+ anos em produção audiovisual, VR/XR e IA. Curador VR no Festival de Gramado. Especialista Autodesk certificado. 🏛️ Cidadão Canadense - Baseado em Vancouver, BC.',
  "bioEn" = '30+ years in audiovisual production, VR/XR and AI. VR Curator at Gramado Festival. Certified Autodesk specialist. 🏛️ Canadian Citizen - Based in Vancouver, BC.',
  "bioEs" = '30+ años en producción audiovisual, VR/XR e IA. Curador VR en el Festival de Gramado. Especialista Autodesk certificado. 🏛️ Ciudadano Canadiense - Basado en Vancouver, BC.',
  "bioFr" = '30+ ans en production audiovisuelle, VR/XR et IA. Conservateur VR au Festival de Gramado. Spécialiste Autodesk certifié. 🏛️ Citoyen Canadien - Basé à Vancouver, BC.',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'ranz';
*/

-- ═══════════════════════════════════════════════════════════════
-- 2. ATUALIZAR CREDENCIAIS (8 itens atualizados)
-- ═══════════════════════════════════════════════════════════════
-- Se houver tabela de credenciais no CMS, inserir/atualizar:

-- Credencial 1: Membros fundadores XRBR
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  1,
  '🏆',
  'Membros fundadores da Associação XRBR',
  'Founding members of XRBR Association',
  'Miembros fundadores de la Asociación XRBR',
  'Membres fondateurs de l''Association XRBR',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 2: Mestrado UFRJ
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  2,
  '🎓',
  'Mestrado em Mídias Criativas (UFRJ)',
  'Master''s in Creative Media (UFRJ)',
  'Maestría en Medios Creativos (UFRJ)',
  'Master en Médias Créatives (UFRJ)',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 3: VFS & VanArts
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  3,
  '🎓',
  'Parceria educacional: VFS & VanArts (Canadá)',
  'Educational partnership: VFS & VanArts (Canada)',
  'Asociación educativa: VFS & VanArts (Canadá)',
  'Partenariat éducatif: VFS & VanArts (Canada)',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 4: Operações Internacionais
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  4,
  '🌍',
  'Operações internacionais: Brasil ↔ Canadá | Produção',
  'International operations: Brazil ↔ Canada | Production',
  'Operaciones internacionales: Brasil ↔ Canadá | Producción',
  'Opérations internationales: Brésil ↔ Canada | Production',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 5: Curadoria VR Gramado
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  5,
  '🎬',
  'Curadoria VR no Festival de Gramado desde 2017',
  'VR Curatorship at Gramado Festival since 2017',
  'Curaduría VR en el Festival de Gramado desde 2017',
  'Curation VR au Festival de Gramado depuis 2017',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 6: IA e Imersivo
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  6,
  '🤖',
  'IA, Imersivo (360°, VR/AR/XR), Mentoria & Produção',
  'AI, Immersive (360°, VR/AR/XR), Mentoring & Production',
  'IA, Inmersivo (360°, VR/AR/XR), Mentoría & Producción',
  'IA, Immersif (360°, VR/AR/XR), Mentorat & Production',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 7: 30+ anos Pioneiros 3D
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  7,
  '🚀',
  '30+ anos: Pioneiros 3D (anos 90). | Audiovisual, Motion, Vídeos
Produção para Exposições e Projetos Imersivos',
  '30+ years: 3D Pioneers (1990s). | Audiovisual, Motion, Videos
Production for Exhibitions and Immersive Projects',
  '30+ años: Pioneros 3D (años 90). | Audiovisual, Motion, Videos
Producción para Exposiciones y Proyectos Inmersivos',
  '30+ ans: Pionniers 3D (années 90). | Audiovisuel, Motion, Vidéos
Production pour Expositions et Projets Immersifs',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- Credencial 8: Museu Olímpico
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  8,
  '🏛️',
  'Direção Geral, Técnica e Audiovisual + Arte/Grafismo no Rio Museu Olímpico',
  'General, Technical & Audiovisual Direction + Art/Graphics at Rio Olympic Museum',
  'Dirección General, Técnica y Audiovisual + Arte/Grafismo en el Museo Olímpico de Río',
  'Direction Générale, Technique et Audiovisuelle + Art/Graphisme au Musée Olympique de Rio',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- ═══════════════════════════════════════════════════════════════
-- NOTA: Este SQL está comentado porque as tabelas exatas
-- do CMS podem ter nomes diferentes. Ajuste conforme necessário:
-- 
-- 1. Verifique os nomes das tabelas no seu CMS/backoffice
-- 2. Ajuste os nomes das colunas se necessário
-- 3. Descomente as queries relevantes
-- 4. Execute no banco de dados do CMS
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO: Listar tabelas disponíveis
-- ═══════════════════════════════════════════════════════════════
-- Execute para ver quais tabelas existem:
/*
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND (table_name ILIKE '%team%' 
    OR table_name ILIKE '%member%' 
    OR table_name ILIKE '%credential%'
    OR table_name ILIKE '%studio%')
ORDER BY table_name;
*/
