-- ═══════════════════════════════════════════════════════════════
-- FILOSOFIA DE EMPATIA - Missão, Visão e Valores
-- ═══════════════════════════════════════════════════════════════
-- Descrição: Popula a página Studio com seção de Filosofia (MVP)
--            baseada nos conceitos de empatia discutidos
-- 
-- Referências:
--   - Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"
--   - Carl Rogers: "Ter empatia é ver o mundo pelos olhos do outro"
-- 
-- Uso: Execute no console do Neon/Prisma ou via psql
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. CRIAR/ATUALIZAR PÁGINA STUDIO (se não existir)
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
  -- SEO Titles
  'Estúdio & Equipe | Azimut - Experiências Imersivas',
  'Studio & Team | Azimut - Immersive Experiences',
  'Estudio & Equipo | Azimut - Experiencias Inmersivas',
  'Studio & Équipe | Azimut - Expériences Immersives',
  -- SEO Descriptions
  'Conheça a Azimut: estúdio criativo-tecnológico dedicado a experiências imersivas. Com raízes no Brasil e Canadá, criamos projetos que transformam como as pessoas sentem e vivem.',
  'Meet Azimut: creative-technology studio dedicated to immersive experiences. With roots in Brazil and Canada, we create projects that transform how people feel and live.',
  'Conoce Azimut: estudio creativo-tecnológico dedicado a experiencias inmersivas. Con raíces en Brasil y Canadá, creamos proyectos que transforman cómo las personas sienten y viven.',
  'Découvrez Azimut: studio créatif-technologique dédié aux expériences immersives. Avec racines au Brésil et Canada, nous créons des projets qui transforment comment les gens ressentent et vivent.',
  -- Hero Slogans
  'Estúdio & Equipe',
  'Studio & Team',
  'Estudio & Equipo',
  'Studio & Équipe',
  -- Hero Subtitles
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
  "seoDescPt" = EXCLUDED."seoDescPt",
  "seoDescEn" = EXCLUDED."seoDescEn",
  "seoDescEs" = EXCLUDED."seoDescEs",
  "seoDescFr" = EXCLUDED."seoDescFr",
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "heroSubtitlePt" = EXCLUDED."heroSubtitlePt",
  "heroSubtitleEn" = EXCLUDED."heroSubtitleEn",
  "heroSubtitleEs" = EXCLUDED."heroSubtitleEs",
  "heroSubtitleFr" = EXCLUDED."heroSubtitleFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 2. SEÇÃO: MISSÃO
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
  1,
  'philosophy',
  'mission',
  -- Títulos
  'Missão',
  'Mission',
  'Misión',
  'Mission',
  -- Body PT
  'Sentir DENTRO do que nossos parceiros sentem. Não observamos de fora — entramos, sentimos, e a partir daí, criamos experiências que transformam.

Não somos uma empresa formal do século passado. Somos descontraídos, alegres, simpáticos. Somos fodas no que fazemos - e não escondemos isso - mas nossa confiança nunca vira arrogância.

Somos o amigo que você quer ter ao lado quando precisa fazer algo incrível acontecer.',
  -- Body EN
  'Feel FROM WITHIN what our partners feel. We don''t observe from outside — we enter, feel, and from there, create experiences that transform.

We''re not a formal company from the last century. We''re relaxed, joyful, friendly. We''re damn good at what we do - and we don''t hide it - but our confidence never becomes arrogance.

We''re the friend you want by your side when you need to make something incredible happen.',
  -- Body ES
  'Sentir DENTRO de lo que nuestros socios sienten. No observamos desde afuera — entramos, sentimos, y a partir de ahí, creamos experiencias que transforman.

No somos una empresa formal del siglo pasado. Somos relajados, alegres, simpáticos. Somos muy buenos en lo que hacemos - y no lo escondemos - pero nuestra confianza nunca se vuelve arrogancia.

Somos el amigo que quieres tener a tu lado cuando necesitas hacer algo increíble.',
  -- Body FR
  'Ressentir DE L''INTÉRIEUR ce que nos partenaires ressentent. Nous n''observons pas de l''extérieur — nous entrons, ressentons, et à partir de là, créons des expériences qui transforment.

Nous ne sommes pas une entreprise formelle du siècle dernier. Nous sommes décontractés, joyeux, sympathiques. Nous excellons dans ce que nous faisons - et ne le cachons pas - mais notre confiance ne devient jamais arrogance.

Nous sommes l''ami que vous voulez à vos côtés quand vous devez réaliser quelque chose d''incroyable.',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. SEÇÃO: VISÃO
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
  2,
  'philosophy',
  'vision',
  -- Títulos
  'Visão',
  'Vision',
  'Visión',
  'Vision',
  -- Body PT
  'Ser a máquina de empatia que conecta tecnologia e emoção. Criar experiências onde as pessoas não apenas veem — elas VIVEM.

VR como máquina de empatia - a capacidade de colocar alguém literalmente dentro da experiência de outra pessoa. Não é sobre mostrar, é sobre fazer VIVER.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  -- Body EN
  'Be the empathy machine that connects technology and emotion. Create experiences where people don''t just watch — they LIVE.

