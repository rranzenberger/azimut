-- ═══════════════════════════════════════════════════════════════
-- FILOSOFIA COMPLETA - Studio + Diferenciais
-- ═══════════════════════════════════════════════════════════════
-- Popula páginas Studio e Studio/Diferenciais com filosofia de
-- empatia baseada em Chris Milk e Carl Rogers
--
-- Referências:
--   - Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"
--   - Carl Rogers: "Ter empatia é ver o mundo pelos olhos do outro"
--
-- Uso: Execute no console do Neon ou via psql
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. PÁGINA STUDIO (se não existir)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Page" (
  id, name, slug, status,
  "seoTitlePt", "seoTitleEn", "seoTitleEs", "seoTitleFr",
  "seoDescPt", "seoDescEn", "seoDescEs", "seoDescFr",
  "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr",
  "heroSubtitlePt", "heroSubtitleEn", "heroSubtitleEs", "heroSubtitleFr",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'Studio',
  'studio',
  'PUBLISHED',
  'Estúdio & Equipe | Azimut - Experiências Imersivas',
  'Studio & Team | Azimut - Immersive Experiences',
  'Estudio & Equipo | Azimut - Experiencias Inmersivas',
  'Studio & Équipe | Azimut - Expériences Immersives',
  'Conheça a Azimut: estúdio criativo-tecnológico dedicado a experiências imersivas. Com raízes no Brasil e Canadá, criamos projetos que transformam como as pessoas sentem e vivem.',
  'Meet Azimut: creative-technology studio dedicated to immersive experiences. With roots in Brazil and Canada, we create projects that transform how people feel and live.',
  'Conoce Azimut: estudio creativo-tecnológico dedicado a experiencias inmersivas. Con raíces en Brasil y Canadá, creamos proyectos que transforman cómo las personas sienten y viven.',
  'Découvrez Azimut: studio créatif-technologique dédié aux expériences immersives. Avec racines au Brésil et Canada, nous créons des projets qui transforment comment les gens ressentent et vivent.',
  'Estúdio & Equipe',
  'Studio & Team',
  'Estudio & Equipo',
  'Studio & Équipe',
  'Criando experiências imersivas entre Brasil e Canadá',
  'Creating immersive experiences between Brazil and Canada',
  'Creando experiencias inmersivas entre Brasil y Canadá',
  'Créer des expériences immersives entre Brésil et Canada',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "seoTitlePt" = EXCLUDED."seoTitlePt",
  "seoTitleEn" = EXCLUDED."seoTitleEn",
  "seoTitleEs" = EXCLUDED."seoTitleEs",
  "seoTitleFr" = EXCLUDED."seoTitleFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 2. PÁGINA STUDIO/DIFERENCIAIS (se não existir)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Page" (
  id, name, slug, status,
  "seoTitlePt", "seoTitleEn", "seoTitleEs", "seoTitleFr",
  "seoDescPt", "seoDescEn", "seoDescEs", "seoDescFr",
  "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr",
  "heroSubtitlePt", "heroSubtitleEn", "heroSubtitleEs", "heroSubtitleFr",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'Studio Diferenciais',
  'studio/diferenciais',
  'PUBLISHED',
  'O Que Nos Torna Únicos | Azimut',
  'What Makes Us Unique | Azimut',
  'Lo Que Nos Hace Únicos | Azimut',
  'Ce Qui Nous Rend Uniques | Azimut',
  'Descubra o que torna a Azimut única: 30 anos de inovação, operação binacional Brasil-Canadá, e uma filosofia de empatia que transforma experiências.',
  'Discover what makes Azimut unique: 30 years of innovation, binational Brazil-Canada operation, and an empathy philosophy that transforms experiences.',
  'Descubre lo que hace única a Azimut: 30 años de innovación, operación binacional Brasil-Canadá, y una filosofía de empatía que transforma experiencias.',
  'Découvrez ce qui rend Azimut unique: 30 ans d''innovation, opération binationale Brésil-Canada, et une philosophie d''empathie qui transforme les expériences.',
  'O Que Nos Torna Únicos',
  'What Makes Us Unique',
  'Lo Que Nos Hace Únicos',
  'Ce Qui Nous Rend Uniques',
  'Nossa combinação especial de arte, tecnologia e empatia',
  'Our special combination of art, technology and empathy',
  'Nuestra combinación especial de arte, tecnología y empatía',
  'Notre combinaison spéciale d''art, technologie et empathie',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "seoTitlePt" = EXCLUDED."seoTitlePt",
  "seoTitleEn" = EXCLUDED."seoTitleEn",
  "seoDescPt" = EXCLUDED."seoDescPt",
  "seoDescEn" = EXCLUDED."seoDescEn",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 3. SEÇÃO: FILOSOFIA INTRO (Studio/Diferenciais)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  10,
  'philosophy',
  'intro',
  'Nossa Filosofia',
  'Our Philosophy',
  'Nuestra Filosofía',
  'Notre Philosophie',
  'Não somos uma empresa formal do século passado. Somos descontraídos, alegres, simpáticos. Somos muito bons no que fazemos — e não escondemos isso — mas nossa confiança nunca vira arrogância.',
  'We''re not a formal company from the last century. We''re relaxed, joyful, friendly. We''re damn good at what we do — and we don''t hide it — but our confidence never becomes arrogance.',
  'No somos una empresa formal del siglo pasado. Somos relajados, alegres, simpáticos. Somos muy buenos en lo que hacemos — y no lo escondemos — pero nuestra confianza nunca se vuelve arrogancia.',
  'Nous ne sommes pas une entreprise formelle du siècle dernier. Nous sommes décontractés, joyeux, sympathiques. Nous excellons dans ce que nous faisons — et ne le cachons pas — mais notre confiance ne devient jamais arrogance.',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio/diferenciais'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. SEÇÃO: EMPATIA (Em + Pathos)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  11,
  'philosophy',
  'empathy',
  'EMPATIA (Em + Pathos)',
  'EMPATHY (Em + Pathos)',
  'EMPATÍA (Em + Pathos)',
  'EMPATHIE (Em + Pathos)',
  'Em = dentro | Pathos = sentimento

Sentir DENTRO do outro. Entrar na experiência.

"Aquele frio na barriga de criar algo que vai tocar milhares de pessoas..."',
  'Em = inside | Pathos = feeling

Feel FROM WITHIN the other. Enter the experience.

"That butterflies-in-stomach feeling of creating something that will touch thousands..."',
  'Em = dentro | Pathos = sentimiento

Sentir DENTRO del otro. Entrar en la experiencia.

"Ese nudo en el estómago de crear algo que tocará miles de personas..."',
  'Em = dedans | Pathos = sentiment

Ressentir DE L''INTÉRIEUR de l''autre. Entrer dans l''expérience.

"Ce nœud à l''estomac de créer quelque chose qui touchera des milliers..."',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio/diferenciais'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. SEÇÃO: SIMPATIA (Sym + Pathos)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  12,
  'philosophy',
  'sympathy',
  'SIMPATIA (Sym + Pathos)',
  'SYMPATHY (Sym + Pathos)',
  'SIMPATÍA (Sym + Pathos)',
  'SYMPATHIE (Sym + Pathos)',
  'Sym = junto, com | Pathos = sentimento

Sentir COM o outro (ao lado). Observar de fora.

"Entendo que deve ser difícil pra você"',
  'Sym = together, with | Pathos = feeling

Feel WITH the other (alongside). Observe from outside.

"I understand it must be difficult for you"',
  'Sym = junto, con | Pathos = sentimiento

Sentir CON el otro (al lado). Observar desde afuera.

"Entiendo que debe ser difícil para ti"',
  'Sym = ensemble, avec | Pathos = sentiment

Ressentir AVEC l''autre (à côté). Observer de l''extérieur.

"Je comprends que ça doit être difficile pour toi"',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio/diferenciais'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 6. SEÇÃO: CONCLUSÃO FILOSOFIA
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  13,
  'philosophy',
  'conclusion',
  'Nossa Essência',
  'Our Essence',
  'Nuestra Esencia',
  'Notre Essence',
  'Nós não observamos de fora. Entramos. Sentimos. E a partir daí, ajudamos.',
  'We don''t observe from outside. We enter. Feel. And from there, we help.',
  'No observamos desde afuera. Entramos. Sentimos. Y a partir de ahí, ayudamos.',
  'Nous n''observons pas de l''extérieur. Nous entrons. Ressentons. Et de là, aidons.',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio/diferenciais'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 7. SEÇÃO: CITAÇÃO CHRIS MILK
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  14,
  'quote',
  'chris-milk',
  'Chris Milk',
  'Chris Milk',
  'Chris Milk',
  'Chris Milk',
  '"Não é uma máquina de filme. Não é uma máquina de TV. É uma máquina de empatia. Você pode ver como é ser outra pessoa."

— Chris Milk, TED Talk "How Virtual Reality Can Create the Ultimate Empathy Machine" (2015)',
  '"It''s not a film machine. It''s not a TV machine. It''s an empathy machine. You can see what it''s like to be someone else."

— Chris Milk, TED Talk "How Virtual Reality Can Create the Ultimate Empathy Machine" (2015)',
  '"No es una máquina de cine. No es una máquina de televisión. Es una máquina de empatía. Puedes ver cómo es ser otra persona."

— Chris Milk, TED Talk "How Virtual Reality Can Create the Ultimate Empathy Machine" (2015)',
  '"Ce n''est pas une machine à films. Ce n''est pas une machine à télévision. C''est une machine à empathie. Vous pouvez voir ce que c''est d''être quelqu''un d''autre."

— Chris Milk, TED Talk "How Virtual Reality Can Create the Ultimate Empathy Machine" (2015)',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio/diferenciais'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 8. SEÇÃO: CITAÇÃO CARL ROGERS
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  15,
  'quote',
  'carl-rogers',
  'Carl Rogers',
  'Carl Rogers',
  'Carl Rogers',
  'Carl Rogers',
  '"Ter empatia é ver o mundo pelos olhos do outro, não ver o seu mundo refletido nos olhos dele."

— Carl Rogers, Psicólogo Humanista',
  '"To have empathy is to see the world through the other''s eyes, not to see your world reflected in their eyes."

— Carl Rogers, Humanist Psychologist',
  '"Tener empatía es ver el mundo a través de los ojos del otro, no ver tu mundo reflejado en sus ojos."

— Carl Rogers, Psicólogo Humanista',
  '"Avoir de l''empathie, c''est voir le monde à travers les yeux de l''autre, pas voir son propre monde reflété dans ses yeux."

— Carl Rogers, Psychologue Humaniste',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio/diferenciais'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 9. SEÇÕES PARA PÁGINA STUDIO PRINCIPAL (Missão, Visão, Valores)
-- ═══════════════════════════════════════════════════════════════

-- MISSÃO
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  1,
  'philosophy',
  'mission',
  'Missão',
  'Mission',
  'Misión',
  'Mission',
  'Sentir DENTRO do que nossos parceiros sentem. Não observamos de fora — entramos, sentimos, e a partir daí, criamos experiências que transformam.',
  'Feel FROM WITHIN what our partners feel. We don''t observe from outside — we enter, feel, and from there, create experiences that transform.',
  'Sentir DENTRO de lo que nuestros socios sienten. No observamos desde afuera — entramos, sentimos, y a partir de ahí, creamos experiencias que transforman.',
  'Ressentir DE L''INTÉRIEUR ce que nos partenaires ressentent. Nous n''observons pas de l''extérieur — nous entrons, ressentons, et à partir de là, créons des expériences qui transforment.',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- VISÃO
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  2,
  'philosophy',
  'vision',
  'Visão',
  'Vision',
  'Visión',
  'Vision',
  'Ser a máquina de empatia que conecta tecnologia e emoção. Criar experiências onde as pessoas não apenas veem — elas VIVEM.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  'Be the empathy machine that connects technology and emotion. Create experiences where people don''t just watch — they LIVE.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  'Ser la máquina de empatía que conecta tecnología y emoción. Crear experiencias donde las personas no solo ven — VIVEN.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  'Être la machine d''empathie qui connecte technologie et émotion. Créer des expériences où les gens ne font pas que voir — ils VIVENT.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- VALORES
INSERT INTO "Section" (
  id, "pageId", "order", type, layout,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "bodyPt", "bodyEn", "bodyEs", "bodyFr",
  "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  3,
  'philosophy',
  'values',
  'Valores',
  'Values',
  'Valores',
  'Valeurs',
  '✦ EMPATIA: Sentir DENTRO, não apenas COM
✦ AUTENTICIDADE: Descontraídos, confiantes, genuínos
✦ PRESENÇA: "Tô aqui", "Do teu lado", "Junto"

"Ter empatia é ver o mundo pelos olhos do outro, não ver o seu mundo refletido nos olhos dele."
— Carl Rogers',
  '✦ EMPATHY: Feel FROM WITHIN, not just WITH
✦ AUTHENTICITY: Relaxed, confident, genuine
✦ PRESENCE: "I''m here", "By your side", "Together"

"To have empathy is to see the world through the other''s eyes, not to see your world reflected in their eyes."
— Carl Rogers',
  '✦ EMPATÍA: Sentir DENTRO, no solo CON
✦ AUTENTICIDAD: Relajados, confiados, genuinos
✦ PRESENCIA: "Estoy aquí", "A tu lado", "Juntos"

"Tener empatía es ver el mundo a través de los ojos del otro, no ver tu mundo reflejado en sus ojos."
— Carl Rogers',
  '✦ EMPATHIE: Ressentir DE L''INTÉRIEUR, pas juste AVEC
✦ AUTHENTICITÉ: Décontractés, confiants, authentiques
✦ PRÉSENCE: "Je suis là", "À tes côtés", "Ensemble"

"Avoir de l''empathie, c''est voir le monde à travers les yeux de l''autre, pas voir son propre monde reflété dans ses yeux."
— Carl Rogers',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  p.name AS "Página",
  p.slug AS "Slug",
  COUNT(s.id) AS "Seções",
  p.status AS "Status"
FROM "Page" p
LEFT JOIN "Section" s ON s."pageId" = p.id
WHERE p.slug IN ('studio', 'studio/diferenciais')
GROUP BY p.id, p.name, p.slug, p.status
ORDER BY p.slug;

-- Listar seções criadas
SELECT
  p.slug AS "Página",
  s."order" AS "Ordem",
  s.type AS "Tipo",
  s.layout AS "Layout",
  s."titlePt" AS "Título PT",
  LEFT(s."bodyPt", 60) AS "Preview"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug IN ('studio', 'studio/diferenciais')
ORDER BY p.slug, s."order";
