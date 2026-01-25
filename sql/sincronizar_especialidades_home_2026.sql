-- ═══════════════════════════════════════════════════════════════════════════════
-- SINCRONIZAÇÃO: Especialidades/Expertise da Home com Backoffice
-- Data: 24 de Janeiro de 2026
-- Objetivo: Garantir que o backoffice tenha os mesmos dados exibidos no site
-- ═══════════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. SERVICES (Especialidades do card direito - EXPERTISE)
-- Estas são as 6 pílulas do card "ESPECIALIDADES" / "EXPERTISE"
-- ═══════════════════════════════════════════════════════════════════════════════

-- Limpar serviços existentes para recriar com dados corretos (CUIDADO!)
-- DELETE FROM "Service" WHERE slug IN ('espacos-imersivos', 'cultura-instituicoes', 'narrativa-espacial', 'direcao-tecnica', 'formacao-treinamento', 'ia-curadoria-arte');

-- Inserir/Atualizar os 6 serviços de Especialidades
INSERT INTO "Service" (id, slug, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, status, priority, segments, "createdAt", "updatedAt")
VALUES 
  -- 1. Espaços Imersivos
  (gen_random_uuid(), 'espacos-imersivos', 
   'Espaços Imersivos', 
   'Immersive Spaces', 
   'Espacios Inmersivos', 
   'Espaces Immersifs',
   'Instalações narrativas e ambientes imersivos para museus, exposições e espaços culturais',
   'Narrative installations and immersive environments for museums, exhibitions and cultural spaces',
   'Instalaciones narrativas y ambientes inmersivos para museos, exposiciones y espacios culturales',
   'Installations narratives et environnements immersifs pour musées, expositions et espaces culturels',
   '🏛️', 'PUBLISHED', 10, ARRAY['expertise'], NOW(), NOW()),
  
  -- 2. Cultura & Instituições
  (gen_random_uuid(), 'cultura-instituicoes', 
   'Cultura & Instituições', 
   'Culture & Institutions', 
   'Cultura & Instituciones', 
   'Culture & Institutions',
   'Projetos para instituições culturais, museus, centros de ciência e espaços públicos',
   'Projects for cultural institutions, museums, science centers and public spaces',
   'Proyectos para instituciones culturales, museos, centros de ciencia y espacios públicos',
   'Projets pour institutions culturelles, musées, centres scientifiques et espaces publics',
   '🎭', 'PUBLISHED', 20, ARRAY['expertise'], NOW(), NOW()),
  
  -- 3. Narrativa Espacial
  (gen_random_uuid(), 'narrativa-espacial', 
   'Narrativa Espacial', 
   'Spatial Storytelling', 
   'Narrativa Espacial', 
   'Narration Spatiale',
   'Storytelling que conecta espaço físico e digital através de experiências temporais',
   'Storytelling connecting physical and digital space through time-based experiences',
   'Storytelling que conecta espacio físico y digital a través de experiencias temporales',
   'Narration connectant espace physique et numérique à travers des expériences temporelles',
   '🗺️', 'PUBLISHED', 30, ARRAY['expertise'], NOW(), NOW()),
  
  -- 4. Direção Técnica
  (gen_random_uuid(), 'direcao-tecnica', 
   'Direção Técnica', 
   'Technical Direction', 
   'Dirección Técnica', 
   'Direction Technique',
   'Supervisão técnica de projetos complexos envolvendo múltiplas tecnologias e equipes',
   'Technical supervision of complex projects involving multiple technologies and teams',
   'Supervisión técnica de proyectos complejos involucrando múltiples tecnologías y equipos',
   'Supervision technique de projets complexes impliquant plusieurs technologies et équipes',
   '⚙️', 'PUBLISHED', 40, ARRAY['expertise'], NOW(), NOW()),
  
  -- 5. Formação & Treinamento
  (gen_random_uuid(), 'formacao-treinamento', 
   'Formação & Treinamento', 
   'Education & Training', 
   'Formación & Capacitación', 
   'Formation & Ateliers',
   'Workshops, mentorias e programas de capacitação em mídia imersiva e storytelling',
   'Workshops, mentoring and training programs in immersive media and storytelling',
   'Talleres, mentorías y programas de capacitación en medios inmersivos y storytelling',
   'Ateliers, mentorat et programmes de formation en médias immersifs et narration',
   '📚', 'PUBLISHED', 50, ARRAY['expertise'], NOW(), NOW()),
  
  -- 6. IA Curadoria de Arte
  (gen_random_uuid(), 'ia-curadoria-arte', 
   'IA Curadoria de Arte', 
   'AI Art Curation', 
   'IA Curaduría de Arte', 
   'IA Curation d''Art',
   'Pipelines com inteligência artificial para curadoria, análise e produção criativa',
   'AI-powered pipelines for curation, analysis and creative production',
   'Pipelines con inteligencia artificial para curaduría, análisis y producción creativa',
   'Pipelines alimentés par l''IA pour curation, analyse et production créative',
   '🤖', 'PUBLISHED', 60, ARRAY['expertise'], NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  priority = EXCLUDED.priority,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. MARKETS (Pílulas do card esquerdo - RETRATO DO ESTÚDIO)
-- Estas são as 4 pílulas: Museus & Exposições, Ativações de Marca, etc.
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO "Market" (id, code, "labelPt", "labelEn", "labelEs", "labelFr", priority, "createdAt", "updatedAt")
VALUES 
  -- 1. Museus & Exposições
  (gen_random_uuid(), 'museus-exposicoes', 
   'Museus & Exposições', 
   'Museums & Exhibitions', 
   'Museos & Exposiciones', 
   'Musées & Expositions',
   10, NOW(), NOW()),
  
  -- 2. Ativações de Marca & Sazonais
  (gen_random_uuid(), 'ativacoes-marca', 
   'Ativações de Marca & Sazonais', 
   'Brand & Seasonal Activations', 
   'Activaciones de Marca & Estacionales', 
   'Activations de Marque & Saisonnières',
   20, NOW(), NOW()),
  
  -- 3. Audiovisual Híbrido & IA
  (gen_random_uuid(), 'audiovisual-hibrido-ia', 
   'Audiovisual Híbrido & IA', 
   'Hybrid AV & AI', 
   'Audiovisual Híbrido & IA', 
   'Audiovisuel Hybride & IA',
   30, NOW(), NOW()),
  
  -- 4. Educação & Pesquisa
  (gen_random_uuid(), 'educacao-pesquisa', 
   'Educação & Pesquisa', 
   'Education & Research', 
   'Educación & Investigación', 
   'Éducation & Recherche',
   40, NOW(), NOW())

ON CONFLICT (code) DO UPDATE SET
  "labelPt" = EXCLUDED."labelPt",
  "labelEn" = EXCLUDED."labelEn",
  "labelEs" = EXCLUDED."labelEs",
  "labelFr" = EXCLUDED."labelFr",
  priority = EXCLUDED.priority,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════════
-- 3. VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════════════════════

-- Verificar Services (Especialidades)
SELECT slug, "titlePt", "titleEn", priority FROM "Service" WHERE 'expertise' = ANY(segments) ORDER BY priority;

-- Verificar Markets (Mercados/Pílulas do estúdio)
SELECT code, "labelPt", "labelEn", priority FROM "Market" ORDER BY priority;

-- ═══════════════════════════════════════════════════════════════════════════════
-- RESUMO DAS TRADUÇÕES SINCRONIZADAS
-- ═══════════════════════════════════════════════════════════════════════════════
-- 
-- CARD DIREITO - ESPECIALIDADES (6 pílulas):
-- | Slug                  | PT                      | EN                    | ES                      | FR                    |
-- |-----------------------|-------------------------|-----------------------|-------------------------|-----------------------|
-- | espacos-imersivos     | Espaços Imersivos       | Immersive Spaces      | Espacios Inmersivos     | Espaces Immersifs     |
-- | cultura-instituicoes  | Cultura & Instituições  | Culture & Institutions| Cultura & Instituciones | Culture & Institutions|
-- | narrativa-espacial    | Narrativa Espacial      | Spatial Storytelling  | Narrativa Espacial      | Narration Spatiale    |
-- | direcao-tecnica       | Direção Técnica         | Technical Direction   | Dirección Técnica       | Direction Technique   |
-- | formacao-treinamento  | Formação & Treinamento  | Education & Training  | Formación & Capacitación| Formation & Ateliers  |
-- | ia-curadoria-arte     | IA Curadoria de Arte    | AI Art Curation       | IA Curaduría de Arte    | IA Curation d'Art     |
--
-- CARD ESQUERDO - RETRATO DO ESTÚDIO (4 pílulas):
-- | Code                  | PT                           | EN                          | ES                              | FR                              |
-- |-----------------------|------------------------------|-----------------------------|---------------------------------|---------------------------------|
-- | museus-exposicoes     | Museus & Exposições          | Museums & Exhibitions       | Museos & Exposiciones           | Musées & Expositions            |
-- | ativacoes-marca       | Ativações de Marca & Sazonais| Brand & Seasonal Activations| Activaciones de Marca & Estac.  | Activations de Marque & Sais.   |
-- | audiovisual-hibrido-ia| Audiovisual Híbrido & IA     | Hybrid AV & AI              | Audiovisual Híbrido & IA        | Audiovisuel Hybride & IA        |
-- | educacao-pesquisa     | Educação & Pesquisa          | Education & Research        | Educación & Investigación       | Éducation & Recherche           |
--
-- ═══════════════════════════════════════════════════════════════════════════════
