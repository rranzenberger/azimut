-- ══════════════════════════════════════════════════════════════
-- 📊 SINCRONIZAÇÃO COMPLETA SITE ↔ BACKOFFICE
-- Data: 2026-01-20
-- Objetivo: Atualizar backoffice com dados do site (SEO + Hero)
-- ══════════════════════════════════════════════════════════════
--
-- ✅ O QUE ESTE SCRIPT FAZ:
-- 1. Atualiza SEO Title/Description (PT, EN, ES, FR)
-- 2. Atualiza Hero Slogan/Subtitle (PT, EN, ES, FR)
-- 3. Cobre 11 páginas principais do site
--
-- 🚀 COMO USAR:
-- 1. Abra Vercel → Storage → Neon → SQL Editor
-- 2. Cole TODO este script
-- 3. Clique "Run Query"
-- 4. ✅ Pronto!
--
-- ══════════════════════════════════════════════════════════════

BEGIN;

-- ══════════════════════════════════════════════════════════════
-- 1️⃣ HOME PAGE
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Azimut - Produtora Audiovisual & Experiências Imersivas',
  "seoTitleEn" = 'Azimut - Audiovisual Production & Immersive Experiences',
  "seoTitleEs" = 'Azimut - Produccion Audiovisual & Experiencias Inmersivas',
  "seoTitleFr" = 'Azimut - Production Audiovisuelle & Experiences Immersives',
  
  "seoDescPt" = 'Desde 1996 criando experiências imersivas, VR, AR e projetos culturais premiados. Academy com cursos de VFX, Animação e Game Design. Preparação para VFS e VanArts Vancouver.',
  "seoDescEn" = 'Since 1996 creating award-winning immersive experiences, VR, AR and cultural projects. Academy with VFX, Animation and Game Design courses. VFS and VanArts Vancouver preparation.',
  "seoDescEs" = 'Desde 1996 creando experiencias inmersivas premiadas, VR, AR y proyectos culturales. Academy con cursos de VFX, Animacion y Game Design. Preparacion para VFS y VanArts.',
  "seoDescFr" = 'Depuis 1996 creant des experiences immersives primees, VR, AR et projets culturels. Academy avec cours VFX, Animation et Game Design. Preparation VFS et VanArts Vancouver.',
  
  -- Hero Section
  "heroSloganPt" = 'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  "heroSloganEn" = 'EXPERIENCES THAT CONNECT WORLDS',
  "heroSloganEs" = 'EXPERIENCIAS QUE CONECTAN MUNDOS',
  "heroSloganFr" = 'EXPÉRIENCES QUI CONNECTENT LES MONDES',
  
  "heroSubtitlePt" = 'Criamos experiências imersivas entre Brasil e Canadá.',
  "heroSubtitleEn" = 'We create immersive experiences between Brazil and Canada.',
  "heroSubtitleEs" = 'Creamos experiencias inmersivas entre Brasil y Canadá.',
  "heroSubtitleFr" = 'Nous créons des expériences immersives entre le Brésil et le Canada.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'home';

-- ══════════════════════════════════════════════════════════════
-- 2️⃣ WHAT (Soluções/Services)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Serviços - O Que Fazemos | Azimut',
  "seoTitleEn" = 'Services - What We Do | Azimut',
  "seoTitleEs" = 'Servicios - Qué Hacemos | Azimut',
  "seoTitleFr" = 'Services - Ce Que Nous Faisons | Azimut',
  
  "seoDescPt" = 'Produção audiovisual, experiências imersivas, VR/AR, exposições culturais e consultoria em inovação.',
  "seoDescEn" = 'Audiovisual production, immersive experiences, VR/AR, cultural exhibitions and innovation consulting.',
  "seoDescEs" = 'Producción audiovisual, experiencias inmersivas, VR/AR, exposiciones culturales y consultoría en innovación.',
  "seoDescFr" = 'Production audiovisuelle, expériences immersives, VR/AR, expositions culturelles et conseil en innovation.',
  
  -- Hero Section
  "heroSloganPt" = 'Soluções',
  "heroSloganEn" = 'Solutions',
  "heroSloganEs" = 'Servicios',
  "heroSloganFr" = 'Services',
  
  "heroSubtitlePt" = 'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos – atuando entre Brasil e Canadá.',
  "heroSubtitleEn" = 'Immersive, interactive and cinematic experiences for culture, brands and hybrid spaces – operating between Brazil and Canada.',
  "heroSubtitleEs" = 'Experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y espacios híbridos – operando entre Brasil y Canadá.',
  "heroSubtitleFr" = 'Expériences immersives, interactives et cinématographiques pour la culture, les marques et les espaces hybrides – entre le Brésil et le Canada.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'what';

