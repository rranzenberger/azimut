-- Migration: Add TeamMembers and Credentials tables for Studio page
-- Created: 2026-01-23
-- VERSÃO SEGURA: Usa IF NOT EXISTS para evitar erros se já existir

BEGIN;

-- ═══════════════════════════════════════════════════════════════
-- 1. Criar tabela TeamMembers (se não existir)
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "TeamMembers" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  
  -- Identificação
  "slug" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  
  -- Cargo e Credencial
  "rolePt" TEXT NOT NULL,
  "roleEn" TEXT NOT NULL,
  "roleEs" TEXT,
  "roleFr" TEXT,
  "credentialPt" TEXT,
  "credentialEn" TEXT,
  "credentialEs" TEXT,
  "credentialFr" TEXT,
  
  -- Bio (Multilíngue PT/EN/ES/FR)
  "bioPt" TEXT,
  "bioEn" TEXT,
  "bioEs" TEXT,
  "bioFr" TEXT,
  
  -- Foto
  "photoUrl" TEXT,
  "photoMediaId" TEXT,
  
  -- Ordem de exibição
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  
  -- Status
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- 2. Criar tabela Credentials (se não existir)
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "Credentials" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  
  -- Ordem de exibição
  "order" INTEGER NOT NULL DEFAULT 0,
  
  -- Ícone (emoji)
  "icon" TEXT,
  
  -- Texto (Multilíngue PT/EN/ES/FR)
  "textPt" TEXT NOT NULL,
  "textEn" TEXT NOT NULL,
  "textEs" TEXT,
  "textFr" TEXT,
  
  -- Status
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- 3. Criar índices (se não existirem)
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS "TeamMembers_slug_idx" ON "TeamMembers"("slug");
CREATE INDEX IF NOT EXISTS "TeamMembers_isPublished_idx" ON "TeamMembers"("isPublished");
CREATE INDEX IF NOT EXISTS "TeamMembers_displayOrder_idx" ON "TeamMembers"("displayOrder");

CREATE INDEX IF NOT EXISTS "Credentials_order_idx" ON "Credentials"("order");
CREATE INDEX IF NOT EXISTS "Credentials_isPublished_idx" ON "Credentials"("isPublished");

