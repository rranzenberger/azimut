-- ═══════════════════════════════════════════════════════════════
-- MIGRATION: Adicionar campos de filtros avançados em Project
-- Data: 2026-01-20
-- ═══════════════════════════════════════════════════════════════
-- Adiciona categorização avançada para portfólio com filtros visuais
-- Baseado em benchmarks da indústria (VR studios + curadores)
-- ═══════════════════════════════════════════════════════════════

BEGIN;

-- Categoria Principal (multi-select)
-- Exemplos: ['curadoria', 'vr-360', 'museum', 'education']
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "projectCategory" TEXT[] DEFAULT '{}';

-- Tipo de Trabalho (multi-select)
-- Exemplos: ['filme', 'exposicao', 'curso', 'palestra']
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "workType" TEXT[] DEFAULT '{}';

-- Tecnologias Utilizadas (multi-select)
-- Exemplos: ['VR', '360', 'IA', '3D', 'Motion Graphics']
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "technologies" TEXT[] DEFAULT '{}';

-- Setor/Indústria (single-select)
-- Valores: 'cultural', 'entertainment', 'education', 'corporate', 'government', 'research'
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "industry" TEXT;

-- Papel da Azimut no Projeto (multi-select)
-- Exemplos: ['direcao', 'curadoria', 'producao', 'animacao']
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "azimutRole" TEXT[] DEFAULT '{}';

-- Duração do Projeto
-- Exemplos: "3 meses", "2015-2017", "evento único"
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "duration" TEXT;

-- Prêmios (JSON estruturado)
-- Formato: [{title: "Best VR", organization: "Festival X", year: 2024, category: "Imersivo"}]
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "awards" JSONB;

-- Métricas de Impacto (JSON estruturado)
-- Formato: {visitors: 50000, revenue: "R$ 2M", duration: "2 anos", impact: "Formou 300 alunos"}
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "metrics" JSONB;

-- Vídeos
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "videoShowreel" TEXT;

-- Links Externos (JSON estruturado)
-- Formato: [{label: "Site Oficial", url: "https://..."}]
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "externalLinks" JSONB;

-- Logos de Parceiros
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "partnerLogos" TEXT[] DEFAULT '{}';

-- Before/After Images (JSON estruturado)
-- Formato: {before: "url", after: "url", label: "Evolução do conceito"}
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "beforeAfterImages" JSONB;

-- ═══════════════════════════════════════════════════════════════
-- ÍNDICES PARA PERFORMANCE (queries com filtros)
-- ═══════════════════════════════════════════════════════════════

-- GIN indexes para arrays (permitem busca eficiente em arrays)
CREATE INDEX IF NOT EXISTS "Project_projectCategory_idx" ON "Project" USING GIN ("projectCategory");
CREATE INDEX IF NOT EXISTS "Project_workType_idx" ON "Project" USING GIN ("workType");
CREATE INDEX IF NOT EXISTS "Project_technologies_idx" ON "Project" USING GIN ("technologies");
CREATE INDEX IF NOT EXISTS "Project_azimutRole_idx" ON "Project" USING GIN ("azimutRole");

-- Índice regular para industry (string simples)
CREATE INDEX IF NOT EXISTS "Project_industry_idx" ON "Project"("industry");

COMMIT;

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO (opcional - rodar depois do COMMIT)
-- ═══════════════════════════════════════════════════════════════
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'Project';