-- ══════════════════════════════════════════════════════════════
-- 3️⃣ WORK (Projetos/Portfolio)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Trabalhos - Portfolio Azimut',
  "seoTitleEn" = 'Work - Azimut Portfolio',
  "seoTitleEs" = 'Trabajos - Portfolio Azimut',
  "seoTitleFr" = 'Travaux - Portfolio Azimut',
  
  "seoDescPt" = 'Conheça nossos projetos de VR, AR, exposições e experiências imersivas. 30 anos transformando ideias em realidade.',
  "seoDescEn" = 'Discover our VR, AR, exhibitions and immersive experiences projects. 30 years transforming ideas into reality.',
  "seoDescEs" = 'Conoce nuestros proyectos de VR, AR, exposiciones y experiencias inmersivas. 30 años transformando ideas en realidad.',
  "seoDescFr" = 'Découvrez nos projets VR, AR, expositions et expériences immersives. 30 ans à transformer les idées en réalité.',
  
  -- Hero Section
  "heroSloganPt" = 'Projetos',
  "heroSloganEn" = 'Projects',
  "heroSloganEs" = 'Proyectos',
  "heroSloganFr" = 'Projets',
  
  "heroSubtitlePt" = 'Museus, marcas, festivais e experiências imersivas.',
  "heroSubtitleEn" = 'Museums, brands, festivals and immersive experiences.',
  "heroSubtitleEs" = 'Museos, marcas, festivales y experiencias inmersivas.',
  "heroSubtitleFr" = 'Musées, marques, festivals et expériences immersives.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'work';

-- ══════════════════════════════════════════════════════════════
-- 4️⃣ STUDIO (Estúdio)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Estúdio - Azimut',
  "seoTitleEn" = 'Studio - Azimut',
  "seoTitleEs" = 'Estudio - Azimut',
  "seoTitleFr" = 'Studio - Azimut',
  
  "seoDescPt" = 'Estúdio completo para produção audiovisual, VR/AR e experiências imersivas. Equipamentos de última geração.',
  "seoDescEn" = 'Complete studio for audiovisual production, VR/AR and immersive experiences. State-of-the-art equipment.',
  "seoDescEs" = 'Estudio completo para producción audiovisual, VR/AR y experiencias inmersivas. Equipos de última generación.',
  "seoDescFr" = 'Studio complet pour production audiovisuelle, VR/AR et expériences immersives. Équipements de dernière génération.',
  
  -- Hero Section
  "heroSloganPt" = 'Estúdio',
  "heroSloganEn" = 'Studio',
  "heroSloganEs" = 'Estudio',
  "heroSloganFr" = 'Studio',
  
  "heroSubtitlePt" = 'Equipe binacional Brasil-Canadá especializada em cinema, XR e IA.',
  "heroSubtitleEn" = 'Brazil-Canada team specialized in cinema, XR and AI.',
  "heroSubtitleEs" = 'Equipo binacional Brasil-Canadá especializado en cine, XR e IA.',
  "heroSubtitleFr" = 'Équipe binationale Brésil-Canada spécialisée en cinéma, XR et IA.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'studio';

