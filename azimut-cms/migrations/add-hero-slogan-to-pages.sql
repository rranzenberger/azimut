-- Migration: Add heroSlogan fields to Page table
-- Date: 2025-12-27
-- Description: Adiciona campos de heroSlogan (PT, EN, ES, FR) à tabela Page

ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroSloganPt" TEXT,
ADD COLUMN IF NOT EXISTS "heroSloganEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroSloganEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroSloganFr" TEXT;

