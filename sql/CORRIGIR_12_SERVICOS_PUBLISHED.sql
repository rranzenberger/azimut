-- ═══════════════════════════════════════════════════════════════
-- Só corrigir status: 12 PUBLICADOS, resto ARQUIVADO
-- Use este arquivo se o script grande não rodou ou se tudo ficou ARCHIVED.
-- Rode no Neon em 2 blocos (Passo 1 e Passo 2).
-- ═══════════════════════════════════════════════════════════════

-- PASSO 1: Publicar os 12 curados
UPDATE "Service"
SET status = 'PUBLISHED', "updatedAt" = NOW()
WHERE slug IN (
  'cinema-audiovisual',
  'pos-producao-vfx',
  'animacao-2d-3d',
  'xr-interatividade-web3',
  'cenografia-design-espacial',
  'games-interativos',
  'ia-criativa',
  'direcao-arte-criativa',
  'teatro-espetaculos-imersivos',
  'branded-experiences-ativacoes',
  'consultoria-estrategia',
  'educacao-treinamento'
);

-- PASSO 2: Arquivar todos os que não são um dos 12
UPDATE "Service"
SET status = 'ARCHIVED', "updatedAt" = NOW()
WHERE slug NOT IN (
  'cinema-audiovisual',
  'pos-producao-vfx',
  'animacao-2d-3d',
  'xr-interatividade-web3',
  'cenografia-design-espacial',
  'games-interativos',
  'ia-criativa',
  'direcao-arte-criativa',
  'teatro-espetaculos-imersivos',
  'branded-experiences-ativacoes',
  'consultoria-estrategia',
  'educacao-treinamento'
);

-- Verificação: deve retornar 12 linhas
SELECT slug, "titlePt", icon, priority, status FROM "Service" WHERE status = 'PUBLISHED' ORDER BY priority;