-- ══════════════════════════════════════════════════════════════
-- 5️⃣ CONTACT (Contato)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Contato - Fale com a Azimut',
  "seoTitleEn" = 'Contact - Get in Touch | Azimut',
  "seoTitleEs" = 'Contacto - Habla con Azimut',
  "seoTitleFr" = 'Contact - Parlez avec Azimut',
  
  "seoDescPt" = 'Entre em contato para orcamentos, parcerias ou informacoes. Respondemos em ate 24h. Producao audiovisual, VR/AR e experiencias imersivas para seu projeto.',
  "seoDescEn" = 'Contact us for quotes, partnerships or information. We respond within 24h. Audiovisual production, VR/AR and immersive experiences for your project.',
  "seoDescEs" = 'Contactanos para presupuestos, asociaciones o informacion. Respondemos en 24h. Produccion audiovisual, VR/AR y experiencias inmersivas para tu proyecto.',
  "seoDescFr" = 'Contactez-nous pour devis, partenariats ou informations. Reponse sous 24h. Production audiovisuelle, VR/AR et experiences immersives pour votre projet.',
  
  -- Hero Section
  "heroSloganPt" = 'Conte o que você precisa e onde vive o seu projeto.',
  "heroSloganEn" = 'Tell us what you need and where your project lives.',
  "heroSloganEs" = 'Cuéntanos qué necesitas y dónde vive tu proyecto.',
  "heroSloganFr" = 'Dites-nous ce dont vous avez besoin et où vit votre projet.',
  
  "heroSubtitlePt" = 'Por enquanto, o contato é por e-mail ou WhatsApp. Em breve aqui será um formulário completo conectado ao nosso backoffice.',
  "heroSubtitleEn" = 'For now, contact is via e-mail or WhatsApp. Soon this will open a full brief form connected to our backoffice.',
  "heroSubtitleEs" = 'Por ahora, el contacto es por correo electrónico o WhatsApp. Pronto aquí habrá un formulario completo conectado a nuestro backoffice.',
  "heroSubtitleFr" = 'Pour l''instant, le contact se fait par e-mail ou WhatsApp. Bientôt, ceci ouvrira un formulaire complet relié à notre backoffice.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'contact';

-- ══════════════════════════════════════════════════════════════
-- 6️⃣ ACADEMY (Academy Principal)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Azimut Academy - Cursos de VFX, Animação & Game Design',
  "seoTitleEn" = 'Azimut Academy - VFX, Animation & Game Design Courses',
  "seoTitleEs" = 'Azimut Academy - Cursos de VFX, Animación & Game Design',
  "seoTitleFr" = 'Azimut Academy - Cours VFX, Animation & Game Design',
  
  "seoDescPt" = 'Cursos profissionais de VFX, Animação, Game Design. Preparação para VFS e VanArts. Certificação internacional.',
  "seoDescEn" = 'Professional VFX, Animation, Game Design courses. Preparation for VFS and VanArts. International certification.',
  "seoDescEs" = 'Cursos profesionales de VFX, Animación, Game Design. Preparación para VFS y VanArts. Certificación internacional.',
  "seoDescFr" = 'Cours professionnels VFX, Animation, Game Design. Préparation VFS et VanArts. Certification internationale.',
  
  -- Hero Section
  "heroSloganPt" = 'Academy',
  "heroSloganEn" = 'Academy',
  "heroSloganEs" = 'Academy',
  "heroSloganFr" = 'Académie',
  
  "heroSubtitlePt" = 'Cursos, workshops e pesquisa em VR, IA, cinema e experiências imersivas.',
  "heroSubtitleEn" = 'Courses, workshops and research in VR, AI, cinema and immersive experiences.',
  "heroSubtitleEs" = 'Cursos, workshops e investigación en VR, IA, cine y experiencias inmersivas.',
  "heroSubtitleFr" = 'Cours, ateliers et recherche en VR, IA, cinéma et expériences immersives.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'academy';

-- ══════════════════════════════════════════════════════════════
-- 7️⃣ PRESS (Imprensa)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Imprensa e Midia - Azimut',
  "seoTitleEn" = 'Press & Media - Azimut',
  "seoTitleEs" = 'Prensa y Medios - Azimut',
  "seoTitleFr" = 'Presse et Medias - Azimut',
  
  "seoDescPt" = 'Noticias, press releases e cobertura da midia sobre a Azimut. Desde 1996 produzindo experiencias imersivas premiadas. Contato para jornalistas e assessoria.',
  "seoDescEn" = 'News, press releases and media coverage about Azimut. Since 1996 producing award-winning immersive experiences. Contact for journalists and press office.',
  "seoDescEs" = 'Noticias, comunicados de prensa y cobertura de medios sobre Azimut. Desde 1996 produciendo experiencias inmersivas premiadas. Contacto para periodistas.',
  "seoDescFr" = 'Actualites, communiques de presse et couverture mediatique sur Azimut. Depuis 1996 produisant des experiences immersives primees. Contact pour journalistes.',
  
  -- Hero Section (mantendo genérico, pois não há hero customizado para Press no i18n)
  "heroSloganPt" = 'Imprensa',
  "heroSloganEn" = 'Press',
  "heroSloganEs" = 'Prensa',
  "heroSloganFr" = 'Presse',
  
  "heroSubtitlePt" = 'Notícias, press releases e cobertura da mídia sobre a Azimut.',
  "heroSubtitleEn" = 'News, press releases and media coverage about Azimut.',
  "heroSubtitleEs" = 'Noticias, comunicados de prensa y cobertura de medios sobre Azimut.',
  "heroSubtitleFr" = 'Actualités, communiqués de presse et couverture médiatique sur Azimut.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'press';

