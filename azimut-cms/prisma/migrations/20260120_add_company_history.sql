-- Migration: Add CompanyHistory table for historical timeline and partnerships
-- Created: 2026-01-20

BEGIN;

-- ═══════════════════════════════════════════════════════════════
-- 1. Criar tabela CompanyHistory
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE "CompanyHistory" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  
  -- Ano/Período
  "year" INTEGER NOT NULL,
  "yearEnd" INTEGER,  -- Para períodos (ex: 2004-2018)
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  
  -- Tipo de entrada
  "type" TEXT NOT NULL CHECK ("type" IN ('milestone', 'partnership', 'project', 'award', 'location', 'other')),
  
  -- Conteúdo (Multilíngue PT/EN/ES/FR)
  "titlePt" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleEs" TEXT,
  "titleFr" TEXT,
  
  "descriptionPt" TEXT,
  "descriptionEn" TEXT,
  "descriptionEs" TEXT,
  "descriptionFr" TEXT,
  
  -- Bullets (JSON array de strings por idioma)
  "bulletsPt" TEXT[],  -- Array de strings em PostgreSQL
  "bulletsEn" TEXT[],
  "bulletsEs" TEXT[],
  "bulletsFr" TEXT[],
  
  -- Metadados
  "icon" TEXT,  -- Emoji ou nome do ícone (ex: '🏆' ou 'trophy')
  "logoUrl" TEXT,  -- URL da logo da parceria (opcional)
  "externalLink" TEXT,  -- Link externo (site da parceria, etc)
  
  -- Flags
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,  -- Destacar na timeline
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- 2. Criar índices
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX "CompanyHistory_year_idx" ON "CompanyHistory"("year");
CREATE INDEX "CompanyHistory_type_idx" ON "CompanyHistory"("type");
CREATE INDEX "CompanyHistory_isPublished_idx" ON "CompanyHistory"("isPublished");
CREATE INDEX "CompanyHistory_displayOrder_idx" ON "CompanyHistory"("displayOrder");

-- ═══════════════════════════════════════════════════════════════
-- 3. Popular com dados iniciais (baseado em StudioCredentials.tsx)
-- ═══════════════════════════════════════════════════════════════

-- 1996: ArchiCAD + Fundação
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(1996, 'milestone', 'Fundação - ArchiCAD Brasil', 'Foundation - ArchiCAD Brasil', 'Fundación - ArchiCAD Brasil', 'Fondation - ArchiCAD Brasil', 
'Início das atividades com computação gráfica e maquetes virtuais.', 'Start of activities with computer graphics and virtual models.', 
'🏗️', true, 10);

-- 1996-2018: Autodesk Partnership
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(1996, 2018, 'partnership', 'Autodesk - Centro de Treinamento Oficial', 'Autodesk - Official Training Center', 'Autodesk - Centro de Capacitación Oficial', 'Autodesk - Centre de Formation Officiel',
'Único centro de treinamento Autodesk autorizado na América do Sul.', 'Only authorized Autodesk training center in South America.',
'🎓', true, 20,
ARRAY['Centro de Treinamento oficial', 'Demo Artist Autodesk Discreet (1996-2008)', 'Application Engineer América do Sul', 'Único Flame Trainer certificado no Brasil'],
ARRAY['Official Training Center', 'Demo Artist Autodesk Discreet (1996-2008)', 'Application Engineer South America', 'Only certified Flame Trainer in Brazil']
);

-- 1998: AZMT Computação
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "icon", "displayOrder")
VALUES 
(1998, 'milestone', 'AZMT Computação e Produções Cinematográficas', 'AZMT Computing and Cinematographic Productions', '🎬', 30);