-- ═══════════════════════════════════════════════════════════════
-- 4. Popular dados iniciais - TeamMembers (apenas se não existirem)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "TeamMembers" ("slug", "name", "rolePt", "roleEn", "roleEs", "roleFr", "credentialPt", "credentialEn", "credentialEs", "credentialFr", "bioPt", "bioEn", "bioEs", "bioFr", "photoUrl", "displayOrder", "isPublished")
VALUES 
(
  'ranz',
  'Ranz Enberger',
  'Diretor Criativo & Tecnologia',
  'Creative & Technology Director',
  'Director Creativo & Tecnología',
  'Directeur Créatif & Technologie',
  'Direção Geral e Tecnologia no Montagem do Rio Museu Olímpico',
  'General & Technology Direction at Rio Olympic Museum Setup',
  'Dirección General y Tecnología en el Montaje del Rio Museo Olímpico',
  'Direction Générale et Technologie au Montage du Musée Olympique de Rio',
  '30+ anos em produção audiovisual, VR/XR e IA. Curador VR no Festival de Gramado. Especialista Autodesk certificado. 🏛️ Cidadão Canadense - Baseado em Vancouver, BC.',
  '30+ years in audiovisual production, VR/XR and AI. VR Curator at Gramado Festival. Certified Autodesk specialist. 🏛️ Canadian Citizen - Based in Vancouver, BC.',
  '30+ años en producción audiovisual, VR/XR e IA. Curador VR en el Festival de Gramado. Especialista Autodesk certificado. 🏛️ Ciudadano Canadiense - Basado en Vancouver, BC.',
  '30+ ans en production audiovisuelle, VR/XR et IA. Conservateur VR au Festival de Gramado. Spécialiste Autodesk certifié. 🏛️ Citoyen Canadien - Basé à Vancouver, BC.',
  '/Ranz.jpeg',
  1,
  true
),
(
  'anick',
  'Anick Couto',
  'Diretora de Arte',
  'Art Director',
  'Directora de Arte',
  'Directrice Artistique',
  'Líder do Equipe de Arte no Montagem do Rio Museu Olímpico',
  'Art Team Lead at Rio Olympic Museum Setup',
  'Líder del Equipo de Arte en el Montaje del Rio Museo Olímpico',
  'Responsable de l''Équipe Artistique au Montage du Musée Olympique de Rio',
  'Direção visual, design de personagens e cenografia digital. UI, grafismo e sinalização.',
  'Visual direction, character design and digital scenography. UI, graphics and signage.',
  'Dirección visual, diseño de personajes y escenografía digital. UI, grafismo y señalización.',
  'Direction visuelle, design de personnages et scénographie digitale. UI, graphisme et signalétique.',
  '/anick.jpg',
  2,
  true
),
(
  'alberto',
  'Alberto Moura',
  'Diretor Audiovisual',
  'Audiovisual Director',
  'Director Audiovisual',
  'Directeur Audiovisuel',
  'Diretor Audiovisual no Montagem do Rio Museu Olímpico',
  'Audiovisual Director at Rio Olympic Museum Setup',
  'Director Audiovisual en el Montaje del Rio Museo Olímpico',
  'Directeur Audiovisuel au Montage du Musée Olympique de Rio',
  'Produção audiovisual e estratégia cultural. Professor universitário e coordenador de cursos.',
  'Audiovisual production and cultural strategy. University professor and course coordinator.',
  'Producción audiovisual y estrategia cultural. Profesor universitario y coordinador de cursos.',
  'Production audiovisuelle et stratégie culturelle. Professeur universitaire et coordinateur de cours.',
  '/alberto.jpg',
  3,
  true
)
ON CONFLICT ("slug") DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. Popular dados iniciais - Credentials (apenas se não existirem)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "Credentials" ("order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished")
VALUES 
(
  1,
  '🏆',
  'Membros fundadores da Associação XRBR',
  'Founding members of XRBR Association',
  'Miembros fundadores de la Asociación XRBR',
  'Membres fondateurs de l''Association XRBR',
  true
),
(
  2,
  '🎓',
  'Mestrado em Mídias Criativas (UFRJ)',
  'Master''s in Creative Media (UFRJ)',
  'Maestría en Medios Creativos (UFRJ)',
  'Master en Médias Créatifs (UFRJ)',
  true
),
(
  3,
  '🎓',
  'Parceria educacional: VFS & VanArts (Canadá)',
  'Educational partnership: VFS & VanArts (Canada)',
  'Asociación educativa: VFS & VanArts (Canadá)',
  'Partenariat éducatif: VFS & VanArts (Canada)',
  true
),
(
  4,
  '🌍',
  'Operações internacionais: Brasil ↔ Canadá | Produção',
  'International operations: Brazil ↔ Canada | Production',
  'Operaciones internacionales: Brasil ↔ Canadá | Producción',
  'Opérations internationales: Brésil ↔ Canada | Production',
  true
),
(
  5,
  '🎬',
  'Curadoria VR no Festival de Gramado desde 2017',
  'VR Curatorship at Gramado Festival since 2017',
  'Curaduría VR en el Festival de Gramado desde 2017',
  'Curation VR au Festival de Gramado depuis 2017',
  true
),
(
  6,
  '🤖',
  'IA, Imersivo (360°, VR/AR/XR), Mentoria & Produção',
  'AI, Immersive (360°, VR/AR/XR), Mentorship & Production',
  'IA, Imersivo (360°, VR/AR/XR), Mentoría & Producción',
  'IA, Immersif (360°, VR/AR/XR), Mentorat & Production',
  true
),
(
  7,
  '🚀',
  '30+ anos: Pioneiros 3D (anos 90). | Audiovisual, Motion, Videos\nProdução para Exposições e Projetos Imersivos',
  '30+ years: 3D Pioneers (1990s). | Audiovisual, Motion, Videos\nProduction for Exhibitions and Immersive Projects',
  '30+ años: Pioneros 3D (años 90). | Audiovisual, Motion, Videos\nProducción para Exposiciones y Proyectos Inmersivos',
  '30+ ans: Pionniers 3D (années 90). | Audiovisuel, Motion, Vidéos\nProduction pour Expositions et Projets Immersifs',
  true
),
(
  8,
  '🏛️',
  'Direção Geral, Técnica e Audiovisual + Arte/Grafismo no Rio Museu Olímpico',
  'General, Technical & Audiovisual Direction + Art/Graphics at Rio Olympic Museum',
  'Dirección General, Técnica y Audiovisual + Arte/Grafismo en el Museo Olímpico de Río',
  'Direction Générale, Technique et Audiovisuelle + Art/Graphisme au Musée Olympique de Rio',
  true
)
ON CONFLICT DO NOTHING;

COMMIT;
