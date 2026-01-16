-- ═══════════════════════════════════════════════════════════════
-- ADICIONAR IMAGENS DE CAPA AOS POSTS DO BLOG
-- ═══════════════════════════════════════════════════════════════
-- Este script adiciona URLs de imagens placeholder relacionadas
-- aos temas dos posts. Você pode substituir depois pelas imagens reais.
-- ═══════════════════════════════════════════════════════════════

-- Post 1: Rio Museu Olímpico
-- Imagem: Museu/Olimpíadas/Instalação interativa
UPDATE "BlogPost"
SET 
  "coverImageUrl" = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&q=80',
  "coverImageAlt" = 'Rio Olympic Museum: Immersive installation and interactive experience'
WHERE slug = 'rio-museu-olimpico-montagem-instalacao'
  AND ("coverImageUrl" IS NULL OR "coverImageUrl" = '');

-- Post 2: Natal Rio Bonito
-- Imagem: Natal/Luzes/Instalação de rua
UPDATE "BlogPost"
SET 
  "coverImageUrl" = 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&h=675&fit=crop&q=80',
  "coverImageAlt" = 'Natal Rio Bonito: Christmas lights and immersive street installation'
WHERE slug = 'natal-rio-bonito-instalacao-imersiva'
  AND ("coverImageUrl" IS NULL OR "coverImageUrl" = '');

-- Post 3: VR e AR
-- Imagem: Realidade Virtual/Aumentada/Tecnologia
UPDATE "BlogPost"
SET 
  "coverImageUrl" = 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&h=675&fit=crop&q=80',
  "coverImageAlt" = 'VR and AR: Immersive technology creating future experiences'
WHERE slug = 'vr-ar-experiencias-imersivas-azimut'
  AND ("coverImageUrl" IS NULL OR "coverImageUrl" = '');

-- Post 4: Por Trás das Cenas
-- Imagem: Equipe/Trabalho remoto/Colaboração
UPDATE "BlogPost"
SET 
  "coverImageUrl" = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop&q=80',
  "coverImageAlt" = 'Behind the Scenes: Team collaboration between Brazil and Canada'
WHERE slug = 'por-tras-das-cenas-azimut-brasil-canada'
  AND ("coverImageUrl" IS NULL OR "coverImageUrl" = '');

-- ═══════════════════════════════════════════════════════════════
-- ✅ SCRIPT CONCLUÍDO
-- ═══════════════════════════════════════════════════════════════
-- As imagens são de Unsplash (gratuitas, uso comercial permitido)
-- Você pode substituir depois pelas imagens reais no backoffice
-- ═══════════════════════════════════════════════════════════════