VR as an empathy machine - the ability to literally place someone inside another person''s experience. It''s not about showing, it''s about making them LIVE it.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  -- Body ES
  'Ser la máquina de empatía que conecta tecnología y emoción. Crear experiencias donde las personas no solo ven — VIVEN.

VR como máquina de empatía - la capacidad de colocar a alguien literalmente dentro de la experiencia de otra persona. No se trata de mostrar, se trata de hacer VIVIR.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  -- Body FR
  'Être la machine d''empathie qui connecte technologie et émotion. Créer des expériences où les gens ne font pas que voir — ils VIVENT.

VR comme machine d''empathie - la capacité de placer quelqu''un littéralement à l''intérieur de l''expérience d''une autre personne. Ce n''est pas montrer, c''est faire VIVRE.

— Chris Milk, TED Talk Vancouver 2015: "The Ultimate Empathy Machine"',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. SEÇÃO: VALORES
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
  3,
  'philosophy',
  'values',
  -- Títulos
  'Valores',
  'Values',
  'Valores',
  'Valeurs',
  -- Body PT
  '✦ EMPATIA: Sentir DENTRO, não apenas COM
   Não observamos de fora. Entramos. Sentimos. E a partir daí, ajudamos.

✦ AUTENTICIDADE: Descontraídos, confiantes, genuínos
   Nada de scripts robóticos. Somos o amigo que você quer por perto.

✦ PRESENÇA: "Tô aqui", "Do teu lado", "Junto"
   Conexão real é o que transforma visitantes em parceiros.

"Ter empatia é ver o mundo pelos olhos do outro, não ver o seu mundo refletido nos olhos dele."
— Carl Rogers',
  -- Body EN
  '✦ EMPATHY: Feel FROM WITHIN, not just WITH
   We don''t observe from outside. We enter. We feel. And from there, we help.

✦ AUTHENTICITY: Relaxed, confident, genuine
   No robotic scripts. We''re the friend you want nearby.

✦ PRESENCE: "I''m here", "By your side", "Together"
   Real connection is what transforms visitors into partners.

"To have empathy is to see the world through the other''s eyes, not to see your world reflected in their eyes."
— Carl Rogers',
  -- Body ES
  '✦ EMPATÍA: Sentir DENTRO, no solo CON
   No observamos desde afuera. Entramos. Sentimos. Y a partir de ahí, ayudamos.

✦ AUTENTICIDAD: Relajados, confiados, genuinos
   Nada de scripts robóticos. Somos el amigo que quieres cerca.

✦ PRESENCIA: "Estoy aquí", "A tu lado", "Juntos"
   La conexión real es lo que transforma visitantes en socios.

"Tener empatía es ver el mundo a través de los ojos del otro, no ver tu mundo reflejado en sus ojos."
— Carl Rogers',
  -- Body FR
  '✦ EMPATHIE: Ressentir DE L''INTÉRIEUR, pas juste AVEC
   Nous n''observons pas de l''extérieur. Nous entrons. Ressentons. Et de là, aidons.

✦ AUTHENTICITÉ: Décontractés, confiants, authentiques
   Pas de scripts robotiques. Nous sommes l''ami que vous voulez près de vous.

✦ PRÉSENCE: "Je suis là", "À tes côtés", "Ensemble"
   La vraie connexion est ce qui transforme les visiteurs en partenaires.

"Avoir de l''empathie, c''est voir le monde à travers les yeux de l''autre, pas voir son propre monde reflété dans ses yeux."
— Carl Rogers',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. SEÇÃO: EMPATIA VS SIMPATIA (Conceito-chave)
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
  4,
  'philosophy',
  'empathy-concept',
  -- Títulos
  'Empatia vs Simpatia',
  'Empathy vs Sympathy',
  'Empatía vs Simpatía',
  'Empathie vs Sympathie',
  -- Body PT
  'SIMPATIA (Sym + Pathos)
• Sym = junto, com
• Pathos = sentimento
• Sentir COM o outro (ao lado)
• "Entendo que deve ser difícil pra você"
• Observa de fora

EMPATIA (Em + Pathos)
• Em = dentro
• Pathos = sentimento
• Sentir DENTRO do outro
• "Aquele frio na barriga de criar algo que vai tocar milhares de pessoas..."
• Entra na experiência

Nós não observamos de fora. Entramos. Sentimos. E a partir daí, ajudamos.',
  -- Body EN
  'SYMPATHY (Sym + Pathos)
• Sym = together, with
• Pathos = feeling
• Feel WITH the other (alongside)
• "I understand it must be difficult for you"
• Observes from outside

EMPATHY (Em + Pathos)
• Em = inside
• Pathos = feeling
• Feel FROM WITHIN the other
• "That butterflies-in-stomach feeling of creating something that will touch thousands..."
• Enters the experience

We don''t observe from outside. We enter. Feel. And from there, we help.',
  -- Body ES
  'SIMPATÍA (Sym + Pathos)