-- 1999: Discreet (Montreal, Canada)
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(1999, 'partnership', 'Discreet (Montreal, Canada)', 'Discreet (Montreal, Canada)', 'Discreet (Montreal, Canadá)', 'Discreet (Montréal, Canada)',
'Parceria com Discreet (adquirida pela Autodesk em 1999) - empresa canadense sediada em Montreal.', 'Partnership with Discreet (acquired by Autodesk in 1999) - Canadian company based in Montreal.',
'🇨🇦', true, 40);

-- 2004-2018: Azimut Escola
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn")
VALUES 
(2004, 2018, 'milestone', 'Azimut Escola de Animação', 'Azimut Animation School', 'Azimut Escuela de Animación', 'Azimut École d''Animation',
'Primeira escola de animação CG Autodesk na América Latina.', 'First CG animation school Autodesk in Latin America.',
'🎓', true, 50,
ARRAY['Cursos profissionalizantes 1-2 anos', 'CAD, 3ds Max, After Effects, Flame', 'Formamos centenas de profissionais', 'Filiais em Rio, Belém, Florianópolis', 'Sala na Estácio de Sá'],
ARRAY['Professional courses 1-2 years', 'CAD, 3ds Max, After Effects, Flame', 'Trained hundreds of professionals', 'Branches in Rio, Belém, Florianópolis', 'Room at Estácio de Sá university']
);

-- 2015-2017: Museu Olímpico
INSERT INTO "CompanyHistory" ("year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2015, 2017, 'project', 'Museu Olímpico do Rio', 'Olympic Museum of Rio', 'Museo Olímpico de Río', 'Musée Olympique de Rio',
'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro.', 'General Technology Director for the Olympic Museum of Rio de Janeiro.',
'🏛️', true, 60);

-- 2017: Vancouver
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2017, 'location', 'Vancouver, Canadá', 'Vancouver, Canada', 'Vancouver, Canadá', 'Vancouver, Canada',
'Expansão internacional com operações em Vancouver, British Columbia.', 'International expansion with operations in Vancouver, British Columbia.',
'🍁', true, 70);

-- 2017-atual: Gramado Festival
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "isFeatured", "displayOrder")
VALUES 
(2017, 'partnership', 'Festival de Gramado - Curadoria VR', 'Gramado Festival - VR Curatorship', 'Festival de Gramado - Curaduría VR', 'Festival de Gramado - Curation VR',
'Curadoria oficial de Realidade Virtual do Festival de Cinema de Gramado (desde 2017).', 'Official Virtual Reality curatorship of Gramado Film Festival (since 2017).',
'🎬', true, 80);

-- 2018: XRBR
INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "icon", "displayOrder")
VALUES 
(2018, 'partnership', 'XRBR - Membro Fundador', 'XRBR - Founding Member', 'XRBR - Miembro Fundador', 'XRBR - Membre Fondateur',
'Membro fundador da Associação Brasileira de Realidade Estendida.', 'Founding member of Brazilian Extended Reality Association.',
'🏆', 90);

COMMIT;

-- ═══════════════════════════════════════════════════════════════
-- NOTAS DE USO:
-- ═══════════════════════════════════════════════════════════════
-- 
-- 1. Para ADICIONAR novas entradas via backoffice, usar INSERT:
--    INSERT INTO "CompanyHistory" ("year", "type", "titlePt", "titleEn", ...)
--    VALUES (2002, 'partnership', 'Mister Chip ATC Belém', ...);
--
-- 2. Para PERÍODOS, usar "yearEnd":
--    year: 2008, yearEnd: 2010 = "2008-2010"
--
-- 3. BULLETS em array PostgreSQL:
--    bulletsPt: ARRAY['Item 1', 'Item 2', 'Item 3']
--
-- 4. TIPOS disponíveis:
--    - milestone: Marcos importantes (fundação, mudanças)
--    - partnership: Parcerias (SENAC, UERJ, Hopplon, etc)
--    - project: Projetos relevantes (games, museus)
--    - award: Prêmios
--    - location: Novas localizações
--    - other: Outros
--
-- ═══════════════════════════════════════════════════════════════
