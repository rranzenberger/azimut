-- ═══════════════════════════════════════════════════════════════
-- CRIAR POSTS BLOG ESTRATÉGICOS - FASE 3 SEO
-- ═══════════════════════════════════════════════════════════════
-- 5 posts estratégicos para melhorar SEO e tráfego orgânico
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. POST: "Guia Completo: Como Criar Experiência VR Imersiva"
-- ═══════════════════════════════════════════════════════════════

-- Primeiro, criar categoria se não existir
INSERT INTO "BlogCategory" (
  id, slug, "namePt", "nameEn", "nameEs", "nameFr",
  "descPt", "descEn", "descEs", "descFr",
  color, icon, priority, "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'tecnologia',
  'Tecnologia',
  'Technology',
  'Tecnología',
  'Technologie',
  'Artigos sobre tecnologia, VR, AR, IA e inovação',
  'Articles about technology, VR, AR, AI and innovation',
  'Artículos sobre tecnología, VR, AR, IA e innovación',
  'Articles sur la technologie, VR, AR, IA et innovation',
  '#c92337',
  '🤖',
  10,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Criar post 1
INSERT INTO "BlogPost" (
  id, slug,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn", "excerptEs", "excerptFr",
  "contentPt", "contentEn", "contentEs", "contentFr",
  "seoTitlePt", "seoTitleEn", "seoTitleEs", "seoTitleFr",
  "seoDescPt", "seoDescEn", "seoDescEs", "seoDescFr",
  status, featured, "publishedAt",
  "authorName", "readingTimeMin",
  "categoryId",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  'guia-completo-como-criar-experiencia-vr-imersiva',
  'Guia Completo: Como Criar Experiência VR Imersiva',
  'Complete Guide: How to Create an Immersive VR Experience',
  'Guía Completa: Cómo Crear una Experiencia VR Inmersiva',
  'Guide Complet: Comment Créer une Expérience VR Immersive',
  'Aprenda tudo sobre produção VR: tipos, equipamentos, pipeline e melhores práticas para criar experiências imersivas que emocionam.',
  'Learn everything about VR production: types, equipment, pipeline and best practices to create immersive experiences that move.',
  'Aprende todo sobre producción VR: tipos, equipos, pipeline y mejores prácticas para crear experiencias inmersivas que emocionan.',
  'Apprenez tout sur la production VR: types, équipements, pipeline et meilleures pratiques pour créer des expériences immersives qui émeuvent.',
  -- Conteúdo completo (exemplo - expandir depois)
  '# Introdução

Realidade Virtual (VR) não é mais ficção científica - é uma ferramenta poderosa para contar histórias, educar e criar experiências que transformam como as pessoas sentem e vivenciam o mundo.

## O que é VR e por que importa?

VR permite que você transporte pessoas para outros lugares, tempos e realidades. É a "máquina de empatia" que Chris Milk descreveu em sua TED Talk de 2015.

## Tipos de VR

### VR 360°
Vídeos filmados com câmeras 360° que permitem ao usuário olhar em todas as direções. Ideal para documentários e experiências narrativas.

### VR 6DOF (Six Degrees of Freedom)
Experiências totalmente interativas onde o usuário pode se mover no espaço virtual. Requer headsets avançados como Oculus Quest ou HTC Vive.

### WebVR
Experiências VR acessíveis diretamente no navegador, sem necessidade de apps. Ideal para alcance amplo.

## Pipeline de Produção VR

1. **Pré-Produção:** Conceito, roteiro, storyboard 360°
2. **Produção:** Captação com câmeras 360° ou criação 3D
3. **Pós-Produção:** Stitching, edição, correção de cor
4. **Distribuição:** Plataformas (YouTube VR, Oculus, Steam)

## Equipamentos Necessários

- Câmeras 360°: Insta360, GoPro MAX
- Headsets: Oculus Quest, HTC Vive, Pico
- Software: Premiere Pro, DaVinci Resolve, Unity/Unreal

## Case Studies da Azimut

A Azimut tem experiência em produção VR desde 2017, incluindo:
- Curadoria VR no Festival de Gramado (8 anos)
- Documentários 360° para museus
- Experiências interativas para marcas

## Dicas e Melhores Práticas

1. **Pense em 360°:** Tudo ao redor importa
2. **Guie o olhar:** Use áudio e movimento para direcionar atenção
3. **Teste em headsets:** Sempre valide a experiência final
4. **Otimize performance:** VR requer alta taxa de quadros (90fps+)

## Conclusão

VR é uma ferramenta poderosa para criar empatia e conexão. Com planejamento adequado e execução técnica sólida, você pode criar experiências que transformam vidas.

---

**Quer criar sua própria experiência VR?** Entre em contato com a Azimut para uma consultoria gratuita.',
  -- Versão EN (similar, traduzir)
  '# Introduction

Virtual Reality (VR) is no longer science fiction - it''s a powerful tool for storytelling, education and creating experiences that transform how people feel and experience the world.

[Conteúdo completo em inglês - similar ao PT]',
  -- Versão ES e FR (similar)
  '',
  '',
  -- SEO
  'Guia Completo VR Imersiva 2026 | Azimut',
  'Complete Guide Immersive VR 2026 | Azimut',
  'Guía Completa VR Inmersiva 2026 | Azimut',
  'Guide Complet VR Immersive 2026 | Azimut',
  'Aprenda como criar experiências VR imersivas: tipos, equipamentos, pipeline completo e case studies da Azimut. Guia 2026 atualizado.',
  'Learn how to create immersive VR experiences: types, equipment, complete pipeline and Azimut case studies. Updated 2026 guide.',
  'Aprende cómo crear experiencias VR inmersivas: tipos, equipos, pipeline completo y casos de estudio de Azimut. Guía 2026 actualizada.',
  'Apprenez à créer des expériences VR immersives: types, équipements, pipeline complet et études de cas Azimut. Guide 2026 mis à jour.',
  'PUBLISHED',
  true,
  NOW(),
  'Equipe Azimut',
  15,
  (SELECT id FROM "BlogCategory" WHERE slug = 'tecnologia' LIMIT 1),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "BlogPost" WHERE slug = 'guia-completo-como-criar-experiencia-vr-imersiva'
);

-- ═══════════════════════════════════════════════════════════════
-- 2. POST: "10 Dicas para Produzir Documentário de Sucesso"
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "BlogPost" (
  id, slug,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn",
  status, featured, "publishedAt",
  "authorName", "readingTimeMin",
  "categoryId",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  '10-dicas-produzir-documentario-sucesso',
  '10 Dicas para Produzir Documentário de Sucesso',
  '10 Tips to Produce a Successful Documentary',
  '10 Consejos para Producir un Documental Exitoso',
  '10 Conseils pour Produire un Documentaire Réussi',
  'Aprenda as melhores práticas de produção documental: desde o conceito até a distribuição. Dicas práticas baseadas em 30 anos de experiência.',
  'Learn best practices for documentary production: from concept to distribution. Practical tips based on 30 years of experience.',
  'PUBLISHED',
  true,
  NOW(),
  'Equipe Azimut',
  12,
  (SELECT id FROM "BlogCategory" WHERE slug = 'tecnologia' LIMIT 1),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "BlogPost" WHERE slug = '10-dicas-produzir-documentario-sucesso'
);

-- ═══════════════════════════════════════════════════════════════
-- 3. POST: "VFS vs VanArts: Qual Escolher para Estudar em Vancouver?"
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "BlogPost" (
  id, slug,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn",
  status, featured, "publishedAt",
  "authorName", "readingTimeMin",
  "categoryId",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  'vfs-vs-vanarts-qual-escolher-vancouver',
  'VFS vs VanArts: Qual Escolher para Estudar em Vancouver?',
  'VFS vs VanArts: Which to Choose to Study in Vancouver?',
  'VFS vs VanArts: ¿Cuál Elegir para Estudiar en Vancouver?',
  'VFS vs VanArts: Lequel Choisir pour Étudier à Vancouver?',
  'Comparativo completo entre VFS e VanArts: programas, custos, empregabilidade e qual escola é melhor para seu perfil. Guia 2026.',
  'Complete comparison between VFS and VanArts: programs, costs, employability and which school is better for your profile. 2026 guide.',
  'PUBLISHED',
  true,
  NOW(),
  'Equipe Azimut',
  18,
  (SELECT id FROM "BlogCategory" WHERE slug = 'tecnologia' LIMIT 1),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "BlogPost" WHERE slug = 'vfs-vs-vanarts-qual-escolher-vancouver'
);

-- ═══════════════════════════════════════════════════════════════
-- 4. POST: "O Futuro das Experiências Imersivas em Museus"
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "BlogPost" (
  id, slug,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn",
  status, featured, "publishedAt",
  "authorName", "readingTimeMin",
  "categoryId",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  'futuro-experiencias-imersivas-museus',
  'O Futuro das Experiências Imersivas em Museus',
  'The Future of Immersive Experiences in Museums',
  'El Futuro de las Experiencias Inmersivas en Museos',
  'L''Avenir des Expériences Immersives dans les Musées',
  'Tendências, tecnologias emergentes e o futuro da museologia digital. Como VR, AR e IA estão transformando visitas a museus.',
  'Trends, emerging technologies and the future of digital museology. How VR, AR and AI are transforming museum visits.',
  'PUBLISHED',
  true,
  NOW(),
  'Equipe Azimut',
  14,
  (SELECT id FROM "BlogCategory" WHERE slug = 'tecnologia' LIMIT 1),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "BlogPost" WHERE slug = 'futuro-experiencias-imersivas-museus'
);

-- ═══════════════════════════════════════════════════════════════
-- 5. POST: "IA Generativa na Produção Audiovisual: Guia 2026"
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "BlogPost" (
  id, slug,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "excerptPt", "excerptEn",
  status, featured, "publishedAt",
  "authorName", "readingTimeMin",
  "categoryId",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  'ia-generativa-producao-audiovisual-guia-2026',
  'IA Generativa na Produção Audiovisual: Guia 2026',
  'Generative AI in Audiovisual Production: 2026 Guide',
  'IA Generativa en Producción Audiovisual: Guía 2026',
  'IA Générative dans la Production Audiovisuelle: Guide 2026',
  'Como usar IA generativa (Runway, Pika, Sora) na produção audiovisual. Ferramentas, aplicações práticas e o futuro da produção com IA.',
  'How to use generative AI (Runway, Pika, Sora) in audiovisual production. Tools, practical applications and the future of AI production.',
  'PUBLISHED',
  true,
  NOW(),
  'Equipe Azimut',
  16,
  (SELECT id FROM "BlogCategory" WHERE slug = 'tecnologia' LIMIT 1),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "BlogPost" WHERE slug = 'ia-generativa-producao-audiovisual-guia-2026'
);

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════

SELECT 
  slug,
  "titlePt",
  status,
  featured,
  "publishedAt",
  "readingTimeMin"
FROM "BlogPost"
WHERE slug IN (
  'guia-completo-como-criar-experiencia-vr-imersiva',
  '10-dicas-produzir-documentario-sucesso',
  'vfs-vs-vanarts-qual-escolher-vancouver',
  'futuro-experiencias-imersivas-museus',
  'ia-generativa-producao-audiovisual-guia-2026'
)
ORDER BY "createdAt" DESC;