• Sym = junto, con
• Pathos = sentimiento
• Sentir CON el otro (al lado)
• "Entiendo que debe ser difícil para ti"
• Observa desde afuera

EMPATÍA (Em + Pathos)
• Em = dentro
• Pathos = sentimiento
• Sentir DENTRO del otro
• "Ese nudo en el estómago de crear algo que tocará miles de personas..."
• Entra en la experiencia

No observamos desde afuera. Entramos. Sentimos. Y a partir de ahí, ayudamos.',
  -- Body FR
  'SYMPATHIE (Sym + Pathos)
• Sym = ensemble, avec
• Pathos = sentiment
• Ressentir AVEC l''autre (à côté)
• "Je comprends que ça doit être difficile pour toi"
• Observe de l''extérieur

EMPATHIE (Em + Pathos)
• Em = dedans
• Pathos = sentiment
• Ressentir DE L''INTÉRIEUR de l''autre
• "Ce nœud à l''estomac de créer quelque chose qui touchera des milliers..."
• Entre dans l''expérience

Nous n''observons pas de l''extérieur. Nous entrons. Ressentons. Et de là, aidons.',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 6. SEÇÃO: TOM DE VOZ
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
  5,
  'philosophy',
  'tone-of-voice',
  -- Títulos
  'Tom de Voz',
  'Tone of Voice',
  'Tono de Voz',
  'Ton de Voix',
  -- Body PT
  '• DESCONTRAÍDO: Não formal, não corporativo
• CONFIANTE: Sabemos que somos bons, mas sem arrogância
• ACOLHEDOR: O amigo que você quer por perto
• GENUÍNO: Nada de scripts robóticos
• PRESENTE: "Tô aqui", "Do teu lado", "Junto"

O QUE NÃO FAZEMOS:
❌ "Podemos ajudar você" (genérico, frio)
❌ "Start a project" (robótico, repetitivo)
❌ "Entre em contato" (formal, distante)

O QUE FAZEMOS:
✅ "Aquele frio na barriga de criar algo que vai tocar milhares..."
✅ "Sinto isso também" / "Conheço esse sentimento"
✅ "Junto nessa" / "Do teu lado"',
  -- Body EN
  '• RELAXED: Not formal, not corporate
• CONFIDENT: We know we''re good, but without arrogance
• WELCOMING: The friend you want nearby
• GENUINE: No robotic scripts
• PRESENT: "I''m here", "By your side", "Together"

WHAT WE DON''T DO:
❌ "We can help you" (generic, cold)
❌ "Start a project" (robotic, repetitive)
❌ "Contact us" (formal, distant)

WHAT WE DO:
✅ "That butterflies feeling of creating something that''ll touch thousands..."
✅ "I feel that too" / "I know that feeling"
✅ "In this together" / "By your side"',
  -- Body ES
  '• RELAJADO: No formal, no corporativo
• CONFIADO: Sabemos que somos buenos, pero sin arrogancia
• ACOGEDOR: El amigo que quieres cerca
• GENUINO: Nada de scripts robóticos
• PRESENTE: "Estoy aquí", "A tu lado", "Juntos"

LO QUE NO HACEMOS:
❌ "Podemos ayudarte" (genérico, frío)
❌ "Iniciar proyecto" (robótico, repetitivo)
❌ "Contáctanos" (formal, distante)

LO QUE HACEMOS:
✅ "Ese nudo de crear algo que tocará miles..."
✅ "Siento eso también" / "Conozco ese sentimiento"
✅ "Juntos en esto" / "A tu lado"',
  -- Body FR
  '• DÉCONTRACTÉ: Pas formel, pas corporate
• CONFIANT: On sait qu''on est bons, mais sans arrogance
• ACCUEILLANT: L''ami que vous voulez près de vous
• AUTHENTIQUE: Pas de scripts robotiques
• PRÉSENT: "Je suis là", "À tes côtés", "Ensemble"

CE QU''ON NE FAIT PAS:
❌ "Nous pouvons vous aider" (générique, froid)
❌ "Démarrer un projet" (robotique, répétitif)
❌ "Contactez-nous" (formel, distant)

CE QU''ON FAIT:
✅ "Ce nœud de créer quelque chose qui touchera des milliers..."
✅ "Je ressens ça aussi" / "Je connais ce sentiment"
✅ "Ensemble dans ça" / "À tes côtés"',
  NOW(),
  NOW()
FROM "Page" p WHERE p.slug = 'studio'
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  s."order" AS "Ordem",
  s.type AS "Tipo",
  s.layout AS "Layout",
  s."titlePt" AS "Título PT",
  s."titleEn" AS "Título EN",
  LEFT(s."bodyPt", 80) AS "Preview Body PT",
  s."updatedAt" AS "Atualizado"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug = 'studio'
ORDER BY s."order";

-- Mostrar página atualizada
SELECT 
  name AS "Página",
  slug AS "Slug",
  "heroSloganPt" AS "Slogan PT",
  "seoDescPt" AS "SEO Desc PT",
  status AS "Status"
FROM "Page"
WHERE slug = 'studio';