-- ══════════════════════════════════════════════════════════════
-- 8️⃣ RESEARCH (Pesquisa)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Pesquisa e Inovacao - Azimut',
  "seoTitleEn" = 'Research & Innovation - Azimut',
  "seoTitleEs" = 'Investigacion e Innovacion - Azimut',
  "seoTitleFr" = 'Recherche et Innovation - Azimut',
  
  "seoDescPt" = 'Pesquisa e desenvolvimento em tecnologias imersivas, VR, AR e inovacao. Laboratorio de experimentacao para projetos culturais, museologicos e educacionais.',
  "seoDescEn" = 'Research and development in immersive technologies, VR, AR and innovation. Experimentation lab for cultural, museum and educational projects.',
  "seoDescEs" = 'Investigacion y desarrollo en tecnologias inmersivas, VR, AR e innovacion. Laboratorio de experimentacion para proyectos culturales, museologicos y educativos.',
  "seoDescFr" = 'Recherche et developpement en technologies immersives, VR, AR et innovation. Laboratoire d experimentation pour projets culturels, museaux et educatifs.',
  
  -- Hero Section
  "heroSloganPt" = 'Pesquisa',
  "heroSloganEn" = 'Research',
  "heroSloganEs" = 'Investigación',
  "heroSloganFr" = 'Recherche',
  
  "heroSubtitlePt" = 'Pesquisa e desenvolvimento em tecnologias imersivas, VR, AR e inovação.',
  "heroSubtitleEn" = 'Research and development in immersive technologies, VR, AR and innovation.',
  "heroSubtitleEs" = 'Investigación y desarrollo en tecnologías inmersivas, VR, AR e innovación.',
  "heroSubtitleFr" = 'Recherche et développement en technologies immersives, VR, AR et innovation.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'academy/research' OR "slug" = 'research';

-- ══════════════════════════════════════════════════════════════
-- 9️⃣ VANCOUVER (Academy Vancouver)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Estude em Vancouver - VFS & VanArts | Azimut Academy',
  "seoTitleEn" = 'Study in Vancouver - VFS & VanArts | Azimut Academy',
  "seoTitleEs" = 'Estudiar en Vancouver - VFS & VanArts | Azimut Academy',
  "seoTitleFr" = 'Étudier à Vancouver - VFS & VanArts | Azimut Academy',
  
  "seoDescPt" = 'Prepare-se para estudar cinema, VFX e animação no Canadá. Agenciamento oficial para VFS e VanArts Vancouver.',
  "seoDescEn" = 'Prepare to study film, VFX and animation in Canada. Official agency for VFS and VanArts Vancouver.',
  "seoDescEs" = 'Prepárate para estudiar cine, VFX y animación en Canadá. Agencia oficial para VFS y VanArts Vancouver.',
  "seoDescFr" = 'Préparez-vous à étudier le cinéma, VFX et animation au Canada. Agence officielle VFS et VanArts Vancouver.',
  
  -- Hero Section
  "heroSloganPt" = 'Estude em Vancouver',
  "heroSloganEn" = 'Study in Vancouver',
  "heroSloganEs" = 'Estudiar en Vancouver',
  "heroSloganFr" = 'Étudier à Vancouver',
  
  "heroSubtitlePt" = 'Agência oficial para VFS e VanArts. Preparação completa para estudar cinema, VFX e animação no Canadá.',
  "heroSubtitleEn" = 'Official agency for VFS and VanArts. Complete preparation to study film, VFX and animation in Canada.',
  "heroSubtitleEs" = 'Agencia oficial para VFS y VanArts. Preparación completa para estudiar cine, VFX y animación en Canadá.',
  "heroSubtitleFr" = 'Agence officielle VFS et VanArts. Préparation complète pour étudier cinéma, VFX et animation au Canada.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'academy/vancouver' OR "slug" = 'vancouver';

