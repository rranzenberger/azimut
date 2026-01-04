-- ═══════════════════════════════════════════════════════════════
-- ADICIONAR COLUNAS MULTILÍNGUES MANUALMENTE
-- Execute este script no Neon SQL Editor via Vercel
-- ═══════════════════════════════════════════════════════════════

-- 1. ADICIONAR PILLARS (SE NÃO EXISTIREM)
DO $$ 
BEGIN
    -- Pillar 1
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar1Pt') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar1Pt" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar1En') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar1En" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar1Es') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar1Es" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar1Fr') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar1Fr" TEXT;
    END IF;
    
    -- Pillar 2
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar2Pt') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar2Pt" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar2En') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar2En" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar2Es') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar2Es" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar2Fr') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar2Fr" TEXT;
    END IF;
    
    -- Pillar 3
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar3Pt') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar3Pt" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar3En') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar3En" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar3Es') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar3Es" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='Page' AND column_name='pillar3Fr') THEN
        ALTER TABLE "Page" ADD COLUMN "pillar3Fr" TEXT;
    END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR SE FOI CRIADO
-- ═══════════════════════════════════════════════════════════════

SELECT 
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'Page'
  AND column_name LIKE 'pillar%'
ORDER BY column_name;

-- RESULTADO ESPERADO:
-- Deve mostrar 12 linhas (pillar1/2/3 x Pt/En/Es/Fr)

-- ═══════════════════════════════════════════════════════════════
-- FIM
-- ═══════════════════════════════════════════════════════════════

