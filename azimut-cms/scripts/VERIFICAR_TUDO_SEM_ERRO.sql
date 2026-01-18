-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO COMPLETA SEM ERROS
-- Execute no Neon SQL Editor: https://console.neon.tech
-- Data: 17 de Janeiro de 2026
-- ═══════════════════════════════════════════════════════════════

-- ══════════════════════════════════════
-- 1. VERIFICAR BLOG (se tabela existir)
-- ══════════════════════════════════════
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'BlogPost') 
    THEN (SELECT COUNT(*)::text FROM "BlogPost" WHERE status = 'PUBLISHED')
    ELSE 'Tabela não existe'
  END as blog_posts_publicados;

-- ══════════════════════════════════════
-- 2. VERIFICAR SECTION (se tabela existir)
-- ══════════════════════════════════════
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Section') 
    THEN (SELECT COUNT(*)::text FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'home')
    ELSE 'Tabela não existe'
  END as home_sections;

-- ══════════════════════════════════════
-- 3. VERIFICAR FIELDMETADATA (se tabela existir)
-- ══════════════════════════════════════
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'field_metadata') 
    THEN (SELECT COUNT(*)::text FROM "field_metadata")
    ELSE 'Tabela não existe'
  END as field_metadata_count;

-- ══════════════════════════════════════
-- 4. RESUMO GERAL (sempre funciona)
-- ══════════════════════════════════════
SELECT 
  (SELECT COUNT(*) FROM "Project" WHERE status = 'PUBLISHED') as projetos_publicados,
  (SELECT COUNT(*) FROM "Service" WHERE status = 'PUBLISHED') as servicos_publicados,
  (SELECT COUNT(*) FROM "Page" WHERE status = 'PUBLISHED') as paginas_publicadas,
  (SELECT COUNT(*) FROM "Media") as total_midias,
  (SELECT COUNT(*) FROM "Lead") as total_leads;