-- ══════════════════════════════════════════════════════════════
-- 🔟 STUDIO/ABOUT (Sobre)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Sobre - Azimut',
  "seoTitleEn" = 'About - Azimut',
  "seoTitleEs" = 'Acerca - Azimut',
  "seoTitleFr" = 'À Propos - Azimut',
  
  "seoDescPt" = 'Nossa história, valores e visão. 30 anos transformando espaços culturais e experiências imersivas.',
  "seoDescEn" = 'Our history, values and vision. 30 years transforming cultural spaces and immersive experiences.',
  "seoDescEs" = 'Nuestra historia, valores y visión. 30 años transformando espacios culturales y experiencias inmersivas.',
  "seoDescFr" = 'Notre histoire, valeurs et vision. 30 ans à transformer espaces culturels et expériences immersives.',
  
  -- Hero Section
  "heroSloganPt" = 'Sobre',
  "heroSloganEn" = 'About',
  "heroSloganEs" = 'Acerca',
  "heroSloganFr" = 'À Propos',
  
  "heroSubtitlePt" = 'Nossa trajetória de 30 anos entre Brasil e Canadá.',
  "heroSubtitleEn" = 'Our 30-year journey between Brazil and Canada.',
  "heroSubtitleEs" = 'Nuestra trayectoria de 30 años entre Brasil y Canadá.',
  "heroSubtitleFr" = 'Notre parcours de 30 ans entre le Brésil et le Canada.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'studio/about' OR "slug" = 'about';

-- ══════════════════════════════════════════════════════════════
-- 1️⃣1️⃣ STUDIO/TEAM (Equipe)
-- ══════════════════════════════════════════════════════════════

UPDATE "Page"
SET
  -- SEO Meta Tags
  "seoTitlePt" = 'Equipe - Azimut',
  "seoTitleEn" = 'Team - Azimut',
  "seoTitleEs" = 'Equipo - Azimut',
  "seoTitleFr" = 'Équipe - Azimut',
  
  "seoDescPt" = 'Conheça nossa equipe de especialistas em cinema, XR, IA e experiências imersivas.',
  "seoDescEn" = 'Meet our team of specialists in cinema, XR, AI and immersive experiences.',
  "seoDescEs" = 'Conoce nuestro equipo de especialistas en cine, XR, IA y experiencias inmersivas.',
  "seoDescFr" = 'Rencontrez notre équipe de spécialistes en cinéma, XR, IA et expériences immersives.',
  
  -- Hero Section
  "heroSloganPt" = 'Equipe',
  "heroSloganEn" = 'Team',
  "heroSloganEs" = 'Equipo',
  "heroSloganFr" = 'Équipe',
  
  "heroSubtitlePt" = 'Especialistas em cinema, XR e IA.',
  "heroSubtitleEn" = 'Specialists in cinema, XR and AI.',
  "heroSubtitleEs" = 'Especialistas en cine, XR e IA.',
  "heroSubtitleFr" = 'Spécialistes en cinéma, XR et IA.',
  
  "updatedAt" = NOW()
WHERE "slug" = 'studio/team' OR "slug" = 'team';

-- ══════════════════════════════════════════════════════════════
-- ✅ VERIFICAÇÃO FINAL
-- ══════════════════════════════════════════════════════════════

-- Listar páginas atualizadas (para verificar se tudo deu certo)
SELECT 
  "slug",
  "seoTitlePt",
  "seoTitleEn",
  "heroSloganPt",
  "heroSloganEn",
  "updatedAt"
FROM "Page"
WHERE "slug" IN (
  'home',
  'what',
  'work',
  'studio',
  'contact',
  'academy',
  'press',
  'research',
  'academy/research',
  'vancouver',
  'academy/vancouver',
  'about',
  'studio/about',
  'team',
  'studio/team'
)
ORDER BY "updatedAt" DESC;

COMMIT;

-- ══════════════════════════════════════════════════════════════
-- 🎉 PRONTO!
-- ══════════════════════════════════════════════════════════════
--
-- ✅ Se você vê a lista de páginas acima com updatedAt = agora,
--    significa que tudo funcionou!
--
-- 📝 PRÓXIMOS PASSOS:
-- 1. Acesse: https://backoffice.azmt.com.br/admin/site-pages
-- 2. Clique em qualquer página (ex: Home)
-- 3. Verifique se os textos estão corretos em PT/EN/ES/FR
-- 4. ✅ Sincronização completa!
--
-- ══════════════════════════════════════════════════════════════
